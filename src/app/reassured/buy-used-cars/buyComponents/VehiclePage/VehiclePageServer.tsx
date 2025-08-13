// VehiclesPage.tsx - Server Component (SEO-Optimized)
import React from 'react';
import VehiclesPageClient from './VehiclePage';
import { Metadata } from 'next';

// Backend vehicle type
export interface BackendVehicle {
  id: number;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  original_price?: number;
  savings?: number;
  mileage?: string;
  fuel_type?: string;
  transmission?: string;
  engine_capacity?: string;
  horsepower?: string;
  torque?: string;
  location?: string;
  condition?: string;
  ownership?: string;
  health_engine?: number;
  health_tyres?: number;
  health_paint?: number;
  health_interior?: number;
  health_electrical?: number;
  color_exterior?: string;
  color_interior?: string;
  video_url?: string;
  published: boolean;
  featured: boolean;
  slug: string;
  created_at: string;
  updated_at?: string;
  images?: Array<{
    id: number;
    vehicle_id: number;
    image_url: string;
    sort_order: number;
  }>;
  features?: Array<{
    id: number;
    vehicle_id: number;
    feature: string;
  }>;
}

// Frontend vehicle type
export interface FrontendVehicle {
  id: number;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  price: string;
  originalPrice?: string;
  savings?: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  engineCapacity?: string;
  horsepower?: string;
  torque?: string;
  location: string;
  condition: string;
  ownership?: string;
  colorExterior?: string;
  colorInterior?: string;
  image: string;
  images?: string[];
  features: string[];
  videoUrl?: string;
  slug: string;
  views?: number;
  bodyType?: string;
  driveType?: string;
  seating?: number;
}

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Buy Certified Pre-Owned Luxury Cars | Mercedes-Benz, BMW, Audi | Best Prices India',
    description: 'Explore 500+ certified pre-owned luxury cars from Mercedes-Benz, BMW, Audi, Jaguar, and more. 360° inspection, 12-month warranty, easy financing from ₹15,000/month. Best deals on used luxury cars in India.',
    keywords: 'used luxury cars India, pre-owned Mercedes-Benz, second hand BMW, certified Audi, used Jaguar, luxury car deals, premium used cars, best used car website India, Mercedes certified pre-owned, BMW premium selection',
    openGraph: {
      title: 'Premium Pre-Owned Luxury Cars - Certified & Warranty Backed',
      description: 'Find your dream luxury car from 500+ certified vehicles. Best prices, comprehensive warranty, and financing options available.',
      type: 'website',
      locale: 'en_IN',
      siteName: 'Luxury Pre-Owned Cars',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Certified Pre-Owned Luxury Cars | Best Deals',
      description: 'Mercedes-Benz, BMW, Audi & more. 360° inspection, warranty, financing available.',
    },
    alternates: {
      canonical: '/vehicles',
    },
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
  };
}

// Utility function to format price
function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(price / 100000).toFixed(1)} Lakh`;
}

// Transform backend to frontend format
function transformBackendToFrontend(backendVehicle: BackendVehicle): FrontendVehicle {
  const primaryImage = backendVehicle.images && backendVehicle.images.length > 0 
    ? backendVehicle.images.sort((a, b) => a.sort_order - b.sort_order)[0].image_url
    : '/placeholder-car.jpg';

  const allImages = backendVehicle.images 
    ? backendVehicle.images
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(img => img.image_url)
    : [];

  const features = backendVehicle.features 
    ? backendVehicle.features.map(f => f.feature)
    : [];

  return {
    id: backendVehicle.id,
    brand: backendVehicle.brand,
    model: backendVehicle.model,
    variant: backendVehicle.variant,
    year: backendVehicle.year,
    price: formatPrice(backendVehicle.price),
    originalPrice: backendVehicle.original_price ? formatPrice(backendVehicle.original_price) : undefined,
    savings: backendVehicle.savings ? formatPrice(backendVehicle.savings) : undefined,
    mileage: backendVehicle.mileage || '0 km',
    fuelType: backendVehicle.fuel_type || 'Petrol',
    transmission: backendVehicle.transmission || 'Manual',
    engineCapacity: backendVehicle.engine_capacity,
    horsepower: backendVehicle.horsepower,
    torque: backendVehicle.torque,
    location: backendVehicle.location || 'Mumbai',
    condition: backendVehicle.condition || 'Excellent',
    ownership: backendVehicle.ownership,
    colorExterior: backendVehicle.color_exterior,
    colorInterior: backendVehicle.color_interior,
    image: primaryImage,
    images: allImages,
    features: features,
    videoUrl: backendVehicle.video_url,
    slug: backendVehicle.slug,
    views: Math.floor(Math.random() * 500) + 100,
    bodyType: 'Sedan',
    driveType: 'FWD',
    seating: 5,
  };
}

// Server-side data fetching
async function getVehicles(): Promise<FrontendVehicle[]> {
  try {
    const response = await fetch('http://localhost:5000/admin/vehicles', {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
      cache: 'no-store' // For real-time data
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch vehicles');
    }

    // Transform vehicles
    const vehiclesWithDetails = await Promise.all(
      data.vehicles.map(async (vehicle: BackendVehicle) => {
        try {
          const detailResponse = await fetch(`http://localhost:5000/admin/vehicle/${vehicle.id}`, {
            next: { revalidate: 300 }
          });
          
          if (detailResponse.ok) {
            const detailData = await detailResponse.json();
            if (detailData.success) {
              return {
                ...vehicle,
                images: detailData.images || [],
                features: detailData.features || []
              };
            }
          }
          
          return {
            ...vehicle,
            images: [],
            features: []
          };
        } catch (err) {
          console.error(`Error fetching details for vehicle ${vehicle.id}:`, err);
          return {
            ...vehicle,
            images: [],
            features: []
          };
        }
      })
    );

    return vehiclesWithDetails.map(transformBackendToFrontend);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
}

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  
  // Generate SEO content based on actual vehicles
  const totalVehicles = vehicles.length;
  const brands = [...new Set(vehicles.map(v => v.brand))];
  const priceRange = vehicles.reduce((acc, v) => {
    const price = parseFloat(v.price.replace(/[^0-9.]/g, ''));
    return {
      min: Math.min(acc.min, price),
      max: Math.max(acc.max, price)
    };
  }, { min: Infinity, max: 0 });

  const locationCounts = vehicles.reduce((acc, v) => {
    acc[v.location] = (acc[v.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      {/* SEO Content - Hidden but crawlable */}
      <div className="sr-only">
        <h1>Buy Certified Pre-Owned Luxury Cars in India - {totalVehicles}+ Vehicles Available</h1>
        
        <section>
          <h2>Premium Luxury Car Brands Available</h2>
          <p>
            Browse our extensive collection of {totalVehicles} certified pre-owned luxury vehicles from {brands.length} premium brands 
            including Mercedes-Benz, BMW, Audi, Jaguar, Land Rover, Porsche, Lexus, Volvo, and more.
          </p>
          <ul>
            {brands.map(brand => {
              const brandVehicles = vehicles.filter(v => v.brand === brand);
              return (
                <li key={brand}>
                  <h3>{brand} - {brandVehicles.length} vehicles</h3>
                  <p>Explore certified pre-owned {brand} models with comprehensive warranty and inspection reports.</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h2>Price Range - Luxury Cars for Every Budget</h2>
          <p>
            Find luxury cars from ₹{priceRange.min.toFixed(0)} Lakh to ₹{priceRange.max.toFixed(0)} Lakh. 
            Flexible financing options available with EMI starting from ₹15,000/month.
          </p>
          <ul>
            <li>Entry Luxury (₹10-30 Lakh): Mercedes A-Class, BMW 3 Series, Audi A4</li>
            <li>Mid-Range Premium (₹30-60 Lakh): Mercedes E-Class, BMW 5 Series, Audi A6</li>
            <li>Executive Luxury (₹60L-1Cr): Mercedes S-Class, BMW 7 Series, Audi A8</li>
            <li>Ultra Premium (Above ₹1 Cr): Mercedes-Maybach, BMW M8, Porsche 911</li>
          </ul>
        </section>

        <section>
          <h2>Locations - Pan-India Availability</h2>
          <p>
            Our certified pre-owned luxury cars are available across major cities in India with doorstep delivery options.
          </p>
          <ul>
            {Object.entries(locationCounts).map(([location, count]) => (
              <li key={location}>
                {location}: {count} luxury cars available for immediate delivery
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Why Choose Our Certified Pre-Owned Luxury Cars?</h2>
          <ol>
            <li><strong>360° Quality Inspection:</strong> Every vehicle undergoes 360-point inspection by certified technicians</li>
            <li><strong>Comprehensive Warranty:</strong> 12-month warranty covering engine, transmission, and critical components</li>
            <li><strong>Verified Service History:</strong> Complete maintenance records from authorized service centers</li>
            <li><strong>Transparent Pricing:</strong> No hidden charges, best price guarantee</li>
            <li><strong>Easy Financing:</strong> Instant loan approval with interest rates starting from 7.5%</li>
            <li><strong>Pan-India Delivery:</strong> Free doorstep delivery and test drives in 50+ cities</li>
            <li><strong>7-Day Return Policy:</strong> Not satisfied? Return within 7 days for full refund</li>
            <li><strong>RC Transfer Assistance:</strong> Complete documentation and ownership transfer support</li>
            <li><strong>24/7 Support:</strong> Round-the-clock roadside assistance and customer service</li>
            <li><strong>Trade-In Options:</strong> Best valuation for your current vehicle</li>
          </ol>
        </section>

        <section>
          <h2>Popular Searches for Used Luxury Cars</h2>
          <ul>
            <li>Used Mercedes-Benz in Mumbai</li>
            <li>Pre-owned BMW in Delhi NCR</li>
            <li>Second hand Audi in Bangalore</li>
            <li>Certified Jaguar in Pune</li>
            <li>Pre-owned Land Rover in Hyderabad</li>
            <li>Used Porsche in Chennai</li>
            <li>Luxury SUVs under 50 Lakhs</li>
            <li>Premium sedans with sunroof</li>
            <li>Diesel luxury cars with low mileage</li>
            <li>Electric and hybrid luxury vehicles</li>
          </ul>
        </section>

        <section>
          <h2>Current Inventory Details</h2>
          {vehicles.map(vehicle => (
            <article key={vehicle.id}>
              <h3>{vehicle.year} {vehicle.brand} {vehicle.model}</h3>
              <dl>
                <dt>Price:</dt>
                <dd>{vehicle.price}</dd>
                <dt>Mileage:</dt>
                <dd>{vehicle.mileage}</dd>
                <dt>Fuel Type:</dt>
                <dd>{vehicle.fuelType}</dd>
                <dt>Transmission:</dt>
                <dd>{vehicle.transmission}</dd>
                <dt>Location:</dt>
                <dd>{vehicle.location}</dd>
                <dt>Condition:</dt>
                <dd>{vehicle.condition}</dd>
                <dt>Key Features:</dt>
                <dd>{vehicle.features.join(', ')}</dd>
              </dl>
              <a href={`/inventory/${vehicle.slug}`}>View Details</a>
            </article>
          ))}
        </section>
      </div>

      {/* Client Component with vehicles data */}
      <VehiclesPageClient initialVehicles={vehicles} />
    </>
  );
}