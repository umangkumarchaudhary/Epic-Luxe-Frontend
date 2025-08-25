'use client';
import React, { useState, useEffect, useCallback} from 'react';
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
  const [bottomBuyOpen, setBottomBuyOpen] = useState(false);
  const [bottomSellOpen, setBottomSellOpen] = useState(false);
  const [loadingNavigation, setLoadingNavigation] = useState<string | null>(null);
  const [bottomNavVisible, setBottomNavVisible] = useState(false);
  const [buttonLoading, setButtonLoading] = useState<string | null>(null);
  const [headerLoading, setHeaderLoading] = useState<string | null>(null);
  const [dropdownLoading, setDropdownLoading] = useState<string | null>(null);
  const [callButtonPressed, setCallButtonPressed] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState<string | null>(null);

  // Haptic feedback simulation function
  const simulateHapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy', buttonId: string) => {
    setHapticFeedback(buttonId);
    
    // Visual feedback duration based on haptic type
    const duration = type === 'light' ? 50 : type === 'medium' ? 100 : 150;
    
    // Try actual haptic feedback if available
    if ('vibrate' in navigator) {
      const pattern = type === 'light' ? 10 : type === 'medium' ? 20 : 30;
      navigator.vibrate(pattern);
    }
    
    setTimeout(() => {
      setHapticFeedback(null);
    }, duration);
  }, []);

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

  // Scroll handler with bottom nav visibility logic
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Show bottom nav after scrolling past the first section (about 50% of viewport)
    if (scrollY > windowHeight * 0.5) {
      setBottomNavVisible(true);
    } else {
      setBottomNavVisible(false);
    }
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

  // Premium navigation handler with loading states
  const handlePremiumNavigation = useCallback(async (url: string, buttonType: string) => {
  setButtonLoading(buttonType);

    // Add premium loading animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Start navigation
    router.push(url);
    
    // Keep loading state for visual feedback
    setTimeout(() => {
      setButtonLoading(null);
    }, 1500);
  }, [router]);

  const handleLuxeNavigation = () => {
    simulateHapticFeedback('heavy', 'luxe-main');
    handlePremiumNavigation('/luxe', 'luxe');
  };

  const handleReassuredNavigation = () => {
    simulateHapticFeedback('heavy', 'reassured-main');
    handlePremiumNavigation('/reassured', 'reassured');
  };

  // Bottom navigation handlers with loading states
  const handleBottomNavigation = useCallback(async (url: string, key: string) => {
    setLoadingNavigation(key);
    
    // Simulate loading for smooth UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    router.push(url);
    setLoadingNavigation(null);
    setBottomBuyOpen(false);
    setBottomSellOpen(false);
  }, [router]);

  // Close dropdowns when clicking outside
  const handleClickOutside = useCallback(() => {
    setBottomBuyOpen(false);
    setBottomSellOpen(false);
  }, []);

  // Navigation dropdown handlers with premium animations
  const handleBuyDropdown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setHeaderLoading('buy');
    
    // Simulate premium loading for smooth UX
    setTimeout(() => {
      setBuyDropdownOpen(!buyDropdownOpen);
      setSellDropdownOpen(false);
      setHeaderLoading(null);
    }, 200);
  }, [buyDropdownOpen]);

  const handleSellDropdown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setHeaderLoading('sell');
    
    // Simulate premium loading for smooth UX
    setTimeout(() => {
      setSellDropdownOpen(!sellDropdownOpen);
      setBuyDropdownOpen(false);
      setHeaderLoading(null);
    }, 200);
  }, [sellDropdownOpen]);

  const handleNavigation = useCallback(async (path: string, buttonKey: string) => {
    setDropdownLoading(buttonKey);
    
    // Premium loading animation
    await new Promise(resolve => setTimeout(resolve, 600));
    
    router.push(path);
    setBuyDropdownOpen(false);
    setSellDropdownOpen(false);
    
    setTimeout(() => {
      setDropdownLoading(null);
    }, 1000);
  }, [router]);

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
            EPIC
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
        <header className="fixed top-0 left-0 right-0 z-[9999] translate-y-0 opacity-100 bg-black backdrop-blur-2xl border-b border-white/20 shadow-lg transition-all duration-700 ease-out">
          <nav className="px-6 sm:px-8 lg:px-12 py-4 sm:py-4 relative" role="navigation" aria-label="Main navigation">
            <div className="flex items-center justify-between">
              {/* Logo - Left */}
              <div className={`transition-all duration-1000 transform ${
                contentLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              }`}>
                <h1 
                  className="text-lg sm:text-xl lg:text-2xl font-light tracking-[0.25em] cursor-pointer text-white"
                  onClick={() => router.push('/')}
                  style={{
                    fontFamily: 'Manrope, sans-serif'
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
                    disabled={headerLoading === 'buy'}
                    className={`group flex items-center space-x-2 px-6 py-2 font-medium tracking-wide transition-all duration-300 relative overflow-hidden disabled:opacity-80 ${
                      headerLoading === 'buy' 
                        ? 'text-[#D4AF37] scale-95' 
                        : 'text-white hover:text-[#D4AF37] hover:scale-105'
                    }`}
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                    aria-expanded={buyDropdownOpen}
                    aria-haspopup="true"
                  >
                    {/* Premium shimmer effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent -translate-x-full transition-transform duration-600 ${
                      headerLoading === 'buy' ? 'translate-x-full' : 'group-hover:translate-x-full'
                    }`}></div>
                    
                    <span className="relative z-10">
                      {headerLoading === 'buy' ? 'Loading...' : 'Buy Now'}
                      <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] transition-all duration-300 ${
                        headerLoading === 'buy' || buyDropdownOpen ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></div>
                    </span>
                    {headerLoading === 'buy' ? (
                      <div className="w-4 h-4 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
                    ) : (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${buyDropdownOpen ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                </div>

                {/* Sell Now Dropdown */}
                <div className="relative">
                  <button 
                    onClick={handleSellDropdown}
                    disabled={headerLoading === 'sell'}
                    className={`group flex items-center space-x-2 px-6 py-2 font-medium tracking-wide transition-all duration-300 relative overflow-hidden disabled:opacity-80 ${
                      headerLoading === 'sell' 
                        ? 'text-[#D4AF37] scale-95' 
                        : 'text-white hover:text-[#D4AF37] hover:scale-105'
                    }`}
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                    aria-expanded={sellDropdownOpen}
                    aria-haspopup="true"
                  >
                    {/* Premium shimmer effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent -translate-x-full transition-transform duration-600 ${
                      headerLoading === 'sell' ? 'translate-x-full' : 'group-hover:translate-x-full'
                    }`}></div>
                    
                    <span className="relative z-10">
                      {headerLoading === 'sell' ? 'Loading...' : 'Sell Now'}
                      <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] transition-all duration-300 ${
                        headerLoading === 'sell' || sellDropdownOpen ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></div>
                    </span>
                    {headerLoading === 'sell' ? (
                      <div className="w-4 h-4 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
                    ) : (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${sellDropdownOpen ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                </div>
              </div>

              {/* Call Now Button - Right */}
              <div className={`transition-all duration-1000 transform ${
                contentLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <a 
                  href="tel:+919876543210" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCallButtonPressed(true);
                    // Simulate call initiation
                    setTimeout(() => {
                      window.location.href = 'tel:+919876543210';
                    }, 300);
                    setTimeout(() => {
                      setCallButtonPressed(false);
                    }, 2000);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 bg-white text-black font-semibold rounded-full transition-all duration-300 group overflow-hidden relative ${
                    callButtonPressed 
                      ? 'scale-95 shadow-inner' 
                      : 'hover:shadow-lg hover:shadow-white/25 hover:scale-105'
                  }`}
                >
                  {/* Premium shimmer effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/40 to-transparent -translate-x-full transition-transform duration-700 ${
                    callButtonPressed ? 'translate-x-full' : 'group-hover:translate-x-full'
                  }`}></div>
                  
                  {callButtonPressed ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span className="font-medium tracking-wide relative z-10" style={{ fontFamily: 'Manrope, sans-serif' }}>Calling...</span>
                    </>
                  ) : (
                    <>
                      <Phone className="w-4 h-4 group-hover:animate-pulse relative z-10" />
                      <span className="font-medium tracking-wide relative z-10" style={{ fontFamily: 'Manrope, sans-serif' }}>Call Now</span>
                    </>
                  )}
                </a>
              </div>
            </div>
          </nav>
        </header>

        {/* Buy Now Dropdown Portal - Fixed positioning with smooth animations */}
        {buyDropdownOpen && (
          <div className="fixed top-16 left-1/2 transform -translate-x-32 z-[99999] w-64 bg-black/95 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl shadow-2xl animate-in fade-in-0 zoom-in-95 slide-in-from-top-4 duration-300">
            <div className="p-2">
              {/* Epic Luxe Option */}
              <button
                onClick={() => handleNavigation('/luxe', 'buy-luxe-dropdown')}
                disabled={dropdownLoading === 'buy-luxe-dropdown'}
                className={`group/item w-full text-left p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 ${
                  dropdownLoading === 'buy-luxe-dropdown' 
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20 scale-[0.98]' 
                    : 'hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#BFA980]/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[#D4AF37] font-semibold text-lg tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {dropdownLoading === 'buy-luxe-dropdown' ? 'Connecting...' : 'Epic Luxe'}
                    </h3>
                  </div>
                  {dropdownLoading === 'buy-luxe-dropdown' ? (
                    <div className="w-5 h-5 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover/item:translate-x-1 transition-transform duration-300" />
                  )}
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
                onClick={() => handleNavigation('/reassured', 'buy-reassured-dropdown')}
                disabled={dropdownLoading === 'buy-reassured-dropdown'}
                className={`group/item w-full text-left p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 ${
                  dropdownLoading === 'buy-reassured-dropdown' 
                    ? 'bg-gradient-to-r from-gray-700/30 to-gray-600/30 scale-[0.98]' 
                    : 'hover:bg-gradient-to-r hover:from-gray-800/30 hover:to-gray-700/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {dropdownLoading === 'buy-reassured-dropdown' ? 'Connecting...' : 'Epic Reassured'}
                    </h3>
                    
                  </div>
                  {dropdownLoading === 'buy-reassured-dropdown' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-white group-hover/item:translate-x-1 transition-transform duration-300" />
                  )}
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <Shield className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500 tracking-wider">Verified Quality</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Sell Now Dropdown Portal - Fixed positioning with smooth animations */}
        {sellDropdownOpen && (
          <div className="fixed top-16 left-1/2 transform translate-x-8 z-[99999] w-64 bg-black/95 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl shadow-2xl animate-in fade-in-0 zoom-in-95 slide-in-from-top-4 duration-300">
            <div className="p-2">
              {/* Sell to Epic Luxe */}
              <button
                onClick={() => handleNavigation('/sell/luxe', 'sell-luxe-dropdown')}
                disabled={dropdownLoading === 'sell-luxe-dropdown'}
                className={`group/item w-full text-left p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 ${
                  dropdownLoading === 'sell-luxe-dropdown' 
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20 scale-[0.98]' 
                    : 'hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#BFA980]/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[#D4AF37] font-semibold text-lg tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {dropdownLoading === 'sell-luxe-dropdown' ? 'Connecting...' : 'Sell to Epic Luxe'}
                    </h3>
                  </div>
                  {dropdownLoading === 'sell-luxe-dropdown' ? (
                    <div className="w-5 h-5 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover/item:translate-x-1 transition-transform duration-300" />
                  )}
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
                onClick={() => handleNavigation('/sell/reassured', 'sell-reassured-dropdown')}
                disabled={dropdownLoading === 'sell-reassured-dropdown'}
                className={`group/item w-full text-left p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 ${
                  dropdownLoading === 'sell-reassured-dropdown' 
                    ? 'bg-gradient-to-r from-gray-700/30 to-gray-600/30 scale-[0.98]' 
                    : 'hover:bg-gradient-to-r hover:from-gray-800/30 hover:to-gray-700/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {dropdownLoading === 'sell-reassured-dropdown' ? 'Connecting...' : 'Sell to Epic Reassured'}
                    </h3>
                   
                  </div>
                  {dropdownLoading === 'sell-reassured-dropdown' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-white group-hover/item:translate-x-1 transition-transform duration-300" />
                  )}
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
                src="/assets/images/epiccarsLP.jpg"
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
                  src="/assets/images/MB GMC.png"
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
                  src="/assets/images/MG Astor.png"
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
                disabled={buttonLoading === 'luxe'}
                className={`group relative overflow-hidden flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-bold rounded-full transition-all duration-500 transform disabled:opacity-80 ${
                  buttonLoading === 'luxe' || hapticFeedback === 'luxe-main'
                    ? 'scale-95 shadow-inner' 
                    : 'hover:shadow-2xl hover:shadow-[#D4AF37]/40 hover:scale-110 hover:-translate-y-2'
                }`}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {/* Premium shimmer effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full transition-transform duration-1000 ${
                  buttonLoading === 'luxe' || hapticFeedback === 'luxe-main' ? 'translate-x-full' : 'group-hover:translate-x-full'
                }`}></div>
                
                {buttonLoading === 'luxe' ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-3 border-black/20 border-t-black rounded-full animate-spin"></div>
                    <span className="text-xl tracking-wide">Connecting...</span>
                    <div className="w-6 h-6"></div>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="text-xl tracking-wide relative z-10">Explore LUXE</span>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </>
                )}
              </button>

              {/* Explore Reassured Button */}
              <button
                onClick={handleReassuredNavigation}
                disabled={buttonLoading === 'reassured'}
                className={`group relative overflow-hidden flex items-center space-x-3 px-8 py-4 bg-white/90 backdrop-blur-sm text-black font-bold rounded-full transition-all duration-500 transform disabled:opacity-80 ${
                  buttonLoading === 'reassured' || hapticFeedback === 'reassured-main'
                    ? 'scale-95 shadow-inner bg-white/70' 
                    : 'hover:bg-white hover:shadow-2xl hover:shadow-white/25 hover:scale-110 hover:-translate-y-2'
                }`}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {/* Premium shimmer effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full transition-transform duration-1000 ${
                  buttonLoading === 'reassured' || hapticFeedback === 'reassured-main' ? 'translate-x-full' : 'group-hover:translate-x-full'
                }`}></div>
                
                {buttonLoading === 'reassured' ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-3 border-black/20 border-t-black rounded-full animate-spin"></div>
                    <span className="text-xl tracking-wide">Connecting...</span>
                    <div className="w-6 h-6"></div>
                  </div>
                ) : (
                  <>
                    <Shield className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xl tracking-wide relative z-10">Explore Reassured</span>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mobile View - Stacked buttons */}
          <div className="block md:hidden w-full h-full relative">
            {/* Mobile Buttons Container - Bottom positioned with margin - Smaller size */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-48 z-30">
              <div className="flex flex-col space-y-4 max-w-xs mx-auto">
                {/* Explore LUXE Button - Smaller size with premium loading */}
                <button
                  onClick={handleLuxeNavigation}
                  disabled={buttonLoading === 'luxe'}
                  className={`group relative overflow-hidden flex items-center justify-center space-x-2 px-6 py-3 bg-black/90 backdrop-blur-sm text-white font-bold rounded-full border-2 border-[#D4AF37] shadow-lg transition-all duration-500 disabled:opacity-80 ${
                    buttonLoading === 'luxe' || hapticFeedback === 'luxe-main'
                      ? 'scale-95 bg-[#D4AF37] text-black border-[#BFA980]' 
                      : 'hover:bg-[#D4AF37] hover:text-black hover:scale-105 hover:shadow-2xl'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {/* Mobile shimmer effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent -translate-x-full transition-transform duration-800 ${
                    buttonLoading === 'luxe' || hapticFeedback === 'luxe-main' ? 'translate-x-full' : 'group-hover:translate-x-full'
                  }`}></div>
                  
                  {buttonLoading === 'luxe' ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span className="text-sm tracking-wide">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                      <span className="text-sm tracking-wide relative z-10">Explore LUXE</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>

                {/* Explore Reassured Button - Smaller size with premium loading */}
                <button
                  onClick={handleReassuredNavigation}
                  disabled={buttonLoading === 'reassured'}
                  className={`group relative overflow-hidden flex items-center justify-center space-x-2 px-6 py-3 bg-white/95 backdrop-blur-sm text-black font-bold rounded-full border-2 shadow-lg transition-all duration-500 disabled:opacity-80 ${
                    buttonLoading === 'reassured' || hapticFeedback === 'reassured-main'
                      ? 'scale-95 bg-gray-800 text-white border-white' 
                      : 'border-gray-300 hover:bg-black hover:text-white hover:border-white hover:scale-105 hover:shadow-2xl'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {/* Mobile shimmer effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full transition-transform duration-800 ${
                    buttonLoading === 'reassured' || hapticFeedback === 'reassured-main' ? 'translate-x-full' : 'group-hover:translate-x-full'
                  }`}></div>
                  
                  {buttonLoading === 'reassured' ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-sm tracking-wide">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm tracking-wide relative z-10">Explore Reassured</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        
        
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

  
        <div className="relative">
          <Section2AboutEpicCars/>
          <ThisMonthsHighlights/>
          <Section3WhyChooseUs/>
          <VoicesOfDistinction/>
          <LuxuryLeadForm/>
          <ChooseYourJourneySection/>
        </div>

        {/* Bottom Sticky Navigation - Mobile Only */}
        <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-sm border-t border-[#D4AF37]/20 transition-transform duration-300 ${
          bottomNavVisible ? 'translate-y-0' : 'translate-y-full'
        }`} onClick={handleClickOutside}>
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center space-x-4">
              
              {/* BUY NOW Button with Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    simulateHapticFeedback('medium', 'bottom-buy');
                    setBottomBuyOpen(!bottomBuyOpen);
                    setBottomSellOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-bold rounded-full transition-all duration-300 relative overflow-hidden ${
                    hapticFeedback === 'bottom-buy' 
                      ? 'scale-95 shadow-inner' 
                      : loadingNavigation?.startsWith('buy') 
                        ? 'scale-95' 
                        : 'hover:shadow-lg hover:shadow-[#D4AF37]/30 hover:scale-105'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {/* Premium shimmer effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full transition-transform duration-500 ${
                    hapticFeedback === 'bottom-buy' || loadingNavigation?.startsWith('buy') ? 'translate-x-full' : 'group-hover:translate-x-full'
                  }`}></div>
                  
                  {loadingNavigation?.startsWith('buy') ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="text-sm relative z-10">BUY NOW</span>
                  )}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${bottomBuyOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Buy Dropdown */}
                {bottomBuyOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-black/90 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl shadow-xl">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBottomNavigation('/luxe/buy-used-cars', 'buy-luxe');
                      }}
                      disabled={loadingNavigation === 'buy-luxe'}
                      className="w-full px-4 py-3 text-left text-white hover:bg-[#D4AF37]/20 rounded-t-xl transition-colors duration-200 flex items-center justify-between disabled:opacity-50"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="text-sm">Explore Luxe</span>
                      {loadingNavigation === 'buy-luxe' && (
                        <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBottomNavigation('/reassured/buy-used-cars', 'buy-reassured');
                      }}
                      disabled={loadingNavigation === 'buy-reassured'}
                      className="w-full px-4 py-3 text-left text-white hover:bg-[#D4AF37]/20 rounded-b-xl transition-colors duration-200 flex items-center justify-between disabled:opacity-50"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="text-sm">Explore Reassured</span>
                      {loadingNavigation === 'buy-reassured' && (
                        <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="w-px h-6 bg-[#D4AF37]/40"></div>

              {/* SELL NOW Button with Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    simulateHapticFeedback('medium', 'bottom-sell');
                    setBottomSellOpen(!bottomSellOpen);
                    setBottomBuyOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-6 py-2 bg-white/10 backdrop-blur-sm text-white border border-[#D4AF37]/40 font-bold rounded-full transition-all duration-300 relative overflow-hidden ${
                    hapticFeedback === 'bottom-sell' 
                      ? 'scale-95 bg-[#D4AF37]/30 border-[#D4AF37]' 
                      : loadingNavigation?.startsWith('sell') 
                        ? 'scale-95' 
                        : 'hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] hover:scale-105'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {/* Premium shimmer effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent -translate-x-full transition-transform duration-500 ${
                    hapticFeedback === 'bottom-sell' || loadingNavigation?.startsWith('sell') ? 'translate-x-full' : 'group-hover:translate-x-full'
                  }`}></div>
                  
                  {loadingNavigation?.startsWith('sell') ? (
                    <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="text-sm relative z-10">SELL NOW</span>
                  )}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${bottomSellOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Sell Dropdown */}
                {bottomSellOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-black/90 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl shadow-xl">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBottomNavigation('/luxe/services/SellNowYourCar', 'sell-luxe');
                      }}
                      disabled={loadingNavigation === 'sell-luxe'}
                      className="w-full px-4 py-3 text-left text-white hover:bg-[#D4AF37]/20 rounded-t-xl transition-colors duration-200 flex items-center justify-between disabled:opacity-50"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="text-sm">Luxe Services</span>
                      {loadingNavigation === 'sell-luxe' && (
                        <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBottomNavigation('/reassured/Services/sell-your-car', 'sell-reassured');
                      }}
                      disabled={loadingNavigation === 'sell-reassured'}
                      className="w-full px-4 py-3 text-left text-white hover:bg-[#D4AF37]/20 rounded-b-xl transition-colors duration-200 flex items-center justify-between disabled:opacity-50"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="text-sm">Reassured Services</span>
                      {loadingNavigation === 'sell-reassured' && (
                        <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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
          
          /* Progressive enhancement for touch devices */
          @media (hover: none) and (pointer: coarse) {
            .hover-float:active {
              animation: microBounce 0.2s ease-out;
            }
            
            .button-transition {
              transition: all 0.2s ease-out;
            }
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
          
          /* Premium button press effects */
          @keyframes buttonPress {
            0% { transform: scale(1); }
            50% { transform: scale(0.95); }
            100% { transform: scale(1); }
          }
          
          @keyframes shimmerSlide {
            0% { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(200%) skewX(-15deg); }
          }
          
          /* Enhanced hover effects */
          @keyframes gentleFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-2px); }
          }
          
          .hover-float:hover {
            animation: gentleFloat 0.6s ease-in-out;
          }
          
          /* Micro-interaction feedback */
          @keyframes microBounce {
            0% { transform: scale(1); }
            40% { transform: scale(1.02); }
            60% { transform: scale(0.98); }
            80% { transform: scale(1.01); }
            100% { transform: scale(1); }
          }
          
          .micro-bounce {
            animation: microBounce 0.3s ease-out;
          }
          
          /* Smooth state transitions */
          .button-transition {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          /* Enhanced backdrop blur for mobile */
          .mobile-blur {
            backdrop-filter: blur(16px) saturate(180%);
            -webkit-backdrop-filter: blur(16px) saturate(180%);
          }
        `}</style>
      </div>
    </>
  );
}

export default LandingPageClient;