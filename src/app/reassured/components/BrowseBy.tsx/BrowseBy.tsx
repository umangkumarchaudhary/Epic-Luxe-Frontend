import React from 'react';
import BrandSelector from './BrandSelector';
import VehicleGrid from './VehicleGrid';

interface Brand {
  name: string;
  logo: string;
  count: number;
}

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

// Server-side data fetching
async function getVehiclesData() {
  try {
    const response = await fetch('http://localhost:5000/admin/vehicles/published', {
      cache: 'no-store',
    });
    const data = await response.json();
    return data.success ? data.vehicles : [];
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
}

const BrowseBySection = async () => {
  const vehicles = await getVehiclesData();
  
  const brandConfigs: Brand[] = [
    { name: 'Mercedes-Benz', logo: '/assets/arya_assets/mercedeslogo.png', count: 0 },
    { name: 'BMW', logo: '/assets/arya_assets/bmwlogo.png', count: 0 },
    { name: 'Audi', logo: '/assets/arya_assets/audilogo.png', count: 0 },
    { name: 'Porsche', logo: '/assets/arya_assets/porschelogo.png', count: 0 },
    { name: 'Jaguar', logo: '/assets/arya_assets/jaguarlogo.png', count: 0 },
    { name: 'Land Rover', logo: '/assets/arya_assets/landroverlogo.png', count: 0 }
  ];

  // Calculate brand counts server-side
  const brandsWithCounts = brandConfigs.map(brand => ({
    ...brand,
    count: vehicles.filter((vehicle: Vehicle) => 
      vehicle.brand.toLowerCase() === brand.name.toLowerCase()
    ).length
  }));

  const availableBrands = brandsWithCounts.filter(brand => brand.count > 0);
  const defaultBrand = availableBrands[0]?.name || null;

  // Group vehicles by brand server-side
  const vehiclesByBrand = vehicles.reduce((acc: Record<string, Vehicle[]>, vehicle: Vehicle) => {
    const brandName = vehicle.brand.toLowerCase();
    if (!acc[brandName]) {
      acc[brandName] = [];
    }
    acc[brandName].push(vehicle);
    return acc;
  }, {});

  return (
    <section className="bg-white py-16 px-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
            Browse By Brand
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
            Discover premium pre-owned vehicles from the world&apos;s most prestigious automotive brands
          </p>
          <div className="w-24 h-0.5 bg-black mx-auto mt-6"></div>
        </div>

        {/* Brand Selector and Vehicle Grid */}
        {availableBrands.length > 0 && (
          <>
            <BrandSelector 
              brands={availableBrands}
              defaultBrand={defaultBrand}
            />
            <VehicleGrid 
              vehiclesByBrand={vehiclesByBrand}
              defaultBrand={defaultBrand}
            />
          </>
        )}

        {/* No Vehicles Fallback */}
        {availableBrands.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-black mb-2">No Vehicles Available</h3>
            <p className="text-gray-600 font-light">
              We&apos;re currently updating our inventory. Please check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseBySection;