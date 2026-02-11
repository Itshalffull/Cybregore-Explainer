import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelYudkowskiParadox({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.08, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.08, 20, 0)

  const line2Opacity = lerp(progress, 0.10, 0.18, 0, 1)
  const line2Y = lerp(progress, 0.10, 0.18, 20, 0)

  const warningOpacity = lerp(progress, 0.22, 0.32, 0, 1)
  const warningY = lerp(progress, 0.22, 0.32, 20, 0)

  const line3Opacity = lerp(progress, 0.38, 0.48, 0, 1)
  const line3Y = lerp(progress, 0.38, 0.48, 15, 0)

  const punchlineOpacity = lerp(progress, 0.54, 0.64, 0, 1)
  const punchlineY = lerp(progress, 0.54, 0.64, 25, 0)

  const closerOpacity = lerp(progress, 0.72, 0.82, 0, 1)
  const closerY = lerp(progress, 0.72, 0.82, 15, 0)

  const transitionOpacity = lerp(progress, 0.86, 0.94, 0, 1)
  const transitionY = lerp(progress, 0.86, 0.94, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          Eliezer Yudkowski dedicated his life to one mission.
        </p>

        <p
          className="text-body text-cream text-bold text-center mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Do not build AI — it will destroy the world.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: warningOpacity, transform: `translateY(${warningY}px)` }}
        >
          He said it so clearly. So compellingly. So urgently.
          He built an entire community around this warning.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          And the people he influenced most — the ones who understood
          his arguments most deeply —
        </p>

        <p
          className="text-title text-coral text-center mb-xl"
          style={{ opacity: punchlineOpacity, transform: `translateY(${punchlineY}px)` }}
        >
          They founded the AI companies.
        </p>

        <div
          className="box-coral mb-xl"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          <p className="text-body text-cream text-center">
            The warning became the invitation.
          </p>
        </div>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: transitionOpacity, transform: `translateY(${transitionY}px)` }}
        >
          Three movements. Three levels of depth. The same failure every time.
        </p>
      </div>
    </section>
  )
}
