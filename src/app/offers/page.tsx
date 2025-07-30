'use client';

import React, { useState, useEffect } from 'react';
import { 
  X,
  Phone,
  User,
  MapPin,
  Car,
  CheckCircle,
  Shield,
  CreditCard,
  Users,
  ArrowRight,
  Sparkles,
  Star,
  Clock,
  Award,
  Navigation,
  ChevronDown,
  Play
} from 'lucide-react';

const AdLandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showStickyHeader, setShowStickyHeader] = useState(true);
  const [selectedModel, setSelectedModel] = useState('');

  const luxuryCars = [
    'Mercedes-Benz C-Class', 'BMW 3 Series', 'Audi A4', 'Volvo XC60',
    'Jaguar XF', 'Land Rover Discovery', 'Porsche Macan', 'Lexus ES'
  ];

  const featuredInventory = [
    {
      brand: 'Mercedes-Benz',
      model: 'GLC 220d',
      year: '2021',
      price: '₹52,00,000',
      originalPrice: '₹58,00,000',
      image: '/api/placeholder/400/250',
      mileage: '35,000 km',
      fuel: 'Diesel',
      location: 'Hyderabad'
    },
    {
      brand: 'BMW',
      model: '5 Series 530i',
      year: '2020',
      price: '₹45,00,000',
      originalPrice: '₹52,00,000',
      image: '/api/placeholder/400/250',
      mileage: '28,000 km',
      fuel: 'Petrol',
      location: 'Mumbai'
    },
    {
      brand: 'Audi',
      model: 'Q5 45 TFSI',
      year: '2021',
      price: '₹48,00,000',
      originalPrice: '₹55,00,000',
      image: '/api/placeholder/400/250',
      mileage: '22,000 km',
      fuel: 'Petrol',
      location: 'Delhi'
    },
    {
      brand: 'Range Rover',
      model: 'Evoque SE',
      year: '2020',
      price: '₹58,00,000',
      originalPrice: '₹65,00,000',
      image: '/api/placeholder/400/250',
      mileage: '31,000 km',
      fuel: 'Petrol',
      location: 'Bangalore'
    }
  ];

  // Auto-trigger modal on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide sticky header based on scroll direction
      if (currentScrollY > scrollY && currentScrollY > 100) {
        setShowStickyHeader(false);
      } else {
        setShowStickyHeader(true);
      }
      
      setScrollY(currentScrollY);

      // Re-trigger modal if user scrolls 75% without submitting
      if (currentScrollY > document.body.scrollHeight * 0.75 && !formSubmitted && !showModal) {
        setShowModal(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY, formSubmitted, showModal]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormSubmitted(true);
    
    // Hide modal after success animation
    setTimeout(() => {
      setShowModal(false);
    }, 2000);

    // Send to Supabase or CRM webhook
    console.log('Lead captured:', { /* form data */ });
  };

  const sendOtp = () => {
    setOtpSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e] text-white overflow-x-hidden">
      
      {/* Full-Screen Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Ken Burns Effect */}
        <div className="absolute inset-0">
          <img
            src="/api/placeholder/1920/1080"
            alt="Luxury Car"
            className="w-full h-full object-cover object-center blur-sm scale-110 animate-pulse"
            style={{
              animation: 'kenBurns 20s ease-in-out infinite alternate'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0e0e0e]/70 to-black/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse"></div>
            <Sparkles className="w-12 h-12 text-[#D4AF37] animate-pulse" />
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white/90 font-headline">
            Your Luxury <span className="text-[#D4AF37]">Dream Car</span><br />
            Awaits
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 font-clean mb-8 max-w-2xl mx-auto">
            One step closer to owning a certified pre-owned luxury car
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
              <span>200+ Point Inspection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
              <span>Pan-India Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
              <span>Flexible Finance</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-[#D4AF37]" />
        </div>
      </section>

      {/* Modal Popup Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-3xl p-8 border border-[#D4AF37]/30 max-w-md w-full relative animate-in fade-in zoom-in duration-300">
            
            {!formSubmitted ? (
              <>
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#D4AF37] mb-2 font-headline">
                    Get Instant Callback
                  </h3>
                  <p className="text-white/70 font-clean">
                    Connect with our luxury car expert now
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[#D4AF37] font-semibold mb-2 text-sm font-subheading">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        className="w-full bg-black/40 border border-[#D4AF37]/30 rounded-lg pl-10 pr-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#D4AF37] font-semibold mb-2 text-sm font-subheading">
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input
                          type="tel"
                          placeholder="10-digit number"
                          required
                          className="w-full bg-black/40 border border-[#D4AF37]/30 rounded-lg pl-10 pr-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={sendOtp}
                        className="bg-white/10 border border-[#D4AF37]/30 text-white px-4 py-3 rounded-lg hover:bg-[#D4AF37]/20 transition-all duration-300 text-sm font-button whitespace-nowrap"
                      >
                        {otpSent ? 'Resend' : 'Send OTP'}
                      </button>
                    </div>
                    {otpSent && (
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full bg-black/40 border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-300 mt-2"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-[#D4AF37] font-semibold mb-2 text-sm font-subheading">
                      Interested Model (Optional)
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-black/40 border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
                    >
                      <option value="">Select Model</option>
                      {luxuryCars.map(car => (
                        <option key={car} value={car}>{car}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D4AF37] font-semibold mb-2 text-sm font-subheading">
                      Your City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input
                        type="text"
                        placeholder="City"
                        required
                        className="w-full bg-black/40 border border-[#D4AF37]/30 rounded-lg pl-10 pr-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black py-3 rounded-lg font-bold hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105 font-button"
                  >
                    Get a Callback
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <CheckCircle className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-[#D4AF37] mb-4 font-headline">
                  Thank You!
                </h3>
                <p className="text-white/70 font-clean">
                  Our luxury car expert will call you within 10 minutes
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Featured Inventory */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90 font-headline">
              Featured <span className="text-[#D4AF37]">Luxury Collection</span>
            </h2>
            <p className="text-xl text-white/70 font-clean">
              Handpicked certified pre-owned vehicles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredInventory.map((car, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-500 hover:transform hover:scale-105 cursor-pointer"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                    <Car className="w-20 h-20 text-[#D4AF37]/50" />
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold font-button">
                    Available
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-clean">
                    {car.location}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 font-subheading">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-white/60 font-clean mb-3">{car.year} • {car.mileage} • {car.fuel}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-[#D4AF37] font-headline">{car.price}</span>
                      <span className="text-white/50 line-through text-sm ml-2 font-clean">{car.originalPrice}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black py-2 rounded-lg font-bold hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300 text-sm font-button">
                      Know More
                    </button>
                    <button className="flex-1 bg-white/10 border border-[#D4AF37]/30 text-white py-2 rounded-lg hover:bg-[#D4AF37]/20 transition-all duration-300 text-sm font-button">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Epic Luxe */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0e0e0e] to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90 font-headline">
              Why Choose <span className="text-[#D4AF37]">Epic Luxe</span>
            </h2>
            <p className="text-xl text-white/70 font-clean">
              India's most trusted luxury car platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: 'Certified Pre-Owned',
                description: '200+ point vehicle inspection & quality guarantee'
              },
              {
                icon: Navigation,
                title: 'Pan-India Doorstep Test Drive',
                description: 'Experience luxury cars at your convenience'
              },
              {
                icon: CreditCard,
                title: 'Flexible Finance',
                description: 'EMI options starting from 8.5% interest rate'
              },
              {
                icon: Car,
                title: 'Luxury-Only Inventory',
                description: 'Mercedes, BMW, Audi, Volvo, Porsche & more'
              },
              {
                icon: Users,
                title: '1-on-1 Concierge Service',
                description: 'Expert guidance at every step of your journey'
              },
              {
                icon: Shield,
                title: 'Warranty & Support',
                description: 'Comprehensive coverage & 24/7 roadside assistance'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-500 group hover:transform hover:scale-105"
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

      {/* About Epic Luxe */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white/90 font-headline">
                About <span className="text-[#D4AF37]">Epic Luxe</span>
              </h2>
              
              <div className="space-y-6 text-white/70 font-clean text-lg">
                <p>
                  Epic Luxe is India's most premium platform for certified pre-owned luxury vehicles. 
                  With our curated collection of Mercedes-Benz, BMW, Audi, Volvo and more — we make 
                  luxury more accessible than ever.
                </p>
                
                <p>
                  Our vehicles come fully inspected, finance-ready, and with a seamless digital experience. 
                  Based in Hyderabad and operating Pan-India, we've helped over 2,000+ customers find 
                  their perfect luxury car.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-8">
                {[
                  { number: '2000+', label: 'Happy Customers' },
                  { number: '₹500Cr+', label: 'Cars Sold' },
                  { number: '4.9★', label: 'Customer Rating' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#D4AF37] mb-2 font-headline">{stat.number}</div>
                    <div className="text-white/60 font-clean text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-3xl p-8 border border-[#D4AF37]/20 backdrop-blur-sm">
                <div className="h-64 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-6">
                  <Car className="w-32 h-32 text-[#D4AF37]/30" />
                </div>
                <h3 className="text-xl font-bold text-[#D4AF37] mb-2 font-subheading">Epic Luxe Showroom</h3>
                <p className="text-white/70 font-clean">Experience luxury in our premium showroom facility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Footer (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1a1a1a] via-[#0e0e0e] to-[#1a1a1a] border-t border-[#D4AF37]/20 p-4 z-40">
        <div className="flex gap-2">
          <a
            href="tel:+914023547890"
            className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black py-3 rounded-lg font-bold text-sm font-button flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 bg-white/10 border border-[#D4AF37]/30 text-white py-3 rounded-lg font-bold text-sm font-button flex items-center justify-center gap-2"
          >
            <Car className="w-4 h-4" />
            Book Test Drive
          </button>
        </div>
      </div>

      {/* Custom CSS for Ken Burns effect */}
      <style jsx>{`
        @keyframes kenBurns {
          0% { transform: scale(1.1) translateX(0) translateY(0); }
          50% { transform: scale(1.2) translateX(-2%) translateY(-1%); }
          100% { transform: scale(1.1) translateX(2%) translateY(1%); }
        }
      `}</style>
    </div>
  );
};

export default AdLandingPage;
