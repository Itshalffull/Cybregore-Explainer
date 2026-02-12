---
name: create-panel-background
description: "Creates looping animated video backgrounds and ambient SFX for interactive scrolling explainer panels. Use when user wants to add a new background, create a panel image/video, generate animated assets, or add background audio."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Create Panel Background

This skill creates looping animated backgrounds and ambient sound effects for interactive scrolling explainer panels.

## Context

This project is an interactive scrolling explainer built with React and GSAP ScrollTrigger. Each panel has a full-screen animated video background that loops seamlessly as the user scrolls through the content. Panels can also have subtle background SFX that fade in/out with scroll progress.

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

Use the `create-image.js` script (included in this skill) to generate a static image. **Default generator: Google Nano Banana Pro** (Gemini 3 Pro Image).

```bash
node .claude/skills/create-panel-background/create-image.js <filename>.png "<description>" --output-dir public/assets/images
```

The script automatically applies the zen style. Focus your description on:
- The subject/scene (what is depicted)
- The mood/emotion (contemplative, ominous, hopeful, etc.)
- Composition hints (centered, minimal, abstract, etc.)

**Example:**
```bash
node .claude/skills/create-panel-background/create-image.js meditation.png "A single figure meditating in beam of light, surrounded by darkness, peaceful and centered, minimal composition"
```

**Options:**
- `--size 9:16` - Aspect ratio (default: 16:9). Options: 1:1, 3:2, 2:3, 4:3, 3:4, 16:9, 9:16. Legacy pixel sizes (1536x1024, etc.) also accepted.
- `--resolution 4K` - Image resolution (default: 2K). Options: 1K, 2K, 4K
- `--no-style` - Skip the zen style prefix
- `--openai` - Use OpenAI GPT-Image instead of Nano Banana Pro
- `--output-dir <path>` - Directory to save image (required)

**Environment Variables:**
- `GEMINI_API_KEY` - Google AI API key (falls back to `VEO_API_KEY`)
- `OPENAI_API_KEY` - Only needed with `--openai` flag

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
node .claude/skills/create-panel-background/create-video.js meditation.png meditation-loop.mp4 "Gentle breathing movement of the figure, soft light pulsing slowly, particles floating upward"
```

**Options:**
- `--duration 8` - Longer video (default: 5s, max: 8s)
- `--veo2` - Use Veo 2.0 (recommended, Veo 3.1 lastFrame not yet supported)
- `--no-style` - Skip animation style prefix
- `--output-dir <path>` - Directory to save video (required)

## Step 3: Generate Background SFX (Optional)

Use the `create-sfx.js` script (included in this skill) to generate subtle ambient sound effects via ElevenLabs:

```bash
node .claude/skills/create-panel-background/create-sfx.js <filename>.mp3 "<description>" --output-dir public/assets/audio
```

The script applies an ambient style prefix by default that ensures sounds are **subtle, atmospheric, and non-intrusive** — perfect as background texture beneath content.

Focus your SFX description on:
- The ambient environment (forest, cave, digital space, temple, ocean)
- Subtle textures (wind, hum, resonance, distant echoes, soft crackling)
- Mood (meditative, ominous, sacred, digital, organic)

**Example:**
```bash
node .claude/skills/create-panel-background/create-sfx.js temple-ambience.mp3 "Distant temple bells echoing in a stone chamber with soft wind" --output-dir public/assets/audio
```

**Options:**
- `--duration 15` - Sound duration (default: 10s, max: 22s)
- `--influence 0.6` - Prompt influence 0-1 (default: 0.4). Higher = closer to prompt.
- `--no-style` - Skip ambient style prefix (use raw prompt)
- `--no-loop` - Don't generate a seamless loop
- `--output-dir <path>` - Directory to save audio (default: public/assets/audio/)

**Default SFX Style Prompt:**
> Subtle background ambience, barely perceptible, quiet and atmospheric, gentle and non-intrusive, low volume backdrop texture, meditative undertone, soft and continuous

This ensures all generated SFX are suitable as scroll-driven background atmosphere rather than attention-grabbing sounds.

**Environment Variables:**
- `ELEVENLABS_API_KEY` - Your ElevenLabs API key (required)

## Step 4: Add to Panel Component

Import VideoBackground and optionally AudioBackground, then add to the panel:

```tsx
import VideoBackground from '../../components/VideoBackground'
import AudioBackground from '../../components/AudioBackground'

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

      <AudioBackground
        audioSrc="/assets/audio/your-ambience.mp3"
        progress={progress}
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

### AudioBackground Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `audioSrc` | string | - | Path to audio file (mp3) |
| `progress` | number | - | Scroll progress for this panel (0-1) |
| `maxVolume` | number | 0.3 | Peak volume at full visibility (0-1) |
| `fadeInEnd` | number | 0.1 | Progress value where fade-in completes |
| `fadeOutStart` | number | 0.8 | Progress value where fade-out begins |

**Audio volume curve:** Silent at progress 0 → fades in to `maxVolume` by `fadeInEnd` → holds at `maxVolume` → fades out starting at `fadeOutStart` → silent at progress 1. Audio pauses when silent to save resources.

### Tips

1. **Always provide imageFallback** - Shows immediately while video loads
2. **Keep opacity low (0.2-0.5)** - Backgrounds should be subtle
3. **Use lerp for scroll-based opacity** - Fade in/out based on progress
4. **Content needs zIndex: 1** - Ensures content appears above background
5. **Keep maxVolume low (0.2-0.4)** - SFX should be felt more than heard
6. **Audio requires user interaction** - Browser autoplay policies mean audio starts on first scroll, not on page load

## Environment Variables Required

```bash
export GEMINI_API_KEY=your-google-ai-key     # For image generation (Nano Banana Pro)
export VEO_API_KEY=your-google-ai-key        # For video generation (also used as image fallback)
export ELEVENLABS_API_KEY=your-elevenlabs-key # For SFX generation
export OPENAI_API_KEY=your-openai-key        # Only needed with --openai flag
```

## Complete Workflow Example

Creating a background with ambient audio for a "digital overwhelm" panel:

```bash
# 1. Generate the image (Nano Banana Pro)
node .claude/skills/create-panel-background/create-image.js overwhelm.png "Abstract representation of information overload, streams of data fragments overwhelming a small human figure, chaotic but beautiful" --output-dir public/assets/images

# 2. Generate the seamless video
node .claude/skills/create-panel-background/create-video.js public/assets/images/overwhelm.png overwhelm-loop.mp4 "Data streams flowing rapidly, figure remains still while chaos swirls, particles multiplying and dissolving" --output-dir public/assets/videos --veo2

# 3. Generate background SFX
node .claude/skills/create-panel-background/create-sfx.js overwhelm-ambience.mp3 "Low digital static with faint notification chirps layered beneath a deep electronic drone" --output-dir public/assets/audio

# 4. Add VideoBackground + AudioBackground to your panel component (see Step 4)
```

## Using with Arguments

If invoked as `/create-panel-background meditation "figure meditating in light"`, use:
- Panel name: `meditation`
- Image filename: `meditation.png`
- Video filename: `meditation-loop.mp4`
- SFX filename: `meditation-ambience.mp3`
- Description: Base the prompts on "figure meditating in light"
