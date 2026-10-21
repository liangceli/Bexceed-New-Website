import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createEnquiryMailto,enquiryRecipient} from '../src/enquiry.js';
test('draft keeps recipient fixed and preserves multilingual content and punctuation',()=>{
  const url=new URL(createEnquiryMailto({firstName:'  梁 ',lastName:'李',email:'qa+check@example.com',phone:'+61 400 000 000',message:'税务 & BAS?\nNguyễn <test> #1'},'Business & tax','简体中文'));
  assert.equal(url.pathname,enquiryRecipient);
  assert.equal(url.searchParams.get('subject'),'Website enquiry — Bexceed');
  const body=url.searchParams.get('body');
  assert.ok(body.includes('Name: 梁 李\r\n'));
  assert.ok(body.includes('Email: qa+check@example.com'));
  assert.ok(body.includes('税务 & BAS?\nNguyễn <test> #1'));
  assert.deepEqual([...url.searchParams.keys()],['subject','body']);
});
test('optional fields have clean fallbacks and cannot add mail headers',()=>{
  const url=new URL(createEnquiryMailto({firstName:'Test',lastName:'Person',email:'test@example.com',message:'&bcc=other@example.com'},'', 'English'));
  assert.equal(url.searchParams.has('bcc'),false);
  assert.ok(url.searchParams.get('body').includes('Phone: -\r\nService: -'));
});
