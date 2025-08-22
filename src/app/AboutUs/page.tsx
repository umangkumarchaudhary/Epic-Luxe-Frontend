import { Metadata } from 'next'
import AboutUsClient from './AboutUsClient'

export const metadata: Metadata = {
  title: 'About RAAM Group | Epic Luxe & Epic Reassured | Luxury & Certified Pre-Owned Cars in Hyderabad, Chennai, Pune',
  description:
    'RAAM Group is one of South India’s fastest-growing automotive groups with 12+ years of excellence, 2000+ professionals, and ₹2000+ Cr revenue. Discover Epic Luxe — premium pre-owned luxury cars, and Epic Reassured — certified used cars you can trust. With dealerships in Hyderabad, Chennai, and Pune, RAAM Group is also an authorized dealer for Mercedes-Benz, Toyota, Honda, MG, and Ather Energy. Experience unmatched trust, quality, and value in every drive.',
  keywords: [
    'RAAM Group',
    'Epic Luxe',
    'Epic Reassured',
    'luxury pre-owned cars Hyderabad',
    'used luxury cars Chennai',
    'certified pre-owned cars Pune',
    'buy used Mercedes Hyderabad',
    'Toyota used cars Chennai',
    'Honda used cars Pune',
    'MG pre-owned cars India',
    'Ather dealership Hyderabad',
    'best used car dealers South India',
    'luxury car showroom Hyderabad',
    'buy used BMW Hyderabad',
    'used Audi Chennai',
    'certified car dealers Pune',
    'trusted car dealers India',
  ],
  authors: [{ name: 'RAAM Group' }],
  creator: 'RAAM Group',
  publisher: 'RAAM Group',
  metadataBase: new URL('https://raamgroup.com'),
  alternates: {
    canonical: '/aboutus',
  },
  openGraph: {
    title: 'About RAAM Group | Automotive Excellence in South India',
    description:
      'Discover RAAM Group: 12+ years, 2000+ professionals, ₹2000+ Cr revenue. Through Epic Luxe (luxury pre-owned) and Epic Reassured (certified pre-owned), we serve Hyderabad, Chennai, and Pune. Authorized dealers for Mercedes, Toyota, Honda, MG, and Ather Energy.',
    url: '/aboutus',
    siteName: 'RAAM Group',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-about-raam-group.jpg',
        width: 1200,
        height: 630,
        alt: 'RAAM Group - Epic Luxe & Epic Reassured',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About RAAM Group | Epic Luxe & Epic Reassured',
    description:
      'RAAM Group — South India’s trusted automotive powerhouse. Luxury and certified pre-owned cars through Epic Luxe & Epic Reassured. Serving Hyderabad, Chennai, Pune.',
    images: ['/twitter-about-raam-group.jpg'],
    creator: '@RAAMGroup',
    site: '@RAAMGroup',
  },
}


export default function AboutUsPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'AutomotiveBusiness'],
    name: 'RAAM Group',
    alternateName: ['Epic Luxe', 'Epic Reassured'],
    description: 'Leading automotive group in India with 12+ years of experience, 2000+ professionals, and ₹2000+ Cr revenue. Specializing in luxury and certified pre-owned vehicles.',
    url: 'https://raamgroup.com',
    logo: 'https://raamgroup.com/logo.png',
    foundingDate: '2012',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 2000,
      maxValue: 5000
    },
    revenue: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: 20000000000
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'Telangana',
        containedInPlace: {
          '@type': 'Country',
          name: 'India'
        }
      },
      {
        '@type': 'State',
        name: 'Andhra Pradesh',
        containedInPlace: {
          '@type': 'Country',
          name: 'India'
        }
      },
      {
        '@type': 'State',
        name: 'Tamil Nadu',
        containedInPlace: {
          '@type': 'Country',
          name: 'India'
        }
      },
      {
        '@type': 'State',
        name: 'Maharashtra',
        containedInPlace: {
          '@type': 'Country',
          name: 'India'
        }
      }
    ],
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN'
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN'
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Pune',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN'
      }
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-XXX-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi', 'Telugu', 'Tamil']
    },
    sameAs: [
      'https://facebook.com/raamgroup',
      'https://instagram.com/raamgroup',
      'https://linkedin.com/company/raamgroup',
      'https://twitter.com/raamgroup'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Automotive Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Luxury Pre-Owned Cars',
            category: 'Epic Luxe'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Certified Pre-Owned Cars',
            category: 'Epic Reassured'
          }
        }
      ]
    },
    member: [
      {
        '@type': 'Organization',
        name: 'Mercedes-Benz India',
        memberOf: 'Authorized Dealer Network'
      },
      {
        '@type': 'Organization',
        name: 'Toyota Motor Corporation',
        memberOf: 'Authorized Dealer Network'
      },
      {
        '@type': 'Organization',
        name: 'Honda Motor Company',
        memberOf: 'Authorized Dealer Network'
      },
      {
        '@type': 'Organization',
        name: 'MG Motor India',
        memberOf: 'Authorized Dealer Network'
      },
      {
        '@type': 'Organization',
        name: 'Ather Energy',
        memberOf: 'Authorized Dealer Network'
      }
    ],
    award: 'Top 10 Automotive Dealer in India',
    knowsAbout: [
      'Luxury Automobiles',
      'Pre-owned Cars',
      'Automotive Finance',
      'Vehicle Insurance',
      'Car Accessories',
      'Vehicle Service',
      'Automotive Parts'
    ]
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://raamgroup.com/#localbusiness',
    name: 'RAAM Group',
    image: 'https://raamgroup.com/storefront.jpg',
    telephone: '+91-XXX-XXX-XXXX',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'RAAM Group Head Office',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 17.3850,
      longitude: 78.4867
    },
    url: 'https://raamgroup.com',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        opens: '09:00',
        closes: '19:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '18:00'
      }
    ],
    priceRange: '₹₹₹',
    servesCuisine: 'Automotive',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <AboutUsClient />
    </>
  )
}