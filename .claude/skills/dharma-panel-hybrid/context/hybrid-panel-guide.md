# Hybrid Panel Guide: Multi-Type Design & Component Patterns

## What Hybrid Panels Do

Hybrid panels combine two or more panel types within a single scroll section.
They're the most complex panel type because they must manage content from
multiple modes AND a transition between them — but when done well, they create
the explainer's most memorable moments.

In the Cybregore explainer, the Attention Economy panel is a hybrid: economic
data visualization with text overlay. The text asks the question ("Who — or
what — is doing the capturing?") while the data provides the scale.

---

## Part 1: Combination Design

### When to Use Hybrid Panels

**Use hybrids when:**
- The panel needs to shift emotional register mid-scroll (analytical → mythological)
- A claim needs to be both stated (text) and proven (visualization/interactive)
- The panel bridges two acts with different tonal qualities
- A climax moment needs more impact than a single type can deliver
- An interactive element needs narrative setup beyond a simple invitation

**Don't use hybrids when:**
- A single type can do the job (simplicity wins)
- The two modes would compete for attention rather than complement
- The transition would feel forced or arbitrary
- The panel's message is simple enough for one approach

### The Five Hybrid Patterns

#### Pattern 1: Sequential (A → B)
Mode A plays out, then Mode B takes over.

**Best for:** claim → evidence, setup → payoff, buildup → release

**Scroll structure:**
```
0.0 ─── 0.4: Mode A (text, mythology, etc.)
0.4 ─── 0.55: Transition
0.55 ── 1.0: Mode B (visualization, interactive, etc.)
```

#### Pattern 2: Simultaneous (A + B)
Both modes are present throughout, occupying different visual layers.

**Best for:** text over data, mythology with embedded visualization

**Scroll structure:**
```
0.0 ─── 0.2: Background mode establishes
0.2 ─── 0.8: Foreground mode plays over background
0.8 ─── 1.0: Exit
```

#### Pattern 3: Split (A | B)
Screen is divided, each half showing a different mode.

**Best for:** comparison, before/after, "Flip It" reveals, dual perspective

**Scroll structure:**
```
0.0 ─── 0.3: Both halves appear
0.3 ─── 0.7: Both halves animate independently
0.7 ─── 0.85: One half overtakes (the "winner" of the comparison)
0.85 ── 1.0: Exit
```

#### Pattern 4: Transform (A → morphs into → B)
Mode A visually morphs into Mode B.

**Best for:** reveal moments, "Flip It" inversions, paradigm shifts

**Scroll structure:**
```
0.0 ─── 0.35: Mode A established
0.35 ── 0.65: Morph animation
0.65 ── 0.85: Mode B established
0.85 ── 1.0: Exit
```

#### Pattern 5: Interrupt (A → ! → B)
Mode A is interrupted by Mode B, creating surprise or dissonance.

**Best for:** attention trap reveals, "Flip It" shocks, escalation peaks

**Scroll structure:**
```
0.0 ─── 0.5: Mode A plays normally
0.5: Abrupt interruption
0.5 ─── 0.85: Mode B dominates
0.85 ── 1.0: Exit
```

### Content Design Rules for Hybrids

**Mode hierarchy:** One mode is primary (carries the message), the other
supports. Never let both modes compete equally — one leads.

**Transition = meaning:** The transition itself should carry narrative weight.
A dissolve says "these are connected." A push says "this replaces that."
An interrupt says "you were wrong."

**Content budget:** Each mode gets LESS content than a standalone panel of
that type would. If a standalone text panel has 3 headline lines + body copy,
the text portion of a hybrid gets 1-2 headlines, max.

**scrollLength is longer:** Hybrids need 3.5-5 scrollLength to give both
modes room. Don't compress two types into the same time as one type.

---

## Part 2: Component Patterns

### Sequential Hybrid (Text → Visualization)

```tsx
import { lerp } from '../../utils/animation'
import { AutoScaleContent } from '../../components/AutoScaleContent'

interface PanelProps {
  progress: number
}

export default function TextToVizHybrid({ progress }: PanelProps) {
  // Mode A: Text
  const textIn = lerp(progress, 0.08, 0.2, 0, 1)
  const textY = lerp(progress, 0.08, 0.2, 20, 0)
  const textOut = lerp(progress, 0.38, 0.52, 0, 1)

  // Mode B: Visualization
  const vizIn = lerp(progress, 0.42, 0.55, 0, 1)
  const vizBuild = lerp(progress, 0.5, 0.78, 0, 1)
  const pivotIn = lerp(progress, 0.75, 0.85, 0, 1)

  return (
    <section className="panel panel--dark">
      <AutoScaleContent maxWidth="800px">
        {/* Mode A: Text claim */}
        <div style={{
          opacity: textIn * (1 - textOut),
          transform: `translateY(${textY}px)`,
        }}>
          <p className="text-title text-cream text-center leading-tight mb-lg">
            Bold claim text
          </p>
          <p className="text-body text-sage text-center">
            Supporting line that sets up the evidence.
          </p>
        </div>

        {/* Mode B: Visualization */}
        <div style={{ opacity: vizIn }}>
          <svg viewBox="0 0 800 400" style={{ width: '100%', maxWidth: '800px' }}>
            {/* Grid */}
            <line x1={60} y1={350} x2={750} y2={350}
                  stroke="var(--dark-olive)" strokeWidth={0.5}
                  strokeDasharray="4" opacity={0.5} />
            {/* Chart elements animated by vizBuild */}
          </svg>

          <div className="box-coral mt-xl" style={{ opacity: pivotIn }}>
            <p className="text-title text-cream text-center" style={{ margin: 0 }}>
              Pivot line
            </p>
          </div>
        </div>
      </AutoScaleContent>
    </section>
  )
}
```

### Simultaneous Hybrid (Text over Visualization)

```tsx
import { lerp } from '../../utils/animation'

export default function SimultaneousHybrid({ progress }: PanelProps) {
  const bgBuild = lerp(progress, 0.05, 0.4, 0, 1)
  const textIn = lerp(progress, 0.25, 0.4, 0, 1)
  const textY = lerp(progress, 0.25, 0.4, 20, 0)
  const emphasisIn = lerp(progress, 0.6, 0.75, 0, 1)

  return (
    <section className="panel panel--dark" style={{ position: 'relative' }}>
      {/* Background: Visualization (dimmed) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.35,
      }}>
        <svg viewBox="0 0 800 600" style={{ width: '100%', maxWidth: '100%' }}>
          {/* Large background chart animated by bgBuild */}
        </svg>
      </div>

      {/* Foreground: Text */}
      <div className="panel-body panel-body--over-video">
        <p className="text-title text-cream text-center text-shadow-depth leading-tight mb-xl"
           style={{ opacity: textIn, transform: `translateY(${textY}px)` }}>
          Text over the visualization
        </p>

        {/* Key data callout synced to chart highlight */}
        <p className="text-body text-sage text-center text-shadow-depth"
           style={{ opacity: emphasisIn }}>
          Key data insight
        </p>
      </div>
    </section>
  )
}
```

### Split Hybrid (Side by Side)

```tsx
import { lerp } from '../../utils/animation'

export default function SplitHybrid({ progress }: PanelProps) {
  const splitIn = lerp(progress, 0.08, 0.25, 0, 1)
  const leftContent = lerp(progress, 0.2, 0.5, 0, 1)
  const rightContent = lerp(progress, 0.3, 0.6, 0, 1)
  const rightTakeover = lerp(progress, 0.65, 0.8, 0, 1)

  // Right side grows from 50% to 100% width during takeover
  const rightWidth = 50 + rightTakeover * 50

  return (
    <section className="panel panel--dark" style={{
      display: 'flex',
      overflow: 'hidden',
    }}>
      {/* Left: What you see */}
      <div style={{
        width: `${100 - rightWidth}%`,
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--gap-xl)',
        opacity: splitIn * (1 - rightTakeover),
      }}>
        <p className="text-label text-sage mb-md">What you see</p>
        <p className="text-body text-cream text-center"
           style={{ opacity: leftContent }}>
          {/* Left content */}
        </p>
      </div>

      {/* Divider */}
      <div style={{
        width: '1px',
        background: 'var(--sage)',
        opacity: 0.3 * splitIn * (1 - rightTakeover),
      }} />

      {/* Right: What sees you */}
      <div style={{
        width: `${rightWidth}%`,
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--gap-xl)',
        opacity: splitIn,
        background: 'var(--dark-forest)',
      }}>
        <p className="text-label text-coral mb-md">What sees you</p>
        <p className="text-body text-cream text-center"
           style={{ opacity: rightContent }}>
          {/* Right content */}
        </p>
      </div>
    </section>
  )
}
```

### Mythology + Interactive Hybrid

```tsx
import { useState, useEffect, useRef } from 'react'
import { lerp } from '../../utils/animation'
import { VideoBackground } from '../../components/VideoBackground'

export default function MythInteractiveHybrid({ progress }: PanelProps) {
  const [breathPhase, setBreathPhase] = useState<'in' | 'out'>('in')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Mode A: Mythology layers
  const bgOpacity = lerp(progress, 0, 0.10, 0, 0.35)
  const layer1 = lerp(progress, 0.08, 0.20, 0, 1)
  const layer1Y = lerp(progress, 0.08, 0.20, 15, 0)
  const layer2 = lerp(progress, 0.22, 0.35, 0, 1)

  // Transition
  const isActive = progress > 0.4 && progress < 0.75

  // Mode B: Interactive breathing
  const breathIn = lerp(progress, 0.38, 0.48, 0, 1)
  const revelationIn = lerp(progress, 0.78, 0.90, 0, 1)

  useEffect(() => {
    if (isActive && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setBreathPhase(prev => prev === 'in' ? 'out' : 'in')
      }, 4000)
    }
    if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isActive])

  const circleScale = breathPhase === 'in' ? 1.3 : 0.8

  return (
    <section className="panel panel--dark" style={{ position: 'relative' }}>
      <VideoBackground
        videoSrc="/assets/videos/mythology-bg-loop.mp4"
        imageFallback="/assets/images/mythology-bg.png"
        opacity={bgOpacity}
      />

      <div className="panel-body panel-body--over-video">
        {/* Mode A: Mythology text */}
        <p className="text-body text-sage text-italic text-center text-shadow-depth mb-xl"
           style={{ opacity: layer1, transform: `translateY(${layer1Y}px)` }}>
          Ancient mythological context...
        </p>
        <p className="text-body text-cream text-center text-shadow-depth mb-xl"
           style={{ opacity: layer2 }}>
          The bridge statement connecting ancient to modern.
        </p>

        {/* Mode B: Breathing circle */}
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
            opacity: breathIn,
          }}>
            <span className="text-body text-sage">
              {breathPhase === 'in' ? 'Breathe in...' : 'Breathe out...'}
            </span>
          </div>
        )}

        {/* Revelation */}
        <div className="box-coral mt-2xl" style={{ opacity: revelationIn }}>
          <p className="text-title text-cream text-center text-shadow-depth"
             style={{ margin: 0 }}>
            Revelation statement combining both modes.
          </p>
        </div>
      </div>
    </section>
  )
}
```

### scrollLength Guidelines for Hybrid Panels

| Combination | scrollLength | Reasoning |
|------------|-------------|-----------|
| text → visualization | 3.5-4 | Need time for claim + chart + pivot |
| text + visualization (simultaneous) | 3.5 | Less transition overhead |
| mythology → text | 4 | Mythology needs immersion time |
| text → interactive | 4.5-5 | Interactive portion needs engagement time |
| split comparison | 4 | Both sides need time to build and compare |
| transform/morph | 4 | The morph itself takes scroll distance |
| mythology + interactive | 5 | Both types need generous time |
