# Explainer Testing Guide: What to Check and How

## Testing Philosophy

An explainer is not a website — it is a **narrative experience**. Testing must cover
both the technical (does it render correctly?) and the experiential (does it feel right?).

A panel can pass every technical check and still fail if the text appears too early,
the hold phase is too short, or the transition to the next panel feels jarring.

---

## The Five-Point Scroll Test (Detailed)

### Progress 0.0 — Entry Gate

**What should happen:** The panel has just entered the scroll trigger zone. GSAP has
pinned it. Content should be in its initial state — usually fully transparent or just
beginning to fade in.

**Common problems:**
- **Flash of content:** All text appears at full opacity instantly, then the animation
  starts. Usually caused by lerp starting at a progress > 0 but the element not having
  an initial opacity of 0.
  - Fix: Ensure the first lerp for each element starts at progress 0.0 (or the element
    has `opacity: 0` as a default)
- **Wrong background:** Background color doesn't match the design system's `panel--dark`
  (#3B4540) or video background hasn't loaded yet
- **Layout shift:** Content jumps position when the pin engages

**How to verify:**
```
Scroll to the exact start of the panel's scroll zone.
Take a screenshot.
Expected: Dark background, minimal or no visible content.
```

### Progress 0.05 — Early Entry

**What should happen:** The first element (usually the headline) should be starting
to fade in. The viewer should see something beginning to appear — enough to know
content is coming.

**Common problems:**
- **Nothing visible:** Animation doesn't start until progress 0.15 or later. The viewer
  scrolls through dead space with nothing happening.
  - Fix: Start first animation at 0.0, not 0.1 or later
- **Too much at once:** Multiple elements appear simultaneously instead of sequentially
  - Fix: Stagger lerp start values by 0.08-0.12

### Progress 0.25 — Quarter Mark

**What should happen:** Headlines should be fully visible. The panel's main statement
should be readable. If this is a progressive reveal panel, at least the first stage
should be complete.

**Common problems:**
- **Headlines still fading:** Animation is too slow — the viewer has scrolled 25% and
  can't read the content yet
  - Fix: Headlines should complete fade-in by progress 0.15-0.20
- **Low contrast:** Text that's "almost" faded in (opacity 0.3-0.6) is hard to read
  - Fix: Use faster fade-in curves so text is either invisible or nearly fully visible

### Progress 0.50 — The Midpoint (Critical)

**What should happen:** This is the panel's **prime state**. All essential content
should be visible and readable. This is what most viewers will see — they scroll to
roughly the middle and absorb.

**This is the most important test point.**

**Common problems:**
- **Content overflow:** Too much text for the viewport. Text clips below the fold.
  PanelAutoScaler should catch this but sometimes doesn't (if classes are wrong).
  - Verify: Does the `panel-body` div exceed 88% of viewport height?
  - Fix: Reduce content, increase scrollLength, or check PanelAutoScaler targeting
- **Competing elements:** Both headline and body copy are at full opacity, plus a
  concluding statement — too much text density
  - Fix: Stagger reveals more widely so not everything is visible at once
- **Interactive dead zone:** For interactive panels, this should be in the active zone.
  If the user can't interact at progress 0.5, the active window is misaligned.

### Progress 0.75 — Three-Quarter Mark

**What should happen:** Concluding content (kicker lines, emphasis text, coral boxes)
should be appearing. Body copy from earlier should still be visible. The panel should
feel like it's reaching its statement.

**Common problems:**
- **Early content has faded out:** Using lerpMulti with a fade-out that starts too
  early. Headlines disappear before the conclusion appears — the viewer sees a
  half-empty panel.
  - Fix: Don't fade out headlines. Let them persist. The next panel covers them.
- **Nothing new appears:** All content was already visible at 0.5, and 0.75 feels
  identical. This creates a dead scroll zone.
  - Fix: Add concluding content, or reduce scrollLength

### Progress 0.95 — Near Exit

**What should happen:** Panel is in its final state. All content should be visible.
The transition to the next panel should feel like a natural handoff.

**Common problems:**
- **Content fading out prematurely:** Some panels add exit animations. This is usually
  wrong — the next panel covers the current one, so exit fades are unnecessary.
  - Fix: Remove exit fade animations. Let content persist at full opacity.
- **Abrupt cut:** The next panel's background color is different and the transition
  feels like a hard cut instead of a scroll transition
  - Fix: Both panels should use panel--dark, or add a gradient transition

---

## Contrast Validation

### Minimum Contrast Ratios (WCAG 2.1)

| Text Size | Normal Text | Large Text (18px+ or 14px+ bold) |
|-----------|-------------|----------------------------------|
| AA | 4.5:1 | 3:1 |
| AAA | 7:1 | 4.5:1 |

### Design System Color Pairs

| Foreground | Background | Ratio | Grade |
|-----------|-----------|-------|-------|
| Cream #F5F2E8 | Deep Forest #3B4540 | ~8.5:1 | AAA |
| Sage #D1E7D2 | Deep Forest #3B4540 | ~5.8:1 | AA (AAA for large) |
| Coral #E07850 | Deep Forest #3B4540 | ~3.6:1 | AA Large only |
| Dark Olive #474924 | Deep Forest #3B4540 | ~1.3:1 | FAIL (intentionally muted) |
| Cream #F5F2E8 | Dark Olive #474924 | ~7.8:1 | AAA |
| Coral #E07850 | Dark Olive #474924 | ~3.3:1 | AA Large |

### Contrast Problem Areas

1. **Coral on dark — barely passes.** coral (#E07850) on deep-forest (#3B4540) is
   3.6:1, which only passes for large text (18px+ or 14px+ bold). If coral is used
   at `text-body` size, it must be bold or the text is non-essential (decorative).

2. **Text over video backgrounds.** Video opacity reduces the effective background
   darkness, which reduces contrast. At video opacity 0.5, contrast can drop below
   readable levels. Rule: text over video MUST use `text-shadow-depth` class.

3. **Animated opacity.** During fade-in, text at opacity 0.3-0.6 has severely reduced
   effective contrast. This is briefly acceptable (< 200ms equivalent of scroll distance)
   but should not persist.

4. **Dark olive as text.** `text-dark` and `text-olive` on deep-forest have almost no
   contrast. This is intentional for citations and metadata that should be barely
   visible. Verify this is the intended use — if important content uses these classes,
   it's a bug.

---

## Overflow & Fit Validation

### Viewport Boundaries

Content must fit within the viewport without triggering horizontal scroll or vertical
clipping. The key constraints:

- **Horizontal:** `panel-body` is `max-width: 700px` (or 900px for `--wide`), centered
  with `width: 90%`. On mobile, the 90% width with padding should prevent overflow.
- **Vertical:** PanelAutoScaler targets elements with class `panel-body` or
  `panel-content-wrapper`. It uses 88% of viewport height as the max. Minimum scale
  factor is 0.45.

### Common Overflow Scenarios

1. **Too many text elements visible simultaneously.** Panel has 5-6 text blocks that
   are all at opacity 1.0 at the midpoint. Total height exceeds the viewport.
   - Solution: Stagger reveals more widely, or reduce content

2. **Box-grid on mobile.** The `box-grid` class uses CSS `auto-fit` with `minmax(240px, 1fr)`.
   On viewports < 500px, both columns fit but content height doubles.
   - Verify: Does the grid wrap to single column on mobile? Does total height fit?

3. **SVG visualizations.** SVGs with `viewBox` scale correctly, but surrounding text +
   labels + the SVG can exceed the viewport.
   - Verify: Check total content height including annotations, titles, and source citations

4. **Long text in boxes.** `box-coral` or `box-dark` with multi-line text can be taller
   than expected. Especially problematic when combined with other visible elements.

5. **Interactive elements.** Breathing circles, simulated feeds, and other interactive
   elements may have fixed dimensions that don't scale on mobile.

### How to Detect Overflow

```javascript
// In browser console:
document.querySelectorAll('.panel-body').forEach(el => {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  if (rect.height > vh * 0.88) {
    console.warn(`Overflow: ${el.closest('section')?.className} — height ${rect.height}px exceeds ${vh * 0.88}px`);
  }
});
```

---

## Animation Validation

### Timing Expectations

Each panel element should follow the scroll choreography conventions:

| Phase | Progress Range | What Happens |
|-------|---------------|-------------|
| Entry | 0.00 - 0.12 | First element fades in + slides up |
| Headline Reveal | 0.12 - 0.35 | Headlines appear sequentially, ~8-12% apart |
| Hold | 0.35 - 0.55 | Fully visible. Viewer absorbs. |
| Body Copy | 0.55 - 0.75 | Body text fades in. Headlines remain. |
| Emphasis | 0.75 - 0.90 | Final emphasis, kicker text. |
| Exit | 0.90 - 1.0 | Content remains visible. No exit fade. |

### Common Animation Problems

1. **Custom rangeProgress function.** If a panel defines its own progress-mapping helper
   instead of using `lerp()` from `../../utils/animation`, the behavior may be subtly
   wrong (clamping, easing, edge cases).
   - Check: `grep -n "rangeProgress\|function.*progress" src/components/panels/Panel*.tsx`

2. **Overlapping lerp ranges.** Two elements with lerp ranges that overlap can cause
   visual fighting — both partially visible, neither readable.
   - Verify: At progress 0.5, are any elements at "in-between" opacity (0.3-0.7)?

3. **Missing initial state.** A lerp that starts at progress > 0 but the element doesn't
   have opacity 0 before that point. Result: element is visible at full opacity, then
   briefly flickers as the lerp kicks in.

4. **Transform jitter.** TranslateY animations that use too-large values (> 30px) can
   feel jerky during scroll. Values should be 15-25px max.

---

## Narrative Flow Validation

### The Emotional Arc Check

The explainer should follow a recognizable arc. After scrolling through everything,
answer these questions:

1. **Hook (Act 1):** Did the opening panel make a clear, bold claim?
   - If you scrolled past thinking "what is this about?" — the hook failed
2. **Evidence (Act 2):** Did the evidence feel concrete and credible?
   - If it felt like opinions without backing — evidence failed
3. **Naming (Act 3):** Was there a clear moment of "this is what we're talking about"?
   - If the central concept was never explicitly named/defined — naming failed
4. **Escalation (Acts 4-5):** Did the tension build?
   - If the middle felt flat — escalation failed
5. **Climax (Act 6):** Was there a peak moment that landed?
   - If you scrolled past it — climax failed
6. **Resolution (Act 7):** Did it feel complete and purposeful?
   - If it just ended — resolution failed

### Pacing Problems

| Problem | Symptom | Fix |
|---------|---------|-----|
| **Dead spots** | Scrolling through a panel with nothing changing | Increase content density or reduce scrollLength |
| **Speed bumps** | Panel feels like it takes forever | Reduce scrollLength or add more animation stages |
| **Whiplash** | Jarring tone shift between panels | Add a transition panel or soften the transition copy |
| **Redundancy** | Two panels say the same thing differently | Remove one or merge into a hybrid panel |
| **Missing bridge** | Logical gap between panels | Add a transition panel to bridge the gap |

### Campaign Alignment Check

- At least one "Flip It" inversion should be present
- At least one mythology/demon-framing panel should be present
- The call-to-action should point toward practice, not just information
- Tone should match the metadata's specified tones in their stated order of dominance
- Key phrases from the metadata should appear verbatim in the panels

---

## Console Error Classification

| Error Type | Severity | Action |
|-----------|----------|--------|
| **React render error** | Critical | Panel won't display. Fix immediately. |
| **Missing asset (404)** | High | Run generate-media or check file paths. |
| **GSAP ScrollTrigger warning** | Medium | May cause scroll issues. Check for conflicting triggers. |
| **React key warning** | Low | Functional but should be fixed. |
| **Unknown DOM property** | Low | Cosmetic warning, usually harmless. |
| **Deprecation warning** | Info | Note for future maintenance. |

---

## Mobile-Specific Checks

### Typography Scaling

The design system uses `clamp()` for all text sizes. On a 390px-wide viewport:

| Class | Minimum Size | Effective on 390px |
|-------|-------------|-------------------|
| text-display | 2.2rem (35.2px) | ~35px (min clamp) |
| text-title | 1.4rem (22.4px) | ~22px (min clamp) |
| text-body | 0.95rem (15.2px) | ~15px (min clamp) |
| text-small | 0.8rem (12.8px) | ~13px (min clamp) |
| text-label | 0.6rem (9.6px) | ~10px (min clamp) |

All body text should be at least 15px on mobile. Labels at 10px are intentionally
small but should still be legible.

### Touch Targets

Interactive elements (buttons, links, breathing circles, feed items) need minimum
44x44px touch targets on mobile. Check especially:
- JumpLink components
- Interactive panel controls
- Source citation links

### Viewport Height

Mobile browsers have address bars that change height. The `dvh` unit handles this,
but check that:
- Panel content fits within the "small viewport" (address bar visible)
- No content is hidden behind the mobile browser's bottom toolbar
- `max-height: 92dvh` on panel-body accounts for browser chrome

---

## Performance Checks

### During Scroll

- Scroll should feel smooth (60fps). If it stutters:
  - Check for expensive re-renders (React DevTools profiler)
  - Check for layout thrashing (elements being read and written in the same frame)
  - Check for oversized images (should use responsive WebP variants)

### Asset Loading

- Images should lazy-load or preload appropriately
- Videos should not autoplay until their panel is near the viewport
- No single asset should be larger than 2MB (check with Network tab)

### Memory

- After scrolling through all panels, memory usage should be stable
- Video elements should be paused/unloaded when off-screen
