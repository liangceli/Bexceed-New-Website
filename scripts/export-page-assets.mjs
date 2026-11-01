import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Keep the approved originals intact; only serve these smaller web exports.
const source = 'public/assets/pages';
const output = path.join(source, 'web');
await fs.mkdir(output, { recursive: true });
const manifest = {};
for (const name of (await fs.readdir(source)).filter(name => /\.(png|jpe?g)$/i.test(name)).sort()) {
  const file = path.join(source, name);
  const meta = await sharp(file).metadata();
  const stem = path.parse(name).name;
  const icon = stem.endsWith('-icons');
  const maxWidth = Math.min(meta.width, icon ? 1280 : 1920);
  const widths = icon ? [maxWidth] : [...new Set([480, 960, 1440, maxWidth].filter(width => width <= maxWidth))].sort((a,b) => a-b);
  const variants = [];
  for (const width of widths) {
    const filename = width === maxWidth ? `${stem}.webp` : `${stem}-${width}.webp`;
    const info = await sharp(file).rotate().resize({ width, withoutEnlargement: true })
      .webp({ quality: icon ? 92 : 85, effort: 5 }).toFile(path.join(output, filename));
    variants.push({ src: `/assets/pages/web/${filename}`, width: info.width, bytes: info.size });
  }
  const largest = variants.at(-1);
  manifest[name] = { src: largest.src, width: maxWidth, height: Math.round(meta.height * maxWidth / meta.width),
    srcset: icon ? '' : variants.map(v => `${v.src} ${v.width}w`).join(', '), variants };
}
await fs.writeFile('src/page-assets.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Exported ${Object.keys(manifest).length} approved images with responsive WebP variants.`);
