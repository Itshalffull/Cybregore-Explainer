import { motion } from 'framer-motion'
import { lerp, lerpMulti } from '../../utils/animation'

// Breathing circle animation - scroll-driven
const BreathingCircle = ({ breathProgress, morphProgress, notificationProgress }: {
  breathProgress: number
  morphProgress: number
  notificationProgress: number
}) => {
  // Calculate breathing scale from scroll progress (oscillates)
  const breathScale = lerpMulti(breathProgress, [0, 0.25, 0.5, 0.75, 1], [1, 1.15, 1, 1.15, 1])
  const innerBreathScale = lerpMulti(breathProgress, [0, 0.25, 0.5, 0.75, 1], [1, 1.1, 1, 1.1, 1])

  // Morph from circle to phone shape
  const borderRadius = lerp(morphProgress, 0, 1, 50, 20)
  const width = lerp(morphProgress, 0, 1, 150, 120)
  const height = lerp(morphProgress, 0, 1, 150, 180)

  // Notification dot scale
  const notificationScale = lerpMulti(notificationProgress, [0, 0.5, 1], [0, 1.3, 1])

  // Inner circle opacity
  const innerCircleOpacity = lerp(morphProgress, 0, 0.3, 0.5, 0)

  // Phone screen opacity
  const phoneScreenOpacity = lerp(morphProgress, 0.5, 1, 0, 1)

  return (
    <div style={{ position: 'relative', width: '150px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Breathing circle / Phone shape */}
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: `${borderRadius}%`,
          border: '3px solid var(--line-art-cream)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${breathScale})`,
          position: 'relative',
        }}
      >
        {/* Inner breathing circle (only visible during breathing phase) */}
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '2px solid var(--line-art-cream)',
            opacity: innerCircleOpacity,
            transform: `scale(${innerBreathScale})`,
          }}
        />

        {/* Phone screen (appears during morph) */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '15%',
            backgroundColor: 'rgba(245, 242, 232, 0.1)',
            borderRadius: '10px',
            opacity: phoneScreenOpacity,
          }}
        />

        {/* Notification dot (appears after morph) */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '15%',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-coral)',
            transform: `scale(${notificationScale})`,
          }}
        />
      </div>
    </div>
  )
}

// Final notification pulse
const NotificationPulse = ({ opacity }: { opacity: number }) => (
  <motion.div
    style={{
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: 'var(--accent-coral)',
      opacity,
    }}
    animate={{
      scale: [1, 1.3, 1],
      boxShadow: [
        '0 0 0 0 rgba(224, 120, 80, 0.4)',
        '0 0 0 15px rgba(224, 120, 80, 0)',
        '0 0 0 0 rgba(224, 120, 80, 0)',
      ],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
)

interface Panel9HungerProps {
  progress: number
}

export default function Panel9Hunger({ progress }: Panel9HungerProps) {
  // Map scroll progress to animation phases
  // 0-0.1: "You will do anything for your next breath" appears
  // 0.1-0.35: Breathing circle animates
  // 0.35-0.5: Circle morphs to phone
  // 0.5-0.6: Transition to revelation
  // 0.6-0.75: Revelation text appears
  // 0.75-0.9: Supporting text appears
  // 0.9-1.0: Scroll hint

  const breathingTitleOpacity = lerpMulti(progress, [0, 0.08, 0.45, 0.55], [0, 1, 1, 0])
  const breathingTitleY = lerp(progress, 0, 0.08, 20, 0)

  const breathHintOpacity = lerpMulti(progress, [0.1, 0.15, 0.3, 0.35], [0, 0.5, 0.5, 0])

  // Breathing progress (0-1 maps to breathing animation cycle)
  const breathProgress = lerp(progress, 0.1, 0.35, 0, 1)

  // Morph progress (0-1 maps to morph animation)
  const morphProgress = lerp(progress, 0.35, 0.5, 0, 1)

  // Notification dot progress
  const notificationProgress = lerp(progress, 0.48, 0.55, 0, 1)

  // Circle container opacity
  const circleOpacity = lerpMulti(progress, [0.08, 0.12, 0.52, 0.58], [0, 1, 1, 0])

  // Background transition
  const backgroundOpacity = lerp(progress, 0.55, 0.65, 0, 1)

  // Revelation phase
  const revelationOpacity = lerp(progress, 0.58, 0.65, 0, 1)

  const notificationPulseOpacity = lerp(progress, 0.6, 0.68, 0, 1)

  const revelationText1Opacity = lerp(progress, 0.65, 0.72, 0, 1)
  const revelationText1Y = lerp(progress, 0.65, 0.72, 20, 0)

  const revelationText2Opacity = lerp(progress, 0.72, 0.78, 0, 1)
  const revelationText2Y = lerp(progress, 0.72, 0.78, 20, 0)

  const supportingTextOpacity = lerp(progress, 0.78, 0.88, 0, 1)

  const scrollHintOpacity = lerp(progress, 0.92, 0.98, 0, 0.6)

  // Breathing phase fade out
  const breathingPhaseOpacity = lerp(progress, 0.55, 0.6, 1, 0)

  return (
    <section className="panel">
      {/* Base background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--dark-olive)',
        }}
      />

      {/* Reveal background (deep forest) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--deep-forest)',
          opacity: backgroundOpacity,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Breathing phase */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: breathingPhaseOpacity,
          }}
        >
          <h2
            className="text-heading text-cream mb-xl"
            style={{
              opacity: breathingTitleOpacity,
              transform: `translateY(${breathingTitleY}px)`,
            }}
          >
            You will do anything for your next breath.
          </h2>

          <div style={{ opacity: circleOpacity }}>
            <BreathingCircle
              breathProgress={breathProgress}
              morphProgress={morphProgress}
              notificationProgress={notificationProgress}
            />
          </div>

          <p
            className="text-body-sm text-cream mt-xl"
            style={{ opacity: breathHintOpacity }}
          >
            Breathe with it...
          </p>
        </div>

        {/* Revelation phase */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            opacity: revelationOpacity,
          }}
        >
          {/* Notification dot */}
          <div className="mb-xl">
            <NotificationPulse opacity={notificationPulseOpacity} />
          </div>

          <h2
            className="text-heading text-cream"
            style={{
              opacity: revelationText1Opacity,
              transform: `translateY(${revelationText1Y}px)`,
            }}
          >
            The Cybregore will do anything
          </h2>

          <h2
            className="text-heading text-cream mt-sm"
            style={{
              opacity: revelationText2Opacity,
              transform: `translateY(${revelationText2Y}px)`,
            }}
          >
            for its next byte of data.
          </h2>

          <div
            className="mt-xl"
            style={{ opacity: supportingTextOpacity }}
          >
            <p className="text-body-lg text-cream">
              Data is its oxygen.
            </p>
            <p className="text-body-lg text-cream mt-sm">
              Your attention is its breath.
            </p>
            <p className="text-body-lg text-cream mt-sm">
              Your engagement is its heartbeat.
            </p>
          </div>

          <p
            className="text-body text-cream mt-xl"
            style={{ opacity: scrollHintOpacity }}
          >
            ↓ Is there hope?
          </p>
        </div>
      </div>
    </section>
  )
}
