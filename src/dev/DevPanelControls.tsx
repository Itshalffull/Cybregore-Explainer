import { useState } from 'react'
import { useDevMode } from './DevModeContext'
import type { PanelActions } from './types'

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
  const actions = existing?.actions ?? {
    delete: false,
    regenerate: false,
    addBackground: false,
  }

  const hasContent =
    note.trim() || actions.delete || actions.regenerate || actions.addBackground

  return (
    <div className={`dev-panel-controls ${expanded ? 'dev-panel-controls--expanded' : ''}`}>
      <button
        className={`dev-panel-header ${hasContent ? 'dev-panel-header--has-content' : ''}`}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="dev-panel-index">#{panelIndex + 1}</span>
        <span className="dev-panel-id" aria-label={panelId}>{panelId}</span>
        <span className="dev-panel-title">{panelTitle}</span>
        {hasContent && <span className="dev-panel-badge">*</span>}
        <span className="dev-panel-chevron">{expanded ? '\u25B2' : '\u25BC'}</span>
      </button>

      {expanded && (
        <div className="dev-panel-body">
          <textarea
            className="dev-note-input"
            placeholder="Notes for changes to this panel..."
            value={note}
            onChange={(e) => dev.setPanelNote(panelIndex, panelId, e.target.value)}
            rows={3}
          />
          <div className="dev-actions">
            {(
              [
                ['delete', 'Delete this panel'],
                ['regenerate', 'Regenerate panel'],
                ['addBackground', 'Add animated background'],
              ] as [keyof PanelActions, string][]
            ).map(([key, label]) => (
              <label key={key} className={`dev-checkbox ${actions[key] ? 'dev-checkbox--checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={actions[key]}
                  onChange={(e) =>
                    dev.setPanelAction(panelIndex, panelId, key, e.target.checked)
                  }
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
