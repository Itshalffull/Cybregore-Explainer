import { lerp } from '../../../utils/animation'

interface Panel22TheTrapProps {
  progress: number
}

export default function Panel22TheTrap({ progress }: Panel22TheTrapProps) {
  // The perfect trap - each scroll deepens the void

  const line1Opacity = lerp(progress, 0, 0.15, 0, 1)
  const line2Opacity = lerp(progress, 0.15, 0.3, 0, 1)
  const line3Opacity = lerp(progress, 0.35, 0.5, 0, 1)

  const trapOpacity = lerp(progress, 0.55, 0.75, 0, 1)
  const trapScale = lerp(progress, 0.55, 0.75, 0.95, 1)

  const newOpacity = lerp(progress, 0.8, 0.95, 0, 1)

  return (
    <section
      className="panel panel--dark"
      style={{
        background: 'var(--deep-forest)',
      }}
    >
      <div className="panel-body text-center">
        <p
          className="text-subheading text-sage mb-lg leading-relaxed"
          style={{
            opacity: line1Opacity,
          }}
        >
          But here's the trap.
        </p>

        <p
          className="text-heading text-coral mb-lg leading-normal"
          style={{
            opacity: line2Opacity,
          }}
        >
          Each scroll deepens the void.
        </p>

        <p
          className="text-subheading text-sage mb-2xl leading-relaxed"
          style={{
            opacity: line3Opacity,
          }}
        >
          More disconnected narratives.
          <br />
          More dissolution.
          <br />
          More void.
        </p>

        <p
          className="text-title text-cream mb-xl leading-snug text-semibold"
          style={{
            opacity: trapOpacity,
            transform: `scale(${trapScale})`,
          }}
        >
          It's a perfect trap.
        </p>

        <p
          className="text-heading text-sage leading-normal text-medium"
          style={{
            opacity: newOpacity,
          }}
        >
          This is new.
        </p>
      </div>
    </section>
  )
}
