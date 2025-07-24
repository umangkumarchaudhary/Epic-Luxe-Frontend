'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, Award, Calendar, Gauge } from 'lucide-react';

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
    image_url: '/assets/images/porsche911.jpg',
    badge: 'Best Deal',
    highlight_color: '#000000',
    condition: 'Excellent',
    location_city: 'Mumbai',
    location_state: 'Maharashtra',
    description: 'Exceptional engineering meets timeless design. Experience the perfect balance of performance and luxury.',
    safety_rating: 5,
    certified_pre_owned: true,
    cta_text: 'View Details',
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
    image_url: '/assets/images/BMWX1.jpg',
    badge: 'Latest',
    highlight_color: '#000000',
    condition: 'Excellent',
    location_city: 'Delhi',
    location_state: 'Delhi',
    description: 'The ultimate driving machine. Precision crafted for those who demand excellence.',
    safety_rating: 5,
    certified_pre_owned: true,
    cta_text: 'Explore',
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
    image_url: '/assets/images/GLA200.avif',
    badge: 'Limited',
    highlight_color: '#000000',
    condition: 'Excellent',
    location_city: 'Bangalore',
    location_state: 'Karnataka',
    description: 'Stunning performance meets sophisticated luxury. German engineering at its finest.',
    safety_rating: 5,
    certified_pre_owned: true,
    cta_text: 'Schedule Visit',
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
    image_url: '/assets/images/AudiA6.avif',
    badge: 'Available',
    highlight_color: '#000000',
    condition: 'Excellent',
    location_city: 'Pune',
    location_state: 'Maharashtra',
    description: 'The perfect fusion of performance and practicality. Everyday usability meets supercar performance.',
    safety_rating: 5,
    certified_pre_owned: true,
    cta_text: 'Contact Now',
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
    image_url: '/assets/images/Lamborghini.jpg',
    badge: 'Rare',
    highlight_color: '#000000',
    condition: 'Excellent',
    location_city: 'Chennai',
    location_state: 'Tamil Nadu',
    description: 'Italian artistry meets cutting-edge technology. A masterpiece of automotive excellence.',
    safety_rating: 4,
    certified_pre_owned: true,
    cta_text: 'Inquire',
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
    image_url: '/assets/images/ferrari.jpg',
    badge: 'Exclusive',
    highlight_color: '#000000',
    condition: 'Excellent',
    location_city: 'Hyderabad',
    location_state: 'Telangana',
    description: 'The prancing horse legacy continues. Legendary performance meets timeless Italian design.',
    safety_rating: 4,
    certified_pre_owned: true,
    cta_text: 'Reserve Now',
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
    <section className="min-h-screen bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e] relative overflow-hidden">
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#BFA980]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pb-12 md:pb-16 pt-8 md:pt-12 space-y-12">
        
        {/* Section Header - Smaller size */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 tracking-wide leading-tight">
            Premium Collection
          </h1>
          <p className="text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Discover exceptional vehicles crafted for discerning enthusiasts
          </p>
        </div>

        {/* Vehicle Thumbnails - No badges */}
        <div className="relative space-y-8">
          <div className="flex justify-center gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {vehicles.map((vehicle, index) => (
              <button
                key={vehicle.id}
                onClick={() => {
                  setSelectedVehicle(index);
                  setIsAutoPlaying(false);
                }}
                className={`relative flex-shrink-0 group transition-all duration-500 ${
                  index === selectedVehicle
                    ? 'scale-110 opacity-100'
                    : 'opacity-50 hover:opacity-80 hover:scale-105'
                }`}
              >
                <div className={`relative w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden border transition-all duration-500 ${
                  index === selectedVehicle
                    ? 'border-[#D4AF37]/60 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e]'
                    : 'border-white/10 bg-[#1a1a1a]/60 hover:border-[#BFA980]/40'
                }`}>
                  <Image
                    src={vehicle.image_url}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Navigation Arrows - Refined */}
          <button
            onClick={() => setSelectedVehicle(selectedVehicle > 0 ? selectedVehicle - 1 : vehicles.length - 1)}
            className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#BFA980]/20 rounded-full items-center justify-center hover:bg-[#1a1a1a] hover:border-[#D4AF37]/40 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-[#BFA980]" />
          </button>
          <button
            onClick={() => setSelectedVehicle(selectedVehicle < vehicles.length - 1 ? selectedVehicle + 1 : 0)}
            className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#BFA980]/20 rounded-full items-center justify-center hover:bg-[#1a1a1a] hover:border-[#D4AF37]/40 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 text-[#BFA980]" />
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Vehicle Details */}
          <div className="order-2 lg:order-1 space-y-8">
            
            {/* Vehicle Title & Rating */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 tracking-wide leading-tight">
                  {currentVehicle.make}
                </h2>
                <h3 className="text-lg md:text-xl text-[#BFA980] font-light">
                  {currentVehicle.model} {currentVehicle.variant}
                </h3>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < currentVehicle.safety_rating 
                          ? 'text-[#D4AF37] fill-current' 
                          : 'text-white/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-white/50 font-light">Safety Rating</span>
              </div>
            </div>

            {/* Price Section - Elegant */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-white/50 font-light">
                <span>Starting from</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-light text-white/90">
                  {formatPrice(currentVehicle.price)}
                </span>
                {currentVehicle.original_price && (
                  <span className="text-lg text-white/40 line-through font-light">
                    {formatPrice(currentVehicle.original_price)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-white/70 font-light leading-relaxed">
              {currentVehicle.description}
            </p>

            {/* Specifications - Clean grid */}
            <div className="bg-gradient-to-br from-[#1a1a1a]/60 to-[#0e0e0e]/60 backdrop-blur-sm border border-[#BFA980]/10 rounded-2xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <Calendar className="w-5 h-5 text-[#BFA980] mx-auto" />
                  <div className="text-xs text-white/50 font-light">Year</div>
                  <div className="text-sm font-medium text-white/80">{currentVehicle.year}</div>
                </div>
                <div className="text-center space-y-2">
                  <Gauge className="w-5 h-5 text-[#BFA980] mx-auto" />
                  <div className="text-xs text-white/50 font-light">Mileage</div>
                  <div className="text-sm font-medium text-white/80">{formatMileage(currentVehicle.mileage)} km</div>
                </div>
                <div className="text-center space-y-2">
                  <Award className="w-5 h-5 text-[#BFA980] mx-auto" />
                  <div className="text-xs text-white/50 font-light">Condition</div>
                  <div className="text-sm font-medium text-white/80">{currentVehicle.condition}</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-5 h-5 rounded-full mx-auto" style={{ 
                    backgroundColor: currentVehicle.exterior_color.toLowerCase() === 'white' ? '#ffffff' :
                                    currentVehicle.exterior_color.toLowerCase() === 'black' ? '#000000' :
                                    currentVehicle.exterior_color.toLowerCase() === 'red' ? '#dc2626' :
                                    currentVehicle.exterior_color.toLowerCase() === 'yellow' ? '#eab308' :
                                    currentVehicle.exterior_color.toLowerCase() === 'grey' || 
                                    currentVehicle.exterior_color.toLowerCase() === 'gray' ? '#6b7280' :
                                    '#BFA980',
                    border: currentVehicle.exterior_color.toLowerCase() === 'white' ? '1px solid #374151' : 'none'
                  }}></div>
                  <div className="text-xs text-white/50 font-light">Color</div>
                  <div className="text-sm font-medium text-white/80">{currentVehicle.exterior_color}</div>
                </div>
              </div>
            </div>

            {/* Single CTA Button */}
            <div className="space-y-4">
              <button className="w-full md:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] font-medium hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300 transform hover:scale-105">
                <span>{currentVehicle.cta_text}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              {/* Secondary action as text link */}
              <div className="text-center md:text-left">
                <button className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300 text-sm font-light underline underline-offset-4">
                  Schedule test drive
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Vehicle Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/3] md:aspect-[3/2] bg-gradient-to-br from-[#1a1a1a]/40 to-[#0e0e0e]/40 backdrop-blur-sm border border-[#BFA980]/10 rounded-3xl overflow-hidden">
              <Image
                src={currentVehicle.image_url}
                alt={`${currentVehicle.make} ${currentVehicle.model}`}
                fill
                className="object-contain p-8 transition-all duration-700 drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Subtle shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Dots */}
        <div className="flex justify-center gap-2 pt-8">
          {vehicles.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedVehicle(index);
                setIsAutoPlaying(false);
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === selectedVehicle 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] w-8' 
                  : 'bg-white/20 hover:bg-white/40 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedInventory;
