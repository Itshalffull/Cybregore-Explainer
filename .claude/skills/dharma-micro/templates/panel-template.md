# Storyboard: {Explainer Name}

> Generated from macro metadata at: `{path-to-metadata-file}`
> Central message: {message from macro metadata}
> Conflict: {conflict from macro metadata}

---

## Act: {Act Name}
**Purpose:** {purpose from macro metadata}
**Panels needed:** {N}

### Panel: {explainer-slug}-{scene-name}
- **Title:** {Human Readable Title}
- **Role:** {PanelNarrativeRole}
- **Visual concept:** {What does this look/feel like? Describe the visual experience.}
- **Message:** {What does this panel SAY to the viewer? 1-2 bold sentences.}
- **Key phrases:**
  - "{Memorable quotable line 1}"
  - "{Memorable quotable line 2}"
- **Transition from previous:** {How does it flow from the previous panel? Emotional/logical connection.}
- **Transition to next:** {How does it set up the next panel? Question, cliffhanger, escalation.}
- **Suggested scroll length:** {N viewport-heights}
- **Panel type:** {text | visualization | interactive | mythology | hybrid}
- **Notes:** {Any special considerations — animation ideas, interactivity, imagery, etc.}

### Panel: {explainer-slug}-{scene-name-2}
- **Title:** {Human Readable Title}
- **Role:** {PanelNarrativeRole}
- **Visual concept:** {Description}
- **Message:** {Bold message}
- **Key phrases:**
  - "{Line 1}"
  - "{Line 2}"
- **Transition from previous:** {Connection}
- **Transition to next:** {Setup}
- **Suggested scroll length:** {N}
- **Panel type:** {type}
- **Notes:** {Notes}

---

## Act: {Next Act Name}
**Purpose:** {purpose}
**Panels needed:** {N}

{... repeat panel entries ...}

---

## Storyboard Summary

| # | Panel ID | Title | Role | Type | scrollLength |
|---|----------|-------|------|------|-------------|
| 1 | {id} | {title} | {role} | {type} | {length} |
| 2 | {id} | {title} | {role} | {type} | {length} |
| ... | ... | ... | ... | ... | ... |

**Total panels:** {N}
**Estimated duration:** {N} minutes (~1 min per 2-3 panels)
**Most complex panels:** {list panels that will need the most development effort}

## Checklist Before TypeScript Generation

- [ ] Every act has at least one panel
- [ ] Every panel belongs to exactly one act
- [ ] Panel IDs are unique and kebab-case
- [ ] Transitions chain properly (transitionOut of N matches transitionIn of N+1)
- [ ] First panel transitionIn is "Entry point" or similar
- [ ] Last panel transitionOut references end of explainer
- [ ] At least one "Flip It" panel (if applicable)
- [ ] At least one mythology/demon-framing panel
- [ ] Call-to-action points toward wisdom/practice
- [ ] Pacing alternates between telling and feeling
- [ ] Trilogy pattern used where appropriate
- [ ] keyPhrases are bold, quotable, campaign-aligned
