'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Sparkles } from 'lucide-react';

const SubmitRequestSection: React.FC = () => {
  const [carModel, setCarModel] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isCarModelFocused, setIsCarModelFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Basic phone number validation (visual only)
  const isPhoneValid = phoneNumber.length >= 10;
  const isCarModelValid = carModel.trim().length > 0;
  const canSubmit = isPhoneValid && isCarModelValid;

  const handleSubmit = () => {
    if (canSubmit) {
      setIsSubmitted(true);
      // Reset after 3 seconds for demo
      setTimeout(() => {
        setIsSubmitted(false);
        setCarModel('');
        setPhoneNumber('');
      }, 3000);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-black via-[#0e0e0e] to-black py-16 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          
          {/* Main Card Container */}
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-[#d4af37]/20 shadow-2xl shadow-[#d4af37]/10 overflow-hidden">
            
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent transform -skew-y-12 animate-pulse"></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#d4af37] rounded-full animate-ping opacity-30"
                  style={{
                    left: `${15 + (i * 10)}%`,
                    top: `${20 + (i * 8)}%`,
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: '3s'
                  }}
                ></div>
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 text-center">
              
              {/* Icon Header */}
              <div className="mb-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center shadow-xl shadow-[#d4af37]/30 animate-pulse">
                  <Sparkles className="w-8 h-8 text-black" />
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Can't Find the Car You're Looking For?
              </h2>

              {/* Subtext */}
              <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Let our luxury experts help you source the perfect model. Enter your details and we'll call you back with personalized options.
              </p>

              {/* Form */}
              {!isSubmitted ? (
                <div className="max-w-lg mx-auto space-y-6">
                  
                  {/* Car Model Input */}
                  <div className="relative">
                    <div className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                      isCarModelFocused 
                        ? 'ring-2 ring-[#d4af37] shadow-lg shadow-[#d4af37]/20' 
                        : 'ring-1 ring-gray-700'
                    }`}>
                      <input
                        type="text"
                        value={carModel}
                        onChange={(e) => setCarModel(e.target.value)}
                        onFocus={() => setIsCarModelFocused(true)}
                        onBlur={() => setIsCarModelFocused(false)}
                        placeholder="Enter desired car model (e.g., BMW X5, Mercedes S-Class)"
                        className="w-full px-6 py-4 bg-gray-900/80 backdrop-blur-sm text-white placeholder-gray-400 text-lg focus:outline-none transition-all duration-300"
                      />
                      
                      {/* Input Glow Effect */}
                      {isCarModelFocused && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/10 to-[#d4af37]/0 animate-pulse pointer-events-none"></div>
                      )}
                    </div>
                    
                    {/* Validation Indicator */}
                    {carModel && (
                      <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                        isCarModelValid ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                    )}
                  </div>

                  {/* Phone Number Input */}
                  <div className="relative">
                    <div className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                      isPhoneFocused 
                        ? 'ring-2 ring-[#d4af37] shadow-lg shadow-[#d4af37]/20' 
                        : 'ring-1 ring-gray-700'
                    }`}>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]">
                        <Phone className="w-5 h-5" />
                      </div>
                      
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        onFocus={() => setIsPhoneFocused(true)}
                        onBlur={() => setIsPhoneFocused(false)}
                        placeholder="Enter your mobile number"
                        className="w-full pl-14 pr-6 py-4 bg-gray-900/80 backdrop-blur-sm text-white placeholder-gray-400 text-lg focus:outline-none transition-all duration-300"
                        maxLength={10}
                      />
                      
                      {/* Input Glow Effect */}
                      {isPhoneFocused && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/10 to-[#d4af37]/0 animate-pulse pointer-events-none"></div>
                      )}
                    </div>
                    
                    {/* Validation Indicator */}
                    {phoneNumber && (
                      <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                        isPhoneValid ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={`group relative w-full py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 overflow-hidden ${
                      canSubmit
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black hover:shadow-2xl hover:shadow-[#d4af37]/40 hover:scale-105 transform'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {/* Button Shimmer Effect */}
                    {canSubmit && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    )}
                    
                    <span className="relative z-10">Request a Callback</span>
                  </button>
                </div>
              ) : (
                /* Success State */
                <div className="max-w-lg mx-auto">
                  <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-8 border border-green-400/30">
                    <div className="w-12 h-12 mx-auto mb-4 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                      <Phone className="w-6 h-6 text-green-900" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Request Submitted Successfully!</h3>
                    <p className="text-green-300">Our luxury experts will contact you within 24 hours with personalized options.</p>
                  </div>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse"></div>
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span>No Spam Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span>Expert Consultation</span>
                </div>
              </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#d4af37] opacity-30"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#d4af37] opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Background Ambient Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#d4af37]/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#d4af37]/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default SubmitRequestSection;