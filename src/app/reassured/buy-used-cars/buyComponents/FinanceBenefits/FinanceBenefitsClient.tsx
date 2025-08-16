'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';

interface FinanceProtectionItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  ariaLabel: string;
}

const FinanceBenefitsClient: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Memoized finance protection items for performance
  const financeProtectionItems: FinanceProtectionItem[] = useMemo(() => [
    {
      id: 1,
      icon: <CreditCard className="w-8 h-8" aria-hidden="true" />,
      title: "Easy Finance & EMI Options",
      description: "Flexible monthly payments with low interest rates — tailored for your lifestyle and budget.",
      ariaLabel: "Finance and EMI options with flexible payment plans"
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-8 h-8" aria-hidden="true" />,
      title: "Instant Insurance Coverage",
      description: "Protect your Mercedes-Benz from Day 1 with curated luxury insurance plans and comprehensive coverage.",
      ariaLabel: "Instant insurance coverage for comprehensive vehicle protection"
    }
  ], []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide for mobile every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % financeProtectionItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [financeProtectionItems.length]);

  return (
    <section className="w-full bg-white py-20 px-4 overflow-hidden" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Title with Premium Typography */}
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
            Finance & <span className="font-medium">Protection</span> Benefits
          </h2>
          
          <p className="text-lg text-black/60 max-w-3xl mx-auto font-light leading-relaxed">
            Seamless financing solutions and comprehensive protection for your luxury vehicle investment
          </p>
        </div>
      </div>

      {/* Desktop - Mercedes-Benz Premium Theme */}
      <div className="hidden md:block max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          {financeProtectionItems.map((item, index) => (
            <div
              key={item.id}
              className={`transform transition-all duration-700 ease-out ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Mercedes-Benz Premium Card */}
              <div className="bg-black text-white p-6 h-64 flex flex-col justify-between transition-all duration-300 hover:bg-gray-900 hover:shadow-2xl">
                
                {/* Icon and Title in one line */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 flex-shrink-0 text-white mt-1">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-light text-white tracking-wide leading-tight flex-1">
                    {item.title}
                  </h3>
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  {/* Description */}
                  <p className="text-xs text-white/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Mercedes-Benz Style Line Accent */}
                <div className="w-8 h-px bg-white/40 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile - Mercedes-Benz Style Slideshow */}
      <div className="md:hidden max-w-sm mx-auto">
        <div className="relative h-64 bg-black rounded-lg overflow-hidden">
          {financeProtectionItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              {/* Mercedes-Benz Premium Card Design */}
              <div className="h-full bg-black text-white p-6 flex flex-col justify-center">
                
                {/* Icon */}
                <div className="w-12 h-12 mb-4 text-white">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-light text-white mb-3 tracking-wide">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Mercedes-Benz Style Line Accent */}
                <div className="w-12 h-px bg-white/40"></div>
              </div>
            </div>
          ))}

          {/* Progress Indicators - Mercedes Style */}
          <div className="absolute bottom-4 left-6 flex space-x-2">
            {financeProtectionItems.map((_, index) => (
              <div
                key={index}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-6 h-px bg-white'
                    : 'w-2 h-px bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Slide Counter - Premium Style */}
          <div className="absolute top-4 right-6 text-white/60 text-sm font-light">
            {String(currentSlide + 1).padStart(2, '0')} / {String(financeProtectionItems.length).padStart(2, '0')}
          </div>
        </div>

        {/* Current Benefit Info Below Slideshow */}
        <div className="mt-4 text-center">
          <p className="text-xs text-black/60 italic">
            Auto-advancing every 2 seconds
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinanceBenefitsClient;