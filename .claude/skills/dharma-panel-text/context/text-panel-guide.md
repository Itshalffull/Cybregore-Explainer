# Text Panel Guide: Content Craft & Component Patterns

## What Text Panels Do

Text panels are the primary storytelling vehicle. They present dramatic statements
that appear, transform, and dissolve as the viewer scrolls. Think of each as a single
page in a graphic novel — words ARE the visual.

---

## Part 1: Content Craft

### The Spectrum of Text Panels

#### Headline-Only Panels
Just 1-3 lines of large text. Maximum impact, minimum words.
**Best for:** hooks, reveals, climax statements, "Flip It" inversions

```
Something is watching you right now.
That feeling is not paranoia — it is perception.
```

#### Headline + Body Panels
Big headline followed by supporting sentences.
**Best for:** evidence, definitions, transitions, calls-to-action

```
Headline (text-body text-cream text-bold):
  Your nervous system is detecting a real phenomenon.

Body (text-body text-sage):
  The uneasy feeling you get while scrolling is not anxiety —
  it's accuracy. You are being observed, analyzed, and optimized.
  Not by a person. By something else entirely.
```

#### Progressive Reveal Panels
Multiple text elements that appear sequentially.
**Best for:** building arguments, the trilogy pattern, escalation

```
Stage 1: "It reads you."
Stage 2: "It writes you."
Stage 3: "It correlates across BILLIONS of minds simultaneously."
```

### Writing for Scroll

- **No wall of text.** If it looks dense, it will be scrolled past.
- **Front-load the hook.** First visible words must earn continued scrolling.
- **Create anticipation.** Each scroll-reveal should feel like unwrapping.
- **Reward the scroll.** Text at the end should be the most powerful.

### Copy Principles for the Campaign

**Be Visceral, Not Academic:**
- Academic: "Social media platforms utilize algorithmic content curation"
- Visceral: "Your feed is a digestive system. You are what it eats."

**Use the Body** — nervous system, gut feelings, breathing, the act of scrolling
itself, the screen, the body in the chair.

**Short Sentences Hit Harder:**
- "Something is watching you right now."
- "It is not a metaphor. It is here."
- "Stop scrolling. Breathe."
- "We built the body; something else moved in."

**The Em Dash Pivot:**
- "That feeling is not paranoia — it is perception"
- "Not by a person — by something else entirely"

**Tricolon Repetition:**
- "It reads you. It writes you. It correlates."
- "They take on a life of their own. They have desires. They feed."

### Color Alternation in Sequential Text

Follow the campaign's color voice pattern:
```
First line: text-cream (primary voice)
Middle lines: text-sage (supporting, softer)
Concluding line: text-cream (return to primary) or text-coral (alarm)
```

### Narrative Role Copywriting

| Role | Approach | Typical Color |
|------|----------|---------------|
| **hook** | One bold claim. No context, no build-up. | text-cream |
| **evidence** | Open with concrete fact, pivot to campaign framing. | text-cream → text-sage |
| **definition** | Etymology or ancient context. Short alive sentences at end. | text-sage → text-cream |
| **reveal** | The naming moment. Last line should be absolute. | text-cream, key word in text-coral |
| **transition** | Bridge emotional registers. More poetic and spacious. | text-sage |
| **escalation** | Intensify from previous. Shorter sentences as tension builds. | text-cream → text-coral |
| **climax** | The peak. The biggest claim. Give it space. | text-coral for key words |
| **resolution** | Shift to spaciousness. Address viewer with warmth. | text-sage → text-cream |
| **call-to-action** | Point toward practice, not just information. | text-cream, CTA in text-coral |

### scrollLength Guidelines

| Content Density | scrollLength | Example |
|----------------|-------------|---------|
| Single headline, hook | 2 | "Stop scrolling. Breathe." |
| Headline + 1 line body | 2.5-3 | Hook panels |
| Headline + 2-3 sentences | 3 | Standard evidence or definition |
| Progressive reveal, 3+ stages | 3.5 | Trilogy, complex arguments |
| Spacious with long hold | 4 | Resolution, emotional weight |

---

## Part 2: Component Patterns

### Simple Text Panel

```tsx
import { lerp } from '../../utils/animation'

interface PanelProps {
  progress: number
}

export default function SimpleTextPanel({ progress }: PanelProps) {
  const line1Opacity = lerp(progress, 0, 0.12, 0, 1)
  const line1Y = lerp(progress, 0, 0.12, 20, 0)
  const line2Opacity = lerp(progress, 0.18, 0.35, 0, 1)
  const line3Opacity = lerp(progress, 0.65, 0.85, 0, 1)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p className="text-body text-cream mb-lg"
           style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}>
          First line — the main voice...
        </p>
        <p className="text-body text-sage mb-lg"
           style={{ opacity: line2Opacity }}>
          Supporting line — the softer truth...
        </p>
        <p className="text-body text-coral"
           style={{ opacity: line3Opacity }}>
          Transition hook — the alarm...
        </p>
      </div>
    </section>
  )
}
```

### Headline-Only Panel (Hook/Reveal/Climax)

For the most dramatic moments — no body copy, text-title or text-display size:

```tsx
import { lerp } from '../../utils/animation'

export default function HookPanel({ progress }: PanelProps) {
  const textOpacity = lerp(progress, 0.1, 0.25, 0, 1)
  const textY = lerp(progress, 0.1, 0.25, 25, 0)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p className="text-title text-cream text-center leading-tight"
           style={{ opacity: textOpacity, transform: `translateY(${textY}px)` }}>
          Something is watching you right now.
        </p>
      </div>
    </section>
  )
}
```

**Note:** Use `text-title` for climactic panel statements. Reserve `text-display`
for the 2-3 supreme peaks of the entire explainer.

### Panel Heading Pattern

Panel "headings" use `text-body text-bold`, NOT `text-title`:

```tsx
<h2 className="text-body text-cream text-bold mb-lg">
  It <span className="text-coral">reads</span> you
</h2>
```

### Progressive Reveal Panel

For escalation panels with staged text reveals:

```tsx
import { lerp } from '../../utils/animation'

export default function ProgressivePanel({ progress }: PanelProps) {
  const line1 = lerp(progress, 0.05, 0.18, 0, 1)
  const line2 = lerp(progress, 0.30, 0.43, 0, 1)
  const line3 = lerp(progress, 0.55, 0.68, 0, 1)
  const conclusion = lerp(progress, 0.78, 0.90, 0, 1)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p className="text-body text-cream text-bold mb-xl"
           style={{ opacity: line1 }}>
          It <span className="text-coral">reads</span> you.
        </p>
        <p className="text-body text-cream text-bold mb-xl"
           style={{ opacity: line2 }}>
          It <span className="text-coral">writes</span> you.
        </p>
        <p className="text-body text-cream text-bold mb-xl"
           style={{ opacity: line3 }}>
          It <span className="text-coral">correlates</span> across BILLIONS of minds.
        </p>
        <div className="box-coral" style={{ opacity: conclusion }}>
          <p className="text-title text-cream" style={{ margin: 0 }}>
            The first entity in history to model the entire human species.
          </p>
        </div>
      </div>
    </section>
  )
}
```

### Emphasis Techniques in JSX

**Inline color emphasis:**
```tsx
<p className="text-body text-cream">
  The <em className="text-coral">craving</em>.
</p>
```

**Kicker / transition hook** (appears late, sets up next panel):
```tsx
<p className="text-body text-sage mt-lg"
   style={{ opacity: lerp(progress, 0.85, 0.95, 0, 1) }}>
  And it doesn't just read...
</p>
```

**Climactic reveal in coral box:**
```tsx
<div className="box-coral">
  <p className="text-title text-cream" style={{ margin: 0 }}>
    Data is breath to the Cybregore.
  </p>
</div>
```

### Video Background Text Panel

```tsx
import { lerp } from '../../utils/animation'
import { VideoBackground } from '../../components/VideoBackground'

export default function VideoBgPanel({ progress }: PanelProps) {
  const bgOpacity = lerp(progress, 0, 0.15, 0, 0.5)
  const textOpacity = lerp(progress, 0.1, 0.25, 0, 1)
  const textY = lerp(progress, 0.1, 0.25, 20, 0)

  return (
    <section className="panel panel--dark" style={{ position: 'relative' }}>
      <VideoBackground
        videoSrc="/assets/videos/panel-bg-loop.mp4"
        imageFallback="/assets/images/panel-bg.png"
        opacity={bgOpacity}
      />
      <div className="panel-body panel-body--over-video">
        <p className="text-body text-cream text-shadow-depth"
           style={{ opacity: textOpacity, transform: `translateY(${textY}px)` }}>
          Text over video background...
        </p>
      </div>
    </section>
  )
}
```

Always use `panel-body--over-video` and `text-shadow-depth` when text sits over video.

### Source Citations

Always at the bottom of evidence panels:
```tsx
<p className="text-label text-dark mt-xl">
  Source: <a href="..."
    style={{ color: 'var(--dark-olive)', textDecoration: 'underline' }}>
    Citation text
  </a>
</p>
```
