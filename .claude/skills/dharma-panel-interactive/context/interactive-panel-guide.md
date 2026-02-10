# Interactive Panel Guide: Interaction Design & Component Patterns

## What Interactive Panels Do

Interactive panels break the fourth wall. The viewer stops passively receiving
and DOES something. The interaction itself becomes the argument — it proves the
panel's message through experience rather than explanation.

The Breath panel in the Cybregore explainer is the archetype: the viewer stops
scrolling and actually breathes. The message — "the Cybregore cannot follow you
into this moment" — is proven by doing it.

---

## Part 1: Interaction Design

### The Golden Rule

**The interaction must PROVE the message, not just illustrate it.**

- Illustrating: "Breathing helps you escape" + picture of lungs
- Proving: "Stop scrolling. Breathe." + actual breathing exercise

### Interaction Types

| Type | Best For | Proves |
|------|----------|--------|
| **Breathing exercise** | Embodiment, resolution | Awareness can be reclaimed |
| **Simulated feed** | Evidence, anatomy | You don't notice being tracked |
| **Choice/confession** | Reveal, escalation | Your behavior is evidence |
| **Attention trap** | Hook, escalation | Capture is invisible |
| **Pause/stillness** | Embodiment, transition | You're addicted to stimulation |
| **Text input** | Reveal, "Flip It" | Your thoughts aren't your own |

### Experience Arc

Every interactive panel has a mini-narrative:

1. **INVITATION** — Clear, low-friction entry. "Stop scrolling. Breathe."
2. **ENGAGEMENT** — The core loop. 10-30 seconds of interaction.
3. **REVELATION** — The "aha" moment. The interaction PROVES the message.
4. **RELEASE** — Clean exit, moment of stillness before next panel.

### Copy States

Interactive panels have multiple text states:

- **Invitation:** 1-2 lines, commands not suggestions. `text-body text-cream text-bold`
- **During:** Minimal, rhythmic. `text-body text-sage`
- **Revelation:** The payoff. Bold, personal. `text-title text-cream` or in `box-coral`
- **Fallback:** What non-interactive viewers see (scroll-only). Must deliver same message.

---

## Part 2: Component Patterns

### Breathing Exercise

```tsx
import { useState, useEffect, useRef } from 'react'
import { lerp } from '../../utils/animation'

interface PanelProps {
  progress: number
}

export default function BreathingPanel({ progress }: PanelProps) {
  const [breathPhase, setBreathPhase] = useState<'in' | 'out'>('in')
  const [cycleCount, setCycleCount] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const instructionOpacity = lerp(progress, 0.05, 0.15, 0, 1)
  const isActive = progress > 0.2 && progress < 0.75
  const revelationOpacity = lerp(progress, 0.78, 0.90, 0, 1)

  useEffect(() => {
    if (isActive && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setBreathPhase(prev => {
          if (prev === 'in') return 'out'
          setCycleCount(c => c + 1)
          return 'in'
        })
      }, 4000)
    }
    if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive])

  // Ambient breathing pulse
  const pulse = isActive ? Math.sin(Date.now() / 800) : 0
  const circleScale = breathPhase === 'in' ? 1.3 : 0.8

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        {/* Instruction */}
        <p className="text-body text-cream text-bold text-center mb-2xl"
           style={{ opacity: instructionOpacity }}>
          Stop scrolling. <span className="text-coral">Breathe.</span>
        </p>

        {/* Breathing circle */}
        {isActive && (
          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '2px solid var(--sage)',
            transform: `scale(${circleScale})`,
            transition: 'transform 4s ease-in-out',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
            boxShadow: `0 0 ${20 + pulse * 10}px rgba(209, 231, 210, 0.3)`,
          }}>
            <span className="text-body text-sage">
              {breathPhase === 'in' ? 'Breathe in...' : 'Breathe out...'}
            </span>
          </div>
        )}

        {/* Revelation after 3+ cycles */}
        <div style={{ opacity: cycleCount >= 3 ? 1 : revelationOpacity }}>
          <div className="box-coral mt-2xl">
            <p className="text-title text-cream text-center" style={{ margin: 0 }}>
              The Cybregore cannot follow you into this moment of pure awareness.
            </p>
          </div>
          <p className="text-body text-sage text-center mt-lg">
            This is the gap. This is where freedom lives.
          </p>
        </div>
      </div>
    </section>
  )
}
```

### Simulated Feed (TikTok Scroll Pattern)

Based on the actual `Panel20TikTokScroll` in the codebase:

```tsx
import { lerp, lerpMulti } from '../../utils/animation'

export default function SimulatedFeedPanel({ progress }: PanelProps) {
  // Each content item has a fade-in-hold-fade-out cycle
  const items = [
    { label: 'Viral video', text: 'You won\'t believe...' },
    { label: 'Targeted ad', text: 'Based on your browsing...' },
    { label: 'Rage bait', text: 'Scientists are SHOCKED...' },
  ]

  return (
    <section className="panel panel--dark">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100dvh',
        justifyContent: 'center',
        padding: 'var(--gap-xl)',
      }}>
        {/* Phone mockup (9:16 aspect ratio) */}
        <div style={{
          width: 'min(280px, 70vw)',
          aspectRatio: '9 / 16',
          borderRadius: '24px',
          border: '2px solid var(--dark-olive)',
          overflow: 'hidden',
          background: '#0a0a0a',
          position: 'relative',
        }}>
          {/* Current content label */}
          <p className="text-label text-sage" style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 2,
          }}>
            {items[Math.min(Math.floor(progress * items.length), items.length - 1)]?.label}
          </p>

          {/* Feed items cycle based on progress */}
          {items.map((item, i) => {
            const itemStart = i / items.length
            const itemEnd = (i + 1) / items.length
            const itemOpacity = lerpMulti(progress,
              [itemStart, itemStart + 0.05, itemEnd - 0.05, itemEnd],
              [0, 1, 1, 0]
            )
            return (
              <div key={i} style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                opacity: itemOpacity,
              }}>
                <p className="text-small text-cream text-center">{item.text}</p>
              </div>
            )
          })}
        </div>

        {/* Concluding insight */}
        <p className="text-body text-sage text-center mt-xl"
           style={{ opacity: lerp(progress, 0.85, 0.95, 0, 1), maxWidth: '500px' }}>
          Every swipe fed the machine. It watched how long you paused.
        </p>
      </div>
    </section>
  )
}
```

### Choice / Confession Panel

```tsx
import { useState } from 'react'
import { lerp } from '../../utils/animation'

export default function ChoicePanel({ progress }: PanelProps) {
  const [selections, setSelections] = useState<string[]>([])
  const promptOpacity = lerp(progress, 0.05, 0.15, 0, 1)

  const options = [
    'I check my phone within 5 minutes of waking',
    'I scroll past content I know is bad for me',
    'I\'ve lost hours without noticing',
    'I feel anxious when my phone is in another room',
  ]

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <h3 className="text-body text-cream text-bold text-center mb-xl"
            style={{ opacity: promptOpacity }}>
          Which of these describe you?
        </h3>

        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => setSelections(prev =>
              prev.includes(option) ? prev.filter(s => s !== option) : [...prev, option]
            )}
            className={selections.includes(option) ? 'box-coral' : 'box-dark'}
            style={{
              display: 'block',
              width: '100%',
              padding: 'var(--gap-md)',
              marginBottom: 'var(--gap-sm)',
              cursor: 'pointer',
              border: 'none',
              textAlign: 'left',
              opacity: lerp(progress, 0.1 + i * 0.05, 0.2 + i * 0.05, 0, 1),
            }}
          >
            <p className={`text-small ${selections.includes(option) ? 'text-cream' : 'text-sage'}`}
               style={{ margin: 0 }}>
              {option}
            </p>
          </button>
        ))}

        {selections.length >= 2 && (
          <div className="box-coral mt-xl">
            <p className="text-title text-cream text-center" style={{ margin: 0 }}>
              Every one of these is evidence of something feeding on your attention.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
```

### Scroll-Only Fallback Pattern

Every interactive panel MUST work for scroll-only viewers:

```tsx
export default function InteractiveWithFallback({ progress }: PanelProps) {
  const [hasInteracted, setHasInteracted] = useState(false)

  const invitationIn = lerp(progress, 0.1, 0.2, 0, 1)
  const fallbackIn = lerp(progress, 0.35, 0.50, 0, 1)
  const revelationIn = lerp(progress, 0.70, 0.85, 0, 1)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        {/* Invitation always shows */}
        <p className="text-body text-cream text-bold text-center"
           style={{ opacity: invitationIn }}>
          Stop scrolling. <span className="text-coral">Breathe.</span>
        </p>

        {hasInteracted ? (
          <BreathingCircle onComplete={() => {}} />
        ) : (
          /* Scroll-driven fallback */
          <div style={{ opacity: fallbackIn }}>
            <p className="text-body text-sage text-center mt-xl">
              Notice you are a body reading a screen.
            </p>
          </div>
        )}

        {/* Revelation shows either way */}
        <div className="box-coral mt-2xl" style={{ opacity: revelationIn }}>
          <p className="text-title text-cream text-center" style={{ margin: 0 }}>
            This is the gap. This is where freedom lives.
          </p>
        </div>
      </div>
    </section>
  )
}
```

### Accessibility

```tsx
// Reduced motion detection
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ARIA for interactive elements
<div
  role="region"
  aria-label="Breathing exercise"
  tabIndex={0}
>

// Keyboard support
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') handleInteraction()
  }}
  aria-pressed={isActive}
>
```

### scrollLength Guidelines

| Interaction | scrollLength |
|------------|-------------|
| Quick choice (2-4 options) | 4 |
| Simulated feed (TikTok scroll) | 3.5 |
| Breathing exercise (3-4 cycles) | 5 |
| Attention trap | 3.5 |
| Pause/stillness | 5 |
