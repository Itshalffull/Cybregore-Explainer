import { useState } from 'react'
import { useDevMode } from './DevModeContext'

interface DevPanelControlsProps {
  panelIndex: number
  panelId: string
  panelTitle: string
}

export default function DevPanelControls({
  panelIndex,
  panelId,
  panelTitle,
}: DevPanelControlsProps) {
  const dev = useDevMode()
  const [expanded, setExpanded] = useState(false)
  if (!dev) return null

  const existing = dev.panelNotes.get(panelIndex)
  const note = existing?.note ?? ''
  const actions = existing?.actions ?? { delete: false, background: false }
  const hasExistingBackground = existing?.hasExistingBackground ?? false
  const backgroundPrompt = existing?.backgroundPrompt ?? ''

  const isDeleting = actions.delete
  const hasContent = note.trim() || isDeleting || actions.background

  const backgroundLabel = hasExistingBackground
    ? 'Regenerate background'
    : 'Add animated background'

  return (
    <div
      className={`dev-panel-controls ${expanded ? 'dev-panel-controls--expanded' : ''}`}
    >
      <button
        className={`dev-panel-header ${hasContent ? 'dev-panel-header--has-content' : ''}`}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="dev-panel-index">#{panelIndex + 1}</span>
        <span className="dev-panel-id" aria-label={panelId}>
          {panelId}
        </span>
        <span className="dev-panel-title">{panelTitle}</span>
        {hasContent && <span className="dev-panel-badge" />}
        <span className="dev-panel-chevron">{'\u25BC'}</span>
      </button>

      {expanded && (
        <div className="dev-panel-body">
          <textarea
            className={`dev-note-input ${isDeleting ? 'dev-note-input--disabled' : ''}`}
            placeholder="Notes for changes to this panel..."
            value={note}
            onChange={(e) =>
              dev.setPanelNote(panelIndex, panelId, e.target.value)
            }
            rows={3}
            disabled={isDeleting}
          />
          <div className="dev-actions">
            <label
              className={`dev-checkbox ${isDeleting ? 'dev-checkbox--checked dev-checkbox--danger' : ''}`}
            >
              <input
                type="checkbox"
                checked={isDeleting}
                onChange={(e) =>
                  dev.setPanelAction(
                    panelIndex,
                    panelId,
                    'delete',
                    e.target.checked,
                  )
                }
              />
              Delete this panel
            </label>

            <label
              className={`dev-checkbox ${actions.background ? 'dev-checkbox--checked' : ''} ${isDeleting ? 'dev-checkbox--disabled' : ''}`}
            >
              <input
                type="checkbox"
                checked={actions.background}
                disabled={isDeleting}
                onChange={(e) =>
                  dev.setPanelAction(
                    panelIndex,
                    panelId,
                    'background',
                    e.target.checked,
                  )
                }
              />
              {backgroundLabel}
            </label>
          </div>

          {actions.background && !isDeleting && (
            <div className="dev-bg-prompt">
              <textarea
                className="dev-note-input"
                placeholder="Describe the background (mood, imagery, colors)..."
                value={backgroundPrompt}
                onChange={(e) =>
                  dev.setBackgroundPrompt(panelIndex, panelId, e.target.value)
                }
                rows={2}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
