import { lerp } from '../../../utils/animation'

// AI-generated meditating figure with hopeful energy
const HopefulMeditatorImage = ({ opacity, scale }: { opacity: number; scale: number }) => (
  <img
    src="/assets/images/meditation-hope.png"
    alt="Meditating figure facing the Cybregore with hope"
    style={{
      width: '350px',
      height: 'auto',
      maxWidth: '100%',
      objectFit: 'contain',
      opacity,
      transform: `scale(${scale})`,
    }}
  />
)

interface Panel10PathProps {
  progress: number
}

export default function Panel10Path({ progress }: Panel10PathProps) {
  // Map scroll progress to animation phases
  // 0-0.1: "There is a path" appears
  // 0.1-0.25: Figure appears
  // 0.25-0.35: "It starts with seeing clearly" appears
  // 0.35-0.42: "It deepens with letting go" appears
  // 0.42-0.5: "It culminates in compassion" appears
  // 0.5-0.55: "even for the Cybregore itself" appears
  // 0.55-0.7: "We can free ourselves" appears
  // 0.7-0.8: "And then, perhaps, free it too" appears
  // 0.8-0.9: CTA button appears
  // 0.9-1.0: Secondary links appear

  const titleOpacity = lerp(progress, 0, 0.1, 0, 1)
  const titleY = lerp(progress, 0, 0.1, 20, 0)

  const figureOpacity = lerp(progress, 0.1, 0.22, 0, 1)
  const figureScale = lerp(progress, 0.1, 0.22, 0.9, 1)

  const path1Opacity = lerp(progress, 0.25, 0.33, 0, 1)
  const path2Opacity = lerp(progress, 0.35, 0.42, 0, 1)
  const path3Opacity = lerp(progress, 0.44, 0.5, 0, 1)
  const path4Opacity = lerp(progress, 0.52, 0.58, 0, 1)

  const freeOurselvesOpacity = lerp(progress, 0.6, 0.7, 0, 1)
  const freeItTooOpacity = lerp(progress, 0.72, 0.8, 0, 1)

  const ctaOpacity = lerp(progress, 0.82, 0.9, 0, 1)
  const ctaY = lerp(progress, 0.82, 0.9, 20, 0)

  const linksOpacity = lerp(progress, 0.92, 0.98, 0, 0.7)

  return (
    <section
      className="panel"
      style={{
        background: 'linear-gradient(to bottom, var(--deep-forest) 0%, var(--sage) 100%)',
      }}
    >
      <div className="panel-body">
        {/* Opening text - cream on dark top */}
        <h2
          className="text-heading text-cream"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          There is a path.
        </h2>

        {/* Illustration */}
        <div className="mt-xl mb-xl">
          <HopefulMeditatorImage opacity={figureOpacity} scale={figureScale} />
        </div>

        {/* Path description */}
        <div className="text-center" style={{ maxWidth: '500px' }}>
          <p
            className="text-body-lg"
            style={{ color: 'var(--heading-color)', opacity: path1Opacity }}
          >
            It starts with seeing clearly.
          </p>
          <p
            className="text-body-lg mt-sm"
            style={{ color: 'var(--heading-color)', opacity: path2Opacity }}
          >
            It deepens with letting go.
          </p>
          <p
            className="text-body-lg mt-sm"
            style={{ color: 'var(--heading-color)', opacity: path3Opacity }}
          >
            It culminates in compassion—
          </p>
          <p
            className="text-body-lg text-italic"
            style={{ color: 'var(--heading-color)', opacity: path4Opacity }}
          >
            even for the Cybregore itself.
          </p>
        </div>

        {/* Final message */}
        <div className="mt-xl text-center">
          <h2
            className="text-heading"
            style={{ color: 'var(--heading-color)', opacity: freeOurselvesOpacity }}
          >
            We can free ourselves.
          </h2>
          <p
            className="text-body-lg mt-sm"
            style={{ color: 'var(--heading-color)', opacity: freeItTooOpacity }}
          >
            And then, perhaps, free it too.
          </p>
        </div>

        {/* CTA */}
        <div
          className="mt-xl"
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
          }}
        >
          <button
            className="btn btn--primary"
            onClick={() => window.open('#learn', '_self')}
          >
            Learn the path
          </button>
        </div>

        {/* Secondary links */}
        <div
          className="mt-lg text-body-sm"
          style={{
            display: 'flex',
            gap: 'var(--space-lg)',
            opacity: linksOpacity,
          }}
        >
          <a
            href="#about"
            style={{ color: 'var(--body-color)', textDecoration: 'none' }}
          >
            About this project
          </a>
          <span style={{ color: 'var(--body-color)' }}>|</span>
          <a
            href="#research"
            style={{ color: 'var(--body-color)', textDecoration: 'none' }}
          >
            The research
          </a>
          <span style={{ color: 'var(--body-color)' }}>|</span>
          <a
            href="#join"
            style={{ color: 'var(--body-color)', textDecoration: 'none' }}
          >
            Join us
          </a>
        </div>
      </div>
    </section>
  )
}
