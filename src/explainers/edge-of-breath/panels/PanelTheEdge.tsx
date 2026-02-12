import { lerp } from '../../../utils/animation'
import VideoBackground from '../../../components/VideoBackground'

interface PanelProps {
  progress: number
}

export default function PanelTheEdge({ progress }: PanelProps) {
  // Intensity builds — tighter spacing, coral for the craving
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 20, 0)

  const line2Opacity = lerp(progress, 0.12, 0.22, 0, 1)
  const line2Y = lerp(progress, 0.12, 0.22, 15, 0)

  const line3Opacity = lerp(progress, 0.26, 0.36, 0, 1)
  const line3Y = lerp(progress, 0.26, 0.36, 15, 0)

  const line4Opacity = lerp(progress, 0.4, 0.5, 0, 1)
  const line4Y = lerp(progress, 0.4, 0.5, 15, 0)

  const line5Opacity = lerp(progress, 0.55, 0.65, 0, 1)
  const line5Y = lerp(progress, 0.55, 0.65, 15, 0)

  const line6Opacity = lerp(progress, 0.7, 0.82, 0, 1)
  const line6Y = lerp(progress, 0.7, 0.82, 20, 0)

  return (
    <section className="panel panel--dark">
      <VideoBackground
        videoSrc="/assets/videos/edge-cells-loop.mp4"
        imageFallback="/assets/images/edge-cells.png"
        opacity={0.3}
      />
      <div className="panel-body panel-body--over-video">
        <p
          className="text-body text-coral text-bold text-center text-shadow-depth mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          It just gets worse and worse.
        </p>

        <p
          className="text-body text-cream text-center text-shadow-depth mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Every cell screams.
        </p>

        <p
          className="text-body text-sage text-center text-shadow-depth mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          The voices inside you are inventing reasons
          to breathe in.
        </p>

        <p
          className="text-body text-cream text-center text-shadow-depth mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Urgent, desperate, reasonable-sounding voices.
        </p>

        <p
          className="text-body text-sage text-center text-shadow-depth mb-xl"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          Each one louder than the last.
        </p>

        <p
          className="text-title text-coral text-center text-shadow-depth"
          style={{ opacity: line6Opacity, transform: `translateY(${line6Y}px)` }}
        >
          This is the edge.
        </p>
      </div>
    </section>
  )
}
