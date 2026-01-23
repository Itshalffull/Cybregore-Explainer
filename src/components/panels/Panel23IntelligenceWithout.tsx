import { lerp } from '../../utils/animation'

const glowKeyframes = `
  @keyframes wisdomGlow {
    0%, 100% {
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.15);
    }
    50% {
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.25), 0 0 80px rgba(255, 255, 255, 0.1);
    }
  }
`

interface Panel23IntelligenceWithoutProps {
  progress: number
}

export default function Panel23IntelligenceWithout({ progress }: Panel23IntelligenceWithoutProps) {
  // The answer: Intelligence without wisdom always leads to more killing

  const moreOpacity = lerp(progress, 0.05, 0.15, 0, 1)
  const moreY = lerp(progress, 0.05, 0.15, 20, 0)

  const withoutOpacity = lerp(progress, 0.20, 0.30, 0, 1)

  const wisdomOpacity = lerp(progress, 0.35, 0.50, 0, 1)
  const wisdomScale = lerp(progress, 0.35, 0.50, 0.9, 1)

  const alwaysOpacity = lerp(progress, 0.58, 0.70, 0, 1)

  const killingOpacity = lerp(progress, 0.78, 0.90, 0, 1)

  return (
    <section
      className="panel"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, var(--deep-forest) 0%, #1a1a1a 100%)',
      }}
    >
      <style>{glowKeyframes}</style>
      <div
        className="content"
        style={{
          maxWidth: '900px',
          maxHeight: '92dvh',
          overflow: 'hidden',
          padding: '0 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            opacity: moreOpacity,
            transform: `translateY(${moreY}px)`,
            fontSize: 'clamp(1.6rem, 5dvh, 3rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.5rem, 1dvh, 1rem)',
            fontWeight: 600,
          }}
        >
          More Intelligence
        </p>

        <p
          style={{
            opacity: withoutOpacity,
            fontSize: 'clamp(1rem, 2.5dvh, 1.5rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(0.5rem, 1dvh, 1rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
          }}
        >
          without more
        </p>

        <p
          style={{
            opacity: wisdomOpacity,
            transform: `scale(${wisdomScale})`,
            fontSize: 'clamp(2rem, min(7dvh, 10vw), 5rem)',
            fontWeight: 700,
            marginBottom: 'clamp(1rem, 2dvh, 2rem)',
            lineHeight: 1.3,
          }}
        >
          <span style={{
            color: 'var(--line-art-cream)',
            animation: 'wisdomGlow 3s ease-in-out infinite',
          }}>Wisdom</span>
          <span style={{ color: 'var(--sage)', fontSize: '0.6em', margin: '0 0.5em' }}>&</span>
          <span style={{
            color: 'var(--line-art-cream)',
            animation: 'wisdomGlow 3s ease-in-out infinite 0.5s',
          }}>Compassion</span>
        </p>

        <p
          style={{
            opacity: alwaysOpacity,
            fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(0.75rem, 1.5dvh, 1.5rem)',
          }}
        >
          will always lead to
        </p>

        <p
          style={{
            opacity: killingOpacity,
            fontSize: 'clamp(2.5rem, min(9dvh, 14vw), 6rem)',
            color: 'var(--accent-coral)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            textShadow: '0 0 60px rgba(219, 84, 97, 0.6)',
          }}
        >
          MORE KILLING
        </p>
      </div>
    </section>
  )
}
