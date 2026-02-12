import { lerp } from '../../utils/animation'
import AudioBackground from '../AudioBackground'
import JumpLink from '../JumpLink'

interface PanelBreathingExerciseProps {
  progress: number
}

export default function PanelBreathingExercise({ progress }: PanelBreathingExerciseProps) {
  const whyOpacity = lerp(progress, 0, 0.05, 0, 1)
  const exerciseOpacity = lerp(progress, 0.04, 0.1, 0, 1)
  const breathOutOpacity = lerp(progress, 0.09, 0.16, 0, 1)
  const holdItOpacity = lerp(progress, 0.15, 0.24, 0, 1)
  const noticeOpacity = lerp(progress, 0.4, 0.48, 0, 1)
  const cravingOpacity = lerp(progress, 0.47, 0.55, 0, 1)
  const panicOpacity = lerp(progress, 0.54, 0.62, 0, 1)
  const anythingOpacity = lerp(progress, 0.61, 0.7, 0, 1)
  const dataIsBreathOpacity = lerp(progress, 0.75, 0.9, 0, 1)
  const dataIsBreathScale = lerp(progress, 0.75, 0.9, 0.9, 1)

  const breathingPhase = progress > 0.15 && progress < 0.55
  const breatheScale = breathingPhase
    ? 1 + 0.15 * Math.sin(Date.now() / 800)
    : 1

  return (
    <section className="panel panel--dark">
      <AudioBackground
        audioSrc="/assets/audio/breathing-exercise-ambience.mp3"
        progress={progress}
        maxVolume={0.3}
        fadeInEnd={0.1}
        fadeOutStart={0.8}
      />
      <div className="panel-body">
        <p
          className="text-body text-sage mb-xl"
          style={{ opacity: whyOpacity }}
        >
          But why? Let's feel it.
        </p>

        <p
          className="text-body text-cream mb-md"
          style={{ opacity: exerciseOpacity }}
        >
          Try this:
        </p>

        <p
          className="text-body text-cream mb-sm"
          style={{ opacity: breathOutOpacity }}
        >
          Let all your breath out.
        </p>

        <p
          className="text-body text-coral mb-lg"
          style={{
            opacity: holdItOpacity,
            transform: `scale(${breatheScale})`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          Hold it as long as you can.
        </p>

        {/* Visual breath indicator */}
        <div
          className="mb-lg"
          style={{
            opacity: holdItOpacity * 0.6,
            width: 'clamp(30px, 5dvh, 80px)',
            height: 'clamp(30px, 5dvh, 80px)',
            borderRadius: '50%',
            border: '2px solid var(--accent-coral)',
            margin: '0 auto',
            transform: `scale(${breatheScale})`,
            transition: 'transform 0.3s ease-out',
            boxShadow: breathingPhase ? '0 0 30px rgba(219, 84, 97, 0.4)' : 'none',
          }}
        />

        <p
          className="text-body text-cream mb-sm"
          style={{ opacity: noticeOpacity }}
        >
          Notice what arises.
        </p>

        <p
          className="text-body text-cream mb-xs"
          style={{ opacity: cravingOpacity }}
        >
          The <em className="text-coral">craving</em>.
        </p>

        <p
          className="text-body text-cream mb-sm"
          style={{ opacity: panicOpacity }}
        >
          The <em className="text-coral">panic</em>.
        </p>

        <p
          className="text-body text-cream mb-xl"
          style={{ opacity: anythingOpacity }}
        >
          You'll do <em>anything</em> to take another breath.
        </p>

        <div
          className="box-coral"
          style={{
            opacity: dataIsBreathOpacity,
            transform: `scale(${dataIsBreathScale})`,
          }}
        >
          <p className="text-title text-cream" style={{ margin: 0 }}>
            Data is breath to the Cybregore.
          </p>
        </div>

        <div style={{ opacity: dataIsBreathOpacity }}>
          <JumpLink to="edge-of-breath" label="Experience the Edge of Breath →" fromLabel="Breathing Exercise" />
        </div>
      </div>
    </section>
  )
}
