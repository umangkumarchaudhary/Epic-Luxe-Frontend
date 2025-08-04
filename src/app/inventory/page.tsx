'use client';

import React, { useState, useEffect } from 'react';
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
  Calculator,
  MessageCircle,
  Star,
  Shield,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  GitCompare,
  Play,
  Award,
  TrendingUp,
  CheckCircle,
  Mail,
  Bell,
} from 'lucide-react';

import { vehicleData } from '@/data/carInventory';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// Make sure to import the CompareModal component correctly:
import CompareModal from './components/CompareDrawer';

const getBadgeColor = (condition?: string) => {
  const colors: Record<string, string> = {
    Excellent: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    Good: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white',
    Fair: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
  };
  return condition ? colors[condition] || 'bg-gray-200 text-gray-800' : '';
};

const filterOptions = {
  brands: [
    'All Brands',
    'Mercedes-Benz',
    'BMW',
    'Audi',
    'Jaguar',
    'Volvo',
    'Land Rover',
    'McLaren',
    'Porsche',
  ],
  priceRanges: ['All Prices', '₹20L - ₹35L', '₹35L - ₹50L', '₹50L - ₹75L', '₹75L+'],
  years: ['All Years', '2024', '2023', '2022', '2021', '2020', '2019'],
  fuelTypes: ['All Fuel Types', 'Petrol', 'Diesel', 'Hybrid', 'Electric'],
  cities: ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'],
};

interface Car {
  id: number | string;
  brand: string;
  model: string;
  price: string;
  year: number;
  mileage: string;
  image: string;
  fuelType?: string;
  seating?: number;
  transmission?: string;
  color?: string;
  features?: string[];
  condition?: string;
  savings?: string;
  isLiked?: boolean;
  views?: number;
  location?: string;
  originalPrice?: string;
}

export default function EnhancedInventoryPage() {
  const [vehicles, setVehicles] = useState<Car[]>(vehicleData);
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

  // New state for enhanced features
  const [showEMIModal, setShowEMIModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [compareList, setCompareList] = useState<Car[]>([]);
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);
  const [favorites, setFavorites] = useState<(number | string)[]>([]);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleLike = (id: number | string) => {
    setVehicles((vehicles) =>
      vehicles.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, isLiked: !vehicle.isLiked } : vehicle
      )
    );
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const addToCompare = (car: Car) => {
    if (
      compareList.length < 3 &&
      !compareList.find((c) => c.id === car.id)
    ) {
      setCompareList([...compareList, car]);
    }
  };

  const removeFromCompare = (carId: number | string) => {
    setCompareList((prev) => prev.filter((car) => car.id !== carId));
  };

  const openEMIModal = (car: Car) => {
    setSelectedCar(car);
    setShowEMIModal(true);
  };

  const formatPrice = (priceStr: string) => {
    const numericValue = priceStr.replace(/[₹,]/g, '');
    const lakhs = parseInt(numericValue) / 100000;
    return `₹${lakhs.toFixed(1)}L`;
  };

  // After your imports, before EnhancedInventoryPage




  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand =
      filters.brand === 'All Brands' || vehicle.brand === filters.brand;
    const matchesFuel =
      filters.fuelType === 'All Fuel Types' || vehicle.fuelType === filters.fuelType;
    const matchesYear =
      filters.year === 'All Years' || vehicle.year.toString() === filters.year;

    return matchesSearch && matchesBrand && matchesFuel && matchesYear;
  });

  // EMI Calculator Modal component (kept as-is, minimal changes)
  const EMIModal = () => {
    const [loanAmount, setLoanAmount] = useState(
      selectedCar ? parseInt(selectedCar.price.replace(/[₹,]/g, '')) * 0.8 : 0
    );
    const [downPayment, setDownPayment] = useState(
      selectedCar ? parseInt(selectedCar.price.replace(/[₹,]/g, '')) * 0.2 : 0
    );
    const [tenure, setTenure] = useState(60);
    const [interestRate, setInterestRate] = useState(8.5);

    const calculateEMI = () => {
      const principal = loanAmount;
      const monthlyRate = interestRate / 12 / 100;
      const months = tenure;

      const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

      return isNaN(emi) ? 0 : Math.round(emi);
    };

    if (!showEMIModal || !selectedCar) return null;

    const carPrice = parseInt(selectedCar.price.replace(/[₹,]/g, ''));

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">EMI Calculator</h3>
            <button
              onClick={() => setShowEMIModal(false)}
              className="text-slate-400 hover:text-white"
              aria-label="Close EMI Modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Car Price
              </label>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text">
                {selectedCar.price}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Down Payment
              </label>
              <input
                type="range"
                min={carPrice * 0.1}
                max={carPrice * 0.5}
                step={10000}
                value={downPayment}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setDownPayment(val);
                  setLoanAmount(carPrice - val);
                }}
                className="w-full accent-yellow-500"
              />
              <div className="flex justify-between text-sm text-slate-400 mt-1">
                <span>₹{(downPayment / 100000).toFixed(1)}L</span>
                <span>{Math.round((downPayment / carPrice) * 100)}%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Loan Tenure
              </label>
              <select
                value={tenure}
                onChange={(e) => setTenure(parseInt(e.target.value))}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-3 py-2 text-white"
              >
                <option value={36}>3 Years</option>
                <option value={48}>4 Years</option>
                <option value={60}>5 Years</option>
                <option value={72}>6 Years</option>
                <option value={84}>7 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Interest Rate
              </label>
              <input
                type="range"
                min={7}
                max={15}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full accent-yellow-500"
              />
              <div className="text-center text-sm text-slate-400 mt-1">
                {interestRate}% per annum
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-500/30">
              <div className="text-center">
                <div className="text-sm text-slate-300">Monthly EMI</div>
                <div className="text-3xl font-bold text-green-400">
                  ₹{calculateEMI().toLocaleString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowEMIModal(false)}
                className="border border-slate-600 text-slate-300 font-medium py-3 px-4 rounded-xl hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
              <button className="bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black font-bold py-3 px-4 rounded-xl transition-all duration-300">
                Apply for Loan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Detailed Compare Popup inside this file (since CompareModal does not include this part)
  interface ComparisonRowProps {
    label: string;
    values: string[];
  }
  function ComparisonRow({ label, values }: ComparisonRowProps) {
    return (
      <tr className="border border-slate-700">
        <td className="border border-slate-700 font-semibold bg-slate-800 px-4 py-2 text-left sticky left-0 z-10">
          {label}
        </td>
        {values.map((value, idx) => (
          <td
            key={idx}
            className="border border-slate-700 px-4 py-2 text-center whitespace-nowrap"
          >
            {value}
          </td>
        ))}
      </tr>
    );
  }

  // Handler for showing detailed comparison popup:
  // We'll pass the button handler from the compare drawer to here:
  const onViewDetailedComparisonClick = () => {
    setShowDetailPopup(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl font-light">
            Loading Premium Collection...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <div className="pt-20">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse bg-gradient-to-r from-[#d4af37]/10 to-[#f1c85c]/10" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 bg-gradient-to-r from-[#d4af37]/10 to-[#f1c85c]/10" />
        </div>

        <div className="relative z-10">
          {/* Hero Header */}
          <div className="bg-gradient-to-r from-slate-800/80 via-slate-700/80 to-slate-800/80 backdrop-blur-sm border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text">
                Premium Collection
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Discover exceptional pre-owned luxury vehicles, meticulously
                curated for the discerning enthusiast
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#d4af37] mb-1">500+</div>
                  <div className="text-sm text-slate-400">Luxury Cars Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">4.9★</div>
                  <div className="text-sm text-slate-400">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">24H</div>
                  <div className="text-sm text-slate-400">Quick Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">100%</div>
                  <div className="text-sm text-slate-400">Verified Cars</div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Search and Filter Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-8">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 min-w-72">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by brand, model, or features..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search cars"
                  />
                </div>

                {/* Filter & View Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white hover:bg-slate-600/50 transition-all duration-300"
                    aria-expanded={isFilterOpen}
                    aria-controls="filter-section"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {Object.values(filters).some(
                      (f) =>
                        f !== 'All Brands' &&
                        f !== 'All Prices' &&
                        f !== 'All Years' &&
                        f !== 'All Fuel Types' &&
                        f !== 'All Cities'
                    ) && (
                      <span className="bg-[#d4af37] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        !
                      </span>
                    )}
                  </button>

                  <div className="flex rounded-xl border border-slate-600/50 overflow-hidden bg-slate-700/50" role="group" aria-label="View mode">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 transition-all duration-300 ${
                        viewMode === 'grid'
                          ? 'bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black'
                          : 'text-slate-300 hover:text-white'
                      }`}
                      aria-pressed={viewMode === 'grid'}
                      aria-label="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 transition-all duration-300 ${
                        viewMode === 'list'
                          ? 'bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black'
                          : 'text-slate-300 hover:text-white'
                      }`}
                      aria-pressed={viewMode === 'list'}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Filter Options */}
              {isFilterOpen && (
                <div
                  id="filter-section"
                  className="mt-6 pt-6 border-t border-slate-700/50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                    {Object.entries(filterOptions).map(([key, options]) => (
                      <select
                        key={key}
                        className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                        value={filters[key]}
                        onChange={(e) =>
                          setFilters({ ...filters, [key]: e.target.value })
                        }
                        aria-label={`Filter by ${key}`}
                      >
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>

                  {/* Price Range slider */}
                  <div className="mt-4">
                    <label
                      htmlFor="budget-range"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Budget Range
                    </label>
                    <div className="px-3">
                      <input
                        id="budget-range"
                        type="range"
                        min={2000000}
                        max={10000000}
                        step={500000}
                        value={filters.priceRange !== 'All Prices'
                          ? parseInt(filters.priceRange.replace(/[₹\sL-]/g, '')) * 100000
                          : 8000000}
                        onChange={(e) => {
                          // For simplicity, skipping complex parsing and using max filter
                          setFilters({
                            ...filters,
                            priceRange: `₹20L - ₹${(parseInt(e.target.value) / 100000).toFixed(0)}L`,
                          });
                        }}
                        className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                      />
                      <div className="flex justify-between text-sm text-slate-400 mt-1">
                        <span>₹20L</span>
                        <span>
                          {
                            filters.priceRange !== 'All Prices'
                              ? filters.priceRange.split('-')[1].trim()
                              : '₹80L+'
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() =>
                        setFilters({
                          brand: 'All Brands',
                          priceRange: 'All Prices',
                          year: 'All Years',
                          fuelType: 'All Fuel Types',
                          city: 'All Cities',
                        })
                      }
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Clear All Filters
                    </button>
                    <button className="bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-all">
                      Apply Filters
                    </button>
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
                {favorites.length > 0 && (
                  <span className="ml-4 text-sm">
                    • <span className="text-red-400">{favorites.length}</span> favorites
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="sort-select" className="sr-only">
                  Sort By
                </label>
                <select
                  id="sort-select"
                  className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="year-new">Year: Newest First</option>
                  <option value="mileage-low">Mileage: Low to High</option>
                  <option value="popular">Most Popular</option>
                </select>

                {compareList.length > 0 && (
                  <button
                    onClick={() => setShowCompareDrawer(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    aria-haspopup="dialog"
                    aria-expanded={showCompareDrawer}
                  >
                    <GitCompare className="w-4 h-4" />
                    Compare ({compareList.length})
                  </button>
                )}
              </div>
            </div>

            {/* Vehicle Grid/List */}
            <div
              className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}
            >
              {filteredVehicles.map((vehicle, index) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  index={index}
                  toggleLike={toggleLike}
                  addToCompare={addToCompare}
                  openEMIModal={openEMIModal}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-slate-600 hover:border-[#d4af37] flex items-center gap-2 mx-auto">
                <TrendingUp className="w-4 h-4" />
                Load More Vehicles
              </button>
            </div>
          </div>

          {/* Expert Consultation Section */}
          <div className="bg-gradient-to-r from-slate-800/80 via-slate-700/80 to-slate-800/80 backdrop-blur-sm border-y border-slate-700 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:flex-1 text-center lg:text-left mb-8 lg:mb-0">
                  <h3 className="text-3xl font-bold text-white mb-4">Need Expert Guidance?</h3>
                  <p className="text-slate-300 mb-6 text-lg">
                    Our luxury car specialists are here to help you find the perfect match
                  </p>
                  <div className="flex items-center justify-center lg:justify-start space-x-6">
                    <AdvisorCard
                      name="Rajesh Kumar"
                      title="Senior Car Advisor"
                      rating={4.9}
                      reviewsCount={200}
                    />
                    <AdvisorCard name="Priya Sharma" title="Finance Expert" rating={4.8} reviewsCount={150} />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Now
                  </button>
                  <button className="bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black font-bold py-4 px-6 rounded-xl hover:opacity-90 transition-all flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call Expert
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter CTA Section */}
          <div className="bg-gradient-to-r from-[#d4af37]/10 via-[#f1c85c]/5 to-[#d4af37]/10 border-t border-slate-700 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Can't Find Your Dream Car?</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Get notified when new luxury cars matching your preferences arrive in our inventory.
              </p>
              <div className="max-w-md mx-auto flex gap-3 mb-8">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  aria-label="Email to notify me"
                />
                <button
                  onClick={() => setShowNewsletterModal(true)}
                  className="bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Notify Me
                </button>
              </div>
              <div className="flex justify-center items-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No spam, unsubscribe anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-400" />
                  <span>Instant notifications</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Sticky Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-800 to-slate-900 border-t border-slate-700 p-4 z-40 backdrop-blur-sm">
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex flex-col items-center py-2 px-3 bg-slate-700/50 text-slate-300 rounded-lg transition-all relative"
            aria-label="Open Filters"
          >
            <Filter className="w-5 h-5 mb-1" />
            <span className="text-xs">Filter</span>
            {Object.values(filters).some(
              (f) =>
                f !== 'All Brands' &&
                f !== 'All Prices' &&
                f !== 'All Years' &&
                f !== 'All Fuel Types' &&
                f !== 'All Cities'
            ) && (
              <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                !
              </span>
            )}
          </button>
          <button
            className="flex flex-col items-center py-2 px-3 bg-green-600 text-white rounded-lg transition-all"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5 mb-1" />
            <span className="text-xs">WhatsApp</span>
          </button>
          <button
            className="flex flex-col items-center py-2 px-3 bg-blue-600 text-white rounded-lg transition-all"
            aria-label="Call"
          >
            <Phone className="w-5 h-5 mb-1" />
            <span className="text-xs">Call</span>
          </button>
          <button
            onClick={() => setShowNewsletterModal(true)}
            className="flex flex-col items-center py-2 px-3 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black rounded-lg transition-all"
            aria-label="Alerts"
          >
            <Bell className="w-5 h-5 mb-1" />
            <span className="text-xs">Alerts</span>
          </button>
        </div>
      </div>

      {/* Modals and Drawers */}
      <EMIModal />
      {/* Use CompareModal with additional prop for detailed comparison button */}
      <CompareModal
        compareList={compareList}
        showCompareDrawer={showCompareDrawer}
        onClose={() => setShowCompareDrawer(false)}
        removeFromCompare={removeFromCompare}
      >
        {/* Render the button inside CompareModal to trigger detailed popup */}
        <button
          onClick={onViewDetailedComparisonClick}
          className="bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2"
          aria-label="View Detailed Comparison"
        >
          View Detailed Comparison
          <GitCompare className="w-4 h-4 inline" />
        </button>
      </CompareModal>

      {/* Detailed Comparison Popup */}
      {showDetailPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4 overflow-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="detailed-comparison-title"
        >
          <div className="relative max-w-6xl w-full bg-slate-900 rounded-2xl shadow-lg p-6 overflow-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h2
                id="detailed-comparison-title"
                className="text-2xl font-bold text-white"
              >
                Detailed Car Comparison
              </h2>
              <button
                onClick={() => setShowDetailPopup(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full"
                aria-label="Close Detailed Comparison"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Responsive horizontal scroll container */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-slate-700 text-white">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="sticky top-0 border border-slate-700 px-4 py-2 text-left min-w-[140px] bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black">
                      Feature
                    </th>
                    {compareList.map((car) => (
                      <th
                        key={car.id}
                        className="sticky top-0 border border-slate-700 px-4 py-2 min-w-[220px] text-center bg-slate-700"
                      >
                        <div className="font-semibold mb-2">
                          {car.brand} {car.model}
                        </div>
                        <img
                          src={car.image}
                          alt={`${car.brand} ${car.model}`}
                          className="mx-auto h-20 w-auto object-contain rounded-lg"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                              'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop';
                          }}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Display rows comparing key specs */}
                  <ComparisonRow
                    label="Price"
                    values={compareList.map((c) => c.price)}
                  />
                  <ComparisonRow
                    label="Year"
                    values={compareList.map((c) => c.year.toString())}
                  />
                  <ComparisonRow
                    label="Mileage"
                    values={compareList.map((c) => c.mileage)}
                  />
                  <ComparisonRow
                    label="Fuel Type"
                    values={compareList.map((c) => c.fuelType || '-')}
                  />
                  <ComparisonRow
                    label="Seating Capacity"
                    values={compareList.map((c) =>
                      c.seating ? c.seating.toString() : '-'
                    )}
                  />
                  <ComparisonRow
                    label="Transmission"
                    values={compareList.map((c) => c.transmission || '-')}
                  />
                  <ComparisonRow
                    label="Color"
                    values={compareList.map((c) => c.color || '-')}
                  />
                  {/* Add more rows here if you want */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Floating Compare Button */}
      {compareList.length > 0 && (
        <button
          onClick={() => setShowCompareDrawer(true)}
          className="hidden lg:flex fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 items-center gap-2 z-30"
          aria-haspopup="dialog"
          aria-expanded={showCompareDrawer}
        >
          <GitCompare className="w-5 h-5" />
          Compare ({compareList.length})
        </button>
      )}

      <Footer />

      {/* Keyframe Animations */}
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

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

// Component for vehicle card used in the listing
interface VehicleCardProps {
  vehicle: Car;
  index: number;
  toggleLike: (id: number | string) => void;
  addToCompare: (car: Car) => void;
  openEMIModal: (car: Car) => void;
}
const VehicleCard = ({
  vehicle,
  index,
  toggleLike,
  addToCompare,
  openEMIModal,
}: VehicleCardProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Mock multiple images if needed
  const images = vehicle.features && vehicle.features.length > 0 ? [vehicle.image] : [vehicle.image];

  return (
    <div
      className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-gradient-to-r from-[#d4af37] to-[#f1c85c] transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10 hover:-translate-y-1"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-64 w-full">
        <img
          src={images[imageIndex]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop';
          }}
        />
        {/* Image Navigation - included if images more than 1 */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
              }
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
              }
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next Image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === imageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Select image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Play Button Overlay */}
        <div
          className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors" aria-label="Play video">
            <Play className="w-6 h-6 text-gray-800 ml-1" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {vehicle.condition && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(vehicle.condition)}`}>
              {vehicle.condition}
            </span>
          )}
          {vehicle.savings && (
            <span className="bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black px-2 py-1 rounded-full text-xs font-bold">
              Save {vehicle.savings}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <button
            onClick={() => toggleLike(vehicle.id)}
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
            aria-pressed={vehicle.isLiked || false}
            aria-label={`${vehicle.isLiked ? 'Unlike' : 'Like'} ${vehicle.brand} ${vehicle.model}`}
          >
            <Heart
              className={`w-4 h-4 ${
                vehicle.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
          <button
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Views Counter */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm" aria-label="Number of views">
          <Eye className="w-3 h-3" />
          {vehicle.views?.toLocaleString()}
        </div>
      </div>

      {/* Content Section */}
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
            {vehicle.originalPrice && (
              <div className="text-sm text-slate-400 line-through">
                MRP: {vehicle.originalPrice}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Verified</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>Premium</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-medium">4.{Math.floor(Math.random() * 9) + 1}</span>
          </div>
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-[#d4af37]" />
            {vehicle.mileage}
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="w-4 h-4 text-[#d4af37]" />
            {vehicle.fuelType}
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#d4af37]" />
            {vehicle.seating} Seater
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#d4af37]" />
            {vehicle.location?.split(',')[0]}
          </div>
        </div>

        {/* Features */}
        {vehicle.features && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {vehicle.features.slice(0, 3).map((feature) => (
                <span
                  key={feature}
                  className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-md"
                >
                  {feature}
                </span>
              ))}
              {vehicle.features.length > 3 && (
                <span className="text-xs bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text font-medium">
                  +{vehicle.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* EMI Section */}
        <div className="mb-4 p-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-slate-400">EMI from</span>
              <div className="text-lg font-bold text-blue-400">
                ₹
                {Math.round(parseInt(vehicle.price.replace(/[₹,]/g, '')) * 0.8 * 0.01).toLocaleString()}
                /mo
              </div>
            </div>
            <button
              onClick={() => openEMIModal(vehicle)}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
              aria-label={`Calculate EMI for ${vehicle.brand} ${vehicle.model}`}
            >
              <Calculator className="w-4 h-4 mr-1" />
              Calculate
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              className="bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black font-semibold py-3 px-4 rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group"
              aria-label={`Call for ${vehicle.brand} ${vehicle.model}`}
            >
              <Phone className="w-4 h-4 group-hover:animate-pulse" />
              Call Now
            </button>
            <button
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group border border-slate-600"
              aria-label={`View details for ${vehicle.brand} ${vehicle.model}`}
            >
              View Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="border border-slate-600 hover:border-slate-500 text-slate-300 font-medium py-2.5 px-4 rounded-xl transition-all duration-300" aria-label="Reserve for 48 hours">
              Reserve 48H
            </button>
            <button
              onClick={() => addToCompare(vehicle)}
              className="border border-slate-600 hover:border-slate-500 text-slate-300 font-medium py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              aria-label={`Add ${vehicle.brand} ${vehicle.model} to Compare`}
            >
              <GitCompare className="w-4 h-4" />
              Compare
            </button>
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            aria-label={`WhatsApp expert for ${vehicle.brand} ${vehicle.model}`}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Expert
          </button>
        </div>

        {/* Trust Footer */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Luxe Verified</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Delivery in 24H</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Advisor Card component (for expert consultation UI)
interface AdvisorCardProps {
  name: string;
  title: string;
  rating: number;
  reviewsCount: number;
}
const AdvisorCard = ({ name, title, rating, reviewsCount }: AdvisorCardProps) => (
  <div className="text-center">
    <img
      src="/api/placeholder/80/80"
      alt={`${name} - ${title}`}
      className="w-16 h-16 rounded-full border-3 border-[#d4af37] mx-auto mb-2"
    />
    <div className="font-semibold text-white">{name}</div>
    <div className="text-sm text-slate-400">{title}</div>
    <div className="flex items-center justify-center text-yellow-400 text-sm mt-1">
      <Star className="w-4 h-4 fill-current mr-1" />
      {rating.toFixed(1)} ({reviewsCount}+ consultations)
    </div>
  </div>
);
