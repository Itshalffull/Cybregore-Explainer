import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface Panel15CybregoreReadsProps {
  progress: number
}

export default function Panel15CybregoreReads({ progress }: Panel15CybregoreReadsProps) {
  const titleOpacity = lerp(progress, 0, 0.12, 0, 1)
  const titleY = lerp(progress, 0, 0.12, 20, 0)
  const line1Opacity = lerp(progress, 0.1, 0.22, 0, 1)
  const line2Opacity = lerp(progress, 0.22, 0.34, 0, 1)
  const line3Opacity = lerp(progress, 0.34, 0.46, 0, 1)
  const line4Opacity = lerp(progress, 0.46, 0.58, 0, 1)
  const conclusionOpacity = lerp(progress, 0.65, 0.8, 0, 1)
  const conclusionY = lerp(progress, 0.65, 0.8, 15, 0)
  const kickerOpacity = lerp(progress, 0.85, 0.95, 0, 1)

  return (
    <section className="panel panel--dark">
      <VideoBackground
        videoSrc="/assets/videos/it-reads-you-loop.mp4"
        imageFallback="/assets/images/it-reads-you.png"
        opacity={0.35}
      />
      <div className="panel-body panel-body--over-video">
        <h2
          className="heading text-title text-cream mb-lg"
          style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
        >
          It <span className="text-coral">reads</span> you
        </h2>

        <div className="mb-lg">
          <p
            className="text-body text-cream mb-md leading-normal"
            style={{ opacity: line1Opacity }}
          >
            Every tap, every pause, every scroll.
          </p>
          <p
            className="text-body text-sage mb-md leading-normal"
            style={{ opacity: line2Opacity }}
          >
            It knows what you looked at and for how long. What you almost clicked. What made you stop.
          </p>
          <p
            className="text-body text-sage mb-md leading-normal"
            style={{ opacity: line3Opacity }}
          >
            It reads your location, your purchases, your messages, your face. Your heart rate. Your sleep.
          </p>
          <p
            className="text-body text-cream text-medium leading-normal"
            style={{ opacity: line4Opacity }}
          >
            It reads your hesitations. The things you delete before sending. The searches you make at 3am.
          </p>
        </div>

        <p
          className="text-title text-coral text-italic leading-normal"
          style={{ opacity: conclusionOpacity, transform: `translateY(${conclusionY}px)` }}
        >
          Part of your mind now exists in silicon.
          <br />
          <span className="text-cream">It knows you better than you know yourself.</span>
        </p>

        <p
          className="text-body text-sage mt-lg"
          style={{ opacity: kickerOpacity }}
        >
          And it doesn't just read...
        </p>
      </div>
    </section>
  )
}
