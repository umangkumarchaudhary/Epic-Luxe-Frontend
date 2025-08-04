'use client';
import Image from 'next/image';
import React, { useState, useEffect , useCallback} from 'react';
import { Calculator,TrendingUp,Zap,IndianRupee, CheckCircle, Car, Users, Shield, Clock, Phone, MapPin,ChevronDown, ChevronUp, Minus, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PremiumEMICalculator from './components/EMICalculator';
import FinanceComparisonSection from './components/ComparisonSection';

const FinancePage = () => {
  // EMI Calculator State
  const [carPrice, setCarPrice] = useState(2500000);
  const [downPayment, setDownPayment] = useState(500000);
  const [loanTenure, setLoanTenure] = useState(5);
  const [interestRate, setInterestRate] = useState(8.5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);
  const [affordableCars, setAffordableCars] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Eligibility Checker State
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [city, setCity] = useState('');
  const [eligibleAmount, setEligibleAmount] = useState(0);
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interestedCar, setInterestedCar] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState("eligibility");
  const [eligibilityError, setEligibilityError] = useState("");

  const luxuryCarDatabase = [
    { brand: 'BMW', model: '3 Series', year: 2019, price: 2850000, image: '🚗', popular: true },
    { brand: 'Audi', model: 'A4', year: 2018, price: 2680000, image: '🚙', saving: true },
    { brand: 'Mercedes', model: 'C-Class', year: 2020, price: 3200000, image: '🚗', premium: true },
    { brand: 'BMW', model: 'X3', year: 2019, price: 4200000, image: '🚙', popular: true },
    { brand: 'Audi', model: 'Q5', year: 2020, price: 4800000, image: '🚙' },
    { brand: 'Mercedes', model: 'GLC', year: 2019, price: 4500000, image: '🚙' },
    { brand: 'BMW', model: '5 Series', year: 2018, price: 3800000, image: '🚗', premium: true },
  ];

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pan: '',
    city: '',
    carInterest: ''
  });

   const [submitted, setSubmitted] = useState(false);

   const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

   const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Hook your API here
    setSubmitted(true);
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
    const maxAffordablePrice = carPrice + (carPrice * 0.3); // 30% buffer
    const minAffordablePrice = carPrice - (carPrice * 0.2); // 20% lower
    
    const recommendations = luxuryCarDatabase
      .filter(car => car.price >= minAffordablePrice && car.price <= maxAffordablePrice)
      .sort((a, b) => Math.abs(a.price - carPrice) - Math.abs(b.price - carPrice))
      .slice(0, 3);
    
    setAffordableCars(recommendations);
  }, [carPrice, emi]);

  const getEMIForCar = (carPrice) => {
    const principal = carPrice - downPayment;
    const monthlyRate = interestRate / (12 * 100);
    const numberOfPayments = loanTenure * 12;
    
    if (principal > 0 && monthlyRate > 0) {
      const emiAmount = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                       (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      return Math.round(emiAmount);
    }
    return 0;
  };

  // Check Eligibility

  const checkEligibility = () => {
  if (!monthlyIncome || !employmentType || !city) {
    setEligibilityError("Please fill all fields");
    return;
  }
  
  // Clear error if all present
  setEligibilityError("");

  const income = parseInt(monthlyIncome);
  const multiplier = employmentType === "Salaried" ? 60 : 40;
  const eligible = Math.round((income * multiplier) / 100000) * 100000;

  setEligibleAmount(eligible);
  setStep("approval");
};


  const formatLakhs = (amount: number): string => {
    return `₹${(amount / 100000).toFixed(1)} Lakhs`;
  };
 
   const submitLead = async (e) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Demo delay
      // API call can go here
      setShowPopup(true); // Show popup
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
    const [, setIsComplete] = useState(false);

    

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
      <p
        className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg transition-opacity duration-1000 manrope-font font-light"
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
      {/* Font Import and Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap');

        /* Default font for body text, buttons, and general content */
        * {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Headings use Playfair Display */
        h1, h2, h3, h4, .font-heading, .playfair-font {
          font-family: 'Playfair Display', serif;
        }

        /* Font family classes */
        .font-primary, .manrope-font, .font-secondary, .inter-font {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .font-heading, .playfair-font {
          font-family: 'Playfair Display', serif;
        }

        /* Font weight classes */
        .font-light {
          font-weight: 300;
        }

        .font-normal {
          font-weight: 400;
        }

        .font-medium {
          font-weight: 500;
        }

        .font-semibold {
          font-weight: 600;
        }

        .font-bold {
          font-weight: 700;
        }

        .font-extrabold {
          font-weight: 800;
        }

        /* Slider styles */
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
          
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #eab308, #f59e0b);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(234, 179, 8, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #eab308, #f59e0b);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(234, 179, 8, 0.3);
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
              <h1 className="text-5xl md:text-6xl playfair-font font-bold text-white/95 mb-6 tracking-wide leading-tight drop-shadow-2xl">
                Drive Now, Pay Later
              </h1>
              
              <AnimatedMarketingText />
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => {
                    const element = document.getElementById('eligibility');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] px-8 py-4 rounded-full manrope-font font-medium text-lg hover:from-[#BFA980] hover:to-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/20 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <CheckCircle className="inline-block w-5 h-5 mr-2" />
                  Check Eligibility
                </button>
                <button 
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white/10 backdrop-blur-sm border-2 border-[#D4AF37]/60 text-white px-8 py-4 rounded-full manrope-font font-medium text-lg hover:bg-[#D4AF37] hover:text-[#0e0e0e] hover:border-[#D4AF37] transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Calculator className="inline-block w-5 h-5 mr-2" />
                  EMI Calculator
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Instant Eligibility Checker */}
        <section
  id="eligibility"
  className="py-24 bg-gradient-to-br from-[#0e0e0e] via-[#151515] to-[#0e0e0e] relative overflow-hidden min-h-screen"
>
  <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/assets/images/ferrari.jpg')] bg-cover bg-center" />
  <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center min-h-[60vh]">
    <div className="text-center mb-10 w-full">
      <h2 className="text-5xl playfair-font font-bold text-white/90 tracking-wide mb-4">
        Check Your Loan Eligibility
      </h2>
      <p className="text-white/60 text-lg manrope-font font-light max-w-2xl mx-auto">
        Tailored finance solutions for premium vehicles. Know what you&apos;re eligible for, instantly.
      </p>
    </div>

    {/* Step 1: Eligibility form */}
    {step === "eligibility" && (
  <div className="bg-gradient-to-br from-[#1f1f1f]/60 to-[#0d0d0d]/60 rounded-3xl border border-[#BFA980]/20 p-10 backdrop-blur-md shadow-xl w-full max-w-5xl mx-auto">
    <div className="grid md:grid-cols-3 gap-8 mb-4">
      <div>
        <label className="block text-sm text-white/60 mb-2">Monthly Income</label>
        <input
          type="number"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          placeholder="e.g. ₹1,50,000"
          className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-5 py-3 text-white/80 placeholder:text-white/40 focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40"
        />
      </div>
      <div>
        <label className="block text-sm text-white/60 mb-2">Employment Type</label>
        <select
          value={employmentType}
          onChange={(e) => setEmploymentType(e.target.value)}
          className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-5 py-3 text-white/80 focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40"
        >
          <option value="">Select Type</option>
          <option value="Salaried">Salaried</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Business">Business Owner</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-white/60 mb-2">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g. Bangalore"
          className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-5 py-3 text-white/80 placeholder:text-white/40 focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40"
        />
      </div>
    </div>
    
    {eligibilityError && (
      <p className="mb-6 text-center text-[#D4AF37] font-semibold manrope-font">
        {eligibilityError}
      </p>
    )}

    <div className="flex justify-center">
      <button
        onClick={checkEligibility}
        className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] font-semibold text-lg py-4 px-14 rounded-lg hover:shadow-lg transition-all"
      >
        Check Eligibility Instantly
      </button>
    </div>
  </div>
)}


    {/* Step 2: Approval form */}
    {step === "approval" && (
      <div className="mt-8 flex flex-col items-center w-full">
        <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA980]/10 border border-[#D4AF37]/30 rounded-2xl backdrop-blur-md p-8 w-full max-w-2xl mx-auto shadow-lg">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 animate-bounce" />
            <h3 className="text-3xl playfair-font font-bold text-white/90 mb-2">
              You&apos;re Eligible!
            </h3>
            <p className="text-white/60 text-base mb-4">
              Based on your inputs, you may get financing up to:
            </p>
            <p className="text-5xl playfair-font font-semibold text-[#D4AF37] tracking-wider">
              {formatLakhs(eligibleAmount)}
            </p>
          </div>

          <form className="mt-7 grid md:grid-cols-2 gap-6 text-left" onSubmit={submitLead}>
            <div>
              <label className="block text-sm text-white/60 mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-5 py-3 text-white/80 placeholder:text-white/40"
                placeholder="e.g. Rahul Sharma"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-5 py-3 text-white/80 placeholder:text-white/40"
                placeholder="e.g. 9876543210"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Email (Optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-5 py-3 text-white/80 placeholder:text-white/40"
                placeholder="e.g. you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Interested Car (Optional)</label>
              <input
                type="text"
                value={interestedCar}
                onChange={(e) => setInterestedCar(e.target.value)}
                className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 rounded-lg px-5 py-3 text-white/80 placeholder:text-white/40"
                placeholder="e.g. BMW X7, Audi A6"
              />
            </div>
            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] text-lg px-10 py-4 rounded-lg
                  transition-all relative flex items-center justify-center
                  ${isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:from-[#BFA980] hover:to-[#D4AF37]"}
                `}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-[#0e0e0e]" fill="none" viewBox="0 0 24 24">
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
              <p className="text-white/40 text-xs mt-3">
                *Subject to document verification and credit score
              </p>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* The centered popup modal */}
    {showPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-gradient-to-br from-[#1f1f1f] to-[#0d0d0d] border border-[#D4AF37]/40 rounded-3xl px-8 py-10 shadow-2xl w-full max-w-md mx-4 text-center relative">
          <CheckCircle className="w-14 h-14 text-[#D4AF37] mx-auto mb-4" />
          <h2 className="text-2xl playfair-font font-bold text-white/90 mb-3">Application Submitted!</h2>
          <p className="text-white/60 mb-6">Thank you for your interest.<br />Our experts will contact you soon.</p>
          <button
            onClick={handlePopupOk}
            className="mt-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] font-semibold text-lg px-8 py-3 rounded-lg hover:from-[#BFA980] hover:to-[#D4AF37] transition-all"
            autoFocus
          >
            OK
          </button>
        </div>
      </div>
    )}
  </div>
</section>


        
<PremiumEMICalculator/>

        {/* Finance Partners */}

        <FinanceComparisonSection/>
        

        {/* Comparison Section - Epic Luxe vs Banks */}
     



        <section className="py-20 bg-gradient-to-r from-[#0e0e0e]/60 via-[#1a1a1a]/40 to-[#0e0e0e]/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
  <h2 className="text-4xl playfair-font font-bold text-white/90 mb-4 tracking-wide">
    Trusted Finance Partners
  </h2>
  <p className="text-white/60 text-lg manrope-font font-light">
    Best-in-class rates from India&apos;s most trusted lenders
  </p>
</div>

            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {banks.map((bank, index) => (
                <div key={index} className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-[#1a1a1a]/60 transition-all duration-300 border border-white/5 hover:border-[#BFA980]/30">
                  <div className="text-4xl mb-4">{bank.logo}</div>
                  <h3 className="text-sm manrope-font font-medium text-white/70">{bank.name}</h3>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-white/50 manrope-font font-light">Interest rates starting from <span className="text-[#D4AF37] manrope-font font-medium text-xl">7.99%*</span></p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl playfair-font font-bold text-white/90 mb-4 tracking-wide">How It Works</h2>
              <p className="text-white/60 text-lg manrope-font font-light">Simple steps to drive your dream car</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#BFA980] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl manrope-font font-light text-[#0e0e0e]">1</span>
                </div>
                <h3 className="text-2xl playfair-font font-bold mb-4 text-white/90">Apply Online</h3>
                <p className="text-white/60 manrope-font font-light leading-relaxed">Submit your application online with basic details. Get instant pre-approval in minutes.</p>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#BFA980] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-10 h-10 text-[#0e0e0e]" />
                </div>
                <h3 className="text-2xl playfair-font font-bold mb-4 text-white/90">Get Verified</h3>
                <p className="text-white/60 manrope-font font-light leading-relaxed">Our team will verify your documents and complete the approval process within 24 hours.</p>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#BFA980] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Car className="w-10 h-10 text-[#0e0e0e]" />
                </div>
                <h3 className="text-2xl playfair-font font-bold mb-4 text-white/90">Drive Home</h3>
                <p className="text-white/60 manrope-font font-light leading-relaxed">Complete the paperwork and drive home your dream luxury car with full support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Luxury Advantages */}
        <section className="py-20 bg-gradient-to-r from-[#0e0e0e]/60 via-[#1a1a1a]/40 to-[#0e0e0e]/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl playfair-font font-bold text-white/90 mb-4 tracking-wide">Luxury Financing Advantages</h2>
              <p className="text-white/60 text-lg manrope-font font-light">Premium service for premium cars</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-[#1a1a1a]/60 transition-all duration-300 border border-white/5 hover:border-[#BFA980]/30 group">
                <Clock className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl playfair-font font-bold mb-3 text-white/90">Instant Approval</h3>
                <p className="text-white/60 manrope-font font-light leading-relaxed">Get loan approval in as little as 30 minutes with our streamlined process.</p>
              </div>
              
              <div className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-[#1a1a1a]/60 transition-all duration-300 border border-white/5 hover:border-[#BFA980]/30 group">
                <MapPin className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl playfair-font font-bold mb-3 text-white/90">Doorstep Service</h3>
                <p className="text-white/60 manrope-font font-light leading-relaxed">Our executives will visit you for document collection and verification.</p>
              </div>
              
              <div className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-[#1a1a1a]/60 transition-all duration-300 border border-white/5 hover:border-[#BFA980]/30 group">
                <Users className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl playfair-font font-bold mb-3 text-white/90">Concierge Support</h3>
                <p className="text-white/60 manrope-font font-light leading-relaxed">Dedicated relationship manager for personalized assistance throughout.</p>
              </div>
              
              <div className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-[#1a1a1a]/60 transition-all duration-300 border border-white/5 hover:border-[#BFA980]/30 group">
                <Shield className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl playfair-font font-bold mb-3 text-white/90">Special Rates</h3>
                <p className="text-white/60 manrope-font font-light leading-relaxed">Exclusive low-interest rates for premium and luxury vehicle financing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Apply Now Form */}
        <section
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
      style={{ fontFamily: "'Inter', sans-serif" }}
      aria-live="polite"
    >
      <div className="max-w-4xl mx-auto" aria-hidden={submitted ? "true" : "false"}>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair text-white/90 font-bold tracking-wide">
            Apply Now
          </h2>
          <p className="mt-2 text-lg font-manrope text-white/60 font-light">
            Start your luxury journey today
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-black/80 to-[#121212]/80 backdrop-blur-lg rounded-3xl border border-[#BFA980]/20 shadow-2xl p-10 grid grid-cols-1 gap-8 sm:grid-cols-2"
          noValidate
          aria-disabled={submitted}
        >
          {/* Full Name - required */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="font-manrope text-white/70 mb-2 text-sm"
            >
              Full Name <span className="text-[#BFA980]">*</span>
            </label>
            <input
              id="name"
              name="name"
              required
              minLength={2}
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="bg-[#1a1a1a]/70 border border-[#BFA980]/40 rounded-xl px-5 py-4 text-white placeholder-white/40 font-manrope text-base outline-none transition focus:ring-2 focus:ring-[#D1AF49]"
              autoComplete="off"
              disabled={submitted}
            />
          </div>

          {/* Phone Number - required */}
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="font-manrope text-white/70 mb-2 text-sm"
            >
              Phone Number <span className="text-[#BFA980]">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              required
              pattern="[0-9]{10}"
              inputMode="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="bg-[#1a1a1a]/70 border border-[#BFA980]/40 rounded-xl px-5 py-4 text-white placeholder-white/40 font-manrope text-base outline-none transition focus:ring-2 focus:ring-[#D1AF49]"
              autoComplete="off"
              disabled={submitted}
            />
          </div>

          {/* PAN Number - optional */}
          <div className="flex flex-col">
            <label
              htmlFor="pan"
              className="font-manrope text-white/70 mb-2 text-sm"
            >
              PAN Number <span className="text-white/50 italic">(Optional)</span>
            </label>
            <input
              id="pan"
              name="pan"
              maxLength={10}
              type="text"
              value={formData.pan}
              onChange={handleChange}
              placeholder="ABCDE1234F"
              className="bg-[#1a1a1a]/70 border border-[#BFA980]/40 rounded-xl px-5 py-4 text-white placeholder-white/40 font-manrope text-base outline-none transition focus:ring-2 focus:ring-[#D1AF49]"
              autoComplete="off"
              disabled={submitted}
            />
          </div>

          {/* City - required */}
          <div className="flex flex-col">
            <label
              htmlFor="city"
              className="font-manrope text-white/70 mb-2 text-sm"
            >
              City <span className="text-[#BFA980]">*</span>
            </label>
            <input
              id="city"
              name="city"
              required
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="Mumbai"
              className="bg-[#1a1a1a]/70 border border-[#BFA980]/40 rounded-xl px-5 py-4 text-white placeholder-white/40 font-manrope text-base outline-none transition focus:ring-2 focus:ring-[#D1AF49]"
              autoComplete="off"
              disabled={submitted}
            />
          </div>

          {/* Car of Interest - optional */}
          <div className="flex flex-col sm:col-span-2">
            <label
              htmlFor="carInterest"
              className="font-manrope text-white/70 mb-2 text-sm"
            >
              Car of Interest
            </label>
            <select
              name="carInterest"
              id="carInterest"
              value={formData.carInterest}
              onChange={handleChange}
              className="appearance-none bg-[#1a1a1a]/70 border border-[#BFA980]/40 rounded-xl px-5 py-4 text-white font-manrope text-base placeholder-white/40 outline-none transition focus:ring-2 focus:ring-[#D1AF49]"
              disabled={submitted}
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

          {/* Submit button and terms */}
          <div className="sm:col-span-2 flex flex-col items-center">
            <button
              type="submit"
              className="w-full max-w-sm rounded-full bg-gradient-to-r from-[#D1AF49] to-[#BFA979] py-4 text-black text-xl font-semibold tracking-wide shadow-xl hover:from-[#E6C973] hover:to-[#D1AF49] transition duration-300"
              disabled={submitted}
              aria-disabled={submitted}
            >
              Submit Application
            </button>

            <p className="mt-5 max-w-xs text-center text-[11px] font-manrope text-white/60">
              * By submitting, you agree to our{" "}
              <a
                href="/TermsOfUse"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#D1AF49] hover:text-[#fff]"
              >
                Terms of Use
              </a>{" "}
              and{" "}
              <a
                href="/PrivacyPolicy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#D1AF49] hover:text-[#fff]"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </form>
      </div>

      {/* Application Submitted Modal */}
      {submitted && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="submission-title"
          aria-describedby="submission-desc"
        >
          <div className="bg-gradient-to-br from-black to-[#18181b] rounded-2xl border border-[#D4AF37] shadow-2xl max-w-md w-full p-8 text-white relative">
            <button
              aria-label="Close"
              className="absolute top-5 right-5 text-[#BFA980] hover:text-[#D4AF37] transition"
              onClick={closeModal}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 id="submission-title" className="text-2xl font-manrope font-bold mb-4 text-[#D4AF37] text-center">
              Thank you for your submission!
            </h3>
            <p id="submission-desc" className="text-gray-300 text-center mb-6">
              Our finance experts will contact you soon to assist.
            </p>
            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="py-2 px-8 border border-[#D4AF37] rounded-full font-medium text-[#D4AF37] hover:bg-[#1a1a1a] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-r from-[#0e0e0e]/60 via-[#1a1a1a]/40 to-[#0e0e0e]/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl playfair-font font-bold text-white/90 mb-4 tracking-wide">Frequently Asked Questions</h2>
              <p className="text-white/60 text-lg manrope-font font-light">Get answers to common financing questions</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#1a1a1a]/40 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#1a1a1a]/60 transition-colors"
                  >
                    <span className="manrope-font font-medium text-white/90">{faq.question}</span>
                    {openFaq === index ? 
                      <ChevronUp className="w-5 h-5 text-[#D4AF37]" /> : 
                      <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
                    }
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-white/60 manrope-font font-light leading-relaxed">{faq.answer}</p>
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
            className="w-full bg-[#0e0e0e] text-[#D4AF37] px-6 py-3 rounded-lg manrope-font font-medium text-lg hover:bg-[#1a1a1a] transition-colors"
          >
            Apply for Finance
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FinancePage;