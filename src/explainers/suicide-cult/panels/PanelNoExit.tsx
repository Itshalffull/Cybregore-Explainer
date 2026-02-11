import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelNoExit({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.10, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.10, 20, 0)

  const line2Opacity = lerp(progress, 0.15, 0.25, 0, 1)
  const line2Y = lerp(progress, 0.15, 0.25, 20, 0)

  const line3Opacity = lerp(progress, 0.32, 0.42, 0, 1)
  const line3Y = lerp(progress, 0.32, 0.42, 20, 0)

  const boxOpacity = lerp(progress, 0.52, 0.65, 0, 1)
  const boxY = lerp(progress, 0.52, 0.65, 15, 0)

  const closerOpacity = lerp(progress, 0.75, 0.87, 0, 1)
  const closerY = lerp(progress, 0.75, 0.87, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          You can't leave by changing your shopping habits.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          You can't leave by voting differently.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          The cult is not a set of choices.
        </p>

        <div
          className="box-dark mb-xl"
          style={{ opacity: boxOpacity, transform: `translateY(${boxY}px)` }}
        >
          <p className="text-body text-cream text-center">
            It is the infrastructure of your existence.
          </p>
        </div>

        <p
          className="text-title text-coral text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          There is no exit from the inside.
        </p>
      </div>
    </section>
  )
}
