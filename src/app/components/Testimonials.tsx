'use client';

import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Testimonial {
  id: number;
  name: string;
  initials: string;
  rating: number;
  text: string;
  role?: string;
  company?: string;
}

interface TestimonialsCarouselProps {
  testimonials?: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  className?: string;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials = [],
  autoPlay = true,
  autoPlayInterval = 5000,
  showArrows = true,
  className = ''
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState(true);
  const sliderRef = useRef<Slider>(null);

  // Default testimonials if none provided
  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Arjun Mehta",
      initials: "AM",
      rating: 5,
      text: "Exceptional service! The team made buying my dream car effortless.",
      role: "CEO",
      company: "TechCorp"
    },
    {
      id: 2,
      name: "Priya Sharma",
      initials: "PS",
      rating: 5,
      text: "Premium experience from start to finish. Highly recommended!",
      role: "Entrepreneur",
      company: "Luxe Ventures"
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      initials: "RK",
      rating: 5,
      text: "Outstanding quality and transparency. Epic Luxe exceeded expectations.",
      role: "Director",
      company: "Global Industries"
    },
    {
      id: 4,
      name: "Sneha Patel",
      initials: "SP",
      rating: 5,
      text: "Professional, trustworthy, and luxurious. Perfect car buying experience!",
      role: "Marketing Head",
      company: "Premium Brands"
    },
    {
      id: 5,
      name: "Vikram Singh",
      initials: "VS",
      rating: 5,
      text: "World-class luxury car experience. The attention to detail is unmatched!",
      role: "Business Owner",
      company: "Singh Enterprises"
    },
    {
      id: 6,
      name: "Anjali Reddy",
      initials: "AR",
      rating: 5,
      text: "Epic Luxe delivered beyond my expectations. Truly premium service!",
      role: "Executive Director",
      company: "Reddy Holdings"
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  // Component mount/unmount tracking
  useEffect(() => {
    setIsComponentMounted(true);
    return () => {
      setIsComponentMounted(false);
    };
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      if (isComponentMounted) {
        setIsMobile(window.innerWidth < 768);
      }
    };
    
    checkMobile();
    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isComponentMounted]);

  // Slick settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: autoPlay && isComponentMounted,
    autoplaySpeed: autoPlayInterval,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: showArrows,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  };

  const next = () => {
    if (sliderRef.current && isComponentMounted) {
      try {
        console.log('🔍 TestimonialsCarousel: Navigating to next slide');
        sliderRef.current.slickNext();
      } catch (error) {
        console.error('🚨 TestimonialsCarousel Next Error:', error);
      }
    }
  };

  const previous = () => {
    if (sliderRef.current && isComponentMounted) {
      try {
        console.log('🔍 TestimonialsCarousel: Navigating to previous slide');
        sliderRef.current.slickPrev();
      } catch (error) {
        console.error('🚨 TestimonialsCarousel Previous Error:', error);
      }
    }
  };

  // Don't render if component is unmounting
  if (!isComponentMounted) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Render Slider */}
      <Slider ref={sliderRef} {...settings}>
        {displayTestimonials.map((t) => (
          <div key={t.id} className="p-4">
            <div className="bg-white/5 p-6 rounded-lg h-full flex flex-col justify-between">
              <p className="text-white text-sm mb-4">"{t.text}"</p>
              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-white font-semibold">{t.name}</p>
                  {t.role && <p className="text-gray-400 text-xs">{t.role}, {t.company}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={previous}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Custom CSS for Slick */}
      <style jsx>{`
        .slick-slide {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        
        .slick-active {
          opacity: 1;
        }
        
        .slick-track {
          display: flex !important;
        }
        
        .slick-slide {
          height: inherit !important;
        }
        
        .slick-slide > div {
          height: 100%;
        }
        
        .slick-slide > div > div {
          height: 100%;
        }
        
        /* Custom arrow styles */
        .slick-prev,
        .slick-next {
          width: 48px !important;
          height: 48px !important;
          background: linear-gradient(to right, #D4AF37, #BFA980) !important;
          border-radius: 50% !important;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3) !important;
          transition: all 0.3s ease !important;
          z-index: 10 !important;
        }
        
        .slick-prev:hover,
        .slick-next:hover {
          background: linear-gradient(to right, #BFA980, #D4AF37) !important;
          transform: scale(1.1) !important;
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4) !important;
        }
        
        .slick-prev:before,
        .slick-next:before {
          color: black !important;
          font-size: 20px !important;
          font-weight: bold !important;
        }
        
        .slick-prev {
          left: -60px !important;
        }
        
        .slick-next {
          right: -60px !important;
        }
        
        /* Hide default arrows on mobile */
        @media (max-width: 768px) {
          .slick-prev,
          .slick-next {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialsCarousel;
