import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelNuclear({ progress }: PanelProps) {
  const yearOpacity = lerp(progress, 0.0, 0.10, 0, 1)
  const yearY = lerp(progress, 0.0, 0.10, 20, 0)

  const line1Opacity = lerp(progress, 0.15, 0.27, 0, 1)
  const line1Y = lerp(progress, 0.15, 0.27, 20, 0)

  const revealOpacity = lerp(progress, 0.35, 0.48, 0, 1)
  const revealY = lerp(progress, 0.35, 0.48, 20, 0)

  const line2Opacity = lerp(progress, 0.55, 0.67, 0, 1)
  const line2Y = lerp(progress, 0.55, 0.67, 15, 0)

  const closerOpacity = lerp(progress, 0.75, 0.87, 0, 1)
  const closerY = lerp(progress, 0.75, 0.87, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-label text-olive text-center mb-lg"
          style={{ opacity: yearOpacity, transform: `translateY(${yearY}px)` }}
        >
          1945
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          The cult built its first device capable of killing everyone.
        </p>

        <p
          className="text-body text-coral text-bold text-center mb-xl"
          style={{ opacity: revealOpacity, transform: `translateY(${revealY}px)` }}
        >
          The first technology that could kill all of us.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Nuclear weapons were the first time humanity could end itself.
        </p>

        <p
          className="text-body text-cream text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          The cult didn't stop. It kept building.
        </p>
      </div>
    </section>
  )
}
