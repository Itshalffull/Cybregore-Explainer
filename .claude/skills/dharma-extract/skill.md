# dharma-extract: Extract Explainer Ideas from Source Material & Delegate to Agents

## What This Skill Does

You are an extraction and orchestration agent. You take source material — talks,
articles, transcripts, essays, podcast episodes, or any combination — and:

1. **Read and deeply understand** the source material
2. **Extract explainer ideas** that align with the Dharma Media Campaign
3. **Present the ideas** to the user for selection and refinement
4. **Delegate each approved idea** to agents that run the dharma-macro and dharma-micro
   skills, passing along the relevant source material so the agents can ground
   their work in the original content

You are the FIRST step in a pipeline. Your job is to be the bridge between raw
source material and structured explainer metadata.

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

### Step 2: Read the campaign context

Read `.claude/skills/dharma-extract/context/campaign.md` to understand the overall
campaign vision, the three pillars, and the core principles. This is the lens
through which you evaluate every idea.

### Step 3: Read the extraction guide

Read `.claude/skills/dharma-extract/context/extraction-guide.md` to understand
the methodology for identifying strong explainer ideas vs. weak ones.

### Step 4: Extract explainer ideas

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

### Step 5: Present ideas to the user

Present all extracted ideas in a clear, ranked format. For each idea, show:
- The title and core thesis
- Why it's strong (or why it ranked lower)
- Which campaign pillar(s) it serves
- A brief narrative arc sketch

Ask the user:
1. Which ideas should proceed to full explainer creation?
2. Any modifications to the selected ideas?
3. Any additional context or constraints?
4. Whether to run all selected ideas in parallel or sequentially

### Step 6: Prepare source material packages

For each approved idea, prepare a **source material package** — a curated subset
of the original source content that is most relevant to that specific idea. This
package will be passed to the agents so they can ground their work in the original
content. The package should include:

- Relevant excerpts and quotes from the source material
- Key data points or evidence from the source
- Any specific "Flip It" inversions identified
- Relevant metaphors and framings from the source
- The core thesis as refined with the user

### Step 7: Delegate to agents

For each approved idea, launch a Task agent with a detailed prompt that instructs
it to run the dharma-macro skill and then the dharma-micro skill sequentially.

Read `.claude/skills/dharma-extract/context/agent-delegation-guide.md` for the
exact prompt structure and delegation pattern.

**Critical:** Each agent prompt MUST include:
1. The full campaign context (from campaign.md)
2. The source material package for that specific idea
3. The refined idea details (slug, thesis, pillar, audience, tone, concepts)
4. Instructions to run dharma-macro first, then dharma-micro
5. The metadata schema and examples context
6. The storyboard guide and panel schema context

**When launching agents:**
- If the user chose parallel execution, launch all agents simultaneously using
  multiple Task tool calls in a single message
- If sequential, launch them one at a time and report progress between each
- Each agent should run with `subagent_type: "general-purpose"` since it needs
  access to file reading, writing, and editing tools

### Step 8: Monitor and report

As agents complete their work:
- Report which explainers have been created
- Summarize each explainer's narrative arc and panel count
- Note any issues or areas where the source material was thin
- Provide the file paths for all created metadata files

Final report should include:
- List of all explainer metadata files created
- Summary of each explainer's thesis, act count, and panel count
- Reminder about next steps (panel component development, background generation)

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
