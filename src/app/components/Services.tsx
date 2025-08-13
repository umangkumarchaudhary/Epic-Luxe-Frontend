'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Car, 
  DollarSign, 
  Calculator, 
  CreditCard, 
  Shield, 
  RefreshCw,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import '../../app/GlobalFonts.css';

const Services = () => {
  const router = useRouter();

  const services = [
    {
      id: 'buy-premium',
      icon: Car,
      title: 'Buy Premium Cars',
      summary: 'Curated collection of certified luxury vehicles with guaranteed quality',
      features: ['360° Inspection', 'Verified History'],
      cta: 'Explore Collection',
      gradient: 'from-[#D4AF37] to-[#BFA980]',
      iconBg: 'bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10',
      bgImage: '/assets/buyNowServices.png'
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
      bgImage: '/assets/sellNow.png'
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
      bgImage: '/assets/valuation.png'
    },
    {
      id: 'finance-options',
      icon: CreditCard,
      title: 'Finance Options',
      summary: 'Flexible financing solutions tailored for luxury car purchases with competitive rates and instant approval',
      features: ['Low Interest Rates', 'Quick Approval'],
      cta: 'Apply Now',
      gradient: 'from-[#BFA980] to-[#D4AF37]',
      iconBg: 'bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10',
      bgImage: '/assets/Finance.png'
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
      bgImage: '/assets/Insurance.png'
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
      bgImage: '/assets/tradein.png'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Modern scroll tracking with scroll-snap
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      const updateCurrentSlide = () => {
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
        const gap = 32;
        const newSlide = Math.round(scrollLeft / (cardWidth + gap));
        
        if (newSlide !== currentSlide && newSlide >= 0 && newSlide < services.length) {
          setCurrentSlide(newSlide);
        }
      };

      const handleScroll = () => {
        requestAnimationFrame(updateCurrentSlide);
      };

      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentSlide, services.length]);

  // Navigation functions
  const navigateToInventory = () => router.push('/inventory');
  const navigateToSell = () => router.push('/services/SellNowYourCar');
  const navigateToValuation = () => router.push('/services/SellNowYourCar');
  const navigateToFinance = () => router.push('/services/finance');
  const navigateToInsurance = () => router.push('/services/insurance');
  const navigateToTradeIn = () => router.push('/services/trade-in');
  const navigateToServices = () => router.push('/services');
  const navigateToContact = () => router.push('/contact');

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
      const gap = 32;
      const scrollAmount = (cardWidth + gap) * 3;
      
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
      const gap = 32;
      const scrollAmount = (cardWidth + gap) * 3;
      
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Modern scroll-snap based navigation
  const goToSlide = (index: number) => {
    if (scrollContainerRef.current && index >= 0 && index < services.length) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
      const gap = 32;
      const scrollAmount = index * (cardWidth + gap);
      
      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      setCurrentSlide(index);
    }
  };

  // Handle dot click
  const handleDotClick = (index: number) => {
    goToSlide(index);
  };



  return (
    <section ref={sectionRef} className="relative py-20 px-4 overflow-hidden font-primary w-full">
      {/* Background Image with Animation */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/assets/images/AudiA4.jpg')",
            backgroundAttachment: 'fixed'
          }}
        ></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-[#BFA980]/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="manrope-font text-4xl md:text-6xl font-bold text-white/90 mb-6 tracking-tight">
            Luxury Car <span className="text-[#D4AF37]">Services Redefined</span>
          </h2>
        </div>

        {/* Services Carousel Container */}
        <div className="relative py-8">
          {/* Desktop Left Arrow */}
          {!isMobile && canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute -left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-r from-[#8B7D2F]/40 to-[#7A6B34]/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 hover:from-[#D4AF37]/60 hover:to-[#BFA980]/60 transition-all duration-300 shadow-lg border border-[#D4AF37]/20"
            >
              <ChevronLeft className="w-5 h-5 text-[#D4AF37]/80" />
            </button>
          )}

          {/* Desktop Right Arrow */}
          {!isMobile && canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute -right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-r from-[#8B7D2F]/40 to-[#7A6B34]/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 hover:from-[#D4AF37]/60 hover:to-[#BFA980]/60 transition-all duration-300 shadow-lg border border-[#D4AF37]/20"
            >
              <ChevronRight className="w-5 h-5 text-[#D4AF37]/80" />
            </button>
          )}



                    {/* Services Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide px-4 snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            } as React.CSSProperties}
          >
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="flex-shrink-0 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] snap-center group relative rounded-2xl border border-[#BFA980]/20 hover:border-[#D4AF37]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#D4AF37]/10 cursor-pointer my-4 flex flex-col"

              >
                {/* Card Image Section */}
                <div className="relative h-[400px] overflow-hidden rounded-t-2xl">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${service.bgImage})`,
                      backgroundPosition: 'center top'
                    }}
                  ></div>
                  
                  {/* Dark Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-[#D4AF37]/90 to-[#BFA980]/90 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-black" />
                  </div>
                  
                  {/* Service Title at Bottom */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-200 text-xs font-light leading-relaxed">
                        {service.summary}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* CTA Button Attached Below Card */}
                <button 
                  onClick={() => {
                    switch(service.id) {
                      case 'buy-premium':
                        navigateToInventory();
                        break;
                      case 'sell-car':
                        navigateToSell();
                        break;
                      case 'free-valuation':
                        navigateToValuation();
                        break;
                      case 'finance-options':
                        navigateToFinance();
                        break;
                      case 'insurance':
                        navigateToInsurance();
                        break;
                      case 'trade-in':
                        navigateToTradeIn();
                        break;
                      default:
                        navigateToServices();
                    }
                  }}
                  className="w-full group-btn relative overflow-hidden bg-gradient-to-r from-[#BFA980] to-[#D4AF37] text-black font-semibold py-3 px-6 rounded-b-2xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 text-sm"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {service.title}
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Dots Indicator with Enhanced Animation */}
          {isMobile && (
            <div className="flex justify-center mt-8 space-x-3">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full relative ${
                    currentSlide === index
                      ? 'w-8 h-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980]'
                      : 'w-2 h-2 bg-gray-600/50 hover:bg-gray-500/70'
                  }`}
                >

                </button>
              ))}
            </div>
          )}
        </div>



        {/* Bottom CTA */}
        <div className="text-center mt-4">
          {/* Desktop Buttons */}
          <div className="hidden md:inline-flex items-center gap-4">
            <button 
              onClick={navigateToServices}
              className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-semibold py-4 px-6 rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105"
            >
              Explore All Services
            </button>
            <button 
              onClick={navigateToContact}
              className="border-2 border-[#BFA980]/70 text-white/80 font-semibold py-4 px-6 rounded-xl hover:border-[#D4AF37] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#BFA980]/10 transition-all duration-300"
            >
              Schedule Consultation
            </button>
          </div>
          
          {/* Mobile Buttons */}
          <div className="md:hidden inline-flex items-center gap-4">
            <button 
              onClick={navigateToServices}
              className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-semibold py-4 px-6 rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 leading-tight"
            >
              <span className="block text-sm">Explore</span>
              <span className="block text-sm">Services</span>
            </button>
            <button 
              onClick={navigateToContact}
              className="border-2 border-[#BFA980]/70 text-white/80 font-semibold py-4 px-6 rounded-xl hover:border-[#D4AF37] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#BFA980]/10 transition-all duration-300 leading-tight"
            >
              <span className="block text-sm">Schedule</span>
              <span className="block text-sm">Consultation</span>
            </button>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Services;