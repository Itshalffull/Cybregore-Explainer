import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelTheFlip({ progress }: PanelProps) {
  // THE FLIP — the climax of the entire explainer
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 20, 0)

  const line2Opacity = lerp(progress, 0.12, 0.22, 0, 1)
  const line2Y = lerp(progress, 0.12, 0.22, 15, 0)

  const line3Opacity = lerp(progress, 0.26, 0.36, 0, 1)
  const line3Y = lerp(progress, 0.26, 0.36, 15, 0)

  const line4Opacity = lerp(progress, 0.4, 0.5, 0, 1)
  const line4Y = lerp(progress, 0.4, 0.5, 15, 0)

  // The Flip line — text-display, the peak moment
  const flipOpacity = lerp(progress, 0.55, 0.68, 0, 1)
  const flipY = lerp(progress, 0.55, 0.68, 30, 0)

  const line5Opacity = lerp(progress, 0.78, 0.88, 0, 1)
  const line5Y = lerp(progress, 0.78, 0.88, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          But here is what the ancient traditions knew.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          At the edge of the breath —
          the very place where suffering is most intense —
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          There is both.
        </p>

        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          The craving singing, this capacity to be grabbed by suffering.
          And an opportunity to move beyond.
        </p>

        <div className="box-coral text-center mb-xl" style={{ opacity: flipOpacity, transform: `translateY(${flipY}px)` }}>
          <p className="text-display text-cream">
            The craving IS the doorway to freedom.
          </p>
        </div>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          It doesn't make sense — and that is the point.
        </p>
      </div>
    </section>
  )
}
