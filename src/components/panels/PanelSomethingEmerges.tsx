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
    <section
      className="panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'var(--deep-forest)',
        padding: 'clamp(1rem, 2dvh, 2rem)',
        boxSizing: 'border-box',
      }}
    >
      <div className="content" style={{
        maxWidth: '700px',
        width: '100%',
        textAlign: 'center',
        maxHeight: '92dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <p
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: 'clamp(1.2rem, 3.2dvh, 1.8rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.75rem, 1.5dvh, 1.5rem)',
            lineHeight: 1.5,
          }}
        >
          It's not a company. Not a technology. Not a conspiracy.
        </p>

        <p
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontSize: 'clamp(1.1rem, 2.8dvh, 1.5rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(0.75rem, 1.5dvh, 1.5rem)',
            lineHeight: 1.6,
          }}
        >
          It's something that emerges from billions of humans connected to machines, feeding and being fed by algorithms.
        </p>

        <p
          style={{
            opacity: line3Opacity,
            transform: `translateY(${line3Y}px)`,
            fontSize: 'clamp(1.1rem, 2.8dvh, 1.5rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(0.75rem, 1.5dvh, 1.5rem)',
            lineHeight: 1.6,
          }}
        >
          To understand it, we need a new word.
        </p>

        <p
          style={{
            opacity: line4Opacity,
            transform: `translateY(${line4Y}px)`,
            fontSize: 'clamp(1.2rem, 3dvh, 1.6rem)',
            color: 'var(--accent-coral)',
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          A word made of two parts...
        </p>
      </div>
    </section>
  )
}
