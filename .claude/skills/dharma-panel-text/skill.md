# dharma-panel-text: Create & Build a Text Panel

## What This Skill Does

You are creating a single **text panel** for a Dharma campaign explainer — from
initial copy all the way to a working React component. Text panels are the backbone
of the scroll experience: dramatic statements that fade in, transform, and leave an
imprint on the viewer's mind.

This skill has two phases:
1. **Content phase** — Write the copy, define scroll choreography, specify typography and background
2. **Build phase** — Create the React component that implements the content

## Inputs You Need

1. **The PanelMeta entry** — from the explainer's metadata file. You need:
   - `id`, `title`, `narrativeRole`, `message`, `transitionIn`, `transitionOut`,
     `tags`, `keyPhrases`
2. **The explainer's metadata file path** — for context on the overall narrative
   (tone, conflict, characters, arc)
3. **The explainer slug** — to determine component file paths
4. **Any visual/tonal direction** from the user (optional)

If the user doesn't provide the PanelMeta, ask for the metadata file path and
the panel ID.

---

## Phase 1: Content

### Step 1: Read context

Read these files to ground yourself:

1. `.claude/skills/dharma-panel-text/context/campaign.md` — campaign voice and framework
2. `.claude/skills/dharma-panel-text/context/design-system.md` — the complete design system
   (colors, typography, spacing, animation utilities, component anatomy)
3. `.claude/skills/dharma-panel-text/context/text-panel-guide.md` — text panel craft
   and component patterns

### Step 2: Read the metadata

Read the explainer metadata file. Find the specific panel entry and understand:
- Where this panel sits in the overall arc (which act, what comes before/after)
- The narrative role and what it demands
- The tone palette from the macro narrative
- The characters that might appear
- The adjacent panels' transitionOut/transitionIn for flow

### Step 3: Write the headline copy

Every text panel has **1-3 headline lines** — the big, bold text that dominates
the screen.

Rules for headline copy:
- **Short.** 3-10 words per line. Every word must earn its place.
- **Bold.** No hedging, no qualifiers, no academic tone.
- **Rhythmic.** Read it out loud. It should have cadence.
- **Campaign-aligned.** Match the tones specified in the macro metadata.

Write 2-3 headline options for the user to choose from.

### Step 4: Write the body copy

Body copy is the supporting text that appears around or after the headlines.
Not every text panel needs body copy — some are headline-only.

If body copy is warranted:
- **2-4 sentences maximum.** This is a scroll experience, not an article.
- **Second person.** Address "you" — the viewer is a character in this story.
- **Advance the argument.** Each sentence should move the thesis forward.
- **End with a hook.** The last line should pull the viewer into scrolling further.

### Step 5: Define the scroll choreography

Map content to the panel's scroll progress (0.0 to 1.0):

```
Progress 0.0 - 0.12: Entry
  {First element fades in, subtle translateY(20→0).}
Progress 0.12 - 0.35: Headline Reveal
  {Headlines appear sequentially, each ~8-12% apart.}
Progress 0.35 - 0.55: Headline Hold
  {Fully visible. Viewer absorbs the statement.}
Progress 0.55 - 0.75: Body Copy (if applicable)
  {Body text fades in. Headline remains visible.}
Progress 0.75 - 0.90: Hold / Emphasis
  {Final emphasis. Conclusion or kicker text appears.}
Progress 0.90 - 1.0: Exit
  {Content remains visible (no exit fade needed — next panel covers it).}
```

### Step 6: Specify typography and background

**Typography** (using the 5-level system):
- Headline class: `text-body text-bold` for panel headings, `text-title` for
  climactic statements, `text-display` ONLY if this is one of the 2-3 supreme
  peaks of the entire explainer
- Body class: `text-body` (the workhorse)
- Emphasis: `text-coral` for key words, `text-italic` for softer emphasis
- Alignment: `text-center` (most common), `text-left` for definition boxes

**Background:**
- Nearly all text panels use `panel--dark` (deep forest `#3B4540`)
- If a generated background is needed, note for `create-panel-background` skill
- For video backgrounds, use `panel-body--over-video` + `text-shadow-depth`

### Step 7: Present content to user

Show the complete content plan and get approval before building.
After approval (or if the user says to proceed without review), move to Phase 2.

---

## Phase 2: Build

### Step 8: Create the panel component

Create the React component file at:
`src/explainers/{explainer-slug}/panels/{PanelId}.tsx`

where `{PanelId}` is the panel `id` converted to PascalCase.

The component must follow this architecture:

```tsx
import { lerp } from '../../utils/animation'

interface PanelProps {
  progress: number  // 0.0 to 1.0
}

export default function PanelName({ progress }: PanelProps) {
  // Derive animation values from progress using lerp()
  const line1Opacity = lerp(progress, 0, 0.12, 0, 1)
  const line1Y = lerp(progress, 0, 0.12, 20, 0)
  const line2Opacity = lerp(progress, 0.18, 0.35, 0, 1)
  const line3Opacity = lerp(progress, 0.65, 0.85, 0, 1)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        {/* Headline */}
        <p className="text-body text-cream text-bold mb-lg"
           style={{ opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}>
          Headline text here
        </p>

        {/* Supporting text */}
        <p className="text-body text-sage mb-lg"
           style={{ opacity: line2Opacity }}>
          Supporting text here
        </p>

        {/* Concluding emphasis */}
        <p className="text-body text-coral"
           style={{ opacity: line3Opacity }}>
          Concluding text here
        </p>
      </div>
    </section>
  )
}
```

**Animation implementation:**

Always use `lerp()` from `../../utils/animation`:
```tsx
import { lerp } from '../../utils/animation'

// lerp(progress, startProgress, endProgress, outputStart, outputEnd)
const opacity = lerp(progress, 0.15, 0.35, 0, 1)      // Fade in
const translateY = lerp(progress, 0.15, 0.35, 20, 0)    // Slide up

// For multi-point sequences, use lerpMulti:
import { lerpMulti } from '../../utils/animation'
const fadeInOut = lerpMulti(progress, [0.1, 0.2, 0.7, 0.8], [0, 1, 1, 0])
```

**NEVER define a custom `rangeProgress` function.** Always use `lerp` / `lerpMulti`.

### Step 9: Apply design system classes

Use CSS classes from the design system — never inline `fontSize`, `color`, or
`fontWeight` for standard text styling:

```tsx
// CORRECT — design system classes
<p className="text-body text-cream text-bold mb-lg">

// WRONG — inline styles for text
<p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#F5F0E8', fontWeight: 700 }}>
```

Only use inline `style` for scroll-driven animation (`opacity`, `transform`).

**Color classes:** `text-cream`, `text-sage`, `text-coral`, `text-olive`, `text-dark`
**Weight modifiers:** `text-normal`, `text-medium`, `text-semibold`, `text-bold`, `text-heavy`
**Spacing:** `mb-2xl`, `mb-xl`, `mb-lg`, `mb-md`, `mb-sm`, `mb-xs` (and `mt-` equivalents)

### Step 10: Handle the background

**Standard dark background (most common):**
```tsx
<section className="panel panel--dark">
```

**Video background:**
```tsx
import { VideoBackground } from '../../components/VideoBackground'

<section className="panel panel--dark" style={{ position: 'relative' }}>
  <VideoBackground
    videoSrc="/assets/videos/{panel-id}-bg-loop.mp4"
    imageFallback="/assets/images/{panel-id}-bg.png"
    opacity={lerp(progress, 0, 0.15, 0, 0.5)}
  />
  <div className="panel-body panel-body--over-video">
    <p className="text-body text-cream text-shadow-depth">
      Text over video...
    </p>
  </div>
</section>
```

**Static image with parallax:**
```tsx
<section className="panel panel--dark" style={{ position: 'relative' }}>
  <div style={{
    position: 'absolute',
    inset: '-5%',
    backgroundImage: 'url(/assets/images/bg-768w.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: lerp(progress, 0, 0.1, 0, 0.35),
    transform: `scale(${1 + progress * 0.03})`,
  }} />
  <div className="panel-body panel-body--over-video">
    {/* text with text-shadow-depth */}
  </div>
</section>
```

### Step 11: Validate

Check that:
- [ ] Component renders without errors
- [ ] All text from the content plan appears in the component
- [ ] `keyPhrases` from metadata appear verbatim
- [ ] Uses `lerp()` from `../../utils/animation` (not custom helpers)
- [ ] Uses design system CSS classes (not inline text styling)
- [ ] Outermost element is `<section className="panel panel--dark">`
- [ ] Content wrapped in `<div className="panel-body">`
- [ ] Scroll animations work across the full 0-1 progress range
- [ ] Entry animation honors the panel's `transitionIn`
- [ ] Exit animation serves the panel's `transitionOut`
- [ ] Text is readable against the background at all progress points
- [ ] The `scrollLength` value matches the content plan
- [ ] Component exports as default function

### Step 12: Report

Tell the user:
- What file was created and where
- The chosen headline and body copy
- The scrollLength value
- Any background assets needed (note if `create-panel-background` should be run)
- What the previous and next panels are (for context on integration)
