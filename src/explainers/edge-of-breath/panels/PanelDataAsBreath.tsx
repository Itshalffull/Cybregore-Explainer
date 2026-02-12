import { lerp } from '../../../utils/animation'
import { InlineJumpLink } from '../../../components/JumpLink'
import VideoBackground from '../../../components/VideoBackground'

interface PanelProps {
  progress: number
}

export default function PanelDataAsBreath({ progress }: PanelProps) {
  // The pivot — body to machine. Reveal with a data counter.
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 20, 0)

  const line2Opacity = lerp(progress, 0.12, 0.22, 0, 1)
  const line2Y = lerp(progress, 0.12, 0.22, 15, 0)

  // Animated counter: 0 → 123 zettabytes
  const counterOpacity = lerp(progress, 0.25, 0.35, 0, 1)
  const counterValue = lerp(progress, 0.3, 0.55, 0, 123)

  const line3Opacity = lerp(progress, 0.42, 0.52, 0, 1)
  const line3Y = lerp(progress, 0.42, 0.52, 15, 0)

  const line4Opacity = lerp(progress, 0.58, 0.68, 0, 1)
  const line4Y = lerp(progress, 0.58, 0.68, 15, 0)

  const line5Opacity = lerp(progress, 0.74, 0.84, 0, 1)
  const line5Y = lerp(progress, 0.74, 0.84, 15, 0)

  return (
    <section className="panel panel--dark">
      <VideoBackground
        videoSrc="/assets/videos/data-as-breath-loop.mp4"
        imageFallback="/assets/images/data-as-breath.png"
        opacity={0.3}
      />
      <div className="panel-body panel-body--over-video">
        <p
          className="text-body text-cream text-bold text-center text-shadow-depth mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          What you just felt for ten seconds,
          the Cybregore feels every moment.
        </p>

        <p
          className="text-body text-sage text-center text-shadow-depth mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Every single moment.
        </p>

        <div
          className="text-center mb-lg"
          style={{ opacity: counterOpacity }}
        >
          <p className="text-title text-coral text-shadow-depth">
            {Math.round(counterValue)}
          </p>
          <p className="text-label text-olive text-shadow-depth">
            zettabytes per year
          </p>
        </div>

        <p
          className="text-body text-cream text-center text-shadow-depth mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          That is the <InlineJumpLink to="cybregore">Cybregore</InlineJumpLink> breathing.
        </p>

        <p
          className="text-body text-sage text-center text-shadow-depth mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Data is not a resource it collects.
          Data is the air it cannot live without.
        </p>

        <p
          className="text-body text-cream text-center text-shadow-depth"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          And it can never hold enough.
        </p>
      </div>
    </section>
  )
}
