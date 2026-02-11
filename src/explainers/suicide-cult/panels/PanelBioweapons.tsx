import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelBioweapons({ progress }: PanelProps) {
  // Faster pacing than Nuclear — tighter intervals, more urgency
  const setupOpacity = lerp(progress, 0.0, 0.08, 0, 1)
  const setupY = lerp(progress, 0.0, 0.08, 20, 0)

  const line1Opacity = lerp(progress, 0.12, 0.22, 0, 1)
  const line1Y = lerp(progress, 0.12, 0.22, 18, 0)

  const revealOpacity = lerp(progress, 0.30, 0.42, 0, 1)
  const revealY = lerp(progress, 0.30, 0.42, 18, 0)

  const line2Opacity = lerp(progress, 0.50, 0.60, 0, 1)
  const line2Y = lerp(progress, 0.50, 0.60, 15, 0)

  const closerOpacity = lerp(progress, 0.68, 0.78, 0, 1)
  const closerY = lerp(progress, 0.68, 0.78, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: setupOpacity, transform: `translateY(${setupY}px)` }}
        >
          Then the cult discovered something worse.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          It could engineer life itself as a weapon.
        </p>

        <div
          className="box-coral mb-xl"
          style={{ opacity: revealOpacity, transform: `translateY(${revealY}px)` }}
        >
          <p className="text-body text-cream text-center">
            Invisible, self-replicating, impossible to contain.
          </p>
        </div>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Bioweapons. Engineered pathogens.
          The tools are cheaper every year. The knowledge is spreading.
        </p>

        <p
          className="text-body text-coral text-bold text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          The capability is increasing.
        </p>
      </div>
    </section>
  )
}
