'use client';

// CompareDrawerClient.tsx - Client Component (Interactive)
import React, { useMemo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  X,
  GitCompare,
  Car,
  Fuel,
  Calendar,
  Settings,
  Users,
  MapPin,
  Palette,
  TrendingDown,
  Award,
  Activity,
} from 'lucide-react';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  price: string;
  year: number;
  mileage: string;
  image: string;
  fuelType: string;
  transmission: string;
  location: string;
  seating?: number;
  color?: string;
}

interface CompareDrawerClientProps {
  open: boolean;
  onClose: () => void;
  vehicleIds: number[];
  allVehicles: Vehicle[];
  triggerClear: () => void;
}

const CompareDrawerClient: React.FC<CompareDrawerClientProps> = ({
  open,
  onClose,
  vehicleIds,
  allVehicles,
  triggerClear,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Memoize selected vehicles
  const vehicles = useMemo(
    () => vehicleIds
      .map(id => allVehicles.find(v => v.id === id))
      .filter(Boolean) as Vehicle[],
    [vehicleIds, allVehicles]
  );

  // Handle animation on open/close
  useEffect(() => {
    if (open) {
      setIsAnimating(true);
    }
  }, [open]);

  // Helper to extract numeric value from price/mileage strings
  const extractNumeric = useCallback((str: string = ''): number => {
    const cleanStr = str.replace(/[^0-9.]/g, '');
    if (str.toLowerCase().includes('lakh')) {
      return parseFloat(cleanStr) * 100000;
    } else if (str.toLowerCase().includes('crore')) {
      return parseFloat(cleanStr) * 10000000;
    }
    return parseFloat(cleanStr) || 0;
  }, []);

  // Calculate insights
  const insights = useMemo(() => {
    if (vehicles.length === 0) return null;

    const cheapest = vehicles.reduce((a, b) =>
      extractNumeric(a.price) < extractNumeric(b.price) ? a : b
    );
    const newest = vehicles.reduce((a, b) => 
      a.year > b.year ? a : b
    );
    const lowestMileage = vehicles.reduce((a, b) =>
      extractNumeric(a.mileage) < extractNumeric(b.mileage) ? a : b
    );

    return { cheapest, newest, lowestMileage };
  }, [vehicles, extractNumeric]);

  // Handle close with animation
  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  // Handle clear and close
  const handleClearAndClose = useCallback(() => {
    triggerClear();
    handleClose();
  }, [triggerClear, handleClose]);

  // Render table row
  const renderRow = useCallback((
    label: string,
    values: string[],
    Icon: React.ComponentType<{ className?: string }> | null,
    highlight?: number // Index of value to highlight
  ) => (
    <tr className="border-b border-black/5 hover:bg-black/[0.02] transition-colors duration-150">
      <td className="px-6 py-4 bg-black/[0.02] font-medium text-sm text-black/80 sticky left-0 z-10"
          style={{ fontFamily: 'Manrope, sans-serif' }}>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-black/40" />}
          <span className="tracking-wide">{label}</span>
        </div>
      </td>
      {values.map((val, i) => (
        <td
          key={i}
          className={`min-w-[240px] px-6 py-4 text-center text-sm transition-colors duration-150 ${
            highlight === i ? 'bg-black/[0.03] font-medium' : ''
          }`}
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          <span className={highlight === i ? 'text-black' : 'text-black/70'}>
            {val}
          </span>
        </td>
      ))}
    </tr>
  ), []);

  if (!open || vehicles.length === 0) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
        aria-label="Close comparison"
      />

      {/* Main Drawer */}
      <div className={`fixed inset-0 z-50 flex flex-col bg-white transition-transform duration-300 ${
        isAnimating ? 'translate-y-0' : 'translate-y-full'
      }`}>
        
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 border-b border-black/10"
                style={{ fontFamily: 'Manrope, sans-serif' }}>
          <div className="flex items-center gap-4">
            <GitCompare className="w-5 h-5 text-black" />
            <h1 className="text-2xl font-light text-black tracking-tight">
              Vehicle Comparison
            </h1>
            <span className="text-sm text-black/40 font-light">
              {vehicles.length} {vehicles.length === 1 ? 'vehicle' : 'vehicles'} selected
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleClearAndClose}
              className="text-sm text-black/60 hover:text-black transition-colors duration-200 font-light tracking-wider"
            >
              CLEAR ALL
            </button>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-black/5 rounded-full transition-colors duration-200"
              aria-label="Close comparison"
            >
              <X className="w-5 h-5 text-black/60" />
            </button>
          </div>
        </header>

        {/* Quick Insights */}
        {insights && (
          <section className="px-8 py-5 border-b border-black/10 bg-black/[0.02]"
                   style={{ fontFamily: 'Manrope, sans-serif' }}>
            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-black/40" />
                <span className="text-black/60">Best Price:</span>
                <span className="font-medium text-black">
                  {insights.cheapest.brand} {insights.cheapest.model}
                </span>
                <span className="text-black/40">({insights.cheapest.price})</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-black/40" />
                <span className="text-black/60">Newest:</span>
                <span className="font-medium text-black">
                  {insights.newest.brand} {insights.newest.model}
                </span>
                <span className="text-black/40">({insights.newest.year})</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-black/40" />
                <span className="text-black/60">Lowest Mileage:</span>
                <span className="font-medium text-black">
                  {insights.lowestMileage.brand} {insights.lowestMileage.model}
                </span>
                <span className="text-black/40">({insights.lowestMileage.mileage})</span>
              </div>
            </div>
          </section>
        )}

        {/* Comparison Table */}
        <main className="flex-1 overflow-auto bg-white">
          <div className="min-w-full">
            <table className="w-full" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {/* Header Row with Vehicle Info */}
              <thead className="sticky top-0 z-20 bg-white">
                <tr className="border-b border-black/10">
                  <th className="w-48 px-6 py-4 bg-white text-left sticky left-0 z-30">
                    <span className="text-xs font-medium text-black/60 tracking-wider">
                      SPECIFICATIONS
                    </span>
                  </th>
                  {vehicles.map(v => (
                    <th key={v.id} className="min-w-[240px] px-6 py-4 text-center">
                      <div className="space-y-2">
                        <Image
                          src={v.image || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?fit=crop&w=600&h=400'}
                          alt={`${v.brand} ${v.model}`}
                          width={240}
                          height={96}
                          className="h-24 w-full object-cover"
                        />
                        <div>
                          <div className="text-sm font-medium text-black">
                            {v.brand} {v.model}
                          </div>
                          <div className="text-xs text-black/40 font-light">
                            {v.year} Model
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Data Rows */}
              <tbody>
                {renderRow(
                  'Price',
                  vehicles.map(v => v.price),
                  null,
                  vehicles.findIndex(v => v === insights?.cheapest)
                )}
                {renderRow(
                  'Mileage',
                  vehicles.map(v => v.mileage),
                  Car,
                  vehicles.findIndex(v => v === insights?.lowestMileage)
                )}
                {renderRow(
                  'Year',
                  vehicles.map(v => v.year.toString()),
                  Calendar,
                  vehicles.findIndex(v => v === insights?.newest)
                )}
                {renderRow(
                  'Fuel Type',
                  vehicles.map(v => v.fuelType),
                  Fuel
                )}
                {renderRow(
                  'Transmission',
                  vehicles.map(v => v.transmission),
                  Settings
                )}
                {renderRow(
                  'Seating Capacity',
                  vehicles.map(v => v.seating ? `${v.seating} Seats` : 'N/A'),
                  Users
                )}
                {renderRow(
                  'Color',
                  vehicles.map(v => v.color || 'Multiple Options'),
                  Palette
                )}
                {renderRow(
                  'Location',
                  vehicles.map(v => v.location),
                  MapPin
                )}
              </tbody>
            </table>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-between px-8 py-5 border-t border-black/10 bg-white"
                style={{ fontFamily: 'Manrope, sans-serif' }}>
          <div className="text-xs text-black/40">
            Compare up to 4 vehicles side-by-side
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleClose}
              className="px-6 py-3 border border-black/20 text-black/70 hover:bg-black/5 transition-all duration-200 text-sm font-light tracking-wider"
            >
              CLOSE
            </button>
            <button
              onClick={handleClearAndClose}
              className="px-6 py-3 bg-black text-white hover:bg-black/90 transition-all duration-200 text-sm font-light tracking-wider"
            >
              CLEAR & CLOSE
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CompareDrawerClient;