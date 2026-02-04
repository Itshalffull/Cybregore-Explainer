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
      className="panel panel--dark"
      style={{
        background: 'var(--deep-forest)',
      }}
    >
      <AutoScaleContent maxWidth="750px" style={{ padding: '0 2rem' }}>
        <h2
          className="heading text-title text-cream mb-xl"
          style={{
            opacity: titleOpacity,
          }}
        >
          But here's what's different.
        </h2>

        <div className="mb-xl">
          <p
            className="text-subheading text-cream mb-lg leading-relaxed"
            style={{
              opacity: line1Opacity,
            }}
          >
            Every previous AI — tribe, property, industry, digital networks —
          </p>
          <p
            className="text-heading text-sage mb-lg leading-relaxed text-medium"
            style={{
              opacity: line2Opacity,
            }}
          >
            created meaning.
          </p>
          <p
            className="text-subheading text-sage mb-md leading-relaxed"
            style={{
              opacity: line3Opacity,
            }}
          >
            They gave you a role. A story. A place in something larger.
          </p>
          <p
            className="text-subheading text-sage leading-relaxed"
            style={{
              opacity: line4Opacity,
            }}
          >
            Even if that meaning was limiting. Even if it was oppressive.
            <br />
            <span className="text-sage text-italic">
              It was something.
            </span>
          </p>
        </div>

        <p
          className="text-heading text-cream text-medium leading-relaxed"
          style={{
            opacity: conclusionOpacity,
          }}
        >
          The Cybregore is different.
        </p>
      </AutoScaleContent>
    </section>
  )
}
