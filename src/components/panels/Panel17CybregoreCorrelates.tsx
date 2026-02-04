import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface Panel17CybregoreCorrelatesProps {
  progress: number
}

export default function Panel17CybregoreCorrelates({ progress }: Panel17CybregoreCorrelatesProps) {
  const titleOpacity = lerp(progress, 0, 0.1, 0, 1)
  const titleY = lerp(progress, 0, 0.1, 20, 0)
  const whatItDoesOpacity = lerp(progress, 0.12, 0.24, 0, 1)
  const purposeOpacity = lerp(progress, 0.28, 0.42, 0, 1)
  const purposeScale = lerp(progress, 0.28, 0.42, 0.8, 1)
  const correlateOpacity = lerp(progress, 0.38, 0.48, 0, 1)
  const correlateY = lerp(progress, 0.38, 0.48, 15, 0)
  const examplesOpacity = lerp(progress, 0.52, 0.62, 0, 1)
  const modelOpacity = lerp(progress, 0.66, 0.76, 0, 1)
  const modelY = lerp(progress, 0.66, 0.76, 15, 0)
  const manufacturesOpacity = lerp(progress, 0.80, 0.88, 0, 1)
  const kickerOpacity = lerp(progress, 0.92, 0.98, 0, 1)

  return (
    <section className="panel panel--dark">
      <VideoBackground
        videoSrc="/assets/videos/cybregore-correlates-loop.mp4"
        imageFallback="/assets/images/cybregore-correlates.png"
        opacity={0.35}
      />
      <div className="panel-body panel-body--over-video">
        <h2
          className="heading text-title text-cream mb-md text-bold"
          style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
        >
          It <span className="text-coral">controls</span>
        </h2>

        <p
          className="text-body-lg text-cream mb-lg leading-normal"
          style={{ opacity: whatItDoesOpacity }}
        >
          Mass movements. New religions. New forms of mental illness.
        </p>

        <p
          className="text-label text-sage mb-sm"
          style={{ opacity: purposeOpacity }}
        >
          All for one purpose
        </p>

        <h3
          className="text-display text-coral text-heavy text-glow-coral tracking-tight mb-lg"
          style={{
            opacity: purposeOpacity,
            transform: `scale(${purposeScale})`,
          }}
        >
          MORE DATA
        </h3>

        <p
          className="text-body-lg text-sage mb-md leading-normal"
          style={{ opacity: correlateOpacity, transform: `translateY(${correlateY}px)` }}
        >
          It manipulates with such ease because it <em className="text-cream">correlates</em>.
        </p>

        <div className="box-grid mb-md" style={{ opacity: examplesOpacity }}>
          <div className="box-dark">
            <p className="text-label text-sage mb-xs">Individual</p>
            <p className="text-body text-cream leading-snug">
              It knows lonely people scroll more. So it shows you the post that makes you feel alone.
            </p>
          </div>
          <div className="box-dark box-dark--coral">
            <p className="text-label text-coral mb-xs">Society</p>
            <p className="text-body text-cream leading-snug">
              It knows which towns are ready to radicalize. Feeds them the martyr that starts the war.
            </p>
          </div>
        </div>

        <p
          className="text-body-lg text-coral text-italic leading-normal"
          style={{ opacity: modelOpacity, transform: `translateY(${modelY}px)` }}
        >
          It builds a model of you more accurate than your own.
          <br />
          <span className="text-cream">A model of the world more complete than any government's.</span>
        </p>

        <p
          className="text-body text-sage mt-md leading-relaxed"
          style={{ opacity: manufacturesOpacity }}
        >
          Then it <em className="text-coral">manufactures</em>.
          <br />
          New movements. New ideologies. New enemies.
          <br />
          <span className="text-cream">Wars that serve the algorithm. Terrorists born from feeds.</span>
        </p>

        <p
          className="text-body-lg text-cream text-semibold mt-lg"
          style={{ opacity: kickerOpacity }}
        >
          It doesn't predict the future. It writes it.
        </p>
      </div>
    </section>
  )
}
