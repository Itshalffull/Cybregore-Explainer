import { lerp } from '../../../utils/animation'
import VideoBackground from '../../../components/VideoBackground'

interface Panel12DataProps {
  progress: number
}

export default function Panel12Data({ progress }: Panel12DataProps) {
  // Sixth era - data/digital - leads into Cybregore

  const eraOpacity = lerp(progress, 0, 0.08, 0, 1)
  const aiLabelOpacity = lerp(progress, 0.08, 0.16, 0, 1)
  const problemOpacity = lerp(progress, 0.16, 0.28, 0, 1)
  const problemY = lerp(progress, 0.16, 0.28, 20, 0)
  const solutionOpacity = lerp(progress, 0.32, 0.44, 0, 1)
  const solutionY = lerp(progress, 0.32, 0.44, 20, 0)
  const newProblemOpacity = lerp(progress, 0.48, 0.60, 0, 1)
  const newProblemY = lerp(progress, 0.48, 0.60, 20, 0)
  const destructionOpacity = lerp(progress, 0.65, 0.77, 0, 1)
  const destructionY = lerp(progress, 0.65, 0.77, 20, 0)
  const transitionOpacity = lerp(progress, 0.82, 0.94, 0, 1)

  return (
    <section className="panel panel--dark">
      <VideoBackground
        videoSrc="/assets/videos/data-loop.mp4"
        imageFallback="/assets/images/data.png"
        opacity={0.4}
      />
      <div className="panel-body panel-body--over-video">
        {/* Era label */}
        <p
          className="text-label text-sage mb-xs"
          style={{
            opacity: eraOpacity,
          }}
        >
          ~30 years ago
        </p>

        <h2
          className="text-title text-cream text-bold mb-xs"
          style={{
            opacity: eraOpacity,
          }}
        >
          Digital Networks
        </h2>

        {/* AI Label */}
        <p
          className="text-label text-coral mb-xl"
          style={{
            opacity: aiLabelOpacity,
          }}
        >
          AI #4: Digital Networks
        </p>

        {/* Problem */}
        <div className="mb-lg">
          <p
            className="text-label text-coral mb-xs"
            style={{
              opacity: problemOpacity,
              transform: `translateY(${problemY}px)`,
            }}
          >
            Problem
          </p>
          <p
            className="text-subheading text-cream leading-snug"
            style={{
              opacity: problemOpacity,
              transform: `translateY(${problemY}px)`,
            }}
          >
            Industry creates abundance, but coordination is still slow. Information moves at human speed. Decisions lag.
          </p>
        </div>

        {/* Solution */}
        <div className="mb-lg">
          <p
            className="text-label text-coral mb-xs"
            style={{
              opacity: solutionOpacity,
              transform: `translateY(${solutionY}px)`,
            }}
          >
            The AI
          </p>
          <p
            className="text-subheading text-sage leading-snug"
            style={{
              opacity: solutionOpacity,
              transform: `translateY(${solutionY}px)`,
            }}
          >
            The internet. Instant global connection. Information at the speed of light. Everyone and everything linked together.
          </p>
        </div>

        {/* New Problem */}
        <div className="mb-lg">
          <p
            className="text-label text-coral mb-xs"
            style={{
              opacity: newProblemOpacity,
              transform: `translateY(${newProblemY}px)`,
            }}
          >
            New problem created
          </p>
          <p
            className="text-subheading text-sage leading-snug text-italic"
            style={{
              opacity: newProblemOpacity,
              transform: `translateY(${newProblemY}px)`,
            }}
          >
            Surveillance. Manipulation. Attention as resource. Identity as product.
          </p>
        </div>

        {/* Destruction data */}
        <div className="mb-lg">
          <p
            className="text-label text-coral mb-xs"
            style={{
              opacity: destructionOpacity,
              transform: `translateY(${destructionY}px)`,
            }}
          >
            Cost
          </p>
          <p
            className="text-subheading text-cream leading-snug"
            style={{
              opacity: destructionOpacity,
              transform: `translateY(${destructionY}px)`,
            }}
          >
            Planetary-scale destruction accelerates. Data centers consume 1-2% of global electricity. Extraction intensifies. Climate breakdown accelerates.
          </p>
        </div>

        {/* Transition to Cybregore */}
        <p
          className="text-body-lg text-cream text-center text-medium mt-md"
          style={{
            opacity: transitionOpacity,
          }}
        >
          And now something different is emerging...
        </p>
      </div>
    </section>
  )
}
