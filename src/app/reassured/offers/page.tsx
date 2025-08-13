'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Check, Star, Phone, Mail, User, Car, ArrowRight, Shield, Award, MapPin, TrendingUp } from 'lucide-react';

const EpicReassuredLanding = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interestedCar: '',
    campaignSource: 'Meta_Ads',
    campaignName: ''
  });

  // Auto popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLeadForm(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !showLeadForm) {
        setShowExitIntent(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showLeadForm]);

  // Testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = async () => {
    if (!formData.name || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          campaignSource: 'Meta_Ads',
          campaignName: new URLSearchParams(window.location.search).get('campaign') || 'default'
        }),
      });
      if (response.ok) {
        alert('Thank you! We\'ll contact you soon.');
        setShowLeadForm(false);
        setShowExitIntent(false);
        setFormData({ name: '', phone: '', email: '', interestedCar: '', campaignSource: 'Meta_Ads', campaignName: '' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Thank you! We\'ll contact you soon.'); // Fallback for demo
      setShowLeadForm(false);
      setShowExitIntent(false);
    }
  };

  const trustBadges = [
    { icon: Shield, title: "1-Year Warranty", subtitle: "Comprehensive Coverage" },
    { icon: Award, title: "Certified Pre-Owned", subtitle: "Quality Assured" },
    { icon: MapPin, title: "500+ Service Centers", subtitle: "Pan-India Support" },
    { icon: TrendingUp, title: "98% Claim Approval", subtitle: "Hassle-Free Process" }
  ];

  const featuredCars = [
    { name: "Toyota Camry", emi: "₹18,999", image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop" },
    { name: "MG Hector", emi: "₹15,799", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=250&fit=crop" },
    { name: "Skoda Octavia", emi: "₹16,899", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop" },
    { name: "Honda City", emi: "₹12,499", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop" }
  ];

  const testimonials = [
    { name: "Rajesh Kumar", location: "Mumbai", text: "Got my dream car with zero hassle. The warranty gave me complete peace of mind.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" },
    { name: "Priya Sharma", location: "Delhi", text: "Amazing experience! The certification process is thorough and transparent.", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c1de?w=60&h=60&fit=crop&crop=face" },
    { name: "Amit Patel", location: "Bangalore", text: "Best decision ever. Quality cars at unbeatable prices with full warranty coverage.", rating: 5, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" }
  ];

  const LeadForm = ({ onClose, title = "Reserve Your Dream Car" }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interested Car</label>
            <select
              value={formData.interestedCar}
              onChange={(e) => setFormData({ ...formData, interestedCar: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Select a car model</option>
              <option value="Toyota Camry">Toyota Camry</option>
              <option value="MG Hector">MG Hector</option>
              <option value="Skoda Octavia">Skoda Octavia</option>
              <option value="Honda City">Honda City</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            onClick={handleFormSubmit}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Book Now - Get Instant Approval
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          By submitting, you agree to our terms and conditions. We respect your privacy.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Epic Reassured
            </div>
            <a href="tel:+919876543210" className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700">
              <Phone size={20} />
              <span className="hidden sm:inline font-medium">Call Now</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Premium Cars,
                <span className="text-yellow-600"> Certified</span> Quality
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Experience luxury without compromise. Our certified pre-owned vehicles come with comprehensive warranty and unmatched quality assurance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-4 px-8 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-xl text-lg"
                >
                  Book Now - Limited Offer
                </button>
                <button className="border-2 border-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-lg hover:border-yellow-500 hover:text-yellow-600 transition-all duration-200">
                  View Inventory
                </button>
              </div>
            </div>
            <div className="relative animate-in slide-in-from-right duration-700">
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop"
                alt="Premium Car"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <badge.icon className="h-12 w-12 text-yellow-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                  <h3 className="font-bold text-gray-900 mb-2">{badge.title}</h3>
                  <p className="text-sm text-gray-600">{badge.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Highlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop"
                alt="Campaign Offer"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
                loading="lazy"
              />
              <div className="absolute top-6 left-6 bg-yellow-400 text-white px-4 py-2 rounded-full font-bold">
                Limited Time
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                Get 0% Interest Rate This Month
              </h2>
              <p className="text-lg text-gray-600">
                Special financing offer on all certified pre-owned vehicles. Drive home your dream car today with zero down payment and flexible EMI options.
              </p>
              <ul className="space-y-3">
                {['Zero down payment required', 'Instant loan approval', 'Flexible repayment terms', '1-year comprehensive warranty'].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-yellow-600" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowLeadForm(true)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-4 px-8 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Claim This Offer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Featured Premium Cars
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hand-picked certified vehicles that combine luxury, performance, and reliability
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
                onClick={() => setShowLeadForm(true)}
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{car.name}</h3>
                  <p className="text-2xl font-bold text-yellow-600 mb-4">Starting {car.emi}/month</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Certified Pre-Owned</span>
                    <ArrowRight className="h-5 w-5 text-yellow-600 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              How It Works
            </h2>
            <p className="text-lg text-gray-600">Three simple steps to drive your dream car</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Apply Online", desc: "Fill out our quick application form in under 2 minutes" },
              { step: 2, title: "Get Approved", desc: "Instant pre-approval with our AI-powered verification system" },
              { step: 3, title: "Drive Your Car", desc: "Choose your car and drive home the same day" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              What Our Customers Say
            </h2>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-6 italic">"{testimonials[currentTestimonial].text}"</p>
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-600 text-sm">{testimonials[currentTestimonial].location}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setCurrentTestimonial((prev) => prev === 0 ? testimonials.length - 1 : prev - 1)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* About Epic Reassured */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Why Choose Epic Reassured?
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We've revolutionized the pre-owned car buying experience by combining cutting-edge technology with uncompromising quality standards. Every vehicle undergoes our rigorous 200-point inspection process, ensuring you drive away with complete confidence and peace of mind.
          </p>
          <img
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=300&fit=crop"
            alt="Epic Reassured Showroom"
            className="w-full h-64 object-cover rounded-2xl shadow-xl"
            loading="lazy"
          />
        </div>
      </section>

      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30 md:hidden">
        <button
          onClick={() => setShowLeadForm(true)}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 shadow-lg"
        >
          🚗 Limited Offer — Apply Now
        </button>
      </div>

      {/* Lead Form Modals */}
      {showLeadForm && (
        <LeadForm onClose={() => setShowLeadForm(false)} />
      )}

      {showExitIntent && (
        <LeadForm
          onClose={() => setShowExitIntent(false)}
          title="Wait! Don't Miss This Deal"
        />
      )}
    </div>
  );
};

export default EpicReassuredLanding;