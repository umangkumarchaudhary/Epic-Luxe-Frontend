import React from 'react';
import BrandSelector from './BrandSelector';
import VehicleGrid from './VehicleGrid';

interface Brand {
  name: string;
  logo: string;
  count: number;
  gradient: string;
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
      cache: 'no-store', // or 'force-cache' for static generation
    });
    const data = await response.json();
    return data.success ? data.vehicles : [];
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
}

// Server Component - SEO-friendly
const BrowseBySection = async () => {
  const vehicles = await getVehiclesData();
  
  const brandConfigs: Brand[] = [
    { name: 'Mercedes-Benz', logo: '/assets/arya_assets/mercedeslogo.png', count: 0, gradient: 'from-gray-800 to-gray-900' },
    { name: 'BMW', logo: '/assets/arya_assets/bmwlogo.png', count: 0, gradient: 'from-blue-900 to-blue-800' },
    { name: 'Audi', logo: '/assets/arya_assets/audilogo.png', count: 0, gradient: 'from-red-900 to-red-800' },
    { name: 'Porsche', logo: '/assets/arya_assets/porschelogo.png', count: 0, gradient: 'from-yellow-800 to-yellow-700' },
    { name: 'Jaguar', logo: '/assets/arya_assets/jaguarlogo.png', count: 0, gradient: 'from-green-900 to-green-800' },
    { name: 'Land Rover', logo: '/assets/arya_assets/landroverlogo.png', count: 0, gradient: 'from-emerald-900 to-emerald-800' }
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
    <section className="bg-black py-16 px-4 font-[Inter]">
      <div className="max-w-7xl mx-auto">
        {/* Static Section Header - SEO-friendly */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Browse By <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F4E076]">Brand</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover premium pre-owned vehicles from the world's most prestigious automotive brands
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#F4E076] mx-auto mt-6 shadow-lg shadow-[#D4AF37]/30"></div>
        </div>

        {/* Static Brand Logos - SEO-friendly */}
        

        {/* Client Component for Interactivity */}
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

        {/* No Vehicles Fallback - SEO-friendly */}
        {availableBrands.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-white mb-2">No Vehicles Available</h3>
            <p className="text-gray-400">
              We're currently updating our inventory. Please check back soon.
            </p>
          </div>
        )}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-400 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default BrowseBySection;