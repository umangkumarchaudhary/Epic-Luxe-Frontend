'use client';

import React, { useState, useMemo } from 'react';
import { 
  ArrowRight,
  RotateCcw,
  Clock,
  Shield,
  Navigation,
  Car,
  CheckCircle,
  Calculator,
  TrendingUp,
  Star,
  ChevronDown,
  Sparkles,
  MessageCircle,
  RefreshCw,
  DollarSign,
  Users,
  Award
} from 'lucide-react';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';



const TradeInPage = () => {

  const upgradeOptions = useMemo(() => [
    {
      brand: 'BMW',
      model: '5 Series',
      year: '2021',
      price: '₹45,00,000',
      image: '/api/placeholder/300/200',
      savings: '₹3,50,000'
    },
    
    {
      brand: 'Audi',
      model: 'Q5',
      year: '2020',
      price: '₹52,00,000',
      image: '/api/placeholder/300/200',
      savings: '₹4,20,000'
    },
    {
      brand: 'Mercedes-Benz',
      model: 'GLC',
      year: '2021',
      price: '₹58,00,000',
      image: '/api/placeholder/300/200',
      savings: '₹5,10,000'
    },
    {
      brand: 'Range Rover',
      model: 'Evoque',
      year: '2020',
      price: '₹65,00,000',
      image: '/api/placeholder/300/200',
      savings: '₹6,00,000'
    }
  ], []);

  const [isVisible] = useState(Array(12).fill(true));
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [vehicles, setVehicles] = useState(upgradeOptions);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const testimonials = [
    {
      name: 'Arjun Mehta',
      trade: 'BMW 3 Series → Mercedes GLC',
      rating: 5,
      text: 'Sold my old BMW and upgraded to a GLC within 24 hours. The valuation was fair and the process was seamless.',
      avatar: '/api/placeholder/60/60'
    },
    {
      name: 'Sneha Patel',
      trade: 'Audi A4 → Range Rover Evoque',
      rating: 5,
      text: 'Got ₹2 lakhs more than market price with their trade-in bonus. Highly recommend Epic Luxe!',
      avatar: '/api/placeholder/60/60'
    },
    {
      name: 'Rohit Sharma',
      trade: 'Jaguar XF → Porsche Macan',
      rating: 5,
      text: 'Professional team, transparent pricing, and doorstep service. Made my dream car affordable.',
      avatar: '/api/placeholder/60/60'
    }
  ];

  const faqs = [
    {
      question: 'What documents do I need for trade-in?',
      answer: 'You need RC, insurance papers, pollution certificate, service records, and ID proof. Our team will guide you through the complete documentation process.'
    },
    {
      question: 'Can I trade my car even with an existing loan?',
      answer: 'Yes! We handle loan transfers and NOC processes. Our finance team coordinates with your existing lender to ensure a smooth transition.'
    },
    {
      question: 'How do you calculate my car\'s value?',
      answer: 'Our AI-powered valuation engine considers market trends, condition, service history, demand-supply dynamics, and 50+ other factors to give you the most accurate price.'
    },
    {
      question: 'Can I only trade luxury cars with Epic Luxe?',
      answer: 'While we specialize in luxury cars, we accept all premium and mid-segment vehicles. Our expertise in luxury cars ensures you get the best value for your trade-in.'
    },
    {
      question: 'What if I don\'t find a replacement car I like?',
      answer: 'You can sell your car to us directly without trading. However, you\'ll miss out on our exclusive trade-in bonus which can be up to ₹2-5 lakhs extra.'
    }
  ];


  // Fetch vehicles from backend
  React.useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_HERO_URL || 'https://raam-group-all-websites.onrender.com';
        const response = await fetch(`${baseUrl}/admin/vehicles`);
        if (response.ok) {
          const vehicleData = await response.json();
          // Transform backend data to match our UI structure
          const transformedVehicles = vehicleData.vehicles?.slice(0, 4).map((vehicle: { brand?: string; model?: string; year?: string; price?: string; image?: string }) => ({
            brand: vehicle.brand || 'Luxury Car',
            model: vehicle.model || 'Premium Model',
            year: vehicle.year || '2021',
            price: vehicle.price ? `₹${(parseInt(vehicle.price) / 100000).toFixed(0)} Lakh` : '₹45,00,000',
            image: vehicle.image || '/api/placeholder/300/200',
            savings: `₹${Math.floor(Math.random() * 5) + 2},${Math.floor(Math.random() * 90) + 10},000`
          })) || upgradeOptions;
          setVehicles(transformedVehicles);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        // Keep default vehicles if fetch fails
      }
    };
    fetchVehicles();
  }, [upgradeOptions]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const cleanedPhone = formData.phone.replace(/\s+/g, '');
      
      const submitData = {
        lead_type: 'trade_in_quote',
        lead_title: 'Trade-In Quote Request',
        name: formData.name.trim(),
        phone: cleanedPhone,
        email: null,
        preferred_model: null,
        vehicle_id: null,
        appointment_date: null,
        appointment_time: null,
        message: formData.message.trim(),
        budget: null,
        insurance_type: null,
        loan_details: null,
        status: 'new',
        source_page: 'Trade-In Page',
        brand: null,
        fuel: null,
        variant: null,
        city: null,
        year: null,
        owner: null,
        kms: null,
        whatsapp_updates: null,
        monthly_income: null,
        employment_type: null,
        interested_car: 'Trade-In Service',
        loan_amount: null,
        emi_tenure: null,
        interest: null,
        your_emi: null,
        total_payable: null,
        pan_card: null,
        car_interest: null
      };

      const response = await fetch('https://raam-group-all-websites.onrender.com/admin/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit trade-in request');
      }

      const result = await response.json();
      console.log('Trade-in request submitted successfully:', result);
      
      // Reset form and show success
      setFormData({ name: '', phone: '', message: '' });
      alert('Trade-in quote request submitted successfully! Our team will contact you soon.');
      
    } catch (error) {
      console.error('Error submitting trade-in request:', error);
      setSubmitError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e] text-white">
      <Header/>
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden min-h-screen flex items-center">
        {/* Background image */}
        <Image
  src="/assets/TradeInHeroBG.png"
  alt="Trade In Hero Background"
  fill
  className="absolute inset-0 w-full h-full object-cover z-0"
  style={{ pointerEvents: 'none' }}
  priority
/>

        {/* Existing Gradient and Decorative DIVs */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#D4AF37]/5 z-10"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse z-10"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-[#D4AF37]/30 rounded-full blur-2xl animate-pulse delay-1000 z-10"></div>

        <div className="max-w-7xl mx-auto relative z-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse"></div>
              <RefreshCw className="w-12 h-12 text-[#D4AF37] animate-spin" style={{animationDuration: '3s'}} />
              <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white/90" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Trade Your <span className="text-[#D4AF37]">Legacy</span><br />
              for a New <span className="text-[#D4AF37]">Journey</span>
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  const quoteSection = document.getElementById('quote-section');
                  if (quoteSection) {
                    quoteSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                <Calculator className="w-5 h-5" />
                Get Trade-In Quote
              </button>
              <button className="bg-white/10 backdrop-blur-sm border-2 border-[#D4AF37]/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 flex items-center gap-3"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                <Car className="w-5 h-5" />
                Browse Replacement Cars
              </button>
            </div>
            <div className="flex items-center gap-8 mt-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
                <span>30-Min Process</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
                <span>Fair Valuation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
                <span>Doorstep Service</span>
              </div>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 bg-cover bg-center rounded-3xl overflow-hidden ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{
              backgroundImage: "url('/assets/TradeInHero.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Semi-transparent overlay */}
            <div className="bg-gradient-to-br from-[#1a1a1a]/60 to-[#0e0e0e]/70 rounded-3xl p-8 border border-[#D4AF37]/20">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/40 rounded-xl p-4 border border-[#D4AF37]/10">
                  <Car className="w-8 h-8 text-white/60 mb-2" />
                  <p className="text-xs text-white/60 font-clean">Your Current Car</p>
                  <p className="text-lg font-bold text-white font-subheading">BMW 3 Series</p>
                </div>
                <div className="bg-black/40 rounded-xl p-4 border border-[#D4AF37]/10">
                  <Sparkles className="w-8 h-8 text-[#D4AF37] mb-2" />
                  <p className="text-xs text-white/60 font-clean">Upgrade To</p>
                  <p className="text-lg font-bold text-[#D4AF37] font-subheading">Mercedes GLC</p>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <ArrowRight className="w-12 h-12 text-[#D4AF37] animate-pulse" />
                </div>
                <p className="text-sm text-white/70 font-clean">Instant upgrade with trade-in bonus</p>
              </div>

              <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-xl p-4 text-center">
                <p className="text-sm text-[#D4AF37] font-semibold font-subheading">Estimated Trade-In Value</p>
                <p className="text-3xl font-bold text-white font-headline">₹25,00,000</p>
                <p className="text-xs text-green-400 font-clean">+₹3,50,000 Trade-in Bonus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* Why Trade-In with Epic Luxe */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Why Trade-In with <span className="text-[#D4AF37]">Epic Luxe</span>
            </h2>
            <p className="text-xl text-white/70" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Premium experience, maximum value
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: RotateCcw,
                title: 'Instant Exchange Value',
                description: 'Get real-time value with bonus if you buy from us'
              },
              {
                icon: Clock,
                title: '30-Minute Process',
                description: 'Instant evaluation and approval'
              },
              {
                icon: Shield,
                title: 'Fair & Transparent',
                description: 'AI-powered valuation engine with market trend checks'
              },
              {
                icon: Navigation,
                title: 'Concierge Assistance',
                description: 'Personal guidance for a stress-free exchange'
              },
              {
                icon: Car,
                title: 'Free Pickup & Delivery',
                description: 'Doorstep swap with paperwork handled'
              },
              {
                icon: DollarSign,
                title: 'Best Price Guarantee',
                description: 'Beat any genuine quote by ₹25,000'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-500 group hover:transform hover:scale-105 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-[#D4AF37] mb-3 font-subheading">{item.title}</h3>
                <p className="text-white/70 font-clean">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90" style={{ fontFamily: 'Manrope, sans-serif' }}>
              How It <span className="text-[#D4AF37]">Works</span>
            </h2>
            <p className="text-xl text-white/70" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Simple 3-step process to upgrade your car
            </p>
          </div>

          <div className="relative">
            {/* Progress Bar */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-1 bg-white/10 rounded-full hidden lg:block">
              <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full transition-all duration-1000" style={{width: '100%'}}></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {[
                {
                  step: 1,
                  title: 'Get Valuation',
                  description: 'Enter your car details and get instant AI-powered valuation with trade-in bonus',
                  icon: Calculator
                },
                {
                  step: 2,
                  title: 'Choose Replacement',
                  description: 'Browse our premium collection and select your dream upgrade car',
                  icon: Car
                },
                {
                  step: 3,
                  title: 'Exchange at Doorstep',
                  description: 'Our team handles pickup, delivery, and all paperwork at your convenience',
                  icon: CheckCircle
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`text-center transition-all duration-1000 ${isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <item.icon className="w-12 h-12 text-black" />
                    </div>
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-black border-2 border-[#D4AF37] rounded-full flex items-center justify-center z-20">
                      <span className="text-[#D4AF37] font-bold text-sm font-headline">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#D4AF37] mb-4 font-subheading">{item.title}</h3>
                  <p className="text-white/70 font-clean">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     

      {/* Popular Cars You Can Upgrade To */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div 
            className={`text-center mb-12 transition-all duration-1000 ${isVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Popular Cars You Can <span className="text-[#D4AF37]">Upgrade To</span>
            </h2>
            <p className="text-xl text-white/70" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Premium collection available for trade-in
            </p>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vehicles.map((car, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-500 hover:transform hover:scale-105 cursor-pointer ${isVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                      <Car className="w-20 h-20 text-[#D4AF37]/50" />
                    </div>
                    <div className="absolute top-4 right-4 bg-[#D4AF37] text-black px-3 py-1 rounded-full text-sm font-bold font-button">
                      Available
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 font-subheading">{car.brand} {car.model}</h3>
                    <p className="text-white/60 font-clean mb-4">{car.year} Model</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-[#D4AF37] font-headline">{car.price}</span>
                      <span className="text-green-400 text-sm font-semibold font-clean">Save {car.savings}</span>
                    </div>
                    <button className="w-full bg-white/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-white py-2 rounded-lg transition-all duration-300 font-button">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* Trust Metrics / Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${isVisible[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90 font-headline">
              <span className="text-[#D4AF37]">700+</span> Successful Trade-Ins
            </h2>
            <p className="text-xl text-white/70 font-clean">
              Join thousands of satisfied customers
            </p>
          </div>

          {/* Trust Metrics */}
          <div 
            className={`grid md:grid-cols-4 gap-8 mb-16 transition-all duration-1000 delay-200 ${isVisible[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {[
              { icon: Users, number: '700+', label: 'Trade-Ins Completed' },
              { icon: Star, number: '4.9★', label: 'Google Rating' },
              { icon: Award, number: '₹500Cr+', label: 'Value Transacted' },
              { icon: Clock, number: '24hrs', label: 'Average Process Time' }
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="w-8 h-8 text-black" />
                </div>
                <div className="text-3xl font-bold text-[#D4AF37] mb-2 font-headline">{metric.number}</div>
                <div className="text-white/70 font-clean">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-500 ${isVisible[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center text-black font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold font-subheading">{testimonial.name}</h4>
                    <p className="text-[#D4AF37] text-sm font-clean">{testimonial.trade}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-current" />
                  ))}
                </div>
                
                <p className="text-white/70 font-clean italic">&quot;{testimonial.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${isVisible[8] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90 font-headline">
              Frequently Asked <span className="text-[#D4AF37]">Questions</span>
            </h2>
            <p className="text-xl text-white/70 font-clean">
              Everything you need to know about trade-ins
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-xl border border-[#D4AF37]/20 overflow-hidden transition-all duration-500 ${isVisible[8] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
                >
                  <span className="text-lg font-semibold text-white font-subheading">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 ${
                      activeAccordion === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <div className={`px-6 overflow-hidden transition-all duration-300 ${
                  activeAccordion === index ? 'max-h-96 pb-4' : 'max-h-0'
                }`}>
                  <p className="text-white/70 font-clean">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Request Section */}
      <section id="quote-section" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div 
            className={`bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-[#D4AF37]/10 border-2 border-[#D4AF37]/30 rounded-3xl p-12 text-center backdrop-blur-sm transition-all duration-1000 ${isVisible[9] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <TrendingUp className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Get Your Trade-In Quote Now
            </h3>
            <p className="text-xl text-white/70 mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Fill out the form below and our experts will contact you with a personalized quote
            </p>
            
            <form onSubmit={handleFormSubmit} className="space-y-6 max-w-md mx-auto">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full bg-black/30 border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
              </div>
              
              <div>
                <input 
                  type="tel" 
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/[^\d]/g, '').slice(0, 10) }))}
                  required
                  className="w-full bg-black/30 border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
              </div>
              
              <div>
                <textarea 
                  placeholder="Tell us about your car (Brand, Model, Year, etc.)"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  required
                  rows={4}
                  className="w-full bg-black/30 border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-300 resize-none"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
              </div>

              {submitError && (
                <div className="text-red-400 text-sm text-center p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                  {submitError}
                </div>
              )}
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {isSubmitting ? 'Submitting...' : 'Get Trade-In Quote'}
              </button>
            </form>

            {/* Phone Number Section */}
            <div className="mt-8 pt-8 border-t border-[#D4AF37]/20">
              <p className="text-white/70 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Skip the queue, reach out now!
              </p>
              <button 
                onClick={() => setShowCallModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                📞 Call Now: 7288882121
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1a1a1a] via-[#0e0e0e] to-[#1a1a1a] border-t border-[#D4AF37]/20 p-4 md:hidden z-50">
        <div className="flex gap-2">
          <button 
            onClick={() => {
              const quoteSection = document.getElementById('quote-section');
              if (quoteSection) {
                quoteSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <Calculator className="w-4 h-4" />
            Get Quote
          </button>
          <button 
            onClick={() => setShowCallModal(true)}
            className="flex-1 bg-white/10 border border-[#D4AF37]/30 text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            <MessageCircle className="w-4 h-4" />
            Call Now
          </button>
        </div>
      </div>

      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] border-2 border-[#D4AF37]/30 rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Ready to Call?
            </h3>
            
            <p className="text-white/70 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Speak directly with our trade-in experts
            </p>
            
            <div className="bg-black/40 rounded-xl p-4 mb-6 border border-[#D4AF37]/20">
              <p className="text-[#D4AF37] text-2xl font-bold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                7288882121
              </p>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Available 9:30 AM - 7:30 PM
              </p>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="tel:7288882121"
                className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                📞 Call Now
              </a>
              <button 
                onClick={() => setShowCallModal(false)}
                className="flex-1 bg-white/10 border border-[#D4AF37]/30 text-white py-3 rounded-lg font-bold transition-all duration-300"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer/>
    </div>
  );
};

export default TradeInPage;