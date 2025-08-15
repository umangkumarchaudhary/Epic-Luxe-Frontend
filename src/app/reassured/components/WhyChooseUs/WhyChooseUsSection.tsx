'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Star,
  Shield,
  Award,
  CheckCircle,
  Clock,
  Heart
} from 'lucide-react';
import TestimonialCarousel from './WhyChooseUsSectionClient';

// Server component with static SEO data
const WhyChooseUsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const features = [
    {
      icon: Star,
      title: "Premium Certified Pre-Owned Cars",
      description: "Every luxury vehicle undergoes rigorous 200-point inspection ensuring exceptional quality and performance standards",
      seoKeywords: "certified pre-owned luxury cars, quality used cars, premium car inspection"
    },
    {
      icon: Shield,
      title: "Trusted Used Car Dealership",
      description: "Over 10 years of excellence in luxury pre-owned car sales with 5000+ satisfied customers across India",
      seoKeywords: "trusted used car dealer, luxury car dealership, pre-owned car sales"
    },
    {
      icon: Award,
      title: "Best Value Luxury Cars",
      description: "Transparent pricing with no hidden costs. Get the best deals on Mercedes, BMW, Audi, and other premium brands",
      seoKeywords: "best price used cars, luxury car deals, Mercedes BMW Audi used cars"
    },
    {
      icon: CheckCircle,
      title: "Warranty & Documentation",
      description: "Comprehensive warranty coverage and complete legal documentation for all pre-owned luxury vehicles",
      seoKeywords: "used car warranty, car documentation, certified pre-owned warranty"
    },
    {
      icon: Clock,
      title: "Quick Car Buying Process",
      description: "Streamlined purchase process with instant valuation, financing options, and doorstep delivery across major cities",
      seoKeywords: "quick car buying, instant car valuation, car financing, doorstep delivery"
    },
    {
      icon: Heart,
      title: "Customer-First Service",
      description: "Dedicated relationship managers and 24/7 support for seamless luxury car buying and selling experience",
      seoKeywords: "customer service, luxury car support, car buying assistance"
    }
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Auto-slide for mobile every 3 seconds
  useEffect(() => {
    if (isMobile) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % features.length);
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMobile, features.length]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Epic Luxe - Premium Used Cars",
    "description": "India's premier destination for certified pre-owned luxury cars including Mercedes-Benz, BMW, Audi, Porsche, and more",
    "url": "https://epicluxe.com",
    "priceRange": "₹₹₹₹",
    "areaServed": "India",
    "makesOffered": ["Mercedes-Benz", "BMW", "Audi", "Porsche", "Jaguar", "Land Rover"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1247"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Certified Pre-Owned Luxury Cars",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Car",
            "name": "Certified Pre-Owned Mercedes-Benz"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Car",
            "name": "Certified Pre-Owned BMW"
          }
        }
      ]
    }
  };

  const FeatureCard = ({ feature }: { feature: typeof features[0] }) => (
    <article
      className="group relative p-6 md:p-8 bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-lg rounded-lg"
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Icon and Title in one row */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 transition-all duration-300 flex-shrink-0">
          <feature.icon className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors duration-300" />
        </div>
        
        <h3 
          className="text-lg md:text-xl font-medium text-gray-900 leading-tight"
          itemProp="name"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          {feature.title}
        </h3>
      </div>
      
      {/* Description below */}
      <p 
        className="text-gray-600 font-light leading-relaxed text-sm md:text-base pl-16"
        itemProp="description"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        {feature.description}
      </p>

      {/* SEO keywords for search engines */}
      <meta itemProp="keywords" content={feature.seoKeywords} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": feature.title,
          "description": feature.description,
          "keywords": feature.seoKeywords,
          "provider": {
            "@type": "AutoDealer",
            "name": "Epic Luxe"
          }
        })
      }} />
    </article>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section className="relative py-16 md:py-20 px-4 bg-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
        <div className="max-w-7xl mx-auto">
          {/* SEO Meta Keywords for page */}
          <meta name="keywords" content="certified pre-owned luxury cars, trusted used car dealer, premium car inspection, best price used cars, Mercedes BMW Audi used cars, used car warranty, quick car buying, luxury car support" />
          
          {/* SEO Header */}
          <header className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight leading-tight">
              Why Choose Epic Luxe for 
              <span className="block font-medium text-gray-800 mt-2">
                Premium Pre-Owned Cars
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
              India&apos;s most trusted destination for certified luxury pre-owned cars. Experience unmatched quality, 
              transparent pricing, and exceptional service for Mercedes-Benz, BMW, Audi, and other premium brands.
            </p>
            <div className="w-16 h-0.5 bg-gray-900 mx-auto mt-6 md:mt-8"></div>
          </header>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden mb-16">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {features.map((feature) => (
                  <div key={feature.title} className="w-full flex-shrink-0 px-4">
                    <FeatureCard feature={feature} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Carousel Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-gray-900'
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* SEO Rich Snippet for All Features */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Why Choose Epic Luxe Features",
              "description": "Key features and benefits of choosing Epic Luxe for premium pre-owned cars",
              "itemListElement": features.map((feature, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": feature.title,
                "description": feature.description,
                "keywords": feature.seoKeywords
              }))
            })
          }} />
          
          {/* Client Component for Testimonials */}
          <TestimonialCarousel />

          {/* SEO Benefits Section */}
          <section className="mt-16 lg:mt-20 text-center" itemScope itemType="https://schema.org/Organization">
            <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-6 md:mb-8">
              Your Trusted Partner in Luxury Pre-Owned Cars
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-gray-900 mb-2">5000+</div>
                <div className="text-xs md:text-sm text-gray-600 font-light">Cars Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-gray-900 mb-2">4.9★</div>
                <div className="text-xs md:text-sm text-gray-600 font-light">Customer Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-gray-900 mb-2">10+</div>
                <div className="text-xs md:text-sm text-gray-600 font-light">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-gray-900 mb-2">50+</div>
                <div className="text-xs md:text-sm text-gray-600 font-light">Cities Served</div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUsSection;