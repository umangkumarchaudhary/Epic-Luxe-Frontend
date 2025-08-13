// CompareDrawer.tsx - Server Component (SEO-Friendly)
import React from 'react';
import CompareDrawerClient from './CompareDrawerClient';

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  price: string;
  year: number;
  mileage: string;
  image: string;
  fuelType: string;
  transmission: string;
  location: string;
  seating?: number;
  color?: string;
  features?: string[];
  condition?: string;
}

export interface CompareDrawerProps {
  open: boolean;
  onClose: () => void;
  vehicleIds: number[];
  allVehicles: Vehicle[];
  triggerClear: () => void;
}

export const metadata = {
  title: 'Compare Luxury Cars - Side-by-Side Vehicle Comparison Tool',
  description: 'Compare multiple luxury pre-owned vehicles side-by-side. Compare prices, mileage, features, and specifications of Mercedes-Benz, BMW, Audi, and other premium cars.',
  keywords: 'compare cars, luxury car comparison, Mercedes-Benz vs BMW, car comparison tool, vehicle specifications, pre-owned car comparison',
};

const CompareDrawer: React.FC<CompareDrawerProps> = ({
  open,
  onClose,
  vehicleIds,
  allVehicles,
  triggerClear,
}) => {
  // SEO-friendly content for search engines
  const selectedVehicles = vehicleIds
    .map(id => allVehicles.find(v => v.id === id))
    .filter(Boolean) as Vehicle[];

  return (
    <>
      {/* SEO Content - Hidden but crawlable */}
      <div className="sr-only">
        <h1>Luxury Car Comparison Tool</h1>
        <p>
          Compare premium pre-owned luxury vehicles side-by-side to make an informed purchase decision. 
          Our comprehensive comparison tool allows you to evaluate multiple vehicles simultaneously across 
          key parameters including price, mileage, fuel efficiency, transmission type, and more.
        </p>

        {selectedVehicles.length > 0 && (
          <section>
            <h2>Currently Comparing {selectedVehicles.length} Vehicles</h2>
            <ul>
              {selectedVehicles.map(vehicle => (
                <li key={vehicle.id}>
                  <h3>{vehicle.brand} {vehicle.model} {vehicle.year}</h3>
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
                    {vehicle.seating && (
                      <>
                        <dt>Seating Capacity:</dt>
                        <dd>{vehicle.seating} seats</dd>
                      </>
                    )}
                    {vehicle.color && (
                      <>
                        <dt>Color:</dt>
                        <dd>{vehicle.color}</dd>
                      </>
                    )}
                  </dl>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2>How to Use Our Car Comparison Tool</h2>
          <ol>
            <li>Select up to 4 luxury vehicles from our inventory</li>
            <li>Click the compare button to view side-by-side comparison</li>
            <li>Analyze key specifications and features</li>
            <li>Review price differences and value propositions</li>
            <li>Make an informed decision based on comprehensive data</li>
          </ol>
        </section>

        <section>
          <h2>Key Comparison Parameters</h2>
          <ul>
            <li><strong>Price:</strong> Compare on-road prices and potential savings</li>
            <li><strong>Mileage:</strong> Evaluate odometer readings and usage history</li>
            <li><strong>Year:</strong> Compare model years and generation differences</li>
            <li><strong>Fuel Type:</strong> Petrol, Diesel, Hybrid, or Electric options</li>
            <li><strong>Transmission:</strong> Manual, Automatic, or DCT/DSG variants</li>
            <li><strong>Seating Capacity:</strong> 2-seater sports cars to 7-seater SUVs</li>
            <li><strong>Location:</strong> Vehicle availability across different cities</li>
            <li><strong>Color Options:</strong> Exterior paint and interior trim combinations</li>
          </ul>
        </section>

        <section>
          <h2>Popular Luxury Car Comparisons</h2>
          <ul>
            <li>Mercedes-Benz E-Class vs BMW 5 Series</li>
            <li>Mercedes-Benz GLE vs BMW X5</li>
            <li>Audi Q7 vs Mercedes-Benz GLS</li>
            <li>BMW 3 Series vs Mercedes-Benz C-Class</li>
            <li>Porsche Cayenne vs Range Rover Sport</li>
            <li>Jaguar F-Pace vs Audi Q5</li>
            <li>Volvo XC90 vs BMW X7</li>
            <li>Lexus ES vs Mercedes-Benz E-Class</li>
          </ul>
        </section>

        <section>
          <h2>Why Compare Cars Before Buying?</h2>
          <p>
            Comparing luxury vehicles helps you understand the value proposition of each option. 
            By analyzing specifications, features, and pricing side-by-side, you can identify which 
            vehicle offers the best combination of performance, comfort, technology, and value for 
            your specific needs. Our comparison tool makes this process simple and transparent.
          </p>
        </section>
      </div>

      {/* Client Component for Interactive Comparison */}
      <CompareDrawerClient
        open={open}
        onClose={onClose}
        vehicleIds={vehicleIds}
        allVehicles={allVehicles}
        triggerClear={triggerClear}
      />
    </>
  );
};

export default CompareDrawer;