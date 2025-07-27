'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Car, DollarSign, Shield, Search, Phone, Star, TrendingUp, Eye, Clock, Menu, X, Home, User, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import HomeStickyNav from './StickyFooter/HomeStickyNav';

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
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/95 backdrop-blur-md border-t border-[#D4AF37]/20 z-50 manrope-font">
      <div className="grid grid-cols-4 gap-1 py-2 px-2">
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300">
          <Home className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs text-[#D4AF37] font-semibold">Home</span>
        </button>
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#BFA980]/10 transition-all duration-300">
          <DollarSign className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 font-semibold">Buy</span>
        </button>
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#BFA980]/10 transition-all duration-300">
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 font-semibold">Sell</span>
        </button>
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#BFA980]/10 transition-all duration-300">
          <User className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 font-semibold">Connect</span>
        </button>
      </div>
    </div>
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
    <div className="min-h-screen w-full relative overflow-hidden bg-black manrope-font" id="hero-section">
      
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

      {/* Buy/Sell Cards Section - DESKTOP ONLY - MOVED UP AND COMPACT */}
      <div className="hidden md:block py-4 md:py-6 w-full px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            
            {/* Buy Premium Car Card */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl border border-[#BFA980]/20 hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/5 to-transparent rounded-full blur-3xl"></div>
              <div className="relative p-6 space-y-4 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                      <Car className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white/90">Buy Premium Car</h4>
                      <p className="text-white/50 text-sm font-medium">Curated luxury collection</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between space-x-6">
                    <div className="flex items-center space-x-2 text-sm text-white/60">
                      <Star className="w-4 h-4 text-[#BFA980]" />
                      <span className="font-medium">Certified Quality</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-white/60">
                      <Shield className="w-4 h-4 text-[#BFA980]" />
                      <span className="font-medium">Comprehensive Warranty</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300 group-hover:scale-105">
                  <Eye className="w-4 h-4" />
                  <span>Browse Cars</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Sell Your Car Card */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl border border-[#BFA980]/20 hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden h-full">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#BFA980]/5 to-transparent rounded-full blur-3xl"></div>
              <div className="relative p-6 space-y-4 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-[#BFA980]/10 border border-[#BFA980]/20">
                      <DollarSign className="w-6 h-6 text-[#BFA980]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white/90">Sell Your Car</h4>
                      <p className="text-white/50 text-sm font-medium">Get best market value</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between space-x-6">
                    <div className="flex items-center space-x-2 text-sm text-white/60">
                      <TrendingUp className="w-4 h-4 text-[#BFA980]" />
                      <span className="font-medium">Instant Valuation</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-white/60">
                      <Clock className="w-4 h-4 text-[#BFA980]" />
                      <span className="font-medium">Quick Settlement</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-3 rounded-full border-2 border-[#BFA980] text-[#BFA980] font-semibold hover:bg-[#BFA980] hover:text-[#0e0e0e] transition-all duration-300 group-hover:scale-105">
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
      <div className="md:hidden w-full bg-gradient-to-b from-[#0e0e0e] to-[#1a1a1a] py-8 px-5 border-t border-[#BFA980]/20">
        <div className="max-w-md mx-auto text-center space-y-6">

          {/* Heading */}
          <h3 className="text-xl font-semibold text-white leading-snug">
            🚗 Ready to Sell or Buy?
          </h3>

          {/* Toggle Buttons */}
          <div className="flex justify-center">
            <div className="bg-black/30 backdrop-blur-sm rounded-full p-1 border border-[#BFA980]/20">
              <button
                onClick={() => setActiveTab('buy')}
                className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'buy'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setActiveTab('sell')}
                className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'sell'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                Sell
              </button>
            </div>
          </div>

          {/* Dual Action Buttons with Fade-in */}
          <div className="relative h-[46px] transition-opacity duration-500 ease-in-out">
            <div
              key={activeTab}
              className="absolute inset-0 flex justify-center gap-3 opacity-0 animate-[fadeIn_0.4s_ease-in-out_forwards]"
            >
              <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-white/80 font-semibold hover:bg-white/10 transition-all text-sm">
                {activeTab === 'buy' ? <Eye className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                <span>{activeTab === 'buy' ? 'Browse Collection' : 'Get Valuation'}</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-white/80 font-semibold hover:bg-white/10 transition-all text-sm">
                <Phone className="w-4 h-4" />
                <span>Call Expert</span>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-5 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <button className="flex items-center gap-1 text-[#D4AF37] hover:text-[#BFA980] transition-colors">
                <DollarSign className="w-3.5 h-3.5" />
                <span className="font-semibold">Finance Option</span>
              </button>
              <span className="text-white/30">|</span>
              <button className="flex items-center gap-1 text-[#D4AF37] hover:text-[#BFA980] transition-colors">
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="font-semibold">Live Chat</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      <style>
      {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-\\[fadeIn_0\\.4s_ease-in-out_forwards\\] {
          animation: fadeIn 0.4s ease-in-out forwards;
        }
      `}
      </style>


      {/* Bottom Sticky Navigation */}
      <HomeStickyNav />
      
    </div>
  );
}
