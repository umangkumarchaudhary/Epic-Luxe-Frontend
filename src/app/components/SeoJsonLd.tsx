// components/SeoJsonLd.tsx
import { memo } from 'react';

interface SeoJsonLdProps {
  type: 'organization' | 'website' | 'breadcrumb' | 'article' | 'product' | 'faq';
  data: Record<string, unknown>;
  id?: string;
}


/**
 * SEO JSON-LD structured data component
 * Renders schema.org markup for better search engine understanding
 */
const SeoJsonLd = memo<SeoJsonLdProps>(({ type, data, id }) => {
  // Validate data object
  if (!data || typeof data !== 'object') {
    console.warn('SeoJsonLd: Invalid data provided');
    return null;
  }

  // Ensure @context and @type are present
  const structuredData = {
    '@context': 'https://schema.org',
    ...data,
    ...(data['@type'] ? {} : { '@type': getSchemaType(type) })
  };

  // Generate unique ID for the script tag
  const scriptId = id || `jsonld-${type}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 0)
      }}
    />
  );
});

/**
 * Map component type to Schema.org @type
 */
function getSchemaType(type: SeoJsonLdProps['type']): string {
  const typeMap: Record<SeoJsonLdProps['type'], string> = {
    organization: 'Organization',
    website: 'WebSite',
    breadcrumb: 'BreadcrumbList',
    article: 'Article',
    product: 'Product',
    faq: 'FAQPage'
  };

  return typeMap[type] || 'Thing';
}

SeoJsonLd.displayName = 'SeoJsonLd';

export default SeoJsonLd;