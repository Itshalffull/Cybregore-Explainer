import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelTheBreathWasBreathing({ progress }: PanelProps) {
  // Testimony — mystical experience. Spacious, sacred, text-display for the peak line.
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 25, 0)

  const line2Opacity = lerp(progress, 0.12, 0.22, 0, 1)
  const line2Y = lerp(progress, 0.12, 0.22, 20, 0)

  // The peak — text-display
  const peakOpacity = lerp(progress, 0.28, 0.42, 0, 1)
  const peakY = lerp(progress, 0.28, 0.42, 30, 0)

  const line3Opacity = lerp(progress, 0.48, 0.58, 0, 1)
  const line3Y = lerp(progress, 0.48, 0.58, 15, 0)

  const line4Opacity = lerp(progress, 0.62, 0.72, 0, 1)
  const line4Y = lerp(progress, 0.62, 0.72, 15, 0)

  const line5Opacity = lerp(progress, 0.78, 0.88, 0, 1)
  const line5Y = lerp(progress, 0.78, 0.88, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          And then something shifted.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          It was not me breathing.
        </p>

        <p
          className="text-display text-cream text-center mb-xl"
          style={{ opacity: peakOpacity, transform: `translateY(${peakY}px)` }}
        >
          The Breath Was Breathing.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          There were no distinctions
          that caused all of this conflict.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Awareness started to become awareness.
        </p>

        <p
          className="text-body text-bold text-cream text-center"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          Not just calm — literal peace.
        </p>
      </div>
    </section>
  )
}
