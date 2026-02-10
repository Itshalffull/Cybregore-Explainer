import type { ExplainerMetadata } from '../types/metadata'

// TODO: Replace {CONST_NAME} with camelCase version of slug
// TODO: Fill in all fields following the guidance in metadata-schema.md
// TODO: Leave panels array empty — dharma-micro will populate it
// TODO: Leave act panelIds empty — dharma-micro will populate them

const {CONST_NAME}Metadata: ExplainerMetadata = {
  // ─── Search & Discovery ──────────────────────────────────────────────────
  search: {
    tags: [
      // 8-15 tags. Include campaign-level tags (e.g., 'dharma', 'wisdom')
      // plus explainer-specific tags.
    ],
    description:
      // 1-2 sentences. Should work as a link preview or search result.
      // Be vivid and specific, not generic.
      '',
    audience: [
      // Who is this for? Examples: 'general', 'tech-curious', 'contemplative',
      // 'educators', 'skeptics', 'parents', 'practitioners'
    ],
    durationMinutes: 0, // Estimate: ~1 min per 2-3 panels
    maturity: 'teen',   // 'general' | 'teen' | 'mature'
  },

  // ─── Narrative Structure ─────────────────────────────────────────────────
  narrative: {
    message:
      // THE central thesis. Bold. Specific. Not vague.
      // Bad: "Technology is changing things."
      // Good: "Language is an alien intelligence that colonized human minds
      //        and restructured cognition itself — and it was just the beginning."
      '',
    submessages: [
      // 5-15 supporting points that BUILD an argument.
      // Each should be a standalone claim that supports the message.
      // Order matters — they should escalate or deepen.
    ],
    tone: [
      // 3-6 values from NarrativeTone, ordered by dominance.
      // First tone = primary feel of the explainer.
    ],
    tropes: [
      // 3-8 values from NarrativeTrope.
      // 'call-to-action' should almost always be last.
    ],
    characters: [
      // 2-6 entities. Should always include:
      // - An 'audience' character (the reader/viewer)
      // - A 'narrator' character (the voice)
      // - At least one 'antagonist' or 'metaphor'
      // {
      //   name: '...',
      //   role: 'protagonist' | 'antagonist' | 'narrator' | 'audience' | 'metaphor',
      //   description: '...',
      // },
    ],
    conflict:
      // The central TENSION. Not just "X is bad" but "X vs Y" —
      // what forces are in opposition? What's at stake?
      '',
    arcSummary:
      // Arrow-separated flow of the narrative.
      // E.g., 'hook → evidence → naming → anatomy → horror → resolution'
      // Must match your act names.
      '',
    acts: [
      // 5-9 acts. Each is a named "movement" in the narrative.
      // Leave panelIds as empty arrays — dharma-micro fills them.
      // {
      //   name: 'The Hook',
      //   panelIds: [],
      //   purpose: 'Why this act exists in the narrative.',
      // },
    ],
  },

  // ─── Per-Panel Metadata ──────────────────────────────────────────────────
  // LEFT EMPTY — run dharma-micro to populate this.
  panels: [],
}

export default {CONST_NAME}Metadata
