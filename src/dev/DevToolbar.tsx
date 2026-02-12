import { useState, useCallback, useRef, useEffect } from 'react'
import { useDevMode } from './DevModeContext'
import { buildTaskManifest, buildOrchestratorPrompt } from './orchestrator'
import { capturePanels, downloadBlob, downloadMultiple } from './capture'
import {
  submitToClaude,
  cancelClaude,
  blobToBase64,
  type ScreenshotPayload,
} from './claudeClient'

interface DevToolbarProps {
  explainerId: string
}

/**
 * Extract a human-readable message from a Claude stream-json event.
 * These events vary by type; we pull out the most useful text.
 */
function extractClaudeMessage(data: Record<string, unknown>): string | null {
  // assistant text content
  if (data.type === 'assistant' && data.message) {
    const msg = data.message as { content?: { type: string; text?: string }[] }
    const texts = msg.content
      ?.filter((c) => c.type === 'text' && c.text)
      .map((c) => c.text!)
    if (texts?.length) return texts.join('\n')
  }
  // result event
  if (data.type === 'result' && typeof data.result === 'string') {
    return data.result
  }
  // tool_use events
  if (data.type === 'assistant' && data.message) {
    const msg = data.message as { content?: { type: string; name?: string }[] }
    const tools = msg.content?.filter((c) => c.type === 'tool_use')
    if (tools?.length) {
      return tools.map((t) => `Using tool: ${t.name}`).join(', ')
    }
  }
  return null
}

// ── Video generation types ──────────────────────────────────────────────────

interface VideoConfig {
  format: '9:16' | '16:9'
  dual: boolean
  musicPrompt: string
  reuseVoiceover: boolean
  reuseMusic: boolean
}

interface VideoLogEntry {
  key: number
  text: string
  type: 'log' | 'error' | 'status'
}

type VideoPhase = 'idle' | 'running' | 'done' | 'error'

export default function DevToolbar({ explainerId }: DevToolbarProps) {
  const dev = useDevMode()
  const [showPreview, setShowPreview] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [capturing, setCapturing] = useState(false)
  const [captureProgress, setCaptureProgress] = useState('')
  const [showClaudePanel, setShowClaudePanel] = useState(false)
  const logEndRef = useRef<HTMLDivElement>(null)

  // Video generation state
  const [showVideoPanel, setShowVideoPanel] = useState(false)
  const [videoPhase, setVideoPhase] = useState<VideoPhase>('idle')
  const [videoLog, setVideoLog] = useState<VideoLogEntry[]>([])
  const [videoStatus, setVideoStatus] = useState('')
  const [videoConfig, setVideoConfig] = useState<VideoConfig>({
    format: '9:16',
    dual: false,
    musicPrompt: 'Dark ambient electronic, minimal, meditative, deep bass drone, cinematic tension',
    reuseVoiceover: false,
    reuseMusic: false,
  })
  const videoLogEndRef = useRef<HTMLDivElement>(null)

  if (!dev) return null

  const { claudeSession } = dev
  const isClaudeActive =
    claudeSession.phase === 'capturing' ||
    claudeSession.phase === 'submitting' ||
    claudeSession.phase === 'running'

  const isVideoActive = videoPhase === 'running'

  // Auto-scroll the log panels
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [claudeSession.log.length])

  useEffect(() => {
    videoLogEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [videoLog.length])

  const manifest = buildTaskManifest(explainerId, dev.panelNotes, dev.inserts)
  // Preview prompt without screenshots (screenshots added during submit)
  const previewPrompt = buildOrchestratorPrompt(manifest)

  /** Collect unique panel indices that have tasks (for screenshot capture) */
  const taskPanelIndices = Array.from(
    new Set(
      manifest.tasks
        .map((t) => t.panelIndex)
        .filter((idx): idx is number => idx !== undefined),
    ),
  )

  const handleExportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(manifest, null, 2)], {
      type: 'application/json',
    })
    downloadBlob(blob, `dev-tasks-${explainerId}-${Date.now()}.json`)
    setMenuOpen(false)
  }, [manifest, explainerId])

  const handleCopyPrompt = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(previewPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setShowPreview(true)
    }
    setMenuOpen(false)
  }, [previewPrompt])

  /**
   * Export: capture screenshots of each panel with tasks, then
   * download screenshots + orchestrator markdown (legacy flow).
   */
  const handleExport = useCallback(async () => {
    setMenuOpen(false)
    setCapturing(true)
    setCaptureProgress('Preparing...')

    try {
      const screenshots = await capturePanels(
        taskPanelIndices,
        (current, total) => {
          setCaptureProgress(`Capturing panel ${current} of ${total}...`)
        },
      )

      const screenshotFiles = new Map<number, string>()
      const downloadFiles: { name: string; blob: Blob }[] = []

      for (const [panelIdx, blob] of screenshots) {
        const task = manifest.tasks.find((t) => t.panelIndex === panelIdx)
        const panelId = task?.panelId ?? `panel-${panelIdx}`
        const filename = `screenshot-${panelId}.png`
        screenshotFiles.set(panelIdx, filename)
        downloadFiles.push({ name: filename, blob })
      }

      const promptWithScreenshots = buildOrchestratorPrompt(
        manifest,
        screenshotFiles,
      )
      const manifestJSON = JSON.stringify(manifest, null, 2)
      const combined = `<!--\nORCHESTRATOR MANIFEST\n${manifestJSON}\n-->\n\n${promptWithScreenshots}`

      setCaptureProgress('Downloading files...')

      const mdBlob = new Blob([combined], { type: 'text/markdown' })
      downloadBlob(mdBlob, `orchestrator-tasks-${explainerId}.md`)

      if (downloadFiles.length > 0) {
        await new Promise((r) => setTimeout(r, 500))
        await downloadMultiple(downloadFiles)
      }

      setCaptureProgress(
        `Done! ${downloadFiles.length} screenshot(s) + manifest downloaded.`,
      )
      setTimeout(() => setCapturing(false), 2000)
    } catch (err) {
      setCaptureProgress(
        `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      )
      setTimeout(() => setCapturing(false), 3000)
    }
  }, [manifest, taskPanelIndices, explainerId])

  /**
   * Send to Claude: capture screenshots, then POST to the local
   * Claude bridge and stream results into the log panel.
   */
  const handleSendToClaude = useCallback(async () => {
    setMenuOpen(false)
    setShowClaudePanel(true)
    dev.setClaudePhase('capturing', 'Capturing panel screenshots...')

    try {
      // 1. Capture screenshots
      const screenshotBlobs = await capturePanels(
        taskPanelIndices,
        (current, total) => {
          dev.setClaudePhase(
            'capturing',
            `Capturing panel ${current} of ${total}...`,
          )
        },
      )

      // 2. Convert to base64 payloads
      const screenshotFiles = new Map<number, string>()
      const screenshotPayloads: ScreenshotPayload[] = []

      for (const [panelIdx, blob] of screenshotBlobs) {
        const task = manifest.tasks.find((t) => t.panelIndex === panelIdx)
        const panelId = task?.panelId ?? `panel-${panelIdx}`
        const filename = `screenshot-${panelId}.png`
        screenshotFiles.set(panelIdx, filename)
        const base64 = await blobToBase64(blob)
        screenshotPayloads.push({ filename, base64 })
      }

      // 3. Build prompt with screenshot references
      const prompt = buildOrchestratorPrompt(manifest, screenshotFiles)

      // 4. Submit to Claude bridge
      dev.setClaudePhase('submitting', 'Sending to Claude Code...')

      await submitToClaude({
        manifest,
        prompt,
        screenshots: screenshotPayloads,
        onEvent: (event) => {
          dev.appendClaudeLog(event)

          // Update phase/status based on event type
          if (event.type === 'status') {
            const msg =
              (event.data.message as string) || 'Working...'
            const phase = event.data.phase as string
            if (phase === 'branch' && event.data.branch) {
              dev.setClaudeBranch(event.data.branch as string)
            }
            if (phase === 'spawn') {
              dev.setClaudePhase('running', msg)
            } else {
              dev.setClaudePhase(
                dev.claudeSession.phase === 'running'
                  ? 'running'
                  : 'submitting',
                msg,
              )
            }
          } else if (event.type === 'claude') {
            const text = extractClaudeMessage(event.data)
            if (text) {
              dev.setClaudePhase(
                'running',
                text.length > 120 ? text.slice(0, 120) + '...' : text,
              )
            }
          } else if (event.type === 'done') {
            const code = event.data.code as number | null
            if (code !== null) dev.setClaudeExitCode(code)
            dev.setClaudePhase(
              code === 0 ? 'done' : 'error',
              code === 0
                ? 'Claude finished successfully.'
                : `Claude exited with code ${code}.`,
            )
          } else if (event.type === 'error') {
            dev.setClaudePhase(
              'error',
              (event.data.message as string) || 'An error occurred.',
            )
          }
        },
      })
    } catch (err) {
      dev.setClaudePhase(
        'error',
        err instanceof Error ? err.message : 'Failed to reach Claude bridge.',
      )
    }
  }, [manifest, taskPanelIndices, dev])

  const handleCancelClaude = useCallback(async () => {
    try {
      await cancelClaude()
      dev.setClaudePhase('cancelled', 'Session cancelled.')
    } catch {
      dev.setClaudePhase('error', 'Failed to cancel session.')
    }
  }, [dev])

  // ── Video generation handlers ─────────────────────────────────────────

  const handleGenerateVideo = useCallback(async () => {
    setMenuOpen(false)
    setShowVideoPanel(true)
    setVideoPhase('running')
    setVideoLog([])
    setVideoStatus('Starting video generation...')

    let logIdx = 0

    try {
      const res = await fetch('/api/video/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: explainerId,
          format: videoConfig.format,
          dual: videoConfig.dual,
          musicPrompt: videoConfig.musicPrompt,
          reuseVoiceover: videoConfig.reuseVoiceover,
          reuseMusic: videoConfig.reuseMusic,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || `HTTP ${res.status}`)
      }

      // Parse SSE stream
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        let currentEvent = ''
        for (const line of lines) {
          if (line.startsWith('event: ')) {
            currentEvent = line.slice(7)
          } else if (line.startsWith('data: ') && currentEvent) {
            try {
              const data = JSON.parse(line.slice(6))
              const idx = logIdx++

              if (currentEvent === 'log') {
                setVideoLog((prev) => [
                  ...prev,
                  { key: idx, text: data.text, type: 'log' },
                ])
                setVideoStatus(data.text)
              } else if (currentEvent === 'error') {
                setVideoLog((prev) => [
                  ...prev,
                  { key: idx, text: data.text || data.message || 'Error', type: 'error' },
                ])
              } else if (currentEvent === 'status') {
                setVideoLog((prev) => [
                  ...prev,
                  { key: idx, text: data.message, type: 'status' },
                ])
                setVideoStatus(data.message)
              } else if (currentEvent === 'done') {
                setVideoPhase(data.code === 0 ? 'done' : 'error')
                setVideoStatus(
                  data.code === 0
                    ? 'Video generation complete!'
                    : `Generation failed (exit code ${data.code})`,
                )
              }
            } catch {
              // ignore parse errors
            }
            currentEvent = ''
          }
        }
      }
    } catch (err) {
      setVideoPhase('error')
      setVideoStatus(err instanceof Error ? err.message : 'Failed to start video generation.')
    }
  }, [explainerId, videoConfig])

  const handleCancelVideo = useCallback(async () => {
    try {
      await fetch('/api/video/cancel', { method: 'POST' })
      setVideoPhase('error')
      setVideoStatus('Generation cancelled.')
    } catch {
      setVideoStatus('Failed to cancel.')
    }
  }, [])

  const actionButtons = (
    <>
      <button
        className="dev-toolbar-btn"
        onClick={() => {
          setShowPreview(!showPreview)
          setMenuOpen(false)
        }}
        title="Preview orchestrator prompt"
      >
        Preview
      </button>

      <button
        className="dev-toolbar-btn"
        onClick={handleCopyPrompt}
        disabled={manifest.tasks.length === 0}
        title="Copy orchestrator prompt to clipboard"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>

      <button
        className="dev-toolbar-btn"
        onClick={handleExportJSON}
        disabled={manifest.tasks.length === 0}
        title="Download task manifest as JSON"
      >
        JSON
      </button>

      <button
        className="dev-toolbar-btn"
        onClick={handleExport}
        disabled={manifest.tasks.length === 0 || capturing}
        title="Download orchestrator markdown + screenshots"
      >
        {capturing ? 'Exporting...' : 'Export'}
      </button>

      <button
        className="dev-toolbar-btn dev-toolbar-btn--video"
        onClick={() => {
          setShowVideoPanel(true)
          setMenuOpen(false)
        }}
        disabled={isVideoActive}
        title="Generate short-form video from this explainer"
      >
        {isVideoActive ? 'Recording...' : 'Video'}
      </button>

      <button
        className="dev-toolbar-btn dev-toolbar-btn--primary"
        onClick={handleSendToClaude}
        disabled={manifest.tasks.length === 0 || isClaudeActive}
        title="Send tasks to local Claude Code (creates a new branch)"
      >
        {isClaudeActive
          ? 'Running...'
          : `Run (${manifest.tasks.length})`}
      </button>

      <button
        className="dev-toolbar-btn dev-toolbar-btn--danger"
        onClick={() => {
          dev.clearAll()
          setMenuOpen(false)
        }}
        disabled={dev.pendingCount === 0}
        title="Clear all notes and inserts"
      >
        Clear
      </button>
    </>
  )

  // Build readable log entries for the Claude panel
  const logEntries: { key: number; text: string; type: string }[] = []
  claudeSession.log.forEach((evt, i) => {
    if (evt.type === 'status') {
      logEntries.push({
        key: i,
        text: (evt.data.message as string) || JSON.stringify(evt.data),
        type: 'status',
      })
    } else if (evt.type === 'claude') {
      const msg = extractClaudeMessage(evt.data)
      if (msg) logEntries.push({ key: i, text: msg, type: 'claude' })
    } else if (evt.type === 'error' || evt.type === 'stderr') {
      const text = (evt.data.message || evt.data.text) as string
      if (text) logEntries.push({ key: i, text, type: 'error' })
    } else if (evt.type === 'done') {
      logEntries.push({
        key: i,
        text: `Process exited with code ${evt.data.code ?? '?'}`,
        type: evt.data.code === 0 ? 'status' : 'error',
      })
    } else if (evt.type === 'raw') {
      const text = evt.data.text as string
      if (text) logEntries.push({ key: i, text, type: 'raw' })
    }
  })

  return (
    <>
      {/* Fixed toolbar */}
      <div className={`dev-toolbar ${dev.active ? 'dev-toolbar--active' : ''}`}>
        <button
          className="dev-toolbar-toggle"
          onClick={dev.toggle}
          title={dev.active ? 'Hide dev controls' : 'Show dev controls'}
        >
          DEV
        </button>

        {dev.active && (
          <>
            {dev.pendingCount > 0 && (
              <span className="dev-toolbar-count">{dev.pendingCount}</span>
            )}

            {/* Desktop: inline buttons */}
            <div className="dev-toolbar-actions">{actionButtons}</div>

            {/* Mobile: hamburger menu */}
            <button
              className="dev-toolbar-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              title="Menu"
            >
              {menuOpen ? '\u2715' : '\u2630'}
            </button>
          </>
        )}

        {/* Claude session indicator (visible even when toolbar collapsed) */}
        {isClaudeActive && (
          <button
            className="dev-toolbar-claude-indicator"
            onClick={() => setShowClaudePanel(true)}
            title="Claude Code is running — click to view"
          >
            &bull; CLAUDE
          </button>
        )}

        {/* Video generation indicator */}
        {isVideoActive && (
          <button
            className="dev-toolbar-video-indicator"
            onClick={() => setShowVideoPanel(true)}
            title="Video generation in progress — click to view"
          >
            &bull; VIDEO
          </button>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {dev.active && menuOpen && (
        <div
          className="dev-toolbar-dropdown"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMenuOpen(false)
          }}
        >
          <div className="dev-toolbar-dropdown-inner">{actionButtons}</div>
        </div>
      )}

      {/* Capture progress overlay (legacy export) */}
      {capturing && (
        <div className="dev-capture-overlay">
          <div className="dev-capture-status">{captureProgress}</div>
        </div>
      )}

      {/* Claude session panel */}
      {showClaudePanel && claudeSession.phase !== 'idle' && (
        <div
          className="dev-claude-overlay"
          onClick={() => {
            // Only allow closing if not actively running
            if (!isClaudeActive) setShowClaudePanel(false)
          }}
        >
          <div
            className="dev-claude-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dev-claude-header">
              <div className="dev-claude-header-left">
                <span
                  className={`dev-claude-dot dev-claude-dot--${claudeSession.phase}`}
                />
                <span className="dev-claude-title">Claude Code</span>
                {claudeSession.branch && (
                  <span className="dev-claude-branch">
                    {claudeSession.branch}
                  </span>
                )}
              </div>
              <div className="dev-claude-header-right">
                {isClaudeActive && (
                  <button
                    className="dev-toolbar-btn dev-toolbar-btn--danger dev-toolbar-btn--sm"
                    onClick={handleCancelClaude}
                  >
                    Cancel
                  </button>
                )}
                {!isClaudeActive && (
                  <button
                    className="dev-claude-close"
                    onClick={() => {
                      setShowClaudePanel(false)
                      dev.resetClaudeSession()
                    }}
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            <div className="dev-claude-status">
              {claudeSession.statusMessage}
            </div>

            <div className="dev-claude-log">
              {logEntries.map((entry) => (
                <div
                  key={entry.key}
                  className={`dev-claude-log-entry dev-claude-log-entry--${entry.type}`}
                >
                  {entry.text}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>

            {claudeSession.phase === 'done' && (
              <div className="dev-claude-footer">
                Changes committed to{' '}
                <strong>{claudeSession.branch}</strong>. Vite will hot-reload
                modified files.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Video generation panel */}
      {showVideoPanel && (
        <div
          className="dev-claude-overlay"
          onClick={() => {
            if (!isVideoActive) setShowVideoPanel(false)
          }}
        >
          <div
            className="dev-claude-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dev-claude-header">
              <div className="dev-claude-header-left">
                <span
                  className={`dev-claude-dot dev-claude-dot--${
                    videoPhase === 'running'
                      ? 'running'
                      : videoPhase === 'done'
                        ? 'done'
                        : videoPhase === 'error'
                          ? 'error'
                          : 'cancelled'
                  }`}
                />
                <span className="dev-claude-title">Video Generator</span>
              </div>
              <div className="dev-claude-header-right">
                {isVideoActive && (
                  <button
                    className="dev-toolbar-btn dev-toolbar-btn--danger dev-toolbar-btn--sm"
                    onClick={handleCancelVideo}
                  >
                    Cancel
                  </button>
                )}
                {!isVideoActive && (
                  <button
                    className="dev-claude-close"
                    onClick={() => {
                      setShowVideoPanel(false)
                      if (videoPhase !== 'idle') {
                        setVideoPhase('idle')
                        setVideoLog([])
                      }
                    }}
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Config form (visible when idle) */}
            {videoPhase === 'idle' && (
              <div className="dev-video-config">
                <div className="dev-video-config-row">
                  <label className="dev-video-label">Format</label>
                  <div className="dev-insert-type-row">
                    <button
                      className={`dev-type-button ${
                        !videoConfig.dual && videoConfig.format === '9:16'
                          ? 'dev-type-button--active'
                          : ''
                      }`}
                      onClick={() =>
                        setVideoConfig((c) => ({ ...c, format: '9:16', dual: false }))
                      }
                    >
                      9:16
                    </button>
                    <button
                      className={`dev-type-button ${
                        !videoConfig.dual && videoConfig.format === '16:9'
                          ? 'dev-type-button--active'
                          : ''
                      }`}
                      onClick={() =>
                        setVideoConfig((c) => ({ ...c, format: '16:9', dual: false }))
                      }
                    >
                      16:9
                    </button>
                    <button
                      className={`dev-type-button ${
                        videoConfig.dual ? 'dev-type-button--active' : ''
                      }`}
                      onClick={() =>
                        setVideoConfig((c) => ({ ...c, dual: !c.dual }))
                      }
                    >
                      Both
                    </button>
                  </div>
                </div>

                <div className="dev-video-config-row">
                  <label className="dev-video-label">Music Prompt</label>
                  <textarea
                    className="dev-note-input"
                    rows={2}
                    value={videoConfig.musicPrompt}
                    onChange={(e) =>
                      setVideoConfig((c) => ({ ...c, musicPrompt: e.target.value }))
                    }
                    placeholder="Background music description..."
                  />
                </div>

                <div className="dev-video-config-row">
                  <label
                    className={`dev-checkbox ${
                      videoConfig.reuseVoiceover ? 'dev-checkbox--checked' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={videoConfig.reuseVoiceover}
                      onChange={(e) =>
                        setVideoConfig((c) => ({
                          ...c,
                          reuseVoiceover: e.target.checked,
                        }))
                      }
                    />
                    Reuse existing voiceover
                  </label>
                  <label
                    className={`dev-checkbox ${
                      videoConfig.reuseMusic ? 'dev-checkbox--checked' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={videoConfig.reuseMusic}
                      onChange={(e) =>
                        setVideoConfig((c) => ({
                          ...c,
                          reuseMusic: e.target.checked,
                        }))
                      }
                    />
                    Reuse existing music
                  </label>
                </div>

                <button
                  className="dev-toolbar-btn dev-toolbar-btn--primary"
                  style={{ width: '100%', marginTop: '8px' }}
                  onClick={handleGenerateVideo}
                >
                  Generate Video
                </button>
              </div>
            )}

            {/* Status + log (visible when running/done/error) */}
            {videoPhase !== 'idle' && (
              <>
                <div className="dev-claude-status">{videoStatus}</div>
                <div className="dev-claude-log">
                  {videoLog.map((entry) => (
                    <div
                      key={entry.key}
                      className={`dev-claude-log-entry dev-claude-log-entry--${entry.type}`}
                    >
                      {entry.text}
                    </div>
                  ))}
                  <div ref={videoLogEndRef} />
                </div>

                {videoPhase === 'done' && (
                  <div className="dev-claude-footer">
                    Video saved to <strong>output/</strong> directory.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Preview panel */}
      {dev.active && showPreview && (
        <div
          className="dev-preview-overlay"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="dev-preview-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dev-preview-header">
              <span>Orchestrator Preview</span>
              <button onClick={() => setShowPreview(false)}>&times;</button>
            </div>
            <pre className="dev-preview-content">
              {manifest.tasks.length > 0
                ? previewPrompt
                : 'No tasks yet. Add notes to panels or insert new panels.'}
            </pre>
          </div>
        </div>
      )}
    </>
  )
}
