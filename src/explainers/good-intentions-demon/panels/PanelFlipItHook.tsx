import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelFlipItHook({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.12, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.12, 20, 0)
  const line2Opacity = lerp(progress, 0.25, 0.40, 0, 1)
  const line2Y = lerp(progress, 0.25, 0.40, 15, 0)
  const line3Opacity = lerp(progress, 0.55, 0.70, 0, 1)
  const line3Y = lerp(progress, 0.55, 0.70, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-cream text-bold text-center mb-xl"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          You think you're helping.
        </p>
        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Every rescue attempt feeds the monster.
        </p>
        <p
          className="text-title text-coral text-center leading-tight"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          You're feeding the demon.
        </p>
      </div>
    </section>
  )
}
