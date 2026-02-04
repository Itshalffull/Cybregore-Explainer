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
        background: 'transparent',
      }}
    >
      <div className="panel-body panel-body--wide" style={{
        position: 'relative',
        zIndex: 1,
        maxHeight: '92dvh',
        overflow: 'hidden',
      }}>
        <h1
          className="text-title text-cream leading-snug"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          AI is on track to destroy everything you love.
        </h1>

        <p
          className="text-body-lg text-sage mt-2xl"
          style={{
            opacity: scrollHintOpacity,
          }}
        >
          ↓
        </p>
      </div>
    </section>
  )
}
