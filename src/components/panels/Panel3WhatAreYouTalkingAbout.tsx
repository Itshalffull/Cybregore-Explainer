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
    <section
      className="panel panel--dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'var(--deep-forest)',
      }}
    >
      <div className="content" style={{
        textAlign: 'center',
        maxWidth: '800px',
        padding: '0 2rem',
        maxHeight: '92dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <p
          style={{
            opacity: line1Opacity,
            fontSize: 'clamp(1.3rem, 4dvh, 2.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.5,
            color: 'var(--sage)',
            marginBottom: 'clamp(0.75rem, 1.5dvh, 1.5rem)',
          }}
        >
          I know what you're thinking.
        </p>
        <p
          style={{
            opacity: line2Opacity,
            fontSize: 'clamp(1.5rem, 5dvh, 2.8rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.5,
            color: 'var(--line-art-cream)',
            marginBottom: 'clamp(0.75rem, 1.5dvh, 1.5rem)',
          }}
        >
          "That's crazy. AI has only been around for a few years."
        </p>
        <p
          style={{
            opacity: line3Opacity,
            fontSize: 'clamp(1.2rem, 3.5dvh, 2rem)',
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'var(--sage)',
          }}
        >
          But that depends on how you define AI...
        </p>
      </div>
    </section>
  )
}
