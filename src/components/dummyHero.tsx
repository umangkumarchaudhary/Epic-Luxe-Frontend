'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Car, DollarSign, Shield, Search, Phone, Star, TrendingUp, Eye, Clock, Menu, X, Home, User, MessageCircle } from 'lucide-react';

const mockBanners = [
  {
    id: '1',
    image_url: '/assets/images/bugatti.jpg',
    title: 'New Arrivals',
    subtitle: 'Premium Certified Vehicles',
    badge: 'Just In',
  },
  {
    id: '2',
    image_url: '/assets/images/mclaren1.jpg',
    title: 'Limited Offers',
    subtitle: 'Up to 25% Off',
    badge: 'Save Big',
  },
  {
    id: '3',
    image_url: '/assets/images/porsche9111.jpg',
    title: 'Instant Valuation',
    subtitle: 'Sell Your Luxury Car',
    badge: 'Free Quote',
  }
];

// Bottom Sticky Navigation (Mobile Only)
function BottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#0e0e0e] to-[#1a1a1a]/95 backdrop-blur-md border-t border-[#BFA980]/10 z-50">
      <div className="grid grid-cols-4 gap-1 py-3 px-2">
        {[
          { icon: Home, label: 'Home', active: true },
          { icon: Search, label: 'Buy', active: false },
          { icon: DollarSign, label: 'Sell', active: false },
          { icon: User, label: 'Account', active: false }
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`flex flex-col items-center space-y-1 py-2 px-1 rounded-lg transition-all duration-300 ${
              active 
                ? 'text-[#D4AF37]' 
                : 'text-white/60 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Header Component
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 px-4 md:px-8 flex items-center justify-between bg-gradient-to-b from-[#0e0e0e]/90 to-transparent backdrop-blur-lg border-b border-white/5">
      
      {/* Logo */}
      <div className="flex items-center">
        <Image 
          src="/assets/images/EpicLuxeWithoutbackground.png" 
          alt="Epic Luxe Logo" 
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
      </div>
      
      {/* Desktop Search Bar */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#BFA980]" />
          <input
            type="text"
            placeholder="Search premium vehicles..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#1a1a1a]/40 backdrop-blur-sm text-white/80 placeholder:text-white/50 border border-[#BFA980]/20 focus:outline-none focus:border-[#D4AF37]/40 text-sm transition-all duration-300"
          />
        </div>
      </div>

      {/* Desktop Call Button - Single CTA */}
      <button className="hidden md:flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300 font-medium text-sm">
        <Phone className="w-4 h-4" />
        <span>Call Now</span>
      </button>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 rounded-lg bg-[#1a1a1a]/30 backdrop-blur-sm border border-[#BFA980]/20 transition-all duration-300"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 text-[#D4AF37]" />
        ) : (
          <Menu className="w-5 h-5 text-[#D4AF37]" />
        )}
      </button>

      {/* Mobile Menu - Simplified */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gradient-to-b from-[#0e0e0e]/95 to-[#1a1a1a]/95 backdrop-blur-md border-b border-[#BFA980]/10 md:hidden">
          <div className="p-6 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#BFA980]" />
              <input
                type="text"
                placeholder="Search vehicles..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1a1a1a]/40 text-white/80 placeholder:text-white/50 border border-[#BFA980]/20 focus:outline-none focus:border-[#D4AF37]/40 text-sm"
              />
            </div>
            
            {/* Single Mobile CTA */}
            <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] font-medium">
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default function LuxuryVehicleHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockBanners.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentBanner = mockBanners[currentIndex];

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#0e0e0e]">
      
      <Header />

      {/* Hero Section - More breathing space */}
      <div className="pt-16 h-[70vh] w-full relative overflow-hidden">
        
        {/* Background Image with Elegant Overlay */}
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{ opacity: isTransitioning ? 0.8 : 1 }}
        >
          <Image
            src={currentBanner.image_url}
            alt="Luxury Car"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/70 via-[#0e0e0e]/40 to-[#0e0e0e]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/80 via-transparent to-[#0e0e0e]/20"></div>
        </div>

        {/* Desktop Content - Refined Typography */}
        <div className="hidden md:flex absolute inset-0 flex-col justify-center px-8 lg:px-16 z-20">
          <div className={`max-w-2xl transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            
            {/* Subtle Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1a1a1a]/60 backdrop-blur-sm border border-[#BFA980]/20 mb-6">
              <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2"></div>
              <span className="text-[#D4AF37] font-medium text-xs tracking-wide uppercase">
                {currentBanner.badge}
              </span>
            </div>

            {/* Refined Typography Hierarchy */}
            <h1 className="text-4xl lg:text-5xl font-light text-white/90 mb-3 leading-tight tracking-wide">
              {currentBanner.title}
            </h1>
            <h2 className="text-xl lg:text-2xl font-light text-[#BFA980] mb-6 leading-relaxed">
              {currentBanner.subtitle}
            </h2>

            {/* Single Primary CTA */}
            <div className="space-y-4">
              <button className="inline-flex items-center space-x-3 px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] font-medium hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300 transform hover:scale-105">
                <Eye className="w-5 h-5" />
                <span>Explore Collection</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              {/* Secondary action as text link */}
              <div className="ml-2">
                <button className="text-white/70 hover:text-[#D4AF37] transition-colors duration-300 text-sm font-medium underline underline-offset-4">
                  Get free valuation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Content - Simplified */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 z-20">
          <div className={`px-6 pb-8 transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            
            {/* Mobile Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1a1a1a]/60 backdrop-blur-sm border border-[#BFA980]/20 mb-4">
              <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2"></div>
              <span className="text-[#D4AF37] font-medium text-xs tracking-wide uppercase">
                {currentBanner.badge}
              </span>
            </div>

            {/* Mobile Typography - Smaller, cleaner */}
            <h1 className="text-2xl font-light text-white/90 mb-2 leading-tight">
              {currentBanner.title}
            </h1>
            <h2 className="text-lg font-light text-[#BFA980] mb-6 leading-relaxed">
              {currentBanner.subtitle}
            </h2>

            {/* Single Mobile CTA */}
            <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] font-medium hover:shadow-lg transition-all duration-300">
              <Eye className="w-5 h-5" />
              <span>Explore Collection</span>
            </button>
            
            {/* Secondary action as text */}
            <div className="text-center mt-4">
              <button className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300 text-sm underline underline-offset-4">
                Get free valuation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards Section - Clean and Minimal */}
      <div className="py-12 w-full px-6 md:px-8 lg:px-12 space-y-6">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Buy Car Card - Elegant and minimal */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl border border-[#BFA980]/20 hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden">
              
              {/* Subtle background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/5 to-transparent rounded-full blur-3xl"></div>
              
              <div className="relative p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                    <Car className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-light text-white/90">Buy Premium Car</h4>
                    <p className="text-white/50 text-sm">Curated luxury collection</p>
                  </div>
                </div>

                {/* Features - minimal */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-white/60">
                    <Star className="w-4 h-4 text-[#BFA980]" />
                    <span>Certified Quality</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-white/60">
                    <Shield className="w-4 h-4 text-[#BFA980]" />
                    <span>Comprehensive Warranty</span>
                  </div>
                </div>

                {/* Single CTA */}
                <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] font-medium hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300 group-hover:scale-105">
                  <Eye className="w-4 h-4" />
                  <span>Browse Cars</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Sell Car Card - Matching style */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl border border-[#BFA980]/20 hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden">
              
              {/* Subtle background accent */}
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#BFA980]/5 to-transparent rounded-full blur-3xl"></div>
              
              <div className="relative p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-[#BFA980]/10 border border-[#BFA980]/20">
                    <DollarSign className="w-6 h-6 text-[#BFA980]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-light text-white/90">Sell Your Car</h4>
                    <p className="text-white/50 text-sm">Get best market value</p>
                  </div>
                </div>

                {/* Features - minimal */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-white/60">
                    <TrendingUp className="w-4 h-4 text-[#BFA980]" />
                    <span>Instant Valuation</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-white/60">
                    <Clock className="w-4 h-4 text-[#BFA980]" />
                    <span>Quick Settlement</span>
                  </div>
                </div>

                {/* Single CTA with outline style */}
                <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-full border-2 border-[#BFA980] text-[#BFA980] font-medium hover:bg-[#BFA980] hover:text-[#0e0e0e] transition-all duration-300 group-hover:scale-105">
                  <DollarSign className="w-4 h-4" />
                  <span>Get Valuation</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />

      {/* Minimal floating elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-[#D4AF37]/40 animate-pulse"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
