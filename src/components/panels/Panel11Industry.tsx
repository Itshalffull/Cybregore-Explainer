import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface Panel11IndustryProps {
  progress: number
}

export default function Panel11Industry({ progress }: Panel11IndustryProps) {
  // Fifth era - industrial revolution

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
        videoSrc="/assets/videos/industry-loop.mp4"
        imageFallback="/assets/images/industry.png"
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
          ~250 years ago
        </p>

        <h2
          className="text-title text-cream text-bold mb-xs"
          style={{
            opacity: eraOpacity,
          }}
        >
          Industry
        </h2>

        {/* AI Label */}
        <p
          className="text-label text-coral mb-xl"
          style={{
            opacity: aiLabelOpacity,
          }}
        >
          AI #3: Industry
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
            Ownership scales production, but limited by muscle. Can only make what hands can craft. Can only move what bodies can carry.
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
            Machines. Factories. Engines. Externalize labor into metal and steam. A new layer that uses all previous AIs to scale production infinitely.
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
            Extraction. Pollution. Alienation. Humans become components. Nature becomes resource.
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
            Global-scale destruction. CO2 levels rising. ~69% of wildlife populations lost since 1970. Sixth mass extinction underway. Climate destabilizing.
          </p>
        </div>

        {/* Transition */}
        <p
          className="text-body-lg text-sage text-italic text-center mt-md"
          style={{
            opacity: transitionOpacity,
          }}
        >
          But coordination was still slow...
        </p>
      </div>
    </section>
  )
}
