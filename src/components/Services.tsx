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
  Sparkles,
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import '../app/GlobalFonts.css';

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
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

  useEffect(() => {
    const checkScrollButtons = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      
      return () => scrollContainer.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const services = [
    {
      id: 'buy-premium',
      icon: Car,
      title: 'Buy Premium Cars',
      summary: 'Curated collection of certified luxury vehicles with guaranteed quality',
      features: ['360° Inspection', 'Verified History'],
      cta: 'Explore Collection',
      gradient: 'from-[#D4AF37] to-[#BFA980]',
      iconBg: 'bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10'
    },
    {
      id: 'sell-car',
      icon: DollarSign,
      title: 'Sell Your Car',
      summary: 'Get maximum value with our expert evaluation and hassle-free process',
      features: ['Best Market Price', 'Instant Quote'],
      cta: 'Get Quote',
      gradient: 'from-[#BFA980] to-[#D4AF37]',
      iconBg: 'bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10'
    },
    {
      id: 'free-valuation',
      icon: Calculator,
      title: 'Free Valuation',
      summary: 'AI-powered instant valuation with real-time market data analysis',
      features: ['Instant Results', 'Market Insights'],
      cta: 'Value My Car',
      gradient: 'from-[#D4AF37] to-[#BFA980]',
      iconBg: 'bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10'
    },
    {
      id: 'finance-options',
      icon: CreditCard,
      title: 'Finance Options',
      summary: 'Flexible financing solutions tailored for luxury car purchases',
      features: ['Low Interest Rates', 'Quick Approval'],
      cta: 'Apply Now',
      gradient: 'from-[#BFA980] to-[#D4AF37]',
      iconBg: 'bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10'
    },
    {
      id: 'insurance',
      icon: Shield,
      title: 'Insurance Assistance',
      summary: 'Comprehensive insurance coverage for your luxury vehicle investment',
      features: ['Premium Coverage', 'Best Rates'],
      cta: 'Get Protected',
      gradient: 'from-[#D4AF37] to-[#BFA980]',
      iconBg: 'bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10'
    },
    {
      id: 'trade-in',
      icon: RefreshCw,
      title: 'Trade-In Program',
      summary: 'Seamlessly upgrade to your dream car with our exclusive trade program',
      features: ['Easy Upgrade', 'Fair Value'],
      cta: 'Trade Now',
      gradient: 'from-[#BFA980] to-[#D4AF37]',
      iconBg: 'bg-gradient-to-br from-[#BFA980]/20 to-[#D4AF37]/10'
    }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.offsetWidth || 0;
      const gap = 32; // 8 * 4 (gap-8)
      const scrollAmount = cardWidth + gap;
      
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.offsetWidth || 0;
      const gap = 32; // 8 * 4 (gap-8)
      const scrollAmount = cardWidth + gap;
      
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden font-primary">
      {/* Background Image with Animation */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed animate-slow-zoom"
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
        <div className="text-center mb-16">
          
          <h2 className="text-4xl md:text-6xl font-light text-white/90 mb-6 tracking-tight">
            Luxury Car Services
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA980] font-normal">
              Redefined
            </span>
          </h2>
        </div>

        {/* Services Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-[#D4AF37]/30"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-[#D4AF37]/30"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          )}

          {/* Services Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                data-animate
                className={`flex-shrink-0 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] group relative p-8 rounded-3xl bg-gradient-to-br from-[#1a1a1a]/90 to-[#0e0e0e]/90 backdrop-blur-sm border border-[#BFA980]/20 hover:border-[#D4AF37]/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#D4AF37]/10 cursor-pointer ${
                  isVisible[service.id] ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4AF37]/5 to-[#BFA980]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon and Title in One Line */}
                <div className="relative flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl ${service.iconBg} backdrop-blur-sm border border-[#D4AF37]/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 flex-shrink-0`}>
                    <service.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white/90 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  {/* Premium Badge */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 ml-auto">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-black fill-current" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-gray-200/70 font-light leading-relaxed mb-6 text-sm">
                    {service.summary}
                  </p>

                  {/* Features in One Row */}
                  <div className="flex items-center gap-6 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-200/60 text-xs">
                        <CheckCircle className="w-3 h-3 text-[#BFA980] mr-2 flex-shrink-0" />
                        <span className="font-light whitespace-nowrap">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full group-btn relative overflow-hidden bg-gradient-to-r ${service.gradient} text-black font-semibold py-3.5 px-6 rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105`}>
                    <span className="relative z-10 flex items-center justify-center text-sm">
                      {service.cta}
                      <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-300 ${hoveredCard === index ? 'translate-x-1' : ''}`} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#BFA980] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4">
            <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-semibold py-4 px-8 rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105">
              Explore All Services
            </button>
            <button className="border-2 border-[#BFA980]/70 text-white/80 font-semibold py-4 px-8 rounded-xl hover:border-[#D4AF37] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#BFA980]/10 transition-all duration-300">
              Schedule Consultation
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
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
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
      `}</style>
    </section>
  );
};

export default Services;
