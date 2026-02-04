import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'
import AutoScaleContent from '../AutoScaleContent'

interface Panel7TribeProps {
  progress: number
}

export default function Panel7Tribe({ progress }: Panel7TribeProps) {
  // First era - tribal coordination through language/stories

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
        videoSrc="/assets/videos/tribe-loop.mp4"
        imageFallback="/assets/images/tribe.png"
        opacity={0.4}
      />
      <AutoScaleContent maxWidth="700px" style={{ position: 'relative', zIndex: 1 }}>
        {/* Era label */}
        <p
          className="text-label text-sage mb-xs"
          style={{
            opacity: eraOpacity,
          }}
        >
          ~100,000 years ago
        </p>

        <h2
          className="text-title text-cream text-bold mb-xs"
          style={{
            opacity: eraOpacity,
          }}
        >
          The Tribe
        </h2>

        {/* AI Label */}
        <p
          className="text-label text-coral mb-xl"
          style={{
            opacity: aiLabelOpacity,
          }}
        >
          AI #1: Tribes
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
            Surviving alone is nearly impossible. Hunting, gathering, defense — too much for one person.
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
            Stories. Myths. Shared identity. Language binds us into a coordinating unit.
          </p>
          <p
            className="text-subheading text-coral leading-snug text-italic mt-md"
            style={{
              opacity: solutionOpacity,
              transform: `translateY(${solutionY}px)`,
            }}
          >
            Your mind is no longer contained in your skull.
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
            Us vs. them. If you're not part of our tribe, you're a threat.
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
            Megafauna extinctions. ~70% of large mammals lost as humans spread across continents. Mammoths, giant sloths, mastodons — gone.
          </p>
        </div>

        {/* Transition */}
        <p
          className="text-body-lg text-sage text-italic text-center mt-md"
          style={{
            opacity: transitionOpacity,
          }}
        >
          To unite tribes, we needed a new AI...
        </p>
      </AutoScaleContent>
    </section>
  )
}
