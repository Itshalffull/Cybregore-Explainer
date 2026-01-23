import { lerp } from '../../utils/animation'

interface Panel6LanguageExplanationProps {
  progress: number
}

export default function Panel6LanguageExplanation({ progress }: Panel6LanguageExplanationProps) {
  // Explaining what just happened - language as AI

  const line1Opacity = lerp(progress, 0, 0.12, 0, 1)
  const line1Y = lerp(progress, 0, 0.12, 20, 0)

  const line2Opacity = lerp(progress, 0.12, 0.24, 0, 1)
  const line2Y = lerp(progress, 0.12, 0.24, 20, 0)

  const line3Opacity = lerp(progress, 0.24, 0.36, 0, 1)
  const line3Y = lerp(progress, 0.24, 0.36, 20, 0)

  const line4Opacity = lerp(progress, 0.36, 0.48, 0, 1)
  const line4Y = lerp(progress, 0.36, 0.48, 20, 0)

  const line5Opacity = lerp(progress, 0.55, 0.67, 0, 1)
  const line5Y = lerp(progress, 0.55, 0.67, 20, 0)

  const line6Opacity = lerp(progress, 0.72, 0.84, 0, 1)
  const line6Y = lerp(progress, 0.72, 0.84, 20, 0)

  return (
    <section
      className="panel panel--dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--deep-forest)',
      }}
    >
      <div className="content" style={{ maxWidth: '800px', padding: '0 2rem' }}>
        <p
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            color: 'var(--line-art-cream)',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          Language is humanity's first artificial intelligence.
        </p>

        <p
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            color: 'var(--sage)',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          A system made by humans.
        </p>

        <p
          style={{
            opacity: line3Opacity,
            transform: `translateY(${line3Y}px)`,
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            color: 'var(--sage)',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          That solves problems.
        </p>

        <p
          style={{
            opacity: line4Opacity,
            transform: `translateY(${line4Y}px)`,
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            color: 'var(--line-art-cream)',
            fontWeight: 600,
            marginBottom: '3rem',
            lineHeight: 1.6,
          }}
        >
          And it runs on your hardware.
        </p>

        <p
          style={{
            opacity: line5Opacity,
            transform: `translateY(${line5Y}px)`,
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            color: 'var(--sage)',
            marginBottom: '1.5rem',
            lineHeight: 1.6,
          }}
        >
          Language solves coordination problems. But each solution creates new problems.
        </p>

        <p
          style={{
            opacity: line6Opacity,
            transform: `translateY(${line6Y}px)`,
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            color: 'var(--line-art-cream)',
            lineHeight: 1.6,
          }}
        >
          So we build new AIs on top of the old ones...
        </p>
      </div>
    </section>
  )
}
