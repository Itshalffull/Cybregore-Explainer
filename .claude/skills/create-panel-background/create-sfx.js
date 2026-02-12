#!/usr/bin/env node
/**
 * Standalone SFX Generation Script using ElevenLabs Sound Effects V2
 * Generates subtle background ambient sound effects for panel backgrounds.
 * Applies a meditative ambient style by default.
 *
 * Usage:
 *   node scripts/create-sfx.js <filename> "<description>"
 *
 * Examples:
 *   node scripts/create-sfx.js forest-ambience.mp3 "Wind through pine trees with distant bird calls"
 *   node scripts/create-sfx.js digital-hum.mp3 "Low digital hum with faint data processing clicks" --duration 15
 *   node scripts/create-sfx.js raw-sound.mp3 "Loud explosion" --no-style
 *
 * Environment Variables:
 *   ELEVENLABS_API_KEY - Required. Your ElevenLabs API key.
 *
 * Options:
 *   --duration <seconds>  Sound duration (default: 10, max: 22)
 *   --influence <0-1>     Prompt influence (default: 0.4). Higher = closer to prompt.
 *   --no-style            Don't apply the ambient style prefix (use raw prompt)
 *   --no-loop             Don't generate a seamless loop
 *   --output-dir <path>   Directory to save audio (default: public/assets/audio/)
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { loadEnv } from '../../../load-env.js';

loadEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);

// Check for --duration flag
let duration = 10;
const durationIndex = args.indexOf('--duration');
if (durationIndex !== -1 && args[durationIndex + 1]) {
  duration = parseFloat(args[durationIndex + 1]);
  args.splice(durationIndex, 2);
}

// Check for --influence flag
let promptInfluence = 0.4;
const influenceIndex = args.indexOf('--influence');
if (influenceIndex !== -1 && args[influenceIndex + 1]) {
  promptInfluence = parseFloat(args[influenceIndex + 1]);
  args.splice(influenceIndex, 2);
}

// Check for --no-style flag
let applyStyle = true;
const noStyleIndex = args.indexOf('--no-style');
if (noStyleIndex !== -1) {
  applyStyle = false;
  args.splice(noStyleIndex, 1);
}

// Check for --no-loop flag
let enableLoop = true;
const noLoopIndex = args.indexOf('--no-loop');
if (noLoopIndex !== -1) {
  enableLoop = false;
  args.splice(noLoopIndex, 1);
}

// Check for --output-dir flag
let outputDir = null;
const outputDirIndex = args.indexOf('--output-dir');
if (outputDirIndex !== -1 && args[outputDirIndex + 1]) {
  outputDir = args[outputDirIndex + 1];
  args.splice(outputDirIndex, 2);
}

const filename = args[0];
const description = args[1];

// Validate inputs
if (!filename || !description) {
  console.log(`
Usage: node scripts/create-sfx.js <filename> "<description>"

Arguments:
  filename     Output filename (e.g., forest-ambience.mp3)
  description  Sound effect description/prompt

Options:
  --duration <seconds>  Sound duration (default: 10, max: 22)
  --influence <0-1>     Prompt influence (default: 0.4). Higher = closer to prompt.
  --no-style            Don't apply ambient style prefix (use raw prompt)
  --no-loop             Don't generate a seamless loop
  --output-dir <path>   Directory to save audio (default: public/assets/audio/)

Environment Variables:
  ELEVENLABS_API_KEY  Your ElevenLabs API key (required)

Examples:
  node scripts/create-sfx.js forest-ambience.mp3 "Wind through trees with bird calls"
  node scripts/create-sfx.js digital-hum.mp3 "Low digital hum with data clicks" --duration 15
  node scripts/create-sfx.js ritual-bells.mp3 "Distant temple bells in a cave" --influence 0.6
`);
  process.exit(1);
}

// Get API key from environment
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
if (!ELEVENLABS_API_KEY) {
  console.error('Error: ELEVENLABS_API_KEY environment variable is not set.');
  console.error('Set it with: export ELEVENLABS_API_KEY=your-key-here');
  process.exit(1);
}

// Ambient SFX style prefix - applied by default
// Emphasizes subtle, non-distracting background atmosphere
const AMBIENT_STYLE = `Subtle background ambience, barely perceptible, quiet and atmospheric, gentle and non-intrusive, low volume backdrop texture, meditative undertone, soft and continuous`;

async function generateSFX(prompt, outputFilename, durationSec, influence, useStyle, loop) {
  const finalPrompt = useStyle ? `${AMBIENT_STYLE}. ${prompt}` : prompt;

  console.log(`\nGenerating SFX: ${outputFilename}`);
  console.log(`Duration: ${durationSec}s`);
  console.log(`Loop: ${loop ? 'yes (seamless)' : 'no'}`);
  console.log(`Prompt influence: ${influence}`);
  console.log(`Style: ${useStyle ? 'Ambient (default)' : 'None (raw prompt)'}`);
  console.log(`Prompt: ${finalPrompt.substring(0, 120)}...`);

  const requestBody = JSON.stringify({
    text: finalPrompt,
    duration_seconds: durationSec,
    prompt_influence: influence,
    model_id: 'eleven_text_to_sound_v2',
    loop: loop,
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.elevenlabs.io',
      path: '/v1/sound-generation',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    const req = https.request(options, (res) => {
      // The API returns audio data directly as the response body
      if (res.statusCode !== 200) {
        let errorData = '';
        res.on('data', chunk => errorData += chunk);
        res.on('end', () => {
          try {
            const errorJson = JSON.parse(errorData);
            console.error(`API Error (${res.statusCode}):`, errorJson.detail?.message || errorJson.detail || errorData);
          } catch {
            console.error(`API Error (${res.statusCode}):`, errorData.substring(0, 500));
          }
          reject(new Error(`API returned status ${res.statusCode}`));
        });
        return;
      }

      // Determine output path
      const audioOutputDir = outputDir || path.join(process.cwd(), 'public', 'assets', 'audio');
      const outputPath = path.join(audioOutputDir, outputFilename);

      // Ensure directory exists
      if (!fs.existsSync(audioOutputDir)) {
        fs.mkdirSync(audioOutputDir, { recursive: true });
      }

      // Pipe audio response directly to file
      const file = fs.createWriteStream(outputPath);
      res.pipe(file);

      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(outputPath);
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`\n✓ Saved: ${outputPath} (${sizeKB} KB)`);
        resolve(outputPath);
      });

      file.on('error', (err) => {
        fs.unlink(outputPath, () => {});
        reject(err);
      });
    });

    req.on('error', (e) => {
      console.error('Request error:', e.message);
      reject(e);
    });

    req.write(requestBody);
    req.end();
  });
}

async function main() {
  console.log('=== Standalone SFX Generation (ElevenLabs) ===');

  try {
    await generateSFX(description, filename, duration, promptInfluence, applyStyle, enableLoop);
    console.log('\nDone!');
  } catch (error) {
    console.error('\nFailed:', error.message);
    process.exit(1);
  }
}

main();
