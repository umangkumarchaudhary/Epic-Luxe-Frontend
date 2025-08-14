'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import PremiumCarFilter, { type FiltersState } from './FiltersPanel';
import VehicleGrid from './VehicleCard';
import VehicleSort from './VehicleSort';
import NoVehiclesPrompt from './NoVehiclesPrompt';
import { ArrowUpDown, Search } from 'lucide-react';

/* ---------- theme ---------- */
const GOLD = '#d4af37';

/* ---------- backend vehicle type ---------- */
interface BackendVehicle {
  id: number;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  original_price?: number;
  savings?: number;
  mileage?: string;
  fuel_type?: string;
  transmission?: string;
  engine_capacity?: string;
  horsepower?: string;
  torque?: string;
  location?: string;
  condition?: string;
  ownership?: string;
  health_engine?: number;
  health_tyres?: number;
  health_paint?: number;
  health_interior?: number;
  health_electrical?: number;
  color_exterior?: string;
  color_interior?: string;
  video_url?: string;
  published: boolean;
  featured: boolean;
  slug: string;
  created_at: string;
  updated_at?: string;
  images?: Array<{
    id: number;
    vehicle_id: number;
    image_url: string;
    sort_order: number;
  }>;
  features?: Array<{
    id: number;
    vehicle_id: number;
    feature: string;
  }>;
}

/* ---------- frontend vehicle type ---------- */
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
  slug: string; // Add this line
  views?: number;
  // Additional properties for compatibility
  bodyType?: string;
  driveType?: string;
  seating?: number;
  isLiked?: boolean;
}

/* ---------- initial filter state ---------- */
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

/* ---------- sort labels ---------- */
const sortOptions = [
  { value: 'newest', label: 'Year: Newest to Oldest' },
  { value: 'oldest', label: 'Year: Oldest to Newest' },
  { value: 'priceHigh', label: 'Price: High to Low' },
  { value: 'priceLow', label: 'Price: Low to High' },
  { value: 'brandAZ', label: 'Brand: A to Z' },
  { value: 'brandZA', label: 'Brand: Z to A' },
];

/* ---------- utility functions ---------- */
function formatPrice(price: number): string {
  return `₹${(price / 100000).toFixed(1)} Lakh`;
}

function parseNumericValue(str: string): number {
  return parseInt(str.replace(/[^\d]/g, '')) || 0;
}

function transformBackendToFrontend(backendVehicle: BackendVehicle): FrontendVehicle {
  // Get the first image or use a placeholder
  const primaryImage = backendVehicle.images && backendVehicle.images.length > 0 
    ? backendVehicle.images.sort((a, b) => a.sort_order - b.sort_order)[0].image_url
    : '/placeholder-car.jpg';

  // Get all image URLs
  const allImages = backendVehicle.images 
    ? backendVehicle.images
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(img => img.image_url)
    : [];

  // Get all features
  const features = backendVehicle.features 
    ? backendVehicle.features.map(f => f.feature)
    : [];

  return {
    id: backendVehicle.id,
    brand: backendVehicle.brand,
    model: backendVehicle.model,
    variant: backendVehicle.variant,
    year: backendVehicle.year,
    price: formatPrice(backendVehicle.price),
    originalPrice: backendVehicle.original_price ? formatPrice(backendVehicle.original_price) : undefined,
    savings: backendVehicle.savings ? formatPrice(backendVehicle.savings) : undefined,
    mileage: backendVehicle.mileage || '0 km',
    fuelType: backendVehicle.fuel_type || 'Petrol',
    transmission: backendVehicle.transmission || 'Manual',
    engineCapacity: backendVehicle.engine_capacity,
    horsepower: backendVehicle.horsepower,
    torque: backendVehicle.torque,
    location: backendVehicle.location || 'Bangalore',
    condition: backendVehicle.condition || 'Good',
    ownership: backendVehicle.ownership,
    colorExterior: backendVehicle.color_exterior,
    colorInterior: backendVehicle.color_interior,
    image: primaryImage,
    images: allImages,
    features: features,
    videoUrl: backendVehicle.video_url,
    slug: backendVehicle.slug,
    views: Math.floor(Math.random() * 500) + 100, // Random views for now
    // Default values for missing properties
    bodyType: 'Sedan', // You might want to add this to your backend
    driveType: 'FWD',  // You might want to add this to your backend
    seating: 5,        // You might want to add this to your backend
  };
}

/* ---------- component ---------- */
export default function VehiclesPage() {
  /* state */
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  const [sortValue, setSort] = useState('newest');
  const [searchTerm, setSearch] = useState('');
  const [showSort, setShowSort] = useState(false);
  const [vehicles, setVehicles] = useState<FrontendVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------- fetch vehicles from backend ---------- */
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch vehicles from your backend
        const response = await fetch('http://localhost:5000/admin/vehicles');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch vehicles');
        }

        // For each vehicle, fetch its images and features
        const vehiclesWithDetails = await Promise.all(
          data.vehicles.map(async (vehicle: BackendVehicle) => {
            try {
              const detailResponse = await fetch(`http://localhost:5000/admin/vehicle/${vehicle.id}`);
              
              if (detailResponse.ok) {
                const detailData = await detailResponse.json();
                if (detailData.success) {
                  return {
                    ...vehicle,
                    images: detailData.images || [],
                    features: detailData.features || []
                  };
                }
              }
              
              // If detail fetch fails, return vehicle without images/features
              return {
                ...vehicle,
                images: [],
                features: []
              };
            } catch (err) {
              console.error(`Error fetching details for vehicle ${vehicle.id}:`, err);
              return {
                ...vehicle,
                images: [],
                features: []
              };
            }
          })
        );

        // Transform backend format to frontend format
        const transformedVehicles = vehiclesWithDetails.map(transformBackendToFrontend);
        
        setVehicles(transformedVehicles);
        
        // Update filter ranges based on actual data
        if (transformedVehicles.length > 0) {
          const prices = transformedVehicles.map(v => parseNumericValue(v.price));
          const years = transformedVehicles.map(v => v.year);
          const mileages = transformedVehicles.map(v => parseNumericValue(v.mileage));
          
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
        
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError(err instanceof Error ? err.message : 'Failed to load vehicles');
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  /* ---------------- EXACT FILTER ---------------- */
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

      // Fix TypeScript errors by optional chaining or fallback to '' for missing props:
      if (ownership.length && !ownership.includes(car.ownership || '')) return false;
      if (bodyType.length && !bodyType.includes(car.bodyType ?? '')) return false;
      if (driveType.length && !driveType.includes(car.driveType ?? '')) return false;
      if (seatingCapacity.length && !seatingCapacity.includes(String(car.seating || 5))) return false;
      if (colorExterior && colorExterior !== (car.colorExterior ?? null)) return false;
      if (colorInterior && colorInterior !== (car.colorInterior ?? null)) return false;
      if (condition && condition !== car.condition) return false;
      if (features.length && !features.every(f => car.features.includes(f))) return false;

      /* text search (exact substring) */
      if (searchTerm.trim()) {
        const s = searchTerm.toLowerCase();
        const hay = `${car.brand} ${car.model} ${car.year} ${car.fuelType} ${car.transmission} ${car.variant || ''}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });
  }, [vehicles, filters, searchTerm]);

  /* ---------------- FUZZY MATCH ---------------- */
  const fuse = useMemo(
    () => new Fuse(vehicles, { keys: ['brand', 'model', 'variant'], threshold: 0.35, ignoreLocation: true }),
    [vehicles]
  );

  const fuzzyMatches = useMemo(() => {
    if (exactFiltered.length || !searchTerm.trim()) return [];
    return fuse.search(searchTerm).map(r => r.item);
  }, [exactFiltered, searchTerm, fuse]);

  /* ---------------- SORT ---------------- */
  const sortedVehicles = useMemo(() => {
    const list = exactFiltered.length ? [...exactFiltered] : [...fuzzyMatches];

    switch (sortValue) {
      case 'newest': list.sort((a, b) => b.year - a.year); break;
      case 'oldest': list.sort((a, b) => a.year - b.year); break;
      case 'priceHigh': list.sort((a, b) => parseNumericValue(b.price) - parseNumericValue(a.price)); break;
      case 'priceLow': list.sort((a, b) => parseNumericValue(a.price) - parseNumericValue(b.price)); break;
      case 'brandAZ': list.sort((a, b) => a.brand.localeCompare(b.brand)); break;
      case 'brandZA': list.sort((a, b) => b.brand.localeCompare(a.brand)); break;
    }
    return list;
  }, [exactFiltered, fuzzyMatches, sortValue]);

  /* ---------------- handlers ---------------- */
  

  const handleSortClick = (v: string) => {
    setSort(v);
    setShowSort(false);
  };

  const currentSortLabel = sortOptions.find(o => o.value === sortValue)?.label ?? 'Sort';
  const displaySortText = currentSortLabel.split(':')[0];

  /* ---------------- style helpers ---------------- */
  const headerItem: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 };

  const sortBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    background: 'rgba(24,26,36,0.96)',
    border: `1px solid ${GOLD}`,
    borderRadius: '0.7rem',
    padding: '0.6rem 1rem',
    height: 44, width: 160,
    color: sortValue ? 'white' : '#999',
    fontWeight: 500, fontSize: '0.9em',
  };

  const searchInput: React.CSSProperties = {
    background: 'rgba(24,26,36,0.96)',
    border: `1px solid ${GOLD}`, borderRadius: '0.7rem',
    padding: '0.6rem 1rem 0.6rem 2.8rem',
    height: 44, width: 180,
    fontSize: '0.9em', color: 'white', fontWeight: 500,
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute', top: '100%', left: 0, right: 0,
    background: '#18181f', border: `1px solid ${GOLD}`,
    borderRadius: '0.5rem', marginTop: '0.5rem', overflow: 'hidden', zIndex: 40,
  };

  /* ---------------- HANDLE WHATSAPP CLICK ---------------- */
  const whatsappNumber = '918825338775'; // Put your WhatsApp number here, country code without +
  const defaultMessage = encodeURIComponent('Hello! I am interested in your luxury pre-owned vehicles. Could you please provide more details?');

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  /* ---------------- loading and error states ---------------- */
  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold mb-4"></div>
          <p className="text-xl">Loading premium vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Unable to Load Vehicles</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:bg-gold/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- render ---------------- */
  return (
    <div className="bg-black text-white min-h-screen relative">
      <div className="flex flex-col md:flex-row">
        {/* sidebar */}
        <aside className="hidden md:block md:w-[250px] border-r border-gray-800">
          <PremiumCarFilter
            filters={filters} setFilters={setFilters}
            onApplyFilters={() => null}
            currentSort={sortValue} setSort={setSort}
            currentSearch={searchTerm} setSearch={setSearch}
          />
        </aside>

        {/* main */}
        <main className="flex-1">
          <div className="p-4 md:p-6 pb-24 md:pb-6">

            {/* ---- desktop header ---- */}
            <div className="hidden md:flex items-center justify-between gap-6 mb-6">
              <div style={headerItem}>
                <h1 className="text-3xl font-bold" style={{ color: GOLD }}>Curated Luxury Vehicles</h1>
              </div>

              {/* sort */}
              <div style={{ ...headerItem, position: 'relative' }}>
                <button onClick={e => { e.stopPropagation(); setShowSort(!showSort); }} style={sortBtn}>
                  <ArrowUpDown size={18} style={{ color: GOLD }} />
                  <span className={sortValue ? '' : 'text-gray-500'}>{displaySortText}</span>
                </button>
                {showSort && (
                  <div style={dropdownStyle}>
                    {sortOptions.map(o => (
                      <div key={o.value}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-white/10"
                        style={{ background: o.value === sortValue ? 'rgba(212,175,55,0.2)' : 'transparent' }}
                        onClick={() => handleSortClick(o.value)}
                      >
                        {o.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* search */}
              <div style={{ ...headerItem, position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', color: GOLD }} />
                <input
                  type="search" value={searchTerm}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Brand, Model, Year…"
                  style={searchInput}
                />
              </div>

              {/* count */}
              <div style={headerItem}>
                <p className="text-gray-400 text-lg whitespace-nowrap">
                  {sortedVehicles.length} car{sortedVehicles.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>

            {/* ---- mobile controls ---- */}
            <div className="md:hidden mb-6">
              <VehicleSort
                value={sortValue} onChange={setSort}
                searchValue={searchTerm} onSearchChange={setSearch}
              />
              <p className="text-gray-400 mt-3">{sortedVehicles.length} car{sortedVehicles.length !== 1 ? 's' : ''} found</p>
            </div>

            {/* ---- results / fallback ---- */}
            {sortedVehicles.length ? (
              <>
                {exactFiltered.length === 0 && searchTerm.trim() && (
                  <p className="mb-4 text-sm text-gray-400">
                    Showing closest matches for&nbsp;
                    <span style={{ color: GOLD, fontWeight: 600 }}>{searchTerm}</span>
                  </p>
                )}
                <VehicleGrid vehicles={sortedVehicles} />
              </>
            ) : (
              <NoVehiclesPrompt />
            )}
          </div>
        </main>
      </div>

      {/* mobile filter bottom sheet */}
      <div className="md:hidden">
        <PremiumCarFilter
          filters={filters} setFilters={setFilters}
          onApplyFilters={() => null}
          currentSort={sortValue} setSort={setSort}
          currentSearch={searchTerm} setSearch={setSearch}
        />
      </div>

      {/* backdrop for sort dropdown */}
      {showSort && <div className="fixed inset-0 z-30" onClick={() => setShowSort(false)} />}

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg"
        style={{
          backgroundColor: '#25D366',
          boxShadow: '0 4px 12px rgb(37 211 102 / 0.6)',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.backgroundColor = '#1ebe57';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.backgroundColor = '#25D366';
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24" height="24"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M20.52 3.48A11.927 11.927 0 0012 0C5.373 0 0 5.373 0 12a11.93 11.93 0 001.797 6.054L0 24l5.991-1.77A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12 0-2.94-1.17-5.705-3.48-7.52zM12 22c-1.957 0-3.83-.69-5.313-1.835l-.38-.254-3.562 1.054 1.056-3.486-.257-.376A9.924 9.924 0 012 12C2 6.486 6.486 2 12 2c1.741 0 3.376.48 4.777 1.306A9.984 9.984 0 0122 12c0 5.514-4.486 10-10 10zm5.48-6.73l-2.685-1.243a.622.622 0 00-.578.036.617.617 0 00-.236.481c0 .42.106.807.287 1.278.146.36.312.775.355 1.23l.067.484a.344.344 0 01-.525.371c-1.175-.877-2.023-1.865-2.61-3.162a.658.658 0 01.194-.831.599.599 0 00.132-.16c.15-.28.039-.356-.11-.446-.124-.077-.792-.515-1.085-.731-.36-.27-.61-.585-.615-1.094a2.824 2.824 0 01.225-1.079c.173-.47.726-1.182 1.025-1.27.313-.094.487-.132.674.027.229.203.89.97.974 1.142.086.175.023.36-.015.478-.038.118-.36.927-.36 1.02 0 .09.535.82.668.957a.575.575 0 00.825.132l.385-.233a.361.361 0 01.508.086l1.046 1.705a.443.443 0 01-.158.652z" />
        </svg>
      </a>
    </div>
  );
}