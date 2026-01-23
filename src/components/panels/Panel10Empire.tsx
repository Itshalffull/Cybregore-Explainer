import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface Panel10EmpireProps {
  progress: number
}

export default function Panel10Empire({ progress }: Panel10EmpireProps) {
  // Fourth era - writing, bureaucracy, empire

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
        videoSrc="/assets/videos/empire-loop.mp4"
        imageFallback="/assets/images/empire.png"
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
          ~3,000 years ago
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
          Empire
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
          AI #4: Writing + Bureaucracy
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
            Money enables trade at scale, but can't coordinate millions. Memory fails. Agreements forgotten. Orders lost.
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
            Writing. Laws. Bureaucracy. Records that outlive memory. Hierarchies that outlive rulers. A system layered on all previous AIs.
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
            Hierarchy. Oppression. War at scale. The individual becomes a number, a record, a subject.
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
            Continental-scale destruction. Mediterranean forests gone. Soil depleted. First mass extinctions of entire biomes. Rome's grain demands consume North Africa's fertility.
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
          But human labor still limited production...
        </p>
      </div>
    </section>
  )
}
