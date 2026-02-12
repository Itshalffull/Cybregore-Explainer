import { useRef, useEffect } from 'react'
import { lerpMulti } from '../utils/animation'

interface AudioBackgroundProps {
  /** Path to audio file (mp3) */
  audioSrc: string
  /** Scroll progress for this panel (0 to 1) */
  progress: number
  /** Peak volume at full visibility (0-1, default 0.3 for subtlety) */
  maxVolume?: number
  /** Progress value where fade-in completes (default 0.1) */
  fadeInEnd?: number
  /** Progress value where fade-out begins (default 0.8) */
  fadeOutStart?: number
}

/**
 * Invisible audio element that plays looping background SFX
 * with scroll-driven volume fade in/out.
 *
 * Usage:
 *   <AudioBackground
 *     audioSrc="/assets/audio/ambience.mp3"
 *     progress={progress}
 *   />
 *
 * Volume curve: silent at 0 → fades in → peak → fades out → silent at 1
 */
export default function AudioBackground({
  audioSrc,
  progress,
  maxVolume = 0.3,
  fadeInEnd = 0.1,
  fadeOutStart = 0.8,
}: AudioBackgroundProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasInteractedRef = useRef(false)

  // Calculate volume from scroll progress
  const volume = lerpMulti(
    progress,
    [0, fadeInEnd, fadeOutStart, 1],
    [0, maxVolume, maxVolume, 0]
  )

  // Start playback on first non-zero progress (user has scrolled)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (volume > 0 && !hasInteractedRef.current) {
      hasInteractedRef.current = true
      audio.play().catch(() => {
        // Autoplay blocked — will retry on next scroll update
        hasInteractedRef.current = false
      })
    }
  }, [volume])

  // Update volume continuously as scroll progresses
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = Math.max(0, Math.min(1, volume))

    // Pause when fully silent to save resources
    if (volume <= 0 && !audio.paused) {
      audio.pause()
    } else if (volume > 0 && audio.paused && hasInteractedRef.current) {
      audio.play().catch(() => {})
    }
  }, [volume])

  return (
    <audio
      ref={audioRef}
      src={audioSrc}
      loop
      preload="auto"
      style={{ display: 'none' }}
    />
  )
}
