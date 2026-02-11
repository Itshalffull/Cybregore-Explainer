import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelNormalIsExtreme({ progress }: PanelProps) {
  const setupOpacity = lerp(progress, 0.0, 0.10, 0, 1)
  const setupY = lerp(progress, 0.0, 0.10, 20, 0)

  const revealOpacity = lerp(progress, 0.15, 0.28, 0, 1)
  const revealY = lerp(progress, 0.15, 0.28, 25, 0)

  const line1Opacity = lerp(progress, 0.35, 0.47, 0, 1)
  const line1Y = lerp(progress, 0.35, 0.47, 15, 0)

  const line2Opacity = lerp(progress, 0.55, 0.65, 0, 1)
  const line2Y = lerp(progress, 0.55, 0.65, 15, 0)

  const closerOpacity = lerp(progress, 0.75, 0.87, 0, 1)
  const closerY = lerp(progress, 0.75, 0.87, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: setupOpacity, transform: `translateY(${setupY}px)` }}
        >
          You think your lifestyle is moderate. Reasonable. Normal.
        </p>

        <p
          className="text-title text-coral text-center mb-xl"
          style={{ opacity: revealOpacity, transform: `translateY(${revealY}px)` }}
        >
          The most extreme position on the planet.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          No civilization in history has killed at this rate,
          consumed at this scale, or built weapons this powerful.
        </p>

        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          And you call it "just living."
        </p>

        <p
          className="text-body text-coral text-bold text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          Your normal is history's most radical experiment.
        </p>
      </div>
    </section>
  )
}
