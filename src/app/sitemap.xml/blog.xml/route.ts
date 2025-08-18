// app/sitemaps/blog.xml/route.ts
import { NextResponse } from 'next/server';
import { buildSitemapXML } from '@/lib/sitemap';
import { getBlogSitemapEntries } from '@/lib/repos/blog';

export async function GET() {
  const entries = await getBlogSitemapEntries(); // Supabase-driven
  const xml = buildSitemapXML(entries);
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' }});
}
