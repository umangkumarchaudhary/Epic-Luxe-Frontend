"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Filter, X, ChevronDown, ChevronUp, Car, Settings, Palette, Zap, Search, SortAsc } from "lucide-react";

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

interface PremiumCarFilterProps {
  filters: FiltersState;
  setFilters: (filters: FiltersState) => void;
  onApplyFilters?: () => void;
  currentSort: string;
  setSort: (val: string) => void;
  currentSearch: string;
  setSearch: (val: string) => void;
}

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
const COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#ffffff" },
  { name: "Red", hex: "#f87171" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Silver", hex: "#cbd5e1" },
  { name: "Beige", hex: "#f5f5dc" },
];
const FEATURES = [
  "Sunroof",
  "Ventilated Seats",
  "HUD",
  "360 Camera",
  "Ambient Lighting",
  "Adaptive Cruise Control",
  "Lane Keep Assist",
  "Night Vision",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Year: Newest to Oldest" },
  { value: "oldest", label: "Year: Oldest to Newest" },
  { value: "priceHigh", label: "Price: High to Low" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "horsepowerHigh", label: "Horsepower: High to Low" },
  { value: "horsepowerLow", label: "Horsepower: Low to High" },
  { value: "brandAZ", label: "Brand: A to Z" },
  { value: "brandZA", label: "Brand: Z to A" },
];

const MIN_PRICE = 1000000; // Rs. 10 Lakhs
const MAX_PRICE = 20000000; // Rs. 2 Crore
const MIN_YEAR = 2018;
const MAX_YEAR = 2024;
const MIN_MILEAGE = 0;
const MAX_MILEAGE = 100000;
const MIN_ENGINE = 0;
const MAX_ENGINE = 6;
const MIN_HP = 0;
const MAX_HP = 1000;

const goldColor = "#d4af37";

export default function PremiumCarFilter({
  filters,
  setFilters,
  onApplyFilters,
  currentSort,
  setSort,
  currentSearch,
  setSearch,
}: PremiumCarFilterProps) {
  const [activeSection, setActiveSection] = useState<"essential" | "advanced">("essential");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(false); // Start hidden
  const [lastScrollY, setLastScrollY] = useState(0);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    brand: true,
    price: true,
    year: true,
    fuel: false,
    transmission: false,
    model: false,
    bodyType: false,
    colors: false,
    performance: false,
    features: false,
  });

  // Models auto-update based on selected brands
  const availableModels = useMemo(() => {
    if (filters.brand.length === 0) return [];
    const modelsSet = new Set<string>();
    filters.brand.forEach((b) => {
      MODELS_BY_BRAND[b]?.forEach((m) => modelsSet.add(m));
    });
    return Array.from(modelsSet);
  }, [filters.brand]);

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

  const setSingleValue = useCallback(
    <T extends keyof FiltersState>(key: T, value: FiltersState[T]) => {
      setFilters({ ...filters, [key]: value });
    },
    [filters, setFilters]
  );


  // Scroll handler for bottom navigation visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down & past 50px - SHOW navigation
        setIsBottomNavVisible(true);
      } else if (currentScrollY < lastScrollY && currentScrollY > 50) {
        // Scrolling up & not at top - HIDE navigation
        setIsBottomNavVisible(false);
      } else if (currentScrollY <= 50) {
        // At the very top - HIDE navigation
        setIsBottomNavVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


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
      engineMin: MIN_ENGINE,
      engineMax: MAX_ENGINE,
      horsepowerMin: MIN_HP,
      horsepowerMax: MAX_HP,
      condition: null,
      features: [],
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

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
    count += filters.ownership.length;
    count += filters.bodyType.length;
    count += filters.driveType.length;
    count += filters.seatingCapacity.length;
    count += filters.features.length;
    if (filters.priceMin !== MIN_PRICE || filters.priceMax !== MAX_PRICE) count++;
    if (filters.yearMin !== MIN_YEAR || filters.yearMax !== MAX_YEAR) count++;
    if (filters.mileageMin !== MIN_MILEAGE || filters.mileageMax !== MAX_MILEAGE) count++;
    if (filters.colorExterior) count++;
    if (filters.colorInterior) count++;
    if (filters.engineMin !== MIN_ENGINE || filters.engineMax !== MAX_ENGINE) count++;
    if (filters.horsepowerMin !== MIN_HP || filters.horsepowerMax !== MAX_HP) count++;
    if (filters.condition) count++;
    return count;
  }, [filters]);

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)}Cr`;
    } else {
      return `${(price / 100000).toFixed(0)}L`;
    }
  };

  // Compact Dual Range Slider
  interface CompactDualRangeSliderProps {
    min: number;
    max: number;
    step: number;
    minVal: number;
    maxVal: number;
    onChangeMin: (v: number) => void;
    onChangeMax: (v: number) => void;
    label: string;
    unit?: string;
    decimals?: number;
    formatter?: (value: number) => string;
  }

  function CompactDualRangeSlider({
    min,
    max,
    step,
    minVal,
    maxVal,
    onChangeMin,
    onChangeMax,
    label,
    unit = "",
    decimals = 0,
    formatter,
  }: CompactDualRangeSliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState<null | "min" | "max">(null);

    function valueToPercent(value: number) {
      return ((value - min) / (max - min)) * 100;
    }

    const positionToValue = useCallback((position: number) => {
      if (!sliderRef.current) return min;
      const rect = sliderRef.current.getBoundingClientRect();
      let relativePos = position - rect.left;
      relativePos = Math.min(Math.max(0, relativePos), rect.width);
      const percent = relativePos / rect.width;
      let val = min + percent * (max - min);
      val = Math.round(val / step) * step;
      return Math.min(Math.max(val, min), max);
    }, [min, max, step]);

    const onPointerMove = useCallback(
      (e: MouseEvent | TouchEvent) => {
        if (!dragging) return;
        const posX = e instanceof TouchEvent ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const newVal = positionToValue(posX);

        if (dragging === "min") {
          if (newVal <= maxVal && newVal >= min) onChangeMin(newVal);
          else if (newVal > maxVal) onChangeMin(maxVal);
        } else {
          if (newVal >= minVal && newVal <= max) onChangeMax(newVal);
          else if (newVal < minVal) onChangeMax(minVal);
        }
      },
      [dragging, maxVal, minVal, min, max, onChangeMin, onChangeMax, positionToValue]
    );

    const onPointerUp = useCallback(() => {
      setDragging(null);
    }, []);

    useEffect(() => {
      if (dragging) {
        window.addEventListener("mousemove", onPointerMove);
        window.addEventListener("touchmove", onPointerMove);
        window.addEventListener("mouseup", onPointerUp);
        window.addEventListener("touchend", onPointerUp);
        window.addEventListener("touchcancel", onPointerUp);
      } else {
        window.removeEventListener("mousemove", onPointerMove);
        window.removeEventListener("touchmove", onPointerMove);
        window.removeEventListener("mouseup", onPointerUp);
        window.removeEventListener("touchend", onPointerUp);
        window.removeEventListener("touchcancel", onPointerUp);
      }

      return () => {
        window.removeEventListener("mousemove", onPointerMove);
        window.removeEventListener("touchmove", onPointerMove);
        window.removeEventListener("mouseup", onPointerUp);
        window.removeEventListener("touchend", onPointerUp);
        window.removeEventListener("touchcancel", onPointerUp);
      };
    }, [dragging, onPointerMove, onPointerUp]);

    const minPercent = valueToPercent(minVal);
    const maxPercent = valueToPercent(maxVal);

    const displayMinVal = formatter ? formatter(minVal) : `${minVal.toFixed(decimals)}${unit}`;
    const displayMaxVal = formatter ? formatter(maxVal) : `${maxVal.toFixed(decimals)}${unit}`;

    return (
      <div className="mb-3">
        <div className="text-xs font-medium mb-2 text-gold">{label}</div>
        <div
          ref={sliderRef}
          className="relative h-6 cursor-pointer"
          onMouseDown={(e) => {
            e.preventDefault();
            const rect = sliderRef.current?.getBoundingClientRect();
            if (!rect) return;
            const clickX = e.clientX;
            const distMin = Math.abs(clickX - (rect.left + rect.width * (minPercent / 100)));
            const distMax = Math.abs(clickX - (rect.left + rect.width * (maxPercent / 100)));

            if (distMin < distMax) {
              setDragging("min");
              onChangeMin(positionToValue(clickX));
            } else {
              setDragging("max");
              onChangeMax(positionToValue(clickX));
            }
          }}
        >
          <div className="absolute top-1/2 left-0 w-full h-0.5 rounded bg-gray-700 -translate-y-1/2" />
          <div
            className="absolute top-1/2 h-0.5 rounded bg-gold -translate-y-1/2"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
          <div
            className="absolute w-3 h-3 rounded-full border border-gold bg-black -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `calc(${minPercent}% - 6px)`, top: "50%" }}
          />
          <div
            className="absolute w-3 h-3 rounded-full border border-gold bg-black -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `calc(${maxPercent}% - 6px)`, top: "50%" }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{displayMinVal}</span>
          <span>{displayMaxVal}</span>
        </div>
      </div>
    );
  }

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
    <div className="border-b border-gray-800 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 text-left hover:text-gold transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isExpanded && (
        <div className="pb-4">
          {children}
        </div>
      )}
    </div>
  );

  const FilterContent = () => (
    <div className="space-y-0">
      {/* Essential/Advanced Tabs */}
      <div className="flex border-b border-gray-800 mb-4">
        <button
          className={`flex-1 py-3 px-1 text-sm font-medium transition-colors ${
            activeSection === "essential" 
              ? "text-gold border-b-2 border-gold" 
              : "text-gray-400 hover:text-gold"
          }`}
          onClick={() => setActiveSection("essential")}
        >
          <div className="flex items-center justify-center gap-2">
            <Search size={16} />
            Essential
          </div>
        </button>
        <button
          className={`flex-1 py-3 px-1 text-sm font-medium transition-colors ${
            activeSection === "advanced" 
              ? "text-gold border-b-2 border-gold" 
              : "text-gray-400 hover:text-gold"
          }`}
          onClick={() => setActiveSection("advanced")}
        >
          <div className="flex items-center justify-center gap-2">
            <Settings size={16} />
            Advanced
          </div>
        </button>
      </div>

      {activeSection === "essential" && (
        <div className="space-y-0">
          {/* Brand */}
          <CollapsibleSection
            title="Brand"
            isExpanded={expandedSections.brand}
            onToggle={() => toggleSection("brand")}
            icon={<Car size={14} />}
          >
            <div className="grid grid-cols-1 gap-2">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    filters.brand.includes(brand)
                      ? "bg-gold text-black shadow-lg"
                      : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => toggleArrayValue("brand", brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </CollapsibleSection>

          {/* Model */}
          {availableModels.length > 0 && (
            <CollapsibleSection
              title="Model"
              isExpanded={expandedSections.model}
              onToggle={() => toggleSection("model")}
            >
              <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                {availableModels.map((model) => (
                  <button
                    key={model}
                    className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      filters.model.includes(model)
                        ? "bg-gold text-black shadow-lg"
                        : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                    onClick={() => toggleArrayValue("model", model)}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Price Range */}
          <CollapsibleSection
            title="Price Range"
            isExpanded={expandedSections.price}
            onToggle={() => toggleSection("price")}
          >
            <CompactDualRangeSlider
              label="Price Range"
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
            title="Year"
            isExpanded={expandedSections.year}
            onToggle={() => toggleSection("year")}
          >
            <CompactDualRangeSlider
              label="Manufacturing Year"
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
            title="Fuel Type"
            isExpanded={expandedSections.fuel}
            onToggle={() => toggleSection("fuel")}
            icon={<Zap size={14} />}
          >
            <div className="space-y-2">
              {FUEL_TYPES.map((ft) => (
                <label key={ft} className="flex items-center text-sm cursor-pointer hover:text-gold transition-colors">
                  <input
                    type="checkbox"
                    checked={filters.fuelType.includes(ft)}
                    onChange={() => toggleArrayValue("fuelType", ft)}
                    className="mr-3 accent-gold scale-110"
                  />
                  <span>{ft}</span>
                </label>
              ))}
            </div>
          </CollapsibleSection>

          {/* Transmission */}
          <CollapsibleSection
            title="Transmission"
            isExpanded={expandedSections.transmission}
            onToggle={() => toggleSection("transmission")}
            icon={<Settings size={14} />}
          >
            <div className="space-y-2">
              {TRANSMISSIONS.map((t) => (
                <label key={t} className="flex items-center text-sm cursor-pointer hover:text-gold transition-colors">
                  <input
                    type="checkbox"
                    checked={filters.transmission.includes(t)}
                    onChange={() => toggleArrayValue("transmission", t)}
                    className="mr-3 accent-gold scale-110"
                  />
                  <span>{t}</span>
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
            title="Body Type"
            isExpanded={expandedSections.bodyType}
            onToggle={() => toggleSection("bodyType")}
          >
            <div className="grid grid-cols-2 gap-2">
              {BODY_TYPES.map((b) => (
                <button
                  key={b}
                  className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    filters.bodyType.includes(b)
                      ? "bg-gold text-black shadow-lg"
                      : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => toggleArrayValue("bodyType", b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </CollapsibleSection>

          {/* Colors */}
          <CollapsibleSection
            title="Colors"
            isExpanded={expandedSections.colors}
            onToggle={() => toggleSection("colors")}
            icon={<Palette size={14} />}
          >
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-3">Exterior Color</div>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map(({ name, hex }) => (
                    <button
                      key={name}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        filters.colorExterior === name
                          ? "ring-2 ring-gold border-gold scale-110"
                          : "border-gray-600 hover:border-gold hover:scale-105"
                      }`}
                      style={{ backgroundColor: hex }}
                      onClick={() =>
                        setSingleValue("colorExterior", filters.colorExterior === name ? null : name)
                      }
                      title={name}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-3">Interior Color</div>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map(({ name, hex }) => (
                    <button
                      key={name}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        filters.colorInterior === name
                          ? "ring-2 ring-gold border-gold scale-110"
                          : "border-gray-600 hover:border-gold hover:scale-105"
                      }`}
                      style={{ backgroundColor: hex }}
                      onClick={() =>
                        setSingleValue("colorInterior", filters.colorInterior === name ? null : name)
                      }
                      title={name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Engine & Performance */}
          <CollapsibleSection
            title="Performance"
            isExpanded={expandedSections.performance}
            onToggle={() => toggleSection("performance")}
          >
            <div className="space-y-4">
              <CompactDualRangeSlider
                label="Engine Displacement"
                min={MIN_ENGINE}
                max={MAX_ENGINE}
                step={0.1}
                minVal={filters.engineMin}
                maxVal={filters.engineMax}
                decimals={1}
                unit="L"
                onChangeMin={(v) => setSingleValue("engineMin", v)}
                onChangeMax={(v) => setSingleValue("engineMax", v)}
              />
              <CompactDualRangeSlider
                label="Horsepower"
                min={MIN_HP}
                max={MAX_HP}
                step={10}
                minVal={filters.horsepowerMin}
                maxVal={filters.horsepowerMax}
                unit=" HP"
                onChangeMin={(v) => setSingleValue("horsepowerMin", v)}
                onChangeMax={(v) => setSingleValue("horsepowerMax", v)}
              />
            </div>
          </CollapsibleSection>

          {/* Features */}
          <CollapsibleSection
            title="Premium Features"
            isExpanded={expandedSections.features}
            onToggle={() => toggleSection("features")}
          >
            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
              {FEATURES.map((f) => (
                <button
                  key={f}
                  className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left ${
                    filters.features.includes(f)
                      ? "bg-gold text-black shadow-lg"
                      : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => toggleArrayValue("features", f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-6 space-y-3 border-t border-gray-800">
        <button
          onClick={clearAllFilters}
          className="w-full py-3 text-sm border border-gray-600 rounded-lg hover:border-gold hover:text-gold transition-all duration-200"
        >
          Clear All Filters
        </button>
        <button
          onClick={handleApplyFilters}
          className="w-full py-3 text-sm bg-gold text-black rounded-lg font-medium hover:bg-yellow-400 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Sidebar */}
      <div className="hidden md:block h-full">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gold">Filters</h2>
              {activeFilterCount > 0 && (
                <span className="bg-gold text-black text-sm px-3 py-1 rounded-full font-bold">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <FilterContent />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Updated with scroll behavior and gold icons */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isBottomNavVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="bg-gradient-to-t from-black via-black/95 to-black/80 backdrop-blur-sm border-t border-gray-800">
          <div className="grid grid-cols-3 gap-1 px-2 py-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex flex-col items-center justify-center py-3 px-2 text-gold hover:text-yellow-400 transition-all duration-200 transform active:scale-95 relative"
              aria-label="Search"
            >
              <Search size={20} color={goldColor} />
              <span className="text-xs font-semibold mt-1">Search</span>
            </button>

            {/* Sort Button */}
            <button
              onClick={() => setSortModalOpen(true)}
              className="flex flex-col items-center justify-center py-3 px-2 text-gold hover:text-yellow-400 transition-all duration-200 transform active:scale-95 relative"
              aria-label="Sort"
            >
              <SortAsc size={20} color={goldColor} />
              <span className="text-xs font-semibold mt-1">Sort</span>
            </button>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex flex-col items-center justify-center py-3 px-2 text-gold hover:text-yellow-400 transition-all duration-200 transform active:scale-95 relative"
              aria-label="Open Filters"
            >
              <Filter size={20} color={goldColor} />
              <span className="text-xs font-semibold mt-1">Filters</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-black text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[1.25rem] text-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="md:hidden fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm">
          <div className="flex items-end h-full animate-slide-up">
            <div className="w-full bg-black border-t border-gray-800 max-h-[70vh] overflow-y-auto rounded-t-3xl shadow-2xl">
              {/* Search Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-black z-10">
                <h2 className="text-xl font-bold text-gold">Search Vehicles</h2>
                <button
                  onClick={() => setSearchModalOpen(false)}
                  className="text-white hover:text-gold transition-colors p-2 rounded-full hover:bg-gray-800"
                  aria-label="Close Search"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Search Modal Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gold mb-3 block">
                      Search by Brand, Model, Year, etc.
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: goldColor }} size={20} />
                      <input
                        type="text"
                        placeholder="Enter search terms..."
                        value={currentSearch}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                        autoFocus
                      />
                    </div>
                  </div>

                  {currentSearch && (
                    <div className="mt-4">
                      <button
                        onClick={() => setSearch("")}
                        className="text-sm text-gray-400 hover:text-gold transition-colors"
                      >
                        Clear search
                      </button>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-800">
                    <button
                      onClick={() => setSearchModalOpen(false)}
                      className="w-full py-3 text-sm bg-gold text-black rounded-lg font-medium hover:bg-yellow-400 transition-all duration-200"
                    >
                      Apply Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sort Modal */}
      {sortModalOpen && (
        <div className="md:hidden fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm">
          <div className="flex items-end h-full animate-slide-up">
            <div className="w-full bg-black border-t border-gray-800 max-h-[70vh] overflow-y-auto rounded-t-3xl shadow-2xl">
              {/* Sort Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-black z-10">
                <h2 className="text-xl font-bold text-gold">Sort Vehicles</h2>
                <button
                  onClick={() => setSortModalOpen(false)}
                  className="text-white hover:text-gold transition-colors p-2 rounded-full hover:bg-gray-800"
                  aria-label="Close Sort"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Sort Modal Content */}
              <div className="p-6">
                <div className="space-y-3">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSort(option.value);
                        setSortModalOpen(false);
                      }}
                      className={`w-full text-left px-4 py-4 rounded-lg transition-all duration-200 ${
                        currentSort === option.value
                          ? "bg-gold text-black shadow-lg"
                          : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        {currentSort === option.value && (
                          <div className="w-2 h-2 bg-black rounded-full"></div>
                        )}
                      </div>
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
        <div className="md:hidden fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm">
          <div className="flex items-end h-full animate-slide-up">
            <div className="w-full bg-black border-t border-gray-800 max-h-[90vh] overflow-y-auto rounded-t-3xl shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-black z-10">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gold">Filters</h2>
                  {activeFilterCount > 0 && (
                    <span className="bg-gold text-black text-sm px-3 py-1 rounded-full font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-white hover:text-gold transition-colors p-2 rounded-full hover:bg-gray-800"
                  aria-label="Close Filters"
                >
                  <X size={24} />
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

      <style>{`
        .bg-gold {
          background-color: ${goldColor};
        }
        .border-gold {
          border-color: ${goldColor};
        }
        .text-gold {
          color: ${goldColor};
        }
        .ring-gold {
          --tw-ring-color: ${goldColor};
        }
        .accent-gold:checked {
          accent-color: ${goldColor};
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: ${goldColor};
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #b8941f;
        }
        
        /* Mobile slide-up animation */
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        
        /* Smooth transitions for mobile */
        @media (max-width: 768px) {
          .transition-all {
            transition: all 0.2s ease-in-out;
          }
        }
        
        /* Enhanced mobile interactions */
        @media (hover: none) and (pointer: coarse) {
          .hover\\:scale-105:hover {
            transform: none;
          }
          
          .hover\\:scale-105:active {
            transform: scale(1.05);
          }
          
          .hover\\:scale-110:hover {
            transform: none;
          }
          
          .hover\\:scale-110:active {
            transform: scale(1.1);
          }
        }
        
        /* Focus states for accessibility */
        .focus\\:ring-gold:focus {
          --tw-ring-color: ${goldColor};
          box-shadow: 0 0 0 2px ${goldColor};
        }
        
        /* Improved touch targets for mobile */
        @media (max-width: 768px) {
          button {
            min-height: 44px;
            touch-action: manipulation;
          }
          
          input[type="checkbox"] {
            min-width: 20px;
            min-height: 20px;
          }
        }
        
        /* Loading states */
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
        
        /* Backdrop blur fallback */
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        
        @supports not (backdrop-filter: blur(4px)) {
          .backdrop-blur-sm {
            background-color: rgba(0, 0, 0, 0.9);
          }
        }
        
        /* Dark mode optimizations */
        @media (prefers-color-scheme: dark) {
          .bg-black {
            background-color: #000000;
          }
          
          .bg-gray-900 {
            background-color: #111827;
          }
          
          .bg-gray-800 {
            background-color: #1f2937;
          }
          
          .border-gray-800 {
            border-color: #1f2937;
          }
          
          .text-gray-400 {
            color: #9ca3af;
          }
          
          .text-gray-300 {
            color: #d1d5db;
          }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .bg-gold {
            background-color: #ffcc00;
          }
          
          .text-gold {
            color: #ffcc00;
          }
          
          .border-gold {
            border-color: #ffcc00;
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-slide-up {
            animation: none;
          }
          
          .animate-pulse {
            animation: none;
          }
          
          .transition-all,
          .transition-colors,
          .transition-transform {
            transition: none;
          }
          
          .hover\\:scale-105:hover,
          .hover\\:scale-110:hover,
          .hover\\:scale-\\[1\\.02\\]:hover {
            transform: none;
          }
        }
        
        /* Mobile bottom navigation positioning */
        .grid-cols-3 > button {
          position: relative;
        }
      `}</style>
    </>
  );
}