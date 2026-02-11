import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelRationalistMind({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 20, 0)

  const line2Opacity = lerp(progress, 0.14, 0.24, 0, 1)
  const line2Y = lerp(progress, 0.14, 0.24, 20, 0)

  const line3Opacity = lerp(progress, 0.30, 0.40, 0, 1)
  const line3Y = lerp(progress, 0.30, 0.40, 15, 0)

  const line4Opacity = lerp(progress, 0.46, 0.56, 0, 1)
  const line4Y = lerp(progress, 0.46, 0.56, 15, 0)

  const line5Opacity = lerp(progress, 0.62, 0.72, 0, 1)
  const line5Y = lerp(progress, 0.62, 0.72, 15, 0)

  const closerOpacity = lerp(progress, 0.80, 0.90, 0, 1)
  const closerY = lerp(progress, 0.80, 0.90, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          Enter the third movement.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          The Rationalists said: the problem is in the mind.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          If you can become more rational, more logical,
          address root causes in the mind —
          that is what will make better worlds.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Not building things. Not analyzing charity.
          Rewriting cognition itself.
        </p>

        <p
          className="text-body text-cream text-bold text-center mb-xl"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          The deepest level of thought yet.
        </p>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          Surely, at this depth, the pattern would finally break.
        </p>
      </div>
    </section>
  )
}
