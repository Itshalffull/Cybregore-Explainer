import { lerp, lerpMulti } from '../../../utils/animation'

// AI-generated elephant image component
const ElephantImage = ({
  opacity = 1,
  scale = 1,
  x = 0,
  y = 0,
  size = 200,
}: {
  opacity?: number
  scale?: number
  x?: number
  y?: number
  size?: number
}) => (
  <img
    src="/assets/images/elephant-head.png"
    alt="Elephant head"
    width={size}
    height={size}
    style={{
      position: 'absolute',
      objectFit: 'contain',
      filter: 'drop-shadow(0 0 10px rgba(245, 242, 232, 0.2))',
      opacity,
      transform: `scale(${scale}) translate(${x}px, ${y}px)`,
    }}
  />
)

interface Panel2ElephantProps {
  progress: number
}

export default function Panel2Elephant({ progress }: Panel2ElephantProps) {
  // Map scroll progress to animation phases
  // 0-0.2: Show title and main elephant
  // 0.2-0.4: First wave of elephants + "Try not to think..."
  // 0.4-0.6: Second wave + "Stop thinking..."
  // 0.6-0.8: Third wave + "Make it stop..." / "You can't"
  // 0.8-1.0: Conclusion text

  const titleOpacity = lerp(progress, 0, 0.1, 0, 1)
  const mainElephantOpacity = lerp(progress, 0.05, 0.15, 0, 1)
  const mainElephantScale = lerp(progress, 0.05, 0.15, 0.8, 1)

  // Additional elephants appear at different scroll positions
  const elephant1Opacity = lerp(progress, 0.2, 0.3, 0, 0.4)
  const elephant2Opacity = lerp(progress, 0.25, 0.35, 0, 0.35)
  const elephant3Opacity = lerp(progress, 0.4, 0.5, 0, 0.3)
  const elephant4Opacity = lerp(progress, 0.45, 0.55, 0, 0.35)
  const elephant5Opacity = lerp(progress, 0.55, 0.65, 0, 0.25)
  const elephant6Opacity = lerp(progress, 0.6, 0.7, 0, 0.2)

  // Text phases (fade in, hold, fade out)
  const text1Opacity = lerpMulti(progress, [0.15, 0.25, 0.35, 0.4], [0, 1, 1, 0])
  const text2Opacity = lerpMulti(progress, [0.35, 0.45, 0.55, 0.6], [0, 1, 1, 0])
  const text3Opacity = lerpMulti(progress, [0.55, 0.65, 0.72, 0.78], [0, 1, 1, 0])
  const text4Opacity = lerp(progress, 0.72, 0.8, 0, 1)

  // Conclusion
  const conclusionOpacity = lerp(progress, 0.85, 0.95, 0, 1)
  const conclusionY = lerp(progress, 0.85, 0.95, 20, 0)

  const additionalElephants = [
    { x: -180, y: -100, scale: 0.6, opacity: elephant1Opacity },
    { x: 180, y: -80, scale: 0.5, opacity: elephant2Opacity },
    { x: -150, y: 120, scale: 0.5, opacity: elephant3Opacity },
    { x: 200, y: 100, scale: 0.55, opacity: elephant4Opacity },
    { x: -220, y: 0, scale: 0.45, opacity: elephant5Opacity },
    { x: 250, y: -30, scale: 0.4, opacity: elephant6Opacity },
  ]

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
      <div className="content">
        <h2
          className="heading heading-lg mb-xl"
          style={{ opacity: titleOpacity }}
        >
          Don't think of this.
        </h2>

        <div
          style={{
            position: 'relative',
            width: '350px',
            height: '350px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          {/* Main elephant */}
          <div
            style={{
              position: 'relative',
              opacity: mainElephantOpacity,
              transform: `scale(${mainElephantScale})`,
            }}
          >
            <ElephantImage opacity={1} scale={1} size={280} />
          </div>

          {/* Additional elephants */}
          {additionalElephants.map((elephant, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                opacity: elephant.opacity,
              }}
            >
              <ElephantImage
                x={elephant.x}
                y={elephant.y}
                scale={elephant.scale}
                size={180}
              />
            </div>
          ))}
        </div>

        {/* Progressive text */}
        <div style={{ position: 'relative', height: '80px', marginTop: 'var(--space-xl)' }}>
          <p
            className="body-lg text-cream"
            style={{
              position: 'absolute',
              width: '100%',
              textAlign: 'center',
              opacity: text1Opacity,
            }}
          >
            Try not to think about it...
          </p>
          <p
            className="body-lg text-cream"
            style={{
              position: 'absolute',
              width: '100%',
              textAlign: 'center',
              opacity: text2Opacity,
            }}
          >
            Stop thinking about it...
          </p>
          <p
            className="body-lg text-cream"
            style={{
              position: 'absolute',
              width: '100%',
              textAlign: 'center',
              opacity: text3Opacity,
            }}
          >
            Make it stop...
          </p>
          <p
            className="body-lg text-cream"
            style={{
              position: 'absolute',
              width: '100%',
              textAlign: 'center',
              opacity: text4Opacity,
            }}
          >
            You can't.
          </p>
        </div>

        {/* Conclusion */}
        <div
          style={{
            opacity: conclusionOpacity,
            transform: `translateY(${conclusionY}px)`,
            marginTop: 'var(--space-lg)',
          }}
        >
          <p className="body-lg text-cream">
            You just ran a program you didn't choose.
          </p>
        </div>
      </div>
    </section>
  )
}
