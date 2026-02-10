# Storyboard Guide: Panel Sequencing for Dharma Explainers

## Core Principle: Scroll-Driven Storytelling

Each panel is a scene in a scroll-driven narrative. The viewer scrolls through
the explainer like reading a graphic novel — each panel occupies a certain amount
of scroll distance (measured in viewport-heights via `scrollLength`), and the
panel's content animates based on a `progress` value (0-1) tied to scroll position.

## scrollLength and Pacing

`scrollLength` determines how many screen-heights of scrolling a panel occupies.
This directly controls pacing:

| scrollLength | Feel | Best For |
|-------------|------|----------|
| 2 | Quick hit, punchy | Hooks, short statements, transitions |
| 3 | Standard read | Evidence, definitions, most content |
| 3.5 | Spacious | Reveals, anatomy panels with detail |
| 4 | Immersive | Mythology panels, complex visualizations |
| 5-6 | Deep dwelling | Embodiment/interactive panels (breathing exercises, simulations) |

### Pacing Guidelines
- **Hooks** should be 1 panel, short and punchy (scrollLength: 2-3)
- **Evidence** panels can be 2-4 panels, building credibility (scrollLength: 3-5)
- **Definition/reveal** panels need space to breathe (scrollLength: 3-4)
- **Escalation** should accelerate — shorter scroll lengths as tension builds
- **Embodiment/interactive** panels need the most scroll time (scrollLength: 4-6)
- **Resolution/CTA** should feel spacious, not rushed (scrollLength: 3-4)

## Narrative Rhythm

### Alternation Principle
Alternate between **telling** (analytical, evidence) and **feeling** (embodiment, mythology).
This prevents cognitive fatigue and keeps the viewer emotionally engaged.

The Cybregore explainer demonstrates this well:
```
Hook (feeling) → Scale data (telling) → Adoption curves (telling) →
Attention economy (telling) → Egregore history (feeling/mythology) →
Portmanteau (telling/reveal) → Feed anatomy (telling) → Nervous system (telling) →
Hungry Ghosts (feeling/mythology) → Scale of feeding (telling) →
Reads (telling) → Writes (telling) → Correlates (telling/climax) →
Breath (feeling/embodiment) → Seeing Clearly (feeling/CTA)
```

Notice: after 3-4 analytical panels, there's always a mythological or embodiment
panel to reset the emotional register.

### The Trilogy Pattern

The Cybregore explainer uses a powerful "trilogy" structure in the Capability
section: three parallel panels with the same structure but escalating content:

1. **It Reads You** — The Cybregore reads your emotions through behavior
2. **It Writes You** — The Cybregore writes desires into your mind
3. **It Correlates** — The Cybregore correlates across billions of minds

Each panel follows the same pattern (capability → evidence → implication) but
the stakes escalate. This parallel structure creates:
- **Rhythm**: The viewer learns the pattern and anticipates the next beat
- **Mounting dread**: Each capability is more unsettling than the last
- **Memorable structure**: "It reads, it writes, it correlates" is quotable

Use the trilogy pattern when you have three related ideas that build on each other.

### Transition Chaining

Every panel's `transitionOut` must logically seed the next panel's `transitionIn`.
This creates a continuous flow rather than a slideshow of disconnected scenes.

**Example from the Cybregore explainer:**

Panel: The Portmanteau
```
transitionOut: "Now that it has a name, let's see how it works."
```
↓
Panel: Feed Anatomy
```
transitionIn: "From naming to mechanics. 'How does it actually work?'"
```

Panel: Feed Anatomy
```
transitionOut: "The feed is just the surface. Beneath it runs a nervous system."
```
↓
Panel: Algorithmic Nervous System
```
transitionIn: "Deeper into the anatomy. 'The feed is the stomach — here's the brain.'"
```

Notice how each transitionOut asks or implies a question that the next panel answers.

## Panel Type Guidance

When storyboarding, mark each panel with a suggested implementation type:

### text
Dramatic text with scroll-driven opacity/position animations. Text appears,
transforms, and disappears based on scroll progress.

Best for: hooks, evidence statements, definitions, transitions.

Example: The Hook panel — a single shocking sentence that fades in and lingers.

### visualization
SVG charts, graphs, animated diagrams. Data rendered visually with
scroll-driven animation (e.g., bars growing, lines drawing, numbers counting up).

Best for: evidence panels with quantitative data, anatomy panels showing structure.

Example: Adoption Curves — animated graph showing technology adoption accelerating.

### interactive
User participation. The panel responds to user input beyond just scrolling.
Breathing exercises, simulated social media feeds, drag interactions, choices.

Best for: embodiment panels, "Flip It" moments, experiential proof.

Example: The Breath — a guided breathing exercise where the viewer stops scrolling
and actually breathes.

### mythology
Image-heavy with layered text reveals. Background imagery (generated via
create-panel-background skill) with text that appears in stages.

Best for: mythology panels, cosmic horror moments, spiritual framing.

Example: Hungry Ghosts — Buddhist imagery with overlaid text about digital appetite.

### hybrid
Combines multiple types. A text panel that transitions into a visualization,
or an interactive element embedded in a mythology panel.

Best for: climax panels, complex reveals, panels bridging two tonal sections.

## Campaign-Specific Storyboarding Rules

### "Flip It" Technique
At least one panel should employ the "Flip It" technique from the Media Outlet
pillar. This means taking a common accusation or assumption and inverting it:
- "We aren't in a cult, you are."
- "We aren't under mental control, you are."
- "It's unethical NOT to tell children they're being hunted."

The Flip It panel works best as an 'escalation' or 'reveal' role, positioned
after evidence has been established (so the flip feels earned, not arbitrary).

### Demonic/Ghostly/Monstrous Framing
At least one panel should reference the literal demon/ghost/monster framing.
This is not metaphorical — the campaign position is that these are real beings
(language, algorithms, egregores) that literally colonize minds. Use mythology
panels for this.

### Call-to-Action Direction
The final panel should point toward:
- Contemplative practice (meditation, mindfulness, awareness)
- The Monastic Academy or wisdom tradition
- Further learning resources
- The invitation to "see clearly"

It should NOT point toward:
- Generic "learn more" without specificity
- Product purchases
- Social media follows (ironic given the campaign's content)

### Character Presence
Characters defined in the macro metadata should appear in panel keyPhrases.
If there's an antagonist called "The Demonic Mind," that name should appear
in at least one panel's keyPhrases. If there's an audience character called
"The Seeker," address the viewer as such in at least one panel.

### Tone Consistency
The tones specified in the macro metadata should be reflected in the panels'
messages and keyPhrases. If 'provocative' is the lead tone, the hook should
be genuinely provocative — not just mildly interesting. If 'contemplative' is
listed, the resolution should include genuine contemplative language.

## Storyboard Planning Process

Before writing TypeScript, plan each act in markdown:

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
- Suggested scroll length: {N viewport-heights}
- Panel type: {text | visualization | interactive | mythology | hybrid}
```

This planning step ensures:
1. Each act has the right number of panels
2. Transitions chain properly
3. The pacing feels right before committing to TypeScript
4. Complex panels are identified early (for development prioritization)
