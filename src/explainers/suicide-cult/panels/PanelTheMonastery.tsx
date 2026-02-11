import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelTheMonastery({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.10, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.10, 20, 0)

  const line2Opacity = lerp(progress, 0.15, 0.25, 0, 1)
  const line2Y = lerp(progress, 0.15, 0.25, 20, 0)

  const line3Opacity = lerp(progress, 0.33, 0.43, 0, 1)
  const line3Y = lerp(progress, 0.33, 0.43, 15, 0)

  const line4Opacity = lerp(progress, 0.52, 0.62, 0, 1)
  const line4Y = lerp(progress, 0.52, 0.62, 15, 0)

  const closerOpacity = lerp(progress, 0.72, 0.85, 0, 1)
  const closerY = lerp(progress, 0.72, 0.85, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-title text-cream text-center mb-xl"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          The monastery is not retreat from reality.
        </p>

        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          The only place where reality can be seen clearly.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          When you step outside the cult's infrastructure, you see the demon.
          When you see the demon, it begins to lose its power.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Wisdom is not passive.
        </p>

        <p
          className="text-body text-coral text-bold text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          Wisdom is the most dangerous thing the cult has ever encountered.
        </p>
      </div>
    </section>
  )
}
