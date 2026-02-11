---
name: dharma-panel-visualization
description: "Create and build a visualization panel React component with SVG charts, animated counters, and data-driven graphics for a Dharma campaign explainer. Use when building data visualization panels."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
---

# dharma-panel-visualization: Create & Build a Visualization Panel

## What This Skill Does

You are creating a single **visualization panel** for a Dharma campaign explainer —
from data preparation and chart design through to a working React component. Visualization
panels render data visually: SVG charts, animated diagrams, counting numbers, timelines,
and structural breakdowns that make invisible systems visible.

This skill has two phases:
1. **Content phase** — Identify the data, choose the visualization type, write annotation copy, design the scroll animation sequence
2. **Build phase** — Create the React component with SVG rendering and scroll-driven animation

## Inputs You Need

1. **The PanelMeta entry** — `id`, `title`, `narrativeRole`, `message`,
   `transitionIn`, `transitionOut`, `tags`, `keyPhrases`
2. **The explainer's metadata file path** — for overall narrative context
3. **The explainer slug** — for component file paths
4. **Data or evidence to visualize** — specific numbers, comparisons, timelines,
   or structural relationships from the source material or metadata submessages
5. **Any visual direction** from the user (optional)

If the user doesn't provide the PanelMeta, ask for the metadata file path and
panel ID. If the data to visualize isn't obvious from the panel's message and
tags, ask the user what data this panel should present.

---

## Phase 1: Content

### Step 1: Read context

Read these files to ground yourself:

1. `.claude/skills/dharma-panel-visualization/context/campaign.md` — campaign voice
2. `.claude/skills/dharma-panel-visualization/context/design-system.md` — the complete
   design system (colors, typography, spacing, animation utilities, SVG conventions)
3. `.claude/skills/dharma-panel-visualization/context/visualization-panel-guide.md` —
   visualization design patterns and component architecture

### Step 2: Read the metadata

Read the explainer metadata file. Identify:
- The panel's position in the arc and what it must accomplish
- The narrative role (usually `evidence`, `anatomy`, or `escalation`)
- Adjacent panels for transition flow
- The macro narrative's tone — visualizations must match emotional register

### Step 3: Identify the data

Extract the specific data points this panel needs to communicate:
- **Quantitative data:** Numbers, percentages, growth rates, comparisons
- **Structural data:** Systems, hierarchies, flows, anatomies
- **Temporal data:** Timelines, adoption curves, before/after
- **Relational data:** Connections, networks, cause-and-effect

If the source material or metadata provides specific numbers (e.g., "2.5 quintillion
bytes"), use them. If not, work with the user to establish what data supports the
panel's message.

### Step 4: Choose the visualization type

These are common types, but the right choice is whatever makes the data land.
Don't limit yourself to this list if the content calls for something different.

| Type | Often Works Well For | Example |
|------|----------|---------|
| **Animated counter** | Big numbers that shock | "2,500,000,000,000,000,000 bytes per day" |
| **Bar chart** | Comparisons | Screen time by generation, platform reach |
| **Line graph** | Trends over time | Adoption curves, acceleration patterns |
| **Radial/pie** | Proportions | Attention allocation, time distribution |
| **Network diagram** | Connections, systems | Algorithmic nervous system, feed anatomy |
| **Flow diagram** | Processes, cause-and-effect | How content gets selected, feedback loops |
| **Stacked/layered** | Accumulation, scale | Building to overwhelming totals |
| **Comparison split** | Before/after, this vs that | Ancient vs modern, perception vs reality |

### Step 5: Write the annotation copy

Consider what supporting text the visualization needs. Common elements include:
- **Title/label:** What is this showing? (2-5 words)
- **Axis labels / legends:** Clear, minimal (if applicable)
- **Callout annotations:** Moments where text appears to contextualize a data point
- **A pivot line:** A sentence that reframes the data through the campaign lens
  (e.g., "This is not just data — it is the metabolism of something alive.")

A pivot line is one of the most effective tools for landing a visualization — it's
where data stops being informational and becomes narrative. It often draws from
the metadata's `keyPhrases`. That said, not every visualization needs an explicit
pivot — sometimes the data speaks for itself or the framing is woven throughout.

### Step 6: Design the scroll animation sequence

Map the visualization build to scroll progress. Here's one proven sequence, but
adapt it to the specific content — a simple counter may need a different rhythm
than a complex network diagram:

```
Progress 0.0 - 0.1: Setup
  {Empty chart framework appears — axes, grid lines, labels}
Progress 0.1 - 0.45: Data Reveal
  {Data animates in — bars grow, lines draw, counters count up}
Progress 0.45 - 0.55: Hold
  {Full visualization visible. Viewer absorbs the data.}
Progress 0.55 - 0.7: Annotation
  {Callout text appears highlighting key data points}
Progress 0.7 - 0.85: Pivot
  {The reframing line appears — the campaign interpretation of the data}
Progress 0.85 - 1.0: Source / Exit
  {Source citation fades in. Content stays visible.}
```

### Step 7: Present content or proceed to build

**Default (pipeline mode):** If you're running as part of the full pipeline
(extract → macro → micro → panel builds), proceed directly to Phase 2. Record
your content decisions — they'll be included in the final summary.

**If the user has asked to review content before building:** Show the data plan,
visualization type, annotation copy, and animation sequence for approval before
building.

---

## Phase 2: Build

### Step 8: Create the panel component

Create the component at: `src/explainers/{explainer-slug}/panels/{PanelId}.tsx`

The component must:
1. Accept a `progress` prop (0-1 float)
2. Render SVG-based visualization
3. Animate based on scroll progress using `lerp()` (NOT CSS transitions)
4. Include annotation text with scroll-synced reveal
5. Use `AutoScaleContent` or `panel-body--wide` for charts needing horizontal space

```tsx
import { lerp } from '../../utils/animation'
import { AutoScaleContent } from '../../components/AutoScaleContent'

interface PanelProps {
  progress: number
}

export default function VisualizationPanel({ progress }: PanelProps) {
  // Intro text
  const introOpacity = lerp(progress, 0, 0.08, 0, 1)
  const introY = lerp(progress, 0, 0.08, 15, 0)

  // Chart build
  const chartBuild = lerp(progress, 0.10, 0.45, 0, 1)

  // Annotations
  const annotationOpacity = lerp(progress, 0.50, 0.62, 0, 1)

  // Pivot / conclusion
  const pivotOpacity = lerp(progress, 0.68, 0.80, 0, 1)

  // Source
  const sourceOpacity = lerp(progress, 0.82, 0.90, 0, 1)

  return (
    <section className="panel panel--dark">
      <AutoScaleContent maxWidth="800px">
        {/* Intro / kicker */}
        <p className="text-body text-sage text-center mb-lg"
           style={{ opacity: introOpacity, transform: `translateY(${introY}px)` }}>
          Intro kicker text
        </p>

        {/* Title */}
        <h2 className="text-body text-cream text-bold text-center mb-xl"
            style={{ opacity: introOpacity }}>
          Chart Title
        </h2>

        {/* SVG Chart */}
        <svg viewBox="0 0 800 400"
             style={{ width: '100%', maxWidth: '800px' }}>
          {/* Grid lines */}
          <line x1={60} y1={350} x2={750} y2={350}
                stroke="var(--dark-olive)" strokeWidth={0.5}
                strokeDasharray="4" opacity={0.5} />

          {/* Chart elements driven by chartBuild */}
        </svg>

        {/* Annotation */}
        <p className="text-small text-cream text-center mb-lg"
           style={{ opacity: annotationOpacity }}>
          Key data point callout
        </p>

        {/* Pivot line */}
        <div className="box-coral" style={{ opacity: pivotOpacity }}>
          <p className="text-title text-cream text-center" style={{ margin: 0 }}>
            This is not just data — it is the metabolism of something alive.
          </p>
        </div>

        {/* Source */}
        <p className="text-label text-dark mt-xl" style={{ opacity: sourceOpacity }}>
          Source: <a href="..." style={{ color: 'var(--dark-olive)', textDecoration: 'underline' }}>
            Citation
          </a>
        </p>
      </AutoScaleContent>
    </section>
  )
}
```

### Step 9: Build the SVG visualization

Implement the specific chart type using design system CSS variables for colors.

**Animated bar chart:**
```tsx
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

const easedBuild = easeOutCubic(chartBuild)
<rect
  x={barX}
  y={350 - barHeight * easedBuild}
  width={barWidth}
  height={barHeight * easedBuild}
  fill={isHighlighted ? "var(--accent-coral)" : "var(--sage)"}
  rx={3}
/>
```

**Animated line graph (path drawing):**
```tsx
const pathLength = 1200 // approximate
<path
  d={linePath}
  fill="none"
  stroke="var(--sage)"
  strokeWidth={3}
  strokeLinecap="round"
  strokeDasharray={pathLength}
  strokeDashoffset={pathLength * (1 - easeOutCubic(chartBuild))}
/>
```

**Animated counter:**
```tsx
const displayValue = Math.floor(targetValue * easeOutCubic(chartBuild))
<p className="text-display text-cream text-center leading-tight"
   style={{ fontVariantNumeric: 'tabular-nums' }}>
  {displayValue.toLocaleString()}
</p>
<p className="text-label text-sage text-center mb-2xl">
  bytes of data generated every day
</p>
```

**SVG text labels:**
```tsx
<text x={x} y={y} textAnchor="middle"
      fill="var(--color-sage)" fontSize="12">
  {label}
</text>
<text x={x} y={y} textAnchor="middle"
      fill="var(--accent-coral)" fontSize="13" fontWeight={600}>
  {highlightValue}
</text>
```

### Step 10: Handle responsive behavior

- Use `AutoScaleContent maxWidth="800px"` for chart panels
- SVG must use `viewBox` for responsive sizing — never hardcode width/height
- Counter-based panels work well on all sizes
- Complex network diagrams may need simplified mobile versions
- Test that SVG text labels don't overlap on small screens

### Step 11: Register the panel in the explainer root component

The panel must be wired into the explainer's root component (e.g.,
`src/explainers/{Slug}Explainer.tsx`). Each `<ScrollSection>` that renders
this panel **must** include a `panelId` prop matching the panel's metadata `id`:

```tsx
<ScrollSection scrollLength={4} panelId="panel-your-panel-id">
  {(progress) => <PanelYourPanel progress={progress} />}
</ScrollSection>
```

The `panelId` sets the DOM `id` attribute, which enables:
- **URL anchors** — viewers can link directly to `/explainer-slug#panel-id`
- **Auto-updating hash** — the URL hash updates as the viewer scrolls to this panel

### Step 12: Validate

Check that:
- [ ] Data is accurate and matches source material
- [ ] Uses `lerp()` from `../../utils/animation` (not custom helpers)
- [ ] Uses design system CSS classes and CSS variables in SVG
- [ ] SVG animations driven by progress, not CSS transitions
- [ ] SVG colors use `var(--sage)`, `var(--accent-coral)`, `var(--dark-olive)`, etc.
- [ ] The pivot line appears in a `box-coral` and reframes data through campaign lens
- [ ] `keyPhrases` from metadata appear in annotations or pivot text
- [ ] Outermost element is `<section className="panel panel--dark">`
- [ ] Chart is readable at all progress points
- [ ] Source citation at bottom with `text-label text-dark`
- [ ] Entry honors `transitionIn`, exit serves `transitionOut`
- [ ] scrollLength gives enough time for data to be absorbed
- [ ] `panelId` matches the panel's metadata `id` in the explainer root component

### Step 13: Report

Tell the user:
- File created and location
- Visualization type chosen and why
- Data points displayed
- The pivot line (the campaign reframing)
- scrollLength value
- The `panelId` used for URL anchoring (e.g., `/explainer-slug#panel-id`)
- Any data the user needs to verify or provide
- Next/previous panel context
