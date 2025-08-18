// lib/repos/blog.ts
import { supabase } from './supabase';
import { BASE_URL } from '../config';
import type { SitemapEntry } from '../sitemap';
import { isoDate } from '../sitemap';

type BlogPost = {
  id: string;
  slug: string;
  updated_at?: string | null;
  published_at?: string | null;
  status?: 'draft'|'published';
};

export async function getBlogSitemapEntries(): Promise<SitemapEntry[]> {
  // TODO: adjust table/column names as per your DB
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, updated_at, published_at, status')
    .eq('status', 'published')
    .limit(5000);

  if (error || !data) return [];

  return data.map((post: BlogPost) => ({
    loc: `${BASE_URL}/blog/${post.slug}`,
    lastmod: isoDate(new Date(post.updated_at || post.published_at || new Date())),
    changefreq: 'weekly',
    priority: 0.6,
  }));
}
