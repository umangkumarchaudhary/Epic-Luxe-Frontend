'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Gauge, 
  MapPin, 
  Car,
  ArrowRight,
  Heart,
  Sparkles
} from 'lucide-react';

interface Vehicle {
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
  location?: string;
  condition?: string;
  ownership?: string;
  image_url: string;
  slug: string;
  views?: number;
  published: boolean;
  featured: boolean;
  created_at: string;
}

interface RecommendedVehiclesClientProps {
  currentVehicleId: number;
  currentBrand?: string;
  currentFuelType?: string;
  currentTransmission?: string;
  currentPriceRange?: { min: number; max: number };
}

const formatPrice = (price: number): string => {
  return price ? `₹${(price / 100000).toFixed(1)} Lakh` : '--';
};

const formatMileage = (mileage: string | undefined): string => {
  if (!mileage) return 'N/A';
  const numMileage = parseFloat(mileage);
  return isNaN(numMileage) ? mileage : `${numMileage.toLocaleString()} km`;
};

export function RecommendedVehiclesClient({ 
  currentVehicleId,
  currentBrand,
  currentFuelType,
  currentTransmission,
  currentPriceRange
}: RecommendedVehiclesClientProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedVehicles, setLikedVehicles] = useState<Set<number>>(new Set());
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch recommended vehicles
  React.useEffect(() => {
    const fetchRecommendedVehicles = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_HERO_URL || 'http://localhost:5000/admin';
      
      try {
        setLoading(true);
        setError(null);

        // Build API parameters
        const params = new URLSearchParams({
          exclude: currentVehicleId.toString(),
          limit: '6',
          published: 'true'
        });

        // Add filters for better recommendations
        if (currentBrand) {
          params.append('brand', currentBrand);
        }
        if (currentFuelType) {
          params.append('fuel_type', currentFuelType);
        }
        if (currentTransmission) {
          params.append('transmission', currentTransmission);
        }
        if (currentPriceRange) {
          params.append('price_min', currentPriceRange.min.toString());
          params.append('price_max', currentPriceRange.max.toString());
        }
        const response = await fetch(
          `${baseUrl}/vehicles/recommended?${params.toString()}`,
          { cache: 'no-store' }
        );

        if (!response.ok) {
          // Fallback to general featured vehicles if recommendation API fails
          const fallbackResponse = await fetch(
            `${baseUrl}/vehicles/featured?limit=6`,
            { cache: 'no-store' }
          );
          
          if (!fallbackResponse.ok) {
            throw new Error('Failed to fetch fallback vehicles');
          }
          
          const fallbackData = await fallbackResponse.json();
          if (fallbackData.success && fallbackData.vehicles) {
            // Filter out current vehicle from fallback results
            const filteredVehicles = fallbackData.vehicles
              .filter((vehicle: Vehicle) => vehicle.id !== currentVehicleId)
              .slice(0, 6);
            setVehicles(filteredVehicles);
          } else {
            setVehicles([]);
          }
          return;
        }

        const data = await response.json();
        if (data.success && data.vehicles) {
          setVehicles(data.vehicles);
        } else {
          setVehicles([]);
        }
      } catch (error) {
        console.error('Error fetching recommended vehicles:', error);
        setError('Failed to load recommendations');
        
        // Final fallback: try to get any published vehicles
        try {
          const fallbackResponse = await fetch(
            `${baseUrl}/vehicles?published=true&limit=6`,
            { cache: 'no-store' }
          );
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            if (fallbackData.success && fallbackData.vehicles) {
              const filteredVehicles = fallbackData.vehicles
                .filter((vehicle: Vehicle) => vehicle.id !== currentVehicleId)
                .slice(0, 6);
              setVehicles(filteredVehicles);
              setError(null);
            }
          }
        } catch (fallbackError) {
          console.error('Error in fallback fetch:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedVehicles();
  }, [currentVehicleId, currentBrand, currentFuelType, currentTransmission, currentPriceRange]);

  if (loading) {
    return (
      <section className="py-16 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-700 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-white mb-2 font-manrope">Loading Recommendations</h3>
            <p className="text-gray-400 font-manrope">Finding vehicles you might like...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error && vehicles.length === 0) {
    return (
      <section className="py-16 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Car size={32} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-manrope">Unable to Load Recommendations</h3>
            <p className="text-gray-400 font-manrope">Please try refreshing the page or check back later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <section className="py-16 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Car size={32} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-manrope">No Recommendations Available</h3>
            <p className="text-gray-400 font-manrope">We&apos;re currently updating our inventory. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  const handleVehicleClick = (slug: string) => {
    router.push(`/luxe/buy-used-cars/${slug}`);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 3 >= vehicles.length ? 0 : prev + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - 3 < 0 ? Math.max(0, vehicles.length - 3) : prev - 3
    );
  };

  const toggleLike = (vehicleId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedVehicles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(vehicleId)) {
        newSet.delete(vehicleId);
      } else {
        newSet.add(vehicleId);
      }
      return newSet;
    });
  };

  const visibleVehicles = vehicles.slice(currentIndex, currentIndex + 3);
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex + 3 < vehicles.length;

  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-[#D4AF37]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-manrope">
              Recommended For You
            </h2>
            <Sparkles className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-manrope">
            Discover similar premium vehicles that match your preferences and style
          </p>
        </div>

        {/* Desktop Navigation */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={prevSlide}
              className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full items-center justify-center border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-[#D4AF37]" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={nextSlide}
              className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full items-center justify-center border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-[#D4AF37]" />
            </button>
          )}

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => handleVehicleClick(vehicle.slug)}
                className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-[#D4AF37]/50 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={vehicle.image_url || '/placeholder-car.jpg'}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Like Button */}
                  <button
                    onClick={(e) => toggleLike(vehicle.id, e)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-110 ${ 
                      likedVehicles.has(vehicle.id)
                        ? 'bg-red-500/20 border-red-400 text-red-400'
                        : 'bg-black/40 border-gray-600 text-gray-400 hover:border-red-400 hover:text-red-400'
                    }`}
                  >
                    <Heart 
                      size={18} 
                      fill={likedVehicles.has(vehicle.id) ? 'currentColor' : 'none'} 
                      className="mx-auto" 
                    />
                  </button>

                  {/* Savings Badge */}
                  {vehicle.savings && (
                    <div className="absolute top-4 left-4 bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-sm font-semibold font-manrope">
                      Save ₹{vehicle.savings.toLocaleString()}
                    </div>
                  )}

                  {/* Featured Badge */}
                  {vehicle.featured && (
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20 border border-[#D4AF37]/30 text-[#D4AF37] px-3 py-1 rounded-full text-sm font-semibold font-manrope">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Title & Location */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1 font-manrope group-hover:text-[#D4AF37] transition-colors">
                      {vehicle.year} {vehicle.brand} {vehicle.model}
                      {vehicle.variant && (
                        <span className="text-lg font-medium text-gray-400 ml-2">
                          {vehicle.variant}
                        </span>
                      )}
                    </h3>
                    {vehicle.location && (
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPin size={14} />
                        <span className="text-sm font-manrope">{vehicle.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {vehicle.mileage && (
                      <div className="flex items-center gap-2">
                        <Gauge size={16} className="text-[#D4AF37]" />
                        <span className="text-sm text-gray-400 font-manrope">{formatMileage(vehicle.mileage)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#D4AF37]" />
                      <span className="text-sm text-gray-400 font-manrope">{vehicle.year}</span>
                    </div>
                    {vehicle.fuel_type && (
                      <div className="text-sm text-gray-400 font-manrope">
                        {vehicle.fuel_type}
                      </div>
                    )}
                    {vehicle.transmission && (
                      <div className="text-sm text-gray-400 font-manrope">
                        {vehicle.transmission}
                      </div>
                    )}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white font-manrope">
                          {formatPrice(vehicle.price)}
                        </span>
                        {vehicle.original_price && (
                          <span className="text-sm text-gray-500 line-through font-manrope">
                            {formatPrice(vehicle.original_price)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all duration-300 group-hover:scale-105 font-manrope">
                      View Details
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="lg:hidden flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(vehicles.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${ 
                  Math.floor(currentIndex / 3) === index
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => router.push('/luxe/buy-used-cars')}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 font-manrope"
            >
              <span>Explore All Vehicles</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}