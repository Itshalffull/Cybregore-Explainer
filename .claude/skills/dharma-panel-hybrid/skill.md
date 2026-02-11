# dharma-panel-hybrid: Create & Build a Hybrid Panel

## What This Skill Does

You are creating a single **hybrid panel** for a Dharma campaign explainer —
from content design through to a working React component. Hybrid panels combine
two or more panel types (text, visualization, interactive, mythology) within a
single scroll section. They're used for climax moments, complex reveals, or
panels that bridge two tonal sections.

This skill has two phases:
1. **Content phase** — Identify the type combination, design the content for each mode, define the transition between modes
2. **Build phase** — Create the React component that composes multiple panel patterns with scroll-driven mode switching

## Inputs You Need

1. **The PanelMeta entry** — `id`, `title`, `narrativeRole`, `message`,
   `transitionIn`, `transitionOut`, `tags`, `keyPhrases`
2. **The explainer's metadata file path** — for overall narrative context
3. **The explainer slug** — for component file paths
4. **Which types to combine** — e.g., "text + visualization",
   "mythology + interactive" (if not obvious from context, discuss with user)
5. **Any visual direction** from the user (optional)

If the user doesn't provide the PanelMeta, ask for the metadata file path and
panel ID.

---

## Phase 1: Content

### Step 1: Read context

Read these files to ground yourself:

1. `.claude/skills/dharma-panel-hybrid/context/campaign.md` — campaign voice
2. `.claude/skills/dharma-panel-hybrid/context/design-system.md` — the complete
   design system (colors, typography, spacing, animation utilities, component anatomy)
3. `.claude/skills/dharma-panel-hybrid/context/hybrid-panel-guide.md` — hybrid panel
   design patterns and component architecture

Also read the guide for each panel type you're combining:
- `.claude/skills/dharma-panel-text/context/text-panel-guide.md`
- `.claude/skills/dharma-panel-visualization/context/visualization-panel-guide.md`
- `.claude/skills/dharma-panel-interactive/context/interactive-panel-guide.md`
- `.claude/skills/dharma-panel-mythology/context/mythology-panel-guide.md`

### Step 2: Read the metadata

Read the explainer metadata file. Identify:
- The panel's narrative role (hybrids are common for `climax`, `reveal`, `escalation`)
- Position in the arc — hybrids often appear at transitions between acts
- The adjacent panels' types — the hybrid should bridge or culminate
- Tone demands — hybrids often shift register mid-panel

### Step 3: Identify the type combination

Common hybrid combinations — but don't limit yourself to these:

| Combination | Often Used For | Example |
|------------|----------|---------|
| **text → visualization** | Claim followed by evidence | Bold thesis + data chart proving it |
| **visualization → text** | Data followed by reframing | Chart builds + pivot line reveals |
| **text → interactive** | Setup followed by experience | Provocation + breathing exercise |
| **mythology → text** | Ancient context followed by modern claim | Buddhist framing + bold modern thesis |
| **text + visualization (simultaneous)** | Text overlaid on animated data | Statement with data backdrop |
| **mythology + interactive** | Spiritual framing with embodiment | Mythological imagery + breathing or pause |

### Step 4: Design the mode transition

A key design decision for hybrid panels is how modes relate to each other.
Consider:

- **Transition trigger:** At what scroll progress does the mode change? (typically 0.4-0.6 for sequential hybrids)
- **Transition style** — some common options:
  - **Dissolve:** Mode A fades out, Mode B fades in (gentle)
  - **Push:** Mode A slides away, Mode B slides in (energetic)
  - **Transform:** Mode A morphs into Mode B (magical)
  - **Overlay:** Mode B appears on top of Mode A (layered)
  - **Split:** Screen splits, one mode per side (confrontational)

The transition style should serve the narrative. Invent new transition approaches
if the content calls for it.

### Step 5: Write content for each mode

Draw on content craft from the relevant panel type guides:

**For text:** Headlines and body copy
**For visualization:** Data, chart type, annotation copy, pivot line
**For interactive:** Interaction type, experience arc, copy states, fallback
**For mythology:** Text layers, imagery direction, mythology bridge

**Content budget:** Each mode typically gets less content than a standalone panel.
If a standalone text panel has 3 headlines + body, the text portion of a hybrid
might get 1-2 headlines. Adjust based on what the content actually needs — some
hybrids lean heavily on one mode with the other as accent.

### Step 6: Design the unified scroll choreography

Map both modes to a single scroll progress timeline. Here are common starting
points — adapt based on the specific content:

**For sequential hybrids (A → B):**
```
Progress 0.0 - 0.1: Entry
Progress 0.1 - 0.4: Mode A plays out
Progress 0.4 - 0.55: Transition (the hinge moment)
Progress 0.55 - 0.85: Mode B plays out
Progress 0.85 - 1.0: Exit
```

**For simultaneous hybrids (A + B):**
```
Progress 0.0 - 0.1: Entry
Progress 0.1 - 0.3: Background mode establishes (e.g., chart building)
Progress 0.3 - 0.7: Foreground mode plays (e.g., text over chart)
Progress 0.7 - 0.85: Combined emphasis (data highlights sync with text)
Progress 0.85 - 1.0: Exit
```

### Step 7: Present design or proceed to build

**Default (pipeline mode):** If you're running as part of the full pipeline
(extract → macro → micro → panel builds), proceed directly to Phase 2. Record
your design decisions — they'll be included in the final summary.

**If the user has asked to review content before building:** Show the type
combination, content for each mode, the transition design, and the unified
choreography for approval before building.

---

## Phase 2: Build

### Step 8: Create the panel component

Create the component at: `src/explainers/{explainer-slug}/panels/{PanelId}.tsx`

Hybrid panels compose elements from multiple panel types within a single
`<section className="panel panel--dark">`:

```tsx
import { lerp } from '../../utils/animation'

interface PanelProps {
  progress: number
}

export default function HybridPanel({ progress }: PanelProps) {
  // ── Mode A: Text ──────────────────────────────────────────────────
  const textIn = lerp(progress, 0.08, 0.2, 0, 1)
  const textY = lerp(progress, 0.08, 0.2, 20, 0)
  const textOut = lerp(progress, 0.38, 0.52, 0, 1)  // 0 = visible, 1 = gone

  // ── Mode B: Visualization ─────────────────────────────────────────
  const vizIn = lerp(progress, 0.42, 0.55, 0, 1)
  const vizBuild = lerp(progress, 0.5, 0.78, 0, 1)
  const pivotIn = lerp(progress, 0.75, 0.85, 0, 1)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        {/* Mode A: Text claim */}
        <div style={{
          opacity: textIn * (1 - textOut),
          transform: `translateY(${textY}px)`,
        }}>
          <p className="text-body text-cream text-bold text-center mb-lg">
            Bold text claim
          </p>
          <p className="text-body text-sage text-center">
            Supporting text
          </p>
        </div>

        {/* Mode B: Visualization */}
        <div style={{ opacity: vizIn }}>
          <svg viewBox="0 0 800 400"
               style={{ width: '100%', maxWidth: '800px' }}>
            {/* Chart elements driven by vizBuild */}
            <line x1={60} y1={350} x2={750} y2={350}
                  stroke="var(--dark-olive)" strokeWidth={0.5}
                  strokeDasharray="4" opacity={0.5} />
          </svg>

          {/* Pivot line */}
          <div className="box-coral mt-xl" style={{ opacity: pivotIn }}>
            <p className="text-title text-cream text-center" style={{ margin: 0 }}>
              Pivot line reframing the data
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

**NEVER define a custom `rangeProgress` function.** Always use `lerp` / `lerpMulti`
from `../../utils/animation`.

### Step 9: Implement the transition

Choose and implement the transition style using `lerp()`:

**Dissolve (crossfade):**
```tsx
const modeAOpacity = 1 - lerp(progress, 0.4, 0.55, 0, 1)
const modeBOpacity = lerp(progress, 0.4, 0.55, 0, 1)
```

**Push (slide):**
```tsx
const slideOut = lerp(progress, 0.4, 0.55, 0, -100) // Mode A slides up
const slideIn = lerp(progress, 0.4, 0.55, 100, 0)   // Mode B from below
// Apply as translateY
```

**Overlay (Mode B on top of Mode A):**
```tsx
const modeADim = lerp(progress, 0.4, 0.55, 1, 0.3) // Dims to 30%
const modeBIn = lerp(progress, 0.4, 0.55, 0, 1)
```

### Step 10: Compose type-specific elements

Import patterns from the relevant panel type guides:

- **Text elements:** Use design system text classes (`text-body`, `text-cream`, etc.)
- **Visualization elements:** Use SVG with CSS variables (`var(--sage)`, `var(--accent-coral)`)
- **Interactive elements:** Use React state alongside `lerp()` for scroll-driven parts
- **Mythology elements:** Use `VideoBackground`, `text-shadow-depth`, layered reveals

Keep each mode's elements in their own `<div>` for clean transition management.

### Step 11: Validate

Check that:
- [ ] Both modes deliver their content clearly
- [ ] Uses `lerp()` from `../../utils/animation` (not custom helpers)
- [ ] Uses design system CSS classes (not inline text styling)
- [ ] Outermost element is `<section className="panel panel--dark">`
- [ ] Content wrapped in `<div className="panel-body">` or `<AutoScaleContent>`
- [ ] The transition feels intentional, not glitchy
- [ ] `keyPhrases` from metadata appear in the appropriate mode's content
- [ ] Each mode follows the quality standards of its panel type
- [ ] The hybrid serves the narrative role (climax, reveal, etc.)
- [ ] Scroll choreography is smooth across the full 0-1 range
- [ ] Entry honors `transitionIn`, exit serves `transitionOut`
- [ ] The mid-panel transition creates a meaningful shift
- [ ] scrollLength gives time for both modes (typically 3.5-5)
- [ ] No competing animations during the transition moment

### Step 12: Report

Tell the user:
- File created and location
- Type combination and why
- Content summary for each mode
- The transition style and where it occurs
- scrollLength value
- Any background assets needed
- Next/previous panel context
