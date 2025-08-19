import { Metadata } from 'next';
import LandingPageClient from './components/LandingPageClient';


const generateStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://epiccars.com/#organization",
        "name": "Epic Cars",
        "url": "https://epiccars.com",
        "logo": "https://epiccars.com/assets/images/epic-cars-logo.png",
        "description": "Premium used car dealership in India offering luxury and reliable vehicles in Pune, Hyderabad, Nashik, Vizag, and Chennai",
        "address": [
          {
            "@type": "PostalAddress",
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "addressCountry": "India"
          },
          {
            "@type": "PostalAddress",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "addressCountry": "India"
          },
          {
            "@type": "PostalAddress",
            "addressLocality": "Nashik",
            "addressRegion": "Maharashtra",
            "addressCountry": "India"
          },
          {
            "@type": "PostalAddress",
            "addressLocality": "Visakhapatnam",
            "addressRegion": "Andhra Pradesh",
            "addressCountry": "India"
          },
          {
            "@type": "PostalAddress",
            "addressLocality": "Chennai",
            "addressRegion": "Tamil Nadu",
            "addressCountry": "India"
          }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-XXXXXXXXXX",
          "contactType": "Customer Service"
        },
        "sameAs": [
          "https://facebook.com/epiccars",
          "https://instagram.com/epiccars",
          "https://twitter.com/epiccars"
        ]
      },
      {
        "@type": "AutoDealer",
        "@id": "https://epiccars.com/#autodealer",
        "name": "Epic Cars - Premium Used Car Dealer",
        "description": "Leading used car dealership specializing in luxury and reliable pre-owned vehicles across major Indian cities",
        "url": "https://epiccars.com",
        "priceRange": "₹₹₹₹",
        "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "Car Loan"],
        "currenciesAccepted": "INR",
        "areaServed": [
          {
            "@type": "City",
            "name": "Pune",
            "containedInPlace": {
              "@type": "State",
              "name": "Maharashtra"
            }
          },
          {
            "@type": "City",
            "name": "Hyderabad",
            "containedInPlace": {
              "@type": "State",
              "name": "Telangana"
            }
          },
          {
            "@type": "City",
            "name": "Nashik",
            "containedInPlace": {
              "@type": "State",
              "name": "Maharashtra"
            }
          },
          {
            "@type": "City",
            "name": "Visakhapatnam",
            "containedInPlace": {
              "@type": "State",
              "name": "Andhra Pradesh"
            }
          },
          {
            "@type": "City",
            "name": "Chennai",
            "containedInPlace": {
              "@type": "State",
              "name": "Tamil Nadu"
            }
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://epiccars.com/#website",
        "url": "https://epiccars.com",
        "name": "Epic Cars",
        "description": "Buy premium used cars in India - Epic Luxe for luxury vehicles, Epic Reassured for reliable cars",
        "inLanguage": "en-IN",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://epiccars.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://epiccars.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://epiccars.com"
          }
        ]
      }
    ]
  };
};

// SEO Metadata
export const metadata: Metadata = {
  title: "Epic Cars - Premium Used Cars in Pune, Hyderabad, Nashik, Vizag & Chennai | Luxury & Reliable Pre-owned Vehicles",
  description: "Buy certified used cars in India from Epic Cars. Epic Luxe offers luxury pre-owned vehicles, Epic Reassured provides reliable used cars. Outlets in Pune, Hyderabad, Nashik, Visakhapatnam & Chennai. Best prices, quality assured.",
  keywords: [
    // Primary keywords
    "used cars india",
    "pre owned cars",
    "second hand cars",
    "certified used cars",
    
    // Location-based keywords
    "used cars pune",
    "used cars hyderabad",
    "used cars nashik",
    "used cars vizag",
    "used cars visakhapatnam",
    "used cars chennai",
    "pre owned cars pune",
    "pre owned cars hyderabad",
    "second hand cars pune",
    "second hand cars hyderabad",
    
    // Luxury car keywords
    "luxury used cars",
    "premium used cars",
    "luxury pre owned cars india",
    "expensive used cars",
    "high end used cars",
    
    // Brand-specific
    "epic cars",
    "epic luxe",
    "epic reassured",
    
    // Car dealership keywords
    "used car dealer",
    "pre owned car dealer",
    "certified car dealer",
    "trusted car dealer india",
    
    // State-wise keywords
    "used cars maharashtra",
    "used cars telangana",
    "used cars andhra pradesh",
    "used cars tamil nadu"
  ].join(", "),
  
  authors: [{ name: "Epic Cars" }],
  creator: "Epic Cars",
  publisher: "Epic Cars",
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://epiccars.com',
    siteName: 'Epic Cars',
    title: 'Epic Cars - Premium Used Cars in India | Luxury & Reliable Pre-owned Vehicles',
    description: 'Buy certified used cars from Epic Cars across Pune, Hyderabad, Nashik, Vizag & Chennai. Epic Luxe for luxury cars, Epic Reassured for reliable vehicles. Quality assured, best prices.',
    images: [
      {
        url: 'https://epiccars.com/assets/images/epic-cars-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Epic Cars - Premium Used Car Dealer in India',
        type: 'image/jpeg',
      },
      {
        url: 'https://epiccars.com/assets/images/luxury-cars-collection.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Used Cars Collection - Epic Luxe',
        type: 'image/jpeg',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@epiccars',
    creator: '@epiccars',
    title: 'Epic Cars - Premium Used Cars in India | Pune, Hyderabad, Nashik, Vizag, Chennai',
    description: 'Buy certified luxury & reliable used cars from Epic Cars. Best pre-owned vehicle deals across major Indian cities. Quality guaranteed.',
    images: ['https://epiccars.com/assets/images/epic-cars-twitter-image.jpg'],
  },
  
  alternates: {
    canonical: 'https://epiccars.com',
    languages: {
      'en-IN': 'https://epiccars.com',
      'hi-IN': 'https://epiccars.com/hi',
    },
  },
  
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  
  category: 'Automotive',
  classification: 'Used Car Dealership',
  
  other: {
    'geo.region': 'IN',
    'geo.placename': 'India',
    'geo.position': '20.5937;78.9629', // Center of India coordinates
    'ICBM': '20.5937, 78.9629',
    'DC.title': 'Epic Cars - Premium Used Cars in India',
    'DC.creator': 'Epic Cars',
    'DC.subject': 'Used Cars, Pre-owned Vehicles, Car Dealership',
    'DC.description': 'Premium used car dealership offering luxury and reliable pre-owned vehicles across major Indian cities',
    'DC.language': 'en-IN',
    'DC.coverage': 'India',
  },
};

export default function HomePage() {
  const structuredData = generateStructuredData();

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      {/* Additional Meta Tags */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <meta name="geo.position" content="20.5937;78.9629" />
      <meta name="ICBM" content="20.5937, 78.9629" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* SEO-friendly semantic structure */}
      <main>
        
        <div className="sr-only">
          <h1>Epic Cars - Premium Used Car Dealer in India</h1>
          <h2>Buy Certified Pre-owned Vehicles in Pune, Hyderabad, Nashik, Visakhapatnam, and Chennai</h2>
          <p>
            Epic Cars is India&apos;s leading premium used car dealership with two specialized divisions:
            Epic Luxe for luxury pre-owned vehicles and Epic Reassured for reliable used cars.
            We serve customers across major cities including Pune, Hyderabad, Nashik, Visakhapatnam (Vizag), and Chennai.
          </p>
          <ul>
            <li>Certified used cars in Pune, Maharashtra</li>
            <li>Premium pre-owned vehicles in Hyderabad, Telangana</li>
            <li>Quality second-hand cars in Nashik, Maharashtra</li>
            <li>Trusted used car dealer in Visakhapatnam, Andhra Pradesh</li>
            <li>Luxury and reliable cars in Chennai, Tamil Nadu</li>
          </ul>
        </div>
        
        {/* Client Component */}
        <LandingPageClient />
      </main>
      
      {/* Additional structured data for local businesses */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://epiccars.com/#localbusiness",
            "name": "Epic Cars",
            "image": "https://epiccars.com/assets/images/epic-cars-storefront.jpg",
            "telephone": "+91-XXXXXXXXXX",
            "url": "https://epiccars.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Your Street Address",
              "addressLocality": "Pune",
              "postalCode": "411001",
              "addressRegion": "Maharashtra",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 18.5204,
              "longitude": 73.8567
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "19:00"
              }
            ],
            "priceRange": "₹₹₹₹",
            "servesCuisine": "Automotive Sales",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Used Cars",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Luxury Used Cars",
                    "description": "Premium luxury pre-owned vehicles"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Reliable Used Cars",
                    "description": "Quality assured pre-owned vehicles"
                  }
                }
              ]
            }
          }),
        }}
      />
    </>
  );
}