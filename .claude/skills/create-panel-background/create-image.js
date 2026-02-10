#!/usr/bin/env node
/**
 * Standalone Image Generation Script using OpenAI GPT-Image (DALL-E 3)
 * Applies dark green zen minimalist style by default.
 *
 * Usage:
 *   node scripts/create-image.js <filename> "<description>"
 *
 * Examples:
 *   node scripts/create-image.js forest.png "A dark forest with glowing mushrooms"
 *   node scripts/create-image.js portrait.png "Cyberpunk portrait" --size 1024x1536
 *   node scripts/create-image.js test.png "Raw prompt without style" --no-style
 *
 * Environment Variables:
 *   OPENAI_API_KEY - Required. Your OpenAI API key.
 *
 * Options:
 *   --size <size>  Image size (default: 1536x1024 for 16:9)
 *                  Options: 1024x1024, 1536x1024, 1024x1536
 *   --no-style     Don't apply the zen style prefix (use raw prompt)
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
let imageSize = '1536x1024'; // Default 16:9
const sizeIndex = args.indexOf('--size');
if (sizeIndex !== -1 && args[sizeIndex + 1]) {
  imageSize = args[sizeIndex + 1];
  args.splice(sizeIndex, 2); // Remove --size and its value from args
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
  --size       Image size (default: 1536x1024)
               Options: 1024x1024, 1536x1024, 1024x1536
  --no-style   Don't apply zen style prefix (use raw prompt)
  --output-dir Directory to save image (default: public/assets/images/)

Environment Variables:
  OPENAI_API_KEY  Your OpenAI API key (required)

Examples:
  node scripts/create-image.js forest.png "A dark forest with glowing mushrooms"
  node scripts/create-image.js portrait.png "Cyberpunk portrait" --size 1024x1536
`);
  process.exit(1);
}

// Get API key from environment
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is not set.');
  console.error('Set it with: export OPENAI_API_KEY=your-key-here');
  process.exit(1);
}

// Zen style prefix - applied by default
const ZEN_STYLE = `Dark green zen minimalist aesthetic, deep forest green background (#3B4540), sage and pale mint accents (#D1E7D2, #DFEEE2), cream colored line art details (#F5F2E8), dark olive shadows (#474924), meditative and contemplative atmosphere, Japanese-inspired simplicity, organic natural forms, minimal composition with breathing room, muted earthy palette`;

async function generateImage(prompt, outputFilename, size, useStyle) {
  // Apply zen style prefix if enabled
  const finalPrompt = useStyle ? `${ZEN_STYLE}. ${prompt}` : prompt;

  console.log(`\nGenerating image: ${outputFilename}`);
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

            // Determine output path - use --output-dir if provided, otherwise default
            const imageOutputDir = outputDir || path.join(process.cwd(), 'public', 'assets', 'images');
            const outputPath = path.join(imageOutputDir, outputFilename);

            // Ensure directory exists
            if (!fs.existsSync(imageOutputDir)) {
              fs.mkdirSync(imageOutputDir, { recursive: true });
            }

            // Handle base64 response
            if (imageData.b64_json) {
              const buffer = Buffer.from(imageData.b64_json, 'base64');
              fs.writeFileSync(outputPath, buffer);
              console.log(`\n✓ Saved: ${outputPath}`);
              resolve(outputPath);
            }
            // Handle URL response
            else if (imageData.url) {
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
    await generateImage(description, filename, imageSize, applyStyle);
    console.log('\nDone!');
  } catch (error) {
    console.error('\nFailed:', error.message);
    process.exit(1);
  }
}

main();
