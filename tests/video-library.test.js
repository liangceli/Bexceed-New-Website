import {test} from 'node:test';
import assert from 'node:assert/strict';
import {formatResourceDate,renderVideoCards} from '../src/video-library.js';
import {resolveRoute} from '../src/routes.js';
import {pageContext,renderInner} from '../src/pages.js';
import {content} from '../src/content.js';

test('resource dates preserve month precision and full archive dates',()=>{
 assert.equal(formatResourceDate('2026-04','en'),'Apr 2026');
 assert.equal(formatResourceDate('2026-04-09','en'),'9 Apr 2026');
 assert.equal(formatResourceDate(null,'en'),'');
 assert.match(formatResourceDate('2026-04','zh-TW'),/2026/);
 assert.doesNotMatch(formatResourceDate('2026-04','zh-TW'),/日/);
});

test('retirement category resolves and uses the official English video',()=>{
 assert.equal(resolveRoute('/insights/videos/superannuation').type,'videos');
 const ctx=pageContext('en');
 const html=renderInner(resolveRoute('/insights/videos/superannuation'),{locale:'en',t:content.en});
 assert.match(html,/data-play-youtube="pz3XvxgcC4k"/);
 assert.match(html,/data-play-youtube="z_u-fx6dMuc"/);
 assert.doesNotMatch(html,/BlmXZ-zRSxw|data-play-youtube="aDvwXeFR5qo"/);
 assert.equal(ctx.videos.filter(v=>v.collection==='client-2026-11').length,7);
});

test('new cards expose source and enquiry, defer player loading, escape text',()=>{
 const {u,topics}=pageContext('en');
 const html=renderVideoCards([{id:'aDvwXeFR5qo',topic:'cloud-accounting',title:'A < B',publisher:'Xero',date:'2026-04',note:'A & B',description:'More detail',cta:{label:'Ask us',service:1},collection:'client-2026-11'}],{u,topics,locale:'en'});
 assert.match(html,/A &lt; B/);
 assert.match(html,/A &amp; B/);
 assert.match(html,/<details/);
 assert.match(html,/data-interest="1"/);
 assert.match(html,/href="https:\/\/www.youtube.com\/watch\?v=aDvwXeFR5qo"/);
 assert.doesNotMatch(html,/<iframe/);
});

test('ABC resource opens the publisher video without a known failing embed',()=>{
 const ctx=pageContext('en');
 const html=renderVideoCards(ctx.videos.filter(v=>v.id==='uKxBtPWywCw'),{...ctx,locale:'en'});
 assert.match(html,/href="https:\/\/www.youtube.com\/watch\?v=uKxBtPWywCw"/);
 assert.doesNotMatch(html,/data-play-youtube|<iframe/);
});
