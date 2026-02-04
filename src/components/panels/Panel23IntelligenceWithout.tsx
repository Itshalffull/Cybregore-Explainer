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
      className="panel panel--dark"
      style={{
        background: 'linear-gradient(180deg, var(--deep-forest) 0%, #1a1a1a 100%)',
      }}
    >
      <style>{glowKeyframes}</style>
      <div className="panel-body panel-body--wide text-center">
        <p
          className="text-title text-cream mb-md text-semibold"
          style={{
            opacity: moreOpacity,
            transform: `translateY(${moreY}px)`,
          }}
        >
          More Intelligence
        </p>

        <p
          className="text-subheading text-sage mb-md text-uppercase"
          style={{
            opacity: withoutOpacity,
            letterSpacing: '0.15em',
          }}
        >
          without more
        </p>

        <p
          className="text-display text-bold mb-xl"
          style={{
            opacity: wisdomOpacity,
            transform: `scale(${wisdomScale})`,
            lineHeight: 1.3,
          }}
        >
          <span style={{
            color: 'var(--line-art-cream)',
            animation: 'wisdomGlow 3s ease-in-out infinite',
          }}>Wisdom</span>
          <span className="text-sage" style={{ fontSize: '0.6em', margin: '0 0.5em' }}>&</span>
          <span style={{
            color: 'var(--line-art-cream)',
            animation: 'wisdomGlow 3s ease-in-out infinite 0.5s',
          }}>Compassion</span>
        </p>

        <p
          className="text-subheading text-sage mb-lg"
          style={{
            opacity: alwaysOpacity,
          }}
        >
          will always lead to
        </p>

        <p
          className="text-display text-coral text-heavy"
          style={{
            opacity: killingOpacity,
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
