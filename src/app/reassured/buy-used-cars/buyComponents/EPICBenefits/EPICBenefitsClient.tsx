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
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Get only first 5 benefits
  const displayBenefits = useMemo(() => benefits.slice(0, 5), [benefits]);

  // Auto-slide for mobile every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayBenefits.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [displayBenefits.length]);

  return (
    <section className="w-full bg-white py-5 px-4 overflow-hidden" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Title with Premium Typography */}
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
            Epic <span className="font-medium">Reassured</span> Benefits
          </h2>
          
          
        </div>
      </div>

      {/* Desktop - Mercedes-Benz Premium Theme */}
      <div className="hidden md:block max-w-7xl mx-auto">
        <div className="grid grid-cols-5 gap-6">
          {displayBenefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className={`transform transition-all duration-700 ease-out ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Mercedes-Benz Premium Card */}
              <div className="bg-black text-white p-4 h-72 flex flex-col justify-between transition-all duration-300 hover:bg-gray-900 hover:shadow-2xl">
                
                {/* Icon and Title in one line */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 flex-shrink-0 text-white mt-1">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xs font-light text-white tracking-wide leading-tight flex-1">
                    {benefit.title}
                  </h3>
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  {/* Description */}
                  <p className="text-xs text-white/80 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Mercedes-Benz Style Line Accent */}
                <div className="w-8 h-px bg-white/40 mt-3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile - Mercedes-Benz Style Slideshow */}
      <div className="md:hidden max-w-sm mx-auto">
        <div className="relative h-64 bg-black rounded-lg overflow-hidden">
          {displayBenefits.map((benefit, index) => (
            <div
              key={benefit.id}
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
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-light text-white mb-3 tracking-wide">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  {benefit.description}
                </p>

                {/* Mercedes-Benz Style Line Accent */}
                <div className="w-12 h-px bg-white/40"></div>
              </div>
            </div>
          ))}

          {/* Progress Indicators - Mercedes Style */}
          <div className="absolute bottom-4 left-6 flex space-x-2">
            {displayBenefits.map((_, index) => (
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
            {String(currentSlide + 1).padStart(2, '0')} / {String(displayBenefits.length).padStart(2, '0')}
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

export default EpicReassuredBenefitsClient;