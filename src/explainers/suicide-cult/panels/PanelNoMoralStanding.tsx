import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelNoMoralStanding({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.10, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.10, 20, 0)

  const line2Opacity = lerp(progress, 0.14, 0.24, 0, 1)
  const line2Y = lerp(progress, 0.14, 0.24, 20, 0)

  const line3Opacity = lerp(progress, 0.30, 0.40, 0, 1)
  const line3Y = lerp(progress, 0.30, 0.40, 20, 0)

  const climaxOpacity = lerp(progress, 0.48, 0.60, 0, 1)
  const climaxY = lerp(progress, 0.48, 0.60, 30, 0)

  const line4Opacity = lerp(progress, 0.68, 0.78, 0, 1)
  const line4Y = lerp(progress, 0.68, 0.78, 15, 0)

  const closerOpacity = lerp(progress, 0.84, 0.92, 0, 1)
  const closerY = lerp(progress, 0.84, 0.92, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          You were raised inside the cult.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Educated by the cult.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Your values, your ethics, your sense of right and wrong — all formed inside the death machine.
        </p>

        <div
          className="box-coral mb-xl"
          style={{ opacity: climaxOpacity, transform: `translateY(${climaxY}px)` }}
        >
          <p className="text-display text-cream text-center">
            NONE of your views have moral standing.
          </p>
        </div>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Your mind was created by a death cult.
        </p>

        <p
          className="text-body text-coral text-bold text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          It is unethical NOT to tell you.
        </p>
      </div>
    </section>
  )
}
