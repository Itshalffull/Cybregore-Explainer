import { lerp } from '../../../utils/animation'
import AutoScaleContent from '../../../components/AutoScaleContent'
import VideoBackground from '../../../components/VideoBackground'

interface PanelWhatNowProps {
  progress: number
}

export default function PanelWhatNow({ progress }: PanelWhatNowProps) {
  // Final panel - what do you do about it?

  // Background fades in first
  const bgOpacity = lerp(progress, 0, 0.1, 0, 0.5)

  const questionOpacity = lerp(progress, 0.05, 0.2, 0, 1)
  const questionY = lerp(progress, 0.05, 0.2, 30, 0)

  const answerOpacity = lerp(progress, 0.25, 0.45, 0, 1)
  const answerY = lerp(progress, 0.25, 0.45, 20, 0)

  const maIntroOpacity = lerp(progress, 0.5, 0.65, 0, 1)
  const maIntroY = lerp(progress, 0.5, 0.65, 20, 0)

  const linkOpacity = lerp(progress, 0.7, 0.85, 0, 1)
  const linkScale = lerp(progress, 0.7, 0.85, 0.9, 1)

  return (
    <section
      className="panel panel--dark"
      style={{
        background: 'var(--deep-forest)',
        overflow: 'hidden',
      }}
    >
      {/* Animated video background */}
      <VideoBackground
        videoSrc="/assets/videos/monastic-academy-loop.mp4"
        imageFallback="/assets/images/monastic-academy.png"
        opacity={bgOpacity}
      />

      <AutoScaleContent maxWidth="700px" style={{ padding: '0 2rem', position: 'relative', zIndex: 1 }}>
        {/* The big question */}
        <h2
          className="text-title text-cream text-center text-shadow-depth mb-xl"
          style={{
            opacity: questionOpacity,
            transform: `translateY(${questionY}px)`,
          }}
        >
          So what do you do about it?
        </h2>

        {/* The challenge */}
        <p
          className="text-body text-sage text-center text-shadow-depth leading-relaxed mb-2xl"
          style={{
            opacity: answerOpacity,
            transform: `translateY(${answerY}px)`,
          }}
        >
          How do you recreate meaning, reclaim attention, and rediscover the sacred?
        </p>

        {/* Monastic Academy intro */}
        <div
          className="text-center mb-xl"
          style={{
            opacity: maIntroOpacity,
            transform: `translateY(${maIntroY}px)`,
          }}
        >
          <p className="text-body text-cream text-shadow-depth leading-relaxed">
            That's the question we're trying to answer at
          </p>
        </div>

        {/* Monastic Academy link */}
        <div
          className="text-center"
          style={{
            opacity: linkOpacity,
            transform: `scale(${linkScale})`,
          }}
        >
          <a
            href="https://www.monasticacademy.org/train"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta text-body text-coral text-shadow-depth"
          >
            Monastic Academy
          </a>
        </div>
      </AutoScaleContent>
    </section>
  )
}
