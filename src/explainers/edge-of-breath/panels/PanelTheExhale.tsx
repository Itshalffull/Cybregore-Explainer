import { lerp, lerpMulti } from '../../../utils/animation'
import VideoBackground from '../../../components/VideoBackground'

interface PanelProps {
  progress: number
}

export default function PanelTheExhale({ progress }: PanelProps) {
  // Breathing circle — stays contracted, barely pulsing, emphasis on emptiness
  const circleOpacity = lerpMulti(progress, [0.0, 0.08, 0.85, 0.95], [0, 0.5, 0.5, 0.3])
  const circleScale = lerpMulti(progress, [0.0, 0.1, 0.5, 0.9], [0.35, 0.3, 0.25, 0.2])

  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 20, 0)

  const line2Opacity = lerp(progress, 0.15, 0.25, 0, 1)
  const line2Y = lerp(progress, 0.15, 0.25, 15, 0)

  const line3Opacity = lerp(progress, 0.32, 0.42, 0, 1)
  const line3Y = lerp(progress, 0.32, 0.42, 15, 0)

  const line4Opacity = lerp(progress, 0.5, 0.6, 0, 1)
  const line4Y = lerp(progress, 0.5, 0.6, 15, 0)

  const line5Opacity = lerp(progress, 0.68, 0.78, 0, 1)
  const line5Y = lerp(progress, 0.68, 0.78, 15, 0)

  const line6Opacity = lerp(progress, 0.82, 0.92, 0, 1)
  const line6Y = lerp(progress, 0.82, 0.92, 15, 0)

  return (
    <section className="panel panel--dark">
      <VideoBackground
        videoSrc="/assets/videos/void-loop.mp4"
        imageFallback="/assets/images/void.png"
        opacity={0.3}
      />
      <div className="panel-body panel-body--over-video">
        <p
          className="text-body text-sage text-center mb-lg text-shadow-depth"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          Focus on the very end of the breath.
        </p>

        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '2px solid var(--sage)',
            opacity: circleOpacity,
            transform: `scale(${circleScale})`,
            margin: '0 auto',
            transition: 'none',
          }}
          className="mb-xl"
        />

        <p
          className="text-body text-sage text-center mb-lg text-shadow-depth"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          That sensation.
        </p>

        <p
          className="text-body text-cream text-center mb-lg text-shadow-depth"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          The tightness. The pull.
          The body beginning to protest.
        </p>

        <p
          className="text-body text-bold text-cream text-center mb-xl text-shadow-depth"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Stay with it.
        </p>

        <p
          className="text-body text-sage text-center mb-lg text-shadow-depth"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          Do not breathe in yet.
        </p>

        <p
          className="text-body text-cream text-center text-shadow-depth"
          style={{ opacity: line6Opacity, transform: `translateY(${line6Y}px)` }}
        >
          This is where the teaching lives.
        </p>
      </div>
    </section>
  )
}
