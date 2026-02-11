import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelWisdomAcceleration({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.10, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.10, 20, 0)

  const line2Opacity = lerp(progress, 0.14, 0.24, 0, 1)
  const line2Y = lerp(progress, 0.14, 0.24, 20, 0)

  const demonOpacity = lerp(progress, 0.30, 0.40, 0, 1)
  const demonY = lerp(progress, 0.30, 0.40, 25, 0)

  const line3Opacity = lerp(progress, 0.46, 0.56, 0, 1)
  const line3Y = lerp(progress, 0.46, 0.56, 15, 0)

  const line4Opacity = lerp(progress, 0.60, 0.70, 0, 1)
  const line4Y = lerp(progress, 0.60, 0.70, 15, 0)

  const boxOpacity = lerp(progress, 0.76, 0.86, 0, 1)
  const boxY = lerp(progress, 0.76, 0.86, 20, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          The world is accelerating intelligence.
          Faster models. Bigger systems. More powerful thought.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          But intelligence without wisdom IS the demon.
        </p>

        <p
          className="text-body text-bold text-coral text-center mb-xl"
          style={{ opacity: demonOpacity, transform: `translateY(${demonY}px)` }}
        >
          More thought has never been the answer.
          More thought is the disease wearing the mask of the cure.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          What if we accelerated wisdom instead?
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Action through the lens of awakening.
          The crisis itself deepening your seeing.
        </p>

        <div
          className="box-coral"
          style={{ opacity: boxOpacity, transform: `translateY(${boxY}px)` }}
        >
          <p className="text-body text-cream text-center">
            Not intelligence acceleration. <em className="text-bold">Wisdom acceleration.</em>
          </p>
        </div>
      </div>
    </section>
  )
}
