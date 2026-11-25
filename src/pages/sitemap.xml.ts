import type { APIRoute } from 'astro';
import { indexedCategories, indexedTools, primarySite } from '../data/seo';
export const GET: APIRoute = () => {
 const site = import.meta.env.PUBLIC_SITE_URL || primarySite;
 const paths = ['/', '/herramientas/', ...indexedCategories.map(slug => `/categorias/${slug}/`), ...indexedTools.map(slug => `/herramientas/${slug}/`)];
 const escapeXml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
 const urls = paths.map(path => `<url><loc>${escapeXml(new URL(path, site).href)}</loc></url>`).join('');
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
