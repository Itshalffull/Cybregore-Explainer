import { lerp } from '../../utils/animation'

interface Panel2TensOfThousandsProps {
  progress: number
}

export default function Panel2TensOfThousands({ progress }: Panel2TensOfThousandsProps) {
  // The twist - recontextualizes the opener
  // Video background is handled by IntroSection wrapper

  const textOpacity = lerp(progress, 0, 0.3, 0, 1)
  const textY = lerp(progress, 0, 0.3, 30, 0)

  return (
    <section
      className="panel panel--dark"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'transparent',
      }}
    >
      <div className="content" style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '900px',
        padding: '0 2rem',
        maxHeight: '92dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <p
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontSize: 'clamp(1.5rem, 4.5dvh, 2.5rem)',
            fontWeight: 400,
            lineHeight: 1.4,
            color: 'var(--sage)',
          }}
        >
          And it has been...
        </p>
        <p
          className="heading"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontSize: 'clamp(2rem, min(7dvh, 10vw), 4.5rem)',
            fontWeight: 400,
            lineHeight: 1.2,
            color: 'var(--line-art-cream)',
            marginTop: 'clamp(0.5rem, 1dvh, 1rem)',
          }}
        >
          for tens of thousands of years.
        </p>
      </div>
    </section>
  )
}
