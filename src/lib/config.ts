// lib/config.ts
export const BASE_URL = 'https://epic-cars.in';

export const PRIORITY_PAGES: Array<{
  path: string;
  changefreq?: 'daily'|'weekly'|'monthly';
  priority?: number;
}> = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/luxe', changefreq: 'daily', priority: 0.9 },
  { path: '/reassured', changefreq: 'daily', priority: 0.9 },

  // Your priority pages
  { path: '/luxe/buy-luxury-used-cars', changefreq: 'daily', priority: 0.95 },
  { path: '/reassured/buy-used-cars', changefreq: 'daily', priority: 0.95 },
  { path: '/reassured/services', changefreq: 'weekly', priority: 0.9 },
  { path: '/luxe/services', changefreq: 'weekly', priority: 0.9 },
  { path: '/reassured/services/sell-your-car', changefreq: 'weekly', priority: 0.9 },
  { path: '/luxe/services/sell-your-car', changefreq: 'weekly', priority: 0.9 },

  // Common business pages
  { path: '/about', changefreq: 'monthly', priority: 0.8 },
  { path: '/contact', changefreq: 'monthly', priority: 0.8 },
  { path: '/sell-car', changefreq: 'weekly', priority: 0.9 },
  { path: '/finance', changefreq: 'monthly', priority: 0.7 },
  { path: '/reviews', changefreq: 'weekly', priority: 0.7 },
];

export const CITIES = [
  'hyderabad',
  'chennai',
  'pune',
  'nashik',
  'visakhapatnam',
  'vizag',
] as const;

export type City = typeof CITIES[number];
