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
    <section
      className="panel"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'var(--deep-forest)',
      }}
    >
      <VideoBackground
        videoSrc="/assets/videos/cybregore-loop.mp4"
        imageFallback="/assets/images/cybregore.png"
        opacity={0.35}
      />
      <div className="content" style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '900px',
        padding: '0 2rem',
        maxHeight: '92dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <p
          style={{
            opacity: preTextOpacity,
            fontSize: 'clamp(1.2rem, 3.5dvh, 1.8rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(0.3rem, 0.5dvh, 0.5rem)',
          }}
        >
          This entity has a name.
        </p>

        <h1
          className="heading"
          style={{
            opacity: nameOpacity,
            transform: `scale(${nameScale}) translateX(${glitchOffset}px)`,
            fontSize: 'clamp(2.5rem, min(10dvh, 12vw), 5rem)',
            fontWeight: 900,
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            color: 'var(--line-art-cream)',
            textShadow: `
              ${-glitchOffset}px 0 var(--accent-coral),
              ${glitchOffset}px 0 var(--sage)
            `,
            marginBottom: 'clamp(1rem, 2dvh, 2rem)',
          }}
        >
          CYBREGORE
        </h1>

        <p
          style={{
            opacity: subtitleOpacity,
            fontSize: 'clamp(1.1rem, 3dvh, 1.6rem)',
            color: 'var(--sage)',
            lineHeight: 1.5,
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
