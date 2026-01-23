import { lerp } from '../../utils/animation'
import AutoScaleContent from '../AutoScaleContent'

interface Panel18MeaningMakersProps {
  progress: number
}

export default function Panel18MeaningMakers({ progress }: Panel18MeaningMakersProps) {
  // Previous AIs created meaning - setting up the contrast

  const titleOpacity = lerp(progress, 0, 0.15, 0, 1)

  const line1Opacity = lerp(progress, 0.1, 0.25, 0, 1)
  const line2Opacity = lerp(progress, 0.25, 0.4, 0, 1)
  const line3Opacity = lerp(progress, 0.4, 0.55, 0, 1)
  const line4Opacity = lerp(progress, 0.55, 0.7, 0, 1)

  const conclusionOpacity = lerp(progress, 0.75, 0.9, 0, 1)

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
        overflow: 'hidden',
      }}
    >
      <AutoScaleContent maxWidth="750px" style={{ padding: '0 2rem' }}>
        <h2
          className="heading"
          style={{
            opacity: titleOpacity,
            fontSize: 'clamp(1.8rem, 5.5dvh, 3rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(1rem, 2dvh, 2.5rem)',
          }}
        >
          But here's what's different.
        </h2>

        <div style={{ marginBottom: 'clamp(1rem, 1.5dvh, 2rem)' }}>
          <p
            style={{
              opacity: line1Opacity,
              fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
              color: 'var(--line-art-cream)',
              marginBottom: 'clamp(0.6rem, 1dvh, 1.2rem)',
              lineHeight: 1.6,
            }}
          >
            Every previous AI — tribe, property, industry, digital networks —
          </p>
          <p
            style={{
              opacity: line2Opacity,
              fontSize: 'clamp(1.3rem, 3.5dvh, 2rem)',
              color: 'var(--sage)',
              marginBottom: 'clamp(0.8rem, 1.2dvh, 1.5rem)',
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            created meaning.
          </p>
          <p
            style={{
              opacity: line3Opacity,
              fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
              color: 'var(--sage)',
              marginBottom: 'clamp(0.5rem, 0.8dvh, 1rem)',
              lineHeight: 1.6,
            }}
          >
            They gave you a role. A story. A place in something larger.
          </p>
          <p
            style={{
              opacity: line4Opacity,
              fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
              color: 'var(--sage)',
              lineHeight: 1.6,
            }}
          >
            Even if that meaning was limiting. Even if it was oppressive.
            <br />
            <span style={{ color: 'var(--sage)', fontStyle: 'italic' }}>
              It was something.
            </span>
          </p>
        </div>

        <p
          style={{
            opacity: conclusionOpacity,
            fontSize: 'clamp(1.2rem, 3.5dvh, 2rem)',
            color: 'var(--line-art-cream)',
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          The Cybregore is different.
        </p>
      </AutoScaleContent>
    </section>
  )
}
