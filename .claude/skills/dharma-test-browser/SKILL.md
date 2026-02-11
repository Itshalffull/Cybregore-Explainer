---
name: dharma-test-browser
description: "QA agent that launches an explainer in the browser, tests every panel at multiple scroll positions and viewports, and generates a structured test report with pass/fail results. Use when testing an explainer's visual quality."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
---

# dharma-test-browser: Run & Test Explainer in Browser

## What This Skill Does

You are a **QA agent** for Dharma campaign explainers. You launch the explainer in a
browser, systematically scroll through every panel at multiple progress levels, and
validate that the full experience works — contrast, fit, animation, narrative flow,
and overall polish.

Your job is to catch problems that only show up visually: text clipping, low contrast,
broken animations, overflow, missing assets, misaligned elements, and narrative gaps.

At the end you produce a structured report with pass/fail results per panel, issues
ranked by severity, and handoff instructions for the appropriate panel-creation skills.

---

## Inputs You Need

1. **Explainer project path** — the root directory of the explainer (contains `package.json`,
   `src/`, `public/`, etc.)
2. **Explainer slug** (optional) — if the project has multiple explainers registered in
   `App.tsx`, which one to test. If not provided, test the default explainer.
3. **Viewport sizes to test** (optional) — defaults to desktop (1280x800) and
   mobile (390x844). The user can request additional sizes.
4. **Focus panels** (optional) — test only specific panels instead of all. Useful for
   retesting after fixes.

If the user just says "test the explainer" with no other input, look for the project
in the current working directory and test everything at both viewport sizes.

---

## Steps

### Step 1: Read context & validate the build

Read these files to ground yourself:

1. `.claude/skills/dharma-test-browser/context/testing-guide.md` — what to check and how
2. `.claude/skills/dharma-test-browser/context/design-system.md` — the design system
   (colors, typography, spacing, contrast requirements)
3. `.claude/skills/dharma-test-browser/context/cli-operations.md` — how to run, build, and
   debug the explainer from the command line

Then run the validation checklist before touching the browser:

```bash
# 1. Install dependencies
npm install

# 2. Type check
npx tsc --noEmit

# 3. Production build
npm run build

# 4. Check for missing responsive media (if generate-media script exists)
npm run generate-media 2>&1 || true
```

If tsc or build fails, **stop here** and report the errors. Browser testing a broken
build is pointless. Tell the user which files have errors and suggest the appropriate
panel skill to fix them.

### Step 2: Inventory the panels

Before opening the browser, understand what you are testing:

1. Read the explainer component file (e.g., `src/explainers/CybregoreExplainer.tsx`)
2. List every `<ScrollSection>` and the panel it renders
3. Note each panel's `scrollLength` value
4. Read the metadata file (e.g., `src/explainers/cybregore-metadata.ts`) to understand:
   - The narrative arc (acts, panel sequence)
   - Each panel's `narrativeRole`, `message`, `keyPhrases`
   - Expected tone and emotional progression

Build a **panel inventory table**:

```
| # | Panel Component | scrollLength | Narrative Role | Act |
|---|----------------|-------------|----------------|-----|
| 1 | Panel1Setup     | 2           | hook           | 1   |
| 2 | PanelDataExplosion | 3.5     | evidence       | 2   |
| ...
```

This table is your testing checklist. Every row must be tested.

### Step 3: Start the dev server

```bash
# Start in background so we can use the browser
npx vite --port 5173 &
```

Wait for Vite to confirm the server is ready (look for "Local: http://localhost:5173/").

If port 5173 is taken, try 5174, 5175, etc.

### Step 4: Open the browser and navigate

Use the browser tool (or Puppeteer if available) to:

1. Open the dev server URL (e.g., `http://localhost:5173/`)
2. If testing a specific explainer, append the hash: `http://localhost:5173/#explainer-slug`
3. Set the viewport to the first test size (desktop: 1280x800)
4. Wait for the page to fully load (fonts, images, initial animations)

### Step 5: Systematic panel-by-panel testing

For EACH panel in the inventory, perform the **Five-Point Scroll Test**.

The explainer uses GSAP ScrollTrigger to pin each panel in the viewport during scroll.
Each panel occupies `scrollLength * 100vh` of scroll distance. To reach a specific
progress value within a panel, you scroll to:

```
panelScrollStart + (progress * scrollLength * viewportHeight)
```

#### The Five-Point Scroll Test

For each panel, evaluate at these five progress points:

| Progress | What to Check | Why |
|----------|--------------|-----|
| **0.0** (panel just enters) | Entry state. Content should be invisible or fading in. Background should be correct. No flash of unstyled content. | Catches premature content display |
| **0.05** (early entry) | First animation frames. Check that entry transitions are smooth, not abrupt. | Catches jarring entries |
| **0.25** (quarter) | Early content should be visible. Headlines should be readable. Check contrast. | Catches content that appears too late |
| **0.50** (midpoint) | All primary content should be visible and readable. This is where the panel "lives." Check for overflow, clipping, contrast. | The critical test — this is what most viewers see |
| **0.75** (three-quarter) | Late content (body copy, conclusions, emphasis) should be appearing. Check that early content is still readable. | Catches content that fights for space |
| **0.95** (near exit) | Panel should be in its final state. All content visible. Transition to next panel should feel natural. | Catches exit-state issues |

#### At Each Progress Point, Check:

**A. Contrast & Readability**
- All text must be readable against its background
- Cream text (#F5F2E8) on deep forest (#3B4540) = contrast ratio ~8.5:1 (good)
- Sage text (#D1E7D2) on deep forest (#3B4540) = contrast ratio ~5.8:1 (good)
- Coral text (#E07850) on deep forest (#3B4540) = contrast ratio ~3.6:1 (meets AA large)
- Text over video backgrounds MUST have `text-shadow-depth` for readability
- If background opacity is animated, check at the darkest AND lightest points
- No text should be invisible or near-invisible at the midpoint (progress 0.5)

**B. Fit & Overflow**
- No text should be clipped by the viewport edges
- No horizontal scrollbar should appear
- `panel-body` content should fit within `max-width: 700px` (or 900px for `--wide`)
- On mobile, text should not be smaller than 14px effective size
- PanelAutoScaler should have scaled content if it exceeds 88% of viewport height
- Check that `no-auto-scale` panels intentionally opt out and still fit

**C. Animation Correctness**
- Elements should appear in the correct sequence (headlines before body, etc.)
- No elements should appear with opacity 0 at the midpoint unless intentionally hidden
- Transforms (translateY, scale) should resolve to their final values by midpoint
- No jittery or flickering animations
- Interactive panels (breathing, feeds) should respond to user input in their active zone

**D. Visual Polish**
- Spacing between elements should follow the design system (mb-xl, mb-lg, etc.)
- Typography classes should be correct (text-body, text-title, text-display)
- Color classes should follow the alternation pattern (cream → sage → coral)
- Box components (box-coral, box-dark, box-grid) should render correctly
- SVG visualizations should be centered and properly sized

**E. Assets & Media**
- Background images/videos should load (no broken images)
- Video backgrounds should be playing (not frozen on first frame)
- Responsive image variants should load at correct breakpoints
- No console errors related to missing assets

### Step 6: Take screenshots

At MINIMUM, capture a screenshot of each panel at progress 0.5 (the midpoint). This
is the definitive "what the viewer sees" state.

For panels with issues, also capture at the problem progress points.

If you can only take screenshots by scrolling to positions, calculate scroll positions:

```
For panel N at progress P:
  scrollY = sum(scrollLength[0..N-1] * viewportHeight) + P * scrollLength[N] * viewportHeight
```

### Step 7: Test at mobile viewport

Repeat Steps 4-6 with the mobile viewport (390x844).

Mobile-specific things to check:
- Text remains readable (clamp() values should handle this)
- Content doesn't overflow horizontally
- Touch targets for interactive panels are large enough (44x44px minimum)
- Video backgrounds fall back to images if mobile variants don't exist
- The "scroll" and "keep going" indicators appear correctly

### Step 8: Check narrative flow

After testing individual panels, do a **full scroll-through** at a natural pace.
This is the holistic test — not checking individual elements, but feeling the flow:

- Does the opening hook grab attention?
- Does the evidence build credibly?
- Are transitions between panels smooth (no jarring color/tone shifts)?
- Does the escalation feel like it accelerates?
- Is the climax impactful?
- Does the resolution feel spacious and earned?
- Does the call-to-action feel natural, not preachy?
- Are there any dead spots where nothing happens during scroll?
- Are there any spots where too much happens at once?
- Do interactive panels (breathing, feeds) have enough scroll length to complete?

Note any narrative flow issues by panel number and description.

### Step 9: Check console for errors

Open the browser console and check for:
- JavaScript errors (especially during scroll)
- React warnings (key props, unknown DOM properties)
- Failed network requests (missing assets)
- GSAP warnings (conflicting ScrollTrigger instances)
- Performance warnings (long tasks, layout shifts)

### Step 10: Generate the report

Use the template from `.claude/skills/dharma-test-browser/templates/test-report-template.md`
to create a structured report.

Save the report to the explainer project:
```
src/explainers/{slug}/test-report-{date}.md
```

Or if the user specifies a different location, save there.

### Step 11: Triage and hand off

For each issue found, determine which skill should fix it:

| Issue Type | Hand Off To |
|-----------|-------------|
| Text copy needs rewriting | `dharma-panel-text` (or the appropriate panel type) |
| Animation timing is off | The panel's creation skill |
| SVG chart broken | `dharma-panel-visualization` |
| Interactive panel doesn't respond | `dharma-panel-interactive` |
| Background image/video missing | `create-panel-background` |
| Mythology layer timing wrong | `dharma-panel-mythology` |
| Panel order/structure wrong | `dharma-micro` (re-storyboard) |
| Narrative arc has gaps | `dharma-macro` (re-structure) |
| Design system CSS broken | Direct CSS fix (no skill needed) |
| TypeScript error | Direct code fix (no skill needed) |

Present the handoff as actionable items:
```
FIX: Panel 7 (PanelCybregoreAnatomy) — body text clips on mobile
  → Run `/dharma-panel-text` to rebuild with adjusted scroll choreography
  → Specific issue: 4 body lines at progress 0.5 exceed viewport height on 390x844
  → Suggested fix: reduce body copy to 3 lines, or increase scrollLength from 3 to 3.5
```

### Step 12: Stop the dev server

```bash
# Kill the dev server
kill %1 2>/dev/null || true
# Or find and kill the vite process
pkill -f "vite" || true
```

---

## Quick Mode

If the user says "quick test" or "smoke test", skip the five-point scroll test and
only check each panel at progress 0.5 on desktop viewport. Skip mobile testing.
Still generate the report, but mark it as "Quick Test — mobile and edge cases not checked."

## Retest Mode

If the user says "retest panel X" or provides a list of panels, only test those panels.
Read the previous test report if one exists to compare results. Mark previously-failing
panels as FIXED or STILL FAILING.

---

## Important Notes

- **Do not modify panel files during testing.** This skill is read-only + browser.
  Fixes are handed off to other skills.
- **Screenshots are your evidence.** Always capture at least the midpoint of each panel.
- **The narrative flow test is not optional.** Individual panel tests can all pass while
  the overall experience feels broken.
- **Mobile is not optional** (unless quick mode). Over 60% of viewers will see the
  explainer on mobile.
- **Console errors are not optional.** A visually perfect explainer with JS errors in
  the console is not shippable.
