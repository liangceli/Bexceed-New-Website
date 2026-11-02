import './design-base.css';
import './design-desktop.css';
import './site.css';
import './pages.css';
import './footer.css';
import './credentials.css';
import { renderHome } from './home.js';
import { resolveRoute, routeHref } from './routes.js';
import { renderInner, bindInnerPage, contactImage, pageTitle, renderPriceRows } from './pages.js';
import { content, languages, resolveLocale } from './content.js';
import { createEnquiryMailto } from './enquiry.js';
import { getInsights } from './insights.js';

const app = document.querySelector('#app');
const query = new URLSearchParams(location.search);
let route=resolveRoute(location.pathname);
let locale = 'en';
try { locale = query.get('lang') || route.defaultLocale || localStorage.getItem('bexceed-language') || 'en'; } catch {}
locale = resolveLocale(locale);
let category=route.category||0;
let firstRender = true;
let videoObservers=[];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const still = query.has('still');
const icon = (name, className='') => `<img class="${className}" src="/assets/${name}.svg" alt="" aria-hidden="true">`;
const chevron = '<span class="link-chevron" aria-hidden="true">&gt;</span>';
const destinations = ['/','/services','/pricing','/about','/insights'];
const navOrder = [0,3,1,2,4];
const practiceLabel = { en:'is a CPA Practice', 'zh-CN':'是一家 CPA 执业机构', 'zh-TW':'是一家 CPA 執業機構' };
const resourceUrls = ['https://www.ato.gov.au/','https://asic.gov.au/'];
const brand = () => `<a class="brand" href="${routeHref('/',locale)}" aria-label="Bexceed"><span class="brand-image">${'<img class="brand-symbol" src="/assets/bexceed-client-logo.png" alt="">'}</span><span><strong>Bexceed</strong><small>Tax &amp; Accounting</small></span></a>`;
const nav = t => navOrder.map(i=>`<a href="${routeHref(destinations[i],locale)}" ${route.section===['home','services','pricing','about','insights'][i]?'class="active" aria-current="page"':''}>${t.nav[i]}</a>`).join('');
const priceCards = (t, group) => t.prices[group].map(([title,sub,description,items])=>`<article class="price-card"><div class="price-heading"><h3>${title}</h3><span class="fee">${t.fee}</span></div><p class="price-subtitle">${sub}</p><p>${description}</p><h4>${t.includes}</h4><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul></article>`).join('');
const priceRows = (t, group) => t.prices[group].map(([title,,description])=>`<article class="pricing-row"><div class="pricing-row-heading"><h3>${title}</h3><span class="fee">${t.fee}</span></div><p>${description}</p></article>`).join('');

function saveFields(){
  const form=document.querySelector('#enquiry-form');
  return form ? Object.fromEntries(new FormData(form)) : {};
}
function render(resetScroll=false){
  videoObservers.forEach(observer=>observer.disconnect());videoObservers=[];
  const fields=saveFields();
  document.querySelectorAll('video').forEach(video=>video.pause());
  const scroll=window.scrollY;
  const t=content[locale];
  const insights=getInsights(locale);
  document.documentElement.lang=languages[locale][2];
  document.title=route.type==='home'?`Bexceed Tax & Accounting | Adelaide`:`${pageTitle(route,locale,t)} | Bexceed`;
  document.body.classList.toggle('inner-page',route.type!=='home');
  document.body.dataset.page=route.type;
  document.querySelector('meta[name=description]').content=route.type==='home'?t.footerText:`${pageTitle(route,locale,t)}. ${t.footerText}`;
  app.innerHTML=`<a class="skip-link" href="#main">${t.skip}</a>
  <header class="header" id="header"><div class="container header-inner">${brand()}<nav class="desktop-nav" aria-label="${t.menu}">${nav(t)}</nav><div class="language-picker"><button class="language-pill" id="language-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="language-menu" aria-label="${t.language}">${languages[locale][1]}${icon('caret-down')}</button><div class="language-menu" id="language-menu" hidden>${Object.entries(languages).map(([key,[name]])=>`<button type="button" lang="${key}" data-language="${key}" aria-pressed="${key===locale}">${name}</button>`).join('')}</div></div><a href="#contact" class="button header-contact">${t.contact}</a><button type="button" class="menu-toggle" id="mobile-toggle" aria-label="${t.menu}" aria-expanded="false" aria-controls="mobile-menu">${icon('list')}</button></div><nav id="mobile-menu" class="mobile-nav" aria-label="${t.menu}" hidden>${nav(t)}<a href="#contact">${t.contact}</a></nav></header>
  <main id="main">${route.type==='home'?renderHome({t,locale,insights,category,firstRender,reducedMotion,icon,chevron,priceRows}):renderInner(route,{t,locale,category})}
  <section class="contact ${route.type!=='home'?'interior-contact':''} ${['article','videos','not-found'].includes(route.type)?'contact-white':''}" id="contact"><div class="contact-left"><img class="office-photo" ${contactImage(route)} alt="${t.office}" loading="lazy"><div class="contact-info"><h2>${t.contactTitle}</h2><p>${t.contactText}</p><div class="contact-details"><a href="tel:+61432029746">${icon('phone')}0432 029 746</a><a href="mailto:admin@bexceed.com.au">${icon('envelope-simple')}admin@bexceed.com.au</a><a href="https://www.google.com/maps/search/?api=1&query=25+Grenfell+Street+Adelaide+SA+5000" target="_blank" rel="noopener noreferrer">${icon('map-pin')}${t.address}</a></div></div></div><div class="contact-right"><form id="enquiry-form" novalidate><div class="field-row"><label>${t.fields[0]} <span class="required">*</span><input name="firstName" autocomplete="given-name" placeholder="${t.fields[0]}" required maxlength="80"></label><label>${t.fields[1]} <span class="required">*</span><input name="lastName" autocomplete="family-name" placeholder="${t.fields[1]}" required maxlength="80"></label></div><div class="field-row"><label>${t.fields[2]} <span class="required">*</span><input name="email" type="email" autocomplete="email" placeholder="you@email.com" required maxlength="254"></label><label>${t.fields[3]} <span class="optional">(${t.optional})</span><input name="phone" type="tel" autocomplete="tel" placeholder="${t.fields[3]}" maxlength="40"></label></div><label>${t.fields[4]}<select name="service"><option value="">${t.select}</option>${t.categories.map((c,i)=>`<option value="${i}">${c}</option>`).join('')}<option value="other">${t.other}</option></select></label><label>${t.fields[5]}<textarea name="message" rows="4" maxlength="3000" placeholder="${t.messagePlaceholder}"></textarea></label><label class="consent"><input type="checkbox" name="privacy" required><span>${t.consent} <a class="inline-link" href="${routeHref('/privacy',locale)}">${t.privacy}</a>.</span></label><div class="form-feedback" aria-live="polite" hidden></div><div class="form-submit"><button type="submit" class="button">${t.send}</button><span>${t.draftNote}</span></div></form></div></section>
  </main><footer id="footer"><div class="container footer-layout">
    <div class="footer-navigation"><h3>${t.quick}</h3><nav aria-label="${t.quick}">${nav(t)}<button class="footer-language" type="button" data-language-open>${t.language}</button></nav></div>
    <div class="footer-navigation"><h3>${t.servicesLabel}</h3><nav aria-label="${t.servicesLabel}">${t.categories.map((c,i)=>`<a href="${routeHref('/services/'+['individuals','businesses','smsf'][i],locale)}">${locale==='en'&&i===2?'Self Managed Super Funds':c}</a>`).join('')}</nav></div>
    <div class="footer-practice"><img class="footer-cpa" src="/assets/credential-cpa.png" alt="CPA Australia" loading="lazy"><p class="footer-company"><span lang="en">Bexceed Tax &amp; Accounting Services Pty Ltd</span><br>${practiceLabel[locale]}</p>
      <address class="footer-details"><a href="https://www.google.com/maps/search/?api=1&query=25+Grenfell+Street+Adelaide+SA+5000" target="_blank" rel="noopener noreferrer">${icon('map-pin')}<span lang="en">Level 2, 25 Grenfell Street<br>Adelaide SA 5000</span></a><a href="tel:+61432029746">${icon('phone')}<span>+61 432 029 746</span></a><a href="mailto:admin@bexceed.com.au">${icon('envelope-simple')}<span>admin@bexceed.com.au</span></a><a href="https://www.bexceed.com.au/">${icon('globe')}<span>www.bexceed.com.au</span></a></address>
    </div>
  </div><div class="container footer-legal"><p>© ${new Date().getFullYear()} Bexceed. ${t.rights}</p><p>${t.legal}</p><a href="${routeHref('/privacy',locale)}">${t.privacy}</a></div></footer>
  <dialog id="details-dialog" aria-labelledby="dialog-title"><button type="button" class="dialog-close" aria-label="${t.close}">${icon('x')}</button><div id="dialog-body"></div></dialog>`;
  Object.entries(fields).forEach(([name,value])=>{const input=document.querySelector(`[name="${name}"]`);if(input){if(input.type==='checkbox')input.checked=true;else input.value=value;}});
  bindControls();
  bindInnerPage(locale);
  document.body.dataset.viewSearch=location.search;
  updateHeader();
  if(resetScroll)window.scrollTo({top:0,behavior:'instant'});else if(!firstRender)window.scrollTo({top:scroll,behavior:'instant'});
  if(resetScroll&&location.hash)requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'instant'}));
  firstRender=false;
}

function closeMenus(){
  document.querySelector('#language-menu').hidden=true;
  document.querySelector('#language-toggle').setAttribute('aria-expanded','false');
  document.querySelector('#mobile-menu').hidden=true;
  document.querySelector('#mobile-toggle').setAttribute('aria-expanded','false');
  document.querySelector('#header').classList.remove('menu-open');
}
function openLanguage(){
  const menu=document.querySelector('#language-menu');
  menu.hidden=!menu.hidden;
  document.querySelector('#language-toggle').setAttribute('aria-expanded',String(!menu.hidden));
  if(!menu.hidden)menu.querySelector(`[data-language="${locale}"]`).focus();
}
function setCategory(index,focus=false){
  category=index;
  document.querySelectorAll('[data-tab]').forEach((el,i)=>{el.classList.toggle('selected',i===index);el.setAttribute('aria-selected',String(i===index));el.tabIndex=i===index?0:-1;});
  const panel=document.querySelector('#price-panel');panel.innerHTML=(route.type==='pricing'?renderPriceRows:priceRows)(content[locale],index);panel.setAttribute('aria-labelledby',`tab-${index}`);
  if(route.type==='pricing'){const url=new URL(routeHref('/pricing/'+['individuals','businesses','smsf'][index],locale),location.origin);history.replaceState(null,'',url);route=resolveRoute(url.pathname);}
  if(focus)document.querySelector(`#tab-${index}`).focus();
}
function showModal(kind){
  const t=content[locale];
  const body=document.querySelector('#dialog-body');
  if(kind==='about')body.innerHTML=`<p class="eyebrow">${t.why}</p><h2 id="dialog-title">${t.about}</h2><p>${t.aboutDetail}</p><a href="#contact" class="button" data-close-modal>${t.contact}</a>`;
  if(kind==='privacy')body.innerHTML=`<h2 id="dialog-title">${t.privacy}</h2><p>${t.privacyText}</p>`;
  if(kind==='pricing')body.innerHTML=`<p class="eyebrow">${t.pricing}</p><h2 id="dialog-title">${t.allPricing}</h2><p>${t.pricingLead}</p>${t.categories.map((c,i)=>`<h3 class="dialog-category">${c}</h3><div class="price-grid">${priceCards(t,i)}</div>`).join('')}<p class="dialog-fee-note">${t.feeNote}</p><a href="#contact" class="button" data-close-modal>${t.quote}</a>`;
  if(kind.startsWith('service-')){const i=Number(kind.slice(-1));body.innerHTML=`<p class="eyebrow">${t.servicesLabel}</p><h2 id="dialog-title">${t.services[i][0]}</h2><p>${t.services[i][1]}</p><ul class="service-detail-list">${t.serviceDetails[i].map(s=>`<li>${s}</li>`).join('')}</ul><a href="#contact" class="button" data-close-modal data-interest="${i}">${t.details}</a>`;}
  const dialog=document.querySelector('#details-dialog');dialog.showModal();document.body.classList.add('dialog-open');
  body.querySelectorAll('[data-close-modal]').forEach(a=>a.addEventListener('click',()=>{if(a.dataset.interest!==undefined)document.querySelector('[name="service"]').value=a.dataset.interest;dialog.close();}));
}
function bindControls(){
  const t=content[locale];
  document.querySelector('#language-toggle').addEventListener('click',openLanguage);
  document.querySelectorAll('[data-language]').forEach(b=>b.addEventListener('click',()=>{locale=b.dataset.language;try{localStorage.setItem('bexceed-language',locale);}catch{}const url=new URL(location.href);url.searchParams.set('lang',locale);history.replaceState(null,'',url);render();document.querySelector('#language-toggle').focus();}));
  document.querySelector('[data-language-open]').addEventListener('click',()=>{window.scrollTo({top:0,behavior:reducedMotion.matches?'instant':'smooth'});openLanguage();});
  document.querySelector('#mobile-toggle').addEventListener('click',()=>{const menu=document.querySelector('#mobile-menu');menu.hidden=!menu.hidden;document.querySelector('#mobile-toggle').setAttribute('aria-expanded',String(!menu.hidden));document.querySelector('#header').classList.toggle('menu-open',!menu.hidden);});
  document.querySelectorAll('nav a[href^="#"]').forEach(a=>a.addEventListener('click',closeMenus));
  document.querySelectorAll('[data-modal]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();closeMenus();showModal(a.dataset.modal);}));
  document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showModal(`service-${a.dataset.service}`);}));
  document.querySelector('#quote')?.addEventListener('click',()=>document.querySelector('[name="service"]').value=category);
  document.querySelectorAll('[data-tab]').forEach((tab,i)=>{tab.addEventListener('click',()=>setCategory(i));tab.addEventListener('keydown',e=>{const keys={ArrowRight:(i+1)%3,ArrowLeft:(i+2)%3,Home:0,End:2};if(e.key in keys){e.preventDefault();setCategory(keys[e.key],true);}});});
  const dialog=document.querySelector('#details-dialog');dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  document.querySelector('#enquiry-form').addEventListener('submit',e=>{
    e.preventDefault();const form=e.currentTarget;const feedback=form.querySelector('.form-feedback');
    ['firstName','lastName','email'].forEach(name=>{form.elements[name].value=form.elements[name].value.trim();});
    if(!form.checkValidity()){feedback.textContent=t.invalid;feedback.hidden=false;form.reportValidity();return;}
    const values=Object.fromEntries(new FormData(form));
    const service=values.service==='other'?t.other:t.categories[Number(values.service)];
    const href=createEnquiryMailto(values,values.service===''?'':service,languages[locale][0]);
    feedback.replaceChildren();const p=document.createElement('p');p.textContent=t.draftReady;const a=document.createElement('a');a.href=href;a.textContent=t.openDraft;a.className='text-link';const small=document.createElement('p');small.textContent=t.emailAlternative;feedback.append(p,a,small);feedback.hidden=false;a.click();
  });
  initialiseVideo('hero-video','/assets/hero-meeting.mp4',false);
  initialiseVideo('adviser-video','/assets/adviser-consultation.mp4',true);
}
function initialiseVideo(id,src,lazy){
  const video=document.getElementById(id),button=document.querySelector(`[data-video="${id}"]`),t=content[locale];
  if(!video)return;
  let userPaused=false;
  const update=()=>{if(!button)return;const paused=video.paused;button.setAttribute('aria-label',paused?t.play:t.pause);button.setAttribute('aria-pressed',String(!paused));if(id==='hero-video')button.querySelector('span').textContent=paused?t.play:t.pause;button.querySelector('img').src=`/assets/${paused?'play-fill':'pause-fill'}.svg`;};
  const start=()=>{if(!video.getAttribute('src')){video.src=src;video.load();}return video.play().catch(update);};
  video.addEventListener('playing',()=>{video.classList.add('is-playing');if(id==='hero-video')document.querySelector('.hero').classList.add('has-video');update();});video.addEventListener('pause',update);
  button?.addEventListener('click',()=>{if(video.paused){userPaused=false;start();}else{userPaused=true;video.pause();}});
  video.addEventListener('error',()=>{video.classList.remove('is-playing');update();});
  if(!still&&!reducedMotion.matches&&!navigator.connection?.saveData){if(lazy){const observer=new IntersectionObserver(entries=>{if(!video.isConnected){observer.disconnect();return;}if(entries[0].isIntersecting){if(!userPaused&&!reducedMotion.matches)start();}else video.pause();},{threshold:.25});observer.observe(video);videoObservers.push(observer);}else start();}else update();
}
function updateHeader(){document.querySelector('#header')?.classList.toggle('scrolled',window.scrollY>40);}
window.addEventListener('scroll',updateHeader,{passive:true});
document.addEventListener('click',e=>{if(!e.target.closest('.language-picker')&&!e.target.closest('[data-language-open]')){document.querySelector('#language-menu').hidden=true;document.querySelector('#language-toggle').setAttribute('aria-expanded','false');}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const target=!document.querySelector('#language-menu').hidden?'#language-toggle':!document.querySelector('#mobile-menu').hidden?'#mobile-toggle':null;closeMenus();if(target)document.querySelector(target).focus();}});
window.addEventListener('popstate',()=>{const next=resolveRoute(location.pathname),nextLocale=resolveLocale(new URLSearchParams(location.search).get('lang')||next.defaultLocale||locale);if(next.path===route.path&&nextLocale===locale&&location.search===document.body.dataset.viewSearch)return;route=next;locale=nextLocale;category=route.category||0;render(true);});
document.addEventListener('click',event=>{const a=event.target.closest('a[href]');if(!a||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||a.target||a.hasAttribute('download'))return;const raw=a.getAttribute('href');if(raw.startsWith('#'))return;const url=new URL(a.href,location.href);if(url.origin!==location.origin||!['http:','https:'].includes(url.protocol))return;event.preventDefault();history.pushState(null,'',url);route=resolveRoute(url.pathname);locale=resolveLocale(url.searchParams.get('lang')||locale);category=route.category||0;document.body.classList.remove('dialog-open');render(true);document.querySelector('#main').setAttribute('tabindex','-1');document.querySelector('#main').focus({preventScroll:true});});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)document.querySelectorAll('video').forEach(v=>v.pause());});
render();
