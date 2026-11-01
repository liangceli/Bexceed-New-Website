import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveRoute, routeHref, filterArticles } from '../src/routes.js';
test('direct child paths and old website links resolve to their intended page',()=>{
  assert.equal(resolveRoute('/services/individuals/').id,'individuals');
  assert.equal(resolveRoute('/about-us-2/').path,'/about');
  assert.equal(resolveRoute('/pricing/smsf').category,2);
  assert.equal(resolveRoute('/insights/videos/cloud-accounting').id,'cloud-accounting');
  assert.equal(resolveRoute('/unknown').type,'not-found');
  assert.equal(resolveRoute('/adelaide-chinese-accountant-and-tax-agent-smsf-companyregistration/').defaultLocale,'zh-CN');
});
test('internal URLs preserve supported languages and normalize legacy values',()=>{
  assert.equal(routeHref('/about','zh-CN'),'/about?lang=zh-CN');
  assert.equal(routeHref('/services#support','zh-TW'),'/services?lang=zh-TW#support');
  assert.equal(routeHref('/about','vi'),'/about?lang=en');
});
test('article filtering handles mixed category, Unicode and literal markup safely',()=>{
  const a=[{title:'Xero Sign',description:'电子签署',category:'cloud'},{title:'SMSF',description:'Retirement',category:'smsf'}];
  assert.equal(filterArticles(a,'cloud',' XERO ').length,1);
  assert.equal(filterArticles(a,'all','电子').length,1);
  assert.equal(filterArticles(a,'tax','Xero').length,0);
  assert.equal(filterArticles(a,'all','<script>').length,0);
});
