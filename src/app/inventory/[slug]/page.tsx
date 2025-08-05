import React from 'react';
import { notFound } from 'next/navigation';
import { vehicleData } from '@/data/carInventory'; // path where your data is
import type { Vehicle } from '@/data/types';

type Props = {
  params: { slug: string };
};

const VehicleDetailsPage = ({ params }: Props) => {
  const { slug } = params;
  
  // Find vehicle by slug
  const vehicle: Vehicle | undefined = vehicleData.find(v => v.slug === slug);

  if (!vehicle) {
    // Handle 404 if vehicle not found
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">
        {vehicle.brand} {vehicle.model} ({vehicle.year})
      </h1>
      <img 
        src={vehicle.image} 
        alt={`${vehicle.brand} ${vehicle.model}`} 
        className="w-full max-h-[400px] object-cover rounded-lg mb-6" 
        loading="lazy" 
      />
      <p className="mb-2"><strong>Price:</strong> {vehicle.price}</p>
      <p className="mb-2"><strong>Mileage:</strong> {vehicle.mileage}</p>
      <p className="mb-2"><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
      <p className="mb-2"><strong>Transmission:</strong> {vehicle.transmission}</p>
      <p className="mb-2"><strong>Seating:</strong> {vehicle.seating}</p>
      <p className="mb-2"><strong>Location:</strong> {vehicle.location}</p>
      <p className="mb-4"><strong>Condition:</strong> {vehicle.condition}</p>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Features:</h2>
        <ul className="list-disc list-inside space-y-1">
          {vehicle.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>
      
      {/* Add more details as you need */}
    </div>
  );
};

export default VehicleDetailsPage;
