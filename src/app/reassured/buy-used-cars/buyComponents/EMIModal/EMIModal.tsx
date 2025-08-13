// EMIModal.tsx - Server Component (SEO-Friendly)
import React from 'react';
import EMIModalClient from './EMIModalClient';

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  originalPrice: string;
  image: string;
  mileage: string;
  fuelType: string;
  transmission?: string;
  seating: number;
  location: string;
  condition: string;
  features: string[];
  savings: string;
  isLiked: boolean;
  views: number;
}

export interface EMIModalProps {
  visible: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
}

export const metadata = {
  title: 'EMI Calculator - Luxury Car Financing Options',
  description: 'Calculate your monthly EMI for premium pre-owned luxury vehicles. Get instant loan approval with competitive interest rates for Mercedes-Benz, BMW, Audi and other luxury cars.',
  keywords: 'car loan EMI calculator, luxury car financing, auto loan, Mercedes-Benz financing, BMW loan calculator, pre-owned car EMI',
};

const EMIModal: React.FC<EMIModalProps> = ({ visible, onClose, vehicle }) => {
  // SEO Content - This helps search engines understand the page content
  return (
    <>
      {/* Hidden SEO Content - Visible to crawlers but visually hidden */}
      <div className="sr-only">
        <h1>Luxury Car EMI Calculator and Financing Options</h1>
        <p>
          Calculate your monthly EMI (Equated Monthly Installment) for premium pre-owned luxury vehicles. 
          Our transparent financing calculator helps you plan your luxury car purchase with flexible down payment options, 
          competitive interest rates, and tenure periods ranging from 3 to 7 years.
        </p>
        
        <section>
          <h2>How Our EMI Calculator Works</h2>
          <ul>
            <li>Select your down payment amount (10% to 50% of vehicle price)</li>
            <li>Choose loan tenure from 36 to 84 months</li>
            <li>Adjust interest rate based on your credit profile</li>
            <li>Get instant EMI calculation</li>
            <li>Apply for pre-approved loan in minutes</li>
          </ul>
        </section>

        <section>
          <h2>Benefits of Our Car Financing</h2>
          <ul>
            <li>Competitive interest rates starting from 7% per annum</li>
            <li>Flexible down payment options</li>
            <li>Quick loan approval process</li>
            <li>No hidden charges or processing fees</li>
            <li>Expert financial advisors for personalized assistance</li>
          </ul>
        </section>

        <section>
          <h2>Eligible Luxury Car Brands</h2>
          <p>
            Finance your dream luxury car from premium brands including Mercedes-Benz, BMW, Audi, 
            Porsche, Jaguar, Land Rover, Volvo, Lexus, and more. All our pre-owned vehicles come 
            with certified quality checks and comprehensive service history.
          </p>
        </section>

        <section>
          <h2>EMI Calculation Formula</h2>
          <p>
            EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
            Where P = Principal loan amount, R = Rate of interest per month, N = Number of monthly installments
          </p>
        </section>

        {vehicle && (
          <section>
            <h3>Finance Options for {vehicle.brand} {vehicle.model}</h3>
            <p>
              Calculate EMI for {vehicle.brand} {vehicle.model} {vehicle.year} priced at {vehicle.price}. 
              This luxury {vehicle.fuelType} vehicle with {vehicle.transmission || 'automatic'} transmission 
              and {vehicle.mileage} mileage offers excellent value in the pre-owned luxury car segment.
            </p>
          </section>
        )}
      </div>

      {/* Client Component for Interactive Modal */}
      <EMIModalClient 
        visible={visible} 
        onClose={onClose} 
        vehicle={vehicle}
      />
    </>
  );
};

export default EMIModal;