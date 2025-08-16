'use client';

// SubmitRequestClient.tsx - Client Component (Interactive)
import React, { useState, useEffect } from 'react';
import { Phone, Check, ChevronRight } from 'lucide-react';

const SubmitRequestClient: React.FC = () => {
  const [carModel, setCarModel] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isCarModelFocused, setIsCarModelFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Phone number formatting
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
    }
  };

  const isPhoneValid = phoneNumber.length === 10;
  const isCarModelValid = carModel.trim().length >= 3;
  const canSubmit = isPhoneValid && isCarModelValid && !isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (canSubmit) {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setCarModel('');
        setPhoneNumber('');
      }, 5000);
    }
  };

  return (
    <div className={`max-w-3xl mx-auto transition-all duration-700 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="relative">
          {/* Mercedes-Benz Premium Form Container */}
          <div className="bg-black text-white p-8 md:p-12 relative overflow-hidden">
            
            {/* Premium Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-px bg-white"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-white"></div>
              <div className="absolute top-0 left-0 w-px h-full bg-white"></div>
              <div className="absolute top-0 right-0 w-px h-full bg-white"></div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-10 relative z-10">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-3 tracking-wide">
                Request Your Luxury Vehicle
              </h3>
              <div className="w-16 h-px bg-white/40 mx-auto mb-4"></div>
              <p className="text-sm text-white/70 font-light tracking-wide">
                Experience personalized automotive consultation
              </p>
            </div>
            
            {/* Car Model Input */}
            <div className="mb-8 relative z-10">
              <label 
                htmlFor="car-model"
                className={`block text-xs font-light mb-4 tracking-widest transition-colors duration-300 ${
                  isCarModelFocused ? 'text-white' : 'text-white/60'
                }`}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                DESIRED VEHICLE MODEL
              </label>
              <div className="relative">
                <input
                  id="car-model"
                  type="text"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  onFocus={() => setIsCarModelFocused(true)}
                  onBlur={() => setIsCarModelFocused(false)}
                  placeholder="e.g., Mercedes-Benz S-Class, BMW X5, Audi Q8"
                  className={`w-full px-0 py-4 bg-transparent border-b text-white placeholder-white/30 text-lg font-light focus:outline-none transition-all duration-300 ${
                    isCarModelFocused ? 'border-white' : 'border-white/30'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                  autoComplete="off"
                />
                {carModel && isCarModelValid && (
                  <Check className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/80" />
                )}
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="mb-12 relative z-10">
              <label 
                htmlFor="phone"
                className={`block text-xs font-light mb-4 tracking-widest transition-colors duration-300 ${
                  isPhoneFocused ? 'text-white' : 'text-white/60'
                }`}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                CONTACT NUMBER
              </label>
              <div className="relative">
                <Phone className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  isPhoneFocused ? 'text-white' : 'text-white/50'
                }`} />
                <input
                  id="phone"
                  type="tel"
                  value={formatPhoneNumber(phoneNumber)}
                  onChange={handlePhoneChange}
                  onFocus={() => setIsPhoneFocused(true)}
                  onBlur={() => setIsPhoneFocused(false)}
                  placeholder="123-456-7890"
                  className={`w-full pl-8 pr-0 py-4 bg-transparent border-b text-white placeholder-white/30 text-lg font-light focus:outline-none transition-all duration-300 ${
                    isPhoneFocused ? 'border-white' : 'border-white/30'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                  autoComplete="tel"
                />
                {phoneNumber && isPhoneValid && (
                  <Check className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/80" />
                )}
              </div>
            </div>

            {/* Submit Button - Premium Mercedes-Benz Style */}
            <div className="relative z-10">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`group relative w-full py-5 px-8 font-light text-sm tracking-widest transition-all duration-500 overflow-hidden border ${
                  canSubmit
                    ? 'bg-white text-black border-white hover:bg-white/90'
                    : 'bg-transparent text-white/30 border-white/20 cursor-not-allowed'
                }`}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {/* Button Background Effect */}
                <div className={`absolute inset-0 bg-white transform transition-transform duration-500 ${
                  canSubmit ? 'scale-x-100' : 'scale-x-0'
                }`}></div>
                
                <span className="relative z-10">
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-3"></span>
                      PROCESSING REQUEST...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      REQUEST CONSULTATION
                      {canSubmit && (
                        <ChevronRight className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </span>
                  )}
                </span>
              </button>
            </div>

            {/* Privacy Notice */}
            <div className="mt-8 text-center relative z-10">
              <div className="w-12 h-px bg-white/20 mx-auto mb-4"></div>
              <p className="text-xs text-white/50 font-light tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Your information is secure and protected. We respect your privacy.
              </p>
            </div>
          </div>
        </form>
      ) : (
        /* Success State - Premium Mercedes-Benz Design */
        <div className="bg-black text-white p-12 text-center relative overflow-hidden">
          {/* Success Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-px bg-white"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-white"></div>
            <div className="absolute top-0 left-0 w-px h-full bg-white"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-white"></div>
          </div>

          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-8 bg-white rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-black" />
            </div>
            
            <h3 
              className="text-3xl font-light text-white mb-4 tracking-wide"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Request Received
            </h3>
            
            <div className="w-16 h-px bg-white/40 mx-auto mb-6"></div>
            
            <p 
              className="text-lg text-white/80 font-light mb-8 max-w-md mx-auto"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Our luxury automotive consultant will contact you within 24 hours with personalized recommendations.
            </p>
            
            <div className="pt-8 border-t border-white/20">
              <p className="text-xs text-white/50 font-light tracking-widest" style={{ fontFamily: 'Manrope, sans-serif' }}>
                REFERENCE NUMBER
              </p>
              <p className="text-sm text-white/80 font-light mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                #{Date.now().toString().slice(-6)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitRequestClient;