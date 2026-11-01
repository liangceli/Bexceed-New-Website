import fs from 'node:fs/promises';
import sharp from 'sharp';
import { videoData } from '../src/page-data.js';

const posters = {};
const checks = [];
await fs.mkdir('public/assets/pages/web', { recursive: true });
for (const video of videoData) {
  const source = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  try {
    const response = await fetch(source, { signal: AbortSignal.timeout(12000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    const metadata = await sharp(bytes).metadata();
    if (metadata.width < 400) throw new Error('Unavailable thumbnail');
    const name = `video-${video.id}.webp`;
    await sharp(bytes).webp({ quality: 88 }).toFile(`public/assets/pages/web/${name}`);
    posters[video.id] = `/assets/pages/web/${name}`;
    checks.push({ id: video.id, source, thumbnail: 'available' });
  } catch (error) {
    checks.push({ id: video.id, source, thumbnail: error.message });
  }
}
await fs.writeFile('src/video-posters.json', JSON.stringify(posters, null, 2) + '\n');
await fs.mkdir('qa/full-site', { recursive: true });
await fs.writeFile('qa/full-site/video-source-checks.json', JSON.stringify({checkedAt: new Date().toISOString(), checks}, null, 2));
console.log(JSON.stringify(checks, null, 2));
