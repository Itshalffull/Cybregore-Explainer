import { lerp } from '../../../utils/animation'

interface PanelProps {
  progress: number
}

export default function PanelMolochTheDemon({ progress }: PanelProps) {
  const ancientOpacity = lerp(progress, 0.0, 0.10, 0, 1)
  const ancientY = lerp(progress, 0.0, 0.10, 20, 0)

  const nameOpacity = lerp(progress, 0.14, 0.25, 0, 1)
  const nameY = lerp(progress, 0.14, 0.25, 25, 0)

  const descOpacity = lerp(progress, 0.32, 0.42, 0, 1)
  const descY = lerp(progress, 0.32, 0.42, 15, 0)

  const bridgeOpacity = lerp(progress, 0.50, 0.60, 0, 1)
  const bridgeY = lerp(progress, 0.50, 0.60, 15, 0)

  const implicationOpacity = lerp(progress, 0.68, 0.78, 0, 1)
  const implicationY = lerp(progress, 0.68, 0.78, 15, 0)

  const lingerOpacity = lerp(progress, 0.84, 0.92, 0, 1)
  const lingerY = lerp(progress, 0.84, 0.92, 15, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body panel-body--over-video">
        <p
          className="text-body text-sage text-center text-shadow-depth mb-lg"
          style={{ opacity: ancientOpacity, transform: `translateY(${ancientY}px)` }}
        >
          The ancients knew this force.
        </p>

        <p
          className="text-title text-coral text-center text-shadow-depth mb-xl"
          style={{ opacity: nameOpacity, transform: `translateY(${nameY}px)` }}
        >
          Moloch.
        </p>

        <p
          className="text-body text-cream text-center text-shadow-depth mb-lg"
          style={{ opacity: descOpacity, transform: `translateY(${descY}px)` }}
        >
          The god who demands the sacrifice of children.
        </p>

        <div
          className="box-coral mb-lg"
          style={{ opacity: bridgeOpacity, transform: `translateY(${bridgeY}px)` }}
        >
          <p className="text-body text-cream text-center text-shadow-depth">
            Not a metaphor. A literal demon.
          </p>
        </div>

        <p
          className="text-body text-cream text-center text-shadow-depth mb-lg"
          style={{ opacity: implicationOpacity, transform: `translateY(${implicationY}px)` }}
        >
          The Molochian process is not a coordination failure described by economists.
        </p>

        <p
          className="text-body text-coral text-bold text-center text-shadow-depth"
          style={{ opacity: lingerOpacity, transform: `translateY(${lingerY}px)` }}
        >
          It feeds on the destruction of what you love most.
        </p>
      </div>
    </section>
  )
}
