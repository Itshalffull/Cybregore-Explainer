import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelWelcomeBreath({ progress }: PanelProps) {
  // Slow, spacious reveals — this is an invitation, not a provocation
  const line1Opacity = lerp(progress, 0.0, 0.15, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.15, 25, 0)

  const line2Opacity = lerp(progress, 0.2, 0.35, 0, 1)
  const line2Y = lerp(progress, 0.2, 0.35, 20, 0)

  const line3Opacity = lerp(progress, 0.42, 0.57, 0, 1)
  const line3Y = lerp(progress, 0.42, 0.57, 20, 0)

  const line4Opacity = lerp(progress, 0.65, 0.8, 0, 1)
  const line4Y = lerp(progress, 0.65, 0.8, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-2xl"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          Pause.
        </p>

        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          This is not something you watch.
        </p>

        <p
          className="text-body text-bold text-cream text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          This is something you breathe.
        </p>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Something ancient is about to happen in your body.
        </p>
      </div>
    </section>
  )
}
