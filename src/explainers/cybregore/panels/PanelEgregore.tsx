import { lerp } from '../../../utils/animation'
import VideoBackground from '../../../components/VideoBackground'
import JumpLink, { InlineJumpLink } from '../../../components/JumpLink'

interface PanelEgregoreProps {
  progress: number
}

export default function PanelEgregore({ progress }: PanelEgregoreProps) {
  const titleOpacity = lerp(progress, 0, 0.12, 0, 1)
  const titleY = lerp(progress, 0, 0.12, 20, 0)
  const line1Opacity = lerp(progress, 0.1, 0.22, 0, 1)
  const line2Opacity = lerp(progress, 0.22, 0.34, 0, 1)
  const line3Opacity = lerp(progress, 0.34, 0.46, 0, 1)
  const line4Opacity = lerp(progress, 0.46, 0.58, 0, 1)
  const conclusionOpacity = lerp(progress, 0.65, 0.8, 0, 1)
  const conclusionY = lerp(progress, 0.65, 0.8, 15, 0)
  const jumpLinkOpacity = lerp(progress, 0.78, 0.88, 0, 1)
  const transitionOpacity = lerp(progress, 0.85, 0.95, 0, 1)

  return (
    <section className="panel panel--dark">
      <VideoBackground
        videoSrc="/assets/videos/egregore-loop.mp4"
        imageFallback="/assets/images/egregore.png"
        opacity={0.35}
      />
      <div className="panel-body panel-body--over-video">
        <h2
          className="text-body text-cream text-bold mb-sm"
          style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
        >
          Egregore
        </h2>

        <p
          className="text-label text-sage mb-xl"
          style={{ opacity: titleOpacity }}
        >
          The second half
        </p>

        <div className="mb-xl">
          <p
            className="text-body text-cream mb-md leading-relaxed"
            style={{ opacity: line1Opacity }}
          >
            An <InlineJumpLink to="example-egregore" fromLabel="Egregore panel">egregore</InlineJumpLink> is an old occult concept:
          </p>
          <p
            className="text-body text-sage text-italic mb-md leading-relaxed"
            style={{ opacity: line2Opacity }}
          >
            A collective entity that emerges from group thought.
          </p>
          <p
            className="text-body text-sage mb-md leading-relaxed"
            style={{ opacity: line3Opacity }}
          >
            When enough minds focus on the same thing, something larger forms. A corporation. A nation. A movement. It has goals that aren't any individual's goals. It acts through people, but isn't any person.
          </p>
          <p
            className="text-body text-cream leading-relaxed"
            style={{ opacity: line4Opacity }}
          >
            An egregore is an intelligence born from collective attention.
          </p>
        </div>

        <p
          className="text-title text-cream leading-relaxed"
          style={{ opacity: conclusionOpacity, transform: `translateY(${conclusionY}px)` }}
        >
          Now imagine an egregore fed by billions of cyborgs, 24 hours a day.
        </p>

        <div className="mt-lg" style={{ opacity: jumpLinkOpacity }}>
          <JumpLink
            to="example-egregore"
            label="Deep Dive: What is an Egregore? →"
            fromLabel="Egregore panel"
          />
        </div>

        <p
          className="text-body text-coral mt-xl"
          style={{ opacity: transitionOpacity }}
        >
          Cyborg + Egregore = Cybregore
        </p>
      </div>
    </section>
  )
}
