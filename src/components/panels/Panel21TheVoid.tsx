import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface Panel21TheVoidProps {
  progress: number
}

export default function Panel21TheVoid({ progress }: Panel21TheVoidProps) {
  // The void underneath - why you can't stop scrolling
  // This is the key insight

  const line1Opacity = lerp(progress, 0, 0.12, 0, 1)
  const line2Opacity = lerp(progress, 0.12, 0.24, 0, 1)
  const line3Opacity = lerp(progress, 0.24, 0.36, 0, 1)
  const line4Opacity = lerp(progress, 0.38, 0.5, 0, 1)
  const line5Opacity = lerp(progress, 0.52, 0.64, 0, 1)
  const line6Opacity = lerp(progress, 0.66, 0.78, 0, 1)
  const line7Opacity = lerp(progress, 0.8, 0.95, 0, 1)

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
        videoSrc="/assets/videos/void-loop.mp4"
        imageFallback="/assets/images/void.png"
        opacity={0.5}
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
        <p
          style={{
            opacity: line1Opacity,
            fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(0.6rem, 1dvh, 1.2rem)',
            lineHeight: 1.6,
          }}
        >
          And then you start to feel it.
        </p>

        <p
          style={{
            opacity: line2Opacity,
            fontSize: 'clamp(1.3rem, 3.5dvh, 2rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.8rem, 1.2dvh, 1.5rem)',
            lineHeight: 1.5,
          }}
        >
          The meaninglessness underneath.
        </p>

        <p
          style={{
            opacity: line3Opacity,
            fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(0.8rem, 1.2dvh, 1.5rem)',
            lineHeight: 1.6,
          }}
        >
          That feeling is unbearable.
        </p>

        <p
          style={{
            opacity: line4Opacity,
            fontSize: 'clamp(1.2rem, 3.5dvh, 1.9rem)',
            color: 'var(--accent-coral)',
            marginBottom: 'clamp(0.6rem, 1dvh, 1.2rem)',
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          So you scroll again.
        </p>

        <p
          style={{
            opacity: line5Opacity,
            fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(0.8rem, 1.2dvh, 1.5rem)',
            lineHeight: 1.6,
          }}
        >
          The scroll isn't seeking pleasure.
        </p>

        <p
          style={{
            opacity: line6Opacity,
            fontSize: 'clamp(1.4rem, 4dvh, 2.3rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.8rem, 1.2dvh, 1.5rem)',
            lineHeight: 1.4,
            fontWeight: 600,
          }}
        >
          It's fleeing pain.
        </p>

        <p
          style={{
            opacity: line7Opacity,
            fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
            color: 'var(--sage)',
            lineHeight: 1.6,
            fontStyle: 'italic',
          }}
        >
          We face the void.
        </p>
      </div>
    </section>
  )
}
