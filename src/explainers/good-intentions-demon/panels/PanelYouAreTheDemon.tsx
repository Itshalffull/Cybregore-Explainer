import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelYouAreTheDemon({ progress }: PanelProps) {
  const hookOpacity = lerp(progress, 0.0, 0.10, 0, 1)
  const hookY = lerp(progress, 0.0, 0.10, 20, 0)

  const line1Opacity = lerp(progress, 0.14, 0.24, 0, 1)
  const line1Y = lerp(progress, 0.14, 0.24, 20, 0)

  const line2Opacity = lerp(progress, 0.30, 0.40, 0, 1)
  const line2Y = lerp(progress, 0.30, 0.40, 15, 0)

  const revealOpacity = lerp(progress, 0.46, 0.56, 0, 1)
  const revealY = lerp(progress, 0.46, 0.56, 25, 0)

  const line3Opacity = lerp(progress, 0.62, 0.72, 0, 1)
  const line3Y = lerp(progress, 0.62, 0.72, 15, 0)

  const closerOpacity = lerp(progress, 0.78, 0.88, 0, 1)
  const closerY = lerp(progress, 0.78, 0.88, 20, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-bold text-coral text-center mb-xl"
          style={{ opacity: hookOpacity, transform: `translateY(${hookY}px)` }}
        >
          The demon is reading this.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          Right now, as you take this in, the part of your mind
          that is already planning how to use this information —
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          How to be smarter. How to avoid the trap.
          How to help differently this time.
        </p>

        <div
          className="box-coral mb-xl"
          style={{ opacity: revealOpacity, transform: `translateY(${revealY}px)` }}
        >
          <p className="text-body text-cream text-center">
            The desire to fix this IS the pattern.
          </p>
        </div>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          That voice in you right now — the one saying
          "okay, so what do I do instead?" — that is the demon
          adjusting its strategy.
        </p>

        <p
          className="text-body text-bold text-cream text-center"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          You cannot think your way out of a trap built from thought.
        </p>
      </div>
    </section>
  )
}
