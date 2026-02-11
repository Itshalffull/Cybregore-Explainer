import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelYouAreInACult({ progress }: PanelProps) {
  const headlineOpacity = lerp(progress, 0.0, 0.10, 0, 1)
  const headlineY = lerp(progress, 0.0, 0.10, 25, 0)

  const line1Opacity = lerp(progress, 0.18, 0.30, 0, 1)
  const line1Y = lerp(progress, 0.18, 0.30, 20, 0)

  const line2Opacity = lerp(progress, 0.40, 0.52, 0, 1)
  const line2Y = lerp(progress, 0.40, 0.52, 20, 0)

  const line3Opacity = lerp(progress, 0.60, 0.72, 0, 1)
  const line3Y = lerp(progress, 0.60, 0.72, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-display text-coral text-center mb-2xl"
          style={{ opacity: headlineOpacity, transform: `translateY(${headlineY}px)` }}
        >
          You Are in a Cult
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          The most destructive cult in human history.
        </p>

        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          It has no leader. No compound. No robes.
        </p>

        <p
          className="text-title text-cream text-center"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          You didn't join. You were born into it.
        </p>
      </div>
    </section>
  )
}
