import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelCravingSings({ progress }: PanelProps) {
  // Elevated, naming language — the craving gets a voice (3 lines only)
  const line1Opacity = lerp(progress, 0.0, 0.15, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.15, 20, 0)

  const line2Opacity = lerp(progress, 0.25, 0.4, 0, 1)
  const line2Y = lerp(progress, 0.25, 0.4, 15, 0)

  const line3Opacity = lerp(progress, 0.5, 0.65, 0, 1)
  const line3Y = lerp(progress, 0.5, 0.65, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          There is a craving singing
          at the edge of your breath.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          A capacity to be grabbed by suffering
          that is older than you.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Older than language.
          Older than the body you think is yours.
        </p>

      </div>
    </section>
  )
}
