#!/usr/bin/env node
/**
 * Standalone Video Generation Script using Google Veo 3.1
 * Takes a source image and creates an animated video from it.
 * Uses the same image for first AND last frame for native seamless loops.
 * Applies subtle meditative animation style by default.
 *
 * Usage:
 *   node scripts/create-video.js <source-image> <output-filename> "<animation-description>"
 *
 * Examples:
 *   node scripts/create-video.js forest.png forest-loop.mp4 "Gentle wind moving through trees, leaves falling"
 *   node scripts/create-video.js portrait.png portrait-loop.mp4 "Subtle breathing, eyes blinking" --duration 8
 *   node scripts/create-video.js test.png test.mp4 "Raw animation prompt" --no-style
 *
 * Environment Variables:
 *   VEO_API_KEY - Required. Your Google AI (Veo) API key.
 *
 * Options:
 *   --duration <seconds>  Video duration (default: 5, max: 8)
 *   --veo2                Use Veo 2.0 instead of Veo 3.1 (no native loop support)
 *   --no-style            Don't apply the animation style prefix (use raw prompt)
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import os from 'os';
import { loadEnv } from '../../../load-env.js';

loadEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find project root (go up from .claude/skills/create-panel-background to project root)
const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..');

// FFmpeg path (only needed for Veo 2.0 fallback)
const FFMPEG = os.platform() === 'win32'
  ? 'C:\\Users\\Matt\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.0.1-full_build\\bin\\ffmpeg.exe'
  : 'ffmpeg';

// Parse command line arguments
const args = process.argv.slice(2);

// Check for --duration flag
let duration = 5;
const durationIndex = args.indexOf('--duration');
if (durationIndex !== -1 && args[durationIndex + 1]) {
  duration = parseInt(args[durationIndex + 1], 10);
  args.splice(durationIndex, 2);
}

// Check for --veo2 flag (use older Veo 2.0 instead of 3.1)
let useVeo2 = false;
const veo2Index = args.indexOf('--veo2');
if (veo2Index !== -1) {
  useVeo2 = true;
  args.splice(veo2Index, 1);
}

// Check for --no-style flag
let applyStyle = true;
const noStyleIndex = args.indexOf('--no-style');
if (noStyleIndex !== -1) {
  applyStyle = false;
  args.splice(noStyleIndex, 1);
}

// Check for --output-dir flag
let outputDir = null;
const outputDirIndex = args.indexOf('--output-dir');
if (outputDirIndex !== -1 && args[outputDirIndex + 1]) {
  outputDir = args[outputDirIndex + 1];
  args.splice(outputDirIndex, 2);
}

const sourceImage = args[0];
const outputFilename = args[1];
const animationDescription = args[2];

// Validate inputs
if (!sourceImage || !outputFilename || !animationDescription) {
  console.log(`
Usage: node scripts/create-video.js <source-image> <output-filename> "<animation-description>"

Arguments:
  source-image          Path to source image (relative to public/assets/images/ or absolute)
  output-filename       Output video filename (e.g., forest-loop.mp4)
  animation-description Description of the animation/motion to apply

Options:
  --duration <seconds>  Video duration in seconds (default: 5, max: 8)
  --veo2                Use Veo 2.0 instead of Veo 3.1 (uses FFmpeg for seamless loop)
  --no-style            Don't apply animation style prefix (use raw prompt)
  --output-dir <path>   Directory to save video (default: public/assets/videos/)

Environment Variables:
  VEO_API_KEY  Your Google AI API key (required)

Examples:
  node scripts/create-video.js forest.png forest-loop.mp4 "Gentle wind, leaves falling"
  node scripts/create-video.js portrait.png portrait-loop.mp4 "Subtle breathing" --duration 8
  node scripts/create-video.js test.png test.mp4 "Simple motion" --veo2
`);
  process.exit(1);
}

// Get API key from environment
const VEO_API_KEY = process.env.VEO_API_KEY;
if (!VEO_API_KEY) {
  console.error('Error: VEO_API_KEY environment variable is not set.');
  console.error('Set it with: export VEO_API_KEY=your-key-here');
  process.exit(1);
}

// Animation style prefix - applied by default
const ANIMATION_STYLE = `Subtle gentle movement, slow meditative pace, seamless loop, soft organic motion`;

// Resolve source image path
function resolveImagePath(imagePath) {
  // If it's an absolute path, use it directly
  if (path.isAbsolute(imagePath)) {
    return imagePath;
  }
  // Otherwise, resolve relative to current working directory
  return path.join(process.cwd(), imagePath);
}

// Convert image to base64 for API
function imageToBase64(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
}

// Make a video seamless by reversing and appending (only for Veo 2.0)
function makeVideoSeamlessLoop(videoPath) {
  const filename = path.basename(videoPath);
  const tempPath = videoPath.replace('.mp4', '-temp.mp4');

  console.log(`\nMaking seamless with FFmpeg: ${filename}`);

  try {
    // Create forward + reversed version
    const cmd = `"${FFMPEG}" -y -i "${videoPath}" -filter_complex "[0:v]reverse[r];[0:v][r]concat=n=2:v=1:a=0[out]" -map "[out]" -c:v libx264 -crf 23 -preset medium "${tempPath}"`;

    execSync(cmd, { stdio: 'pipe' });

    // Replace original with seamless version
    fs.unlinkSync(videoPath);
    fs.renameSync(tempPath, videoPath);

    console.log(`Seamless loop created`);
    return true;
  } catch (error) {
    console.error(`FFmpeg failed:`, error.message);
    // Clean up temp file if it exists
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    return false;
  }
}

function downloadVideo(url, outputPath) {
  return new Promise((resolve, reject) => {
    // Add API key to the download URL
    const downloadUrl = url.includes('?') ? `${url}&key=${VEO_API_KEY}` : `${url}?key=${VEO_API_KEY}`;
    const file = fs.createWriteStream(outputPath);

    https.get(downloadUrl, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        https.get(redirectUrl, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', (err) => {
          fs.unlink(outputPath, () => {});
          reject(err);
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

async function pollOperation(operationName, outputPath) {
  const pollEndpoint = `https://generativelanguage.googleapis.com/v1beta/${operationName}?key=${VEO_API_KEY}`;

  let attempts = 0;
  const maxAttempts = 120; // 10 minutes max (5 second intervals)

  while (attempts < maxAttempts) {
    await new Promise(r => setTimeout(r, 5000)); // Wait 5 seconds
    attempts++;

    process.stdout.write(`\rPolling... ${attempts}/${maxAttempts}`);

    const result = await new Promise((resolve, reject) => {
      https.get(pollEndpoint, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve({ raw: data });
          }
        });
      }).on('error', reject);
    });

    if (result.done) {
      console.log('\n');

      // Try various response formats
      let videoUri = null;

      // Veo 3.1 format
      if (result.response?.generatedVideos?.[0]?.video?.uri) {
        videoUri = result.response.generatedVideos[0].video.uri;
      }
      // Veo 2.0 format
      else if (result.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri) {
        videoUri = result.response.generateVideoResponse.generatedSamples[0].video.uri;
      }
      // Fallback format
      else if (result.response?.generatedSamples?.[0]?.video?.uri) {
        videoUri = result.response.generatedSamples[0].video.uri;
      }

      if (videoUri) {
        console.log(`Video ready, downloading...`);
        await downloadVideo(videoUri, outputPath);
        return { success: true, path: outputPath };
      }

      console.log(`Could not find video data in response`);
      console.log('Response:', JSON.stringify(result, null, 2).substring(0, 1500));
      return { success: false, result };
    }

    if (result.error) {
      console.error(`\nOperation error:`, result.error);
      return { success: false, error: result.error };
    }
  }

  return { success: false, error: 'Timeout waiting for video generation' };
}

async function generateVideoVeo31(imagePath, outputFilename, prompt, videoDuration, useStyle) {
  // Apply animation style prefix if enabled
  const finalPrompt = useStyle ? `${ANIMATION_STYLE}. ${prompt}` : prompt;

  console.log(`\n=== Veo 3.1 (Native Seamless Loop) ===`);
  console.log(`Source: ${imagePath}`);
  console.log(`Output: ${outputFilename}`);
  console.log(`Duration: ${videoDuration}s`);
  console.log(`Style: ${useStyle ? 'Meditative (default)' : 'None (raw prompt)'}`);
  console.log(`Animation: ${finalPrompt.substring(0, 100)}...`);
  console.log(`Using same image for first AND last frame for seamless loop`);

  // Check if source image exists
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Source image not found: ${imagePath}`);
  }

  const imageBase64 = imageToBase64(imagePath);
  const mimeType = imagePath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';

  // Veo 3.1 API endpoint
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-generate-preview:predictLongRunning?key=${VEO_API_KEY}`;

  // Request body with image as BOTH first frame and last frame for seamless loop
  const requestBody = {
    instances: [{
      prompt: finalPrompt,
      image: {
        bytesBase64Encoded: imageBase64,
        mimeType: mimeType
      }
    }],
    parameters: {
      aspectRatio: "16:9",
      sampleCount: 1,
      durationSeconds: videoDuration,
      // Use same image as last frame for native seamless loop
      lastFrame: {
        bytesBase64Encoded: imageBase64,
        mimeType: mimeType
      }
    }
  };

  return makeApiRequest(endpoint, requestBody, outputFilename);
}

async function generateVideoVeo2(imagePath, outputFilename, prompt, videoDuration, useStyle) {
  // Apply animation style prefix if enabled
  const finalPrompt = useStyle ? `${ANIMATION_STYLE}. ${prompt}` : prompt;

  console.log(`\n=== Veo 2.0 (FFmpeg Seamless Loop) ===`);
  console.log(`Source: ${imagePath}`);
  console.log(`Output: ${outputFilename}`);
  console.log(`Duration: ${videoDuration}s`);
  console.log(`Style: ${useStyle ? 'Meditative (default)' : 'None (raw prompt)'}`);
  console.log(`Animation: ${finalPrompt.substring(0, 100)}...`);

  // Check if source image exists
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Source image not found: ${imagePath}`);
  }

  const imageBase64 = imageToBase64(imagePath);
  const mimeType = imagePath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';

  // Veo 2.0 API endpoint
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/veo-2.0-generate-001:predictLongRunning?key=${VEO_API_KEY}`;

  // Request body with image as input (Veo 2.0 image-to-video)
  const requestBody = {
    instances: [{
      prompt: finalPrompt,
      image: {
        bytesBase64Encoded: imageBase64,
        mimeType: mimeType
      }
    }],
    parameters: {
      aspectRatio: "16:9",
      sampleCount: 1,
      durationSeconds: videoDuration
    }
  };

  return makeApiRequest(endpoint, requestBody, outputFilename);
}

async function makeApiRequest(endpoint, requestBody, outputFilename) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint);

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            console.error(`API Error:`, response.error.message || response.error);
            reject(new Error(response.error.message || JSON.stringify(response.error)));
            return;
          }

          // Handle long-running operation response
          if (response.name) {
            console.log(`\nOperation started, waiting for completion...`);

            // Determine output path - use --output-dir if provided, otherwise default
            const videoOutputDir = outputDir || path.join(process.cwd(), 'public', 'assets', 'videos');
            const outputPath = path.join(videoOutputDir, outputFilename);

            // Ensure directory exists
            if (!fs.existsSync(videoOutputDir)) {
              fs.mkdirSync(videoOutputDir, { recursive: true });
            }

            // Poll for completion
            const result = await pollOperation(response.name, outputPath);

            if (result.success) {
              resolve(result.path);
            } else {
              reject(new Error(result.error || 'Failed to generate video'));
            }
          } else {
            console.log('Unexpected response:', JSON.stringify(response, null, 2));
            reject(new Error('Unexpected API response'));
          }
        } catch (e) {
          console.log('Raw response:', data.substring(0, 500));
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.error('Request error:', e.message);
      reject(e);
    });

    req.write(JSON.stringify(requestBody));
    req.end();
  });
}

async function main() {
  console.log('=== Standalone Video Generation ===');

  const imagePath = resolveImagePath(sourceImage);

  try {
    let outputPath;

    if (useVeo2) {
      // Veo 2.0: generate video, then use FFmpeg for seamless loop
      outputPath = await generateVideoVeo2(imagePath, outputFilename, animationDescription, duration, applyStyle);
      console.log(`\nSaved: ${outputPath}`);
      makeVideoSeamlessLoop(outputPath);
    } else {
      // Veo 3.1: native seamless loop using same image for first and last frame
      outputPath = await generateVideoVeo31(imagePath, outputFilename, animationDescription, duration, applyStyle);
      console.log(`\nSaved: ${outputPath}`);
      console.log(`(Native seamless loop - no FFmpeg needed)`);
    }

    console.log('\nDone!');
  } catch (error) {
    console.error('\nFailed:', error.message);
    process.exit(1);
  }
}

main();
