'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  original_price?: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  exterior_color: string;
  engine_capacity: number;
  image_url: string;
  badge?: string;
  highlight_color?: string;
  condition: string;
  location_city: string;
  location_state: string;
  description: string;
  safety_rating: number;
  certified_pre_owned: boolean;
  cta_text: string;
  dealer_name: string;
  ownership: string;
}

const vehicles: Vehicle[] = [
  {
    id: '1',
    title: 'Featured: Porsche 911 Carrera',
    make: 'Porsche',
    model: '911',
    variant: 'Carrera',
    year: 2017,
    price: 8940000,
    original_price: 9500000,
    mileage: 18300,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    exterior_color: 'Yellow',
    engine_capacity: 3000,
    image_url: '/assets/images/1.png',
    badge: 'Best Deal',
    highlight_color: '#000000',
    condition: 'Excellent',
    location_city: 'Mumbai',
    location_state: 'Maharashtra',
    description:
      'Exceptional engineering meets timeless design. Experience the perfect balance of performance and luxury.',
    safety_rating: 5,
    certified_pre_owned: true,
    cta_text: 'Learn More',
    dealer_name: 'Premium Motors',
    ownership: 'First Owner',
  },
  {
    id: '2',
    title: 'Featured: BMW M3 Competition',
    make: 'BMW',
    model: 'M3',
    variant: 'Competition',
    year: 2022,
    price: 12500000,
    original_price: 13200000,
    mileage: 8500,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    exterior_color: 'Alpine White',
    engine_capacity: 3000,
    image_url: '/assets/images/2.png',
    badge: 'New',
    highlight_color: '#000000',
    condition: 'Excellent',
    location_city: 'Delhi',
    location_state: 'Delhi',
    description:
      'The ultimate driving machine. Precision crafted for those who demand excellence.',
    safety_rating: 5,
    certified_pre_owned: true,
    cta_text: 'View Details',
    dealer_name: 'Luxury Cars Delhi',
    ownership: 'First Owner',
  },
  {
    id: '3',
    title: 'Featured: Mercedes-AMG GT',
    make: 'Mercedes-Benz',
    model: 'AMG GT',
    variant: 'S',
    year: 2021,
    price: 18500000,
    original_price: 19800000,
    mileage: 12000,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    exterior_color: 'Obsidian Black',
    engine_capacity: 4000,
    image_url: '/assets/images/3.png',
    badge: 'Limited',
    highlight_color: '#000000',
    condition: 'Excellent',
    location_city: 'Bangalore',
    location_state: 'Karnataka',
    description:
      'Stunning performance meets sophisticated luxury. German engineering at its finest.',
    safety_rating: 5,
    certified_pre_owned: true,
    cta_text: 'Explore',
    dealer_name: 'AMG Bangalore',
    ownership: 'First Owner',
  },
  {
    id: '4',
    title: 'Featured: Audi RS6 Avant',
    make: 'Audi',
    model: 'RS6',
    variant: 'Avant',
    year: 2023,
    price: 15800000,
    original_price: 16500000,
    mileage: 5200,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    exterior_color: 'Nardo Grey',
    engine_capacity: 4000,
    image_url: '/assets/images/4.png',
    badge: 'Available',
    highlight_color: '#000000',
    condition: 'Excellent',
    location_city: 'Pune',
    location_state: 'Maharashtra',
    description:
      'The perfect fusion of performance and practicality. Everyday usability meets supercar performance.',
    safety_rating: 5,
    certified_pre_owned: true,
    cta_text: 'Schedule Visit',
    dealer_name: 'Audi Pune',
    ownership: 'First Owner',
  },
  {
    id: '5',
    title: 'Featured: Lamborghini Huracan',
    make: 'Lamborghini',
    model: 'Huracan',
    variant: 'EVO',
    year: 2020,
    price: 28500000,
    original_price: 32000000,
    mileage: 6800,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    exterior_color: 'Arancio Borealis',
    engine_capacity: 5200,
    image_url: '/assets/images/5.png',
    badge: 'Rare',
    highlight_color: '#000000',
    condition: 'Excellent',
    location_city: 'Chennai',
    location_state: 'Tamil Nadu',
    description:
      'Italian artistry meets cutting-edge technology. A masterpiece of automotive excellence.',
    safety_rating: 4,
    certified_pre_owned: true,
    cta_text: 'Contact Us',
    dealer_name: 'Exotic Cars Chennai',
    ownership: 'First Owner',
  },
  {
    id: '6',
    title: 'Featured: Ferrari 488 GTB',
    make: 'Ferrari',
    model: '488',
    variant: 'GTB',
    year: 2019,
    price: 35000000,
    original_price: 38500000,
    mileage: 4200,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    exterior_color: 'Rosso Corsa',
    engine_capacity: 3900,
    image_url: '/assets/images/1.png',
    badge: 'Exclusive',
    highlight_color: '#000000',
    condition: 'Excellent',
    location_city: 'Hyderabad',
    location_state: 'Telangana',
    description:
      'The prancing horse legacy continues. Legendary performance meets timeless Italian design.',
    safety_rating: 4,
    certified_pre_owned: true,
    cta_text: 'Inquire',
    dealer_name: 'Ferrari Hyderabad',
    ownership: 'First Owner',
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const formatMileage = (miles: number) => {
  return new Intl.NumberFormat('en-IN').format(miles);
};

const FeaturedInventory: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setSelectedVehicle((prev) => (prev + 1) % vehicles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentVehicle = vehicles[selectedVehicle];

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text mb-6 sm:mb-8 lg:mb-12 tracking-wide leading-tight">
            SPECIAL OFFERS
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of exceptional luxury vehicles
          </p>
        </div>

        {/* Vehicle Thumbnails Row */}
        <div className="relative mb-8 sm:mb-12 lg:mb-16">
          <div className="flex justify-center gap-2 sm:gap-4 lg:gap-6 overflow-x-auto pb-4 px-2 sm:px-4 scrollbar-hide">
            {vehicles.map((vehicle, index) => (
              <button
                key={vehicle.id}
                onClick={() => {
                  setSelectedVehicle(index);
                  setIsAutoPlaying(false);
                }}
                className={`relative flex-shrink-0 w-20 h-12 sm:w-24 sm:h-16 md:w-28 md:h-18 lg:w-32 lg:h-20 rounded-lg overflow-hidden transition-all duration-700 ease-out ${
                  index === selectedVehicle
                    ? 'scale-110 opacity-100 z-10 border-2 border-[#d4af37] shadow-lg shadow-[#d4af37]/30'
                    : 'opacity-60 hover:opacity-80 hover:scale-105 border border-gray-700 hover:border-[#f1c85c]/50'
                }`}
              >
                <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
                  <Image
                    src={vehicle.image_url}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                {vehicle.badge && (
                  <div className="absolute -top-1 -right-1 sm:top-1 sm:right-1 px-1 py-0.5 sm:px-2 sm:py-1 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black text-xs font-bold rounded-full backdrop-blur-sm">
                    {vehicle.badge}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setSelectedVehicle(selectedVehicle > 0 ? selectedVehicle - 1 : vehicles.length - 1)}
            className="hidden sm:flex absolute left-0 lg:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-black/80 backdrop-blur-sm border border-[#d4af37]/30 shadow-lg rounded-full items-center justify-center hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#f1c85c] hover:text-black transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-[#d4af37]" />
          </button>
          <button
            onClick={() => setSelectedVehicle(selectedVehicle < vehicles.length - 1 ? selectedVehicle + 1 : 0)}
            className="hidden sm:flex absolute right-0 lg:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-black/80 backdrop-blur-sm border border-[#d4af37]/30 shadow-lg rounded-full items-center justify-center hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#f1c85c] hover:text-black transition-all duration-300 z-10"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-[#d4af37]" />
          </button>
        </div>

        {/* Main Content - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left Side - Vehicle Details */}
          <div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
            {/* Vehicle Title */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide leading-tight">
                {currentVehicle.make.toUpperCase()} <span className="bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text">MODELS</span>
              </h2>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        i < currentVehicle.safety_rating ? 'text-[#d4af37] fill-current' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-400 font-light">Safety Rating</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm text-gray-400 font-light">Starting from</span>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text">
                    {formatPrice(currentVehicle.price)}
                  </span>
                  {currentVehicle.original_price && (
                    <span className="text-sm sm:text-base text-gray-500 line-through font-light">
                      {formatPrice(currentVehicle.original_price)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-light leading-relaxed">
              {currentVehicle.description}
            </p>

            {/* Specifications */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pt-4 sm:pt-6">
              {[
                { label: 'Condition', value: currentVehicle.condition },
                { label: 'Year', value: currentVehicle.year },
                { label: 'Transmission', value: currentVehicle.transmission },
                { label: 'Color', value: currentVehicle.exterior_color },
                { label: 'Mileage', value: `${formatMileage(currentVehicle.mileage)} km` },
              ].map((spec, index) => (
                <div key={index} className="text-center p-3 bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-700/50">
                  <div className="text-xs sm:text-sm text-gray-400 font-light mb-1">{spec.label}</div>
                  <div className="text-sm sm:text-base font-medium text-white">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6 sm:pt-8">
              <button className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-full hover:from-[#f1c85c] hover:to-[#d4af37] transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                {currentVehicle.cta_text}
              </button>
            </div>
          </div>

          {/* Right Side - Large Vehicle Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl backdrop-blur-sm border border-gray-700/30">
              <Image
                src={currentVehicle.image_url}
                alt={`${currentVehicle.make} ${currentVehicle.model}`}
                fill
                className="object-contain transition-all duration-700 drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d4af37]/10 to-[#f1c85c]/10 opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Dots */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-12 sm:mt-16 lg:mt-20">
          {vehicles.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedVehicle(index);
                setIsAutoPlaying(false);
              }}
              className={`h-2 sm:h-3 rounded-full transition-all duration-500 ${
                index === selectedVehicle 
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#f1c85c] w-6 sm:w-8 shadow-lg' 
                  : 'bg-gray-600 hover:bg-gray-500 w-2 sm:w-3'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              background: `linear-gradient(45deg, #d4af37, #f1c85c)`,
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              boxShadow: '0 0 6px rgba(212, 175, 55, 0.3)'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedInventory;
