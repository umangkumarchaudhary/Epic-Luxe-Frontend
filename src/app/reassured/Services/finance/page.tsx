// src/app/reassured/Services/finance/page.tsx
// App Router - Server Component (TypeScript)
import React from 'react';
import Head from 'next/head';
import FinancePageClient from './fianancePageClient'; // Keep original relative path

// ───────────────────────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────────────────────

interface PostalAddress {
  '@type': 'PostalAddress';
  addressRegion: string;
  addressCountry: string;
}

interface OrganizationProvider {
  '@type': 'Organization';
  name: string;
  address: PostalAddress;
}

interface FinancialProductStructuredData {
  '@context': 'https://schema.org';
  '@type': 'FinancialProduct';
  name: string;
  description: string;
  provider: OrganizationProvider;
  interestRate: string;
  feesAndCommissionsSpecification: string;
}

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  structuredData: FinancialProductStructuredData;
}

interface LocationState {
  name: string;
  cities: string[];
  localKeywords: string[];
}

interface LocationData {
  states: LocationState[];
}

interface FinancePageProps {
  seoData: SEOData;
  locationData: LocationData;
  popularBrands: string[];
  serverTimestamp: string;
}

// ───────────────────────────────────────────────────────────────────────────────
// Static constants (fully typed)
// ───────────────────────────────────────────────────────────────────────────────

const seoData: SEOData = {
  title:
    'Pre-Owned Car Finance in South India | Best Used Car Loans Chennai, Bangalore, Hyderabad',
  description:
    'Get instant pre-owned car finance in South India. Low interest rates starting 7.99%. Used car loans in Chennai, Bangalore, Hyderabad, Coimbatore. Quick approval in 30 minutes.',
  keywords: [
    'pre owned car finance south india',
    'used car loan chennai',
    'second hand car finance bangalore',
    'pre owned car loan hyderabad',
    'used car finance coimbatore',
    'second hand car loan kerala',
    'car finance tamil nadu',
    'used car loan andhra pradesh',
    'pre owned vehicle finance',
    'second hand auto loan',
    'used car emi calculator',
    'car loan eligibility checker',
    'instant car loan approval',
    'low interest car finance',
    'quick car loan processing',
  ],
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Pre-Owned Car Finance',
    description: 'Flexible financing solutions for pre-owned cars in South India',
    provider: {
      '@type': 'Organization',
      name: 'Your Company Name',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'South India',
        addressCountry: 'IN',
      },
    },
    interestRate: '7.99%',
    feesAndCommissionsSpecification: 'No hidden charges',
  },
};

const locationData: LocationData = {
  states: [
    {
      name: 'Tamil Nadu',
      cities: ['Chennai'],
      localKeywords: [
        'chennai used cars',
        'coimbatore used cars',
        'Toyota used Cars in Chennai',
      ],
    },
    {
      name: 'Telangana',
      cities: ['Hyderabad'],
      localKeywords: ['telangana car finance', 'MG used Cars in Hyderabad'],
    },
    {
        name: 'Maharashtra',
        cities: ['Pune'],
        localKeywords: ['pune used cars', 'Maharashtra car finance'],
    }
  ],
};

const popularBrands: string[] = [
  'Maruti Suzuki',
  'Hyundai',
  'Tata',
  'Mahindra',
  'Honda',
  'Toyota',
  'Ford',
  'Renault',
  'Nissan',
  'Volkswagen',
  'Kia',
  'MG',
];

// ───────────────────────────────────────────────────────────────────────────────
/**
 * Page Component (App Router - Server Component)
 * No getServerSideProps — serverTimestamp generated directly here
 */
// ───────────────────────────────────────────────────────────────────────────────

const FinancePage = async () => {
  const serverTimestamp: string = new Date().toISOString();

  return (
    <>
      <Head>
        {/* Primary SEO Tags */}
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords.join(', ')} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/finance" />
        <meta property="og:image" content="/assets/images/used-car-finance-south-india.jpg" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content="/assets/images/used-car-finance-south-india.jpg" />

        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Your Company Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://yourwebsite.com/finance" />

        {/* Local SEO */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="South India" />
        <meta name="geo.position" content="13.0827;80.2707" />
        <meta name="ICBM" content="13.0827, 80.2707" />

        {/* Structured Data */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.structuredData),
          }}
          type="application/ld+json"
        />

        {/* Additional Structured Data for Local Business */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Pre-Owned Car Finance South India',
              description: 'Leading used car finance provider in South India',
              url: 'https://yourwebsite.com',
              areaServed: locationData.states.map((state: LocationState) => state.name),
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Car Finance Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Used Car Loan',
                      description: 'Flexible used car financing options',
                    },
                  },
                ],
              },
            }),
          }}
          type="application/ld+json"
        />
      </Head>

      {/* Pass data to client component */}
      <FinancePageClient
        locationData={locationData}
        popularBrands={popularBrands}
        serverTimestamp={serverTimestamp}
      />
    </>
  );
};

export default FinancePage;
