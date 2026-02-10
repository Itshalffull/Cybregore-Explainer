---
name: create-panel-background
description: "Creates looping animated video backgrounds for interactive scrolling explainer panels. Use when user wants to add a new background, create a panel image/video, or generate animated assets."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Create Panel Background

This skill creates looping animated backgrounds for interactive scrolling explainer panels.

## Context

This project is an interactive scrolling explainer built with React and GSAP ScrollTrigger. Each panel has a full-screen animated video background that loops seamlessly as the user scrolls through the content.

## What Makes a Good Panel Background

The background should be:
- **Visually interesting** but not distracting - it's a backdrop for text content
- **Conveys emotion and theme** of the panel's message
- **Subtle animation** - gentle movement that creates atmosphere without pulling focus
- **Dark/muted colors** - uses the zen palette so text remains readable
- **Seamless loop** - the video loops perfectly without visible jumps

The zen visual style uses:
- Deep forest green background (#3B4540)
- Sage and pale mint accents (#D1E7D2, #DFEEE2)
- Cream colored line art details (#F5F2E8)
- Dark olive shadows (#474924)
- Occasional coral accent for emphasis (#E07850)

## Step 1: Generate the Image

Use the `create-image.js` script (included in this skill) to generate a static image:

```bash
node .claude/skills/create-panel-background/create-image.js <filename>.png "<description>" --output-dir public/assets/images
```

The script automatically applies the zen style. Focus your description on:
- The subject/scene (what is depicted)
- The mood/emotion (contemplative, ominous, hopeful, etc.)
- Composition hints (centered, minimal, abstract, etc.)

**Example:**
```bash
node scripts/create-image.js meditation.png "A single figure meditating in beam of light, surrounded by darkness, peaceful and centered, minimal composition"
```

**Options:**
- `--size 1024x1536` - Portrait aspect ratio
- `--no-style` - Skip the zen style prefix
- `--output-dir <path>` - Directory to save image (required)

## Step 2: Generate the Video

Animate the image with the `create-video.js` script (included in this skill):

```bash
node .claude/skills/create-panel-background/create-video.js <image-path> <video>.mp4 "<animation-description>" --output-dir public/assets/videos
```

Uses Google Veo 2.0 with FFmpeg for seamless loops. Animation style prefix applied automatically.

Focus your animation description on:
- Type of motion (breathing, floating, pulsing, drifting, flickering)
- Speed (slow, subtle, gentle, imperceptible)
- What elements move (particles, light, shadows, the figure)

**Example:**
```bash
node scripts/create-video.js meditation.png meditation-loop.mp4 "Gentle breathing movement of the figure, soft light pulsing slowly, particles floating upward"
```

**Options:**
- `--duration 8` - Longer video (default: 5s, max: 8s)
- `--veo2` - Use Veo 2.0 (recommended, Veo 3.1 lastFrame not yet supported)
- `--no-style` - Skip animation style prefix
- `--output-dir <path>` - Directory to save video (required)

## Step 3: Add to Panel Component

Import VideoBackground and add to the panel:

```tsx
import VideoBackground from '../VideoBackground'

export default function PanelExample({ progress }: PanelExampleProps) {
  // Control opacity based on scroll progress (optional)
  const bgOpacity = lerp(progress, 0, 0.1, 0, 0.4)

  return (
    <section className="panel" style={{
      position: 'relative',
      minHeight: '100dvh',
      background: 'var(--deep-forest)',
      overflow: 'hidden',
    }}>
      <VideoBackground
        videoSrc="/assets/videos/your-video-loop.mp4"
        imageFallback="/assets/images/your-image.png"
        opacity={bgOpacity}
      />

      {/* Content must have position: relative and zIndex: 1 */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Panel content */}
      </div>
    </section>
  )
}
```

### VideoBackground Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `videoSrc` | string | - | Path to video file |
| `imageFallback` | string | - | Path to fallback image (shown while video loads) |
| `opacity` | number | 0.3 | Background opacity (0-1) |

### Tips

1. **Always provide imageFallback** - Shows immediately while video loads
2. **Keep opacity low (0.2-0.5)** - Backgrounds should be subtle
3. **Use lerp for scroll-based opacity** - Fade in/out based on progress
4. **Content needs zIndex: 1** - Ensures content appears above background

## Environment Variables Required

```bash
export OPENAI_API_KEY=your-openai-key    # For image generation
export VEO_API_KEY=your-google-ai-key    # For video generation
```

## Complete Workflow Example

Creating a background for a "digital overwhelm" panel:

```bash
# 1. Generate the image
node .claude/skills/create-panel-background/create-image.js overwhelm.png "Abstract representation of information overload, streams of data fragments overwhelming a small human figure, chaotic but beautiful" --output-dir public/assets/images

# 2. Generate the seamless video (use absolute path for source image)
node .claude/skills/create-panel-background/create-video.js public/assets/images/overwhelm.png overwhelm-loop.mp4 "Data streams flowing rapidly, figure remains still while chaos swirls, particles multiplying and dissolving" --output-dir public/assets/videos --veo2

# 3. Add VideoBackground to your panel component (see Step 3)
```

## Using with Arguments

If invoked as `/create-panel-background meditation "figure meditating in light"`, use:
- Panel name: `meditation`
- Image filename: `meditation.png`
- Video filename: `meditation-loop.mp4`
- Description: Base the prompts on "figure meditating in light"
