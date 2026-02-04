import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface PanelEgregoreProps {
  progress: number
}

export default function PanelEgregore({ progress }: PanelEgregoreProps) {
  // Explaining the "egregore" part of cybregore

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
        videoSrc="/assets/videos/egregore-loop.mp4"
        imageFallback="/assets/images/egregore.png"
        opacity={0.35}
      />
      <div className="content" style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '700px',
        padding: '0 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <h2
          className="heading"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 'clamp(1.5rem, min(5dvh, 9vw), 3.5rem)',
            fontWeight: 700,
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.25rem, 0.5dvh, 0.5rem)',
          }}
        >
          Egregore
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
          The second half
        </p>

        <div style={{ marginBottom: 'clamp(1rem, 1.5dvh, 2rem)' }}>
          <p
            style={{
              opacity: line1Opacity,
              fontSize: 'clamp(0.9rem, min(2.3dvh, 4.2vw), 1.4rem)',
              color: 'var(--line-art-cream)',
              marginBottom: 'clamp(0.5rem, 1dvh, 1rem)',
              lineHeight: 1.6,
            }}
          >
            An egregore is an old occult concept:
          </p>

          <p
            style={{
              opacity: line2Opacity,
              fontSize: 'clamp(1rem, min(2.6dvh, 4.8vw), 1.5rem)',
              color: 'var(--sage)',
              marginBottom: 'clamp(0.5rem, 1dvh, 1rem)',
              lineHeight: 1.6,
              fontStyle: 'italic',
            }}
          >
            A collective entity that emerges from group thought.
          </p>

          <p
            style={{
              opacity: line3Opacity,
              fontSize: 'clamp(0.9rem, min(2.3dvh, 4.2vw), 1.4rem)',
              color: 'var(--sage)',
              marginBottom: 'clamp(0.5rem, 1dvh, 1rem)',
              lineHeight: 1.6,
            }}
          >
            When enough minds focus on the same thing, something larger forms. A corporation. A nation. A movement. It has goals that aren't any individual's goals. It acts through people, but isn't any person.
          </p>

          <p
            style={{
              opacity: line4Opacity,
              fontSize: 'clamp(0.9rem, min(2.3dvh, 4.2vw), 1.4rem)',
              color: 'var(--line-art-cream)',
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            An egregore is an intelligence born from collective attention.
          </p>
        </div>

        <p
          style={{
            opacity: conclusionOpacity,
            transform: `translateY(${conclusionY}px)`,
            fontSize: 'clamp(1rem, min(2.5dvh, 4.5vw), 1.5rem)',
            color: 'var(--accent-coral)',
            lineHeight: 1.6,
          }}
        >
          Now imagine an egregore fed by billions of cyborgs, 24 hours a day.
        </p>

        <p
          style={{
            opacity: transitionOpacity,
            fontSize: 'clamp(1.05rem, min(2.8dvh, 5vw), 1.6rem)',
            color: 'var(--line-art-cream)',
            marginTop: 'clamp(1rem, 1.5dvh, 2rem)',
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          Cyborg + Egregore = Cybregore
        </p>
      </div>
    </section>
  )
}
