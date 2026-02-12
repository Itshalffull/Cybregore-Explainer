#!/usr/bin/env node
/**
 * Short-Form Video Generator
 * Records a scrolling explainer as a short-form video with voiceover,
 * background music, and panel SFX.
 *
 * Pipeline:
 *   1. Read explainer metadata → extract panel info
 *   2. Generate voiceover per panel (ElevenLabs TTS)
 *   3. Launch Puppeteer, scroll through explainer, record video
 *      (scroll timing derived from voiceover durations + padding)
 *   4. Generate background music to match actual video duration
 *   5. Mix audio layers: voiceover (100%), SFX (20%), music (~30%)
 *   6. Combine video + mixed audio → final output
 *
 * Usage:
 *   node create-short-video.js <explainer-slug> [options]
 *
 * Examples:
 *   node create-short-video.js cybregore
 *   node create-short-video.js cybregore --format 9:16 --music-prompt "Dark ambient drone"
 *   node create-short-video.js cybregore --format 16:9 --skip-music --skip-voiceover
 *
 * Environment Variables:
 *   ELEVENLABS_API_KEY   - Required for voiceover + music fallback
 *   SUNO_API_BASE_URL    - Suno API URL (optional)
 *   SUNO_API_KEY         - Suno proxy API key (optional)
 *
 * Requires: puppeteer, ffmpeg (on PATH)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawn } from 'child_process';
import { loadEnv } from '../../../load-env.js';

loadEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..', '..');

// ── CLI Parsing ─────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function extractFlag(flag, defaultValue) {
  const idx = args.indexOf(flag);
  if (idx === -1) return defaultValue;
  const val = args[idx + 1];
  args.splice(idx, 2);
  return val;
}

function extractBoolFlag(flag) {
  const idx = args.indexOf(flag);
  if (idx === -1) return false;
  args.splice(idx, 1);
  return true;
}

const format = extractFlag('--format', '9:16');
const musicPrompt = extractFlag('--music-prompt', 'Dark ambient electronic, minimal, meditative, deep bass drone, cinematic tension');
const voiceId = extractFlag('--voice', 'pNInz6obpgDQGcFmaJgB');
const outputFile = extractFlag('--output', null);
const panelFilter = extractFlag('--panels', null);
const devPort = parseInt(extractFlag('--port', '5173'), 10);
const scrollPausePad = parseFloat(extractFlag('--pause-pad', '0.5')); // extra seconds per panel pause
const scrollSpeed = parseFloat(extractFlag('--scroll-speed', '1.0'));
const musicVolume = parseFloat(extractFlag('--music-volume', '0.30'));
const sfxVolume = parseFloat(extractFlag('--sfx-volume', '0.20'));
const skipVoiceover = extractBoolFlag('--skip-voiceover');
const skipMusic = extractBoolFlag('--skip-music');
const skipRecord = extractBoolFlag('--skip-record');
const skipMix = extractBoolFlag('--skip-mix');
const reuseVoiceover = extractBoolFlag('--reuse-voiceover');
const reuseMusic = extractBoolFlag('--reuse-music');
const dualFormat = extractBoolFlag('--dual'); // Generate both 9:16 and 16:9

const slug = args[0];

if (!slug) {
  console.log(`
Usage: node create-short-video.js <explainer-slug> [options]

Arguments:
  explainer-slug     The explainer slug (e.g., "cybregore")

Options:
  --format <ratio>        Output format: 9:16 | 16:9 (default: 9:16)
  --dual                  Generate both 9:16 and 16:9 outputs
  --music-prompt <text>   Background music prompt
  --voice <id>            ElevenLabs voice ID (default: Adam)
  --output <path>         Output video path (default: output/{slug}-{format}.mp4)
  --panels <ids>          Comma-separated panel IDs (default: all)
  --port <num>            Vite dev server port (default: 5173)
  --pause-pad <sec>       Extra pause per panel in seconds (default: 0.5)
  --scroll-speed <mult>   Scroll animation speed multiplier (default: 1.0)
  --music-volume <0-1>    Background music volume (default: 0.30)
  --sfx-volume <0-1>      SFX volume (default: 0.20)
  --skip-voiceover        Skip voiceover generation
  --skip-music            Skip music generation
  --skip-record           Skip browser recording (use existing raw video)
  --skip-mix              Skip audio mixing
  --reuse-voiceover       Reuse existing voiceover files if present
  --reuse-music           Reuse existing music file if present

Environment Variables:
  ELEVENLABS_API_KEY   ElevenLabs API key
  SUNO_API_BASE_URL    Suno API URL
  SUNO_API_KEY         Suno proxy API key
`);
  process.exit(1);
}

// ── Viewport dimensions by format ───────────────────────────────────────────

const VIEWPORTS = {
  '9:16': { width: 1080, height: 1920 },   // TikTok / Reels / Shorts
  '16:9': { width: 1920, height: 1080 },   // YouTube / Web
};

// ── Utility: run a child script ─────────────────────────────────────────────

function runScript(scriptPath, scriptArgs = []) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [scriptPath, ...scriptArgs], {
      cwd: projectRoot,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: process.env,
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      const text = data.toString();
      stdout += text;
      process.stdout.write(text);
    });

    child.stderr.on('data', (data) => {
      const text = data.toString();
      stderr += text;
      process.stderr.write(text);
    });

    child.on('close', (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(`Script exited with code ${code}: ${stderr.substring(0, 500)}`));
    });

    child.on('error', reject);
  });
}

// ── Utility: run ffmpeg command ─────────────────────────────────────────────

function ffmpeg(ffmpegArgs, description) {
  return new Promise((resolve, reject) => {
    console.log(`  [ffmpeg] ${description}`);
    const child = spawn('ffmpeg', ffmpegArgs, {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stderr = '';
    child.stderr.on('data', (data) => stderr += data.toString());

    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg failed (${code}): ${stderr.substring(0, 500)}`));
    });

    child.on('error', (err) => {
      if (err.code === 'ENOENT') {
        reject(new Error('ffmpeg not found. Please install FFmpeg.'));
      } else {
        reject(err);
      }
    });
  });
}

// ── Utility: get audio duration via ffprobe ─────────────────────────────────

function getMediaDuration(filePath) {
  try {
    const result = execSync(
      `ffprobe -v error -show_entries format=duration -of csv=p=0 "${filePath}"`,
      { encoding: 'utf8', timeout: 5000 }
    ).trim();
    return parseFloat(result);
  } catch {
    // Fallback estimate
    const stats = fs.statSync(filePath);
    return stats.size / (16 * 1024);
  }
}

// ── Load metadata ───────────────────────────────────────────────────────────

function loadMetadata() {
  const patterns = [
    path.join(projectRoot, 'src', 'explainers', `${slug}-metadata.ts`),
    path.join(projectRoot, 'src', 'explainers', slug, 'metadata.ts'),
  ];

  for (const metaPath of patterns) {
    if (fs.existsSync(metaPath)) {
      console.log(`Metadata: ${metaPath}`);
      const content = fs.readFileSync(metaPath, 'utf8');
      return parseMetadataPanels(content);
    }
  }

  console.error(`Error: Could not find metadata for "${slug}".`);
  process.exit(1);
}

function parseMetadataPanels(content) {
  const panels = [];
  const panelsBlock = extractBracketBlock(content, 'panels');
  if (!panelsBlock) {
    console.error('Error: No panels array found in metadata.');
    process.exit(1);
  }

  // Extract each top-level { ... } object from the panels array
  const panelStrings = extractTopLevelObjects(panelsBlock);

  for (const s of panelStrings) {
    const id = extractMetaField(s, 'id');
    const title = extractMetaField(s, 'title');
    const message = extractMetaField(s, 'message');
    const voiceover = extractMetaField(s, 'voiceover');
    const keyPhrases = extractMetaArrayField(s, 'keyPhrases');

    if (id) panels.push({ id, title, message, voiceover, keyPhrases });
  }

  return panels;
}

/** Find `key: [...]` in source and return the content between the outer brackets, handling nesting. */
function extractBracketBlock(source, key) {
  const re = new RegExp(`${key}\\s*:\\s*\\[`);
  const m = source.match(re);
  if (!m) return null;

  let depth = 1;
  const startIdx = m.index + m[0].length;
  for (let i = startIdx; i < source.length; i++) {
    if (source[i] === '[') depth++;
    else if (source[i] === ']') depth--;
    if (depth === 0) return source.slice(startIdx, i);
  }
  return null;
}

/** Extract all top-level `{ ... }` objects from a string, handling nested braces. */
function extractTopLevelObjects(str) {
  const objects = [];
  let i = 0;
  while (i < str.length) {
    if (str[i] === '{') {
      let depth = 1;
      const start = i;
      i++;
      while (i < str.length && depth > 0) {
        if (str[i] === '{') depth++;
        else if (str[i] === '}') depth--;
        i++;
      }
      objects.push(str.slice(start, i));
    } else {
      i++;
    }
  }
  return objects;
}

function extractMetaField(str, fieldName) {
  const re = new RegExp(`${fieldName}\\s*:\\s*['"\`]([\\s\\S]*?)['"\`]\\s*(?:,|\\})`);
  const m = str.match(re);
  return m ? m[1].replace(/\\n/g, '\n').replace(/\\'/g, "'") : null;
}

function extractMetaArrayField(str, fieldName) {
  const re = new RegExp(`${fieldName}\\s*:\\s*\\[([^\\]]*?)\\]`);
  const m = str.match(re);
  if (!m) return [];
  return m[1].split(',').map(s => s.trim().replace(/^['"`]|['"`]$/g, '')).filter(Boolean);
}

// ── Find panel SFX files ────────────────────────────────────────────────────

function findPanelSFX(panelId) {
  const audioDirs = [
    path.join(projectRoot, 'public', 'assets', 'audio'),
  ];

  for (const dir of audioDirs) {
    if (!fs.existsSync(dir)) continue;

    // Look for files matching panel patterns
    const patterns = [
      `${panelId}.mp3`,
      `${panelId}-ambience.mp3`,
      `${panelId.replace('panel-', '')}.mp3`,
      `${panelId.replace('panel-', '')}-ambience.mp3`,
    ];

    for (const pattern of patterns) {
      const filePath = path.join(dir, pattern);
      if (fs.existsSync(filePath)) return filePath;
    }

    // Also check subdirectories
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        for (const pattern of patterns) {
          const filePath = path.join(dir, entry.name, pattern);
          if (fs.existsSync(filePath)) return filePath;
        }
      }
    }
  }

  return null;
}

// ── Browser Recording ───────────────────────────────────────────────────────

async function recordExplainer(panels, voiceoverManifest, viewport, rawVideoPath) {
  console.log('\n=== Recording Explainer ===');
  console.log(`Viewport: ${viewport.width}x${viewport.height}`);

  // Try puppeteer first, fall back to puppeteer-core
  let puppeteer;
  try {
    puppeteer = await import('puppeteer');
  } catch {
    try {
      puppeteer = await import('puppeteer-core');
    } catch {
      console.error('Error: Neither puppeteer nor puppeteer-core installed.');
      console.error('Run: npm install puppeteer   (downloads Chrome)');
      console.error('  or: npm install puppeteer-core   (uses system Chrome)');
      process.exit(1);
    }
  }

  // Find Chrome executable for puppeteer-core
  let executablePath;
  if (puppeteer.default.executablePath) {
    try {
      executablePath = puppeteer.default.executablePath();
    } catch {
      // puppeteer-core doesn't bundle Chrome, find system install
      const possiblePaths = [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
        '/snap/bin/chromium',
        process.env.CHROME_PATH,
      ].filter(Boolean);

      for (const p of possiblePaths) {
        if (p && fs.existsSync(p)) {
          executablePath = p;
          break;
        }
      }
    }
  }

  const launchOptions = {
    headless: 'new',
    channel: 'stable',
    args: [
      `--window-size=${viewport.width},${viewport.height}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--autoplay-policy=no-user-gesture-required',
    ],
    defaultViewport: viewport,
  };

  if (executablePath) {
    launchOptions.executablePath = executablePath;
  }

  const browser = await puppeteer.default.launch(launchOptions);

  const page = await browser.newPage();
  await page.setViewport(viewport);

  // Navigate to explainer
  const url = `http://localhost:${devPort}/${slug}`;
  console.log(`Navigating to: ${url}`);

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForTimeout(2000); // Let animations settle

  // Build scroll timeline from voiceover durations
  const timeline = buildScrollTimeline(panels, voiceoverManifest, viewport);
  console.log(`\nScroll timeline: ${timeline.totalDuration.toFixed(1)}s total`);
  for (const step of timeline.steps) {
    console.log(`  ${step.panelId}: scroll ${step.scrollDuration.toFixed(1)}s + pause ${step.pauseDuration.toFixed(1)}s`);
  }

  // Start CDP screencast recording
  const client = await page.createCDPSession();

  // Use Page.startScreencast for frame-by-frame capture
  const frames = [];
  let frameCount = 0;

  await client.send('Page.startScreencast', {
    format: 'jpeg',
    quality: 90,
    maxWidth: viewport.width,
    maxHeight: viewport.height,
    everyNthFrame: 1,
  });

  client.on('Page.screencastFrame', async (event) => {
    frames.push({
      data: event.data,
      timestamp: event.metadata.timestamp,
    });
    frameCount++;

    // Acknowledge frame to get next one
    await client.send('Page.screencastFrameAck', {
      sessionId: event.sessionId,
    });
  });

  // Execute scroll timeline
  console.log('\nStarting scroll recording...');
  const recordingStartTime = Date.now();

  for (const step of timeline.steps) {
    // Smooth scroll to panel position
    const scrollDurationMs = step.scrollDuration * 1000;
    const startScroll = step.scrollStart;
    const endScroll = step.scrollEnd;

    // Animate scroll over scrollDuration
    const scrollFrames = Math.max(1, Math.floor(scrollDurationMs / 16)); // ~60fps
    for (let i = 0; i <= scrollFrames; i++) {
      const t = i / scrollFrames;
      // Ease in-out cubic
      const eased = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const scrollY = startScroll + (endScroll - startScroll) * eased;

      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(16);
    }

    // Pause at panel for voiceover duration
    if (step.pauseDuration > 0) {
      // Scroll to the "sweet spot" where content is fully visible (progress ~0.3-0.5)
      const sweetSpotScroll = startScroll + (endScroll - startScroll) * 0.4;
      await page.evaluate((y) => window.scrollTo(0, y), sweetSpotScroll);
      await page.waitForTimeout(step.pauseDuration * 1000);
    }
  }

  const recordingDuration = (Date.now() - recordingStartTime) / 1000;
  console.log(`\nRecording complete: ${frameCount} frames in ${recordingDuration.toFixed(1)}s`);

  // Stop screencast
  await client.send('Page.stopScreencast');

  // Write frames to a temporary directory and use ffmpeg to assemble
  const framesDir = path.join(projectRoot, '.tmp-frames');
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });

  console.log('Writing frames...');
  for (let i = 0; i < frames.length; i++) {
    const framePath = path.join(framesDir, `frame-${String(i).padStart(6, '0')}.jpg`);
    fs.writeFileSync(framePath, Buffer.from(frames[i].data, 'base64'));
  }

  // Calculate actual framerate from timestamps
  let fps = 30; // default
  if (frames.length > 1) {
    const totalTime = frames[frames.length - 1].timestamp - frames[0].timestamp;
    if (totalTime > 0) {
      fps = Math.min(60, Math.max(15, (frames.length - 1) / totalTime));
    }
  }

  // Assemble frames into video
  console.log(`Assembling video at ${fps.toFixed(1)} fps...`);
  const outputDir = path.dirname(rawVideoPath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  await ffmpeg([
    '-y',
    '-framerate', fps.toFixed(2),
    '-i', path.join(framesDir, 'frame-%06d.jpg'),
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'medium',
    '-crf', '18',
    rawVideoPath,
  ], 'Encoding raw video from frames');

  // Cleanup frames
  fs.rmSync(framesDir, { recursive: true, force: true });

  await browser.close();

  console.log(`Raw video: ${rawVideoPath}`);
  return { fps, duration: recordingDuration, frameCount };
}

// ── Build scroll timeline ───────────────────────────────────────────────────

function buildScrollTimeline(panels, voiceoverManifest, viewport) {
  const steps = [];
  let currentScrollY = 0;

  // Each ScrollSection in the app has a scrollLength (default 2).
  // Total scroll height per panel ≈ (scrollLength - 1) * viewportHeight
  // We estimate scrollLength=2 for each panel (1 viewport of scroll travel)
  const panelScrollHeight = viewport.height; // (scrollLength - 1) * 100vh ≈ 1 viewport

  for (let i = 0; i < panels.length; i++) {
    const panel = panels[i];

    // Find voiceover duration for this panel
    let voDuration = 0;
    if (voiceoverManifest) {
      const voPanel = voiceoverManifest.panels.find(p => p.panelId === panel.id);
      if (voPanel && voPanel.durationSeconds) {
        voDuration = voPanel.durationSeconds;
      }
    }

    // Scroll animation duration (how long to animate scrolling into this panel)
    const scrollDuration = (1.5 / scrollSpeed); // 1.5s per panel at 1x speed

    // Pause duration = voiceover length + padding
    const pauseDuration = voDuration > 0 ? voDuration + scrollPausePad : 1.0;

    steps.push({
      panelId: panel.id,
      panelIndex: i,
      scrollStart: currentScrollY,
      scrollEnd: currentScrollY + panelScrollHeight,
      scrollDuration,
      pauseDuration,
      voiceoverDuration: voDuration,
    });

    currentScrollY += panelScrollHeight;
  }

  const totalDuration = steps.reduce(
    (sum, s) => sum + s.scrollDuration + s.pauseDuration, 0
  );

  return { steps, totalDuration };
}

// ── Audio Mixing with FFmpeg ────────────────────────────────────────────────

async function mixAudio(panels, voiceoverManifest, musicPath, timeline, outputPath) {
  console.log('\n=== Mixing Audio ===');

  const tempDir = path.join(projectRoot, '.tmp-audio');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  const inputs = [];
  const filterParts = [];
  let inputIdx = 0;

  // 1. Background music (looped to fill duration)
  if (musicPath && fs.existsSync(musicPath)) {
    inputs.push('-stream_loop', '-1', '-i', musicPath);
    filterParts.push(`[${inputIdx}]volume=${musicVolume}[music]`);
    inputIdx++;
  }

  // 2. Voiceover clips — timed to panel pauses
  const voClips = [];
  let timeOffset = 0;

  for (const step of timeline.steps) {
    // Time when voiceover should start = after scroll animation for this panel
    const voStart = timeOffset + step.scrollDuration;

    const voPanel = voiceoverManifest?.panels?.find(p => p.panelId === step.panelId);
    if (voPanel?.file) {
      const voPath = path.join(projectRoot, 'public', 'assets', 'audio', 'voiceover', voPanel.file);
      if (fs.existsSync(voPath)) {
        voClips.push({
          path: voPath,
          startTime: voStart,
          duration: voPanel.durationSeconds,
          inputIdx,
        });
        inputs.push('-i', voPath);
        inputIdx++;
      }
    }

    timeOffset += step.scrollDuration + step.pauseDuration;
  }

  // 3. Panel SFX — timed to panel visibility
  const sfxClips = [];
  timeOffset = 0;

  for (const step of timeline.steps) {
    const sfxPath = findPanelSFX(step.panelId);
    if (sfxPath) {
      sfxClips.push({
        path: sfxPath,
        startTime: timeOffset,
        duration: step.scrollDuration + step.pauseDuration,
        inputIdx,
      });
      inputs.push('-i', sfxPath);
      inputIdx++;
    }

    timeOffset += step.scrollDuration + step.pauseDuration;
  }

  if (inputIdx === 0) {
    console.log('  No audio sources found. Skipping mix.');
    return null;
  }

  // Build complex filter graph
  const filterLines = [];
  const mixInputs = [];

  // Music track
  if (musicPath && fs.existsSync(musicPath)) {
    filterLines.push(`[0]volume=${musicVolume},atrim=0:${timeline.totalDuration.toFixed(2)}[music]`);
    mixInputs.push('[music]');
  }

  // Voiceover clips with delay
  for (const clip of voClips) {
    const label = `vo${clip.inputIdx}`;
    filterLines.push(
      `[${clip.inputIdx}]adelay=${Math.round(clip.startTime * 1000)}|${Math.round(clip.startTime * 1000)}[${label}]`
    );
    mixInputs.push(`[${label}]`);
  }

  // SFX clips with delay and volume
  for (const clip of sfxClips) {
    const label = `sfx${clip.inputIdx}`;
    filterLines.push(
      `[${clip.inputIdx}]volume=${sfxVolume},adelay=${Math.round(clip.startTime * 1000)}|${Math.round(clip.startTime * 1000)}[${label}]`
    );
    mixInputs.push(`[${label}]`);
  }

  // Merge all tracks
  if (mixInputs.length > 1) {
    filterLines.push(`${mixInputs.join('')}amix=inputs=${mixInputs.length}:duration=longest:dropout_transition=2[mixed]`);
  } else if (mixInputs.length === 1) {
    // Single track, just rename
    const singleLabel = mixInputs[0].replace(/[\[\]]/g, '');
    filterLines.push(`[${singleLabel}]acopy[mixed]`);
  }

  const filterGraph = filterLines.join(';');

  const mixedAudioPath = path.join(tempDir, 'mixed-audio.mp3');

  await ffmpeg([
    ...inputs,
    '-filter_complex', filterGraph,
    '-map', '[mixed]',
    '-ac', '2',
    '-ar', '44100',
    '-b:a', '192k',
    '-t', timeline.totalDuration.toFixed(2),
    '-y',
    mixedAudioPath,
  ], `Mixing ${mixInputs.length} audio tracks`);

  console.log(`  Mixed audio: ${mixedAudioPath}`);
  return mixedAudioPath;
}

// ── Combine Video + Audio ───────────────────────────────────────────────────

async function combineVideoAudio(rawVideoPath, audioPath, finalOutputPath) {
  console.log('\n=== Combining Video + Audio ===');

  const outputDir = path.dirname(finalOutputPath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  if (audioPath && fs.existsSync(audioPath)) {
    await ffmpeg([
      '-i', rawVideoPath,
      '-i', audioPath,
      '-c:v', 'copy',
      '-c:a', 'aac',
      '-b:a', '192k',
      '-shortest',
      '-movflags', '+faststart',
      '-y',
      finalOutputPath,
    ], 'Combining video and audio');
  } else {
    // No audio — just copy video
    await ffmpeg([
      '-i', rawVideoPath,
      '-c:v', 'copy',
      '-movflags', '+faststart',
      '-y',
      finalOutputPath,
    ], 'Finalizing video (no audio)');
  }

  const stats = fs.statSync(finalOutputPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
  console.log(`\nFinal video: ${finalOutputPath} (${sizeMB} MB)`);
}

// ── Main Pipeline ───────────────────────────────────────────────────────────

async function main() {
  console.log('=== Short-Form Video Generator ===\n');
  console.log(`Explainer: ${slug}`);
  console.log(`Format: ${format}`);

  const formats = dualFormat ? ['9:16', '16:9'] : [format];

  // Step 1: Load metadata
  console.log('\n--- Step 1: Load Metadata ---');
  let panels = loadMetadata();

  if (panelFilter) {
    const filterIds = panelFilter.split(',').map(s => s.trim());
    panels = panels.filter(p => filterIds.includes(p.id));
    console.log(`Filtered to ${panels.length} panels.`);
  }

  console.log(`Total panels: ${panels.length}`);

  // Step 2: Generate voiceovers
  let voiceoverManifest = null;
  const voDir = path.join(projectRoot, 'public', 'assets', 'audio', 'voiceover');
  const voManifestPath = path.join(voDir, `voiceover-manifest-${slug}.json`);

  if (!skipVoiceover) {
    if (reuseVoiceover && fs.existsSync(voManifestPath)) {
      console.log('\n--- Step 2: Reusing Existing Voiceover ---');
      voiceoverManifest = JSON.parse(fs.readFileSync(voManifestPath, 'utf8'));
      console.log(`Loaded ${voiceoverManifest.panels.length} voiceover entries.`);
    } else {
      console.log('\n--- Step 2: Generate Voiceovers ---');
      const voiceoverScript = path.join(__dirname, 'create-voiceover.js');
      const voArgs = [slug, '--voice', voiceId];
      if (panelFilter) voArgs.push('--panels', panelFilter);

      await runScript(voiceoverScript, voArgs);

      if (fs.existsSync(voManifestPath)) {
        voiceoverManifest = JSON.parse(fs.readFileSync(voManifestPath, 'utf8'));
      }
    }
  } else {
    console.log('\n--- Step 2: Skipping Voiceover ---');
    if (fs.existsSync(voManifestPath)) {
      voiceoverManifest = JSON.parse(fs.readFileSync(voManifestPath, 'utf8'));
    }
  }

  // Music path (generated once after first recording, shared across formats)
  const musicDir = path.join(projectRoot, 'public', 'assets', 'audio', 'music');
  const musicPath = path.join(musicDir, `bg-music-${slug}.mp3`);
  let musicGenerated = false;

  // Steps 3-6: Per-format recording, music generation, mixing, and combining
  for (const fmt of formats) {
    const viewport = VIEWPORTS[fmt];
    if (!viewport) {
      console.error(`Unknown format: ${fmt}. Supported: ${Object.keys(VIEWPORTS).join(', ')}`);
      continue;
    }

    const fmtLabel = fmt.replace(':', 'x');
    const rawVideoPath = path.join(projectRoot, '.tmp-audio', `raw-${slug}-${fmtLabel}.mp4`);
    const finalOutput = outputFile || path.join(projectRoot, 'output', `${slug}-${fmtLabel}.mp4`);

    // Step 3: Record browser (scroll timing derived from voiceover durations)
    if (!skipRecord) {
      console.log(`\n--- Step 3: Record (${fmt}) ---`);
      await recordExplainer(panels, voiceoverManifest, viewport, rawVideoPath);
    }

    // Step 4: Generate background music (using actual video duration)
    if (!skipMusic) {
      if (reuseMusic && fs.existsSync(musicPath)) {
        console.log('\n--- Step 4: Reusing Existing Music ---');
      } else if (!musicGenerated) {
        console.log('\n--- Step 4: Generate Background Music ---');
        const musicScript = path.join(__dirname, 'create-music.js');

        // Use actual video duration if available, otherwise estimate from timeline
        let totalDuration;
        if (fs.existsSync(rawVideoPath)) {
          const videoDuration = getMediaDuration(rawVideoPath);
          totalDuration = Math.ceil(videoDuration + 2);
          console.log(`  Video duration: ${videoDuration.toFixed(1)}s → music target: ${totalDuration}s`);
        } else {
          // Fallback: estimate from voiceover-based scroll timeline
          const timeline = buildScrollTimeline(panels, voiceoverManifest, viewport);
          totalDuration = Math.ceil(timeline.totalDuration + 5);
          console.log(`  Estimated duration from timeline: ${totalDuration}s`);
        }

        await runScript(musicScript, [
          musicPrompt,
          '--output', musicPath,
          '--duration', String(totalDuration),
        ]);
        musicGenerated = true;
      }
    } else {
      console.log('\n--- Step 4: Skipping Music ---');
    }

    // Step 5: Mix audio
    let mixedAudioPath = null;
    if (!skipMix) {
      console.log(`\n--- Step 5: Mix Audio (${fmt}) ---`);
      const timeline = buildScrollTimeline(panels, voiceoverManifest, viewport);
      const existingMusicPath = fs.existsSync(musicPath) ? musicPath : null;
      mixedAudioPath = await mixAudio(panels, voiceoverManifest, existingMusicPath, timeline, null);
    }

    // Step 6: Combine
    console.log(`\n--- Step 6: Finalize (${fmt}) ---`);
    await combineVideoAudio(rawVideoPath, mixedAudioPath, finalOutput);
  }

  // Cleanup temp files
  const tmpDir = path.join(projectRoot, '.tmp-audio');
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  console.log('\n=== All Done! ===');
  for (const fmt of formats) {
    const fmtLabel = fmt.replace(':', 'x');
    const finalOutput = outputFile || path.join(projectRoot, 'output', `${slug}-${fmtLabel}.mp4`);
    if (fs.existsSync(finalOutput)) {
      const stats = fs.statSync(finalOutput);
      console.log(`  ${fmt}: ${finalOutput} (${(stats.size / 1024 / 1024).toFixed(1)} MB)`);
    }
  }
}

main().catch(err => {
  console.error('\nFatal error:', err);
  process.exit(1);
});
