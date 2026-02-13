import { useState, useEffect, useRef, useCallback } from 'react'
import { useDevMode } from './DevModeContext'

interface DevPanelControlsProps {
  panelIndex: number
  panelId: string
  panelTitle: string
  explainerId: string
}

export default function DevPanelControls({
  panelIndex,
  panelId,
  panelTitle,
  explainerId,
}: DevPanelControlsProps) {
  const dev = useDevMode()
  const [expanded, setExpanded] = useState(false)
  const wasExpandedRef = useRef(false)
  if (!dev) return null

  const existing = dev.panelNotes.get(panelIndex)
  const note = existing?.note ?? ''
  const actions = existing?.actions ?? { delete: false, background: false, sfx: false }
  const hasExistingBackground = existing?.hasExistingBackground ?? false
  const backgroundPrompt = existing?.backgroundPrompt ?? ''
  const hasExistingSfx = existing?.hasExistingSfx ?? false
  const sfxPrompt = existing?.sfxPrompt ?? ''

  // Voiceover state
  const voiceoverText = existing?.voiceoverText ?? ''
  const voiceoverLoaded = existing?.voiceoverLoaded ?? false
  const voiceoverGenerating = existing?.voiceoverGenerating ?? false
  const voiceoverDirty = existing?.voiceoverDirty ?? false
  const voiceoverAudioExists = existing?.voiceoverAudioExists ?? false

  const isDeleting = actions.delete
  const hasContent = note.trim() || isDeleting || actions.background || actions.sfx

  const backgroundLabel = hasExistingBackground
    ? 'Regenerate background'
    : 'Add animated background'

  const sfxLabel = hasExistingSfx
    ? 'Regenerate background SFX'
    : 'Add background SFX'

  // Lazy-load voiceover text from API on first expand
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!expanded || voiceoverLoaded) return
    wasExpandedRef.current = true

    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(
          `/api/metadata/${encodeURIComponent(explainerId)}/panel/${encodeURIComponent(panelId)}`,
        )
        if (!res.ok || cancelled) return
        const data = await res.json()
        if (cancelled) return
        if (data.voiceover) {
          dev.setVoiceoverText(panelIndex, panelId, data.voiceover)
        }
        // Check if audio file exists
        try {
          const audioRes = await fetch(
            `/assets/audio/voiceover/voiceover-${panelId}.mp3`,
            { method: 'HEAD' },
          )
          if (!cancelled) {
            dev.setVoiceoverAudioExists(panelIndex, audioRes.ok)
          }
        } catch {
          // Audio check failed — not critical
        }
      } catch {
        // Metadata fetch failed — not critical
      } finally {
        if (!cancelled) {
          dev.setVoiceoverLoaded(panelIndex, true)
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [expanded]) // eslint-disable-line react-hooks/exhaustive-deps

  // Generate voiceover via LLM
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleGenerate = useCallback(async () => {
    dev.setVoiceoverGenerating(panelIndex, true)
    try {
      const res = await fetch('/api/voiceover/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: explainerId, panelId }),
      })
      if (!res.ok) {
        const err = await res.text()
        console.error('Voiceover generate failed:', err)
        return
      }
      const data = await res.json()
      if (data.voiceover) {
        dev.setVoiceoverText(panelIndex, panelId, data.voiceover)
        dev.setVoiceoverDirty(panelIndex, true)
      }
    } catch (err) {
      console.error('Voiceover generate error:', err)
    } finally {
      dev.setVoiceoverGenerating(panelIndex, false)
    }
  }, [dev, panelIndex, panelId, explainerId])

  // Save voiceover text to metadata
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleSave = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/metadata/${encodeURIComponent(explainerId)}/panel/${encodeURIComponent(panelId)}/voiceover`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ voiceover: voiceoverText }),
        },
      )
      if (!res.ok) {
        const err = await res.text()
        console.error('Voiceover save failed:', err)
        return
      }
      dev.setVoiceoverDirty(panelIndex, false)
    } catch (err) {
      console.error('Voiceover save error:', err)
    }
  }, [dev, panelIndex, panelId, explainerId, voiceoverText])

  // Play voiceover audio
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handlePlay = useCallback(() => {
    const audio = new Audio(
      `/assets/audio/voiceover/voiceover-${panelId}.mp3`,
    )
    audio.play().catch((err) => console.error('Voiceover play error:', err))
  }, [panelId])

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

            <label
              className={`dev-checkbox ${actions.sfx ? 'dev-checkbox--checked' : ''} ${isDeleting ? 'dev-checkbox--disabled' : ''}`}
            >
              <input
                type="checkbox"
                checked={actions.sfx}
                disabled={isDeleting}
                onChange={(e) =>
                  dev.setPanelAction(
                    panelIndex,
                    panelId,
                    'sfx',
                    e.target.checked,
                  )
                }
              />
              {sfxLabel}
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

          {actions.sfx && !isDeleting && (
            <div className="dev-bg-prompt">
              <textarea
                className="dev-note-input"
                placeholder="Describe the ambient sound (environment, texture, mood)..."
                value={sfxPrompt}
                onChange={(e) =>
                  dev.setSfxPrompt(panelIndex, panelId, e.target.value)
                }
                rows={2}
              />
            </div>
          )}

          {/* ── Voiceover Section ────────────────────────────────────── */}
          {!isDeleting && (
            <div className="dev-voiceover-section">
              <div className="dev-voiceover-header">
                <span className="dev-voiceover-label">Voiceover</span>
                <div className="dev-voiceover-actions">
                  <button
                    className="dev-voiceover-btn"
                    onClick={handleGenerate}
                    disabled={voiceoverGenerating}
                    title="Generate voiceover text using AI"
                  >
                    {voiceoverGenerating ? 'Generating...' : 'Generate'}
                  </button>
                  <button
                    className="dev-voiceover-btn dev-voiceover-btn--save"
                    onClick={handleSave}
                    disabled={!voiceoverDirty || !voiceoverText.trim()}
                    title="Save voiceover to metadata file"
                  >
                    Save
                  </button>
                  {voiceoverAudioExists && (
                    <button
                      className="dev-voiceover-btn dev-voiceover-btn--play"
                      onClick={handlePlay}
                      title="Play voiceover audio"
                    >
                      Play
                    </button>
                  )}
                </div>
              </div>
              <textarea
                className="dev-note-input dev-voiceover-textarea"
                placeholder={
                  voiceoverLoaded
                    ? 'No voiceover text yet. Click Generate to create one...'
                    : 'Loading voiceover...'
                }
                value={voiceoverText}
                onChange={(e) => {
                  dev.setVoiceoverText(panelIndex, panelId, e.target.value)
                  dev.setVoiceoverDirty(panelIndex, true)
                }}
                rows={3}
                disabled={voiceoverGenerating}
              />
              {voiceoverDirty && (
                <span className="dev-voiceover-unsaved">Unsaved changes</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
