# dharma-panel-interactive: Create & Build an Interactive Panel

## What This Skill Does

You are creating a single **interactive panel** for a Dharma campaign explainer —
from interaction design through to a working React component. Interactive panels
break the scroll paradigm: the viewer stops passively consuming and DOES something.
Breathing exercises, simulated social feeds, drag interactions, choices, confessions.

This skill has two phases:
1. **Content phase** — Design the interaction, write all copy states, define the experience arc
2. **Build phase** — Create the React component with state management and scroll/input handling

## Inputs You Need

1. **The PanelMeta entry** — `id`, `title`, `narrativeRole`, `message`,
   `transitionIn`, `transitionOut`, `tags`, `keyPhrases`
2. **The explainer's metadata file path** — for overall narrative context
3. **The explainer slug** — for component file paths
4. **Interaction concept** — what should the viewer DO? (If not obvious from the
   metadata, discuss with the user)
5. **Any constraints** — accessibility needs, mobile considerations (optional)

If the user doesn't provide the PanelMeta, ask for the metadata file path and
panel ID.

---

## Phase 1: Content

### Step 1: Read context

Read these files to ground yourself:

1. `.claude/skills/dharma-panel-interactive/context/campaign.md` — campaign voice
2. `.claude/skills/dharma-panel-interactive/context/design-system.md` — the complete
   design system (colors, typography, spacing, animation utilities, component anatomy)
3. `.claude/skills/dharma-panel-interactive/context/interactive-panel-guide.md` —
   interaction design patterns and component architecture

### Step 2: Read the metadata

Read the explainer metadata file. Identify:
- The panel's position in the arc (interactive panels often land in resolution/embodiment)
- The narrative role (usually `embodiment`, `reveal`, or `escalation`)
- The tone shift this panel creates (interactive panels often mark tonal turns)
- What comes before and after — the transition is critical since interactive
  panels break the scroll flow

### Step 3: Choose the interaction type

Select from these core patterns:

| Type | Description | Best For |
|------|-------------|----------|
| **Breathing exercise** | Guided inhale/exhale with visual feedback | Embodiment, resolution |
| **Simulated feed** | Fake social media scroll the viewer interacts with | Evidence, anatomy |
| **Choice/confession** | Viewer selects options revealing something about themselves | Reveal, escalation |
| **Direct manipulation** | Drag, resize, or rearrange elements | Anatomy, definition |
| **Attention trap** | Panel that demonstrates the concept by trapping the viewer | Hook, escalation |
| **Pause/stillness** | Forces the viewer to stop and wait | Embodiment, transition |
| **Text input** | Viewer types something that gets transformed | Reveal, "Flip It" |

### Step 4: Design the experience arc

Interactive panels have their own mini-narrative:

```
1. INVITATION — What draws the viewer into participating?
   {Clear, low-friction entry point. No complex instructions.}

2. ENGAGEMENT — What does the viewer do? What happens?
   {The core loop. Actions and feedback. 10-30 seconds of interaction.}

3. REVELATION — What does the interaction reveal?
   {The "aha" moment. The interaction PROVES the panel's message.}

4. RELEASE — How does the viewer return to scrolling?
   {Clean exit. Often a moment of stillness before the next panel.}
```

### Step 5: Write all copy states

Interactive panels have multiple text states:

- **Invitation copy:** 1-2 lines that tell the viewer what to do.
  Use `text-body text-cream text-bold`. Commands, not suggestions.
  (e.g., "Stop scrolling. Breathe with this circle.")
- **During-interaction copy:** Text that changes based on viewer actions.
  Use `text-body text-sage`. Minimal, rhythmic.
  (e.g., "Breathe in... Breathe out...")
- **Revelation copy:** The payoff text after the interaction.
  Use `text-title text-cream` or wrap in `box-coral`. Bold, personal.
  (e.g., "The Cybregore cannot follow you into this moment of pure awareness.")
- **Fallback copy:** What non-interactive viewers see (scroll-only experience).
  Must deliver the same message without interaction.

### Step 6: Define the scroll + interaction map

Interactive panels mix scroll-driven and user-driven states:

```
Progress 0.0 - 0.15: Approach
  {Panel enters. Previous content fading. Anticipation builds.}
Progress 0.15 - 0.3: Invitation
  {Invitation copy appears. Interaction becomes available.}
Progress 0.3 - 0.7: Active Zone
  {Scroll pauses or slows. Viewer interacts. Internal state drives visuals.}
  {If viewer doesn't interact, scroll-based fallback plays automatically.}
Progress 0.7 - 0.85: Revelation
  {Interaction result appears. The "aha" copy.}
Progress 0.85 - 1.0: Release
  {Gentle exit. Moment of stillness. Transition to next panel.}
```

### Step 7: Present design to user

Show the interaction type, experience arc, all copy states, and scroll map.
Get approval before building.

---

## Phase 2: Build

### Step 8: Create the panel component

Create the component at: `src/explainers/{explainer-slug}/panels/{PanelId}.tsx`

Interactive panels use React state alongside the `lerp()`-driven progress prop:

```tsx
import { useState, useEffect, useRef } from 'react'
import { lerp } from '../../utils/animation'

interface PanelProps {
  progress: number
}

export default function InteractivePanel({ progress }: PanelProps) {
  // ── Interaction state ─────────────────────────────────────────────
  const [hasInteracted, setHasInteracted] = useState(false)

  // ── Scroll-driven animation ───────────────────────────────────────
  const instructionOpacity = lerp(progress, 0.05, 0.15, 0, 1)
  const isActive = progress > 0.2 && progress < 0.75
  const revelationOpacity = lerp(progress, 0.78, 0.90, 0, 1)

  return (
    <section className="panel panel--dark">
      <div className="panel-body">
        {/* Invitation */}
        <p className="text-body text-cream text-bold text-center mb-2xl"
           style={{ opacity: instructionOpacity }}>
          Stop scrolling. <span className="text-coral">Breathe.</span>
        </p>

        {/* Interactive element */}
        {isActive && (
          <div>
            {/* The interactive widget goes here */}
          </div>
        )}

        {/* Revelation */}
        <div className="box-coral mt-2xl" style={{ opacity: revelationOpacity }}>
          <p className="text-title text-cream text-center" style={{ margin: 0 }}>
            The Cybregore cannot follow you into this moment of pure awareness.
          </p>
        </div>

        <p className="text-body text-sage text-center mt-lg"
           style={{ opacity: revelationOpacity }}>
          This is the gap. This is where freedom lives.
        </p>
      </div>
    </section>
  )
}
```

**NEVER define a custom `rangeProgress` function.** Always use `lerp` / `lerpMulti`
from `../../utils/animation`.

### Step 9: Build the interaction

Implement the specific interaction type. See the interactive-panel-guide for
detailed patterns (breathing circles, simulated feeds, choice buttons, etc.).

**Critical implementation rules:**
- **Scroll-driven fallback:** Panel must deliver its message for scroll-only viewers
- **No blocking:** Never prevent scrolling. Interaction is an invitation, not a gate.
- **Touch + mouse:** All interactions must work on both touch and desktop
- **Clear affordance:** The viewer must immediately understand what to do
- **State cleanup:** Reset interaction state if the viewer scrolls back

**Visual feedback colors (use CSS classes/variables):**
- Neutral state: `var(--deep-forest)` or `box-dark`
- Active/engaging: `var(--sage)` for borders/glow
- Selection/emphasis: `box-coral` for selected items
- Revelation: `box-coral` wrapping `text-title text-cream`

### Step 10: Handle accessibility

Interactive panels have heightened accessibility requirements:
- **Keyboard support:** All interactions must be keyboard-accessible
- **Screen reader:** Provide `aria-label`, `role` attributes, `tabIndex`
- **Reduced motion:** Detect `prefers-reduced-motion` and simplify
- **Fallback:** The scroll-only version must convey the same message

```tsx
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ARIA for interactive regions
<div role="region" aria-label="Breathing exercise" tabIndex={0}>

// Keyboard support for buttons
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') handleInteraction()
  }}
  aria-pressed={isActive}
>
```

### Step 11: Validate

Check that:
- [ ] Interaction works on both touch and mouse
- [ ] Scroll-only fallback delivers the panel's message
- [ ] All copy states appear at the right moments
- [ ] Uses `lerp()` from `../../utils/animation` (not custom helpers)
- [ ] Uses design system CSS classes (not inline text styling)
- [ ] Outermost element is `<section className="panel panel--dark">`
- [ ] Content wrapped in `<div className="panel-body">`
- [ ] `keyPhrases` from metadata appear in revelation or interaction copy
- [ ] The experience arc has clear invitation → engagement → revelation → release
- [ ] Keyboard accessible with ARIA attributes
- [ ] Reduced motion fallback exists
- [ ] Panel doesn't block scrolling
- [ ] The interaction PROVES the panel's message (not just illustrates it)
- [ ] Entry honors `transitionIn`, exit serves `transitionOut`
- [ ] scrollLength gives enough time for interaction (typically 4-5)

### Step 12: Report

Tell the user:
- File created and location
- Interaction type and experience arc
- All copy states (invitation, during, revelation, fallback)
- scrollLength value
- Any special considerations (mobile, accessibility)
- Whether `create-panel-background` is needed
- Next/previous panel context
