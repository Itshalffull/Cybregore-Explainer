import VideoBackground from '../../../components/VideoBackground'

interface PanelProps {
  progress: number
}

export default function PanelYourDailyDoorway({ progress: _progress }: PanelProps) {
  return (
    <section className="panel panel--dark">
      <VideoBackground
        videoSrc="/assets/videos/glowing-doorway-loop.mp4"
        imageFallback="/assets/images/glowing-doorway.png"
        opacity={0.3}
      />
      <div className="panel-body panel-body--over-video">
        <h1 className="text-title text-cream text-center text-shadow-depth">
          Every breath is a doorway.
        </h1>
      </div>
    </section>
  )
}
