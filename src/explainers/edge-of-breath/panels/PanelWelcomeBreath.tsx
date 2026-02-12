import { lerp } from '../../../utils/animation'
import VideoBackground from '../../../components/VideoBackground'

interface PanelProps {
  progress: number
}

export default function PanelWelcomeBreath({ progress }: PanelProps) {
  // Background fades in gently at the start
  const bgOpacity = lerp(progress, 0, 0.15, 0, 0.35)

  // Title fades in and rises
  const titleOpacity = lerp(progress, 0.05, 0.25, 0, 1)
  const titleY = lerp(progress, 0.05, 0.25, 20, 0)

  return (
    <section
      className="panel panel--dark"
      style={{ position: 'relative' }}
    >
      <VideoBackground
        videoSrc="/assets/videos/lungs-breathing-loop.mp4"
        imageFallback="/assets/images/lungs-breathing.png"
        opacity={bgOpacity}
      />
      <div className="panel-body panel-body--over-video">
        <h1
          className="text-title text-cream text-center text-shadow-depth"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Pause. Take a Deep Breath In.
        </h1>
      </div>
    </section>
  )
}
