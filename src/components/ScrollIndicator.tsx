import { useState, useEffect } from 'react'

interface ScrollIndicatorProps {
  show?: boolean
}

export default function ScrollIndicator({ show = true }: ScrollIndicatorProps) {
  const [visible, setVisible] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide after user has scrolled
  useEffect(() => {
    if (hasScrolled) {
      const timer = setTimeout(() => setVisible(false), 500)
      return () => clearTimeout(timer)
    }
  }, [hasScrolled])

  if (!show || !visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        opacity: hasScrolled ? 0 : 0.7,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      <span
        style={{
          fontSize: '0.875rem',
          fontFamily: 'var(--font-body)',
          color: 'white',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        Scroll
      </span>
      <div
        style={{
          width: '24px',
          height: '40px',
          border: '2px solid white',
          borderRadius: '12px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: '8px',
            backgroundColor: 'white',
            borderRadius: '2px',
            animation: 'scrollBounce 1.5s ease-in-out infinite',
          }}
        />
      </div>
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(12px); opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
