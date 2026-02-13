#!/usr/bin/env node
/**
 * Voiceover Generation Script using ElevenLabs Text-to-Speech
 * Generates narration audio for each panel of an explainer.
 *
 * Usage:
 *   node create-voiceover.js <explainer-slug> [options]
 *
 * Examples:
 *   node create-voiceover.js cybregore
 *   node create-voiceover.js cybregore --voice "pNInz6obpgDQGcFmaJgB" --model eleven_multilingual_v2
 *   node create-voiceover.js cybregore --panels panel-the-hook,panel-data-explosion
 *
 * Environment Variables:
 *   ELEVENLABS_API_KEY - Required. Your ElevenLabs API key.
 *
 * Options:
 *   --voice <voice-id>     ElevenLabs voice ID (default: Adam - pNInz6obpgDQGcFmaJgB)
 *   --model <model-id>     TTS model (default: eleven_multilingual_v2)
 *   --panels <ids>         Comma-separated panel IDs to generate (default: all)
 *   --output-dir <path>    Output directory (default: public/assets/audio/voiceover/)
 *   --format <fmt>         Audio format: mp3_44100_128, mp3_22050_32, pcm_44100 (default: mp3_44100_128)
 *   --stability <0-1>      Voice stability (default: 0.5)
 *   --similarity <0-1>     Voice similarity boost (default: 0.75)
 *   --style <0-1>          Style exaggeration (default: 0.0)
 *
 * Output:
 *   Creates one MP3 per panel in the output directory:
 *     voiceover-{panel-id}.mp3
 *   Also writes a timing manifest:
 *     voiceover-manifest.json
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { loadEnv } from '../../../load-env.js';
import { loadMetadataPanels } from './parse-metadata.js';

loadEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Parse CLI args ──────────────────────────────────────────────────────────

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

const voiceId = extractFlag('--voice', 'pNInz6obpgDQGcFmaJgB'); // Adam
const modelId = extractFlag('--model', 'eleven_multilingual_v2');
const panelFilter = extractFlag('--panels', null);
const outputDir = extractFlag('--output-dir', null);
const audioFormat = extractFlag('--format', 'mp3_44100_128');
const stability = parseFloat(extractFlag('--stability', '0.5'));
const similarity = parseFloat(extractFlag('--similarity', '0.75'));
const style = parseFloat(extractFlag('--style', '0.0'));

const slug = args[0];

if (!slug) {
  console.log(`
Usage: node create-voiceover.js <explainer-slug> [options]

Arguments:
  explainer-slug    The explainer slug (e.g., "cybregore", "good-intentions-demon")

Options:
  --voice <voice-id>     ElevenLabs voice ID (default: Adam)
  --model <model-id>     TTS model (default: eleven_multilingual_v2)
  --panels <ids>         Comma-separated panel IDs to generate (default: all)
  --output-dir <path>    Output directory (default: public/assets/audio/voiceover/)
  --format <fmt>         Audio format (default: mp3_44100_128)
  --stability <0-1>      Voice stability (default: 0.5)
  --similarity <0-1>     Voice similarity boost (default: 0.75)
  --style <0-1>          Style exaggeration (default: 0.0)

Environment Variables:
  ELEVENLABS_API_KEY  Your ElevenLabs API key (required)
`);
  process.exit(1);
}

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
if (!ELEVENLABS_API_KEY) {
  console.error('Error: ELEVENLABS_API_KEY environment variable is not set.');
  process.exit(1);
}

// ── Load metadata (shared parser) ───────────────────────────────────────────

async function loadMetadata() {
  const projectRoot = path.resolve(__dirname, '..', '..', '..');
  return loadMetadataPanels(slug, projectRoot);
}

// ── Extract visible text from panel TSX component ───────────────────────────

/**
 * Read a panel's TSX component file and extract the visible text content.
 * Converts kebab-case panel ID to PascalCase filename, reads the JSX,
 * and pulls out text between tags (skipping JSX expressions, short
 * fragments, and non-text content like arrows/icons).
 *
 * Returns the concatenated panel text, or null if the file doesn't exist
 * or contains no extractable text.
 */
function extractPanelText(panelId) {
  // Convert kebab-case panel ID → PascalCase filename
  // e.g. "panel-flip-it-hook" → "PanelFlipItHook"
  const pascalCase = panelId
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  const root = path.resolve(__dirname, '..', '..', '..');
  const panelPaths = [
    path.join(root, 'src', 'explainers', slug, 'panels', `${pascalCase}.tsx`),
    path.join(root, 'src', 'explainers', slug, 'panels', `${pascalCase}.jsx`),
  ];

  for (const filePath of panelPaths) {
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');

    // Find the JSX return block
    const returnIdx = content.lastIndexOf('return (');
    if (returnIdx === -1) continue;

    const jsx = content.slice(returnIdx);
    const textParts = [];

    // Extract text content between > and < (i.e. visible text inside tags)
    const regex = />([^<]+)</g;
    let m;

    while ((m = regex.exec(jsx)) !== null) {
      let text = m[1];
      // Strip JSX expressions like {variable} or {`template`}
      text = text.replace(/\{[^}]*\}/g, '');
      // Normalize whitespace
      text = text.replace(/\s+/g, ' ').trim();
      // Keep only meaningful text: at least 3 chars with real words
      if (text.length >= 3 && /[a-zA-Z]{2,}/.test(text)) {
        textParts.push(text);
      }
    }

    if (textParts.length > 0) {
      return textParts.join(' ');
    }
  }

  return null;
}

// ── Generate voiceover text from panel metadata ─────────────────────────────

function generateVoiceoverText(panel) {
  // Priority 1: Use explicit voiceover field if present
  if (panel.voiceover) {
    return panel.voiceover;
  }

  // Priority 2: Extract visible text from the panel component
  const panelText = extractPanelText(panel.id);
  if (panelText) {
    console.log(`  (using panel component text)`);
    return panelText;
  }

  // Priority 3: Auto-generate from message + keyPhrases
  let text = '';

  if (panel.message) {
    text = panel.message;
  }

  if (panel.keyPhrases && panel.keyPhrases.length > 0) {
    // If message exists and keyPhrases add new information, append them
    const phrasesNotInMessage = panel.keyPhrases.filter(
      p => !panel.message?.toLowerCase().includes(p.toLowerCase())
    );
    if (phrasesNotInMessage.length > 0) {
      text += (text ? ' ' : '') + phrasesNotInMessage.join('. ') + '.';
    }
  }

  return text || `${panel.title || 'Untitled panel'}.`;
}

// ── ElevenLabs TTS API ──────────────────────────────────────────────────────

function generateTTS(text, outputPath) {
  const requestBody = JSON.stringify({
    text,
    model_id: modelId,
    voice_settings: {
      stability,
      similarity_boost: similarity,
      style,
      use_speaker_boost: true,
    },
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${voiceId}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': audioFormat.startsWith('pcm') ? 'audio/pcm' : 'audio/mpeg',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Length': Buffer.byteLength(requestBody),
      },
    };

    // Add output format as query parameter
    options.path += `?output_format=${audioFormat}`;

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let errorData = '';
        res.on('data', chunk => errorData += chunk);
        res.on('end', () => {
          try {
            const errorJson = JSON.parse(errorData);
            console.error(`  API Error (${res.statusCode}):`, errorJson.detail?.message || errorJson.detail || errorData);
          } catch {
            console.error(`  API Error (${res.statusCode}):`, errorData.substring(0, 500));
          }
          reject(new Error(`API returned status ${res.statusCode}`));
        });
        return;
      }

      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const file = fs.createWriteStream(outputPath);
      res.pipe(file);

      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(outputPath);
        const sizeKB = Math.round(stats.size / 1024);
        resolve({ path: outputPath, sizeKB });
      });

      file.on('error', (err) => {
        fs.unlink(outputPath, () => {});
        reject(err);
      });
    });

    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

// ── Get audio duration using ffprobe if available, fallback to estimation ───

function getAudioDuration(filePath) {
  return new Promise((resolve) => {
    const { execSync } = await_import_child_process();
    try {
      const result = execSync(
        `ffprobe -v error -show_entries format=duration -of csv=p=0 "${filePath}"`,
        { encoding: 'utf8', timeout: 5000 }
      ).trim();
      resolve(parseFloat(result));
    } catch {
      // Fallback: estimate from file size (~16KB/s for mp3_44100_128)
      const stats = fs.statSync(filePath);
      resolve(stats.size / (16 * 1024));
    }
  });
}

// Lazy import for child_process
function await_import_child_process() {
  try {
    const cp = require('child_process');
    return cp;
  } catch {
    // For ESM context
    return { execSync: null };
  }
}

// Alternative: use dynamic import for child_process in ESM
async function getDuration(filePath) {
  try {
    const { execSync } = await import('child_process');
    const result = execSync(
      `ffprobe -v error -show_entries format=duration -of csv=p=0 "${filePath}"`,
      { encoding: 'utf8', timeout: 5000 }
    ).trim();
    return parseFloat(result);
  } catch {
    // Fallback: estimate from file size (~16KB/s for mp3_44100_128)
    const stats = fs.statSync(filePath);
    return stats.size / (16 * 1024);
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Voiceover Generation (ElevenLabs TTS) ===\n');

  const panels = await loadMetadata();
  console.log(`Found ${panels.length} panels in metadata.\n`);

  // Filter panels if requested
  let targetPanels = panels;
  if (panelFilter) {
    const filterIds = panelFilter.split(',').map(s => s.trim());
    targetPanels = panels.filter(p => filterIds.includes(p.id));
    if (targetPanels.length === 0) {
      console.error(`Error: No matching panels found for: ${panelFilter}`);
      process.exit(1);
    }
    console.log(`Filtering to ${targetPanels.length} panels: ${filterIds.join(', ')}\n`);
  }

  const projectRoot = path.resolve(__dirname, '..', '..', '..');
  const outDir = outputDir || path.join(projectRoot, 'public', 'assets', 'audio', 'voiceover');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const manifest = {
    slug,
    voiceId,
    modelId,
    generatedAt: new Date().toISOString(),
    panels: [],
  };

  for (let i = 0; i < targetPanels.length; i++) {
    const panel = targetPanels[i];
    const voiceoverText = generateVoiceoverText(panel);

    if (!voiceoverText.trim()) {
      console.log(`[${i + 1}/${targetPanels.length}] ${panel.id} — skipped (no text)`);
      continue;
    }

    const outputFile = `voiceover-${panel.id}.mp3`;
    const outputPath = path.join(outDir, outputFile);

    console.log(`[${i + 1}/${targetPanels.length}] ${panel.id}`);
    console.log(`  Text: "${voiceoverText.substring(0, 80)}${voiceoverText.length > 80 ? '...' : ''}"`);

    try {
      const result = await generateTTS(voiceoverText, outputPath);
      const duration = await getDuration(outputPath);

      console.log(`  Saved: ${outputFile} (${result.sizeKB} KB, ~${duration.toFixed(1)}s)`);

      manifest.panels.push({
        panelId: panel.id,
        title: panel.title,
        text: voiceoverText,
        file: outputFile,
        path: `/assets/audio/voiceover/${outputFile}`,
        durationSeconds: parseFloat(duration.toFixed(2)),
        sizeKB: result.sizeKB,
      });
    } catch (err) {
      console.error(`  Failed: ${err.message}`);
      manifest.panels.push({
        panelId: panel.id,
        title: panel.title,
        text: voiceoverText,
        file: null,
        error: err.message,
      });
    }
  }

  // Write manifest
  const manifestPath = path.join(outDir, `voiceover-manifest-${slug}.json`);
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest: ${manifestPath}`);

  const successCount = manifest.panels.filter(p => p.file).length;
  const totalDuration = manifest.panels
    .filter(p => p.durationSeconds)
    .reduce((sum, p) => sum + p.durationSeconds, 0);

  console.log(`\nDone! ${successCount}/${targetPanels.length} voiceovers generated.`);
  console.log(`Total narration: ~${totalDuration.toFixed(1)}s`);

  return manifest;
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

export { generateVoiceoverText };
