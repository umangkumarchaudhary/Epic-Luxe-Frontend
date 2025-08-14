'use client';

import React, { useState, useCallback } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const FooterClient = () => {
  const [email, setEmail] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call for newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Here you would typically send the email to your backend
      console.log('Newsletter subscription:', {
        email: email.trim(),
        timestamp: new Date().toISOString(),
        source: 'footer_newsletter'
      });
      
      // Success state
      setShowSuccessMessage(true);
      setEmail('');
      
      // Auto-hide success message
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      // You could add error handling here
    } finally {
      setIsSubmitting(false);
    }
  }, [email, isSubmitting]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  return (
    <div className="space-y-8">
      {/* Newsletter Section */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-6 relative">
          Luxury Updates
          <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gray-900 mt-2"></div>
        </h3>
        <p className="text-gray-700 text-sm mb-6 font-light leading-relaxed">
          Subscribe to receive exclusive offers on premium pre-owned cars, 
          market insights, and luxury automotive news.
        </p>
        
        <form onSubmit={handleNewsletterSubmit} className="space-y-4" noValidate>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all duration-300 text-sm font-light"
              required
              disabled={isSubmitting}
              aria-label="Email address for newsletter subscription"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className="w-full bg-gray-900 text-white font-medium py-3 hover:bg-gray-800 transition-all duration-300 hover:shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
            aria-label={isSubmitting ? 'Subscribing to newsletter...' : 'Subscribe to newsletter'}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe to Updates'}
          </button>
        </form>
        
        {/* Success Message */}
        {showSuccessMessage && (
          <div 
            className="mt-4 p-4 bg-green-50 border border-green-200 text-green-800"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Successfully subscribed!</p>
                <p className="text-xs text-green-700 mt-1">
                  Thank you for joining our exclusive community. You&apos;ll receive our weekly newsletter with luxury car updates.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-light text-gray-900 mb-1">5000+</div>
          <div className="text-xs text-gray-600 font-light">Cars Sold</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-light text-gray-900 mb-1">4.9★</div>
          <div className="text-xs text-gray-600 font-light">Rating</div>
        </div>
      </section>

      {/* Premium Brands */}
      <section>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Featured Brands</h4>
        <div className="text-xs text-gray-600 font-light leading-relaxed">
          Mercedes-Benz • BMW • Audi • Porsche • Jaguar • Land Rover • Volvo • Lexus
        </div>
      </section>
    </div>
  );
};

export default FooterClient;