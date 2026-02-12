import { lerp } from '../../../utils/animation'

interface Panel26CompassionProps {
  progress: number
}

export default function Panel26Compassion({ progress }: Panel26CompassionProps) {
  // Compassion: using the room to get out of the room
  // Meeting people where they are, in their delusion, to help them let go

  const titleOpacity = lerp(progress, 0, 0.10, 0, 1)
  const line1Opacity = lerp(progress, 0.12, 0.22, 0, 1)
  const line2Opacity = lerp(progress, 0.26, 0.36, 0, 1)
  const line3Opacity = lerp(progress, 0.40, 0.50, 0, 1)
  const line4Opacity = lerp(progress, 0.54, 0.64, 0, 1)
  const line5Opacity = lerp(progress, 0.68, 0.78, 0, 1)
  const finalOpacity = lerp(progress, 0.82, 0.95, 0, 1)

  // Visual: a door appearing and opening
  const doorOpacity = lerp(progress, 0.2, 0.5, 0, 1)
  const lightIntensity = lerp(progress, 0.4, 0.8, 0, 1)

  return (
    <section
      className="panel panel--dark"
      style={{
        background: 'linear-gradient(180deg, #0d1210 0%, var(--deep-forest) 100%)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes bgWarmth {
          0%, 100% { transform: scale(1.05); filter: brightness(1); }
          50% { transform: scale(1.03); filter: brightness(1.05); }
        }
        @keyframes gentleGlow {
          0%, 100% {
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1);
          }
          50% {
            text-shadow: 0 0 25px rgba(255, 255, 255, 0.4), 0 0 50px rgba(255, 255, 255, 0.2);
          }
        }
        @keyframes doorGlow {
          0%, 100% {
            box-shadow: 0 0 30px rgba(245, 242, 232, 0.3), inset 0 0 20px rgba(245, 242, 232, 0.1);
          }
          50% {
            box-shadow: 0 0 50px rgba(245, 242, 232, 0.5), inset 0 0 30px rgba(245, 242, 232, 0.2);
          }
        }
        @keyframes lightSpill {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }
      `}</style>

      {/* Animated background */}
      <div
        style={{
          position: 'absolute',
          inset: '-5%',
          backgroundImage: 'url(/assets/images/compassion.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          animation: 'bgWarmth 18s ease-in-out infinite',
        }}
      />

      <div className="panel-body panel-body--over-video panel-body--wide text-center">
        <h2
          className="text-title text-bold text-cream mb-lg"
          style={{
            opacity: titleOpacity,
            animation: titleOpacity > 0.5 ? 'gentleGlow 4s ease-in-out infinite' : 'none',
          }}
        >
          Compassion
        </h2>

        <p
          className="text-subheading text-sage mb-2xl text-italic"
          style={{
            opacity: titleOpacity,
          }}
        >
          bridges
        </p>

        {/* Visual: the room with a door - 3D perspective */}
        <div
          className="mb-2xl"
          style={{
            position: 'relative',
            height: 'clamp(100px, 15dvh, 140px)',
            perspective: '600px',
            perspectiveOrigin: 'center center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(10deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* The "room" - layers of abstraction */}
            <div
              style={{
                position: 'relative',
                width: '240px',
                height: '100px',
                border: '1px solid var(--sage)',
                borderRadius: '6px',
                background: 'rgba(59, 69, 64, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(-20px)',
              }}
            >
              <span style={{ color: 'var(--sage)', fontSize: '0.9rem', opacity: 0.6 }}>
                delusion
              </span>

              {/* The door */}
              <div
                style={{
                  position: 'absolute',
                  right: '-4px',
                  top: '50%',
                  transform: 'translateY(-50%) translateZ(10px)',
                  width: '40px',
                  height: '60px',
                  border: '2px solid var(--line-art-cream)',
                  borderRadius: '3px 6px 6px 3px',
                  background: `rgba(245, 242, 232, ${0.05 + doorOpacity * 0.15})`,
                  opacity: doorOpacity,
                  animation: doorOpacity > 0.5 ? 'doorGlow 4s ease-in-out infinite' : 'none',
                }}
              />

              {/* Light coming through */}
              <div
                style={{
                  position: 'absolute',
                  right: '35px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '60px',
                  height: '80px',
                  background: `linear-gradient(90deg, rgba(245, 242, 232, ${lightIntensity * 0.25}) 0%, transparent 100%)`,
                  animation: lightIntensity > 0.5 ? 'lightSpill 5s ease-in-out infinite' : 'none',
                  borderRadius: '4px',
                }}
              />
            </div>
          </div>
        </div>

        <p
          className="text-subheading text-sage mb-lg leading-relaxed"
          style={{
            opacity: line1Opacity,
          }}
        >
          You can't pull someone out of a room
        </p>

        <p
          className="text-heading text-cream mb-lg leading-normal"
          style={{
            opacity: line2Opacity,
          }}
        >
          by standing outside and shouting.
        </p>

        <p
          className="text-subheading text-sage mb-lg leading-relaxed"
          style={{
            opacity: line3Opacity,
          }}
        >
          You have to enter the room.
        </p>

        <p
          className="text-subheading text-sage mb-lg leading-relaxed"
          style={{
            opacity: line4Opacity,
          }}
        >
          Meet them where they are.
        </p>

        <p
          className="text-heading text-cream mb-lg leading-normal text-medium"
          style={{
            opacity: line5Opacity,
          }}
        >
          Use the room to show them the door.
        </p>

        <p
          className="text-subheading text-coral text-italic leading-relaxed"
          style={{
            opacity: finalOpacity,
          }}
        >
          Intelligence in service of letting go.
        </p>
      </div>
    </section>
  )
}
