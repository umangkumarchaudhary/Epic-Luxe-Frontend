'use client';

import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import { Calculator, TrendingUp, Zap, IndianRupee, CheckCircle, Car, Users, Shield, Clock, Phone, MapPin, ChevronDown, ChevronUp, Minus, X, Star, Award, CreditCard, FileText, DollarSign } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import PremiumEMICalculator from './EMICalculator';
import FinanceComparisonSection from './ComparisonSection';

// TypeScript interfaces
interface State {
  name: string;
  cities: string[];
}

interface LocationData {
  states: State[];
}

interface FinancePageClientProps {
  locationData: LocationData;
  popularBrands: string[];
  serverTimestamp: string;
}

interface PreOwnedCar {
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  popular?: boolean;
  saving?: boolean;
  premium?: boolean;
  fuel: string;
  km: string;
}

interface FormData {
  name: string;
  phone: string;
  pan: string;
  city: string;
  carInterest: string;
}

interface FinancialPartner {
  name: string;
  logo: string;
  rate: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const FinancePageClient: React.FC<FinancePageClientProps> = ({ locationData, popularBrands, serverTimestamp }) => {
  // EMI Calculator State
  const [carPrice, setCarPrice] = useState<number>(800000); // Adjusted for non-luxury segment
  const [downPayment, setDownPayment] = useState<number>(150000);
  const [loanTenure, setLoanTenure] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayable, setTotalPayable] = useState<number>(0);
  const [affordableCars, setAffordableCars] = useState<PreOwnedCar[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Eligibility Checker State
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [employmentType, setEmploymentType] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [eligibleAmount, setEligibleAmount] = useState<number>(0);
  
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [interestedCar, setInterestedCar] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [step, setStep] = useState<string>("eligibility");
  const [eligibilityError, setEligibilityError] = useState<string>("");

  // Pre-owned car database for non-luxury segment
  const preOwnedCarDatabase: PreOwnedCar[] = [
    { brand: 'Maruti Suzuki', model: 'Swift', year: 2019, price: 650000, image: '🚗', popular: true, fuel: 'Petrol', km: '45,000' },
    { brand: 'Hyundai', model: 'i20', year: 2020, price: 750000, image: '🚙', saving: true, fuel: 'Petrol', km: '32,000' },
    { brand: 'Tata', model: 'Nexon', year: 2021, price: 950000, image: '🚗', premium: true, fuel: 'Diesel', km: '28,000' },
    { brand: 'Honda', model: 'City', year: 2018, price: 850000, image: '🚙', popular: true, fuel: 'Petrol', km: '55,000' },
    { brand: 'Toyota', model: 'Innova', year: 2019, price: 1200000, image: '🚙', fuel: 'Diesel', km: '40,000' },
    { brand: 'Mahindra', model: 'Scorpio', year: 2020, price: 1100000, image: '🚙', fuel: 'Diesel', km: '35,000' },
    { brand: 'Ford', model: 'EcoSport', year: 2019, price: 700000, image: '🚗', premium: true, fuel: 'Petrol', km: '48,000' },
  ];

  // Form State
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    pan: '',
    city: '',
    carInterest: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      lead_type: 'pre_owned_finance',
      lead_title: 'Pre-Owned Car Finance Application',
      name: formData.name,
      phone: formData.phone,
      preferred_car: formData.carInterest,
      loan_amount: carPrice - downPayment,
      emi_tenure: loanTenure,
      interest: interestRate,
      your_emi: emi,
      total_payable: totalPayable,
      source_page: 'Pre-Owned Car Finance'
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(result.error || 'Error submitting application');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  const closeModal = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      pan: "",
      city: "",
      carInterest: "",
    });
  };

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Calculate EMI
  useEffect(() => {
    const principal = carPrice - downPayment;
    const monthlyRate = interestRate / (12 * 100);
    const numberOfPayments = loanTenure * 12;
    
    if (principal > 0 && monthlyRate > 0) {
      const emiAmount = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                       (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      const totalAmount = emiAmount * numberOfPayments;
      const interestAmount = totalAmount - principal;
      
      setEmi(Math.round(emiAmount));
      setTotalInterest(Math.round(interestAmount));
      setTotalPayable(Math.round(totalAmount));
    }
  }, [carPrice, downPayment, loanTenure, interestRate]);

  // Generate car recommendations based on EMI
  useEffect(() => {
    const maxAffordablePrice = carPrice + (carPrice * 0.3);
    const minAffordablePrice = carPrice - (carPrice * 0.2);
    
    const recommendations = preOwnedCarDatabase
      .filter(car => car.price >= minAffordablePrice && car.price <= maxAffordablePrice)
      .sort((a, b) => Math.abs(a.price - carPrice) - Math.abs(b.price - carPrice))
      .slice(0, 3);
    
    setAffordableCars(recommendations);
  }, [carPrice, emi]);

  const checkEligibility = () => {
    if (!monthlyIncome || !employmentType || !city) {
      setEligibilityError("Please fill all fields");
      return;
    }
    
    setEligibilityError("");
    const income = parseInt(monthlyIncome);
    const multiplier = employmentType === "Salaried" ? 50 : 35; // Adjusted for pre-owned segment
    const eligible = Math.round((income * multiplier) / 100000) * 100000;

    setEligibleAmount(eligible);
    setStep("approval");
  };

  const formatLakhs = (amount: number): string => {
    return `₹${(amount / 100000).toFixed(1)} Lakhs`;
  };

  const submitLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowPopup(true);
    } catch (error) {
      alert("There was an error submitting your application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePopupOk = () => {
    setShowPopup(false);
    setMonthlyIncome("");
    setEmploymentType("");
    setCity("");
    setEligibleAmount(0);
    setFullName("");
    setPhone("");
    setEmail("");
    setInterestedCar("");
    setStep("eligibility");
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Financial partners for pre-owned car segment
  const financialPartners: FinancialPartner[] = [
    { name: 'HDFC Bank', logo: '🏦', rate: '8.5%' },
    { name: 'ICICI Bank', logo: '🏛️', rate: '8.75%' },
    { name: 'Axis Bank', logo: '🏢', rate: '9.25%' },
    { name: 'Bajaj Finserv', logo: '🏪', rate: '9.99%' },
    { name: 'Mahindra Finance', logo: '🏬', rate: '10.5%' },
    { name: 'Tata Capital', logo: '🏦', rate: '10.25%' }
  ];

  const faqs: FAQ[] = [
    {
      question: "What is the minimum down payment for pre-owned cars?",
      answer: "For pre-owned cars, we typically require a minimum down payment of 15-20% of the car's value. This helps reduce your EMI and improves loan approval chances."
    },
    {
      question: "Can I get a loan for cars older than 5 years?",
      answer: "Yes, we provide financing for cars up to 8 years old at the time of loan application. However, interest rates may vary based on the car's age and condition."
    },
    {
      question: "What documents are required for pre-owned car finance?",
      answer: "Required documents include: PAN card, Aadhaar, salary slips (last 3 months), bank statements, car registration papers, insurance documents, and pollution certificate."
    },
    {
      question: "How long does the approval process take?",
      answer: "With proper documentation, pre-owned car loans can be approved within 24-48 hours. Digital verification helps speed up the process significantly."
    },
    {
      question: "Are there any processing fees or hidden charges?",
      answer: "We maintain complete transparency. Processing fees typically range from 0.5% to 2% of the loan amount. All charges are clearly mentioned upfront with no hidden costs."
    }
  ];

  // Typewriter effect component
  interface TypewriterTextProps {
    text: string;
    onComplete?: () => void;
    delay?: number;
  }

  const TypewriterText: React.FC<TypewriterTextProps> = ({ text, onComplete, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState<string>('');
    const [, setIsComplete] = useState<boolean>(false);

    const startTyping = useCallback(() => {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsComplete(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 2000);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }, [text, onComplete]);

    useEffect(() => {
      if (delay > 0) {
        const delayTimer = setTimeout(() => {
          startTyping();
        }, delay);
        return () => clearTimeout(delayTimer);
      } else {
        startTyping();
      }
    }, [delay, startTyping]);

    return (
      <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto font-light leading-relaxed">
        {displayedText}
        <span className="animate-pulse">|</span>
      </p>
    );
  };

  const AnimatedMarketingText: React.FC = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
    const [showText, setShowText] = useState<boolean>(true);

    const marketingTexts: string[] = [
      "Affordable pre-owned car finance across South India with instant approval and transparent pricing",
      "Get your dream used car with EMIs starting ₹8,000. Quick approval in 30 minutes - No hidden charges!",
      "Drive home your perfect pre-owned car today with flexible financing options tailored for you",
      "Trusted by thousands across Chennai, Bangalore, Hyderabad - Your reliable used car finance partner"
    ];

    const handleTextComplete = () => {
      setShowText(false);
      
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % marketingTexts.length);
        setShowText(true);
      }, 500);
    };

    return (
      <div className="min-h-[120px] flex items-center justify-center mb-12">
        <div className={`transition-opacity duration-500 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          {showText && (
            <TypewriterText 
              text={marketingTexts[currentTextIndex]} 
              onComplete={handleTextComplete}
              key={currentTextIndex}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mercedes-Benz Inspired Styling */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        h1, h2, h3, h4, .font-heading {
          font-family: 'Playfair Display', serif;
        }

        .mercedes-gradient {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
        }

        .mercedes-shadow {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #000000, #333333);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .slider::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, #000000, #666666);
        }

        .premium-card {
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid #e9ecef;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .mercedes-button {
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mercedes-button:hover {
          background: linear-gradient(135deg, #333333 0%, #000000 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .text-gradient {
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <Header />

      <div className="min-h-screen bg-white text-gray-900">
        {/* Hero Section with Mercedes-Benz Theme */}
        <div className="relative overflow-hidden mercedes-gradient">
          <div className="absolute inset-0">
            <Image
              src="/assets/images/used-cars-hero.jpg"
              alt="Pre-Owned Cars South India"
              fill
              className="object-cover object-center opacity-20"
              priority
              sizes="100vw"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/95"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/98 to-transparent"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-gradient mb-8 tracking-tight leading-tight">
                Pre-Owned Car Finance
              </h1>
              
              <AnimatedMarketingText />
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
                <button 
                  onClick={() => document.getElementById('eligibility')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mercedes-button text-white px-10 py-4 rounded-full font-medium text-lg shadow-lg"
                >
                  <CheckCircle className="inline-block w-5 h-5 mr-2" />
                  Check Eligibility
                </button>
                <button 
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-transparent border-2 border-black text-black px-10 py-4 rounded-full font-medium text-lg hover:bg-black hover:text-white transition-all duration-300"
                >
                  <Calculator className="inline-block w-5 h-5 mr-2" />
                  EMI Calculator
                </button>
              </div>

              {/* Location badges */}
              <div className="mt-12 flex flex-wrap justify-center gap-3">
                {locationData.states.slice(0, 3).map((state: State, index: number) => (
                  <span key={index} className="bg-black/5 text-black px-4 py-2 rounded-full text-sm font-medium">
                    {state.name}
                  </span>
                ))}
               
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Pre-Owned Cars Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-black mb-4">
                Why Choose Pre-Owned Cars?
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Smart financing solutions for budget-conscious buyers across South India
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="premium-card rounded-2xl p-8 text-center">
                <DollarSign className="w-12 h-12 text-black mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Lower EMIs</h3>
                <p className="text-gray-600">EMIs starting from just ₹8,000 for quality pre-owned vehicles</p>
              </div>

              <div className="premium-card rounded-2xl p-8 text-center">
                <Award className="w-12 h-12 text-black mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Quality Assured</h3>
                <p className="text-gray-600">Multi-point inspection ensures vehicle quality and reliability</p>
              </div>

              <div className="premium-card rounded-2xl p-8 text-center">
                <Clock className="w-12 h-12 text-black mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Quick Approval</h3>
                <p className="text-gray-600">Get loan approval in 30 minutes with minimal documentation</p>
              </div>

              <div className="premium-card rounded-2xl p-8 text-center">
                <Shield className="w-12 h-12 text-black mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Transparent Process</h3>
                <p className="text-gray-600">No hidden charges, clear terms, and competitive interest rates</p>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Checker Section */}
        <section id="eligibility" className="py-24 bg-white relative overflow-hidden">
          <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center">
            <div className="text-center mb-12 w-full">
              <h2 className="text-5xl font-heading font-bold text-black mb-4">
                Check Your Loan Eligibility
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Instant eligibility check for pre-owned car finance across South India
              </p>
            </div>

            {step === "eligibility" && (
              <div className="premium-card rounded-3xl p-10 mercedes-shadow w-full max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2 font-medium">Monthly Income</label>
                    <input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      placeholder="e.g. ₹40,000"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:border-black transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2 font-medium">Employment Type</label>
                    <select
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-black focus:ring-2 focus:ring-black focus:border-black transition-all"
                    >
                      <option value="">Select Type</option>
                      <option value="Salaried">Salaried</option>
                      <option value="Self-Employed">Self-Employed</option>
                      <option value="Business">Business Owner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2 font-medium">City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-black focus:ring-2 focus:ring-black focus:border-black transition-all"
                    >
                      <option value="">Select City</option>
                      {locationData.states.map((state: State) => 
                        state.cities.map((cityName: string) => (
                          <option key={cityName} value={cityName}>{cityName}</option>
                        ))
                      )}
                    </select>
                  </div>
                </div>
                
                {eligibilityError && (
                  <p className="mb-6 text-center text-red-600 font-semibold">
                    {eligibilityError}
                  </p>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={checkEligibility}
                    className="mercedes-button text-white font-semibold text-lg py-4 px-16 rounded-lg transition-all"
                  >
                    Check Eligibility Instantly
                  </button>
                </div>
              </div>
            )}

            {step === "approval" && (
              <div className="mt-8 flex flex-col items-center w-full">
                <div className="premium-card rounded-2xl p-8 w-full max-w-2xl mx-auto mercedes-shadow">
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-3xl font-heading font-bold text-black mb-2">
                      You're Eligible!
                    </h3>
                    <p className="text-gray-600 text-base mb-4">
                      Based on your inputs, you may get financing up to:
                    </p>
                    <p className="text-5xl font-heading font-semibold text-black tracking-wider">
                      {formatLakhs(eligibleAmount)}
                    </p>
                  </div>

                  <form className="mt-8 grid md:grid-cols-2 gap-6 text-left" onSubmit={submitLead}>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2 font-medium">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:border-black"
                        placeholder="e.g. Rajesh Kumar"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2 font-medium">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:border-black"
                        placeholder="e.g. 9876543210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2 font-medium">Email (Optional)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:border-black"
                        placeholder="e.g. you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2 font-medium">Interested Car (Optional)</label>
                      <select
                        value={interestedCar}
                        onChange={(e) => setInterestedCar(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-black focus:ring-2 focus:ring-black focus:border-black"
                      >
                        <option value="">Select a car</option>
                        {popularBrands.map((brand: string) => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2 flex justify-center mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`mercedes-button text-white text-lg px-12 py-4 rounded-lg transition-all relative flex items-center justify-center ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          "Get Pre-Approved Now"
                        )}
                      </button>
                    </div>
                    <div className="md:col-span-2 text-center">
                      <p className="text-gray-500 text-xs mt-3">
                        *Subject to document verification and credit score
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {showPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="premium-card rounded-3xl px-8 py-10 mercedes-shadow w-full max-w-md mx-4 text-center relative">
                  <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-heading font-bold text-black mb-3">Application Submitted!</h2>
                  <p className="text-gray-600 mb-6">Thank you for your interest.<br />Our experts will contact you soon.</p>
                  <button
                    onClick={handlePopupOk}
                    className="mercedes-button text-white font-semibold text-lg px-8 py-3 rounded-lg transition-all"
                    autoFocus
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* EMI Calculator - Import as is */}
        <PremiumEMICalculator/>

        

        {/* Finance Comparison Section - Import as is */}
        <FinanceComparisonSection/>

        {/* Trusted Finance Partners */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-black mb-4">
                Trusted Finance Partners
              </h2>
              <p className="text-gray-600 text-lg">
                Competitive rates from India's most trusted lenders
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {financialPartners.map((partner: FinancialPartner, index: number) => (
                <div key={index} className="premium-card rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">{partner.logo}</div>
                  <h3 className="text-sm font-medium text-black mb-1">{partner.name}</h3>
                  <p className="text-xs text-gray-600">From {partner.rate}*</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-500">Interest rates starting from <span className="text-black font-semibold text-xl">8.5%*</span></p>
            </div>
          </div>
        </section>

        {/* State-wise Service Areas */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-black mb-4">
                Financial Services Areas Across South India
              </h2>
              <p className="text-gray-600 text-lg">
                Pre-owned car finance available in major cities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locationData.states.map((state: State, index: number) => (
                <div key={index} className="premium-card rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">{state.name}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {state.cities.slice(0, 6).map((city: string, cityIndex: number) => (
                      <div key={cityIndex} className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-center">
                        {city}
                      </div>
                    ))}
                  </div>
                  {state.cities.length > 6 && (
                    <div className="mt-3 text-center">
                      <span className="text-sm text-gray-500">+{state.cities.length - 6} more cities</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">Serving customers across 50+ cities in South India</p>
              <button className="mercedes-button text-white px-8 py-3 rounded-lg font-medium">
                Find Service in Your City
              </button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-black mb-4">How It Works</h2>
              <p className="text-gray-600 text-lg">Simple steps to finance your dream pre-owned car</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-light text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-black">Choose Your Car</h3>
                <p className="text-gray-600 leading-relaxed">Browse through our verified pre-owned car inventory and select your preferred vehicle.</p>
              </div>
              
              <div className="text-center group">
                <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-black">Check Eligibility</h3>
                <p className="text-gray-600 leading-relaxed">Use our instant eligibility checker to know your loan amount and EMI options.</p>
              </div>
              
              <div className="text-center group">
                <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-black">Submit Documents</h3>
                <p className="text-gray-600 leading-relaxed">Upload required documents online or visit our branch for quick verification.</p>
              </div>
              
              <div className="text-center group">
                <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-black">Drive Home</h3>
                <p className="text-gray-600 leading-relaxed">Complete the paperwork and drive home your pre-owned car with confidence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-black mb-4">Customer Benefits</h2>
              <p className="text-gray-600 text-lg">Premium service for every customer</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="premium-card rounded-xl p-6 text-center">
                <Clock className="w-12 h-12 text-black mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-black">Quick Processing</h3>
                <p className="text-gray-600 leading-relaxed">Loan approval in 30 minutes with minimal documentation required.</p>
              </div>
              
              <div className="premium-card rounded-xl p-6 text-center">
                <Shield className="w-12 h-12 text-black mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-black">Flexible Terms</h3>
                <p className="text-gray-600 leading-relaxed">Loan tenure from 1-7 years with flexible EMI options to suit your budget.</p>
              </div>
              
              <div className="premium-card rounded-xl p-6 text-center">
                <Users className="w-12 h-12 text-black mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-black">Expert Support</h3>
                <p className="text-gray-600 leading-relaxed">Dedicated relationship manager for personalized assistance throughout.</p>
              </div>
              
              <div className="premium-card rounded-xl p-6 text-center">
                <CreditCard className="w-12 h-12 text-black mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-black">No Hidden Fees</h3>
                <p className="text-gray-600 leading-relaxed">Transparent pricing with no hidden charges or processing fees.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-black mb-4">Customer Success Stories</h2>
              <p className="text-gray-600 text-lg">Hear from our satisfied customers across South India</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="premium-card rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i: number) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">"Got my Maruti Swift financed in just 2 days. The process was so smooth and transparent. EMI of ₹12,000 fits perfectly in my budget."</p>
                <div>
                  <h4 className="font-bold text-black">Rajesh Kumar</h4>
                  <p className="text-sm text-gray-500">Chennai, Tamil Nadu</p>
                </div>
              </div>

              <div className="premium-card rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i: number) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">"Amazing service! They helped me get finance for my Hyundai i20. The interest rate was competitive and approval was instant."</p>
                <div>
                  <h4 className="font-bold text-black">Priya Menon</h4>
                  <p className="text-sm text-gray-500">Kochi, Kerala</p>
                </div>
              </div>

              <div className="premium-card rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i: number) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">"Professional team and excellent support. Got my Honda City financed with best rates in the market. Highly recommended!"</p>
                <div>
                  <h4 className="font-bold text-black">Vikram Reddy</h4>
                  <p className="text-sm text-gray-500">Hyderabad, Telangana</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apply Now Form */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading text-black font-bold">
                Apply for Pre-Owned Car Finance
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Start your pre-owned car journey today
              </p>
            </div>

            <form onSubmit={handleSubmit} className="premium-card rounded-3xl mercedes-shadow p-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-700 mb-2 text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition-all"
                  disabled={submitted}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="phone" className="text-gray-700 mb-2 text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition-all"
                  disabled={submitted}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="pan" className="text-gray-700 mb-2 text-sm font-medium">
                  PAN Number <span className="text-gray-500 italic">(Optional)</span>
                </label>
                <input
                  id="pan"
                  name="pan"
                  type="text"
                  value={formData.pan}
                  onChange={handleChange}
                  placeholder="ABCDE1234F"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition-all"
                  disabled={submitted}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="city" className="text-gray-700 mb-2 text-sm font-medium">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-black focus:ring-2 focus:ring-black focus:border-black transition-all"
                  disabled={submitted}
                >
                  <option value="">Select City</option>
                  {locationData.states.map((state: State) => 
                    state.cities.map((cityName: string) => (
                      <option key={cityName} value={cityName}>{cityName}</option>
                    ))
                  )}
                </select>
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label htmlFor="carInterest" className="text-gray-700 mb-2 text-sm font-medium">
                  Car Brand of Interest
                </label>
                <select
                  name="carInterest"
                  id="carInterest"
                  value={formData.carInterest}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-black focus:ring-2 focus:ring-black focus:border-black transition-all"
                  disabled={submitted}
                >
                  <option value="">Select a brand</option>
                  {popularBrands.map((brand: string) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 flex flex-col items-center">
                <button
                  type="submit"
                  className="w-full max-w-sm mercedes-button text-white py-4 text-xl font-semibold tracking-wide transition-all duration-300"
                  disabled={submitted}
                >
                  Submit Application
                </button>

                <p className="mt-5 max-w-xs text-center text-xs text-gray-500">
                  * By submitting, you agree to our{" "}
                  <a href="/terms" className="underline text-black hover:text-gray-700">Terms of Use</a>{" "}
                  and{" "}
                  <a href="/privacy" className="underline text-black hover:text-gray-700">Privacy Policy</a>.
                </p>
              </div>
            </form>
          </div>

          {submitted && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="premium-card rounded-2xl mercedes-shadow max-w-md w-full p-8 text-black relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
                >
                  <X className="w-6 h-6" />
                </button>
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-black text-center">
                  Thank you for your submission!
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Our finance experts will contact you within 24 hours to assist with your pre-owned car finance.
                </p>
                <button
                  onClick={closeModal}
                  className="w-full mercedes-button text-white py-3 rounded-lg font-medium transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-black mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-lg">Get answers to common pre-owned car financing questions</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq: FAQ, index: number) => (
                <div key={index} className="premium-card rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-black">{faq.question}</span>
                    {openFaq === index ? 
                      <ChevronUp className="w-5 h-5 text-black" /> : 
                      <ChevronDown className="w-5 h-5 text-black" />
                    }
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-16 bg-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Drive Your Dream Pre-Owned Car?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers across South India. Get instant pre-approval and drive home today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('eligibility')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300"
              >
                <CheckCircle className="inline-block w-5 h-5 mr-2" />
                Check Eligibility Now
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white hover:text-black transition-all duration-300">
                <Phone className="inline-block w-5 h-5 mr-2" />
                Call Now: 1800-XXX-XXXX
              </button>
            </div>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-black p-4 md:hidden z-50 shadow-lg">
          <button 
            onClick={() => document.getElementById('eligibility')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full bg-white text-black px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors"
          >
            Apply for Finance
          </button>
        </div>

        {/* SEO Content Section - Hidden but crawlable */}
        <section className="py-8 bg-gray-50" style={{ fontSize: '0px', lineHeight: '0', overflow: 'hidden', height: '1px' }}>
          <div className="max-w-7xl mx-auto px-4">
            <h2>Pre Owned Car Finance South India</h2>
            <p>Best pre owned car finance in South India. Get used car loans in Chennai Tamil Nadu, Bangalore Karnataka, Hyderabad Telangana, Kochi Kerala. Low interest rates for second hand cars.</p>
            
            <h3>Used Car Loan Chennai</h3>
            <p>Apply for used car loan in Chennai with instant approval. Finance Maruti Suzuki Swift, Hyundai i20, Honda City, Tata Nexon pre owned cars in Chennai.</p>
            
            <h3>Pre Owned Car Finance Bangalore</h3>
            <p>Get pre owned car finance in Bangalore Karnataka. Best rates for used car loans. Finance Toyota Innova, Mahindra Scorpio, Ford EcoSport in Bangalore.</p>
            
            <h3>Second Hand Car Loan Hyderabad</h3>
            <p>Second hand car loan in Hyderabad Telangana with competitive interest rates. Finance pre owned cars from top brands with flexible EMI options.</p>
            
            {/* More SEO content for each state and city */}
            {locationData.states.map((state: State, index: number) => (
              <div key={state.name}>
                <h4>Pre Owned Car Finance {state.name}</h4>
                <p>Get used car finance in {state.name}. Service available in {state.cities.join(', ')}. Quick approval process for pre owned vehicle loans.</p>
              </div>
            ))}
            
            {/* Popular brands SEO content */}
            {popularBrands.map((brand: string, index: number) => (
              <div key={brand}>
                <h4>{brand} Used Car Finance</h4>
                <p>Finance pre owned {brand} cars with attractive EMI options. Get instant approval for used {brand} vehicles across South India.</p>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default FinancePageClient;