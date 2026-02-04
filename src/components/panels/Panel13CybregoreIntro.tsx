import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface Panel13CybregoreIntroProps {
  progress: number
}

export default function Panel13CybregoreIntro({ progress }: Panel13CybregoreIntroProps) {
  // The big reveal - naming the beast
  // Dramatic, glitchy, unsettling

  const preTextOpacity = lerp(progress, 0, 0.15, 0, 1)
  const nameOpacity = lerp(progress, 0.2, 0.45, 0, 1)
  const nameScale = lerp(progress, 0.25, 0.45, 0.9, 1)
  const subtitleOpacity = lerp(progress, 0.55, 0.75, 0, 1)

  // Glitch effect - subtle random offset
  const glitchOffset = Math.sin(progress * 50) * (progress > 0.25 && progress < 0.55 ? 2 : 0)

  return (
    <section className="panel panel--dark">
      <VideoBackground
        videoSrc="/assets/videos/cybregore-loop.mp4"
        imageFallback="/assets/images/cybregore.png"
        opacity={0.35}
      />
      <div className="panel-body panel-body--over-video panel-body--wide text-center">
        <p
          className="text-body text-sage mb-xs"
          style={{
            opacity: preTextOpacity,
          }}
        >
          This entity has a name.
        </p>

        <h1
          className="text-display text-cream text-heavy text-mono tracking-wide mb-xl"
          style={{
            opacity: nameOpacity,
            transform: `scale(${nameScale}) translateX(${glitchOffset}px)`,
            textShadow: `
              ${-glitchOffset}px 0 var(--accent-coral),
              ${glitchOffset}px 0 var(--sage)
            `,
          }}
        >
          CYBREGORE
        </h1>

        <p
          className="text-body text-sage leading-normal"
          style={{
            opacity: subtitleOpacity,
            maxWidth: '650px',
            margin: '0 auto',
          }}
        >
          A planetary-scale machine built on all previous AIs. It reads you, writes to you, and optimizes for its own growth.
        </p>
      </div>
    </section>
  )
}
