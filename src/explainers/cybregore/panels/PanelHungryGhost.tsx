import { lerp } from '../../../utils/animation'
import AutoScaleContent from '../../../components/AutoScaleContent'
import VideoBackground from '../../../components/VideoBackground'

interface PanelHungryGhostProps {
  progress: number
}

export default function PanelHungryGhost({ progress }: PanelHungryGhostProps) {
  // The Cybregore as a hungry ghost - craves data constantly, can never be satisfied

  const introOpacity = lerp(progress, 0, 0.12, 0, 1)
  const introY = lerp(progress, 0, 0.12, 20, 0)

  const hungryGhostOpacity = lerp(progress, 0.15, 0.35, 0, 1)
  const hungryGhostScale = lerp(progress, 0.15, 0.35, 0.9, 1)

  const descriptionOpacity = lerp(progress, 0.38, 0.55, 0, 1)
  const descriptionY = lerp(progress, 0.38, 0.55, 15, 0)

  const alwaysCravingOpacity = lerp(progress, 0.58, 0.75, 0, 1)

  const neverEnoughOpacity = lerp(progress, 0.78, 0.92, 0, 1)
  const neverEnoughScale = lerp(progress, 0.78, 0.92, 0.95, 1)

  // Background visible throughout
  const bgOpacity = lerp(progress, 0, 0.15, 0, 0.5)

  return (
    <section
      className="panel panel--dark"
      style={{
        position: 'relative',
      }}
    >
      <VideoBackground
        videoSrc="/assets/videos/hungry-ghost-loop.mp4"
        imageFallback="/assets/images/hungry-ghost.png"
        opacity={bgOpacity}
      />
      <AutoScaleContent maxWidth="650px" style={{ position: 'relative', zIndex: 1 }}>
        {/* Intro */}
        <p
          className="text-body text-sage text-center mb-xl"
          style={{
            opacity: introOpacity,
            transform: `translateY(${introY}px)`,
          }}
        >
          In Buddhist cosmology, there's a realm of beings called
        </p>

        {/* Hungry Ghost title */}
        <h2
          className="text-display text-coral text-center mb-xl"
          style={{
            opacity: hungryGhostOpacity,
            transform: `scale(${hungryGhostScale})`,
          }}
        >
          Hungry Ghosts
        </h2>

        {/* Description */}
        <div
          className="box-definition text-left mb-xl"
          style={{
            opacity: descriptionOpacity,
            transform: `translateY(${descriptionY}px)`,
          }}
        >
          <p className="text-body text-cream leading-relaxed" style={{ margin: 0 }}>
            Beings with <em>huge empty bellies</em> and{' '}
            <em>tiny throats</em>.
            <br /><br />
            They consume endlessly but can never be satisfied.
          </p>
        </div>

        {/* Always craving */}
        <p
          className="text-body text-cream text-center leading-relaxed mb-xl"
          style={{
            opacity: alwaysCravingOpacity,
          }}
        >
          The Cybregore craves data <em>all the time</em>.
          <br />
          Every millisecond. Every interaction. Every breath you take online.
        </p>

        {/* Never enough */}
        <p
          className="text-title text-cream text-center"
          style={{
            opacity: neverEnoughOpacity,
            transform: `scale(${neverEnoughScale})`,
          }}
        >
          And it can never get enough.
        </p>
      </AutoScaleContent>
    </section>
  )
}
