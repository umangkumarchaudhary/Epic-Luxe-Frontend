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
  Loader
} from 'lucide-react';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  price: string;
  original_price?: string;
  savings?: string;
  mileage: string;
  fuel_type: string;
  transmission: string;
  engine_capacity?: string;
  horsepower?: string;
  torque?: string;
  location: string;
  condition: string;
  ownership?: string;
  color_exterior?: string;
  color_interior?: string;
  image_url: string;
  features: string[];
  video_url?: string;
  slug: string;
  views?: number;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  // UI specific fields
  safety_rating?: number;
  certified_pre_owned?: boolean;
  dealer_name?: string;
  description?: string;
}

const formatPrice = (price: string | number) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
};

const formatMileage = (mileage: string | number) => {
  const numMileage = typeof mileage === 'string' ? parseFloat(mileage) : mileage;
  return new Intl.NumberFormat('en-IN').format(numMileage);
};

const getColorHex = (colorName: string) => {
  if (!colorName) return '#BFA980';
  
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
    'blue': '#2563EB',
    'silver': '#C0C0C0',
    'green': '#16A34A',
  };
  return colorMap[colorName.toLowerCase()] || '#BFA980';
};

// Helper function to generate description if not provided
const generateDescription = (vehicle: Vehicle) => {
  if (vehicle.description) return vehicle.description;
  
  return `Experience the perfect blend of luxury and performance with this exceptional ${vehicle.brand} ${vehicle.model}${vehicle.variant ? ` ${vehicle.variant}` : ''}. Meticulously maintained and ready to deliver an unparalleled driving experience.`;
};

const FeaturedInventory: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSpecIndex, setCurrentSpecIndex] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Fetch vehicles from API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/admin/vehicles/featured');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.vehicles) {
          setVehicles(data.vehicles);
          setError(null);
        } else {
          throw new Error('Failed to fetch vehicles');
        }
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError(err instanceof Error ? err.message : 'Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    // Disable auto-playing for mobile to prevent conflicts with touch events
    if (!isAutoPlaying || isHovered || vehicles.length === 0) return;
    const interval = setInterval(() => {
      setSelectedVehicle((prev) => (prev + 1) % vehicles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, vehicles.length]);

  // Auto-cycle spec card for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpecIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentVehicle = vehicles[selectedVehicle];

  const navigateVehicle = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    if (direction === 'prev') {
      setSelectedVehicle(selectedVehicle > 0 ? selectedVehicle - 1 : vehicles.length - 1);
    } else {
      setSelectedVehicle(selectedVehicle < vehicles.length - 1 ? selectedVehicle + 1 : 0);
    }
  };

  // Swipe functions
  const handleSwipe = (direction: 'left' | 'right') => {
    console.log('Swipe detected:', direction);
    if (direction === 'left') {
      navigateVehicle('next');
    } else {
      navigateVehicle('prev');
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    console.log('Touch start detected');
    setIsDragging(true);
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!isDragging) return;
    
    console.log('Touch end detected', { touchStart, touchEnd });
    
    if (touchStart && touchEnd) {
      const distance = touchStart - touchEnd;
      const minSwipeDistance = 50;
      
      console.log('Swipe distance:', distance);
      
      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) {
          handleSwipe('left');
        } else {
          handleSwipe('right');
        }
      }
    }
    
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Alternative mouse-based swipe for testing
  const onMouseDown = (e: React.MouseEvent) => {
    console.log('Mouse down detected');
    setIsDragging(true);
    setTouchStart(e.clientX);
    setTouchEnd(null);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    
    console.log('Mouse up detected', { touchStart, touchEnd });
    
    if (touchStart && touchEnd) {
      const distance = touchStart - touchEnd;
      const minSwipeDistance = 50;
      
      console.log('Mouse swipe distance:', distance);
      
      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) {
          handleSwipe('left');
        } else {
          handleSwipe('right');
        }
      }
    }
    
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Loading state
  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden w-full flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading Premium Vehicles...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error || vehicles.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">
            {error || 'No featured vehicles available at the moment'}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden w-full py-12 md:py-16">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-yellow-600/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-yellow-500/3 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-20 bg-noise"></div>

      <div 
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="manrope-font text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
            Premium <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent font-bold">Featured Inventory</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Discover our hand-picked selection of exceptional luxury vehicles
          </p>
        </motion.div>

        {/* Vehicle Thumbnails - Top Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 relative"
        >
          {/* Desktop View - Horizontal Scroll */}
          <div className="hidden md:flex justify-center gap-2 overflow-x-auto pb-4 pt-2 px-4">
            {vehicles.map((vehicle, index) => (
              <motion.button
                key={vehicle.id}
                onClick={() => {
                  setSelectedVehicle(index);
                  setIsAutoPlaying(false);
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex-shrink-0 group transition-all duration-500 flex flex-col items-center pt-1 pb-0.5 ${
                  index === selectedVehicle
                    ? 'scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {/* Image Box - Desktop */}
                <div className="relative w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden transition-all duration-500">
                  <Image
                    src={vehicle.image_url || '/placeholder.png'}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Vehicle Name Below - Desktop */}
                <div className="mt-1 text-center leading-tight">
                  <div className={`text-xs font-medium ${
                    index === selectedVehicle ? 'text-yellow-500' : 'text-gray-400'
                  }`}>
                    {vehicle.brand}
                  </div>
                  <div className="text-xs text-gray-500">
                    {vehicle.model}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Mobile View - 3x3 Grid */}
          <div 
            className="md:hidden pb-4 pt-2 px-4 relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            style={{ touchAction: 'none' }}
          >
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
              {vehicles.map((vehicle, index) => (
                <motion.button
                  key={vehicle.id}
                  onClick={() => {
                    setSelectedVehicle(index);
                    setIsAutoPlaying(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative group transition-all duration-300 flex flex-col items-center ${
                    index === selectedVehicle
                      ? 'scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {/* Image Box - Mobile */}
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={vehicle.image_url || '/placeholder.png'}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                  </div>

                  {/* Vehicle Name Below - Mobile */}
                  <div className="mt-1.5 text-center leading-tight">
                    <div className={`text-xs font-medium ${
                      index === selectedVehicle ? 'text-yellow-500' : 'text-gray-400'
                    }`}>
                      {vehicle.brand}
                    </div>
                    <div className="text-xs text-gray-500">
                      {vehicle.model}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile Car Image - Between Thumbnails and Description */}
        <motion.div 
          className="lg:hidden mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div 
            className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: 'pan-y' }}
          >
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
                  src={currentVehicle.image_url || '/placeholder.png'}
                  alt={`${currentVehicle.brand} ${currentVehicle.model}`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 100vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile Pagination Dots - Below Car Image */}
        <motion.div 
          className="lg:hidden mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex justify-center gap-2">
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
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8">
          
          {/* Vehicle Image - Hero Section */}
          <motion.div 
            className="order-2 lg:order-1 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Desktop View */}
            <div className="hidden lg:block relative">
              <div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
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
                      src={currentVehicle.image_url || '/placeholder.png'}
                      alt={`${currentVehicle.brand} ${currentVehicle.model}`}
                      fill
                      className="object-contain p-6 drop-shadow-2xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Left Navigation Arrow - Desktop (Outside Image) */}
              <button
                onClick={() => navigateVehicle('prev')}
                className="absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/40 hover:border-yellow-500/30 transition-all duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 text-white group-hover:text-yellow-500 transition-colors" />
              </button>
            </div>
          </motion.div>

          {/* Vehicle Details */}
          <motion.div 
            className="order-1 lg:order-2 h-full flex flex-col justify-between relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Right Navigation Arrow - Desktop (Next to text content) */}
            <button
              onClick={() => navigateVehicle('next')}
              className="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 items-center justify-center hover:bg-black/40 hover:border-yellow-500/30 transition-all duration-300 group"
            >
              <ChevronRight className="w-5 h-5 text-white group-hover:text-yellow-500 transition-colors" />
            </button>
            
            {/* Top Section - Title & Info */}
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedVehicle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-3"
                >
                  <div className="space-y-1.5">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-thin text-white tracking-tight">
                      {currentVehicle.brand}
                    </h2>
                    <h3 className="text-base md:text-lg text-yellow-500 font-light">
                      {currentVehicle.model} {currentVehicle.variant || ''}
                    </h3>
                  </div>
                  
                  {/* Location & Dealer */}
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{currentVehicle.location}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                    <span className="text-sm">{currentVehicle.dealer_name || 'Premium Dealer'}</span>
                  </div>

                  {/* Safety Rating - Desktop Only */}
                  <div className="hidden md:flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (currentVehicle.safety_rating || 4)
                              ? 'text-yellow-500 fill-current' 
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">Safety Rating</span>
                    {(currentVehicle.certified_pre_owned !== false) && (
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
                className="space-y-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 text-xs text-gray-400 font-light">
                  <span>Starting from</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-1.5">
                  <span className="text-lg md:text-xl font-light text-white">
                    {formatPrice(currentVehicle.price)}
                  </span>
                  {currentVehicle.original_price && (
                    <div className="flex items-center gap-2">
                      <span className="text-base text-gray-500 line-through font-light">
                        {formatPrice(currentVehicle.original_price)}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-xs bg-green-500/20 text-green-400 font-medium">
                        SAVE {currentVehicle.savings || Math.round(((parseFloat(currentVehicle.original_price) - parseFloat(currentVehicle.price)) / parseFloat(currentVehicle.original_price)) * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Middle Section - Description & Specs */}
            <div className="space-y-4">
              {/* Description */}
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                {generateDescription(currentVehicle)}
              </p>

              {/* Specifications Grid - Desktop */}
              <div className="hidden md:grid grid-cols-4 gap-1.5">
                {[
                  { icon: Calendar, label: 'Year', value: currentVehicle.year },
                  { icon: Gauge, label: 'Mileage', value: `${formatMileage(currentVehicle.mileage)} km` },
                  { icon: Award, label: 'Condition', value: currentVehicle.condition },
                  { icon: Eye, label: 'Color', value: currentVehicle.color_exterior || 'Premium' },
                ].map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-1.5 text-center hover:border-yellow-500/30 transition-all duration-300"
                  >
                    <spec.icon className="w-3 h-3 text-yellow-500 mx-auto mb-0.5" />
                    <div className="text-xs text-gray-400 mb-0.5">{spec.label}</div>
                    <div className="text-xs font-medium text-white flex items-center justify-center gap-1">
                      {spec.label === 'Color' && currentVehicle.color_exterior && (
                        <div 
                          className="w-1.5 h-1.5 rounded-full border border-white/20"
                          style={{ backgroundColor: getColorHex(currentVehicle.color_exterior) }}
                        />
                      )}
                      {spec.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Single Spec Card */}
              <div className="md:hidden">
                <div 
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center hover:border-yellow-500/30 transition-all duration-300"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSpecIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-1.5"
                    >
                      {(() => {
                        const specs = [
                          { icon: Calendar, label: 'Year', value: currentVehicle.year },
                          { icon: Gauge, label: 'Mileage', value: `${formatMileage(currentVehicle.mileage)} km` },
                          { icon: Award, label: 'Condition', value: currentVehicle.condition },
                          { icon: Eye, label: 'Color', value: currentVehicle.color_exterior || 'Premium' },
                        ];
                        const spec = specs[currentSpecIndex];
                        return (
                          <>
                            <spec.icon className="w-5 h-5 text-yellow-500 mx-auto" />
                            <div className="text-sm text-gray-400">{spec.label}</div>
                            <div className="text-sm font-medium text-white flex items-center justify-center gap-2">
                              {spec.label === 'Color' && currentVehicle.color_exterior && (
                                <div 
                                  className="w-3 h-3 rounded-full border border-white/20"
                                  style={{ backgroundColor: getColorHex(currentVehicle.color_exterior) }}
                                />
                              )}
                              {spec.value}
                            </div>
                          </>
                        );
                      })()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex flex-col sm:flex-row gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Inquire Now
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-6 py-2 rounded-lg border border-white/20 text-white text-sm hover:border-yellow-500/50 hover:bg-white/5 transition-all duration-300"
              >
                Schedule Test Drive
              </motion.button>
            </div>

            {/* Mobile CTA Buttons - Tighter Spacing */}
            <div className="md:hidden flex flex-col gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Inquire Now
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-6 py-2 rounded-lg border border-white/20 text-white text-sm hover:border-yellow-500/50 hover:bg-white/5 transition-all duration-300"
              >
                Schedule Test Drive
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedInventory;