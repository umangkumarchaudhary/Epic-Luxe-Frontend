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
  year: number;
  price: string;
  originalPrice: string;
  image: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  seating: number;
  location: string;
  condition: string;
  features: string[];
  savings: string;
  views: number;
  // Optional properties used in filtering:
  bodyType?: string;
  driveType?: string;
  colorExterior?: string;
  colorInterior?: string;
}
