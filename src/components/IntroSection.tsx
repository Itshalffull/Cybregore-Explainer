import { ReactNode, useEffect, useRef, useState } from 'react'

interface IntroSectionProps {
  children: ReactNode
}

export default function IntroSection({ children }: IntroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const handleCanPlay = () => {
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
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Fixed video background that stays in place while within this section */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
          opacity: isVisible ? 0.4 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease-out',
        }}
      >
        {/* Image placeholder - visible until video loads */}
        <img
          src="/assets/images/intro-ominous.png"
          alt=""
          style={{
            ...mediaStyles,
            opacity: videoReady ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />

        {/* Video - fades in once loaded */}
        <video
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
          <source src="/assets/videos/intro-ominous-loop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content scrolls over the fixed background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
