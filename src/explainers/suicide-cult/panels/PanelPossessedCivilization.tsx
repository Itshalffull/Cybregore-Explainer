import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelPossessedCivilization({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.10, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.10, 20, 0)

  const revealOpacity = lerp(progress, 0.18, 0.30, 0, 1)
  const revealY = lerp(progress, 0.18, 0.30, 25, 0)

  const line2Opacity = lerp(progress, 0.38, 0.48, 0, 1)
  const line2Y = lerp(progress, 0.38, 0.48, 15, 0)

  const line3Opacity = lerp(progress, 0.55, 0.65, 0, 1)
  const line3Y = lerp(progress, 0.55, 0.65, 15, 0)

  const closerOpacity = lerp(progress, 0.75, 0.87, 0, 1)
  const closerY = lerp(progress, 0.75, 0.87, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          A civilization that builds the instruments of its own extinction is not making bad choices.
        </p>

        <p
          className="text-title text-coral text-center mb-xl"
          style={{ opacity: revealOpacity, transform: `translateY(${revealY}px)` }}
        >
          It is possessed.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          The demon does not control individuals.
          It controls the spaces between them.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          The market. The infrastructure. The invisible doctrine.
        </p>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          "This is just how things work."
        </p>
      </div>
    </section>
  )
}
