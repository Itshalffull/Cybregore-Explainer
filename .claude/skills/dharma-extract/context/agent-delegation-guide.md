# Agent Delegation Guide: Orchestrating Macro and Micro Skills

## Overview

After extracting and approving explainer ideas, you delegate each idea to a
Task agent that runs both the dharma-macro and dharma-micro skills sequentially.
This guide provides the exact delegation pattern.

## Agent Architecture

Each approved idea gets its own Task agent. The agent:
1. Receives the full context needed to work autonomously
2. Runs the dharma-macro workflow (creates narrative metadata)
3. Runs the dharma-micro workflow (storyboards panels and populates metadata)
4. Reports back with the completed metadata file

## The Agent Prompt Structure

Each agent prompt MUST contain these sections in order:

### Section 1: Role and Mission

```
You are creating a complete explainer metadata file for the Dharma Media Campaign.
You will run two skills in sequence:
1. dharma-macro: Generate the high-level narrative metadata
2. dharma-micro: Storyboard panels and populate per-panel metadata

You must complete BOTH skills before you are done. The output is a single
TypeScript metadata file with fully populated search, narrative, and panels sections.
```

### Section 2: The Idea

Include the refined idea details:
- Slug
- Core thesis
- Campaign pillar(s)
- Target audience
- Suggested tones
- Key concepts
- "Flip It" inversions
- Emotional arc sketch

### Section 3: Source Material Package

Include the curated source excerpts, quotes, data points, metaphors, and
inversions relevant to this specific idea. This grounds the agent's work
in the original content.

### Section 4: Campaign Context

Include the full campaign context (from campaign.md). The agent needs to
understand the 6D framework, three pillars, campaign principles, Moloch
framework, and key quotes. Paste the full content — do not reference a file
path, because the agent may not have access to the same file system context.

### Section 5: Metadata Schema

Include the full metadata schema (from the dharma-macro context). The agent
needs to know every type, interface, and field constraint. Paste the full
content inline.

### Section 6: Macro Skill Instructions

Adapt the dharma-macro skill.md instructions for autonomous execution:
- The agent should NOT ask for user input — all inputs are provided above
- The agent should create the metadata file at `src/explainers/{slug}-metadata.ts`
- The agent should follow all validation checks
- The agent should leave panels array empty and act panelIds empty

### Section 7: Examples and Quality Benchmarks

Include the Cybregore metadata example (from the dharma-macro examples.md) so the
agent has a quality reference. The agent should match or exceed this quality level.

### Section 8: Micro Skill Instructions

Adapt the dharma-micro skill.md instructions for autonomous execution:
- The agent should NOT present a storyboard for approval — proceed directly
- The agent should read the file it just created in the macro step
- The agent should populate the panels array with full PanelMeta entries
- The agent should fill in act panelIds
- The agent should update durationMinutes
- The agent should follow all validation checks

### Section 9: Panel Schema and Storyboard Guide

Include the panel schema (from dharma-micro context) and storyboard guide
so the agent understands pacing, narrative rhythm, and panel sequencing.

Include the annotated panel examples from the Cybregore explainer so the
agent has a quality reference for panel metadata.

### Section 10: Final Validation Checklist

```
Before reporting completion, validate:
- [ ] File exists at src/explainers/{slug}-metadata.ts
- [ ] All NarrativeTone values are from the allowed set
- [ ] All NarrativeTrope values are from the allowed set
- [ ] All Character roles are from the allowed set
- [ ] All PanelNarrativeRole values are from the allowed set
- [ ] arcSummary matches act names
- [ ] Every act has at least one panel
- [ ] Every panel belongs to exactly one act
- [ ] Panel IDs are unique and kebab-case
- [ ] Transitions chain properly
- [ ] At least one "Flip It" panel
- [ ] At least one mythology/demon-framing panel
- [ ] Call-to-action points toward wisdom/practice
- [ ] keyPhrases are bold, quotable, campaign-aligned
- [ ] Source material excerpts are reflected in panel messages and keyPhrases
- [ ] File exports correctly with proper TypeScript types
```

## Prompt Assembly Example

Here's how a complete agent prompt looks in structure:

```
You are creating a complete explainer metadata file for the Dharma Media Campaign.
[... role and mission ...]

## The Idea
Slug: language-demon
Thesis: "Language is not a tool humanity invented — it is an alien intelligence
that invaded human minds..."
[... full idea details ...]

## Source Material
The following excerpts from the source talk are relevant to this explainer:
[... curated quotes and passages ...]

## Campaign Context
[... full campaign.md content pasted inline ...]

## Metadata Schema
[... full metadata-schema.md content pasted inline ...]

## Step 1: Generate Macro Metadata (dharma-macro)
Create the file at src/explainers/language-demon-metadata.ts
[... adapted macro instructions ...]

## Quality Reference: Cybregore Metadata
[... full examples.md content pasted inline ...]

## Step 2: Storyboard Panels (dharma-micro)
Now read the file you just created and populate the panels array.
[... adapted micro instructions ...]

## Panel Schema and Storyboard Guide
[... full panel-schema.md and storyboard-guide.md content pasted inline ...]

## Panel Examples Reference
[... full dharma-micro examples.md content pasted inline ...]

## Final Validation
[... checklist ...]
```

## Parallel vs Sequential Execution

### Parallel (default when 2+ ideas)
Launch all agent Task calls in a single message. This maximizes throughput.
Each agent works independently on its own explainer.

**Advantages:**
- Faster overall completion
- No bottleneck between ideas

**When to use:**
- User approved multiple ideas
- Ideas are independent (don't reference each other)

### Sequential
Launch one agent at a time, waiting for completion before starting the next.

**When to use:**
- User explicitly requested sequential execution
- Ideas build on each other (rare, but possible)
- System resource constraints

## Error Handling

If an agent fails or produces incomplete output:
1. Report the failure to the user
2. Show what was produced (partial file, error messages)
3. Offer to re-run that specific idea
4. Do NOT retry automatically without user approval

## Post-Delegation Reporting

After all agents complete, provide a consolidated report:

```
## Extraction Results

### Ideas Extracted: {N} from {source count} source(s)
### Ideas Approved: {N}
### Explainers Created: {N}

| Explainer | Slug | Acts | Panels | Duration | File |
|-----------|------|------|--------|----------|------|
| {title} | {slug} | {N} | {N} | {N} min | src/explainers/{slug}-metadata.ts |
| ... | ... | ... | ... | ... | ... |

### Next Steps
- Run `/dharma-micro` on any explainer that needs storyboard refinement
- Run `/create-panel-background` to generate visual assets
- Begin panel component development
```
