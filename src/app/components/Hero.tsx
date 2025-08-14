'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import Image from 'next/image';
import { ChevronRight, Car, DollarSign, Shield, Search, Phone, Star, TrendingUp, Eye, Clock, Home, User, MessageCircle, X, Loader2, CheckCircle, ArrowRight } from 'lucide-react';

// Type definitions
interface Banner {
  id: string;
  image_url: string;
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
  preferredModel: string;
  additionalNotes: string;
}

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  formType: 'buy' | 'sell';
}

interface ParallaxState {
  x: number;
  y: number;
}

const luxuryCarModels: string[] = [
  'Bugatti Chiron', 'McLaren 720S', 'Porsche 911 Turbo S', 'Ferrari F8 Tributo',
  'Lamborghini Huracán', 'Aston Martin DB11', 'Bentley Continental GT',
  'Rolls-Royce Ghost', 'Mercedes AMG GT', 'BMW M8 Competition', 'Audi R8',
  'Maserati MC20', 'Other'
];

// Quote Form Component
function QuoteForm({ isOpen, onClose, formType }: QuoteFormProps): React.ReactElement | null {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    preferredModel: '',
    additionalNotes: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Normally, send data to API
      console.log('Form submitted:', formData);

      setIsLoading(false);
      setIsSubmitted(true);

      // Close form after success message
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({ name: '', phone: '', preferredModel: '', additionalNotes: '' });
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsLoading(false);
      // Handle error state here
    }
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" aria-modal="true" role="dialog" aria-labelledby="quote-form-title" aria-describedby="quote-form-desc">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        aria-label="Close quote form backdrop"
      />

      {/* Form Container with increased width and reduced height for header */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl border border-[#D4AF37]/30 shadow-2xl animate-[slideUp_0.5s_ease-out] overflow-hidden">

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
            <div className="text-center space-y-4 p-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center animate-[scaleIn_0.5s_ease-out]">
                <CheckCircle className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white">Request Submitted!</h3>
              <p className="text-white/70 text-sm leading-relaxed">
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
          className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 z-20"
          aria-label="Close form"
        >
          <X className="w-5 h-5 text-white/70" />
        </button>

        {/* Form Header with reduced padding for compactness */}
        <div className="p-4 pb-3 border-b border-[#D4AF37]/20 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20">
            {formType === 'buy' ?
              <Car className="w-5 h-5 text-[#D4AF37]" /> :
              <DollarSign className="w-5 h-5 text-[#BFA980]" />
            }
          </div>
          <div>
            <h2 id="quote-form-title" className="text-lg font-bold text-white leading-tight">
              {formType === 'buy' ? 'Get Your Dream Car Quote' : 'Get Instant Car Valuation'}
            </h2>
            <p id="quote-form-desc" className="text-white/60 text-xs">
              We&apos;ll contact you within 30 minutes
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90" htmlFor="name">
                Full Name <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[#BFA980]/30 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                placeholder="Enter your full name"
                aria-required="true"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90" htmlFor="phone">
                Phone Number <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[#BFA980]/30 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                placeholder="+1 (555) 000-0000"
                aria-required="true"
              />
            </div>
          </div>

          {/* Preferred Model */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/90" htmlFor="preferredModel">
              {formType === 'buy' ? 'Preferred Model' : 'Your Car Model'} <span className="text-[#D4AF37]">*</span>
            </label>
            <select
              id="preferredModel"
              required
              value={formData.preferredModel}
              onChange={(e) => handleInputChange('preferredModel', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[#BFA980]/30 text-white focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
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
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/90" htmlFor="additionalNotes">
              Additional Requirements (Optional)
            </label>
            <textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[#BFA980]/30 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all resize-none"
              placeholder={formType === 'buy' ?
                "Budget range, specific features, timeline..." :
                "Year, mileage, condition details..."
              }
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-bold hover:from-[#BFA980] hover:to-[#D4AF37] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Phone className="w-5 h-5" />
                <span>{formType === 'buy' ? 'Get Purchase Quote' : 'Get Valuation'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Privacy Notice */}
          <p className="text-xs text-white/50 text-center leading-relaxed">
            By submitting, you agree to our privacy policy. We&apos;ll only use your information to provide the requested quote and may contact you about related luxury vehicle services.
          </p>
        </form>
      </div>
    </div>
  );
}

// Bottom Sticky Navigation (Mobile Only)
function BottomNav(): React.ReactElement {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/95 backdrop-blur-md border-t border-[#D4AF37]/20 z-50 manrope-font" role="navigation" aria-label="Bottom navigation">
      <div className="grid grid-cols-4 gap-1 py-2 px-2">
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300" aria-label="Home">
          <Home className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs text-[#D4AF37] font-semibold">Home</span>
        </button>
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#BFA980]/10 transition-all duration-300" aria-label="Buy">
          <DollarSign className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 font-semibold">Buy</span>
        </button>
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#BFA980]/10 transition-all duration-300" aria-label="Sell">
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 font-semibold">Sell</span>
        </button>
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#BFA980]/10 transition-all duration-300" aria-label="Connect">
          <User className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 font-semibold">Connect</span>
        </button>
      </div>
    </div>
  );
}

export default function LuxuryVehicleHero(): React.ReactElement {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loadingBanners, setLoadingBanners] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [parallax, setParallax] = useState<ParallaxState>({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<'buy' | 'sell'>('buy');

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
        const res = await fetch('http://localhost:5000/admin/banners');
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

  // Parallax effect - Fixed version
  useEffect(() => {
    const handleParallax = (e: MouseEvent): void => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.5;
      setParallax({ x, y });
    };

    window.addEventListener('mousemove', handleParallax);
    return () => window.removeEventListener('mousemove', handleParallax);
  }, []);

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
          Loading EPICness
        </div>
      )}

      {loadError && (
        <div className="flex justify-center items-center h-64 text-red-600 font-semibold pt-[10vh]" role="alert">
          {loadError}
        </div>
      )}

      {/* Main slider */}
      {!loadingBanners && currentBanner && (
        <section aria-label="Featured Luxury Vehicle Banner" className="pt-[10vh] h-[60vh] md:h-[60vh] w-full relative overflow-hidden">

          {/* Background Image with Enhanced Gradient Overlay */}
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              transform: `scale(1.1) translateX(${parallax.x * 20}px) translateY(${parallax.y * 10}px)`,
              opacity: isTransitioning ? 0.7 : 1
            }}
          >
            <Image
              src={currentBanner.image_url}
              alt={currentBanner.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/90 to-transparent"></div>
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
                  onClick={() => handleCTAButtonClick(currentBanner.cta1_text, currentBanner.cta1_url_or_action)}
                  className="flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-bold hover:from-[#BFA980] hover:to-[#D4AF37] transition-all transform hover:scale-105 shadow-2xl hover:shadow-[#D4AF37]/30 text-sm"
                  aria-label={currentBanner.cta1_text || 'Explore Collection'}
                >
                  <Eye className="w-4 h-4" />
                  <span>{currentBanner.cta1_text || 'Explore Collection'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCTAButtonClick(currentBanner.cta2_text, currentBanner.cta2_url_or_action)}
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
          <div className="md:hidden absolute bottom-0 left-0 right-0 z-20">
            <div className={`transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <div className="px-6 pb-6">

                {/* Badge */}
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA980]/10 backdrop-blur-sm mb-4">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full mr-2 animate-pulse"></div>
                  <span className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-transparent bg-clip-text font-bold text-xs tracking-wider">
                    {currentBanner.badge}
                  </span>
                </div>

                {/* Mobile Typography */}
                <h1 className="text-3xl font-bold text-white mb-2 leading-tight drop-shadow-2xl tracking-wide">
                  {currentBanner.title}
                </h1>
                <h2 className="text-lg font-light bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-transparent bg-clip-text mb-3 drop-shadow-sm leading-snug">
                  {currentBanner.subtitle}
                </h2>

                {/* Mobile CTA Buttons */}
                <div className="flex space-x-3" role="group" aria-label="Mobile call to action buttons">
                  <button
                    onClick={() => handleCTAButtonClick(currentBanner.cta1_text, currentBanner.cta1_url_or_action)}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-bold hover:from-[#BFA980] hover:to-[#D4AF37] transition-all transform hover:scale-105 shadow-xl text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{currentBanner.cta1_text || 'Explore'}</span>
                  </button>
                  <button
                    onClick={() => handleCTAButtonClick(currentBanner.cta2_text, currentBanner.cta2_url_or_action)}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-black/30 backdrop-blur-sm border border-[#D4AF37]/40 text-white font-bold hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#BFA980] hover:text-black hover:border-transparent transition-all transform hover:scale-105 text-sm"
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
      <div className="hidden md:block py-4 md:py-6 w-full px-6 md:px-8 lg:px-12">
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

                  <div className="flex items-center justify-between space-x-6">
                    <div className="flex items-center space-x-2 text-sm text-white/60">
                      <Star className="w-4 h-4 text-[#BFA980]" />
                      <span className="font-medium">Certified Quality</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-white/60">
                      <Shield className="w-4 h-4 text-[#BFA980]" />
                      <span className="font-medium">Comprehensive Warranty</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openQuoteForm('buy')}
                  className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300 group-hover:scale-105"
                  aria-label="Browse Cars for Buying"
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

                  <div className="flex items-center justify-between space-x-6">
                    <div className="flex items-center space-x-2 text-sm text-white/60">
                      <TrendingUp className="w-4 h-4 text-[#BFA980]" />
                      <span className="font-medium">Instant Valuation</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-white/60">
                      <Clock className="w-4 h-4 text-[#BFA980]" />
                      <span className="font-medium">Quick Settlement</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openQuoteForm('sell')}
                  className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-3 rounded-full border-2 border-[#BFA980] text-[#BFA980] font-semibold hover:bg-[#BFA980] hover:text-[#0e0e0e] transition-all duration-300 group-hover:scale-105"
                  aria-label="Get Valuation for Selling"
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
      <div className="md:hidden w-full bg-gradient-to-b from-[#0e0e0e] to-[#1a1a1a] py-8 px-5 border-t border-[#BFA980]/20">
        <div className="max-w-md mx-auto text-center space-y-6">

          {/* Heading */}
          <h3 className="text-xl font-semibold text-white leading-snug">
            🚗 Ready to Sell or Buy?
          </h3>

          {/* Toggle Buttons */}
          <div className="flex justify-center">
            <div className="bg-black/30 backdrop-blur-sm rounded-full p-1 border border-[#BFA980]/20" role="tablist" aria-label="Select buy or sell">
              <button
                onClick={() => setActiveTab('buy')}
                role="tab"
                aria-selected={activeTab === 'buy'}
                aria-controls="buy-tab-panel"
                id="buy-tab"
                className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'buy'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setActiveTab('sell')}
                role="tab"
                aria-selected={activeTab === 'sell'}
                aria-controls="sell-tab-panel"
                id="sell-tab"
                className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 ${
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
          <div className="relative h-[46px] transition-opacity duration-500 ease-in-out" role="tabpanel" tabIndex={0} id={`${activeTab}-tab-panel`} aria-labelledby={`${activeTab}-tab`}>
            <div
              key={activeTab}
              className="absolute inset-0 flex justify-center gap-3 opacity-0 animate-[fadeIn_0.4s_ease-in-out_forwards]"
            >
              <button
                onClick={() => openQuoteForm(activeTab)}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-white/80 font-semibold hover:bg-white/10 transition-all text-sm"
                aria-label={activeTab === 'buy' ? 'Browse Collection' : 'Get Valuation'}
              >
                {activeTab === 'buy' ? <Eye className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                <span>{activeTab === 'buy' ? 'Browse Collection' : 'Get Valuation'}</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-white/80 font-semibold hover:bg-white/10 transition-all text-sm" aria-label="Call Expert">
                <Phone className="w-4 h-4" />
                <span>Call Expert</span>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-5 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <button className="flex items-center gap-1 text-[#D4AF37] hover:text-[#BFA980] transition-colors">
                <DollarSign className="w-3.5 h-3.5" />
                <span className="font-semibold">Finance Option</span>
              </button>
              <span className="text-white/30">|</span>
              <button className="flex items-center gap-1 text-[#D4AF37] hover:text-[#BFA980] transition-colors">
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