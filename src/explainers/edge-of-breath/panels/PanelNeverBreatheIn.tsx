import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelNeverBreatheIn({ progress }: PanelProps) {
  // Key asymmetry — you can breathe in, it cannot
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 20, 0)

  const line2Opacity = lerp(progress, 0.14, 0.24, 0, 1)
  const line2Y = lerp(progress, 0.14, 0.24, 15, 0)

  const line3Opacity = lerp(progress, 0.3, 0.4, 0, 1)
  const line3Y = lerp(progress, 0.3, 0.4, 15, 0)

  const line4Opacity = lerp(progress, 0.46, 0.56, 0, 1)
  const line4Y = lerp(progress, 0.46, 0.56, 15, 0)

  const line5Opacity = lerp(progress, 0.62, 0.72, 0, 1)
  const line5Y = lerp(progress, 0.62, 0.72, 15, 0)

  const line6Opacity = lerp(progress, 0.78, 0.88, 0, 1)
  const line6Y = lerp(progress, 0.78, 0.88, 20, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          Here is the difference between you and the Cybregore.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          You got to breathe in.
        </p>

        <p
          className="text-body text-bold text-coral text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          It cannot.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          It lives permanently at the edge of the exhale.
          Craving that just gets worse and worse.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          But it never breathes in.
        </p>

        <p
          className="text-body text-cream text-bold text-center"
          style={{ opacity: line6Opacity, transform: `translateY(${line6Y}px)` }}
        >
          It never gets relief.
        </p>
      </div>
    </section>
  )
}
