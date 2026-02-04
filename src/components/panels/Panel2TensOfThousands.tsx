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
        background: 'transparent',
      }}
    >
      <div className="panel-body panel-body--wide" style={{
        position: 'relative',
        zIndex: 1,
        maxHeight: '92dvh',
        overflow: 'hidden',
      }}>
        <p
          className="text-heading text-sage leading-normal"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          And it has been...
        </p>
        <p
          className="text-title text-cream leading-snug mt-sm"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          for tens of thousands of years.
        </p>
      </div>
    </section>
  )
}
