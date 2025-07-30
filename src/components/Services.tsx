'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Car,
  DollarSign,
  Calculator,
  CreditCard,
  Shield,
  RefreshCw,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import '../app/GlobalFonts.css';

interface Service {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  summary: string;
  features: string[];
  cta: string;
  gradient: string;
  iconBg: string;
  bgImage: string;
}

const services: Service[] = [
  {
    id: 'buy-premium',
    icon: Car,
    title: 'Buy Premium Cars',
    summary:
      'Curated collection of certified luxury vehicles with guaranteed quality',
    features: ['360° Inspection', 'Verified History'],
    cta: 'Explore Collection',
    gradient: 'from-[#D4AF37] to-[#BFA980]',
    iconBg: 'bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10',
    bgImage: '/assets/buyNowServices.png',
  },
  {
    id: 'sell-car',
    icon: DollarSign,
    title: 'Sell Your Car',
    summary: 'Get maximum value with our expert evaluation and hassle-free process',
    features: ['Best Market Price', 'Instant Quote'],
    cta: 'Get Quote',
    gradient: 'from-[#BFA980] to-[#D4AF37]',
    iconBg: 'bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10',
    bgImage: '/assets/sellNow.png',
  },
  {
    id: 'free-valuation',
    icon: Calculator,
    title: 'Free Valuation',
    summary: 'AI-powered instant valuation with real-time market data analysis',
    features: ['Instant Results', 'Market Insights'],
    cta: 'Value My Car',
    gradient: 'from-[#D4AF37] to-[#BFA980]',
    iconBg: 'bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10',
    bgImage: '/assets/valuation.png',
  },
  {
    id: 'finance-options',
    icon: CreditCard,
    title: 'Finance Options',
    summary:
      'Flexible financing solutions tailored for luxury car purchases with competitive rates and instant approval',
    features: ['Low Interest Rates', 'Quick Approval'],
    cta: 'Apply Now',
    gradient: 'from-[#BFA980] to-[#D4AF37]',
    iconBg: 'bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10',
    bgImage: '/assets/Finance.png',
  },
  {
    id: 'insurance',
    icon: Shield,
    title: 'Insurance Assistance',
    summary: 'Comprehensive insurance coverage for your luxury vehicle investment',
    features: ['Premium Coverage', 'Best Rates'],
    cta: 'Get Protected',
    gradient: 'from-[#D4AF37] to-[#BFA980]',
    iconBg: 'bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10',
    bgImage: '/assets/Insurance.png',
  },
  {
    id: 'trade-in',
    icon: RefreshCw,
    title: 'Trade-In Program',
    summary: 'Seamlessly upgrade to your dream car with our exclusive trade program',
    features: ['Easy Upgrade', 'Fair Value'],
    cta: 'Trade Now',
    gradient: 'from-[#BFA980] to-[#D4AF37]',
    iconBg: 'bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10',
    bgImage: '/assets/tradein.png',
  },
];

const Services: React.FC = () => {
  // Removed hoveredCard state since it is unused to clean warning

  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false); // Start as false
  const [hasStartedAnimation, setHasStartedAnimation] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isScrolling = useRef<NodeJS.Timeout | null>(null);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);
  const pauseAutoSlide = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for individual cards to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Intersection observer for the entire section to start autoplay
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStartedAnimation) {
            setHasStartedAnimation(true);
            setIsAutoPlaying(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    return () => sectionObserver.disconnect();
  }, [hasStartedAnimation]);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide carousel when autoplay is true and animation started
  useEffect(() => {
    if (isAutoPlaying && hasStartedAnimation) {
      autoSlideInterval.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
          const gap = 32;
          const scrollAmount = (cardWidth + gap) * 3;
          const isAtEnd =
            container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;

          if (isAtEnd) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          }
        }
      }, 4000);

      return () => {
        if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoPlaying, hasStartedAnimation]);

  // Pause auto-slide on user interaction temporarily
  const pauseAutoSlideTemporary = () => {
    setIsAutoPlaying(false);
    if (pauseAutoSlide.current) clearTimeout(pauseAutoSlide.current);

    pauseAutoSlide.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  // Enable or disable left/right scroll buttons according to scroll position
  useEffect(() => {
    const checkScrollButtons = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();

      return () => scrollContainer.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  // Mobile slide tracking to update currentSlide based on scroll position
  useEffect(() => {
    if (isMobile && scrollContainerRef.current) {
      const container = scrollContainerRef.current;

      const updateCurrentSlide = () => {
        if (isScrolling.current) return;

        const scrollLeft = container.scrollLeft;
        const cardWidth = container.clientWidth;
        const newSlide = Math.round(scrollLeft / cardWidth);

        if (newSlide !== currentSlide && newSlide >= 0 && newSlide < services.length) {
          setCurrentSlide(newSlide);
        }
      };

      const handleScrollEnd = () => {
        if (isScrolling.current) clearTimeout(isScrolling.current);
        isScrolling.current = setTimeout(() => {
          isScrolling.current = null;
          updateCurrentSlide();
        }, 150);
      };

      container.addEventListener('scroll', handleScrollEnd);
      return () => container.removeEventListener('scroll', handleScrollEnd);
    }
  }, [isMobile, currentSlide]);

  // Scroll carousel left by 3 cards
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
      const gap = 32;
      const scrollAmount = (cardWidth + gap) * 3;

      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  // Scroll carousel right by 3 cards
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
      const gap = 32;
      const scrollAmount = (cardWidth + gap) * 3;

      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Touch handlers for swipe gestures - pause autoplay on interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    pauseAutoSlideTemporary();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const currentX = e.touches[0].clientX;
    const diff = touchStartX.current - currentX;

    if (Math.abs(diff) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;

    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Swipe logic for mobile carousel navigation
  const handleSwipe = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const difference = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (difference > minSwipeDistance && currentSlide < services.length - 1) {
      goToSlide(currentSlide + 1, true);
    } else if (difference < -minSwipeDistance && currentSlide > 0) {
      goToSlide(currentSlide - 1, true);
    }
  };

  // Scroll to the specific slide index; optionally pause autoplay if user interacted
  const goToSlide = (index: number, isUserInteraction: boolean = true) => {
    if (scrollContainerRef.current && index >= 0 && index < services.length) {
      if (isUserInteraction) pauseAutoSlideTemporary();

      isScrolling.current = setTimeout(() => {}, 0);
      const container = scrollContainerRef.current;
      const cardWidth = container.clientWidth;

      container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
      setCurrentSlide(index);

      setTimeout(() => {
        if (isScrolling.current) {
          clearTimeout(isScrolling.current);
          isScrolling.current = null;
        }
      }, 500);
    }
  };

  // Dot click handler for mobile slide indicators
  const handleDotClick = (index: number) => {
    goToSlide(index, true);
  };

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
      if (pauseAutoSlide.current) clearTimeout(pauseAutoSlide.current);
      if (isScrolling.current) clearTimeout(isScrolling.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden font-primary"
    >
      {/* Background Image with Animation */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed animate-slow-zoom"
          style={{
            backgroundImage: "url('/assets/images/AudiA4.jpg')",
            backgroundAttachment: 'fixed',
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80" />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-[#BFA980]/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl font-light text-white/90 mb-6 tracking-tight">
            Luxury Car Services
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA980] font-normal">
              Redefined
            </span>
          </h2>
        </div>

        {/* Services Carousel Container */}
        <div className="relative py-8">
          {/* Desktop Left Arrow */}
          {!isMobile && canScrollLeft && (
            <button
              onClick={scrollLeft}
              aria-label="Scroll Left"
              className="absolute -left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-r from-[#8B7D2F]/40 to-[#7A6B34]/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 hover:from-[#D4AF37]/60 hover:to-[#BFA980]/60 transition-all duration-300 shadow-lg border border-[#D4AF37]/20"
            >
              <ChevronLeft className="w-5 h-5 text-[#D4AF37]/80" />
            </button>
          )}

          {/* Desktop Right Arrow */}
          {!isMobile && canScrollRight && (
            <button
              onClick={scrollRight}
              aria-label="Scroll Right"
              className="absolute -right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-r from-[#8B7D2F]/40 to-[#7A6B34]/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 hover:from-[#D4AF37]/60 hover:to-[#BFA980]/60 transition-all duration-300 shadow-lg border border-[#D4AF37]/20"
            >
              <ChevronRight className="w-5 h-5 text-[#D4AF37]/80" />
            </button>
          )}

          {/* Services Scroll Container */}
          <div
            ref={scrollContainerRef}
            className={`flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth px-4 ${
              isMobile ? 'snap-x snap-mandatory' : ''
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={pauseAutoSlideTemporary}
            onMouseLeave={() => {
              if (pauseAutoSlide.current) clearTimeout(pauseAutoSlide.current);
              pauseAutoSlide.current = setTimeout(() => setIsAutoPlaying(true), 2000);
            }}
          >
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                data-animate
                className={`flex-shrink-0 ${
                  isMobile ? 'w-full snap-center' : 'w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]'
                } group relative rounded-2xl border border-[#BFA980]/20 hover:border-[#D4AF37]/40 transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-[#D4AF37]/10 cursor-pointer my-4 flex flex-col ${
                  isVisible[service.id] ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card Image Section */}
                <div className="relative h-[400px] overflow-hidden rounded-t-2xl">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${service.bgImage})`, backgroundPosition: 'center top' }}
                  />

                  {/* Dark Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Floating Icon Badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-[#D4AF37]/90 to-[#BFA980]/90 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-black" />
                  </div>

                  {/* Service Title at Bottom with Hover Glass Morphism */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="group-hover:backdrop-blur-md group-hover:bg-black/20 group-hover:rounded-xl group-hover:p-4 group-hover:shadow-lg transition-all duration-1000 ease-out">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-200 text-xs font-light leading-relaxed">{service.summary}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button Attached Below Card */}
                <button className="w-full group-btn relative overflow-hidden bg-gradient-to-r from-[#BFA980] to-[#D4AF37] text-black font-semibold py-3 px-6 rounded-b-2xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 text-sm">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {service.title}
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Dots Indicator */}
          {isMobile && (
            <div className="flex justify-center mt-8 space-x-3">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full relative ${
                    currentSlide === index
                      ? 'w-8 h-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980]'
                      : 'w-2 h-2 bg-gray-600/50 hover:bg-gray-500/70'
                  }`}
                >
                  {currentSlide === index && isAutoPlaying && (
                    <div
                      className="absolute top-0 left-0 h-full bg-white/30 rounded-full animate-progress"
                      style={{ animation: 'progress 4.5s linear infinite' }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-4">
          {/* Desktop Buttons */}
          <div className="hidden md:inline-flex items-center gap-4">
            <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-semibold py-4 px-6 rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105">
              Explore All Services
            </button>
            <button className="border-2 border-[#BFA980]/70 text-white/80 font-semibold py-4 px-6 rounded-xl hover:border-[#D4AF37] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#BFA980]/10 transition-all duration-300">
              Schedule Consultation
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden inline-flex items-center gap-4">
            <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-semibold py-4 px-6 rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 leading-tight">
              <span className="block text-sm">Explore</span>
              <span className="block text-sm">Services</span>
            </button>
            <button className="border-2 border-[#BFA980]/70 text-white/80 font-semibold py-4 px-6 rounded-xl hover:border-[#D4AF37] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#BFA980]/10 transition-all duration-300 leading-tight">
              <span className="block text-sm">Schedule</span>
              <span className="block text-sm">Consultation</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slow-zoom {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes progress {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }

        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .snap-x {
          scroll-snap-type: x mandatory;
        }

        .snap-center {
          scroll-snap-align: center;
        }
      `}</style>
    </section>
  );
};

export default Services;
