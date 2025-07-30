'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Clock,
  Star,
  Shield,
  Award,
  CheckCircle
} from 'lucide-react';
import '../app/GlobalFonts.css';

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
  car: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Raj Malhotra",
    role: "CEO, Tech Startup",
    rating: 5,
    text: "Exceptional service! The BMW X7 was delivered to my doorstep in pristine condition.",
    car: "BMW X7 2022"
  },
  {
    name: "Priya Sharma", 
    role: "Investment Banker",
    rating: 5,
    text: "Transparent pricing and no-hassle experience. My Mercedes was exactly as described.",
    car: "Mercedes C-Class 2023"
  },
  {
    name: "Arjun Reddy",
    role: "Film Director", 
    rating: 5,
    text: "The 7-day return policy gave me confidence. Didn’t need it - the Audi was perfect!",
    car: "Audi A8 2022"
  }
];

const features = [
  {
    icon: Star,
    title: "Premium Quality",
    description: "Every vehicle in our collection meets the highest standards of quality and performance"
  },
  {
    icon: Shield,
    title: "Trusted Service",
    description: "Years of experience in luxury car sales with thousands of satisfied customers"
  },
  {
    icon: Award,
    title: "Best Value",
    description: "Competitive pricing and transparent deals ensure you get the best value"
  },
  {
    icon: CheckCircle,
    title: "Certified Vehicles",
    description: "All our vehicles come with comprehensive certification and warranty"
  },
  {
    icon: Clock,
    title: "Quick Process",
    description: "Streamlined buying and selling process to save your valuable time"
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Dedicated support team committed to your complete satisfaction"
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => (
  <div
    className="transform transition-all duration-700 translate-x-0 opacity-100"
    style={{ animationDelay: `${index * 0.2}s` }}
  >
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl p-6 h-full hover:scale-105 hover:border-[#D4AF37]/40 transition-all duration-300 cursor-pointer group">
      {/* Stars */}
      <div className="flex space-x-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={16} className="text-[#D4AF37] fill-current" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-gray-300 mb-6 italic leading-relaxed font-light font-primary">
        &quot;{testimonial.text}&quot;
      </p>

      {/* Author */}
      <div className="border-t border-[#D4AF37]/20 pt-4">
        <div className="font-semibold text-white group-hover:text-[#D4AF37] transition-colors duration-300 font-heading">
          {testimonial.name}
        </div>
        <div className="text-gray-400 text-sm font-light font-secondary">{testimonial.role}</div>
        <div className="text-[#D4AF37] text-xs mt-1 font-medium font-secondary">
          Purchased: {testimonial.car}
        </div>
      </div>
    </div>
  </div>
);

const WhyChooseUsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

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

  // Auto-cycle cards for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 px-4 overflow-hidden font-primary">
      {/* Background Image with Animation */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed animate-slow-zoom"
          style={{
            backgroundImage: "url('/assets/images/LandingPageCar2.jpg')",
            backgroundAttachment: 'fixed',
          }}
        />
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
            Why Choose
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA980] font-normal">
              Epic Luxe
            </span>
          </h2>
          <p className="text-lg text-gray-300 font-light max-w-3xl mx-auto">
            Experience luxury car buying and selling like never before with our comprehensive services and unmatched expertise
          </p>
        </div>

        {/* Desktop Features Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              id={`feature-${index}`}
              data-animate
              className={`group relative p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a]/90 to-[#0e0e0e]/90 backdrop-blur-sm border border-[#BFA980]/20 hover:border-[#D4AF37]/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#D4AF37]/10 ${
                isVisible[`feature-${index}`] ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-300 font-light leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile Auto-Swiping Cards */}
        <div className="md:hidden">
          <div
            className="relative p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a]/90 to-[#0e0e0e]/90 backdrop-blur-sm border border-[#BFA980]/20 transition-all duration-500"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              const startX = touch.clientX;
              const handleTouchEnd = (event: TouchEvent) => {
                const touchEnd = event.changedTouches[0];
                const endX = touchEnd.clientX;
                const diffX = startX - endX;

                if (Math.abs(diffX) > 50) {
                  if (diffX > 0) {
                    setCurrentCardIndex((prev) => (prev + 1) % features.length);
                  } else {
                    setCurrentCardIndex((prev) => (prev - 1 + features.length) % features.length);
                  }
                }

                document.removeEventListener('touchend', handleTouchEnd);
              };
              document.addEventListener('touchend', handleTouchEnd);
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCardIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {(() => {
                  const feature = features[currentCardIndex];
                  const Icon = feature.icon;
                  return (
                    <>
                      <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                        <Icon className="w-8 h-8 text-[#D4AF37]" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                      <p className="text-sm text-gray-300 font-light leading-relaxed">{feature.description}</p>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16 mb-4 transform transition-all duration-1000 translate-y-0 opacity-100">
          <div className="text-center mb-4">
            <h3 className="text-4xl font-bold text-white mb-4 font-heading">
              What Our{' '}
              <span className="text-[#D4AF37]">VIP Customers</span>{' '}
              Say
            </h3>
            <p className="text-gray-400 font-light font-secondary">
              Real experiences from real luxury car owners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
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
      `}</style>
    </section>
  );
};

export default WhyChooseUsSection;
