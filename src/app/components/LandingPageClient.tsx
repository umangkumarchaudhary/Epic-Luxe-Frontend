'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronRight, Sparkles, Shield, Award, ChevronDown, Phone, MessageCircle, X} from 'lucide-react';

import Section2AboutEpicCars from '../LandingPage/AboutEpic_corrected';
import Section3WhyChooseUs from '../LandingPage/Section3WhyChooseUs';
import ThisMonthsHighlights from '../LandingPage/ThisMonthHighlights';
import VoicesOfDistinction from '../LandingPage/VoicesOfDistinction';
import LuxuryLeadForm from '../LandingPage/LuxuryLeadForm';
import EpicCarsPage from '../LandingPage/ChooseYourJourneySection';

const LandingPageClient = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'luxe' | 'reassured' | null>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isLuxeLoading, setIsLuxeLoading] = useState(false);
  const [isReassuredLoading, setIsReassuredLoading] = useState(false);
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false);
  const [whatsappVisible, setWhatsappVisible] = useState(true);
  const [whatsappMessageIndex, setWhatsappMessageIndex] = useState(0);
  const [showWhatsappMessage, setShowWhatsappMessage] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Simplified scroll handler - header always visible
  const handleScroll = useCallback(() => {
    // Header is now always visible, no complex logic needed
  }, []);

  // Memoized WhatsApp messages to prevent recreation
  const whatsappMessages = useMemo(() => [
    "Need help? Chat now! 🚗",
    "Find your car? 💭", 
    "Questions? Ask us! 🤝",
    "Best deals here! 💰"
  ], []);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isMobile) {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    }
  }, [isMobile]);

  // Optimized resize handler
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    // Progressive loading sequence
    const loadSequence = async () => {
      // Phase 1: Basic content ready
      setContentLoaded(true);
      
      // Phase 2: Layout ready
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      
      // Phase 3: Images loaded
      setTimeout(() => {
        setImagesLoaded(true);
      }, 200);
    };
    
    loadSequence();
    checkMobile();
    
    // Throttled event listeners for performance
    let scrollTimeout: NodeJS.Timeout;
    let mouseMoveTimeout: NodeJS.Timeout;
    
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 16); // 60fps
    };
    
    const throttledMouseMove = (e: MouseEvent) => {
      if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => handleMouseMove(e), 16); // 60fps
    };
    
    window.addEventListener('resize', checkMobile, { passive: true });
    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    
    // WhatsApp message rotation with delay after content loads
    const initialDelay = setTimeout(() => {
      if (contentLoaded) {
        setShowWhatsappMessage(true);
      }
    }, 3000);
    
    const messageInterval = setInterval(() => {
      setWhatsappMessageIndex(prev => (prev + 1) % whatsappMessages.length);
      setShowWhatsappMessage(true);
      
      setTimeout(() => {
        setShowWhatsappMessage(false);
      }, 4000);
    }, 8000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('mousemove', throttledMouseMove);
      clearTimeout(initialDelay);
      clearInterval(messageInterval);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout);
    };
  }, [handleScroll, handleMouseMove, checkMobile, contentLoaded, whatsappMessages]);

  const handleLuxeNavigation = () => {
    setIsLuxeLoading(true);
    router.push('/luxe');
  };

  const handleReassuredNavigation = () => {
    setIsReassuredLoading(true);
    router.push('/reassured');
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
    <div className="relative w-full min-h-screen overflow bg-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Loading Skeleton - Show until content is ready */}
      {!contentLoaded && <LoadingSkeleton />}
      
      {/* Font Preloading for Performance */}
      <link 
        rel="preload" 
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" 
        as="style"
        onLoad={() => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap';
          document.head.appendChild(link);
        }}
      />
      
      {/* SEO Meta Content - Hidden but indexed */}
      <div className="sr-only">
        <h1>Epic Cars - Premium Used Cars in India | Luxury & Reliable Pre-owned Vehicles</h1>
        <p>Discover Epic Cars, India's premier destination for luxury and reliable used cars. Epic Luxe offers premium pre-owned vehicles while Epic Reassured provides quality certified cars in Pune, Hyderabad, Chennai, Nashik, and Visakhapatnam.</p>
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
    <nav className="px-6 sm:px-8 lg:px-12 py-2 sm:py-3 z-[10000]" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <div className={`transition-all duration-1000 transform ${
              contentLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}>
              <h1 
                className="text-lg sm:text-xl lg:text-2xl font-light tracking-[0.25em] cursor-pointer"
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

            {/* Central Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Buy Now and Sell Now removed for clean re-addition */}
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

      {/* Hero Section Container - Desktop horizontal, Mobile vertical */}
      <section 
        className={`relative w-full ${isMobile ? 'h-screen flex flex-col pt-20' : 'h-[80vh] flex flex-row pt-16'}`} 
        role="main" 
        aria-label="Choose Your World"
      >
        
        {/* Epic Luxe Section - Top on mobile, Left on desktop */}
        <article 
          className={`relative overflow-hidden group transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            isMobile 
              ? 'h-1/2 w-full' 
              : hoveredSide === 'luxe' 
                ? 'w-[55%]' 
                : hoveredSide === 'reassured' 
                  ? 'w-[45%]' 
                  : 'w-1/2'
          }`}
          onMouseEnter={() => !isMobile && setHoveredSide('luxe')}
          onMouseLeave={() => !isMobile && setHoveredSide(null)}
          aria-label="Epic Luxe - Luxury Vehicle Collection"
        >
          {/* Cinematic Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Background image with Ken Burns effect - Using Next.js Image for optimization */}
            <div 
              className="absolute inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%]"
              style={{
                animation: !isMobile ? 'kenBurnsLeft 25s ease-out infinite alternate' : 'none',
                transform: !isMobile ? `scale(1.1) translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02}px)` : 'scale(1.05)'
              }}
            >
              <Image
                src="/assets/images/sClass.jpg"
                alt="Luxury used cars - Mercedes S-Class and premium vehicles at Epic Luxe showroom in Pune, Hyderabad"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                onLoad={() => setImagesLoaded(true)}
                loading="eager"
              />
            </div>
            
            {/* Dark-to-gold gradient overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
            
            {/* Subtle vignette overlay for edge darkening */}
            <div 
              className="absolute inset-0 z-10"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)'
              }}
            />
          </div>

          {/* Content Container - Responsive padding and positioning */}
          <div className={`relative z-30 h-full flex flex-col justify-center ${
            isMobile 
              ? 'px-6 pt-20 pb-8' 
              : 'px-12 lg:px-20 xl:px-32 2xl:px-40'
          }`}>
            {/* Luxury Badge - Hidden on mobile for space */}
            <div className={`${isMobile ? 'mb-4' : 'mb-8'} transition-all duration-1000 delay-200 transform ${
              contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } ${isMobile ? 'hidden' : 'block'}`}>
              <div className="inline-flex items-center space-x-3">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-500/60" />
                <span className="text-xs tracking-[0.4em] uppercase text-amber-500/70 font-light">
                  Exclusive Collection
                </span>
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-500/60" />
              </div>
            </div>

            {/* Main Headline - Responsive text sizing */}
            <header 
              className={`${isMobile ? 'mb-4' : 'mb-6'} transition-all duration-1000 delay-100 transform ${
                !isMobile && 'group-hover:-translate-y-2'
              } ${
                contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <h2 className={`block ${
                isMobile 
                  ? 'text-4xl' 
                  : 'text-4xl lg:text-5xl xl:text-6xl'
              } font-light text-white leading-[0.9] tracking-tight`}>
                For the Few
              </h2>
              <h3 className={`block ${
                isMobile 
                  ? 'text-4xl mt-1' 
                  : 'text-4xl lg:text-5xl xl:text-6xl mt-2'
              } font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA980]`}>
                Who Can
              </h3>
            </header>

            {/* Subtext - Responsive sizing */}
            
            {/* CTA Button - Responsive sizing */}
            <div className={`transition-all duration-1000 delay-300 transform ${
              !isMobile && 'group-hover:-translate-y-2'
            } ${
              contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <button 
                onClick={handleLuxeNavigation}
                className={`group/btn relative ${
                isMobile 
                  ? 'px-6 py-3 text-sm' 
                  : 'px-10 py-4'
              } overflow-hidden rounded-full transition-all duration-700 hover:scale-[1.08] hover:shadow-[0_20px_50px_rgba(245,158,11,0.5)] hover:rotate-1 active:scale-95 active:rotate-0 transform-gpu`}
                aria-label="Explore Epic Luxe luxury used cars collection"
              >
                
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full transition-all duration-700 group-hover/btn:from-[#BFA980] group-hover/btn:to-[#D4AF37]" />
                
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] blur-sm opacity-0 group-hover/btn:opacity-75 transition-opacity duration-500 animate-pulse" />
                
                {/* Ripple effect on hover */}
                <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover/btn:scale-110 group-active/btn:scale-95 transition-transform duration-700 opacity-0 group-hover/btn:opacity-100" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out" />
                
                {/* Button content */}
                <span className="relative flex items-center space-x-3 text-black font-bold tracking-wide transition-all duration-300 group-hover/btn:text-gray-900 group-hover/btn:scale-105">
                  <span className="transition-transform duration-300 group-hover/btn:-translate-y-0.5">Explore Epic Luxe</span>
                  {isLuxeLoading ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <ChevronRight className="w-5 h-5 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110 group-hover/btn:rotate-12" />
                  )}
                </span>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="absolute top-4 right-6 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                  <div className="absolute bottom-3 left-8 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                </div>
              </button>
            </div>

            {/* Trust Indicators - Responsive layout */}
            <div className={`${
              isMobile 
                ? 'mt-6 flex items-center space-x-4' 
                : 'mt-12 flex items-center space-x-8'
            } transition-all duration-1000 delay-500 ${
              contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } ${isMobile ? 'hidden' : 'flex'}`}>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500/60" />
                <span className="text-xs text-gray-500 tracking-wider">Certified Authentic</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500/60" />
                <span className="text-xs text-gray-500 tracking-wider">Handpicked Selection</span>
              </div>
            </div>
          </div>
        </article>

        {/* Center Divider - Horizontal on mobile, Vertical on desktop */}
        <div className={`absolute ${
          isMobile 
            ? 'left-0 right-0 top-1/2 h-[1px] w-full -translate-y-1/2' 
            : 'left-1/2 top-0 bottom-0 w-[1px] h-full -translate-x-1/2'
        } z-30`}>
          <div className={`${
            isMobile 
              ? 'w-full h-full bg-gradient-to-r' 
              : 'h-full w-full bg-gradient-to-b'
          } from-transparent via-amber-500/30 to-transparent`} />
        </div>

        {/* Epic Reassured Section - Bottom on mobile, Right on desktop */}
        <article 
          className={`relative overflow-hidden group transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            isMobile 
              ? 'h-1/2 w-full' 
              : hoveredSide === 'reassured' 
                ? 'w-[55%]' 
                : hoveredSide === 'luxe' 
                  ? 'w-[45%]' 
                  : 'w-1/2'
          }`}
          onMouseEnter={() => !isMobile && setHoveredSide('reassured')}
          onMouseLeave={() => !isMobile && setHoveredSide(null)}
          aria-label="Epic Reassured - Premium Vehicle Collection"
        >
          {/* Cinematic Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Background image with Ken Burns effect - Using Next.js Image for optimization */}
            <div 
              className="absolute inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%]"
              style={{
                animation: !isMobile ? 'kenBurnsRight 25s ease-out infinite alternate' : 'none',
                transform: !isMobile ? `scale(1.1) translateX(${-mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02}px)` : 'scale(1.05)'
              }}
            >
              <Image
                src="/assets/images/epicreassuredhero.png"
                alt="Reliable used cars - Quality pre-owned vehicles at Epic Reassured dealership in Chennai, Nashik, Visakhapatnam"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVElEQVQYlWNhQAJMDAwMDAz/GRj+MzD8Z/jPwMDw/z8DAwPDfwYGhv8MDAwM/xkYGBj+MzAwMPxnYGBg+M/AwMDwn4GBgeE/AwMDw38GBgaG/wwMDACwEAoHNDqH+gAAAABJRU5ErkJggg=="
              />
            </div>
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-l from-white/90 via-white/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent z-10" />
          </div>

          {/* Content Container - Responsive padding */}
          <div className={`relative z-30 h-full flex flex-col justify-center ${
            isMobile 
              ? 'px-6 pt-8 pb-8' 
              : 'px-12 lg:px-20 xl:px-32 2xl:px-40'
          }`}>
            {/* Trust Badge - Hidden on mobile */}
            <div className={`${isMobile ? 'mb-4' : 'mb-8'} transition-all duration-1000 transform ${
              contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } ${isMobile ? 'hidden' : 'block'}`}>
              <div className="inline-flex items-center space-x-3">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gray-400/60" />
                <span className="text-xs tracking-[0.4em] uppercase text-gray-600 font-light">
                  Trusted Excellence
                </span>
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gray-400/60" />
              </div>
            </div>

            {/* Main Headline - Responsive */}
            <header 
              className={`${isMobile ? 'mb-4' : 'mb-6'} transition-all duration-1000 delay-100 transform ${
                !isMobile && 'group-hover:-translate-y-2'
              } ${
                contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <h2 className={`block ${
                isMobile 
                  ? 'text-4xl' 
                  : 'text-4xl lg:text-5xl xl:text-6xl'
              } font-light text-gray-900 leading-[0.9] tracking-tight`}>
                Confidence
              </h2>
              <h3 className={`block ${
                isMobile 
                  ? 'text-4xl mt-1' 
                  : 'text-4xl lg:text-5xl xl:text-6xl mt-2'
              } font-light text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-900 to-black`}>
                in Every Drive
              </h3>
            </header>

            {/* Subtext - Responsive */}
            

            {/* CTA Button - Responsive */}
            <div className={`transition-all duration-1000 delay-300 transform ${
              !isMobile && 'group-hover:-translate-y-2'
            } ${
              contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <button 
                onClick={handleReassuredNavigation}
                className={`group/btn relative ${
                isMobile 
                  ? 'px-6 py-3 text-sm' 
                  : 'px-10 py-4'
              } bg-white border-2 border-gray-900 rounded-full overflow-hidden transition-all duration-700 hover:scale-[1.08] hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] hover:-rotate-1 active:scale-95 active:rotate-0 transform-gpu`}
                aria-label="Explore Epic Reassured reliable used cars collection"
              >
                
                {/* Multiple layered hover effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-black to-gray-800 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700 ease-out" />
                
                {/* Glowing ring effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-black rounded-full blur opacity-0 group-hover/btn:opacity-50 transition-opacity duration-500" />
                
                {/* Expanding ring */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 scale-100 group-hover/btn:scale-150 opacity-100 group-hover/btn:opacity-0 transition-all duration-700" />
                
                {/* Electric shimmer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 translate-x-full group-hover/btn:-translate-x-full transition-transform duration-1000 ease-out" />
                
                {/* Pulse backdrop */}
                <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover/btn:scale-110 opacity-0 group-hover/btn:opacity-100 transition-all duration-500 animate-pulse" />
                
                {/* Button content */}
                <span className="relative flex items-center space-x-3 text-gray-900 group-hover/btn:text-white font-bold tracking-wide transition-all duration-500 group-hover/btn:scale-105">
                  <span className="transition-transform duration-300 group-hover/btn:-translate-y-0.5">Explore Epic Reassured</span>
                  {isReassuredLoading ? (
                    <div className="w-5 h-5 border-2 border-gray-400/30 border-t-gray-900 group-hover/btn:border-t-white rounded-full animate-spin" />
                  ) : (
                    <ChevronRight className="w-5 h-5 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110 group-hover/btn:-rotate-12" />
                  )}
                </span>
                
                {/* Floating sparkles */}
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-1 right-3 w-1 h-1 bg-white/80 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                  <div className="absolute bottom-2 left-5 w-1 h-1 bg-white/80 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                  <div className="absolute top-3 left-3 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                  <div className="absolute bottom-1 right-7 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
                </div>
              </button>
            </div>

            {/* Trust Indicators - Hidden on mobile */}
            <div className={`${
              isMobile 
                ? 'mt-6 flex items-center space-x-4' 
                : 'mt-12 flex items-center space-x-8'
            } transition-all duration-1000 delay-500 ${
              contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } ${isMobile ? 'hidden' : 'flex'}`}>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-600 tracking-wider">Verified Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-600 tracking-wider">Premium Selection</span>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Tagline Below Hero - Hidden on mobile to maintain clean split */}
      {!isMobile && (
        <section className={`relative w-full py-12 bg-gradient-to-b from-black via-gray-900 to-black transition-all duration-1500 transform ${
          contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center">
            <p className="text-2xl lg:text-3xl">
              <span style={{ fontFamily: 'Manrope, sans-serif' }} className="font-light text-gray-400">
                Two Journeys
              </span>
              <span className="mx-3 text-amber-500/60">·</span>
              <span style={{ fontFamily: 'Manrope, sans-serif' }} className="font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA980]">
                One Epic Destination
              </span>
            </p>
          </div>
        </section>
      )}
      
      {/* SEO Content - Hidden but crawlable */}
      <section className="sr-only">
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
      </section>

      <ThisMonthsHighlights/>
      <Section2AboutEpicCars/>
      <Section3WhyChooseUs/>
      <VoicesOfDistinction/>
      <LuxuryLeadForm/>
      <EpicCarsPage/>

      {/* WhatsApp Floating Widget - Compact & Subtle */}
      {whatsappVisible && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
          {/* Message Bubble - Side positioned */}
          <div className={`absolute bottom-2 right-14 sm:right-16 transition-all duration-500 transform ${
            showWhatsappMessage 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
          }`}>
            <div className="relative">
              {/* Compact Message Content */}
              <div className="bg-white rounded-lg shadow-lg px-3 py-2 max-w-[200px] sm:max-w-[220px] border border-green-100">
                <div className="flex items-start justify-between">
                  <p className="text-xs text-gray-700 font-medium pr-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {[
                      "Need help? Chat now! 🚗",
                      "Find your car? 💭", 
                      "Questions? Ask us! 🤝",
                      "Best deals here! 💰"
                    ][whatsappMessageIndex]}
                  </p>
                  <button 
                    onClick={() => setShowWhatsappMessage(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-[10px] text-green-600 mt-0.5 font-medium">Epic Cars</div>
              </div>
              {/* Arrow pointing to WhatsApp button - from side */}
              <div className="absolute bottom-3 right-0 transform translate-x-1/2">
                <div className="w-2 h-2 bg-white border-r border-b border-green-100 rotate-45"></div>
              </div>
            </div>
          </div>
          
          {/* Smaller WhatsApp Button */}
          <a
            href="https://wa.me/919876543210?text=Hi%20Epic%20Cars%2C%20I%20need%20help%20with%20finding%20a%20car"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
          >
            {/* Smaller WhatsApp Icon */}
            <svg 
              className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform duration-300" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.75"/>
            </svg>
            
            {/* Subtle pulse effect */}
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-10"></div>
          </a>
        </div>
      )}

      {/* Optimized Styles for animations */}
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
      `}</style>
    </div>
  );
};

export default LandingPageClient;