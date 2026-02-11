---
name: dharma-macro
description: "Generate high-level narrative metadata (thesis, tone, characters, conflict, act structure) for a Dharma campaign explainer. Use when creating the narrative soul of an explainer from a known idea."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
---

# dharma-macro: Generate Macro Metadata for a Dharma Campaign Explainer

## What This Skill Does

You are creating the high-level narrative metadata for a new scroll-driven explainer
in the Cybregore-Explainer project. This metadata defines the explainer's SOUL —
its thesis, tone, characters, conflict, and act structure — before any panels or
content are created.

## Inputs You Need From the User

1. **Explainer slug** — kebab-case identifier (e.g., `language-demon`, `wisdom-accelerator`).
   This becomes the URL path segment: the explainer will live at `/slug`.
2. **Core thesis** — What is the central message? (1-2 sentences)
3. **Which campaign pillar(s)** — Research Institute (Discover), Mystery School (Design),
   Media Outlet (Distribute), or a combination
4. **Target audience** — Who is this for? (e.g., general, tech-curious, contemplative,
   educators, skeptics, parents)
5. **Key concepts to cover** — What ideas, entities, or arguments should appear?
6. **Desired tone** — Which tones should dominate? (See allowed values below)
7. **Any specific "Flip It" inversions** — Counterintuitive claims the explainer should make

**When running standalone:** If the user doesn't provide all inputs, ask for the
missing ones before proceeding.

**When running in the pipeline** (delegated from dharma-extract): Use the
information from the extraction — the source material package, thesis, pillar,
audience, tone, and concepts. Infer reasonable defaults for anything not
explicitly provided and proceed without stopping to ask.

## Steps

### Step 1: Read the campaign context
Read `.claude/skills/dharma-macro/context/campaign.md` to understand the overall
campaign vision, the three pillars, and the core principles.

### Step 2: Read the metadata schema
Read `.claude/skills/dharma-macro/context/metadata-schema.md` to understand every
field and its constraints.

### Step 3: Read examples
Read `.claude/skills/dharma-macro/context/examples.md` to see how the existing
Cybregore explainer metadata is structured — this is your quality benchmark.

### Step 4: Generate the metadata

Create a new file at `src/explainers/{slug}-metadata.ts` with the following structure:

```typescript
import type { ExplainerMetadata } from '../types/metadata'

const {camelCase}Metadata: ExplainerMetadata = {
  search: {
    tags: [...],           // 8-15 relevant tags
    description: '...',    // 1-2 sentences for link previews
    audience: [...],       // From user input
    durationMinutes: ...,  // Estimate based on complexity (8-15 typical)
    maturity: '...',       // 'general', 'teen', or 'mature'
  },
  narrative: {
    message: '...',        // Central thesis — clear, bold, complete
    submessages: [...],    // 5-15 supporting points that build the argument
    tone: [...],           // 3-6 tones, ordered by dominance
    tropes: [...],         // 3-8 narrative devices
    characters: [...],     // 2-6 entities with roles and descriptions
    conflict: '...',       // The central tension in 1-3 sentences
    arcSummary: '...',     // Arrow-separated flow: "hook → ... → resolution"
    acts: [
      {
        name: '...',       // Human-readable act name
        panelIds: [],      // LEFT EMPTY — dharma-micro will fill these
        purpose: '...',    // What this act accomplishes in the narrative
      },
      // ... more acts (typically 5-9)
    ],
  },
  panels: [],              // LEFT EMPTY — dharma-micro will populate this
}

export default {camelCase}Metadata
```

### Step 5: Validate

Check that:
- [ ] All NarrativeTone values are from the allowed set
- [ ] All NarrativeTrope values are from the allowed set
- [ ] All Character roles are from the allowed set
- [ ] The arcSummary matches the act names
- [ ] submessages build a coherent argument arc
- [ ] The message is bold and specific (not vague)
- [ ] The conflict creates genuine tension
- [ ] Acts have descriptive purposes (not just "introduce X")
- [ ] File exports correctly with proper TypeScript types

### Step 6: Report

Tell the user:
- What file was created
- Summary of the narrative arc
- How many acts were defined
- Remind them to run `dharma-micro` next to storyboard the panels

## Allowed Values Reference

### NarrativeTone
'provocative' | 'analytical' | 'contemplative' | 'urgent' | 'mythological' |
'intimate' | 'revelatory' | 'confrontational' | 'hopeful'

### NarrativeTrope
'call-to-adventure' | 'the-reveal' | 'the-monster' | 'cosmic-horror' |
'hero-journey' | 'mirror' | 'embodied-metaphor' | 'naming-the-beast' |
'mythology-bridge' | 'trilogy' | 'call-to-action'

### Character Roles
'protagonist' | 'antagonist' | 'narrator' | 'audience' | 'metaphor'

## Quality Guidelines

### From the Campaign Principles:
- **Be bold.** The message should be provocative and true. "Get used to making
  controversial true claims."
- **Tell the truth incompletely.** Leave room for curiosity. The explainer should
  feel like opening a door, not reading an encyclopedia.
- **"Flip It" inversions** should feel genuinely surprising, not contrarian for
  its own sake.
- **Unified world.** This explainer must feel like it belongs in the same universe
  as the Cybregore explainer. Shared vocabulary, shared enemy (Moloch/the demonic
  mind), shared hope (wisdom, contemplative practice, the sacred).
- **Enormous epic vision.** "As huge as the picture physics has drawn, it's a small
  part of the picture we're drawing." Think big — gods, ghosts, multidimensional
  realms, cosmic drama.
- **The enemy is the Molochian process** — technology driving social structure without
  wisdom. We need wisdom alongside power.
- **Characters should include "the demonic mind"** as an entity — not a metaphor for
  bad people, but a literal being that uses humans as agents.
