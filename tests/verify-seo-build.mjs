import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { indexedTools, indexedCategories, primarySite } from '../src/data/seo.ts';

const read = path => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const paths = ['/', '/herramientas/', ...indexedCategories.map(x=>`/categorias/${x}/`), ...indexedTools.map(x=>`/herramientas/${x}/`)];
const sitemap = await read('sitemap.xml');
assert.equal((sitemap.match(/<loc>/g) || []).length, paths.length);
for (const path of paths) {
 const url = new URL(path, primarySite).href;
 assert.ok(sitemap.includes(`<loc>${url}</loc>`), `Falta en sitemap: ${path}`);
 const html = await read(`${path.slice(1)}index.html`);
 assert.match(html, /<meta name="robots" content="index, follow"/);
 assert.ok(html.includes(`rel="canonical" href="${url}"`), `Falta canonical: ${path}`);
}
for (const path of ['herramientas/calculadora-irpf/', 'herramientas/sueldo-bruto-a-neto/', 'privacidad/']) {
 const html = await read(`${path}index.html`);
 assert.match(html, /<meta name="robots" content="noindex, follow"/);
 assert.ok(!sitemap.includes(`<loc>${new URL(path, primarySite).href}</loc>`));
}
assert.ok((await read('robots.txt')).includes(`Sitemap: ${primarySite}/sitemap.xml`));
console.log(`SEO verificado: ${paths.length} páginas indexables y páginas incompletas excluidas.`);
