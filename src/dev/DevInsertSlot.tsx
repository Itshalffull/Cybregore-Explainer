import { useState } from 'react'
import { useDevMode } from './DevModeContext'
import type { DevInsert } from './types'

const PANEL_TYPES: { value: DevInsert['panelType']; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'visualization', label: 'Visualization' },
  { value: 'interactive', label: 'Interactive' },
  { value: 'mythology', label: 'Mythology' },
  { value: 'hybrid', label: 'Hybrid' },
]

interface DevInsertSlotProps {
  afterIndex: number
}

export default function DevInsertSlot({ afterIndex }: DevInsertSlotProps) {
  const dev = useDevMode()
  const [expanded, setExpanded] = useState(false)
  if (!dev) return null

  const existing = dev.inserts.find((i) => i.afterIndex === afterIndex)

  const handleAdd = () => {
    if (!existing) {
      dev.addInsert({ afterIndex, panelType: 'text', note: '' })
    }
    setExpanded(true)
  }

  const handleRemove = () => {
    dev.removeInsert(afterIndex)
    setExpanded(false)
  }

  return (
    <div className={`dev-insert-slot ${existing ? 'dev-insert-slot--active' : ''}`}>
      {!expanded ? (
        <button className="dev-insert-button" onClick={handleAdd}>
          <span className="dev-insert-icon">+</span>
          <span className="dev-insert-label">
            {existing ? 'Edit new panel' : 'Add panel here'}
          </span>
        </button>
      ) : (
        <div className="dev-insert-form">
          <div className="dev-insert-form-header">
            <span>Insert panel after #{afterIndex + 1}</span>
            <button className="dev-insert-close" onClick={() => setExpanded(false)}>
              Done
            </button>
          </div>
          <div className="dev-insert-type-row">
            {PANEL_TYPES.map(({ value, label }) => (
              <button
                key={value}
                className={`dev-type-button ${
                  (existing?.panelType ?? 'text') === value
                    ? 'dev-type-button--active'
                    : ''
                }`}
                onClick={() => dev.updateInsert(afterIndex, { panelType: value })}
              >
                {label}
              </button>
            ))}
          </div>
          <textarea
            className="dev-note-input"
            placeholder="Describe what this new panel should contain..."
            value={existing?.note ?? ''}
            onChange={(e) => dev.updateInsert(afterIndex, { note: e.target.value })}
            rows={3}
          />
          <button className="dev-insert-remove" onClick={handleRemove}>
            Remove insert
          </button>
        </div>
      )}
    </div>
  )
}
