import React from 'react';
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section className="relative py-20 px-4 bg-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div className="max-w-7xl mx-auto">
          {/* SEO Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight leading-tight">
              Why Choose Epic Luxe for 
              <span className="block font-medium text-gray-800 mt-2">
                Premium Pre-Owned Cars
              </span>
            </h1>
            <p className="text-lg text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
              India's most trusted destination for certified luxury pre-owned cars. Experience unmatched quality, 
              transparent pricing, and exceptional service for Mercedes-Benz, BMW, Audi, and other premium brands.
            </p>
            <div className="w-16 h-0.5 bg-gray-900 mx-auto mt-8"></div>
          </header>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="group relative p-8 bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-lg"
                itemScope
                itemType="https://schema.org/Service"
              >
                <div className="w-12 h-12 bg-gray-100 border border-gray-300 flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:border-gray-900 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h2 
                  className="text-xl font-medium text-gray-900 mb-4 leading-tight"
                  itemProp="name"
                >
                  {feature.title}
                </h2>
                
                <p 
                  className="text-gray-600 font-light leading-relaxed text-base"
                  itemProp="description"
                >
                  {feature.description}
                </p>

                {/* Hidden SEO keywords */}
                <meta itemProp="keywords" content={feature.seoKeywords} />
              </article>
            ))}
          </div>

          {/* Client Component for Testimonials */}
          <TestimonialCarousel />

          {/* SEO Benefits Section */}
          <section className="mt-20 text-center" itemScope itemType="https://schema.org/Organization">
            <h2 className="text-2xl font-medium text-gray-900 mb-8">
              Your Trusted Partner in Luxury Pre-Owned Cars
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">5000+</div>
                <div className="text-sm text-gray-600 font-light">Cars Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">4.9★</div>
                <div className="text-sm text-gray-600 font-light">Customer Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">10+</div>
                <div className="text-sm text-gray-600 font-light">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">50+</div>
                <div className="text-sm text-gray-600 font-light">Cities Served</div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUsSection;