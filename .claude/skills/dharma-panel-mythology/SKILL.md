---
name: dharma-panel-mythology
description: "Create and build a mythology panel React component with layered text reveals over rich imagery, bridging ancient wisdom and modern digital reality. Use when building visually immersive spiritual/mythological panels."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
---

# dharma-panel-mythology: Create & Build a Mythology Panel

## What This Skill Does

You are creating a single **mythology panel** for a Dharma campaign explainer —
from imagery direction and layered text through to a working React component.
Mythology panels are the most visually immersive panel type: rich background
imagery (generated or sourced) with text that reveals in layers as the viewer
scrolls. They bridge ancient wisdom traditions with modern digital reality.

This skill has two phases:
1. **Content phase** — Write the layered text, specify imagery, define the reveal sequence
2. **Build phase** — Create the React component with background imagery and scroll-driven text layers

## Inputs You Need

1. **The PanelMeta entry** — `id`, `title`, `narrativeRole`, `message`,
   `transitionIn`, `transitionOut`, `tags`, `keyPhrases`
2. **The explainer's metadata file path** — for overall narrative context
3. **The explainer slug** — for component file paths
4. **Mythological/spiritual reference** — what tradition or concept is being
   invoked? (Buddhist, occult, contemplative, etc.)
5. **Any visual direction** from the user (optional)

If the user doesn't provide the PanelMeta, ask for the metadata file path and
panel ID.

---

## Phase 1: Content

### Step 1: Read context

Read these files to ground yourself:

1. `.claude/skills/dharma-panel-mythology/context/campaign.md` — campaign voice
2. `.claude/skills/dharma-panel-mythology/context/design-system.md` — the complete
   design system (colors, typography, spacing, animation utilities, component anatomy)
3. `.claude/skills/dharma-panel-mythology/context/mythology-panel-guide.md` —
   mythology panel design and component patterns

### Step 2: Read the metadata

Read the explainer metadata file. Identify:
- The mythological framing this panel uses (Hungry Ghosts, egregores, demons, etc.)
- Where it sits in the arc — mythology panels often mark a tonal shift
- The tone palette (mythological, contemplative, revelatory are common leads)
- Characters — mythology panels often introduce or embody a character

### Step 3: Identify the mythology bridge

A core technique in mythology panels is the **bridge** — connecting an ancient
concept to the modern thesis. Consider:

- **Ancient anchor:** What tradition, concept, or entity is being invoked?
- **Modern connection:** How does the ancient concept map to the modern phenomenon?
- **Bridge statement:** The sentence that connects them
  (e.g., "The Cybregore is a digital Hungry Ghost: infinite appetite for attention,
  zero capacity for meaning.")

Not every mythology panel needs an explicit bridge statement — some may let the
connection emerge gradually, or leave it for the viewer to complete.

### Step 4: Write the layered text

A proven approach is **3-5 text layers** that reveal sequentially, each deepening
the mythological connection. Here's one common structure — adapt it to the
specific content:

```
Layer 1: The Ancient  [text-body text-sage text-italic]
  {Introduce the tradition/concept with reverence.}

Layer 2: The Description  [text-body text-cream]
  {Paint the mythological picture. Sensory, vivid.}

Layer 3: The Bridge  [text-title text-cream, often in box-coral]
  {Connect ancient to modern. The pivot.}

Layer 4: The Implication  [text-body text-coral]
  {What does this mean for the viewer?}

Layer 5: The Lingering (optional)  [text-body text-sage]
  {A final resonant phrase that stays.}
```

Some panels may need fewer layers, more layers, or a different progression.
The bridge might come first, the ancient might be woven throughout, or the
implication might be left unspoken.

### Step 5: Specify imagery direction

Mythology panels are typically image-heavy. Consider specifying:

**Subject matter:** What mythological imagery? Real-world references?
Modern digital echoes (circuit patterns, screen glows, data streams)?

**Visual atmosphere:**
- Light quality: dim, ethereal, ominous, sacred
- Color palette: deeper and richer than standard campaign palette
- Texture: aged, weathered, digital-glitch, organic
- Motion: slow, breathing, drifting, flickering

**Generation note:** If the image needs to be generated, write a detailed prompt
for the `create-panel-background` skill.

Not every mythology panel needs generated imagery — CSS atmospheric backgrounds
or even a stark dark background can work if it serves the content.

### Step 6: Design the reveal sequence

Map text layers and visual changes to scroll progress. Here's a common sequence
— adjust timing and structure based on the actual content:

```
Progress 0.0 - 0.10: Background fades in
Progress 0.08 - 0.20: Layer 1 — The Ancient (fade in + translateY)
Progress 0.28 - 0.40: Layer 2 — The Description
Progress 0.48 - 0.62: Layer 3 — The Bridge (the pivot)
Progress 0.70 - 0.82: Layer 4 — The Implication
Progress 0.85 - 1.0: Hold / Exit
```

### Step 7: Present content or proceed to build

**Default (pipeline mode):** If you're running as part of the full pipeline
(extract → macro → micro → panel builds), proceed directly to Phase 2. Record
your content decisions — they'll be included in the final summary.

**If the user has asked to review content before building:** Show the text layers,
imagery direction, and reveal sequence for approval before building.

---

## Phase 2: Build

### Step 8: Create the panel component

Create the component at: `src/explainers/{explainer-slug}/panels/{PanelId}.tsx`

Mythology panels have a distinctive architecture: background imagery with
layered text that reveals progressively.

```tsx
import { lerp } from '../../utils/animation'
import { VideoBackground } from '../../components/VideoBackground'

interface PanelProps {
  progress: number
}

export default function MythologyPanel({ progress }: PanelProps) {
  const bgOpacity = lerp(progress, 0, 0.10, 0, 0.35)

  // Text layers — staggered reveals
  const layer1 = lerp(progress, 0.08, 0.20, 0, 1)
  const layer1Y = lerp(progress, 0.08, 0.20, 15, 0)
  const layer2 = lerp(progress, 0.28, 0.40, 0, 1)
  const layer2Y = lerp(progress, 0.28, 0.40, 15, 0)
  const layer3 = lerp(progress, 0.48, 0.62, 0, 1)
  const layer3Y = lerp(progress, 0.48, 0.62, 12, 0)
  const layer4 = lerp(progress, 0.70, 0.82, 0, 1)

  return (
    <section className="panel panel--dark" style={{ position: 'relative' }}>
      {/* Background imagery */}
      <VideoBackground
        videoSrc="/assets/videos/mythology-bg-loop.mp4"
        imageFallback="/assets/images/mythology-bg.png"
        opacity={bgOpacity}
      />

      <div className="panel-body panel-body--over-video">
        {/* Layer 1: The Ancient */}
        <p className="text-body text-sage text-italic text-center text-shadow-depth mb-xl"
           style={{ opacity: layer1, transform: `translateY(${layer1Y}px)` }}>
          In Buddhist cosmology, Hungry Ghosts are beings with enormous
          appetites and tiny throats — they can never be satisfied.
        </p>

        {/* Layer 2: The Description */}
        <p className="text-body text-cream text-center text-shadow-depth mb-xl"
           style={{ opacity: layer2, transform: `translateY(${layer2Y}px)` }}>
          They wander endlessly, driven by craving, consuming
          without nourishment. Their hunger grows with every meal.
        </p>

        {/* Layer 3: The Bridge */}
        <div className="box-coral" style={{ opacity: layer3, transform: `translateY(${layer3Y}px)` }}>
          <p className="text-title text-cream text-center text-shadow-depth"
             style={{ margin: 0 }}>
            The Cybregore is a digital Hungry Ghost: infinite appetite
            for attention, zero capacity for meaning.
          </p>
        </div>

        {/* Layer 4: The Implication */}
        <p className="text-body text-coral text-center text-shadow-depth mt-xl"
           style={{ opacity: layer4 }}>
          And you are what it feeds on.
        </p>
      </div>
    </section>
  )
}
```

**NEVER define a custom `rangeProgress` function.** Always use `lerp` / `lerpMulti`
from `../../utils/animation`.

### Step 9: Handle the background imagery

**Option A: Generated video (preferred for immersion)**

Use the `create-panel-background` skill to generate the imagery, then:
```tsx
<VideoBackground
  videoSrc="/assets/videos/{panel-id}-bg-loop.mp4"
  imageFallback="/assets/images/{panel-id}-bg.png"
  opacity={lerp(progress, 0, 0.10, 0, 0.35)}
/>
```

**Option B: Static image with subtle parallax**
```tsx
<div style={{
  position: 'absolute',
  inset: '-5%',
  backgroundImage: 'url(/assets/images/{panel-id}-bg-768w.webp)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: lerp(progress, 0, 0.1, 0, 0.35),
  transform: `scale(${1 + progress * 0.03})`,
}} />
```

**Option C: CSS-only atmospheric background (no generated imagery)**
```tsx
<div style={{
  position: 'absolute',
  inset: 0,
  background: `
    radial-gradient(ellipse at 25% 40%, rgba(80, 40, 100, 0.4), transparent 60%),
    radial-gradient(ellipse at 75% 55%, rgba(59, 69, 64, 0.5), transparent 50%),
    var(--deep-forest)
  `,
}} />
```

### Step 10: Style the text overlay

Always use `text-shadow-depth` on text over imagery backgrounds:
```tsx
<p className="text-body text-cream text-shadow-depth">
```

For extra-dramatic text, combine with `text-glow-coral`:
```tsx
<p className="text-title text-coral text-glow-coral text-shadow-depth">
```

Text layer color assignments:
- Layer 1 (Ancient): `text-sage text-italic` — quieter, reverent
- Layer 2 (Description): `text-cream` — vivid, building
- Layer 3 (Bridge): `text-title text-cream` in `box-coral` — the loudest
- Layer 4 (Implication): `text-coral` — personal, addressed to viewer

### Step 11: Validate

Check that:
- [ ] All text layers reveal in the correct sequence
- [ ] Uses `lerp()` from `../../utils/animation` (not custom helpers)
- [ ] Uses design system CSS classes (not inline text styling)
- [ ] Outermost element is `<section className="panel panel--dark">`
- [ ] Uses `panel-body--over-video` and `text-shadow-depth` for text over imagery
- [ ] The mythology bridge connects ancient concept to modern thesis
- [ ] `keyPhrases` from metadata appear in the text layers
- [ ] VideoBackground uses correct API: `videoSrc`, `imageFallback`, `opacity`
- [ ] Text is readable against background at ALL scroll positions
- [ ] The tone matches mythological/contemplative register
- [ ] Entry honors `transitionIn`, exit serves `transitionOut`
- [ ] scrollLength is 3.5-5 (mythology panels need immersion time)
- [ ] `create-panel-background` has been noted if imagery generation is needed

### Step 12: Report

Tell the user:
- File created and location
- Text layers summary
- Imagery direction and whether `create-panel-background` needs to be run
- The mythology bridge statement
- scrollLength value
- Any background assets that need to be generated
- Next/previous panel context
