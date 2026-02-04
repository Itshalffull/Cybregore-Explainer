import { lerp } from '../../utils/animation'

interface Panel12bEscalationProps {
  progress: number
}

export default function Panel12bEscalation({ progress }: Panel12bEscalationProps) {
  // Transition panel showing the pattern of escalation

  const titleOpacity = lerp(progress, 0, 0.1, 0, 1)
  const patternOpacity = lerp(progress, 0.1, 0.2, 0, 1)

  const line1Opacity = lerp(progress, 0.15, 0.28, 0, 1)
  const line2Opacity = lerp(progress, 0.28, 0.41, 0, 1)
  const line3Opacity = lerp(progress, 0.41, 0.54, 0, 1)
  const line4Opacity = lerp(progress, 0.54, 0.67, 0, 1)

  const conclusionOpacity = lerp(progress, 0.75, 0.9, 0, 1)
  const conclusionY = lerp(progress, 0.75, 0.9, 20, 0)

  const eras = [
    { ai: 'Tribes', cost: 'Megafauna extinctions', scale: '~70% large mammals' },
    { ai: 'Property', cost: 'Habitat destruction', scale: '~40% land transformed' },
    { ai: 'Industry', cost: 'Global wildlife', scale: '~69% populations lost' },
    { ai: 'Digital Networks', cost: 'Planetary systems', scale: 'Climate breakdown' },
  ]

  const lineOpacities = [line1Opacity, line2Opacity, line3Opacity, line4Opacity]

  return (
    <section className="panel panel--dark">
      <div className="panel-body panel-body--wide">
        <h2
          className="text-title text-cream text-bold text-center mb-xs"
          style={{
            opacity: titleOpacity,
          }}
        >
          The Pattern
        </h2>

        <p
          className="text-body-lg text-sage text-center mb-2xl"
          style={{
            opacity: patternOpacity,
          }}
        >
          Each AI solves a problem. Each creates a bigger one. Each costs more life.
        </p>

        {/* Era progression */}
        <div className="mb-2xl">
          {eras.map((era, index) => (
            <div
              key={index}
              className="text-body-lg"
              style={{
                opacity: lineOpacities[index],
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: 'clamp(0.5rem, 1dvh, 1rem)',
                alignItems: 'center',
                marginBottom: 'clamp(0.3rem, 0.8dvh, 0.75rem)',
                padding: 'clamp(0.2rem, 0.5dvh, 0.5rem) 0',
                borderBottom: index < eras.length - 1 ? '1px solid var(--dark-olive)' : 'none',
              }}
            >
              <span className="text-coral text-right">
                {era.ai}
              </span>
              <span className="text-dark text-body-lg">
                →
              </span>
              <span className="text-cream">
                {era.cost} <span className="text-sage">({era.scale})</span>
              </span>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div
          className="text-center"
          style={{
            opacity: conclusionOpacity,
            transform: `translateY(${conclusionY}px)`,
          }}
        >
          <p className="text-subheading text-cream text-medium mb-md">
            Each AI accelerates the next.
          </p>
          <p className="text-body-lg text-sage text-italic">
            But what's driving this acceleration now?
          </p>
        </div>
      </div>
    </section>
  )
}
