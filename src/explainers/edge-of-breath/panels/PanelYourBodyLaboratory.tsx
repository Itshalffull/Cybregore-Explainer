import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelYourBodyLaboratory({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.12, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.12, 20, 0)

  const line2Opacity = lerp(progress, 0.15, 0.27, 0, 1)
  const line2Y = lerp(progress, 0.15, 0.27, 20, 0)

  const line3Opacity = lerp(progress, 0.33, 0.45, 0, 1)
  const line3Y = lerp(progress, 0.33, 0.45, 15, 0)

  const line4Opacity = lerp(progress, 0.52, 0.64, 0, 1)
  const line4Y = lerp(progress, 0.52, 0.64, 15, 0)

  const line5Opacity = lerp(progress, 0.7, 0.82, 0, 1)
  const line5Y = lerp(progress, 0.7, 0.82, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          You already have everything you need.
        </p>

        <p
          className="text-body text-bold text-cream text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Your body is the laboratory.
        </p>

        <p
          className="text-body text-bold text-cream text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Your breath is the instrument.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          The entire mechanism of craving and liberation
          lives inside your next exhale.
        </p>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          No belief required — only attention.
        </p>
      </div>
    </section>
  )
}
