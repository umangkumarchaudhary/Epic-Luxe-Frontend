// VehicleGrid.tsx - Server Component (SEO-Friendly)
import React from 'react';
import VehicleGridClient from './VehicleGridClient';
import EpicReassuredBenefits from '../EPICBenefits/EPICBenefits';
import FinanceProtectionHighlights from '../FinanceBenefits/FinanceBenefitsClient';
import SubmitRequestSection from '../CallBack';

export type Vehicle = {
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
};

type VehicleGridProps = {
  vehicles: Vehicle[];
};

export const metadata = {
  title: 'Buy Pre-Owned Luxury Cars | Mercedes-Benz, BMW, Audi & More',
  description: 'Browse our curated collection of certified pre-owned luxury vehicles. Find the perfect Mercedes-Benz, BMW, Audi, Porsche, or other premium cars with comprehensive warranty and financing options.',
  keywords: 'buy luxury cars, pre-owned Mercedes-Benz, used BMW, certified Audi, luxury car inventory, premium vehicles for sale, second hand luxury cars India',
};

const VehicleGrid: React.FC<VehicleGridProps> = ({ vehicles }) => {
  // Group vehicles for SEO structure
  const vehiclesByBrand = vehicles.reduce((acc, vehicle) => {
    if (!acc[vehicle.brand]) {
      acc[vehicle.brand] = [];
    }
    acc[vehicle.brand].push(vehicle);
    return acc;
  }, {} as Record<string, Vehicle[]>);

  // Calculate stats for SEO
  const totalVehicles = vehicles.length;
  const brands = Object.keys(vehiclesByBrand);
 

  return (
    <>
      {/* SEO Content - Hidden but crawlable */}
      <div className="sr-only">
        <h1>Premium Pre-Owned Luxury Cars for Sale</h1>
        
        <section>
          <h2>Our Current Inventory</h2>
          <p>
            Explore our collection of {totalVehicles} certified pre-owned luxury vehicles from {brands.length} premium brands. 
            All vehicles undergo comprehensive 360-point inspection and come with warranty coverage.
          </p>
        </section>

        <section>
          <h2>Available Luxury Brands</h2>
          {Object.entries(vehiclesByBrand).map(([brand, brandVehicles]) => (
            <div key={brand}>
              <h3>{brand} - {brandVehicles.length} vehicles available</h3>
              <ul>
                {brandVehicles.map(vehicle => (
                  <li key={vehicle.id}>
                    <a href={`/inventory/${vehicle.slug}`}>
                      {vehicle.year} {brand} {vehicle.model} - {vehicle.price}
                    </a>
                    <dl>
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
                      {vehicle.features.length > 0 && (
                        <>
                          <dt>Key Features:</dt>
                          <dd>{vehicle.features.join(', ')}</dd>
                        </>
                      )}
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Why Buy From Us?</h2>
          <ul>
            <li>360-point quality inspection on all vehicles</li>
            <li>Comprehensive warranty coverage up to 12 months</li>
            <li>Transparent pricing with no hidden charges</li>
            <li>Easy financing options starting from 7.5% interest</li>
            <li>Pan-India delivery and registration assistance</li>
            <li>7-day return policy for peace of mind</li>
            <li>Complete service history verification</li>
            <li>Trade-in options for your current vehicle</li>
          </ul>
        </section>

        <section>
          <h2>Vehicle Categories</h2>
          <h3>By Body Type</h3>
          <ul>
            <li>Luxury Sedans - Mercedes E-Class, BMW 5 Series, Audi A6</li>
            <li>Premium SUVs - Mercedes GLE, BMW X5, Audi Q7</li>
            <li>Sports Cars - Porsche 911, BMW M Series, Mercedes AMG</li>
            <li>Compact Luxury - Mercedes A-Class, BMW 3 Series, Audi A4</li>
            <li>Ultra-Luxury - Mercedes S-Class, BMW 7 Series, Audi A8</li>
          </ul>

          <h3>By Price Range</h3>
          <ul>
            <li>Entry Luxury: ₹10-30 Lakhs</li>
            <li>Mid-Range Premium: ₹30-60 Lakhs</li>
            <li>High-End Luxury: ₹60 Lakhs - 1 Crore</li>
            <li>Ultra Premium: Above ₹1 Crore</li>
          </ul>

          <h3>By Fuel Type</h3>
          <ul>
            <li>Petrol - High performance, smooth operation</li>
            <li>Diesel - Fuel efficient, high torque</li>
            <li>Hybrid - Best efficiency, lower emissions</li>
            <li>Electric - Zero emissions, instant torque</li>
          </ul>
        </section>

        <section>
          <h2>Financing Options</h2>
          <p>
            Get instant loan approval with EMI options starting from as low as ₹15,000 per month. 
            Our financing partners include HDFC Bank, ICICI Bank, Axis Bank, and more. 
            Flexible tenure options from 12 to 84 months available.
          </p>
        </section>

        <section>
          <h2>Test Drive & Purchase Process</h2>
          <ol>
            <li>Browse our inventory online or visit our showroom</li>
            <li>Schedule a test drive at your convenience</li>
            <li>Get detailed vehicle history and inspection report</li>
            <li>Choose financing option or make direct payment</li>
            <li>Complete documentation with our assistance</li>
            <li>Take delivery at showroom or get home delivery</li>
            <li>Enjoy comprehensive after-sales support</li>
          </ol>
        </section>
      </div>

      {/* Main Vehicle Grid with Integrated Sections */}
      <div className="w-full bg-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Vehicles Grid with Integrated Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-6 py-2">
            {vehicles.slice(0, 9).map((vehicle) => (
              <div key={vehicle.id} className="vehicle-card-wrapper">
                <VehicleGridClient vehicles={[vehicle]} />
              </div>
            ))}
          </div>

          {/* Epic Reassured Benefits after first 9 vehicles */}
          {vehicles.length >= 9 && (
            <>
              <div className="my-2 h-[1px] bg-black/10"></div>
              <div className="w-full">
                <EpicReassuredBenefits />
              </div>
            </>
          )}

          {/* Continue with next set of vehicles */}
          {vehicles.length > 9 && (
            <>
              <div className="my-2 h-[1px] bg-black/10"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-6 py-16">
                {vehicles.slice(9, 18).map((vehicle) => (
                  <div key={vehicle.id} className="vehicle-card-wrapper">
                    <VehicleGridClient vehicles={[vehicle]} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Finance Protection Highlights after 18 vehicles */}
          {vehicles.length >= 18 && (
            <>
              <div className="my-2 h-[1px] bg-black/10"></div>
              <div className="w-full">
                <FinanceProtectionHighlights />
              </div>
            </>
          )}

          {/* Continue with remaining vehicles */}
          {vehicles.length > 18 && (
            <>
              <div className="my-12 h-[1px] bg-black/10"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-6 py-16">
                {vehicles.slice(18).map((vehicle) => (
                  <div key={vehicle.id} className="vehicle-card-wrapper">
                    <VehicleGridClient vehicles={[vehicle]} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Submit Request Section at the end */}
          <div className="my-12 h-[1px] bg-black/10"></div>
          <div className="w-full">
            <SubmitRequestSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleGrid;