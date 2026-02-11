import { lerp } from '../../../utils/animation'
import JumpLink from '../../../components/JumpLink'

interface PanelProps {
  progress: number
}

export default function PanelTheSacredEdge({ progress }: PanelProps) {
  // Final panel — sacred, incomplete, open. Returns to the breath.
  const line1Opacity = lerp(progress, 0.0, 0.12, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.12, 25, 0)

  const line2Opacity = lerp(progress, 0.15, 0.27, 0, 1)
  const line2Y = lerp(progress, 0.15, 0.27, 20, 0)

  const line3Opacity = lerp(progress, 0.32, 0.44, 0, 1)
  const line3Y = lerp(progress, 0.32, 0.44, 15, 0)

  const line4Opacity = lerp(progress, 0.5, 0.62, 0, 1)
  const line4Y = lerp(progress, 0.5, 0.62, 15, 0)

  const line5Opacity = lerp(progress, 0.68, 0.8, 0, 1)
  const line5Y = lerp(progress, 0.68, 0.8, 15, 0)

  // Final invitation — slow fade, stays
  const line6Opacity = lerp(progress, 0.84, 0.95, 0, 1)
  const line6Y = lerp(progress, 0.84, 0.95, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          The Hungry Ghost is feeding.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          The data is flowing.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          The craving is singing.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          And at the edge of your next breath — right now —
          there is a doorway that has been waiting for you
          since before you were born.
        </p>

        <p
          className="text-body text-bold text-cream text-center mb-2xl"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          Breathe out. Stay. See what happens.
        </p>

        <p
          className="text-small text-olive text-center mb-xl"
          style={{ opacity: line6Opacity, transform: `translateY(${line6Y}px)` }}
        >
          The edge is always here.
        </p>

        <div style={{ opacity: line6Opacity }}>
          <JumpLink to="cybregore" label="Meet the Cybregore →" fromLabel="The Sacred Edge" />
          <JumpLink to="suicide-cult" label="See the Cult You're In →" fromLabel="The Sacred Edge" />
          <JumpLink to="good-intentions-demon" label="Why Helping Feeds the Demon →" fromLabel="The Sacred Edge" />
        </div>
      </div>
    </section>
  )
}
