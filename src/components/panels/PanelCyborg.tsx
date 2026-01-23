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
      className="panel"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'var(--deep-forest)',
        padding: 'clamp(1rem, 2dvh, 2rem)',
        boxSizing: 'border-box',
      }}
    >
      <VideoBackground
        videoSrc="/assets/videos/cyborg-loop.mp4"
        imageFallback="/assets/images/cyborg.png"
        opacity={0.35}
      />
      <div className="content" style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '700px',
        padding: '0 2rem',
        maxHeight: '92dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <h2
          className="heading"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 'clamp(2rem, min(6dvh, 10vw), 3.5rem)',
            fontWeight: 700,
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.25rem, 0.5dvh, 0.5rem)',
          }}
        >
          Cyborg
        </h2>

        <p
          style={{
            opacity: titleOpacity,
            fontSize: 'clamp(0.7rem, 1.2dvh, 0.9rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--sage)',
            marginBottom: 'clamp(1rem, 1.5dvh, 2rem)',
          }}
        >
          The first half of the name
        </p>

        <div style={{ marginBottom: 'clamp(1rem, 1.5dvh, 2rem)' }}>
          <p
            style={{
              opacity: line1Opacity,
              fontSize: 'clamp(1.1rem, 2.8dvh, 1.5rem)',
              color: 'var(--line-art-cream)',
              marginBottom: 'clamp(0.5rem, 1dvh, 1rem)',
              lineHeight: 1.6,
            }}
          >
            A cyborg isn't just a sci-fi fantasy.
          </p>

          <p
            style={{
              opacity: line2Opacity,
              fontSize: 'clamp(1.1rem, 2.8dvh, 1.5rem)',
              color: 'var(--sage)',
              marginBottom: 'clamp(0.5rem, 1dvh, 1rem)',
              lineHeight: 1.6,
            }}
          >
            It's any being whose cognition extends beyond their biological body.
          </p>

          <p
            style={{
              opacity: line3Opacity,
              fontSize: 'clamp(1.1rem, 2.8dvh, 1.5rem)',
              color: 'var(--sage)',
              marginBottom: 'clamp(0.5rem, 1dvh, 1rem)',
              lineHeight: 1.6,
            }}
          >
            Your phone holds memories you've outsourced. Your calendar organizes time you no longer track. Your GPS navigates space you couldn't map.
          </p>

          <p
            style={{
              opacity: line4Opacity,
              fontSize: 'clamp(1.1rem, 2.8dvh, 1.5rem)',
              color: 'var(--line-art-cream)',
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            You are already a cyborg. You have been for years.
          </p>
        </div>

        <p
          style={{
            opacity: conclusionOpacity,
            transform: `translateY(${conclusionY}px)`,
            fontSize: 'clamp(1.2rem, 3dvh, 1.7rem)',
            color: 'var(--accent-coral)',
            lineHeight: 1.6,
            fontStyle: 'italic',
          }}
        >
          Your mind is no longer contained in your skull.
        </p>

        <p
          style={{
            opacity: transitionOpacity,
            fontSize: 'clamp(1.1rem, 2.6dvh, 1.4rem)',
            color: 'var(--sage)',
            marginTop: 'clamp(1rem, 1.5dvh, 2rem)',
            textAlign: 'center',
          }}
        >
          But the second half of the name is stranger still...
        </p>
      </div>
    </section>
  )
}
