'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

// Analytics helper with safeguard
const trackEvent = (event: string, section: string, label: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event, section, label });
  }
};

// Declare window.dataLayer type
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

const Section2AboutEpicCars = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scroll handler for parallax
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            setIsVisible(true);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Partner brands
  const partnerBrands = [
    'Mercedes-Benz',
    'MG',
    'Toyota', 
    'Honda',
    'Ather',
    'Porsche'
  ];

  return (
    <>
      {/* Preconnect to font sources (commented for production) */}
      {/* 
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      */}

      {/* SECTION 2: About Epic Cars */}
      <section 
        ref={sectionRef}
        id="about-epic-cars"
        className="relative overflow-hidden py-24 md:py-25 lg:py-25"
        style={{
          background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 40%, rgba(212,175,55,0.05) 60%, #0D0D0D 100%)',

        }}
        role="region"
        aria-label="About Epic Cars"
      >
        {/* Subtle animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.02]"
            style={{
              background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
              transform: `translateY(${scrollY * 0.05}px) rotate(${scrollY * 0.02}deg)`,
              filter: 'blur(100px)'
            }}
          />
          <div 
            className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full opacity-[0.02]"
            style={{
              background: 'radial-gradient(circle, #EAD9B8 0%, transparent 70%)',
              transform: `translateY(${-scrollY * 0.03}px) rotate(${-scrollY * 0.02}deg)`,
              filter: 'blur(120px)'
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Copy */}
            <div className="space-y-8 md:pr-8">
              {/* Headline with staggered fade-up */}
              <h2 
                className={`text-5xl sm:text-6xl md:text-4xl lg:text-5xl xl:text-6xl leading-[0.95] tracking-tight transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  fontFamily: 'Cormorant Garamond, Playfair Display, serif',
                  fontWeight: 300,
                  background: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 25%, #F4E4C1 50%, #FFD700 75%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% 100%',
                  animation: isVisible ? 'goldShimmer 8s linear infinite' : 'none',
                  transitionDelay: '0ms'
                }}
              >
                A New Era of<br />
                Pre-Owned Excellence
              </h2>

              {/* Paragraph with fade-up delay */}
              <p 
                className={`text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed tracking-wide transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  fontFamily: 'Inter, Manrope, sans-serif',
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                  lineHeight: '1.7',
                  transitionDelay: '200ms'
                }}
              >
                Epic Cars brings together the opulence of Epic Luxe and the assured quality of Epic Reassured. 
                Backed by the Raam Group's decades of automotive leadership, we deliver not just cars — 
                we deliver trust, heritage, and unmatched ownership experiences.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => trackEvent('cta_click', 'about_epic_cars', 'discover_collection')}
                className={`group inline-flex items-center space-x-3 transition-all duration-1000 ease-out hover:scale-[1.02] ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '400ms' }}
                aria-label="Discover our collection"
              >
                <span 
                  className="text-sm uppercase tracking-[0.2em] transition-colors duration-300"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    background: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Discover Our Legacy
                </span>
                <ArrowRight 
                  className="w-5 h-5 text-amber-500 transition-transform duration-300 group-hover:translate-x-2" 
                />
              </button>
            </div>

            {/* Right Column: Brand Strip */}
            <div 
              className={`relative transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-12'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {/* Glass morphism card */}
              <div 
                className="relative rounded-3xl p-8 md:p-10 lg:p-12"
                style={{
                  background: 'rgba(28, 28, 28, 0.4)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212, 175, 55, 0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Section label */}
                <div className="text-center mb-10">
                  <p 
                    className="text-xs uppercase tracking-[0.3em] font-light"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgba(212, 175, 55, 0.6)'
                    }}
                  >
                    Trusted Partners
                  </p>
                </div>

                {/* Brand logos grid with parallax */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                  {partnerBrands.map((brand, index) => (
                    <div
                      key={brand}
                      className={`flex items-center justify-center p-4 rounded-xl transition-all duration-700 hover:scale-105 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        transitionDelay: `${600 + (index * 100)}ms`,
                        transform: `translateY(${scrollY * (index % 2 === 0 ? 0.02 : -0.02)}px)`,
                        background: 'rgba(212, 175, 55, 0.03)',
                        border: '1px solid rgba(212, 175, 55, 0.08)'
                      }}
                      aria-label={`${brand} partner logo`}
                    >
                      <span
                        className="text-xl md:text-2xl font-light tracking-wider select-none"
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          background: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 25%, #F4E4C1 50%, #FFD700 75%, #D4AF37 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter: 'brightness(0.9)',
                          opacity: 0.8
                        }}
                      >
                        {brand}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom accent */}
                <div className="mt-10 flex justify-center">
                  <div 
                    className="w-16 h-[1px]"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(15, 15, 16, 0.5))'
          }}
        />
      </section>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes goldShimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Focus styles for accessibility */
        button:focus-visible {
          outline: 2px solid #D4AF37;
          outline-offset: 4px;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default Section2AboutEpicCars;