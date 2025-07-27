'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Calculator, CheckCircle, Car, Users, Shield, Clock, Phone, MapPin, Briefcase, CreditCard, ChevronDown, ChevronUp, Plus, Minus , X, Star} from 'lucide-react';
import Header from '@/components/Header';



const FinancePage = () => {
  // EMI Calculator State
  const [carPrice, setCarPrice] = useState(2500000);
  const [downPayment, setDownPayment] = useState(500000);
  const [loanTenure, setLoanTenure] = useState(5);
  const [interestRate, setInterestRate] = useState(8.5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  // Eligibility Checker State
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [city, setCity] = useState('');
  const [eligibleAmount, setEligibleAmount] = useState(0);
  const [showEligibility, setShowEligibility] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pan: '',
    city: '',
    carInterest: ''
  });

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Calculate EMI
  useEffect(() => {
    const principal = carPrice - downPayment;
    const monthlyRate = interestRate / (12 * 100);
    const numPayments = loanTenure * 12;
    
    if (principal > 0 && monthlyRate > 0) {
      const emiAmount = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                       (Math.pow(1 + monthlyRate, numPayments) - 1);
      const totalAmount = emiAmount * numPayments;
      const interestAmount = totalAmount - principal;
      
      setEmi(Math.round(emiAmount));
      setTotalInterest(Math.round(interestAmount));
      setTotalPayable(Math.round(totalAmount + downPayment));
    }
  }, [carPrice, downPayment, loanTenure, interestRate]);

  // Check Eligibility
  const checkEligibility = () => {
    if (monthlyIncome && employmentType && city) {
      const income = parseInt(monthlyIncome);
      let multiplier = employmentType === 'Salaried' ? 60 : 40;
      const eligible = Math.round((income * multiplier) / 100000) * 100000;
      setEligibleAmount(eligible);
      setShowEligibility(true);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatLakhs = (amount: number): string => {
    return `₹${(amount / 100000).toFixed(1)} Lakhs`;
  };

  const banks = [
    { name: 'HDFC Bank', logo: '🏦' },
    { name: 'ICICI Bank', logo: '🏛️' },
    { name: 'Axis Bank', logo: '🏢' },
    { name: 'Kotak Bank', logo: '🏪' },
    { name: 'IDFC First', logo: '🏬' },
    { name: 'SBI', logo: '🏦' }
  ];

  const faqs = [
    {
      question: "What is the maximum loan tenure available?",
      answer: "We offer flexible loan tenures ranging from 1 to 7 years, allowing you to choose EMIs that fit your budget perfectly."
    },
    {
      question: "Can I get a loan without CIBIL history?",
      answer: "Yes, we work with multiple lenders who offer loans to first-time borrowers. Alternative credit assessment methods are used for evaluation."
    },
    {
      question: "Are there special rates for salaried professionals?",
      answer: "Absolutely! Salaried professionals from top companies enjoy preferential interest rates starting from 7.99% with faster approval processes."
    },
    {
      question: "What documents are required for loan approval?",
      answer: "Basic documents include PAN card, Aadhaar, salary slips (last 3 months), bank statements, and employment proof. Our team assists with documentation."
    }
  ];


type TypewriterTextProps = {
  text: string;
  onComplete?: () => void;
  delay?: number;
};

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, onComplete, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        startTyping();
      }, delay);
      return () => clearTimeout(delayTimer);
    } else {
      startTyping();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  const startTyping = () => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
        // Wait 2 seconds before calling onComplete
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 2000);
      }
    }, 50); // Typing speed

    return () => clearInterval(typingInterval);
  };

  return (
    <p
      className={`text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg transition-opacity duration-1000 ${
        isComplete ? 'opacity-100' : 'opacity-100'
      }`}
    >
      {displayedText}
      <span className="animate-pulse">|</span>
    </p>
  );
};

const AnimatedMarketingText = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showText, setShowText] = useState(true);

  const marketingTexts = [
    "Flexible finance options for luxury car buyers with instant approval and premium service",
    "Get pre-approved in 30 minutes with rates starting from 7.99% - No hidden charges, guaranteed!",
    "Turn your dream into reality with our exclusive luxury car financing - Drive today, pay tomorrow!",
    "Experience seamless financing with doorstep documentation and dedicated relationship managers"
  ];

  const handleTextComplete = () => {
    // Fade out current text
    setShowText(false);
    
    setTimeout(() => {
      // Move to next text or loop back to first
      setCurrentTextIndex((prev) => (prev + 1) % marketingTexts.length);
      setShowText(true);
    }, 500); // Half second fade out
  };

  return (
    <div className="min-h-[120px] flex items-center justify-center mb-12">
      <div className={`transition-opacity duration-500 ${showText ? 'opacity-100' : 'opacity-0'}`}>
        {showText && (
          <TypewriterText 
            text={marketingTexts[currentTextIndex]} 
            onComplete={handleTextComplete}
            key={currentTextIndex} // Force re-render when text changes
          />
        )}
      </div>
    </div>
  );
};

  return (
    <>
      {/* Premium Font Import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        h1, h2, h3, .heading {
          font-family: 'Playfair Display', serif;
        }


        .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #D4AF37, #BFA980);
            cursor: pointer;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
          }

          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #D4AF37, #BFA980);
            cursor: pointer;
            border: none;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
          }

          .slider::-webkit-slider-track {
            height: 8px;
            border-radius: 4px;
            background: linear-gradient(90deg, #D4AF37, #374151);
          }

          .slider::-moz-range-track {
            height: 8px;
            border-radius: 4px;
            background: linear-gradient(90deg, #D4AF37, #374151);
            border: none;
          }
      `}</style>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e] text-white">
    <div className="relative overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/assets/images/Mclaren.jpg"
      alt="Ferrari Background"
      fill
      className="object-cover object-center"
      priority
      sizes="100vw"
    />
    {/* Overlay gradients */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/80 via-[#0e0e0e]/60 to-[#0e0e0e]/80"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/90 via-transparent to-[#0e0e0e]/40"></div>
    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0e0e0e]/95 to-transparent"></div>
  </div>

  {/* Subtle golden accents */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#BFA980]/10 to-transparent rounded-full blur-3xl"></div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
    <div className="text-center">
      <h1 className="text-5xl md:text-6xl font-light text-white/95 mb-6 tracking-wide leading-tight drop-shadow-2xl">
        Drive Now, Pay Later
      </h1>
      
      {/* Replace the static paragraph with animated component */}
      <AnimatedMarketingText />
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <button 
          onClick={() => {
            const element = document.getElementById('eligibility');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] px-8 py-4 rounded-full font-medium text-lg hover:from-[#BFA980] hover:to-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/20 transform hover:scale-105 transition-all duration-300 shadow-xl"
        >
          <CheckCircle className="inline-block w-5 h-5 mr-2" />
          Check Eligibility
        </button>
        <button 
          onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white/10 backdrop-blur-sm border-2 border-[#D4AF37]/60 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#D4AF37] hover:text-[#0e0e0e] hover:border-[#D4AF37] transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          <Calculator className="inline-block w-5 h-5 mr-2" />
          EMI Calculator
        </button>
      </div>
    </div>
  </div>
</div>



        {/* Enhanced Instant Eligibility Checker */}
<section id="eligibility" className="py-24 bg-gradient-to-br from-[#0e0e0e] via-[#151515] to-[#0e0e0e] relative overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/assets/images/ferrari.jpg')] bg-cover bg-center"></div>
  
  <div className="relative z-10 max-w-5xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-light text-white/90 tracking-wide mb-4">Check Your Loan Eligibility</h2>
      <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">Tailored finance solutions for premium vehicles. Know what you're eligible for, instantly.</p>
    </div>

    <div className="bg-gradient-to-br from-[#1f1f1f]/60 to-[#0d0d0d]/60 rounded-3xl border border-[#BFA980]/20 p-10 backdrop-blur-md shadow-xl">
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {/* Monthly Income */}
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">Monthly Income</label>
          <div className="relative">
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              placeholder="e.g. ₹1,50,000"
              className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-5 py-3 text-white/80 placeholder:text-white/40 focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40 transition-all duration-300"
            />
          </div>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">Employment Type</label>
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-5 py-3 text-white/80 focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40 transition-all duration-300"
          >
            <option value="">Select Type</option>
            <option value="Salaried">Salaried</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Business">Business Owner</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Bangalore"
            className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-5 py-3 text-white/80 placeholder:text-white/40 focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40 transition-all duration-300"
          />
        </div>
      </div>

      <button
        onClick={checkEligibility}
        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] font-medium text-lg py-4 rounded-lg hover:shadow-lg hover:from-[#BFA980] hover:to-[#D4AF37] transition-all"
      >
        Check Eligibility Instantly
      </button>

      {/* Eligibility Result */}
      {showEligibility && (
        <div className="mt-10 p-8 bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-2xl backdrop-blur-md">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 animate-bounce" />
            <h3 className="text-3xl font-light text-white/90 mb-2">You're Eligible!</h3>
            <p className="text-white/60 text-base mb-4">Based on your inputs, you may get financing up to:</p>
            <p className="text-5xl font-semibold text-[#D4AF37] tracking-wider">{formatLakhs(eligibleAmount)}</p>

            <div className="mt-6">
              <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] font-medium text-lg px-8 py-3 rounded-lg hover:from-[#BFA980] hover:to-[#D4AF37] transition-all">
                Get Pre-Approved Now
              </button>
              <p className="text-white/40 text-xs mt-3">*Subject to document verification and credit score</p>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</section>


        {/* EMI Calculator */}
        <section id="calculator" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light text-white/90 mb-4 tracking-wide">EMI Calculator</h2>
              <p className="text-white/60 text-lg font-light">Calculate your monthly payments instantly</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Calculator Inputs */}
              <div className="bg-gradient-to-br from-[#1a1a1a]/60 to-[#0e0e0e]/60 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-[#BFA980]/10">
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-4">
                      Car Price: {formatCurrency(carPrice)}
                    </label>
                    <input
                      type="range"
                      min="500000"
                      max="10000000"
                      step="100000"
                      value={carPrice}
                      onChange={(e) => setCarPrice(parseInt(e.target.value))}
                      className="w-full h-2 bg-[#1a1a1a]/60 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-white/40 mt-2">
                      <span>₹5L</span>
                      <span>₹1Cr</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-4">
                      Down Payment: {formatCurrency(downPayment)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max={carPrice * 0.5}
                      step="50000"
                      value={downPayment}
                      onChange={(e) => setDownPayment(parseInt(e.target.value))}
                      className="w-full h-2 bg-[#1a1a1a]/60 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-white/40 mt-2">
                      <span>₹0</span>
                      <span>{formatCurrency(carPrice * 0.5)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-4">
                      Loan Tenure: {loanTenure} years
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="7"
                      step="1"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(parseInt(e.target.value))}
                      className="w-full h-2 bg-[#1a1a1a]/60 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-white/40 mt-2">
                      <span>1 year</span>
                      <span>7 years</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-4">
                      Interest Rate: {interestRate}%
                    </label>
                    <input
                      type="range"
                      min="7"
                      max="15"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="w-full h-2 bg-[#1a1a1a]/60 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-white/40 mt-2">
                      <span>7%</span>
                      <span>15%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Calculator Results */}
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#1a1a1a]/60 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-[#D4AF37]/20">
                <h3 className="text-2xl font-light text-white/90 mb-8">Loan Summary</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-[#1a1a1a]/40 backdrop-blur-sm rounded-lg border border-white/5">
                    <span className="text-white/60 font-light">Monthly EMI</span>
                    <span className="text-2xl font-light text-[#D4AF37]">{formatCurrency(emi)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[#1a1a1a]/40 backdrop-blur-sm rounded-lg border border-white/5">
                    <span className="text-white/60 font-light">Total Interest</span>
                    <span className="text-xl font-light text-red-400/80">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[#1a1a1a]/40 backdrop-blur-sm rounded-lg border border-white/5">
                    <span className="text-white/60 font-light">Total Payable</span>
                    <span className="text-xl font-light text-white/90">{formatCurrency(totalPayable)}</span>
                  </div>
                </div>
                <button className="w-full mt-8 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] px-6 py-4 rounded-lg font-medium text-lg hover:from-[#BFA980] hover:to-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300">
                  Apply for This Loan
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Finance Partners */}
        <section className="py-20 bg-gradient-to-r from-[#0e0e0e]/60 via-[#1a1a1a]/40 to-[#0e0e0e]/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light text-white/90 mb-4 tracking-wide">Trusted Finance Partners</h2>
              <p className="text-white/60 text-lg font-light">Best-in-class rates from India's most trusted lenders</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {banks.map((bank, index) => (
                <div key={index} className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-[#1a1a1a]/60 transition-all duration-300 border border-white/5 hover:border-[#BFA980]/30">
                  <div className="text-4xl mb-4">{bank.logo}</div>
                  <h3 className="text-sm font-medium text-white/70">{bank.name}</h3>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-white/50 font-light">Interest rates starting from <span className="text-[#D4AF37] font-medium text-xl">7.99%*</span></p>
            </div>
          </div>
        </section>

        {/* Comparison Section - Epic Luxe vs Banks */}
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-light text-white/90 mb-4 tracking-wide">Why Choose Epic Luxe Finance?</h2>
      <p className="text-white/60 text-lg font-light max-w-3xl mx-auto leading-relaxed">
        Get more value, better rates, and superior service when you finance through Epic Luxe compared to direct bank financing
      </p>
    </div>

    {/* Comparison Table */}
    <div className="bg-gradient-to-br from-[#1a1a1a]/60 to-[#0e0e0e]/60 backdrop-blur-sm rounded-2xl border border-[#BFA980]/10 overflow-hidden">
      
      {/* Table Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA980]/10 border-b border-[#BFA980]/20">
        <div className="p-6 md:p-8">
          <h3 className="text-xl font-medium text-white/90 mb-2">Features</h3>
          <p className="text-white/50 text-sm font-light">Compare what you get</p>
        </div>
        <div className="p-6 md:p-8 bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/15 border-l border-[#D4AF37]/30">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center">
              <span className="text-[#0e0e0e] font-bold text-sm">EL</span>
            </div>
            <h3 className="text-xl font-medium text-[#D4AF37]">Epic Luxe</h3>
          </div>
          <p className="text-white/60 text-sm font-light">Premium Experience</p>
        </div>
        <div className="p-6 md:p-8 border-l border-white/5">
          <h3 className="text-lg font-medium text-white/70 mb-2">HDFC Direct</h3>
          <p className="text-white/40 text-sm font-light">Standard Banking</p>
        </div>
        <div className="p-6 md:p-8 border-l border-white/5">
          <h3 className="text-lg font-medium text-white/70 mb-2">ICICI Direct</h3>
          <p className="text-white/40 text-sm font-light">Standard Banking</p>
        </div>
      </div>

      {/* Comparison Rows */}
      <div className="divide-y divide-white/5">
        
        {/* Interest Rates */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="p-6 md:p-8 bg-[#1a1a1a]/20">
            <h4 className="font-medium text-white/80 mb-1">Interest Rates</h4>
            <p className="text-white/50 text-sm font-light">Starting from</p>
          </div>
          <div className="p-6 md:p-8 bg-gradient-to-br from-[#D4AF37]/5 to-[#BFA980]/5 border-l border-[#D4AF37]/20">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-light text-[#D4AF37]">7.99%</span>
              <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-1 rounded-full text-xs font-medium">BEST</span>
            </div>
            <p className="text-white/60 text-sm font-light mt-1">Negotiated rates</p>
          </div>
          <div className="p-6 md:p-8 border-l border-white/5">
            <span className="text-xl font-light text-white/60">8.75%</span>
            <p className="text-white/40 text-sm font-light mt-1">Standard rates</p>
          </div>
          <div className="p-6 md:p-8 border-l border-white/5">
            <span className="text-xl font-light text-white/60">9.25%</span>
            <p className="text-white/40 text-sm font-light mt-1">Standard rates</p>
          </div>
        </div>

        {/* Processing Time */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="p-6 md:p-8 bg-[#1a1a1a]/20">
            <h4 className="font-medium text-white/80 mb-1">Processing Time</h4>
            <p className="text-white/50 text-sm font-light">Approval speed</p>
          </div>
          <div className="p-6 md:p-8 bg-gradient-to-br from-[#D4AF37]/5 to-[#BFA980]/5 border-l border-[#D4AF37]/20">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-light text-[#D4AF37]">30 Minutes</span>
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
            </div>
            <p className="text-white/60 text-sm font-light mt-1">Instant pre-approval</p>
          </div>
          <div className="p-6 md:p-8 border-l border-white/5">
            <span className="text-xl font-light text-white/60">2-3 Days</span>
            <p className="text-white/40 text-sm font-light mt-1">Standard process</p>
          </div>
          <div className="p-6 md:p-8 border-l border-white/5">
            <span className="text-xl font-light text-white/60">3-5 Days</span>
            <p className="text-white/40 text-sm font-light mt-1">Standard process</p>
          </div>
        </div>

        {/* Loan Amount */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="p-6 md:p-8 bg-[#1a1a1a]/20">
            <h4 className="font-medium text-white/80 mb-1">Max Loan Amount</h4>
            <p className="text-white/50 text-sm font-light">Financing limit</p>
          </div>
          <div className="p-6 md:p-8 bg-gradient-to-br from-[#D4AF37]/5 to-[#BFA980]/5 border-l border-[#D4AF37]/20">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-light text-[#D4AF37]">₹5 Crores</span>
              <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-1 rounded-full text-xs font-medium">MAX</span>
            </div>
            <p className="text-white/60 text-sm font-light mt-1">Premium vehicles</p>
          </div>
          <div className="p-6 md:p-8 border-l border-white/5">
            <span className="text-xl font-light text-white/60">₹1.5 Crores</span>
            <p className="text-white/40 text-sm font-light mt-1">Standard limit</p>
          </div>
          <div className="p-6 md:p-8 border-l border-white/5">
            <span className="text-xl font-light text-white/60">₹2 Crores</span>
            <p className="text-white/40 text-sm font-light mt-1">Standard limit</p>
          </div>
        </div>

        {/* Documentation */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="p-6 md:p-8 bg-[#1a1a1a]/20">
            <h4 className="font-medium text-white/80 mb-1">Documentation</h4>
            <p className="text-white/50 text-sm font-light">Paperwork ease</p>
          </div>
          <div className="p-6 md:p-8 bg-gradient-to-br from-[#D4AF37]/5 to-[#BFA980]/5 border-l border-[#D4AF37]/20">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-white/80 font-medium">Doorstep Service</span>
            </div>
            <p className="text-white/60 text-sm font-light">We handle everything</p>
          </div>
          <div className="p-6 md:p-8 border-l border-white/5">
            <div className="flex items-center space-x-2 mb-2">
              <X className="w-5 h-5 text-red-400/60" />
              <span className="text-white/60 font-medium">Self Service</span>
            </div>
            <p className="text-white/40 text-sm font-light">You visit branch</p>
          </div>
          <div className="p-6 md:p-8 border-l border-white/5">
            <div className="flex items-center space-x-2 mb-2">
              <X className="w-5 h-5 text-red-400/60" />
              <span className="text-white/60 font-medium">Self Service</span>
            </div>
            <p className="text-white/40 text-sm font-light">You visit branch</p>
          </div>
        </div>

        {/* Customer Support */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="p-6 md:p-8 bg-[#1a1a1a]/20">
            <h4 className="font-medium text-white/80 mb-1">Customer Support</h4>
            <p className="text-white/50 text-sm font-light">Service quality</p>
          </div>
          <div className="p-6 md:p-8 bg-gradient-to-br from-[#D4AF37]/5 to-[#BFA980]/5 border-l border-[#D4AF37]/20">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-white/80 font-medium">Dedicated RM</span>
            </div>
            <p className="text-white/60 text-sm font-light">Personal concierge</p>
          </div>
          <div className="p-6 md:p-8 border-l border-white/5">
            <div className="flex items-center space-x-2 mb-2">
              <Phone className="w-5 h-5 text-white/40" />
              <span className="text-white/60 font-medium">Call Center</span>
            </div>
            <p className="text-white/40 text-sm font-light">General support</p>
          </div>
          <div className="p-6 md:p-8 border-l border-white/5">
            <div className="flex items-center space-x-2 mb-2">
              <Phone className="w-5 h-5 text-white/40" />
              <span className="text-white/60 font-medium">Call Center</span>
            </div>
            <p className="text-white/40 text-sm font-light">General support</p>
          </div>
        </div>

        {/* Flexibility */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="p-6 md:p-8 bg-[#1a1a1a]/20">
            <h4 className="font-medium text-white/80 mb-1">Loan Flexibility</h4>
            <p className="text-white/50 text-sm font-light">Terms & options</p>
          </div>
          <div className="p-6 md:p-8 bg-gradient-to-br from-[#D4AF37]/5 to-[#BFA980]/5 border-l border-[#D4AF37]/20">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-white/70 text-sm">Flexible EMI</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-white/70 text-sm">Part payments</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-white/70 text-sm">Tenure options</span>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 border-l border-white/5">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Minus className="w-4 h-4 text-white/30" />
                <span className="text-white/50 text-sm">Fixed EMI only</span>
              </div>
              <div className="flex items-center space-x-2">
                <Minus className="w-4 h-4 text-white/30" />
                <span className="text-white/50 text-sm">Limited options</span>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 border-l border-white/5">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Minus className="w-4 h-4 text-white/30" />
                <span className="text-white/50 text-sm">Fixed EMI only</span>
              </div>
              <div className="flex items-center space-x-2">
                <Minus className="w-4 h-4 text-white/30" />
                <span className="text-white/50 text-sm">Limited options</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA980]/10 border-t border-[#BFA980]/20 text-center">
        <h3 className="text-2xl font-light text-white/90 mb-4">Ready to Experience the Epic Luxe Advantage?</h3>
        <p className="text-white/60 font-light mb-6 max-w-2xl mx-auto">
          Get better rates, faster approval, and premium service. Why settle for standard when you can have extraordinary?
        </p>
        <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] px-8 py-4 rounded-full font-medium text-lg hover:from-[#BFA980] hover:to-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/20 transform hover:scale-105 transition-all duration-300">
          <Calculator className="inline-block w-5 h-5 mr-2" />
          Get Epic Luxe Finance Now
        </button>
      </div>
    </div>

    {/* Additional Benefits */}
    <div className="mt-16 grid md:grid-cols-3 gap-8">
      <div className="text-center p-6 bg-gradient-to-br from-[#1a1a1a]/40 to-[#0e0e0e]/40 backdrop-blur-sm rounded-xl border border-[#BFA980]/10">
        <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-[#0e0e0e]" />
        </div>
        <h4 className="text-xl font-light text-white/90 mb-2">Guaranteed Approval</h4>
        <p className="text-white/60 font-light text-sm">Pre-approved loans with our partner network guarantee</p>
      </div>
      
      <div className="text-center p-6 bg-gradient-to-br from-[#1a1a1a]/40 to-[#0e0e0e]/40 backdrop-blur-sm rounded-xl border border-[#BFA980]/10">
        <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-[#0e0e0e]" />
        </div>
        <h4 className="text-xl font-light text-white/90 mb-2">Same Day Approval</h4>
        <p className="text-white/60 font-light text-sm">Get approved and drive home your dream car the same day</p>
      </div>
      
      <div className="text-center p-6 bg-gradient-to-br from-[#1a1a1a]/40 to-[#0e0e0e]/40 backdrop-blur-sm rounded-xl border border-[#BFA980]/10">
        <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-[#0e0e0e]" />
        </div>
        <h4 className="text-xl font-light text-white/90 mb-2">VIP Treatment</h4>
        <p className="text-white/60 font-light text-sm">Premium service with dedicated relationship manager</p>
      </div>
    </div>
  </div>
</section>


        {/* How It Works */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-white/90 mb-4 tracking-wide">How It Works</h2>
              <p className="text-white/60 text-lg font-light">Simple steps to drive your dream car</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#BFA980] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-light text-[#0e0e0e]">1</span>
                </div>
                <h3 className="text-2xl font-light mb-4 text-white/90">Apply Online</h3>
                <p className="text-white/60 font-light leading-relaxed">Submit your application online with basic details. Get instant pre-approval in minutes.</p>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#BFA980] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-10 h-10 text-[#0e0e0e]" />
                </div>
                <h3 className="text-2xl font-light mb-4 text-white/90">Get Verified</h3>
                <p className="text-white/60 font-light leading-relaxed">Our team will verify your documents and complete the approval process within 24 hours.</p>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#BFA980] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Car className="w-10 h-10 text-[#0e0e0e]" />
                </div>
                <h3 className="text-2xl font-light mb-4 text-white/90">Drive Home</h3>
                <p className="text-white/60 font-light leading-relaxed">Complete the paperwork and drive home your dream luxury car with full support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Luxury Advantages */}
        <section className="py-20 bg-gradient-to-r from-[#0e0e0e]/60 via-[#1a1a1a]/40 to-[#0e0e0e]/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-white/90 mb-4 tracking-wide">Luxury Financing Advantages</h2>
              <p className="text-white/60 text-lg font-light">Premium service for premium cars</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-[#1a1a1a]/60 transition-all duration-300 border border-white/5 hover:border-[#BFA980]/30 group">
                <Clock className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-light mb-3 text-white/90">Instant Approval</h3>
                <p className="text-white/60 font-light leading-relaxed">Get loan approval in as little as 30 minutes with our streamlined process.</p>
              </div>
              
              <div className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-[#1a1a1a]/60 transition-all duration-300 border border-white/5 hover:border-[#BFA980]/30 group">
                <MapPin className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-light mb-3 text-white/90">Doorstep Service</h3>
                <p className="text-white/60 font-light leading-relaxed">Our executives will visit you for document collection and verification.</p>
              </div>
              
              <div className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-[#1a1a1a]/60 transition-all duration-300 border border-white/5 hover:border-[#BFA980]/30 group">
                <Users className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-light mb-3 text-white/90">Concierge Support</h3>
                <p className="text-white/60 font-light leading-relaxed">Dedicated relationship manager for personalized assistance throughout.</p>
              </div>
              
              <div className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-[#1a1a1a]/60 transition-all duration-300 border border-white/5 hover:border-[#BFA980]/30 group">
                <Shield className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-light mb-3 text-white/90">Special Rates</h3>
                <p className="text-white/60 font-light leading-relaxed">Exclusive low-interest rates for premium and luxury vehicle financing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Apply Now Form */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light text-white/90 mb-4 tracking-wide">Apply Now</h2>
              <p className="text-white/60 text-lg font-light">Start your luxury car journey today</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#1a1a1a]/60 to-[#0e0e0e]/60 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-[#BFA980]/10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                    className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-4 py-3 text-white/80 placeholder:text-white/40 focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40 backdrop-blur-sm transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-4 py-3 text-white/80 placeholder:text-white/40 focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40 backdrop-blur-sm transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">PAN Number</label>
                  <input
                    type="text"
                    value={formData.pan}
                    onChange={(e) => setFormData({...formData, pan: e.target.value})}
                    placeholder="ABCDE1234F"
                    className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-4 py-3 text-white/80 placeholder:text-white/40 focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40 backdrop-blur-sm transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="Mumbai"
                    className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-4 py-3 text-white/80 placeholder:text-white/40 focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40 backdrop-blur-sm transition-all duration-300"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-white/60 mb-2">Car of Interest</label>
                <select
                  value={formData.carInterest}
                  onChange={(e) => setFormData({...formData, carInterest: e.target.value})}
                  className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-4 py-3 text-white/80 focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40 backdrop-blur-sm transition-all duration-300"
                >
                  <option value="">Select a car</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="BMW">BMW</option>
                  <option value="Range Rover">Range Rover</option>
                  <option value="Audi">Audi</option>
                  <option value="Jaguar">Jaguar</option>
                  <option value="Porsche">Porsche</option>
                </select>
              </div>
              <button className="w-full mt-8 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] px-6 py-4 rounded-lg font-medium text-lg hover:from-[#BFA980] hover:to-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300">
                Submit Application
              </button>
              <p className="text-white/40 text-sm text-center mt-4 font-light">
                By submitting, you agree to our terms and conditions. We'll send you an OTP for verification.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-r from-[#0e0e0e]/60 via-[#1a1a1a]/40 to-[#0e0e0e]/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light text-white/90 mb-4 tracking-wide">Frequently Asked Questions</h2>
              <p className="text-white/60 text-lg font-light">Get answers to common financing questions</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#1a1a1a]/60 transition-colors"
                  >
                    <span className="font-medium text-white/90">{faq.question}</span>
                    {openFaq === index ? 
                      <ChevronUp className="w-5 h-5 text-[#D4AF37]" /> : 
                      <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
                    }
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-white/60 font-light leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] p-4 md:hidden z-50 shadow-lg">
          <button 
            onClick={() => {
              const element = document.getElementById('eligibility');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full bg-[#0e0e0e] text-[#D4AF37] px-6 py-3 rounded-lg font-medium text-lg hover:bg-[#1a1a1a] transition-colors"
          >
            Apply for Finance
          </button>
        </div>
      </div>
    </>
  );
};

export default FinancePage;
