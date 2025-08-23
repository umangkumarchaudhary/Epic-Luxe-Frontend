'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Car, DollarSign, Shield, Phone, Star, TrendingUp, Eye, Clock, MessageCircle, X, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { HeroClientProps } from './types';

// Type definitions for form
interface FormData {
  name: string;
  phone: string;
  preferred_model: string;
  message: string;
  lead_type: string;
}

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  formType: 'buy' | 'sell';
}

const reassuredCarModels: string[] = [
  'Honda', 'Toyota', 'Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Kia', 'Renault', 'Nissan', 'Ford',
];

// Trust badges for Buy and Sell cards
const buyTrustBadges = [
  { icon: Star, text: 'Certified Quality' },
  { icon: Shield, text: 'Comprehensive Warranty' },
  { icon: CheckCircle, text: 'Verified Documentation' },
  { icon: TrendingUp, text: 'Expert Inspection' }
];

const sellTrustBadges = [
  { icon: TrendingUp, text: 'Instant Valuation' },
  { icon: Clock, text: 'Quick Settlement' },
  { icon: CheckCircle, text: 'Market Best Price' },
  { icon: Shield, text: 'Secure Transaction' }
];

// Animated Trust Badges Component
const AnimatedTrustBadges: React.FC<{ badges: typeof buyTrustBadges }> = ({ badges }) => {
  const [currentGroup, setCurrentGroup] = useState(0);
  
  const badgeGroups = [
    badges.slice(0, 2),
    badges.slice(2, 4)
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % badgeGroups.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [badgeGroups.length]);

  const currentBadges = badgeGroups[currentGroup];

  return (
    <div className="flex items-center justify-between space-x-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGroup}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 text-sm text-black/60"
        >
          {React.createElement(currentBadges[0].icon, { className: "w-4 h-4 text-black" })}
          <span className="font-medium">{currentBadges[0].text}</span>
        </motion.div>
        <motion.div
          key={`${currentGroup}-second`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center space-x-2 text-sm text-black/60"
        >
          {React.createElement(currentBadges[1].icon, { className: "w-4 h-4 text-black" })}
          <span className="font-medium">{currentBadges[1].text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Quote Form Component
function QuoteForm({ isOpen, onClose, formType }: QuoteFormProps): React.ReactElement | null {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    preferred_model: '',
    message: '',
    lead_type: 'Reassured Hero leads'
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const cleanedPhone = formData.phone.replace(/\D/g, '');
      
      if (cleanedPhone.length !== 10) {
        alert('Please enter a valid 10-digit phone number');
        setIsLoading(false);
        return;
      }
      
      const submitData = {
        lead_type: formData.lead_type,
        lead_title: 'Reassured page leads',
        name: formData.name.trim(),
        phone: cleanedPhone,
        email: null,
        preferred_model: formData.preferred_model,
        vehicle_id: null,
        appointment_date: null,
        appointment_time: null,
        message: formData.message.trim() || null,
        budget: null,
        insurance_type: null,
        loan_details: null,
        status: 'new',
        source_page: 'Reassured Hero Component',
        brand: null,
        fuel: null,
        variant: null,
        city: null,
        year: null,
        owner: null,
        kms: null,
        whatsapp_updates: null,
        monthly_income: null,
        employment_type: null,
        interested_car: null,
        loan_amount: null,
        emi_tenure: null,
        interest: null,
        your_emi: null,
        total_payable: null,
        pan_card: null,
        car_interest: null
      };

      const endpoints = [
        'https://raam-group-all-websites.onrender.com/admin/leads',
        'http://localhost:5000/admin/leads'
      ];
      
      let response;
      
      for (const endpoint of endpoints) {
        try {
          response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(submitData),
          });
          break;
        } catch {
          continue;
        }
      }

      if (!response) {
        throw new Error('Could not connect to any endpoint');
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit lead: ${response.status} - ${errorText}`);
      }

      await response.json();
      setIsLoading(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({ 
          name: '', 
          phone: '', 
          preferred_model: '', 
          message: '', 
          lead_type: 'Reassured Hero leads' 
        });
      }, 3000);
      
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Form submission failed: ${errorMessage}`);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
      />

      {/* Form Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-2xl animate-[slideUp_0.5s_ease-out] overflow-hidden">
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="flex flex-col items-center space-y-3">
              <Loader2 className="w-8 h-8 text-black animate-spin" />
              <p className="text-black/80 text-sm font-medium">Processing your request...</p>
            </div>
          </div>
        )}

        {/* Success State */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
            <div className="text-center space-y-4 p-8">
              <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black">Request Submitted!</h3>
              <p className="text-black/70 text-sm leading-relaxed">
                Our expert will contact you within 30 minutes to discuss your {formType === 'buy' ? 'purchase' : 'valuation'} requirements.
              </p>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 z-20"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Form Header */}
        <div className="p-3 sm:p-4 pb-2 sm:pb-3 border-b border-gray-200 flex items-center space-x-2 sm:space-x-3">
          <div className="p-1.5 sm:p-2 rounded-lg bg-gray-100">
            {formType === 'buy' ?
              <Car className="w-4 h-4 sm:w-5 sm:h-5 text-black" /> :
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            }
          </div>
          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-black leading-tight">
              {formType === 'buy' ? 'Get Car Quote' : 'Get Car Valuation'}
            </h2>
            <p className="text-black/60 text-xs">
              Contact within 30 minutes
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-4 sm:gap-y-5">
            {/* Name Field */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-black" htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border border-gray-200 text-black text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-black" htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border border-gray-200 text-black text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                placeholder="1234567890"
              />
            </div>
          </div>

          {/* Preferred Model */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-black" htmlFor="preferred_model">
              {formType === 'buy' ? 'Preferred Model' : 'Your Car Model'} <span className="text-red-500">*</span>
            </label>
            <select
              id="preferred_model"
              required
              value={formData.preferred_model}
              onChange={(e) => handleInputChange('preferred_model', e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border border-gray-200 text-black text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
            >
              <option value="">Select a model</option>
              {reassuredCarModels.map((model) => (
                <option key={model} value={model} className="bg-white text-black">
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Additional Notes */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-black" htmlFor="message">
              Additional Requirements (Optional)
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={3}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border border-gray-200 text-black text-sm placeholder-black/40 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
              placeholder={formType === 'buy' ?
                "Budget range, features, timeline..." :
                "Year, mileage, condition..."
              }
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg bg-black text-white font-bold text-sm sm:text-base hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{formType === 'buy' ? 'Get Quote' : 'Get Valuation'}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </>
            )}
          </button>

          {/* Privacy Notice */}
          <p className="text-xs text-black/50 text-center leading-relaxed px-2">
            By submitting, you agree to our privacy policy. We&apos;ll contact you within 30 minutes.
          </p>
        </form>
      </div>
    </div>
  );
}

// Bottom Sticky Navigation (Mobile Only) with Scroll Behavior
function BottomNav(): React.ReactElement {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => window.removeEventListener('scroll', controlNavbar);
    }
  }, [lastScrollY]);

  const handleBuyClick = () => {
    router.push('/reassured/buy-used-cars');
  };

  const handleSellClick = () => {
    router.push('/reassured/Services/sell-your-car');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:7288882121';
  };

  return (
    <div 
      className={`md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`} 
      role="navigation" 
      aria-label="Bottom navigation"
    >
      <div className="grid grid-cols-3 gap-1 py-2 sm:py-3 px-2 sm:px-4">
        <button 
          onClick={handleBuyClick}
          className="flex flex-col items-center space-y-1 py-2 sm:py-3 px-1 sm:px-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-300" 
        >
          <Car className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
          <span className="text-xs sm:text-sm text-black font-semibold">Buy</span>
        </button>
        <button 
          onClick={handleSellClick}
          className="flex flex-col items-center space-y-1 py-2 sm:py-3 px-1 sm:px-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-300" 
        >
          <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
          <span className="text-xs sm:text-sm text-black font-semibold">Sell</span>
        </button>
        <button 
          onClick={handleCallClick}
          className="flex flex-col items-center space-y-1 py-2 sm:py-3 px-1 sm:px-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-300" 
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
          <span className="text-xs sm:text-sm text-black font-semibold">Call</span>
        </button>
      </div>
    </div>
  );
}

export default function ReassuredHeroClient({ data }: HeroClientProps): React.ReactElement {
  const router = useRouter();
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<'buy' | 'sell'>('buy');

  // Navigation functions
  const navigateToBrowseCars = (): void => {
    router.push('/reassured/buy-used-cars');
  };

  const navigateToSellCar = (): void => {
    router.push('/reassured/Services/sell-your-car');
  };

  const openQuoteForm = (type: 'buy' | 'sell'): void => {
    setFormType(type);
    setIsFormOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeQuoteForm = (): void => {
    setIsFormOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Background slideshow
  useEffect(() => {
    if (data.backgroundImages.images.length > 1) {
      const interval = setInterval(() => {
        setBackgroundIndex((prev) => (prev + 1) % data.backgroundImages.images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data.backgroundImages.images.length]);

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      
      {/* Mobile Hero Banner Section */}
      <section className="md:hidden relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        {/* Mobile Background Images */}
        <div className="absolute inset-0 w-full h-full">
          {data.backgroundImages.images.map((image, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === backgroundIndex ? 'opacity-30' : 'opacity-0'}`}>
              <Image
                src={data.backgroundImages.mobileImages?.[index] || image}
                alt="Background"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          
          {/* Mobile Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80 z-10"></div>
        </div>

        {/* Mobile Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 z-20">
          <div className="max-w-md mx-auto text-center space-y-4">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-gray-200/50 mb-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full mr-2 animate-pulse"></div>
              <span className="text-black font-bold text-xs tracking-wider">
                EPIC REASSURED
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2 leading-tight">
              Premium Pre-Owned Cars
            </h1>
            <h2 className="text-lg font-light text-black/80 mb-4 leading-snug">
              Quality assured vehicles at best prices
            </h2>
            
            {/* Mobile CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={navigateToBrowseCars}
                className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all text-sm"
              >
                <Eye className="w-4 h-4" />
                <span>Browse Cars</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => openQuoteForm('buy')}
                className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all text-sm"
              >
                <DollarSign className="w-4 h-4" />
                <span>Get Quote</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Background Images */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        {data.backgroundImages.images.map((image, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === backgroundIndex ? 'opacity-20' : 'opacity-0'}`}>
            <Image
              src={image}
              alt="Background"
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        
        {/* Desktop Gradient overlay to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80 z-10"></div>
      </div>

      {/* Desktop Grid Section */}
      <div className="hidden md:block py-8 w-full px-6 md:px-8 lg:px-12 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

            {/* Buy Car Card */}
            <div className="group relative bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-500 overflow-hidden h-full shadow-lg hover:shadow-xl">
              <div className="relative p-6 space-y-4 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-gray-100 border border-gray-200">
                      <Car className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-black">Buy Car</h4>
                      <p className="text-black/60 text-sm font-medium">Quality pre-owned vehicles</p>
                    </div>
                  </div>

                  <AnimatedTrustBadges badges={buyTrustBadges} />
                </div>

                <button
                  onClick={navigateToBrowseCars}
                  className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-300 group-hover:scale-105"
                >
                  <Eye className="w-4 h-4" />
                  <span>Browse Cars</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Sell Your Car Card */}
            <div className="group relative bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-500 overflow-hidden h-full shadow-lg hover:shadow-xl">
              <div className="relative p-6 space-y-4 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-gray-100 border border-gray-200">
                      <DollarSign className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-black">Sell Your Car</h4>
                      <p className="text-black/60 text-sm font-medium">Get best market value</p>
                    </div>
                  </div>

                  <AnimatedTrustBadges badges={sellTrustBadges} />
                </div>

                <button
                  onClick={navigateToSellCar}
                  className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-3 rounded-full border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-all duration-300 group-hover:scale-105"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Get Valuation</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA Section */}
      <div className="md:hidden w-full bg-white py-8 px-5 border-t border-gray-200 relative z-20">
        <div className="max-w-md mx-auto text-center space-y-6">

          {/* Heading */}
          <h3 className="text-xl font-semibold text-black leading-snug">
            🚗 Ready to Sell or Buy?
          </h3>

          {/* Toggle Buttons */}
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-full p-1 border border-gray-200 relative z-50" role="tablist">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveTab('buy');
                }}
                className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === 'buy'
                    ? 'bg-black text-white'
                    : 'text-black/80 hover:bg-gray-200'
                }`}
              >
                Buy
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveTab('sell');
                }}
                className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === 'sell'
                    ? 'bg-black text-white'
                    : 'text-black/80 hover:bg-gray-200'
                }`}
              >
                Sell
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="relative h-[46px] z-50">
            <div className="absolute inset-0 flex justify-center gap-3 opacity-100">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openQuoteForm(activeTab);
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 text-black font-semibold hover:bg-gray-100 transition-all text-sm cursor-pointer relative z-50"
              >
                {activeTab === 'buy' ? <Eye className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                <span>{activeTab === 'buy' ? 'Get Quote' : 'Get Valuation'}</span>
              </button>
              <a 
                href="tel:7288882121" 
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 text-black font-semibold hover:bg-gray-100 transition-all text-sm cursor-pointer relative z-50"
              >
                <Phone className="w-4 h-4" />
                <span>Call Expert</span>
              </a>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-5 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <button className="flex items-center gap-1 text-black hover:text-gray-600 transition-colors">
                <DollarSign className="w-3.5 h-3.5" />
                <span className="font-semibold">Finance Option</span>
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push('/reassured/ExtendedWarranty');
                }}
                className="flex items-center gap-1 text-black hover:text-gray-600 transition-colors cursor-pointer relative z-50"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="font-semibold">Epic Shield</span>
              </button>
              <span className="text-gray-300">|</span>
              <button className="flex items-center gap-1 text-black hover:text-gray-600 transition-colors">
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="font-semibold">Live Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Form Modal */}
      <QuoteForm
        isOpen={isFormOpen}
        onClose={closeQuoteForm}
        formType={formType}
      />

      <BottomNav />
    </div>
  );
}