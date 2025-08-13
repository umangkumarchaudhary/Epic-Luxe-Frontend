'use client';

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Star, Car, ChevronLeft, ChevronRight } from 'lucide-react';

// Optimized testimonial data with SEO-rich content
const testimonials = [
  {
    id: 1,
    name: "Rajesh Sharma",
    role: "Business Owner, Mumbai",
    rating: 5,
    text: "Exceptional experience buying my pre-owned Mercedes E-Class from Epic Luxe. The car was in pristine condition and the documentation was flawless. Highly recommend for anyone looking for certified luxury used cars.",
    car: "Mercedes E-Class 2021",
    location: "Mumbai",
    verified: true
  },
  {
    id: 2,
    name: "Priya Malhotra", 
    role: "Doctor, Delhi",
    rating: 5,
    text: "Epic Luxe made buying a used BMW so simple. Transparent pricing, excellent condition vehicle, and outstanding customer service. The best place for premium pre-owned cars in Delhi.",
    car: "BMW 3 Series 2022",
    location: "Delhi",
    verified: true
  },
  {
    id: 3,
    name: "Arjun Reddy",
    role: "IT Professional, Bangalore", 
    rating: 5,
    text: "Found my dream Audi A4 at Epic Luxe. The inspection report was detailed, financing was quick, and delivery was prompt. Excellent service for luxury used car buyers.",
    car: "Audi A4 2021",
    location: "Bangalore",
    verified: true
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Entrepreneur, Pune",
    rating: 5,
    text: "Sold my Porsche through Epic Luxe and the experience was seamless. Fair valuation, quick process, and professional handling. They truly understand luxury car market.",
    car: "Porsche Cayenne 2020",
    location: "Pune", 
    verified: true
  },
  {
    id: 5,
    name: "Meera Gupta",
    role: "Architect, Hyderabad",
    rating: 5,
    text: "Epic Luxe exceeded my expectations for my Range Rover purchase. The car history was transparent, warranty comprehensive, and the team was incredibly professional.",
    car: "Range Rover Sport 2022",
    location: "Hyderabad",
    verified: true
  },
  {
    id: 6,
    name: "Rahul Kapoor",
    role: "Finance Manager, Chennai", 
    rating: 5,
    text: "Best decision was choosing Epic Luxe for my used Jaguar. Quality assurance, competitive pricing, and excellent after-sales service. Perfect for premium car buyers.",
    car: "Jaguar XE 2021",
    location: "Chennai",
    verified: true
  }
];

const TestimonialCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoized testimonials for performance
  const memoizedTestimonials = useMemo(() => testimonials, []);
  
  const totalSlides = memoizedTestimonials.length;
  const slidesToShow = 3; // Show 3 testimonials on desktop

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, totalSlides]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, totalSlides]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  // Auto-advance functionality
  React.useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const TestimonialCard = React.memo(({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => (
    <article 
      className="flex-none w-full md:w-1/3 px-4"
      itemScope 
      itemType="https://schema.org/Review"
      style={{
        transform: `translateX(-${currentSlide * 100}%)`,
        transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none'
      }}
    >
      <div className="bg-gray-50 border border-gray-200 p-8 h-80 flex flex-col hover:border-gray-400 hover:shadow-md transition-all duration-300 group">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-6" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
          <div className="flex">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} size={16} className="text-gray-800 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-600 font-light">
            {testimonial.verified && "Verified Purchase"}
          </span>
          <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
        </div>
        
        {/* Review Text */}
        <div className="flex-1">
          <p 
            className="text-gray-700 leading-relaxed font-light text-base mb-6 line-clamp-4"
            itemProp="reviewBody"
          >
            &ldquo;{testimonial.text}&rdquo;
          </p>
        </div>
        
        {/* Author & Car Info */}
        <footer className="border-t border-gray-200 pt-6 mt-auto">
          <div 
            className="font-medium text-gray-900 group-hover:text-gray-800 transition-colors duration-300"
            itemProp="author"
            itemScope 
            itemType="https://schema.org/Person"
          >
            <span itemProp="name">{testimonial.name}</span>
          </div>
          <div className="text-gray-600 text-sm font-light mt-1">
            {testimonial.role}
          </div>
          <div className="text-gray-500 text-sm mt-3 font-light flex items-center">
            <Car className="w-4 h-4 mr-2" />
            <span itemProp="itemReviewed">{testimonial.car}</span>
          </div>
        </footer>
      </div>
    </article>
  ));

  TestimonialCard.displayName = 'TestimonialCard';

  return (
    <section className="relative" itemScope itemType="https://schema.org/Organization">
      <header className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 leading-tight">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 font-light text-lg max-w-3xl mx-auto">
          Real experiences from verified customers who found their perfect luxury pre-owned car with Epic Luxe
        </p>
        <div className="w-16 h-0.5 bg-gray-900 mx-auto mt-6"></div>
      </header>

      {/* Testimonials Container */}
      <div className="relative overflow-hidden" ref={containerRef}>
        <div className="flex transition-transform duration-300 ease-in-out">
          {memoizedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center mt-8 gap-4">
        <button
          onClick={prevSlide}
          className="p-2 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isTransitioning}
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {memoizedTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-gray-900'
                  : 'bg-gray-300 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isTransitioning}
          aria-label="Next testimonials"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* SEO Schema for Reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Epic Luxe",
            "review": memoizedTestimonials.map(testimonial => ({
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": testimonial.rating,
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": testimonial.name
              },
              "reviewBody": testimonial.text,
              "itemReviewed": {
                "@type": "AutoDealer",
                "name": "Epic Luxe - Premium Used Cars"
              }
            }))
          })
        }}
      />
    </section>
  );
};

export default TestimonialCarousel;