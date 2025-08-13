'use client';

// EpicReassuredBenefitsClient.tsx - Client Component (Interactive)
import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface Benefit {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  seoKeywords?: string[];
  detailedDescription?: string;
}

interface EpicReassuredBenefitsClientProps {
  benefits: Benefit[];
}

const EpicReassuredBenefitsClient: React.FC<EpicReassuredBenefitsClientProps> = ({ benefits }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle for mobile carousel (with pause on interaction)
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [benefits.length, isPaused]);

  // Handle manual navigation
  const handleIndicatorClick = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    // Resume auto-play after 6 seconds
    setTimeout(() => setIsPaused(false), 6000);
  }, []);

  // Split benefits into rows for desktop grid
  const benefitRows = useMemo(() => {
    const firstRow = benefits.slice(0, 4);
    const secondRow = benefits.slice(4, 8);
    return [firstRow, secondRow];
  }, [benefits]);

  return (
    <section className="w-full bg-white py-20 px-4 overflow-hidden" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Title with Premium Typography */}
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
            Epic <span className="font-medium">Reassured</span> Benefits
          </h2>
          
          {/* Subtle Line Accent */}
          <div className="w-24 h-px bg-black/20 mx-auto mb-6"></div>
          
          <p className="text-lg text-black/60 max-w-3xl mx-auto font-light leading-relaxed">
            Experience unparalleled confidence with our comprehensive suite of services, 
            designed to make luxury car ownership effortless and worry-free
          </p>
        </div>
      </div>

      {/* Desktop Grid Layout - Mercedes-Benz Style */}
      <div className="hidden lg:block max-w-7xl mx-auto">
        {benefitRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-6 mb-6">
            {row.map((benefit, index) => {
              const actualIndex = rowIndex * 4 + index;
              return (
                <div
                  key={benefit.id}
                  className={`group relative transform transition-all duration-700 ease-out ${
                    isVisible 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${actualIndex * 100}ms` }}
                  onMouseEnter={() => setHoveredIndex(actualIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Benefit Card - Clean Minimal Design */}
                  <div className="relative bg-white border border-black/10 p-8 h-[320px] flex flex-col transition-all duration-500 hover:border-black/30 hover:shadow-xl">
                    
                    {/* Hover Effect - Subtle Background */}
                    <div className={`absolute inset-0 bg-black/[0.02] transition-opacity duration-300 ${
                      hoveredIndex === actualIndex ? 'opacity-100' : 'opacity-0'
                    }`}></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon - Minimal Style */}
                      <div className="mb-6 flex-shrink-0">
                        <div className={`w-12 h-12 flex items-center justify-center transition-all duration-300 ${
                          hoveredIndex === actualIndex ? 'text-black' : 'text-black/60'
                        }`}>
                          {benefit.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-base font-medium mb-3 transition-colors duration-300 ${
                        hoveredIndex === actualIndex ? 'text-black' : 'text-black/80'
                      }`}>
                        {benefit.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-black/60 leading-relaxed flex-grow">
                        {benefit.description}
                      </p>

                      {/* Learn More Link - Appears on Hover */}
                      <div className={`mt-4 pt-4 border-t border-black/10 transition-all duration-300 ${
                        hoveredIndex === actualIndex ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <span className="text-xs font-medium text-black tracking-wider cursor-pointer hover:underline">
                          LEARN MORE →
                        </span>
                      </div>
                    </div>

                    {/* Index Number - Subtle Corner Design */}
                    <div className="absolute top-8 right-8 text-4xl font-light text-black/5">
                      {String(actualIndex + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Tablet Grid (2 columns) */}
      <div className="hidden md:block lg:hidden max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className={`transform transition-all duration-700 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white border border-black/10 p-6 h-[280px] hover:border-black/30 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 mb-4 text-black/70">
                  {benefit.icon}
                </div>
                <h3 className="text-base font-medium text-black mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Carousel - Premium Style */}
      <div className="md:hidden max-w-sm mx-auto">
        <div className="relative h-[400px]">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-95 z-0'
              }`}
            >
              {/* Mobile Card - Clean Design */}
              <div className="bg-white border border-black/10 mx-4 h-full flex flex-col justify-center p-8">
                
                {/* Number Badge */}
                <div className="absolute top-6 right-6 text-3xl font-light text-black/10">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 mx-auto mb-6 text-black/80">
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-medium text-black text-center mb-4">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-base text-black/60 text-center leading-relaxed">
                  {benefit.description}
                </p>

                {/* CTA */}
                <button className="mt-6 mx-auto text-xs font-medium text-black tracking-wider border-b border-black/30 pb-1 hover:border-black transition-colors duration-200">
                  EXPLORE BENEFIT
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Indicators - Mercedes Style */}
        <div className="flex justify-center mt-8 space-x-3">
          {benefits.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 h-1 bg-black'
                  : 'w-1 h-1 bg-black/20 hover:bg-black/40'
              }`}
              aria-label={`Go to benefit ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Indicators - Bottom Section */}
      <div className="max-w-7xl mx-auto mt-20 pt-12 border-t border-black/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className={`transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '800ms' }}>
            <p className="text-3xl font-light text-black mb-2">10,000+</p>
            <p className="text-sm text-black/60">Satisfied Customers</p>
          </div>
          <div className={`transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '900ms' }}>
            <p className="text-3xl font-light text-black mb-2">360°</p>
            <p className="text-sm text-black/60">Quality Checks</p>
          </div>
          <div className={`transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '1000ms' }}>
            <p className="text-3xl font-light text-black mb-2">50+</p>
            <p className="text-sm text-black/60">Cities Covered</p>
          </div>
          <div className={`transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '1100ms' }}>
            <p className="text-3xl font-light text-black mb-2">4.8/5</p>
            <p className="text-sm text-black/60">Customer Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EpicReassuredBenefitsClient;