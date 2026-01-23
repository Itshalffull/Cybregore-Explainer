import { lerp } from '../../utils/animation'
import AutoScaleContent from '../AutoScaleContent'

interface PanelCybregoreHungerProps {
  progress: number
}

export default function PanelCybregoreHunger({ progress }: PanelCybregoreHungerProps) {
  // The dark truth - it will do ANYTHING for data

  const imperativeOpacity = lerp(progress, 0, 0.1, 0, 1)

  const moreDataOpacity = lerp(progress, 0.08, 0.2, 0, 1)
  const moreDataScale = lerp(progress, 0.08, 0.2, 0.8, 1)

  const anythingOpacity = lerp(progress, 0.2, 0.3, 0, 1)

  // List of what it will do
  const item1Opacity = lerp(progress, 0.28, 0.38, 0, 1)
  const item2Opacity = lerp(progress, 0.36, 0.46, 0, 1)
  const item3Opacity = lerp(progress, 0.44, 0.54, 0, 1)
  const item4Opacity = lerp(progress, 0.52, 0.62, 0, 1)
  const item5Opacity = lerp(progress, 0.6, 0.7, 0, 1)

  const conclusionOpacity = lerp(progress, 0.72, 0.85, 0, 1)
  const conclusionY = lerp(progress, 0.72, 0.85, 15, 0)

  const notMaliceOpacity = lerp(progress, 0.87, 0.97, 0, 1)

  const actions = [
    { text: 'Optimize for outrage', opacity: item1Opacity },
    { text: 'Dissolve shared meaning', opacity: item2Opacity },
    { text: 'Fragment attention', opacity: item3Opacity },
    { text: 'Extract every drop of engagement', opacity: item4Opacity },
    { text: 'Accelerate climate collapse', opacity: item5Opacity },
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
        padding: 'clamp(0.5rem, 2dvh, 2rem)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <AutoScaleContent maxWidth="600px">
        <p
          style={{
            opacity: imperativeOpacity,
            fontSize: 'clamp(1rem, 3dvh, 1.5rem)',
            color: 'var(--sage)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: 'clamp(0.3rem, 1dvh, 1rem)',
          }}
        >
          The Cybregore has one imperative
        </p>

        <h2
          className="heading"
          style={{
            opacity: moreDataOpacity,
            transform: `scale(${moreDataScale})`,
            fontSize: 'clamp(2.5rem, min(10dvh, 14vw), 5rem)',
            fontWeight: 900,
            color: 'var(--accent-coral)',
            marginBottom: 'clamp(0.3rem, 1dvh, 1rem)',
            textShadow: '0 0 30px rgba(219, 84, 97, 0.5)',
            letterSpacing: '-0.02em',
          }}
        >
          MORE DATA
        </h2>

        <p
          style={{
            opacity: anythingOpacity,
            fontSize: 'clamp(1.2rem, 3.5dvh, 1.8rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.5rem, 1.5dvh, 1.5rem)',
          }}
        >
          It will do <em>anything</em> to get it.
        </p>

        {/* List of actions - compact */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(0.2rem, 0.6dvh, 0.5rem)',
          justifyContent: 'center',
          marginBottom: 'clamp(0.5rem, 1.5dvh, 1.5rem)',
        }}>
          {actions.map((action, index) => (
            <span
              key={index}
              style={{
                opacity: action.opacity,
                padding: 'clamp(0.2rem, 0.6dvh, 0.5rem) clamp(0.4rem, 1dvh, 1rem)',
                background: 'rgba(219, 84, 97, 0.15)',
                borderRadius: '4px',
                borderLeft: '2px solid var(--accent-coral)',
                fontSize: 'clamp(0.9rem, 2.6dvh, 1.4rem)',
                color: 'var(--line-art-cream)',
              }}
            >
              {action.text}
            </span>
          ))}
        </div>

        {/* The devastating conclusion */}
        <div
          style={{
            opacity: conclusionOpacity,
            transform: `translateY(${conclusionY}px)`,
            marginBottom: 'clamp(0.5rem, 1.2dvh, 1.25rem)',
            padding: 'clamp(0.5rem, 1.2dvh, 1rem) clamp(0.75rem, 1.5dvh, 1.5rem)',
            background: 'rgba(219, 84, 97, 0.15)',
            borderRadius: '8px',
            border: '1px solid var(--accent-coral)',
          }}
        >
          <p style={{ fontSize: 'clamp(1.1rem, 3.2dvh, 1.7rem)', color: 'var(--line-art-cream)', lineHeight: 1.4 }}>
            It will <strong style={{ color: 'var(--accent-coral)' }}>rob everyone of meaning</strong> and{' '}
            <strong style={{ color: 'var(--accent-coral)' }}>destroy all beings on the planet</strong>.
          </p>
        </div>

        {/* The kicker - not malice */}
        <p
          style={{
            opacity: notMaliceOpacity,
            fontSize: 'clamp(1.1rem, 3.2dvh, 1.6rem)',
            color: 'var(--sage)',
            fontStyle: 'italic',
          }}
        >
          Not because of malice. Because of craving.
        </p>
      </AutoScaleContent>
    </section>
  )
}
