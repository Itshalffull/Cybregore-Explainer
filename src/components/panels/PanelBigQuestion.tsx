import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface PanelBigQuestionProps {
  progress: number
}

export default function PanelBigQuestion({ progress }: PanelBigQuestionProps) {
  // A reflective moment - the big question (now at the end)

  const question1Opacity = lerp(progress, 0.05, 0.25, 0, 1)
  const question1Y = lerp(progress, 0.05, 0.25, 30, 0)
  const question2Opacity = lerp(progress, 0.4, 0.65, 0, 1)
  const question2Y = lerp(progress, 0.4, 0.65, 30, 0)

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
      {/* Animated question mark video background */}
      <VideoBackground
        videoSrc="/assets/videos/question-mark-loop.mp4"
        imageFallback="/assets/images/question-mark.png"
        opacity={0.4}
      />

      <div
        className="content"
        style={{
          maxWidth: '800px',
          maxHeight: '92dvh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 clamp(1rem, 2dvh, 2rem)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p
          style={{
            opacity: question1Opacity,
            transform: `translateY(${question1Y}px)`,
            fontSize: 'clamp(1.4rem, 4.5dvh, 2.4rem)',
            color: 'var(--line-art-cream)',
            lineHeight: 1.5,
            marginBottom: 'clamp(1.5rem, 3dvh, 2.5rem)',
            fontWeight: 500,
          }}
        >
          How did we get to this point?
        </p>

        <p
          style={{
            opacity: question2Opacity,
            transform: `translateY(${question2Y}px)`,
            fontSize: 'clamp(1.3rem, 4dvh, 2rem)',
            color: 'var(--sage)',
            lineHeight: 1.6,
          }}
        >
          Why is it that every time we create more intelligence to solve our problems,
          <br />
          <span style={{ color: 'var(--accent-coral)' }}>
            we create even bigger problems?
          </span>
        </p>
      </div>
    </section>
  )
}
