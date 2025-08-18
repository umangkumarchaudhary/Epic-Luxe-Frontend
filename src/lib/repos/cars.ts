// lib/repos/cars.ts
import { supabase } from './supabase';
import { BASE_URL } from '../config';
import type { SitemapEntry } from '../sitemap';
import { isoDate } from '../sitemap';

type Car = {
  id: string;
  make: string;
  model: string;
  variant: string | null;
  year: number | null;
  location: string | null; // city
  slug?: string | null;    // if you store SEO slug per car
  updated_at?: string | null;
  // status?: 'available'|'booked'|'sold'  // add when you have it
};

export async function getCarSitemapEntries(): Promise<SitemapEntry[]> {
  // TODO: adjust table/column names as per your DB
  const { data, error } = await supabase
    .from('cars')
    .select('id, make, model, variant, year, location, slug, updated_at')
    .limit(5000); // safety cap

  if (error || !data) return [];

  return data.map((car: Car) => {
    const city = (car.location || '').toLowerCase().replace(/\s+/g,'-');
    // Prefer a nice SEO slug like: make-model-variant-year-city
    const slug = car.slug
      || [car.make, car.model, car.variant, car.year, city]
          .filter(Boolean)
          .map(s => String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''))
          .join('-');

    const loc = `${BASE_URL}/cars/${slug}`;
    const lastmod = isoDate(car.updated_at ? new Date(car.updated_at) : new Date());

    return {
      loc,
      lastmod,
      changefreq: 'daily',
      priority: 0.8,
    };
  });
}
