import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelSiliconValleyFail({ progress }: PanelProps) {
  const introOpacity = lerp(progress, 0.0, 0.1, 0, 1)
  const introY = lerp(progress, 0.0, 0.1, 20, 0)

  const tri1Opacity = lerp(progress, 0.15, 0.25, 0, 1)
  const tri1Y = lerp(progress, 0.15, 0.25, 20, 0)

  const tri2Opacity = lerp(progress, 0.30, 0.40, 0, 1)
  const tri2Y = lerp(progress, 0.30, 0.40, 20, 0)

  const tri3Opacity = lerp(progress, 0.45, 0.55, 0, 1)
  const tri3Y = lerp(progress, 0.45, 0.55, 20, 0)

  const closerOpacity = lerp(progress, 0.65, 0.75, 0, 1)
  const closerY = lerp(progress, 0.65, 0.75, 15, 0)

  const transitionOpacity = lerp(progress, 0.80, 0.90, 0, 1)
  const transitionY = lerp(progress, 0.80, 0.90, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: introOpacity, transform: `translateY(${introY}px)` }}
        >
          Look at what the good intentions actually produced.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: tri1Opacity, transform: `translateY(${tri1Y}px)` }}
        >
          Built to connect — <em className="text-coral">isolated.</em>
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: tri2Opacity, transform: `translateY(${tri2Y}px)` }}
        >
          Built to inform — <em className="text-coral">radicalized.</em>
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: tri3Opacity, transform: `translateY(${tri3Y}px)` }}
        >
          Built to empower — <em className="text-coral">addicted.</em>
        </p>

        <p
          className="text-body text-bold text-cream text-center mb-xl"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          Good intentions, consumed.
        </p>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: transitionOpacity, transform: `translateY(${transitionY}px)` }}
        >
          Maybe we just need to think harder about what "helping" actually means.
        </p>
      </div>
    </section>
  )
}
