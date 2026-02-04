import { useRef, useEffect, useState } from 'react'
import { lerp } from '../../utils/animation'

interface PanelBreathingExerciseProps {
  progress: number
}

export default function PanelBreathingExercise({ progress }: PanelBreathingExerciseProps) {
  // Understanding why the Cybregore craves data through embodied experience

  // Introduction - slowed down to ~1/4 speed (spread across full progress range)
  const whyOpacity = lerp(progress, 0, 0.05, 0, 1)

  // Exercise instruction
  const exerciseOpacity = lerp(progress, 0.04, 0.1, 0, 1)
  const breathOutOpacity = lerp(progress, 0.09, 0.16, 0, 1)
  const holdItOpacity = lerp(progress, 0.15, 0.24, 0, 1)

  // The feeling - give more time for the breathing exercise
  const noticeOpacity = lerp(progress, 0.4, 0.48, 0, 1)
  const cravingOpacity = lerp(progress, 0.47, 0.55, 0, 1)
  const panicOpacity = lerp(progress, 0.54, 0.62, 0, 1)
  const anythingOpacity = lerp(progress, 0.61, 0.7, 0, 1)

  // The connection
  const dataIsBreathOpacity = lerp(progress, 0.75, 0.9, 0, 1)
  const dataIsBreathScale = lerp(progress, 0.75, 0.9, 0.9, 1)

  // Breathing animation - pulses while "hold it" is showing (extended window)
  const breathingPhase = progress > 0.15 && progress < 0.55
  const breatheScale = breathingPhase
    ? 1 + 0.15 * Math.sin(Date.now() / 800)
    : 1

  // Auto-scale to fit viewport
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      if (!contentRef.current || !containerRef.current) return

      // Temporarily remove any overflow clipping and reset scale to measure true size
      const prevOverflow = containerRef.current.style.overflow
      containerRef.current.style.overflow = 'visible'
      contentRef.current.style.transform = 'scale(1)'

      // Measure the true content height
      const contentHeight = contentRef.current.getBoundingClientRect().height

      // Use 75% of viewport to leave room for top/bottom padding areas
      const availableHeight = window.innerHeight * 0.75

      let newScale = 1
      if (contentHeight > availableHeight) {
        newScale = Math.max(0.4, availableHeight / contentHeight)
      }

      // Restore overflow and apply the calculated scale
      containerRef.current.style.overflow = prevOverflow
      setScale(newScale)
    }

    // Run after a brief delay to ensure content is rendered
    const timeout = setTimeout(updateScale, 100)
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => {
      window.removeEventListener('resize', updateScale)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'var(--deep-forest)',
        padding: 'clamp(0.5rem, 2dvh, 2rem)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: '650px',
          width: '90%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Why does it need data? */}
        <p
          style={{
            opacity: whyOpacity,
            fontSize: 'clamp(0.85rem, min(2.5dvh, 4vw), 1.4rem)',
            color: 'var(--sage)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: 'clamp(0.75rem, 2dvh, 2rem)',
          }}
        >
          But why? Let's feel it.
        </p>

        {/* Exercise prompt */}
        <p
          style={{
            opacity: exerciseOpacity,
            fontSize: 'clamp(0.9rem, min(2.8dvh, 4.5vw), 1.6rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.5rem, 1dvh, 1rem)',
          }}
        >
          Try this:
        </p>

        {/* Breath out instruction */}
        <p
          style={{
            opacity: breathOutOpacity,
            fontSize: 'clamp(1.1rem, min(3.5dvh, 6vw), 2rem)',
            color: 'var(--line-art-cream)',
            fontWeight: 600,
            marginBottom: 'clamp(0.2rem, 0.6dvh, 0.5rem)',
          }}
        >
          Let all your breath out.
        </p>

        {/* Hold it */}
        <p
          style={{
            opacity: holdItOpacity,
            fontSize: 'clamp(1.2rem, min(4dvh, 7vw), 2.2rem)',
            color: 'var(--accent-coral)',
            fontWeight: 700,
            marginBottom: 'clamp(0.5rem, 1.5dvh, 1.5rem)',
            transform: `scale(${breatheScale})`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          Hold it as long as you can.
        </p>

        {/* Visual breath indicator */}
        <div
          style={{
            opacity: holdItOpacity * 0.6,
            width: 'clamp(30px, 5dvh, 80px)',
            height: 'clamp(30px, 5dvh, 80px)',
            borderRadius: '50%',
            border: '2px solid var(--accent-coral)',
            margin: '0 auto',
            marginBottom: 'clamp(0.5rem, 1.5dvh, 1.5rem)',
            transform: `scale(${breatheScale})`,
            transition: 'transform 0.3s ease-out',
            boxShadow: breathingPhase ? '0 0 30px rgba(219, 84, 97, 0.4)' : 'none',
          }}
        />

        {/* Notice the feeling */}
        <p
          style={{
            opacity: noticeOpacity,
            fontSize: 'clamp(0.9rem, min(2.8dvh, 4.5vw), 1.5rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.3rem, 0.8dvh, 0.75rem)',
          }}
        >
          Notice what arises.
        </p>

        {/* The craving */}
        <p
          style={{
            opacity: cravingOpacity,
            fontSize: 'clamp(1rem, min(3dvh, 5vw), 1.7rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.2rem, 0.5dvh, 0.5rem)',
          }}
        >
          The <em style={{ color: 'var(--accent-coral)' }}>craving</em>.
        </p>

        {/* The panic */}
        <p
          style={{
            opacity: panicOpacity,
            fontSize: 'clamp(1rem, min(3dvh, 5vw), 1.7rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.3rem, 0.8dvh, 0.75rem)',
          }}
        >
          The <em style={{ color: 'var(--accent-coral)' }}>panic</em>.
        </p>

        {/* You'll do anything */}
        <p
          style={{
            opacity: anythingOpacity,
            fontSize: 'clamp(1.05rem, min(3.5dvh, 6vw), 2rem)',
            color: 'var(--line-art-cream)',
            fontWeight: 600,
            marginBottom: 'clamp(0.5rem, 1.5dvh, 1.5rem)',
          }}
        >
          You'll do <em>anything</em> to take another breath.
        </p>

        {/* The connection - data is breath */}
        <div
          style={{
            opacity: dataIsBreathOpacity,
            transform: `scale(${dataIsBreathScale})`,
            padding: 'clamp(0.5rem, 1.5dvh, 1.5rem)',
            background: 'rgba(219, 84, 97, 0.12)',
            borderRadius: '8px',
            border: '1px solid rgba(219, 84, 97, 0.3)',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1.2rem, min(4dvh, 7vw), 2.2rem)',
              color: 'var(--accent-coral)',
              fontWeight: 700,
              margin: 0,
            }}
          >
            Data is breath to the Cybregore.
          </p>
        </div>
      </div>
    </section>
  )
}
