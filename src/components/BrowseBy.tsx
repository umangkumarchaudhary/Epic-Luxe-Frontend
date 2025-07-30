'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Brand {
  name: string;
  logo: string;
  count: number;
  gradient: string;
}

interface BodyType {
  name: string;
  icon: string;
  count: number;
  description: string;
}

const BrowseSection = () => {
  const [activeTab, setActiveTab] = useState('brands');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [currentBrandSlide, setCurrentBrandSlide] = useState(0);

  // Premium car brands with inventory counts
  const brands: Brand[] = [
    { name: 'Mercedes-Benz', logo: '/assets/mercedeslogo.png', count: 24, gradient: 'from-gray-800 to-gray-900' },
    { name: 'BMW', logo: '/assets/bmwlogo.png', count: 18, gradient: 'from-blue-900 to-blue-800' },
    { name: 'Audi', logo: '/assets/audilogo.png', count: 15, gradient: 'from-red-900 to-red-800' },
    { name: 'Porsche', logo: '/assets/porschelogo.png', count: 12, gradient: 'from-yellow-800 to-yellow-700' },
    { name: 'Jaguar', logo: '/assets/jaguarlogo.png', count: 8, gradient: 'from-green-900 to-green-800' },
    { name: 'Lexus', logo: '/assets/lexuslogo.png', count: 16, gradient: 'from-silver-800 to-gray-700' },
    { name: 'Land Rover', logo: '/assets/landroverlogo.png', count: 10, gradient: 'from-emerald-900 to-emerald-800' },
    { name: 'Tesla', logo: '/assets/teslalogo.png', count: 22, gradient: 'from-red-800 to-red-700' }
  ];

  // Body types with icons and counts
  const bodyTypes = [
    { name: 'SUV', icon: '🚙', count: 45, description: 'Premium SUVs' },
    { name: 'Sedan', icon: '🚗', count: 38, description: 'Luxury Sedans' },
    { name: 'Coupe', icon: '🏎️', count: 22, description: 'Sports Coupes' },
    { name: 'Convertible', icon: '🚘', count: 15, description: 'Open-top Luxury' },
    { name: 'Hatchback', icon: '🚕', count: 12, description: 'Compact Luxury' },
    { name: 'Sports', icon: '🏁', count: 28, description: 'High Performance' },
    { name: 'EV', icon: '⚡', count: 33, description: 'Electric Luxury' }
  ];

  // Auto-slide for brands
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBrandSlide((prev) => (prev + 1) % Math.ceil(brands.length / 4));
    }, 4000);
    return () => clearInterval(interval);
  }, [brands.length]);

  const BrandCard = ({ brand, index }: { brand: Brand; index: number }) => (
    <div
      className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
        hoveredItem === `brand-${index}` ? 'z-10' : ''
      }`}
      onMouseEnter={() => setHoveredItem(`brand-${index}`)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      {/* Glassmorphism Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 p-6 h-32">
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
        
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Brand Logo */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center mb-2 transform group-hover:rotate-12 transition-transform duration-300 p-1">
    <Image 
      src={brand.logo}
      alt={`${brand.name} logo`}
      width={64}
      height={64}
      className="object-contain w-full h-full"
    />
  </div>
  <h3 className="text-white font-semibold text-sm text-center group-hover:text-[#D4AF37] transition-colors duration-300">
    {brand.name}
  </h3>
</div>

        {/* Hover tooltip */}
        {hoveredItem === `brand-${index}` && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-md rounded-lg px-3 py-1 text-[#D4AF37] text-xs font-medium whitespace-nowrap animate-pulse">
            {brand.count} vehicles available
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45" />
          </div>
        )}
      </div>
    </div>
  );

  const BodyTypeCard = ({ bodyType, index }: { bodyType: BodyType; index: number }) => (
    <div
      className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
        hoveredItem === `body-${index}` ? 'z-10' : ''
      }`}
      onMouseEnter={() => setHoveredItem(`body-${index}`)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 p-6 h-40">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Gold accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
            {bodyType.icon}
          </div>
          <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#D4AF37] transition-colors duration-300">
            {bodyType.name}
          </h3>
          <p className="text-gray-300 text-xs mb-2">{bodyType.description}</p>
          <span className="text-[#D4AF37] text-sm font-semibold">{bodyType.count} available</span>
        </div>

        {/* Hover effect particles */}
        {hoveredItem === `body-${index}` && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#D4AF37] rounded-full animate-ping"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + (i % 2) * 60}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Browse by{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent">
              Excellence
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover your perfect luxury vehicle through our curated collection of premium brands and sophisticated body styles
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
            <div
              className={`absolute top-2 h-12 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-xl transition-all duration-500 ${
                activeTab === 'brands' ? 'left-2 w-32' : 'left-36 w-36'
              }`}
            />
            <button
              onClick={() => setActiveTab('brands')}
              className={`relative z-10 px-8 py-3 rounded-xl font-semibold transition-colors duration-300 ${
                activeTab === 'brands' ? 'text-black' : 'text-white hover:text-[#D4AF37]'
              }`}
            >
              Brands
            </button>
            <button
              onClick={() => setActiveTab('bodyTypes')}
              className={`relative z-10 px-8 py-3 rounded-xl font-semibold transition-colors duration-300 ${
                activeTab === 'bodyTypes' ? 'text-black' : 'text-white hover:text-[#D4AF37]'
              }`}
            >
              Body Types
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          {activeTab === 'brands' && (
            <div className="space-y-8">
              {/* Brand Carousel */}
              <div className="relative">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {brands.slice(currentBrandSlide * 4, (currentBrandSlide + 1) * 4).map((brand, index) => (
                    <BrandCard key={brand.name} brand={brand} index={index} />
                  ))}
                </div>
                
                {/* Carousel Controls */}
                <button
                  onClick={() => setCurrentBrandSlide(prev => Math.max(0, prev - 1))}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 w-10 h-10 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                  disabled={currentBrandSlide === 0}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentBrandSlide(prev => Math.min(Math.ceil(brands.length / 4) - 1, prev + 1))}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 w-10 h-10 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                  disabled={currentBrandSlide >= Math.ceil(brands.length / 4) - 1}
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Brand Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-[#D4AF37] mb-1">125+</div>
                  <div className="text-gray-300 text-sm">Premium Vehicles</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-[#D4AF37] mb-1">8</div>
                  <div className="text-gray-300 text-sm">Luxury Brands</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-[#D4AF37] mb-1">5★</div>
                  <div className="text-gray-300 text-sm">Quality Rating</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-[#D4AF37] mb-1">24/7</div>
                  <div className="text-gray-300 text-sm">Expert Support</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bodyTypes' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bodyTypes.map((bodyType, index) => (
                <BodyTypeCard key={bodyType.name} bodyType={bodyType} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl font-bold text-black text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/25">
            <span className="mr-2">View All Brands & Body Styles</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8941F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
          </button>
          
          <p className="text-gray-400 mt-4 text-sm">
            Discover luxury vehicles curated for the discerning driver
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-4 h-4 bg-[#D4AF37] rounded-full animate-bounce" style={{animationDelay: '0s'}} />
      <div className="absolute top-40 left-10 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '1s'}} />
      <div className="absolute bottom-40 right-20 w-3 h-3 bg-[#D4AF37] rounded-full animate-bounce" style={{animationDelay: '2s'}} />
    </div>
  );
};

export default BrowseSection;