#!/usr/bin/env node
/**
 * Standalone Image Generation Script using Google Nano Banana Pro (Gemini 3 Pro Image)
 * Applies dark green zen minimalist style by default.
 * Falls back to OpenAI GPT-Image with --openai flag.
 *
 * Usage:
 *   node scripts/create-image.js <filename> "<description>"
 *
 * Examples:
 *   node scripts/create-image.js forest.png "A dark forest with glowing mushrooms"
 *   node scripts/create-image.js portrait.png "Cyberpunk portrait" --size 9:16
 *   node scripts/create-image.js test.png "Raw prompt without style" --no-style
 *   node scripts/create-image.js old.png "Using OpenAI instead" --openai
 *
 * Environment Variables:
 *   GEMINI_API_KEY - Required (falls back to VEO_API_KEY). Your Google AI API key.
 *   OPENAI_API_KEY - Required only with --openai flag.
 *
 * Options:
 *   --size <ratio>   Aspect ratio (default: 16:9)
 *                    Options: 1:1, 3:2, 2:3, 4:3, 3:4, 16:9, 9:16
 *                    Legacy pixel sizes also accepted: 1536x1024, 1024x1024, 1024x1536
 *   --resolution <r> Image resolution (default: 2K). Options: 1K, 2K, 4K
 *   --no-style       Don't apply the zen style prefix (use raw prompt)
 *   --openai         Use OpenAI GPT-Image instead of Nano Banana Pro
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);

// Check for --size flag
let aspectRatio = '16:9';
let imageResolution = '2K';
const sizeIndex = args.indexOf('--size');
if (sizeIndex !== -1 && args[sizeIndex + 1]) {
  const sizeVal = args[sizeIndex + 1];
  // Map legacy pixel sizes to aspect ratios
  const legacyMap = {
    '1536x1024': '16:9',
    '1024x1024': '1:1',
    '1024x1536': '9:16',
  };
  if (legacyMap[sizeVal]) {
    aspectRatio = legacyMap[sizeVal];
    console.log(`Mapped legacy size ${sizeVal} to aspect ratio ${aspectRatio}`);
  } else {
    aspectRatio = sizeVal;
  }
  args.splice(sizeIndex, 2);
}

// Check for --resolution flag
const resIndex = args.indexOf('--resolution');
if (resIndex !== -1 && args[resIndex + 1]) {
  imageResolution = args[resIndex + 1];
  args.splice(resIndex, 2);
}

// Check for --no-style flag
let applyStyle = true;
const noStyleIndex = args.indexOf('--no-style');
if (noStyleIndex !== -1) {
  applyStyle = false;
  args.splice(noStyleIndex, 1);
}

// Check for --openai flag (use legacy OpenAI generator)
let useOpenAI = false;
const openaiIndex = args.indexOf('--openai');
if (openaiIndex !== -1) {
  useOpenAI = true;
  args.splice(openaiIndex, 1);
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
Usage: node scripts/create-image.js <filename> "<description>"

Arguments:
  filename     Output filename (e.g., forest.png)
  description  Image description/prompt

Options:
  --size       Aspect ratio (default: 16:9)
               Options: 1:1, 3:2, 2:3, 4:3, 3:4, 16:9, 9:16
               Legacy pixel sizes also accepted: 1536x1024, 1024x1024, 1024x1536
  --resolution Image resolution (default: 2K). Options: 1K, 2K, 4K
  --no-style   Don't apply zen style prefix (use raw prompt)
  --openai     Use OpenAI GPT-Image instead of Nano Banana Pro
  --output-dir Directory to save image (default: public/assets/images/)

Environment Variables:
  GEMINI_API_KEY  Your Google AI API key (required, falls back to VEO_API_KEY)
  OPENAI_API_KEY  Your OpenAI API key (required only with --openai)

Examples:
  node scripts/create-image.js forest.png "A dark forest with glowing mushrooms"
  node scripts/create-image.js portrait.png "Cyberpunk portrait" --size 9:16
  node scripts/create-image.js hi-res.png "Detailed landscape" --resolution 4K
  node scripts/create-image.js old.png "Using OpenAI" --openai
`);
  process.exit(1);
}

// Zen style prefix - applied by default
const ZEN_STYLE = `Dark green zen minimalist aesthetic, deep forest green background (#3B4540), sage and pale mint accents (#D1E7D2, #DFEEE2), cream colored line art details (#F5F2E8), dark olive shadows (#474924), meditative and contemplative atmosphere, Japanese-inspired simplicity, organic natural forms, minimal composition with breathing room, muted earthy palette`;

// --- Nano Banana Pro (Google Gemini 3 Pro Image) ---

async function generateImageNanoBanana(prompt, outputFilename, ratio, resolution, useStyle) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VEO_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY (or VEO_API_KEY) environment variable is not set.');
    console.error('Set it with: export GEMINI_API_KEY=your-key-here');
    process.exit(1);
  }

  const finalPrompt = useStyle ? `${ZEN_STYLE}. ${prompt}` : prompt;

  console.log(`\nGenerating image with Nano Banana Pro: ${outputFilename}`);
  console.log(`Aspect ratio: ${ratio}`);
  console.log(`Resolution: ${resolution}`);
  console.log(`Style: ${useStyle ? 'Zen (default)' : 'None (raw prompt)'}`);
  console.log(`Prompt: ${finalPrompt.substring(0, 120)}...`);

  const requestBody = JSON.stringify({
    contents: [{
      parts: [
        { text: finalPrompt }
      ]
    }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: {
        aspectRatio: ratio,
        imageSize: resolution
      }
    }
  });

  const endpoint = `/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${GEMINI_API_KEY}`;

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: endpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            console.error(`API Error:`, response.error.message || JSON.stringify(response.error));
            reject(new Error(response.error.message || 'API error'));
            return;
          }

          // Extract image from candidates
          const candidates = response.candidates;
          if (!candidates || !candidates[0]?.content?.parts) {
            console.error('Unexpected response:', JSON.stringify(response, null, 2).substring(0, 1000));
            reject(new Error('No image data in response'));
            return;
          }

          // Find the part with inlineData (the image)
          const imagePart = candidates[0].content.parts.find(p => p.inlineData);
          if (!imagePart) {
            console.error('No image part found in response parts');
            reject(new Error('No image data in response parts'));
            return;
          }

          const imageBase64 = imagePart.inlineData.data;
          const mimeType = imagePart.inlineData.mimeType || 'image/png';

          // Determine output path
          const imageOutputDir = outputDir || path.join(process.cwd(), 'public', 'assets', 'images');
          const outputPath = path.join(imageOutputDir, outputFilename);

          // Ensure directory exists
          if (!fs.existsSync(imageOutputDir)) {
            fs.mkdirSync(imageOutputDir, { recursive: true });
          }

          // Save the image
          const buffer = Buffer.from(imageBase64, 'base64');
          fs.writeFileSync(outputPath, buffer);
          console.log(`\n✓ Saved: ${outputPath} (${mimeType})`);
          resolve(outputPath);
        } catch (e) {
          console.error('Parse error:', e.message);
          console.log('Raw response:', data.substring(0, 500));
          reject(e);
        }
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

// --- OpenAI GPT-Image (legacy fallback) ---

async function generateImageOpenAI(prompt, outputFilename, useStyle) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is not set.');
    console.error('Set it with: export OPENAI_API_KEY=your-key-here');
    process.exit(1);
  }

  const finalPrompt = useStyle ? `${ZEN_STYLE}. ${prompt}` : prompt;

  // Map aspect ratio back to pixel size for OpenAI
  const sizeMap = {
    '16:9': '1536x1024',
    '1:1': '1024x1024',
    '9:16': '1024x1536',
  };
  const size = sizeMap[aspectRatio] || '1536x1024';

  console.log(`\nGenerating image with OpenAI GPT-Image: ${outputFilename}`);
  console.log(`Size: ${size}`);
  console.log(`Style: ${useStyle ? 'Zen (default)' : 'None (raw prompt)'}`);
  console.log(`Prompt: ${finalPrompt.substring(0, 120)}...`);

  const requestBody = JSON.stringify({
    model: "gpt-image-1",
    prompt: finalPrompt,
    n: 1,
    size: size,
    quality: "high"
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.openai.com',
      path: '/v1/images/generations',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            console.error(`API Error:`, response.error.message);
            reject(new Error(response.error.message));
            return;
          }

          if (response.data && response.data[0]) {
            const imageData = response.data[0];
            const imageOutputDir = outputDir || path.join(process.cwd(), 'public', 'assets', 'images');
            const outputPath = path.join(imageOutputDir, outputFilename);

            if (!fs.existsSync(imageOutputDir)) {
              fs.mkdirSync(imageOutputDir, { recursive: true });
            }

            if (imageData.b64_json) {
              const buffer = Buffer.from(imageData.b64_json, 'base64');
              fs.writeFileSync(outputPath, buffer);
              console.log(`\n✓ Saved: ${outputPath}`);
              resolve(outputPath);
            } else if (imageData.url) {
              await downloadImage(imageData.url, outputPath);
              console.log(`\n✓ Saved: ${outputPath}`);
              resolve(outputPath);
            }
          } else {
            console.error('Unexpected response:', JSON.stringify(response, null, 2));
            reject(new Error('Unexpected API response'));
          }
        } catch (e) {
          console.error('Parse error:', e.message);
          console.log('Raw response:', data.substring(0, 500));
          reject(e);
        }
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

function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('=== Standalone Image Generation ===');

  try {
    if (useOpenAI) {
      await generateImageOpenAI(description, filename, applyStyle);
    } else {
      await generateImageNanoBanana(description, filename, aspectRatio, imageResolution, applyStyle);
    }
    console.log('\nDone!');
  } catch (error) {
    console.error('\nFailed:', error.message);
    process.exit(1);
  }
}

main();
