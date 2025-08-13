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
    <div className={`max-w-2xl mx-auto transition-all duration-700 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="relative">
          {/* Clean Form Container */}
          <div className="bg-white border border-black/10 rounded-none p-8 md:p-12">
            
            {/* Car Model Input */}
            <div className="mb-8">
              <label 
                htmlFor="car-model"
                className={`block text-xs font-medium mb-3 tracking-wider transition-colors duration-300 ${
                  isCarModelFocused ? 'text-black' : 'text-black/60'
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
                  placeholder="e.g., Mercedes-Benz S-Class, BMW X5"
                  className={`w-full px-0 py-3 bg-transparent border-b text-black placeholder-black/30 text-base focus:outline-none transition-all duration-300 ${
                    isCarModelFocused ? 'border-black' : 'border-black/20'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                  autoComplete="off"
                />
                {carModel && isCarModelValid && (
                  <Check className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-black/60" />
                )}
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="mb-12">
              <label 
                htmlFor="phone"
                className={`block text-xs font-medium mb-3 tracking-wider transition-colors duration-300 ${
                  isPhoneFocused ? 'text-black' : 'text-black/60'
                }`}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                CONTACT NUMBER
              </label>
              <div className="relative">
                <Phone className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                  isPhoneFocused ? 'text-black' : 'text-black/40'
                }`} />
                <input
                  id="phone"
                  type="tel"
                  value={formatPhoneNumber(phoneNumber)}
                  onChange={handlePhoneChange}
                  onFocus={() => setIsPhoneFocused(true)}
                  onBlur={() => setIsPhoneFocused(false)}
                  placeholder="123-456-7890"
                  className={`w-full pl-7 pr-0 py-3 bg-transparent border-b text-black placeholder-black/30 text-base focus:outline-none transition-all duration-300 ${
                    isPhoneFocused ? 'border-black' : 'border-black/20'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                  autoComplete="tel"
                />
                {phoneNumber && isPhoneValid && (
                  <Check className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-black/60" />
                )}
              </div>
            </div>

            {/* Submit Button - Mercedes-Benz Style */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={`group relative w-full py-4 px-8 font-light text-sm tracking-wider transition-all duration-500 overflow-hidden ${
                canSubmit
                  ? 'bg-black text-white hover:bg-black/90'
                  : 'bg-black/10 text-black/30 cursor-not-allowed'
              }`}
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></span>
                  PROCESSING...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  REQUEST CONSULTATION
                  {canSubmit && (
                    <ChevronRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </span>
              )}
            </button>

            {/* Privacy Notice */}
            <p className="mt-6 text-xs text-black/40 text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
              By submitting this form, you agree to our privacy policy and terms of service.
            </p>
          </div>
        </form>
      ) : (
        /* Success State - Clean Minimal Design */
        <div className="bg-white border border-black/10 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-black rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 
            className="text-2xl font-light text-black mb-3"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Request Received
          </h3>
          <p 
            className="text-base text-black/60 font-light"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Our luxury automotive consultant will contact you within 24 hours.
          </p>
          <div className="mt-8 pt-8 border-t border-black/10">
            <p className="text-xs text-black/40" style={{ fontFamily: 'Manrope, sans-serif' }}>
              REFERENCE NUMBER: #{Date.now().toString().slice(-6)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitRequestClient;