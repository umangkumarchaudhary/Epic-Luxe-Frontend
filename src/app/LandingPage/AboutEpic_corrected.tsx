'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
    dataLayer?: Record<string, unknown>[];
  }
}

const Section2AboutEpicCars = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

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

    const sectionEl = sectionRef.current; // capture ref value once
    if (sectionEl) {
      observer.observe(sectionEl);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionEl) { // use captured value
        observer.unobserve(sectionEl);
      }
    };
  }, []);


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
          background: '#000000',
        }}
        role="region"
        aria-label="About Epic Cars"
      >

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
                } text-white`}
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 700,
          transitionDelay: '0ms'
        }}
              >
                A New Era of<br />
                Pre-Owned Excellence
              </h2>

              {/* Paragraph with fade-up delay */}
              <p 
                className={`text-white text-base sm:text-lg lg:text-xl leading-relaxed tracking-wide transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  lineHeight: '1.7',
                  transitionDelay: '200ms'
                }}
              >
                Epic Cars brings together the opulence of Epic Luxe and the assured quality of Epic Reassured. 
                Backed by the Raam Group&apos;s decades of automotive leadership, we deliver not just cars — 
                we deliver trust, heritage, and unmatched ownership experiences.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => {
                  trackEvent('cta_click', 'about_epic_cars', 'discover_collection');
                  router.push('/AboutUs');
                }}
                className={`group inline-flex items-center space-x-3 transition-all duration-1000 ease-out hover:scale-[1.02] ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '400ms' }}
                aria-label="Discover our collection"
              >
                <span 
                  className="text-sm uppercase tracking-[0.2em] transition-colors duration-300 text-white"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 600,
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
                {/* Main About Us Image */}
                <div className="flex items-center justify-center">
                  <div
                    className={`transition-all duration-1000 ease-out ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      transitionDelay: '600ms'
                    }}
                  >
                    <Image
                      src="/assets/images/newAboutUs.jpeg"
                      alt="About Epic Cars - Our Brand Story"
                      width={500}
                      height={300}
                      className="rounded-2xl"
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: 'auto',
                        maxWidth: '500px'
                      }}
                      priority
                    />
                  </div>
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

        @keyframes brandShimmer {
          0% {
            background-position: 0% 50%;
            opacity: 0.6;
          }
          50% {
            background-position: 100% 50%;
            opacity: 1;
          }
          100% {
            background-position: 200% 50%;
            opacity: 0.6;
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