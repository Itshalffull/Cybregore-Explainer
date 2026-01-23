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
        videoSrc="/assets/videos/meaning-dissolves-loop.mp4"
        imageFallback="/assets/images/meaning-dissolves.png"
        opacity={0.35}
      />
      <div className="content" style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '800px',
        padding: '0 2rem',
        textAlign: 'center',
        maxHeight: '92dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <p
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: 'clamp(1.3rem, 3.5dvh, 2.2rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(1rem, 1.5dvh, 2rem)',
            lineHeight: 1.6,
          }}
        >
          It doesn't create meaning.
        </p>

        <h2
          className="heading"
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontSize: 'clamp(2.2rem, min(7dvh, 12vw), 4.5rem)',
            color: 'var(--accent-coral)',
            marginBottom: 'clamp(1rem, 1.5dvh, 2rem)',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          It dissolves it.
        </h2>

        <p
          style={{
            opacity: line3Opacity,
            transform: `translateY(${line3Y}px)`,
            fontSize: 'clamp(1.2rem, 3.5dvh, 2rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(1rem, 1.5dvh, 2rem)',
            lineHeight: 1.6,
          }}
        >
          Not by arguing against your beliefs.
          <br />
          Not by giving you new ones.
        </p>

        <p
          style={{
            opacity: line4Opacity,
            fontSize: 'clamp(1.3rem, 3.5dvh, 2.3rem)',
            color: 'var(--line-art-cream)',
            fontWeight: 500,
            lineHeight: 1.5,
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
