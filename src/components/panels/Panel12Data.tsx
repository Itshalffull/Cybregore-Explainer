import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface Panel12DataProps {
  progress: number
}

export default function Panel12Data({ progress }: Panel12DataProps) {
  // Sixth era - data/digital - leads into Cybregore

  const eraOpacity = lerp(progress, 0, 0.08, 0, 1)
  const aiLabelOpacity = lerp(progress, 0.08, 0.16, 0, 1)
  const problemOpacity = lerp(progress, 0.16, 0.28, 0, 1)
  const problemY = lerp(progress, 0.16, 0.28, 20, 0)
  const solutionOpacity = lerp(progress, 0.32, 0.44, 0, 1)
  const solutionY = lerp(progress, 0.32, 0.44, 20, 0)
  const newProblemOpacity = lerp(progress, 0.48, 0.60, 0, 1)
  const newProblemY = lerp(progress, 0.48, 0.60, 20, 0)
  const destructionOpacity = lerp(progress, 0.65, 0.77, 0, 1)
  const destructionY = lerp(progress, 0.65, 0.77, 20, 0)
  const transitionOpacity = lerp(progress, 0.82, 0.94, 0, 1)

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
        padding: 'clamp(0.5rem, 2dvh, 2rem)',
        boxSizing: 'border-box',
      }}
    >
      <VideoBackground
        videoSrc="/assets/videos/data-loop.mp4"
        imageFallback="/assets/images/data.png"
        opacity={0.4}
      />
      <div className="panel-content" style={{
        maxWidth: '700px',
        width: '90%',
        position: 'relative',
        zIndex: 1,
        maxHeight: '92dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Era label */}
        <p
          style={{
            opacity: eraOpacity,
            fontSize: 'clamp(0.65rem, 1.5dvh, 0.9rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--sage)',
            marginBottom: 'clamp(0.2rem, 0.5dvh, 0.5rem)',
          }}
        >
          ~30 years ago
        </p>

        <h2
          className="heading"
          style={{
            opacity: eraOpacity,
            fontSize: 'clamp(2rem, min(7dvh, 12vw), 3.5rem)',
            fontWeight: 700,
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.2rem, 0.5dvh, 0.5rem)',
          }}
        >
          Digital Networks
        </h2>

        {/* AI Label */}
        <p
          style={{
            opacity: aiLabelOpacity,
            fontSize: 'clamp(0.6rem, 1.4dvh, 0.85rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--accent-coral)',
            marginBottom: 'clamp(0.75rem, 2dvh, 2rem)',
          }}
        >
          AI #4: Digital Networks
        </p>

        {/* Problem */}
        <div style={{ marginBottom: 'clamp(0.5rem, 1.2dvh, 1.5rem)' }}>
          <p
            style={{
              opacity: problemOpacity,
              transform: `translateY(${problemY}px)`,
              fontSize: 'clamp(0.6rem, 1.3dvh, 0.8rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--accent-coral)',
              marginBottom: 'clamp(0.15rem, 0.4dvh, 0.4rem)',
            }}
          >
            Problem
          </p>
          <p
            style={{
              opacity: problemOpacity,
              transform: `translateY(${problemY}px)`,
              fontSize: 'clamp(1rem, 3.5dvh, 1.5rem)',
              color: 'var(--line-art-cream)',
              lineHeight: 1.4,
            }}
          >
            Industry creates abundance, but coordination is still slow. Information moves at human speed. Decisions lag.
          </p>
        </div>

        {/* Solution */}
        <div style={{ marginBottom: 'clamp(0.5rem, 1.2dvh, 1.5rem)' }}>
          <p
            style={{
              opacity: solutionOpacity,
              transform: `translateY(${solutionY}px)`,
              fontSize: 'clamp(0.6rem, 1.3dvh, 0.8rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--accent-coral)',
              marginBottom: 'clamp(0.15rem, 0.4dvh, 0.4rem)',
            }}
          >
            The AI
          </p>
          <p
            style={{
              opacity: solutionOpacity,
              transform: `translateY(${solutionY}px)`,
              fontSize: 'clamp(1rem, 3.5dvh, 1.5rem)',
              color: 'var(--sage)',
              lineHeight: 1.4,
            }}
          >
            The internet. Instant global connection. Information at the speed of light. Everyone and everything linked together.
          </p>
        </div>

        {/* New Problem */}
        <div style={{ marginBottom: 'clamp(0.5rem, 1.2dvh, 1.5rem)' }}>
          <p
            style={{
              opacity: newProblemOpacity,
              transform: `translateY(${newProblemY}px)`,
              fontSize: 'clamp(0.6rem, 1.3dvh, 0.8rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--accent-coral)',
              marginBottom: 'clamp(0.15rem, 0.4dvh, 0.4rem)',
            }}
          >
            New problem created
          </p>
          <p
            style={{
              opacity: newProblemOpacity,
              transform: `translateY(${newProblemY}px)`,
              fontSize: 'clamp(1rem, 3.5dvh, 1.5rem)',
              color: 'var(--sage)',
              lineHeight: 1.4,
              fontStyle: 'italic',
            }}
          >
            Surveillance. Manipulation. Attention as resource. Identity as product.
          </p>
        </div>

        {/* Destruction data */}
        <div style={{ marginBottom: 'clamp(0.5rem, 1.2dvh, 1.5rem)' }}>
          <p
            style={{
              opacity: destructionOpacity,
              transform: `translateY(${destructionY}px)`,
              fontSize: 'clamp(0.6rem, 1.3dvh, 0.8rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--accent-coral)',
              marginBottom: 'clamp(0.15rem, 0.4dvh, 0.4rem)',
            }}
          >
            Cost
          </p>
          <p
            style={{
              opacity: destructionOpacity,
              transform: `translateY(${destructionY}px)`,
              fontSize: 'clamp(1rem, 3.5dvh, 1.5rem)',
              color: 'var(--line-art-cream)',
              lineHeight: 1.4,
            }}
          >
            Planetary-scale destruction accelerates. Data centers consume 1-2% of global electricity. Extraction intensifies. Climate breakdown accelerates.
          </p>
        </div>

        {/* Transition to Cybregore */}
        <p
          style={{
            opacity: transitionOpacity,
            fontSize: 'clamp(1rem, 3dvh, 1.4rem)',
            color: 'var(--line-art-cream)',
            textAlign: 'center',
            fontWeight: 500,
            marginTop: 'clamp(0.3rem, 0.8dvh, 1rem)',
          }}
        >
          And now something different is emerging...
        </p>
      </div>
    </section>
  )
}
