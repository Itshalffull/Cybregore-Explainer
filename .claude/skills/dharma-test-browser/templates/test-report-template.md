# Explainer Test Report: {EXPLAINER_SLUG}

**Date:** {DATE}
**Test Mode:** {Full | Quick | Retest}
**Viewports Tested:** {e.g., Desktop 1280x800, Mobile 390x844}
**Total Panels:** {N}
**Pass / Warn / Fail:** {N} / {N} / {N}

---

## Build Validation

| Check | Result | Notes |
|-------|--------|-------|
| npm install | PASS/FAIL | |
| tsc --noEmit | PASS/FAIL | {error count if fail} |
| vite build | PASS/FAIL | {error details if fail} |
| generate-media | PASS/FAIL/SKIP | {missing variants?} |

---

## Panel Inventory

| # | Panel Component | scrollLength | Role | Act | Desktop | Mobile |
|---|----------------|-------------|------|-----|---------|--------|
| 1 | {PanelName} | {N} | {role} | {N} | PASS/WARN/FAIL | PASS/WARN/FAIL |
| 2 | ... | ... | ... | ... | ... | ... |

---

## Panel Detail: {PanelName} — {PASS/WARN/FAIL}

### Five-Point Scroll Test (Desktop 1280x800)

| Progress | Contrast | Fit | Animation | Polish | Notes |
|----------|----------|-----|-----------|--------|-------|
| 0.0 | OK | OK | OK | OK | |
| 0.05 | OK | OK | OK | OK | |
| 0.25 | OK | OK | OK | OK | |
| 0.50 | OK/WARN/FAIL | OK/WARN/FAIL | OK/WARN/FAIL | OK/WARN/FAIL | {details} |
| 0.75 | OK | OK | OK | OK | |
| 0.95 | OK | OK | OK | OK | |

### Five-Point Scroll Test (Mobile 390x844)

| Progress | Contrast | Fit | Animation | Polish | Notes |
|----------|----------|-----|-----------|--------|-------|
| 0.50 | OK/WARN/FAIL | OK/WARN/FAIL | OK/WARN/FAIL | OK/WARN/FAIL | {details} |

### Issues Found

> Repeat this block for each issue in this panel

**Issue:** {Short description}
**Severity:** Critical / High / Medium / Low
**Progress Point:** {0.0-1.0}
**Viewport:** Desktop / Mobile / Both
**Screenshot:** {path or description}
**Details:** {What's wrong, what it should look like}

---

{Repeat "Panel Detail" section for each panel with issues. Panels that pass all checks
at all viewports can be listed in the summary table only — no detail section needed.}

---

## Narrative Flow Assessment

### Arc Integrity

| Arc Phase | Panels | Assessment | Notes |
|-----------|--------|-----------|-------|
| Hook | {panel numbers} | Strong / Adequate / Weak | |
| Evidence | {panel numbers} | Strong / Adequate / Weak | |
| Naming | {panel numbers} | Strong / Adequate / Weak | |
| Escalation | {panel numbers} | Strong / Adequate / Weak | |
| Climax | {panel numbers} | Strong / Adequate / Weak | |
| Resolution | {panel numbers} | Strong / Adequate / Weak | |

### Pacing Issues

- {Panel N → Panel N+1: description of pacing problem}
- {Dead spot at Panel N: nothing changes during scroll}

### Campaign Alignment

- [ ] At least one "Flip It" inversion present
- [ ] At least one mythology/demon-framing panel present
- [ ] Call-to-action points toward practice
- [ ] Tone matches metadata specification
- [ ] Key phrases appear verbatim

---

## Console Errors

| Severity | Message | Panel/Source | Action Needed |
|----------|---------|-------------|---------------|
| {Critical/High/Medium/Low} | {error text} | {panel or file} | {suggested fix} |

---

## Issue Summary (Ranked by Severity)

### Critical (blocks shipping)

1. **{Panel} — {Issue}**
   - Hand off to: `{skill-name}`
   - Suggested fix: {description}

### High (significantly impacts experience)

1. **{Panel} — {Issue}**
   - Hand off to: `{skill-name}`
   - Suggested fix: {description}

### Medium (noticeable but not blocking)

1. **{Panel} — {Issue}**
   - Hand off to: `{skill-name}`
   - Suggested fix: {description}

### Low (polish items)

1. **{Panel} — {Issue}**
   - Hand off to: `{skill-name}`
   - Suggested fix: {description}

---

## Handoff Instructions

### For `dharma-panel-text`:
- {List of text panels needing fixes with specific instructions}

### For `dharma-panel-visualization`:
- {List of visualization panels needing fixes}

### For `dharma-panel-interactive`:
- {List of interactive panels needing fixes}

### For `dharma-panel-mythology`:
- {List of mythology panels needing fixes}

### For `dharma-panel-hybrid`:
- {List of hybrid panels needing fixes}

### For `create-panel-background`:
- {List of panels needing background assets}

### For `dharma-micro` (structural changes):
- {Any needed changes to panel order, additions, or removals}

### For `dharma-macro` (narrative changes):
- {Any needed changes to the overall narrative structure}

### Direct Code Fixes (no skill needed):
- {CSS fixes, TypeScript fixes, import fixes that can be done directly}

---

## Next Steps

1. {Highest priority fix}
2. {Second priority}
3. {Third priority}
4. When fixes are complete, run `/dharma-test-browser` again in Retest mode for the affected panels
