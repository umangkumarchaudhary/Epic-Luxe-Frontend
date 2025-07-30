'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Star, Send, Check, Copy, Calendar, ChevronRight, Clock, Award, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredTime: '',
    carInterest: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  
  // Slider states for both contact cards and reviews
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Define the functions first
  const copyEmail = () => {
    navigator.clipboard.writeText('luxury@raamgroup.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText('+91 98765 43210');
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  // Contact cards data - defined after the functions it depends on
  const contactCards = [
    {
      id: 'call',
      icon: Phone,
      title: 'Speak Directly',
      description: 'Immediate assistance from our experts',
      contact: '+91 98765 43210',
      primaryAction: () => window.open('tel:+919876543210'),
      primaryText: 'Call Now',
      secondaryAction: copyPhone,
      secondaryText: phoneCopied ? 'Copied!' : 'Copy Number',
      secondaryIcon: phoneCopied ? Check : Copy,
      isActive: phoneCopied
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Write to Us',
      description: 'Detailed inquiries and documentation',
      contact: 'luxury@raamgroup.com',
      primaryAction: () => window.open('mailto:luxury@raamgroup.com'),
      primaryText: 'Send Email',
      secondaryAction: copyEmail,
      secondaryText: emailCopied ? 'Copied!' : 'Copy Email',
      secondaryIcon: emailCopied ? Check : Copy,
      isActive: emailCopied
    },
    {
      id: 'visit',
      icon: MapPin,
      title: 'Experience Luxury',
      description: 'Visit our premium showroom',
      contact: 'Banjara Hills, Hyderabad',
      primaryAction: () => {},
      primaryText: 'Schedule Visit',
      secondaryAction: () => {},
      secondaryText: 'View on Map',
      secondaryIcon: MapPin,
      isActive: false
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide functionality for contact cards
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % contactCards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, contactCards.length]);

  // Auto-slide functionality for reviews
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentReviewSlide((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredTime: '',
        carInterest: ''
      });
    }, 3000);
  };

  const reviews = [
    { name: "Arjun Mehta", rating: 5, text: "Exceptional service! The team made buying my dream car effortless. Every detail was perfect.", avatar: "AM", verified: true },
    { name: "Priya Sharma", rating: 5, text: "Premium experience from start to finish. The showroom visit was absolutely luxurious.", avatar: "PS", verified: true },
    { name: "Rajesh Kumar", rating: 5, text: "Outstanding quality and transparency. Raam Group exceeded all my expectations completely.", avatar: "RK", verified: true },
      ];

  const carInterests = [
    'BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Jaguar', 'Land Rover', 'Lexus', 'Volvo', 'Other Premium Brand'
  ];

 const renderContactCard = (card, index) => {
  const Icon = card.icon;
  const SecondaryIcon = card.secondaryIcon;

  return (
    <div 
      key={card.id}
      className="group relative bg-gradient-to-br from-[#1a1a1a]/90 to-[#0e0e0e]/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-500 hover:transform hover:scale-105 hover:rotate-1 w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      <div className="relative">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-xl flex items-center justify-center mb-3 group-hover:animate-bounce mx-auto sm:mx-0">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white/95 playfair-font text-center sm:text-left">
          {card.title}
        </h3>

        <p className="text-white/70 mb-2 text-sm manrope-font text-center sm:text-left leading-tight">
          {card.description}
        </p>

        <div className="text-[#D4AF37] text-base sm:text-lg font-semibold mb-3 manrope-font text-center sm:text-left">
          {card.id === 'visit' ? (
            <div className="text-white/80 text-xs sm:text-sm leading-snug">
              Hi-Tech City, Hyderabad<br />
              Telangana 500081<br />
              <span className="text-[#D4AF37] text-xs">Mon - Sun: 9:00 AM - 8:00 PM</span>
            </div>
          ) : (
            <div className={card.id === 'email' ? 'break-all' : ''}>{card.contact}</div>
          )}
        </div>

        <div className="space-y-2">
          <button 
            onClick={card.primaryAction}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-4 sm:px-5 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 manrope-font text-sm sm:text-base"
          >
            {card.primaryText}
          </button>
          <button 
            onClick={card.secondaryAction}
            className="w-full bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] px-4 sm:px-5 py-2.5 rounded-lg font-medium hover:bg-[#D4AF37]/10 transition-all duration-300 flex items-center justify-center gap-2 manrope-font text-sm sm:text-base"
          >
            <SecondaryIcon className="w-4 h-4" />
            {card.secondaryText}
          </button>
        </div>
      </div>
    </div>
  );
};


  const renderReviewCard = (review, index) => {
    return (
      <div
        key={index}
        className="w-full bg-gradient-to-br from-[#1a1a1a]/90 to-[#0e0e0e]/90 backdrop-blur-lg p-4 sm:p-6 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center text-black font-bold manrope-font text-sm sm:text-base">
              {review.avatar}
            </div>
            <div>
              <h4 className="font-semibold text-white/95 flex items-center gap-2 manrope-font text-sm sm:text-base">
                {review.name}
                {review.verified && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />}
              </h4>
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed manrope-font text-sm sm:text-base">{review.text}</p>
      </div>
    );
  };

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white overflow-hidden manrope-font">
      <Header />
      
      {/* Enhanced Background Elements - Mobile Optimized */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-radial from-[#D4AF37]/15 to-transparent rounded-full blur-3xl transition-all duration-500"
          style={{
            left: mousePosition.x - 96,
            top: mousePosition.y - 96,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-gradient-radial from-[#BFA980]/8 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-28 h-28 sm:w-40 sm:h-40 md:w-64 md:h-64 bg-gradient-radial from-[#D4AF37]/12 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Luxury Grid Pattern - Mobile Optimized */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
            backgroundSize: '25px 25px'
          }} />
        </div>
      </div>

      {/* Enhanced Hero Section - Optimized Spacing and Font Sizes */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-3 sm:px-4 md:px-6 overflow-hidden pt-16 sm:pt-20">
  {/* Background Image */}
  <div 
    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/assets/images/bugatti.jpg')",
    }}
  ></div>
  
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/95 via-[#0e0e0e]/90 to-[#1a1a1a]/95" />
  
  {/* Enhanced Shimmer Animation */}
  <div className="absolute inset-0 opacity-40">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent transform -skew-x-12 animate-shimmer" />
  </div>

  <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
    <div className="animate-fade-in-up">
      <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#D4AF37] via-white to-[#BFA980] bg-clip-text text-transparent leading-tight playfair-font px-2">
        We're Here for You
      </h1>
      <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 text-[#D4AF37] playfair-font px-2">
        — Always at Your Service.
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed font-light manrope-font px-4">
        Connect with our luxury automotive specialists for personalized consultation, 
        exclusive showroom visits, or simply to explore your dream car possibilities.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
        <button 
          onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
          className="group relative overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#BFA980] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-black font-semibold text-base sm:text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 transform hover:scale-105 manrope-font w-full sm:w-auto"
        >
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          <span className="relative flex items-center justify-center gap-2">
            Start Conversation
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
        
        <button 
          onClick={() => window.open('tel:+919876543210')}
          className="group relative overflow-hidden bg-transparent border-2 border-[#D4AF37] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[#D4AF37] font-semibold text-base sm:text-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300 transform hover:scale-105 manrope-font w-full sm:w-auto"
        >
          <span className="relative flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            Call Directly
          </span>
        </button>
      </div>
    </div>
  </div>
</section>


      {/* Enhanced Contact Info Cards with Auto Slider - Optimized Spacing */}
      <section className="relative py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-6">
  <div className="max-w-7xl mx-auto">
    {/* Title & Subtitle */}
    <div className="text-center mb-5 sm:mb-6 md:mb-8">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 text-white/95 playfair-font px-2">
        Connect With Excellence
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-white/70 max-w-xl mx-auto manrope-font px-4">
        Choose your preferred way to reach our luxury car specialists
      </p>
    </div>

    {/* Mobile Slider View */}
    <div className="md:hidden relative">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {contactCards.map((card, index) => (
            <div key={card.id} className="w-full flex-shrink-0 px-2">
              {renderContactCard(card, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="flex justify-center mt-3 gap-1.5">
        {contactCards.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-[#D4AF37] w-5' : 'bg-[#D4AF37]/30'
            }`}
          />
        ))}
      </div>
    </div>

    {/* Desktop Grid View */}
    <div className="hidden md:grid md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      {contactCards.map((card, index) => renderContactCard(card, index))}
    </div>
  </div>
</section>


      {/* Enhanced Contact Form - Optimized Spacing */}
     <section
  id="contact-form"
  className="relative py-8 px-2 md:py-12 md:px-0"
>
  <div className="max-w-2xl mx-auto">
    <div className="text-center mb-6 md:mb-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent playfair-font tracking-tight px-2">
        Let's Create Magic Together
      </h2>
      <p className="text-sm md:text-base text-white/70 max-w-lg mx-auto leading-normal manrope-font px-2">
        Share your automotive dreams, and we'll craft the perfect luxury experience for you
      </p>
    </div>
    <div className="relative bg-gradient-to-br from-[#161616] via-[#21202D] to-[#101012] p-5 md:p-8 rounded-2xl border border-[#D4AF37]/30 shadow-[0_4px_32px_0_rgba(212,175,55,0.08)] overflow-hidden backdrop-blur-lg">
      <div className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: 'linear-gradient(120deg,rgba(212,175,55,0.08),transparent 70%)',
          zIndex: 1
        }} />
      <form onSubmit={handleSubmit} className="relative z-10 space-y-4 md:space-y-5">
        {/* Full Name */}
        <div className="relative group">
          <label className="block text-xs font-semibold text-[#D4AF37] mb-1 tracking-wide manrope-font pl-1">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField('')}
            className="w-full bg-[#181818]/85 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25 focus:outline-none transition-all duration-200 manrope-font text-base shadow-inner"
            placeholder="Enter your full name"
            required
            autoComplete="off"
          />
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded transition-all duration-300 ${focusedField === 'name' ? 'w-full' : 'w-0'}`}
          />
        </div>
        {/* Phone Number */}
        <div className="relative group">
          <label className="block text-xs font-semibold text-[#D4AF37] mb-1 tracking-wide manrope-font pl-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField('')}
            className="w-full bg-[#181818]/85 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25 focus:outline-none transition-all duration-200 manrope-font text-base shadow-inner"
            placeholder="+91 98765 43210"
            required
            autoComplete="off"
          />
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded transition-all duration-300 ${focusedField === 'phone' ? 'w-full' : 'w-0'}`}
          />
        </div>
        {/* Car Brand */}
        <div className="relative group">
          <label className="block text-xs font-semibold text-[#D4AF37] mb-1 tracking-wide manrope-font pl-1">
            Interested Car Brand
          </label>
          <select
            name="carInterest"
            value={formData.carInterest}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('car')}
            onBlur={() => setFocusedField('')}
            className="w-full bg-[#181818]/85 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25 focus:outline-none transition-all duration-200 manrope-font text-base appearance-none"
          >
            <option value="">Select your preferred brand</option>
            {carInterests.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded transition-all duration-300 ${focusedField === 'car' ? 'w-full' : 'w-0'}`}
          />
        </div>
        {/* Message */}
        <div className="relative group">
          <label className="block text-xs font-semibold text-[#D4AF37] mb-1 tracking-wide manrope-font pl-1">
            Your Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField('')}
            rows="4"
            className="w-full bg-[#181818]/85 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25 focus:outline-none transition-all duration-200 resize-none manrope-font text-base shadow-inner"
            placeholder="Tell us about your dream car, budget preferences, or any specific requirements..."
            required
            autoComplete="off"
          />
          <span
            className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded transition-all duration-300 ${focusedField === 'message' ? 'w-full' : 'w-0'}`}
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitted}
          className={`w-full relative overflow-hidden rounded-xl py-3 font-semibold text-base tracking-wide manrope-font transition-all duration-400 shadow-lg ${
            isSubmitted
              ? 'bg-green-600 text-white'
              : 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black hover:shadow-2xl hover:shadow-[#D4AF37]/40 hover:scale-[1.025]'
          } group`}
        >
          <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left pointer-events-none" />
          <span className="relative flex items-center justify-center gap-2">
            {isSubmitted ? (
              <>
                <Check className="w-5 h-5 animate-pulse" />
                Message Sent Successfully!
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Luxury Inquiry
                {isTyping && <span className="animate-pulse">...</span>}
              </>
            )}
          </span>
        </button>
        {/* Privacy Notice */}
        <p className="text-center text-white/40 text-xs font-medium manrope-font pt-1">
          <Shield className="w-4 h-4 inline mr-1 align-text-top" />
          Your information is secure and will only be used to provide you with personalized luxury car recommendations.
        </p>
      </form>
    </div>
  </div>
</section>



      {/* Enhanced Reviews Section with Mobile Slider - Optimized Spacing */}
      <section className="relative py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 overflow-hidden">
  <div className="max-w-3xl mx-auto">
    <div className="text-center mb-6 sm:mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white/95 playfair-font px-2 tracking-tight">
        Trusted by Luxury Enthusiasts
      </h2>
      <div className="flex justify-center items-center gap-2 mb-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-[#D4AF37] text-[#D4AF37]" />
          ))}
        </div>
        <span className="text-lg font-bold text-[#D4AF37] ml-2 manrope-font">5.0</span>
      </div>
      <p className="text-white/70 manrope-font text-sm">Based on 250+ verified reviews</p>
    </div>

    {/* REVIEWS FOR DESKTOP AND MOBILE (Responsive, Always Centered, No Scroll) */}
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-5 md:gap-6">
      {reviews.slice(0, 3).map((review, index) => (
        <div
          key={index}
          className="flex-1 bg-gradient-to-br from-[#191814]/95 to-[#101012]/95 backdrop-blur-md p-5 rounded-2xl border border-[#D4AF37]/15 shadow-xl hover:shadow-2xl hover:border-[#D4AF37]/40 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center text-black font-bold manrope-font text-lg">
              {review.avatar}
            </div>
            <div>
              <h4 className="font-semibold text-white/95 flex items-center gap-2 manrope-font text-base">
                {review.name}
                {review.verified && <Check className="w-4 h-4 text-green-400" />}
              </h4>
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
            </div>
          </div>
          <p className="text-white/85 leading-relaxed manrope-font text-base">
            “{review.text}”
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Enhanced Map Section - Optimized Spacing */}
      <section className="relative py-10 px-2 md:py-16 md:px-0">
  <div className="max-w-5xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Info Side */}
      <div className="order-2 lg:order-1">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent playfair-font tracking-tight">
          Experience Luxury in Person
        </h2>
        <p className="text-base md:text-lg text-white/80 mb-5 leading-relaxed manrope-font">
          Step into our world-class showroom in Hyderabad's prestigious Hi-Tech City,
          where luxury meets innovation in automotive excellence.
        </p>
        <div className="space-y-4 mb-8">
          {/* Feature card */}
          <div className="flex items-center rounded-xl bg-gradient-to-br from-[#18181A]/90 to-[#101013]/80 border border-[#D4AF37]/10 px-4 py-3 gap-4 group transition-all duration-300 hover:border-[#D4AF37]/40 shadow-md">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition">
              <MapPin className="w-5 h-5 text-black" />
            </div>
            <div>
              <h4 className="font-semibold text-white/90 mb-1 manrope-font text-sm">Premium Location</h4>
              <p className="text-white/70 manrope-font text-xs">Hi-Tech City, Hyderabad, Telangana 500081</p>
            </div>
          </div>
          <div className="flex items-center rounded-xl bg-gradient-to-br from-[#18181A]/90 to-[#101013]/80 border border-[#D4AF37]/10 px-4 py-3 gap-4 group transition-all duration-300 hover:border-[#D4AF37]/40 shadow-md">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition">
              <Clock className="w-5 h-5 text-black" />
            </div>
            <div>
              <h4 className="font-semibold text-white/90 mb-1 manrope-font text-sm">Operating Hours</h4>
              <p className="text-white/70 manrope-font text-xs">Monday - Sunday: 9:00 AM - 8:00 PM</p>
            </div>
          </div>
          <div className="flex items-center rounded-xl bg-gradient-to-br from-[#18181A]/90 to-[#101013]/80 border border-[#D4AF37]/10 px-4 py-3 gap-4 group transition-all duration-300 hover:border-[#D4AF37]/40 shadow-md">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition">
              <Award className="w-5 h-5 text-black" />
            </div>
            <div>
              <h4 className="font-semibold text-white/90 mb-1 manrope-font text-sm">Exclusive Services</h4>
              <p className="text-white/70 manrope-font text-xs">Private consultation, test drives, concierge services</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 manrope-font text-base w-full sm:w-auto">
            <Calendar className="w-5 h-5" />
            Schedule Private Visit
          </button>
          <button className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-xl font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 manrope-font text-base w-full sm:w-auto">
            <MapPin className="w-5 h-5" />
            Get Directions
          </button>
        </div>
      </div>
      {/* Map Side */}
      <div className="relative order-1 lg:order-2">
        <div className="aspect-video bg-gradient-to-br from-[#17171a] to-[#101012]/90 rounded-2xl border border-[#D4AF37]/15 flex items-center justify-center overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group backdrop-blur-sm">
          <div className="absolute inset-0  bg-gradient-to-br from-[#D4AF37]/10 to-transparent pointer-events-none" />
          <div className="text-center relative p-4 z-10">
            <MapPin className="w-14 h-14 md:w-16 md:h-16 text-[#D4AF37] mx-auto mb-3 animate-pulse drop-shadow" />
            <h3 className="text-lg md:text-xl font-bold text-white/90 mb-1 playfair-font tracking-tight">Interactive Map</h3>
            <p className="text-white/70 mb-2 manrope-font text-xs">Raam Group Luxury Showroom</p>
            <p className="text-[#D4AF37] text-xs manrope-font">Click to view full map</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Enhanced Footer CTA - Optimized Spacing */}
      <section className="relative py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white/95 playfair-font px-2">
            Ready to Begin Your Luxury Journey?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/70 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed manrope-font px-4">
            Join hundreds of satisfied customers who found their perfect luxury vehicle with Raam Group. 
            Your dream car is just one conversation away.
          </p>
          
          <div className="relative inline-block px-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-xl sm:rounded-2xl blur-xl opacity-60 animate-pulse" />
            <button className="relative bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg md:text-xl font-bold hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 transform hover:scale-105 group manrope-font w-full sm:w-auto">
              <span className="relative flex items-center justify-center gap-2">
                Start Your Luxury Experience
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>
      
      <Footer />

      <style jsx>{`
        /* Font imports - ensuring Manrope loads first */
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');

        /* Custom breakpoint for extra small screens */
        @media (min-width: 480px) {
          .xs\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
          .xs\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        }

        /* Direct font declarations to ensure Manrope is used */
        * {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        .manrope-font, .font-primary {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        .inter-font, .font-secondary {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        .playfair-font, .font-heading {
          font-family: 'Playfair Display', serif !important;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
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

        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }

        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 4s ease-in-out infinite;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        /* Enhanced mobile touch targets */
        @media (max-width: 768px) {
          button, a, input, select, textarea {
            min-height: 44px;
          }
          
          /* Improved tap highlighting */
          * {
            -webkit-tap-highlight-color: rgba(212, 175, 55, 0.3);
          }
        }

        /* Prevent horizontal scroll on mobile */
        body {
          overflow-x: hidden;
        }

        /* Improved focus states for mobile */
        input:focus, select:focus, textarea:focus {
          outline: 2px solid #D4AF37;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
