import { lerp } from '../../utils/animation'

interface Panel24IntelligenceProps {
  progress: number
}

export default function Panel24Intelligence({ progress }: Panel24IntelligenceProps) {
  // Intelligence: adding layers, abstraction, distance from the being in front of you

  const titleOpacity = lerp(progress, 0, 0.10, 0, 1)
  const line1Opacity = lerp(progress, 0.12, 0.24, 0, 1)
  const line2Opacity = lerp(progress, 0.26, 0.38, 0, 1)
  const line3Opacity = lerp(progress, 0.42, 0.54, 0, 1)
  const line4Opacity = lerp(progress, 0.58, 0.70, 0, 1)
  const conclusionOpacity = lerp(progress, 0.75, 0.90, 0, 1)

  // Visual: layers building up as you scroll
  const layerCount = Math.floor(lerp(progress, 0.1, 0.7, 0, 6))

  const layers = [
    { label: 'Being', color: 'var(--line-art-cream)', bg: 'rgba(245, 242, 232, 0.15)' },
    { label: 'Label', color: 'var(--sage)', bg: 'rgba(209, 231, 210, 0.12)' },
    { label: 'Category', color: 'var(--sage)', bg: 'rgba(209, 231, 210, 0.10)' },
    { label: 'Abstraction', color: 'var(--sage)', bg: 'rgba(209, 231, 210, 0.08)' },
    { label: 'Justification', color: 'var(--accent-coral)', bg: 'rgba(224, 120, 80, 0.12)' },
    { label: '"Other"', color: 'var(--accent-coral)', bg: 'rgba(224, 120, 80, 0.15)' },
  ]

  return (
    <section
      className="panel"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, #1a1a1a 0%, var(--deep-forest) 100%)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes bgFloat {
          0%, 100% { transform: scale(1.05) translateY(0); }
          50% { transform: scale(1.08) translateY(-10px); }
        }
      `}</style>

      {/* Animated background */}
      <div
        style={{
          position: 'absolute',
          inset: '-5%',
          backgroundImage: 'url(/assets/images/intelligence.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
          animation: 'bgFloat 20s ease-in-out infinite',
        }}
      />

      <div className="content" style={{ position: 'relative', zIndex: 1, maxWidth: '800px', maxHeight: '92dvh', overflow: 'hidden', padding: '0 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2
          style={{
            opacity: titleOpacity,
            fontSize: 'clamp(2rem, min(5.5dvh, 10vw), 3.5rem)',
            fontWeight: 700,
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.75rem, 1.5dvh, 2rem)',
          }}
        >
          Intelligence
        </h2>

        <p
          style={{
            opacity: titleOpacity,
            fontSize: 'clamp(1rem, 2.5dvh, 1.5rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(1rem, 2dvh, 2.5rem)',
            fontStyle: 'italic',
          }}
        >
          adds
        </p>

        {/* 3D Layer stack with perspective - diamond orientation */}
        <div
          style={{
            marginBottom: 'clamp(1.5rem, 3dvh, 3rem)',
            position: 'relative',
            height: 'clamp(200px, 35dvh, 320px)',
            perspective: '1000px',
            perspectiveOrigin: 'center 40%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
              transformStyle: 'preserve-3d',
            }}
          >
            {layers.map((layer, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: `
                    translateX(-50%)
                    translateY(${-i * 45}px)
                    translateZ(${i * 15}px)
                    rotateX(60deg)
                    rotateZ(45deg)
                  `,
                  opacity: i <= layerCount ? 1 : 0,
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: 'clamp(0.65rem, 1.2dvh, 0.9rem)',
                  color: layer.color,
                  padding: 'clamp(0.5rem, 1dvh, 1rem) clamp(0.75rem, 1.5dvh, 1.5rem)',
                  background: layer.bg,
                  borderRadius: '4px',
                  border: `1px solid ${layer.color}60`,
                  backdropFilter: 'blur(4px)',
                  whiteSpace: 'nowrap',
                  boxShadow: `0 ${4 + i * 2}px ${15 + i * 5}px rgba(0,0,0,0.4)`,
                  minWidth: '100px',
                  textAlign: 'center',
                }}
              >
                {layer.label}
              </div>
            ))}
          </div>
        </div>

        <p
          style={{
            opacity: line1Opacity,
            fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(0.6rem, 1.2dvh, 1.2rem)',
            lineHeight: 1.6,
          }}
        >
          Each layer of abstraction
        </p>

        <p
          style={{
            opacity: line2Opacity,
            fontSize: 'clamp(1.3rem, 3.5dvh, 2rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.6rem, 1.2dvh, 1.2rem)',
            lineHeight: 1.5,
          }}
        >
          creates distance from the being in front of you.
        </p>

        <p
          style={{
            opacity: line3Opacity,
            fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(0.6rem, 1.2dvh, 1.2rem)',
            lineHeight: 1.6,
          }}
        >
          The more layers,
        </p>

        <p
          style={{
            opacity: line4Opacity,
            fontSize: 'clamp(1.3rem, 3.5dvh, 2rem)',
            color: 'var(--accent-coral)',
            marginBottom: 'clamp(0.75rem, 1.5dvh, 1.5rem)',
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          the easier it becomes to kill.
        </p>

        <p
          style={{
            opacity: conclusionOpacity,
            fontSize: 'clamp(1rem, 2.5dvh, 1.5rem)',
            color: 'var(--sage)',
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}
        >
          Intelligence solves problems by building up.
        </p>
      </div>
    </section>
  )
}
