import fs from 'node:fs/promises';
import { allRoutes } from '../src/routes.js';
const origin='https://bexceed-new-website.vercel.app';
const urls=allRoutes.map(route=>`  <url><loc>${origin}${route}</loc>${['en','zh-CN','zh-TW'].map(lang=>`<xhtml:link rel="alternate" hreflang="${lang==='en'?'en-AU':lang}" href="${origin}${route}?lang=${lang}"/>`).join('')}</url>`);
await fs.writeFile('public/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
await fs.writeFile('public/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
