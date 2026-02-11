import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelWeEscaped({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.10, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.10, 20, 0)

  const line2Opacity = lerp(progress, 0.15, 0.25, 0, 1)
  const line2Y = lerp(progress, 0.15, 0.25, 20, 0)

  const line3Opacity = lerp(progress, 0.32, 0.42, 0, 1)
  const line3Y = lerp(progress, 0.32, 0.42, 20, 0)

  const line4Opacity = lerp(progress, 0.50, 0.60, 0, 1)
  const line4Y = lerp(progress, 0.50, 0.60, 15, 0)

  const closerOpacity = lerp(progress, 0.72, 0.85, 0, 1)
  const closerY = lerp(progress, 0.72, 0.85, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-cream text-bold text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          We aren't in a cult. You are.
        </p>

        <p
          className="text-body text-cream text-bold text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          We escaped. You didn't.
        </p>

        <p
          className="text-body text-cream text-bold text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          We aren't under mental control. You are.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          This isn't arrogance.
        </p>

        <p
          className="text-body text-coral text-bold text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          The first honest thing anyone has said to you.
        </p>
      </div>
    </section>
  )
}
