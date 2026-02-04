import { useRef, useEffect, useState, useCallback, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface ScrollSectionProps {
  children: (progress: number) => ReactNode
  // How many "screens" worth of scroll height this section takes
  scrollLength?: number
  className?: string
  style?: React.CSSProperties
  // Animation smoothing factor (higher = more responsive, lower = smoother)
  smoothing?: number
  /**
   * Starting progress value before the user scrolls.
   * Use on the first section of an explainer so content is visible on load.
   * Once the user scrolls, progress transitions to scroll-driven normally.
   */
  initialProgress?: number
}

/**
 * A scroll-driven section using GSAP ScrollTrigger that:
 * 1. Pins the content in the viewport while scrolling
 * 2. Provides a progress value (0-1) to children based on scroll position
 * 3. Animation smoothly interpolates to scroll position
 * 4. Stops immediately when scrolling stops (no catch-up drift)
 * 5. Scrolling backward works the same as forward
 */
export default function ScrollSection({
  children,
  scrollLength = 2,
  className = '',
  style = {},
  smoothing = 0.15, // Interpolation factor per frame
  initialProgress = 0,
}: ScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [animProgress, setAnimProgress] = useState(initialProgress)
  const animProgressRef = useRef(initialProgress)
  const targetProgressRef = useRef(initialProgress)
  const lastScrollTimeRef = useRef(0)
  const animationFrameRef = useRef<number>()
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const isActiveRef = useRef(false)

  // Animation loop - smoothly interpolates toward scroll position
  // Stops when user stops scrolling (no continued drift)
  const animate = useCallback(() => {
    const now = performance.now()

    // Only process if this section is active (pinned)
    if (isActiveRef.current && triggerRef.current) {
      const currentAnim = animProgressRef.current
      const targetAnim = targetProgressRef.current

      // Check if we recently scrolled (within last 100ms)
      const isScrolling = now - lastScrollTimeRef.current < 100

      if (isScrolling) {
        // While scrolling, smoothly interpolate toward target
        const diff = targetAnim - currentAnim
        if (Math.abs(diff) > 0.001) {
          const newAnim = currentAnim + diff * smoothing
          animProgressRef.current = newAnim
          setAnimProgress(newAnim)
        }
      } else {
        // Not scrolling - snap to current target to prevent drift
        if (Math.abs(targetAnim - currentAnim) > 0.001) {
          animProgressRef.current = targetAnim
          setAnimProgress(targetAnim)
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [smoothing])

  // Track scroll events to know when user is actively scrolling
  useEffect(() => {
    const handleScroll = () => {
      lastScrollTimeRef.current = performance.now()
      if (triggerRef.current) {
        targetProgressRef.current = triggerRef.current.progress
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animate])

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${(scrollLength - 1) * 100}vh`,
      pin: content,
      pinSpacing: true,
      scrub: true,
      onEnter: (self) => {
        isActiveRef.current = true
        targetProgressRef.current = self.progress
      },
      onLeave: () => {
        isActiveRef.current = false
        // Ensure animation completes when leaving
        animProgressRef.current = 1
        targetProgressRef.current = 1
        setAnimProgress(1)
      },
      onEnterBack: (self) => {
        isActiveRef.current = true
        targetProgressRef.current = self.progress
      },
      onLeaveBack: () => {
        isActiveRef.current = false
        // Reset animation when scrolling back above
        animProgressRef.current = initialProgress
        targetProgressRef.current = initialProgress
        setAnimProgress(initialProgress)
      },
    })

    triggerRef.current = trigger

    return () => {
      trigger.kill()
      triggerRef.current = null
    }
  }, [scrollLength])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        ...style,
      }}
    >
      <div
        ref={contentRef}
        style={{
          height: '100dvh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {children(animProgress)}
      </div>
    </div>
  )
}

/**
 * Helper hook to create stepped animations based on scroll progress
 */
export function useScrollSteps(progress: number, steps: number[]): number {
  for (let i = steps.length - 1; i >= 0; i--) {
    if (progress >= steps[i]) return i
  }
  return 0
}
