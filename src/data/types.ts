// src/types.ts
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

export interface Vehicle {
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
  // Optional properties for compatibility with existing UI
  bodyType?: string;
  driveType?: string;
  seating?: number;
}