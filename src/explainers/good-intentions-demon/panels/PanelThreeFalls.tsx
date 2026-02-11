import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelThreeFalls({ progress }: PanelProps) {
  const headerOpacity = lerp(progress, 0.0, 0.08, 0, 1)
  const headerY = lerp(progress, 0.0, 0.08, 20, 0)

  const fall1Opacity = lerp(progress, 0.10, 0.20, 0, 1)
  const fall1Y = lerp(progress, 0.10, 0.20, 20, 0)

  const fall2Opacity = lerp(progress, 0.24, 0.34, 0, 1)
  const fall2Y = lerp(progress, 0.24, 0.34, 20, 0)

  const fall3Opacity = lerp(progress, 0.38, 0.48, 0, 1)
  const fall3Y = lerp(progress, 0.38, 0.48, 20, 0)

  const patternOpacity = lerp(progress, 0.55, 0.65, 0, 1)
  const patternY = lerp(progress, 0.55, 0.65, 15, 0)

  const revealOpacity = lerp(progress, 0.72, 0.82, 0, 1)
  const revealY = lerp(progress, 0.72, 0.82, 20, 0)

  const closerOpacity = lerp(progress, 0.86, 0.94, 0, 1)
  const closerY = lerp(progress, 0.86, 0.94, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-bold text-cream text-center mb-xl"
          style={{ opacity: headerOpacity, transform: `translateY(${headerY}px)` }}
        >
          Three levels, one pattern.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: fall1Opacity, transform: `translateY(${fall1Y}px)` }}
        >
          Build companies to help
          <br />
          <em className="text-coral">— made it worse.</em>
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: fall2Opacity, transform: `translateY(${fall2Y}px)` }}
        >
          Think scientifically about good
          <br />
          <em className="text-coral">— served themselves.</em>
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: fall3Opacity, transform: `translateY(${fall3Y}px)` }}
        >
          Fix the mind itself
          <br />
          <em className="text-coral">— created what they feared.</em>
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: patternOpacity, transform: `translateY(${patternY}px)` }}
        >
          Each one deeper, each one the same failure.
        </p>

        <div
          className="box-coral mb-xl"
          style={{ opacity: revealOpacity, transform: `translateY(${revealY}px)` }}
        >
          <p className="text-body text-cream text-center">
            This is not coincidence.
          </p>
        </div>

        <p
          className="text-body text-sage text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          Something is operating through the very act of trying to help.
        </p>
      </div>
    </section>
  )
}
