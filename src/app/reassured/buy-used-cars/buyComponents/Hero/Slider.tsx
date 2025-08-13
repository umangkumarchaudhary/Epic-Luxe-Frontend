import React from 'react';
import { Metadata } from 'next';
import EpicHeroSliderClient from './SliderClient';
import styles from './EpicHeroSlider.module.css';

// Advanced SEO Metadata for Used Cars
export const metadata: Metadata = {
  title: 'EPIC Pre-Owned Luxury Cars | Certified Used Mercedes-Benz & Premium Vehicles',
  description: 'Discover meticulously curated pre-owned luxury vehicles. Browse certified Mercedes-Benz, BMW, Audi & premium cars with flexible financing, warranties & instant insurance.',
  keywords: [
    'used luxury cars',
    'pre-owned Mercedes-Benz',
    'certified used cars',
    'luxury car dealer',
    'premium automobiles',
    'used BMW',
    'used Audi',
    'car financing',
    'luxury car inventory',
    'quality pre-owned vehicles'
  ].join(', '),
  authors: [{ name: 'EPIC Luxury Motors' }],
  creator: 'EPIC Luxury Motors',
  publisher: 'EPIC Luxury Motors',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': 160,
    'max-video-preview': 30,
  },
  openGraph: {
    title: 'EPIC Pre-Owned Luxury Cars | Premium Used Vehicle Collection',
    description: 'Explore our handpicked collection of certified pre-owned luxury vehicles. Mercedes-Benz, BMW, Audi & more with flexible financing options.',
    url: 'https://epicluxurymotors.com',
    siteName: 'EPIC Luxury Motors',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/assets/images/og-epic-collection.jpg',
        width: 1200,
        height: 630,
        alt: 'EPIC Collection of Pre-Owned Luxury Vehicles',
        type: 'image/jpeg',
      },
      {
        url: '/assets/images/hero-luxury-cars.jpg',
        width: 1920,
        height: 1080,
        alt: 'Premium Pre-Owned Luxury Car Showroom',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@EPICLuxuryMotors',
    creator: '@EPICLuxuryMotors',
    title: 'EPIC Pre-Owned Luxury Cars | Certified Used Premium Vehicles',
    description: 'Discover meticulously curated pre-owned luxury vehicles with financing, warranties & instant insurance coverage.',
    images: ['/assets/images/twitter-epic-collection.jpg'],
  },
  alternates: {
    canonical: 'https://epicluxurymotors.com',
    languages: {
      'en-US': 'https://epicluxurymotors.com',
      'es-ES': 'https://epicluxurymotors.com/es',
    },
  },
  category: 'Automotive',
  classification: 'Pre-Owned Luxury Vehicle Sales',
  other: {
    'revisit-after': '7 days',
    'distribution': 'global',
    'rating': 'general',
    'coverage': 'worldwide',
    'target': 'all',
    'HandheldFriendly': 'True',
    'MobileOptimized': '320',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'theme-color': '#d4af37',
    'msapplication-TileColor': '#d4af37',
  },
};

// Advanced Structured Data for Used Cars SEO
const generateStructuredData = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://epicluxurymotors.com/#organization",
      "name": "EPIC Luxury Motors",
      "url": "https://epicluxurymotors.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://epicluxurymotors.com/assets/images/epic-logo.png",
        "width": 300,
        "height": 100
      },
      "description": "Premier dealer of certified pre-owned luxury vehicles including Mercedes-Benz, BMW, Audi and premium automobiles.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Luxury Auto Blvd",
        "addressLocality": "Your City",
        "addressRegion": "Your State",
        "postalCode": "12345",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-EPIC-CARS",
        "contactType": "sales",
        "availableLanguage": ["English", "Spanish"]
      },
      "sameAs": [
        "https://facebook.com/epicluxurymotors",
        "https://instagram.com/epicluxurymotors",
        "https://twitter.com/epicluxurymotors"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://epicluxurymotors.com/#website",
      "url": "https://epicluxurymotors.com",
      "name": "EPIC Luxury Motors",
      "description": "Certified pre-owned luxury vehicles with comprehensive warranties and financing options",
      "publisher": {
        "@id": "https://epicluxurymotors.com/#organization"
      },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://epicluxurymotors.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      ]
    },
    {
      "@type": "AutoDealer",
      "@id": "https://epicluxurymotors.com/#autodealer",
      "name": "EPIC Luxury Motors",
      "description": "Certified pre-owned luxury vehicle dealership specializing in Mercedes-Benz, BMW, Audi and premium automobiles",
      "url": "https://epicluxurymotors.com",
      "telephone": "+1-800-EPIC-CARS",
      "priceRange": "$$$",
      "paymentAccepted": ["Cash", "Credit Card", "Financing", "Lease"],
      "currenciesAccepted": "USD",
      "openingHours": [
        "Mo-Fr 09:00-19:00",
        "Sa 09:00-18:00",
        "Su 10:00-17:00"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Luxury Auto Blvd",
        "addressLocality": "Your City",
        "addressRegion": "Your State",
        "postalCode": "12345",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "40.7128",
        "longitude": "-74.0060"
      },
      "makesOffered": [
        "Mercedes-Benz",
        "BMW",
        "Audi",
        "Lexus",
        "Porsche",
        "Jaguar",
        "Land Rover"
      ]
    },
    {
      "@type": "ItemList",
      "@id": "https://epicluxurymotors.com/#vehicle-collection",
      "name": "EPIC Pre-Owned Luxury Vehicle Collection",
      "description": "Curated collection of certified pre-owned luxury vehicles",
      "numberOfItems": 3,
      "itemListElement": [
        {
          "@type": "Product",
          "position": 1,
          "name": "EPIC Collection",
          "description": "Discover pre-owned luxury vehicles, meticulously curated for perfection",
          "category": "Pre-Owned Luxury Vehicles",
          "brand": {
            "@type": "Brand",
            "name": "EPIC Luxury Motors"
          }
        },
        {
          "@type": "Product", 
          "position": 2,
          "name": "Exclusive Luxury Fleet",
          "description": "Elite vehicles that combine unmatched performance with prestigious elegance",
          "category": "Premium Pre-Owned Vehicles",
          "brand": {
            "@type": "Brand",
            "name": "EPIC Luxury Motors"
          }
        },
        {
          "@type": "Product",
          "position": 3,
          "name": "Premium Automobiles",
          "description": "Experience the pinnacle of automotive excellence with our handpicked collection",
          "category": "Certified Pre-Owned Luxury Cars",
          "brand": {
            "@type": "Brand",
            "name": "EPIC Luxury Motors"
          }
        }
      ]
    }
  ]
});

interface EpicHeroSliderProps {
  className?: string;
  priority?: boolean;
}

const EpicHeroSlider: React.FC<EpicHeroSliderProps> = ({ 
  className,
  priority = true 
}) => {
  const structuredData = generateStructuredData();

  return (
    <>
      {/* Critical Resource Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* DNS Prefetch for External Resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(structuredData) 
        }}
        key="structured-data"
      />

      {/* Main Hero Section */}
      <main 
        className={`${styles.epicHeroContainer} ${className || ''}`}
        role="banner"
        aria-label="EPIC Luxury Motors - Pre-Owned Vehicle Collection"
      >
        <EpicHeroSliderClient priority={priority} />
      </main>


    </>
  );
};

export default EpicHeroSlider;