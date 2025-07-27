'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Award, 
  Calendar, 
  Gauge,
  MapPin,
  Eye,
  Sparkles
} from 'lucide-react';

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
    exterior_color: 'Racing Yellow',
    engine_capacity: 3000,
    image_url: '/assets/images/porsche911.jpg',
    badge: 'Best Deal',
    highlight_color: '#FFD700',
    condition: 'Excellent',
    location_city: 'Mumbai',
    location_state: 'Maharashtra',
    description: 'Exceptional engineering meets timeless design. Experience the perfect balance of performance and luxury in this iconic sports car.',
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
    highlight_color: '#00D4FF',
    condition: 'Excellent',
    location_city: 'Delhi',
    location_state: 'Delhi',
    description: 'The ultimate driving machine. Precision crafted for those who demand excellence and uncompromising performance.',
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
    highlight_color: '#C41E3A',
    condition: 'Excellent',
    location_city: 'Bangalore',
    location_state: 'Karnataka',
    description: 'Stunning performance meets sophisticated luxury. German engineering at its finest with unparalleled driving dynamics.',
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
    highlight_color: '#FF6B35',
    condition: 'Excellent',
    location_city: 'Pune',
    location_state: 'Maharashtra',
    description: 'The perfect fusion of performance and practicality. Everyday usability meets supercar performance in this masterpiece.',
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
    highlight_color: '#FFA500',
    condition: 'Excellent',
    location_city: 'Chennai',
    location_state: 'Tamil Nadu',
    description: 'Italian artistry meets cutting-edge technology. A masterpiece of automotive excellence with breathtaking performance.',
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
    highlight_color: '#DC143C',
    condition: 'Excellent',
    location_city: 'Hyderabad',
    location_state: 'Telangana',
    description: 'The prancing horse legacy continues. Legendary performance meets timeless Italian design in this automotive icon.',
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

const getColorHex = (colorName: string) => {
  const colorMap: Record<string, string> = {
    'racing yellow': '#FFD700',
    'yellow': '#FFD700',
    'alpine white': '#F8F8FF',
    'white': '#FFFFFF',
    'obsidian black': '#0B0B0B',
    'black': '#000000',
    'nardo grey': '#6C7B7F',
    'grey': '#808080',
    'gray': '#808080',
    'arancio borealis': '#FFA500',
    'orange': '#FFA500',
    'rosso corsa': '#DC143C',
    'red': '#DC2626',
  };
  return colorMap[colorName.toLowerCase()] || '#BFA980';
};

const FeaturedInventory: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const interval = setInterval(() => {
      setSelectedVehicle((prev) => (prev + 1) % vehicles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered]);

  const currentVehicle = vehicles[selectedVehicle];

  const navigateVehicle = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    if (direction === 'prev') {
      setSelectedVehicle(selectedVehicle > 0 ? selectedVehicle - 1 : vehicles.length - 1);
    } else {
      setSelectedVehicle(selectedVehicle < vehicles.length - 1 ? selectedVehicle + 1 : 0);
    }
  };

  const getBadgeStyle = (badge: string) => {
    const styles: Record<string, string> = {
      'Best Deal': 'bg-gradient-to-r from-green-500 to-emerald-600',
      'Latest': 'bg-gradient-to-r from-blue-500 to-cyan-600',
      'Limited': 'bg-gradient-to-r from-purple-500 to-violet-600',
      'Available': 'bg-gradient-to-r from-orange-500 to-amber-600',
      'Rare': 'bg-gradient-to-r from-pink-500 to-rose-600',
      'Exclusive': 'bg-gradient-to-r from-red-500 to-red-600',
    };
    return styles[badge] || 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-yellow-600/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-yellow-500/3 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-20 bg-noise"></div>

      <div 
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-white mb-6 tracking-tight">
            Premium
            <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent font-light">
              Featured Inventory
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Discover exceptional vehicles crafted for discerning enthusiasts who demand nothing but perfection
          </p>
        </motion.div>

        {/* Vehicle Thumbnails - Top Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex justify-center gap-4 overflow-x-auto pb-4 px-4">
            {vehicles.map((vehicle, index) => (
              <motion.button
  key={vehicle.id}
  onClick={() => {
    setSelectedVehicle(index);
    setIsAutoPlaying(false);
  }}
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.95 }}
  className={`relative flex-shrink-0 group transition-all duration-500 flex flex-col items-center ${
    index === selectedVehicle
      ? 'scale-110'
      : 'opacity-60 hover:opacity-100'
  }`}
>
  {/* Image Box */}
  <div className={`relative w-28 h-20 md:w-36 md:h-24 rounded-xl overflow-hidden border transition-all duration-500 ${
    index === selectedVehicle
      ? 'border-yellow-500/60 bg-gradient-to-br from-white/10 to-white/5 shadow-lg shadow-yellow-500/20'
      : 'border-white/10 bg-white/5 hover:border-yellow-500/30 hover:bg-white/10'
  }`}>
    <Image
      src={vehicle.image_url}
      alt={`${vehicle.make} ${vehicle.model}`}
      fill
      className="object-contain p-3"
      sizes="(max-width: 768px) 100vw, 33vw"
    />

    {index === selectedVehicle && (
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 via-transparent to-transparent"></div>
    )}

    {vehicle.badge && (
      <div className="absolute -top-2 -right-2">
        <div className={`px-2 py-1 rounded-lg ${getBadgeStyle(vehicle.badge)} text-white text-xs font-medium shadow-md`}></div>
      </div>
    )}

    {index === selectedVehicle && (
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"></div>
    )}
  </div>

  {/* Vehicle Name Below */}
  <div className="mt-2 text-center leading-tight">
    <div className={`text-sm font-medium ${
      index === selectedVehicle ? 'text-yellow-500' : 'text-gray-400'
    }`}>
      {vehicle.make}
    </div>
    <div className="text-xs text-gray-500">
      {vehicle.model}
    </div>
  </div>
</motion.button>

            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">
          
          {/* Vehicle Image - Hero Section */}
          <motion.div 
            className="order-2 lg:order-1 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedVehicle}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentVehicle.image_url}
                    alt={`${currentVehicle.make} ${currentVehicle.model}`}
                    fill
                    className="object-contain p-8 drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              
              {/* Badge */}
              {currentVehicle.badge && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute top-6 left-6"
                >
                  <div className={`px-4 py-2 rounded-full ${getBadgeStyle(currentVehicle.badge)} text-white text-sm font-medium shadow-lg backdrop-blur-sm`}>
                    {currentVehicle.badge}
                  </div>
                </motion.div>
              )}

              {/* Navigation Arrows */}
              <button
                onClick={() => navigateVehicle('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/40 hover:border-yellow-500/30 transition-all duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 text-white group-hover:text-yellow-500 transition-colors" />
              </button>
              <button
                onClick={() => navigateVehicle('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/40 hover:border-yellow-500/30 transition-all duration-300 group"
              >
                <ChevronRight className="w-5 h-5 text-white group-hover:text-yellow-500 transition-colors" />
              </button>
            </div>
          </motion.div>

          {/* Vehicle Details */}
          <motion.div 
            className="order-1 lg:order-2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            
            {/* Vehicle Title & Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedVehicle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin text-white tracking-tight">
                    {currentVehicle.make}
                  </h2>
                  <h3 className="text-xl md:text-2xl text-yellow-500 font-light">
                    {currentVehicle.model} {currentVehicle.variant}
                  </h3>
                </div>
                
                {/* Location & Dealer */}
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{currentVehicle.location_city}, {currentVehicle.location_state}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                  <span className="text-sm">{currentVehicle.dealer_name}</span>
                </div>

                {/* Safety Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < currentVehicle.safety_rating 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">Safety Rating</span>
                  {currentVehicle.certified_pre_owned && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                      <span className="text-sm text-green-400">Certified Pre-Owned</span>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Price Section */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-400 font-light">
                <span>Starting from</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-light text-white">
                  {formatPrice(currentVehicle.price)}
                </span>
                {currentVehicle.original_price && (
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-gray-500 line-through font-light">
                      {formatPrice(currentVehicle.original_price)}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-400 text-xs font-medium">
                      SAVE {Math.round(((currentVehicle.original_price - currentVehicle.price) / currentVehicle.original_price) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <p className="text-gray-300 font-light leading-relaxed">
              {currentVehicle.description}
            </p>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Calendar, label: 'Year', value: currentVehicle.year },
                { icon: Gauge, label: 'Mileage', value: `${formatMileage(currentVehicle.mileage)} km` },
                { icon: Award, label: 'Condition', value: currentVehicle.condition },
                { icon: Eye, label: 'Color', value: currentVehicle.exterior_color },
              ].map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-yellow-500/30 transition-all duration-300"
                >
                  <spec.icon className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
                  <div className="text-xs text-gray-400 mb-1">{spec.label}</div>
                  <div className="text-sm font-medium text-white flex items-center justify-center gap-2">
                    {spec.label === 'Color' && (
                      <div 
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: getColorHex(currentVehicle.exterior_color) }}
                      />
                    )}
                    {spec.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {currentVehicle.cta_text}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-xl border border-white/20 text-white hover:border-yellow-500/50 hover:bg-white/5 transition-all duration-300"
              >
                Schedule Test Drive
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Dot Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-2"
        >
          {vehicles.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedVehicle(index);
                setIsAutoPlaying(false);
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === selectedVehicle 
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 w-8' 
                  : 'bg-white/20 hover:bg-white/40 w-2'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedInventory;