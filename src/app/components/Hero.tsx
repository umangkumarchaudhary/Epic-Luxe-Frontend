'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Car, DollarSign, Shield, Phone, Star, TrendingUp, Eye, Clock, X, Loader2, CheckCircle, ArrowRight } from 'lucide-react';

// Type definitions
interface Banner {
  id: string;
  image_url: string;
  mobile_image_url?: string; // Mobile image (optional)
  title: string;
  subtitle: string;
  badge: string;
  position: number;
  cta1_text?: string;
  cta1_url_or_action?: string;
  cta2_text?: string;
  cta2_url_or_action?: string;
}

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

const luxuryCarModels: string[] = [
  'Mercedes-Benz', 'Audi', 'BMW', 'Volvo', 'Lexus', 'Porsche', 'Jaguar', 'Land Rover',
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
  
  // Group badges in pairs (2 badges per group)
  const badgeGroups = [
    badges.slice(0, 2), // First 2 badges
    badges.slice(2, 4)  // Last 2 badges
  ];

  // Auto-rotate groups every 2 seconds
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
          className="flex items-center justify-between space-x-6 w-full"
        >
          <div className="flex items-center space-x-2 text-sm text-white/60">
            {React.createElement(currentBadges[0].icon, { className: "w-4 h-4 text-[#BFA980]" })}
            <span className="font-medium">{currentBadges[0].text}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-white/60">
            {React.createElement(currentBadges[1].icon, { className: "w-4 h-4 text-[#BFA980]" })}
            <span className="font-medium">{currentBadges[1].text}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Quote Form Component - FIXED VERSION
function QuoteForm({ isOpen, onClose, formType }: QuoteFormProps): React.ReactElement | null {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    preferred_model: '',
    message: '', // Fixed: was trying to access additionalNotes
    lead_type: 'Hero slider leads'
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log('🚀 Form submission started');
    console.log('📝 Form data before processing:', formData);
    
    setIsLoading(true);

    try {
      // Clean phone number to only digits for backend validation
      const cleanedPhone = formData.phone.replace(/\D/g, '');
      console.log('📱 Original phone:', formData.phone, '→ Cleaned:', cleanedPhone);
      
      // Validate phone number has exactly 10 digits
      if (cleanedPhone.length !== 10) {
        console.log('❌ Phone validation failed. Length:', cleanedPhone.length);
        alert('Please enter a valid 10-digit phone number');
        setIsLoading(false);
        return;
      }
      
      // Prepare data for backend
      const submitData = {
        lead_type: formData.lead_type,
        lead_title: 'First page leads',
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
        source_page: 'Hero Component',
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

      console.log('📤 Submitting lead data to backend:', JSON.stringify(submitData, null, 2));
      
      // Try both endpoints for testing
      const endpoints = [
        'https://raam-group-all-websites.onrender.com/admin/leads',
        'http://localhost:5000/admin/leads'
      ];
      
      let response;
      let endpointUsed;
      
      for (const endpoint of endpoints) {
        try {
          console.log(`🎯 Trying endpoint: ${endpoint}`);
          response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(submitData),
          });
          endpointUsed = endpoint;
          console.log(`✅ Connected to: ${endpoint}`);
          break;
        } catch (fetchError) {
          const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);
          console.log(`❌ Failed to connect to ${endpoint}:`, errorMessage);
          continue;
        }
      }

      if (!response) {
        throw new Error('Could not connect to any endpoint');
      }

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', [...response.headers.entries()]);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response error:', errorText);
        throw new Error(`Failed to submit lead: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Lead submitted successfully:', result);
      console.log('🌐 Endpoint used:', endpointUsed);

      setIsLoading(false);
      setIsSubmitted(true);

      // Close form after success message
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({ 
          name: '', 
          phone: '', 
          preferred_model: '', 
          message: '', 
          lead_type: 'Hero slider leads' 
        });
      }, 3000);
      
    } catch (error) {
      console.error('💥 Form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      console.error('💥 Error stack:', errorStack);
      setIsLoading(false);
      alert(`Form submission failed: ${errorMessage}`);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    console.log(`📝 Field updated - ${field}: "${value}"`);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6" aria-modal="true" role="dialog" aria-labelledby="quote-form-title" aria-describedby="quote-form-desc">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        aria-label="Close quote form backdrop"
      />

      {/* Form Container - Fully Responsive */}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-xl sm:rounded-2xl border border-[#D4AF37]/30 shadow-2xl animate-[slideUp_0.5s_ease-out] overflow-hidden max-h-[85vh] sm:max-h-[80vh] flex flex-col">

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
                <div className="absolute inset-0 w-8 h-8 border-2 border-[#D4AF37]/20 rounded-full animate-pulse"></div>
              </div>
              <p className="text-white/80 text-sm font-medium">Processing your request...</p>
            </div>
          </div>
        )}

        {/* Success State */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] flex items-center justify-center z-10 animate-[slideUp_0.4s_ease-out]">
            <div className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6 md:p-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center animate-[scaleIn_0.5s_ease-out]">
                <CheckCircle className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Request Submitted!</h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                Our luxury car expert will contact you within 30 minutes to discuss your {formType === 'buy' ? 'purchase' : 'valuation'} requirements.
              </p>
              <div className="flex items-center justify-center space-x-2 text-[#D4AF37] text-sm font-medium">
                <Clock className="w-4 h-4" />
                <span>Closing automatically...</span>
              </div>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 z-20"
          aria-label="Close form"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
        </button>

        {/* Form Header with responsive design */}
        <div className="p-3 sm:p-4 md:p-5 pb-2 sm:pb-3 md:pb-4 border-b border-[#D4AF37]/20 flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <div className="p-1.5 sm:p-2 md:p-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20">
            {formType === 'buy' ?
              <Car className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#D4AF37]" /> :
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#BFA980]" />
            }
          </div>
          <div>
            <h2 id="quote-form-title" className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight">
              {formType === 'buy' ? 'Get Dream Car Quote' : 'Get Car Valuation'}
            </h2>
            <p id="quote-form-desc" className="text-white/60 text-xs sm:text-sm">
              Contact within 30 minutes
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-3 sm:p-4 md:p-5 lg:p-6 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 overflow-y-auto max-h-[calc(85vh-140px)] sm:max-h-none pb-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-3 sm:gap-y-4 md:gap-y-5">
            {/* Name Field */}
            <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
              <label className="block text-xs sm:text-sm md:text-base font-semibold text-white/90" htmlFor="name">
                Full Name <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg bg-black/30 border border-[#BFA980]/30 text-white text-sm md:text-base placeholder-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                placeholder="Enter your full name"
                aria-required="true"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
              <label className="block text-xs sm:text-sm md:text-base font-semibold text-white/90" htmlFor="phone">
                Phone Number <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg bg-black/30 border border-[#BFA980]/30 text-white text-sm md:text-base placeholder-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                placeholder="1234567890"
                aria-required="true"
              />
            </div>
          </div>

          {/* Preferred Model */}
          <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
            <label className="block text-xs sm:text-sm md:text-base font-semibold text-white/90" htmlFor="preferred_model">
              {formType === 'buy' ? 'Preferred Model' : 'Your Car Model'} <span className="text-[#D4AF37]">*</span>
            </label>
            <select
              id="preferred_model"
              required
              value={formData.preferred_model}
              onChange={(e) => handleInputChange('preferred_model', e.target.value)}
              className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg bg-black/30 border border-[#BFA980]/30 text-white text-sm md:text-base focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
              aria-required="true"
            >
              <option value="">Select a model</option>
              {luxuryCarModels.map((model) => (
                <option key={model} value={model} className="bg-[#1a1a1a] text-white">
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Additional Notes */}
          <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
            <label className="block text-xs sm:text-sm md:text-base font-semibold text-white/90" htmlFor="message">
              Additional Requirements (Optional)
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={3}
              className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg bg-black/30 border border-[#BFA980]/30 text-white text-sm md:text-base placeholder-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all resize-none"
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
            className="w-full flex items-center justify-center space-x-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-bold text-sm md:text-base lg:text-lg hover:from-[#BFA980] hover:to-[#D4AF37] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{ marginBottom: 0 }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span>{formType === 'buy' ? 'Get Quote' : 'Get Valuation'}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </>
            )}
          </button>

          {/* Privacy Notice */}
          <p className="text-xs sm:text-sm text-white/50 text-center leading-relaxed px-2 sm:px-3">
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
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past 100px
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar, { passive: true });
      return () => window.removeEventListener('scroll', controlNavbar);
    }
  }, [lastScrollY]);

  const handleBuyClick = () => {
    router.push('/luxe/buy-used-cars');
  };

  const handleSellClick = () => {
    router.push('/luxe/services/SellNowYourCar');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:7288882121';
  };

  return (
    <div 
      className={`md:hidden fixed bottom-0 left-0 w-full bg-black/95 backdrop-blur-md border-t border-[#D4AF37]/20 z-50 manrope-font transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`} 
      role="navigation" 
      aria-label="Bottom navigation"
    >
      <div className="grid grid-cols-3 gap-1 py-2 px-2">
        <button 
          onClick={handleBuyClick}
          className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300" 
          aria-label="Buy"
        >
          <Car className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs text-[#D4AF37] font-semibold">Buy</span>
        </button>
        <button 
          onClick={handleSellClick}
          className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300" 
          aria-label="Sell"
        >
          <DollarSign className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs text-[#D4AF37] font-semibold">Sell</span>
        </button>
        <button 
          onClick={handleCallClick}
          className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300" 
          aria-label="Call Now"
        >
          <Phone className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs text-[#D4AF37] font-semibold">Call Now</span>
        </button>
      </div>
    </div>
  );
}

export default function LuxuryVehicleHero(): React.ReactElement {
  const router = useRouter();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loadingBanners, setLoadingBanners] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<'buy' | 'sell'>('buy');

  // Navigation functions
  const navigateToBrowseCars = (): void => {
    router.push('/luxe/buy-used-cars');
  };

  const navigateToSellCar = (): void => {
    router.push('/luxe/services/SellNowYourCar');
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

  // Fetch banners from backend on mount
  useEffect(() => {
    async function fetchBanners() {
      try {
        setLoadingBanners(true);
        setLoadError('');
        const res = await fetch('https://raam-group-all-websites.onrender.com/admin/banners');
        if (!res.ok) throw new Error('Failed to fetch banners');
        const json = await res.json();
        // Sort banners by position ascending
        const sorted = json.banners.sort((a: Banner, b: Banner) => a.position - b.position);
        setBanners(sorted);
      } catch (err) {
        console.error(err);
        setLoadError('Failed to load banners');
      } finally {
        setLoadingBanners(false);
      }
    }
    fetchBanners();
  }, []);

  // Slider interval
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  // Cleanup scroll style on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Current banner logic (show loading fallback if no banners)
  const currentBanner = banners.length > 0 ? banners[currentIndex] : undefined;

  // Handler for CTA buttons - opens URL or quote form
  const handleCTAButtonClick = (text: string | undefined, action: string | undefined) => {
    if (!text || !action) return;

    if (action === 'Get Free Quote') {
      openQuoteForm('buy'); // or determine 'buy' or 'sell' based on context if needed
    } else if (action.startsWith('/')) {
      window.location.href = action; // internal route
    } else if (action.startsWith('http')) {
      window.open(action, '_blank'); // external URL
    } else {
      console.warn('CTA action unknown:', action);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black manrope-font" id="hero-section">

      {/* Loading/Error states */}
      {loadingBanners && (
        <div className="flex justify-center items-center h-64 text-lg text-gray-600 pt-[10vh]" role="status" aria-live="polite">
          Loading EPICness...
        </div>
      )}

      {loadError && (
        <div className="flex justify-center items-center h-64 text-red-600 font-semibold pt-[10vh]" role="alert">
          {loadError}
        </div>
      )}

      {/* Main slider */}
      {!loadingBanners && currentBanner && (
        <section
          aria-label="Featured Luxury Vehicle Banner"
          style={{
            paddingTop: 10,
            height: '60vh'
          }}
          className="w-full relative overflow-hidden"
        >

          {/* Background Image with Enhanced Gradient Overlay - Responsive */}
          <div className="absolute inset-0 w-full h-full">
            {/* Mobile Image - Show on screens smaller than 768px */}
            {currentBanner.mobile_image_url && (
              <Image
                src={currentBanner.mobile_image_url}
                alt={`${currentBanner.title} (Mobile)`}
                fill
                className="object-cover w-full h-full block md:hidden"
                priority
                sizes="100vw"
              />
            )}
            
            {/* PC Image - Show on screens 768px and larger, or if no mobile image */}
            <Image
              src={currentBanner.image_url}
              alt={`${currentBanner.title} (Desktop)`}
              fill
              className={`object-cover w-full h-full ${currentBanner.mobile_image_url ? 'hidden md:block' : 'block'}`}
              priority
              sizes="100vw"
            />
            
            {/* Gradient overlay to blend with black grid section below */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"></div>
          </div>

          {/* Desktop Content Overlay */}
          <div className="hidden md:flex absolute inset-0 flex-col justify-center px-8 lg:px-16 z-20">
            <div className={`transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>

              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/15 to-[#BFA980]/15 backdrop-blur-md border border-[#D4AF37]/20 mb-2">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full mr-2 animate-pulse"></div>
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-transparent bg-clip-text font-bold text-xs tracking-wider">
                  {currentBanner.badge}
                </span>
              </div>

              {/* Main Content */}
              <h1 className="text-3xl lg:text-4xl font-bold text-white/80 mb-1 leading-tight tracking-wide">
                {currentBanner.title}
              </h1>
              <h2 className="text-lg lg:text-xl font-light bg-gradient-to-r from-[#D4AF37]/80 to-[#BFA980]/80 text-transparent bg-clip-text mb-2 leading-snug">
                {currentBanner.subtitle}
              </h2>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => router.push('/luxe/buy-used-cars')}
                  className="flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-bold hover:from-[#BFA980] hover:to-[#D4AF37] transition-all transform hover:scale-105 shadow-2xl hover:shadow-[#D4AF37]/30 text-sm"
                  aria-label={currentBanner.cta1_text || 'Explore Collection'}
                >
                  <Eye className="w-4 h-4" />
                  <span>{currentBanner.cta1_text || 'Explore Collection'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setFormType('sell');
                    setIsFormOpen(true);
                    document.body.style.overflow = 'hidden';
                  }}
                  className="flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full border-2 border-[#D4AF37]/70 text-white/80 font-bold hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#BFA980] hover:text-black transition-all transform hover:scale-105 hover:shadow-xl text-sm"
                  aria-label={currentBanner.cta2_text || 'Get Free Quote'}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>{currentBanner.cta2_text || 'Get Free Quote'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Content Overlay */}
          <div className="md:hidden absolute bottom-0 left-0 right-0 z-30">
            <div className={`transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}> 
              <div className="px-6 pb-6">
                {/* Badge */}
                <div className="inline-flex items-center px-3 py-1.5 rounded-full mb-4">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-2 animate-pulse"></div>
                  <span className="text-[#D4AF37] font-bold text-xs tracking-wider">
                    {currentBanner.badge}
                  </span>
                </div>
                {/* Mobile Typography */}
                <h1 className="text-3xl font-bold text-white mb-2 leading-tight tracking-wide">
                  {currentBanner.title}
                </h1>
                <h2 className="text-lg font-light text-[#D4AF37] mb-3 leading-snug">
                  {currentBanner.subtitle}
                </h2>
                {/* Mobile CTA Buttons */}
                <div className="flex space-x-3" role="group" aria-label="Mobile call to action buttons">
                  <button
                    onClick={() => handleCTAButtonClick(currentBanner.cta1_text, currentBanner.cta1_url_or_action)}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#D4AF37] text-black font-bold transition-all text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{currentBanner.cta1_text || 'Explore'}</span>
                  </button>
                  <button
                    onClick={() => handleCTAButtonClick(currentBanner.cta2_text, currentBanner.cta2_url_or_action)}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-black border border-[#D4AF37] text-white font-bold transition-all text-sm"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>{currentBanner.cta2_text || 'Quote'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Buy/Sell Cards Section - DESKTOP ONLY */}
      <div className="hidden md:block py-4 md:py-2 w-full px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

            {/* Buy Premium Car Card */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl border border-[#BFA980]/20 hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/5 to-transparent rounded-full blur-3xl"></div>
              <div className="relative p-6 space-y-4 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                      <Car className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white/90">Buy Premium Car</h4>
                      <p className="text-white/50 text-sm font-medium">Curated luxury collection</p>
                    </div>
                  </div>

                  <AnimatedTrustBadges badges={buyTrustBadges} />
                </div>

                <button
                  onClick={navigateToBrowseCars}
                  className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD700] to-[#BFA980] text-black font-bold border-2 border-[#D4AF37] shadow-lg hover:shadow-xl hover:bg-[#FFF8DC] transition-all duration-300 group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 z-50 pointer-events-auto"
                  aria-label="Browse Cars for Buying"
                  tabIndex={0}
                >
                  <Eye className="w-4 h-4" />
                  <span>Browse Cars</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Sell Your Car Card */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl border border-[#BFA980]/20 hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden h-full">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#BFA980]/5 to-transparent rounded-full blur-3xl"></div>
              <div className="relative p-6 space-y-4 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-[#BFA980]/10 border border-[#BFA980]/20">
                      <DollarSign className="w-6 h-6 text-[#BFA980]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white/90">Sell Your Car</h4>
                      <p className="text-white/50 text-sm font-medium">Get best market value</p>
                    </div>
                  </div>

                  <AnimatedTrustBadges badges={sellTrustBadges} />
                </div>

                <button
                  onClick={() => {
                    setFormType('sell');
                    setIsFormOpen(true);
                    document.body.style.overflow = 'hidden';
                  }}
                  className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-3 rounded-full border-2 border-[#BFA980] text-[#BFA980] font-semibold hover:bg-[#BFA980] hover:text-[#0e0e0e] transition-all duration-300 group-hover:scale-105 z-50 pointer-events-auto"
                  aria-label="Get Valuation for Selling"
                  tabIndex={0}
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

      {/* Final CTA Section - MOBILE ONLY */}
      <div className="md:hidden w-full bg-gradient-to-b from-[#0e0e0e] to-[#1a1a1a] py-8 px-5 border-t border-[#BFA980]/20 relative z-40">
        <div className="max-w-md mx-auto text-center space-y-6">

          {/* Heading */}
          <h3 className="text-xl font-semibold text-white leading-snug">
            🚗 Ready to Sell or Buy?
          </h3>

          {/* Toggle Buttons */}
          <div className="flex justify-center">
            <div className="bg-black/30 backdrop-blur-sm rounded-full p-1 border border-[#BFA980]/20 relative z-50" role="tablist" aria-label="Select buy or sell">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Buy button clicked');
                  setActiveTab('buy');
                }}
                role="tab"
                aria-selected={activeTab === 'buy'}
                aria-controls="buy-tab-panel"
                id="buy-tab"
                className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === 'buy'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                Buy
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Sell button clicked');
                  setActiveTab('sell');
                }}
                role="tab"
                aria-selected={activeTab === 'sell'}
                aria-controls="sell-tab-panel"
                id="sell-tab"
                className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === 'sell'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                Sell
              </button>
            </div>
          </div>

          {/* Dual Action Buttons with Fade-in */}
          <div className="relative h-[46px] transition-opacity duration-500 ease-in-out z-50" role="tabpanel" tabIndex={0} id={`${activeTab}-tab-panel`} aria-labelledby={`${activeTab}-tab`}>
            <div
              key={activeTab}
              className="absolute inset-0 flex justify-center gap-3 opacity-0 animate-[fadeIn_0.4s_ease-in-out_forwards]"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Quote form button clicked, activeTab:', activeTab);
                  openQuoteForm(activeTab);
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-white/80 font-semibold hover:bg-white/10 transition-all text-sm cursor-pointer relative z-50"
                aria-label={activeTab === 'buy' ? 'Get Quote' : 'Get Valuation'}
              >
                {activeTab === 'buy' ? <Eye className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                <span>{activeTab === 'buy' ? 'Get Quote' : 'Get Valuation'}</span>
              </button>
              <a 
                href="tel:7288882121" 
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-white/80 font-semibold hover:bg-white/10 transition-all text-sm cursor-pointer relative z-50" 
                aria-label="Call Expert"
                onClick={() => {
                  console.log('Call expert button clicked');
                }}
              >
                <Phone className="w-4 h-4" />
                <span>Call Expert</span>
              </a>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-5 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-3 text-xs">
             
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Epic Shield button clicked');
                  router.push('/luxe/ExtendedWarranty');
                }}
                className="flex items-center gap-1 text-[#D4AF37] hover:text-[#BFA980] transition-colors cursor-pointer relative z-50"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="font-semibold">Epic Shield</span>
              </button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Quote Form Modal */}
      {/* Desktop: show form as a side modal if open, else as center modal on mobile */}
      {isFormOpen && (
        <div>
          <div className="hidden md:block fixed top-0 right-0 h-full w-full max-w-xl z-[120] flex items-center justify-end pointer-events-none">
            <div className="w-full max-w-xl pointer-events-auto">
              <QuoteForm isOpen={isFormOpen} onClose={closeQuoteForm} formType={formType} />
            </div>
          </div>
          <div className="md:hidden">
            <QuoteForm isOpen={isFormOpen} onClose={closeQuoteForm} formType={formType} />
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-\[fadeIn_0\.3s_ease-out\] {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-\[fadeIn_0\.4s_ease-in-out_forwards\] {
          animation: fadeIn 0.4s ease-in-out forwards;
        }
        .animate-\[slideUp_0\.4s_ease-out\] {
          animation: slideUp 0.4s ease-out forwards;
        }
        .animate-\[slideUp_0\.5s_ease-out\] {
          animation: slideUp 0.5s ease-out forwards;
        }
        .animate-\[scaleIn_0\.5s_ease-out\] {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .manrope-font {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        body.modal-open {
          overflow: hidden;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #D4AF37, #BFA980);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #BFA980, #D4AF37);
        }
      `}</style>

      <BottomNav />
    </div>
  );
}