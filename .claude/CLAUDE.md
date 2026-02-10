# How to Create Explainers

This repo contains Claude Code skills for turning any source material into beautiful, interactive, scroll-driven explainers for the Dharma Media Campaign. The skills form a pipeline — each one handles a specific stage, and they chain together to take you from raw content to a polished, testable experience.

## The Pipeline at a Glance

```
Source Material (talks, articles, transcripts, URLs, pasted text)
        │
        ▼
  /dharma-extract ──── Extract bold, explainer-shaped ideas
        │
        ▼
  /dharma-macro ────── Generate narrative metadata (thesis, acts, characters, conflict)
        │
        ▼
  /dharma-micro ────── Storyboard every panel with detailed metadata
        │
        ▼
  /dharma-panel-* ──── Build each panel as a React component (5 panel types)
        │
        ▼
  /create-panel-background ── Generate video/image backgrounds (as needed)
        │
        ▼
  /dharma-test-browser ────── QA in the browser, triage fixes
```

## Step-by-Step: Content to Finished Explainers

### 1. Extract Ideas — `/dharma-extract`

This is always your starting point. Give it any source material and it will:

- Read and deeply understand everything provided
- Pull out bold, specific claims with narrative potential (not vague topics)
- Rate each idea on thesis boldness, "Flip It" potential, mythology bridge, emotional arc, campaign alignment
- Present ranked ideas for the user to select

**What to provide:** File paths, URLs, or pasted text. Optionally specify campaign pillars to prioritize (Research Institute, Mystery School, Media Outlet), target audience, themes to emphasize or avoid.

**What you get back:** Ranked explainer ideas with slugs, theses, emotional arc sketches, and source excerpts.

**What happens next:** After the user approves ideas, the extract skill automatically delegates each one to a Task agent that runs dharma-macro then dharma-micro. Multiple ideas can run in parallel.

### 2. Generate Narrative Metadata — `/dharma-macro`

Creates the explainer's soul — the high-level structure that everything else hangs on.

**Output:** `src/explainers/{slug}-metadata.ts` containing:
- **message** — the central thesis (bold, complete, provocative)
- **submessages** — 5-15 supporting points that build the argument progressively
- **tone** — 3-6 values ordered by dominance (provocative, mythological, intimate, etc.)
- **tropes** — narrative devices (the-reveal, naming-the-beast, mythology-bridge, etc.)
- **characters** — entities with roles (protagonist, antagonist, narrator, audience, metaphor)
- **conflict** — the central tension
- **acts** — 5-9 named narrative movements with purposes (panelIds left empty for micro)
- **panels** — left empty for dharma-micro to populate

**Usually runs automatically** via dharma-extract delegation. Run standalone with `/dharma-macro` if you need to create or redo narrative metadata independently.

### 3. Storyboard Panels — `/dharma-micro`

Plans every panel scene-by-scene and populates the metadata file.

**Output:** Updated metadata file with:
- Full `panels` array — each panel gets an id, title, narrativeRole, message, transitions, tags, keyPhrases
- Act `panelIds` filled in
- `durationMinutes` updated

**Key storyboarding principles:**
- Alternate between "telling" (analytical, evidence) and "feeling" (embodiment, mythology)
- Use the trilogy pattern (three parallel panels with escalating content) where appropriate
- Chain transitions — each panel's `transitionOut` seeds the next panel's `transitionIn`
- At least one "Flip It" panel and one mythology/demon-framing panel per explainer
- Call-to-action points toward wisdom, practice, or the sacred

**Usually runs automatically** after dharma-macro in the extraction pipeline. Run standalone with `/dharma-micro` for storyboard refinement.

### 4. Build Panel Components — `/dharma-panel-*`

Five skills, one per panel type. Each follows a two-phase process: **Content** (design the copy, visuals, interactions) → **Build** (create the React component).

#### `/dharma-panel-text`
Dramatic statements with scroll-driven typography. The backbone of most explainers.
- Headlines: 1-3 lines, 3-10 words each, bold, rhythmic
- Body copy: 2-4 sentences max, second person, advances the argument
- Scroll choreography: entry → headline reveal → hold → body copy → exit

#### `/dharma-panel-visualization`
SVG charts, animated counters, network diagrams, data-driven graphics.
- Choose from: animated counter, bar chart, line graph, radial, network, flow, stacked, comparison split
- Annotation copy with title, axis labels, callout, and pivot line (reframing data through campaign lens)

#### `/dharma-panel-interactive`
Panels where the viewer participates — not just scrolls.
- Types: breathing exercise, simulated feed, choice/confession, direct manipulation, attention trap, pause/stillness, text input
- Experience arc: invitation → engagement → revelation → release
- Must include scroll-only fallback for non-interactive viewers

#### `/dharma-panel-mythology`
Image-heavy panels bridging ancient wisdom and modern digital reality.
- 3-5 text layers: The Ancient → The Description → The Bridge → The Implication → The Lingering
- Background imagery (generated video or image with parallax)
- Always uses `text-shadow-depth` for readability over imagery

#### `/dharma-panel-hybrid`
Combines two or more panel types with scroll-driven mode transitions.
- Common combos: text→visualization, mythology→text, text→interactive
- Transition styles: dissolve, push, transform, overlay, split
- Each mode gets less content than standalone — respect the content budget

**For each panel:** provide the panel ID from the metadata file and the explainer slug. The skill reads the metadata for context, designs content, gets user approval, then builds the component at `src/explainers/{slug}/panels/{PanelId}.tsx`.

### 5. Generate Backgrounds — `/create-panel-background`

For mythology and immersive panels that need visual atmosphere.

- **Step 1:** Generate a static image with `node create-image.js` (OpenAI GPT-Image, zen minimalist palette)
- **Step 2:** Animate into a looping video with `node create-video.js` (Google Veo 2.0)
- **Step 3:** Use `<VideoBackground>` component in the panel

**Requires:** `OPENAI_API_KEY`, `VEO_API_KEY` environment variables, FFmpeg installed.

### 6. Test and Polish — `/dharma-test-browser`

Systematic browser QA across viewports and scroll positions.

- Validates build first (tsc, vite build, npm install)
- Tests each panel at 5 scroll progress points (0.0, 0.05, 0.25, 0.50, 0.75, 0.95)
- Checks contrast, fit, animation, polish, and assets at desktop (1280x800) and mobile (390x844)
- Assesses narrative flow across the full scroll experience
- Generates a structured test report with pass/warn/fail per panel
- Triages issues and hands off fixes to the appropriate panel skill

**Modes:** Full (all panels, all viewports), Quick (midpoint-only, desktop), Retest (specific panels).

---

## Creating Multiple Interlinked Explainers

The real power of this system is creating a constellation of explainers that reinforce each other. Here's how to think about interlinking:

### Shared Universe

All explainers live in the same campaign world. They share:
- **Characters:** The Demonic Mind, The Cybregore, Moloch, The Viewer/Seeker
- **Mythology:** Buddhist traditions, hungry ghosts, egregores, occult concepts
- **Vocabulary:** demons (literal, not metaphorical), language as alien intelligence, Molochian process
- **Enemy:** the Molochian process — technology driving social structure without wisdom
- **Hope:** wisdom acceleration, contemplative practice, the sacred

### Campaign Pillars as Organizing Principle

Each explainer serves one or more pillars. A well-interlinked collection covers all three:

| Pillar | Purpose | Example Angles |
|--------|---------|----------------|
| **Research Institute** | Discover and name the demons | Language as alien intelligence, cybregores, attention parasites |
| **Mystery School** | Teach wisdom traditions | Contemplative practices, training teachers, embodied awareness |
| **Media Outlet** | Distribute truth via "Flip It" | Challenge assumptions, invert conventional wisdom, provoke |

### Interlinking Strategies

1. **Shared tags in metadata** — Use consistent tags across explainers so they can be discovered together (e.g., `dharma`, `digital-ethics`, `moloch`, `language`)

2. **Submessage threads** — One explainer's submessage becomes another's central thesis. The language-demon explainer might have a submessage about "naming gives power over demons" that becomes the core thesis of a naming-the-beast explainer.

3. **Character continuity** — The same antagonist entities (The Demonic Mind, Moloch, cybregores) appear across explainers in different roles, building a shared mythology.

4. **Escalating revelations** — Sequence explainers so each one reveals something that reframes the previous ones. A viewer who sees three explainers should feel like they've been initiated into deeper understanding.

5. **Trilogy pattern at scale** — Just as individual panels use the trilogy pattern (three parallel escalating ideas), a set of three explainers can form a trilogy: one that names the problem, one that provides the framework, one that calls to action.

6. **Cross-referencing keyPhrases** — Memorable lines from one explainer can appear as callbacks in another, creating a sense of connected narrative.

### Workflow for Multiple Explainers from One Source

When you have rich source material (e.g., a long talk or multiple articles):

1. Run `/dharma-extract` with all the source material at once
2. The extraction will identify 5-8+ ideas across different pillars
3. Select 2-4 ideas that complement each other (different pillars, different angles on the same reality)
4. Let the extract skill delegate them to parallel agents — all metadata files get created simultaneously
5. Review the metadata files together — look for interlinking opportunities:
   - Do the characters reference each other?
   - Do the submessages build a larger argument?
   - Is there a natural viewing order?
6. Build panels for each explainer, using consistent visual language across the set
7. Test each explainer independently, then assess the collection as a whole

---

## Technical Constraints to Remember

### Animation
- **Always** use `lerp()` and `lerpMulti()` from `../../utils/animation` — never custom animation helpers
- Only use inline `style` for scroll-driven properties: `opacity` and `transform`
- All other styling uses design system CSS classes

### Design System
- **Typography:** `text-display` (rare peaks only), `text-title` (climactic), `text-body` (workhorse), `text-label`, `text-small`
- **Colors:** `text-cream`, `text-sage`, `text-coral`, `text-olive`, `text-dark`
- **Backgrounds:** `panel--dark` is the default. Use `panel-body--over-video` + `text-shadow-depth` for imagery backgrounds
- **Spacing:** `mb-2xl`, `mb-xl`, `mb-lg`, `mb-md`, `mb-sm`, `mb-xs`
- **Boxes:** `box-coral` for emphasis callouts

### Component Architecture
- Every panel receives a `progress` prop (0 to 1)
- Outermost element: `<section className="panel panel--dark">`
- Content wrapper: `<div className="panel-body">`
- Export as default function
- Panel file location: `src/explainers/{slug}/panels/{PanelId}.tsx`

### Campaign Voice
- **Bold and specific** — never vague or academic
- **Second person** — "you", not "one" or "people"
- **Literal demons** — not metaphorical, not "like" demons — actual beings
- **"Flip It"** — challenge assumptions with genuine inversions, not contrarianism
- **Tell truth incompletely** — leave doors open, create hunger for more
- **Enormous epic vision** — cosmic drama, not small claims

---

## Quick Reference: When to Use Each Skill

| I want to... | Use this skill |
|---|---|
| Start from scratch with source material | `/dharma-extract` |
| Create narrative structure for a known idea | `/dharma-macro` |
| Storyboard panels from existing narrative metadata | `/dharma-micro` |
| Build a text-heavy panel | `/dharma-panel-text` |
| Build a data/chart panel | `/dharma-panel-visualization` |
| Build a participatory panel | `/dharma-panel-interactive` |
| Build an imagery+mythology panel | `/dharma-panel-mythology` |
| Build a multi-type panel | `/dharma-panel-hybrid` |
| Generate a video/image background | `/create-panel-background` |
| Test an explainer in the browser | `/dharma-test-browser` |
| Fix a specific panel after testing | The panel skill matching that panel's type |
