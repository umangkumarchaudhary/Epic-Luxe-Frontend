'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Sparkles, Shield, Award, ChevronDown, Phone } from 'lucide-react';
import Section2AboutEpicCars from '../LandingPage/AboutEpic_corrected';
import Section3WhyChooseUs from '../LandingPage/Section3WhyChooseUs';
import ThisMonthsHighlights from '../LandingPage/ThisMonthHighlights';
import VoicesOfDistinction from '../LandingPage/VoicesOfDistinction';
import LuxuryLeadForm from '../LandingPage/LuxuryLeadForm';
import ChooseYourJourneySection from '../LandingPage/ChooseYourJourneySection';
// Easing functions for smooth animations
const easeOutExpo = (t: number): number => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

const LandingPageClient = () => {
  const router = useRouter();
  const animationFrameRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number | null>(null);
  
  // Animation state for car entrance
  const [leftCarX, setLeftCarX] = useState(-500); // start further left for dramatic effect
  const [rightCarX, setRightCarX] = useState(500); // start further right
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Other state variables
  const [autoParallax, setAutoParallax] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  // Smooth car animation with easing
  useEffect(() => {
    const duration = 2000; // 2 seconds for smooth animation
    const leftStartPos = -500;
    const rightStartPos = 500;
    const leftEndPos = 0;
    const rightEndPos = 0;

  const animateCars = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Use easing function for smooth acceleration/deceleration
      const easedProgress = easeOutExpo(progress);

      // Calculate positions with easing
      const newLeftX = leftStartPos + (leftEndPos - leftStartPos) * easedProgress;
      const newRightX = rightStartPos + (rightEndPos - rightStartPos) * easedProgress;

      setLeftCarX(newLeftX);
      setRightCarX(newRightX);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateCars);
      } else {
        setAnimationComplete(true);
  startTimeRef.current = null;
      }
    };

    // Start animation after a brief delay for better UX
    const delayTimeout = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(animateCars);
    }, 300);

    return () => {
      clearTimeout(delayTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Continuous floating animation for completed cars
  useEffect(() => {
    if (!animationComplete) return;

  let floatFrame: number;
    let t = 0;
    
    const animateFloat = () => {
      t += 0.016; // ~60fps
      setAutoParallax({
        x: Math.sin(t * 0.3) * 120,
        y: Math.cos(t * 0.2) * 60
      });
  floatFrame = requestAnimationFrame(animateFloat);
    };
    
    animateFloat();
    
    return () => {
      if (floatFrame) {
        cancelAnimationFrame(floatFrame);
      }
    };
  }, [animationComplete]);

  // Simplified scroll handler - header always visible
  const handleScroll = useCallback(() => {
    // Header is now always visible, no complex logic needed
  }, []);


  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback(() => {
    if (!isMobile) {
      // Mouse position tracking can be implemented here if needed
    }
  }, [isMobile]);

  // Optimized resize handler
  const checkMobile = useCallback((): void => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setBuyDropdownOpen(false);
      setSellDropdownOpen(false);
    };

    if (buyDropdownOpen || sellDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [buyDropdownOpen, sellDropdownOpen]);

  useEffect(() => {
    // Progressive loading sequence
    const loadSequence = async () => {
      setContentLoaded(true);
      // Content loading sequence completed
    };
    
    loadSequence();
    checkMobile();
    
    // Throttled event listeners for performance
  let scrollTimeout: NodeJS.Timeout;
  let mouseMoveTimeout: NodeJS.Timeout;
    
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
        handleScroll();
      }, 16); // 60fps
    };
    
  const throttledMouseMove = () => {
      if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout);
  mouseMoveTimeout = setTimeout(() => handleMouseMove(), 16); // 60fps
    };
    
    window.addEventListener('resize', checkMobile, { passive: true });
    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('mousemove', throttledMouseMove);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout);
    };
  }, [handleScroll, handleMouseMove, checkMobile, contentLoaded]);

  const handleLuxeNavigation = () => {
    router.push('/luxe');
  };

  const handleReassuredNavigation = () => {
    router.push('/reassured');
  };

  // Navigation dropdown handlers
  const handleBuyDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setBuyDropdownOpen(!buyDropdownOpen);
    setSellDropdownOpen(false);
  };

  const handleSellDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSellDropdownOpen(!sellDropdownOpen);
    setBuyDropdownOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setBuyDropdownOpen(false);
    setSellDropdownOpen(false);
  };

  // Calculate smooth transforms with hardware acceleration
  const getLeftCarTransform = () => {
    const baseX = animationComplete 
      ? Math.sin(autoParallax.x * 0.02) * 15 
      : 0;
    const baseY = animationComplete 
      ? Math.sin(autoParallax.y * 0.015) * 8 
      : 0;
    
    return `translate3d(${leftCarX + baseX}px, ${-50 + baseY}%, 0)`;
  };

  const getRightCarTransform = () => {
    const baseX = animationComplete 
      ? -Math.sin(autoParallax.x * 0.02) * 15 
      : 0;
    const baseY = animationComplete 
      ? Math.cos(autoParallax.y * 0.015) * 8 
      : 0;
    
    return `translate3d(${rightCarX + baseX}px, ${-50 + baseY}%, 0)`;
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <div 
            className="text-2xl sm:text-3xl font-light tracking-[0.25em] mb-4"
            style={{
              fontFamily: 'Manrope, sans-serif',
              background: 'linear-gradient(90deg, #D4AF37 0%, #BFA980 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            EPIC CARS
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] mx-auto rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative w-full min-h-screen overflow bg-black font-manrope">
        {/* Loading Skeleton - Show until content is ready */}
        {!contentLoaded && <LoadingSkeleton />}
        
        {/* SEO Meta Content - Hidden but indexed */}
        <div className="sr-only">
          <h1>Epic Cars - Premium Used Cars in India | Luxury & Reliable Pre-owned Vehicles</h1>
          <p>Discover Epic Cars, India&apos;s premier destination for luxury and reliable used cars. Epic Luxe offers premium pre-owned vehicles while Epic Reassured provides quality certified cars in Pune, Hyderabad, Chennai, Nashik, and Visakhapatnam.</p>
          <div itemScope itemType="https://schema.org/AutoDealer">
            <span itemProp="name">Epic Cars</span>
            <span itemProp="description">Premium used cars dealership offering luxury and reliable pre-owned vehicles</span>
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="addressCountry">India</span>
              <span itemProp="addressLocality">Pune, Hyderabad, Chennai, Nashik, Visakhapatnam</span>
            </div>
          </div>
        </div>

        {/* Premium Navigation Header - Always visible */}
        <header className="fixed top-0 left-0 right-0 z-[9999] translate-y-0 opacity-100 bg-black/98 backdrop-blur-2xl border-b border-[#D4AF37]/20 shadow-lg transition-all duration-700 ease-out">
          <nav className="px-6 sm:px-8 lg:px-12 py-4 sm:py-4 relative" role="navigation" aria-label="Main navigation">
            <div className="flex items-center justify-between">
              {/* Logo - Left */}
              <div className={`transition-all duration-1000 transform ${
                contentLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              }`}>
                <h1 
                  className="text-lg sm:text-xl lg:text-2xl font-light tracking-[0.25em] cursor-pointer"
                  onClick={() => router.push('/')}
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    background: 'linear-gradient(90deg, #D4AF37 0%, #BFA980 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    backgroundSize: '200% auto',
                    animation: 'goldShimmer 8s linear infinite'
                  }}
                >
                  EPIC CARS
                </h1>
              </div>

              {/* Central Navigation - Buy Now and Sell Now with Dropdowns */}
              <div className={`hidden md:flex items-center space-x-8 transition-all duration-1000 delay-200 transform ${
                contentLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              }`}>
                
                {/* Buy Now Dropdown */}
                <div className="relative">
                  <button 
                    onClick={handleBuyDropdown}
                    className="group flex items-center space-x-2 px-6 py-2 text-white hover:text-[#D4AF37] transition-all duration-300 font-medium tracking-wide hover:scale-105"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                    aria-expanded={buyDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span className="relative">
                      Buy Now
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] group-hover:w-full transition-all duration-300"></div>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${buyDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Sell Now Dropdown */}
                <div className="relative">
                  <button 
                    onClick={handleSellDropdown}
                    className="group flex items-center space-x-2 px-6 py-2 text-white hover:text-[#D4AF37] transition-all duration-300 font-medium tracking-wide hover:scale-105"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                    aria-expanded={sellDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span className="relative">
                      Sell Now
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] group-hover:w-full transition-all duration-300"></div>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${sellDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Call Now Button - Right */}
              <div className={`transition-all duration-1000 transform ${
                contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <a 
                  href="tel:+919876543210" 
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-semibold rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/25 hover:scale-105 transition-all duration-300 group"
                >
                  <Phone className="w-4 h-4 group-hover:animate-pulse" />
                  <span className="font-medium tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>Call Now</span>
                </a>
              </div>
            </div>
          </nav>
        </header>

        {/* Buy Now Dropdown Portal - Fixed positioning */}
        {buyDropdownOpen && (
          <div className="fixed top-16 left-1/2 transform -translate-x-32 z-[99999] w-64 bg-black/95 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl shadow-2xl transition-all duration-300">
            <div className="p-2">
              {/* Epic Luxe Option */}
              <button
                onClick={() => handleNavigation('/luxe')}
                className="group/item w-full text-left p-4 rounded-lg hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#BFA980]/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[#D4AF37] font-semibold text-lg tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Epic Luxe
                    </h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover/item:translate-x-1 transition-transform duration-300" />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <Sparkles className="w-3 h-3 text-amber-500/60" />
                  <span className="text-xs text-gray-500 tracking-wider">Exclusive Collection</span>
                </div>
              </button>
              
              {/* Divider */}
              <div className="my-2 mx-4 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
              
              {/* Epic Reassured Option */}
              <button
                onClick={() => handleNavigation('/reassured')}
                className="group/item w-full text-left p-4 rounded-lg hover:bg-gradient-to-r hover:from-gray-800/30 hover:to-gray-700/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Epic Reassured
                    </h3>
                    
                  </div>
                  <ChevronRight className="w-5 h-5 text-white group-hover/item:translate-x-1 transition-transform duration-300" />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <Shield className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500 tracking-wider">Verified Quality</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Sell Now Dropdown Portal - Fixed positioning */}
        {sellDropdownOpen && (
          <div className="fixed top-16 left-1/2 transform translate-x-8 z-[99999] w-64 bg-black/95 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl shadow-2xl transition-all duration-300">
            <div className="p-2">
              {/* Sell to Epic Luxe */}
              <button
                onClick={() => handleNavigation('/sell/luxe')}
                className="group/item w-full text-left p-4 rounded-lg hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#BFA980]/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[#D4AF37] font-semibold text-lg tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Sell to Epic Luxe
                    </h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover/item:translate-x-1 transition-transform duration-300" />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <Award className="w-3 h-3 text-amber-500/60" />
                  <span className="text-xs text-gray-500 tracking-wider">Best Prices</span>
                </div>
              </button>
              
              {/* Divider */}
              <div className="my-2 mx-4 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
              
              {/* Sell to Epic Reassured */}
              <button
                onClick={() => handleNavigation('/sell/reassured')}
                className="group/item w-full text-left p-4 rounded-lg hover:bg-gradient-to-r hover:from-gray-800/30 hover:to-gray-700/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Sell to Epic Reassured
                    </h3>
                   
                  </div>
                  <ChevronRight className="w-5 h-5 text-white group-hover/item:translate-x-1 transition-transform duration-300" />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <Shield className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500 tracking-wider">Hassle Free</span>
                </div>
              </button>
            </div>
          </div>
        )}

        
        <section
          className={`relative w-full h-screen flex justify-center overflow-hidden ${isMobile ? 'mt-16' : 'mt-16'}`}
        >
          {/* Background Image - Responsive for Desktop/Mobile */}
          <div className="absolute inset-0 z-0">
            {/* Desktop Background */}
            <div className="hidden md:block w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/landingpage.jpg"
                alt="Epic Cars Background Desktop"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            
            {/* Mobile Background */}
            <div className="block md:hidden w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/mainhero2.jpeg"
                alt="Epic Cars Background Mobile"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            
           
          </div>

          {/* Desktop View - Cars on left and right with buttons */}
          <div className="hidden md:block w-full h-full relative">
            {/* Left Side Car - Epic Luxe */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '48px',
                transform: getLeftCarTransform(),
                zIndex: 20,
                willChange: 'transform',
                opacity: contentLoaded ? 1 : 0,
              }}
            >
              <div className="group cursor-pointer" onClick={handleLuxeNavigation}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/rightside.png"
                  alt="Epic Luxe Car"
                  width={500}
                  height={350}
                  className="object-contain filter drop-shadow-2xl group-hover:scale-105 transition-all duration-500"
                  loading="eager"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            </div>

            {/* Right Side Car - Epic Reassured */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '48px',
                transform: getRightCarTransform(),
                zIndex: 20,
                willChange: 'transform',
                opacity: contentLoaded ? 1 : 0,
              }}
            >
              <div className="group cursor-pointer" onClick={handleReassuredNavigation}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/leftside.png"
                  alt="Epic Reassured Car"
                  width={500}
                  height={350}
                  className="object-contain filter drop-shadow-2xl group-hover:scale-105 transition-all duration-500"
                  loading="eager"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-l from-gray-400/20 to-gray-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            </div>

            {/* Desktop Buttons - 20px margin from image edge */}
            <div className="absolute bottom-30 left-5 right-0 flex justify-between px-16 z-30">
              {/* Explore LUXE Button */}
              <button
                onClick={handleLuxeNavigation}
                className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-bold rounded-full hover:shadow-2xl hover:shadow-[#D4AF37]/40 hover:scale-110 transition-all duration-500 transform hover:-translate-y-2"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-xl tracking-wide">Explore LUXE</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>

              {/* Explore Reassured Button */}
              <button
                onClick={handleReassuredNavigation}
                className="group flex items-center space-x-3 px-8 py-4 bg-white/90 backdrop-blur-sm text-black font-bold rounded-full hover:bg-white hover:shadow-2xl hover:shadow-white/25 hover:scale-110 transition-all duration-500 transform hover:-translate-y-2"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                <Shield className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xl tracking-wide">Explore Reassured</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Mobile View - Stacked buttons */}
          <div className="block md:hidden w-full h-full relative">
            {/* Mobile Buttons Container - Bottom positioned with margin */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-60 z-30">
              <div className="flex flex-col space-y-6">
                {/* Explore LUXE Button - Black background with white text */}
                <button
                  onClick={handleLuxeNavigation}
                  className="group flex items-center justify-center space-x-3 px-8 py-5 bg-black/90 backdrop-blur-sm text-white font-bold rounded-full border-2 border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-lg tracking-wide">Explore LUXE</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                {/* Explore Reassured Button - White background with black text */}
                <button
                  onClick={handleReassuredNavigation}
                  className="group flex items-center justify-center space-x-3 px-8 py-5 bg-white/95 backdrop-blur-sm text-black font-bold rounded-full border-2 border-gray-300 hover:bg-black hover:text-white hover:border-white hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  <Shield className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-lg tracking-wide">Explore Reassured</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tagline Below Hero - Hidden on mobile to maintain clean split */}
        {!isMobile && (
          <section className={`relative w-full py-12 bg-gradient-to-b from-black via-gray-900 to-black transition-all duration-1500 transform ${
            contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="text-center">
              <p className="text-2xl lg:text-3xl">
                <span style={{ fontFamily: 'Manrope, sans-serif' }} className="font-light text-gray-400">
                  Choose Your Journey
                </span>
                <span className="mx-3 text-amber-500/60">·</span>
                <span style={{ fontFamily: 'Manrope, sans-serif' }} className="font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA980]">
                  Experience Excellence
                </span>
              </p>
            </div>
          </section>
        )}
        
        {/* SEO Content - Hidden but crawlable */}
        <section className="sr-only">
          <div>
            <h2>Used Cars Available in Major Indian Cities</h2>
            <div>
              <h3>Epic Cars Pune - Used Car Dealership in Maharashtra</h3>
              <p>Find the best used cars in Pune at Epic Cars. We offer both luxury and reliable pre-owned vehicles with certified quality assurance.</p>
              <h3>Epic Cars Hyderabad - Pre-owned Vehicles in Telangana</h3>
              <p>Looking for used cars in Hyderabad? Epic Cars provides premium second-hand cars with complete documentation and quality guarantee.</p>
              <h3>Epic Cars Nashik - Second Hand Cars in Maharashtra</h3>
              <p>Discover quality used cars in Nashik at Epic Cars. Our Epic Reassured collection offers reliable pre-owned vehicles at competitive prices.</p>
              <h3>Epic Cars Visakhapatnam - Used Car Dealer in Andhra Pradesh</h3>
              <p>Epic Cars Vizag specializes in certified used cars with luxury and standard options. Best pre-owned car deals in Visakhapatnam.</p>
              <h3>Epic Cars Chennai - Premium Used Cars in Tamil Nadu</h3>
              <p>Find luxury and reliable used cars in Chennai at Epic Cars. Epic Luxe offers premium pre-owned vehicles while Epic Reassured provides quality standard cars.</p>
            </div>
            <div>
              <h3>Why Choose Epic Cars for Used Cars in India?</h3>
              <ul>
                <li>Certified quality assurance on all pre-owned vehicles</li>
                <li>Two specialized divisions: Epic Luxe for luxury cars, Epic Reassured for standard cars</li>
                <li>Multiple locations across India: Pune, Hyderabad, Nashik, Visakhapatnam, Chennai</li>
                <li>Complete documentation and transparent pricing</li>
                <li>Professional inspection and quality guarantee</li>
                <li>Financing options available for used car purchases</li>
              </ul>
            </div>
          </div>
        </section>

  
        <Section2AboutEpicCars/>
        <ThisMonthsHighlights/>
        <Section3WhyChooseUs/>
        <VoicesOfDistinction/>
        <LuxuryLeadForm/>
        <ChooseYourJourneySection/>

        {/* Enhanced Styles for smooth animations */}
        <style jsx>{`
          /* Performance optimizations */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Prevent layout shifts */
          img {
            content-visibility: auto;
            contain: layout style paint;
          }
          
          /* Hardware acceleration for animations */
          @keyframes goldShimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.2;
            }
            33% {
              transform: translateY(-20px) rotate(120deg);
              opacity: 0.6;
            }
            66% {
              transform: translateY(-10px) rotate(240deg);
              opacity: 0.4;
            }
          }
          
          @keyframes kenBurnsLeft {
            0% {
              transform: scale(1.1) translate3d(0, 0, 0);
              will-change: transform;
            }
            100% {
              transform: scale(1.2) translate3d(-2%, -1%, 0);
            }
          }
          
          @keyframes kenBurnsRight {
            0% {
              transform: scale(1.1) translate3d(0, 0, 0);
              will-change: transform;
            }
            100% {
              transform: scale(1.2) translate3d(2%, -1%, 0);
            }
          }
          
          @keyframes pulseGlow {
            0%, 100% {
              opacity: 1;
              box-shadow: 0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3);
            }
            50% {
              opacity: 0.8;
              box-shadow: 0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.4);
            }
          }
          
          .animate-pulseGlow {
            animation: pulseGlow 6s ease-in-out infinite;
          }
          
          /* Critical CSS for above-the-fold content */
          .hero-container {
            contain: layout style paint;
            content-visibility: auto;
          }
          
          /* Optimize backdrop-blur for performance */
          .backdrop-blur-xl, .backdrop-blur-2xl {
            -webkit-backdrop-filter: blur(24px);
            backdrop-filter: blur(24px);
            contain: layout style paint;
          }
          
          /* Font loading optimization */
          @font-face {
            font-family: 'Manrope';
            font-display: swap;
            src: local('Manrope');
          }

          /* Smooth hardware-accelerated transforms */
          .car-transform {
            will-change: transform;
            backface-visibility: hidden;
            perspective: 1000px;
            transform-style: preserve-3d;
          }

          /* Optimized animations */
          @keyframes smoothSlideIn {
            from {
              transform: translate3d(-500px, -50%, 0);
              opacity: 0;
            }
            to {
              transform: translate3d(0px, -50%, 0);
              opacity: 1;
            }
          }

          @keyframes smoothSlideInRight {
            from {
              transform: translate3d(500px, -50%, 0);
              opacity: 0;
            }
            to {
              transform: translate3d(0px, -50%, 0);
              opacity: 1;
            }
          }

          /* Reduce motion for accessibility */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }

          /* GPU acceleration for transforms */
          .transform-gpu {
            transform: translateZ(0);
            will-change: transform;
          }
        `}</style>
      </div>
    </>
  );
}

export default LandingPageClient;