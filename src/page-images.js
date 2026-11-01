import images from './page-assets.json' with { type: 'json' };

export function imageAttributes(name, sizes = '(max-width: 640px) calc(100vw - 40px), (max-width: 1200px) 45vw, 620px') {
  const image = images[name];
  if (!image) throw new Error(`Missing page image export: ${name}`);
  return `src="${image.src}" width="${image.width}" height="${image.height}"${image.srcset ? ` srcset="${image.srcset}" sizes="${sizes}"` : ''}`;
}
