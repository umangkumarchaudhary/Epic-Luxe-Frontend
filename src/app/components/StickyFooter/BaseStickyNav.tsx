'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../../app/GlobalFonts.css';

interface CTAButton {
  id: string;
  label: string;
  route: string;
  isPhone?: boolean;
}

interface BaseStickyNavProps {
  ctaButtons: CTAButton[];
  trackingPrefix?: string;
}

const BaseStickyNav: React.FC<BaseStickyNavProps> = ({ 
  ctaButtons, 
  trackingPrefix = 'sticky-nav' 
}) => {
  const router = useRouter();
  const [currentCTAIndex, setCurrentCTAIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Mobile CTA rotation logic
  useEffect(() => {
    if (ctaButtons.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentCTAIndex((prev) => (prev + 1) % ctaButtons.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ctaButtons.length]);

  // Scroll behavior logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - show sticky footer
        setIsVisible(true);
      } else {
        // Scrolling up - hide sticky footer
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleCTAClick = (cta: CTAButton) => {
    // Event tracking
    console.log(`${trackingPrefix}: ${cta.label} clicked`, {
      route: cta.route,
      timestamp: new Date().toISOString(),
      position: currentCTAIndex
    });

    if (cta.isPhone) {
      window.location.href = cta.route;
    } else {
      router.push(cta.route);
    }
  };

  const currentCTA = ctaButtons[currentCTAIndex];

  return (
    // Hide on medium screens and up (md:hidden = desktop hidden)
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-500 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Glassmorphism Background */}
      <div className="bg-black/70 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          
          {/* Mobile Layout - Single Rotating CTA */}
          <div className="flex justify-center">
            <button
              onClick={() => handleCTAClick(currentCTA)}
              className="group relative overflow-hidden w-full max-w-sm bg-gradient-to-r from-[#D4AF37] to-[#BFA980] 
                       text-[#0e0e0e] font-semibold py-4 px-6 rounded-xl
                       transform transition-all duration-300 ease-out
                       hover:scale-[1.02] active:scale-[0.98]
                       shadow-lg hover:shadow-2xl font-primary"
            >
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <span className="text-lg font-semibold tracking-wide">
                  {currentCTA.label}
                </span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                            bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            transition-transform duration-700 ease-out" />
            </button>
          </div>

          {/* Mobile CTA Indicators */}
          {ctaButtons.length > 1 && (
            <div className="flex justify-center mt-3 space-x-2">
              {ctaButtons.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentCTAIndex 
                      ? 'bg-[#D4AF37] scale-125' 
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseStickyNav;
