import { lerp } from '../../utils/animation'

// AI-generated meditating figure with contained circuits
const MeditatingFigureImage = ({ opacity, scale }: { opacity: number; scale: number }) => (
  <img
    src="/assets/images/meditation-contained.png"
    alt="Meditating figure with contained circuit patterns"
    style={{
      width: '300px',
      height: 'auto',
      maxWidth: '100%',
      objectFit: 'contain',
      opacity,
      transform: `scale(${scale})`,
    }}
  />
)

interface Panel7AnswerProps {
  progress: number
}

export default function Panel7Answer({ progress }: Panel7AnswerProps) {
  // Map scroll progress to animation phases
  // 0-0.15: "Artificial Intelligence," appears
  // 0.15-0.3: "without wisdom," appears
  // 0.3-0.45: "is inherently destructive." appears
  // 0.45-0.65: Figure appears
  // 0.65-0.8: Supporting text appears
  // 0.8-1.0: Scroll hint

  const text1Opacity = lerp(progress, 0, 0.12, 0, 1)
  const text1Y = lerp(progress, 0, 0.12, 20, 0)

  const text2Opacity = lerp(progress, 0.15, 0.27, 0, 1)
  const text2Y = lerp(progress, 0.15, 0.27, 20, 0)

  const text3Opacity = lerp(progress, 0.3, 0.42, 0, 1)
  const text3Y = lerp(progress, 0.3, 0.42, 20, 0)

  const figureOpacity = lerp(progress, 0.45, 0.6, 0, 1)
  const figureScale = lerp(progress, 0.45, 0.6, 0.9, 1)

  const supportingTextOpacity = lerp(progress, 0.65, 0.78, 0, 1)

  const scrollHintOpacity = lerp(progress, 0.85, 0.95, 0, 0.6)

  return (
    <section
      className="panel panel--dark-olive"
      style={{
        backgroundColor: 'var(--dark-olive)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        minHeight: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div className="content">
        {/* Text */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h2
            className="heading heading-md text-cream"
            style={{
              opacity: text1Opacity,
              transform: `translateY(${text1Y}px)`,
            }}
          >
            Artificial Intelligence,
          </h2>

          <h2
            className="heading heading-md text-cream mt-sm"
            style={{
              opacity: text2Opacity,
              transform: `translateY(${text2Y}px)`,
            }}
          >
            without wisdom,
          </h2>

          <h2
            className="heading heading-md text-cream mt-sm"
            style={{
              opacity: text3Opacity,
              transform: `translateY(${text3Y}px)`,
            }}
          >
            is inherently destructive.
          </h2>
        </div>

        {/* Meditating figure */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: 'var(--space-xl) 0',
          }}
        >
          <MeditatingFigureImage opacity={figureOpacity} scale={figureScale} />
        </div>

        {/* Supporting text */}
        <div style={{ opacity: supportingTextOpacity }}>
          <p className="body-lg text-cream">
            Wisdom is what keeps the pattern contained.
          </p>
          <p className="body-lg text-cream mt-sm">
            Wisdom is what turns power into care.
          </p>
        </div>

        {/* Scroll hint */}
        <p
          className="body-md text-cream mt-xl"
          style={{ opacity: scrollHintOpacity }}
        >
          ↓ So what went wrong?
        </p>
      </div>
    </section>
  )
}
