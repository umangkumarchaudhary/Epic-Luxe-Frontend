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
import Image from 'next/image';

// Icon mapping for string to component
const iconMap = {
  Car: Car,
  DollarSign: DollarSign,
  Calculator: Calculator,
  CreditCard: CreditCard,
  Shield: Shield,
  RefreshCw: RefreshCw,
};

type Service = {
  id: string;
  iconName: string;
  title: string;
  summary: string;
  features: string[];
  route: string;
  bgImage: string;
};

type ServicesCarouselProps = {
  services: Service[];
};

const ServicesCarousel = ({ services }: ServicesCarouselProps) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check scroll buttons visibility
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

  // Track current slide
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      const updateCurrentSlide = () => {
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
        const gap = 16; // Reduced gap
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
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
      const gap = 16;
      const scrollAmount = isMobile ? (cardWidth + gap) : (cardWidth + gap) * 3;
      
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
      const gap = 16;
      const scrollAmount = isMobile ? (cardWidth + gap) : (cardWidth + gap) * 3;
      
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const goToSlide = (index: number) => {
    if (scrollContainerRef.current && index >= 0 && index < services.length) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
      const gap = 16;
      const scrollAmount = index * (cardWidth + gap);
      
      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      setCurrentSlide(index);
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700&display=swap');
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .mercedes-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .mercedes-card:hover {
          transform: translateY(-4px);
        }
        
        .mercedes-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .mercedes-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
          transition: left 0.5s;
        }
        
        .mercedes-button:hover::before {
          left: 100%;
        }
      `}</style>

      {/* Services Carousel Container */}
      <div className="relative">
        {/* Desktop Navigation Arrows */}
        {!isMobile && canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:border-black hover:shadow-lg transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-black" />
          </button>
        )}

        {!isMobile && canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:border-black hover:shadow-lg transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 hover:text-black" />
          </button>
        )}

        {/* Services Cards Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {services.map((service) => {
            const IconComponent = iconMap[service.iconName as keyof typeof iconMap];
            
            return (
              <div
                key={service.id}
                className="mercedes-card flex-shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] snap-center group bg-white border border-gray-200 hover:border-gray-400 hover:shadow-xl cursor-pointer"
              >
                {/* Compact Image Section */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={service.bgImage}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                    {IconComponent && <IconComponent className="w-5 h-5 text-black" />}
                  </div>
                </div>
                
                {/* Compact Content */}
                <div className="p-5">
                  <h3 className="text-lg font-medium text-black mb-2 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {service.summary}
                  </p>
                  
                  {/* Minimal Features */}
                  <div className="flex gap-3 mb-4">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="text-xs text-gray-500">
                        • {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <button 
                    onClick={() => router.push(service.route)}
                    className="mercedes-button w-full bg-gray-800 text-white font-medium py-3 px-4 hover:bg-black transition-all duration-300 group flex items-center justify-center gap-2 text-sm"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Dots Indicator */}
        {isMobile && (
          <div className="flex justify-center mt-6 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? 'w-8 h-1.5 bg-black'
                    : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA Buttons */}
      <div className="text-center mt-10">
        <div className="inline-flex items-center gap-4">
          <button 
            onClick={() => router.push('/services')}
            className="mercedes-button bg-black text-white font-medium py-3 px-8 hover:bg-gray-900 transition-all duration-300"
          >
            View All Services
          </button>
          <button 
            onClick={() => router.push('/contact')}
            className="border border-black text-black font-medium py-3 px-8 hover:bg-black hover:text-white transition-all duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>
    </>
  );
};

export default ServicesCarousel;