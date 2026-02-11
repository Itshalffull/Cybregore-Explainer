import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelMonasteryLaboratory({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.10, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.10, 20, 0)

  const line2Opacity = lerp(progress, 0.14, 0.24, 0, 1)
  const line2Y = lerp(progress, 0.14, 0.24, 20, 0)

  const line3Opacity = lerp(progress, 0.30, 0.40, 0, 1)
  const line3Y = lerp(progress, 0.30, 0.40, 15, 0)

  const boxOpacity = lerp(progress, 0.46, 0.56, 0, 1)
  const boxY = lerp(progress, 0.46, 0.56, 20, 0)

  const line4Opacity = lerp(progress, 0.62, 0.72, 0, 1)
  const line4Y = lerp(progress, 0.62, 0.72, 15, 0)

  const closerOpacity = lerp(progress, 0.78, 0.88, 0, 1)
  const closerY = lerp(progress, 0.78, 0.88, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          In that search, he ended up at a modern monastery.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Not to escape the world.
          Not to give up on helping.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          To find the one technology that might actually work.
        </p>

        <div
          className="box-coral mb-xl"
          style={{ opacity: boxOpacity, transform: `translateY(${boxY}px)` }}
        >
          <p className="text-body text-cream text-center">
            Awakening is not a retreat — it is a laboratory.
          </p>
        </div>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Seeing clearly before acting.
          The contemplative traditions have been training people
          to see through this demon for thousands of years.
        </p>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          Not thinking more clearly. <em className="text-cream">Seeing</em> more clearly.
          There is a difference the demon cannot bridge.
        </p>
      </div>
    </section>
  )
}
