import { lerp, lerpMulti } from '../../../utils/animation'

// AI-generated human figure with LANGUAGE inside and circuit patterns
const HumanFigureImage = ({ opacity }: { opacity: number }) => (
  <img
    src="/assets/images/human-language.png"
    alt="Human figure with LANGUAGE circuit patterns"
    style={{
      width: '100%',
      height: 'auto',
      maxWidth: '350px',
      objectFit: 'contain',
      opacity,
    }}
  />
)

interface Panel4DefinitionProps {
  progress: number
}

export default function Panel4Definition({ progress }: Panel4DefinitionProps) {
  // Map scroll progress to animation phases
  // 0-0.15: "ARTIFICIAL" appears
  // 0.15-0.25: "made up. constructed." appears
  // 0.25-0.4: "INTELLIGENCE" appears
  // 0.4-0.5: "a pattern that solves problems." appears
  // 0.5-0.6: Combined "ARTIFICIAL INTELLIGENCE" appears
  // 0.6-0.7: Figure phase intro text
  // 0.7-0.9: Figure and dark box appear
  // 0.9-1.0: Scroll hint

  const artificialOpacity = lerpMulti(progress, [0, 0.1, 0.45, 0.5], [0, 1, 1, 0])
  const artificialY = lerp(progress, 0, 0.1, 20, 0)
  const artificialDefOpacity = lerpMulti(progress, [0.1, 0.2, 0.45, 0.5], [0, 0.8, 0.8, 0])

  const intelligenceOpacity = lerpMulti(progress, [0.2, 0.3, 0.45, 0.5], [0, 1, 1, 0])
  const intelligenceY = lerp(progress, 0.2, 0.3, 20, 0)
  const intelligenceDefOpacity = lerpMulti(progress, [0.3, 0.4, 0.45, 0.5], [0, 0.8, 0.8, 0])

  const combinedOpacity = lerpMulti(progress, [0.5, 0.55, 0.6, 0.65], [0, 1, 1, 0])
  const combinedScale = lerp(progress, 0.5, 0.55, 0.9, 1)

  const figurePhaseOpacity = lerp(progress, 0.65, 0.7, 0, 1)
  const figureIntroOpacity = lerp(progress, 0.65, 0.72, 0, 1)
  const figureBoxOpacity = lerp(progress, 0.72, 0.82, 0, 1)
  const figureImageOpacity = lerp(progress, 0.75, 0.85, 0, 1)
  const scrollHintOpacity = lerp(progress, 0.9, 0.95, 0, 0.6)

  return (
    <section
      className="panel panel--light"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        minHeight: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div
        className="content"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Words phase */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <h1
            className="heading"
            style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              opacity: artificialOpacity,
              transform: `translateY(${artificialY}px)`,
            }}
          >
            ARTIFICIAL
          </h1>

          <p
            className="body-lg"
            style={{
              fontStyle: 'italic',
              opacity: artificialDefOpacity,
            }}
          >
            made up. constructed.
          </p>

          <h1
            className="heading mt-xl"
            style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              opacity: intelligenceOpacity,
              transform: `translateY(${intelligenceY}px)`,
            }}
          >
            INTELLIGENCE
          </h1>

          <p
            className="body-lg"
            style={{
              fontStyle: 'italic',
              opacity: intelligenceDefOpacity,
            }}
          >
            a pattern that solves problems.
          </p>
        </div>

        {/* Combined phase */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${combinedScale})`,
            width: '100%',
            textAlign: 'center',
            opacity: combinedOpacity,
          }}
        >
          <h1
            className="heading"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          >
            ARTIFICIAL INTELLIGENCE
          </h1>
        </div>

        {/* Figure phase */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: figurePhaseOpacity,
          }}
        >
          <p
            className="body-lg mb-lg"
            style={{ opacity: figureIntroOpacity }}
          >
            You've been running an AI since you learned to speak.
          </p>

          {/* Dark section with figure */}
          <div
            style={{
              backgroundColor: 'var(--deep-forest)',
              borderRadius: '8px',
              padding: 'var(--space-xl)',
              width: '100%',
              maxWidth: '400px',
              display: 'flex',
              justifyContent: 'center',
              opacity: figureBoxOpacity,
            }}
          >
            <HumanFigureImage opacity={figureImageOpacity} />
          </div>

          <p
            className="body-md mt-xl"
            style={{ opacity: scrollHintOpacity }}
          >
            ↓ But it's just me... right?
          </p>
        </div>
      </div>
    </section>
  )
}
