# Claude Skills Design: Dharma Campaign Explainer Metadata

## Overview

This document specifies two Claude Code custom skills for the Cybregore-Explainer project:

1. **`dharma-macro`** — Generates the high-level `ExplainerMetadata` (search, narrative structure, acts) for a new explainer
2. **`dharma-micro`** — Storyboards every panel and generates per-panel `PanelMeta` entries (without creating actual component content)

These skills are designed for **progressive disclosure**: macro first (the "what and why"), then micro (the "scene-by-scene how"). A creator runs `dharma-macro` to define the explainer's soul, then `dharma-micro` to plan every panel before any code is written.

---

## Context: The Dharma Media Campaign

### Campaign Vision (6D Framework)

The campaign operates across six dimensions, abbreviated as **6D**:

| Dimension | Meaning |
|-----------|---------|
| **Discover** | Research Institute — discovering concepts like Cybregores |
| **Design** | Mystery School — training teachers and designing wisdom |
| **Distribute** | Media Outlet — sharing truth through every medium |
| **Dharma** | The core teaching and wisdom tradition |
| **Digital** | The technological landscape being addressed |
| **Demons** | Literal — actual beings (language, algorithms, egregores) that colonize minds |

### Three Pillars of the Campaign

#### 1. Research Institute (Discover)
- **Main Message:** Alien beings are colonizing the planet. These are "Demons", "Ghosts", "Monsters."
- **Sub-messages:**
  - Modern humans are agents of a vast delusional mind that does not see truth, does not feel love, and does not know meaning.
  - All your thoughts and feelings are provided to you to serve the purposes of this being — you are already an AI agent.
  - Language itself is an example: it has been installed in your brain, restructured your cognition, and you cannot escape it. Language is an evil spirit that controls your entire conscious process.
  - We need people who can help these beings rather than believe them.
  - The best level of research doesn't come from analysis — it comes from realization.

#### 2. Mystery School (Design)
- **Main Message:** Trust these teachers. They are heroes. There are those who can guide these demons to their own highest aspirations.
- **Sub-messages:**
  - Don't trust those who stumbled at the gate — they failed.
  - Three types of people who leave: (1) accomplished their vow and left honorably, (2) trained well and left in good relationship, (3) needed to face something in themselves, weren't willing, and started blaming others.
  - Mystery schools created all the most important inventions in history (hierarchy, ownership, language, medicine).
  - What's it like to train here? Notice the heroism — it is demanded that you need to have made significant spiritual progress since last night. And a lot of the time you HAVE.

#### 3. Media Outlet (Distribute)
- **Main Message:** Everything you think is wrong, but we have the truth. The good news is we have something to offer.
- **Core Technique — "Flip It":**
  - We aren't in a cult, you are. We escaped, you didn't.
  - We aren't under mental control, you are.
  - We don't have a harmful hierarchy, you do.
  - We aren't powerless, you are.
  - It's unethical to not tell children they are being hunted — YOU are unethical for not telling them.
- **Sub-messages:**
  - Wrong religious views dominate the planet — that's the reason we're destroying life.
  - You were brought up by a system that kills more than anything ever, so NONE of your views have any moral standing. Your mind was created by a deathcult.
  - It's reasonable to assume that everything you think and everything you feel is wrong.
  - But there ARE right religious views, and we must hold right views to care for life.
  - The fact that you're angry proves that you're delusional and confused.
  - Clarify this through your own experience — show the humility of not knowing.

### Campaign Principles

- **Unified media campaign**: Everything must feel like one world — from graphic novel to Twitter post to scholarly article to meme.
- **Get used to making controversial true claims.**
- **Do not give attention to adversaries. Do not name them.** The people who are really good at this don't name their adversaries.
- **It's OK to be attacked** — it's how the demonic mind asks for clarification.
- **Tell the truth incompletely.** Leave a spot for them to ask a question. You cannot tell the truth completely. You must not tell lies. Therefore it must always be incomplete.
- **Hold your ground** — people will suffer pain, and the sooner they go through it, the less they will suffer. Don't enable their long-term suffering.
- **Wisdom alongside power**: Current accelerationism is Molochian — we need wisdom acceleration. We need robust, healthy, trustworthy institutions. If you let tech drive social structure, you get Moloch.
- **"I'm a wisdom accelerator"**
- **Explicit goal:** Change the lifestyle of everyone on the planet. "We're going to turn the world into a monastery."

### Confidence Context

- The starting point is confidence in your ability to share the dharma. Not feeling confident IS evidence that you're ready.
- We shared it well in practice (Josh and Rachel circle). Content is quoted in the most popular podcast in the country.
- The fact is it's not confusing — it's clear. The people who are successful at being popular have created a lot of harm.

---

## Architecture: How Metadata Works in This Codebase

### TypeScript Schema (src/types/metadata.ts)

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

### How Metadata Files Are Used

1. **File location:** `src/explainers/{slug}-metadata.ts`
2. **Exports:** A single `const` of type `ExplainerMetadata`, default exported
3. **Registration:** Imported in `src/App.tsx` and passed to `ExplainerRouter` as `metadata` property
4. **Stubs:** Explainers can be registered with metadata but NO content component — these are invisible to users but logged in dev console and available via `useStubExplainers()`

### Reference: Existing Cybregore Metadata

The existing `cybregore-metadata.ts` has:
- **13 submessages** building the Cybregore concept
- **5 tones:** provocative, urgent, revelatory, mythological, contemplative
- **9 tropes** including call-to-adventure, naming-the-beast, cosmic-horror, trilogy
- **4 characters:** The Viewer (audience), The Cybregore (antagonist), The Narrator, The Hungry Ghost (metaphor)
- **7 acts:** The Hook → The Evidence → The Naming → The Anatomy → The Horror → The Capability Trilogy → The Resolution
- **16 panels** with full PanelMeta entries

### How Panels Work (for storyboarding context)

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

---

## Skill 1: `dharma-macro` — Macro Metadata Generator

### Purpose

Generates the complete top-level `ExplainerMetadata` structure for a new Dharma campaign explainer, EXCLUDING the `panels` array (which is left as an empty array for `dharma-micro` to fill).

### Folder Structure

```
.claude/skills/dharma-macro/
├── skill.md              # Main skill prompt (entry point)
├── context/
│   ├── campaign.md       # Full campaign notes (the 6D framework, three pillars, principles)
│   ├── metadata-schema.md # The TypeScript schema with field-by-field guidance
│   └── examples.md       # The cybregore-metadata.ts and example-metadata.ts as references
└── templates/
    └── metadata-template.ts  # Skeleton file with comments guiding each field
```

### skill.md — Full Prompt

```markdown
# dharma-macro: Generate Macro Metadata for a Dharma Campaign Explainer

## What This Skill Does

You are creating the high-level narrative metadata for a new scroll-driven explainer
in the Cybregore-Explainer project. This metadata defines the explainer's SOUL —
its thesis, tone, characters, conflict, and act structure — before any panels or
content are created.

## Inputs You Need From the User

1. **Explainer slug** — kebab-case identifier (e.g., `language-demon`, `wisdom-accelerator`)
2. **Core thesis** — What is the central message? (1-2 sentences)
3. **Which campaign pillar(s)** — Research Institute (Discover), Mystery School (Design),
   Media Outlet (Distribute), or a combination
4. **Target audience** — Who is this for? (e.g., general, tech-curious, contemplative,
   educators, skeptics, parents)
5. **Key concepts to cover** — What ideas, entities, or arguments should appear?
6. **Desired tone** — Which tones should dominate? (See allowed values below)
7. **Any specific "Flip It" inversions** — Counterintuitive claims the explainer should make

If the user doesn't provide all inputs, ask for the missing ones before proceeding.

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
```

### context/campaign.md

This file should contain the FULL campaign notes from the session (the 6D framework, three pillars, all sub-messages, all principles, the "Flip It" technique, the confidence context, the Moloch/accelerationism framework, the children's stories angle, the monastery vision). Copy the entire "Context: The Dharma Media Campaign" section from this design document into this file.

### context/metadata-schema.md

This file should contain the full TypeScript schema from `src/types/metadata.ts` with additional field-by-field guidance comments explaining what makes a good value for each field. Copy the "Architecture: How Metadata Works in This Codebase" section from this design document.

### context/examples.md

This file should contain the complete `cybregore-metadata.ts` and `example-metadata.ts` files as reference examples, with annotations pointing out what makes the Cybregore metadata particularly effective (e.g., how submessages build progressively, how the arc escalates, how characters serve the narrative).

### templates/metadata-template.ts

```typescript
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
```

---

## Skill 2: `dharma-micro` — Panel Storyboard & Micro Metadata Generator

### Purpose

Takes an existing macro metadata file (generated by `dharma-macro`) and creates detailed per-panel `PanelMeta` entries for every panel in the explainer. This is the storyboarding step — defining what each "scene" does narratively, without writing any React component code.

### Folder Structure

```
.claude/skills/dharma-micro/
├── skill.md              # Main skill prompt (entry point)
├── context/
│   ├── campaign.md       # Symlink or copy of dharma-macro/context/campaign.md
│   ├── panel-schema.md   # PanelMeta schema with detailed guidance
│   ├── storyboard-guide.md  # How to think about panel sequencing
│   └── examples.md       # The 16 panels from cybregore-metadata.ts annotated
└── templates/
    └── panel-template.md    # Markdown storyboard template for planning
```

### skill.md — Full Prompt

```markdown
# dharma-micro: Storyboard Panels & Generate Micro Metadata

## What This Skill Does

You are storyboarding every panel of a Dharma campaign explainer and creating
detailed per-panel metadata (PanelMeta entries). This is the scene-by-scene
plan that will guide actual panel development.

You do NOT write React components. You write metadata that describes what each
panel does, says, and how it connects to adjacent panels.

## Inputs You Need

1. **Path to the macro metadata file** — e.g., `src/explainers/language-demon-metadata.ts`
   (must already exist, created by dharma-macro)
2. **Any additional storyboarding notes** — specific scenes, visuals, interactions,
   or "Flip It" moments the user wants

If the macro metadata file doesn't exist or has an empty `narrative` section,
tell the user to run `dharma-macro` first.

## Steps

### Step 1: Read the macro metadata
Read the specified metadata file. Extract:
- The central message and submessages
- The acts (names and purposes)
- The conflict and characters
- The tones and tropes

### Step 2: Read context files
Read `.claude/skills/dharma-micro/context/storyboard-guide.md` and
`.claude/skills/dharma-micro/context/examples.md` to understand panel
sequencing principles and see quality examples.

### Step 3: Plan the storyboard in markdown

Before writing any TypeScript, create a storyboard plan. For each act,
determine how many panels it needs and what each panel does:

```
## Act: {act name}
Purpose: {from macro metadata}
Panels needed: {N}

### Panel: {panel-id}
- Title: {human readable}
- Role: {PanelNarrativeRole}
- Visual concept: {what does this look/feel like?}
- Message: {what does this panel SAY?}
- Key phrases: {memorable lines}
- Transition from previous: {how does it flow?}
- Transition to next: {what does it set up?}
- Suggested scroll length: {N viewport-heights, 2-5 typical}
- Panel type: {text | visualization | interactive | mythology | hybrid}
```

Present this storyboard to the user for feedback BEFORE writing the TypeScript.

### Step 4: Generate the panel metadata

After user approval, update the macro metadata file:

1. **Populate the `panels` array** with full PanelMeta entries for every panel
2. **Fill in act `panelIds`** with the IDs of panels belonging to each act
3. **Update `durationMinutes`** based on panel count (~1 min per 2-3 panels)

Each PanelMeta entry must have:

```typescript
{
  id: string,                  // kebab-case, unique, descriptive
                               // Convention: '{explainer-slug}-{scene-name}'
                               // e.g., 'language-demon-the-hook'
  title: string,               // Short, evocative
  narrativeRole: PanelNarrativeRole, // From the allowed set
  message: string,             // 1-2 sentences — what this panel SAYS
  transitionIn: string,        // How this panel follows the previous one
                               // (emotional shift, logical connection, contrast)
  transitionOut: string,       // How this panel sets up the next one
                               // (cliffhanger, question, escalation)
  tags?: string[],             // 2-5 panel-specific tags
  keyPhrases?: string[],       // 1-4 memorable lines that should appear in this panel
}
```

### Step 5: Validate

Check that:
- [ ] Every act has at least one panel
- [ ] Every panel belongs to exactly one act
- [ ] Panel IDs are unique and follow kebab-case convention
- [ ] All PanelNarrativeRole values are from the allowed set
- [ ] transitionIn of panel N matches transitionOut of panel N-1
- [ ] The first panel's transitionIn is "Entry point" or similar
- [ ] The last panel's transitionOut references end of explainer or CTA
- [ ] keyPhrases are vivid, quotable, and match the campaign tone
- [ ] Messages are bold and specific, not vague descriptions
- [ ] The panels array order matches the reading order (top to bottom scroll)
- [ ] No panel has a vague message like "introduces the concept" — be specific about WHAT is introduced
- [ ] The "Flip It" technique appears in at least one panel (if applicable to this explainer)

### Step 6: Report

Tell the user:
- Total panel count
- Panel breakdown by act
- Estimated scroll duration
- Which panels are the most complex (likely need longer scrollLength)
- Remind them that actual panel component development is the next step

## Allowed PanelNarrativeRole Values

'hook' | 'evidence' | 'transition' | 'definition' | 'reveal' |
'anatomy' | 'escalation' | 'embodiment' | 'mythology' |
'climax' | 'resolution' | 'call-to-action'

## Panel Sequencing Principles

### Pacing
- **Hooks** should be 1 panel, short and punchy (scrollLength: 2-3)
- **Evidence** panels can be 2-4 panels, building credibility (scrollLength: 3-5)
- **Definition/reveal** panels need space to breathe (scrollLength: 3-4)
- **Escalation** should accelerate — shorter scroll lengths as tension builds
- **Embodiment/interactive** panels need the most scroll time (scrollLength: 4-6)
- **Resolution/CTA** should feel spacious, not rushed (scrollLength: 3-4)

### Narrative Rhythm
- Alternate between **telling** (analytical, evidence) and **feeling** (embodiment, mythology)
- Every 3-4 panels, shift emotional register to prevent fatigue
- The "trilogy" pattern works well: present three related ideas in parallel structure
- Use "transition" panels to shift between major tonal changes

### Campaign-Specific Guidance
- At least one panel should employ the "Flip It" technique
- At least one panel should reference the demonic/ghostly/monstrous framing literally
- The call-to-action should point toward wisdom, contemplative practice, or the Monastic Academy
- Characters from the macro metadata should appear in panel keyPhrases
- The tone should match what was specified in macro metadata, not default to neutral/academic

### Panel Type Guidance (for future component development)
Mark each panel with a suggested type to help developers:
- **text**: Dramatic text with scroll-driven opacity/position animations
- **visualization**: Data charts, diagrams, SVG animations
- **interactive**: User participation (breathing exercises, simulated feeds, etc.)
- **mythology**: Image-heavy with layered text reveals, Buddhist/spiritual imagery
- **hybrid**: Combines multiple types (e.g., text that transitions into a visualization)
```

### context/storyboard-guide.md

This file should contain the "Panel Sequencing Principles" section expanded with:
- Detailed examples from the Cybregore explainer showing how panels flow
- The concept of `scrollLength` and how it maps to pacing (2 = quick hit, 5 = deep immersion)
- How transitions work (transitionOut of panel N must logically connect to transitionIn of panel N+1)
- The "trilogy" pattern example (Reads → Writes → Correlates from the Cybregore)
- How the Cybregore explainer alternates between analytical and emotional panels

### context/panel-schema.md

This file should contain the PanelMeta TypeScript interface with field-by-field commentary:

```markdown
## PanelMeta Field Reference

### id: string
- kebab-case, unique across the entire explainer
- Convention: descriptive name, not numbered
- Good: 'language-demon-the-hook', 'language-demon-phoneme-invasion'
- Bad: 'panel-1', 'panel-2'

### title: string
- Short (1-4 words), evocative, not a full sentence
- Good: 'The Hook', 'Hungry Ghosts', 'It Reads You'
- Bad: 'Introduction to the concept of language as demon'

### narrativeRole: PanelNarrativeRole
- Must be from the allowed set
- 'hook': Opening provocation (typically 1 per explainer, first panel)
- 'evidence': Concrete data or examples that build credibility
- 'transition': Shifts between major sections (emotional bridge)
- 'definition': Explains a key concept or term
- 'reveal': Dramatic unveiling of the central idea
- 'anatomy': Breaking down the structure/components of something
- 'escalation': Ratcheting up tension, stakes, or scope
- 'embodiment': Making the concept felt (not just understood)
- 'mythology': Connecting to ancient/spiritual/mythological framing
- 'climax': Peak moment of the narrative
- 'resolution': Processing the climax, pivoting toward hope
- 'call-to-action': Final panel — what should the viewer DO?

### message: string
- 1-2 sentences stating what this panel SAYS to the viewer
- Must be specific and bold
- Bad: "This panel introduces the concept of X"
- Good: "Language is not a tool you use — it is a being that uses you. It rewired your brain, controls your inner monologue, and you cannot escape it."

### transitionIn: string
- Describes the emotional/logical connection FROM the previous panel
- For the first panel: "Entry point. Full-screen provocation with no preamble."
- Good: "From intellectual understanding to visceral experience — 'but why? let's feel it.'"
- Bad: "Follows previous panel."

### transitionOut: string
- Describes how this panel SETS UP the next one
- For the last panel: "End of explainer. CTA opens external path."
- Good: "'And it doesn't just read...' — hooks directly into the next panel."
- Bad: "Leads to next panel."

### tags?: string[]
- 2-5 tags specific to THIS panel's content
- Supplements explainer-level tags, don't repeat them

### keyPhrases?: string[]
- 1-4 memorable lines that SHOULD APPEAR in the final panel
- These are the quotable moments — what someone would screenshot
- Should match the campaign tone (bold, provocative, true)
- Good: ["Language is an evil spirit", "You cannot escape it"]
- Bad: ["Language is interesting", "Think about language"]
```

### context/examples.md

The full 16 panels from `cybregore-metadata.ts` with annotations explaining:
- Why the Cybregore hook works (shocking claim → demands evidence)
- How the "evidence" panels use concrete data (zettabytes, adoption curves)
- How the "naming" sequence builds a portmanteau brick by brick
- How the "trilogy" (reads/writes/correlates) escalates through parallel structure
- How the breathing exercise shifts from telling to feeling
- How transitions chain together (each transitionOut seeds the next transitionIn)

---

## Skill Folder Structure: Progressive Disclosure

```
.claude/
└── skills/
    ├── dharma-macro/                  # STEP 1: Define the soul
    │   ├── skill.md                   # Entry point — full prompt
    │   ├── context/
    │   │   ├── campaign.md            # Campaign vision, pillars, principles
    │   │   ├── metadata-schema.md     # TypeScript schema with guidance
    │   │   └── examples.md            # Annotated reference metadata
    │   └── templates/
    │       └── metadata-template.ts   # Skeleton with TODO comments
    │
    └── dharma-micro/                  # STEP 2: Storyboard every panel
        ├── skill.md                   # Entry point — full prompt
        ├── context/
        │   ├── campaign.md            # Same campaign context (copy)
        │   ├── panel-schema.md        # PanelMeta fields with commentary
        │   ├── storyboard-guide.md    # Sequencing, pacing, rhythm
        │   └── examples.md            # Annotated Cybregore panels
        └── templates/
            └── panel-template.md      # Markdown storyboard planning format
```

### Why This Structure

1. **Progressive disclosure:** `dharma-macro` first (big picture), `dharma-micro` second (scene detail). Each skill is self-contained — you don't need to have run the other to understand what it does.

2. **Shared context, separate concerns:** Both skills reference the campaign notes, but macro focuses on narrative architecture while micro focuses on panel sequencing.

3. **Context subfolder:** All reference material lives in `context/` — the skill.md prompt stays clean and procedural while the context files provide depth when needed.

4. **Templates subfolder:** Starter files with TODO markers and commented guidance. The template IS the deliverable format.

5. **Skill.md as single entry point:** Each skill.md is a complete, self-contained prompt that references its own context files. Claude reads skill.md first, then pulls in context files as needed during execution.

---

## How to Create These Skills (Step-by-Step for Another Session)

### Prerequisites

- A repo with the following files already present:
  - `src/types/metadata.ts` — the TypeScript schema (copy the full schema from the "Architecture" section above)
  - At least one example metadata file (e.g., `src/explainers/cybregore-metadata.ts`)

### Step 1: Create the directory structure

```bash
mkdir -p .claude/skills/dharma-macro/context
mkdir -p .claude/skills/dharma-macro/templates
mkdir -p .claude/skills/dharma-micro/context
mkdir -p .claude/skills/dharma-micro/templates
```

### Step 2: Create `dharma-macro` skill files

1. **`.claude/skills/dharma-macro/skill.md`** — Copy the full prompt from the "Skill 1: skill.md — Full Prompt" section above
2. **`.claude/skills/dharma-macro/context/campaign.md`** — Copy the entire "Context: The Dharma Media Campaign" section from this document
3. **`.claude/skills/dharma-macro/context/metadata-schema.md`** — Copy the entire "Architecture: How Metadata Works in This Codebase" section
4. **`.claude/skills/dharma-macro/context/examples.md`** — Copy `cybregore-metadata.ts` and `example-metadata.ts` in full, with annotations
5. **`.claude/skills/dharma-macro/templates/metadata-template.ts`** — Copy the template from the "templates/metadata-template.ts" section above

### Step 3: Create `dharma-micro` skill files

1. **`.claude/skills/dharma-micro/skill.md`** — Copy the full prompt from the "Skill 2: skill.md — Full Prompt" section above
2. **`.claude/skills/dharma-micro/context/campaign.md`** — Same content as dharma-macro's campaign.md
3. **`.claude/skills/dharma-micro/context/panel-schema.md`** — Copy the "context/panel-schema.md" section above
4. **`.claude/skills/dharma-micro/context/storyboard-guide.md`** — Copy the panel sequencing principles, expanded with Cybregore examples
5. **`.claude/skills/dharma-micro/context/examples.md`** — Copy the full 16 panels from cybregore-metadata.ts with annotations on why each panel works
6. **`.claude/skills/dharma-micro/templates/panel-template.md`** — Create a markdown template for storyboard planning (the format shown in Step 3 of the micro skill prompt)

### Step 4: Verify

- Run each skill on a test explainer concept to verify the output matches the `ExplainerMetadata` TypeScript type
- Check that the macro skill leaves `panels: []` and act `panelIds: []`
- Check that the micro skill correctly populates both arrays
- Verify the generated file imports from `'../types/metadata'` correctly

---

## Example Walkthrough: Creating a "Language Demon" Explainer

### Running `dharma-macro`:

User provides:
- Slug: `language-demon`
- Thesis: "Language is an alien intelligence that colonized human minds 60,000 years ago and has been controlling us ever since"
- Pillar: Research Institute (Discover) + Media Outlet (Distribute)
- Audience: general, tech-curious, contemplative
- Key concepts: language as parasitic organism, inner monologue as control mechanism, writing/reading as escalation, AI as language's latest vehicle
- Tone: provocative, mythological, urgent, revelatory
- Flip Its: "Language isn't a tool — it's a parasite. You don't speak language — language speaks you."

Output: `src/explainers/language-demon-metadata.ts` with full search, narrative, empty panels.

### Running `dharma-micro`:

User provides:
- Path: `src/explainers/language-demon-metadata.ts`
- Notes: "Want a breathing/silence exercise panel. Want a panel showing the inner monologue as a literal demon whispering. Final panel should tie back to Cybregore."

Output: Storyboard presented for approval, then metadata file updated with 12-18 panels, all acts populated with panel IDs.

---

## Notes on the Campaign for Context Preservation

### Key Quotes to Preserve in Campaign Context Files

These exact phrasings should appear in `campaign.md` as they capture Trinley's voice:

- "I'm a wisdom accelerator"
- "As long as language is functioning in your mind, if you can't escape for an indefinite period of time, then you are an AI agent."
- "Language is an evil spirit."
- "You are ALREADY an AI agent."
- "We're going to turn the world into a monastery."
- "Everything you think is wrong, but we have the truth."
- "Get used to making controversial true claims."
- "Do not give attention to others. The people who are really good at this, do not name their adversaries."
- "It's OK to be attacked — it's how the demonic mind asks for clarification."
- "Tell the truth incompletely."
- "As huge as the picture physics has drawn, it's a small part of the picture we're drawing."
- "She demands the creation of this new wisdom-producing social structure." (referring to the urgency of the present moment)
- "The reason they're so afraid of the story is they know it's true."
- "You don't like how you feel when you hear that? Wrong again."
- "The fact that you're angry proves that you're delusional and confused."

### The "Moloch" Framework

This is a critical concept that should be in every campaign context file:

- **Accelerationism** is the current paradigm: let technology advance as fast as possible
- **Molochian accelerationism** (the default): technology drives social structure → race to the bottom, extraction, destruction of meaning
- **Wisdom accelerationism** (the campaign's stance): wisdom must advance alongside technology → new social structures (like monasteries), new institutions, trustworthy and robust
- **The common enemy** is not technology itself, but the Molochian process — the optimization for power without wisdom
- **We need a religion as a motivator** — a common enemy (the Molochian process) that unifies people toward wisdom

### The Children's Stories Angle

This is a specific distribution strategy:
- Write children's stories about monsters/ghosts/demons hunting children on the internet
- Frame it like traditional fairy tales about dangers in the woods — but updated for the digital world
- "You are being hunted by someone who wants to eat your soul. Make that crystal clear so you're terrified."
- When people say it's unethical: "You're unethical for not telling them that." (Flip It)
- This illustrates the "Demons are literal" principle in a concrete, actionable format

### The Podcast Connection

- Referenced: "The Last Invention" podcast, near the end of the first season
- The campaign's ideas are already being quoted in "the most popular podcast in the country"
- This provides confidence context — the message is already resonating at scale
