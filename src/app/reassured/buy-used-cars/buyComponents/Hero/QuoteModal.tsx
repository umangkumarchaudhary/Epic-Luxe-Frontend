'use client';

import React, { FormEvent, useEffect, useCallback } from 'react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  title: string;
  subtitle: string;
  formName: string;
  setFormName: (name: string) => void;
  formPhone: string;
  setFormPhone: (phone: string) => void;
  formSubmitting: boolean;
  formSubmittedMessage: string | null;
}

const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  subtitle,
  formName,
  setFormName,
  formPhone,
  setFormPhone,
  formSubmitting,
  formSubmittedMessage,
}) => {
  // Handle escape key
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      aria-describedby="quote-modal-desc"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative transform transition-all duration-300 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-black text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2
                id="quote-modal-title"
                className="text-2xl font-bold mb-1"
              >
                Get Best Quote
              </h2>
              <p className="text-gray-300 text-sm">
                Fast & Free Vehicle Pricing
              </p>
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close quote form"
              className="text-gray-400 hover:text-white transition-colors duration-200 p-1 hover:bg-white/10 rounded-full"
              type="button"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-1">
              {title}
            </h3>
            <p 
              id="quote-modal-desc" 
              className="text-gray-600 text-sm leading-relaxed"
            >
              {subtitle}
            </p>
          </div>

          {formSubmittedMessage ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-700 font-medium mb-6 leading-relaxed">
                {formSubmittedMessage}
              </p>
              <button
                onClick={onClose}
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="quote-name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="quote-name"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  required
                  placeholder="Enter your full name"
                  autoComplete="name"
                  disabled={formSubmitting}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="quote-phone"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Phone Number *
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  required
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                  pattern="^[\+]?[1-9][\d]{0,15}$"
                  title="Please enter a valid phone number"
                  disabled={formSubmitting}
                />
              </div>

              {/* Privacy Notice */}
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                <p>
                  By submitting this form, you consent to receive calls and text messages from EPIC Luxury Motors 
                  regarding your quote request. Message and data rates may apply.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
                  disabled={formSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 bg-black text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300 ${
                    formSubmitting 
                      ? 'opacity-75 cursor-not-allowed' 
                      : 'hover:bg-gray-800 active:transform active:scale-95'
                  }`}
                  disabled={formSubmitting}
                >
                  {formSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                        />
                        <path
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          className="opacity-75"
                        />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Get My Quote'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .animate-slideUp {
            margin: 1rem;
            max-height: calc(100vh - 2rem);
            overflow-y: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default QuoteModal;