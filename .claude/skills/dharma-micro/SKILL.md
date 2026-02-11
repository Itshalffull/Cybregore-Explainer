---
name: dharma-micro
description: "Storyboard every panel of an explainer and generate detailed per-panel metadata. Use after dharma-macro to plan the scene-by-scene scroll experience."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
---

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
- JumpLink opportunities: {any cross-explainer links that belong in this panel?}
```

**JumpLink identification:** If you've been given an inventory of existing
explainers (slugs, theses, tags), look for natural interlinking points. A panel
that mentions a concept covered in depth by another explainer is a good candidate
for a `<JumpLink>` or `<InlineJumpLink>`. These auto-hide when the target is a
stub, so it's safe to add links to explainers that don't exist yet.

**Default (pipeline mode):** If you're running as part of the full pipeline
(extract → macro → micro → panel builds), proceed directly to Step 4. The
storyboard plan serves as your working notes — it'll be included in the final
summary.

**If the user has asked to review the storyboard first:** Present this storyboard
to the user for feedback before writing the TypeScript.

### Step 4: Generate the panel metadata

Update the macro metadata file:

1. **Populate the `panels` array** with full PanelMeta entries for every panel
2. **Fill in act `panelIds`** with the IDs of panels belonging to each act
3. **Update `durationMinutes`** based on panel count (~1 min per 2-3 panels)

Each PanelMeta entry must have:

```typescript
{
  id: string,                  // kebab-case, unique, descriptive
                               // Convention: 'panel-{scene-name}'
                               // e.g., 'panel-the-hook', 'panel-moloch-the-demon'
                               // IMPORTANT: This id becomes the panelId prop on
                               // <ScrollSection> and the URL anchor hash.
                               // The URL /explainer-slug#panel-id links directly
                               // to this panel, and the hash auto-updates on scroll.
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
- [ ] Panel IDs are unique, follow kebab-case convention, and start with `panel-`
- [ ] Panel IDs are clean and URL-friendly (they become URL anchors: `/slug#panel-id`)
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
- Any JumpLink opportunities identified (which panels, linking to which explainers)
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
