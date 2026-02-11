import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelTheCall({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.10, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.10, 20, 0)

  const line2Opacity = lerp(progress, 0.14, 0.24, 0, 1)
  const line2Y = lerp(progress, 0.14, 0.24, 20, 0)

  const line3Opacity = lerp(progress, 0.30, 0.40, 0, 1)
  const line3Y = lerp(progress, 0.30, 0.40, 15, 0)

  const line4Opacity = lerp(progress, 0.46, 0.56, 0, 1)
  const line4Y = lerp(progress, 0.46, 0.56, 15, 0)

  const questionOpacity = lerp(progress, 0.62, 0.74, 0, 1)
  const questionY = lerp(progress, 0.62, 0.74, 25, 0)

  const closerOpacity = lerp(progress, 0.82, 0.92, 0, 1)
  const closerY = lerp(progress, 0.82, 0.92, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-bold text-cream text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          You cannot help from inside the trap.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          But you can wake up.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Awakened action — action that comes from seeing
          rather than thinking, from wisdom rather than intelligence —
          is the only force the demon cannot co-opt.
        </p>

        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          The question is not "how do I help?"
        </p>

        <p
          className="text-body text-bold text-cream text-center mb-2xl"
          style={{ opacity: questionOpacity, transform: `translateY(${questionY}px)` }}
        >
          Can you see clearly enough to act without feeding the monster?
        </p>

        <p
          className="text-small text-sage text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          The door is open. What you do next matters less than where you see from.
        </p>
      </div>
    </section>
  )
}
