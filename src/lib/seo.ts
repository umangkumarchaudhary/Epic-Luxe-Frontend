// lib/seo.ts
export const siteUrl = process.env.NODE_ENV === 'production' 
  ? 'https://epiccars.raamgroup.com' 
  : 'http://localhost:3000';

export const siteName = 'Epic Cars';
export const siteDescription = 'Luxury & Certified Pre-Owned Cars - Epic Luxe & Epic Reassured by Raam Group';

/**
 * Build SEO-optimized page title
 * @param title - Page specific title
 * @param includePrefix - Whether to include site name prefix
 * @returns Formatted title string
 */
export function buildTitle(title: string, includePrefix: boolean = true): string {
  if (!includePrefix) return title;
  return `${title} | ${siteName}`;
}

/**
 * Build SEO-optimized meta description
 * @param description - Page specific description
 * @param maxLength - Maximum character length (default: 160)
 * @returns Truncated description if needed
 */
export function buildDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) return description;
  
  // Truncate at word boundary
  const truncated = description.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return lastSpaceIndex > 0 
    ? `${truncated.substring(0, lastSpaceIndex)}...`
    : `${truncated.substring(0, maxLength - 3)}...`;
}

/**
 * Generate Open Graph image URL
 * @param title - Image title
 * @param subtitle - Optional subtitle
 * @returns Complete OG image URL
 */
export function buildOgImageUrl(title: string, subtitle?: string): string {
  const params = new URLSearchParams({
    title: title,
    ...(subtitle && { subtitle })
  });
  
  return `${siteUrl}/api/og?${params.toString()}`;
}

/**
 * Build canonical URL
 * @param path - Page path (with leading slash)
 * @returns Complete canonical URL
 */
export function buildCanonicalUrl(path: string = '/'): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  // Remove trailing slash except for root
  const cleanPath = normalizedPath === '/' ? '/' : normalizedPath.replace(/\/$/, '');
  
  return `${siteUrl}${cleanPath}`;
}