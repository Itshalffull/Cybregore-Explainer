# Architecture: How Metadata Works in This Codebase

## TypeScript Schema (src/types/metadata.ts)

The metadata system has three layers:

```typescript
// ─── Search & Discovery ──────────────────────────────────────────────────
interface SearchMeta {
  tags: string[]                    // Primary topic tags
  description: string               // Short description for previews
  audience?: string[]               // Target audience descriptors
  durationMinutes?: number          // Estimated read/scroll time
  maturity?: 'general' | 'teen' | 'mature'
}

// ─── Narrative Structure ─────────────────────────────────────────────────
type NarrativeTone =
  | 'provocative' | 'analytical' | 'contemplative' | 'urgent'
  | 'mythological' | 'intimate' | 'revelatory' | 'confrontational' | 'hopeful'

type NarrativeTrope =
  | 'call-to-adventure' | 'the-reveal' | 'the-monster' | 'cosmic-horror'
  | 'hero-journey' | 'mirror' | 'embodied-metaphor' | 'naming-the-beast'
  | 'mythology-bridge' | 'trilogy' | 'call-to-action'

interface Character {
  name: string
  role: 'protagonist' | 'antagonist' | 'narrator' | 'audience' | 'metaphor'
  description: string
}

interface NarrativeAct {
  name: string
  panelIds: string[]    // Panel IDs belonging to this act
  purpose: string
}

interface NarrativeMeta {
  message: string           // Central thesis
  submessages: string[]     // Supporting points
  tone: NarrativeTone[]     // Ordered by dominance
  tropes: NarrativeTrope[]  // Narrative devices used
  characters: Character[]   // Entities in the story
  conflict: string          // Central tension
  arcSummary: string        // e.g., "hook → evidence → naming → resolution"
  acts: NarrativeAct[]      // Named movements with panel IDs
}

// ─── Per-Panel Metadata ──────────────────────────────────────────────────
type PanelNarrativeRole =
  | 'hook' | 'evidence' | 'transition' | 'definition' | 'reveal'
  | 'anatomy' | 'escalation' | 'embodiment' | 'mythology'
  | 'climax' | 'resolution' | 'call-to-action'

interface PanelMeta {
  id: string                        // Unique panel identifier
  title: string                     // Human-readable name
  narrativeRole: PanelNarrativeRole // Role in the arc
  message: string                   // Key message this panel delivers
  transitionIn: string              // How it follows the previous panel
  transitionOut: string             // How it sets up the next panel
  tags?: string[]                   // Panel-specific tags
  keyPhrases?: string[]             // Important quotes/phrases
}

// ─── Combined ────────────────────────────────────────────────────────────
interface ExplainerMetadata {
  search: SearchMeta
  narrative: NarrativeMeta
  panels: PanelMeta[]
}
```

## Field-by-Field Guidance

### SearchMeta

- **tags**: 8-15 tags. Include campaign-level tags (e.g., 'dharma', 'wisdom', 'cybregore') plus explainer-specific tags. Think about what someone would search for.
- **description**: 1-2 sentences that work as a link preview, social media card, or search result. Be vivid and specific — not "An explainer about language" but "Language is an alien intelligence that colonized human minds — and it was just the beginning."
- **audience**: Who is this for? Examples: 'general', 'tech-curious', 'contemplative', 'educators', 'skeptics', 'parents', 'practitioners'. Usually 2-4 values.
- **durationMinutes**: Estimate based on panel count. Rough guide: ~1 minute per 2-3 panels. Most explainers are 8-15 minutes.
- **maturity**: 'general' (all ages), 'teen' (may include unsettling imagery or complex themes), 'mature' (graphic content or intense themes).

### NarrativeMeta

- **message**: THE central thesis. This is the soul of the explainer in one bold statement. Bad: "Technology is changing things." Good: "Language is an alien intelligence that colonized human minds and restructured cognition itself — and it was just the beginning."
- **submessages**: 5-15 supporting points that BUILD an argument. Order matters — they should escalate or deepen. Each should be a standalone claim that supports the message. Think of these as the "beats" of the argument.
- **tone**: 3-6 values from NarrativeTone, ordered by dominance. The first tone is the primary "feel" of the explainer.
- **tropes**: 3-8 narrative devices used. 'call-to-action' should almost always be the last trope.
- **characters**: 2-6 entities. Should always include an 'audience' character (the reader), a 'narrator' character (the voice), and at least one 'antagonist' or 'metaphor'. Characters can be abstract entities (e.g., "The Cybregore", "The Demonic Mind").
- **conflict**: The central TENSION. Not just "X is bad" but "X vs Y" — what forces are in opposition? What's at stake? This drives the entire narrative.
- **arcSummary**: Arrow-separated flow matching the act names. E.g., "hook → evidence → naming → anatomy → horror → resolution". Must match your acts.
- **acts**: 5-9 named "movements" in the narrative. Each has a name, empty panelIds (filled by dharma-micro), and a purpose explaining what the act accomplishes.

## How Metadata Files Are Used

1. **File location:** `src/explainers/{slug}-metadata.ts`
2. **Exports:** A single `const` of type `ExplainerMetadata`, default exported
3. **Registration:** Imported in `src/App.tsx` and passed to `ExplainerRouter` as `metadata` property
4. **Stubs:** Explainers can be registered with metadata but NO content component — these are invisible to users but logged in dev console and available via `useStubExplainers()`

## How Panels Work (for storyboarding context)

Each panel is a React component that receives a `progress` prop (0-1 float based on scroll position):

```typescript
interface PanelProps {
  progress: number  // 0 = panel just entered, 1 = panel fully scrolled through
}
```

Panels are wrapped in `<ScrollSection scrollLength={N}>` where N is how many viewport-heights of scrolling the panel occupies (e.g., 3.5 means scrolling 3.5 screen-heights).

Panel types in the existing codebase:
- **Simple text panels** — Dramatic statements with fade-in/out animations
- **Visualization panels** — SVG charts, graphs, animated diagrams
- **Interactive panels** — Multi-stage reveals, simulated feeds, breathing exercises
- **Mythology panels** — Image-heavy with layered text reveals
