import { useRef, useEffect, useCallback } from 'react'
import { lerpMulti } from '../utils/animation'
import { useAudioState } from './AudioState'

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
  const { muted, volume: globalVolume } = useAudioState()
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasInteractedRef = useRef(false)
  const targetVolumeRef = useRef(0)
  const currentVolumeRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  // Calculate target volume from scroll progress, scaled by global volume
  const scrollVolume = lerpMulti(
    progress,
    [0, fadeInEnd, fadeOutStart, 1],
    [0, maxVolume, maxVolume, 0]
  )
  const targetVolume = muted ? 0 : scrollVolume * globalVolume
  targetVolumeRef.current = targetVolume

  // Start playback on first non-zero progress (user has scrolled)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (targetVolume > 0 && !hasInteractedRef.current) {
      hasInteractedRef.current = true
      audio.play().catch(() => {
        // Autoplay blocked — will retry on next scroll update
        hasInteractedRef.current = false
      })
    }
  }, [targetVolume])

  // RAF loop: smoothly ramp actual volume toward target
  const animate = useCallback(() => {
    const audio = audioRef.current
    if (!audio) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }

    const target = targetVolumeRef.current
    const current = currentVolumeRef.current

    // Ramp speed: ~0.1 per second at 60fps = ~0.0017 per frame
    const step = 0.0017
    let next = current

    if (Math.abs(target - current) < step) {
      next = target
    } else if (target > current) {
      next = current + step
    } else {
      next = current - step
    }

    currentVolumeRef.current = next
    audio.volume = Math.max(0, Math.min(1, next))

    // Pause when fully silent to save resources
    if (next <= 0 && !audio.paused) {
      audio.pause()
    } else if (target > 0 && audio.paused && hasInteractedRef.current) {
      audio.play().catch(() => {})
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  // Start/stop RAF loop
  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

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
