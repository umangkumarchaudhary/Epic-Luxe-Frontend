// app/sitemaps/locations.xml/route.ts
import { NextResponse } from 'next/server';
import { BASE_URL, CITIES } from '@/lib/config';
import { buildSitemapXML, isoDate } from '@/lib/sitemap';

export async function GET() {
  const today = isoDate();

  const entries = CITIES.flatMap(city => ([
    {
      loc: `${BASE_URL}/locations/${city}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.8,
    },
    {
      loc: `${BASE_URL}/used-cars/${city}`,
      lastmod: today,
      changefreq: 'daily' as const,
      priority: 0.85,
    },
    {
      loc: `${BASE_URL}/luxury-cars/${city}`,
      lastmod: today,
      changefreq: 'daily' as const,
      priority: 0.8,
    },
    {
      loc: `${BASE_URL}/pre-owned-cars/${city}`,
      lastmod: today,
      changefreq: 'daily' as const,
      priority: 0.8,
    },
  ]));

  const xml = buildSitemapXML(entries);
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' }});
}
