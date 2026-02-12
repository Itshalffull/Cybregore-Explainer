import { lerp, lerpMulti } from '../../../utils/animation'

interface Panel20TikTokScrollProps {
  progress: number
}

export default function Panel20TikTokScroll({ progress }: Panel20TikTokScrollProps) {
  // The TikTok scroll experience - visceral, fast, disconnected
  // Phone mockup with scrolling content images

  const introOpacity = lerp(progress, 0, 0.08, 0, 1)
  const phoneOpacity = lerp(progress, 0.05, 0.15, 0, 1)
  const phoneScale = lerp(progress, 0.05, 0.15, 0.9, 1)

  // Content items with images and labels
  const content = [
    { text: 'A tragedy in Gaza', image: '/assets/images/tiktok/tiktok-tragedy.png', color: 'var(--accent-coral)' },
    { text: 'A dance trend', image: '/assets/images/tiktok/tiktok-dance.png', color: 'var(--sage)' },
    { text: 'A war update', image: '/assets/images/tiktok/tiktok-war.png', color: 'var(--accent-coral)' },
    { text: 'A recipe hack', image: '/assets/images/tiktok/tiktok-recipe.png', color: 'var(--sage)' },
    { text: 'Someone crying', image: '/assets/images/tiktok/tiktok-crying.png', color: 'var(--sage)' },
    { text: 'A puppy', image: '/assets/images/tiktok/tiktok-puppy.png', color: 'var(--sage)' },
    { text: 'Political rage', image: '/assets/images/tiktok/tiktok-rage.png', color: 'var(--accent-coral)' },
    { text: 'A workout tip', image: '/assets/images/tiktok/tiktok-workout.png', color: 'var(--sage)' },
    { text: 'A breakdown', image: '/assets/images/tiktok/tiktok-breakdown.png', color: 'var(--sage)' },
    { text: 'A meme', image: '/assets/images/tiktok/tiktok-meme.png', color: 'var(--sage)' },
    { text: 'Climate collapse', image: '/assets/images/tiktok/tiktok-climate.png', color: 'var(--accent-coral)' },
    { text: 'An influencer selling something', image: '/assets/images/tiktok/tiktok-influencer.png', color: 'var(--sage)' },
  ]

  // Each content item appears and scrolls up - slower pace for better reading
  const getContentState = (index: number) => {
    const scrollStart = 0.10
    const scrollEnd = 0.82
    const totalDuration = scrollEnd - scrollStart
    const itemDuration = totalDuration / content.length

    const start = scrollStart + index * itemDuration
    const peak = start + itemDuration * 0.2
    const hold = start + itemDuration * 0.75
    const end = start + itemDuration

    const opacity = lerpMulti(progress, [start, peak, hold, end], [0, 1, 1, 0])
    // Scroll up effect - each item slides up as it fades
    const translateY = lerpMulti(progress, [start, peak, hold, end], [100, 0, 0, -100])

    return { opacity, translateY }
  }

  // Get current content label (the one with highest opacity)
  const getCurrentLabel = () => {
    let maxOpacity = 0
    let currentItem = content[0]
    content.forEach((item, i) => {
      const state = getContentState(i)
      if (state.opacity > maxOpacity) {
        maxOpacity = state.opacity
        currentItem = item
      }
    })
    return { item: currentItem, opacity: maxOpacity }
  }

  const currentLabel = getCurrentLabel()

  // Final realization
  const finalOpacity = lerp(progress, 0.85, 0.95, 0, 1)
  const finalY = lerp(progress, 0.85, 0.95, 20, 0)

  // TikTok UI elements opacity
  const uiOpacity = lerp(progress, 0.15, 0.25, 0, 0.7)

  // Phone dimensions - 9:16 aspect ratio, height based on available viewport
  // Reserve space for: top text (~10dvh), bottom text (~15dvh), padding (~5dvh)
  // Phone gets the remaining ~70dvh, but capped at reasonable max
  const phoneHeight = 'min(48dvh, 500px)'
  const phoneWidth = `calc(${phoneHeight} * 9 / 16)` // Maintain 9:16 aspect

  return (
    <section
      className="panel panel--dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100dvh',
        background: 'var(--deep-forest)',
        overflow: 'hidden',
        padding: 'clamp(0.8rem, 2dvh, 2rem)',
        boxSizing: 'border-box',
      }}
    >
      {/* Top section: intro text + content label */}
      <div style={{
        textAlign: 'center',
        flex: '0 0 auto',
      }}>
        {/* Intro text */}
        <p
          className="text-subheading text-sage"
          style={{
            opacity: introOpacity,
            margin: 0,
          }}
        >
          Think about scrolling TikTok.
        </p>

        {/* Current content label - shows ABOVE the phone */}
        <p
          className="text-heading text-semibold"
          style={{
            opacity: currentLabel.opacity,
            color: currentLabel.item.color,
            margin: 'clamp(0.3rem, 0.8dvh, 1rem) 0 0 0',
            minHeight: 'clamp(1.2rem, 3dvh, 2.5rem)',
          }}
        >
          {currentLabel.item.text}
        </p>
      </div>

      {/* Phone mockup - fills available middle space */}
      <div
        style={{
          opacity: phoneOpacity,
          transform: `scale(${phoneScale})`,
          position: 'relative',
          width: phoneWidth,
          height: phoneHeight,
          maxWidth: '90vw',
          background: 'var(--dark-olive)',
          borderRadius: 'clamp(20px, 4vw, 36px)',
          padding: 'clamp(4px, 0.8vw, 8px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(209, 231, 210, 0.1)',
          flex: '0 0 auto',
        }}
      >
        {/* Phone inner screen */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--deep-forest)',
            borderRadius: 'clamp(16px, 3.2vw, 28px)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Content images - scroll through */}
          {content.map((item, i) => {
            const state = getContentState(i)
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: state.opacity,
                  transform: `translateY(${state.translateY}%)`,
                  transition: 'none',
                }}
              >
                <img
                  src={item.image}
                  alt={item.text}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )
          })}

          {/* TikTok-style UI overlay (right side icons) */}
          <div
            style={{
              position: 'absolute',
              right: 'clamp(6px, 3%, 12px)',
              bottom: 'clamp(50px, 18%, 80px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(8px, 3%, 16px)',
              opacity: uiOpacity,
            }}
          >
            {/* Profile */}
            <div style={{
              width: 'clamp(24px, 12%, 36px)',
              height: 'clamp(24px, 12%, 36px)',
              borderRadius: '50%',
              background: 'var(--sage)',
              border: '2px solid var(--line-art-cream)',
            }} />
            {/* Heart */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                color: 'var(--line-art-cream)',
                fontSize: 'clamp(14px, 6%, 24px)',
                lineHeight: 1,
              }}>
                ♡
              </div>
              <span style={{ fontSize: 'clamp(6px, 3%, 10px)', color: 'var(--sage)' }}>24.5K</span>
            </div>
            {/* Comment */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                color: 'var(--line-art-cream)',
                fontSize: 'clamp(12px, 5%, 20px)',
                lineHeight: 1,
              }}>
                💬
              </div>
              <span style={{ fontSize: 'clamp(6px, 3%, 10px)', color: 'var(--sage)' }}>1,203</span>
            </div>
            {/* Share */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                color: 'var(--line-art-cream)',
                fontSize: 'clamp(12px, 5%, 20px)',
                lineHeight: 1,
              }}>
                ↗
              </div>
              <span style={{ fontSize: 'clamp(6px, 3%, 10px)', color: 'var(--sage)' }}>Share</span>
            </div>
          </div>

          {/* Bottom nav bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 'clamp(28px, 10%, 44px)',
              background: 'rgba(59, 69, 64, 0.95)',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              opacity: uiOpacity,
              borderTop: '1px solid rgba(209, 231, 210, 0.1)',
            }}
          >
            <span style={{ fontSize: 'clamp(6px, 3%, 10px)', color: 'var(--line-art-cream)' }}>Home</span>
            <span style={{ fontSize: 'clamp(6px, 3%, 10px)', color: 'var(--sage)' }}>Discover</span>
            <div style={{
              width: 'clamp(18px, 10%, 32px)',
              height: 'clamp(12px, 6%, 22px)',
              background: 'var(--line-art-cream)',
              borderRadius: 'clamp(3px, 1.5%, 6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(10px, 4%, 16px)',
              color: 'var(--deep-forest)',
            }}>+</div>
            <span style={{ fontSize: 'clamp(6px, 3%, 10px)', color: 'var(--sage)' }}>Inbox</span>
            <span style={{ fontSize: 'clamp(6px, 3%, 10px)', color: 'var(--sage)' }}>Me</span>
          </div>
        </div>

        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(8px, 2%, 16px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(40px, 30%, 80px)',
            height: 'clamp(12px, 4%, 24px)',
            background: 'var(--dark-olive)',
            borderRadius: 'clamp(6px, 2%, 12px)',
          }}
        />
      </div>

      {/* The insight - appears after scrolling */}
      <div
        style={{
          opacity: finalOpacity,
          transform: `translateY(${finalY}px)`,
          textAlign: 'center',
          maxWidth: '700px',
          padding: '0 1rem',
          flex: '0 0 auto',
        }}
      >
        <p
          className="text-subheading text-sage mb-sm leading-normal"
          style={{
            opacity: 1,
          }}
        >
          Each video is a micro-narrative. A tiny world.
        </p>
        <p
          className="text-subheading text-cream leading-normal"
          style={{
            margin: 0,
          }}
        >
          But they come so fast, in such disconnected succession,
          <br />
          <span className="text-sage">
            that your nervous system can't integrate any of it.
          </span>
        </p>
      </div>
    </section>
  )
}
