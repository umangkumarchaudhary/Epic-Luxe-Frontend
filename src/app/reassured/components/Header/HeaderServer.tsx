// HeaderServer.tsx
import React from 'react';
import Image from 'next/image';
import HeaderClient from './HeaderClient';

// SEO-rich metadata for luxury used cars in India
const seoMetadata = {
  title: 'Premium Used Luxury Cars India | Buy Sell Second Hand Cars',
  description: 'Best deals on certified pre-owned luxury cars in Mumbai, Delhi, Bangalore, Pune, Chennai, Hyderabad. BMW, Mercedes, Audi, Porsche used cars with warranty.',
  keywords: [
    'used luxury cars India',
    'second hand premium cars',
    'pre-owned BMW India',
    'used Mercedes Benz',
    'certified used Audi',
    'luxury car dealership',
    'sell luxury car India',
    'buy used sports cars',
    'premium car finance',
    'luxury car insurance India',
    'used car valuation',
    'trade in luxury car',
    'best used car deals India',
    'certified pre-owned vehicles',
    'luxury SUV second hand'
  ]
};

// City-specific SEO data for major Indian markets
const citySeoData = {
  'Mumbai': {
    title: 'Used Luxury Cars Mumbai | Second Hand Premium Cars Dealer',
    keywords: ['used cars Mumbai', 'luxury cars Bandra', 'pre-owned cars Andheri', 'second hand BMW Mumbai']
  },
  'Delhi': {
    title: 'Pre-Owned Luxury Cars Delhi NCR | Used Premium Cars Gurgaon',
    keywords: ['used luxury cars Delhi', 'second hand cars Gurgaon', 'pre-owned Mercedes Delhi', 'luxury cars Noida']
  },
  'Bangalore': {
    title: 'Used Premium Cars Bangalore | Second Hand Luxury Vehicles',
    keywords: ['used luxury cars Bangalore', 'pre-owned cars Whitefield', 'second hand Audi Bangalore', 'luxury cars Koramangala']
  },
  'Pune': {
    title: 'Pre-Owned Luxury Cars Pune | Used Premium Vehicles Maharashtra',
    keywords: ['used luxury cars Pune', 'second hand BMW Pune', 'pre-owned cars Koregaon Park', 'luxury vehicles Pune']
  },
  'Chennai': {
    title: 'Used Luxury Cars Chennai | Second Hand Premium Cars Tamil Nadu',
    keywords: ['used cars Chennai', 'luxury vehicles Anna Nagar', 'pre-owned BMW Chennai', 'second hand Mercedes Chennai']
  },
  'Hyderabad': {
    title: 'Pre-Owned Premium Cars Hyderabad | Used Luxury Vehicles Telangana',
    keywords: ['used luxury cars Hyderabad', 'second hand cars Banjara Hills', 'pre-owned Audi Hyderabad', 'luxury SUV Hyderabad']
  },
  'Kolkata': {
    title: 'Used Luxury Cars Kolkata | Second Hand Premium Vehicles West Bengal',
    keywords: ['used luxury cars Kolkata', 'pre-owned BMW Kolkata', 'second hand Mercedes Kolkata', 'luxury cars Salt Lake']
  },
  'Ahmedabad': {
    title: 'Pre-Owned Luxury Cars Ahmedabad | Used Premium Cars Gujarat',
    keywords: ['used luxury cars Ahmedabad', 'second hand BMW Ahmedabad', 'pre-owned Mercedes Gujarat', 'luxury SUV Ahmedabad']
  }
};

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Epic Luxe - Premium Used Luxury Cars",
  "description": "India's trusted marketplace for certified pre-owned luxury vehicles",
  "url": "https://epicluxe.in",
  "telephone": "+91-9999999999",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "areaServed": ["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai", "Hyderabad", "Kolkata", "Ahmedabad"],
  "priceRange": "₹₹₹",
  "openingHours": "Mo-Sa 09:30-19:30",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "Financing"],
  "currenciesAccepted": "INR"
};

// Rich service descriptions for SEO
const serviceDescriptions = {
  buy: {
    title: 'Buy Certified Pre-Owned Luxury Cars',
    description: 'Extensive inventory of verified used BMW, Mercedes-Benz, Audi, Porsche, Jaguar, Land Rover vehicles with comprehensive inspection reports and warranty options.',
    keywords: ['buy used luxury car', 'certified pre-owned', 'second hand premium cars', 'luxury car showroom']
  },
  sell: {
    title: 'Sell Your Luxury Car at Best Price',
    description: 'Get instant valuation and best market price for your premium vehicle. Free doorstep inspection and instant payment options available.',
    keywords: ['sell luxury car', 'car valuation', 'instant car selling', 'best price for used car']
  },
  finance: {
    title: 'Luxury Car Finance & Loan Options',
    description: 'Competitive interest rates on used luxury car loans. Quick approval, minimal documentation, and flexible EMI options from leading banks.',
    keywords: ['used car loan', 'luxury car finance', 'car loan interest rates', 'pre-owned car financing']
  },
  insurance: {
    title: 'Comprehensive Luxury Car Insurance',
    description: 'Premium insurance coverage for your luxury vehicle with zero depreciation, roadside assistance, and comprehensive protection plans.',
    keywords: ['luxury car insurance', 'comprehensive car coverage', 'zero depreciation insurance', 'premium vehicle insurance']
  },
  evaluation: {
    title: 'Free Luxury Car Valuation & Inspection',
    description: 'Professional 200+ point inspection and accurate market valuation for your premium vehicle by certified experts.',
    keywords: ['car valuation', 'vehicle inspection', 'car price evaluation', 'free car assessment']
  },
  tradein: {
    title: 'Trade-In Your Car for Upgrade',
    description: 'Exchange your current vehicle for a premium upgrade. Best exchange value and hassle-free documentation process.',
    keywords: ['car exchange', 'trade in vehicle', 'car upgrade', 'exchange offer on cars']
  }
};

export default function HeaderServer() {
  return (
    <>
      {/* SEO Meta Tags - These would typically go in the <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden SEO Content for Crawlers */}
      <div className="sr-only" aria-hidden="true">
        <h1>Epic Luxe - Premium Used Luxury Cars in India</h1>
        <p>
          {seoMetadata.description} Find the best deals on certified pre-owned luxury vehicles including 
          BMW, Mercedes-Benz, Audi, Porsche, Jaguar, Land Rover, Bentley, and more premium brands.
        </p>
        <h2>Our Services for Used Luxury Cars</h2>
        <ul>
          <li>Buy Certified Pre-Owned Luxury Vehicles with Warranty</li>
          <li>Sell Your Premium Car at Best Market Price</li>
          <li>Free Professional Car Valuation and Inspection</li>
          <li>Competitive Luxury Car Finance and Loan Options</li>
          <li>Comprehensive Insurance for Premium Vehicles</li>
          <li>Trade-In and Exchange Programs</li>
        </ul>
        <h2>Available in Major Cities</h2>
        <p>
          Mumbai, Delhi NCR, Bangalore, Pune, Chennai, Hyderabad, Kolkata, Ahmedabad, Nashik, 
          Aurangabad, Vizag, Kolhapur, Gurgaon, Noida, Faridabad, Thane, Navi Mumbai
        </p>
        <h2>Popular Used Luxury Car Models</h2>
        <p>
          BMW 3 Series, BMW 5 Series, BMW X1, BMW X3, BMW X5, Mercedes-Benz C-Class, Mercedes E-Class, 
          Mercedes GLA, Mercedes GLC, Audi A4, Audi A6, Audi Q3, Audi Q5, Audi Q7, Porsche Cayenne, 
          Porsche Macan, Jaguar XF, Land Rover Discovery, Range Rover Evoque, Volvo XC90, Lexus ES
        </p>
        <h3>Why Choose Epic Luxe for Used Luxury Cars?</h3>
        <ul>
          <li>150+ Point Certified Inspection Process</li>
          <li>Transparent Pricing with No Hidden Charges</li>
          <li>6 Months Comprehensive Warranty</li>
          <li>7-Day Money Back Guarantee</li>
          <li>Complete Service History Verification</li>
          <li>RC Transfer and Documentation Support</li>
          <li>24/7 Customer Support</li>
        </ul>
        {seoMetadata.keywords.map((keyword) => (
          <span key={keyword} className="sr-only">{keyword}</span>
        ))}
      </div>

      {/* Main Header Component */}
      <HeaderClient 
        seoData={{
          metadata: seoMetadata,
          cities: citySeoData,
          services: serviceDescriptions
        }}
      />
    </>
  );
}