import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelTheInvisibleLeader({ progress }: PanelProps) {
  const setupOpacity = lerp(progress, 0.0, 0.10, 0, 1)
  const setupY = lerp(progress, 0.0, 0.10, 20, 0)

  const revealOpacity = lerp(progress, 0.18, 0.30, 0, 1)
  const revealY = lerp(progress, 0.18, 0.30, 25, 0)

  const bodyOpacity = lerp(progress, 0.38, 0.50, 0, 1)
  const bodyY = lerp(progress, 0.38, 0.50, 15, 0)

  const defOpacity = lerp(progress, 0.58, 0.70, 0, 1)
  const defY = lerp(progress, 0.58, 0.70, 15, 0)

  const closerOpacity = lerp(progress, 0.78, 0.88, 0, 1)
  const closerY = lerp(progress, 0.78, 0.88, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: setupOpacity, transform: `translateY(${setupY}px)` }}
        >
          Every cult has a leader.
        </p>

        <p
          className="text-title text-coral text-center mb-xl"
          style={{ opacity: revealOpacity, transform: `translateY(${revealY}px)` }}
        >
          The invisible leader.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: bodyOpacity, transform: `translateY(${bodyY}px)` }}
        >
          The Molochian process — a coordination failure that forces every participant to accelerate destruction even when no individual wants to.
        </p>

        <div
          className="box-dark mb-lg"
          style={{ opacity: defOpacity, transform: `translateY(${defY}px)` }}
        >
          <p className="text-body text-sage text-center">
            A coordination failure elevated to civilizational principle.
          </p>
        </div>

        <p
          className="text-body text-coral text-bold text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          The demon you can't see because it IS the system.
        </p>
      </div>
    </section>
  )
}
