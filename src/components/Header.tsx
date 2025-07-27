'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown, Car, Crown, Shield, Gem, Search, Phone, Home, CreditCard, FileText, ArrowUpDown, MessageCircle } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showHeader, setShowHeader] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      
      // Always show header now
      setShowHeader(true);
      
      // Calculate scroll progress for the progress bar
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const progress = Math.min(Math.max(1 - (rect.bottom / window.innerHeight), 0), 1);
        setScrollProgress(progress);
      } else {
        // If no hero section exists (other pages), set progress to 1
        setScrollProgress(1);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300); // Delay to allow transition to complete
    }
  }, [isSearchOpen]);

  // Mock search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 2) {
      // Mock search results - replace with actual search API
      const mockResults = [
        { type: 'vehicle', title: 'BMW M3 Competition', category: 'Luxury Cars', href: '/inventory/bmw-m3' },
        { type: 'vehicle', title: 'Porsche 911 Carrera', category: 'Sports Cars', href: '/inventory/porsche-911' },
        { type: 'blog', title: 'Best Luxury Cars 2024', category: 'Blog Posts', href: '/insights/blogs/luxury-cars-2024' },
        { type: 'service', title: 'Car Financing Options', category: 'Services', href: '/services/financing' },
      ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(mockResults.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Close search if clicking outside search area
      if (isSearchOpen && !searchInputRef.current?.closest('.search-container')?.contains(target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  const services = [
    { name: 'Buy Now', icon: Car, href: '/inventory' },
    { name: 'Sell Now', icon: Crown, href: '/sell' },
    { name: 'Free Evaluation', icon: Shield, href: '/evaluation' },
    { name: 'Finance', icon: CreditCard, href: '/finance' },
    { name: 'Insurance', icon: FileText, href: '/insurance' },
    { name: 'Trade In', icon: ArrowUpDown, href: '/trade-in' }
  ];

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Testimonials', href: '/insights/testimonials' },
    { name: 'About', href: '/AboutUs' },
    { name: 'Blogs', href: '/insights/blogs' }
  ];

  // Popular search categories
  const popularSearches = {
    cars: ['BMW M3', 'Porsche 911'],
    services: ['Car Financing', 'Insurance Quote'],
    blogs: [ 'Car Buying Tips']
  };

  return (
    <header
      ref={observerRef}
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out manrope-font ${
        showHeader ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/95 to-[#1a1a1a]/95 backdrop-blur-lg border-b border-[#BFA980]/10 shadow-xl">
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ease-out ${
          isSearchOpen ? 'h-20' : 'h-16'
        }`}>
          
          {/* Logo */}
          <div className="flex flex-col items-start">
            <Image
              src="/assets/images/EpicLuxeLogoCopy.jpeg"
              alt="Epic Luxe Logo"
              width={140}
              height={50}
              className="object-contain"
              priority
            />
          </div>

          {/* Search Bar - Expanded when active */}
          {isSearchOpen && (
            <div className="search-container absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
              <div className="relative animate-in slide-in-from-top-2 duration-500 ease-out">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#BFA980]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search vehicles, blogs, services..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-[#0e0e0e]/60 border border-[#BFA980]/30 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]/50 transition-all duration-300 backdrop-blur-sm shadow-lg manrope-font"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-[#D4AF37] transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Enhanced Search Results Dropdown */}
              {(searchResults.length > 0 || searchQuery.length === 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-[#1a1a1a]/95 to-[#0e0e0e]/95 backdrop-blur-lg border border-[#BFA980]/20 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-1 duration-300">
                  <div className="p-6 max-h-96 overflow-y-auto manrope-font">
                    {/* Search Results */}
                    {searchResults.length > 0 && (
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-1 h-4 bg-gradient-to-b from-[#D4AF37] to-[#BFA980] rounded-full"></div>
                          <h3 className="text-sm font-semibold text-white/90">Search Results</h3>
                        </div>
                        {searchResults.map((result, index) => (
                          <a
                            key={index}
                            href={result.href}
                            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300 group border border-transparent hover:border-[#BFA980]/20"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                              setSearchResults([]);
                            }}
                          >
                            <div className={`w-3 h-3 rounded-full ${
                              result.type === 'vehicle' ? 'bg-[#D4AF37]' :
                              result.type === 'blog' ? 'bg-[#BFA980]' :
                              'bg-white/40'
                            }`}></div>
                            <div className="flex-1">
                              <div className="text-white/90 text-sm font-medium group-hover:text-white transition-colors">{result.title}</div>
                              <div className="text-white/50 text-xs">{result.category}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Enhanced Popular Searches */}
                    {searchQuery.length === 0 && (
                      <div className="space-y-6">
                        {/* Popular Searches in Cars */}
                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <Car className="w-4 h-4 text-[#D4AF37]" />
                            <h3 className="text-sm font-semibold text-white/90">Popular Searches in Cars</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {popularSearches.cars.map((term) => (
                              <button
                                key={term}
                                onClick={() => handleSearch(term)}
                                className="text-left text-white/70 hover:text-[#D4AF37] text-sm py-2 px-3 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300 border border-transparent hover:border-[#D4AF37]/20 font-medium"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Popular Searches in Services */}
                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <Shield className="w-4 h-4 text-[#BFA980]" />
                            <h3 className="text-sm font-semibold text-white/90">Popular Searches in Services</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {popularSearches.services.map((term) => (
                              <button
                                key={term}
                                onClick={() => handleSearch(term)}
                                className="text-left text-white/70 hover:text-[#BFA980] text-sm py-2 px-3 rounded-lg hover:bg-[#BFA980]/10 transition-all duration-300 border border-transparent hover:border-[#BFA980]/20 font-medium"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Popular Searches in Blogs */}
                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                            <h3 className="text-sm font-semibold text-white/90">Popular Searches in Blogs</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {popularSearches.blogs.map((term) => (
                              <button
                                key={term}
                                onClick={() => handleSearch(term)}
                                className="text-left text-white/70 hover:text-[#D4AF37] text-sm py-2 px-3 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300 border border-transparent hover:border-[#D4AF37]/20 font-medium"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Can't Find What You're Looking For */}
                        <div className="border-t border-[#BFA980]/20 pt-4">
                          <div className="bg-gradient-to-r from-[#1a1a1a]/60 to-[#0e0e0e]/60 rounded-lg p-4 border border-[#BFA980]/10">
                            <div className="text-center space-y-3">
                              <div className="text-white/90 font-semibold text-sm">Can't find what you're looking for?</div>
                              <div className="text-white/60 text-xs leading-relaxed">
                                Our premium concierge service is here to help you find the perfect luxury vehicle or service.
                              </div>
                              <a 
                                href="tel:+919999999999" 
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] hover:from-[#BFA980] hover:to-[#D4AF37] text-[#0e0e0e] px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 text-sm"
                                onClick={() => {
                                  setIsSearchOpen(false);
                                  setSearchQuery('');
                                  setSearchResults([]);
                                }}
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>Call Us Now</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Desktop Navigation - Hidden when search is open */}
          <nav className={`hidden lg:flex items-center space-x-8 transition-all duration-500 ${
            isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            {/* Home Link */}
            <a
              href="/"
              className="relative group px-1"
            >
              <span className="text-base font-semibold tracking-wide text-white/90 hover:text-[#D4AF37] transition-all duration-300">
                Home
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] group-hover:w-full transition-all duration-400 ease-out"></div>
            </a>

            {/* Services Dropdown with Hover */}
            <div 
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center group px-1">
                <span className="text-base font-semibold tracking-wide text-white/90 hover:text-[#D4AF37] transition-all duration-300">
                  Services
                </span>
                <ChevronDown className={`ml-1 w-4 h-4 text-[#BFA980] transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] group-hover:w-full transition-all duration-400 ease-out"></div>
              </button>

              {/* Services Dropdown */}
              <div className={`absolute top-full right-0 mt-3 w-80 bg-gradient-to-br from-[#1a1a1a]/95 to-[#0e0e0e]/95 backdrop-blur-lg border border-[#BFA980]/20 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform origin-top ${
                isServicesOpen 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-2">
                    {services.map((service, index) => (
                      <a
                        key={service.name}
                        href={service.href}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300 group border border-transparent hover:border-[#BFA980]/30"
                        style={{
                          animationDelay: `${index * 50}ms`
                        }}
                      >
                        <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20 p-2 rounded-lg border border-[#D4AF37]/30 group-hover:scale-110 transition-transform duration-300">
                          <service.icon className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white/80 font-semibold text-sm tracking-wide group-hover:text-white transition-colors duration-300">
                            {service.name}
                          </h3>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Other Nav Items */}
            {navItems.slice(1).map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group px-1"
              >
                <span className="text-base font-semibold tracking-wide text-white/90 hover:text-[#D4AF37] transition-all duration-300">
                  {item.name}
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] group-hover:w-full transition-all duration-400 ease-out"></div>
              </a>
            ))}
          </nav>

          {/* Right Buttons - Hidden when search is open */}
          <div className={`hidden lg:flex items-center space-x-3 flex-shrink-0 transition-all duration-500 ${
            isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            {/* Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/40 rounded-full transition-all duration-300 flex items-center justify-center backdrop-blur-sm hover:scale-105"
            >
              <Search className="w-4 h-4" />
            </button>

            <a 
              href="tel:+919999999999" 
              className="flex items-center space-x-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] hover:from-[#BFA980] hover:to-[#D4AF37] text-[#0e0e0e] px-5 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="text-sm">Call Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-gradient-to-b from-[#0e0e0e]/95 to-[#1a1a1a]/95 backdrop-blur-lg border-t border-[#BFA980]/10 shadow-2xl">
          <div className="p-6 space-y-4 manrope-font">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#BFA980]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 bg-[#0e0e0e]/60 border border-[#BFA980]/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]/50 transition-all duration-300 manrope-font"
              />
            </div>

            {/* Home Link */}
            <a
              href="/"
              className="block text-white/90 hover:text-[#D4AF37] font-semibold px-4 py-3 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
            >
              Home
            </a>

            {/* Services Dropdown */}
            <div>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center justify-between w-full text-white/90 hover:text-[#D4AF37] font-semibold px-4 py-3 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 text-[#BFA980] transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  {services.map((service) => (
                    <a
                      key={service.name}
                      href={service.href}
                      className="flex items-center text-white/70 hover:text-[#D4AF37] space-x-3 px-3 py-2 hover:bg-[#D4AF37]/10 rounded-lg transition-all duration-300 font-semibold"
                    >
                      <service.icon className="w-4 h-4 text-[#BFA980]" />
                      <span>{service.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            {navItems.slice(1).map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white/90 hover:text-[#D4AF37] font-semibold px-4 py-3 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
              >
                {item.name}
              </a>
            ))}

            <a 
              href="tel:+919999999999" 
              className="mt-6 w-full flex items-center justify-center bg-gradient-to-r from-[#D4AF37] to-[#BFA980] hover:from-[#BFA980] hover:to-[#D4AF37] text-[#0e0e0e] px-6 py-4 rounded-full font-semibold shadow-lg"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </a>
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: animate-in 0.3s ease-out;
        }
        
        .slide-in-from-top-1 {
          animation: slide-in-from-top-1 0.3s ease-out;
        }
        
        .slide-in-from-top-2 {
          animation: slide-in-from-top-2 0.5s ease-out;
        }
        
        @keyframes slide-in-from-top-1 {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-from-top-2 {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
