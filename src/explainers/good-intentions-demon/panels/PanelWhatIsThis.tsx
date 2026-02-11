import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelWhatIsThis({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.12, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.12, 20, 0)

  const questionOpacity = lerp(progress, 0.20, 0.35, 0, 1)
  const questionY = lerp(progress, 0.20, 0.35, 25, 0)

  const line2Opacity = lerp(progress, 0.42, 0.52, 0, 1)
  const line2Y = lerp(progress, 0.42, 0.52, 15, 0)

  const line3Opacity = lerp(progress, 0.58, 0.68, 0, 1)
  const line3Y = lerp(progress, 0.58, 0.68, 15, 0)

  const closerOpacity = lerp(progress, 0.76, 0.86, 0, 1)
  const closerY = lerp(progress, 0.76, 0.86, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          What is happening here?
        </p>

        <p
          className="text-body text-bold text-cream text-center mb-xl"
          style={{ opacity: questionOpacity, transform: `translateY(${questionY}px)` }}
        >
          What is the mind that is causing this?
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Not a flaw in the plan.
          Not bad luck. Not insufficient thought.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Something operating through the act of trying to help.
        </p>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          Let us name it.
        </p>
      </div>
    </section>
  )
}
