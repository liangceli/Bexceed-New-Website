import fs from 'node:fs/promises';
import sharp from 'sharp';

// Only the seven approved client resources; do not rewrite existing thumbnails.
const ids=['aDvwXeFR5qo','Z9r-tY1qSX0','D7NbL-DfnW8','uKxBtPWywCw','XgDeroNQqG8','pz3XvxgcC4k','z_u-fx6dMuc'];
const posters=JSON.parse(await fs.readFile('src/video-posters.json','utf8'));
const sources=[];
for(const id of ids){
 const url=`https://www.youtube.com/watch?v=${id}`;
 const r=await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,{signal:AbortSignal.timeout(20000)});
 if(!r.ok)throw new Error(`${id}: metadata ${r.status}`);
 const meta=await r.json();
 const largeUrl=meta.thumbnail_url.replace('/hqdefault.jpg','/maxresdefault.jpg');
 let thumb=await fetch(largeUrl,{signal:AbortSignal.timeout(20000)});
 if(!thumb.ok)thumb=await fetch(meta.thumbnail_url,{signal:AbortSignal.timeout(20000)});
 if(!thumb.ok)throw new Error(`${id}: thumbnail ${thumb.status}`);
 const data=Buffer.from(await thumb.arrayBuffer());
 const dimensions=await sharp(data).metadata();
 if(dimensions.width<400)throw new Error(`${id}: thumbnail too small`);
 const path=`/assets/pages/web/video-${id}.webp`;
 await sharp(data).webp({quality:88}).toFile(`public${path}`);
 posters[id]=path;
 sources.push({id,url,title:meta.title,publisher:meta.author_name,channel:meta.author_url,thumbnail:thumb.url,width:dimensions.width,height:dimensions.height});
 console.log(`${id}: ${meta.author_name} — ${meta.title}`);
}
await fs.writeFile('src/video-posters.json',JSON.stringify(posters,null,2)+'\n');
await fs.writeFile('docs/client-video-sources-2026-11-12.json',JSON.stringify({checkedAt:new Date().toISOString(),englishRetirementSource:'https://moneysmart.gov.au/plan-for-your-retirement/work-out-how-much-you-need-to-retire',sources},null,2)+'\n');
