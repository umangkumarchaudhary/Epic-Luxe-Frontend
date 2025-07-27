'use client';
import React, { useState, useEffect } from 'react';
import { 
  Car, 
  DollarSign, 
  Calculator, 
  CreditCard, 
  Shield, 
  RefreshCw,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Award,
  Users
} from 'lucide-react';
import '../GlobalFonts.css';
import Header from '@/components/Header';

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState({});

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

  const services = [
    {
      id: 'buy-premium',
      icon: Car,
      title: 'Buy Premium Cars',
      summary: 'Discover handpicked luxury vehicles with guaranteed quality and heritage',
      description: 'Access our exclusive collection of premium pre-owned vehicles, each meticulously inspected and certified.',
      features: ['360° Quality Inspection', 'Verified Ownership History', 'Premium Certification', 'Exclusive Inventory'],
      cta: 'Browse Collection',
      backgroundImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1526&q=80', // Happy person receiving car keys
      altText: 'Happy customer receiving luxury car keys from dealer'
    },
    {
      id: 'sell-luxury',
      icon: DollarSign,
      title: 'Sell Your Luxury Car',
      summary: 'Get maximum value for your luxury vehicle with our premium selling service',
      description: 'Experience the most sophisticated way to sell your luxury car with expert market analysis and white-glove service.',
      features: ['Expert Market Analysis', 'White-glove Service', 'Instant Documentation', 'Premium Marketplace'],
      cta: 'Start Selling',
      backgroundImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', // Professional handshake over car sale
      altText: 'Professional handshake between car seller and buyer'
    },
    {
      id: 'free-valuation',
      icon: Calculator,
      title: 'Free Valuation',
      summary: 'Get instant, accurate valuation from certified luxury car experts',
      description: 'Receive a comprehensive valuation report within minutes using AI-powered analysis and expert verification.',
      features: ['AI-Powered Analysis', 'Real-time Market Data', 'Expert Verification', 'Instant Results'],
      cta: 'Get Valuation',
      backgroundImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', // Person using tablet/documents for valuation
      altText: 'Professional using tablet for car valuation assessment'
    },
    {
      id: 'finance-options',
      icon: CreditCard,
      title: 'Finance Options',
      summary: 'Flexible premium financing solutions tailored for luxury car buyers',
      description: 'Access exclusive financing options with competitive rates, flexible terms, and personalized solutions.',
      features: ['Competitive Rates', 'Flexible Terms', 'Quick Approval', 'Premium Support'],
      cta: 'Explore Finance',
      backgroundImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', // Financial consultant helping client
      altText: 'Financial consultant discussing loan options with client'
    },
    {
      id: 'insurance',
      icon: Shield,
      title: 'Insurance Assistance',
      summary: 'Comprehensive insurance solutions for your valuable luxury investment',
      description: 'Protect your investment with specialized luxury car insurance partnerships and agreed value policies.',
      features: ['Specialized Coverage', 'Agreed Value Policies', 'Premium Partners', 'Claims Support'],
      cta: 'Get Protected',
      backgroundImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80', // Insurance agent helping couple
      altText: 'Friendly insurance agent helping couple with car insurance'
    },
    {
      id: 'trade-in',
      icon: RefreshCw,
      title: 'Trade-In Program',
      summary: 'Seamlessly upgrade your luxury vehicle with our exclusive trade program',
      description: 'Experience ultimate convenience in luxury car trading with instant trade value and seamless processes.',
      features: ['Instant Trade Value', 'Seamless Process', 'Upgrade Incentives', 'Zero Paperwork Hassle'],
      cta: 'Trade Now',
      backgroundImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', // Person exchanging car keys
      altText: 'Customer exchanging old car keys for new luxury vehicle keys'
    }
  ];

  const testimonials = [
    {
      name: 'Alexander Chen',
      role: 'CEO, Tech Ventures',
      content: 'Epic Luxe transformed my car buying experience. Their attention to detail and premium service is unmatched.',
      rating: 5,
      image: '👨‍💼'
    },
    {
      name: 'Sophia Rodriguez',
      role: 'Investment Banker',
      content: 'Sold my Porsche through Epic Luxe. The process was seamless and I got an exceptional price.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'Marcus Thompson',
      role: 'Entrepreneur',
      content: 'Their trade-in program is revolutionary. Upgraded from my BMW to a Bentley effortlessly.',
      rating: 5,
      image: '🧔‍♂️'
    }
  ];

  const trustBadges = [
    { icon: Award, text: 'Industry Leading', subtext: 'Quality Standards' },
    { icon: Shield, text: 'Fully Insured', subtext: 'Transactions' },
    { icon: Users, text: '10,000+', subtext: 'Happy Clients' },
    { icon: CheckCircle, text: 'Verified', subtext: 'Luxury Dealer' }
  ];

  return (
    <div>
      <Header />
    <div className="min-h-screen bg-black font-primary">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80')"
          }}
        ></div>
        
        <div className="relative z-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-light text-white/90 mb-6 tracking-tight">
              Luxury Car
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA980] font-normal">
                Services
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
              Experience the pinnacle of luxury car services. From buying and selling to comprehensive support, 
              we redefine what premium automotive service means.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {trustBadges.map((badge, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] backdrop-blur-sm border border-[#BFA980]/20 hover:border-[#D4AF37]/40 transition-all duration-300"
              >
                <badge.icon className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
                <div className="text-white/90 font-semibold text-lg">{badge.text}</div>
                <div className="text-white/60 text-sm">{badge.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white/90 mb-6">
              World-Class <span className="text-[#D4AF37]">Services</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
              Six comprehensive services designed to exceed the expectations of discerning luxury car enthusiasts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                data-animate
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] border border-[#BFA980]/20 hover:border-[#D4AF37]/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#D4AF37]/10 ${
                  isVisible[service.id] ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Background Image with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.backgroundImage}
                    alt={service.altText}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute top-6 left-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#BFA980] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <service.icon className="w-7 h-7 text-black" />
                    </div>
                  </div>

                  {/* Premium Badge */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <div className="px-3 py-1.5 bg-[#D4AF37]/90 backdrop-blur-sm rounded-full">
                      <span className="text-black text-xs font-semibold">PREMIUM</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-white/90 mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/70 mb-4 leading-relaxed font-light text-sm">
                    {service.summary}
                  </p>
                  <p className="text-white/60 text-xs mb-6 leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-8">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-white/60 text-xs">
                        <CheckCircle className="w-3 h-3 text-[#D4AF37] mr-2 flex-shrink-0" />
                        <span className="font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="w-full group-btn relative overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-semibold py-3.5 px-6 rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105">
                    <span className="relative z-10 flex items-center justify-center text-sm">
                      {service.cta}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#BFA980] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#D4AF37]/5 to-[#BFA980]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#1a1a1a] to-[#0e0e0e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white/90 mb-6">
              What Our <span className="text-[#D4AF37]">Clients Say</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
              Join thousands of satisfied luxury car enthusiasts who trust Epic Luxe.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] backdrop-blur-sm border border-[#BFA980]/20 hover:border-[#D4AF37]/40 hover:bg-gradient-to-br hover:from-[#1a1a1a] hover:to-black transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic leading-relaxed font-light">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{testimonial.image}</div>
                  <div>
                    <div className="text-white/90 font-semibold">{testimonial.name}</div>
                    <div className="text-white/60 text-sm font-light">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white/90 mb-6">
            Ready to Experience
            <span className="block text-[#D4AF37]">Luxury Redefined?</span>
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light">
            Join the elite circle of luxury car enthusiasts who demand nothing but the finest in automotive excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-semibold py-4 px-8 rounded-xl hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105">
              Get Started Today
            </button>
            <button className="border-2 border-[#D4AF37] text-[#D4AF37] font-semibold py-4 px-8 rounded-xl hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
    </div>
  );
};

export default ServicesPage;
