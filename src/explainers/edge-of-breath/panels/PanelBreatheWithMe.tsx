import { lerp, lerpMulti } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelBreatheWithMe({ progress }: PanelProps) {
  // Breathing circle — expands on inhale, contracts toward exhale
  const circleOpacity = lerp(progress, 0.0, 0.08, 0, 0.6)
  const circleScale = lerpMulti(progress, [0.0, 0.15, 0.35, 0.55, 0.85], [0.4, 1.2, 1.2, 0.3, 0.3])

  // Text reveals — spacious, meditative pacing
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 20, 0)

  // Inhale instruction — fades in and out
  const inhaleOpacity = lerpMulti(progress, [0.12, 0.22, 0.32, 0.38], [0, 1, 1, 0])
  const inhaleY = lerp(progress, 0.12, 0.22, 15, 0)

  // Exhale instruction — appears and stays
  const exhaleOpacity = lerp(progress, 0.35, 0.45, 0, 1)
  const exhaleY = lerp(progress, 0.35, 0.45, 15, 0)

  const line3Opacity = lerp(progress, 0.52, 0.62, 0, 1)
  const line3Y = lerp(progress, 0.52, 0.62, 15, 0)

  const line4Opacity = lerp(progress, 0.68, 0.78, 0, 1)
  const line4Y = lerp(progress, 0.68, 0.78, 15, 0)

  const line5Opacity = lerp(progress, 0.82, 0.92, 0, 1)
  const line5Y = lerp(progress, 0.82, 0.92, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-bold text-cream text-center mb-xl"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          Breathe in.
        </p>

        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '2px solid var(--sage)',
            opacity: circleOpacity,
            transform: `scale(${circleScale})`,
            margin: '0 auto',
            transition: 'none',
          }}
          className="mb-xl"
        />

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: inhaleOpacity, transform: `translateY(${inhaleY}px)` }}
        >
          Breathe in. Slowly. Fill yourself.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: exhaleOpacity, transform: `translateY(${exhaleY}px)` }}
        >
          Now breathe out.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Let all your breath out.
        </p>

        <p
          className="text-body text-cream text-bold text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Hold the intention to continue to breathe out.
        </p>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          Even when there is nothing left.
        </p>
      </div>
    </section>
  )
}
