// components/jsonld/BlogPostingJsonLd.tsx
import React from 'react';

type Props = {
  headline: string;
  description?: string;
  image?: string | string[];
  authorName: string;
  datePublished: string;     // ISO
  dateModified?: string;     // ISO
  url: string;
  publisherName?: string;
  publisherLogo?: string;
};

export default function BlogPostingJsonLd(props: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.headline,
    description: props.description,
    image: props.image ? (Array.isArray(props.image) ? props.image : [props.image]) : undefined,
    author: { '@type': 'Person', name: props.authorName },
    datePublished: props.datePublished,
    dateModified: props.dateModified || props.datePublished,
    mainEntityOfPage: props.url,
    url: props.url,
    publisher: props.publisherName ? {
      '@type': 'Organization',
      name: props.publisherName,
      logo: props.publisherLogo ? {
        '@type': 'ImageObject',
        url: props.publisherLogo,
      } : undefined
    } : undefined
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
