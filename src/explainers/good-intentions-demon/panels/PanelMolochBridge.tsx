import { lerp } from '../../../utils/animation'
import { InlineJumpLink } from '../../../components/JumpLink'

interface PanelProps {
  progress: number
}

export default function PanelMolochBridge({ progress }: PanelProps) {
  const titleOpacity = lerp(progress, 0.0, 0.10, 0, 1)
  const titleY = lerp(progress, 0.0, 0.10, 25, 0)

  const defOpacity = lerp(progress, 0.14, 0.24, 0, 1)
  const defY = lerp(progress, 0.14, 0.24, 20, 0)

  const line1Opacity = lerp(progress, 0.30, 0.40, 0, 1)
  const line1Y = lerp(progress, 0.30, 0.40, 15, 0)

  const line2Opacity = lerp(progress, 0.46, 0.56, 0, 1)
  const line2Y = lerp(progress, 0.46, 0.56, 15, 0)

  const boxOpacity = lerp(progress, 0.62, 0.72, 0, 1)
  const boxY = lerp(progress, 0.62, 0.72, 20, 0)

  const closerOpacity = lerp(progress, 0.78, 0.88, 0, 1)
  const closerY = lerp(progress, 0.78, 0.88, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-bold text-coral text-center mb-xl"
          style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
        >
          Moloch wears a halo.
        </p>

        <div
          className="box-definition mb-xl"
          style={{ opacity: defOpacity, transform: `translateY(${defY}px)` }}
        >
          <p className="text-body text-cream text-left">
            The Molochian process captures every coordination attempt from within.
            It is the ancient god who demanded child sacrifice,
            now operating as coordination failure dressed as progress.
          </p>
        </div>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          When you sacrifice your clarity to "help" — when you act
          from the urgency of thought rather than the stillness of seeing —
        </p>

        <p
          className="text-body text-cream text-bold text-center mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          You are feeding Moloch.
        </p>

        <div
          className="box-dark mb-xl"
          style={{ opacity: boxOpacity, transform: `translateY(${boxY}px)` }}
        >
          <p className="text-body text-sage text-center">
            The <InlineJumpLink to="cybregore">Cybregore</InlineJumpLink>'s hunger, applied to the domain of virtue.
            Every good intention, metabolized into fuel for the machine
            that no one chose to build.
          </p>
        </div>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          Now look in the mirror.
        </p>
      </div>
    </section>
  )
}
