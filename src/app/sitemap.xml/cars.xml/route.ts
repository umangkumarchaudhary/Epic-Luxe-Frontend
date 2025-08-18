// app/sitemaps/cars.xml/route.ts
import { NextResponse } from 'next/server';
import { buildSitemapXML } from '@/lib/sitemap';
import { getCarSitemapEntries } from '@/lib/repos/cars';

export async function GET() {
  const entries = await getCarSitemapEntries(); // Supabase-driven
  const xml = buildSitemapXML(entries);
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' }});
}
