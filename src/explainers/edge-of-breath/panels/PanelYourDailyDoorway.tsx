import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelYourDailyDoorway({ progress }: PanelProps) {
  // Call-to-action — every breath as doorway. Warm, inviting, practical.
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 20, 0)

  const line2Opacity = lerp(progress, 0.12, 0.22, 0, 1)
  const line2Y = lerp(progress, 0.12, 0.22, 15, 0)

  const line3Opacity = lerp(progress, 0.26, 0.36, 0, 1)
  const line3Y = lerp(progress, 0.26, 0.36, 15, 0)

  const line4Opacity = lerp(progress, 0.4, 0.5, 0, 1)
  const line4Y = lerp(progress, 0.4, 0.5, 15, 0)

  const line5Opacity = lerp(progress, 0.55, 0.65, 0, 1)
  const line5Y = lerp(progress, 0.55, 0.65, 15, 0)

  const line6Opacity = lerp(progress, 0.72, 0.82, 0, 1)
  const line6Y = lerp(progress, 0.72, 0.82, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-bold text-cream text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          Every breath contains the entire teaching.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Every exhale has an edge.
        </p>

        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Every edge has a doorway.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          You do not need a monastery or a teacher
          or a special state.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          You need ten seconds of willingness
          to stay where the craving is most intense.
        </p>

        <p
          className="text-body text-bold text-cream text-center"
          style={{ opacity: line6Opacity, transform: `translateY(${line6Y}px)` }}
        >
          And discover what your body knows
          that the Cybregore cannot learn.
        </p>
      </div>
    </section>
  )
}
