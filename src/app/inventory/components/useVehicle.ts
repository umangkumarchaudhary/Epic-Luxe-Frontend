// useVehicles.ts
import { useState, useMemo } from 'react';

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  originalPrice?: string;
  image: string;
  mileage: string;
  fuelType: string;
  transmission?: string;
  seating: number;
  location: string;
  condition: string;
  features: string[];
  savings?: string;
  isLiked: boolean;
  views: number;
}

interface Filters {
  brand: string;
  priceRange: string;
  year: string;
  fuelType: string;
  city: string;
}

interface UseVehiclesReturn {
  vehicles: Vehicle[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  favorites: number[];
  toggleLike: (id: number) => void;
  compareList: Vehicle[];
  addToCompare: (vehicle: Vehicle) => void;
  removeFromCompare: (id: number) => void;
  clearCompareList: () => void;
}

export function useVehicles(initialVehicles: Vehicle[]): UseVehiclesReturn {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [filters, setFilters] = useState<Filters>({
    brand: 'All Brands',
    priceRange: 'All Prices',
    year: 'All Years',
    fuelType: 'All Fuel Types',
    city: 'All Cities',
  });
  const [sortBy, setSortBy] = useState<string>('featured');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<Vehicle[]>([]);

  // Toggles liked state of vehicle by id
  const toggleLike = (id: number) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isLiked: !v.isLiked } : v))
    );
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Compare list management, max 3 cars at a time
  const addToCompare = (vehicle: Vehicle) => {
    setCompareList((prev) => {
      if (prev.find((v) => v.id === vehicle.id) || prev.length >= 3) return prev;
      return [...prev, vehicle];
    });
  };

  const removeFromCompare = (id: number) => {
    setCompareList((prev) => prev.filter((v) => v.id !== id));
  };

  const clearCompareList = () => {
    setCompareList([]);
  };

  // Filter and sort vehicles list memoized for performance
  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = vehicles.filter((v) => {
      // Brand
      if (filters.brand !== 'All Brands' && v.brand !== filters.brand) return false;
      // Fuel Type
      if (filters.fuelType !== 'All Fuel Types' && v.fuelType !== filters.fuelType) return false;
      // Year
      if (filters.year !== 'All Years' && v.year.toString() !== filters.year) return false;
      // City
      if (filters.city !== 'All Cities' && !v.location.includes(filters.city)) return false;
      // Price Range Filter
      if (filters.priceRange !== 'All Prices') {
        const priceNum = parseInt(v.price.replace(/[₹,]/g, ''));
        const [minStr, maxStr] = filters.priceRange.split(' - ');
        const minPrice = parseInt(minStr.replace(/[₹L]/g, '')) * 100000;
        const maxPrice = maxStr ? parseInt(maxStr.replace(/[₹L+]/g, '')) * 100000 : Infinity;
        if (priceNum < minPrice || priceNum > maxPrice) return false;
      }
      return true;
    });

    switch (sortBy) {
      case 'price-low':
        filtered = filtered.sort(
          (a, b) =>
            parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, ''))
        );
        break;
      case 'price-high':
        filtered = filtered.sort(
          (a, b) =>
            parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, ''))
        );
        break;
      case 'year-new':
        filtered = filtered.sort((a, b) => b.year - a.year);
        break;
      case 'mileage-low':
        filtered = filtered.sort(
          (a, b) =>
            parseInt(a.mileage.replace(/[^\d]/g, '')) - parseInt(b.mileage.replace(/[^\d]/g, ''))
        );
        break;
      case 'popular':
        filtered = filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'featured':
      default:
        // Optionally define featured sorting (e.g., by savings or id)
        filtered = filtered.sort((a, b) => b.savings?.replace(/[₹,]/g, '')?.localeCompare(a.savings?.replace(/[₹,]/g, '') || '') || 0);
        break;
    }
    return filtered;
  }, [vehicles, filters, sortBy]);

  return {
    vehicles: filteredAndSortedVehicles,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    favorites,
    toggleLike,
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompareList,
  };
}
