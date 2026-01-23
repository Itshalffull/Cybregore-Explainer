import { lerp } from '../../utils/animation'
import AutoScaleContent from '../AutoScaleContent'

interface PanelCybregoreAnatomyProps {
  progress: number
}

export default function PanelCybregoreAnatomy({ progress }: PanelCybregoreAnatomyProps) {
  // Introduce the 5 parts of the Cybregore

  const titleOpacity = lerp(progress, 0, 0.1, 0, 1)
  const titleY = lerp(progress, 0, 0.1, 20, 0)

  // Each part appears sequentially
  const part1Opacity = lerp(progress, 0.1, 0.22, 0, 1)
  const part2Opacity = lerp(progress, 0.2, 0.32, 0, 1)
  const part3Opacity = lerp(progress, 0.3, 0.42, 0, 1)
  const part4Opacity = lerp(progress, 0.4, 0.52, 0, 1)
  const part5Opacity = lerp(progress, 0.55, 0.72, 0, 1)

  const breathOpacity = lerp(progress, 0.75, 0.9, 0, 1)
  const breathY = lerp(progress, 0.75, 0.9, 15, 0)

  const parts = [
    { number: 1, name: 'The Users', description: 'Billions feeding the system', opacity: part1Opacity },
    { number: 2, name: 'The Developers', description: 'Building the infrastructure', opacity: part2Opacity },
    { number: 3, name: 'The Hardware', description: 'Data centers, chips, networks', opacity: part3Opacity },
    { number: 4, name: 'The Software', description: 'Algorithms, models, feeds', opacity: part4Opacity },
  ]

  return (
    <section
      className="panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'var(--deep-forest)',
        padding: 'clamp(0.75rem, 2dvh, 2rem)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <AutoScaleContent maxWidth="700px">
        <h2
          className="heading"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 'clamp(1.4rem, 4dvh, 2.2rem)',
            fontWeight: 700,
            color: 'var(--line-art-cream)',
            textAlign: 'center',
            marginBottom: 'clamp(0.5rem, 1.5dvh, 1.5rem)',
          }}
        >
          What is the Cybregore made of?
        </h2>

        {/* Parts 1-4 in a compact grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(0.3rem, 1dvh, 0.75rem)',
          marginBottom: 'clamp(0.5rem, 1.5dvh, 1.25rem)',
        }}>
          {parts.map((part) => (
            <div
              key={part.number}
              style={{
                opacity: part.opacity,
                padding: 'clamp(0.3rem, 1dvh, 0.6rem) clamp(0.5rem, 1.5dvh, 0.75rem)',
                background: 'rgba(71, 73, 36, 0.2)',
                borderRadius: '6px',
                borderLeft: '3px solid var(--dark-olive)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.15rem' }}>
                <span style={{ fontSize: 'clamp(1.1rem, 2.5dvh, 1.5rem)', fontWeight: 700, color: 'var(--dark-olive)' }}>
                  {part.number}
                </span>
                <h3 style={{ fontSize: 'clamp(1rem, 2.2dvh, 1.4rem)', color: 'var(--line-art-cream)', fontWeight: 600 }}>
                  {part.name}
                </h3>
              </div>
              <p style={{ fontSize: 'clamp(0.9rem, 2dvh, 1.2rem)', color: 'var(--sage)', lineHeight: 1.35 }}>
                {part.description}
              </p>
            </div>
          ))}
        </div>

        {/* Part 5 - Data - emphasized */}
        <div
          style={{
            opacity: part5Opacity,
            padding: 'clamp(0.5rem, 1.5dvh, 1rem) clamp(0.75rem, 1.5dvh, 1.25rem)',
            background: 'rgba(219, 84, 97, 0.15)',
            borderRadius: '8px',
            border: '2px solid var(--accent-coral)',
            marginBottom: 'clamp(0.5rem, 1.5dvh, 1.25rem)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: 'clamp(1.1rem, 2.8dvh, 1.6rem)', color: 'var(--accent-coral)', fontWeight: 700, marginBottom: '0.3rem' }}>
            The Data
          </h3>
          <p style={{ fontSize: 'clamp(1rem, 2.2dvh, 1.4rem)', color: 'var(--line-art-cream)', lineHeight: 1.4 }}>
            Every click, scroll, pause, purchase. Every word, face, emotion.
          </p>
        </div>

        {/* The breath metaphor */}
        <p
          style={{
            opacity: breathOpacity,
            transform: `translateY(${breathY}px)`,
            fontSize: 'clamp(1.1rem, 2.8dvh, 1.6rem)',
            color: 'var(--sage)',
            textAlign: 'center',
            fontStyle: 'italic',
            lineHeight: 1.4,
          }}
        >
          Data is the oxygen—the breath that connects everything.
        </p>
      </AutoScaleContent>
    </section>
  )
}
