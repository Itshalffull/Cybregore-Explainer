import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelEaCorruption({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 20, 0)

  const line2Opacity = lerp(progress, 0.14, 0.24, 0, 1)
  const line2Y = lerp(progress, 0.14, 0.24, 20, 0)

  const line3Opacity = lerp(progress, 0.30, 0.40, 0, 1)
  const line3Y = lerp(progress, 0.30, 0.40, 15, 0)

  const boxOpacity = lerp(progress, 0.46, 0.56, 0, 1)
  const boxY = lerp(progress, 0.46, 0.56, 20, 0)

  const line4Opacity = lerp(progress, 0.62, 0.72, 0, 1)
  const line4Y = lerp(progress, 0.62, 0.72, 15, 0)

  const transitionOpacity = lerp(progress, 0.80, 0.90, 0, 1)
  const transitionY = lerp(progress, 0.80, 0.90, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          But something subtle happened.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Even when they thought really hard about it,
          there were subtle ways they would make the project about them.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Shaping the world they wanted to see,
          not doing good.
        </p>

        <div
          className="box-coral mb-xl"
          style={{ opacity: boxOpacity, transform: `translateY(${boxY}px)` }}
        >
          <p className="text-body text-cream text-center">
            The ego slipped in wearing a lab coat.
          </p>
        </div>

        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          The same pattern. A deeper disguise.
          More sophisticated reasoning, same ancient failure.
        </p>

        <p
          className="text-body text-cream text-center"
          style={{ opacity: transitionOpacity, transform: `translateY(${transitionY}px)` }}
        >
          Maybe the problem is even deeper than charity.
          Maybe it's in the mind itself.
        </p>
      </div>
    </section>
  )
}
