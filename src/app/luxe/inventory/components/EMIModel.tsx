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
  function parsePriceToRupees(priceString: string): number {
    const clean = priceString.replace(/[^0-9.]/g, '');
    if (priceString.toLowerCase().includes('lakh')) {
      return parseFloat(clean) * 100000;
    } else if (priceString.toLowerCase().includes('crore')) {
      return parseFloat(clean) * 10000000;
    } else {
      return parseFloat(clean);
    }
  }

  const carPrice = vehicle ? parsePriceToRupees(vehicle.price) || 0 : 0;

  // EMI form states
  const [downPayment, setDownPayment] = useState(Math.round(carPrice * 0.2));
  const [tenure, setTenure] = useState(60); // months
  const [interest, setInterest] = useState(8.5);

  // Show EMI form or Customer form
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  // Customer form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerErrors, setCustomerErrors] = useState<{ name?: string; phone?: string }>({});

  // Submission state
  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const loanAmount = Math.max(carPrice - downPayment, 0);

  // Reset all on vehicle change or modal open/close
  useEffect(() => {
    if (vehicle) {
      const newCarPrice = parsePriceToRupees(vehicle.price) || 0;
      setDownPayment(Math.round(newCarPrice * 0.2));
    }
    setTenure(60);
    setInterest(8.5);
    setShowCustomerForm(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerErrors({});
    setSavingStatus('idle');
  }, [vehicle, visible]);

  // Early return after hooks
  if (!visible || !vehicle) return null;

  function calculateEMI() {
    if (!loanAmount || !interest || !tenure) return 0;
    const r = interest / (12 * 100);
    const emi = (loanAmount * r * Math.pow(1 + r, tenure)) /
      (Math.pow(1 + r, tenure) - 1);
    return isNaN(emi) ? 0 : Math.round(emi);
  }

  const downMin = Math.round(carPrice * 0.10);
  const downMax = Math.round(carPrice * 0.50);

  // Validate customer form inputs
  const validateCustomerForm = (): boolean => {
    const errors: { name?: string; phone?: string } = {};
    if (!customerName.trim()) {
      errors.name = 'Name is required';
    }
    // Basic phone validation (10 digits)
    if (!customerPhone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customerPhone.trim())) {
      errors.phone = 'Phone number must be 10 digits';
    }
    setCustomerErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle click on "Apply for Loan" => show customer form
  const onApplyClick = () => {
    setCustomerErrors({});
    setShowCustomerForm(true);
  };

  // Handle customer form submission
  const handleCustomerSubmit = async () => {
    if (!validateCustomerForm()) return;

    setSavingStatus('saving');

    const dataToSave = {
      vehicleId: vehicle.id,
      brand: vehicle.brand,
      model: vehicle.model,
      onRoadPrice: vehicle.price,
      downPayment,
      tenure,
      interestRate: interest,
      emi: calculateEMI(),
      loanAmount,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      appliedAt: new Date().toISOString(),
    };

    try {
      // Mock API call — replace URL with your actual endpoint
      const response = await fetch('https://your-api.example.com/loanApplications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) throw new Error('Failed to save application');

      setSavingStatus('success');
    } catch (error) {
      console.error('Apply save error:', error);
      setSavingStatus('error');
    }
  };

  // Render EMI form or Customer form depending on state
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
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 bg-slate-800 p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {showCustomerForm ? (
          <>
            <h2 className="text-2xl font-black bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text mb-4">
              Almost done! Please share your details
            </h2>
            <div className="mb-4 text-slate-300">
              Our expert will reach out to you soon after application.
            </div>

            <div className="mb-4">
              <label className="block text-slate-200 font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 bg-slate-800 text-white outline-none ${
                  customerErrors.name ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="Enter your name"
                disabled={savingStatus === 'saving'}
              />
              {customerErrors.name && (
                <div className="text-red-500 text-sm mt-1">{customerErrors.name}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-slate-200 font-medium mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 bg-slate-800 text-white outline-none ${
                  customerErrors.phone ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="Enter 10-digit phone number"
                disabled={savingStatus === 'saving'}
              />
              {customerErrors.phone && (
                <div className="text-red-500 text-sm mt-1">{customerErrors.phone}</div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  if (savingStatus !== 'saving') {
                    setShowCustomerForm(false);
                    setCustomerErrors({});
                  }
                }}
                className="flex-1 py-3 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 transition font-medium"
                disabled={savingStatus === 'saving'}
              >
                Cancel
              </button>

              <button
                onClick={handleCustomerSubmit}
                disabled={savingStatus === 'saving'}
                className={`flex-1 py-3 font-bold rounded-lg tracking-wider shadow-lg ${
                  savingStatus === 'saving'
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black hover:opacity-90'
                }`}
                style={{ boxShadow: '0 2px 8px #d4af3740' }}
              >
                {savingStatus === 'saving' ? 'Submitting...' : 'Submit'}
              </button>
            </div>

            {savingStatus === 'success' && (
              <div className="mt-4 text-green-400 font-semibold text-center">
                Your loan application has been submitted successfully!
              </div>
            )}
            {savingStatus === 'error' && (
              <div className="mt-4 text-red-500 font-semibold text-center">
                Failed to submit application. Please try again.
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-black bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-transparent bg-clip-text mb-2 flex items-center gap-2">
              <Calculator className="w-6 h-6" />
              EMI Calculator
            </h2>
            <div className="mb-6 text-base text-slate-300">
              Calculate a transparent monthly payment for your{' '}
              <span className="font-medium text-white">{vehicle.brand + ' ' + vehicle.model}</span>
            </div>

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

            <div className="grid grid-cols-2 gap-4 mb-6">
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

            <div className="flex gap-3 mt-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 transition font-medium"
              >
                Close
              </button>
              <button
                onClick={onApplyClick}
                disabled={savingStatus === 'saving'}
                className={`flex-1 py-3 font-bold rounded-lg tracking-wider shadow-lg 
                  bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black hover:opacity-90`}
                style={{ boxShadow: '0 2px 8px #d4af3740' }}
              >
                Apply for Loan
              </button>
            </div>

            {/* Any message while in EMI form */}
            {savingStatus === 'success' && (
              <div className="mt-4 text-green-400 font-semibold text-center">
                Your loan application has been submitted successfully!
              </div>
            )}
            {savingStatus === 'error' && (
              <div className="mt-4 text-red-500 font-semibold text-center">
                Failed to submit application. Please try again.
              </div>
            )}
          </>
        )}

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