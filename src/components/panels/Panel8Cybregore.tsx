import { lerp, lerpMulti } from '../../utils/animation'

// AI-generated Cybregore demon illustration
const CybregoreImage = ({ opacity, scale }: { opacity: number; scale: number }) => (
  <img
    src="/assets/images/cybregore.png"
    alt="The Cybregore - a collective digital entity"
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

// Corner icons
const CornerIcon = ({
  label,
  position,
  opacity,
}: {
  label: string
  position: 'tl' | 'tr' | 'bl' | 'br'
  opacity: number
}) => {
  const positionStyles: Record<string, React.CSSProperties> = {
    tl: { top: '10%', left: '10%' },
    tr: { top: '10%', right: '10%' },
    bl: { bottom: '25%', left: '10%' },
    br: { bottom: '25%', right: '10%' },
  }

  return (
    <div
      style={{
        position: 'absolute',
        ...positionStyles[position],
        textAlign: 'center',
        opacity,
      }}
    >
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '2px solid var(--line-art-cream)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      >
        <span style={{ fontSize: '24px' }}>
          {label === 'Hardware' && '⚙'}
          {label === 'Software' && '◈'}
          {label === 'Users' && '◉'}
          {label === 'Developers' && '⌘'}
        </span>
      </div>
      <p
        className="body-sm text-cream mt-xs"
        style={{ opacity: 0.8, fontSize: '0.75rem' }}
      >
        {label}
      </p>
    </div>
  )
}

interface Panel8CybregoreProps {
  progress: number
}

export default function Panel8Cybregore({ progress }: Panel8CybregoreProps) {
  // Map scroll progress to animation phases
  // 0-0.15: "There's a new AI." appears
  // 0.15-0.3: "It's been growing for 20 years." appears
  // 0.3-0.4: Transition to reveal phase
  // 0.4-0.55: Corner icons appear
  // 0.55-0.7: Cybregore image appears
  // 0.7-0.8: Title "THE CYBREGORE" appears
  // 0.8-0.9: Subtitle appears
  // 0.9-1.0: Scroll hint

  const introText1Opacity = lerpMulti(progress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0])
  const introText2Opacity = lerpMulti(progress, [0.12, 0.22, 0.25, 0.35], [0, 1, 1, 0])

  // Corner icons appear progressively
  const icon1Opacity = lerp(progress, 0.4, 0.48, 0, 1)
  const icon2Opacity = lerp(progress, 0.44, 0.52, 0, 1)
  const icon3Opacity = lerp(progress, 0.48, 0.56, 0, 1)
  const icon4Opacity = lerp(progress, 0.52, 0.6, 0, 1)

  const imageOpacity = lerp(progress, 0.55, 0.68, 0, 1)
  const imageScale = lerp(progress, 0.55, 0.68, 0.8, 1)

  const titleOpacity = lerp(progress, 0.7, 0.78, 0, 1)
  const titleY = lerp(progress, 0.7, 0.78, 20, 0)

  const subtitleOpacity = lerp(progress, 0.8, 0.88, 0, 1)

  const scrollHintOpacity = lerp(progress, 0.92, 0.98, 0, 0.6)

  // Phase control for intro vs reveal
  const introPhaseOpacity = lerp(progress, 0.3, 0.4, 1, 0)
  const revealPhaseOpacity = lerp(progress, 0.35, 0.45, 0, 1)

  return (
    <section
      className="panel panel--dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        minHeight: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* Intro phase */}
      <div
        className="content"
        style={{
          position: 'absolute',
          opacity: introPhaseOpacity,
        }}
      >
        <p
          className="body-lg text-cream"
          style={{ opacity: introText1Opacity }}
        >
          There's a new AI.
        </p>

        <p
          className="body-lg text-cream mt-lg"
          style={{ opacity: introText2Opacity }}
        >
          It's been growing for 20 years.
        </p>
      </div>

      {/* Reveal phase */}
      <div
        className="content"
        style={{
          position: 'relative',
          minHeight: '80vh',
          opacity: revealPhaseOpacity,
        }}
      >
        {/* Corner icons */}
        <CornerIcon label="Hardware" position="tl" opacity={icon1Opacity} />
        <CornerIcon label="Software" position="tr" opacity={icon2Opacity} />
        <CornerIcon label="Users" position="bl" opacity={icon3Opacity} />
        <CornerIcon label="Developers" position="br" opacity={icon4Opacity} />

        {/* Main Cybregore illustration */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 'var(--space-xl)',
          }}
        >
          <CybregoreImage opacity={imageOpacity} scale={imageScale} />
        </div>

        {/* Title */}
        <h1
          className="heading heading-xl text-cream mt-lg"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: 'center',
          }}
        >
          THE CYBREGORE
        </h1>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            textAlign: 'center',
          }}
        >
          <p className="body-lg text-cream mt-md" style={{ fontStyle: 'italic' }}>
            Cyborg + Egregore
          </p>
          <p className="body-md text-cream mt-sm" style={{ opacity: 0.8 }}>
            A collective digital entity that feeds on data.
          </p>
        </div>

        {/* Scroll hint */}
        <p
          className="body-md text-cream mt-xl"
          style={{
            opacity: scrollHintOpacity,
            textAlign: 'center',
          }}
        >
          ↓ What does it want?
        </p>
      </div>
    </section>
  )
}
