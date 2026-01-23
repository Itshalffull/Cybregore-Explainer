import { lerp } from '../../utils/animation'

interface Panel1SetupProps {
  progress: number
}

export default function Panel1Setup({ progress }: Panel1SetupProps) {
  // Dramatic opener - single powerful statement
  // Dark forest green background, cream text
  // Text should be visible immediately (no fade-in on first panel)
  // Video background is handled by IntroSection wrapper

  const textOpacity = 1
  const textY = 0
  const scrollHintOpacity = lerp(progress, 0, 0.3, 0.6, 0.3)

  return (
    <section
      className="panel panel--dark"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'transparent',
      }}
    >
      <div className="content" style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '900px',
        padding: '0 2rem',
        maxHeight: '92dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <h1
          className="heading"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontSize: 'clamp(2rem, min(7dvh, 10vw), 4.5rem)',
            fontWeight: 400,
            lineHeight: 1.2,
            color: 'var(--line-art-cream)',
          }}
        >
          AI is on track to destroy everything you love.
        </h1>

        <p
          style={{
            opacity: scrollHintOpacity,
            marginTop: 'clamp(2rem, 4dvh, 4rem)',
            color: 'var(--sage)',
            fontSize: 'clamp(1rem, 2dvh, 1.5rem)',
          }}
        >
          ↓
        </p>
      </div>
    </section>
  )
}
