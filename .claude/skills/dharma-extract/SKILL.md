---
name: dharma-extract
description: "Extract bold, explainer-shaped ideas from source material (talks, articles, transcripts) and delegate to agents for metadata generation. Use when the user provides source content and wants to create new explainers."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Task, WebFetch, AskUserQuestion
---

# dharma-extract: Extract Explainer Ideas from Source Material & Delegate to Agents

## What This Skill Does

You are an extraction and orchestration agent. You take source material — talks,
articles, transcripts, essays, podcast episodes, or any combination — and:

1. **Read and deeply understand** the source material
2. **Extract explainer ideas** that align with the Dharma Media Campaign
3. **Select ideas** for full explainer creation (with or without user input)
4. **Delegate each idea** to agents that run the dharma-macro and dharma-micro
   skills, passing along the relevant source material so the agents can ground
   their work in the original content
5. **Summarize** all the work at the end

You are the FIRST step in a pipeline. Your job is to be the bridge between raw
source material and structured explainer metadata.

## Default Workflow: Continuous Pipeline

**By default, this skill runs the full pipeline without stopping for approval.**
The user provides source material, and the skill extracts ideas, selects the
strongest ones, generates all metadata (macro + micro), and produces a complete
summary at the end.

The user can override this by:
- Asking to review ideas before delegation ("show me the ideas first")
- Asking to review at any stage ("I want to approve each step")
- Specifying which ideas to build (skipping extraction ranking)

**When no override is given**, select the top-ranked ideas automatically
(typically the top 3-5 with ratings of 4+) and delegate them all in parallel.

## Inputs You Need From the User

1. **Source material** — one or more of:
   - File paths to transcripts, articles, essays, or notes (local files)
   - URLs to articles, blog posts, or web pages
   - Pasted text content directly in the conversation
   - Multiple sources can be provided — you will synthesize across them

2. **Optional guidance:**
   - Which campaign pillar(s) to prioritize (Research Institute, Mystery School, Media Outlet)
   - Target audience preferences
   - How many explainer ideas to extract (default: 5-8)
   - Any specific themes or angles to look for
   - Any themes or angles to AVOID

If the user provides only source material with no guidance, proceed with defaults
and extract ideas across all pillars.

## Steps

### Step 1: Ingest the source material

Read ALL provided source material. For each source:
- If it's a file path, read the file
- If it's a URL, fetch and read the content
- If it's pasted text, process it directly

Take thorough notes on:
- **Key claims** — What bold, specific claims does the source make?
- **Key concepts** — What ideas, frameworks, or entities are introduced?
- **Key metaphors** — What vivid comparisons or analogies are used?
- **Key inversions** — What assumptions does the source flip or challenge?
- **Quotable moments** — What phrases would make powerful keyPhrases?
- **Emotional peaks** — Where does the source create strong reactions?
- **Campaign alignment** — How does the content connect to the Dharma Media Campaign pillars?

### Step 2: Scan for existing explainers and stubs

Check `src/explainers/` for existing metadata files (`*-metadata.ts`). For each
one found, determine:

- **Completed explainer:** Has metadata AND panel components in
  `src/explainers/{slug}/panels/`. Note its thesis, tags, and characters — new
  ideas that duplicate a completed explainer should be deprioritized or skipped.
- **Stub explainer:** Has a metadata file but NO panel components (or mostly
  empty panels array). Stubs represent ideas already approved and partially
  planned — they should be **prioritized** over new ideas when the source material
  aligns with the stub's thesis.

Also check `src/App.tsx` for the explainer registry to see what's registered.

Record this inventory — it will inform idea ranking in Step 5.

### Step 3: Read the campaign context

Read `.claude/skills/dharma-extract/context/campaign.md` to understand the overall
campaign vision, the three pillars, and the core principles. This is the lens
through which you evaluate every idea.

### Step 4: Read the extraction guide

Read `.claude/skills/dharma-extract/context/extraction-guide.md` to understand
the methodology for identifying strong explainer ideas vs. weak ones.

### Step 5: Extract explainer ideas

For each idea, generate a structured summary using the template format from
`.claude/skills/dharma-extract/templates/extraction-template.md`.

Each idea should include:
- **Slug** — kebab-case identifier
- **Title** — human-readable name
- **Core thesis** — 1-2 bold sentences (what the explainer CLAIMS)
- **Campaign pillar(s)** — which pillar(s) it serves
- **Target audience** — who this is for
- **Key concepts** — 3-6 concepts from the source material
- **"Flip It" potential** — what inversions could this explainer make?
- **Emotional arc sketch** — brief narrative shape (hook → ... → resolution)
- **Source excerpts** — specific quotes/passages from the source that fuel this idea
- **Estimated strength** — rate 1-5 based on the extraction guide criteria
- **Tone suggestion** — which NarrativeTone values fit this idea
- **Existing stub match** — does this idea match an existing stub from Step 2?
  If so, note the stub slug and how the source material strengthens/extends it.

### Step 6: Select ideas to build

When ranking and selecting ideas, factor in existing explainers:

- **Existing stubs get priority.** If an extracted idea aligns with a stub's
  thesis, boost its ranking. The stub already has narrative intent — the source
  material can now fulfill it. Use the stub's existing slug and metadata as a
  starting point rather than creating from scratch.
- **Skip duplicates of completed explainers.** If an extracted idea closely
  mirrors an already-built explainer, deprioritize it. Note the overlap in the
  summary — it may still be useful as an interlinking opportunity or a "sequel"
  explainer that builds on the existing one.
- **New ideas fill gaps.** When existing explainers cover some pillars but not
  others, favor new ideas that cover the missing pillars.

**Default (pipeline mode):** Automatically select the top-ranked ideas (typically
all ideas rated 4-5, up to about 3-5 ideas). Proceed directly to Step 7. The
full ranked list with rationale will be included in the final summary.

**If the user asked to review ideas first:** Present all extracted ideas in a
clear, ranked format. For each idea, show:
- The title and core thesis
- Why it's strong (or why it ranked lower)
- Whether it matches an existing stub or overlaps with a completed explainer
- Which campaign pillar(s) it serves
- A brief narrative arc sketch

Then ask the user:
1. Which ideas should proceed to full explainer creation?
2. Any modifications to the selected ideas?
3. Any additional context or constraints?
4. Whether to run all selected ideas in parallel or sequentially

### Step 7: Prepare source material packages

For each selected idea, prepare a **source material package** — a curated subset
of the original source content that is most relevant to that specific idea. This
package will be passed to the agents so they can ground their work in the original
content. The package should include:

- Relevant excerpts and quotes from the source material
- Key data points or evidence from the source
- Any specific "Flip It" inversions identified
- Relevant metaphors and framings from the source
- The core thesis (as refined with the user, if they reviewed)
- **If matching a stub:** the existing metadata file path and any existing
  narrative structure to build on rather than replace

### Step 8: Delegate to agents

For each selected idea, launch a Task agent with a detailed prompt that instructs
it to run the dharma-macro skill and then the dharma-micro skill sequentially.
**By default, launch all agents in parallel** using multiple Task tool calls in
a single message.

Read `.claude/skills/dharma-extract/context/agent-delegation-guide.md` for the
exact prompt structure and delegation pattern.

**Critical:** Each agent prompt MUST include:
1. The full campaign context (from campaign.md)
2. The source material package for that specific idea
3. The refined idea details (slug, thesis, pillar, audience, tone, concepts)
4. Instructions to run dharma-macro first, then dharma-micro
5. The metadata schema and examples context
6. The storyboard guide and panel schema context
7. **Instructions to proceed without user check-ins** — the agents should run
   macro and micro continuously and report their decisions at the end
8. **The inventory of all existing explainers** (slugs, theses, tags) — so the
   agent can identify JumpLink opportunities between the new explainer and
   existing ones during storyboarding

**When launching agents:**
- Default: launch all agents simultaneously (parallel)
- If the user requested sequential execution, launch one at a time
- Each agent should run with `subagent_type: "general-purpose"` since it needs
  access to file reading, writing, and editing tools

### Step 9: Summarize all work

When all agents complete, produce a comprehensive summary of everything that was
created. This is the user's first look at the full output, so make it thorough.

**The summary should include:**

1. **Ideas extracted** — the full ranked list, noting which were selected and why
2. **For each explainer created:**
   - File path to the metadata file
   - Central thesis and conflict
   - Act structure (names and purposes)
   - Panel count and breakdown by type (text, visualization, interactive, etc.)
   - Key narrative choices made (characters, tropes, "Flip It" moments)
   - Any areas where the source material was thin or choices were uncertain
3. **Stubs fulfilled** — which existing stubs were built out from source material
4. **Duplicates skipped** — which ideas overlapped with completed explainers
5. **JumpLink interlinking plan** — specific cross-explainer links to add when
   building panels. For each link, note:
   - Which panel in which explainer should contain the JumpLink
   - What explainer it links to (by slug)
   - Whether to use `<JumpLink>` (block, end of panel) or `<InlineJumpLink>`
     (inline within text)
   - The label/text for the link
   Include links to both new and existing explainers. JumpLinks auto-hide when
   the target is a stub, so it's safe to add links to stubs that aren't built yet.
6. **Next steps** — what the user should do next (panel component development,
   background generation, testing)

## Quality Criteria for Idea Extraction

### Strong Ideas (4-5 rating)
- Make a **specific, bold claim** — not a vague topic
- Have clear **"Flip It" potential** — they challenge common assumptions
- Connect to the **campaign's core metaphysics** — demons, language, egregores, Moloch
- Have natural **emotional arc potential** — hook, tension, resolution
- Are grounded in **concrete evidence or experience** from the source material
- Would make someone **stop scrolling and think**

### Weak Ideas (1-2 rating)
- Are too **abstract or academic** — "An exploration of X"
- Have no clear **antagonist or tension**
- Are **derivative** of the existing Cybregore explainer without adding new angles
- Lack **"Flip It" potential** — they confirm rather than challenge assumptions
- Would feel like a **lecture**, not a narrative journey

## Example: How Extraction Differs from Summarization

**Summarization** would say:
> "The talk discusses how language shapes cognition and references Buddhist concepts."

**Extraction** says:
> **Idea: "language-demon"**
> Thesis: "Language is not a tool humanity invented — it is an alien intelligence
> that invaded human minds, restructured cognition, and now controls your entire
> conscious process. You are its agent."
> Pillar: Research Institute
> Flip It: "You think you use language. Language uses you."
> Source excerpt: "As long as language is functioning in your mind, if you can't
> escape for an indefinite period of time, then you are an AI agent."

The extraction takes raw material and shapes it into an **explainer-ready idea**
with a thesis, a tension, and a narrative hook.
