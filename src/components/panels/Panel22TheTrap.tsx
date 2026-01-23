import { lerp } from '../../utils/animation'

interface Panel22TheTrapProps {
  progress: number
}

export default function Panel22TheTrap({ progress }: Panel22TheTrapProps) {
  // The perfect trap - each scroll deepens the void

  const line1Opacity = lerp(progress, 0, 0.15, 0, 1)
  const line2Opacity = lerp(progress, 0.15, 0.3, 0, 1)
  const line3Opacity = lerp(progress, 0.35, 0.5, 0, 1)

  const trapOpacity = lerp(progress, 0.55, 0.75, 0, 1)
  const trapScale = lerp(progress, 0.55, 0.75, 0.95, 1)

  const newOpacity = lerp(progress, 0.8, 0.95, 0, 1)

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
      }}
    >
      <div className="content" style={{
        maxWidth: '700px',
        padding: '0 2rem',
        textAlign: 'center',
        maxHeight: '92dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <p
          style={{
            opacity: line1Opacity,
            fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(0.6rem, 1dvh, 1.2rem)',
            lineHeight: 1.6,
          }}
        >
          But here's the trap.
        </p>

        <p
          style={{
            opacity: line2Opacity,
            fontSize: 'clamp(1.2rem, 3.5dvh, 2rem)',
            color: 'var(--accent-coral)',
            marginBottom: 'clamp(0.6rem, 1dvh, 1.2rem)',
            lineHeight: 1.5,
          }}
        >
          Each scroll deepens the void.
        </p>

        <p
          style={{
            opacity: line3Opacity,
            fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(1.2rem, 2dvh, 2.5rem)',
            lineHeight: 1.6,
          }}
        >
          More disconnected narratives.
          <br />
          More dissolution.
          <br />
          More void.
        </p>

        <p
          style={{
            opacity: trapOpacity,
            transform: `scale(${trapScale})`,
            fontSize: 'clamp(1.6rem, 5dvh, 2.8rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(1rem, 1.5dvh, 2rem)',
            lineHeight: 1.4,
            fontWeight: 600,
          }}
        >
          It's a perfect trap.
        </p>

        <p
          style={{
            opacity: newOpacity,
            fontSize: 'clamp(1.3rem, 4dvh, 2.2rem)',
            color: 'var(--sage)',
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          This is new.
        </p>
      </div>
    </section>
  )
}
