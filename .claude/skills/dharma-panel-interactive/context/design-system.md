# Cybregore-Explainer Design System Reference

## Tech Stack

- React 18 + TypeScript (functional components only)
- Vite 5
- GSAP ScrollTrigger (pins sections during scroll)
- CSS Custom Properties for design tokens
- Inline styles for scroll-driven animation
- Design system CSS classes for typography/layout/color

---

## The Scroll Engine: ScrollSection

File: `src/components/ScrollSection.tsx`

Every panel is wrapped in `<ScrollSection>` which pins content in the viewport
and provides a `progress` value (0.0 → 1.0) via render props:

```tsx
<ScrollSection scrollLength={3.5}>
  {(progress) => <YourPanel progress={progress} />}
</ScrollSection>
```

**scrollLength values:**
| scrollLength | Feel | Use For |
|-------------|------|---------|
| 2 | Quick hit | Hooks, simple transitions |
| 3 | Standard | Definitions, single-concept reveals |
| 3.5 | Moderate | Trilogy panels, CTA |
| 4 | Data-heavy | Charts, sequential lists, anatomy |
| 4.5 | Complex | Bar charts with many items, detailed evidence |
| 5 | Deep immersion | Breathing exercises, interactive panels |

---

## Animation Utilities

File: `src/utils/animation.ts`

**CRITICAL: Use these — not custom helpers.**

### `lerp(progress, start, end, outputStart, outputEnd)`
Maps a progress range to an output range with clamping.
```tsx
import { lerp } from '../../utils/animation'

const opacity = lerp(progress, 0, 0.12, 0, 1)       // Fade in 0%→12%
const translateY = lerp(progress, 0, 0.12, 20, 0)    // Slide up 20px→0px
const scale = lerp(progress, 0.15, 0.35, 0.9, 1)     // Scale 0.9→1.0
```

### `lerpMulti(progress, inputs[], outputs[])`
Multi-point interpolation for complex sequences.
```tsx
import { lerpMulti } from '../../utils/animation'

// Fade in, hold, fade out
const opacity = lerpMulti(progress, [0.1, 0.2, 0.7, 0.8], [0, 1, 1, 0])

// Slide up from 100%→0%, hold, slide out to -100%
const translateY = lerpMulti(progress, [start, peak, hold, end], [100, 0, 0, -100])
```

### Animation Timing Conventions
```tsx
// Standard fade-in: 8-15% of progress
const quick = lerp(progress, 0.0, 0.08, 0, 1)     // Quick (8%)
const standard = lerp(progress, 0.0, 0.12, 0, 1)  // Standard (12%)
const slow = lerp(progress, 0.0, 0.15, 0, 1)       // Slow (15%)

// Sequential reveal spacing: each element ~8-12% after previous
const line1 = lerp(progress, 0.0, 0.12, 0, 1)
const line2 = lerp(progress, 0.10, 0.22, 0, 1)   // Slight overlap
const line3 = lerp(progress, 0.22, 0.34, 0, 1)
const line4 = lerp(progress, 0.34, 0.46, 0, 1)

// Conclusion in last 20-30%
const conclusion = lerp(progress, 0.65, 0.80, 0, 1)
const kicker = lerp(progress, 0.85, 0.95, 0, 1)

// Transform values: keep subtle
// translateY: 15-30px → 0px (never > 30px)
// scale: 0.8-0.95 → 1.0
```

---

## Color Palette (7 Colors)

| Token | Hex | CSS Class | Usage |
|-------|-----|-----------|-------|
| `--color-deep-forest` | `#3B4540` | — | Primary dark background |
| `--color-dark-forest` | `#4A644E` | — | Secondary dark background |
| `--color-dark-olive` | `#474924` | `text-olive` | Accent dark, borders, numbering |
| `--color-pale-mint` | `#DFEEE2` | — | Light backgrounds (rare) |
| `--color-sage` | `#D1E7D2` | `text-sage` | Secondary text, softer truths, transitions |
| `--color-coral` | `#E07850` | `text-coral` | Alarm/emphasis, key reveals, the entity's voice |
| `--color-cream` | `#F5F2E8` | `text-cream` | Primary text on dark backgrounds |

### Color Usage Rules
- **Cream** (`text-cream`): Primary narrative text, headings, the main voice
- **Sage** (`text-sage`): Supporting text, softer truths, transitions, "the quieter voice"
- **Coral** (`text-coral`): Alarm, emphasis, the MOST important words, the entity's voice.
  Used for: key reveals ("MORE DATA"), entity actions ("reads", "writes", "controls"),
  emotional peaks ("craving", "panic"), warnings
- **Dark olive** (`text-olive`): Numbering, labels, very subdued elements
- **Dark** (`text-dark`): Source citations, muted info (nearly invisible intentionally)

### Color Alternation Pattern
```
First line: text-cream (primary voice)
Middle lines: text-sage (supporting, softer)
Concluding line: text-cream (back to primary) or text-coral (alarm)
```

---

## Typography (5 Levels ONLY)

**Heading font:** `'Cinzel', serif` with `text-transform: uppercase` and `letter-spacing: 0.05em`.
Applied via `.heading` class. Used RARELY.

**Body font:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-display` | `clamp(2.2rem, min(8dvh, 12vw), 5rem)` | 1.0 | Supreme dramatic peaks ONLY. Max 3 per explainer. |
| `text-title` | `clamp(1.4rem, min(4.5dvh, 8vw), 3rem)` | 1.2 | Major reveals, concluding statements within a panel |
| `text-body` | `clamp(0.95rem, min(2.5dvh, 4.5vw), 1.4rem)` | 1.5 | The workhorse. ALL narrative text. |
| `text-small` | `clamp(0.8rem, min(1.8dvh, 3.5vw), 1.05rem)` | 1.45 | Secondary info in grids/boxes |
| `text-label` | `clamp(0.6rem, min(1.3dvh, 2.8vw), 0.85rem)` | 1.3 | Metadata, sources, annotations. Auto uppercase. |

**CRITICAL: Never invent extra size levels. Emphasis comes from weight, color, and style.**

### Text Emphasis Modifiers
| Modifier | CSS | Usage |
|----------|-----|-------|
| `text-normal` | weight 400 | Default body |
| `text-medium` | weight 500 | Slight emphasis |
| `text-semibold` | weight 600 | Strong emphasis |
| `text-bold` | weight 700 | Section titles within body size |
| `text-heavy` | weight 900 | Extreme emphasis (rare) |
| `text-italic` | italic | Definitions, emphasis in prose |
| `text-uppercase` | uppercase + 0.12em spacing | Labels, categories |
| `text-mono` | monospace | Technical/alien feel |
| `text-center` | center | Most panel text |
| `text-left` | left | Definition boxes, long prose |

### Letter Spacing
- `tracking-tight` (-0.02em) — tight headlines
- `tracking-normal` (0) — default
- `tracking-wide` (0.1em) — labels
- `tracking-wider` (0.15em) — extreme spacing

### Text Effects
- `text-glow-coral` — `text-shadow: 0 0 30px rgba(224, 120, 80, 0.5)` for dramatic glow
- `text-shadow-depth` — `text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5)` for text over video

### Line Height Modifiers
- `leading-tight` (1.1) — Display text, dramatic headings
- `leading-snug` (1.25) — Compact statements
- `leading-normal` (1.5) — Standard body text
- `leading-relaxed` (1.6) — Narrative prose, longer paragraphs

### Critical Typography Patterns

**Panel "heading"** uses `text-body` NOT `text-title`:
```tsx
<h2 className="text-body text-cream text-bold mb-lg">
  It <span className="text-coral">reads</span> you
</h2>
```

**`text-title`** is reserved for concluding/climactic statements within a panel.

**`text-display`** is reserved for maximum 3 uses per entire explainer (e.g.,
"CYBREGORE", "MORE DATA", "Hungry Ghosts").

**Inline emphasis** — use `<em>` or `<span>` with color class:
```tsx
<p className="text-body text-cream">
  The <em className="text-coral">craving</em>.
</p>
<p className="text-body text-sage">
  It manipulates because it <em className="text-cream">correlates</em>.
</p>
```

---

## Spacing (Viewport-Responsive)

| Class | Size |
|-------|------|
| `mb-2xl` / `mt-2xl` / `gap-2xl` | `clamp(1.5rem, 3dvh, 3rem)` |
| `mb-xl` / `mt-xl` / `gap-xl` | `clamp(1rem, 2dvh, 2rem)` |
| `mb-lg` / `mt-lg` / `gap-lg` | `clamp(0.6rem, 1.5dvh, 1.25rem)` |
| `mb-md` / `mt-md` / `gap-md` | `clamp(0.4rem, 1dvh, 0.85rem)` |
| `mb-sm` / `mt-sm` / `gap-sm` | `clamp(0.25rem, 0.6dvh, 0.5rem)` |
| `mb-xs` / `mt-xs` / `gap-xs` | `clamp(0.15rem, 0.35dvh, 0.3rem)` |

---

## Panel Component Anatomy

Every panel follows this exact structure:

```tsx
import { lerp } from '../../utils/animation'

interface PanelProps {
  progress: number  // 0.0 to 1.0
}

export default function PanelName({ progress }: PanelProps) {
  // 1. Calculate all animation values from progress
  const opacity = lerp(progress, 0, 0.12, 0, 1)
  const translateY = lerp(progress, 0, 0.12, 20, 0)

  // 2. Return JSX with inline styles driven by those values
  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p className="text-body text-cream"
           style={{ opacity, transform: `translateY(${translateY}px)` }}>
          Content here
        </p>
      </div>
    </section>
  )
}
```

### Rules
- Outermost element: `<section className="panel panel--{theme}">`
- Content wrapper: `<div className="panel-body">` or `<AutoScaleContent>`
- All scroll-driven animation via inline `style={{ }}` — never CSS animations
- Only CSS keyframes for ambient/looping effects (breathing pulse, glitch)
- Import `lerp` (and `lerpMulti` if needed) from `../../utils/animation`

### Panel Themes
| Class | Background | Text |
|-------|-----------|------|
| `panel--dark` | deep-forest `#3B4540` | cream `#F5F2E8` |
| `panel--light` | pale-mint `#DFEEE2` | body-color `#405449` |
| `panel--dark-olive` | dark-olive `#474924` | cream |
| `panel--sage` | sage `#D1E7D2` | body-color |

In practice, nearly every panel uses `panel--dark`.

---

## Content Wrappers

### panel-body
```html
<div className="panel-body">
```
- `max-width: 700px`, `width: 90%`, centered, flexbox column
- Variant: `panel-body--wide` → `max-width: 900px` (for visualizations)
- Variant: `panel-body--over-video` → adds `position: relative; z-index: 1`

### AutoScaleContent
```tsx
import { AutoScaleContent } from '../../components/AutoScaleContent'
<AutoScaleContent maxWidth="650px">
```
- Default maxWidth: 650px, adjust per panel
- Auto-detected by PanelAutoScaler for responsive scaling

### PanelAutoScaler
Rendered once in the explainer root. Uses ResizeObserver to scale down any
`panel-body` or `panel-content-wrapper` that overflows the viewport.
Uses 88% of viewport height. Minimum scale: 0.45.

---

## Box / Card Components

| Class | Purpose | Visual |
|-------|---------|--------|
| `box-coral` | Key revelations, warnings, climactic statements | Coral border, coral-tinted bg |
| `box-dark` | Evidence, examples, supporting details | Dark overlay, sage border |
| `box-dark--coral` | Dark box variant with coral emphasis | Dark bg, coral border |
| `box-subtle` | Low-contrast background grouping | Barely visible sage-tinted bg |
| `box-definition` | Left-border accent for definitions | 3px left border (dark olive) |
| `box-grid` | 2-up side-by-side layout | CSS grid, auto-fit |

### Usage Examples
```tsx
// Climactic statement
<div className="box-coral">
  <p className="text-title text-cream" style={{ margin: 0 }}>
    Data is breath to the Cybregore.
  </p>
</div>

// Paired concept grid
<div className="box-grid mb-md">
  <div className="box-dark">
    <p className="text-label text-sage mb-xs">Individual</p>
    <p className="text-small text-cream leading-snug">...</p>
  </div>
  <div className="box-dark box-dark--coral">
    <p className="text-label text-coral mb-xs">Society</p>
    <p className="text-small text-cream leading-snug">...</p>
  </div>
</div>

// Definition with left border
<div className="box-definition text-left mb-xl">
  <p className="text-body text-cream leading-relaxed" style={{ margin: 0 }}>
    Beings with <em>huge empty bellies</em> and <em>tiny throats</em>.
  </p>
</div>
```

---

## VideoBackground Component

File: `src/components/VideoBackground.tsx`

```tsx
import { VideoBackground } from '../../components/VideoBackground'

<VideoBackground
  videoSrc="/assets/videos/my-panel-loop.mp4"
  imageFallback="/assets/images/my-panel.png"
  opacity={0.35}  // Static or animated via lerp
/>
```

- Takes `videoSrc` (MP4), `imageFallback` (PNG), `opacity` (number)
- Auto-generates responsive paths: `foo.png → foo-{480,768,1280}w.webp`
- Shows image placeholder while video loads, crossfades to video
- Positioned absolutely, covers entire panel, z-index: 0

### Video Opacity Conventions
- Static `0.35` — standard atmospheric background
- Animated `lerp(progress, 0, 0.1, 0, 0.5)` — fades in with panel
- Always use `text-shadow-depth` class on text over video

### Video Panel Pattern
```tsx
export default function VideoPanel({ progress }: PanelProps) {
  const bgOpacity = lerp(progress, 0, 0.15, 0, 0.5)

  return (
    <section className="panel panel--dark" style={{ position: 'relative' }}>
      <VideoBackground
        videoSrc="/assets/videos/my-panel-loop.mp4"
        imageFallback="/assets/images/my-panel.png"
        opacity={bgOpacity}
      />
      <div className="panel-body panel-body--over-video">
        {/* content */}
      </div>
    </section>
  )
}
```

---

## Special Effects

### Glitch Effect (for reveal/dramatic panels)
```tsx
const offset = Math.sin(progress * 50) * 2
style={{
  transform: `translateX(${offset}px)`,
  textShadow: `${-offset}px 0 var(--accent-coral), ${offset}px 0 var(--sage)`,
}}
```
Combine with `text-mono` class for technical/alien feel.

### Breathing Circle (for interactive panels)
```tsx
const pulse = Math.sin(Date.now() / 800)
// Use for ambient pulsing during hold phases
// Combine with box-shadow glow during active phase
```

---

## Explainer Root Structure

```tsx
export default function MyExplainer() {
  return (
    <div className="app" style={{ overflowX: 'hidden', backgroundColor: 'var(--deep-forest)' }}>
      <PanelAutoScaler />
      <ScrollIndicator />
      <ContinueScrollIndicator delay={3000} messages={['Keep going', 'There\'s more', '↓']} />

      <IntroSection>
        <ScrollSection scrollLength={2}>
          {(progress) => <FirstPanel progress={progress} />}
        </ScrollSection>
      </IntroSection>

      <ScrollSection scrollLength={4}>
        {(progress) => <NextPanel progress={progress} />}
      </ScrollSection>
      {/* ... more panels ... */}
    </div>
  )
}
```

### IntroSection
The first panel gets special treatment: `<IntroSection>` provides a fixed
video/image background that stays in place while intro content scrolls over it.
The first panel uses `background: transparent` so the IntroSection bg shows through.

### JumpLink / InlineJumpLink
Cross-explainer navigation. Auto-hides if target is a stub.
```tsx
<JumpLink to="example-egregore" label="Deep Dive: What is an Egregore? →" fromLabel="Panel name" />
<InlineJumpLink to="example-egregore">egregore</InlineJumpLink>
```

---

## SVG Conventions (for Visualization Panels)

- Use design system color vars: `fill="var(--accent-coral)"`, `stroke="var(--sage)"`
- Line art: `stroke="var(--color-cream)"`, `strokeWidth="2"`, `fill="none"`, `strokeLinecap="round"`
- Grid lines: `stroke="var(--dark-olive)"`, `strokeWidth="0.5"`, `strokeDasharray="4"`, `opacity="0.5"`
- Animated line drawing: `strokeDasharray` + `strokeDashoffset` driven by progress
- Always use `viewBox` for responsive sizing (never fixed width/height)

---

## Responsive Media Pipeline

Script: `scripts/generate-responsive-media.mjs`
- Images: Source PNG → WebP at 480w, 768w, 1280w @ 80% quality
- Videos: Source MP4 → mobile variant (480p height, CRF 28)
- Run: `npm run generate-media`

---

## Registration

```tsx
// App.tsx
<ExplainerRouter
  defaultExplainer="my-explainer"
  explainers={{
    'my-explainer': {
      title: 'My Explainer',
      content: <MyExplainer />,
      metadata: myExplainerMetadata,
      preloadSrcs: ['/assets/images/intro-768w.webp'],
    },
  }}
>
  <JumpBreadcrumbs />
</ExplainerRouter>
```

---

## Source Citations Pattern
Always at bottom of panel:
```tsx
<p className="text-label text-dark">
  Source: <a href="..." style={{ color: 'var(--dark-olive)', textDecoration: 'underline' }}>
    Citation text
  </a>
</p>
```
