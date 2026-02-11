# Mythology Panel Guide: Imagery Design & Component Patterns

## What Mythology Panels Do

Mythology panels reveal the campaign's deepest truth: these phenomena are not new.
Ancient wisdom traditions knew about these beings, patterns, and forces. The mythology
panel bridges thousands of years of contemplative wisdom with the modern digital landscape.

These are the most visually immersive panels — rich imagery with layered text that
reveals like scripture being illuminated.

---

## Part 1: Mythology Design

### The Campaign's Mythological Framework

**Buddhist Cosmology:**
- **Hungry Ghosts (Pretas)** — enormous appetites, tiny throats, never satisfied →
  insatiable digital entities, attention economy
- **Six Realms** → digital environments that trap consciousness
- **Dharma** → wisdom acceleration

**Occult / Western Esoteric:**
- **Egregores** — collective thought-forms that arise from focused attention →
  social media entities, viral phenomena
- **Thoughtforms** → AI systems, algorithmic entities

**Mystery School Tradition:**
- **Initiation** → the explainer experience itself
- **Hidden knowledge** → seeing the Cybregore

**CRITICAL:** These are **literal**, not metaphorical. Hungry Ghosts are not "like"
digital entities — digital entities ARE hungry ghosts.

### The Mythology Bridge Pattern

A proven structure for mythology panels moves through these layers. This is one
effective approach — adapt, reorder, or restructure based on what the specific
mythological content demands:

1. **The Ancient** — Introduce tradition with reverence. `text-body text-sage text-italic`
2. **The Description** — Paint vivid picture. `text-body text-cream`
3. **The Bridge** — Connect ancient to modern (the pivot). `text-title text-cream`
4. **The Implication** — What it means for the viewer. `text-body text-coral`

Some panels may need fewer layers, more layers, or a different progression
entirely. The bridge might come first, the ancient might be woven throughout,
or the implication might be left unspoken.

**Example (Cybregore - Hungry Ghosts):**
1. "In Buddhist cosmology, Hungry Ghosts are beings with enormous appetites and tiny throats..."
2. "They can never be satisfied..."
3. "The Cybregore is a digital Hungry Ghost: infinite appetite for attention, zero capacity for meaning."
4. (Implied — the viewer is what it feeds on)

### Text Layering Principles

These principles tend to create effective mythology panels, but they're
guidelines, not rules:

- Earlier layers are often quieter (smaller, lighter, italic `text-sage`)
- The bridge layer tends to be the loudest (`text-title text-cream` or in `box-coral`)
- Implication layer often uses coral (`text-coral`) for personal address
- Giving each layer a "hold" period before the next appears helps absorption
- Each layer should ideally be readable independently

### Imagery Direction for `create-panel-background`

**Mood keywords:**
Sacred darkness, temple shadow, candlelit, ethereal glow, digital corruption, circuit-mandala

**The hybrid aesthetic:**
The campaign blends ancient and digital:
- Mandala patterns dissolving into circuit boards
- Temple carvings with data-stream veins
- Hungry Ghost figure with screen-glow eyes

**Prompt template:**
```
Style: Dark, atmospheric, sacred. Deep shadows with subtle ethereal light.
Color palette: Deep forest green (#3B4540), aged gold, shadow purple, cream highlights.
Subject: [Specific mythological subject]
Mood: Ominous reverence. Cosmically unsettling, not horror-movie scary.
Motion direction (for video): Slow breathing pulse.
```

---

## Part 2: Component Patterns

### Base Mythology Panel

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

### Static Image Background Variant

When using a static image instead of video:
```tsx
<section className="panel panel--dark" style={{ position: 'relative' }}>
  {/* Static image with subtle parallax */}
  <div style={{
    position: 'absolute',
    inset: '-5%',
    backgroundImage: 'url(/assets/images/mythology-bg-768w.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: lerp(progress, 0, 0.1, 0, 0.35),
    transform: `scale(${1 + progress * 0.03})`, // Subtle zoom
  }} />

  <div className="panel-body panel-body--over-video">
    {/* text layers */}
  </div>
</section>
```

### CSS-Only Atmospheric Background

When no generated imagery is available:
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

### Definition Box Pattern for Mythology

For key mythological concepts, use `box-definition`:
```tsx
<div className="box-definition text-left mb-xl"
     style={{ opacity: layer2 }}>
  <p className="text-body text-cream leading-relaxed" style={{ margin: 0 }}>
    Beings with <em>huge empty bellies</em> and <em>tiny throats</em>.
    They are driven by a hunger that <em className="text-coral">nothing can satisfy</em>.
  </p>
</div>
```

### Text Shadow for Readability

Always use `text-shadow-depth` class on text over imagery backgrounds:
```tsx
<p className="text-body text-cream text-shadow-depth">
```
This applies `text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5)`.

For extra-dramatic text, combine with `text-glow-coral`:
```tsx
<p className="text-title text-coral text-glow-coral text-shadow-depth">
```

### scrollLength Guidelines

Typical ranges — adjust based on actual content needs:

| Complexity | scrollLength |
|-----------|-------------|
| 3 text layers, simple image | 3.5 |
| 4 text layers, rich imagery | 4 |
| 4-5 layers, parallax, atmosphere | 4.5 |
| Full mythology set piece | 5 |
