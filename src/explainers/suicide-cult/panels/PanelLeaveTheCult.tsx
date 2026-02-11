import { lerp } from '../../../utils/animation'
import JumpLink from '../../../components/JumpLink'

interface PanelProps {
  progress: number
}

export default function PanelLeaveTheCult({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.10, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.10, 20, 0)

  const line2Opacity = lerp(progress, 0.14, 0.24, 0, 1)
  const line2Y = lerp(progress, 0.14, 0.24, 20, 0)

  const line3Opacity = lerp(progress, 0.30, 0.40, 0, 1)
  const line3Y = lerp(progress, 0.30, 0.40, 15, 0)

  const boxOpacity = lerp(progress, 0.48, 0.60, 0, 1)
  const boxY = lerp(progress, 0.48, 0.60, 15, 0)

  const line4Opacity = lerp(progress, 0.68, 0.78, 0, 1)
  const line4Y = lerp(progress, 0.68, 0.78, 15, 0)

  const ctaOpacity = lerp(progress, 0.84, 0.92, 0, 1)
  const ctaY = lerp(progress, 0.84, 0.92, 20, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          You have two options.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Stay in the cult and participate in the most destructive force
          in the history of life on Earth.
        </p>

        <p
          className="text-body text-cream text-bold text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Or leave.
        </p>

        <div
          className="box-dark mb-xl"
          style={{ opacity: boxOpacity, transform: `translateY(${boxY}px)` }}
        >
          <p className="text-body text-sage text-center">
            Leaving is not easy. Leaving is not comfortable.
            But it is the only sane response to an insane system.
          </p>
        </div>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          The door is open.
        </p>

        <p
          className="text-title text-coral text-center mb-xl"
          style={{ opacity: ctaOpacity, transform: `translateY(${ctaY}px)` }}
        >
          Will you walk through it?
        </p>

        <div style={{ opacity: ctaOpacity }}>
          <JumpLink to="edge-of-breath" label="Start With Your Breath →" fromLabel="Leave the Cult" />
          <JumpLink to="good-intentions-demon" label="Why Helping Feeds the Demon →" fromLabel="Leave the Cult" />
          <JumpLink to="cybregore" label="What Is the Cybregore? →" fromLabel="Leave the Cult" />
        </div>
      </div>
    </section>
  )
}
