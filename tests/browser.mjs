import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { allRoutes, resolveRoute } from '../src/routes.js';

const base=process.env.QA_BASE_URL||'http://127.0.0.1:4191';
const folder='qa/full-site';fs.mkdirSync(folder,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();
const errors=[],failures=[],checks=[];
const testedAt=new Date().toISOString();
page.on('pageerror',e=>errors.push(e.message));
const widths=[320,390,768,1024,1440,1920];
async function ready(){await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));});}
async function open(path,locale='en'){await page.goto(`${base}${path}?still=1&lang=${locale}`,{waitUntil:'networkidle'});await ready();}
try{
 for(const locale of ['en','zh-CN','zh-TW']){
  for(const path of allRoutes){
   await page.setViewportSize({width:1440,height:1000});await open(path,locale);
   const missing=await page.locator('img').evaluateAll(images=>images.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));
   if(missing.length)failures.push({path,locale,missing});
   assert.equal(await page.locator('h1').count(),1,`${path} heading`);
   const hrefs=await page.locator('a[href]').evaluateAll(links=>links.map(a=>a.getAttribute('href')).filter(h=>h.startsWith('/')&&!h.startsWith('//')));
   for(const href of hrefs){const u=new URL(href,base);assert.notEqual(resolveRoute(u.pathname).type,'not-found',`${path} broken route ${href}`);}
   for(const width of widths){
    await page.setViewportSize({width,height:900});await page.evaluate(()=>scrollTo(0,0));
    const layout=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('h1,h2,h3,p,nav,button,form,input,select,textarea,.container,.service-topic,.audience-card,.insight-card')].filter(el=>{const r=el.getBoundingClientRect();const c=getComputedStyle(el);return c.display!=='none'&&r.width>0&&(r.right>innerWidth+1||r.left< -1);}).map(el=>({tag:el.tagName,class:el.className,text:el.textContent.slice(0,60)}))}));
    if(layout.scroll>width+1||layout.overflow.length)failures.push({path,locale,viewport:width,...layout});
   }
   if(locale==='en'&&['/about','/services','/pricing','/insights','/services/individuals','/services/compliance','/insights/xero-sign','/insights/videos/cloud-accounting','/contact','/privacy','/'].includes(path)){
    const name=path==='/'?'home':path.slice(1).replaceAll('/','-');
    await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:`${folder}/${name}-desktop.png`,fullPage:true});
    await page.setViewportSize({width:390,height:844});await page.screenshot({path:`${folder}/${name}-mobile.png`,fullPage:true});
   }
   checks.push({path,locale,widths});
  }
  console.log(`Checked ${allRoutes.length} routes × ${widths.length} widths in ${locale}`);
 }
 // Desktop navigation, local links, history and pricing keyboard operation.
 await page.setViewportSize({width:1440,height:1000});await open('/');
 await page.locator('.desktop-nav a').filter({hasText:/^About$/}).click();await page.waitForURL('**/about?lang=en');
 await page.goBack();assert.equal(new URL(page.url()).pathname,'/');
 await open('/pricing');await page.locator('#tab-0').focus();await page.keyboard.press('ArrowRight');
 assert.equal(await page.locator('#tab-1').getAttribute('aria-selected'),'true');assert.match(await page.locator('#price-panel').innerText(),/Business tax/);
 assert.equal(new URL(page.url()).pathname,'/pricing/businesses');
 await page.locator('#quote').click();assert.equal(await page.locator('[name=service]').inputValue(),'1');
 await open('/services');await page.locator('#expertise-tab-0').focus();await page.keyboard.press('ArrowDown');
 assert.equal(await page.locator('#expertise-panel-1').isVisible(),true);
 // Search, combined filters and markup entered as a literal search query.
 await open('/insights');await page.locator('#article-search').fill('Xero');assert.equal(await page.locator('#article-results .insight-card').count(),1);
 await page.locator('[data-filter=tax]').click();assert.equal(await page.locator('.no-results').count(),1);
 await page.locator('[data-clear-filters]').click();assert.equal(await page.locator('.featured-article').count(),1);
 await page.locator('#article-search').fill('<script>');assert.equal(await page.locator('.no-results').count(),1);
 // Search survives same-route navigation and browser history, including hash jumps.
 await open('/insights');await page.locator('#article-search').fill('Xero');
 await page.locator('.desktop-nav a').filter({hasText:/^Insights$/}).click();
 assert.equal(await page.locator('#article-search').inputValue(),'');
 await page.goBack();assert.equal(await page.locator('#article-search').inputValue(),'Xero');
 assert.equal(await page.locator('#article-results .insight-card').count(),1);
 await page.locator('.header-contact').click();await page.goBack();
 assert.equal(await page.locator('#article-search').inputValue(),'Xero');
 for(const path of ['/pricing/smsf','/services/smsf']){
  await open(path);await page.locator('.inner-hero .button').click();
  assert.equal(await page.locator('[name=service]').inputValue(),'2',path+' hero enquiry');
 }
 await page.goto(base+'/adelaide-chinese-accountant-and-tax-agent-smsf-companyregistration/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('html').getAttribute('lang'),'zh-CN');
 await page.locator('.desktop-nav a').nth(1).click();await page.locator('#language-toggle').click();await page.locator('[data-language=en]').click();await page.goBack();assert.equal(await page.locator('html').getAttribute('lang'),'zh-CN');
 await page.goto(base+'/adelaide-chinese-accountant-and-tax-agent-smsf-companyregistration/?lang=en',{waitUntil:'networkidle'});
 assert.equal(await page.locator('html').getAttribute('lang'),'en-AU');
 // FAQ is accessible and expands the matching answer.
 await open('/pricing');const faq=page.locator('.faq-list details').nth(1);await faq.locator('summary').click();assert.equal(await faq.getAttribute('open'),'');
 // Language switch preserves a partially completed form; only supported languages are offered.
 await open('/contact');await page.locator('[name=firstName]').fill('Alex');await page.locator('[name=message]').fill('Hello 你好 & enquiry');
 await page.locator('#language-toggle').click();assert.equal(await page.locator('[data-language]').count(),3);await page.locator('[data-language="zh-TW"]').click();
 assert.equal(await page.locator('[name=firstName]').inputValue(),'Alex');assert.equal(await page.locator('[name=message]').inputValue(),'Hello 你好 & enquiry');assert.equal(await page.locator('html').getAttribute('lang'),'zh-TW');
 await page.locator('#language-toggle').click();await page.locator('[data-language=en]').click();
 await page.locator('#enquiry-form [type=submit]').click();assert.equal(await page.locator('.form-feedback').isVisible(),true);
 await page.locator('[name=lastName]').fill('Client');await page.locator('[name=email]').fill('alex@example.com');await page.locator('[name=privacy]').check();
 await page.evaluate(()=>document.addEventListener('click',e=>{const a=e.target.closest('a[href^="mailto:"]');if(a){e.preventDefault();window.__draft=a.href;}},true));
 await page.locator('#enquiry-form [type=submit]').click();assert.match(await page.evaluate(()=>window.__draft),/^mailto:admin@bexceed\.com\.au\?/);assert.match(await page.locator('.form-feedback').innerText(),/draft is ready/);
 // The third-party player is absent before a user action. Block external transport for a deterministic offline-capable player test.
 await open('/insights/videos/economy');assert.equal(await page.locator('iframe').count(),0);
 await page.route('https://www.youtube-nocookie.com/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<html><body>Player transport stub for QA only</body></html>'}));
 await page.locator('[data-play-youtube]').first().click();assert.match(await page.locator('iframe').getAttribute('src'),/youtube-nocookie\.com\/embed\/22yAoHE7at0/);
 const ratio=await page.locator('.video-frame').first().evaluate(el=>{const r=el.getBoundingClientRect();return r.width/r.height;});assert.ok(Math.abs(ratio-16/9)<.02);
 await page.unroute('https://www.youtube-nocookie.com/**');
 // Mobile menu, tab states, genuine not-found view, reduced motion and legacy locale fallback.
 await page.setViewportSize({width:320,height:800});await open('/about');await page.locator('#mobile-toggle').click();assert.equal(await page.locator('#mobile-menu').isVisible(),true);await page.keyboard.press('Escape');assert.equal(await page.locator('#mobile-menu').isVisible(),false);
 await page.goto(base+'/missing-page?lang=en',{waitUntil:'networkidle'});assert.match(await page.locator('h1').innerText(),/couldn’t find/);
 await open('/','vi');assert.equal(await page.locator('html').getAttribute('lang'),'en-AU');assert.equal(await page.locator('#hero-video').getAttribute('src'),null);
 // Adjacent main surfaces differ. The full-bleed contact has an intentional split surface.
 for(const path of ['/about','/services','/pricing','/insights','/services/compliance','/insights/xero-sign','/insights/videos','/privacy']){
  await open(path);const surfaces=await page.locator('#main > section').evaluateAll(sections=>sections.filter(s=>!s.classList.contains('inner-hero')).map(s=>({class:s.className,color:getComputedStyle(s).backgroundColor})));
  for(let i=1;i<surfaces.length;i++)if(surfaces[i].color===surfaces[i-1].color)failures.push({path,adjacentSurfaces:[surfaces[i-1],surfaces[i]]});
 }
 assert.deepEqual(errors,[],'browser page errors');
 fs.writeFileSync(`${folder}/results.json`,JSON.stringify({testedAt,base,checks,interactions:'passed',errors,failures},null,2));
 console.log(JSON.stringify({routeCount:allRoutes.length,layoutChecks:checks.length*widths.length,failures,errors},null,2));
 assert.deepEqual(failures,[],'responsive/media/surface failures');
}finally{await browser.close();}
