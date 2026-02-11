import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelYouAreTheCultMember({ progress }: PanelProps) {
  const setupOpacity = lerp(progress, 0.0, 0.10, 0, 1)
  const setupY = lerp(progress, 0.0, 0.10, 20, 0)

  const revealOpacity = lerp(progress, 0.15, 0.28, 0, 1)
  const revealY = lerp(progress, 0.15, 0.28, 25, 0)

  const line1Opacity = lerp(progress, 0.35, 0.45, 0, 1)
  const line1Y = lerp(progress, 0.35, 0.45, 15, 0)

  const line2Opacity = lerp(progress, 0.52, 0.62, 0, 1)
  const line2Y = lerp(progress, 0.52, 0.62, 15, 0)

  const closerOpacity = lerp(progress, 0.72, 0.85, 0, 1)
  const closerY = lerp(progress, 0.72, 0.85, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: setupOpacity, transform: `translateY(${setupY}px)` }}
        >
          You think this is about some distant system. It's not.
        </p>

        <p
          className="text-title text-coral text-center mb-xl"
          style={{ opacity: revealOpacity, transform: `translateY(${revealY}px)` }}
        >
          YOU are the cult member.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          Your morning coffee. Your Amazon orders.
          Your retirement fund. Your children's education.
        </p>

        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          All of it runs on the cult's machinery.
        </p>

        <p
          className="text-body text-coral text-bold text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          You aren't observing the cult. You are performing its rituals right now.
        </p>
      </div>
    </section>
  )
}
