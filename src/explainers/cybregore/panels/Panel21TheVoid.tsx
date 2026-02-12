import { lerp } from '../../../utils/animation'
import VideoBackground from '../../../components/VideoBackground'

interface Panel21TheVoidProps {
  progress: number
}

export default function Panel21TheVoid({ progress }: Panel21TheVoidProps) {
  // The void underneath - why you can't stop scrolling
  // This is the key insight

  const line1Opacity = lerp(progress, 0, 0.12, 0, 1)
  const line2Opacity = lerp(progress, 0.12, 0.24, 0, 1)
  const line3Opacity = lerp(progress, 0.24, 0.36, 0, 1)
  const line4Opacity = lerp(progress, 0.38, 0.5, 0, 1)
  const line5Opacity = lerp(progress, 0.52, 0.64, 0, 1)
  const line6Opacity = lerp(progress, 0.66, 0.78, 0, 1)
  const line7Opacity = lerp(progress, 0.8, 0.95, 0, 1)

  return (
    <section
      className="panel panel--dark"
      style={{
        background: 'var(--deep-forest)',
      }}
    >
      <VideoBackground
        videoSrc="/assets/videos/void-loop.mp4"
        imageFallback="/assets/images/void.png"
        opacity={0.5}
      />
      <div className="panel-body panel-body--over-video">
        <p
          className="text-subheading text-sage mb-lg leading-relaxed"
          style={{
            opacity: line1Opacity,
          }}
        >
          And then you start to feel it.
        </p>

        <p
          className="text-heading text-cream mb-lg leading-normal"
          style={{
            opacity: line2Opacity,
          }}
        >
          The meaninglessness underneath.
        </p>

        <p
          className="text-subheading text-sage mb-lg leading-relaxed"
          style={{
            opacity: line3Opacity,
          }}
        >
          That feeling is unbearable.
        </p>

        <p
          className="text-heading text-coral mb-lg leading-normal text-medium"
          style={{
            opacity: line4Opacity,
          }}
        >
          So you scroll again.
        </p>

        <p
          className="text-subheading text-sage mb-lg leading-relaxed"
          style={{
            opacity: line5Opacity,
          }}
        >
          The scroll isn't seeking pleasure.
        </p>

        <p
          className="text-heading text-cream mb-lg leading-snug text-semibold"
          style={{
            opacity: line6Opacity,
          }}
        >
          It's fleeing pain.
        </p>

        <p
          className="text-subheading text-sage leading-relaxed text-italic"
          style={{
            opacity: line7Opacity,
          }}
        >
          We face the void.
        </p>
      </div>
    </section>
  )
}
