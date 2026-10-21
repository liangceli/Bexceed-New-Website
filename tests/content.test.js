import {test} from 'node:test';
import assert from 'node:assert/strict';
import {content,languages,resolveLocale} from '../src/content.js';
test('unknown and inherited locale names fall back safely',()=>{
  for(const value of ['constructor','__proto__','toString','unknown','',null,undefined])assert.equal(resolveLocale(value),'en');
  for(const value of Object.keys(languages))assert.equal(resolveLocale(value),value);
});
test('all supported languages cover the entire homepage',()=>{
  const shape=v=>Array.isArray(v)?v.map(shape):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,shape(v[k])])):typeof v;
  for(const locale of Object.keys(languages)){
    assert.deepEqual(shape(content[locale]),shape(content.en),locale);
    assert.equal(content[locale].prices.length,3);
    assert.equal(content[locale].benefits.length,4);
    assert.equal(content[locale].quotes.length,3);
    for(const group of content[locale].prices)assert.equal(group.length,3);
  }
});
test('all locale text has content and pricing does not invent amounts',()=>{
  const strings=v=>typeof v==='string'?[v]:Object.values(v).flatMap(strings);
  for(const [locale,t] of Object.entries(content)){
    assert.ok(strings(t).every(s=>s.trim().length>0),locale);
    assert.equal(/\$\s*\d/.test(strings(t.prices).join(' ')),false,locale);
  }
});
