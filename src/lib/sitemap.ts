// lib/sitemap.ts
export interface SitemapEntry {
  loc: string;
  lastmod?: string;            // ISO date (yyyy-mm-dd)
  changefreq?: 'always'|'hourly'|'daily'|'weekly'|'monthly'|'yearly'|'never';
  priority?: number;           // 0.0 - 1.0
}

export function buildSitemapXML(entries: SitemapEntry[]): string {
  const urls = entries.map(e => {
    const lastmod = e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : '';
    const change = e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : '';
    const priority = typeof e.priority === 'number' ? `<priority>${e.priority.toFixed(1)}</priority>` : '';
    return `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    ${lastmod}
    ${change}
    ${priority}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls}
</urlset>`;
}

export function buildSitemapIndexXML(sitemaps: { loc: string; lastmod?: string }[]) {
  const items = sitemaps.map(s => {
    const lastmod = s.lastmod ? `<lastmod>${s.lastmod}</lastmod>` : '';
    return `  <sitemap>
    <loc>${escapeXml(s.loc)}</loc>
    ${lastmod}
  </sitemap>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${items}
</sitemapindex>`;
}

function escapeXml(str: string) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

export const isoDate = (d: Date = new Date()) => d.toISOString().split('T')[0];
