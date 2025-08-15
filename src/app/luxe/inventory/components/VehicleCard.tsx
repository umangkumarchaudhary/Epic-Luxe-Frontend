'use client';

import React, { useState } from "react";
import Image from 'next/image';
import { Calculator, Calendar } from 'lucide-react';
import EMIModal from './EMIModel'; // Your EMI calculator modal component
import CompareDrawer from './CompareDrawer';
import { FaRegHeart, FaHeart, FaShareAlt, FaCertificate, FaStar, FaGem } from "react-icons/fa";
import { useRouter } from "next/navigation";
import EpicBenefits from "./EpicBenefits";
import FinanceProtectionHighlights from "./FinanceBenefits";
import SubmitRequestSection from "./CallBack";
import ScheduleDemo from "./Schedule";

// Updated Vehicle type to match EMI Modal expectations
export type Vehicle = {
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
  slug: string; // Added slug field
  views?: number;
  bodyType?: string;
  driveType?: string;
  seating: number; // Changed from optional to required to match EMI Modal
  isLiked: boolean; 
};

// EMI calculator utility
function getEMI(price: number, years = 5, rate = 8.5) {
  const P = price, n = years * 12, r = rate / (12 * 100);
  if (!P || !n || !r) return 0;
  const emi = (P * r * (Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
}

type VehicleGridProps = {
  vehicles: Vehicle[];
};

export default function VehicleGrid({ vehicles }: VehicleGridProps) {
  const [compareList, setCompareList] = useState<number[]>([]);
  const [emiOpen, setEmiOpen] = useState<{ open: boolean; car: Vehicle | null }>({ open: false, car: null });
  const [compareOpen, setCompareOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const router = useRouter();

  // Function to render vehicles with integrated sections
  const renderVehiclesWithSections = () => {
    const elements: React.ReactNode[] = [];
    const vehiclesPerRow = 3;
    
    for (let i = 0; i < vehicles.length; i += vehiclesPerRow) {
      // Add vehicles for current row (up to 3 vehicles)
      const rowVehicles = vehicles.slice(i, i + vehiclesPerRow);
      
      rowVehicles.forEach((car) => {
        elements.push(
          <VehicleCard
            key={car.id}
            car={car}
            onLike={() =>
              setLikedIds((prev: number[]) =>
                prev.includes(car.id) ? prev.filter(id => id !== car.id) : [...prev, car.id]
              )
            }
            liked={likedIds.includes(car.id)}
            onCompare={() => {
              setCompareList((prev: number[]) =>
                prev.includes(car.id) ? prev.filter(id => id !== car.id) : [...prev, car.id]
              );
            }}
            inCompare={compareList.includes(car.id)}
            openEMI={() => setEmiOpen({ open: true, car })}
            openDetails={() => {
              // Use slug for navigation instead of ID
              if (car.slug) {
                router.push(`/inventory/${car.slug}`);
              } else {
                // Fallback: generate slug from available data
                const fallbackSlug = `${car.brand.toLowerCase()}-${car.model.toLowerCase()}-${car.year}`
                  .replace(/[^a-z0-9]/g, '-')
                  .replace(/-+/g, '-')
                  .trim();
                router.push(`/inventory/${fallbackSlug}`);
              }
            }}
            openSchedule={() => {
              setSelectedVehicle(car);
              setScheduleOpen(true);
            }}
            openShare={() => {
              const shareUrl = car.slug 
                ? `${window.location.origin}/inventory/${car.slug}`
                : `${window.location.origin}/inventory/${car.brand.toLowerCase()}-${car.model.toLowerCase()}-${car.year}`.replace(/[^a-z0-9/]/g, '-');
              
              if (navigator.share) {
                navigator.share({
                  title: `${car.year} ${car.brand} ${car.model}`,
                  text: `Check out this ${car.brand} ${car.model} at ${car.price}!`,
                  url: shareUrl,
                }).catch(() => { });
              } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(shareUrl).then(() => {
                  alert('Link copied to clipboard!');
                }).catch(() => {
                  // If clipboard fails, open in new tab
                  window.open(shareUrl, "_blank");
                });
              }
            }}
          />
        );
      });

      // After first 9 cars (3 rows), add Epic Benefits
      if (i + vehiclesPerRow >= 9 && i < 9) {
        elements.push(
          <div key="epic-benefits" className="col-span-full">
            <EpicBenefits />
          </div>
        );
      }

      // After next 9 cars (6 rows total), add Finance Protection
      if (i + vehiclesPerRow >= 18 && i < 18) {
        elements.push(
          <div key="finance-protection" className="col-span-full">
            <FinanceProtectionHighlights />
          </div>
        );
      }
    }

    // Add Submit Request Section at the end (or after 27 cars if there are more)
    const shouldShowSubmitRequest = vehicles.length <= 27 || vehicles.length >= 27;
    if (shouldShowSubmitRequest) {
      elements.push(
        <div key="submit-request" className="col-span-full">
          <SubmitRequestSection />
        </div>
      );
    }

    return elements;
  };

  return (
    <div className="w-full bg-black pt-8 pb-0 min-h-screen">
      <div className="max-w-[1500px] mx-auto px-2 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderVehiclesWithSections()}
        </div>
      </div>

      {/* Compare Drawer and EMI Modal */}
      <CompareDrawer
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        vehicleIds={compareList}
        allVehicles={vehicles}
        triggerClear={() => setCompareList([])}
      />
      
      {emiOpen.open && emiOpen.car && (
        <EMIModal
          visible={emiOpen.open}
          vehicle={{
            ...emiOpen.car,
            originalPrice: emiOpen.car.originalPrice || '', // Provide default value
            seating: emiOpen.car.seating || 5, // Ensure seating is always a number
            savings: emiOpen.car.savings || '',
            features: emiOpen.car.features || [],
            views: emiOpen.car.views || 0
          }}
          onClose={() => setEmiOpen({ open: false, car: null })}
        />
      )}

      {/* Schedule Modal */}
      <ScheduleDemo
        isOpen={scheduleOpen}
        onClose={() => {
          setScheduleOpen(false);
          setSelectedVehicle(null);
        }}
        selectedVehicle={selectedVehicle}
      />

      {/* Floating Compare Button */}
      {compareList.length > 0 && !compareOpen && (
        <button
          onClick={() => setCompareOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg
                     hover:bg-blue-700 transition-colors z-50"
          aria-label="Open compare drawer"
          type="button"
        >
          Compare ({compareList.length})
        </button>
      )}
    </div>
  );
}

// ---- VehicleCard Component ----

type VehicleCardProps = {
  car: Vehicle;
  onLike: () => void;
  liked: boolean;
  onCompare: () => void;
  inCompare: boolean;
  openEMI: () => void;
  openDetails: () => void;
  openSchedule: () => void;
  openShare: () => void;
};

function VehicleCard({
  car,
  onLike,
  liked,
  onCompare,
  inCompare,
  openEMI,
  openDetails,
  openSchedule,
  openShare,
}: VehicleCardProps) {
  
  let priceVal = 0;
  if (typeof car.price === "string") {
    if (car.price.toLowerCase().includes("lakh")) {
      const num = parseFloat(car.price.replace(/[^0-9.]/g, ''));
      priceVal = num * 100000; // convert lakh to rupees
    } else {
      priceVal = parseFloat(car.price.replace(/[^0-9.]/g, ''));
    }
  } else {
    priceVal = Number(car.price) || 0;
  }

  const emiValue = getEMI(priceVal);

  // Quality indicator logic - replace savings with quality badges
  const getQualityIndicator = () => {
    const mileage = Number(car.mileage.replace(/[^0-9]/g, ''));
    
    // Check for luxury brands for special badges
    const luxuryBrands = ['Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Jaguar', 'Land Rover', 'Bentley', 'Rolls-Royce', 'Ferrari', 'Lamborghini', 'Maserati', 'Bugatti'];
    const isLuxuryBrand = luxuryBrands.some(brand => car.brand.toLowerCase().includes(brand.toLowerCase()));
    
    if (car.year >= 2023) {
      return { text: 'Latest Model', icon: FaStar, color: 'bg-gradient-to-r from-purple-600 to-purple-700 text-purple-100 border-purple-500/30' };
    } else if (mileage < 15000) {
      return { text: 'Less KM driven', icon: FaGem, color: 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-emerald-100 border-emerald-500/30' };
    } else if (isLuxuryBrand) {
      return { text: 'Certified Pre-Owned', icon: FaCertificate, color: 'bg-gradient-to-r from-gold to-yellow-600 text-black border-gold/30' };
    } else {
      return { text: 'Curated Selection', icon: FaStar, color: 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-100 border-slate-500/30' };
    }
  };

  const qualityBadge = getQualityIndicator();
  const IconComponent = qualityBadge.icon;

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black border border-gray-700 shadow-2xl flex flex-col group hover:shadow-gold/20 hover:border-gold/30 transition-all duration-500 h-full">
      {/* Image & overlays */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={car.image || '/placeholder-car.jpg'}
          alt={`${car.brand} ${car.model}`}
          width={400}
          height={300}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          draggable={false}
        />
        
        {/* Quality Badge - replaces savings badge */}
        <div className={`absolute top-3 left-3 z-10 ${qualityBadge.color} rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center space-x-1.5 backdrop-blur-sm border shadow-lg`}>
          <IconComponent size={12} />
          <span>{qualityBadge.text}</span>
        </div>

        {/* Likes & Share buttons */}
        <div className="absolute top-3 right-3 z-10 flex space-x-2">
          <button
            aria-label={liked ? 'Remove from collection' : 'Add to collection'}
            onClick={onLike}
            type="button"
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:border-gold hover:bg-gold/20"
          >
            {liked ? (
              <FaHeart size={18} className="text-gold" />
            ) : (
              <FaRegHeart size={18} className="text-white" />
            )}
          </button>
          <button
            aria-label="Share"
            onClick={openShare}
            type="button"
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-gold hover:border-gold hover:bg-gold/20 transition-all duration-300"
          >
            <FaShareAlt size={17} />
          </button>
        </div>
      </div>

      {/* Card Content - Luxury Styling */}
      <div className="flex flex-col flex-grow p-5 text-white">
        {/* Header Section */}
        <div className="mb-4">
          {/* Brand and Price row */}
          <div className="flex justify-between items-start space-x-2 mb-2">
            <h2 className="text-lg font-bold truncate leading-tight text-white">{car.brand}</h2>
            <p className="text-2xl font-bold whitespace-nowrap leading-tight" style={{
              background: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 25%, #F4E4C1 50%, #FFD700 75%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>{car.price}</p>
          </div>

          {/* Model, Year and Location row */}
          <div className="flex justify-between items-center mb-">
            <p className="text-base text-gray-300 truncate leading-tight font-medium">{car.model}</p>
            <p className="text-sm text-gray-400 whitespace-nowrap leading-tight">
              {car.year} • {car.location}
            </p>
          </div>
        </div>

        {/* Specs Section */}
        <div className="flex items-center mb-2 pb-4 border-b border-gray-800">
          <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-gray-300">
            <span className="font-medium">{car.mileage}</span>
            <span className="text-gray-600">•</span>
            <span className="font-medium">{car.fuelType}</span>
            <span className="text-gray-600">•</span>
            <span className="font-medium truncate">{car.transmission}</span>
          </div>
        </div>

        {/* Subtle EMI Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-400">
                <span className="font-normal">Financing available from </span>
                <span className="font-semibold text-gold">₹{emiValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                <span className="font-normal text-xs">/month</span>
              </div>
            </div>
            
            {/* Elegant Calculate Button */}
            <button
              type="button"
              onClick={openEMI}
              className="flex items-center gap-2 bg-transparent border border-gold/50 text-gold rounded-lg px-3 py-2 font-medium text-sm hover:bg-gold hover:text-black transition-all duration-300 whitespace-nowrap flex-shrink-0 hover:shadow-lg hover:shadow-gold/20"
              aria-label="Financing Options"
            >
              <Calculator size={14} />
              <span>Options</span>
            </button>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Premium Action Buttons */}
        <div className="space-y-3 mt-auto">
          {/* Top Row: View Details & Compare */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openDetails}
              className="flex-1 bg-gradient-to-r from-white to-gray-100 border border-gray-200 text-black font-bold rounded-xl px-4 py-3 text-sm transition-all duration-300 shadow-md hover:from-gold hover:to-yellow-400 hover:border-gold hover:shadow-lg hover:shadow-gold/20"
            >
              View Details
            </button>
            <button
              type="button"
              onClick={onCompare}
              aria-pressed={inCompare}
              className={`flex-1 border rounded-xl px-4 py-3 text-sm font-bold flex items-center justify-center gap-1 transition-all duration-300 shadow-md
                ${inCompare
                  ? 'bg-gradient-to-r from-gold to-yellow-400 border-gold text-black shadow-lg shadow-gold/20'
                  : 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700 text-white hover:from-gold hover:to-yellow-400 hover:border-gold hover:text-black hover:shadow-lg hover:shadow-gold/20'
                }`}
            >
              {inCompare ? 'Selected' : 'Compare'}
            </button>
          </div>

          {/* Bottom Row: Full Width Test Drive Button */}
          <button
            type="button"
            onClick={openSchedule}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 border border-emerald-500 rounded-xl px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:from-emerald-500 hover:to-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105"
            aria-label="Book a test drive"
          >
            <Calendar size={16} />
            <span>Book A Test Drive</span>
          </button>
        </div>
      </div>
    </div>
  );
}