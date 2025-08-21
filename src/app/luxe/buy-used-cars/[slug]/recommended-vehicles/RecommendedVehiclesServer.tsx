import { RecommendedVehiclesClient } from './RecommendedVehiclesClient';

// Removed unused Vehicle interface

interface RecommendedVehiclesServerProps {
  currentVehicleId: number;
  currentBrand?: string;
  currentFuelType?: string;
  currentTransmission?: string;
  currentPriceRange?: { min: number; max: number };
}

// Removed unused fetchRecommendedVehicles function

export default async function RecommendedVehiclesServer({
  currentVehicleId,
  currentBrand,
  currentFuelType,
  currentTransmission,
  currentPriceRange
}: RecommendedVehiclesServerProps) {
  // Removed unused recommendedVehicles assignment

  return (
    <RecommendedVehiclesClient 
      currentVehicleId={currentVehicleId}
      currentBrand={currentBrand}
      currentFuelType={currentFuelType}
      currentTransmission={currentTransmission}
      currentPriceRange={currentPriceRange}
    />
  );
}