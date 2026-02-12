import { useState, useRef, useEffect } from 'react'
import { lerpMulti } from '../utils/animation'

interface VideoBackgroundProps {
  videoSrc?: string
  imageFallback?: string
  opacity?: number
  /** When provided, enables native audio from the video with scroll-driven volume.
   *  Without this, video stays muted (backwards compatible). */
  progress?: number
  /** Peak volume for native video audio (0-1, default 0.3) */
  maxVolume?: number
  /** Progress value where audio fade-in completes (default 0.1) */
  fadeInEnd?: number
  /** Progress value where audio fade-out begins (default 0.8) */
  fadeOutStart?: number
}

/**
 * Derives responsive media paths from a base path using naming convention:
 *   Image: foo.png → foo-480w.webp, foo-768w.webp, foo-1280w.webp
 *   Video: foo-loop.mp4 → foo-loop-mobile.mp4
 */
function getResponsiveImageSrcSet(src: string): string | undefined {
  if (!src || !src.endsWith('.png')) return undefined
  const base = src.replace(/\.png$/, '')
  return [
    `${base}-480w.webp 480w`,
    `${base}-768w.webp 768w`,
    `${base}-1280w.webp 1280w`,
  ].join(', ')
}

function getMobileVideoSrc(src: string): string | undefined {
  if (!src || !src.endsWith('.mp4')) return undefined
  return src.replace(/\.mp4$/, '-mobile.mp4')
}

export default function VideoBackground({
  videoSrc,
  imageFallback,
  opacity = 0.3,
  progress,
  maxVolume = 0.3,
  fadeInEnd = 0.1,
  fadeOutStart = 0.8,
}: VideoBackgroundProps) {
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasInteractedRef = useRef(false)

  // Native audio enabled when progress prop is provided
  const hasNativeAudio = progress !== undefined

  // Calculate volume from scroll progress (same curve as AudioBackground)
  const volume = hasNativeAudio
    ? lerpMulti(progress, [0, fadeInEnd, fadeOutStart, 1], [0, maxVolume, maxVolume, 0])
    : 0

  // If no video source, try image fallback, otherwise return null
  if (!videoSrc && !imageFallback) return null

  // Reset video ready state when video source changes
  useEffect(() => {
    setVideoReady(false)
  }, [videoSrc])

  // Handle native audio volume from video element
  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasNativeAudio) return

    video.volume = Math.max(0, Math.min(1, volume))

    // Un-mute and start playing audio on first scroll
    if (volume > 0 && !hasInteractedRef.current) {
      hasInteractedRef.current = true
      video.muted = false
      // Need to re-trigger play after un-muting
      video.play().catch(() => {
        // Autoplay without muted blocked — fall back to muted
        video.muted = true
        hasInteractedRef.current = false
      })
    }

    // Re-mute when fully silent to avoid browser resource usage
    if (volume <= 0 && hasInteractedRef.current) {
      video.muted = true
    } else if (volume > 0 && video.muted && hasInteractedRef.current) {
      video.muted = false
    }
  }, [volume, hasNativeAudio])

  const handleCanPlay = () => {
    // Video is loaded and ready to play - fade it in
    setVideoReady(true)
  }

  const mediaStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'cover',
  }

  const srcSet = imageFallback ? getResponsiveImageSrcSet(imageFallback) : undefined
  const mobileVideo = videoSrc ? getMobileVideoSrc(videoSrc) : undefined

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
        opacity,
      }}
    >
      {/* Image placeholder - uses <picture> for responsive WebP with PNG fallback */}
      {imageFallback && (
        <picture>
          {srcSet && (
            <source
              srcSet={srcSet}
              sizes="100vw"
              type="image/webp"
            />
          )}
          <img
            src={imageFallback}
            alt=""
            loading="lazy"
            style={{
              ...mediaStyles,
              opacity: videoReady ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        </picture>
      )}

      {/* Video - uses mobile variant on small screens */}
      {videoSrc && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={handleCanPlay}
          style={{
            ...mediaStyles,
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          {mobileVideo && (
            <source
              src={mobileVideo}
              type="video/mp4"
              media="(max-width: 768px)"
            />
          )}
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
