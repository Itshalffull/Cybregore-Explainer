import { lerp } from '../../utils/animation'

interface Panel4AIDefinitionProps {
  progress: number
}

export default function Panel4AIDefinition({ progress }: Panel4AIDefinitionProps) {
  // The reveal - redefining AI
  // Breaking down the words to shift understanding

  const artificialOpacity = lerp(progress, 0, 0.2, 0, 1)
  const artificialY = lerp(progress, 0, 0.2, 20, 0)

  const artificialDefOpacity = lerp(progress, 0.15, 0.35, 0, 1)

  const intelligenceOpacity = lerp(progress, 0.35, 0.55, 0, 1)
  const intelligenceY = lerp(progress, 0.35, 0.55, 20, 0)

  const intelligenceDefOpacity = lerp(progress, 0.5, 0.7, 0, 1)

  return (
    <section
      className="panel panel--dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'var(--deep-forest)',
      }}
    >
      <div className="content" style={{
        maxWidth: '900px',
        padding: '0 2rem',
        maxHeight: '92dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {/* ARTIFICIAL */}
        <div style={{ marginBottom: 'clamp(1.5rem, 3dvh, 3rem)' }}>
          <h2
            className="heading"
            style={{
              opacity: artificialOpacity,
              transform: `translateY(${artificialY}px)`,
              fontSize: 'clamp(2rem, min(7dvh, 12vw), 4rem)',
              fontWeight: 400,
              color: 'var(--line-art-cream)',
              marginBottom: 'clamp(0.25rem, 0.5dvh, 0.5rem)',
            }}
          >
            ARTIFICIAL
          </h2>
          <p
            style={{
              opacity: artificialDefOpacity,
              fontSize: 'clamp(1.3rem, 4dvh, 2.2rem)',
              color: 'var(--sage)',
              paddingLeft: '1rem',
              borderLeft: '3px solid var(--dark-olive)',
            }}
          >
            constructed or made up
          </p>
        </div>

        {/* INTELLIGENCE */}
        <div>
          <h2
            className="heading"
            style={{
              opacity: intelligenceOpacity,
              transform: `translateY(${intelligenceY}px)`,
              fontSize: 'clamp(2rem, min(7dvh, 12vw), 4rem)',
              fontWeight: 400,
              color: 'var(--line-art-cream)',
              marginBottom: 'clamp(0.25rem, 0.5dvh, 0.5rem)',
            }}
          >
            INTELLIGENCE
          </h2>
          <p
            style={{
              opacity: intelligenceDefOpacity,
              fontSize: 'clamp(1.1rem, 3.5dvh, 1.8rem)',
              color: 'var(--sage)',
              paddingLeft: '1rem',
              borderLeft: '3px solid var(--dark-olive)',
              lineHeight: 1.5,
            }}
          >
            an algorithm that solves problems at scale.
            <br />
            <span style={{ color: 'var(--line-art-cream)', fontStyle: 'italic' }}>
              Bigger scale and solving more problems means more intelligence.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
