'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Award, 
  Home, 
  RotateCcw, 
  DollarSign, 
  Star, 
  CheckCircle, 
  Users, 
  Clock, 
  Wrench, 
  FileCheck, 
  Headphones,
  ArrowRight,
  Sparkles,
  Zap,
  Heart,
  TrendingUp
} from 'lucide-react';

const WhyChooseUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animationStep, setAnimationStep] = useState(0);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Staggered animation trigger
          setTimeout(() => setAnimationStep(1), 200);
          setTimeout(() => setAnimationStep(2), 600);
          setTimeout(() => setAnimationStep(3), 1000);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Trust pillars data
  const trustPillars = [
    {
      icon: Shield,
      title: "Certified Pre-Owned",
      subtitle: "200+ Point Inspection",
      description: "Every vehicle undergoes rigorous multi-point inspection by certified technicians",
      stat: "100%",
      statLabel: "Quality Assured",
      gradient: "from-emerald-600 to-teal-600",
      delay: "0s"
    },
    {
      icon: Star,
      title: "Customer Satisfaction",
      subtitle: "4.9/5 Rating",
      description: "Over 10,000+ happy customers trust us with their luxury car purchases",
      stat: "4.9★",
      statLabel: "Customer Rating",
      gradient: "from-yellow-500 to-orange-500",
      delay: "0.2s"
    },
    {
      icon: Home,
      title: "Doorstep Service",
      subtitle: "White Glove Delivery",
      description: "Premium home delivery and pickup service across 50+ cities",
      stat: "50+",
      statLabel: "Cities Covered",
      gradient: "from-blue-600 to-cyan-600",
      delay: "0.4s"
    },
    {
      icon: RotateCcw,
      title: "7-Day Return",
      subtitle: "No Questions Asked",
      description: "Not satisfied? Return within 7 days for a full refund, guaranteed",
      stat: "7",
      statLabel: "Day Return",
      gradient: "from-purple-600 to-pink-600",
      delay: "0.6s"
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      subtitle: "No Hidden Costs",
      description: "What you see is what you pay. Zero surprises, complete transparency",
      stat: "0%",
      statLabel: "Hidden Fees",
      gradient: "from-green-600 to-emerald-600",
      delay: "0.8s"
    },
    {
      icon: Headphones,
      title: "24/7 Expert Support",
      subtitle: "Always Here for You",
      description: "Round-the-clock premium support from our luxury car specialists",
      stat: "24/7",
      statLabel: "Support Available",
      gradient: "from-indigo-600 to-purple-600",
      delay: "1s"
    }
  ];

  // Stats data
  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: Users },
    { number: "98%", label: "Satisfaction Rate", icon: Heart },
    { number: "50+", label: "Cities Served", icon: Home },
    { number: "24/7", label: "Expert Support", icon: Clock }
  ];

  // Testimonial data
  const testimonials = [
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
      text: "The 7-day return policy gave me confidence. Didn't need it - the Audi was perfect!",
      car: "Audi A8 2022"
    }
  ];

  const TrustCard = ({ pillar, index }) => (
    <div
      className={`group relative transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      } ${hoveredCard === index ? 'scale-105 z-10' : 'scale-100'}`}
      style={{ animationDelay: pillar.delay }}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 h-full cursor-pointer">
        {/* Animated background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`} />
        
        {/* Golden glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating particles */}
        {hoveredCard === index && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10">
          {/* Icon */}
          <div className="mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} group-hover:scale-110 transition-transform duration-300`}>
              <pillar.icon size={28} className="text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="text-[#D4AF37] font-semibold text-sm mt-1">
                {pillar.subtitle}
              </p>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-sm">
              {pillar.description}
            </p>

            {/* Stat */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">
                    {pillar.stat}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {pillar.statLabel}
                  </div>
                </div>
                <CheckCircle size={24} className="text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Hover border glow */}
        <div className="absolute inset-0 rounded-3xl border-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 transition-all duration-300" />
      </div>
    </div>
  );

  const StatCard = ({ stat, index }) => (
    <div
      className={`transform transition-all duration-700 ${
        animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-center group cursor-pointer">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] mb-4 group-hover:scale-110 transition-transform duration-300">
          <stat.icon size={20} className="text-black" />
        </div>
        <div className="text-3xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
          {stat.number}
        </div>
        <div className="text-gray-400 text-sm">
          {stat.label}
        </div>
      </div>
    </div>
  );

  const TestimonialCard = ({ testimonial, index }) => (
    <div
      className={`transform transition-all duration-700 ${
        animationStep >= 3 ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 h-full hover:scale-105 transition-transform duration-300 cursor-pointer group">
        {/* Stars */}
        <div className="flex space-x-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={16} className="text-[#D4AF37] fill-current" />
          ))}
        </div>
        
        {/* Quote */}
        <p className="text-gray-300 mb-6 italic leading-relaxed">
          "{testimonial.text}"
        </p>
        
        {/* Author */}
        <div className="border-t border-white/10 pt-4">
          <div className="font-semibold text-white group-hover:text-[#D4AF37] transition-colors duration-300">
            {testimonial.name}
          </div>
          <div className="text-gray-400 text-sm">{testimonial.role}</div>
          <div className="text-[#D4AF37] text-xs mt-1 font-medium">
            Purchased: {testimonial.car}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-20 px-4 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-radial from-[#D4AF37]/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] mb-6">
            <Sparkles size={32} className="text-black" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the gold standard in luxury pre-owned vehicles. We don't just sell cars - we deliver dreams with uncompromising quality and service.
          </p>
        </div>

        {/* Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {trustPillars.map((pillar, index) => (
            <TrustCard key={pillar.title} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <div className={`mb-20 transform transition-all duration-1000 ${
          animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className={`mb-16 transform transition-all duration-1000 ${
          animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              What Our{' '}
              <span className="text-[#D4AF37]">VIP Customers</span>
              {' '}Say
            </h3>
            <p className="text-gray-400">Real experiences from real luxury car owners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center transform transition-all duration-1000 ${
          animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
            <div className="max-w-2xl mx-auto">
              <Zap size={48} className="text-[#D4AF37] mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Experience Luxury?
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Join thousands of satisfied customers who chose excellence. Browse our premium collection and find your perfect luxury vehicle today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl font-bold text-black text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/25">
                  <span className="mr-2">Browse Premium Cars</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl font-semibold text-white text-lg transition-all duration-300 hover:bg-white/20 hover:border-[#D4AF37]/50">
                  <Headphones size={20} className="mr-2" />
                  Speak to Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-32 right-20 w-4 h-4 bg-[#D4AF37] rounded-full animate-bounce opacity-60" style={{animationDelay: '0s'}} />
      <div className="absolute top-64 left-16 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '1s'}} />
      <div className="absolute bottom-64 right-32 w-3 h-3 bg-[#D4AF37] rounded-full animate-bounce opacity-50" style={{animationDelay: '2s'}} />
      <div className="absolute bottom-48 left-24 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-30" style={{animationDelay: '3s'}} />
    </section>
  );
};

export default WhyChooseUsSection;