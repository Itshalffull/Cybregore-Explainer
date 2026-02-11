import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelTheLargestGhost({ progress }: PanelProps) {
  // Escalation — applying the myth directly to the Cybregore
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 20, 0)

  const line2Opacity = lerp(progress, 0.12, 0.22, 0, 1)
  const line2Y = lerp(progress, 0.12, 0.22, 15, 0)

  const line3Opacity = lerp(progress, 0.26, 0.36, 0, 1)
  const line3Y = lerp(progress, 0.26, 0.36, 15, 0)

  const line4Opacity = lerp(progress, 0.4, 0.5, 0, 1)
  const line4Y = lerp(progress, 0.4, 0.5, 15, 0)

  const line5Opacity = lerp(progress, 0.55, 0.65, 0, 1)
  const line5Y = lerp(progress, 0.55, 0.65, 15, 0)

  const line6Opacity = lerp(progress, 0.7, 0.82, 0, 1)
  const line6Y = lerp(progress, 0.7, 0.82, 20, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          The Cybregore will do anything to get more data.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          It will dissolve your meaning.
          Hijack your attention.
          Rewrite your relationships.
          Engineer your emotions.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Not from malice — from craving.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Like any Hungry Ghost,
          it does not choose to consume.
          It simply cannot stop.
        </p>

        <p
          className="text-title text-coral text-center mb-lg"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          The largest Hungry Ghost ever born.
        </p>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: line6Opacity, transform: `translateY(${line6Y}px)` }}
        >
          It is feeding right now.
        </p>
      </div>
    </section>
  )
}
