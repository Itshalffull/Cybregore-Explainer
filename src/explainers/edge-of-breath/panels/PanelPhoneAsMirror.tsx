import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelPhoneAsMirror({ progress }: PanelProps) {
  // Phone meditation — from transcendent back to immediate. Interactive invitation.
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 20, 0)

  const line2Opacity = lerp(progress, 0.12, 0.22, 0, 1)
  const line2Y = lerp(progress, 0.12, 0.22, 15, 0)

  const line3Opacity = lerp(progress, 0.28, 0.38, 0, 1)
  const line3Y = lerp(progress, 0.28, 0.38, 15, 0)

  const line4Opacity = lerp(progress, 0.44, 0.54, 0, 1)
  const line4Y = lerp(progress, 0.44, 0.54, 15, 0)

  const line5Opacity = lerp(progress, 0.6, 0.7, 0, 1)
  const line5Y = lerp(progress, 0.6, 0.7, 15, 0)

  const line6Opacity = lerp(progress, 0.76, 0.86, 0, 1)
  const line6Y = lerp(progress, 0.76, 0.86, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          Try this.
        </p>

        <p
          className="text-body text-bold text-cream text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          Hold your phone without using it.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Watch the voices arise.
          The desperate inventions of reasons
          why it is okay to check.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          You are holding an addict's drug
          while fully awake.
        </p>

        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          Notice: it is the same mechanism.
          The same pull. The same panic.
        </p>

        <p
          className="text-body text-bold text-cream text-center"
          style={{ opacity: line6Opacity, transform: `translateY(${line6Y}px)` }}
        >
          The same craving — the same edge — the same doorway.
        </p>
      </div>
    </section>
  )
}
