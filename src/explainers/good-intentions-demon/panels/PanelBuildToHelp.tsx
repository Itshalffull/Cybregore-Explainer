import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelBuildToHelp({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0.0, 0.1, 0, 1)
  const line1Y = lerp(progress, 0.0, 0.1, 20, 0)

  const line2Opacity = lerp(progress, 0.12, 0.22, 0, 1)
  const line2Y = lerp(progress, 0.12, 0.22, 20, 0)

  const line3Opacity = lerp(progress, 0.28, 0.38, 0, 1)
  const line3Y = lerp(progress, 0.28, 0.38, 15, 0)

  const line4Opacity = lerp(progress, 0.45, 0.55, 0, 1)
  const line4Y = lerp(progress, 0.45, 0.55, 15, 0)

  const line5Opacity = lerp(progress, 0.62, 0.72, 0, 1)
  const line5Y = lerp(progress, 0.62, 0.72, 15, 0)

  const revealOpacity = lerp(progress, 0.78, 0.88, 0, 1)
  const revealY = lerp(progress, 0.78, 0.88, 20, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          Let me tell you a story.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          I thought the way to help was to build companies.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          Silicon Valley started with a genuine desire to help.
          Build a company, change the world. That was the promise.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          Everybody was trying to help.
          Or at least saying they were trying to help.
        </p>

        <p
          className="text-body text-sage text-center mb-xl"
          style={{ opacity: line5Opacity, transform: `translateY(${line5Y}px)` }}
        >
          Thousands of startups. Billions of dollars. Millions of bright minds.
          All aimed at making the world a better place.
        </p>

        <p
          className="text-body text-bold text-coral text-center"
          style={{ opacity: revealOpacity, transform: `translateY(${revealY}px)` }}
        >
          It wasn't helping the problem.
        </p>
      </div>
    </section>
  )
}
