import { RecommendedVehiclesClient } from './RecommendedVehiclesClient';

interface Vehicle {
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
  location?: string;
  condition?: string;
  ownership?: string;
  image_url: string;
  slug: string;
  views?: number;
  published: boolean;
  featured: boolean;
  created_at: string;
}

interface RecommendedVehiclesServerProps {
  currentVehicleId: number;
  currentBrand?: string;
  currentFuelType?: string;
  currentTransmission?: string;
  currentPriceRange?: { min: number; max: number };
}

async function fetchRecommendedVehicles(
  currentVehicleId: number,
  currentBrand?: string,
  currentFuelType?: string,
  currentTransmission?: string,
  currentPriceRange?: { min: number; max: number }
): Promise<Vehicle[]> {
  try {
    // Fetch similar vehicles based on current vehicle attributes
    const params = new URLSearchParams({
      exclude: currentVehicleId.toString(),
      limit: '6',
      published: 'true'
    });

    // Add filters for better recommendations
    if (currentBrand) {
      params.append('brand', currentBrand);
    }
    if (currentFuelType) {
      params.append('fuel_type', currentFuelType);
    }
    if (currentTransmission) {
      params.append('transmission', currentTransmission);
    }
    if (currentPriceRange) {
      params.append('price_min', currentPriceRange.min.toString());
      params.append('price_max', currentPriceRange.max.toString());
    }

    const response = await fetch(
      `http://localhost:5000/admin/vehicles/recommended?${params.toString()}`,
      { 
        cache: 'no-store' // Ensure fresh data
      }
    );

    if (!response.ok) {
      // Fallback to general featured vehicles if recommendation API fails
      const fallbackResponse = await fetch(
        'http://localhost:5000/admin/vehicles/featured?limit=6',
        { cache: 'no-store' }
      );
      
      if (!fallbackResponse.ok) {
        throw new Error('Failed to fetch fallback vehicles');
      }
      
      const fallbackData = await fallbackResponse.json();
      if (fallbackData.success && fallbackData.vehicles) {
        // Filter out current vehicle from fallback results
        return fallbackData.vehicles
          .filter((vehicle: Vehicle) => vehicle.id !== currentVehicleId)
          .slice(0, 6);
      }
      return [];
    }

    const data = await response.json();
    if (data.success && data.vehicles) {
      return data.vehicles;
    }

    return [];
  } catch (error) {
    console.error('Error fetching recommended vehicles:', error);
    
    // Final fallback: try to get any published vehicles
    try {
      const fallbackResponse = await fetch(
        'http://localhost:5000/admin/vehicles?published=true&limit=6',
        { cache: 'no-store' }
      );
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        if (fallbackData.success && fallbackData.vehicles) {
          return fallbackData.vehicles
            .filter((vehicle: Vehicle) => vehicle.id !== currentVehicleId)
            .slice(0, 6);
        }
      }
    } catch (fallbackError) {
      console.error('Error in fallback fetch:', fallbackError);
    }
    
    return [];
  }
}

export default async function RecommendedVehiclesServer({
  currentVehicleId,
  currentBrand,
  currentFuelType,
  currentTransmission,
  currentPriceRange
}: RecommendedVehiclesServerProps) {
  const recommendedVehicles = await fetchRecommendedVehicles(
    currentVehicleId,
    currentBrand,
    currentFuelType,
    currentTransmission,
    currentPriceRange
  );

  return (
    <RecommendedVehiclesClient 
      vehicles={recommendedVehicles}
      currentVehicleId={currentVehicleId}
    />
  );
}