'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Truck, Award, RefreshCw, FileText } from 'lucide-react';

interface Benefit {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    icon: <Shield className="w-8 h-8" />,
    title: "Verified Pre-Owned Promise",
    description: "All cars pass 300+ checks & come with full service history"
  },
  {
    id: 2,
    icon: <Truck className="w-8 h-8" />,
    title: "Luxury At Your Doorstep",
    description: "Test drives & delivery available pan-India"
  },
  {
    id: 3,
    icon: <Award className="w-8 h-8" />,
    title: "Epic Warranty Included",
    description: "Up to 12-month coverage on select models"
  },
  {
    id: 4,
    icon: <RefreshCw className="w-8 h-8" />,
    title: "Trade-In with Premium Brands",
    description: "Exchange your car for a newer luxury upgrade"
  },
  {
    id: 5,
    icon: <FileText className="w-8 h-8" />,
    title: "Easy RC Transfer",
    description: "End-to-end paperwork and ownership transfer"
  }
];

const EpicBenefits: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Auto-cycle for mobile carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-black via-[#0e0e0e] to-black py-16 px-4 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            EPIC <span className="text-[#d4af37] relative">
              Benefits
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-pulse"></div>
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Experience luxury car ownership redefined with our premium services
          </p>
        </div>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:block max-w-7xl mx-auto">
        <div className="grid grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className={`group relative transform transition-all duration-700 ease-out h-full ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Badge Container - Fixed Height with Flexbox */}
              <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl p-6 border border-gray-800 backdrop-blur-sm hover:border-[#d4af37] transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#d4af37]/20 h-[280px] flex flex-col">
                
                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/20 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="absolute inset-0 rotate-12 transform bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                  </div>
                </div>

                {/* Icon Container - Fixed Position */}
                <div className="relative z-10 mb-6 flex-shrink-0">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-xl flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#d4af37]/30">
                    <div className="group-hover:animate-pulse">
                      {benefit.icon}
                    </div>
                  </div>
                </div>

                {/* Content - Flex Grow with Consistent Spacing */}
                <div className="relative z-10 text-center flex flex-col flex-grow">
                  {/* Title - Fixed Height Area */}
                  <div className="mb-4 flex-shrink-0 h-[60px] flex items-center justify-center">
                    <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#d4af37] transition-colors duration-300 px-2">
                      {benefit.title}
                    </h3>
                  </div>
                  
                  {/* Description - Flex Grow to Fill Space */}
                  <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 px-1">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden max-w-sm mx-auto">
        <div className="relative h-64 overflow-hidden">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                index === currentIndex
                  ? 'translate-x-0 opacity-100 scale-100'
                  : index < currentIndex
                  ? '-translate-x-full opacity-0 scale-95'
                  : 'translate-x-full opacity-0 scale-95'
              }`}
            >
              {/* Mobile Badge */}
              <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-8 border border-gray-800 backdrop-blur-sm mx-4 h-full flex flex-col justify-center">
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/40 to-[#d4af37]/20 animate-pulse"></div>
                <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

                {/* Floating Particles Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-[#d4af37] rounded-full animate-ping"
                      style={{
                        left: `${20 + (i * 12)}%`,
                        top: `${15 + (i * 10)}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: '2s'
                      }}
                    ></div>
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-2xl flex items-center justify-center text-black shadow-xl shadow-[#d4af37]/40 animate-pulse">
                    {benefit.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-xl mb-4 text-[#d4af37]">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-base leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {benefits.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[#d4af37] scale-125 shadow-lg shadow-[#d4af37]/50'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default EpicBenefits;