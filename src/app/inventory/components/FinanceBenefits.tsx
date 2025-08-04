'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';

interface FinanceProtectionItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const financeProtectionItems: FinanceProtectionItem[] = [
  {
    id: 1,
    icon: <CreditCard className="w-8 h-8" />,
    title: "Easy Finance & EMI Options",
    description: "Flexible monthly payments with low interest — tailored for your lifestyle."
  },
  {
    id: 2,
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Instant Insurance Coverage",
    description: "Protect your car from Day 1 with curated luxury insurance plans."
  }
];

const FinanceProtectionHighlights: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Auto-cycle for mobile carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % financeProtectionItems.length);
    }, 4000);

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
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Finance & <span className="text-[#d4af37] relative">
              Protection
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-pulse"></div>
            </span> Highlights
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Seamless financing and comprehensive protection for your luxury vehicle investment
          </p>
        </div>
      </div>

      {/* Desktop Grid Layout - 2 Columns */}
      <div className="hidden md:block max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-8">
          {financeProtectionItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative transform transition-all duration-700 ease-out h-full ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Badge Container - Fixed Height with Flexbox */}
              <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl p-8 border border-gray-800 backdrop-blur-sm hover:border-[#d4af37] transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#d4af37]/20 h-[320px] flex flex-col">
                
                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/20 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="absolute inset-0 rotate-12 transform bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                  </div>
                </div>

                {/* Icon Container - Fixed Position */}
                <div className="relative z-10 mb-8 flex-shrink-0">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-xl flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#d4af37]/30">
                    <div className="group-hover:animate-pulse">
                      {item.icon}
                    </div>
                  </div>
                </div>

                {/* Content - Flex Grow with Consistent Spacing */}
                <div className="relative z-10 text-center flex flex-col flex-grow">
                  {/* Title - Fixed Height Area */}
                  <div className="mb-6 flex-shrink-0 h-[70px] flex items-center justify-center">
                    <h3 className="text-white font-bold text-xl leading-tight group-hover:text-[#d4af37] transition-colors duration-300 px-2">
                      {item.title}
                    </h3>
                  </div>
                  
                  {/* Description - Flex Grow to Fill Space */}
                  <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300 px-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden max-w-sm mx-auto">
        <div className="relative h-80 overflow-hidden">
          {financeProtectionItems.map((item, index) => (
            <div
              key={item.id}
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
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-[#d4af37] rounded-full animate-ping"
                      style={{
                        left: `${25 + (i * 16)}%`,
                        top: `${20 + (i * 15)}%`,
                        animationDelay: `${i * 0.7}s`,
                        animationDuration: '2.5s'
                      }}
                    ></div>
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-2xl flex items-center justify-center text-black shadow-xl shadow-[#d4af37]/40 animate-pulse">
                    <div className="transform scale-125">
                      {item.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-xl mb-6 text-[#d4af37] leading-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-base leading-relaxed px-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {financeProtectionItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
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
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[#d4af37]/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#d4af37]/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
};

export default FinanceProtectionHighlights;