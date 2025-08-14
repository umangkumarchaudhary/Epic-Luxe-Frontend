'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

  // Update vehicles function wrapped with useCallback to avoid useEffect warning
  const updateVehicles = useCallback(async (brandName: string) => {
    setLoading(true);
    try {
      const brandVehicles = vehiclesByBrand[brandName.toLowerCase()] || [];
      const limitedVehicles = brandVehicles.slice(0, 3);

      // Fetch images for each vehicle
      const vehiclesWithImages = await Promise.all(
        limitedVehicles.map(async (vehicle: Vehicle) => {
          try {
            const imageResponse = await fetch(`http://localhost:5000/admin/vehicle/${vehicle.id}`);
            const imageData = await imageResponse.json();

            return {
              ...vehicle,
              image_url: imageData.images?.[0]?.image_url || '/placeholder.png'
            };
          } catch {
            return {
              ...vehicle,
              image_url: '/placeholder.png'
            };
          }
        })
      );

      setVehicles(vehiclesWithImages);
    } catch {
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  }, [vehiclesByBrand]);

  // Listen for brand selection events
  useEffect(() => {
    const handleBrandSelection = (event: CustomEvent) => {
      const brandName = event.detail.brandName;
      setSelectedBrand(brandName);
      updateVehicles(brandName);
    };

    window.addEventListener('brandSelected', handleBrandSelection as EventListener);

    // Initialize with default brand
    if (defaultBrand) {
      updateVehicles(defaultBrand);
    }

    return () => {
      window.removeEventListener('brandSelected', handleBrandSelection as EventListener);
    };
  }, [defaultBrand, updateVehicles]);

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
    return mileage.replace(/\s*km\s*$/i, '') + 'k km';
  };

  if (!selectedBrand) return null;

  return (
    <div className="space-y-8">
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-700 border-t-[#D4AF37] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Car className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>
        </div>
      ) : vehicles.length > 0 ? (
        <>
          <div
            className={`flex justify-center gap-6 ${
              vehicles.length === 1 ? 'max-w-xs mx-auto' :
              vehicles.length === 2 ? 'max-w-2xl mx-auto' :
              'max-w-4xl mx-auto'
            }`}
          >
            {vehicles.map((vehicle) => {
              const premiumBadges = [
                { text: 'Curated Selection', gradient: 'from-[#D4AF37] to-[#F4E076]' },
                { text: 'Premium Certified', gradient: 'from-purple-600 to-indigo-500' },
                { text: 'Elite Collection', gradient: 'from-rose-600 to-pink-500' },
                { text: 'Verified Premium', gradient: 'from-emerald-600 to-teal-500' },
                { text: 'Signature Series', gradient: 'from-[#D4AF37] to-[#B8941F]' },
                { text: 'Luxury Approved', gradient: 'from-violet-600 to-purple-500' }
              ];
              const randomBadge = premiumBadges[Math.floor(Math.random() * premiumBadges.length)];

              return (
                <div
                  key={vehicle.id}
                  className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-500 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-white/10 w-80"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={vehicle.image_url || '/placeholder.png'}
                      alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}${vehicle.variant ? ` ${vehicle.variant}` : ''}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    <div className={`absolute top-3 left-3 bg-gradient-to-r ${randomBadge.gradient} text-white text-xs font-semibold px-2 py-1 rounded-md shadow-lg`}>
                      {randomBadge.text}
                    </div>

                    {vehicle.savings && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-lg">
                        Save {formatPrice(vehicle.savings)}
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-white">
                          {formatPrice(vehicle.price)}
                        </span>
                        {vehicle.original_price && vehicle.original_price > vehicle.price && (
                          <span className="text-sm text-gray-300 line-through">
                            {formatPrice(vehicle.original_price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {vehicle.year} {vehicle.brand} {vehicle.model}
                      </h4>
                      {vehicle.variant && (
                        <p className="text-sm text-gray-400 font-medium">{vehicle.variant}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Car className="w-4 h-4 text-gray-500" />
                        <span>{formatMileage(vehicle.mileage)}</span>
                      </div>
                      {vehicle.fuel_type && (
                        <div className="flex items-center gap-1">
                          <Fuel className="w-4 h-4 text-gray-500" />
                          <span>{vehicle.fuel_type}</span>
                        </div>
                      )}
                      {vehicle.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{vehicle.location}</span>
                        </div>
                      )}
                    </div>

                    <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4E076] text-black font-semibold text-sm py-2 rounded-lg hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#D4AF37]/20">
                      View Details
                    </button>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent rounded-2xl"></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#F4E076] text-black font-bold text-lg px-8 py-4 rounded-full hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/30">
              <span>Browse All {selectedBrand} Vehicles</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4E076] blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Vehicles Found</h3>
          <p className="text-gray-400">
            We don&apos;t have any {selectedBrand} vehicles available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default VehicleGrid;
