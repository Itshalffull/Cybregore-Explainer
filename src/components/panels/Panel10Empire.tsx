import { lerp } from '../../utils/animation'
import VideoBackground from '../VideoBackground'

interface Panel10EmpireProps {
  progress: number
}

export default function Panel10Empire({ progress }: Panel10EmpireProps) {
  // Fourth era - writing, bureaucracy, empire

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
        videoSrc="/assets/videos/empire-loop.mp4"
        imageFallback="/assets/images/empire.png"
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
          ~3,000 years ago
        </p>

        <h2
          className="text-title text-cream text-bold mb-xs"
          style={{
            opacity: eraOpacity,
          }}
        >
          Empire
        </h2>

        {/* AI Label */}
        <p
          className="text-label text-coral mb-xl"
          style={{
            opacity: aiLabelOpacity,
          }}
        >
          AI #4: Writing + Bureaucracy
        </p>

        {/* Problem */}
        <div className="mb-lg">
          <p
            className="text-label text-dark mb-xs"
            style={{
              opacity: problemOpacity,
              transform: `translateY(${problemY}px)`,
            }}
          >
            Problem
          </p>
          <p
            className="text-body-lg text-cream leading-normal"
            style={{
              opacity: problemOpacity,
              transform: `translateY(${problemY}px)`,
            }}
          >
            Money enables trade at scale, but can't coordinate millions. Memory fails. Agreements forgotten. Orders lost.
          </p>
        </div>

        {/* Solution */}
        <div className="mb-lg">
          <p
            className="text-label text-dark mb-xs"
            style={{
              opacity: solutionOpacity,
              transform: `translateY(${solutionY}px)`,
            }}
          >
            The AI
          </p>
          <p
            className="text-body-lg text-sage leading-normal"
            style={{
              opacity: solutionOpacity,
              transform: `translateY(${solutionY}px)`,
            }}
          >
            Writing. Laws. Bureaucracy. Records that outlive memory. Hierarchies that outlive rulers. A system layered on all previous AIs.
          </p>
        </div>

        {/* New Problem */}
        <div className="mb-lg">
          <p
            className="text-label text-dark mb-xs"
            style={{
              opacity: newProblemOpacity,
              transform: `translateY(${newProblemY}px)`,
            }}
          >
            New problem created
          </p>
          <p
            className="text-body-lg text-sage leading-normal text-italic"
            style={{
              opacity: newProblemOpacity,
              transform: `translateY(${newProblemY}px)`,
            }}
          >
            Hierarchy. Oppression. War at scale. The individual becomes a number, a record, a subject.
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
            className="text-body-lg text-cream leading-normal"
            style={{
              opacity: destructionOpacity,
              transform: `translateY(${destructionY}px)`,
            }}
          >
            Continental-scale destruction. Mediterranean forests gone. Soil depleted. First mass extinctions of entire biomes. Rome's grain demands consume North Africa's fertility.
          </p>
        </div>

        {/* Transition */}
        <p
          className="text-body text-sage text-italic text-center mt-md"
          style={{
            opacity: transitionOpacity,
          }}
        >
          But human labor still limited production...
        </p>
      </div>
    </section>
  )
}
