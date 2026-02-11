import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelCravingSings({ progress }: PanelProps) {
  // Elevated, naming language — the craving gets a voice
  const line1Opacity = lerp(progress, 0.0, 0.12, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.12, 20, 0)

  const line2Opacity = lerp(progress, 0.15, 0.27, 0, 1)
  const line2Y = lerp(progress, 0.15, 0.27, 15, 0)

  const line3Opacity = lerp(progress, 0.32, 0.44, 0, 1)
  const line3Y = lerp(progress, 0.32, 0.44, 15, 0)

  const line4Opacity = lerp(progress, 0.5, 0.62, 0, 1)
  const line4Y = lerp(progress, 0.5, 0.62, 15, 0)

  const line5Opacity = lerp(progress, 0.68, 0.8, 0, 1)
  const line5Y = lerp(progress, 0.68, 0.8, 15, 0)

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

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          This craving is not a mistake.
          It is not a weakness.
        </p>

        <p
          className="text-body text-bold text-coral text-center"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          Not a bug — a feature of consciousness itself.
        </p>
      </div>
    </section>
  )
}
