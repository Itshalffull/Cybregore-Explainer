import { useState, useRef, useEffect } from 'react'
import { useAudioState } from './AudioState'

/**
 * Minimal floating toolbar pinned to bottom-right.
 * Shows share + mute icons. Volume slider appears on hover/tap of the sound button.
 * Auto-hides after inactivity, reappears on scroll.
 */
export default function FloatingToolbar({ hasBreadcrumbs = false }: { hasBreadcrumbs?: boolean }) {
  const { muted, volume, toggleMute, setVolume } = useAudioState()
  const [showVolume, setShowVolume] = useState(false)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)

  // Auto-hide after 3s of no interaction, reappear on any scroll input.
  // Bypasses React state — directly toggles a CSS class on the DOM element
  // so visibility updates aren't blocked by React batching during scroll.
  useEffect(() => {
    const el = toolbarRef.current
    if (!el) return

    const show = () => {
      el.classList.add('floating-toolbar--visible')
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      hideTimerRef.current = setTimeout(() => {
        el.classList.remove('floating-toolbar--visible')
      }, 3000)
    }

    show()
    window.addEventListener('scroll', show, { passive: true })
    window.addEventListener('wheel', show, { passive: true })
    window.addEventListener('touchmove', show, { passive: true })
    return () => {
      window.removeEventListener('scroll', show)
      window.removeEventListener('wheel', show)
      window.removeEventListener('touchmove', show)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  // Close volume slider when clicking outside
  useEffect(() => {
    if (!showVolume) return
    const handleClick = (e: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        setShowVolume(false)
      }
    }
    document.addEventListener('pointerdown', handleClick)
    return () => document.removeEventListener('pointerdown', handleClick)
  }, [showVolume])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ url })
      } catch {
        // User cancelled or share failed — fall back to clipboard
        await copyToClipboard(url)
      }
    } else {
      await copyToClipboard(url)
    }
  }

  const [copied, setCopied] = useState(false)
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API blocked — ignore silently
    }
  }

  // Effective volume display (for slider position)
  const effectiveVolume = muted ? 0 : volume

  return (
    <div
      ref={toolbarRef}
      className={`floating-toolbar floating-toolbar--visible${hasBreadcrumbs ? ' floating-toolbar--with-breadcrumbs' : ''}`}
      onPointerEnter={() => {
        toolbarRef.current?.classList.add('floating-toolbar--visible')
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      }}
      onPointerLeave={() => {
        setShowVolume(false)
        hideTimerRef.current = setTimeout(() => {
          toolbarRef.current?.classList.remove('floating-toolbar--visible')
        }, 1500)
      }}
    >
      {/* Volume slider — slides up from sound button */}
      {showVolume && (
        <div className="floating-toolbar__volume-track">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={effectiveVolume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="floating-toolbar__slider"
            aria-label="Volume"
          />
        </div>
      )}

      {/* Sound button — hover shows volume, click toggles mute */}
      <button
        className="floating-toolbar__btn"
        onClick={toggleMute}
        onPointerEnter={() => setShowVolume(true)}
        aria-label={muted ? 'Unmute' : 'Mute'}
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          <SoundOffIcon />
        ) : effectiveVolume < 0.4 ? (
          <SoundLowIcon />
        ) : (
          <SoundOnIcon />
        )}
      </button>

      {/* Share button */}
      <button
        className="floating-toolbar__btn"
        onClick={handleShare}
        aria-label="Share"
        title={copied ? 'Link copied!' : 'Share'}
      >
        {copied ? <CheckIcon /> : <ShareIcon />}
      </button>
    </div>
  )
}

// ─── Inline SVG icons (16x16, stroke-based, match design system) ────────────

function SoundOnIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5.5h2.5L8 2.5v11L4.5 10.5H2a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5z" />
      <path d="M10.5 4.5a4 4 0 010 7" />
      <path d="M12 2.5a7 7 0 010 11" />
    </svg>
  )
}

function SoundLowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5.5h2.5L8 2.5v11L4.5 10.5H2a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5z" />
      <path d="M10.5 4.5a4 4 0 010 7" />
    </svg>
  )
}

function SoundOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5.5h2.5L8 2.5v11L4.5 10.5H2a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5z" />
      <line x1="11" y1="5.5" x2="14.5" y2="10.5" />
      <line x1="14.5" y1="5.5" x2="11" y2="10.5" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="3.5" r="2" />
      <circle cx="4" cy="8" r="2" />
      <circle cx="12" cy="12.5" r="2" />
      <line x1="5.8" y1="7" x2="10.2" y2="4.5" />
      <line x1="5.8" y1="9" x2="10.2" y2="11.5" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3.5,8.5 6.5,11.5 12.5,4.5" />
    </svg>
  )
}
