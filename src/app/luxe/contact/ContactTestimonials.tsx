'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  initials: string;
  rating: number;
  text: string;
  role?: string;
  company?: string;
}

const ContactTestimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [mouseEnd, setMouseEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
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

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < testimonials.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse handlers for desktop swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMouseStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || mouseStart === null) return;
    setMouseEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging || mouseStart === null || mouseEnd === null) {
      setIsDragging(false);
      setMouseStart(null);
      setMouseEnd(null);
      return;
    }
    
    const distance = mouseStart - mouseEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < Math.ceil(testimonials.length / 3) - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }

    setIsDragging(false);
    setMouseStart(null);
    setMouseEnd(null);
  };

  // Navigation functions (unused but kept for potential future use)
  // const nextSlide = () => {
  //   if (isMobile) {
  //     setCurrentSlide((prev) => Math.min(prev + 1, testimonials.length - 1));
  //   } else {
  //     setCurrentSlide((prev) => Math.min(prev + 1, Math.ceil(testimonials.length / 3) - 1));
  //   }
  // };

  // const prevSlide = () => {
  //   setCurrentSlide((prev) => Math.max(prev - 1, 0));
  // };

  // Auto-play on mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, testimonials.length]);

  const totalSlides = isMobile ? testimonials.length : Math.ceil(testimonials.length / 3);

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-[#0e0e0e] to-[#1a1a1a] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-manrope">
            <span className="text-white">Trusted by </span>
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent">
              Hundreds
            </span>
            <span className="text-white"> of Luxury Car Buyers</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-manrope">
            Experience the difference that premium service makes. Our clients share their stories.
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Desktop Grid View - Show exactly 3 cards per slide */}
          <div className="hidden md:block">
            <div 
              className="overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* First slide: Cards 1, 2, 3 */}
                <div className="w-full flex-shrink-0">
                  <div className="grid grid-cols-3 gap-6">
                    {testimonials.slice(0, 3).map((testimonial) => (
                      <div
                        key={testimonial.id}
                        className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-5 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105 h-[220px] flex flex-col"
                      >
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                        
                        <div className="relative z-10 flex flex-col h-full">
                          {/* Avatar and Name */}
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                              <span className="text-black font-bold text-xs font-manrope">{testimonial.initials}</span>
                            </div>
                            <div>
                              <h4 className="text-white font-semibold text-sm group-hover:text-[#D4AF37] transition-colors duration-300 font-manrope">
                                {testimonial.name}
                              </h4>
                              {testimonial.role && testimonial.company && (
                                <p className="text-white/60 text-xs font-manrope">
                                  {testimonial.role} at {testimonial.company}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37] group-hover:scale-110 transition-transform duration-300"
                              />
                            ))}
                          </div>

                          {/* Testimonial Text */}
                          <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300 font-manrope flex-1 text-sm">
                            &ldquo;{testimonial.text}&rdquo;
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Second slide: Cards 4, 5, 6 */}
                <div className="w-full flex-shrink-0">
                  <div className="grid grid-cols-3 gap-6">
                    {testimonials.slice(3, 6).map((testimonial) => (
                      <div
                        key={testimonial.id}
                        className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-5 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105 h-[220px] flex flex-col"
                      >
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                        
                        <div className="relative z-10 flex flex-col h-full">
                          {/* Avatar and Name */}
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                              <span className="text-black font-bold text-xs font-manrope">{testimonial.initials}</span>
                            </div>
                            <div>
                              <h4 className="text-white font-semibold text-sm group-hover:text-[#D4AF37] transition-colors duration-300 font-manrope">
                                {testimonial.name}
                              </h4>
                              {testimonial.role && testimonial.company && (
                                <p className="text-white/60 text-xs font-manrope">
                                  {testimonial.role} at {testimonial.company}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37] group-hover:scale-110 transition-transform duration-300"
                              />
                            ))}
                          </div>

                          {/* Testimonial Text */}
                          <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300 font-manrope flex-1 text-sm">
                            &ldquo;{testimonial.text}&rdquo;
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-8 space-x-3">
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? 'w-8 h-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980]'
                        : 'w-2 h-2 bg-gray-600/50 hover:bg-gray-500/70'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Mobile Swipeable View - Show 1 card with slide animation */}
          <div className="md:hidden">
            <div 
              ref={containerRef}
              className="relative overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-5 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105 h-[240px] flex flex-col">
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Avatar and Name */}
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-black font-bold text-sm font-manrope">{testimonial.initials}</span>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-base group-hover:text-[#D4AF37] transition-colors duration-300 font-manrope">
                              {testimonial.name}
                            </h4>
                            {testimonial.role && testimonial.company && (
                              <p className="text-white/60 text-sm font-manrope">
                                {testimonial.role} at {testimonial.company}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37] group-hover:scale-110 transition-transform duration-300"
                            />
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300 font-manrope flex-1">
                          &ldquo;{testimonial.text}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Swipe Hint */}
              <div className="text-center mt-6">
                <p className="text-white/50 text-sm font-manrope">Swipe to explore more reviews</p>
              </div>

              {/* Enhanced Dot Indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? 'w-8 h-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980]'
                        : 'w-2 h-2 bg-gray-600/50 hover:bg-gray-500/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactTestimonials;