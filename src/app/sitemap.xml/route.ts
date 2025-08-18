// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';
import { buildSitemapIndexXML, isoDate } from '@/lib/sitemap';
import { BASE_URL } from '@/lib/config';

export async function GET() {
  const today = isoDate();

  const xml = buildSitemapIndexXML([
    { loc: `${BASE_URL}/sitemaps/static.xml`,    lastmod: today },
    { loc: `${BASE_URL}/sitemaps/cars.xml`,      lastmod: today },
    { loc: `${BASE_URL}/sitemaps/locations.xml`, lastmod: today },
    { loc: `${BASE_URL}/sitemaps/blog.xml`,      lastmod: today },
  ]);

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
