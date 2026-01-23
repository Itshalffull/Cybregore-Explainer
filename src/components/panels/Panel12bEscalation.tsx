import { lerp } from '../../utils/animation'

interface Panel12bEscalationProps {
  progress: number
}

export default function Panel12bEscalation({ progress }: Panel12bEscalationProps) {
  // Transition panel showing the pattern of escalation

  const titleOpacity = lerp(progress, 0, 0.1, 0, 1)
  const patternOpacity = lerp(progress, 0.1, 0.2, 0, 1)

  const line1Opacity = lerp(progress, 0.15, 0.28, 0, 1)
  const line2Opacity = lerp(progress, 0.28, 0.41, 0, 1)
  const line3Opacity = lerp(progress, 0.41, 0.54, 0, 1)
  const line4Opacity = lerp(progress, 0.54, 0.67, 0, 1)

  const conclusionOpacity = lerp(progress, 0.75, 0.9, 0, 1)
  const conclusionY = lerp(progress, 0.75, 0.9, 20, 0)

  const eras = [
    { ai: 'Tribes', cost: 'Megafauna extinctions', scale: '~70% large mammals' },
    { ai: 'Property', cost: 'Habitat destruction', scale: '~40% land transformed' },
    { ai: 'Industry', cost: 'Global wildlife', scale: '~69% populations lost' },
    { ai: 'Digital Networks', cost: 'Planetary systems', scale: 'Climate breakdown' },
  ]

  const lineOpacities = [line1Opacity, line2Opacity, line3Opacity, line4Opacity]

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
        padding: 'clamp(0.5rem, 2dvh, 2rem)',
        boxSizing: 'border-box',
      }}
    >
      <div className="panel-content" style={{
        maxWidth: '800px',
        width: '90%',
        maxHeight: '92dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <h2
          className="heading"
          style={{
            opacity: titleOpacity,
            fontSize: 'clamp(1.8rem, 6dvh, 3rem)',
            fontWeight: 700,
            color: 'var(--line-art-cream)',
            textAlign: 'center',
            marginBottom: 'clamp(0.2rem, 0.5dvh, 0.5rem)',
          }}
        >
          The Pattern
        </h2>

        <p
          style={{
            opacity: patternOpacity,
            fontSize: 'clamp(1rem, 3dvh, 1.5rem)',
            color: 'var(--sage)',
            textAlign: 'center',
            marginBottom: 'clamp(1rem, 2.5dvh, 2.5rem)',
          }}
        >
          Each AI solves a problem. Each creates a bigger one. Each costs more life.
        </p>

        {/* Era progression */}
        <div style={{ marginBottom: 'clamp(1rem, 2.5dvh, 2.5rem)' }}>
          {eras.map((era, index) => (
            <div
              key={index}
              style={{
                opacity: lineOpacities[index],
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: 'clamp(0.5rem, 1dvh, 1rem)',
                alignItems: 'center',
                marginBottom: 'clamp(0.3rem, 0.8dvh, 0.75rem)',
                padding: 'clamp(0.2rem, 0.5dvh, 0.5rem) 0',
                borderBottom: index < eras.length - 1 ? '1px solid var(--dark-olive)' : 'none',
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(0.9rem, 2.5dvh, 1.3rem)',
                  color: 'var(--accent-coral)',
                  textAlign: 'right',
                }}
              >
                {era.ai}
              </span>
              <span
                style={{
                  fontSize: 'clamp(1rem, 3dvh, 1.5rem)',
                  color: 'var(--dark-forest)',
                }}
              >
                →
              </span>
              <span
                style={{
                  fontSize: 'clamp(0.9rem, 2.5dvh, 1.3rem)',
                  color: 'var(--line-art-cream)',
                }}
              >
                {era.cost} <span style={{ color: 'var(--sage)' }}>({era.scale})</span>
              </span>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div
          style={{
            opacity: conclusionOpacity,
            transform: `translateY(${conclusionY}px)`,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1.2rem, 3.5dvh, 2rem)',
              color: 'var(--line-art-cream)',
              fontWeight: 500,
              marginBottom: 'clamp(0.3rem, 0.8dvh, 1rem)',
            }}
          >
            Each AI accelerates the next.
          </p>
          <p
            style={{
              fontSize: 'clamp(1rem, 3dvh, 1.6rem)',
              color: 'var(--sage)',
              fontStyle: 'italic',
            }}
          >
            But what's driving this acceleration now?
          </p>
        </div>
      </div>
    </section>
  )
}
