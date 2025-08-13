// PremiumCarFilter.tsx - Server Component (SEO-Friendly)
import React from 'react';
import PremiumCarFilterClient from './PremiumCarFilterClient';

export interface FiltersState {
  brand: string[];
  model: string[];
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  fuelType: string[];
  transmission: string[];
  mileageMin: number;
  mileageMax: number;
  ownership: string[];
  bodyType: string[];
  driveType: string[];
  seatingCapacity: string[];
  colorExterior: string | null;
  colorInterior: string | null;
  engineMin: number;
  engineMax: number;
  horsepowerMin: number;
  horsepowerMax: number;
  condition: string | null;
  features: string[];
}

export interface PremiumCarFilterProps {
  filters: FiltersState;
  setFilters: (filters: FiltersState) => void;
  onApplyFilters?: () => void;
  currentSort: string;
  setSort: (val: string) => void;
  currentSearch: string;
  setSearch: (val: string) => void;
}

export const metadata = {
  title: 'Advanced Luxury Car Search Filters | Find Your Perfect Pre-Owned Vehicle',
  description: 'Use our comprehensive filters to search pre-owned luxury cars by brand, model, price, year, mileage, and features. Find Mercedes-Benz, BMW, Audi, Lexus, and Tesla vehicles.',
  keywords: 'luxury car filters, car search, Mercedes-Benz filter, BMW search, Audi finder, pre-owned car search, used luxury car filters, car price filter, vehicle search tool',
};

const PremiumCarFilter: React.FC<PremiumCarFilterProps> = (props) => {
  return (
    <>
      {/* SEO-Optimized Content */}
      <div className="sr-only">
        <h1>Advanced Luxury Car Search & Filter System</h1>
        
        <section>
          <h2>Search Pre-Owned Luxury Vehicles by Brand</h2>
          <ul>
            <li>Mercedes-Benz - S-Class, E-Class, C-Class, GLC, GLE, GLA, A-Class</li>
            <li>BMW - 7 Series, 5 Series, 3 Series, X7, X5, X3, M3, M5, i8</li>
            <li>Audi - A8, A6, A4, Q7, Q5, Q3, RS7, RS6, e-tron</li>
            <li>Lexus - LS, ES, GS, RX, NX, IS, LX, GX</li>
            <li>Tesla - Model S, Model 3, Model X, Model Y</li>
            <li>Porsche - Panamera, Cayenne, Macan, 911, 718</li>
            <li>Jaguar - XJ, XF, XE, F-Pace, E-Pace, I-Pace</li>
            <li>Land Rover - Range Rover, Discovery, Defender, Evoque</li>
          </ul>
        </section>

        <section>
          <h2>Filter by Price Range</h2>
          <p>
            Search luxury cars from ₹10 lakhs to ₹2 crores. Our inventory includes:
          </p>
          <ul>
            <li>Entry-level luxury: ₹10-30 lakhs (Mercedes A-Class, BMW 3 Series, Audi A4)</li>
            <li>Mid-range luxury: ₹30-60 lakhs (Mercedes E-Class, BMW 5 Series, Audi A6)</li>
            <li>Premium luxury: ₹60 lakhs-1 crore (Mercedes S-Class, BMW 7 Series, Audi A8)</li>
            <li>Ultra-luxury: ₹1-2 crores (Mercedes-Maybach, BMW M8, Audi RS models)</li>
          </ul>
        </section>

        <section>
          <h2>Filter by Year and Mileage</h2>
          <p>
            Find recent model years from 2018 to 2024 with low mileage options:
          </p>
          <ul>
            <li>2024 Models - Latest features and technology</li>
            <li>2023 Models - Current generation vehicles</li>
            <li>2022 Models - Recent models with warranty coverage</li>
            <li>2021 Models - Excellent value proposition</li>
            <li>2020 Models - Modern features at reduced prices</li>
            <li>2019-2018 Models - Budget-friendly luxury options</li>
          </ul>
          <p>Mileage ranges from 0-100,000 km with certified odometer readings.</p>
        </section>

        <section>
          <h2>Filter by Fuel Type</h2>
          <ul>
            <li>Petrol - High-performance engines, smooth operation</li>
            <li>Diesel - Fuel-efficient, high torque for SUVs</li>
            <li>Electric - Zero emissions, instant torque (Tesla, Audi e-tron)</li>
            <li>Hybrid - Best of both worlds, excellent fuel economy</li>
            <li>Plug-in Hybrid - Electric range with petrol backup</li>
          </ul>
        </section>

        <section>
          <h2>Filter by Transmission Type</h2>
          <ul>
            <li>Automatic - Smooth shifting, convenience in traffic</li>
            <li>Manual - Driver engagement, lower maintenance</li>
            <li>DCT/DSG - Lightning-fast shifts, performance-oriented</li>
            <li>CVT - Seamless acceleration, fuel efficiency</li>
            <li>Tiptronic - Manual control with automatic convenience</li>
          </ul>
        </section>

        <section>
          <h2>Advanced Filters</h2>
          
          <h3>Body Type</h3>
          <ul>
            <li>SUV - High driving position, spacious interiors</li>
            <li>Sedan - Classic luxury, comfortable ride</li>
            <li>Coupe - Sporty styling, performance-focused</li>
            <li>Convertible - Open-air driving experience</li>
            <li>Hatchback - Practical luxury, city-friendly</li>
            <li>Estate/Wagon - Maximum cargo space</li>
          </ul>

          <h3>Drive Type</h3>
          <ul>
            <li>AWD/4WD - All-weather capability, superior traction</li>
            <li>RWD - Performance driving dynamics</li>
            <li>FWD - Fuel efficiency, lower cost</li>
          </ul>

          <h3>Seating Capacity</h3>
          <ul>
            <li>2-Seater - Sports cars and roadsters</li>
            <li>4-Seater - Coupes and compact luxury</li>
            <li>5-Seater - Standard sedans and SUVs</li>
            <li>7+ Seater - Large SUVs and family vehicles</li>
          </ul>

          <h3>Premium Features</h3>
          <ul>
            <li>Sunroof/Panoramic Roof - Natural light and ventilation</li>
            <li>Ventilated Seats - Cooling comfort in hot weather</li>
            <li>Heads-Up Display (HUD) - Information without distraction</li>
            <li>360° Camera - Easy parking and maneuvering</li>
            <li>Ambient Lighting - Customizable interior atmosphere</li>
            <li>Adaptive Cruise Control - Semi-autonomous driving</li>
            <li>Lane Keep Assist - Safety and convenience</li>
            <li>Night Vision - Enhanced visibility in darkness</li>
            <li>Massage Seats - Ultimate comfort on long drives</li>
            <li>Air Suspension - Adjustable ride quality</li>
          </ul>
        </section>

        <section>
          <h2>Sort Options</h2>
          <p>Sort your search results by:</p>
          <ul>
            <li>Price: Low to High - Find the best deals first</li>
            <li>Price: High to Low - Premium options first</li>
            <li>Year: Newest First - Latest models</li>
            <li>Year: Oldest First - Budget-friendly options</li>
            <li>Mileage: Low to High - Least driven vehicles</li>
            <li>Brand: A to Z - Alphabetical ordering</li>
            <li>Performance: Horsepower rankings</li>
          </ul>
        </section>

        <section>
          <h2>How to Use Our Filter System</h2>
          <ol>
            <li>Select your preferred brands from our luxury selection</li>
            <li>Set your budget using the price range slider</li>
            <li>Choose manufacturing years that suit your needs</li>
            <li>Select fuel type based on your driving preferences</li>
            <li>Pick transmission type for your comfort</li>
            <li>Use advanced filters for specific requirements</li>
            <li>Apply filters to see matching vehicles</li>
            <li>Sort results to prioritize what matters most</li>
          </ol>
        </section>
      </div>

      {/* Client Component */}
      <PremiumCarFilterClient {...props} />
    </>
  );
};

export default PremiumCarFilter;