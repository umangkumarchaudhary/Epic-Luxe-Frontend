"use client";

// PremiumCarFilterClient.tsx - Client Component (Interactive)
import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Filter, X, ChevronDown, ChevronUp, Car, Settings, Zap, Search, SortAsc } from "lucide-react";

interface FiltersState {
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

interface PremiumCarFilterClientProps {
  filters: FiltersState;
  setFilters: (filters: FiltersState) => void;
  onApplyFilters?: () => void;
  currentSort: string;
  setSort: (val: string) => void;
  currentSearch: string;
  setSearch: (val: string) => void;
}

// Constants
const BRANDS = ["Audi", "BMW", "Mercedes", "Lexus", "Tesla"];
const MODELS_BY_BRAND: Record<string, string[]> = {
  Audi: ["A6", "Q5", "RS7"],
  BMW: ["X5", "M3", "i8"],
  Mercedes: ["GLC", "S-Class", "A-Class"],
  Lexus: ["RX", "IS", "NX"],
  Tesla: ["Model S", "Model 3", "Model X"],
};
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];
const TRANSMISSIONS = ["Automatic", "Manual"];
const BODY_TYPES = ["SUV", "Sedan", "Coupe", "Convertible"];
const FEATURES = [
  "Sunroof",
  "Ventilated Seats",
  "HUD",
  "360 Camera",
  "Ambient Lighting",
  "Adaptive Cruise",
  "Lane Assist",
  "Night Vision",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Year: Newest First" },
  { value: "oldest", label: "Year: Oldest First" },
  { value: "priceHigh", label: "Price: High to Low" },
  { value: "priceLow", label: "Price: Low to High" },
];

const MIN_PRICE = 1000000;
const MAX_PRICE = 20000000;
const MIN_YEAR = 2018;
const MAX_YEAR = 2024;
const MIN_MILEAGE = 0;
const MAX_MILEAGE = 100000;

export default function PremiumCarFilterClient({
  filters,
  setFilters,
  onApplyFilters,
  currentSort,
  setSort,
  currentSearch,
  setSearch,
}: PremiumCarFilterClientProps) {
  const [activeSection, setActiveSection] = useState<"essential" | "advanced">("essential");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    brand: true,
    price: true,
    year: false,
    fuel: false,
    transmission: false,
    bodyType: false,
    features: false,
  });

  // Available models based on selected brands
  const availableModels = useMemo(() => {
    if (filters.brand.length === 0) return [];
    const modelsSet = new Set<string>();
    filters.brand.forEach((b) => {
      MODELS_BY_BRAND[b]?.forEach((m) => modelsSet.add(m));
    });
    return Array.from(modelsSet);
  }, [filters.brand]);

  // Toggle array values
  const toggleArrayValue = useCallback(
    (key: keyof FiltersState, value: string | number) => {
      const oldArray = filters[key] as Array<string | number>;
      if (oldArray.includes(value)) {
        setFilters({ ...filters, [key]: oldArray.filter((v) => v !== value) });
      } else {
        setFilters({ ...filters, [key]: [...oldArray, value] });
      }
    },
    [filters, setFilters]
  );

  // Set single value
  const setSingleValue = useCallback(
    <T extends keyof FiltersState>(key: T, value: FiltersState[T]) => {
      setFilters({ ...filters, [key]: value });
    },
    [filters, setFilters]
  );

  // Scroll handler for bottom navigation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsBottomNavVisible(true);
      } else if (currentScrollY <= 50) {
        setIsBottomNavVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      brand: [],
      model: [],
      priceMin: MIN_PRICE,
      priceMax: MAX_PRICE,
      yearMin: MIN_YEAR,
      yearMax: MAX_YEAR,
      fuelType: [],
      transmission: [],
      mileageMin: MIN_MILEAGE,
      mileageMax: MAX_MILEAGE,
      ownership: [],
      bodyType: [],
      driveType: [],
      seatingCapacity: [],
      colorExterior: null,
      colorInterior: null,
      engineMin: 0,
      engineMax: 6,
      horsepowerMin: 0,
      horsepowerMax: 1000,
      condition: null,
      features: [],
    });
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    setIsFilterOpen(false);
    onApplyFilters?.();
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += filters.brand.length;
    count += filters.model.length;
    count += filters.fuelType.length;
    count += filters.transmission.length;
    count += filters.bodyType.length;
    count += filters.features.length;
    if (filters.priceMin !== MIN_PRICE || filters.priceMax !== MAX_PRICE) count++;
    if (filters.yearMin !== MIN_YEAR || filters.yearMax !== MAX_YEAR) count++;
    return count;
  }, [filters]);

  // Format price
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    }
    return `₹${(price / 100000).toFixed(0)}L`;
  };

  // Mercedes-style Dual Range Slider
  interface DualRangeSliderProps {
    min: number;
    max: number;
    step: number;
    minVal: number;
    maxVal: number;
    onChangeMin: (v: number) => void;
    onChangeMax: (v: number) => void;
    label: string;
    formatter?: (value: number) => string;
  }

  function DualRangeSlider({
    min,
    max,
    step,
    minVal,
    maxVal,
    onChangeMin,
    onChangeMax,
    label,
    formatter,
  }: DualRangeSliderProps) {
    const minPercent = ((minVal - min) / (max - min)) * 100;
    const maxPercent = ((maxVal - min) / (max - min)) * 100;

    return (
      <div className="mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
        <div className="text-xs font-medium mb-3 text-black/80 tracking-wider">{label}</div>
        <div className="relative h-1 bg-black/10 rounded-none">
          <div
            className="absolute h-1 bg-black rounded-none"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            onChange={(e) => onChangeMin(Number(e.target.value))}
            className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            onChange={(e) => onChangeMax(Number(e.target.value))}
            className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
        <div className="flex justify-between text-xs text-black/60 mt-2">
          <span>{formatter ? formatter(minVal) : minVal}</span>
          <span>{formatter ? formatter(maxVal) : maxVal}</span>
        </div>
      </div>
    );
  }

  // Collapsible Section Component
  const CollapsibleSection = ({ 
    title, 
    isExpanded, 
    onToggle, 
    children, 
    icon 
  }: { 
    title: string; 
    isExpanded: boolean; 
    onToggle: () => void; 
    children: React.ReactNode;
    icon?: React.ReactNode;
  }) => (
    <div className="border-b border-black/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-black/[0.02] transition-colors duration-200"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-black/60">{icon}</span>}
          <span className="text-sm font-medium text-black">{title}</span>
        </div>
        {isExpanded ? 
          <ChevronUp className="w-4 h-4 text-black/40" /> : 
          <ChevronDown className="w-4 h-4 text-black/40" />
        }
      </button>
      {isExpanded && (
        <div className="pb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
          {children}
        </div>
      )}
    </div>
  );

  // Filter Content
  const FilterContent = () => (
    <div className="space-y-0">
      {/* Essential/Advanced Tabs */}
      <div className="flex border-b border-black/10 mb-4">
        <button
          className={`flex-1 py-3 px-1 text-sm font-medium transition-colors ${
            activeSection === "essential" 
              ? "text-black border-b-2 border-black" 
              : "text-black/40 hover:text-black"
          }`}
          onClick={() => setActiveSection("essential")}
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          ESSENTIAL
        </button>
        <button
          className={`flex-1 py-3 px-1 text-sm font-medium transition-colors ${
            activeSection === "advanced" 
              ? "text-black border-b-2 border-black" 
              : "text-black/40 hover:text-black"
          }`}
          onClick={() => setActiveSection("advanced")}
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          ADVANCED
        </button>
      </div>

      {activeSection === "essential" && (
        <div className="space-y-0">
          {/* Brand */}
          <CollapsibleSection
            title="BRAND"
            isExpanded={expandedSections.brand}
            onToggle={() => toggleSection("brand")}
            icon={<Car className="w-4 h-4" />}
          >
            <div className="grid grid-cols-1 gap-2">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  className={`px-4 py-3 text-sm transition-all duration-200 text-left ${
                    filters.brand.includes(brand)
                      ? "bg-black text-white"
                      : "bg-white border border-black/20 text-black hover:border-black"
                  }`}
                  onClick={() => toggleArrayValue("brand", brand)}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {brand}
                </button>
              ))}
            </div>
          </CollapsibleSection>

          {/* Model */}
          {availableModels.length > 0 && (
            <CollapsibleSection
              title="MODEL"
              isExpanded={expandedSections.model}
              onToggle={() => toggleSection("model")}
            >
              <div className="grid grid-cols-1 gap-2">
                {availableModels.map((model) => (
                  <button
                    key={model}
                    className={`px-4 py-3 text-sm transition-all duration-200 text-left ${
                      filters.model.includes(model)
                        ? "bg-black text-white"
                        : "bg-white border border-black/20 text-black hover:border-black"
                    }`}
                    onClick={() => toggleArrayValue("model", model)}
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Price Range */}
          <CollapsibleSection
            title="PRICE RANGE"
            isExpanded={expandedSections.price}
            onToggle={() => toggleSection("price")}
          >
            <DualRangeSlider
              label=""
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={100000}
              minVal={filters.priceMin}
              maxVal={filters.priceMax}
              formatter={formatPrice}
              onChangeMin={(v) => setSingleValue("priceMin", v)}
              onChangeMax={(v) => setSingleValue("priceMax", v)}
            />
          </CollapsibleSection>

          {/* Year Range */}
          <CollapsibleSection
            title="YEAR"
            isExpanded={expandedSections.year}
            onToggle={() => toggleSection("year")}
          >
            <DualRangeSlider
              label=""
              min={MIN_YEAR}
              max={MAX_YEAR}
              step={1}
              minVal={filters.yearMin}
              maxVal={filters.yearMax}
              onChangeMin={(v) => setSingleValue("yearMin", v)}
              onChangeMax={(v) => setSingleValue("yearMax", v)}
            />
          </CollapsibleSection>

          {/* Fuel Type */}
          <CollapsibleSection
            title="FUEL TYPE"
            isExpanded={expandedSections.fuel}
            onToggle={() => toggleSection("fuel")}
            icon={<Zap className="w-4 h-4" />}
          >
            <div className="space-y-3">
              {FUEL_TYPES.map((ft) => (
                <label key={ft} className="flex items-center text-sm cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.fuelType.includes(ft)}
                    onChange={() => toggleArrayValue("fuelType", ft)}
                    className="mr-3 w-4 h-4 accent-black"
                  />
                  <span className="text-black/70 group-hover:text-black transition-colors"
                        style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {ft}
                  </span>
                </label>
              ))}
            </div>
          </CollapsibleSection>

          {/* Transmission */}
          <CollapsibleSection
            title="TRANSMISSION"
            isExpanded={expandedSections.transmission}
            onToggle={() => toggleSection("transmission")}
            icon={<Settings className="w-4 h-4" />}
          >
            <div className="space-y-3">
              {TRANSMISSIONS.map((t) => (
                <label key={t} className="flex items-center text-sm cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.transmission.includes(t)}
                    onChange={() => toggleArrayValue("transmission", t)}
                    className="mr-3 w-4 h-4 accent-black"
                  />
                  <span className="text-black/70 group-hover:text-black transition-colors"
                        style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {t}
                  </span>
                </label>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      )}

      {activeSection === "advanced" && (
        <div className="space-y-0">
          {/* Body Type */}
          <CollapsibleSection
            title="BODY TYPE"
            isExpanded={expandedSections.bodyType}
            onToggle={() => toggleSection("bodyType")}
          >
            <div className="grid grid-cols-2 gap-2">
              {BODY_TYPES.map((b) => (
                <button
                  key={b}
                  className={`px-3 py-2 text-sm transition-all duration-200 ${
                    filters.bodyType.includes(b)
                      ? "bg-black text-white"
                      : "bg-white border border-black/20 text-black hover:border-black"
                  }`}
                  onClick={() => toggleArrayValue("bodyType", b)}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {b}
                </button>
              ))}
            </div>
          </CollapsibleSection>

          {/* Features */}
          <CollapsibleSection
            title="PREMIUM FEATURES"
            isExpanded={expandedSections.features}
            onToggle={() => toggleSection("features")}
          >
            <div className="grid grid-cols-1 gap-2">
              {FEATURES.map((f) => (
                <button
                  key={f}
                  className={`px-4 py-3 text-sm transition-all duration-200 text-left ${
                    filters.features.includes(f)
                      ? "bg-black text-white"
                      : "bg-white border border-black/20 text-black hover:border-black"
                  }`}
                  onClick={() => toggleArrayValue("features", f)}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {f}
                </button>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-6 space-y-3 border-t border-black/10">
        <button
          onClick={clearAllFilters}
          className="w-full py-3 text-sm border border-black/20 text-black hover:bg-black/5 transition-all duration-200"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          CLEAR ALL
        </button>
        <button
          onClick={handleApplyFilters}
          className="w-full py-3 text-sm bg-black text-white hover:bg-black/90 transition-all duration-200"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          APPLY FILTERS
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Sidebar */}
      <div className="hidden md:block h-full bg-white">
        <div className="sticky top-0 h-screen overflow-y-auto border-r border-black/10">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-light text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Filters
              </h2>
              {activeFilterCount > 0 && (
                <span className="bg-black text-white text-xs px-2 py-1 font-medium"
                      style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {activeFilterCount}
                </span>
              )}
            </div>
            <FilterContent />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isBottomNavVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="bg-white border-t border-black/10">
          <div className="grid grid-cols-3 gap-0">
            {/* Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex flex-col items-center justify-center py-3 px-2 text-black hover:bg-black/5 transition-all duration-200 border-r border-black/10"
              aria-label="Search"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <Search className="w-5 h-5 mb-1" />
              <span className="text-xs">Search</span>
            </button>

            {/* Sort Button */}
            <button
              onClick={() => setSortModalOpen(true)}
              className="flex flex-col items-center justify-center py-3 px-2 text-black hover:bg-black/5 transition-all duration-200 border-r border-black/10"
              aria-label="Sort"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <SortAsc className="w-5 h-5 mb-1" />
              <span className="text-xs">Sort</span>
            </button>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex flex-col items-center justify-center py-3 px-2 text-black hover:bg-black/5 transition-all duration-200 relative"
              aria-label="Open Filters"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <Filter className="w-5 h-5 mb-1" />
              <span className="text-xs">Filter</span>
              {activeFilterCount > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="md:hidden fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm">
          <div className="flex items-end h-full">
            <div className="w-full bg-white max-h-[70vh] overflow-y-auto animate-slideUp">
              {/* Search Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/10">
                <h2 className="text-lg font-light text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Search Vehicles
                </h2>
                <button
                  onClick={() => setSearchModalOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors"
                  aria-label="Close Search"
                >
                  <X className="w-5 h-5 text-black/60" />
                </button>
              </div>

              {/* Search Modal Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-black/60 mb-3 block tracking-wider"
                           style={{ fontFamily: 'Manrope, sans-serif' }}>
                      SEARCH BY KEYWORD
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black/40" />
                      <input
                        type="text"
                        placeholder="Brand, model, year..."
                        value={currentSearch}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-black/20 text-black placeholder-black/40 focus:outline-none focus:border-black"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                        autoFocus
                      />
                    </div>
                  </div>

                  {currentSearch && (
                    <button
                      onClick={() => setSearch("")}
                      className="text-xs text-black/60 hover:text-black transition-colors"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      Clear search
                    </button>
                  )}

                  <button
                    onClick={() => setSearchModalOpen(false)}
                    className="w-full py-3 text-sm bg-black text-white hover:bg-black/90 transition-all duration-200"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sort Modal */}
      {sortModalOpen && (
        <div className="md:hidden fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm">
          <div className="flex items-end h-full">
            <div className="w-full bg-white max-h-[70vh] overflow-y-auto animate-slideUp">
              {/* Sort Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/10">
                <h2 className="text-lg font-light text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Sort By
                </h2>
                <button
                  onClick={() => setSortModalOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors"
                  aria-label="Close Sort"
                >
                  <X className="w-5 h-5 text-black/60" />
                </button>
              </div>

              {/* Sort Modal Content */}
              <div className="p-6">
                <div className="space-y-2">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSort(option.value);
                        setSortModalOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 transition-all duration-200 ${
                        currentSort === option.value
                          ? "bg-black text-white"
                          : "bg-white border border-black/20 text-black hover:border-black"
                      }`}
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="text-sm">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="md:hidden fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm">
          <div className="flex items-end h-full">
            <div className="w-full bg-white max-h-[90vh] overflow-y-auto animate-slideUp">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/10 sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-light text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Filters
                  </h2>
                  {activeFilterCount > 0 && (
                    <span className="bg-black text-white text-xs px-2 py-1 font-medium"
                          style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors"
                  aria-label="Close Filters"
                >
                  <X className="w-5 h-5 text-black/60" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 pb-8">
                <FilterContent />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline Styles for Animations */}
      <style jsx>{`
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
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        /* Custom scrollbar for desktop */
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

        /* Checkbox custom styling */
        input[type="checkbox"] {
          appearance: none;
          width: 16px;
          height: 16px;
          border: 1px solid rgba(0, 0, 0, 0.3);
          background: white;
          position: relative;
          cursor: pointer;
          transition: all 0.2s;
        }

        input[type="checkbox"]:checked {
          background: black;
          border-color: black;
        }

        input[type="checkbox"]:checked::after {
          content: '';
          position: absolute;
          left: 4px;
          top: 1px;
          width: 6px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        input[type="checkbox"]:hover {
          border-color: black;
        }

        /* Range slider custom styling */
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: black;
          cursor: pointer;
          border-radius: 50%;
          margin-top: -6px;
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: black;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }

        /* Focus states */
        button:focus-visible,
        input:focus-visible {
          outline: 2px solid black;
          outline-offset: 2px;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-slideUp {
            animation: none;
          }
          
          .transition-all,
          .transition-colors,
          .transition-transform {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}