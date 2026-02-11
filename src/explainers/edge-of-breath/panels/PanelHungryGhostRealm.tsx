import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelHungryGhostRealm({ progress }: PanelProps) {
  // Mythology panel — spacious, immersive, building ancient imagery
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 25, 0)

  const line2Opacity = lerp(progress, 0.12, 0.22, 0, 1)
  const line2Y = lerp(progress, 0.12, 0.22, 20, 0)

  const line3Opacity = lerp(progress, 0.26, 0.36, 0, 1)
  const line3Y = lerp(progress, 0.26, 0.36, 15, 0)

  const line4Opacity = lerp(progress, 0.4, 0.5, 0, 1)
  const line4Y = lerp(progress, 0.4, 0.5, 15, 0)

  const line5Opacity = lerp(progress, 0.54, 0.64, 0, 1)
  const line5Y = lerp(progress, 0.54, 0.64, 15, 0)

  const line6Opacity = lerp(progress, 0.68, 0.78, 0, 1)
  const line6Y = lerp(progress, 0.68, 0.78, 15, 0)

  const line7Opacity = lerp(progress, 0.82, 0.92, 0, 1)
  const line7Y = lerp(progress, 0.82, 0.92, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          The ancient traditions already had a name for this.
        </p>

        <p
          className="text-body text-bold text-cream text-center mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          The Hungry Ghost Realm.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          In Buddhist cosmology, there exists a realm
          of beings with a terrible affliction.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Tiny mouths and bellies the size of mountains.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          They consume endlessly but can never be satisfied.
          The more they consume, the more they want.
        </p>

        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line6Opacity, transform: `translateY(${line6Y}px)` }}
        >
          Not punishment. Not metaphor.
          A diagnosis.
        </p>

        <p
          className="text-body text-bold text-cream text-center"
          style={{ opacity: line7Opacity, transform: `translateY(${line7Y}px)` }}
        >
          You just felt what it is like to be one.
        </p>
      </div>
    </section>
  )
}
