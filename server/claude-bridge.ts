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
    },
  }
}
