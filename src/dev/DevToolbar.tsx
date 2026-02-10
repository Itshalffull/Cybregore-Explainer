import { useState, useCallback } from 'react'
import { useDevMode } from './DevModeContext'
import { buildTaskManifest, buildOrchestratorPrompt } from './orchestrator'
import { capturePanels, downloadBlob, downloadMultiple } from './capture'

interface DevToolbarProps {
  explainerId: string
}

export default function DevToolbar({ explainerId }: DevToolbarProps) {
  const dev = useDevMode()
  const [showPreview, setShowPreview] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [capturing, setCapturing] = useState(false)
  const [captureProgress, setCaptureProgress] = useState('')
  if (!dev) return null

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
   * Submit: capture screenshots of each panel with tasks, then
   * download screenshots + orchestrator markdown.
   */
  const handleSubmit = useCallback(async () => {
    setMenuOpen(false)
    setCapturing(true)
    setCaptureProgress('Preparing...')

    try {
      // Capture screenshots of panels that have tasks
      const screenshots = await capturePanels(
        taskPanelIndices,
        (current, total) => {
          setCaptureProgress(`Capturing panel ${current} of ${total}...`)
        },
      )

      // Build screenshot filename map for the orchestrator prompt
      const screenshotFiles = new Map<number, string>()
      const downloadFiles: { name: string; blob: Blob }[] = []

      for (const [panelIdx, blob] of screenshots) {
        const task = manifest.tasks.find((t) => t.panelIndex === panelIdx)
        const panelId = task?.panelId ?? `panel-${panelIdx}`
        const filename = `screenshot-${panelId}.png`
        screenshotFiles.set(panelIdx, filename)
        downloadFiles.push({ name: filename, blob })
      }

      // Build the orchestrator prompt WITH screenshot references
      const promptWithScreenshots = buildOrchestratorPrompt(
        manifest,
        screenshotFiles,
      )
      const manifestJSON = JSON.stringify(manifest, null, 2)
      const combined = `<!--\nORCHESTRATOR MANIFEST\n${manifestJSON}\n-->\n\n${promptWithScreenshots}`

      setCaptureProgress('Downloading files...')

      // Download orchestrator markdown first
      const mdBlob = new Blob([combined], { type: 'text/markdown' })
      downloadBlob(mdBlob, `orchestrator-tasks-${explainerId}.md`)

      // Then download screenshots with delays
      if (downloadFiles.length > 0) {
        await new Promise((r) => setTimeout(r, 500))
        await downloadMultiple(downloadFiles)
      }

      setCaptureProgress(
        `Done! ${downloadFiles.length} screenshot(s) + manifest downloaded.`,
      )
      setTimeout(() => setCapturing(false), 2000)
    } catch (err) {
      setCaptureProgress(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setTimeout(() => setCapturing(false), 3000)
    }
  }, [manifest, taskPanelIndices, explainerId])

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
        className="dev-toolbar-btn dev-toolbar-btn--primary"
        onClick={handleSubmit}
        disabled={manifest.tasks.length === 0 || capturing}
        title="Capture screenshots and download orchestrator task file"
      >
        {capturing ? 'Capturing...' : `Submit (${manifest.tasks.length})`}
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

      {/* Capture progress overlay */}
      {capturing && (
        <div className="dev-capture-overlay">
          <div className="dev-capture-status">{captureProgress}</div>
        </div>
      )}

      {/* Preview panel */}
      {dev.active && showPreview && (
        <div className="dev-preview-overlay" onClick={() => setShowPreview(false)}>
          <div className="dev-preview-panel" onClick={(e) => e.stopPropagation()}>
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
