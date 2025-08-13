'use client';

// VehiclesPageClient.tsx - Client Component (Interactive)
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Fuse from 'fuse.js';
import { ArrowUpDown, Search, MessageCircle } from 'lucide-react';

// Dynamic imports for better performance
const PremiumCarFilter = dynamic(() => import('../PremiumCarFilter/PremiumCarFilter'), {
  loading: () => <div className="animate-pulse bg-black/5 h-screen w-64" />
});

const VehicleGrid = dynamic(() => import('../VehicleGrid/VehicleGrid'), {
  loading: () => <div className="animate-pulse bg-black/5 h-96" />
});

const NoVehiclesPrompt = dynamic(() => import('../NoVehiclePrompt'));

// Types
interface FrontendVehicle {
  id: number;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  price: string;
  originalPrice?: string;
  savings?: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  engineCapacity?: string;
  horsepower?: string;
  torque?: string;
  location: string;
  condition: string;
  ownership?: string;
  colorExterior?: string;
  colorInterior?: string;
  image: string;
  images?: string[];
  features: string[];
  videoUrl?: string;
  slug: string;
  views?: number;
  bodyType?: string;
  driveType?: string;
  seating?: number;
}

export interface FiltersState {
  brand: string[];
  model: string[];
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  fuelType: string[];
  transmission: string[];
  mileageMin: number;
  mileageMax: number;
  ownership: string[];
  bodyType: string[];
  driveType: string[];
  seatingCapacity: string[];
  colorExterior: string | null;
  colorInterior: string | null;
  engineMin: number;
  engineMax: number;
  horsepowerMin: number;
  horsepowerMax: number;
  condition: string | null;
  features: string[];
}

// Initial filter state
const initialFilters: FiltersState = {
  brand: [], model: [],
  priceMin: 100000, priceMax: 50000000,
  yearMin: 2010, yearMax: 2024,
  fuelType: [], transmission: [],
  mileageMin: 0, mileageMax: 200000,
  ownership: [], bodyType: [], driveType: [],
  seatingCapacity: [],
  colorExterior: null, colorInterior: null,
  engineMin: 0, engineMax: 6,
  horsepowerMin: 0, horsepowerMax: 1000,
  condition: null,
  features: [],
};

// Sort options
const sortOptions = [
  { value: 'newest', label: 'Year: Newest First' },
  { value: 'oldest', label: 'Year: Oldest First' },
  { value: 'priceHigh', label: 'Price: High to Low' },
  { value: 'priceLow', label: 'Price: Low to High' },
  { value: 'mileageLow', label: 'Mileage: Low to High' },
  { value: 'brandAZ', label: 'Brand: A to Z' },
];

// Utility function to parse numeric value
function parseNumericValue(str: string): number {
  const clean = str.replace(/[^0-9.]/g, '');
  if (str.toLowerCase().includes('lakh')) {
    return parseFloat(clean) * 100000;
  } else if (str.toLowerCase().includes('cr')) {
    return parseFloat(clean) * 10000000;
  }
  return parseFloat(clean) || 0;
}

interface VehiclesPageClientProps {
  initialVehicles: FrontendVehicle[];
}

export default function VehiclesPageClient({ initialVehicles }: VehiclesPageClientProps) {
  // State management
  const [vehicles] = useState<FrontendVehicle[]>(initialVehicles);
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  const [sortValue, setSort] = useState('newest');
  const [searchTerm, setSearch] = useState('');
  const [showSort, setShowSort] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update filter ranges based on actual data
  useEffect(() => {
    if (vehicles.length > 0) {
      const prices = vehicles.map(v => parseNumericValue(v.price));
      const years = vehicles.map(v => v.year);
      const mileages = vehicles.map(v => parseNumericValue(v.mileage));
      
      setFilters(prev => ({
        ...prev,
        priceMin: Math.min(...prices),
        priceMax: Math.max(...prices),
        yearMin: Math.min(...years),
        yearMax: Math.max(...years),
        mileageMin: Math.min(...mileages),
        mileageMax: Math.max(...mileages)
      }));
    }
  }, [vehicles]);

  // Memoized filtered vehicles
  const exactFiltered = useMemo(() => {
    if (vehicles.length === 0) return [];
    
    return vehicles.filter(car => {
      const price = parseNumericValue(car.price);
      const mileage = parseNumericValue(car.mileage);
      const {
        brand, model, priceMin, priceMax, yearMin, yearMax,
        fuelType, transmission, mileageMin, mileageMax,
        ownership, bodyType, driveType, seatingCapacity,
        colorExterior, colorInterior, condition, features,
      } = filters;

      if (brand.length && !brand.includes(car.brand)) return false;
      if (model.length && !model.includes(car.model)) return false;
      if (price < priceMin || price > priceMax) return false;
      if (car.year < yearMin || car.year > yearMax) return false;
      if (fuelType.length && !fuelType.includes(car.fuelType)) return false;
      if (transmission.length && !transmission.includes(car.transmission)) return false;
      if (mileage < mileageMin || mileage > mileageMax) return false;
      if (ownership.length && !ownership.includes(car.ownership || '')) return false;
      if (bodyType.length && !bodyType.includes(car.bodyType ?? '')) return false;
      if (driveType.length && !driveType.includes(car.driveType ?? '')) return false;
      if (seatingCapacity.length && !seatingCapacity.includes(String(car.seating || 5))) return false;
      if (colorExterior && colorExterior !== (car.colorExterior ?? null)) return false;
      if (colorInterior && colorInterior !== (car.colorInterior ?? null)) return false;
      if (condition && condition !== car.condition) return false;
      if (features.length && !features.every(f => car.features.includes(f))) return false;

      // Text search
      if (searchTerm.trim()) {
        const s = searchTerm.toLowerCase();
        const searchText = `${car.brand} ${car.model} ${car.year} ${car.fuelType} ${car.transmission} ${car.variant || ''}`.toLowerCase();
        if (!searchText.includes(s)) return false;
      }
      return true;
    });
  }, [vehicles, filters, searchTerm]);

  // Fuzzy search setup
  const fuse = useMemo(
    () => new Fuse(vehicles, { 
      keys: ['brand', 'model', 'variant', 'year', 'fuelType'], 
      threshold: 0.3,
      ignoreLocation: true 
    }),
    [vehicles]
  );

  const fuzzyMatches = useMemo(() => {
    if (exactFiltered.length || !searchTerm.trim()) return [];
    return fuse.search(searchTerm).map(r => r.item);
  }, [exactFiltered, searchTerm, fuse]);

  // Sorted vehicles
  const sortedVehicles = useMemo(() => {
    const list = exactFiltered.length ? [...exactFiltered] : [...fuzzyMatches];

    switch (sortValue) {
      case 'newest': 
        list.sort((a, b) => b.year - a.year); 
        break;
      case 'oldest': 
        list.sort((a, b) => a.year - b.year); 
        break;
      case 'priceHigh': 
        list.sort((a, b) => parseNumericValue(b.price) - parseNumericValue(a.price)); 
        break;
      case 'priceLow': 
        list.sort((a, b) => parseNumericValue(a.price) - parseNumericValue(b.price)); 
        break;
      case 'mileageLow':
        list.sort((a, b) => parseNumericValue(a.mileage) - parseNumericValue(b.mileage));
        break;
      case 'brandAZ': 
        list.sort((a, b) => a.brand.localeCompare(b.brand)); 
        break;
    }
    return list;
  }, [exactFiltered, fuzzyMatches, sortValue]);

  // Handlers
  const handleSortClick = useCallback((value: string) => {
    setSort(value);
    setShowSort(false);
  }, []);

  const handleApplyFilters = useCallback(() => {
    setLoading(true);
    // Simulate filter application
    setTimeout(() => setLoading(false), 300);
  }, []);

  const currentSortLabel = sortOptions.find(o => o.value === sortValue)?.label ?? 'Sort';

  // WhatsApp configuration
  const whatsappNumber = '918825338775';
  const defaultMessage = encodeURIComponent('Hello! I am interested in your luxury pre-owned vehicles. Could you please provide more details?');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  // Add CSS animations using CSS-in-JS approach compatible with Next.js
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        /* Custom scrollbar styling */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.4);
        }

        /* Focus visible states */
        button:focus-visible,
        input:focus-visible {
          outline: 2px solid black;
          outline-offset: 2px;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="bg-white text-black min-h-screen relative" style={{ fontFamily: 'Manrope, sans-serif' }}>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Filter - Desktop */}
        <aside className="hidden lg:block lg:w-[280px] border-r border-black/10 bg-white">
          <PremiumCarFilter
            filters={filters} 
            setFilters={setFilters}
            onApplyFilters={handleApplyFilters}
            currentSort={sortValue} 
            setSort={setSort}
            currentSearch={searchTerm} 
            setSearch={setSearch}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="p-4 lg:p-8">
            
            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between gap-6 mb-8 pb-6 border-b border-black/10">
              {/* Title */}
              <div>
                <h1 className="text-3xl font-light text-black tracking-tight">
                  Curated Luxury Vehicles
                </h1>
                <p className="text-sm text-black/60 mt-2">
                  {sortedVehicles.length} {sortedVehicles.length === 1 ? 'vehicle' : 'vehicles'} available
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowSort(!showSort); }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-black/20 hover:border-black transition-colors duration-200"
                  >
                    <ArrowUpDown size={16} className="text-black/60" />
                    <span className="text-sm font-light">{currentSortLabel.split(':')[0]}</span>
                  </button>
                  
                  {showSort && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black/20 shadow-lg z-40 min-w-[200px]">
                      {sortOptions.map(option => (
                        <button
                          key={option.value}
                          className={`w-full px-4 py-3 text-sm text-left hover:bg-black/5 transition-colors ${
                            option.value === sortValue ? 'bg-black text-white' : ''
                          }`}
                          onClick={() => handleSortClick(option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search */}
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                  <input
                    type="search" 
                    value={searchTerm}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search brand, model..."
                    className="pl-10 pr-4 py-2.5 w-64 bg-white border border-black/20 text-black placeholder-black/40 focus:outline-none focus:border-black transition-colors duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden mb-6">
              <h1 className="text-2xl font-light text-black mb-4">Luxury Vehicles</h1>
              
              {/* Mobile Controls */}
              <div className="flex gap-2 mb-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowSort(!showSort); }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-black/20"
                >
                  <ArrowUpDown size={14} />
                  <span className="text-xs">Sort</span>
                </button>
                
                <div className="flex-1 relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-black/20 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
              
              <p className="text-sm text-black/60">
                {sortedVehicles.length} {sortedVehicles.length === 1 ? 'vehicle' : 'vehicles'} found
              </p>
            </div>

            {/* Results */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              </div>
            ) : sortedVehicles.length ? (
              <>
                {exactFiltered.length === 0 && searchTerm.trim() && (
                  <div className="mb-6 p-4 bg-black/5 border-l-4 border-black">
                    <p className="text-sm text-black/70">
                      Showing closest matches for{' '}
                      <span className="font-medium text-black">"{searchTerm}"</span>
                    </p>
                  </div>
                )}
                <VehicleGrid vehicles={sortedVehicles} />
              </>
            ) : (
              <NoVehiclesPrompt />
            )}
          </div>
        </main>
      </div>

      {/* Mobile Filter - Bottom Sheet */}
      <div className="lg:hidden">
        <PremiumCarFilter
          filters={filters} 
          setFilters={setFilters}
          onApplyFilters={handleApplyFilters}
          currentSort={sortValue} 
          setSort={setSort}
          currentSearch={searchTerm} 
          setSearch={setSearch}
        />
      </div>

      {/* Backdrop for sort dropdown */}
      {showSort && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowSort(false)} 
        />
      )}

      {/* Floating WhatsApp Button - Mercedes Style */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-black text-white shadow-xl hover:bg-black/90 transition-all duration-200 group"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="absolute right-full mr-3 bg-black text-white px-3 py-2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Need Help? Chat with us
        </span>
      </a>

      {/* Mobile Sort Modal */}
      {showSort && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white"
            style={{
              animation: 'slideUp 0.3s ease-out',
            }}
          >
            <div className="p-4 border-b border-black/10">
              <h3 className="text-lg font-light">Sort By</h3>
            </div>
            <div className="max-h-[50vh] overflow-y-auto">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  className={`w-full px-4 py-4 text-left border-b border-black/5 hover:bg-black/5 transition-colors ${
                    option.value === sortValue ? 'bg-black text-white' : ''
                  }`}
                  onClick={() => handleSortClick(option.value)}
                >
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}