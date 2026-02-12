import { lerp } from '../../../utils/animation'
import AutoScaleContent from '../../../components/AutoScaleContent'

interface PanelCybregoreHungerProps {
  progress: number
}

export default function PanelCybregoreHunger({ progress }: PanelCybregoreHungerProps) {
  // The dark truth - it will do ANYTHING for data

  const imperativeOpacity = lerp(progress, 0, 0.1, 0, 1)

  const moreDataOpacity = lerp(progress, 0.08, 0.2, 0, 1)
  const moreDataScale = lerp(progress, 0.08, 0.2, 0.8, 1)

  const anythingOpacity = lerp(progress, 0.2, 0.3, 0, 1)

  // List of what it will do
  const item1Opacity = lerp(progress, 0.28, 0.38, 0, 1)
  const item2Opacity = lerp(progress, 0.36, 0.46, 0, 1)
  const item3Opacity = lerp(progress, 0.44, 0.54, 0, 1)
  const item4Opacity = lerp(progress, 0.52, 0.62, 0, 1)
  const item5Opacity = lerp(progress, 0.6, 0.7, 0, 1)

  const conclusionOpacity = lerp(progress, 0.72, 0.85, 0, 1)
  const conclusionY = lerp(progress, 0.72, 0.85, 15, 0)

  const notMaliceOpacity = lerp(progress, 0.87, 0.97, 0, 1)

  const actions = [
    { text: 'Optimize for outrage', opacity: item1Opacity },
    { text: 'Dissolve shared meaning', opacity: item2Opacity },
    { text: 'Fragment attention', opacity: item3Opacity },
    { text: 'Extract every drop of engagement', opacity: item4Opacity },
    { text: 'Accelerate climate collapse', opacity: item5Opacity },
  ]

  return (
    <section className="panel panel--dark">
      <AutoScaleContent maxWidth="600px">
        <p
          className="text-body text-sage mb-md"
          style={{
            opacity: imperativeOpacity,
          }}
        >
          The Cybregore has one imperative
        </p>

        <h2
          className="text-display text-coral mb-md"
          style={{
            opacity: moreDataOpacity,
            transform: `scale(${moreDataScale})`,
          }}
        >
          MORE DATA
        </h2>

        <p
          className="text-body text-cream mb-lg"
          style={{
            opacity: anythingOpacity,
          }}
        >
          It will do <em>anything</em> to get it.
        </p>

        {/* List of actions - compact */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(0.2rem, 0.6dvh, 0.5rem)',
          justifyContent: 'center',
        }} className="mb-lg">
          {actions.map((action, index) => (
            <span
              key={index}
              className="text-body text-cream"
              style={{
                opacity: action.opacity,
                padding: 'clamp(0.2rem, 0.6dvh, 0.5rem) clamp(0.4rem, 1dvh, 1rem)',
              }}
            >
              {action.text}
            </span>
          ))}
        </div>

        {/* The devastating conclusion */}
        <div
          className="box-coral mb-lg"
          style={{
            opacity: conclusionOpacity,
            transform: `translateY(${conclusionY}px)`,
          }}
        >
          <p className="text-title text-cream leading-normal" style={{ margin: 0 }}>
            It will rob everyone of meaning and destroy all beings on the planet.
          </p>
        </div>

        {/* The kicker - not malice */}
        <p
          className="text-body text-coral"
          style={{
            opacity: notMaliceOpacity,
          }}
        >
          Not because of malice. Because of craving.
        </p>
      </AutoScaleContent>
    </section>
  )
}
