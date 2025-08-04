// types/filters.ts
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

export interface VehicleData {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  condition: string;
  bodyType?: string;
  driveType?: string;
  seating: number;
  colorExterior?: string;
  colorInterior?: string;
  engine?: number;
  horsepower?: number;
  features: string[];
  images: string[];
  description?: string;
}

export interface FilterProps {
  filters: FiltersState;
  setFilters: (filters: FiltersState) => void;
  onApplyFilters?: () => void;
}