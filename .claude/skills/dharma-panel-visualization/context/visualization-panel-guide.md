# Visualization Panel Guide: Data Design & Component Patterns

## What Visualization Panels Do

Visualization panels make invisible systems visible. They translate raw data into
visual experiences that land in the gut, not just the intellect. In the Dharma
campaign, a visualization panel takes something people think they understand and
makes the TRUE scale or structure viscerally apparent.

---

## Part 1: Data Design

### The Campaign Visualization Mindset

Campaign visualizations are NOT neutral infographics. They have a perspective:
1. **Present data honestly** — no misleading scales
2. **Reframe through the campaign lens** — the pivot line transforms data into narrative
3. **Create visceral impact** — the viewer should FEEL something
4. **Serve the explainer's thesis** — this data is evidence for a bold claim

### Visualization Type Selection

These are common types, but don't limit yourself — the right visualization is
whatever makes the data land viscerally.

| Type | Often Works Well For | Campaign Example |
|------|----------|-----------------|
| **Animated counter** | Big shocking numbers | "2,500,000,000,000,000,000 bytes per day" |
| **Bar chart** | Comparisons | Screen time by generation, platform reach |
| **Line graph** | Trends over time | Adoption curves, acceleration patterns |
| **Network diagram** | Connections, systems | Algorithmic nervous system, feed anatomy |
| **Flow diagram** | Processes, cause-and-effect | How content gets selected |
| **Stacked/layered** | Accumulation, scale | Building to overwhelming totals |
| **Comparison split** | Before/after, this vs that | Perception vs reality |

### The Pivot Line

A proven technique is the **pivot line** — a sentence where data becomes narrative.
This is one of the most effective ways to land a visualization, though not every
panel needs one (sometimes the data speaks for itself, or the framing is woven
throughout).

**Common pattern:** Present data neutrally → Reframe through campaign lens

- Data: 2.5 quintillion bytes/day → Pivot: "This is not data — it is metabolism."
- Data: Adoption curves accelerating → Pivot: "Something new is possible at this speed."
- Data: Trillions spent on attention → Pivot: "But who — or what — is doing the capturing?"

When using a pivot line, it tends to work well to:
- Use the em dash for the turn (—)
- Match the campaign's visceral, bold tone
- Often use `text-title text-cream` and appear in a `box-coral` component
- Draw from `keyPhrase` entries in the metadata

### Annotation Copy

Common annotation elements — use what the panel needs:

- **Axis labels:** Minimal, `text-label text-sage` or SVG equivalent
- **Data labels:** Only on the most important data points
- **Callouts:** 1-3 text annotations, `text-small text-cream`
- **Source citation:** `text-label text-dark` at bottom

---

## Part 2: Component Patterns

### Base Visualization Panel

```tsx
import { lerp } from '../../utils/animation'
import { AutoScaleContent } from '../../components/AutoScaleContent'

interface PanelProps {
  progress: number
}

export default function VizPanel({ progress }: PanelProps) {
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

Use `panel-body--wide` or `AutoScaleContent maxWidth="800px"` for visualization panels
that need more horizontal space than the default 700px.

### Animated Counter

```tsx
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export default function CounterPanel({ progress }: PanelProps) {
  const countUp = lerp(progress, 0.08, 0.45, 0, 1)
  const pivotOpacity = lerp(progress, 0.60, 0.75, 0, 1)

  const displayValue = Math.floor(2_500_000_000_000_000_000 * easeOutCubic(countUp))

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        <p className="text-display text-cream text-center leading-tight"
           style={{ fontVariantNumeric: 'tabular-nums' }}>
          {displayValue.toLocaleString()}
        </p>
        <p className="text-label text-sage text-center mb-2xl">
          bytes of data generated every day
        </p>

        <div className="box-coral" style={{ opacity: pivotOpacity }}>
          <p className="text-title text-cream text-center" style={{ margin: 0 }}>
            This is not just data — it is the metabolism of something alive.
          </p>
        </div>
      </div>
    </section>
  )
}
```

**Note:** `text-display` is appropriate here since a counter IS a supreme dramatic
peak. But count it toward the explainer's limit of ~3 `text-display` uses.

### Bar Chart

```tsx
export default function BarChartPanel({ progress }: PanelProps) {
  const chartBuild = lerp(progress, 0.10, 0.50, 0, 1)

  const data = [
    { label: 'Telephone', value: 75, note: '75 years' },
    { label: 'Internet', value: 15, note: '15 years' },
    { label: 'Facebook', value: 5, note: '5 years' },
    { label: 'ChatGPT', value: 0.5, note: '2 months' },
  ]
  const maxValue = Math.max(...data.map(d => d.value))
  const barWidth = 100
  const chartHeight = 300

  return (
    <section className="panel panel--dark">
      <AutoScaleContent maxWidth="750px">
        <h2 className="text-body text-cream text-bold text-center mb-xl">
          Time to reach 100 million users
        </h2>

        <svg viewBox="0 0 650 400" style={{ width: '100%' }}>
          {/* Axis */}
          <line x1={50} y1={350} x2={620} y2={350}
                stroke="var(--dark-olive)" strokeWidth={0.5} />

          {data.map((d, i) => {
            const barH = (d.value / maxValue) * chartHeight
            const easedBuild = easeOutCubic(chartBuild)
            const x = 70 + i * (barWidth + 45)
            const isLast = i === data.length - 1

            return (
              <g key={i}>
                <rect
                  x={x}
                  y={350 - barH * easedBuild}
                  width={barWidth}
                  height={barH * easedBuild}
                  fill={isLast ? 'var(--accent-coral)' : 'var(--sage)'}
                  rx={3}
                />
                {/* Label */}
                <text x={x + barWidth / 2} y={370}
                      textAnchor="middle"
                      fill="var(--color-sage)" fontSize="12"
                      opacity={chartBuild > 0.3 ? 1 : 0}>
                  {d.label}
                </text>
                {/* Value */}
                <text x={x + barWidth / 2} y={345 - barH * easedBuild}
                      textAnchor="middle"
                      fill={isLast ? 'var(--accent-coral)' : 'var(--color-cream)'}
                      fontSize="13" fontWeight={600}
                      opacity={chartBuild > 0.5 ? 1 : 0}>
                  {d.note}
                </text>
              </g>
            )
          })}
        </svg>
      </AutoScaleContent>
    </section>
  )
}
```

### Line Graph with Path Drawing

```tsx
export default function LineGraphPanel({ progress }: PanelProps) {
  const lineDraw = lerp(progress, 0.08, 0.50, 0, 1)

  const pathD = 'M 50 380 L 150 370 L 250 340 L 350 280 L 450 180 L 550 80 L 650 20'
  const pathLength = 1200

  return (
    <section className="panel panel--dark">
      <AutoScaleContent maxWidth="750px">
        <svg viewBox="0 0 700 420" style={{ width: '100%' }}>
          {/* Grid */}
          {[0, 1, 2, 3, 4].map(i => (
            <line key={i} x1={50} y1={80 + i * 75} x2={670} y2={80 + i * 75}
                  stroke="var(--dark-olive)" strokeWidth={0.5}
                  strokeDasharray="4" opacity={0.5} />
          ))}
          {/* Animated line */}
          <path d={pathD}
                fill="none"
                stroke="var(--sage)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength * (1 - easeOutCubic(lineDraw))} />
        </svg>
      </AutoScaleContent>
    </section>
  )
}
```

### SVG Color Conventions

Always use design system CSS variables in SVG:
```tsx
// Primary data
fill="var(--sage)"              // #D1E7D2
fill="var(--accent-coral)"      // #E07850 — emphasis/highlight

// Line art
stroke="var(--color-cream)"     // #F5F2E8
strokeWidth={2}
fill="none"
strokeLinecap="round"

// Grid / axes
stroke="var(--dark-olive)"      // #474924
strokeWidth={0.5}
strokeDasharray="4"
opacity={0.5}

// Labels in SVG
fill="var(--color-cream)"       // Primary labels
fill="var(--color-sage)"        // Secondary labels
fill="var(--accent-coral)"      // Highlight labels
```

### scrollLength Guidelines

Typical ranges — adjust based on actual content needs:

| Complexity | scrollLength |
|-----------|-------------|
| Single counter + pivot | 3-3.5 |
| Simple bar chart (3-5 bars) | 4 |
| Line graph with annotation | 4 |
| Complex network/flow | 4.5 |
| Multi-stage diagram + text | 4.5-5 |
