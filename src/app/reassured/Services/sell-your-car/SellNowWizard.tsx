import React from 'react';
import { luxuryCars } from '../../../../data/BrandData';
import SellNowWizardClient from './SellNowWizardClient';
import '../../../../app/GlobalFonts.css';

// Types and Interfaces (Server-side data preparation)
interface Brand {
  name: string;
  logo: React.ReactNode;
}

export type City = {
  name: string;
  icon?: React.ReactNode;
  new?: boolean;
};

interface SellNowWizardProps {
  compact?: boolean;
  largeButtons?: boolean;
}

// Define proper types for luxury cars data
type VehicleVariants = {
  [fuelType: string]: string[];
};

type VehicleModels = {
  [model: string]: VehicleVariants;
};

type LuxuryCars = {
  [brand: string]: VehicleModels;
};

// Server-side data preparation
const fuelOptions = [
  { key: 'Petrol', icon: 'fuel', color: '#000000' },
  { key: 'Diesel', icon: 'fuel', color: '#666666' },
  { key: 'Hybrid', icon: 'leaf', color: '#000000' },
  { key: 'Electric', icon: 'zap', color: '#666666' },
] as const;

const years = Array.from({ length: 26 }, (_, i) => (2025 - i).toString()).concat(['1999 or older']);

const ownerOptions = [
  '1st owner',
  '2nd owner', 
  '3rd owner',
  '4th owner',
  'Beyond 4th owner',
] as const;

const kmOptions = [
  '0 - 10,000 Km',
  '10,000 - 20,000 Km',
  '20,000 - 30,000 Km',
  '30,000 - 40,000 Km',
  '40,000 - 50,000 Km',
  '50,000 - 60,000 Km',
  '60,000 - 70,000 Km',
  '70,000 - 80,000 Km',
  '80,000 - 90,000 Km',
  '90,000 - 100,000 Km',
  '100,000+ Km',
] as const;

// Reduced step configuration - from 9 to 5 steps
const stepConfig = [
  { id: 1, label: 'Vehicle Details', icon: 'car', shortLabel: 'Vehicle' },
  { id: 2, label: 'Location & Year', icon: 'map', shortLabel: 'Location' },
  { id: 3, label: 'Usage History', icon: 'activity', shortLabel: 'Usage' },
  { id: 4, label: 'Contact Info', icon: 'phone', shortLabel: 'Contact' },
  { id: 5, label: 'Upload Images', icon: 'camera', shortLabel: 'Images' },
] as const;

// City data and image mapping
const cityImageMap: { [key: string]: string } = {
  delhi: '/assets/cityicons/delhi.png',
  bangalore: '/assets/cityicons/bangalore.png',
  hyderabad: '/assets/cityicons/hyderabad.png',
  mumbai: '/assets/cityicons/mumbai.png',
  pune: '/assets/cityicons/pune.png',
  ahemdabad: '/assets/cityicons/ahemdabad.png',
  chennai: '/assets/cityicons/chennai.png',
  kolkata: '/assets/cityicons/kolkata.png',
  jaipur: '/assets/cityicons/jaipur.png',
  lucknow: '/assets/cityicons/lucknow.png',
};

const popularCities: City[] = [
  { name: 'Chennai' },
  { name: 'Bangalore' },
  { name: 'Hyderabad' },
  { name: 'Coimbatore' },
  { name: 'Kochi' },
  { name: 'Thiruvananthapuram' },
  { name: 'Salem' },
  { name: 'Madurai' },
];

const otherCities = [
  'Tiruchirappalli', 'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul',
  'Thanjavur', 'Tiruppur', 'Cuddalore', 'Karur', 'Kumbakonam', 'Nagercoil',
  'Pollachi', 'Rajapalayam', 'Sivakasi', 'Pudukkottai', 'Neyveli', 'Nagapattinam',
  'Villupuram', 'Ambur', 'Vaniyambadi', 'Theni', 'Virudhunagar', 'Sankarankoil',
  'Tiruvannamalai', 'Udumalaipettai', 'Gobichettipalayam', 'Chidambaram',
  'Kumbakonam', 'Mayiladuthurai', 'Vridhachalam', 'Tindivanam', 'Ariyalur',
  // Karnataka cities
  'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Gulbarga', 'Davangere', 'Bellary',
  'Bijapur', 'Shimoga', 'Tumkur', 'Raichur', 'Bidar', 'Hospet', 'Gadag-Betageri',
  'Udupi', 'Bhadravati', 'Chitradurga', 'Kolar', 'Mandya', 'Hassan', 'Dharwad',
  // Telangana cities
  'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahbubnagar',
  'Nalgonda', 'Adilabad', 'Suryapet', 'Miryalaguda', 'Jagtial', 'Mancherial',
  // Andhra Pradesh cities
  'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry',
  'Tirupati', 'Anantapur', 'Kadapa', 'Vizianagaram', 'Eluru', 'Ongole',
  'Nandyal', 'Machilipatnam', 'Adoni', 'Tenali', 'Chittoor', 'Hindupur',
  // Kerala cities
  'Calicut', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha', 'Malappuram',
  'Kannur', 'Kasaragod', 'Kottayam', 'Pathanamthitta', 'Idukki', 'Wayanad',
] as const;

// Brand logos with server-side preparation
const getBrandLogo = (brandName: string): string => {
  return brandName.charAt(0);
};

// Convert readonly luxury cars data to mutable format
const convertLuxuryCarsToMutable = (readonlyData: any): LuxuryCars => {
  const mutableData: LuxuryCars = {};
  
  Object.keys(readonlyData).forEach(brand => {
    mutableData[brand] = {};
    Object.keys(readonlyData[brand]).forEach(model => {
      mutableData[brand][model] = {};
      Object.keys(readonlyData[brand][model]).forEach(fuelType => {
        mutableData[brand][model][fuelType] = [...readonlyData[brand][model][fuelType]];
      });
    });
  });
  
  return mutableData;
};

const brands: Brand[] = Object.keys(luxuryCars).map(brandName => ({
  name: brandName,
  logo: getBrandLogo(brandName),
}));

// Server-side utility functions
const normalizeCityName = (name: string): string =>
  name.replace(/\s+/g, '').toLowerCase().replace('ahmedabad', 'ahemdabad');

// Server Component - SEO Friendly
const SellNowWizard: React.FC<SellNowWizardProps> = ({ compact, largeButtons }) => {
  // Convert readonly luxury cars to mutable format
  const mutableLuxuryCars = convertLuxuryCarsToMutable(luxuryCars);
  
  // Server-side data preparation for better SEO
  const seoData = {
    title: "Sell Your Used Car Online - Get Instant Valuation",
    description: "Sell your pre-owned car quickly and safely. Get instant valuation for popular car brands in South India. Free car evaluation service.",
    keywords: "sell used car, car valuation, pre-owned cars, South India cars, instant car quote",
    brands: brands.map(b => b.name),
    cities: [...popularCities.map(c => c.name), ...otherCities.slice(0, 20)],
    fuelTypes: fuelOptions.map(f => f.key),
  };

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Car Selling Platform",
    "description": seoData.description,
    "applicationCategory": "AutomotiveWebApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "description": "Free car valuation service",
      "price": "0",
      "priceCurrency": "INR"
    },
    "areaServed": {
      "@type": "State",
      "name": "Tamil Nadu, Karnataka, Telangana, Andhra Pradesh, Kerala"
    }
  };

  return (
    <>
      {/* SEO Head elements */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden SEO content */}
      <div className="sr-only">
        <h1>{seoData.title}</h1>
        <p>{seoData.description}</p>
        <div>
          <h2>Supported Car Brands</h2>
          <ul>
            {seoData.brands.map(brand => (
              <li key={brand}>Sell {brand} cars online</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Service Areas</h2>
          <ul>
            {seoData.cities.map(city => (
              <li key={city}>Car buying service in {city}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Client Component */}
      <SellNowWizardClient
        brands={brands}
        fuelOptions={[...fuelOptions]}
        years={years}
        ownerOptions={[...ownerOptions]}
        kmOptions={[...kmOptions]}
        stepConfig={[...stepConfig]}
        popularCities={popularCities}
        otherCities={[...otherCities]}
        cityImageMap={cityImageMap}
        luxuryCars={mutableLuxuryCars}
        compact={compact}
        largeButtons={largeButtons}
      />
    </>
  );
};

export default SellNowWizard;