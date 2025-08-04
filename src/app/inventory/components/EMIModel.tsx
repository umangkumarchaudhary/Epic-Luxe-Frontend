import React, { useState, useEffect } from 'react';
import { X, Calculator, Info } from 'lucide-react';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  originalPrice: string;
  image: string;
  mileage: string;
  fuelType: string;
  transmission?: string;
  seating: number;
  location: string;
  condition: string;
  features: string[];
  savings: string;
  isLiked: boolean;
  views: number;
}

interface EMIModalProps {
  visible: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
}

const formatINR = (n: number): string => `₹${n.toLocaleString()}`;

const EMIModal: React.FC<EMIModalProps> = ({ visible, onClose, vehicle }) => {
  // Protect if no vehicle selected
  if (!visible || !vehicle) return null;

  // Parse the car price safely
  const carPrice = parseInt(vehicle.price.replace(/[₹,]/g, '')) || 0;

  // Modern default finance values
  const [downPayment, setDownPayment] = useState(Math.round(carPrice * 0.2));
  const [tenure, setTenure] = useState(60); // months
  const [interest, setInterest] = useState(8.5);
  const loanAmount = Math.max(carPrice - downPayment, 0);

  // On change vehicle, reset
  useEffect(() => {
    setDownPayment(Math.round(carPrice * 0.2));
    setTenure(60);
    setInterest(8.5);
  }, [vehicle]);

  // EMI calculation logic
  function calculateEMI() {
    if (!loanAmount || !interest || !tenure) return 0;
    const r = interest / (12 * 100);
    const emi = (loanAmount * r * Math.pow(1 + r, tenure)) /
                (Math.pow(1 + r, tenure) - 1);
    return isNaN(emi) ? 0 : Math.round(emi);
  }

  // Range configs for downpayment (10–50%)
  const downMin = Math.round(carPrice * 0.10);
  const downMax = Math.round(carPrice * 0.50);

  // Animate modal in
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      style={{ animation: 'fadeIn 0.2s' }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md p-7 animate-fadeInUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 bg-slate-800 p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-black bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text mb-2 flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          EMI Calculator
        </h2>
        <div className="mb-6 text-base text-slate-300">
          Calculate a transparent monthly payment for your{' '}
          <span className="font-medium text-white">{vehicle.brand + ' ' + vehicle.model}</span>
        </div>

        {/* Car price and image */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-16 h-10 object-cover rounded-lg border border-slate-600"
          />
          <div>
            <div className="uppercase text-xs tracking-wide text-slate-400">On-road Price</div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text">
              {vehicle.price}
            </div>
          </div>
        </div>

        {/* Downpayment slider */}
        <div className="mb-6">
          <label className="block font-medium mb-2 text-slate-200">Down Payment</label>
          <input
            type="range"
            min={downMin}
            max={downMax}
            step={10000}
            value={downPayment}
            onChange={e => setDownPayment(Number(e.target.value))}
            className="w-full accent-[#d4af37] cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-400 pt-1">
            <span>{formatINR(downMin)}</span>
            <span>{formatINR(downMax)}</span>
          </div>
          <div className="mt-1 text-right text-sm text-[#d4af37] font-semibold">
            {formatINR(downPayment)} &bull; {(downPayment / carPrice * 100).toFixed(0)}% Down
          </div>
        </div>

        {/* Tenure and interest sliders */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Tenure */}
          <div>
            <label className="block font-medium mb-2 text-slate-200">Tenure (months)</label>
            <select
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            >
              {[36, 48, 60, 72, 84].map(mo => (
                <option key={mo} value={mo}>
                  {mo / 12} yr
                </option>
              ))}
            </select>
          </div>
          {/* Interest */}
          <div>
            <label className="block font-medium mb-2 text-slate-200">Interest Rate (%)</label>
            <input
              type="range"
              min="7"
              max="15"
              step="0.1"
              value={interest}
              onChange={e => setInterest(Number(e.target.value))}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
            <div className="text-right text-xs text-slate-400">
              {interest.toFixed(1)}% p.a.
            </div>
          </div>
        </div>

        {/* EMI summary */}
        <div className="bg-gradient-to-r from-slate-800/70 to-slate-900/80 rounded-xl p-4 border border-[#d4af37]/30 mb-4 flex flex-col items-center shadow-inner">
          <div className="text-sm text-slate-400 flex items-center gap-1 mb-1">
            <Info className="w-4 h-4 text-[#d4af37]" />
            Monthly EMI (est.)
          </div>
          <div className="text-3xl font-bold text-[#d4af37] tracking-tight">
            {formatINR(calculateEMI())}
          </div>
          <div className="text-xs mt-1 text-slate-500">
            For {tenure / 12} years @ {interest.toFixed(1)}% • Loan {formatINR(loanAmount)}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 transition font-medium"
          >
            Close
          </button>
          <button
            className="flex-1 py-3 bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black font-bold rounded-lg hover:opacity-90 transition tracking-wider shadow-lg"
            style={{ boxShadow: '0 2px 8px #d4af3740' }}
          >
            Apply for Loan
          </button>
        </div>

        {/* Style for modal animations */}
        <style jsx>{`
          @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
          .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}</style>
      </div>
    </div>
  );
};

export default EMIModal;
