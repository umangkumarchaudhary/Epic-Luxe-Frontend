'use client';

// EMIModalClient.tsx - Client Component (Interactive)
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { X, Calculator, ChevronRight, Check } from 'lucide-react';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  originalPrice?: string;
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

interface EMIModalClientProps {
  visible: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
}

const formatINR = (n: number): string => {
  if (n >= 10000000) {
    return `₹${(n / 10000000).toFixed(2)} Cr`;
  } else if (n >= 100000) {
    return `₹${(n / 100000).toFixed(2)} L`;
  }
  return `₹${n.toLocaleString('en-IN')}`;
};

const EMIModalClient: React.FC<EMIModalClientProps> = ({ visible, onClose, vehicle }) => {
  // Parse price helper function
  const parsePriceToRupees = useCallback((priceString: string): number => {
    const clean = priceString.replace(/[^0-9.]/g, '');
    if (priceString.toLowerCase().includes('lakh')) {
      return parseFloat(clean) * 100000;
    } else if (priceString.toLowerCase().includes('crore')) {
      return parseFloat(clean) * 10000000;
    }
    return parseFloat(clean) || 0;
  }, []);

  const carPrice = useMemo(() => 
    vehicle ? parsePriceToRupees(vehicle.price) : 0, 
    [vehicle, parsePriceToRupees]
  );

  // EMI form states
  const [downPayment, setDownPayment] = useState(Math.round(carPrice * 0.2));
  const [tenure, setTenure] = useState(60);
  const [interest, setInterest] = useState(8.5);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  
  // Customer form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerErrors, setCustomerErrors] = useState<{ name?: string; phone?: string }>({});
  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const loanAmount = useMemo(() => Math.max(carPrice - downPayment, 0), [carPrice, downPayment]);
  const downMin = useMemo(() => Math.round(carPrice * 0.10), [carPrice]);
  const downMax = useMemo(() => Math.round(carPrice * 0.50), [carPrice]);

  // Reset states on modal open/close or vehicle change
  useEffect(() => {
    if (visible && carPrice > 0) {
      setDownPayment(Math.round(carPrice * 0.2));
      setTenure(60);
      setInterest(8.5);
      setShowCustomerForm(false);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerErrors({});
      setSavingStatus('idle');
    }
  }, [vehicle, visible, carPrice]);

  // EMI Calculation
  const calculateEMI = useCallback(() => {
    if (!loanAmount || !interest || !tenure) return 0;
    const r = interest / (12 * 100);
    const emi = (loanAmount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);
    return isNaN(emi) ? 0 : Math.round(emi);
  }, [loanAmount, interest, tenure]);

  // Format phone number
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return cleaned;
  };

  // Validate customer form
  const validateCustomerForm = useCallback((): boolean => {
    const errors: { name?: string; phone?: string } = {};
    if (!customerName.trim()) {
      errors.name = 'Name is required';
    }
    if (!customerPhone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customerPhone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    setCustomerErrors(errors);
    return Object.keys(errors).length === 0;
  }, [customerName, customerPhone]);

  // Handle customer form submission
  const handleCustomerSubmit = useCallback(async () => {
    if (!validateCustomerForm() || !vehicle) return;

    setSavingStatus('saving');

    const dataToSave = {
      vehicleId: vehicle.id,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      onRoadPrice: carPrice,
      downPayment,
      tenure,
      interestRate: interest,
      emi: calculateEMI(),
      loanAmount,
      customerName: customerName.trim(),
      customerPhone: customerPhone.replace(/\D/g, ''),
      appliedAt: new Date().toISOString(),
    };

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/loan-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) throw new Error('Failed to save application');
      
      setSavingStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Application submission error:', error);
      setSavingStatus('error');
    }
  }, [validateCustomerForm, vehicle, carPrice, downPayment, tenure, interest, calculateEMI, loanAmount, customerName, customerPhone, onClose]);

  if (!visible || !vehicle) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="emi-modal-title"
    >
      <div
        className="relative bg-white border border-black/10 w-full max-w-md mx-4 animate-slideUp"
        onClick={e => e.stopPropagation()}
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 hover:bg-black/5 transition-colors duration-200 rounded-full"
        >
          <X className="w-5 h-5 text-black/60" />
        </button>

        <div className="p-8">
          {showCustomerForm ? (
            // Customer Form View
            <>
              <h2 id="emi-modal-title" className="text-2xl font-light text-black mb-2">
                Complete Your Application
              </h2>
              <p className="text-sm text-black/60 mb-8">
                Our financing specialist will contact you within 24 hours
              </p>

              <form onSubmit={(e) => { e.preventDefault(); handleCustomerSubmit(); }}>
                <div className="mb-6">
                  <label htmlFor="customer-name" className="block text-xs font-medium text-black/80 mb-2 tracking-wider">
                    FULL NAME
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className={`w-full px-0 py-3 bg-transparent border-b text-black placeholder-black/30 focus:outline-none transition-colors duration-200 ${
                      customerErrors.name ? 'border-red-500' : 'border-black/20 focus:border-black'
                    }`}
                    placeholder="Enter your full name"
                    disabled={savingStatus === 'saving'}
                    autoComplete="name"
                  />
                  {customerErrors.name && (
                    <p className="text-red-500 text-xs mt-2">{customerErrors.name}</p>
                  )}
                </div>

                <div className="mb-8">
                  <label htmlFor="customer-phone" className="block text-xs font-medium text-black/80 mb-2 tracking-wider">
                    PHONE NUMBER
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    value={formatPhoneNumber(customerPhone)}
                    onChange={e => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                    className={`w-full px-0 py-3 bg-transparent border-b text-black placeholder-black/30 focus:outline-none transition-colors duration-200 ${
                      customerErrors.phone ? 'border-red-500' : 'border-black/20 focus:border-black'
                    }`}
                    placeholder="123-456-7890"
                    disabled={savingStatus === 'saving'}
                    autoComplete="tel"
                    maxLength={12}
                  />
                  {customerErrors.phone && (
                    <p className="text-red-500 text-xs mt-2">{customerErrors.phone}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (savingStatus !== 'saving') {
                        setShowCustomerForm(false);
                        setCustomerErrors({});
                      }
                    }}
                    className="flex-1 py-3 border border-black/20 text-black/60 hover:bg-black/5 transition-colors duration-200 text-sm font-light tracking-wider"
                    disabled={savingStatus === 'saving'}
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    disabled={savingStatus === 'saving'}
                    className="flex-1 py-3 bg-black text-white hover:bg-black/90 transition-colors duration-200 text-sm font-light tracking-wider disabled:bg-black/30"
                  >
                    {savingStatus === 'saving' ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
                  </button>
                </div>
              </form>

              {savingStatus === 'success' && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-green-800">Application submitted successfully!</p>
                </div>
              )}
              {savingStatus === 'error' && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200">
                  <p className="text-sm text-red-800">Failed to submit. Please try again.</p>
                </div>
              )}
            </>
          ) : (
            // EMI Calculator View
            <>
              <h2 id="emi-modal-title" className="text-2xl font-light text-black mb-2 flex items-center gap-3">
                <Calculator className="w-5 h-5" />
                EMI Calculator
              </h2>
              
              {/* Vehicle Info */}
              <div className="flex items-center gap-4 py-6 border-b border-black/10">
                <Image
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  width={80}
                  height={56}
                  className="w-20 h-14 object-cover"
                />
                <div>
                  <p className="text-xs text-black/60 tracking-wider">VEHICLE PRICE</p>
                  <p className="text-xl font-light text-black">{vehicle.price}</p>
                  <p className="text-xs text-black/40">{vehicle.brand} {vehicle.model} {vehicle.year}</p>
                </div>
              </div>

              {/* Down Payment Slider */}
              <div className="py-6 border-b border-black/10">
                <label className="flex justify-between items-baseline mb-4">
                  <span className="text-xs font-medium text-black/80 tracking-wider">DOWN PAYMENT</span>
                  <span className="text-lg font-light text-black">{formatINR(downPayment)}</span>
                </label>
                <input
                  type="range"
                  min={downMin}
                  max={downMax}
                  step={10000}
                  value={downPayment}
                  onChange={e => setDownPayment(Number(e.target.value))}
                  className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, black 0%, black ${((downPayment - downMin) / (downMax - downMin)) * 100}%, #e5e5e5 ${((downPayment - downMin) / (downMax - downMin)) * 100}%, #e5e5e5 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-black/40 mt-2">
                  <span>10% • {formatINR(downMin)}</span>
                  <span>50% • {formatINR(downMax)}</span>
                </div>
              </div>

              {/* Tenure and Interest */}
              <div className="grid grid-cols-2 gap-6 py-6 border-b border-black/10">
                <div>
                  <label htmlFor="tenure" className="block text-xs font-medium text-black/80 mb-3 tracking-wider">
                    LOAN TENURE
                  </label>
                  <select
                    id="tenure"
                    value={tenure}
                    onChange={e => setTenure(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-transparent border border-black/20 text-black focus:outline-none focus:border-black transition-colors duration-200"
                  >
                    {[36, 48, 60, 72, 84].map(months => (
                      <option key={months} value={months}>
                        {months / 12} Years
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-black/80 mb-3 tracking-wider">
                    INTEREST RATE
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="7"
                      max="15"
                      step="0.1"
                      value={interest}
                      onChange={e => setInterest(Number(e.target.value))}
                      className="w-20 px-2 py-2 bg-transparent border border-black/20 text-black focus:outline-none focus:border-black transition-colors duration-200"
                    />
                    <span className="text-sm text-black/60">% p.a.</span>
                  </div>
                </div>
              </div>

              {/* EMI Display */}
              <div className="py-8 text-center">
                <p className="text-xs text-black/60 mb-2 tracking-wider">MONTHLY EMI</p>
                <p className="text-4xl font-light text-black mb-2">{formatINR(calculateEMI())}</p>
                <p className="text-xs text-black/40">
                  Loan Amount: {formatINR(loanAmount)} • {tenure} months @ {interest.toFixed(1)}%
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 border border-black/20 text-black/60 hover:bg-black/5 transition-colors duration-200 text-sm font-light tracking-wider"
                >
                  CLOSE
                </button>
                <button
                  onClick={() => setShowCustomerForm(true)}
                  className="group flex-1 py-3 bg-black text-white hover:bg-black/90 transition-colors duration-200 text-sm font-light tracking-wider flex items-center justify-center gap-2"
                >
                  APPLY FOR LOAN
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: black;
          cursor: pointer;
          border-radius: 50%;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: black;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default EMIModalClient;