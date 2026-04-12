/**
 * Extract GIF frames and convert to ASCII text, saving as JSON files.
 * This runs at build time so mobile browsers don't need to decode GIFs.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import omggif from 'omggif';

const GifReader = omggif.GifReader;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const GIF_DIR = path.resolve(rootDir, 'public/gif');
const OUTPUT_DIR = path.resolve(rootDir, 'public/ascii-frames');

// Match the columns used in the main component
const GIF_COLUMN_MAP = {
  'Cube-shape animation-2.gif': 64,
  'Cube-shape animation-3.gif': 64,
  'Cube-shape-animation.gif': 64,
};

const COLUMNS_MOBILE = 40;
const charset = ' .,:-=+*#%@';

function frameToAscii(pixels, width, height, columns) {
  const sourceAspect = height / width || 1;
  const rows = Math.max(16, Math.floor(columns * sourceAspect * 0.5));

  let ascii = '';
  for (let y = 0; y < rows; y++) {
    let line = '';
    for (let x = 0; x < columns; x++) {
      const srcX = Math.floor((x / columns) * width);
      const srcY = Math.floor((y / rows) * height);
      const idx = (srcY * width + srcX) * 4;
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];
      const a = pixels[idx + 3] / 255;
      const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) * a;
      const ci = Math.min(
        charset.length - 1,
        Math.floor((lum / 255) * (charset.length - 1))
      );
      line += a < 0.08 ? ' ' : charset[ci];
    }
    ascii += `${line}\n`;
  }
  return ascii;
}

function extractGifFrames(gifPath, columns) {
  const buffer = fs.readFileSync(gifPath);
  const reader = new GifReader(buffer);

  const width = reader.width;
  const height = reader.height;
  const frameCount = reader.numFrames();

  const frames = [];

  for (let i = 0; i < frameCount; i++) {
    const frameData = new Uint8Array(width * height * 4);
    reader.decodeAndBlitFrameRGBA(i, frameData);

    const frameInfo = reader.frameInfo(i);
    // omggif delay is in centiseconds (1/100s), convert to ms
    const delay = (frameInfo.delay && frameInfo.delay > 0) ? frameInfo.delay * 10 : 100;

    const ascii = frameToAscii(frameData, width, height, columns);

    frames.push({
      ascii,
      duration: delay,
    });
  }

  return frames;
}

// Main
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const gifFiles = fs.readdirSync(GIF_DIR).filter((f) => f.endsWith('.gif'));

for (const gifFile of gifFiles) {
  console.log(`Extracting frames from: ${gifFile}`);
  const gifPath = path.join(GIF_DIR, gifFile);

  try {
    const columns = GIF_COLUMN_MAP[gifFile] ?? 64;

    // Desktop version (full columns)
    const desktopFrames = extractGifFrames(gifPath, columns);
    const baseName = path.basename(gifFile, path.extname(gifFile)).replace(/\s+/g, '-');
    const desktopOutput = path.join(OUTPUT_DIR, `${baseName}.json`);
    fs.writeFileSync(desktopOutput, JSON.stringify(desktopFrames));
    console.log(`  -> ${baseName}.json (${desktopFrames.length} frames, ${columns} cols)`);

    // Mobile version (fewer columns for performance)
    const mobileFrames = extractGifFrames(gifPath, COLUMNS_MOBILE);
    const mobileOutput = path.join(OUTPUT_DIR, `${baseName}-mobile.json`);
    fs.writeFileSync(mobileOutput, JSON.stringify(mobileFrames));
    console.log(`  -> ${baseName}-mobile.json (${mobileFrames.length} frames, ${COLUMNS_MOBILE} cols)`);
  } catch (error) {
    console.error(`  Error extracting ${gifFile}:`, error.message);
  }
}

console.log('\nDone! ASCII frame files saved to:', OUTPUT_DIR);
