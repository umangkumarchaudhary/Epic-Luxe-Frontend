'use client';

// VehicleGridClient.tsx - Client Component with Premium Cards
import React, { useState, useCallback, useMemo } from "react";
import Image from 'next/image';
import { Calculator, Calendar, Heart, Share2, Check, TrendingUp, Award } from 'lucide-react';
import EMIModal from '../EMIModal/EMIModal';
import CompareDrawer from '../CompareDrawer/CompareDrawer';
import ScheduleDemo from '../Schedule';
import { useRouter } from "next/navigation";

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
  slug: string;
  views?: number;
  bodyType?: string;
  driveType?: string;
  seating?: number;
  isLiked?: boolean;
};

// EMI calculator utility
function getEMI(price: number, years = 5, rate = 8.5) {
  const P = price, n = years * 12, r = rate / (12 * 100);
  if (!P || !n || !r) return 0;
  const emi = (P * r * (Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
}

type VehicleGridClientProps = {
  vehicles: Vehicle[];
};

export default function VehicleGridClient({ vehicles }: VehicleGridClientProps) {
  const [compareList, setCompareList] = useState<number[]>([]);
  const [emiOpen, setEmiOpen] = useState<{ open: boolean; car: Vehicle | null }>({ open: false, car: null });
  const [compareOpen, setCompareOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const router = useRouter();

  const handleLike = useCallback((carId: number) => {
    setLikedIds((prev) =>
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  }, []);

  const handleCompare = useCallback((carId: number) => {
    setCompareList((prev) => {
      if (prev.includes(carId)) {
        return prev.filter(id => id !== carId);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 vehicles at a time');
        return prev;
      }
      return [...prev, carId];
    });
  }, []);

  const handleShare = useCallback((car: Vehicle) => {
    const shareUrl = car.slug 
      ? `${window.location.origin}/inventory/${car.slug}`
      : `${window.location.origin}/inventory/${car.brand.toLowerCase()}-${car.model.toLowerCase()}-${car.year}`.replace(/[^a-z0-9/]/g, '-');
    
    if (navigator.share) {
      navigator.share({
        title: `${car.year} ${car.brand} ${car.model}`,
        text: `Check out this ${car.brand} ${car.model} at ${car.price}!`,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        window.open(shareUrl, "_blank");
      });
    }
  }, []);

  return (
    <>
      {/* Vehicle Cards */}
      {vehicles.map((car) => (
        <VehicleCard
          key={car.id}
          car={car}
          onLike={() => handleLike(car.id)}
          liked={likedIds.includes(car.id)}
          onCompare={() => handleCompare(car.id)}
          inCompare={compareList.includes(car.id)}
          openEMI={() => setEmiOpen({ open: true, car })}
          openDetails={() => {
            if (car.slug) {
              router.push(`/inventory/${car.slug}`);
            } else {
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
          openShare={() => handleShare(car)}
        />
      ))}

      {/* Modals and Drawers */}
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
            isLiked: likedIds.includes(emiOpen.car.id),
            views: emiOpen.car.views || 0,
            seating: emiOpen.car.seating || 5,
            savings: emiOpen.car.savings || '0'
          }}
          onClose={() => setEmiOpen({ open: false, car: null })}
        />
      )}

      <ScheduleDemo
        isOpen={scheduleOpen}
        onClose={() => {
          setScheduleOpen(false);
          setSelectedVehicle(null);
        }}
        selectedVehicle={selectedVehicle}
      />

      {/* Floating Compare Button - Premium Style */}
      {compareList.length > 0 && !compareOpen && (
        <button
          onClick={() => setCompareOpen(true)}
          className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-xl shadow-lg
                     hover:bg-black/90 transition-all duration-200 z-50 flex items-center gap-2"
          aria-label="Open compare drawer"
          type="button"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          <span className="text-sm font-light tracking-wider">COMPARE</span>
          <span className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
            {compareList.length}
          </span>
        </button>
      )}
    </>
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
  
  // Parse price
  const priceVal = useMemo(() => {
    let value = 0;
    if (typeof car.price === "string") {
      if (car.price.toLowerCase().includes("lakh")) {
        const num = parseFloat(car.price.replace(/[^0-9.]/g, ''));
        value = num * 100000;
      } else if (car.price.toLowerCase().includes("crore")) {
        const num = parseFloat(car.price.replace(/[^0-9.]/g, ''));
        value = num * 10000000;
      } else {
        value = parseFloat(car.price.replace(/[^0-9.]/g, ''));
      }
    } else {
      value = Number(car.price) || 0;
    }
    return value;
  }, [car.price]);

  const emiValue = useMemo(() => getEMI(priceVal), [priceVal]);

  // Quality indicator - Premium style
  const qualityBadge = useMemo(() => {
    const mileageNum = parseInt(car.mileage.replace(/[^0-9]/g, ''));
    
    if (car.condition === 'Excellent' || car.year >= 2023) {
      return { 
        text: 'CERTIFIED', 
        icon: Award, 
        style: 'bg-black text-white'
      };
    } else if (mileageNum < 15000) {
      return { 
        text: 'LOW MILEAGE', 
        icon: TrendingUp, 
        style: 'bg-white text-black border border-black'
      };
    } else {
      return { 
        text: 'INSPECTED', 
        icon: Check, 
        style: 'bg-white/90 text-black border border-black/20'
      };
    }
  }, [car.condition, car.year, car.mileage]);

  const BadgeIcon = qualityBadge.icon;

  return (
    <div className="group relative bg-white border border-black/10 hover:border-black/20 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col overflow-hidden"
         style={{ fontFamily: 'Manrope, sans-serif' }}>
      
      {/* Image Container - Reduced height */}
      <div className="relative aspect-[16/8] w-full overflow-hidden bg-gray-100 rounded-t-xl">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          draggable={false}
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
        
        {/* Quality Badge */}
        <div className={`absolute top-4 left-4 z-10 ${qualityBadge.style} px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 tracking-wider rounded-lg`}>
          <BadgeIcon size={14} />
          <span>{qualityBadge.text}</span>
        </div>

        {/* Action Buttons - Top Right */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={onLike}
            type="button"
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:bg-black hover:text-white"
          >
            <Heart size={18} className={liked ? "fill-current" : ""} />
          </button>
          <button
            aria-label="Share"
            onClick={openShare}
            type="button"
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:bg-black hover:text-white"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Content - Compact Layout */}
      <div className="flex flex-col flex-grow p-3">
        {/* Row 1: Brand Model Variant in one line */}
        <div className="mb-2">
          <h2 className="text-sm font-medium text-black truncate">
            {car.brand} {car.model} {car.variant ? car.variant : ''}
          </h2>
        </div>

        {/* Row 2: Price on left, Year and Location on right */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-light text-black">
            {car.price}
          </p>
          <div className="text-right">
            <div className="text-xs text-black/60">{car.year}</div>
            <div className="text-xs text-black/60">{car.location}</div>
          </div>
        </div>

        {/* Specs in compact format */}
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-[10px] text-black/60 pb-2 border-b border-black/10">
          <span>{car.mileage}</span>
          <span>•</span>
          <span>{car.fuelType}</span>
          <span>•</span>
          <span>{car.transmission}</span>
        </div>

        {/* EMI Section - Compact */}
        <div className="py-2 border-b border-black/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-black/60 mb-0.5">EMI FROM</p>
              <p className="text-sm font-light text-black">
                ₹{emiValue.toLocaleString('en-IN')}<span className="text-[10px] text-black/60">/mo</span>
              </p>
            </div>
            <button
              type="button"
              onClick={openEMI}
              className="flex items-center gap-1 px-2 py-1 border border-black/20 text-black rounded hover:bg-black hover:text-white transition-all duration-200"
              aria-label="Calculate EMI"
            >
              <Calculator size={10} />
              <span className="text-[9px] font-medium">Options</span>
            </button>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Action Buttons - Compact */}
        <div className="space-y-1.5 mt-3">
          {/* Primary Actions */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={openDetails}
              className="py-1.5 px-3 bg-black text-white text-[10px] font-medium tracking-wide rounded hover:bg-white hover:text-black border border-transparent hover:border-black transition-all duration-200"
            >
              VIEW
            </button>
            <button
              type="button"
              onClick={onCompare}
              aria-pressed={inCompare}
              className={`py-1.5 px-3 text-[10px] font-medium tracking-wide rounded transition-all duration-200 ${
                inCompare
                  ? 'bg-black text-white'
                  : 'bg-white border border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              {inCompare ? 'ADDED' : 'COMPARE'}
            </button>
          </div>

          {/* Test Drive Button */}
          <button
            type="button"
            onClick={openSchedule}
            className="w-full py-1.5 px-3 bg-white border border-black text-black font-medium tracking-wide text-[10px] rounded hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center gap-1"
            aria-label="Book a test drive"
          >
            <Calendar size={12} />
            <span>TEST DRIVE</span>
          </button>
        </div>
      </div>
    </div>
  );
}