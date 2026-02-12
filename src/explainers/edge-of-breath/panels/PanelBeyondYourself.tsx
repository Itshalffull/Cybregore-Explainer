import { lerp } from '../../../utils/animation'
import VideoBackground from '../../../components/VideoBackground'

interface PanelProps {
  progress: number
}

export default function PanelBeyondYourself({ progress }: PanelProps) {
  // Deepening the Flip — from intellectual to experiential
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

  // Background fades in early and stays
  const bgOpacity = lerp(progress, 0, 0.15, 0, 0.35)

  return (
    <section className="panel panel--dark" style={{ position: 'relative' }}>
      <VideoBackground
        videoSrc="/assets/videos/beyond-yourself-loop.mp4"
        imageFallback="/assets/images/beyond-yourself.png"
        opacity={bgOpacity}
      />
      <div className="panel-body panel-body--over-video" style={{ position: 'relative', zIndex: 1 }}>
        <p
          className="text-body text-sage text-center text-shadow-depth mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          It is amazing that there is this thing we need
          that causes both total suffering and total surrender.
        </p>

        <p
          className="text-body text-bold text-cream text-center text-shadow-depth mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Total suffering and total surrender — the same mechanism.
        </p>

        <p
          className="text-body text-sage text-center text-shadow-depth mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          The same edge.
        </p>

        <p
          className="text-body text-cream text-center text-shadow-depth mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          The breath you are desperate for
          is not what you actually need.
        </p>

        <p
          className="text-body text-sage text-center text-shadow-depth mb-xl"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          What you need is to stay at the edge
          long enough to discover —
        </p>

        <p
          className="text-body text-bold text-cream text-center text-shadow-depth"
          style={{ opacity: line6Opacity, transform: `translateY(${line6Y}px)` }}
        >
          What is on the other side of you.
        </p>
      </div>
    </section>
  )
}
