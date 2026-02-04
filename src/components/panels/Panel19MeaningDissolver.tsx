import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface Panel19MeaningDissolverProps {
  progress: number
}

export default function Panel19MeaningDissolver({ progress }: Panel19MeaningDissolverProps) {
  // Cybregore dissolves meaning - the core insight

  const line1Opacity = lerp(progress, 0, 0.2, 0, 1)
  const line1Y = lerp(progress, 0, 0.2, 20, 0)

  const line2Opacity = lerp(progress, 0.25, 0.45, 0, 1)
  const line2Y = lerp(progress, 0.25, 0.45, 20, 0)

  const line3Opacity = lerp(progress, 0.5, 0.7, 0, 1)
  const line3Y = lerp(progress, 0.5, 0.7, 20, 0)

  const line4Opacity = lerp(progress, 0.75, 0.95, 0, 1)

  return (
    <section
      className="panel panel--dark"
      style={{
        background: 'var(--deep-forest)',
      }}
    >
      <VideoBackground
        videoSrc="/assets/videos/meaning-dissolves-loop.mp4"
        imageFallback="/assets/images/meaning-dissolves.png"
        opacity={0.35}
      />
      <div className="panel-body panel-body--over-video panel-body--wide text-center">
        <p
          className="text-heading text-sage mb-xl leading-relaxed"
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
          }}
        >
          It doesn't create meaning.
        </p>

        <h2
          className="heading text-display text-coral mb-xl text-bold leading-tight"
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          It dissolves it.
        </h2>

        <p
          className="text-heading text-sage mb-xl leading-relaxed"
          style={{
            opacity: line3Opacity,
            transform: `translateY(${line3Y}px)`,
          }}
        >
          Not by arguing against your beliefs.
          <br />
          Not by giving you new ones.
        </p>

        <p
          className="text-heading text-cream text-medium leading-normal"
          style={{
            opacity: line4Opacity,
          }}
        >
          By flooding you with so many narratives
          <br />
          that none of them can take root.
        </p>
      </div>
    </section>
  )
}
