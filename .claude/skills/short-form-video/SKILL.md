---
name: short-form-video
description: "Generate short-form videos (TikTok, Reels, Shorts, YouTube) from explainers. Automates voiceover, background music, browser recording, and audio mixing. Use when the user wants to create a video from an explainer."
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Task, AskUserQuestion
---

# Short-Form Video Generator

Creates short-form videos from Dharma campaign explainers by recording the scroll experience with synchronized voiceover, background music, and panel SFX.

## What This Skill Does

1. Reads explainer metadata to extract panel info and voiceover text
2. Generates voiceover narration per panel via ElevenLabs TTS
3. Records the explainer scrolling in a headless browser (Puppeteer), with scroll timing derived from voiceover durations
4. Generates background music to match the actual recorded video duration (Suno AI, falls back to ElevenLabs Music)
5. Mixes audio layers: voiceover (100%), panel SFX (20%), music (~30%)
6. Outputs final video in 9:16 (vertical) and/or 16:9 (horizontal) format

## Prerequisites

- **FFmpeg** installed and on PATH
- **Puppeteer** installed (`npm install puppeteer`)
- **Vite dev server** running (`npm run dev`)
- **ELEVENLABS_API_KEY** environment variable set
- Optionally: **SUNO_API_BASE_URL** + **SUNO_API_KEY** for Suno music generation

## Quick Start

### Generate a video from an explainer

```bash
# Make sure dev server is running first
npm run dev &

# Generate vertical video (TikTok/Reels/Shorts)
node .claude/skills/short-form-video/create-short-video.js cybregore

# Generate both vertical and horizontal
node .claude/skills/short-form-video/create-short-video.js cybregore --dual

# Generate horizontal only (YouTube)
node .claude/skills/short-form-video/create-short-video.js cybregore --format 16:9
```

### Generate only voiceover

```bash
node .claude/skills/short-form-video/create-voiceover.js cybregore
node .claude/skills/short-form-video/create-voiceover.js cybregore --voice "EXAVITQu4vr4xnSDxMaL" --panels panel-the-hook,panel-data-explosion
```

### Generate only background music

```bash
node .claude/skills/short-form-video/create-music.js "Dark ambient electronic, minimal, meditative"
node .claude/skills/short-form-video/create-music.js "Ethereal choir drones" --provider elevenlabs --duration 180
```

## Voiceover Text Source

The voiceover script for each panel is sourced in this priority order:

1. **`panel.voiceover`** field in metadata — explicit narration text, authored per-panel
2. **Auto-generated** from `panel.message` + `panel.keyPhrases` — when no voiceover field exists

To add explicit voiceover text, include the `voiceover` field in your PanelMeta:

```typescript
{
  id: 'panel-the-hook',
  title: 'The Hook',
  narrativeRole: 'hook',
  message: 'Humanity has merged with technology...',
  voiceover: 'What if I told you that you are already part of something inhuman? Not metaphorically. Literally. Right now, as you scroll.',
  // ...
}
```

## Scripts Reference

### create-short-video.js — Main Orchestrator

```
node create-short-video.js <slug> [options]

Options:
  --format <ratio>        9:16 | 16:9 (default: 9:16)
  --dual                  Generate both formats
  --music-prompt <text>   Background music prompt
  --voice <id>            ElevenLabs voice ID (default: Adam)
  --output <path>         Custom output path
  --panels <ids>          Comma-separated panel IDs
  --port <num>            Vite dev server port (default: 5173)
  --pause-pad <sec>       Extra pause per panel (default: 0.5)
  --scroll-speed <mult>   Scroll speed multiplier (default: 1.0)
  --music-volume <0-1>    Music volume (default: 0.30)
  --sfx-volume <0-1>      SFX volume (default: 0.20)
  --skip-voiceover        Skip voiceover generation
  --skip-music            Skip music generation
  --skip-record           Skip browser recording
  --skip-mix              Skip audio mixing
  --reuse-voiceover       Reuse existing voiceover files
  --reuse-music           Reuse existing music file
```

### create-voiceover.js — ElevenLabs TTS

```
node create-voiceover.js <slug> [options]

Options:
  --voice <id>            Voice ID (default: Adam - pNInz6obpgDQGcFmaJgB)
  --model <id>            TTS model (default: eleven_multilingual_v2)
  --panels <ids>          Comma-separated panel IDs
  --output-dir <path>     Output directory
  --stability <0-1>       Voice stability (default: 0.5)
  --similarity <0-1>      Voice similarity (default: 0.75)
  --style <0-1>           Style exaggeration (default: 0.0)

Output:
  public/assets/audio/voiceover/voiceover-{panel-id}.mp3
  public/assets/audio/voiceover/voiceover-manifest-{slug}.json
```

### create-music.js — Suno + ElevenLabs Music

```
node create-music.js "<prompt>" [options]

Options:
  --output <path>          Output path
  --duration <seconds>     Target duration (default: 120)
  --provider <name>        suno | elevenlabs (default: auto)
  --suno-base-url <url>    Suno API URL
  --instrumental           No vocals (default)
  --with-vocals            Include vocals
  --style <text>           Additional style direction
```

## How the Recording Works

1. **Puppeteer** opens the explainer in a headless Chrome at the target viewport size
2. For each panel, the script:
   - **Scrolls** smoothly into the panel (ease-in-out cubic, ~1.5s)
   - **Pauses** at the "sweet spot" (progress ~0.4) for the voiceover duration + padding
   - **Continues** to the next panel
3. **CDP Page.startScreencast** captures JPEG frames throughout
4. **FFmpeg** assembles frames into a raw video at the captured framerate
5. Audio tracks are mixed with FFmpeg's `amix` filter and combined with the video

## Audio Mix Levels

| Layer | Default Volume | Description |
|-------|---------------|-------------|
| Voiceover | 100% (1.0) | Panel narration from ElevenLabs TTS |
| SFX | 20% (0.20) | Panel-specific ambient sounds |
| Music | 30% (0.30) | Background music from Suno/ElevenLabs |

Adjust with `--sfx-volume` and `--music-volume` flags.

## Output Formats

| Format | Resolution | Platform |
|--------|-----------|----------|
| 9:16 | 1080x1920 | TikTok, Instagram Reels, YouTube Shorts |
| 16:9 | 1920x1080 | YouTube, Web embeds |

Output files are saved to `output/{slug}-{format}.mp4` by default.

## Workflow with the Dev Mode Button

The dev mode toolbar includes a "Video" button that triggers this pipeline from the browser:

1. Click **Video** in the dev toolbar
2. Configure format, music prompt, and voice
3. Click **Generate** — the pipeline runs server-side
4. Progress is streamed to the dev panel
5. Final video appears in `output/`

## Tips

- **First run:** Generate voiceover and music separately to verify quality before recording
- **Iterate on voiceover:** Use `--reuse-music --skip-record` to regenerate only voiceover
- **Custom narration:** Add `voiceover` fields to panel metadata for precise control
- **Long explainers:** Use `--panels` to generate videos for specific sections
- **Music style:** Match the music prompt to the explainer's tone metadata
- **SFX discovery:** The script auto-discovers panel SFX from `public/assets/audio/`

## Environment Variables

```bash
ELEVENLABS_API_KEY=    # Required — voiceover + music fallback
SUNO_API_BASE_URL=     # Optional — Suno API server URL (default: http://localhost:3000)
SUNO_API_KEY=          # Optional — API key for Suno proxy services
```
