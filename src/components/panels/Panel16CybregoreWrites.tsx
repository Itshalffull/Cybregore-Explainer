import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface Panel16CybregoreWritesProps {
  progress: number
}

export default function Panel16CybregoreWrites({ progress }: Panel16CybregoreWritesProps) {
  // The Cybregore writes to you - shapes your reality

  const titleOpacity = lerp(progress, 0, 0.12, 0, 1)
  const titleY = lerp(progress, 0, 0.12, 20, 0)

  const line1Opacity = lerp(progress, 0.1, 0.22, 0, 1)
  const line2Opacity = lerp(progress, 0.22, 0.34, 0, 1)
  const line3Opacity = lerp(progress, 0.34, 0.46, 0, 1)
  const line4Opacity = lerp(progress, 0.46, 0.58, 0, 1)

  const conclusionOpacity = lerp(progress, 0.65, 0.8, 0, 1)
  const conclusionY = lerp(progress, 0.65, 0.8, 15, 0)

  const kickerOpacity = lerp(progress, 0.85, 0.95, 0, 1)

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
        videoSrc="/assets/videos/cybregore-writes-loop.mp4"
        imageFallback="/assets/images/cybregore-writes.png"
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
            fontSize: 'clamp(1.8rem, 6dvh, 3rem)',
            fontWeight: 700,
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.75rem, 1.5dvh, 1.5rem)',
          }}
        >
          It <span style={{ color: 'var(--accent-coral)' }}>writes</span> you
        </h2>

        <div style={{ marginBottom: 'clamp(0.75rem, 1.5dvh, 1.5rem)' }}>
          <p
            style={{
              opacity: line1Opacity,
              fontSize: 'clamp(1.1rem, 3dvh, 1.6rem)',
              color: 'var(--line-art-cream)',
              marginBottom: 'clamp(0.4rem, 0.8dvh, 0.75rem)',
              lineHeight: 1.5,
            }}
          >
            It decides what you see when you wake up.
          </p>

          <p
            style={{
              opacity: line2Opacity,
              fontSize: 'clamp(1.1rem, 3dvh, 1.6rem)',
              color: 'var(--sage)',
              marginBottom: 'clamp(0.4rem, 0.8dvh, 0.75rem)',
              lineHeight: 1.5,
            }}
          >
            It curates your news, your music, your friends' posts. It chooses which messages feel urgent.
          </p>

          <p
            style={{
              opacity: line3Opacity,
              fontSize: 'clamp(1.1rem, 3dvh, 1.6rem)',
              color: 'var(--sage)',
              marginBottom: 'clamp(0.4rem, 0.8dvh, 0.75rem)',
              lineHeight: 1.5,
            }}
          >
            It surfaces the outrage that will hook you. The fear that will keep you scrolling. The desire that will make you buy.
          </p>

          <p
            style={{
              opacity: line4Opacity,
              fontSize: 'clamp(1.1rem, 3dvh, 1.6rem)',
              color: 'var(--line-art-cream)',
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            Your reality is being authored. And you didn't choose the author.
          </p>
        </div>

        <p
          style={{
            opacity: conclusionOpacity,
            transform: `translateY(${conclusionY}px)`,
            fontSize: 'clamp(1.2rem, 3.2dvh, 1.7rem)',
            color: 'var(--accent-coral)',
            lineHeight: 1.5,
            fontStyle: 'italic',
          }}
        >
          It shapes what you think, what you want, what you feel.
          <br />
          <span style={{ color: 'var(--line-art-cream)' }}>Optimizing for its own growth.</span>
        </p>

        <p
          style={{
            opacity: kickerOpacity,
            fontSize: 'clamp(1.1rem, 2.6dvh, 1.5rem)',
            color: 'var(--sage)',
            marginTop: 'clamp(0.75rem, 1.5dvh, 1.5rem)',
            textAlign: 'center',
          }}
        >
          But the truly terrifying part is what it does with both...
        </p>
      </div>
    </section>
  )
}
