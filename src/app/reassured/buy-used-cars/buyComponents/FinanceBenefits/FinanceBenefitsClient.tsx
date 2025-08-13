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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Auto-cycle for mobile carousel with performance optimization
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % financeProtectionItems.length);
    }, 5000); // Increased interval for better UX

    return () => clearInterval(interval);
  }, [financeProtectionItems.length, isAutoPlaying, prefersReducedMotion]);

  // Entrance animation trigger with Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Disconnect after first trigger for performance
        }
      },
      { threshold: 0.1 }
    );

    const timer = setTimeout(() => {
      const element = document.getElementById('finance-benefits-section');
      if (element) observer.observe(element);
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Optimized carousel navigation
  const handleIndicatorClick = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  // Keyboard navigation for accessibility
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      setCurrentIndex((prev) => (prev - 1 + financeProtectionItems.length) % financeProtectionItems.length);
    } else if (event.key === 'ArrowRight') {
      setCurrentIndex((prev) => (prev + 1) % financeProtectionItems.length);
    }
  }, [financeProtectionItems.length]);

  return (
    <div 
      id="finance-benefits-section"
      className="w-full bg-white py-16 px-4 overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 
            id="finance-benefits-heading"
            className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight"
          >
            Finance & <span className="relative">
              Protection
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-black"></div>
            </span> Benefits
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Seamless financing solutions and comprehensive protection for your Mercedes-Benz luxury vehicle investment
          </p>
        </div>
      </div>

      {/* Desktop Grid Layout - 2 Columns */}
      <div className="hidden md:block max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {financeProtectionItems.map((item, index) => (
            <article
              key={item.id}
              className={`group relative transform transition-all duration-700 ease-out h-full ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ 
                transitionDelay: prefersReducedMotion ? '0ms' : `${index * 200}ms` 
              }}
              aria-labelledby={`benefit-title-${item.id}`}
              aria-describedby={`benefit-desc-${item.id}`}
            >
              {/* Card Container */}
              <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-black hover:shadow-xl transition-all duration-500 group-hover:scale-105 h-[320px] flex flex-col">
                
                {/* Subtle Shadow on Hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl shadow-gray-200"></div>

                {/* Icon Container */}
                <div className="relative z-10 mb-8 flex-shrink-0">
                  <div 
                    className="w-20 h-20 mx-auto bg-black rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    role="img"
                    aria-label={item.ariaLabel}
                  >
                    <div className={!prefersReducedMotion ? "group-hover:animate-pulse" : ""}>
                      {item.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center flex flex-col flex-grow">
                  {/* Title */}
                  <div className="mb-6 flex-shrink-0 h-[70px] flex items-center justify-center">
                    <h2 
                      id={`benefit-title-${item.id}`}
                      className="text-black font-bold text-xl leading-tight group-hover:text-gray-700 transition-colors duration-300 px-2"
                    >
                      {item.title}
                    </h2>
                  </div>
                  
                  {/* Description */}
                  <div className="flex-grow flex items-center justify-center">
                    <p 
                      id={`benefit-desc-${item.id}`}
                      className="text-gray-600 text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300 px-2"
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden max-w-sm mx-auto">
        <div 
          className="relative h-80 overflow-hidden"
          role="region"
          aria-label="Finance benefits carousel"
          aria-live="polite"
        >
          {financeProtectionItems.map((item, index) => (
            <article
              key={item.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                index === currentIndex
                  ? 'translate-x-0 opacity-100 scale-100'
                  : index < currentIndex
                  ? '-translate-x-full opacity-0 scale-95'
                  : 'translate-x-full opacity-0 scale-95'
              }`}
              aria-hidden={index !== currentIndex}
              aria-labelledby={`mobile-benefit-title-${item.id}`}
              aria-describedby={`mobile-benefit-desc-${item.id}`}
            >
              {/* Mobile Card */}
              <div className="relative bg-white border-2 border-gray-200 rounded-3xl p-8 mx-4 h-full flex flex-col justify-center shadow-lg">
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-black"></div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div 
                    className="w-24 h-24 mx-auto mb-8 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl"
                    role="img"
                    aria-label={item.ariaLabel}
                  >
                    <div className="transform scale-125">
                      {item.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 
                    id={`mobile-benefit-title-${item.id}`}
                    className="text-black font-bold text-xl mb-6 leading-tight"
                  >
                    {item.title}
                  </h2>

                  {/* Description */}
                  <p 
                    id={`mobile-benefit-desc-${item.id}`}
                    className="text-gray-600 text-base leading-relaxed px-2"
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Indicators */}
        <div 
          className="flex justify-center mt-8 space-x-3"
          role="tablist"
          aria-label="Carousel navigation"
        >
          {financeProtectionItems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-black scale-125'
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Show benefit ${index + 1} of ${financeProtectionItems.length}`}
              tabIndex={index === currentIndex ? 0 : -1}
            />
          ))}
        </div>

        {/* Screen Reader Announcements */}
        <div 
          className="sr-only" 
          aria-live="polite" 
          aria-atomic="true"
        >
          Showing benefit {currentIndex + 1} of {financeProtectionItems.length}
        </div>
      </div>

      {/* Pause/Play Control for Accessibility */}
      {!prefersReducedMotion && (
        <div className="flex justify-center mt-8 md:hidden">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
            aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
          >
            {isAutoPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FinanceBenefitsClient;