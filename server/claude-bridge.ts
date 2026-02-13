/**
 * Vite plugin: Claude Code Bridge
 *
 * Adds dev-server middleware so the browser dev-mode UI can send
 * orchestrator prompts directly to a local `claude` CLI process.
 *
 * Endpoints (dev server only):
 *   POST /api/claude/submit   — start a Claude session (SSE stream)
 *   POST /api/claude/cancel   — kill the running session
 *   GET  /api/claude/status   — { running: boolean }
 *   POST /api/video/generate  — start video generation (SSE stream)
 *   POST /api/video/cancel    — kill video generation
 *   GET  /api/video/status    — { running: boolean }
 */

import type { Plugin, ViteDevServer } from 'vite'
import type { IncomingMessage, ServerResponse } from 'http'
import { spawn, execSync, type ChildProcess } from 'child_process'
import { mkdir, writeFile, rm } from 'fs/promises'
import { join } from 'path'

const SCREENSHOT_DIR = '.dev-screenshots'

/** Collect the full body of an incoming request as a string. */
function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c: Buffer) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
    req.on('error', reject)
  })
}

/** Write an SSE frame. */
function sse(res: ServerResponse, event: string, data: unknown) {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
}

/** Check that the `claude` CLI is reachable. */
function claudeAvailable(): boolean {
  try {
    execSync('claude --version', { stdio: 'pipe', timeout: 5000 })
    return true
  } catch {
    return false
  }
}

/**
 * Create (or switch to) a git branch.
 * Returns the branch name on success.
 */
function ensureBranch(branch: string, cwd: string): string {
  try {
    // Try creating the branch
    execSync(`git checkout -b "${branch}"`, { cwd, stdio: 'pipe' })
  } catch {
    // Already exists — switch to it
    try {
      execSync(`git checkout "${branch}"`, { cwd, stdio: 'pipe' })
    } catch (err) {
      throw new Error(
        `Failed to create or switch to branch "${branch}": ${err instanceof Error ? err.message : err}`,
      )
    }
  }
  return branch
}

// ── Plugin ──────────────────────────────────────────────────────────────

let activeProcess: ChildProcess | null = null
let activeBranch: string | null = null

export default function claudeBridge(): Plugin {
  return {
    name: 'claude-bridge',
    apply: 'serve', // dev server only

    configureServer(server: ViteDevServer) {
      const root = server.config.root || process.cwd()

      // ── POST /api/claude/submit ─────────────────────────────────────
      server.middlewares.use('/api/claude/submit', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }

        // Reject if already running
        if (activeProcess) {
          res.statusCode = 409
          res.end(
            JSON.stringify({ error: 'A Claude session is already running. Cancel it first.' }),
          )
          return
        }

        // Check CLI availability
        if (!claudeAvailable()) {
          res.statusCode = 503
          res.end(
            JSON.stringify({
              error:
                'Claude CLI not found. Install it with: npm install -g @anthropic-ai/claude-code',
            }),
          )
          return
        }

        let body: {
          manifest: { explainerSlug: string; tasks: unknown[] }
          prompt: string
          screenshots?: { filename: string; base64: string }[]
          branchPrefix?: string
        }

        try {
          body = JSON.parse(await readBody(req))
        } catch {
          res.statusCode = 400
          res.end(JSON.stringify({ error: 'Invalid JSON body' }))
          return
        }

        // ── Start SSE stream ──────────────────────────────────────────
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'X-Accel-Buffering': 'no', // nginx
        })
        res.flushHeaders()

        const { manifest, prompt, screenshots } = body

        try {
          // 1. Save screenshots ───────────────────────────────────────
          const screenshotDir = join(root, SCREENSHOT_DIR)
          await mkdir(screenshotDir, { recursive: true })

          if (screenshots && screenshots.length > 0) {
            for (const ss of screenshots) {
              const buf = Buffer.from(ss.base64, 'base64')
              await writeFile(join(screenshotDir, ss.filename), buf)
            }
            sse(res, 'status', {
              phase: 'screenshots',
              message: `Saved ${screenshots.length} screenshot(s) to ${SCREENSHOT_DIR}/`,
            })
          }

          // 2. Create git branch ──────────────────────────────────────
          const slug = manifest.explainerSlug || 'explainer'
          const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
          const prefix = body.branchPrefix || 'dev-mode'
          const branchName = `${prefix}/${slug}-${ts}`

          try {
            ensureBranch(branchName, root)
            activeBranch = branchName
            sse(res, 'status', {
              phase: 'branch',
              message: `Created branch: ${branchName}`,
              branch: branchName,
            })
          } catch (err) {
            sse(res, 'error', {
              message: `Git branch error: ${err instanceof Error ? err.message : err}`,
            })
            res.end()
            return
          }

          // 3. Build final prompt ─────────────────────────────────────
          let finalPrompt = prompt
          if (screenshots && screenshots.length > 0) {
            const absDir = join(root, SCREENSHOT_DIR)
            finalPrompt +=
              `\n\n---\nScreenshots of annotated panels are saved in \`${absDir}/\`.\n` +
              `Use the Read tool to view each .png file referenced above before making changes.\n`
          }

          // Add branch instruction
          finalPrompt +=
            `\n\nIMPORTANT: You are working on branch \`${branchName}\`. ` +
            `Commit your changes to this branch when done. Do not switch branches.\n`

          // 4. Spawn Claude CLI ───────────────────────────────────────
          // Pipe prompt via stdin to avoid shell escaping issues
          // (prompt contains backticks, newlines, and special chars
          //  that break when passed as a CLI argument through shell)
          sse(res, 'status', { phase: 'spawn', message: 'Starting Claude Code...' })

          const claude = spawn(
            'claude',
            ['-p', '--output-format', 'stream-json', '--verbose'],
            { cwd: root, env: { ...process.env }, shell: true },
          )
          activeProcess = claude

          // Write the prompt to stdin and close it so Claude reads it
          claude.stdin.write(finalPrompt)
          claude.stdin.end()

          // Buffer partial lines from stdout
          let stdoutBuf = ''

          claude.stdout.on('data', (chunk: Buffer) => {
            stdoutBuf += chunk.toString()
            const lines = stdoutBuf.split('\n')
            // Keep the last (possibly incomplete) line in the buffer
            stdoutBuf = lines.pop() || ''
            for (const line of lines) {
              if (!line.trim()) continue
              try {
                const evt = JSON.parse(line)
                sse(res, 'claude', evt)
              } catch {
                sse(res, 'raw', { text: line })
              }
            }
          })

          claude.stderr.on('data', (chunk: Buffer) => {
            const text = chunk.toString().trim()
            if (text) sse(res, 'stderr', { text })
          })

          claude.on('close', (code) => {
            // Flush any remaining buffer
            if (stdoutBuf.trim()) {
              try {
                sse(res, 'claude', JSON.parse(stdoutBuf))
              } catch {
                sse(res, 'raw', { text: stdoutBuf })
              }
            }
            activeProcess = null
            sse(res, 'done', { code, branch: activeBranch })
            activeBranch = null
            // Clean up screenshots
            rm(screenshotDir, { recursive: true, force: true }).catch(() => {})
            res.end()
          })

          claude.on('error', (err) => {
            activeProcess = null
            sse(res, 'error', { message: `Process error: ${err.message}` })
            res.end()
          })

          // Handle client disconnect
          req.on('close', () => {
            if (activeProcess === claude) {
              claude.kill('SIGTERM')
              activeProcess = null
              activeBranch = null
            }
          })
        } catch (err) {
          sse(res, 'error', {
            message: err instanceof Error ? err.message : String(err),
          })
          res.end()
        }
      })

      // ── POST /api/claude/cancel ────────────────────────────────────
      server.middlewares.use('/api/claude/cancel', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }
        res.setHeader('Content-Type', 'application/json')
        if (activeProcess) {
          activeProcess.kill('SIGTERM')
          activeProcess = null
          const branch = activeBranch
          activeBranch = null
          res.end(JSON.stringify({ cancelled: true, branch }))
        } else {
          res.end(JSON.stringify({ cancelled: false, reason: 'No active session' }))
        }
      })

      // ── GET /api/claude/status ─────────────────────────────────────
      server.middlewares.use('/api/claude/status', (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            running: !!activeProcess,
            branch: activeBranch,
          }),
        )
      })

      // ── Metadata & Voiceover Endpoints ────────────────────────────────

      // GET /api/metadata/{slug}/panel/{panelId} — load panel metadata
      // PATCH /api/metadata/{slug}/panel/{panelId}/voiceover — save voiceover text
      server.middlewares.use('/api/metadata/', async (req, res) => {
        const url = req.url || ''

        // Match: /{slug}/panel/{panelId}/voiceover
        const voiceoverMatch = url.match(
          /^\/?([a-z0-9-]+)\/panel\/([a-z0-9-]+)\/voiceover$/,
        )
        if (voiceoverMatch && req.method === 'PATCH') {
          const [, slug, panelId] = voiceoverMatch
          try {
            const body = JSON.parse(await readBody(req))
            const { voiceover } = body as { voiceover: string }
            if (!voiceover && voiceover !== '') {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Missing voiceover field' }))
              return
            }

            const skillsDir = join(root, '.claude', 'skills', 'short-form-video')
            const { findMetadataPath, updatePanelField } = await import(
              /* @vite-ignore */ 'file:///' + join(skillsDir, 'parse-metadata.js').replace(/\\/g, '/')
            )

            const metaPath = findMetadataPath(slug, root)
            if (!metaPath) {
              res.statusCode = 404
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: `Metadata not found for "${slug}"` }))
              return
            }

            const success = updatePanelField(metaPath, panelId, 'voiceover', voiceover)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success, voiceover }))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                error: err instanceof Error ? err.message : String(err),
              }),
            )
          }
          return
        }

        // Match: /{slug}/panel/{panelId}
        const panelMatch = url.match(/^\/?([a-z0-9-]+)\/panel\/([a-z0-9-]+)$/)
        if (panelMatch && req.method === 'GET') {
          const [, slug, panelId] = panelMatch
          try {
            const skillsDir = join(root, '.claude', 'skills', 'short-form-video')
            const { loadPanelById } = await import(
              /* @vite-ignore */ 'file:///' + join(skillsDir, 'parse-metadata.js').replace(/\\/g, '/')
            )

            const panel = loadPanelById(slug, root, panelId)
            if (!panel) {
              res.statusCode = 404
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: `Panel "${panelId}" not found` }))
              return
            }

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(panel))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                error: err instanceof Error ? err.message : String(err),
              }),
            )
          }
          return
        }

        // No match — pass through
        res.statusCode = 404
        res.end('Not Found')
      })

      // POST /api/voiceover/generate — run LLM refinement via Claude Code CLI
      server.middlewares.use('/api/voiceover/generate', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }

        try {
          const body = JSON.parse(await readBody(req)) as {
            slug: string
            panelId: string
          }

          const skillsDir = join(root, '.claude', 'skills', 'short-form-video')

          const { loadPanelById, loadExplainerMessage } = await import(
            /* @vite-ignore */ 'file:///' + join(skillsDir, 'parse-metadata.js').replace(/\\/g, '/')
          )

          const panel = loadPanelById(body.slug, root, body.panelId)
          if (!panel) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: `Panel "${body.panelId}" not found` }))
            return
          }

          // Check CLI availability
          if (!claudeAvailable()) {
            res.statusCode = 503
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                error:
                  'Claude CLI not found. Install with: npm install -g @anthropic-ai/claude-code',
              }),
            )
            return
          }

          const explainerMessage = loadExplainerMessage(body.slug, root) || ''

          // Build raw text from metadata
          let rawText = panel.message || ''
          if (panel.keyPhrases?.length > 0) {
            rawText += ' ' + panel.keyPhrases.join('. ') + '.'
          }

          // Build the prompt for Claude Code
          const contextParts: string[] = []
          if (explainerMessage) {
            contextParts.push(`Explainer thesis: ${explainerMessage}`)
          }
          contextParts.push(`Panel: "${panel.title || panel.id}"`)
          if (panel.narrativeRole) {
            contextParts.push(`Role in narrative: ${panel.narrativeRole}`)
          }
          if (panel.message) {
            contextParts.push(`Panel message: ${panel.message}`)
          }
          if (panel.keyPhrases?.length > 0) {
            contextParts.push(`Key phrases to preserve: ${panel.keyPhrases.join(', ')}`)
          }
          contextParts.push(
            `\nRaw text from the panel (may contain visual-only content, code, or formatting artifacts):\n---\n${rawText}\n---`,
          )
          contextParts.push(`\nWrite the voiceover narration for this panel:`)

          const systemPrompt =
            `You are a voiceover narration writer for the Dharma Media Campaign — a project that uses scroll-driven web explainers to wake people up to how technology is reshaping consciousness.\n\n` +
            `Your job: rewrite raw panel text into natural spoken narration that a voice actor would read while the viewer scrolls through the panel.\n\n` +
            `Rules:\n` +
            `- Write as if speaking directly to one person ("you", never "one" or "people")\n` +
            `- Keep it concise: 1-4 sentences. Match the amount of content the viewer sees on screen. Don't over-explain.\n` +
            `- Remove things that don't make sense spoken aloud: arrows, bullet point markers, icon labels, chart axis labels, CSS class names, code fragments\n` +
            `- For visual elements the viewer would see (animated charts, counters, images), add a brief spoken description like "Watch the numbers climb" or "See the network spread"\n` +
            `- Preserve key phrases and campaign vocabulary (demons, cybregore, Moloch, hungry ghost, egregore, the sacred)\n` +
            `- Demons are literal beings, not metaphors — never say "like a demon" or "metaphorical demon"\n` +
            `- Bold and provocative — never academic, never hedging, never apologetic\n` +
            `- Second person, present tense: "You scroll through feeds. You think you're choosing."\n` +
            `- The tone should match the panel's narrative role (a "hook" is punchy; "mythology" is reverent; "evidence" is stark)\n` +
            `- If the raw text seems garbled or contains code fragments, use the panel's message and key phrases to write the narration instead\n` +
            `- Return ONLY the voiceover text — no labels, no quotes, no explanation`

          const fullPrompt = systemPrompt + '\n\n' + contextParts.join('\n')

          // Spawn claude -p and pipe the prompt via stdin
          const voiceover = await new Promise<string>((resolve, reject) => {
            const claude = spawn(
              'claude',
              ['-p', '--output-format', 'text'],
              { cwd: root, env: { ...process.env }, shell: true },
            )

            let stdout = ''
            let stderr = ''

            claude.stdout.on('data', (chunk: Buffer) => {
              stdout += chunk.toString()
            })

            claude.stderr.on('data', (chunk: Buffer) => {
              stderr += chunk.toString()
            })

            claude.on('close', (code) => {
              if (code !== 0) {
                reject(
                  new Error(
                    `Claude CLI exited with code ${code}: ${stderr.slice(0, 500)}`,
                  ),
                )
              } else {
                resolve(stdout.trim())
              }
            })

            claude.on('error', reject)

            claude.stdin.write(fullPrompt)
            claude.stdin.end()
          })

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ voiceover }))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: err instanceof Error ? err.message : String(err),
            }),
          )
        }
      })

      // ── Video Generation Endpoints ──────────────────────────────────

      let videoProcess: ChildProcess | null = null

      // POST /api/video/generate — start video generation (SSE stream)
      server.middlewares.use('/api/video/generate', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }

        if (videoProcess) {
          res.statusCode = 409
          res.end(JSON.stringify({ error: 'Video generation already in progress.' }))
          return
        }

        let body: {
          slug: string
          format?: string
          dual?: boolean
          musicPrompt?: string
          voiceId?: string
          panels?: string
          musicVolume?: number
          sfxVolume?: number
          scrollSpeed?: number
          pausePad?: number
          skipVoiceover?: boolean
          skipMusic?: boolean
          reuseVoiceover?: boolean
          reuseMusic?: boolean
        }

        try {
          body = JSON.parse(await readBody(req))
        } catch {
          res.statusCode = 400
          res.end(JSON.stringify({ error: 'Invalid JSON body' }))
          return
        }

        // Start SSE stream
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'X-Accel-Buffering': 'no',
        })
        res.flushHeaders()

        const scriptPath = join(
          root,
          '.claude',
          'skills',
          'short-form-video',
          'create-short-video.js',
        )
        const scriptArgs = [body.slug]

        if (body.dual) scriptArgs.push('--dual')
        else if (body.format) scriptArgs.push('--format', body.format)
        if (body.musicPrompt) scriptArgs.push('--music-prompt', body.musicPrompt)
        if (body.voiceId) scriptArgs.push('--voice', body.voiceId)
        if (body.panels) scriptArgs.push('--panels', body.panels)
        if (body.musicVolume !== undefined)
          scriptArgs.push('--music-volume', String(body.musicVolume))
        if (body.sfxVolume !== undefined)
          scriptArgs.push('--sfx-volume', String(body.sfxVolume))
        if (body.scrollSpeed !== undefined)
          scriptArgs.push('--scroll-speed', String(body.scrollSpeed))
        if (body.pausePad !== undefined)
          scriptArgs.push('--pause-pad', String(body.pausePad))
        if (body.skipVoiceover) scriptArgs.push('--skip-voiceover')
        if (body.skipMusic) scriptArgs.push('--skip-music')
        if (body.reuseVoiceover) scriptArgs.push('--reuse-voiceover')
        if (body.reuseMusic) scriptArgs.push('--reuse-music')

        sse(res, 'status', {
          phase: 'starting',
          message: 'Starting video generation...',
        })

        const child = spawn('node', [scriptPath, ...scriptArgs], {
          cwd: root,
          env: process.env,
        })
        videoProcess = child

        child.stdout.on('data', (chunk: Buffer) => {
          const text = chunk.toString().trim()
          if (text) {
            for (const line of text.split('\n')) {
              sse(res, 'log', { text: line })
            }
          }
        })

        child.stderr.on('data', (chunk: Buffer) => {
          const text = chunk.toString().trim()
          if (text) sse(res, 'error', { text })
        })

        child.on('close', (code) => {
          videoProcess = null
          sse(res, 'done', { code })
          res.end()
        })

        child.on('error', (err) => {
          videoProcess = null
          sse(res, 'error', { message: err.message })
          res.end()
        })

        req.on('close', () => {
          if (videoProcess === child) {
            child.kill('SIGTERM')
            videoProcess = null
          }
        })
      })

      // POST /api/video/cancel — kill running video generation
      server.middlewares.use('/api/video/cancel', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }
        res.setHeader('Content-Type', 'application/json')
        if (videoProcess) {
          videoProcess.kill('SIGTERM')
          videoProcess = null
          res.end(JSON.stringify({ cancelled: true }))
        } else {
          res.end(
            JSON.stringify({ cancelled: false, reason: 'No active generation' }),
          )
        }
      })

      // GET /api/video/status
      server.middlewares.use('/api/video/status', (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ running: !!videoProcess }))
      })
    },
  }
}
