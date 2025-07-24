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
    badge: 'JUST IN',
  },
  {
    id: '2',
    image_url: '/assets/images/mclaren1.jpg',
    title: 'Limited Offers',
    subtitle: 'Up to 25% Off',
    badge: 'SAVE BIG',
  },
  {
    id: '3',
    image_url: '/assets/images/porsche9111.jpg',
    title: 'Instant Valuation',
    subtitle: 'Sell Your Luxury Car',
    badge: 'FREE QUOTE',
  }
];

// Bottom Sticky Navigation (Mobile Only)
function BottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/95 backdrop-blur-md border-t border-[#D4AF37]/20 z-50">
      <div className="grid grid-cols-4 gap-1 py-2 px-2">
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300">
          <Home className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs text-[#D4AF37] font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#BFA980]/10 transition-all duration-300">
          <DollarSign className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 font-medium">Buy</span>
        </button>
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#BFA980]/10 transition-all duration-300">
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 font-medium">Sell</span>
        </button>
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#BFA980]/10 transition-all duration-300">
          <User className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 font-medium">Connect</span>
        </button>
      </div>
    </div>
  );
}

// Header Component
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-[10vh] md:h-[10vh] z-50 px-4 md:px-8 flex items-center justify-between bg-black/10 backdrop-blur-md border-b border-white/5">
      
      {/* Logo */}
      <div className="flex items-center flex-shrink-0">
        <div className="relative">
          <Image 
            src="/assets/images/Epic Luxe Logo.png" 
            alt="Epic Luxe Logo" 
            width={40}
            height={40}
            className="h-8 md:h-10 w-auto object-contain"
          />
        </div>
      </div>
      
      {/* Desktop Search Bar */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
          <input
            type="text"
            placeholder="Search by brand, model, or year..."
            className="w-full pl-12 pr-4 py-2.5 rounded-full bg-black/20 backdrop-blur-md text-white placeholder:text-gray-300 border border-[#D4AF37]/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#BFA980] text-sm transition-all duration-300"
          />
        </div>
      </div>

      {/* Desktop Call Button */}
      <button className="hidden md:flex items-center space-x-2 px-4 lg:px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black hover:from-[#BFA980] hover:to-[#D4AF37] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm">
        <Phone className="w-4 h-4" />
        <span>Call Now</span>
      </button>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 rounded-full bg-black/20 backdrop-blur-md border border-[#D4AF37]/30 transition-all duration-300 hover:scale-105"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 text-[#D4AF37]" />
        ) : (
          <Menu className="w-5 h-5 text-[#D4AF37]" />
        )}
      </button>

      {/* Enhanced Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-[#D4AF37]/20 md:hidden">
          <div className="p-6 space-y-6">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
              <input
                type="text"
                placeholder="Search vehicles..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-black/20 backdrop-blur-md text-white placeholder:text-gray-300 border border-[#D4AF37]/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm transition-all duration-300"
              />
            </div>
            
            {/* Menu Items */}
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-white hover:bg-[#D4AF37]/10 transition-all duration-300">
                <Car className="w-5 h-5 text-[#D4AF37]" />
                <span>Browse Cars</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-white hover:bg-[#D4AF37]/10 transition-all duration-300">
                <DollarSign className="w-5 h-5 text-[#BFA980]" />
                <span>Sell Your Car</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-white hover:bg-[#D4AF37]/10 transition-all duration-300">
                <User className="w-5 h-5 text-gray-400" />
                <span>My Account</span>
              </button>
            </div>
            
            {/* Mobile Call Button */}
            <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('buy');

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

  useEffect(() => {
    const handleParallax = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.5;
      setParallax({ x, y });
    };
    window.addEventListener('mousemove', handleParallax);
    return () => window.removeEventListener('mousemove', handleParallax);
  }, []);

  const currentBanner = mockBanners[currentIndex];

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black" id="hero-section">
      
      {/* Header Component */}
      <Header />

      {/* Main Slider */}
      <div className="pt-[10vh] h-[60vh] md:h-[60vh] w-full relative overflow-hidden">
        
        {/* Background Image with Enhanced Gradient Overlay */}
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            transform: `scale(1.1) translateX(${parallax.x * 20}px) translateY(${parallax.y * 10}px)`,
            opacity: isTransitioning ? 0.7 : 1
          }}
        >
          <Image
            src={currentBanner.image_url}
            alt="Luxury Car"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/90 to-transparent"></div>
        </div>

        {/* Desktop Content Overlay - Compact & Transparent */}
        <div className="hidden md:flex absolute inset-0 flex-col justify-center px-8 lg:px-16 z-20">
          <div className={`transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/15 to-[#BFA980]/15 backdrop-blur-md border border-[#D4AF37]/20 mb-2">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full mr-2 animate-pulse"></div>
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-transparent bg-clip-text font-bold text-xs tracking-wider">
                {currentBanner.badge}
              </span>
            </div>

            {/* Main Content - Reduced sizes and gaps, more transparent */}
            <h1 className="text-3xl lg:text-4xl font-bold text-white/80 mb-1 leading-tight tracking-wide">
              {currentBanner.title}
            </h1>
            <h2 className="text-lg lg:text-xl font-light bg-gradient-to-r from-[#D4AF37]/80 to-[#BFA980]/80 text-transparent bg-clip-text mb-2 leading-snug">
              {currentBanner.subtitle}
            </h2>
            <p className="text-sm lg:text-base text-gray-200/70 mb-4 max-w-xl leading-relaxed">
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-bold hover:from-[#BFA980] hover:to-[#D4AF37] transition-all transform hover:scale-105 shadow-2xl hover:shadow-[#D4AF37]/30 text-sm">
                <Eye className="w-4 h-4" />
                <span>Explore Collection</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full border-2 border-[#D4AF37]/70 text-white/80 font-bold hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#BFA980] hover:text-black transition-all transform hover:scale-105 hover:shadow-xl text-sm">
                <DollarSign className="w-4 h-4" />
                <span>Get Free Quote</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Content Overlay */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 z-20">
          <div className={`transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div className="px-6 pb-6">
              
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA980]/10 backdrop-blur-sm mb-4">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full mr-2 animate-pulse"></div>
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-transparent bg-clip-text font-bold text-xs tracking-wider">
                  {currentBanner.badge}
                </span>
              </div>

              {/* Mobile Typography */}
              <h1 className="text-3xl font-bold text-white mb-2 leading-tight drop-shadow-2xl tracking-wide">
                {currentBanner.title}
              </h1>
              <h2 className="text-lg font-light bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-transparent bg-clip-text mb-3 drop-shadow-sm leading-snug">
                {currentBanner.subtitle}
              </h2>
              <p className="text-sm text-gray-200 mb-6 leading-relaxed drop-shadow-md">
              </p>

              {/* Mobile CTA Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-bold hover:from-[#BFA980] hover:to-[#D4AF37] transition-all transform hover:scale-105 shadow-xl text-sm">
                  <Eye className="w-4 h-4" />
                  <span>Explore</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-black/30 backdrop-blur-sm border border-[#D4AF37]/40 text-white font-bold hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#BFA980] hover:text-black hover:border-transparent transition-all transform hover:scale-105 text-sm">
                  <DollarSign className="w-4 h-4" />
                  <span>Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy/Sell Cards Section - DESKTOP ONLY */}
      <div className="hidden md:block py-8 md:py-12 w-full px-6 md:px-8 lg:px-12">
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

      {/* Final CTA Section - MOBILE ONLY */}
      <div className="md:hidden w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 py-8 px-6 border-t border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-wide">
              🚗 Ready for Your Next Luxury Experience?
            </h3>
          </div>
          
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-6">
            <div className="bg-black/30 backdrop-blur-sm rounded-full p-1 border border-[#D4AF37]/30">
              <button
                onClick={() => setActiveTab('buy')}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'buy' 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Buy Car
              </button>
              <button
                onClick={() => setActiveTab('sell')}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'sell' 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Sell Car
              </button>
            </div>
          </div>
          
          {/* Dynamic CTA Buttons */}
          <div className="flex flex-col space-y-3 justify-center">
            <button className="flex items-center justify-center space-x-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-bold hover:from-[#BFA980] hover:to-[#D4AF37] transition-all transform hover:scale-105 shadow-xl text-sm">
              {activeTab === 'buy' ? (
                <Eye className="w-5 h-5" />
              ) : (
                <DollarSign className="w-5 h-5" />
              )}
              <span>{activeTab === 'buy' ? 'Browse Collection' : 'Get Free Valuation'}</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-8 py-3 rounded-full border-2 border-[#D4AF37] text-white font-bold hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#BFA980] hover:text-black transition-all transform hover:scale-105 text-sm">
              <Phone className="w-5 h-5" />
              <span>Call Expert</span>
            </button>
          </div>
          
          {/* Additional Quick Actions */}
          <div className="pt-4 border-t border-[#D4AF37]/10">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button className="flex items-center space-x-1 text-[#D4AF37] hover:text-[#BFA980] transition-colors duration-300">
                <DollarSign className="w-4 h-4" />
                <span>Quick Valuation</span>
              </button>
              <span className="text-gray-600">|</span>
              <button className="flex items-center space-x-1 text-[#D4AF37] hover:text-[#BFA980] transition-colors duration-300">
                <MessageCircle className="w-4 h-4" />
                <span>Live Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Navigation */}
      <BottomNav />
    </div>
  );
}
