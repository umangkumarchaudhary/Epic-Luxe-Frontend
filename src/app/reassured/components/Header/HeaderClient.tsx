'use client';

// HeaderClient.tsx
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
  MapPin,
  CheckCircle,
} from 'lucide-react';

// Cities data for luxury car markets in India
const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad', 
  'Kolkata', 'Ahmedabad', 'Nashik', 'Aurangabad', 'Vizag', 'Kolhapur',
  'Gurgaon', 'Noida', 'Faridabad', 'Thane', 'Navi Mumbai', 'Jaipur',
  'Lucknow', 'Chandigarh', 'Indore', 'Bhopal', 'Nagpur', 'Surat'
];

const services = [
  { name: 'Buy Luxury Cars', icon: Car, href: '/reassured/buy-used-cars', description: 'Certified pre-owned vehicles' },
  { name: 'Sell Your Car', icon: Crown, href: '/reassured/Services/sell-your-car', description: 'Best market price' },
  { name: 'Free Valuation', icon: Shield, href: '/reassured/Services/sell-your-car', description: '200+ point inspection' },
  { name: 'Car Finance', icon: CreditCard, href: '/reassured/Services/finance', description: 'Easy loan options' },
  { name: 'Insurance', icon: FileText, href: '/reassured/Services/', description: 'Comprehensive coverage' },
  { name: 'Trade In', icon: ArrowUpDown, href: '/reassured/Services/TradeIn', description: 'Exchange program' },
];

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/luxe/contact' },
  { name: 'About', href: '/luxe/AboutUs' },
];

const insightsItems = [
  { name: 'Customer Reviews', href: '/luxe/insights/testimonials', description: 'Real experiences' },
  { name: 'Car Blogs', href: '/luxe/insights/blogs', description: 'Expert insights' },
  { name: 'Press & Media', href: '/luxe/Press', description: 'Latest news' },
];

const popularSearches = {
  cars: ['BMW 3 Series', 'Mercedes C-Class', 'Audi Q5', 'Porsche Cayenne'],
  services: ['Car Loan Calculator', 'Insurance Quote', 'Sell My Car', 'Book Test Drive'],
  blogs: ['Best Used Luxury Cars 2024', 'Car Maintenance Tips', 'Buying Guide'],
};

interface HeaderClientProps {
  seoData?: {
    metadata: any;
    cities: any;
    services: any;
  };
}

export default function HeaderClient({ seoData }: HeaderClientProps) {
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
              setLocationError('');
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
    setShowCallPopup(false);
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
        { type: 'vehicle' as const, title: 'BMW 3 Series 320d Luxury Line', category: 'Luxury Sedans', href: '/inventory/bmw-3-series' },
        { type: 'vehicle' as const, title: 'Mercedes-Benz C-Class C220d', category: 'Premium Cars', href: '/inventory/mercedes-c-class' },
        { type: 'blog' as const, title: 'Best Used Luxury Cars in India 2024', category: 'Buying Guide', href: '/insights/blogs/best-luxury-cars-2024' },
        { type: 'service' as const, title: 'Used Car Loan Calculator', category: 'Finance Tools', href: '/services/loan-calculator' },
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
    
    if (savedCity) {
      setSelectedCity(savedCity);
      setLocationError('');
    } else {
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          if (result.state === 'granted') {
            setShowBrowserLocationPrompt(true);
          } else if (result.state === 'denied') {
            setPermissionBlocked(true);
          }
        });
      }
    }
    
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'denied') {
          setPermissionBlocked(true);
        }
      });
    }
    
    if (!seenPermission && !hasShownLocationPopup && !popupClosed) {
      setTimeout(() => {
        setLocationAsk(true);
        setHasShownLocationPopup(true);
      }, 1000);
    }
  }, [hasShownLocationPopup, popupClosed]);

  useEffect(() => {
    if (showBrowserLocationPrompt) {
      autoDetectLocation();
    }
  }, [showBrowserLocationPrompt, autoDetectLocation]);

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
    setLocationAsk(false);
    setPopupClosed(true);
    setHasShownLocationPopup(true);
    localStorage.setItem('seen_location_permission', '1');
    localStorage.removeItem('location_rejected');
    
    if (permissionBlocked) {
      setLocationError('Location permission is blocked. Please enable it in your browser settings or select your city manually.');
      return;
    }
    
    setIsDetectingLocation(true);
    setShowBrowserLocationPrompt(true);
    
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
    setLocationAsk(false);
    setPopupClosed(true);
    setHasShownLocationPopup(true);
    localStorage.setItem('seen_location_permission', '1');
    localStorage.setItem('location_rejected', 'true');
    setIsDetectingLocation(false);
    setLocationError('');
  };

  const filteredCities = !citySearch
    ? cities
    : cities.filter((city) =>
        city.toLowerCase().startsWith(citySearch.trim().toLowerCase())
      );

  const cityDropdownClasses = `
    absolute left-0 mt-2 z-30 
    w-[340px] sm:w-[500px] md:w-[680px] 
    bg-white text-black border border-gray-200 rounded-2xl shadow-2xl
    transition-all duration-200 origin-top transform
    ${isCityDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto visible' : 'opacity-0 scale-95 pointer-events-none invisible'}
  `;

  function CityDropdown({ mobile }: { mobile?: boolean }) {
    const citySearchInputRef = useRef<HTMLInputElement>(null);

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
            ? `fixed left-0 bottom-0 w-full h-[70vh] max-h-[450px] z-[100] bg-white text-black border-t border-gray-200 rounded-t-3xl overflow-y-auto`
            : cityDropdownClasses
        }`}
        onMouseEnter={!mobile ? openLocationDropdown : undefined}
        onMouseLeave={!mobile ? closeLocationDropdown : undefined}
        style={mobile ? undefined : { minHeight: 250, maxHeight: 480, overflowY: 'auto' }}
      >
        <div className={mobile ? 'py-5 px-4' : 'p-6'}>
          <div className="flex items-center justify-between mb-4">
            <div className={`font-bold ${mobile ? 'text-xl' : 'text-lg'} text-black font-manrope`}>
              Select Your City
            </div>
            <div className="relative w-40 ml-3">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={citySearchInputRef}
                autoComplete="off"
                type="text"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                placeholder="Search city..."
                className="w-full pl-8 pr-2 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 text-sm font-manrope"
                spellCheck={false}
                aria-label="Search city"
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
              />
            </div>
            {mobile && (
              <button
                onClick={() => setIsCityMobileSheet(false)}
                className="ml-4 p-2 text-gray-600 rounded-full hover:bg-gray-100 transition"
                type="button"
                aria-label="Close city selector"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {locationError && <div className="text-sm text-red-500 mb-2 font-manrope">{locationError}</div>}
          <div
            className={`grid ${mobile ? 'grid-cols-2 gap-2' : 'grid-cols-3 sm:grid-cols-4 gap-3'}`}
            style={{ maxHeight: mobile ? undefined : 360, overflowY: 'auto' }}
          >
            {filteredCities.length ? (
              filteredCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  className={`text-left flex items-center px-3 py-2 rounded-xl font-medium font-manrope text-black hover:bg-gray-100 focus:bg-gray-200 transition-all text-sm ${
                    city === selectedCity ? 'bg-black text-white hover:bg-black' : ''
                  }`}
                  onClick={() => {
                    setSelectedCity(city);
                    localStorage.setItem('selected_city', city);
                    setLocationError('');
                    setPermissionBlocked(false);
                    setIsCityDropdownOpen(false);
                    setIsCityMobileSheet(false);
                    setCitySearch('');
                  }}
                >
                  {city === selectedCity && <CheckCircle className="w-4 h-4 mr-2" />}
                  {city}
                </button>
              ))
            ) : (
              <div className="col-span-full text-center py-6 text-xs text-gray-500 font-manrope">No cities found.</div>
            )}
          </div>
        </div>
        {mobile && <div style={{ height: 12 }} />}
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
        
        .font-manrope {
          font-family: 'Manrope', sans-serif;
        }
        
        * {
          font-family: 'Manrope', sans-serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      {isCityMobileSheet && <CityDropdown mobile />}

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out font-manrope ${
          showHeader ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ease-out ${isSearchOpen ? 'h-20' : 'h-16'}`}>
            <div className="flex flex-row items-center">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-black font-manrope">
                  Epic<span className="font-light">Reassured</span>
                </span>
              </Link>
              
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
                  className="flex items-center px-4 py-2 rounded-xl bg-gray-50 text-black font-semibold text-xs border border-gray-200 hover:border-black hover:bg-gray-100 transition-all duration-200 font-manrope"
                  onClick={locationAsk ? undefined : openLocationDropdown}
                  style={{ minWidth: 100, minHeight: 36 }}
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isCityDropdownOpen}
                  aria-label="Select city"
                  disabled={isDetectingLocation || locationAsk}
                >
                  <MapPin className="w-3 h-3 mr-1.5" />
                  <span className="truncate max-w-[100px]" title={selectedCity || 'Select City'}>
                    {isDetectingLocation ? 'Detecting...' : (selectedCity || 'Select City')}
                  </span>
                  {isDetectingLocation ? (
                    <div className="ml-2 w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ChevronDown
                      className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                        isCityDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
                {isCityDropdownOpen && !locationAsk && <CityDropdown />}
                
                {/* Location popup */}
                {locationAsk && !popupClosed && (
                  <div className="location-popup absolute top-full left-0 mt-2 z-[9999] rounded-2xl shadow-xl bg-white border border-gray-200 animate-slideDown w-80">
                    <div className="flex items-center justify-between p-4">
                      <div className="text-sm font-medium text-black mr-3 flex-1 font-manrope">
                        Allow Epic Luxe to detect your city for personalized inventory?
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLocationReject();
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        type="button"
                        aria-label="Close popup"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-2 px-4 pb-4">
                      <button
                        className="px-4 py-2 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-all duration-200 font-manrope"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLocationConfirm();
                        }}
                        type="button"
                      >
                        Yes, Allow
                      </button>
                      <button
                        className="px-4 py-2 rounded-xl bg-white text-black font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-200 font-manrope"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLocationReject();
                        }}
                        type="button"
                      >
                        No Thanks
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar */}
            {isSearchOpen && (
              <div className="search-container absolute left-1/2 z-40 transform -translate-x-1/2 w-full max-w-2xl px-4">
                <div className="relative animate-slideDown">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search luxury cars, services, guides..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all duration-300 shadow-lg font-manrope"
                    aria-label="Search input"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200"
                    type="button"
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Search recommendations and results */}
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
                  <div className="p-6 max-h-96 overflow-y-auto font-manrope">
                    {!searchQuery && (
                      <div className="space-y-6">
                        <section>
                          <div className="flex items-center space-x-2 mb-3">
                            <Car className="w-4 h-4 text-black" />
                            <h3 className="text-sm font-semibold text-black">Popular Car Searches</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {popularSearches.cars.map((term) => (
                              <button
                                key={term}
                                onClick={() => handleSearch(term)}
                                className="text-left text-gray-600 hover:text-black text-sm py-2 px-3 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200 font-medium"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </section>
                        <section>
                          <div className="flex items-center space-x-2 mb-3">
                            <Shield className="w-4 h-4 text-black" />
                            <h3 className="text-sm font-semibold text-black">Popular Services</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {popularSearches.services.map((term) => (
                              <button
                                key={term}
                                onClick={() => handleSearch(term)}
                                className="text-left text-gray-600 hover:text-black text-sm py-2 px-3 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200 font-medium"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </section>
                        <section>
                          <div className="flex items-center space-x-2 mb-3">
                            <MessageCircle className="w-4 h-4 text-black" />
                            <h3 className="text-sm font-semibold text-black">Popular Guides</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {popularSearches.blogs.map((term) => (
                              <button
                                key={term}
                                onClick={() => handleSearch(term)}
                                className="text-left text-gray-600 hover:text-black text-sm py-2 px-3 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200 font-medium"
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
                          <div className="w-1 h-4 bg-black rounded-full"></div>
                          <h3 className="text-sm font-semibold text-black">Search Results</h3>
                        </div>
                        {searchResults.map((result, index) => (
                          <a
                            key={index}
                            href={result.href}
                            className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group border border-transparent hover:border-gray-200"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                              setSearchResults([]);
                            }}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                result.type === 'vehicle'
                                  ? 'bg-black'
                                  : result.type === 'blog'
                                  ? 'bg-gray-600'
                                  : 'bg-gray-400'
                              }`}
                            ></div>
                            <div className="flex-1">
                              <div className="text-black text-sm font-medium group-hover:font-semibold transition-all">
                                {result.title}
                              </div>
                              <div className="text-gray-500 text-xs">{result.category}</div>
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
              className={`hidden lg:flex items-center space-x-6 transition-all duration-500 ${
                isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <Link href="/" className="relative group px-1">
                <span className="text-base font-semibold text-black hover:text-gray-700 transition-all duration-300 font-manrope">
                  Home
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300 ease-out" />
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
                  <span className="text-base font-semibold text-black hover:text-gray-700 transition-all duration-300 font-manrope">
                    Services
                  </span>
                  <ChevronDown
                    className={`ml-1 w-4 h-4 text-gray-600 transition-transform duration-300 ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-full left-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top-left transform ${
                    isServicesOpen
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto visible'
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none invisible'
                  }`}
                  onMouseEnter={openServicesDropdown}
                  onMouseLeave={closeServicesDropdown}
                  style={{ maxHeight: '480px', overflowY: 'auto' }}
                >
                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-1">
                      {services.map((service, index) => (
                        <a
                          key={service.name}
                          href={service.href}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group border border-transparent hover:border-gray-100"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="bg-gray-100 p-2 rounded-xl group-hover:bg-black group-hover:text-white transition-all duration-300">
                            <service.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-black font-semibold text-sm font-manrope">
                              {service.name}
                            </h3>
                            <p className="text-gray-500 text-xs font-manrope">{service.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {navItems.slice(1).map((item) => (
                <a key={item.name} href={item.href} className="relative group px-1">
                  <span className="text-base font-semibold text-black hover:text-gray-700 transition-all duration-300 font-manrope">
                    {item.name}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300 ease-out" />
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
                  <span className="text-base font-semibold text-black hover:text-gray-700 transition-all duration-300 font-manrope">
                    Insights
                  </span>
                  <ChevronDown
                    className={`ml-1 w-4 h-4 text-gray-600 transition-transform duration-300 ${
                      isInsightsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`absolute top-full left-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top-left transform ${
                    isInsightsOpen
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto visible'
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none invisible'
                  }`}
                  onMouseEnter={openInsightsDropdown}
                  onMouseLeave={closeInsightsDropdown}
                  style={{ maxHeight: '480px', overflowY: 'auto' }}
                >
                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-1">
                      {insightsItems.map((item, index) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group border border-transparent hover:border-gray-100"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="bg-gray-100 p-2 rounded-xl group-hover:bg-black group-hover:text-white transition-all duration-300">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-black font-semibold text-sm font-manrope">
                              {item.name}
                            </h3>
                            <p className="text-gray-500 text-xs font-manrope">{item.description}</p>
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
                className="w-10 h-10 bg-gray-50 border border-gray-200 text-black hover:bg-gray-100 hover:border-black rounded-full transition-all duration-300 flex items-center justify-center hover:scale-105"
                type="button"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={handleCallClick}
                className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 whitespace-nowrap font-manrope"
                type="button"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="text-sm">Call Now</span>
              </button>
            </div>

            <div className="flex items-center lg:hidden">
              <button
                onClick={handleMobileSearchToggle}
                className="mr-2 p-2 bg-gray-50 border border-gray-200 text-black hover:bg-gray-100 rounded-full transition-all duration-300"
                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                type="button"
              >
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 bg-gray-50 border border-gray-200 text-black hover:bg-gray-100 rounded-full transition-all duration-300"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                type="button"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-2xl animate-slideDown">
            <div className="p-6 space-y-4 font-manrope">
              <Link
                href="/"
                className="block text-black hover:text-gray-700 font-semibold px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                Home
              </Link>
              <div>
                <button
                  onClick={() => setIsServicesOpen((v) => !v)}
                  className="flex items-center justify-between w-full text-black hover:text-gray-700 font-semibold px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
                  type="button"
                  aria-expanded={isServicesOpen}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
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
                        className="flex items-center text-gray-600 hover:text-black space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-all duration-300 font-semibold"
                      >
                        <service.icon className="w-4 h-4" />
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
                  className="block text-black hover:text-gray-700 font-semibold px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  {item.name}
                </a>
              ))}
              <div>
                <button
                  onClick={() => setIsInsightsOpen((v) => !v)}
                  className="flex items-center justify-between w-full text-black hover:text-gray-700 font-semibold px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
                  type="button"
                  aria-expanded={isInsightsOpen}
                >
                  <span>Insights</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
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
                        className="flex items-center text-gray-600 hover:text-black space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-all duration-300 font-semibold"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleCallClick}
                className="mt-6 w-full flex items-center justify-center bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-full font-semibold shadow-lg"
                type="button"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </button>
            </div>
          </div>
        )}

        {/* Mobile-only location bar */}
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="text-center text-black text-sm font-medium font-manrope">
              Find luxury cars in{' '}
              <button
                onClick={handleMobileCity}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleMobileCity();
                  }
                }}
                className="underline decoration-black decoration-2 underline-offset-2 font-semibold focus:outline-none focus:ring-2 focus:ring-black/20 rounded"
                type="button"
                aria-label="Select city"
                role="button"
                tabIndex={0}
              >
                {isDetectingLocation ? (
                  <span>Detecting...</span>
                ) : selectedCity || (
                  <span className="text-gray-600">Select City</span>
                )}
              </button>
            </div>
            
            {/* Mobile location popup */}
            {locationAsk && !popupClosed && (
              <div className="location-popup absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-[9999] rounded-2xl shadow-xl bg-white border border-gray-200 animate-slideDown w-80">
                <div className="flex items-center justify-between p-4">
                  <div className="text-sm font-medium text-black mr-3 flex-1 font-manrope">
                    Allow Epic Luxe to detect your city for personalized inventory?
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleLocationReject();
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    type="button"
                    aria-label="Close popup"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2 px-4 pb-4">
                  <button
                    className="px-4 py-2 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-all duration-200 font-manrope"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleLocationConfirm();
                    }}
                    type="button"
                  >
                    Yes, Allow
                  </button>
                  <button
                    className="px-4 py-2 rounded-xl bg-white text-black font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-200 font-manrope"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleLocationReject();
                    }}
                    type="button"
                  >
                    No Thanks
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call Popup */}
        {showCallPopup && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleCallCancel}
            />
            
            {/* Popup Content */}
            <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-black text-white p-3 rounded-2xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-black font-bold text-xl font-manrope">Contact Epic Luxe</h2>
                    <p className="text-gray-500 text-sm mt-1 font-manrope">Speak with our luxury car experts</p>
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="p-8 text-center">
                <div className="text-3xl font-bold text-black mb-2 font-manrope">+91-9999999999</div>
                <p className="text-gray-500 text-sm font-manrope">Available Mon-Sat, 9:30 AM - 7:30 PM</p>
                <p className="text-gray-400 text-xs mt-2 font-manrope">Get instant assistance for buying or selling luxury cars</p>
              </div>

              {/* Action Buttons */}
              <div className="p-6 space-y-3 border-t border-gray-100">
                <button
                  onClick={handleCallNow}
                  className="w-full bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg transform hover:scale-105 font-manrope"
                  type="button"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </div>
                </button>
                
                <button
                  onClick={handleCallCancel}
                  className="w-full bg-white border border-gray-200 text-black px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-gray-50 font-manrope"
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