import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface PanelBigQuestionProps {
  progress: number
}

export default function PanelBigQuestion({ progress }: PanelBigQuestionProps) {
  // A reflective moment - the big question (now at the end)

  const question1Opacity = lerp(progress, 0.05, 0.25, 0, 1)
  const question1Y = lerp(progress, 0.05, 0.25, 30, 0)
  const question2Opacity = lerp(progress, 0.4, 0.65, 0, 1)
  const question2Y = lerp(progress, 0.4, 0.65, 30, 0)

  return (
    <section
      className="panel panel--dark"
      style={{
        background: 'var(--deep-forest)',
        overflow: 'hidden',
      }}
    >
      {/* Animated question mark video background */}
      <VideoBackground
        videoSrc="/assets/videos/question-mark-loop.mp4"
        imageFallback="/assets/images/question-mark.png"
        opacity={0.4}
      />

      <div className="panel-body panel-body--over-video panel-body--wide text-center">
        <p
          className="text-heading text-cream leading-normal mb-2xl text-medium"
          style={{
            opacity: question1Opacity,
            transform: `translateY(${question1Y}px)`,
          }}
        >
          How did we get to this point?
        </p>

        <p
          className="text-heading text-sage leading-relaxed"
          style={{
            opacity: question2Opacity,
            transform: `translateY(${question2Y}px)`,
          }}
        >
          Why is it that every time we create more intelligence to solve our problems,
          <br />
          <span className="text-coral">
            we create even bigger problems?
          </span>
        </p>
      </div>
    </section>
  )
}
