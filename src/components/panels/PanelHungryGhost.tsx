import { lerp } from '../../utils/animation'
import AutoScaleContent from '../AutoScaleContent'

interface PanelHungryGhostProps {
  progress: number
}

export default function PanelHungryGhost({ progress }: PanelHungryGhostProps) {
  // The Cybregore as a hungry ghost - craves data constantly, can never be satisfied

  const introOpacity = lerp(progress, 0, 0.12, 0, 1)
  const introY = lerp(progress, 0, 0.12, 20, 0)

  const hungryGhostOpacity = lerp(progress, 0.15, 0.35, 0, 1)
  const hungryGhostScale = lerp(progress, 0.15, 0.35, 0.9, 1)

  const descriptionOpacity = lerp(progress, 0.38, 0.55, 0, 1)
  const descriptionY = lerp(progress, 0.38, 0.55, 15, 0)

  const alwaysCravingOpacity = lerp(progress, 0.58, 0.75, 0, 1)

  const neverEnoughOpacity = lerp(progress, 0.78, 0.92, 0, 1)
  const neverEnoughScale = lerp(progress, 0.78, 0.92, 0.95, 1)

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
      <AutoScaleContent maxWidth="650px">
        {/* Intro */}
        <p
          style={{
            opacity: introOpacity,
            transform: `translateY(${introY}px)`,
            fontSize: 'clamp(1.1rem, 3dvh, 1.5rem)',
            color: 'var(--sage)',
            textAlign: 'center',
            marginBottom: 'clamp(1rem, 2.5dvh, 2rem)',
          }}
        >
          In Buddhist cosmology, there's a realm of beings called
        </p>

        {/* Hungry Ghost title */}
        <h2
          style={{
            opacity: hungryGhostOpacity,
            transform: `scale(${hungryGhostScale})`,
            fontSize: 'clamp(2.2rem, min(8dvh, 12vw), 4rem)',
            fontWeight: 700,
            color: 'var(--accent-coral)',
            textAlign: 'center',
            marginBottom: 'clamp(1rem, 2.5dvh, 2rem)',
            textShadow: '0 0 30px rgba(219, 84, 97, 0.4)',
          }}
        >
          Hungry Ghosts
        </h2>

        {/* Description */}
        <div
          style={{
            opacity: descriptionOpacity,
            transform: `translateY(${descriptionY}px)`,
            padding: 'clamp(0.75rem, 2dvh, 1.5rem)',
            background: 'rgba(71, 73, 36, 0.3)',
            borderRadius: '8px',
            borderLeft: '3px solid var(--sage)',
            marginBottom: 'clamp(1.5rem, 3dvh, 2.5rem)',
            textAlign: 'left',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1.1rem, 3dvh, 1.5rem)',
              color: 'var(--line-art-cream)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Beings with <em style={{ color: 'var(--accent-coral)' }}>huge empty bellies</em> and{' '}
            <em style={{ color: 'var(--accent-coral)' }}>tiny throats</em>.
            <br /><br />
            They consume endlessly but can never be satisfied.
          </p>
        </div>

        {/* Always craving */}
        <p
          style={{
            opacity: alwaysCravingOpacity,
            fontSize: 'clamp(1.2rem, 3.5dvh, 1.8rem)',
            color: 'var(--line-art-cream)',
            textAlign: 'center',
            lineHeight: 1.6,
            marginBottom: 'clamp(1.5rem, 3dvh, 2.5rem)',
          }}
        >
          The Cybregore craves data <em style={{ color: 'var(--accent-coral)' }}>all the time</em>.
          <br />
          Every millisecond. Every interaction. Every breath you take online.
        </p>

        {/* Never enough */}
        <p
          style={{
            opacity: neverEnoughOpacity,
            transform: `scale(${neverEnoughScale})`,
            fontSize: 'clamp(1.5rem, 4.5dvh, 2.5rem)',
            color: 'var(--accent-coral)',
            textAlign: 'center',
            fontWeight: 700,
            fontStyle: 'italic',
          }}
        >
          And it can never get enough.
        </p>
      </AutoScaleContent>
    </section>
  )
}
