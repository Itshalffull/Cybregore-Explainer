import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelAiAcceleration({ progress }: PanelProps) {
  const setupOpacity = lerp(progress, 0.0, 0.08, 0, 1)
  const setupY = lerp(progress, 0.0, 0.08, 25, 0)

  const line1Opacity = lerp(progress, 0.12, 0.22, 0, 1)
  const line1Y = lerp(progress, 0.12, 0.22, 20, 0)

  const revealOpacity = lerp(progress, 0.28, 0.40, 0, 1)
  const revealY = lerp(progress, 0.28, 0.40, 20, 0)

  const line2Opacity = lerp(progress, 0.48, 0.58, 0, 1)
  const line2Y = lerp(progress, 0.48, 0.58, 15, 0)

  const line3Opacity = lerp(progress, 0.62, 0.72, 0, 1)
  const line3Y = lerp(progress, 0.62, 0.72, 15, 0)

  const climaxOpacity = lerp(progress, 0.80, 0.90, 0, 1)
  const climaxY = lerp(progress, 0.80, 0.90, 20, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: setupOpacity, transform: `translateY(${setupY}px)` }}
        >
          But the cult's latest creation is the most dangerous of all.
        </p>

        <p
          className="text-title text-cream text-center mb-xl"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          Building minds more powerful than its own.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: revealOpacity, transform: `translateY(${revealY}px)` }}
        >
          AI doesn't just accelerate destruction.
        </p>

        <p
          className="text-body text-coral text-bold text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          It accelerates the acceleration.
        </p>

        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Every graph bends upward each time intelligence increases.
          From splitting atoms to engineering life to creating intelligence.
        </p>

        <div
          className="box-coral"
          style={{ opacity: climaxOpacity, transform: `translateY(${climaxY}px)` }}
        >
          <p className="text-body text-cream text-bold text-center">
            The cult is building its own apotheosis.
          </p>
        </div>
      </div>
    </section>
  )
}
