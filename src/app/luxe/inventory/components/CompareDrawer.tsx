/* CompareDrawer.tsx
   Mercedes-style full-screen comparison
   • Pure black background, white text, gold (#d4af37) accent.
   • Opens **directly** in detailed table view – no extra clicks.
   • Fits typical laptop height (≤9 rows) so the user never scrolls vertically.
   • Adds a quick “Insights” strip highlighting which car is cheapest, newest, etc.
*/
'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  price: string;      // “₹48,90,000”
  year: number;
  mileage: string;    // “12,345 km”
  image: string;
  fuelType: string;
  transmission: string;
  location: string;
  seating?: number;
  color?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  vehicleIds: number[];
  allVehicles: Vehicle[];
  triggerClear: () => void;
}

const GOLD = '#d4af37';

export default function CompareDrawer({
  open,
  onClose,
  vehicleIds,
  allVehicles,
  triggerClear,
}: Props) {
  /* Pick vehicles from ids */
  const vehicles = vehicleIds
    .map(id => allVehicles.find(v => v.id === id))
    .filter(Boolean) as Vehicle[];

  if (!open || vehicles.length === 0) return null;

  /* ---------- derive quick insights ---------- */
  const numeric = (str = '') =>
    Number(str.replace(/[^0-9]/g, '')) || Infinity;

  const cheapest = vehicles.reduce((a, b) =>
    numeric(a.price) < numeric(b.price) ? a : b,
  );
  const newest = vehicles.reduce((a, b) => (a.year > b.year ? a : b));
  const lowestKm = vehicles.reduce((a, b) =>
    numeric(a.mileage) < numeric(b.mileage) ? a : b,
  );

  /* ---------- UI ---------- */
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-40"
        onClick={onClose}
        aria-label="Close comparison"
      />

      {/* Drawer */}
      <div className="fixed inset-0 z-50 flex flex-col bg-black text-white">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <GitCompare className="w-6 h-6" color={GOLD} />
            <h1 className="text-2xl font-bold" style={{ color: GOLD }}>
              Vehicle Comparison
            </h1>
            <span className="text-sm text-gray-400">
              {vehicles.length} selected
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                triggerClear();
                onClose();
              }}
              className="text-gray-400 hover:text-white text-sm"
            >
              Clear all
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Insights */}
        <section className="px-6 py-4 border-b border-gray-700 text-sm">
          <ul className="flex flex-wrap gap-4">
            <li>
              <span style={{ color: GOLD }}>Cheapest:</span>{' '}
              {cheapest.brand} {cheapest.model} (
              {cheapest.price})
            </li>
            <li>
              <span style={{ color: GOLD }}>Newest:</span>{' '}
              {newest.brand} {newest.model} ({newest.year})
            </li>
            <li>
              <span style={{ color: GOLD }}>Lowest KM:</span>{' '}
              {lowestKm.brand} {lowestKm.model} ({lowestKm.mileage})
            </li>
          </ul>
        </section>

        {/* Table – fits <=9 rows in 768-px height without scrolling */}
        <main className="flex-1 overflow-x-auto">
          <table className="min-w-full text-sm">
            {/* Header row */}
            <thead>
              <tr className="border-b border-gray-700 text-left">
                <th className="w-44 px-4 py-3 bg-gray-900">Specification</th>
                {vehicles.map(v => {
                  const [imgSrc, setImgSrc] = useState(v.image);
                  return (
                    <th
                      key={v.id}
                      className="min-w-[220px] px-4 py-3 border-l border-gray-700"
                    >
                      <div className="font-medium">
                        {v.brand} {v.model}
                      </div>
                      <div className="text-gray-400">{v.year}</div>
                      <Image
                        src={imgSrc}
                        alt={`${v.brand} ${v.model}`}
                        width={80}
                        height={80}
                        className="mt-2 h-20 w-auto object-contain rounded"
                        onError={() =>
                          setImgSrc(
                            'https://images.unsplash.com/photo-1555215695-3004980ad54e?fit=crop&w=600&h=400'
                          )
                        }
                      />
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Body rows */}
            <tbody>
              {row('Price', vehicles.map(v => v.price), '💰')}
              {row('Mileage', vehicles.map(v => v.mileage), Car)}
              {row('Fuel', vehicles.map(v => v.fuelType), Fuel)}
              {row('Transmission', vehicles.map(v => v.transmission), Settings)}
              {row('Seating', vehicles.map(v => v.seating?.toString() || 'N/A'), Users)}
              {row('Color', vehicles.map(v => v.color || 'N/A'), Palette)}
              {row('Location', vehicles.map(v => v.location), MapPin)}
              {row('Year', vehicles.map(v => v.year.toString()), Calendar)}
            </tbody>
          </table>
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-center gap-4 px-6 py-5 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-lg border border-gray-600 text-sm"
          >
            Close
          </button>
          <button
            onClick={() => {
              triggerClear();
              onClose();
            }}
            className="px-5 py-3 rounded-lg text-sm font-semibold"
            style={{ background: GOLD, color: 'black' }}
          >
            Clear & close
          </button>
        </footer>
      </div>
    </>
  );
}

/* ─────────────────── helpers ─────────────────── */
function row(
  label: string,
  values: string[],
  Icon:
    | React.ComponentType<{ className?: string }>
    | string /* allow emoji string */
) {
  return (
    <tr className="border-b border-gray-800">
      <td className="w-44 px-4 py-3 bg-gray-900 font-medium flex items-center gap-2">
        {typeof Icon === 'string' ? (
          <span>{Icon}</span>
        ) : (
          <Icon className="w-4 h-4" />
        )}
        {label}
      </td>
      {values.map((val, i) => (
        <td
          key={i}
          className="min-w-[220px] px-4 py-3 border-l border-gray-800 text-center"
        >
          {val}
        </td>
      ))}
    </tr>
  );
}
