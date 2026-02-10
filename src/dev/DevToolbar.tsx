import { useState, useCallback } from 'react'
import { useDevMode } from './DevModeContext'
import { buildTaskManifest, buildOrchestratorPrompt } from './orchestrator'

interface DevToolbarProps {
  explainerId: string
}

export default function DevToolbar({ explainerId }: DevToolbarProps) {
  const dev = useDevMode()
  const [showPreview, setShowPreview] = useState(false)
  const [copied, setCopied] = useState(false)
  if (!dev) return null

  const manifest = buildTaskManifest(explainerId, dev.panelNotes, dev.inserts)
  const prompt = buildOrchestratorPrompt(manifest)

  const handleExportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(manifest, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dev-tasks-${explainerId}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [manifest, explainerId])

  const handleCopyPrompt = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: select text in preview
      setShowPreview(true)
    }
  }, [prompt])

  const handleWriteManifest = useCallback(async () => {
    // Write the manifest JSON to a file in the project for the orchestrator to pick up
    const manifestJSON = JSON.stringify(manifest, null, 2)
    const orchestratorPrompt = prompt

    // Create a combined output that the orchestrator can read
    const combined = `<!--\nORCHESTRATOR MANIFEST\n${manifestJSON}\n-->\n\n${orchestratorPrompt}`

    const blob = new Blob([combined], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orchestrator-tasks-${explainerId}.md`
    a.click()
    URL.revokeObjectURL(url)
  }, [manifest, prompt, explainerId])

  return (
    <>
      {/* Fixed toolbar */}
      <div className={`dev-toolbar ${dev.active ? 'dev-toolbar--active' : ''}`}>
        <button
          className="dev-toolbar-toggle"
          onClick={dev.toggle}
          title={dev.active ? 'Hide dev controls' : 'Show dev controls'}
        >
          {dev.active ? 'DEV' : 'DEV'}
        </button>

        {dev.active && (
          <>
            {dev.pendingCount > 0 && (
              <span className="dev-toolbar-count">{dev.pendingCount}</span>
            )}

            <button
              className="dev-toolbar-btn"
              onClick={() => setShowPreview(!showPreview)}
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
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>

            <button
              className="dev-toolbar-btn"
              onClick={handleExportJSON}
              disabled={manifest.tasks.length === 0}
              title="Download task manifest as JSON"
            >
              Export JSON
            </button>

            <button
              className="dev-toolbar-btn dev-toolbar-btn--primary"
              onClick={handleWriteManifest}
              disabled={manifest.tasks.length === 0}
              title="Download orchestrator task file"
            >
              Submit ({manifest.tasks.length})
            </button>

            <button
              className="dev-toolbar-btn dev-toolbar-btn--danger"
              onClick={dev.clearAll}
              disabled={dev.pendingCount === 0}
              title="Clear all notes and inserts"
            >
              Clear
            </button>
          </>
        )}
      </div>

      {/* Preview panel */}
      {dev.active && showPreview && (
        <div className="dev-preview-overlay" onClick={() => setShowPreview(false)}>
          <div className="dev-preview-panel" onClick={(e) => e.stopPropagation()}>
            <div className="dev-preview-header">
              <span>Orchestrator Prompt Preview</span>
              <button onClick={() => setShowPreview(false)}>&times;</button>
            </div>
            <pre className="dev-preview-content">
              {manifest.tasks.length > 0
                ? prompt
                : 'No tasks yet. Add notes to panels or insert new panels.'}
            </pre>
          </div>
        </div>
      )}
    </>
  )
}
