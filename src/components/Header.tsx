'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menu,
  X,
  ChevronDown,
  Car,
  Crown,
  Shield,
  Search,
  Phone,
  CreditCard,
  FileText,
  ArrowUpDown,
  MessageCircle,
  Clock,
  MapPin,
  Star,
  Sparkles,
} from 'lucide-react';

// Tier city data (fill as needed)
const cities = [
  // Tier 1
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad',
  // Tier 2
  'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal', 'Patna', 'Ludhiana',
  'Agra', 'Nashik', 'Vadodara', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar',
  // Tier 3 (add more as needed)
  'Amritsar', 'Allahabad', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Chandigarh',
  'Guwahati', 'Solapur', 'Hubli', 'Mysore', 'Jalandhar', 'Thiruvananthapuram',
];

const services = [
  { name: 'Buy Now', icon: Car, href: '/inventory' },
  { name: 'Sell Now', icon: Crown, href: '/sell' },
  { name: 'Free Evaluation', icon: Shield, href: '/evaluation' },
  { name: 'Finance', icon: CreditCard, href: '/services/finance' },
  { name: 'Insurance', icon: FileText, href: '/insurance' },
  { name: 'Trade In', icon: ArrowUpDown, href: '/trade-in' },
];
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
  { name: 'About', href: '/AboutUs' },
];

const insightsItems = [
  { name: 'Testimonials', href: '/insights/testimonials' },
  { name: 'Blogs', href: '/insights/blogs' },
  { name: 'Press', href: '/Press' },
];
const popularSearches = {
  cars: ['BMW M3', 'Porsche 911'],
  services: ['Car Financing', 'Insurance Quote'],
  blogs: ['Car Buying Tips'],
};

interface HeaderProps {
  showBlogNav?: boolean;
}

export default function Header({ showBlogNav = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showCallPopup, setShowCallPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{
    type: 'vehicle' | 'blog' | 'service';
    title: string;
    category: string;
    href: string;
  }>>([]);
  const [showHeader, setShowHeader] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [locationAsk, setLocationAsk] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [showBrowserLocationPrompt, setShowBrowserLocationPrompt] = useState(false);
  const [hasShownLocationPopup, setHasShownLocationPopup] = useState(false);
  const [permissionBlocked, setPermissionBlocked] = useState(false);
  const [popupClosed, setPopupClosed] = useState(false);
  // City search input state, fully controlled and active input
  const [citySearch, setCitySearch] = useState('');
  const [isCityMobileSheet, setIsCityMobileSheet] = useState(false);


  const searchInputRef = useRef<HTMLInputElement>(null);
  const lastScrollY = useRef(0);
  const locationDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const servicesDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const insightsDropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const autoDetectLocation = useCallback(() => {
    if (navigator.geolocation && showBrowserLocationPrompt) {
      setIsDetectingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
            const res = await fetch(url);
            const data = await res.json();
            const city =
              data?.address?.city ||
              data?.address?.town ||
              data?.address?.village ||
              data?.address?.state ||
              data?.address?.county ||
              '';
            if (city) {
              setSelectedCity(city);
              localStorage.setItem('selected_city', city);
              setLocationError(''); // Clear any errors
              console.log('City detected:', city); // Debug log
              // Show success message briefly
              setTimeout(() => {
                console.log('City successfully set to:', city);
              }, 100);
            } else {
              setLocationError('Could not detect city. Please select manually.');
            }
          } catch {
            setLocationError('Could not detect city. Please select manually.');
          } finally {
            setIsDetectingLocation(false);
          }
        },
        (error) => {
          console.log('Geolocation permission denied or error:', error);
          setIsDetectingLocation(false);
          if (error.code === 1) {
            setPermissionBlocked(true);
            setLocationError('Location permission is blocked. Please enable it in your browser settings.');
          } else {
            setLocationError('Permission denied. Please select your city manually.');
          }
        }
      );
    }
  }, [showBrowserLocationPrompt]);



  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY <= 0) setShowHeader(true);
          else if (currentScrollY > lastScrollY.current) setShowHeader(false);
          else if (currentScrollY < lastScrollY.current) setShowHeader(true);
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setScrollProgress(Math.min(Math.max(1 - rect.bottom / window.innerHeight, 0), 1));
      } else setScrollProgress(1);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 300);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showCallPopup) {
        setShowCallPopup(false);
      }
    };

    if (showCallPopup) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showCallPopup]);

  const openServicesDropdown = () => {
    if (servicesDropdownTimeout.current) clearTimeout(servicesDropdownTimeout.current);
    setIsServicesOpen(true);
  };
  const closeServicesDropdown = () => {
    servicesDropdownTimeout.current = setTimeout(() => setIsServicesOpen(false), 120);
  };

  const openInsightsDropdown = () => {
    if (insightsDropdownTimeout.current) clearTimeout(insightsDropdownTimeout.current);
    setIsInsightsOpen(true);
  };

  const closeInsightsDropdown = () => {
    insightsDropdownTimeout.current = setTimeout(() => setIsInsightsOpen(false), 120);
  };

  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCallPopup(true);
  };

  const handleCallNow = () => {
    // Close popup first
    setShowCallPopup(false);
    
    // Small delay to ensure popup closes before initiating call
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.href = 'tel:+919999999999';
      }
    }, 100);
  };

  const handleCallCancel = () => {
    setShowCallPopup(false);
  };

  const openLocationDropdown = () => {
    if (locationDropdownTimeout.current) clearTimeout(locationDropdownTimeout.current);
    setIsCityDropdownOpen(true);
  };
  const closeLocationDropdown = () => {
    locationDropdownTimeout.current = setTimeout(() => {
      setIsCityDropdownOpen(false);
      // Clear search when dropdown closes
      setCitySearch('');
    }, 120);
  };

  const handleMobileCity = () => {
    setIsCityMobileSheet(true);
    setCitySearch('');
  };

  const handleMobileSearchToggle = () => setIsSearchOpen((v) => !v);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const mockResults = [
        { type: 'vehicle' as const, title: 'BMW M3 Competition', category: 'Luxury Cars', href: '/inventory/bmw-m3' },
        { type: 'vehicle' as const, title: 'Porsche 911 Carrera', category: 'Sports Cars', href: '/inventory/porsche-911' },
        { type: 'blog' as const, title: 'Best Luxury Cars 2024', category: 'Blog Posts', href: '/insights/blogs/luxury-cars-2024' },
        { type: 'service' as const, title: 'Car Financing Options', category: 'Services', href: '/services/financing' },
      ].filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(mockResults.slice(0, 5));
    } else setSearchResults([]);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (isSearchOpen && searchInputRef.current && !searchInputRef.current.closest('.search-container')?.contains(target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
      
      // Close location popup when clicking outside
      if (locationAsk && !(target as Element).closest?.('.location-popup')) {
        handleLocationReject();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen, locationAsk]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seenPermission = localStorage.getItem('seen_location_permission');
    const savedCity = localStorage.getItem('selected_city');
    
    // Load selected city from localStorage
    if (savedCity) {
      setSelectedCity(savedCity);
      setLocationError(''); // Clear error when city is selected
    } else {
      // Try auto-detection if no city is saved and permission is granted
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          if (result.state === 'granted') {
            console.log('Permission already granted, auto-detecting...'); // Debug log
            setShowBrowserLocationPrompt(true);
          } else if (result.state === 'denied') {
            setPermissionBlocked(true);
          }
        });
      }
    }
    
    // Check if location permission is blocked
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'denied') {
          setPermissionBlocked(true);
        }
      });
    }
    
    // Show popup on landing if not seen before and not closed
    if (!seenPermission && !hasShownLocationPopup && !popupClosed) {
      setTimeout(() => {
        setLocationAsk(true);
        setHasShownLocationPopup(true);
      }, 1000);
    }
  }, [hasShownLocationPopup, popupClosed]);

  // Trigger browser location prompt when showBrowserLocationPrompt becomes true
  useEffect(() => {
    if (showBrowserLocationPrompt) {
      console.log('Triggering autoDetectLocation...'); // Debug log
      autoDetectLocation();
    }
  }, [showBrowserLocationPrompt, autoDetectLocation]);

  // Show popup on buy/sell pages if user previously clicked "No"
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const currentPath = window.location.pathname;
    const isBuySellPage = currentPath.includes('/inventory') || 
                          currentPath.includes('/sell') || 
                          currentPath.includes('/buy') ||
                          currentPath.includes('/services') ||
                          currentPath.includes('/evaluation') ||
                          currentPath.includes('/trade-in') ||
                          currentPath.includes('/insurance') ||
                          currentPath.includes('/finance');
    
    const hasRejectedLocation = localStorage.getItem('location_rejected') === 'true';
    const hasShownPopup = localStorage.getItem('seen_location_permission');
    
    if (isBuySellPage && hasRejectedLocation && !hasShownPopup && !hasShownLocationPopup && !locationAsk && !popupClosed) {
      setTimeout(() => {
        setLocationAsk(true);
        setHasShownLocationPopup(true);
      }, 1500);
    }
  }, [hasShownLocationPopup, locationAsk, popupClosed]);

  // Debug: Monitor selectedCity changes
  useEffect(() => {
    console.log('selectedCity changed to:', selectedCity);
  }, [selectedCity]);

  // Cleanup popup state when component unmounts or user navigates
  useEffect(() => {
    const handleBeforeUnload = () => {
      setLocationAsk(false);
      setPopupClosed(false);
      setHasShownLocationPopup(false);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLocationConfirm = () => {
    // IMMEDIATELY close popup and prevent it from showing again
    setLocationAsk(false);
    setPopupClosed(true);
    setHasShownLocationPopup(true);
    localStorage.setItem('seen_location_permission', '1');
    localStorage.removeItem('location_rejected');
    
    // Check if permission is already blocked
    if (permissionBlocked) {
      setLocationError('Location permission is blocked. Please enable it in your browser settings or select your city manually.');
      return;
    }
    
    // Start location detection
    setIsDetectingLocation(true);
    setShowBrowserLocationPrompt(true);
    
    // Trigger browser location prompt
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
            const res = await fetch(url);
            const data = await res.json();
            const city =
              data?.address?.city ||
              data?.address?.town ||
              data?.address?.village ||
              data?.address?.state ||
              data?.address?.county ||
              '';
            if (city) {
              setSelectedCity(city);
              localStorage.setItem('selected_city', city);
              setLocationError('');
              setPermissionBlocked(false);
            } else {
              setLocationError('Could not detect city. Please select manually.');
            }
          } catch {
            setLocationError('Could not detect city. Please select manually.');
          } finally {
            setIsDetectingLocation(false);
            setShowBrowserLocationPrompt(false);
          }
        },
        (error) => {
          // Check if permission is permanently denied
          if (error.code === 1) {
            setPermissionBlocked(true);
            setLocationError('Location permission is blocked. Please enable it in your browser settings or select your city manually.');
          } else {
            setLocationError('Permission denied. Please select your city manually.');
          }
          setIsDetectingLocation(false);
          setShowBrowserLocationPrompt(false);
        }
      );
    } else {
      setLocationError('Geolocation not supported. Please select city manually.');
      setIsDetectingLocation(false);
      setShowBrowserLocationPrompt(false);
    }
  };

  const handleLocationReject = () => {
    // IMMEDIATELY close popup and prevent it from showing again
    setLocationAsk(false);
    setPopupClosed(true);
    setHasShownLocationPopup(true);
    localStorage.setItem('seen_location_permission', '1');
    localStorage.setItem('location_rejected', 'true');
    setIsDetectingLocation(false);
    setLocationError('');
  };

  // Filtered cities filtered by full name (case-insensitive) while typing full city name
  const filteredCities = !citySearch
    ? cities
    : cities.filter((city) =>
        city.toLowerCase().startsWith(citySearch.trim().toLowerCase())
      );

  const cityDropdownClasses = `
    absolute left-0 mt-2 z-30 
    w-[340px] sm:w-[500px] md:w-[680px] 
    bg-[#161617] text-white border border-[#2c2c2c]/80 rounded-xl shadow-2xl
    transition-all duration-200 origin-top transform
    ${isCityDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto visible animate-scalein' : 'opacity-0 scale-95 pointer-events-none invisible'}
  `;

  function CityDropdown({ mobile }: { mobile?: boolean }) {
    const citySearchInputRef = useRef<HTMLInputElement>(null);

    // Focus the input when dropdown opens (desktop only)
    useEffect(() => {
      if (!mobile && isCityDropdownOpen && citySearchInputRef.current) {
        const timer = setTimeout(() => {
          citySearchInputRef.current?.focus();
        }, 100);
        return () => clearTimeout(timer);
      }
    }, [mobile]);

    return (
      <div
        className={`${
          mobile
            ? `fixed left-0 bottom-0 w-full h-[70vh] max-h-[450px] z-[100] bg-[#17171b] text-white border-t border-[#232322] animate-slideup rounded-t-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-[#D4AF37]/80 scrollbar-track-transparent`
            : cityDropdownClasses + ' scrollbar-thin scrollbar-thumb-[#D4AF37]/80 scrollbar-track-transparent'
        }`}
        onMouseEnter={!mobile ? openLocationDropdown : undefined}
        onMouseLeave={!mobile ? closeLocationDropdown : undefined}
        style={mobile ? undefined : { minHeight: 250, maxHeight: 480, overflowY: 'auto' }}
      >
        <div className={mobile ? 'py-5 px-4' : 'p-6'}>
          <div className="flex items-center justify-between mb-4">
            <div className={`font-bold ${mobile ? 'text-xl' : 'text-lg'} text-white`}>Select Your City</div>
            <div className="relative w-40 ml-3">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#bfa980]" />
              <input
                ref={citySearchInputRef}
                autoComplete="off"
                type="text"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                placeholder="Type full city name"
                className="w-full pl-8 pr-2 py-1.5 bg-[#111015] border border-[#34322a]/30 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 text-sm"
                spellCheck={false}
                aria-label="Search city"
                onKeyDown={(e) => {
                  // Prevent dropdown from closing on key press
                  e.stopPropagation();
                }}
              />
            </div>
            {mobile && (
              <button
                onClick={() => setIsCityMobileSheet(false)}
                className="ml-4 p-2 text-[#bfa980] rounded-full hover:bg-[#181818] transition"
                type="button"
                aria-label="Close city selector"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {locationError && <div className="text-sm text-red-400 mb-2">{locationError}</div>}
          <div
            className={`grid ${mobile ? 'grid-cols-2 gap-2' : 'grid-cols-3 sm:grid-cols-4 gap-3'}`}
            style={{ maxHeight: mobile ? undefined : 360, overflowY: 'auto' }}
          >
            {filteredCities.length ? (
              filteredCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  className={`text-left flex items-center px-3 py-2 rounded-lg font-medium text-white hover:bg-[#18181b] focus:bg-[#222225] transition-all text-sm ${
                    city === selectedCity ? 'bg-[#232322] text-[#ffd900]' : ''
                  }`}
                  onClick={() => {
                    setSelectedCity(city);
                    localStorage.setItem('selected_city', city);
                    setLocationError(''); // Clear error when city is selected manually
                    setPermissionBlocked(false); // Reset permission blocked state
                    setIsCityDropdownOpen(false);
                    setIsCityMobileSheet(false);
                    setCitySearch(''); // Clear search when city is selected
                  }}
                >
                  {city}
                </button>
              ))
            ) : (
              <div className="col-span-full text-center py-6 text-xs text-white/60">No cities found.</div>
            )}
          </div>
        </div>
        {mobile && <div style={{ height: 12 }} />}
      </div>
    );
  }

  return (
    <>


      {isCityMobileSheet && <CityDropdown mobile />}

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out manrope-font ${
          showHeader ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/95 to-[#1a1a1a]/95 backdrop-blur-lg border-b border-[#BFA980]/10 shadow-xl">
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ease-out ${isSearchOpen ? 'h-20' : 'h-16'}`}>
            <div className="flex flex-row items-center">
              <Image
                src="/assets/images/EpicLuxeLogoCopy.jpeg"
                alt="Epic Luxe Logo"
                width={140}
                height={50}
                className="object-contain w-24 md:w-36 h-auto"
                priority
              />
              {/* Desktop city selector */}
              <div
                className="relative ml-6 hidden md:block"
                onMouseEnter={locationAsk ? undefined : openLocationDropdown}
                onMouseLeave={locationAsk ? undefined : closeLocationDropdown}
                tabIndex={0}
                onFocus={locationAsk ? undefined : openLocationDropdown}
                onBlur={locationAsk ? undefined : closeLocationDropdown}
              >
                <button
                  className="flex items-center px-3 py-[0.3rem] rounded-lg bg-[#1a1a1a] text-white font-semibold text-xs border border-[#BFA980]/30 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all duration-200"
                  onClick={locationAsk ? undefined : openLocationDropdown}
                  style={{ minWidth: 80, minHeight: 32, fontSize: '0.75rem' }}
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isCityDropdownOpen}
                  aria-label="Select city"
                  disabled={isDetectingLocation || locationAsk}
                >
                  <span className="truncate max-w-[80px]" title={selectedCity || 'Select City'}>
                    {isDetectingLocation ? 'Detecting...' : (selectedCity || 'Select City')}
                  </span>
                  {isDetectingLocation ? (
                    <div className="ml-1 w-4 h-4 border-2 border-[#BFA980] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ChevronDown
                      className={`ml-1 w-4 h-4 text-[#BFA980] transition-transform duration-300 ${
                        isCityDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
                {isCityDropdownOpen && !locationAsk && <CityDropdown />}
                
                {/* Location pop-down on first visit */}
                {locationAsk && !popupClosed && (
                  <div className="location-popup absolute top-full left-0 mt-2 z-[9999] rounded-lg shadow-xl bg-[#1a1a1a] border border-[#BFA980]/30 animate-popdown w-80">
                    <div className="flex items-center justify-between p-3">
                      <div className="text-sm font-medium text-white mr-3 flex-1">
                        Allow EpicLuxe to detect your city for personalized inventory?
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLocationReject();
                        }}
                        className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                        type="button"
                        aria-label="Close popup"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-2 px-3 pb-3">
                      <button
                        className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#BFA980] font-bold text-[#201d16] hover:from-[#BFA980] hover:to-[#D4AF37] transition-all duration-200"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLocationConfirm();
                        }}
                        type="button"
                      >
                        Yes
                      </button>
                      <button
                        className="px-4 py-1.5 rounded-lg bg-[#2b2661] text-white font-medium border border-[#BFA980]/30 hover:bg-[#201d16] transition-all duration-200"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLocationReject();
                        }}
                        type="button"
                      >
                        No
                      </button>
                    </div>
                    {permissionBlocked && (
                      <div className="px-3 pb-3">
                        <div className="text-xs text-red-400 mb-2">
                          Location permission is blocked. 
                          <button
                            onClick={() => {
                              // Try to open browser settings
                              if (navigator.userAgent.includes('Chrome')) {
                                window.open('chrome://settings/content/location');
                              } else if (navigator.userAgent.includes('Firefox')) {
                                window.open('about:preferences#privacy');
                              } else {
                                alert('Please enable location permission in your browser settings.');
                              }
                            }}
                            className="text-[#D4AF37] underline ml-1 hover:text-[#BFA980]"
                          >
                            Enable it here
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Mobile city selector - removed from header for mobile view */}

            {/* Search Bar */}
            {isSearchOpen && (
              <div className="search-container absolute left-1/2 z-40 transform -translate-x-1/2 w-full max-w-2xl px-4">
                <div className="relative animate-in slide-in-from-top-2 duration-500 ease-out">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#BFA980]" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search vehicles, blogs, services..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-[#0e0e0e]/60 border border-[#BFA980]/30 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]/50 transition-all duration-300 backdrop-blur-sm shadow-lg manrope-font"
                    aria-label="Search input"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-[#D4AF37] transition-colors duration-200"
                    type="button"
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {/* Search recommendations and results */}
                <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-[#1a1a1a]/95 to-[#0e0e0e]/95 backdrop-blur-lg border border-[#BFA980]/20 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-1 duration-300">
                  <div className="p-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-[#BFA980]/80 scrollbar-track-transparent manrope-font">
                    {!searchQuery && (
                      <div className="space-y-6">
                        <section>
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
                        </section>
                        <section>
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
                        </section>
                        <section>
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
                        </section>
                      </div>
                    )}
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
                            <div
                              className={`w-3 h-3 rounded-full ${
                                result.type === 'vehicle'
                                  ? 'bg-[#D4AF37]'
                                  : result.type === 'blog'
                                  ? 'bg-[#BFA980]'
                                  : 'bg-white/40'
                              }`}
                            ></div>
                            <div className="flex-1">
                              <div className="text-white/90 text-sm font-medium group-hover:text-white transition-colors">
                                {result.title}
                              </div>
                              <div className="text-white/50 text-xs">{result.category}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <nav
              className={`hidden lg:flex items-center space-x-5 transition-all duration-500 ${
                isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <Link href="/" className="relative group px-1">
                <span className="text-base font-semibold tracking-wide text-white/90 hover:text-[#D4AF37] transition-all duration-300">
                  Home
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] group-hover:w-full transition-all duration-400 ease-out" />
              </Link>

              <div
                className="relative flex items-center"
                onMouseEnter={openServicesDropdown}
                onMouseLeave={closeServicesDropdown}
                tabIndex={0}
                onFocus={openServicesDropdown}
                onBlur={closeServicesDropdown}
              >
                <button className="flex items-center group px-1" tabIndex={-1} type="button">
                  <span className="text-base font-semibold tracking-wide text-white/90 hover:text-[#D4AF37] transition-all duration-300">
                    Services
                  </span>
                  <ChevronDown
                    className={`ml-1 w-4 h-4 text-[#BFA980] transition-transform duration-300 ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-full left-0 mt-3 w-80 bg-gradient-to-br from-[#1a1a1a]/95 to-[#0e0e0e]/95 backdrop-blur-lg border border-[#BFA980]/20 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-top-left transform ${
                    isServicesOpen
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto visible animate-scalein'
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none invisible'
                  }`}
                  onMouseEnter={openServicesDropdown}
                  onMouseLeave={closeServicesDropdown}
                  style={{ maxHeight: '480px', overflowY: 'auto' }}
                >
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-2">
                      {services.map((service, index) => (
                        <a
                          key={service.name}
                          href={service.href}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300 group border border-transparent hover:border-[#BFA980]/30"
                          style={{ animationDelay: `${index * 50}ms` }}
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

              {navItems.slice(1).map((item) => (
                <a key={item.name} href={item.href} className="relative group px-1">
                  <span className="text-base font-semibold tracking-wide text-white/90 hover:text-[#D4AF37] transition-all duration-300">
                    {item.name}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] group-hover:w-full transition-all duration-400 ease-out" />
                </a>
              ))}

              <div
                className="relative flex items-center"
                onMouseEnter={openInsightsDropdown}
                onMouseLeave={closeInsightsDropdown}
                tabIndex={0}
                onFocus={openInsightsDropdown}
                onBlur={closeInsightsDropdown}
              >
                <button className="flex items-center group px-1" tabIndex={-1} type="button">
                  <span className="text-base font-semibold tracking-wide text-white/90 hover:text-[#D4AF37] transition-all duration-300">
                    Insights
                  </span>
                  <ChevronDown
                    className={`ml-1 w-4 h-4 text-[#BFA980] transition-transform duration-300 ${
                      isInsightsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-full left-0 mt-3 w-80 bg-gradient-to-br from-[#1a1a1a]/95 to-[#0e0e0e]/95 backdrop-blur-lg border border-[#BFA980]/20 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-top-left transform ${
                    isInsightsOpen
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto visible animate-scalein'
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none invisible'
                  }`}
                  onMouseEnter={openInsightsDropdown}
                  onMouseLeave={closeInsightsDropdown}
                  style={{ maxHeight: '480px', overflowY: 'auto' }}
                >
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-2">
                      {insightsItems.map((item, index) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300 group border border-transparent hover:border-[#BFA980]/30"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20 p-2 rounded-lg border border-[#D4AF37]/30 group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-4 h-4 text-[#D4AF37]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white/80 font-semibold text-sm tracking-wide group-hover:text-white transition-colors duration-300">
                              {item.name}
                            </h3>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <div
              className={`hidden lg:flex items-center space-x-3 flex-shrink-0 transition-all duration-500 ${
                isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/40 rounded-full transition-all duration-300 flex items-center justify-center backdrop-blur-sm hover:scale-105"
                type="button"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={handleCallClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] hover:from-[#BFA980] hover:to-[#D4AF37] text-[#0e0e0e] px-5 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 whitespace-nowrap"
                type="button"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="text-sm">Call Now</span>
              </button>
            </div>

            <div className="flex items-center lg:hidden">
              <button
                onClick={handleMobileSearchToggle}
                className="mr-2 p-2 bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full transition-all duration-300 backdrop-blur-sm"
                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                type="button"
              >
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full transition-all duration-300 backdrop-blur-sm"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                type="button"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-gradient-to-b from-[#0e0e0e]/95 to-[#1a1a1a]/95 backdrop-blur-lg border-t border-[#BFA980]/10 shadow-2xl">
            <div className="p-6 space-y-4 manrope-font">
              <Link
                href="/"
                className="block text-white/90 hover:text-[#D4AF37] font-semibold px-4 py-3 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
              >
                Home
              </Link>
              <div>
                <button
                  onClick={() => setIsServicesOpen((v) => !v)}
                  className="flex items-center justify-between w-full text-white/90 hover:text-[#D4AF37] font-semibold px-4 py-3 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
                  type="button"
                  aria-expanded={isServicesOpen}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#BFA980] transition-transform ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
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
              {navItems.slice(1).map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-white/90 hover:text-[#D4AF37] font-semibold px-4 py-3 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
                >
                  {item.name}
                </a>
              ))}
              <div>
                <button
                  onClick={() => setIsInsightsOpen((v) => !v)}
                  className="flex items-center justify-between w-full text-white/90 hover:text-[#D4AF37] font-semibold px-4 py-3 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
                  type="button"
                  aria-expanded={isInsightsOpen}
                >
                  <span>Insights</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#BFA980] transition-transform ${
                      isInsightsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isInsightsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {insightsItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center text-white/70 hover:text-[#D4AF37] space-x-3 px-3 py-2 hover:bg-[#D4AF37]/10 rounded-lg transition-all duration-300 font-semibold"
                      >
                        <FileText className="w-4 h-4 text-[#BFA980]" />
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleCallClick}
                className="mt-6 w-full flex items-center justify-center bg-gradient-to-r from-[#D4AF37] to-[#BFA980] hover:from-[#BFA980] hover:to-[#D4AF37] text-[#0e0e0e] px-6 py-4 rounded-full font-semibold shadow-lg"
                type="button"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </button>
            </div>
          </div>
        )}

        {/* Mobile-only location bar */}
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1a1a1a] border-t border-[#BFA980]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
            <div className="text-center text-white/90 text-sm font-medium">
              Buy or sell luxury cars in{' '}
              <button
                onClick={handleMobileCity}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleMobileCity();
                  }
                }}
                className="underline decoration-[#D4AF37] decoration-2 underline-offset-2 text-[#D4AF37] hover:text-[#BFA980] transition-colors duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 rounded"
                type="button"
                aria-label="Select city"
                role="button"
                tabIndex={0}
              >
                {isDetectingLocation ? (
                  <span className="text-[#D4AF37]">
                    Detecting...
                  </span>
                ) : selectedCity || (
                  <span className="text-white/60">
                    Select City<span className="text-[#D4AF37]">?</span>
                  </span>
                )}
              </button>
            </div>
            
            {/* Mobile location popup */}
            {locationAsk && !popupClosed && (
              <div className="location-popup absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-[9999] rounded-lg shadow-xl bg-[#1a1a1a] border border-[#BFA980]/30 animate-popdown w-80">
                <div className="flex items-center justify-between p-3">
                  <div className="text-sm font-medium text-white mr-3 flex-1">
                    Allow EpicLuxe to detect your city for personalized inventory?
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleLocationReject();
                    }}
                    className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    type="button"
                    aria-label="Close popup"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2 px-3 pb-3">
                  <button
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#BFA980] font-bold text-[#201d16] hover:from-[#BFA980] hover:to-[#D4AF37] transition-all duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleLocationConfirm();
                    }}
                    type="button"
                  >
                    Yes
                  </button>
                  <button
                    className="px-4 py-1.5 rounded-lg bg-[#2b2661] text-white font-medium border border-[#BFA980]/30 hover:bg-[#201d16] transition-all duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleLocationReject();
                    }}
                    type="button"
                  >
                    No
                  </button>
                </div>
                {permissionBlocked && (
                  <div className="px-3 pb-3">
                    <div className="text-xs text-red-400 mb-2">
                      Location permission is blocked. 
                      <button
                        onClick={() => {
                          // Try to open browser settings
                          if (navigator.userAgent.includes('Chrome')) {
                            window.open('chrome://settings/content/location');
                          } else if (navigator.userAgent.includes('Firefox')) {
                            window.open('about:preferences#privacy');
                          } else {
                            alert('Please enable location permission in your browser settings.');
                          }
                        }}
                        className="text-[#D4AF37] underline ml-1 hover:text-[#BFA980]"
                      >
                        Enable it here
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

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
            animation: slide-in-from-top-2 0.4s cubic-bezier(0.38, 1.15, 0.7, 1.01);
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
              transform: translateY(-14px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-popdown {
            animation: popdown-appear 0.38s cubic-bezier(0.38, 1.15, 0.7, 1.01);
          }
          @keyframes popdown-appear {
            from {
              opacity: 0;
              transform: scale(0.85) translateY(-32px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          .animate-scalein {
            animation: scalein 0.23s cubic-bezier(0.21, 0.61, 0.35, 1), fadein 0.13s linear;
          }
          @keyframes scalein {
            from {
              opacity: 0;
              transform: scale(0.94);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes fadein {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideup {
            from {
              opacity: 0;
              transform: translateY(32px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideup {
            animation: slideup 0.27s cubic-bezier(0.27, 0.98, 0.51, 1.03);
          }
          .scrollbar-thin {
            scrollbar-width: thin;
          }
          .scrollbar-thumb-[#BFA980]::-webkit-scrollbar-thumb {
            background: #bfa980cc;
          }
          .scrollbar-track-transparent::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-thumb-[#BFA980] {
            background: #bfa980cc;
          }
          .scrollbar-track-transparent {
            background: transparent;
          }
        `}</style>

        {/* Custom Call Popup */}
        {showCallPopup && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={handleCallCancel}
            />
            
            {/* Popup Content */}
            <div className="relative w-full max-w-md bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e] border border-[#D4AF37]/20 rounded-2xl shadow-2xl overflow-hidden animate-in">
              {/* Header */}
              <div className="p-6 border-b border-[#D4AF37]/10">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20 p-2 rounded-lg border border-[#D4AF37]/30">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-xl">Call Epic Luxe</h2>
                    <p className="text-gray-400 text-sm mt-1">Speak directly with our luxury car expert</p>
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="p-6 text-center">
                <div className="text-3xl font-bold text-[#D4AF37] mb-2">+91-9999999999</div>
                <p className="text-gray-400 text-sm">Available 9:30 AM to 7:30 PM for your luxury car needs</p>
              </div>

              {/* Action Buttons */}
              <div className="p-6 space-y-3">
                <button
                  onClick={handleCallNow}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] hover:from-[#BFA980] hover:to-[#D4AF37] text-[#0e0e0e] px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg transform hover:scale-105"
                  type="button"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </div>
                </button>
                
                <button
                  onClick={handleCallCancel}
                  className="w-full bg-transparent border border-[#D4AF37]/30 text-[#D4AF37] px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}