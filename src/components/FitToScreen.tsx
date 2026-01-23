import { useRef, useEffect, useState, ReactNode } from 'react'

interface FitToScreenProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  maxScale?: number
  minScale?: number
  padding?: number // padding in pixels to leave around edges
}

/**
 * A wrapper component that automatically scales its content to fit within the viewport.
 * Uses transform: scale() to shrink content if it would overflow.
 */
export default function FitToScreen({
  children,
  className = '',
  style = {},
  maxScale = 1,
  minScale = 0.5,
  padding = 40, // leave 40px padding (20px top + 20px bottom)
}: FitToScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current || !contentRef.current) return

      const viewportHeight = window.innerHeight - padding
      const contentHeight = contentRef.current.scrollHeight

      if (contentHeight > viewportHeight) {
        // Content is too tall, calculate scale to fit
        const newScale = Math.max(minScale, Math.min(maxScale, viewportHeight / contentHeight))
        setScale(newScale)
      } else {
        setScale(maxScale)
      }
    }

    // Initial calculation
    updateScale()

    // Recalculate on resize
    window.addEventListener('resize', updateScale)

    // Also recalculate after a short delay to catch any late-loading content
    const timeout = setTimeout(updateScale, 100)

    return () => {
      window.removeEventListener('resize', updateScale)
      clearTimeout(timeout)
    }
  }, [maxScale, minScale, padding, children])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        ref={contentRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease-out',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </div>
    </div>
  )
}
