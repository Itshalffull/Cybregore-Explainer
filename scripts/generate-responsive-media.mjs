#!/usr/bin/env node
/**
 * generate-responsive-media.mjs
 *
 * Cross-platform script (Windows, Mac, Linux) that generates responsive
 * image and video variants for optimal loading times.
 *
 * Images (PNG → WebP at multiple widths):
 *   foo.png → foo-480w.webp, foo-768w.webp, foo-1280w.webp
 *
 * Videos (MP4 → smaller mobile version, requires ffmpeg installed):
 *   foo-loop.mp4 → foo-loop-mobile.mp4 (480p, lower bitrate)
 *
 * Prerequisites:
 *   npm install --save-dev sharp    (images — bundled binaries, no system deps)
 *   ffmpeg installed on PATH        (videos — https://ffmpeg.org/download.html)
 *
 * Usage:
 *   node scripts/generate-responsive-media.mjs [--force]
 */

import { existsSync, readdirSync, statSync } from 'fs'
import { join, basename, dirname, extname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { execFileSync } from 'child_process'
import sharp from 'sharp'

// ─── Config ──────────────────────────────────────────────────────────────────

const IMAGE_WIDTHS = [480, 768, 1280]
const WEBP_QUALITY = 80
const VIDEO_MOBILE_HEIGHT = 480
const VIDEO_CRF = 28 // Higher = smaller file. 28 is good for background loops.

// ─── Paths ───────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = resolve(__dirname, '..')
const IMG_DIR = join(PROJECT_ROOT, 'public', 'assets', 'images')
const VID_DIR = join(PROJECT_ROOT, 'public', 'assets', 'videos')

const FORCE = process.argv.includes('--force')

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}K`
  return `${(bytes / (1024 * 1024)).toFixed(1)}M`
}

function getPngs(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter(f => f.endsWith('.png'))
    .map(f => join(dir, f))
}

function getMp4s(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter(f => f.endsWith('.mp4') && !f.endsWith('-mobile.mp4'))
    .map(f => join(dir, f))
}

function ffmpegAvailable() {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

function ffprobeHeight(videoPath) {
  const out = execFileSync('ffprobe', [
    '-v', 'quiet',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=height',
    '-of', 'csv=p=0',
    videoPath,
  ], { encoding: 'utf-8' })
  return parseInt(out.trim(), 10)
}

// ─── Image Processing ────────────────────────────────────────────────────────

async function processImage(src) {
  const dir = dirname(src)
  const base = basename(src, '.png')
  const meta = await sharp(src).metadata()
  const srcWidth = meta.width || 0

  let created = 0
  for (const w of IMAGE_WIDTHS) {
    if (w > srcWidth) continue

    const out = join(dir, `${base}-${w}w.webp`)

    if (existsSync(out) && !FORCE) {
      console.log(`  [skip] ${base}-${w}w.webp`)
      continue
    }

    await sharp(src)
      .resize(w)
      .webp({ quality: WEBP_QUALITY })
      .toFile(out)

    const size = statSync(out).size
    console.log(`  [create] ${base}-${w}w.webp (${formatBytes(size)})`)
    created++
  }
  return created
}

// ─── Video Processing ────────────────────────────────────────────────────────

function processVideo(src) {
  const dir = dirname(src)
  const base = basename(src, '.mp4')
  const out = join(dir, `${base}-mobile.mp4`)

  if (existsSync(out) && !FORCE) {
    console.log(`  [skip] ${base}-mobile.mp4`)
    return 0
  }

  const srcHeight = ffprobeHeight(src)
  const vfArgs = srcHeight <= VIDEO_MOBILE_HEIGHT
    ? [] // Already small, just re-encode
    : ['-vf', `scale=-2:${VIDEO_MOBILE_HEIGHT}`]

  execFileSync('ffmpeg', [
    '-y', '-i', src,
    ...vfArgs,
    '-c:v', 'libx264', '-crf', String(VIDEO_CRF), '-preset', 'slow',
    '-an', '-movflags', '+faststart',
    out,
  ], { stdio: 'pipe' })

  const size = statSync(out).size
  console.log(`  [create] ${base}-mobile.mp4 (${VIDEO_MOBILE_HEIGHT}p, ${formatBytes(size)})`)
  return 1
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Responsive Media Generator ===')
  console.log('')

  // ── Images ──
  console.log('── Processing images ──')
  console.log('')

  let totalWebp = 0
  let totalOrigSize = 0
  let totalWebpSize = 0

  const mainPngs = getPngs(IMG_DIR)
  const tiktokPngs = getPngs(join(IMG_DIR, 'tiktok'))
  const allPngs = [...mainPngs, ...tiktokPngs]

  for (const img of allPngs) {
    console.log(`${basename(img)}:`)
    totalOrigSize += statSync(img).size
    const created = await processImage(img)
    totalWebp += created
  }

  // Count all webp files for summary
  const countWebps = (dir) => {
    if (!existsSync(dir)) return { count: 0, size: 0 }
    const files = readdirSync(dir).filter(f => f.match(/-\d+w\.webp$/))
    return {
      count: files.length,
      size: files.reduce((sum, f) => sum + statSync(join(dir, f)).size, 0),
    }
  }
  const mainWebps = countWebps(IMG_DIR)
  const tiktokWebps = countWebps(join(IMG_DIR, 'tiktok'))
  totalWebpSize = mainWebps.size + tiktokWebps.size
  const totalWebpCount = mainWebps.count + tiktokWebps.count

  // ── Videos ──
  console.log('')
  console.log('── Processing videos ──')
  console.log('')

  let totalMobile = 0
  let totalOrigVidSize = 0
  let totalMobileSize = 0

  if (!ffmpegAvailable()) {
    console.log('  [warn] ffmpeg not found on PATH — skipping video processing')
    console.log('  Install from https://ffmpeg.org/download.html')
  } else {
    const mp4s = getMp4s(VID_DIR)
    for (const vid of mp4s) {
      console.log(`${basename(vid)}:`)
      totalOrigVidSize += statSync(vid).size
      totalMobile += processVideo(vid)
    }

    // Count mobile videos
    const mobileFiles = readdirSync(VID_DIR).filter(f => f.endsWith('-mobile.mp4'))
    totalMobileSize = mobileFiles.reduce(
      (sum, f) => sum + statSync(join(VID_DIR, f)).size, 0
    )
  }

  // ── Summary ──
  console.log('')
  console.log('=== Done ===')
  console.log('')
  console.log(`WebP images: ${totalWebpCount} files, ${formatBytes(totalWebpSize)} total`)
  console.log(`  (originals: ${allPngs.length} PNGs, ${formatBytes(totalOrigSize)})`)
  console.log('')
  if (ffmpegAvailable()) {
    console.log(`Mobile videos: ${readdirSync(VID_DIR).filter(f => f.endsWith('-mobile.mp4')).length} files, ${formatBytes(totalMobileSize)} total`)
    console.log(`  (originals: ${getMp4s(VID_DIR).length} MP4s, ${formatBytes(totalOrigVidSize)})`)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
