'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronRight, Sparkles, Shield, Award} from 'lucide-react';

import Section2AboutEpicCars from './LandingPage/AboutEpic';
import Section3WhyChooseUs from './LandingPage/Section3WhyChooseUs';
import ThisMonthsHighlights from './LandingPage/ThisMonthHighlights';
import VoicesOfDistinction from './LandingPage/VoicesOfDistinction';
import LuxuryLeadForm from './LandingPage/LuxuryLeadForm';
import EpicCarsPage from './LandingPage/ChooseYourJourneySection';

const LandingPage = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'luxe' | 'reassured' | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = window.innerHeight * 0.5; // 50vh
    const scrollDifference = Math.abs(currentScrollY - lastScrollY);
    
    // Only update if scroll difference is significant (prevents jittery behavior)
    if (scrollDifference > 5) {
      // Determine scroll direction
      const newDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      
      // Update header visibility based on scroll position and direction
      if (currentScrollY > scrollThreshold) {
        // Beyond 50vh threshold
        if (newDirection === 'down') {
          // Scrolling down - show header
          setHeaderVisible(true);
        } else if (newDirection === 'up') {
          // Scrolling up - hide header
          setHeaderVisible(false);
        }
      } else {
        // Before 50vh threshold - always hide
        setHeaderVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    // Throttled scroll handler for better performance
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 10);
    };
    
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [handleScroll]);

  const handleLuxeNavigation = () => {
    router.push('/luxe');
  };

  const handleReassuredNavigation = () => {
    router.push('/reassured');
  };

  return (
    <div className="relative w-full min-h-screen overflow bg-black">
      {/* Premium Navigation Header - Smart visibility based on scroll */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out transform ${
        headerVisible 
          ? 'translate-y-0 opacity-100 bg-black/95 backdrop-blur-xl shadow-2xl' 
          : '-translate-y-full opacity-0 bg-transparent'
      }`}>
        <nav className="px-4 sm:px-8 lg:px-12 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Logo - Responsive sizing */}
            <div className={`transition-all duration-1000 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}>
              <h1 
                className="text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.2em] sm:tracking-[0.3em] cursor-pointer"
                style={{
                  fontFamily: 'Cormorant Garamond, Playfair Display, serif',
                  background: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 25%, #F4E4C1 50%, #FFD700 75%, #D4AF37 100%)',
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
          </div>
        </nav>
      </header>

      {/* Hero Section Container - Desktop horizontal, Mobile vertical */}
      <section className={`relative w-full ${isMobile ? 'h-screen flex flex-col' : 'h-[80vh] flex flex-row'}`} role="main" aria-label="Choose Your World">
        
        {/* Epic Luxe Section - Top on mobile, Left on desktop */}
        <div 
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
          role="article"
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
                alt="Epic Luxe Background"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
                quality={90}
                sizes="100vw"
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
            
            {/* Additional hero image if needed */}
            {/* Uncomment when epixluxehero.png is available
            <div className="absolute bottom-4 right-4 z-20 opacity-60">
              <Image
                src="/assets/images/epixluxehero.png"
                alt="Epic Luxe Hero"
                width={200}
                height={100}
                style={{
                  objectFit: 'contain',
                }}
                loading="lazy"
              />
            </div>
            */}
          </div>

          {/* Content Container - Responsive padding and positioning */}
          <div className={`relative z-30 h-full flex flex-col justify-center ${
            isMobile 
              ? 'px-6 pt-20 pb-8' 
              : 'px-12 lg:px-20 xl:px-32 2xl:px-40'
          }`}>
            {/* Luxury Badge - Hidden on mobile for space */}
            <div className={`${isMobile ? 'mb-4' : 'mb-8'} transition-all duration-1000 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
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
            <h2 
              className={`${isMobile ? 'mb-4' : 'mb-6'} transition-all duration-1000 delay-100 transform ${
                !isMobile && 'group-hover:-translate-y-2'
              } ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ fontFamily: 'Cormorant Garamond, Playfair Display, serif' }}
            >
              <span className={`block ${
                isMobile 
                  ? 'text-4xl' 
                  : 'text-4xl lg:text-5xl xl:text-6xl'
              } font-light text-white leading-[0.9] tracking-tight`}>
                For the Few
              </span>
              <span className={`block ${
                isMobile 
                  ? 'text-4xl mt-1' 
                  : 'text-4xl lg:text-5xl xl:text-6xl mt-2'
              } font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500`}>
                Who Can
              </span>
            </h2>

            {/* Subtext - Responsive sizing */}
            <p className={`text-gray-400 ${
              isMobile 
                ? 'text-sm mb-6' 
                : 'text-base lg:text-lg mb-10'
            } font-light leading-relaxed max-w-md transition-all duration-1000 delay-200 transform ${
              !isMobile && 'group-hover:-translate-y-1'
            } ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
              style={{ fontFamily: 'Inter, Manrope, sans-serif', letterSpacing: '0.02em' }}
            >
              Curated luxury vehicles for those who appreciate perfection in every detail
            </p>

            {/* CTA Button - Responsive sizing */}
            <div className={`transition-all duration-1000 delay-300 transform ${
              !isMobile && 'group-hover:-translate-y-2'
            } ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <button 
                onClick={handleLuxeNavigation}
                className={`group/btn relative ${
                isMobile 
                  ? 'px-6 py-3 text-sm' 
                  : 'px-10 py-4'
              } overflow-hidden rounded-full transition-all duration-700 hover:scale-[1.08] hover:shadow-[0_20px_50px_rgba(245,158,11,0.5)] hover:rotate-1 active:scale-95 active:rotate-0 transform-gpu`}>
                
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 rounded-full transition-all duration-700 group-hover/btn:from-yellow-300 group-hover/btn:via-amber-400 group-hover/btn:to-yellow-500" />
                
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 blur-sm opacity-0 group-hover/btn:opacity-75 transition-opacity duration-500 animate-pulse" />
                
                {/* Ripple effect on hover */}
                <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover/btn:scale-110 group-active/btn:scale-95 transition-transform duration-700 opacity-0 group-hover/btn:opacity-100" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out" />
                
                {/* Button content */}
                <span className="relative flex items-center space-x-3 text-black font-bold tracking-wide transition-all duration-300 group-hover/btn:text-gray-900 group-hover/btn:scale-105">
                  <span className="transition-transform duration-300 group-hover/btn:-translate-y-0.5">Explore Epic Luxe</span>
                  <ChevronRight className="w-5 h-5 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110 group-hover/btn:rotate-12" />
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
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
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
        </div>

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
        <div 
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
          role="article"
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
                alt="Epic Reassured Background"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
                quality={90}
                sizes="100vw"
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
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
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
            <h2 
              className={`${isMobile ? 'mb-4' : 'mb-6'} transition-all duration-1000 delay-100 transform ${
                !isMobile && 'group-hover:-translate-y-2'
              } ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ fontFamily: 'Cormorant Garamond, Playfair Display, serif' }}
            >
              <span className={`block ${
                isMobile 
                  ? 'text-4xl' 
                  : 'text-4xl lg:text-5xl xl:text-6xl'
              } font-light text-gray-900 leading-[0.9] tracking-tight`}>
                Confidence
              </span>
              <span className={`block ${
                isMobile 
                  ? 'text-4xl mt-1' 
                  : 'text-4xl lg:text-5xl xl:text-6xl mt-2'
              } font-light text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-900 to-black`}>
                in Every Drive
              </span>
            </h2>

            {/* Subtext - Responsive */}
            <p className={`text-gray-600 ${
              isMobile 
                ? 'text-sm mb-6' 
                : 'text-base lg:text-lg mb-10'
            } font-light leading-relaxed max-w-md transition-all duration-1000 delay-200 transform ${
              !isMobile && 'group-hover:-translate-y-1'
            } ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
              style={{ fontFamily: 'Inter, Manrope, sans-serif', letterSpacing: '0.02em' }}
            >
              Premium vehicles that combine reliability with refined performance
            </p>

            {/* CTA Button - Responsive */}
            <div className={`transition-all duration-1000 delay-300 transform ${
              !isMobile && 'group-hover:-translate-y-2'
            } ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <button 
                onClick={handleReassuredNavigation}
                className={`group/btn relative ${
                isMobile 
                  ? 'px-6 py-3 text-sm' 
                  : 'px-10 py-4'
              } bg-white border-2 border-gray-900 rounded-full overflow-hidden transition-all duration-700 hover:scale-[1.08] hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] hover:-rotate-1 active:scale-95 active:rotate-0 transform-gpu`}>
                
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
                  <ChevronRight className="w-5 h-5 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110 group-hover/btn:-rotate-12" />
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
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
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
        </div>
      </section>

      {/* Tagline Below Hero - Hidden on mobile to maintain clean split */}
      {!isMobile && (
        <div className={`relative w-full py-16 bg-gradient-to-b from-black via-gray-900 to-black transition-all duration-1500 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center">
            <p className="text-3xl lg:text-4xl">
              <span style={{ fontFamily: 'Cormorant Garamond, serif' }} className="font-light text-gray-400">
                Two Journeys
              </span>
              <span className="mx-3 text-amber-500/60">·</span>
              <span style={{ fontFamily: 'Inter, sans-serif' }} className="font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">
                One Epic Destination
              </span>
            </p>
          </div>
        </div>
      )}
      <ThisMonthsHighlights/>
      <Section2AboutEpicCars/>
      <Section3WhyChooseUs/>
      
      <VoicesOfDistinction/>
      <LuxuryLeadForm/>
      <EpicCarsPage/>

      {/* Styles for animations */}
      <style jsx>{`
        @keyframes goldShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes kenBurnsLeft {
          0% {
            transform: scale(1.1) translate(0, 0);
          }
          100% {
            transform: scale(1.2) translate(-2%, -1%);
          }
        }
        
        @keyframes kenBurnsRight {
          0% {
            transform: scale(1.1) translate(0, 0);
          }
          100% {
            transform: scale(1.2) translate(2%, -1%);
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
      `}</style>
    </div>
  );
};

export default LandingPage;