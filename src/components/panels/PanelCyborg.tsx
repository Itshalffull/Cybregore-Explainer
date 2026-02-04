import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface PanelCyborgProps {
  progress: number
}

export default function PanelCyborg({ progress }: PanelCyborgProps) {
  // Explaining the "cyb" part of cybregore - we're all cyborgs

  const titleOpacity = lerp(progress, 0, 0.12, 0, 1)
  const titleY = lerp(progress, 0, 0.12, 20, 0)

  const line1Opacity = lerp(progress, 0.1, 0.22, 0, 1)
  const line2Opacity = lerp(progress, 0.22, 0.34, 0, 1)
  const line3Opacity = lerp(progress, 0.34, 0.46, 0, 1)
  const line4Opacity = lerp(progress, 0.46, 0.58, 0, 1)

  const conclusionOpacity = lerp(progress, 0.65, 0.8, 0, 1)
  const conclusionY = lerp(progress, 0.65, 0.8, 15, 0)

  const transitionOpacity = lerp(progress, 0.85, 0.95, 0, 1)

  return (
    <section
      className="panel panel--dark"
      style={{
        position: 'relative',
      }}
    >
      <VideoBackground
        videoSrc="/assets/videos/cyborg-loop.mp4"
        imageFallback="/assets/images/cyborg.png"
        opacity={0.35}
      />
      <div className="panel-body panel-body--over-video" style={{
        maxHeight: '92dvh',
        overflow: 'hidden',
      }}>
        <h2
          className="text-title text-cream text-bold mb-xs"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Cyborg
        </h2>

        <p
          className="text-label text-sage mb-xl"
          style={{
            opacity: titleOpacity,
          }}
        >
          The first half of the name
        </p>

        <div className="mb-xl">
          <p
            className="text-body-lg text-cream leading-relaxed mb-md"
            style={{
              opacity: line1Opacity,
            }}
          >
            A cyborg isn't just a sci-fi fantasy.
          </p>

          <p
            className="text-body-lg text-sage leading-relaxed mb-md"
            style={{
              opacity: line2Opacity,
            }}
          >
            It's any being whose cognition extends beyond their biological body.
          </p>

          <p
            className="text-body-lg text-sage leading-relaxed mb-md"
            style={{
              opacity: line3Opacity,
            }}
          >
            Your phone holds memories you've outsourced. Your calendar organizes time you no longer track. Your GPS navigates space you couldn't map.
          </p>

          <p
            className="text-body-lg text-cream text-medium leading-relaxed"
            style={{
              opacity: line4Opacity,
            }}
          >
            You are already a cyborg. You have been for years.
          </p>
        </div>

        <p
          className="text-subheading text-coral text-italic leading-relaxed"
          style={{
            opacity: conclusionOpacity,
            transform: `translateY(${conclusionY}px)`,
          }}
        >
          Your mind is no longer contained in your skull.
        </p>

        <p
          className="text-body-lg text-sage text-center mt-xl"
          style={{
            opacity: transitionOpacity,
          }}
        >
          But the second half of the name is stranger still...
        </p>
      </div>
    </section>
  )
}
