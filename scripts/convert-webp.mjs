import sharp from 'sharp';
import { readdirSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = './public';
const KATALOG_DIR = './public/katalog';

const convert = async (inputPath, outputPath, width) => {
  try {
    let pipeline = sharp(inputPath).webp({ quality: 80 });
    if (width) pipeline = pipeline.resize(width, null, { withoutEnlargement: true });
    await pipeline.toFile(outputPath);
    console.log(`✓ ${basename(inputPath)} → ${basename(outputPath)}`);
  } catch (e) {
    console.error(`✗ ${basename(inputPath)}: ${e.message}`);
  }
};

// Convert main public images (bg images)
const mainImages = readdirSync(PUBLIC_DIR)
  .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

for (const file of mainImages) {
  const input  = join(PUBLIC_DIR, file);
  const output = join(PUBLIC_DIR, basename(file, extname(file)) + '.webp');
  if (!existsSync(output)) await convert(input, output, 1920);
}

// Convert katalog images (display size ~400px per column)
const katalogImages = readdirSync(KATALOG_DIR)
  .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

for (const file of katalogImages) {
  const input  = join(KATALOG_DIR, file);
  const output = join(KATALOG_DIR, basename(file, extname(file)) + '.webp');
  if (!existsSync(output)) await convert(input, output, 600);
}

console.log('\nDone!');
