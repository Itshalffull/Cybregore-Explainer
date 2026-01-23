import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface Panel9MoneyProps {
  progress: number
}

export default function Panel9Money({ progress }: Panel9MoneyProps) {
  // Third era - money as abstraction

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
        minHeight: '100vh',
        background: 'var(--deep-forest)',
      }}
    >
      <VideoBackground
        videoSrc="/assets/videos/money-loop.mp4"
        imageFallback="/assets/images/money.png"
        opacity={0.4}
      />
      <div className="content" style={{ position: 'relative', zIndex: 1, maxWidth: '700px', padding: '0 2rem' }}>
        {/* Era label */}
        <p
          style={{
            opacity: eraOpacity,
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--sage)',
            marginBottom: '0.5rem',
          }}
        >
          ~5,000 years ago
        </p>

        <h2
          className="heading"
          style={{
            opacity: eraOpacity,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: 'var(--line-art-cream)',
            marginBottom: '0.5rem',
          }}
        >
          Money
        </h2>

        {/* AI Label */}
        <p
          style={{
            opacity: aiLabelOpacity,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--accent-coral)',
            marginBottom: '2rem',
          }}
        >
          AI #3: Abstract Value
        </p>

        {/* Problem */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              opacity: problemOpacity,
              transform: `translateY(${problemY}px)`,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--dark-forest)',
              marginBottom: '0.4rem',
            }}
          >
            Problem
          </p>
          <p
            style={{
              opacity: problemOpacity,
              transform: `translateY(${problemY}px)`,
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: 'var(--line-art-cream)',
              lineHeight: 1.5,
            }}
          >
            Property enables trade, but trade is clunky. How many chickens for a cow? What if I don't want chickens?
          </p>
        </div>

        {/* Solution */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              opacity: solutionOpacity,
              transform: `translateY(${solutionY}px)`,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--dark-forest)',
              marginBottom: '0.4rem',
            }}
          >
            The AI
          </p>
          <p
            style={{
              opacity: solutionOpacity,
              transform: `translateY(${solutionY}px)`,
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: 'var(--sage)',
              lineHeight: 1.5,
            }}
          >
            Abstract value into tokens. Shells. Coins. Numbers. A shared hallucination layered on property.
          </p>
        </div>

        {/* New Problem */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              opacity: newProblemOpacity,
              transform: `translateY(${newProblemY}px)`,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--dark-forest)',
              marginBottom: '0.4rem',
            }}
          >
            New problem created
          </p>
          <p
            style={{
              opacity: newProblemOpacity,
              transform: `translateY(${newProblemY}px)`,
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: 'var(--sage)',
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}
          >
            Accumulation. Debt. Those with tokens control those without. Value divorced from relationship.
          </p>
        </div>

        {/* Destruction data */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              opacity: destructionOpacity,
              transform: `translateY(${destructionY}px)`,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--accent-coral)',
              marginBottom: '0.4rem',
            }}
          >
            Cost
          </p>
          <p
            style={{
              opacity: destructionOpacity,
              transform: `translateY(${destructionY}px)`,
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: 'var(--line-art-cream)',
              lineHeight: 1.5,
            }}
          >
            Resource extraction accelerates. Mining, logging, fishing — anything that can be sold, is. First regional ecosystems collapse.
          </p>
        </div>

        {/* Transition */}
        <p
          style={{
            opacity: transitionOpacity,
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--sage)',
            fontStyle: 'italic',
            textAlign: 'center',
            marginTop: '1rem',
          }}
        >
          But how to coordinate millions across vast distances?
        </p>
      </div>
    </section>
  )
}
