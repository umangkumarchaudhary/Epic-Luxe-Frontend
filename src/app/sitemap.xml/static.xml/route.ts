// app/sitemaps/static.xml/route.ts
import { NextResponse } from 'next/server';
import { BASE_URL, PRIORITY_PAGES } from '@/lib/config';
import { buildSitemapXML, isoDate } from '@/lib/sitemap';

export async function GET() {
  const today = isoDate();

  const entries = PRIORITY_PAGES.map(p => ({
    loc: `${BASE_URL}${p.path}`,
    lastmod: today,
    changefreq: p.changefreq || 'weekly',
    priority: typeof p.priority === 'number' ? p.priority : 0.7,
  }));

  const xml = buildSitemapXML(entries);
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' }});
}
