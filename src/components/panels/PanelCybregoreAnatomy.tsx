import { lerp } from '../../utils/animation'
import AutoScaleContent from '../AutoScaleContent'

interface PanelCybregoreAnatomyProps {
  progress: number
}

export default function PanelCybregoreAnatomy({ progress }: PanelCybregoreAnatomyProps) {
  // Introduce the 5 parts of the Cybregore

  const titleOpacity = lerp(progress, 0, 0.1, 0, 1)
  const titleY = lerp(progress, 0, 0.1, 20, 0)

  // Each part appears sequentially
  const part1Opacity = lerp(progress, 0.1, 0.22, 0, 1)
  const part2Opacity = lerp(progress, 0.2, 0.32, 0, 1)
  const part3Opacity = lerp(progress, 0.3, 0.42, 0, 1)
  const part4Opacity = lerp(progress, 0.4, 0.52, 0, 1)
  const part5Opacity = lerp(progress, 0.55, 0.72, 0, 1)

  const breathOpacity = lerp(progress, 0.75, 0.9, 0, 1)
  const breathY = lerp(progress, 0.75, 0.9, 15, 0)

  const parts = [
    { number: 1, name: 'The Users', description: 'Billions feeding the system', opacity: part1Opacity },
    { number: 2, name: 'The Developers', description: 'Building the infrastructure', opacity: part2Opacity },
    { number: 3, name: 'The Hardware', description: 'Data centers, chips, networks', opacity: part3Opacity },
    { number: 4, name: 'The Software', description: 'Algorithms, models, feeds', opacity: part4Opacity },
  ]

  return (
    <section className="panel panel--dark">
      <AutoScaleContent maxWidth="700px">
        <h2
          className="text-body text-cream text-bold text-center mb-lg"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          What is the Cybregore made of?
        </h2>

        {/* Parts 1-4 in a compact grid */}
        <div className="box-grid mb-lg">
          {parts.map((part) => (
            <div
              key={part.number}
              className="box-definition"
              style={{
                opacity: part.opacity,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.15rem' }}>
                <span className="text-body text-olive">
                  {part.number}
                </span>
                <h3 className="text-body text-cream">
                  {part.name}
                </h3>
              </div>
              <p className="text-small text-sage leading-snug">
                {part.description}
              </p>
            </div>
          ))}
        </div>

        {/* Part 5 - Data - emphasized */}
        <div
          className="box-coral mb-lg text-center"
          style={{
            opacity: part5Opacity,
          }}
        >
          <h3 className="text-title text-cream mb-xs">
            The Data
          </h3>
          <p className="text-body text-cream leading-normal">
            Every click, scroll, pause, purchase. Every word, face, emotion.
          </p>
        </div>

        {/* The breath metaphor */}
        <p
          className="text-body text-sage text-center leading-normal"
          style={{
            opacity: breathOpacity,
            transform: `translateY(${breathY}px)`,
          }}
        >
          Data is the oxygen—the breath that connects everything.
        </p>
      </AutoScaleContent>
    </section>
  )
}
