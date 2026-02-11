import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelBuyNowSacrament({ progress }: PanelProps) {
  const setupOpacity = lerp(progress, 0.0, 0.10, 0, 1)
  const setupY = lerp(progress, 0.0, 0.10, 20, 0)

  const buttonOpacity = lerp(progress, 0.15, 0.28, 0, 1)
  const buttonScale = lerp(progress, 0.15, 0.28, 0.85, 1)

  const line1Opacity = lerp(progress, 0.35, 0.45, 0, 1)
  const line1Y = lerp(progress, 0.35, 0.45, 15, 0)

  const line2Opacity = lerp(progress, 0.52, 0.62, 0, 1)
  const line2Y = lerp(progress, 0.52, 0.62, 15, 0)

  const revealOpacity = lerp(progress, 0.70, 0.82, 0, 1)
  const revealY = lerp(progress, 0.70, 0.82, 20, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: setupOpacity, transform: `translateY(${setupY}px)` }}
        >
          Every cult has a ritual of participation.
        </p>

        <div
          className="text-center mb-xl"
          style={{ opacity: buttonOpacity, transform: `scale(${buttonScale})` }}
        >
          <div className="box-coral">
            <p className="text-title text-cream text-center">
              Buy Now
            </p>
          </div>
        </div>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          Every click is a sacrament.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          The beings killed to create that package.
          The forests cleared. The oceans poisoned. The atmosphere thickened.
        </p>

        <p
          className="text-body text-coral text-bold text-center"
          style={{ opacity: revealOpacity, transform: `translateY(${revealY}px)` }}
        >
          Your convenience is their death.
        </p>
      </div>
    </section>
  )
}
