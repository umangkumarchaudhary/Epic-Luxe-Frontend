// HeaderServer.tsx
import React from 'react';

import HeaderClient from './HeaderClient';

// SEO-rich metadata for used cars in India
const seoMetadata = {
  title: 'Premium Used Cars India | Buy Sell Second Hand Cars | Epic Reassured',
  description: 'Best deals on certified pre-owned cars in Mumbai, Delhi, Bangalore, Pune, Chennai, Hyderabad. Honda, Toyota, MG, Skoda used cars with warranty.',
  keywords: [
    'used cars India',
    'second hand cars',
    'pre-owned Honda India',
    'used Toyota cars',
    'certified used MG',
    'car dealership',
    'sell car India',
    'buy used cars',
    'car finance',
    'car insurance India',
    'used car valuation',
    'trade in car',
    'best used car deals India',
    'certified pre-owned vehicles',
    'second hand SUV'
  ]
};

// City-specific SEO data for major Indian markets
const citySeoData = {
  'Mumbai': {
    title: 'Used Cars Mumbai | Second Hand Cars Dealer',
    keywords: ['used cars Mumbai', 'cars Bandra', 'pre-owned cars Andheri', 'second hand Honda Mumbai']
  },
  'Delhi': {
    title: 'Pre-Owned Cars Delhi NCR | Used Cars Gurgaon',
    keywords: ['used cars Delhi', 'second hand cars Gurgaon', 'pre-owned Toyota Delhi', 'cars Noida']
  },
  'Bangalore': {
    title: 'Used Cars Bangalore | Second Hand Vehicles',
    keywords: ['used cars Bangalore', 'pre-owned cars Whitefield', 'second hand MG Bangalore', 'cars Koramangala']
  },
  'Pune': {
    title: 'Pre-Owned Cars Pune | Used Vehicles Maharashtra',
    keywords: ['used cars Pune', 'second hand Honda Pune', 'pre-owned cars Koregaon Park', 'vehicles Pune']
  },
  'Chennai': {
    title: 'Used Cars Chennai | Second Hand Cars Tamil Nadu',
    keywords: ['used cars Chennai', 'vehicles Anna Nagar', 'pre-owned Honda Chennai', 'second hand Toyota Chennai']
  },
  'Hyderabad': {
    title: 'Pre-Owned Cars Hyderabad | Used Vehicles Telangana',
    keywords: ['used cars Hyderabad', 'second hand cars Banjara Hills', 'pre-owned MG Hyderabad', 'SUV Hyderabad']
  },
  'Kolkata': {
    title: 'Used Cars Kolkata | Second Hand Vehicles West Bengal',
    keywords: ['used cars Kolkata', 'pre-owned Honda Kolkata', 'second hand Toyota Kolkata', 'cars Salt Lake']
  },
  'Ahmedabad': {
    title: 'Pre-Owned Cars Ahmedabad | Used Cars Gujarat',
    keywords: ['used cars Ahmedabad', 'second hand Honda Ahmedabad', 'pre-owned Toyota Gujarat', 'SUV Ahmedabad']
  }
};

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Epic Reassured - Premium Used Cars",
  "description": "India's trusted marketplace for certified pre-owned vehicles",
  "url": "https://epicreassured.in",
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
    title: 'Buy Certified Pre-Owned Cars',
    description: 'Extensive inventory of verified used Honda, Toyota, MG, Skoda, Maruti vehicles with comprehensive inspection reports and warranty options.',
    keywords: ['buy used car', 'certified pre-owned', 'second hand cars', 'car showroom']
  },
  sell: {
    title: 'Sell Your Car at Best Price',
    description: 'Get instant valuation and best market price for your vehicle. Free doorstep inspection and instant payment options available.',
    keywords: ['sell car', 'car valuation', 'instant car selling', 'best price for used car']
  },
  finance: {
    title: 'Car Finance & Loan Options',
    description: 'Competitive interest rates on used car loans. Quick approval, minimal documentation, and flexible EMI options from leading banks.',
    keywords: ['used car loan', 'car finance', 'car loan interest rates', 'pre-owned car financing']
  },
  insurance: {
    title: 'Comprehensive Car Insurance',
    description: 'Premium insurance coverage for your vehicle with zero depreciation, roadside assistance, and comprehensive protection plans.',
    keywords: ['car insurance', 'comprehensive car coverage', 'zero depreciation insurance', 'vehicle insurance']
  },
  evaluation: {
    title: 'Free Car Valuation & Inspection',
    description: 'Professional 200+ point inspection and accurate market valuation for your vehicle by certified experts.',
    keywords: ['car valuation', 'vehicle inspection', 'car price evaluation', 'free car assessment']
  },
  tradein: {
    title: 'Trade-In Your Car for Upgrade',
    description: 'Exchange your current vehicle for an upgrade. Best exchange value and hassle-free documentation process.',
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
        <h1>Epic Reassured - Premium Used Cars in India</h1>
        <p>
          {seoMetadata.description} Find the best deals on certified pre-owned vehicles including 
          Honda City, Amaze, Toyota Innova, Fortuner, MG Hector, Skoda Rapid, Maruti Swift, and more popular brands.
        </p>
        <h2>Our Services for Used Cars</h2>
        <ul>
          <li>Buy Certified Pre-Owned Vehicles with Warranty</li>
          <li>Sell Your Car at Best Market Price</li>
          <li>Free Professional Car Valuation and Inspection</li>
          <li>Competitive Car Finance and Loan Options</li>
          <li>Comprehensive Insurance for Vehicles</li>
          <li>Trade-In and Exchange Programs</li>
        </ul>
        <h2>Available in Major Cities</h2>
        <p>
          Mumbai, Delhi NCR, Bangalore, Pune, Chennai, Hyderabad, Kolkata, Ahmedabad, Nashik, 
          Aurangabad, Vizag, Kolhapur, Gurgaon, Noida, Faridabad, Thane, Navi Mumbai
        </p>
        <h2>Popular Used Car Models</h2>
        <p>
          Honda City, Honda Amaze, Honda Jazz, Honda WR-V, Toyota Innova, Toyota Fortuner, 
          Toyota Camry, MG Hector, MG ZS EV, MG Astor, Skoda Rapid, Skoda Octavia, Skoda Superb,
          Maruti Swift, Maruti Baleno, Maruti Dzire, Hyundai Creta, Hyundai i20, Tata Nexon, Mahindra XUV500
        </p>
        <h3>Why Choose Epic Reassured for Used Cars?</h3>
        <ul>
          <li>200+ Point Certified Inspection Process</li>
          <li>Transparent Pricing with No Hidden Charges</li>
          <li>6 Months Comprehensive Warranty</li>
          <li>7-Day Money Back Guarantee</li>
          <li>Complete Service History Verification</li>
          <li>RC Transfer and Documentation Support</li>
          <li>24/7 Customer Support</li>
          <li>Best Price Guarantee</li>
          <li>Easy Finance Options</li>
          <li>Doorstep Delivery Available</li>
        </ul>
        <h3>Search Popular Cars</h3>
        <p>
          Search for Honda City price, Toyota Innova used, MG Hector second hand, Skoda Rapid pre-owned,
          best used cars under 5 lakh, certified pre-owned SUV, automatic transmission cars, diesel cars,
          petrol cars, family cars, compact cars, sedan cars, hatchback cars
        </p>
        <h3>Car Buying Guide</h3>
        <p>
          Tips for buying used cars, what to check when buying second hand car, used car financing options,
          car insurance for pre-owned vehicles, RC transfer process, car documentation checklist,
          best time to buy used car, negotiating used car price, used car warranty coverage
        </p>
        <h3>Services We Offer</h3>
        <p>
          Car valuation online, instant car selling, doorstep car inspection, used car loans, car insurance,
          trade-in services, car exchange offers, vehicle history check, emission test, fitness certificate,
          car registration transfer, NOC clearance, car finance calculator, EMI calculator
        </p>
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