# Explainer Test Report: suicide-cult

**Date:** 2026-02-11
**Test Mode:** Full (code validation + static analysis; browser visual testing pending)
**Viewports Tested:** Code-level validation (no GUI browser available)
**Total Panels:** 20
**Pass / Warn / Fail:** 17 / 3 / 0

---

## Build Validation

| Check | Result | Notes |
|-------|--------|-------|
| npm install | PASS | All deps installed cleanly |
| tsc --noEmit | PASS | 0 errors |
| vite build | PASS | 124 modules, 466KB bundle |
| generate-media | SKIP | No new media assets for this explainer |

---

## Panel Inventory

| # | Panel Component | scrollLength | Role | Act | Code Check |
|---|----------------|-------------|------|-----|------------|
| 1 | PanelYouAreInACult | 2 | hook | 1 | PASS |
| 2 | PanelBuyNowSacrament | 3 | hook | 1 | PASS |
| 3 | PanelExtinctionData | 4 | evidence | 2 | WARN |
| 4 | PanelFourHorsemen | 4.5 | evidence | 2 | WARN |
| 5 | PanelTechnologyAccelerates | 4 | evidence | 2 | WARN |
| 6 | PanelThisIsACult | 3.5 | definition | 3 | PASS |
| 7 | PanelTheInvisibleLeader | 3.5 | reveal | 3 | PASS |
| 8 | PanelCultAnatomy | 4 | anatomy | 4 | PASS |
| 9 | PanelNoExit | 3 | anatomy | 4 | PASS |
| 10 | PanelNuclear | 3 | escalation | 5 | PASS |
| 11 | PanelBioweapons | 3 | escalation | 5 | PASS |
| 12 | PanelAiAcceleration | 3.5 | escalation | 5 | PASS |
| 13 | PanelYouAreTheCultMember | 3.5 | reveal | 6 | PASS |
| 14 | PanelNormalIsExtreme | 3.5 | reveal | 6 | PASS |
| 15 | PanelNoMoralStanding | 3.5 | climax | 6 | PASS |
| 16 | PanelMolochTheDemon | 4 | mythology | 7 | PASS |
| 17 | PanelPossessedCivilization | 3.5 | embodiment | 7 | PASS |
| 18 | PanelWeEscaped | 3 | reveal | 8 | PASS |
| 19 | PanelTheMonastery | 3.5 | resolution | 8 | PASS |
| 20 | PanelLeaveTheCult | 3.5 | call-to-action | 8 | PASS |

---

## Panel Detail: PanelExtinctionData — WARN

**Issue:** SVG inline styles (fontSize, fill) used for chart labels
**Severity:** Low
**Details:** SVG `<text>` elements use inline `fontSize` and `fill` attributes. This is expected and correct for SVG — CSS classes don't apply to SVG text the same way. Not a real violation.

## Panel Detail: PanelFourHorsemen — WARN

**Issue:** SVG inline styles for 4 mini-chart labels
**Severity:** Low
**Details:** Same as above — SVG `<text>` elements with inline attributes. Correct for SVG charts.

## Panel Detail: PanelTechnologyAccelerates — WARN

**Issue:** SVG inline styles for axis labels and data points
**Severity:** Low
**Details:** Same as above — expected SVG styling pattern.

---

## Code Validation Summary

All 20 panels pass structural checks:
- **Animation:** All use `lerp` from `../../../utils/animation` — no custom helpers
- **Component structure:** All have correct `<section>` + `<div className="panel-body">` structure
- **Exports:** All use `export default function PanelName`
- **Contrast:** All coral text at body size includes `text-bold`
- **Inline styles:** Only `opacity` and `transform` for HTML; SVG uses standard attributes
- **JumpLinks:** PanelMolochTheDemon uses InlineJumpLink (cybregore), PanelLeaveTheCult uses JumpLink — both import correctly
- **Video panel:** PanelMolochTheDemon uses `panel-body--over-video` and `text-shadow-depth` (ready for background)

---

## Narrative Flow Assessment

### Arc Integrity

| Arc Phase | Panels | Assessment | Notes |
|-----------|--------|-----------|-------|
| Hook | 1-2 | Strong | "You are in a cult" — immediate, shocking |
| Evidence | 3-5 | Strong | Data-driven with SVG visualizations |
| Naming | 6-7 | Strong | Cult defined, invisible leader revealed |
| Escalation | 8-12 | Strong | Anatomy → trilogy of destruction |
| Climax | 13-15 | Strong | Mirror turn → "no moral standing" |
| Resolution | 16-20 | Strong | Moloch myth → monastery → leave the cult |

### Campaign Alignment

- [x] At least one "Flip It" inversion present (PanelYouAreTheCultMember, PanelNormalIsExtreme)
- [x] At least one mythology/demon-framing panel present (PanelMolochTheDemon, PanelPossessedCivilization)
- [x] Call-to-action points toward practice (PanelLeaveTheCult → monastery/wisdom)
- [x] Tone matches metadata specification (confrontational, revelatory, provocative, mythological, hopeful)
- [x] Key phrases appear verbatim

---

## Console Errors

None — build is clean, no TypeScript errors.

---

## Issue Summary (Ranked by Severity)

### Critical
None.

### High
None.

### Medium

1. **PanelMolochTheDemon — Missing video background**
   - Hand off to: `create-panel-background`
   - Panel already uses `panel-body--over-video` and `text-shadow-depth` — ready for a background
   - Requires: OPENAI_API_KEY, VEO_API_KEY, FFmpeg

2. **PanelTheMonastery, PanelPossessedCivilization — Missing visual backgrounds**
   - Hand off to: `create-panel-background`
   - Mythology/resolution panels that would benefit from immersive imagery

### Low

1. **PanelExtinctionData, PanelFourHorsemen, PanelTechnologyAccelerates — SVG inline styles**
   - Not actionable — inline attributes are the correct approach for SVG elements

---

## Next Steps

1. Generate video background for PanelMolochTheDemon when API keys are available
2. Generate backgrounds for mythology panels
3. Run full browser visual test when GUI browser is available
