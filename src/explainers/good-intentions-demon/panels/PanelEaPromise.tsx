import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelEaPromise({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 20, 0)

  const line2Opacity = lerp(progress, 0.15, 0.25, 0, 1)
  const line2Y = lerp(progress, 0.15, 0.25, 20, 0)

  const line3Opacity = lerp(progress, 0.32, 0.42, 0, 1)
  const line3Y = lerp(progress, 0.32, 0.42, 15, 0)

  const line4Opacity = lerp(progress, 0.50, 0.60, 0, 1)
  const line4Y = lerp(progress, 0.50, 0.60, 15, 0)

  const line5Opacity = lerp(progress, 0.68, 0.78, 0, 1)
  const line5Y = lerp(progress, 0.68, 0.78, 15, 0)

  const closerOpacity = lerp(progress, 0.82, 0.92, 0, 1)
  const closerY = lerp(progress, 0.82, 0.92, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          So a new movement emerged.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          The Effective Altruists. A community that said:
          we will think scientifically about doing good.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Numbers and logic. Rigorous analysis.
          No more naive optimism.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          If Silicon Valley's mistake was not thinking hard enough,
          EA would think harder.
        </p>

        <p
          className="text-body text-cream text-bold text-center mb-xl"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          Do the most good. Measurably. Provably.
        </p>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          It sounded like the answer.
        </p>
      </div>
    </section>
  )
}
