'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Calculator,
  Shield,
  Car,
  IndianRupee,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  X,
} from 'lucide-react';

// TypeScript interfaces
interface CarData {
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  tag: string;
}

interface FormData {
  name: string;
  phone: string;
  preferredCar: string;
}

const PremiumEMICalculator = () => {
  // Main state
  const [carPrice, setCarPrice] = useState<number>(5300000);
  const [downPayment, setDownPayment] = useState<number>(400000);
  const [loanTenure, setLoanTenure] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [currentCarIndex, setCurrentCarIndex] = useState<number>(0);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayable, setTotalPayable] = useState<number>(0);
  const [topCars, setTopCars] = useState<CarData[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    preferredCar: ''
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Default values for comparison
  const defaultCarPrice = 5300000;
  const defaultDownPayment = 400000;
  const defaultTenure = 5;
  const defaultInterest = 8.5;

  // For test case: did user actually change loan config?
  const loanIsDefault =
    carPrice === defaultCarPrice &&
    downPayment === defaultDownPayment &&
    loanTenure === defaultTenure &&
    interestRate === defaultInterest;

  const luxuryCarDatabase: CarData[] = useMemo(() => [
    { brand: 'BMW', model: '3 Series', year: 2019, price: 2850000, image: '🚗', tag: 'Popular' },
    { brand: 'Audi', model: 'A4', year: 2018, price: 2680000, image: '🚙', tag: 'Value' },
    { brand: 'Mercedes', model: 'C-Class', year: 2020, price: 3200000, image: '🚗', tag: 'Premium' },
    { brand: 'BMW', model: 'X3', year: 2019, price: 4200000, image: '🚙', tag: 'SUV' },
    { brand: 'Audi', model: 'Q5', year: 2020, price: 4800000, image: '🚙', tag: 'Luxury' },
    { brand: 'Mercedes', model: 'GLC', year: 2019, price: 4500000, image: '🚙', tag: 'SUV' },
    { brand: 'BMW', model: '5 Series', year: 2020, price: 5200000, image: '🚗', tag: 'Executive' },
    { brand: 'Audi', model: 'A6', year: 2019, price: 5500000, image: '🚗', tag: 'Luxury' },
  ], []);

  useEffect(() => {
    const principal = carPrice - downPayment;
    const monthlyRate = interestRate / (12 * 100);
    const numberOfPayments = loanTenure * 12;
    if (principal > 0 && monthlyRate > 0) {
      const emiAmount =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      const totalAmount = emiAmount * numberOfPayments;
      const interestAmount = totalAmount - principal;
      setEmi(Math.round(emiAmount));
      setTotalInterest(Math.round(interestAmount));
      setTotalPayable(Math.round(totalAmount));
    }
  }, [carPrice, downPayment, loanTenure, interestRate]);

  useEffect(() => {
    const maxPrice = carPrice + carPrice * 0.3;
    const minPrice = carPrice - carPrice * 0.2;
    const recommendations = luxuryCarDatabase
      .filter((car) => car.price >= minPrice && car.price <= maxPrice)
      .sort((a, b) => Math.abs(a.price - carPrice) - Math.abs(b.price - carPrice))
      .slice(0, 4);
    setTopCars(recommendations);
    setCurrentCarIndex(0);
  }, [carPrice, luxuryCarDatabase]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCompact = (amount: number): string => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  const getEMIForCar = (carPrice: number): number => {
    const principal = carPrice - downPayment;
    const monthlyRate = interestRate / (12 * 100);
    const numberOfPayments = loanTenure * 12;
    if (principal > 0 && monthlyRate > 0) {
      const emiAmount =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      return Math.round(emiAmount);
    }
    return 0;
  };

  const nextCar = () => setCurrentCarIndex((prev) => (prev + 1) % topCars.length);
  const prevCar = () => setCurrentCarIndex((prev) => (prev - 1 + topCars.length) % topCars.length);

  // Handle form input changes
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (simulate DB)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    // You'd POST here later:
    // fetch('/api/loan', { method: 'POST', body: JSON.stringify({ ...form, loanSummary:{...} }) })
    //   .then(...)
  };

  // Reset form on modal close
  const handleModalClose = () => {
    setShowForm(false);
    setFormSubmitted(false);
    setForm({
      name: '',
      phone: '',
      preferredCar: ''
    });
  };

  return (
    <section
      className="h-[100vh] min-h-0 bg-gradient-to-b from-black via-gray-900 to-black flex flex-col justify-center items-center"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col justify-center items-center h-full">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full">
              <Calculator className="w-5 h-5 text-black" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Premium Car Finance Calculator
            </h2>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Calculate EMI &amp; discover car matches instantly
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full overflow-y-auto">
          {/* Loan Config */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl border border-[#D4AF37]/30 flex flex-col h-[420px]">
            <h3 className="text-lg font-semibold text-[#D4AF37] mb-3 flex items-center gap-2">
              <IndianRupee className="w-5 h-5" /> Loan Config
            </h3>
            <div className="flex-1 flex flex-col gap-4 justify-between">
              {/* Car Price */}
              <div>
                <div className="flex justify-between text-sm items-center mb-2">
                  <label className="text-white">Car Price</label>
                  <span className="font-semibold text-[#D4AF37]">{formatCompact(carPrice)}</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="100000"
                  value={carPrice}
                  onChange={(e) => setCarPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹5L</span>
                  <span>₹1Cr</span>
                </div>
              </div>
              {/* Down Payment */}
              <div>
                <div className="flex justify-between text-sm items-center mb-2">
                  <label className="text-white">Down Payment</label>
                  <span className="font-semibold text-[#D4AF37]">{formatCompact(downPayment)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={carPrice * 0.5}
                  step="50000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹0</span>
                  <span>{formatCompact(carPrice * 0.5)}</span>
                </div>
              </div>
              {/* Tenure and Interest */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex flex-col mb-2">
                    <label className="text-white text-xs">Tenure</label>
                    <span className="font-semibold text-[#D4AF37] text-base">{loanTenure}Y</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    step="1"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1Y</span>
                    <span>7Y</span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col mb-2">
                    <label className="text-white text-xs">Interest</label>
                    <span className="font-semibold text-[#D4AF37] text-base">{interestRate.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min="7"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>7%</span>
                    <span>15%</span>
                  </div>
                </div>
              </div>
              <div className="pt-2 mt-3 border-t border-[#D4AF37]/30 flex justify-center gap-6 text-xs text-yellow-400">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  RBI Approved
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  100% Secure
                </div>
              </div>
            </div>
          </div>
          {/* Right: EMI and Car List */}
          <div className="flex flex-col gap-4 h-[420px] justify-between">
            {/* EMI */}
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-2xl p-6 shadow text-center h-[160px] flex flex-col justify-center">
              <h3 className="text-black text-base font-semibold uppercase tracking-widest mb-2">EMI</h3>
              <div className="text-4xl font-bold text-black mb-2">{formatCompact(emi)}</div>
              <div className="text-black/80 text-sm">{formatCurrency(emi)}/mo</div>
              <div className="grid grid-cols-2 gap-5 mt-4 text-black font-semibold text-sm">
                <div>
                  <div className="text-xs font-normal text-black/70">Interest</div>
                  <div>{formatCompact(totalInterest)}</div>
                </div>
                <div>
                  <div className="text-xs font-normal text-black/70">Payable</div>
                  <div>{formatCompact(totalPayable)}</div>
                </div>
              </div>
            </div>
            {/* Cars in Budget */}
            <div className="bg-gray-900 rounded-2xl p-4 shadow border border-[#D4AF37]/20 h-[160px] flex flex-col justify-center">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[#D4AF37] font-semibold flex items-center gap-2 text-sm">
                  <Car className="w-5 h-5" /> Cars ({formatCompact(emi)}/mo)
                </h3>
                {topCars.length > 0 && (
                  <div className="flex items-center gap-2 text-yellow-500 text-sm font-semibold">
                    <span>
                      {currentCarIndex + 1}/{topCars.length}
                    </span>
                    <button
                      onClick={prevCar}
                      disabled={topCars.length === 0}
                      className="p-2 rounded bg-gray-700 hover:bg-yellow-600 hover:text-black transition disabled:opacity-40"
                      title="Previous Car"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextCar}
                      disabled={topCars.length === 0}
                      className="p-2 rounded bg-gray-700 hover:bg-yellow-600 hover:text-black transition disabled:opacity-40"
                      title="Next Car"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
              {topCars.length > 0 ? (
                <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-between text-sm h-[48px]">
                  {(() => {
                    const car = topCars[currentCarIndex];
                    const carEMI = getEMIForCar(car.price);
                    const emiDiff = carEMI - emi;
                    return (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{car.image}</span>
                          <div>
                            <span className="font-bold text-white">{car.brand} {car.model}</span>
                            <span className="bg-yellow-500 text-black text-[10px] px-2 py-0.5 rounded-full font-bold ml-1">
                              {car.tag}
                            </span>
                            <div className="text-gray-300 text-xs">
                              {car.year} • {formatCompact(car.price)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-500 font-semibold">{formatCompact(carEMI)}</div>
                          <div className="text-gray-400 text-xs">/mo</div>
                          {emiDiff !== 0 && (
                            <div className={`text-xs font-medium ${emiDiff > 0 ? 'text-red-400' : 'text-green-400'}`}>
                              {emiDiff > 0 ? '+' : ''}
                              {formatCompact(Math.abs(emiDiff))}
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center py-2 text-gray-400 text-sm">
                  <Car className="w-7 h-7 mx-auto opacity-50" />
                  <p>No matches found</p>
                </div>
              )}
              {topCars.length > 0 && (
                <button className="w-full mt-2 bg-gray-700 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm font-semibold shadow transition-all duration-200">
                  View All {topCars.length}
                </button>
              )}
            </div>
            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4 h-[48px] mt-1">
              <button
                className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-2 py-3 rounded-xl font-bold text-sm hover:from-[#BFA980] hover:to-[#D4AF37] transition shadow"
                onClick={() => setShowForm(true)}
              >
                Apply
              </button>
              <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-sm">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </button>
              <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm">
                <Phone className="w-5 h-5" /> Call
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-black to-[#18181b] rounded-2xl border border-[#D4AF37] shadow-2xl p-0 w-full max-w-md mx-4 relative overflow-hidden">
            {/* Close */}
            <button
              className="absolute top-4 right-4 p-1 rounded-full bg-[#232323] border border-[#BFA980]/40 hover:bg-[#2e2e2e] text-[#BFA980]"
              onClick={handleModalClose}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 pt-6">
              <div className="flex items-center mb-1">
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-xl p-2 mr-3">
                  <IndianRupee className="w-5 h-5 text-black" />
                </span>
                <h2 className="text-xl font-bold text-white">Apply for Finance Consultation</h2>
              </div>
              <p className="text-xs text-[#BFA980] mb-4 ml-1">Get tailored loan offers or a personal call-back from our premium team.</p>
              {/* Conditional Summary or Info */}
              <div className="bg-black/80 rounded-xl border border-[#D4AF37]/40 p-4 mb-4">
                {!loanIsDefault ? (
                  <div>
                    <div className="flex flex-col gap-1">
                      <span className="text-white/80 text-sm">Selected Loan Summary</span>
                      <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                        <span className="text-[#BFA980] font-medium">Loan Amount:</span>
                        <span className="text-white font-semibold">{formatCurrency(carPrice - downPayment)}</span>
                        <span className="text-[#BFA980] font-medium">EMI Tenure:</span>
                        <span className="text-white font-semibold">{loanTenure} years</span>
                        <span className="text-[#BFA980] font-medium">Interest:</span>
                        <span className="text-white font-semibold">{interestRate.toFixed(1)}%</span>
                        <span className="text-[#BFA980] font-medium">Your EMI:</span>
                        <span className="text-white font-semibold">{formatCurrency(emi)}/mo</span>
                        <span className="text-[#BFA980] font-medium">Total Payable:</span>
                        <span className="text-white font-semibold">{formatCurrency(totalPayable)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-[#D4AF37] text-xs font-semibold pb-1">
                      This is a pre-selected default finance option.
                    </div>
                    <div className="text-white text-xs">
                      If you wish to get a tailored EMI proposal, please go back and pick your chosen Car Price, Down Payment, Tenure, and Interest.<br />
                      <span className="text-[#BFA980] block mt-2">
                        Or simply fill your details below, and our finance concierge will assist you within 2 working hours.
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {/* The Form */}
              {formSubmitted ? (
                <div className="text-center">
                  <span className="text-[#D4AF37] font-bold text-lg">Thank you!</span>
                  <p className="text-white text-sm mt-3">
                    Your request has been captured. Our team will reach out within 2 hours to curate the best finance options for you.
                  </p>
                  <button
                    className="mt-7 text-xs flex mx-auto px-6 py-2 rounded-md border border-[#D4AF37] text-[#D4AF37] hover:bg-[#18181b] transition"
                    onClick={handleModalClose}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form className="flex flex-col gap-3" onSubmit={handleSubmit} autoComplete="off">
                  <div>
                    <label className="font-light text-sm text-[#BFA980] pb-1 pl-1 block">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      minLength={2}
                      className="w-full px-4 py-3 rounded-lg bg-black border border-[#BFA980] text-white font-medium placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                      placeholder="Your Full Name"
                      value={form.name}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label className="font-light text-sm text-[#BFA980] pb-1 pl-1 block">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      inputMode="tel"
                      pattern="[0-9]{10,}"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black border border-[#BFA980] text-white font-medium placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                      placeholder="10-digit mobile"
                      value={form.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label className="font-light text-sm text-[#BFA980] pb-1 pl-1 block">Preferred Car <span className="opacity-70">(optional)</span></label>
                    <input
                      type="text"
                      name="preferredCar"
                      className="w-full px-4 py-3 rounded-lg bg-black border border-[#BFA980] text-white font-medium placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                      placeholder="e.g. Mercedes-Benz S-Class"
                      value={form.preferredCar}
                      onChange={handleInput}
                    />
                  </div>
                  {/* Legal / Submit */}
                  <button
                    className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-semibold py-3 rounded-lg mt-2 hover:from-[#BFA980] hover:to-[#D4AF37] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/30"
                    type="submit"
                  >
                    Submit Application
                  </button>
                  <div className="text-gray-400 text-xs mt-2 text-center">
                    By applying, you agree to our&nbsp;
                    <a
                      className="text-[#D4AF37] underline hover:text-[#BFA980] transition"
                      href="/TermsOfUse" target="_blank" rel="noopener noreferrer"
                    >
                      Terms &amp; Conditions
                    </a>
                    &nbsp;and&nbsp;
                    <a
                      className="text-[#D4AF37] underline hover:text-[#BFA980] transition"
                      href="/PrivacyPolicy" target="_blank" rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Slider styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4af37, #bfa980);
          cursor: pointer;
          box-shadow: 0 2px 3px rgba(212, 175, 55, 0.5);
          border: 2px solid #bfa980;
          margin-top: -7px;
        }
        .slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 6px #d4af37, 0 0 7px #bfa980;
        }
        .slider::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4af37, #bfa980);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 3px rgba(212, 175, 55, 0.5);
        }
        .slider::-moz-range-thumb:hover {
          box-shadow: 0 0 6px #d4af37, 0 0 7px #bfa980;
        }
        .slider::-webkit-slider-runnable-track {
          background: #374151;
          border-radius: 7px;
          height: 7px;
        }
        .slider::-moz-range-track {
          background: #374151;
          border-radius: 7px;
          height: 7px;
        }
      `}</style>
    </section>
  );
};

export default PremiumEMICalculator;