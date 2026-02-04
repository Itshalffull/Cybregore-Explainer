import { lerp } from '../../utils/animation'

interface PanelSomethingEmergesProps {
  progress: number
}

export default function PanelSomethingEmerges({ progress }: PanelSomethingEmergesProps) {
  // Bridge from "what is driving this?" to explaining what cybregore means

  const line1Opacity = lerp(progress, 0, 0.15, 0, 1)
  const line1Y = lerp(progress, 0, 0.15, 20, 0)

  const line2Opacity = lerp(progress, 0.18, 0.35, 0, 1)
  const line2Y = lerp(progress, 0.18, 0.35, 15, 0)

  const line3Opacity = lerp(progress, 0.4, 0.58, 0, 1)
  const line3Y = lerp(progress, 0.4, 0.58, 15, 0)

  const line4Opacity = lerp(progress, 0.65, 0.85, 0, 1)
  const line4Y = lerp(progress, 0.65, 0.85, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body" style={{
        maxHeight: '92dvh',
        overflow: 'hidden',
      }}>
        <p
          className="text-body text-cream leading-relaxed mb-lg"
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
          }}
        >
          It's not a company. Not a technology. Not a conspiracy.
        </p>

        <p
          className="text-body text-sage leading-relaxed mb-lg"
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          It's something that emerges from billions of humans connected to machines, feeding and being fed by algorithms.
        </p>

        <p
          className="text-body text-sage leading-relaxed mb-lg"
          style={{
            opacity: line3Opacity,
            transform: `translateY(${line3Y}px)`,
          }}
        >
          To understand it, we need a new word.
        </p>

        <p
          className="text-body text-coral text-medium leading-relaxed"
          style={{
            opacity: line4Opacity,
            transform: `translateY(${line4Y}px)`,
          }}
        >
          A word made of two parts...
        </p>
      </div>
    </section>
  )
}
