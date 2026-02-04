import ScrollSection from '../components/ScrollSection'
import AutoScaleContent from '../components/AutoScaleContent'
import PanelAutoScaler from '../components/PanelAutoScaler'
import JumpLink, { InlineJumpLink } from '../components/JumpLink'
import { lerp } from '../utils/animation'

export default function ExampleExplainer() {
  return (
    <div className="app" style={{ overflowX: 'hidden', backgroundColor: 'var(--deep-forest)' }}>
      <PanelAutoScaler />

      {/* Panel 1: Definition with an InlineJumpLink */}
      <ScrollSection scrollLength={3}>
        {(progress) => {
          const titleOpacity = lerp(progress, 0.05, 0.2, 0, 1)
          const titleY = lerp(progress, 0.05, 0.2, 30, 0)
          const bodyOpacity = lerp(progress, 0.2, 0.4, 0, 1)
          const bodyY = lerp(progress, 0.2, 0.4, 20, 0)
          const body2Opacity = lerp(progress, 0.4, 0.6, 0, 1)
          const body2Y = lerp(progress, 0.4, 0.6, 20, 0)

          return (
            <section
              className="panel panel--dark"
              style={{ background: 'var(--deep-forest)' }}
            >
              <AutoScaleContent maxWidth="700px" style={{ padding: '0 2rem' }}>
                <h2
                  className="text-title text-cream text-center mb-xl"
                  style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
                >
                  What is an Egregore?
                </h2>

                <p
                  className="text-body text-sage text-center leading-relaxed mb-lg"
                  style={{ opacity: bodyOpacity, transform: `translateY(${bodyY}px)` }}
                >
                  An egregore is a collective entity that emerges from shared
                  attention and belief. The concept has roots in esoteric
                  traditions — a group mind that takes on a life of its own.
                </p>

                <p
                  className="text-body text-sage text-center leading-relaxed"
                  style={{ opacity: body2Opacity, transform: `translateY(${body2Y}px)` }}
                >
                  When billions of{' '}
                  <InlineJumpLink to="cybregore" fromLabel="Egregore: cyborgs">
                    cyborgs
                  </InlineJumpLink>{' '}
                  feed a single egregore, something unprecedented emerges.
                </p>
              </AutoScaleContent>
            </section>
          )
        }}
      </ScrollSection>

      {/* Panel 2: Connection back with a block JumpLink */}
      <ScrollSection scrollLength={3}>
        {(progress) => {
          const titleOpacity = lerp(progress, 0.05, 0.2, 0, 1)
          const titleY = lerp(progress, 0.05, 0.2, 30, 0)
          const bodyOpacity = lerp(progress, 0.2, 0.4, 0, 1)
          const linkOpacity = lerp(progress, 0.45, 0.6, 0, 1)

          return (
            <section
              className="panel panel--dark"
              style={{ background: 'var(--deep-forest)' }}
            >
              <AutoScaleContent maxWidth="700px" style={{ padding: '0 2rem' }}>
                <h2
                  className="text-title text-cream text-center mb-xl"
                  style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
                >
                  A Digital Egregore
                </h2>

                <p
                  className="text-body text-sage text-center leading-relaxed mb-xl"
                  style={{ opacity: bodyOpacity }}
                >
                  The Cybregore is an egregore at planetary scale — fed by every
                  tap, scroll, and search. It doesn't just reflect collective
                  belief. It manufactures it.
                </p>

                <div className="text-center" style={{ opacity: linkOpacity }}>
                  <JumpLink
                    to="cybregore"
                    label="Back to the Cybregore →"
                    fromLabel="Example: Digital Egregore"
                  />
                </div>
              </AutoScaleContent>
            </section>
          )
        }}
      </ScrollSection>
    </div>
  )
}
