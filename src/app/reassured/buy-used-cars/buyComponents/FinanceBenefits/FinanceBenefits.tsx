import React from 'react';
import { Metadata } from 'next';
import FinanceBenefitsClient from './FinanceBenefitsClient';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Finance & Protection Benefits - Mercedes-Benz Luxury Financing',
  description: 'Explore flexible financing options and comprehensive insurance coverage for your Mercedes-Benz. Easy EMI plans and instant protection from day one.',
  keywords: 'Mercedes-Benz finance, luxury car EMI, car insurance, vehicle protection, flexible financing, low interest rates',
  openGraph: {
    title: 'Mercedes-Benz Finance & Protection Benefits',
    description: 'Discover seamless financing and comprehensive protection for your luxury Mercedes-Benz vehicle investment.',
    type: 'website',
    images: [
      {
        url: '/images/mercedes-finance-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Mercedes-Benz Finance & Protection Benefits'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercedes-Benz Finance & Protection Benefits',
    description: 'Flexible financing and comprehensive protection for your Mercedes-Benz investment.',
    images: ['/images/mercedes-finance-twitter.jpg']
  },
  alternates: {
    canonical: '/finance-benefits'
  }
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mercedes-Benz Finance & Protection Services",
  "description": "Comprehensive financing and insurance solutions for Mercedes-Benz luxury vehicles",
  "provider": {
    "@type": "Organization",
    "name": "Mercedes-Benz"
  },
  "serviceType": "Automotive Finance",
  "offers": [
    {
      "@type": "Offer",
      "name": "Easy Finance & EMI Options",
      "description": "Flexible monthly payments with low interest rates tailored for your lifestyle"
    },
    {
      "@type": "Offer", 
      "name": "Instant Insurance Coverage",
      "description": "Comprehensive luxury insurance plans protecting your vehicle from day one"
    }
  ]
};

interface FinanceBenefitsProps {
  className?: string;
}

const FinanceBenefits: React.FC<FinanceBenefitsProps> = ({ className }) => {
  return (
    <>
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Main Content */}
      <section 
        className={className}
        aria-labelledby="finance-benefits-heading"
        role="region"
      >
        <FinanceBenefitsClient />
      </section>
    </>
  );
};

export default FinanceBenefits;