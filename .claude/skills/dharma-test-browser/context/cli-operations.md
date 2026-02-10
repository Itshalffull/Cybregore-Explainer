# Cybregore-Explainer: CLI Operations Reference

## 1. Project Basics

- **Location:** The project root contains `package.json`, `src/`, `public/`, `scripts/`
- **Tech stack:** React 18 + TypeScript 5.3 + Vite 5.0 + GSAP 3.14 + Framer Motion 10.16
- **Package manager:** npm (no yarn.lock or pnpm-lock.yaml)

## 2. Install Dependencies

```bash
npm install
```

Key dependencies: react/react-dom (18.x), gsap (3.14.x), framer-motion (10.16.x),
sharp (0.34.x), typescript (5.3.x), vite (5.0.x), @vitejs/plugin-react

## 3. Development Server

```bash
npm run dev          # Starts Vite dev server (default http://localhost:5173/)
npx vite --port 3000 # Custom port
npx vite --host 0.0.0.0  # Expose on network
```

Supports HMR. Source maps enabled.

## 4. Production Build

```bash
npm run build     # tsc (type check) + vite build → dist/
npm run preview   # Serve dist/ at http://localhost:4173/
```

## 5. Type Checking

```bash
npx tsc --noEmit          # One-shot type check
npx tsc --noEmit --watch  # Continuous watching
```

## 6. Responsive Media Generation

```bash
npm run generate-media
# Or directly:
node scripts/generate-responsive-media.mjs
node scripts/generate-responsive-media.mjs --force  # Force regeneration
```

Generates WebP variants (480w, 768w, 1280w) from PNGs, and mobile video variants
(480p, CRF 28) from MP4s. Requires ffmpeg for video.

## 7. No Tests or Linter

No test framework (no Jest, Vitest, Playwright, Cypress). No ESLint/Prettier config.
Validation is via: tsc --noEmit, vite build, and manual browser testing.

## 8. Debugging from CLI

```bash
# TypeScript errors
npx tsc --noEmit 2>&1

# Broken imports (build fails)
npm run build 2>&1

# Panel files
ls src/components/panels/

# Panel registrations
grep -n "import.*Panel" src/explainers/CybregoreExplainer.tsx

# Router registrations
grep -n "metadata\|content\|title" src/App.tsx
```

### Common Issue Diagnostics

```bash
# Panel doesn't appear
grep "YourPanelName" src/explainers/CybregoreExplainer.tsx
ls src/components/panels/YourPanelName.tsx
npx tsc --noEmit 2>&1 | grep "YourPanelName"

# Missing media
ls public/assets/images/your-image-*w.webp
ls public/assets/videos/your-video-loop-mobile.mp4
npm run generate-media
```

## 9. Quick Validation Checklist

```bash
npx tsc --noEmit           # 1. Types pass
npm run build              # 2. Build succeeds
npm run dev                # 3. Dev server starts (Ctrl+C after confirming)
npm run generate-media     # 4. Media variants generated (if images/videos changed)
```

## 10. Project File Structure

```
package.json                          # Scripts: dev, build, preview, generate-media
tsconfig.json / vite.config.ts        # Config files
index.html                            # Entry (loads src/main.tsx)

src/
  main.tsx                            # ReactDOM.createRoot
  App.tsx                             # ExplainerRouter with registered explainers
  types/metadata.ts                   # ExplainerMetadata interfaces
  utils/animation.ts                  # lerp() and lerpMulti()
  styles/design-system.css            # All CSS tokens and classes
  components/
    ScrollSection.tsx                 # GSAP ScrollTrigger scroll-pinning
    PanelAutoScaler.tsx               # Responsive viewport-fit scaling
    AutoScaleContent.tsx              # Content wrapper for auto-scaling
    VideoBackground.tsx               # Responsive video/image backgrounds
    IntroSection.tsx                  # Fixed background for first panel
    ExplainerRouter.tsx               # Multi-explainer navigation
    JumpLink.tsx                      # Cross-explainer links
    JumpBreadcrumbs.tsx               # Navigation history
    ScrollIndicator.tsx               # Initial "scroll" hint
    ContinueScrollIndicator.tsx       # Idle "keep going" prompt
    panels/                           # All panel components (50+)
  explainers/
    CybregoreExplainer.tsx            # Main explainer assembly
    cybregore-metadata.ts             # Narrative metadata
    ExampleExplainer.tsx              # Minimal example
    example-metadata.ts               # Example metadata

public/assets/
  images/                             # PNGs + WebP variants
  videos/                             # MP4s + mobile variants

scripts/
  generate-responsive-media.mjs       # Media generation script
```

## 11. Navigating Multi-Explainer Projects

```bash
# List all explainers
grep -A5 "explainers={{" src/App.tsx

# Navigate by URL hash
# http://localhost:5173/#cybregore
# http://localhost:5173/#example-explainer
```
