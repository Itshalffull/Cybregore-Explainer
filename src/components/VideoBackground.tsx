import { useState, useRef, useEffect } from 'react'

interface VideoBackgroundProps {
  videoSrc?: string
  imageFallback?: string
  opacity?: number
}

export default function VideoBackground({
  videoSrc,
  imageFallback,
  opacity = 0.3
}: VideoBackgroundProps) {
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // If no video source, try image fallback, otherwise return null
  if (!videoSrc && !imageFallback) return null

  // Reset video ready state when video source changes
  useEffect(() => {
    setVideoReady(false)
  }, [videoSrc])

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
      {/* Image placeholder - always visible until video is ready */}
      {imageFallback && (
        <img
          src={imageFallback}
          alt=""
          style={{
            ...mediaStyles,
            opacity: videoReady ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      )}

      {/* Video - fades in once loaded */}
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
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
