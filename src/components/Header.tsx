'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown, Car, Crown, Shield, Gem, Search, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const handleScroll = () => {
    const heroSection = document.getElementById('hero-section');
    // If no hero section exists (other pages), show header immediately
    if (!heroSection) {
      setShowHeader(true);
      setScrollProgress(1);
      return;
    }
    // For home page with hero section, use scroll behavior
    const rect = heroSection.getBoundingClientRect();
    const progress = Math.min(Math.max(1 - (rect.bottom / window.innerHeight), 0), 1);
    setScrollProgress(progress);
    setShowHeader(rect.bottom <= 0);
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  const services = [
    { name: 'Test Drive', icon: Car },
    { name: 'Valuation', icon: Crown },
    { name: 'Inspection', icon: Shield },
    { name: 'Financing', icon: Gem }
  ];

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Buy Now', href: '/inventory' },
    { name: 'Sell Now', href: '/sell' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header
      ref={observerRef}
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
        showHeader ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black border-b border-gradient-to-r from-[#d4af37] to-[#f1c85c] shadow-xl">
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo with optional tagline */}
          <div className="flex flex-col items-start">
            <Image
              src="/assets/images/EpicLuxeLogoCopy.jpeg"
              alt="Epic Luxe Logo"
              width={140}
              height={50}
              className="object-contain"
              priority
            />
            {/* Optional subtitle: */}
            {/* <span className="text-[10px] tracking-wider text-[#d4af37] mt-1 uppercase font-semibold">
              Certified Pre-Owned Luxury
            </span> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group px-1"
              >
                <span className="text-xs font-semibold tracking-[0.08em] bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text hover:from-white hover:to-gray-200 transition-all duration-300 uppercase whitespace-nowrap"
                style={{
                  fontFamily: '"Playfair Display", "Times New Roman", serif',
                  fontWeight: '600'
                }}>
                  {item.name}
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] group-hover:w-full transition-all duration-400 ease-out"></div>
              </a>
            ))}

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center group px-1"
              >
                <span className="text-xs font-semibold tracking-[0.08em] bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text hover:from-white hover:to-gray-200 transition-all duration-300 uppercase whitespace-nowrap"
                style={{
                  fontFamily: '"Playfair Display", "Times New Roman", serif',
                  fontWeight: '600'
                }}>
                  Services
                </span>
                <ChevronDown className={`ml-1 w-3 h-3 text-[#d4af37] transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] group-hover:w-full transition-all duration-400 ease-out"></div>
              </button>

              {isServicesOpen && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-black border border-gradient-to-r from-[#d4af37] to-[#f1c85c] rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-5">
                    <div className="grid grid-cols-1 gap-2">
                      {services.map((service) => (
                        <a
                          key={service.name}
                          href="#"
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-yellow-900/20 hover:to-yellow-800/20 transition-all duration-300 group border border-transparent hover:border-[#d4af37]/30"
                        >
                          <div className="bg-gradient-to-r from-[#d4af37] to-[#f1c85c] p-2 rounded-lg shadow-md">
                            <service.icon className="w-4 h-4 text-black" />
                          </div>
                          <div className="flex-1">
                            <h3 className="bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text font-semibold text-xs tracking-wide uppercase"
                            style={{
                              fontFamily: '"Playfair Display", "Times New Roman", serif',
                              fontWeight: '600'
                            }}>
                              {service.name}
                            </h3>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Buttons */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <button className="w-10 h-10 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black hover:from-white hover:to-gray-200 hover:text-black rounded-full transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
              <Search className="w-4 h-4" />
            </button>
            <a href="tel:+919999999999" className="flex items-center space-x-2 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] hover:from-white hover:to-gray-200 text-black px-5 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 whitespace-nowrap"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontWeight: '600'
            }}>
              <Phone className="w-3.5 h-3.5" />
              <span className="text-xs uppercase">Call Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black hover:from-white hover:to-gray-200 rounded-full transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black border-t border-gradient-to-r from-[#d4af37] to-[#f1c85c] shadow-2xl">
          <div className="p-6 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text font-bold px-4 py-3 rounded hover:bg-yellow-900/20 transition uppercase tracking-wider"
                style={{
                  fontFamily: '"Playfair Display", "Times New Roman", serif',
                  fontWeight: '700'
                }}
              >
                {item.name}
              </a>
            ))}

            <div>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center justify-between w-full bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text font-bold px-4 py-3 rounded hover:bg-yellow-900/20 transition uppercase tracking-wider"
                style={{
                  fontFamily: '"Playfair Display", "Times New Roman", serif',
                  fontWeight: '700'
                }}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 text-[#d4af37] transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  {services.map((service) => (
                    <a
                      key={service.name}
                      href="#"
                      className="flex items-center bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text space-x-3 px-3 py-2 hover:bg-yellow-900/20 rounded transition font-semibold tracking-wide"
                      style={{
                        fontFamily: '"Playfair Display", "Times New Roman", serif',
                        fontWeight: '600'
                      }}
                    >
                      <service.icon className="w-4 h-4 text-[#d4af37]" />
                      <span>{service.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="tel:+919999999999" className="mt-6 w-full flex items-center justify-center bg-gradient-to-r from-[#d4af37] to-[#f1c85c] hover:from-white hover:to-gray-200 text-black px-6 py-4 rounded-full font-bold shadow-lg tracking-wider"
            style={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontWeight: '700'
            }}>
              <Phone className="w-4 h-4 mr-2" />
              CALL NOW
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
