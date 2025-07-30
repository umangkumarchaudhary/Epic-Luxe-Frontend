'use client';

import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Youtube, 
  Linkedin, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Phone, 
  Star,
  ChevronRight,
  Crown
} from 'lucide-react';
import '../app/GlobalFonts.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  
  // Unique Feature: Luxury car showcase in footer
  const featuredCars = [
    { brand: 'Mercedes-Benz', model: 'S-Class', year: '2022', price: '₹1.2Cr' },
    { brand: 'BMW', model: 'X7', year: '2021', price: '₹95L' },
    { brand: 'Audi', model: 'A8L', year: '2022', price: '₹1.1Cr' },
    { brand: 'Range Rover', model: 'Vogue', year: '2021', price: '₹1.8Cr' }
  ];

  // Auto-rotate featured cars
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarIndex((prev) => (prev + 1) % featuredCars.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [featuredCars.length]);

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const services = [
    'Buy Premium Car',
    'Sell Your Car', 
    'Get Valuation',
    'Trade-In',
    'Finance',
    'Insurance'
  ];

  const company = [
    'About Us',
    'Testimonials',
    'Blogs',
    'Careers',
    'Press'
  ];

  const support = [
    'Contact Us',
    'WhatsApp Support',
    'Privacy Policy',
    'Terms of Use'
  ];



  return (
    <footer className="bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#BFA980]/10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#BFA980]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Glowing Credibility Ticker */}
      <div className="border-b border-gray-800/50 overflow-hidden relative z-10">
        <div className="bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent py-3">
          <div className="animate-pulse text-center">
            <div className="inline-flex items-center space-x-8 text-sm text-[#D4AF37]">
              <span className="flex items-center space-x-2">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium">10,000+ Satisfied Clients</span>
              </span>
              <span className="hidden md:inline text-[#BFA980]">•</span>
              <span className="hidden md:inline font-medium">Certified Luxury Dealer</span>
              <span className="hidden md:inline text-[#BFA980]">•</span>
              <span className="hidden md:inline font-medium">Trusted by Celebrities</span>
              <span className="hidden md:inline text-[#BFA980]">•</span>
              <span className="hidden md:inline font-medium">Premium Pre-Owned Specialist</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/25">
                  <Crown className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">Epic Luxe</h2>
                  <p className="text-[#D4AF37] text-sm italic font-medium">Where Luxury Meets Legacy</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-8 font-light">
                India's premier destination for luxury pre-owned cars. Experience unmatched quality and sophistication.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                {[
                  { Icon: Instagram, href: '#', label: 'Instagram' },
                  { Icon: Youtube, href: '#', label: 'YouTube' },
                  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { Icon: MessageCircle, href: '#', label: 'WhatsApp' }
                ].map(({ Icon, href, label }, index) => (
                  <a
                    key={index}
                    href={href}
                    aria-label={label}
                    className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37] hover:bg-gradient-to-br hover:from-[#D4AF37]/10 hover:to-[#BFA980]/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#D4AF37]/25"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Menus */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-6 relative">
                Services
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full"></div>
              </h3>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-[#D4AF37] transition-all duration-300 flex items-center group text-sm font-light"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#BFA980]" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{service}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-6 relative">
                Company
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full"></div>
              </h3>
              <ul className="space-y-4">
                {company.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-[#D4AF37] transition-all duration-300 flex items-center group text-sm font-light"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#BFA980]" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-6 relative">
                Support
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full"></div>
              </h3>
              <ul className="space-y-4">
                {support.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-[#D4AF37] transition-all duration-300 flex items-center group text-sm font-light"
                    >
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#BFA980]" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter & Contact */}
          <div className="lg:col-span-1">
            {/* Newsletter */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-6 relative">
                Luxury Updates
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full"></div>
              </h3>
              <p className="text-gray-300 text-sm mb-6 font-light">Subscribe to our newsletter for exclusive luxury updates and offers</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BFA980] w-4 h-4 z-10" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-gray-900/70 focus:shadow-lg focus:shadow-[#D4AF37]/10 transition-all duration-300 text-sm font-light backdrop-blur-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-semibold py-3 rounded-lg hover:from-[#BFA980] hover:to-[#D4AF37] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/25 hover:scale-[1.02] text-sm"
                >
                  Subscribe Now
                </button>
              </form>
            </div>

            {/* Showroom Location */}
            <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 rounded-xl p-6 border border-[#D4AF37]/20 backdrop-blur-sm hover:border-[#D4AF37]/40 transition-all duration-300">
              <h4 className="text-[#D4AF37] font-semibold mb-3 flex items-center text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                Flagship Showroom
              </h4>
              <p className="text-gray-300 text-sm font-light leading-relaxed">
                Banjara Hills, Hyderabad<br />
                <span className="text-[#D4AF37] font-medium">Open 10 AM - 8 PM</span>
              </p>
              <div className="mt-4 flex items-center text-sm text-gray-400">
                <Phone className="w-4 h-4 mr-2 text-[#BFA980]" />
                <span className="font-light">+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm border-t border-gray-800/30 pt-8">
          <p className="font-light">© 2025 Epic Luxe. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-light">
            Crafted with <span className="text-[#D4AF37]">♥</span> for luxury car enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;