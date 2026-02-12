#!/usr/bin/env node
/**
 * Background Music Generation Script
 * Primary: Suno AI (via suno-api package or self-hosted API)
 * Fallback: ElevenLabs Music Generation API
 *
 * Usage:
 *   node create-music.js "<prompt>" [options]
 *
 * Examples:
 *   node create-music.js "Dark ambient electronic, minimal, meditative, deep bass"
 *   node create-music.js "Ethereal choir with deep drones" --duration 120 --provider elevenlabs
 *   node create-music.js "Cinematic tension builder" --suno-base-url http://localhost:3000
 *
 * Environment Variables:
 *   SUNO_API_BASE_URL    - Suno API base URL (default: http://localhost:3000)
 *   SUNO_API_KEY         - API key for commercial Suno proxy services (optional)
 *   ELEVENLABS_API_KEY   - Required for ElevenLabs fallback
 *
 * Options:
 *   --output <path>          Output file path (default: public/assets/audio/music/bg-music.mp3)
 *   --duration <seconds>     Target duration in seconds (default: 120)
 *   --provider <name>        Force provider: suno | elevenlabs (default: auto)
 *   --suno-base-url <url>    Suno API base URL override
 *   --instrumental            Instrumental only, no vocals (default: true)
 *   --with-vocals            Include vocals
 *   --style <text>           Additional style direction
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';
import { loadEnv } from '../../../load-env.js';

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

const outputPath = extractFlag('--output', null);
const targetDuration = parseInt(extractFlag('--duration', '120'), 10);
const forcedProvider = extractFlag('--provider', null);
const sunoBaseUrl = extractFlag('--suno-base-url', null);
const additionalStyle = extractFlag('--style', null);
const withVocals = extractBoolFlag('--with-vocals');
const instrumental = !withVocals;

const prompt = args[0];

if (!prompt) {
  console.log(`
Usage: node create-music.js "<prompt>" [options]

Arguments:
  prompt    Music description/prompt (e.g., "Dark ambient electronic, meditative")

Options:
  --output <path>          Output file path (default: public/assets/audio/music/bg-music.mp3)
  --duration <seconds>     Target duration (default: 120)
  --provider <name>        Force provider: suno | elevenlabs (default: auto-detect)
  --suno-base-url <url>    Suno API base URL (default: http://localhost:3000)
  --instrumental           No vocals (default)
  --with-vocals            Include vocals
  --style <text>           Additional style direction

Environment Variables:
  SUNO_API_BASE_URL    Suno API server URL
  SUNO_API_KEY         API key for Suno proxy services
  ELEVENLABS_API_KEY   ElevenLabs API key (fallback)
`);
  process.exit(1);
}

// ── Resolve output path ─────────────────────────────────────────────────────

const projectRoot = path.resolve(__dirname, '..', '..', '..');
const resolvedOutput = outputPath || path.join(projectRoot, 'public', 'assets', 'audio', 'music', 'bg-music.mp3');
const outputDirPath = path.dirname(resolvedOutput);

// ── Suno API ────────────────────────────────────────────────────────────────

const SUNO_BASE = sunoBaseUrl || process.env.SUNO_API_BASE_URL || 'http://localhost:3000';
const SUNO_API_KEY = process.env.SUNO_API_KEY;

function httpRequest(url, options, body) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const isHttps = parsedUrl.protocol === 'https:';
    const lib = isHttps ? https : http;

    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      ...options,
    };

    const req = lib.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    });

    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const isHttps = parsedUrl.protocol === 'https:';
    const lib = isHttps ? https : http;

    const req = lib.get(url, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Download failed: ${res.statusCode}`));
        return;
      }

      const dir = path.dirname(dest);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
      file.on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
    });

    req.on('error', reject);
  });
}

async function isSunoAvailable() {
  try {
    const res = await httpRequest(`${SUNO_BASE}/api/get_limit`, {
      method: 'GET',
      headers: SUNO_API_KEY ? { 'Authorization': `Bearer ${SUNO_API_KEY}` } : {},
      timeout: 3000,
    });
    return res.statusCode === 200;
  } catch {
    return false;
  }
}

async function generateWithSuno(musicPrompt) {
  console.log('\nUsing Suno API...');
  console.log(`  Base URL: ${SUNO_BASE}`);
  console.log(`  Prompt: "${musicPrompt.substring(0, 100)}${musicPrompt.length > 100 ? '...' : ''}"`);

  const headers = {
    'Content-Type': 'application/json',
  };
  if (SUNO_API_KEY) {
    headers['Authorization'] = `Bearer ${SUNO_API_KEY}`;
  }

  // Use custom_generate for more control
  const body = JSON.stringify({
    prompt: musicPrompt,
    make_instrumental: instrumental,
    wait_audio: false, // Async generation
  });

  const res = await httpRequest(`${SUNO_BASE}/api/custom_generate`, {
    method: 'POST',
    headers: { ...headers, 'Content-Length': Buffer.byteLength(body) },
  }, body);

  if (res.statusCode !== 200) {
    // Try the simpler generate endpoint
    const simpleBody = JSON.stringify({
      prompt: musicPrompt,
      make_instrumental: instrumental,
      wait_audio: false,
    });

    const simpleRes = await httpRequest(`${SUNO_BASE}/api/generate`, {
      method: 'POST',
      headers: { ...headers, 'Content-Length': Buffer.byteLength(simpleBody) },
    }, simpleBody);

    if (simpleRes.statusCode !== 200) {
      throw new Error(`Suno API error: ${simpleRes.statusCode} - ${simpleRes.body.substring(0, 200)}`);
    }

    return JSON.parse(simpleRes.body);
  }

  return JSON.parse(res.body);
}

async function pollSunoResult(songIds) {
  console.log('  Waiting for generation...');
  const maxAttempts = 120; // 10 minutes at 5s intervals

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(r => setTimeout(r, 5000));

    const ids = songIds.join(',');
    const res = await httpRequest(`${SUNO_BASE}/api/get?ids=${ids}`, {
      method: 'GET',
      headers: SUNO_API_KEY ? { 'Authorization': `Bearer ${SUNO_API_KEY}` } : {},
    });

    if (res.statusCode !== 200) continue;

    const songs = JSON.parse(res.body);
    const ready = songs.filter(s => s.status === 'complete' && s.audio_url);

    if (ready.length > 0) {
      return ready[0]; // Return first completed song
    }

    const failed = songs.filter(s => s.status === 'error');
    if (failed.length === songs.length) {
      throw new Error('All Suno generations failed.');
    }

    if (i % 6 === 0) {
      console.log(`  Still generating... (${(i * 5)}s elapsed)`);
    }
  }

  throw new Error('Suno generation timed out after 10 minutes.');
}

// ── ElevenLabs Music API ────────────────────────────────────────────────────

async function generateWithElevenLabs(musicPrompt) {
  console.log('\nUsing ElevenLabs Music Generation...');
  console.log(`  Prompt: "${musicPrompt.substring(0, 100)}${musicPrompt.length > 100 ? '...' : ''}"`);
  console.log(`  Duration: ${targetDuration}s`);

  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  if (!ELEVENLABS_API_KEY) {
    throw new Error('ELEVENLABS_API_KEY is not set. Cannot use ElevenLabs fallback.');
  }

  const requestBody = JSON.stringify({
    prompt: musicPrompt,
    duration_seconds: Math.min(targetDuration, 300), // ElevenLabs max ~5 min
    instrumental,
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.elevenlabs.io',
      path: '/v1/music/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Length': Buffer.byteLength(requestBody),
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let errorData = '';
        res.on('data', chunk => errorData += chunk);
        res.on('end', () => {
          try {
            const errorJson = JSON.parse(errorData);
            const msg = errorJson.detail?.message || errorJson.detail || errorData;
            console.error(`  API Error (${res.statusCode}):`, msg);
          } catch {
            console.error(`  API Error (${res.statusCode}):`, errorData.substring(0, 500));
          }
          reject(new Error(`ElevenLabs Music API returned status ${res.statusCode}`));
        });
        return;
      }

      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      const file = fs.createWriteStream(resolvedOutput);
      res.pipe(file);

      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(resolvedOutput);
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`  Saved: ${resolvedOutput} (${sizeKB} KB)`);
        resolve(resolvedOutput);
      });

      file.on('error', (err) => {
        fs.unlink(resolvedOutput, () => {});
        reject(err);
      });
    });

    req.on('error', (e) => {
      console.error('  Request error:', e.message);
      reject(e);
    });

    req.write(requestBody);
    req.end();
  });
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Background Music Generation ===');
  console.log(`Prompt: "${prompt}"`);
  console.log(`Duration target: ${targetDuration}s`);
  console.log(`Instrumental: ${instrumental}`);
  if (additionalStyle) console.log(`Style: ${additionalStyle}`);

  const fullPrompt = additionalStyle ? `${prompt}. ${additionalStyle}` : prompt;

  // Determine provider
  let provider = forcedProvider;
  if (!provider) {
    console.log('\nAuto-detecting provider...');
    if (await isSunoAvailable()) {
      provider = 'suno';
      console.log('  Suno API available.');
    } else {
      provider = 'elevenlabs';
      console.log('  Suno not available, using ElevenLabs fallback.');
    }
  }

  if (provider === 'suno') {
    try {
      const songs = await generateWithSuno(fullPrompt);

      // Extract song IDs for polling
      const songIds = Array.isArray(songs) ? songs.map(s => s.id) : [songs.id];
      console.log(`  Generation started. Song IDs: ${songIds.join(', ')}`);

      const result = await pollSunoResult(songIds);

      console.log('  Downloading audio...');
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }
      await downloadFile(result.audio_url, resolvedOutput);

      const stats = fs.statSync(resolvedOutput);
      console.log(`\nSaved: ${resolvedOutput} (${Math.round(stats.size / 1024)} KB)`);
      console.log(`Title: ${result.title || 'Untitled'}`);
    } catch (err) {
      console.error(`\nSuno failed: ${err.message}`);
      console.log('Falling back to ElevenLabs...');
      await generateWithElevenLabs(fullPrompt);
    }
  } else {
    await generateWithElevenLabs(fullPrompt);
  }

  console.log('\nDone!');
}

main().catch(err => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
