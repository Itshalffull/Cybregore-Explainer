// ─── Explainer Metadata ───────────────────────────────────────────────────────
// Structured metadata for each explainer: narrative documentation + search/discovery.

// ─── Search & Discovery ──────────────────────────────────────────────────────

/** Structured tags for filtering and search */
export interface SearchMeta {
  /** Primary topic tags (e.g. "technology", "buddhism", "attention") */
  tags: string[]
  /** Short description for search results / link previews */
  description: string
  /** Target audience descriptors */
  audience?: string[]
  /** Estimated read/scroll time in minutes */
  durationMinutes?: number
  /** Content maturity: general, teen, mature */
  maturity?: 'general' | 'teen' | 'mature'
}

// ─── Narrative Structure ─────────────────────────────────────────────────────

export type NarrativeTone =
  | 'provocative'
  | 'analytical'
  | 'contemplative'
  | 'urgent'
  | 'mythological'
  | 'intimate'
  | 'revelatory'
  | 'confrontational'
  | 'hopeful'

export type NarrativeTrope =
  | 'call-to-adventure'
  | 'the-reveal'
  | 'the-monster'
  | 'cosmic-horror'
  | 'hero-journey'
  | 'mirror'
  | 'embodied-metaphor'
  | 'naming-the-beast'
  | 'mythology-bridge'
  | 'trilogy'
  | 'call-to-action'

export interface Character {
  name: string
  role: 'protagonist' | 'antagonist' | 'narrator' | 'audience' | 'metaphor'
  description: string
}

export interface NarrativeMeta {
  /** Primary message / thesis of the explainer */
  message: string
  /** Supporting sub-messages */
  submessages: string[]
  /** Overall tone(s) — ordered by dominance */
  tone: NarrativeTone[]
  /** Narrative tropes employed */
  tropes: NarrativeTrope[]
  /** Characters / entities in the story */
  characters: Character[]
  /** Central conflict or tension */
  conflict: string
  /** How the narrative arc progresses (e.g. "hook → evidence → naming → anatomy → horror → resolution") */
  arcSummary: string
  /** Named acts or movements within the explainer */
  acts: NarrativeAct[]
}

export interface NarrativeAct {
  name: string
  /** Panel IDs that belong to this act */
  panelIds: string[]
  purpose: string
}

// ─── Per-Panel Metadata ──────────────────────────────────────────────────────

export type PanelNarrativeRole =
  | 'hook'
  | 'evidence'
  | 'transition'
  | 'definition'
  | 'reveal'
  | 'anatomy'
  | 'escalation'
  | 'embodiment'
  | 'mythology'
  | 'climax'
  | 'resolution'
  | 'call-to-action'

export interface PanelMeta {
  /** Unique panel identifier (matches component name or slug) */
  id: string
  /** Human-readable panel title */
  title: string
  /** The panel's role in the narrative arc */
  narrativeRole: PanelNarrativeRole
  /** Key message this panel delivers */
  message: string
  /** How this panel transitions FROM the previous panel */
  transitionIn: string
  /** How this panel sets up the NEXT panel */
  transitionOut: string
  /** Tags specific to this panel (supplements explainer-level tags) */
  tags?: string[]
  /** Key quotes or phrases from this panel */
  keyPhrases?: string[]
}

// ─── Combined Explainer Metadata ─────────────────────────────────────────────

export interface ExplainerMetadata {
  search: SearchMeta
  narrative: NarrativeMeta
  panels: PanelMeta[]
}
