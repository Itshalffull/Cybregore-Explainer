import { useState, useEffect, useRef } from 'react'

interface ContinueScrollIndicatorProps {
  // Delay before showing the indicator (ms)
  delay?: number
  // Messages to cycle through (punchy prompts)
  messages?: string[]
}

export default function ContinueScrollIndicator({
  delay = 3000,
  messages = [
    'Keep going',
    'There\'s more',
    'Scroll to continue',
    'More below',
  ],
}: ContinueScrollIndicatorProps) {
  const [visible, setVisible] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const lastScrollTimeRef = useRef(Date.now())
  const wasVisibleRef = useRef(false)

  useEffect(() => {
    const checkIfShouldShow = () => {
      const now = Date.now()
      const timeSinceScroll = now - lastScrollTimeRef.current

      // Check if there's more content below
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const distanceFromBottom = docHeight - scrollY - windowHeight
      const hasMoreContent = distanceFromBottom > 100

      // Check if user has scrolled at least a bit from the top
      const hasScrolledFromTop = scrollY > 50

      // Show if:
      // 1. User hasn't scrolled for `delay` ms
      // 2. There's more content below (not at bottom)
      // 3. User has started scrolling (not at very top)
      const shouldShow = timeSinceScroll >= delay && hasMoreContent && hasScrolledFromTop

      // Pick a new random message only when transitioning from hidden to visible
      if (shouldShow && !wasVisibleRef.current) {
        setMessageIndex(Math.floor(Math.random() * messages.length))
      }

      wasVisibleRef.current = shouldShow
      setVisible(shouldShow)
    }

    // Check periodically
    const intervalId = setInterval(checkIfShouldShow, 500)

    const handleScroll = () => {
      lastScrollTimeRef.current = Date.now()
      wasVisibleRef.current = false
      setVisible(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(intervalId)
    }
  }, [delay, messages.length])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'clamp(0.5rem, 2dvh, 2rem)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        opacity: visible ? 0.85 : 0,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      <span
        style={{
          fontSize: 'clamp(0.7rem, 1.5dvh, 0.9rem)',
          fontFamily: 'var(--font-body)',
          color: 'var(--line-art-cream)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}
      >
        {messages[messageIndex]}
      </span>

      {/* Animated chevrons pointing down */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            width="24"
            height="12"
            viewBox="0 0 24 12"
            style={{
              opacity: 0.7,
              animation: `chevronPulse 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            <path
              d="M4 2 L12 10 L20 2"
              stroke="var(--line-art-cream)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>

      <style>{`
        @keyframes chevronPulse {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          50% {
            opacity: 0.9;
            transform: translateY(4px);
          }
        }
      `}</style>
    </div>
  )
}
