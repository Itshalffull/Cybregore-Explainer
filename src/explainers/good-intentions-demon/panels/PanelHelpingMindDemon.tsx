import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelHelpingMindDemon({ progress }: PanelProps) {
  const ancientOpacity = lerp(progress, 0.0, 0.08, 0, 1)
  const ancientY = lerp(progress, 0.0, 0.08, 20, 0)

  const line1Opacity = lerp(progress, 0.10, 0.18, 0, 1)
  const line1Y = lerp(progress, 0.10, 0.18, 20, 0)

  const line2Opacity = lerp(progress, 0.22, 0.30, 0, 1)
  const line2Y = lerp(progress, 0.22, 0.30, 15, 0)

  const namingOpacity = lerp(progress, 0.35, 0.45, 0, 1)
  const namingY = lerp(progress, 0.35, 0.45, 25, 0)

  const line3Opacity = lerp(progress, 0.50, 0.58, 0, 1)
  const line3Y = lerp(progress, 0.50, 0.58, 15, 0)

  const line4Opacity = lerp(progress, 0.62, 0.70, 0, 1)
  const line4Y = lerp(progress, 0.62, 0.70, 15, 0)

  const closerOpacity = lerp(progress, 0.76, 0.86, 0, 1)
  const closerY = lerp(progress, 0.76, 0.86, 15, 0)

  const transitionOpacity = lerp(progress, 0.88, 0.95, 0, 1)
  const transitionY = lerp(progress, 0.88, 0.95, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: ancientOpacity, transform: `translateY(${ancientY}px)` }}
        >
          In every wisdom tradition, the most dangerous beings
          are not the ones that look like monsters.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}
        >
          The most dangerous beings look like saviors.
        </p>

        <p
          className="text-body text-cream text-center mb-xl"
          style={{ opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}
        >
          They wear the face of virtue.
          They speak in your voice. They feel like your best impulses.
        </p>

        <div
          className="box-coral mb-xl"
          style={{ opacity: namingOpacity, transform: `translateY(${namingY}px)` }}
        >
          <p className="text-body text-bold text-cream text-center">
            The Helping Mind is a demon — literally.
          </p>
        </div>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}
        >
          It wears your desire to do good as its body.
        </p>

        <p
          className="text-body text-cream text-center mb-lg"
          style={{ opacity: line4Opacity, transform: `translateY(${line4Y}px)` }}
        >
          It is the most successful parasite in human history
          because its host defends it as virtue.
        </p>

        <p
          className="text-body text-sage text-center mb-lg"
          style={{ opacity: closerOpacity, transform: `translateY(${closerY}px)` }}
        >
          Silicon Valley defended it. EA defended it. The Rationalists defended it.
          Every host thinks the demon is their best self.
        </p>

        <p
          className="text-body text-cream text-center"
          style={{ opacity: transitionOpacity, transform: `translateY(${transitionY}px)` }}
        >
          And it has an older name.
        </p>
      </div>
    </section>
  )
}
