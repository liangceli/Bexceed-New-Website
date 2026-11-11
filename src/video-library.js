import {escapeHtml as esc} from './localize.js';
import videoPosters from './video-posters.json' with {type:'json'};

export function formatResourceDate(date,locale='en'){
 if(!date)return '';
 const monthOnly=/^\d{4}-\d{2}$/.test(date);
 const value=new Date(`${date}${monthOnly?'-01':''}T12:00:00Z`);
 if(Number.isNaN(value.getTime()))return '';
 return new Intl.DateTimeFormat(locale==='en'?'en-AU':locale,{...(monthOnly?{}:{day:'numeric'}),month:'short',year:'numeric',timeZone:'UTC'}).format(value);
}

export function renderVideoCards(list,{u,locale,topics}){
 const caret='<span class="link-chevron" aria-hidden="true">&gt;</span>';
 const external=(url,label)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="text-link">${esc(label)} ${caret}</a>`;
 return list.map(v=>{
  const topic=topics.find(t=>t.id===v.topic)?.title;
  const date=formatResourceDate(v.date,locale);
  const badge=v.collection?u.selectedResource:u.archiveVideo;
  return `<article class="video-card${v.resourceOnly?' video-resource':''}" id="video-${v.id}">
   ${v.resourceOnly?'':`<div class="video-frame" data-player="${v.id}">${v.externalOnly?`<a class="video-launch" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener noreferrer" aria-label="${esc(u.watchYoutube+': '+v.title)}">`:`<button type="button" class="video-launch" data-play-youtube="${v.id}" aria-label="${esc(u.watchVideo+': '+v.title)}">`}<img src="${videoPosters[v.id]}" class="video-poster" width="480" height="360" loading="lazy" alt=""><span class="video-play"><img src="/assets/play-fill.svg" alt=""></span>${v.externalOnly?'</a>':'</button>'}</div>`}
   <div class="video-card-copy"><div class="video-tags"><span>${esc(topic||u.selectedVideos)}</span><span class="video-status">${esc(badge)}</span></div>
   <p class="video-meta">${esc(v.publisher)}${date?` · <time datetime="${v.date}">${date}</time>`:''}</p>
   <h2>${esc(v.title)}</h2>${v.presenters?`<p class="video-presenters">${esc(v.presenters)}</p>`:''}<p>${esc(v.note)}</p>
   ${v.description?`<details class="video-description"><summary>${esc(u.moreAboutVideo)}</summary><p>${esc(v.description)}</p></details>`:''}
   ${v.resourceOnly?`<p class="video-fallback">${esc(u.resourceUnavailable)}</p>`:v.externalOnly?`<p class="video-fallback">${esc(u.externalVideo)}</p>`:''}
   <div class="video-card-actions">${external(v.resourceOnly?v.official:`https://www.youtube.com/watch?v=${v.id}`,v.resourceOnly?u.official:u.watchYoutube)}${v.official&&!v.resourceOnly?external(v.official,u.publisherGuide):''}</div>
   ${v.cta?`<a class="video-enquiry text-link" href="#contact" data-interest="${v.cta.service}">${esc(v.cta.label)} ${caret}</a>`:''}
   </div></article>`;
 }).join('');
}
