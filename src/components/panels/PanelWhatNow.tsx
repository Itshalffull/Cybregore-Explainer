import { lerp } from '../../utils/animation'
import AutoScaleContent from '../AutoScaleContent'
import VideoBackground from '../VideoBackground'

interface PanelWhatNowProps {
  progress: number
}

export default function PanelWhatNow({ progress }: PanelWhatNowProps) {
  // Final panel - what do you do about it?

  // Background fades in first
  const bgOpacity = lerp(progress, 0, 0.1, 0, 0.5)

  const questionOpacity = lerp(progress, 0.05, 0.2, 0, 1)
  const questionY = lerp(progress, 0.05, 0.2, 30, 0)

  const answerOpacity = lerp(progress, 0.25, 0.45, 0, 1)
  const answerY = lerp(progress, 0.25, 0.45, 20, 0)

  const maIntroOpacity = lerp(progress, 0.5, 0.65, 0, 1)
  const maIntroY = lerp(progress, 0.5, 0.65, 20, 0)

  const linkOpacity = lerp(progress, 0.7, 0.85, 0, 1)
  const linkScale = lerp(progress, 0.7, 0.85, 0.9, 1)

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
        overflow: 'hidden',
      }}
    >
      {/* Animated video background */}
      <VideoBackground
        videoSrc="/assets/videos/monastic-academy-loop.mp4"
        imageFallback="/assets/images/monastic-academy.png"
        opacity={bgOpacity}
      />

      <AutoScaleContent maxWidth="700px" style={{ padding: '0 2rem', position: 'relative', zIndex: 1 }}>
        {/* The big question */}
        <h2
          style={{
            opacity: questionOpacity,
            transform: `translateY(${questionY}px)`,
            fontSize: 'clamp(1.8rem, 5dvh, 2.8rem)',
            fontWeight: 700,
            color: 'var(--line-art-cream)',
            textAlign: 'center',
            marginBottom: 'clamp(1rem, 2.5dvh, 2rem)',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          So what do you do about it?
        </h2>

        {/* The challenge */}
        <p
          style={{
            opacity: answerOpacity,
            transform: `translateY(${answerY}px)`,
            fontSize: 'clamp(1.1rem, 3dvh, 1.6rem)',
            color: 'var(--sage)',
            textAlign: 'center',
            lineHeight: 1.6,
            marginBottom: 'clamp(1.5rem, 3dvh, 2.5rem)',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          How do you recreate meaning, reclaim attention, and rediscover the sacred?
        </p>

        {/* Monastic Academy intro */}
        <div
          style={{
            opacity: maIntroOpacity,
            transform: `translateY(${maIntroY}px)`,
            textAlign: 'center',
            marginBottom: 'clamp(1rem, 2dvh, 1.5rem)',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(1rem, 2.8dvh, 1.4rem)',
              color: 'var(--line-art-cream)',
              lineHeight: 1.6,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            That's the question we're trying to answer at
          </p>
        </div>

        {/* Monastic Academy link */}
        <div
          style={{
            opacity: linkOpacity,
            transform: `scale(${linkScale})`,
            textAlign: 'center',
          }}
        >
          <a
            href="https://www.monasticacademy.org/train"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              fontSize: 'clamp(1.5rem, 4dvh, 2.2rem)',
              fontWeight: 700,
              color: 'var(--accent-coral)',
              textDecoration: 'none',
              padding: 'clamp(0.75rem, 1.5dvh, 1rem) clamp(1.5rem, 3dvh, 2rem)',
              border: '2px solid var(--accent-coral)',
              borderRadius: '8px',
              background: 'rgba(30, 35, 20, 0.8)',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.3s ease',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(219, 84, 97, 0.3)'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(30, 35, 20, 0.8)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Monastic Academy
          </a>
        </div>
      </AutoScaleContent>
    </section>
  )
}
