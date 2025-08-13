'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Car, MapPin, Fuel } from 'lucide-react';

interface Vehicle {
  id: string;
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
  location?: string;
  condition?: string;
  slug: string;
  image_url?: string;
}

interface VehicleGridProps {
  vehiclesByBrand: Record<string, Vehicle[]>;
  defaultBrand: string | null;
}

const VehicleGrid = ({ vehiclesByBrand, defaultBrand }: VehicleGridProps) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(defaultBrand);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleBrandSelection = (event: CustomEvent) => {
      const brandName = event.detail.brandName;
      setSelectedBrand(brandName);
      updateVehicles(brandName);
    };

    window.addEventListener('brandSelected', handleBrandSelection as EventListener);
    
    if (defaultBrand) {
      updateVehicles(defaultBrand);
    }

    return () => {
      window.removeEventListener('brandSelected', handleBrandSelection as EventListener);
    };
  }, [defaultBrand]);

  const updateVehicles = async (brandName: string) => {
    setLoading(true);
    try {
      const brandVehicles = vehiclesByBrand[brandName.toLowerCase()] || [];
      const limitedVehicles = brandVehicles.slice(0, 3);
      
      const vehiclesWithImages = await Promise.all(
        limitedVehicles.map(async (vehicle: Vehicle) => {
          try {
            const imageResponse = await fetch(`http://localhost:5000/admin/vehicle/${vehicle.id}`);
            const imageData = await imageResponse.json();
            
            return {
              ...vehicle,
              image_url: imageData.images?.[0]?.image_url || '/placeholder.png'
            };
          } catch (error) {
            return {
              ...vehicle,
              image_url: '/placeholder.png'
            };
          }
        })
      );
      
      setVehicles(vehiclesWithImages);
    } catch (error) {
      console.error('Error updating vehicles:', error);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const formatMileage = (mileage?: string) => {
    if (!mileage) return 'N/A';
    return mileage.replace(/\s*km\s*$/i, '') + ' km';
  };

  if (!selectedBrand) return null;

  return (
    <div className="space-y-8">
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Car className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
      ) : vehicles.length > 0 ? (
        <>
          <div 
            className={`flex justify-center gap-6 ${
              vehicles.length === 1 ? 'max-w-sm mx-auto' : 
              vehicles.length === 2 ? 'max-w-2xl mx-auto' : 
              'max-w-5xl mx-auto'
            }`}
          >
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="group relative bg-white rounded-none overflow-hidden border border-black hover:shadow-xl transition-all duration-500 w-96"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={vehicle.image_url}
                    alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}${vehicle.variant ? ` ${vehicle.variant}` : ''}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Premium Badge */}
                  <div className="absolute top-4 left-4 bg-white border border-black text-black text-xs font-medium px-3 py-1">
                    PREMIUM CERTIFIED
                  </div>

                  {vehicle.savings && (
                    <div className="absolute top-4 right-4 bg-black text-white text-xs font-medium px-3 py-1">
                      SAVE {formatPrice(vehicle.savings)}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4 border-t border-gray-200">
                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-light text-black">
                      {formatPrice(vehicle.price)}
                    </span>
                    {vehicle.original_price && vehicle.original_price > vehicle.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(vehicle.original_price)}
                      </span>
                    )}
                  </div>

                  {/* Vehicle Details */}
                  <div>
                    <h4 className="text-lg font-medium text-black">
                      {vehicle.year} {vehicle.brand} {vehicle.model}
                    </h4>
                    {vehicle.variant && (
                      <p className="text-sm text-gray-600 font-light mt-1">{vehicle.variant}</p>
                    )}
                  </div>

                  {/* Specs */}
                  <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Car className="w-4 h-4 text-gray-400" />
                      <span className="font-light">{formatMileage(vehicle.mileage)}</span>
                    </div>
                    {vehicle.fuel_type && (
                      <div className="flex items-center gap-1">
                        <Fuel className="w-4 h-4 text-gray-400" />
                        <span className="font-light">{vehicle.fuel_type}</span>
                      </div>
                    )}
                    {vehicle.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="font-light">{vehicle.location}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-black text-white font-medium text-sm py-3 hover:bg-gray-900 transition-all duration-300">
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Browse All Button */}
          <div className="text-center mt-12">
            <button className="group inline-flex items-center gap-3 bg-black text-white font-medium text-base px-8 py-4 hover:bg-gray-900 transition-all duration-300">
              <span>BROWSE ALL {selectedBrand?.toUpperCase()} VEHICLES</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-black mb-2">No Vehicles Found</h3>
          <p className="text-gray-600 font-light">
            We don't have any {selectedBrand} vehicles available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default VehicleGrid;