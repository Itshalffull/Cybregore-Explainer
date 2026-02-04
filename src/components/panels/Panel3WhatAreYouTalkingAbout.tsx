import { lerp } from '../../utils/animation'

interface Panel3WhatAreYouTalkingAboutProps {
  progress: number
}

export default function Panel3WhatAreYouTalkingAbout({ progress }: Panel3WhatAreYouTalkingAboutProps) {
  // Reader's voice - breaking the fourth wall
  // This creates dialogue, makes them feel heard

  const line1Opacity = lerp(progress, 0, 0.25, 0, 1)
  const line2Opacity = lerp(progress, 0.25, 0.5, 0, 1)
  const line3Opacity = lerp(progress, 0.5, 0.75, 0, 1)

  return (
    <section className="panel panel--dark">
      <div className="panel-body" style={{
        maxHeight: '92dvh',
        overflow: 'hidden',
      }}>
        <p
          className="text-heading text-sage text-italic leading-relaxed mb-lg"
          style={{
            opacity: line1Opacity,
          }}
        >
          I know what you're thinking.
        </p>
        <p
          className="text-title text-cream text-italic leading-relaxed mb-lg"
          style={{
            opacity: line2Opacity,
          }}
        >
          "That's crazy. AI has only been around for a few years."
        </p>
        <p
          className="text-subheading text-sage leading-relaxed"
          style={{
            opacity: line3Opacity,
          }}
        >
          But that depends on how you define AI...
        </p>
      </div>
    </section>
  )
}
