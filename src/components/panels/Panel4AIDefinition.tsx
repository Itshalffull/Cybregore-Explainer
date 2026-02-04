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
    <section className="panel panel--dark">
      <div className="panel-body panel-body--wide" style={{
        maxHeight: '92dvh',
        overflow: 'hidden',
      }}>
        {/* ARTIFICIAL */}
        <div className="mb-2xl">
          <h2
            className="text-title text-cream text-uppercase mb-xs"
            style={{
              opacity: artificialOpacity,
              transform: `translateY(${artificialY}px)`,
            }}
          >
            ARTIFICIAL
          </h2>
          <p
            className="text-heading text-sage box-definition"
            style={{
              opacity: artificialDefOpacity,
            }}
          >
            constructed or made up
          </p>
        </div>

        {/* INTELLIGENCE */}
        <div>
          <h2
            className="text-title text-cream text-uppercase mb-xs"
            style={{
              opacity: intelligenceOpacity,
              transform: `translateY(${intelligenceY}px)`,
            }}
          >
            INTELLIGENCE
          </h2>
          <p
            className="text-subheading text-sage box-definition leading-relaxed"
            style={{
              opacity: intelligenceDefOpacity,
            }}
          >
            an algorithm that solves problems at scale.
            <br />
            <span className="text-cream text-italic">
              Bigger scale and solving more problems means more intelligence.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
