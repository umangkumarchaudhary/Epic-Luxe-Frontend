'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Clock,
  Star,
  Shield,
  Award,
  CheckCircle,
  Car
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import '../../app/GlobalFonts.css';

const WhyChooseUsSection = () => {
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const swiperRef = useRef<SwiperRef>(null);

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



  // Testimonial data
  const testimonials = [
    {
      name: "Raj Malhotra",
      role: "CEO, Tech Startup",
      rating: 5,
      text: "Exceptional service! The BMW X7 was delivered to my doorstep in pristine condition. The attention to detail and luxury experience exceeded my expectations.",
      car: "BMW X7 2022"
    },
    {
      name: "Priya Sharma", 
      role: "Investment Banker",
      rating: 5,
      text: "Transparent pricing and no-hassle experience. My Mercedes was exactly as described. The premium service made the entire process seamless.",
      car: "Mercedes C-Class 2023"
    },
    {
      name: "Arjun Reddy",
      role: "Film Director", 
      rating: 5,
      text: "The 7-day return policy gave me confidence. Didn't need it - the Audi was perfect! The luxury car buying experience I always dreamed of.",
      car: "Audi A8 2022"
    },
    {
      name: "Sarah Johnson",
      role: "Luxury Real Estate",
      rating: 5,
      text: "Epic Luxe transformed my car buying experience. The Porsche 911 exceeded all expectations. Professional, elegant, and truly luxurious.",
      car: "Porsche 911 2023"
    },
    {
      name: "Michael Chen",
      role: "Tech Entrepreneur",
      rating: 5,
      text: "From the first consultation to delivery, everything was impeccable. The Range Rover is stunning and the service was world-class.",
      car: "Range Rover Sport 2023"
    },
    {
      name: "Emma Rodriguez",
      role: "Fashion Designer",
      rating: 5,
      text: "The Bentley Continental GT is a masterpiece. Epic Luxe made the entire process feel like a VIP experience. Absolutely outstanding!",
      car: "Bentley Continental GT 2022"
    }
  ];

  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <motion.div
      className="h-full px-4 py-8"
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-600/30 rounded-2xl p-8 h-[450px] w-full flex flex-col hover:border-gray-500/50 hover:shadow-xl hover:shadow-gray-500/10 transition-all duration-500 group relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Stars */}
        <div className="flex space-x-1 mb-6 relative z-10">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <Star size={18} className="text-gray-400 fill-current drop-shadow-sm" />
            </motion.div>
          ))}
        </div>
        
        {/* Quote */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-gray-300 mb-8 italic leading-relaxed font-light font-primary text-lg relative z-10 line-clamp-5">
            &ldquo;{testimonial.text}&rdquo;
          </p>
        </div>
        
        {/* Author */}
        <div className="border-t border-gray-600/30 pt-6 relative z-10 mt-auto">
          <div className="font-semibold text-gray-200 group-hover:text-gray-100 transition-colors duration-300 font-heading text-xl">
            {testimonial.name}
          </div>
          <div className="text-gray-400 text-sm font-light font-secondary mt-2">
            {testimonial.role}
          </div>
          <div className="text-gray-500 text-sm mt-3 font-medium font-secondary flex items-center">
            <Car className="w-4 h-4 mr-2" />
            {testimonial.car}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative py-20 px-4 overflow-hidden font-primary w-full">
      {/* Background Image with Animation */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed animate-slow-zoom"
          style={{
            backgroundImage: "url('/assets/images/LandingPageCar2.jpg')",
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
          <h2 className="manrope-font text-4xl md:text-6xl font-bold text-white/90 mb-6 tracking-tight md:whitespace-nowrap">
            Why Choose<span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA980] font-bold"> Epic Luxe</span>
          </h2>
          <p className="text-lg text-gray-300 font-light max-w-3xl mx-auto">
            Experience luxury car buying and selling like never before with our comprehensive services and unmatched expertise
          </p>
        </div>

        {/* Desktop Features Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
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
          ].map((feature, index) => (
            <div
              key={feature.title}
              id={`feature-${index}`}
              data-animate
              className={`group relative p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a]/90 to-[#0e0e0e]/90 backdrop-blur-sm border border-[#BFA980]/20 hover:border-[#D4AF37]/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#D4AF37]/10 ${
                isVisible[`feature-${index}`] ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
             
        {/* Mobile Auto-Swiping Cards */}
        <div className="md:hidden">
          <div 
            className="relative p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a]/90 to-[#0e0e0e]/90 backdrop-blur-sm border border-[#BFA980]/20 transition-all duration-500"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Star className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Premium Quality
              </h3>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                Every vehicle in our collection meets the highest standards of quality and performance
              </p>
            </div>
          </div>
        </div>

        {/* Luxury Review Carousel */}
        <div className="mt-20 mb-8 transform transition-all duration-1000 translate-y-0 opacity-100">
          <div className="text-center mb-12">
            <h3 className="manrope-font text-4xl md:text-6xl font-bold text-white mb-6">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA980]">VIP Customers Say</span>
            </h3>
            <p className="text-gray-400 font-light font-secondary text-lg max-w-2xl mx-auto">
              Real experiences from real luxury car owners who trust Epic Luxe
            </p>
          </div>
    
          {/* Swiper Carousel */}
          <div className="relative px-12 py-8">
            <Swiper
              ref={swiperRef}
              modules={[Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 32,
                },
              }}
              autoplay={{
                delay: 1300,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                stopOnLastSlide: false,
              }}
              loop={true}
              grabCursor={true}
              allowTouchMove={true}
              className="testimonial-swiper"
              navigation={false}
              pagination={false}
              onSlideChange={(swiper) => {
                setCurrentSlide(swiper.realIndex);
              }}



            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index} className="h-auto">
                  <TestimonialCard testimonial={testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Swipe Indicator Bars - Below Content */}
            <div className="text-center mt-6">
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (swiperRef.current && swiperRef.current.swiper) {
                        swiperRef.current.swiper.slideTo(index);
                      }
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? 'w-8 h-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] animate-pulse'
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

export default WhyChooseUsSection; 