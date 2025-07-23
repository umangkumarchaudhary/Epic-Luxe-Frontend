'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Search,
  Filter,
  Grid,
  List,
  Heart,
  Share2,
  Phone,
  ArrowRight,
  MapPin,
  Gauge,
  Fuel,
  Users,
  Eye,
} from 'lucide-react';
import Header from '@/components/Header'; // Assuming this exists

// Mock vehicle data (omitted here for brevity; same as yours)

const vehicleData = [
    {
        id: 1,
        brand: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2022,
        price: '₹45,00,000',
        originalPrice: '₹50,00,000',
        mileage: '15 km/l',
        fuelType: 'Petrol',
        seating: 5,
        location: 'Mumbai, Maharashtra',
        image: '/images/Mercedes.jpg',
        condition: 'Certified Pre-Owned',
        features: ['Sunroof', 'Leather Seats', 'Navigation System'],
        savings: '₹5,00,000',
        views: 1200,
        isLiked: false,
    }, 
    {
        id: 2,
        brand: 'BMW',
        model: 'X5',
        year: 2021,
        price: '₹75,00,000',
        originalPrice: '₹80,00,000',
        mileage: '12 km/l',
        fuelType: 'Diesel',
        seating: 7,
        location: 'Delhi, Delhi',
        image: '/images/Mercedes.jpg',
        condition: 'Certified Pre-Owned',
        features: ['Panoramic Sunroof', 'Adaptive Cruise Control', 'Harman Kardon Sound'],
        savings: '₹5,00,000',
        views: 1500,
        isLiked: false,
    },

    {
        id: 3,
        brand: 'Audi',
        model: 'A6',
        year: 2020,
        price: '₹60,00,000',
        originalPrice: '₹65,00,000',
        mileage: '14 km/l',
        fuelType: 'Petrol',
        seating: 5,
        location: 'Bangalore, Karnataka',
        image: '/images/AudiA4.jpg',
        condition: 'Certified Pre-Owned',
        features: ['Virtual Cockpit', 'Matrix LED Headlights', 'Quattro All-Wheel Drive'],
        savings: '₹5,00,000',
        views: 1100,
        isLiked: false,
    },

    {
        id: 4,
        brand: 'Jaguar',
        model: 'F-Pace',
        year: 2019,
        price: '₹70,00,000',
        originalPrice: '₹75,00,000',
        mileage: '13 km/l',
        fuelType: 'Diesel',
        seating: 5,
        location: 'Hyderabad, Telangana',
        image: '/images/jaguar.jpg',
        condition: 'Certified Pre-Owned',
        features: ['Alloy Wheels', 'Leather Upholstery', 'Touch Pro Duo'],
        savings: '₹5,00,000',
        views: 900,
        isLiked: false,
    },

    {
        id: 5,
        brand: 'Volvo',
        model: 'XC90',
        year: 2023,
        price: '₹85,00,000',
        originalPrice: '₹90,00,000',
        mileage: '11 km/l',
        fuelType: 'Hybrid',
        seating: 7,
        location: 'Chennai, Tamil Nadu',
        image: '/images/Volvo.jpg',
        condition: 'Certified Pre-Owned',
        features: ['Pilot Assist', 'Bowers & Wilkins Sound', 'Panoramic Roof'],
        savings: '₹5,00,000',
        views: 1300,
        isLiked: false,
    },

    {
        id: 6,
        brand: 'Land Rover',
        model: 'Range Rover Velar',
        year: 2022,
        price: '₹95,00,000',
        originalPrice: '₹1,00,00,000',
        mileage: '10 km/l',
        fuelType: 'Diesel',
        seating: 5,
        location: 'Pune, Maharashtra',
        image: '/images/Mercedes.jpg',
        condition: 'Certified Pre-Owned',
        features: ['Adaptive Dynamics', 'InControl Touch Pro', '360° Parking Aid'],
        savings: '₹5,00,000',
        views: 1400,
        isLiked: false,
    },
];

const filterOptions = {
  brands: ['All Brands', 'Mercedes-Benz', 'BMW', 'Audi', 'Jaguar', 'Volvo', 'Land Rover'],
  priceRanges: ['All Prices', '₹20L - ₹35L', '₹35L - ₹50L', '₹50L - ₹75L', '₹75L+'],
  years: ['All Years', '2024', '2023', '2022', '2021', '2020', '2019'],
  fuelTypes: ['All Fuel Types', 'Petrol', 'Diesel', 'Hybrid', 'Electric'],
  cities: ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'],
};

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState(vehicleData);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    brand: 'All Brands',
    priceRange: 'All Prices',
    year: 'All Years',
    fuelType: 'All Fuel Types',
    city: 'All Cities',
  });
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleLike = (id: number) => {
    setVehicles(
      vehicles.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, isLiked: !vehicle.isLiked } : vehicle,
      ),
    );
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filters.brand === 'All Brands' || vehicle.brand === filters.brand;
    const matchesFuel = filters.fuelType === 'All Fuel Types' || vehicle.fuelType === filters.fuelType;
    const matchesYear = filters.year === 'All Years' || vehicle.year.toString() === filters.year;

    return matchesSearch && matchesBrand && matchesFuel && matchesYear;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-gradient-to-r from-[#d4af37] to-[#f1c85c] rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl font-light">Loading Premium Collection...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="pt-24">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse bg-gradient-to-r from-[#d4af37]/10 to-[#f1c85c]/10" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 bg-gradient-to-r from-[#d4af37]/10 to-[#f1c85c]/10" />
        </div>

        <div className="relative z-10">
          {/* Hero Header */}
          <div className="bg-gradient-to-r from-slate-800/80 via-slate-700/80 to-slate-800/80 backdrop-blur-sm border-b border-gradient-to-r from-[#d4af37] to-[#f1c85c]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text">
                Premium Collection
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Discover exceptional pre-owned luxury vehicles, meticulously curated for the discerning enthusiast
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-slate-300">
                {['Certified Quality', 'Comprehensive Warranty', 'Expert Inspection'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f1c85c]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-8">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 min-w-72">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by brand, model, or features..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-[#d4af37] to-[#f1c85c] focus:border-gradient-to-r from-[#d4af37] to-[#f1c85c]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filter and View Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white hover:bg-slate-600/50 transition-all duration-300"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>

                  <div className="flex rounded-xl border border-slate-600/50 overflow-hidden bg-slate-700/50">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 transition-all duration-300 ${viewMode === 'grid'
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black'
                        : 'text-slate-300 hover:text-white'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 transition-all duration-300 ${viewMode === 'list'
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black'
                        : 'text-slate-300 hover:text-white'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Filter Options */}
              {isFilterOpen && (
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {Object.entries(filterOptions).map(([key, options]) => (
                      <select
                        key={key}
                        className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-[#d4af37] to-[#f1c85c]"
                        value={filters[key as keyof typeof filters]}
                        onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                      >
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results Count and Sort */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-slate-300">
                <span className="bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text font-semibold">
                  {filteredVehicles.length}
                </span>{' '}
                premium vehicles available
              </div>
              <select
                className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-[#d4af37] to-[#f1c85c]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest First</option>
                <option value="mileage-low">Mileage: Low to High</option>
              </select>
            </div>

            {/* Vehicle Grid/List */}
            <div
              className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}
            >
              {filteredVehicles.map((vehicle, index) => (
                <div
                  key={vehicle.id}
                  className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-gradient-to-r from-[#d4af37] to-[#f1c85c] transition-all duration-500 hover:shadow-2xl hover:shadow-gradient-to-r from-[#d4af37]/10 to-[#f1c85c]/10 hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                  }}
                >
                  {/* Vehicle Image */}
                  <div className="relative overflow-hidden h-64 w-full">
                    <Image
                      src={vehicle.image}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop';
                      }}
                      sizes="(max-width: 768px) 100vw,
                             (max-width: 1200px) 50vw,
                             33vw"
                    />
                    {/* Overlay elements */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {vehicle.condition}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => toggleLike(vehicle.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                          vehicle.isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                        aria-label={vehicle.isLiked ? 'Unlike vehicle' : 'Like vehicle'}
                      >
                        <Heart className={`w-4 h-4 ${vehicle.isLiked ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all"
                        aria-label="Share vehicle"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <div className="bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black text-sm px-3 py-1 rounded-full font-bold">
                        Save {vehicle.savings}
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                      <Eye className="w-3 h-3" />
                      {vehicle.views}
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{vehicle.brand}</h3>
                        <p className="text-slate-300">
                          {vehicle.model} ({vehicle.year})
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text">
                          {vehicle.price}
                        </div>
                        <div className="text-sm text-slate-400 line-through">MRP: {vehicle.originalPrice}</div>
                      </div>
                    </div>

                    {/* Key Specs */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text" />
                        {vehicle.mileage}
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="w-4 h-4 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text" />
                        {vehicle.fuelType}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text" />
                        {vehicle.seating} Seater
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text" />
                        {vehicle.location.split(',')[0]}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {vehicle.features.slice(0, 3).map((feature) => (
                          <span key={feature} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-md">
                            {feature}
                          </span>
                        ))}
                        {vehicle.features.length > 3 && (
                          <span className="text-xs bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text">
                            +{vehicle.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black font-semibold py-3 px-4 rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group">
                        <Phone className="w-4 h-4 group-hover:animate-pulse" />
                        Call Now
                      </button>
                      <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group border border-slate-600 hover:border-gradient-to-r from-[#d4af37] to-[#f1c85c]">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-slate-600 hover:border-gradient-to-r from-[#d4af37] to-[#f1c85c]">
                Load More Vehicles
              </button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#d4af37]/10 via-[#f1c85c]/5 to-[#d4af37]/10 border-t border-gradient-to-r from-[#d4af37] to-[#f1c85c] mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Can&apos;t Find Your Dream Car?</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Our expert team can help you find the perfect luxury vehicle that matches your preferences and budget.
              </p>
              <button className="bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105">
                Get Personalized Assistance
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
