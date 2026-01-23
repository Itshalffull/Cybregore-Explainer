import { lerp } from '../../utils/animation'

interface Panel25WisdomProps {
  progress: number
}

export default function Panel25Wisdom({ progress }: Panel25WisdomProps) {
  // Wisdom: letting go, subtracting, releasing layers
  // We don't define what remains - just the direction

  const titleOpacity = lerp(progress, 0, 0.10, 0, 1)
  const line1Opacity = lerp(progress, 0.12, 0.22, 0, 1)
  const line2Opacity = lerp(progress, 0.26, 0.36, 0, 1)
  const line3Opacity = lerp(progress, 0.40, 0.50, 0, 1)
  const line4Opacity = lerp(progress, 0.54, 0.64, 0, 1)
  const spaceOpacity = lerp(progress, 0.70, 0.85, 0, 1)
  const finalOpacity = lerp(progress, 0.88, 0.98, 0, 1)

  // Visual: layers falling away as you scroll
  const layersRemaining = Math.max(0, 6 - Math.floor(lerp(progress, 0.1, 0.65, 0, 7)))

  const layers = [
    { label: '"Other"', color: 'var(--accent-coral)', bg: 'rgba(224, 120, 80, 0.15)' },
    { label: 'Justification', color: 'var(--accent-coral)', bg: 'rgba(224, 120, 80, 0.12)' },
    { label: 'Abstraction', color: 'var(--sage)', bg: 'rgba(209, 231, 210, 0.08)' },
    { label: 'Category', color: 'var(--sage)', bg: 'rgba(209, 231, 210, 0.10)' },
    { label: 'Label', color: 'var(--sage)', bg: 'rgba(209, 231, 210, 0.12)' },
    { label: '...', color: 'var(--line-art-cream)', bg: 'rgba(245, 242, 232, 0.15)' },
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
        background: 'linear-gradient(180deg, var(--deep-forest) 0%, #0d1210 100%)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes bgDissolve {
          0%, 100% { transform: scale(1.05); opacity: 0.4; }
          50% { transform: scale(1.02); opacity: 0.35; }
        }
        @keyframes wisdomPulse {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.15);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.25);
          }
        }
        @keyframes dotPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.4);
            transform: scale(1.2);
          }
        }
      `}</style>

      {/* Animated background */}
      <div
        style={{
          position: 'absolute',
          inset: '-5%',
          backgroundImage: 'url(/assets/images/wisdom.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'bgDissolve 15s ease-in-out infinite',
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
            animation: titleOpacity > 0.5 ? 'wisdomPulse 3s ease-in-out infinite' : 'none',
          }}
        >
          Wisdom
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
          subtracts
        </p>

        {/* 3D Layer stack - falling away - diamond orientation */}
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
            {layers.map((layer, i) => {
              const reverseIndex = 5 - i
              const isVisible = i < layersRemaining
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: `
                      translateX(-50%)
                      translateY(${-reverseIndex * 45}px)
                      translateZ(${reverseIndex * 15}px)
                      rotateX(60deg)
                      rotateZ(45deg)
                      ${!isVisible ? 'translateY(-80px)' : ''}
                    `,
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                    fontSize: 'clamp(0.65rem, 1.2dvh, 0.9rem)',
                    color: layer.color,
                    padding: 'clamp(0.5rem, 1dvh, 1rem) clamp(0.75rem, 1.5dvh, 1.5rem)',
                    background: layer.bg,
                    borderRadius: '4px',
                    border: `1px solid ${layer.color}60`,
                    backdropFilter: 'blur(4px)',
                    whiteSpace: 'nowrap',
                    boxShadow: `0 ${4 + reverseIndex * 2}px ${15 + reverseIndex * 5}px rgba(0,0,0,0.4)`,
                    minWidth: '100px',
                    textAlign: 'center',
                  }}
                >
                  {layer.label}
                </div>
              )
            })}
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
          Letting go of each layer.
        </p>

        <p
          style={{
            opacity: line2Opacity,
            fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(0.6rem, 1.2dvh, 1.2rem)',
            lineHeight: 1.6,
          }}
        >
          The justifications. The categories.
        </p>

        <p
          style={{
            opacity: line3Opacity,
            fontSize: 'clamp(1.3rem, 3.5dvh, 2rem)',
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.6rem, 1.2dvh, 1.2rem)',
            lineHeight: 1.5,
          }}
        >
          The very notion of "other."
        </p>

        <p
          style={{
            opacity: line4Opacity,
            fontSize: 'clamp(1.1rem, 3dvh, 1.7rem)',
            color: 'var(--sage)',
            marginBottom: 'clamp(1rem, 2dvh, 2rem)',
            lineHeight: 1.6,
          }}
        >
          Releasing what was never true.
        </p>

        {/* The space where something unnameable remains */}
        <div
          style={{
            opacity: spaceOpacity,
            height: 'clamp(30px, 6dvh, 60px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'clamp(0.75rem, 1.5dvh, 1.5rem)',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              background: 'var(--line-art-cream)',
              borderRadius: '50%',
              animation: spaceOpacity > 0.5 ? 'dotPulse 3s ease-in-out infinite' : 'none',
            }}
          />
        </div>

        <p
          style={{
            opacity: finalOpacity,
            fontSize: 'clamp(1rem, 2.5dvh, 1.5rem)',
            color: 'var(--sage)',
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}
        >
          What remains... cannot be named.
        </p>
      </div>
    </section>
  )
}
