import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelCultAnatomy({ progress }: PanelProps) {
  const headlineOpacity = lerp(progress, 0.0, 0.10, 0, 1)
  const headlineY = lerp(progress, 0.0, 0.10, 20, 0)

  const pair1Opacity = lerp(progress, 0.15, 0.25, 0, 1)
  const pair1Y = lerp(progress, 0.15, 0.25, 20, 0)

  const pair2Opacity = lerp(progress, 0.30, 0.40, 0, 1)
  const pair2Y = lerp(progress, 0.30, 0.40, 20, 0)

  const pair3Opacity = lerp(progress, 0.45, 0.55, 0, 1)
  const pair3Y = lerp(progress, 0.45, 0.55, 20, 0)

  const closerOpacity = lerp(progress, 0.68, 0.80, 0, 1)
  const closerY = lerp(progress, 0.68, 0.80, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-cream text-bold text-center mb-2xl"
          style={{ opacity: headlineOpacity, transform: `translateY(${headlineY}px)` }}
        >
          Anatomy of the cult.
        </p>

        <div
          className="box-definition mb-lg"
          style={{ opacity: pair1Opacity, transform: `translateY(${pair1Y}px)` }}
        >
          <p className="text-body text-coral text-bold mb-xs">No meeting hall.</p>
          <p className="text-body text-cream">Your home is the temple.</p>
        </div>

        <div
          className="box-definition mb-lg"
          style={{ opacity: pair2Opacity, transform: `translateY(${pair2Y}px)` }}
        >
          <p className="text-body text-coral text-bold mb-xs">No scripture.</p>
          <p className="text-body text-cream">The market is the doctrine.</p>
        </div>

        <div
          className="box-definition mb-lg"
          style={{ opacity: pair3Opacity, transform: `translateY(${pair3Y}px)` }}
        >
          <p className="text-body text-coral text-bold mb-xs">No initiation.</p>
          <p className="text-body text-cream">You were born into it.</p>
        </div>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          Every system you depend on binds you to the killing.
        </p>
      </div>
    </section>
  )
}
