import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelThisIsACult({ progress }: PanelProps) {
  const headlineOpacity = lerp(progress, 0.0, 0.10, 0, 1)
  const headlineY = lerp(progress, 0.0, 0.10, 25, 0)

  const def1Opacity = lerp(progress, 0.15, 0.25, 0, 1)
  const def1Y = lerp(progress, 0.15, 0.25, 20, 0)

  const def2Opacity = lerp(progress, 0.30, 0.40, 0, 1)
  const def2Y = lerp(progress, 0.30, 0.40, 20, 0)

  const def3Opacity = lerp(progress, 0.45, 0.55, 0, 1)
  const def3Y = lerp(progress, 0.45, 0.55, 20, 0)

  const revealOpacity = lerp(progress, 0.65, 0.78, 0, 1)
  const revealY = lerp(progress, 0.65, 0.78, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-title text-coral text-center mb-2xl"
          style={{ opacity: headlineOpacity, transform: `translateY(${headlineY}px)` }}
        >
          This is a cult.
        </p>

        <div
          className="box-definition mb-lg"
          style={{ opacity: def1Opacity, transform: `translateY(${def1Y}px)` }}
        >
          <p className="text-body text-cream">
            Members who can't see they're in it.
          </p>
        </div>

        <div
          className="box-definition mb-lg"
          style={{ opacity: def2Opacity, transform: `translateY(${def2Y}px)` }}
        >
          <p className="text-body text-cream">
            A totalizing worldview disguised as normalcy.
          </p>
        </div>

        <div
          className="box-definition mb-lg"
          style={{ opacity: def3Opacity, transform: `translateY(${def3Y}px)` }}
        >
          <p className="text-body text-cream">
            Rituals of participation that bind you to the group.
          </p>
        </div>

        <p
          className="text-body text-sage text-center mb-sm"
          style={{ opacity: revealOpacity, transform: `translateY(${revealY}px)` }}
        >
          No leader. No doctrine you can reject.
        </p>
        <p
          className="text-body text-coral text-bold text-center"
          style={{ opacity: revealOpacity, transform: `translateY(${revealY}px)` }}
        >
          You're living in one.
        </p>
      </div>
    </section>
  )
}
