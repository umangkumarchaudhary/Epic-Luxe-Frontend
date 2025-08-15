import React, { useState } from 'react';


const API_BASE_URL = 'http://localhost:5000/api';

export default function FinanceComparisonSection() {
  const [showForm, setShowForm] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredCar: '',
    panCard: ''
  });

  // Handle form field changes
// Handle form field changes
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  
  // Clear error when user starts typing
  if (submitError) setSubmitError('');
};

// Submit form handler with API integration
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Basic validation
  if (!formData.name.trim() || !formData.phone.trim()) {
    setSubmitError('Please fill in all required fields');
    return;
  }

  if (formData.phone.replace(/\D/g, '').length < 10) {
    setSubmitError('Please enter a valid 10-digit phone number');
    return;
  }

  setIsSubmitting(true);
  setSubmitError('');

  try {
    // Prepare data for API
    const leadData = {
      lead_type: 'finance_inquiry',
      lead_title: 'Finance Concierge Request',
      name: formData.name.trim(),
      phone: formData.phone.replace(/\D/g, ''), // Remove non-digits
      email: '', // Optional field
      preferred_model: formData.preferredCar.trim() || null,
      vehicle_id: null,
      appointment_date: null,
      appointment_time: null,
      message: 'Finance concierge request from comparison section',
      budget: null,
      insurance_type: null,
      loan_details: null,
      status: 'new',
      source_page: 'finance_comparison_section',
      brand: null,
      fuel: null,
      variant: null,
      city: null,
      year: null,
      owner: null,
      kms: null,
      whatsapp_updates: true,
      monthly_income: null,
      employment_type: null,
      interested_car: formData.preferredCar.trim() || null,
      loan_amount: null,
      emi_tenure: null,
      interest: null,
      your_emi: null,
      total_payable: null,
      pan_card: formData.panCard.trim() || null,
      car_interest: 'luxury_finance',
    };

    console.log('Submitting lead data:', leadData);

    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const result = await response.json();
    console.log('API Response:', result);

    if (!response.ok) {
      throw new Error(result.error || `Server error: ${response.status}`);
    }

    if (result.success) {
      setFormSubmitted(true);
      console.log('Lead submitted successfully:', result.lead);
    } else {
      throw new Error(result.error || 'Failed to submit lead');
    }

  } catch (error: unknown) {
    console.error('Error submitting form:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
    setSubmitError(
      errorMessage.includes('fetch')
        ? 'Unable to connect to server. Please try again later.'
        : errorMessage
    );
  } finally {
    setIsSubmitting(false);
  }
};


  // Close all modals and reset form
  const closeModal = () => {
    setShowForm(false);
    setShowCallModal(false);
    setFormSubmitted(false);
    setIsSubmitting(false);
    setSubmitError('');
    setFormData({
      name: '',
      phone: '',
      preferredCar: '',
      panCard: ''
    });
  };

  // Detect if device is phone based on window width
  const isPhone = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 640; // tailwind sm breakpoint
  };

  // Handle "Call Now" click
  const handleCallNowClick = () => {
    if (isPhone()) {
      window.location.href = 'tel:+919876543210'; // Replace with your number
    } else {
      setShowCallModal(true);
    }
  };

  return (
    <section className="py-14 sm:py-16 md:py-18 lg:py-20" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl playfair-font font-bold text-white/90 mb-3 tracking-wide">
            The Epic Luxe Advantage: <span className="text-[#D4AF37]">In-House vs Standard Bank Finance</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg manrope-font font-light max-w-2xl mx-auto leading-relaxed">
            Discover why our curated luxury finance delivers a faster, easier and more rewarding path to your dream car—compared to traditional bank channels.
          </p>
        </div>

        {/* Responsive Horizontal Comparison Table */}
        <div className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#0e0e0e]/80 backdrop-blur-lg rounded-2xl border border-[#BFA980]/10 overflow-x-auto">
          <div className="min-w-[620px] md:min-w-0">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA980]/10 border-b border-[#BFA980]/20 text-center">
              <div className="p-3 md:p-6 flex flex-col justify-center">
                <span className="text-lg md:text-xl playfair-font font-medium text-white mb-1 md:mb-1.5">Feature</span>
                <span className="text-white/50 text-xs manrope-font font-light">What truly matters</span>
              </div>
              <div className="p-3 md:p-6 bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/20 border-l border-[#D4AF37]/25 flex flex-col justify-center items-center">
                <span className="flex items-center gap-2 mb-1">
                  <span className="w-7 h-7 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center shadow">
                    <svg fill="none" viewBox="0 0 20 20" className="w-4 h-4 text-black"><path d="M10 2l2.39 5.107L18 7.17l-4 3.904.943 5.5L10 14.5l-4.943 2.072L6 11.074l-4-3.903 5.61-.063L10 2z" fill="currentColor" /></svg>
                  </span>
                  <span className="text-lg playfair-font font-bold text-[#D4AF37]">Epic Luxe In-House</span>
                </span>
                <span className="text-white/80 text-xs manrope-font">Concierge Finance</span>
              </div>
              <div className="p-3 md:p-6 border-l border-white/5 flex flex-col justify-center items-center">
                <span className="flex items-center gap-2 mb-1">
                  <span className="w-7 h-7 bg-gradient-to-r from-gray-800 to-gray-600 border border-[#BFA980]/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#BFA980]" fill="none" stroke="#BFA980" strokeWidth="2" viewBox="0 0 20 20">
                      <rect x="2.5" y="6" width="15" height="9" rx="2.5" />
                      <rect x="6" y="10" width="2.5" height="5" rx="1" />
                      <rect x="11.5" y="10" width="2.5" height="5" rx="1" />
                    </svg>
                  </span>
                  <span className="text-lg playfair-font font-bold text-white/80">Bank Channel</span>
                </span>
                <span className="text-white/40 text-xs manrope-font">Standard Finance</span>
              </div>
            </div>

            {/* Features Rows */}
            <div className="divide-y divide-white/10">
              <div className="grid grid-cols-3 text-center">
                <div className="p-2 md:p-4 bg-[#1a1a1a]/20 flex flex-col justify-center">
                  <span className="manrope-font font-medium text-white/80 text-sm md:text-base">Interest Rates*</span>
                  <span className="text-white/50 text-xs mt-0.5">For eligible buyers</span>
                </div>
                <div className="p-2 md:p-4 border-l border-[#D4AF37]/25 bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/10 flex flex-col justify-center">
                  <span className="flex items-center gap-1 justify-center">
                    <span className="text-xl font-bold text-[#D4AF37]">7.99%</span>
                    <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full text-[10px] font-semibold">Exclusive</span>
                  </span>
                  <span className="text-white/60 text-xs">Custom-negotiated</span>
                </div>
                <div className="p-2 md:p-4 border-l border-white/10 flex flex-col justify-center">
                  <span className="text-base text-white/60 font-bold">8.5%–10%</span>
                  <span className="text-white/40 text-xs">Bank slabs</span>
                </div>
              </div>

              <div className="grid grid-cols-3 text-center">
                <div className="p-2 md:p-4 bg-[#1a1a1a]/15 flex flex-col justify-center">
                  <span className="manrope-font font-medium text-white/80 text-sm md:text-base">Approval Speed</span>
                  <span className="text-white/50 text-xs">Docs to keys</span>
                </div>
                <div className="p-2 md:p-4 border-l border-[#D4AF37]/25 bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/10 flex flex-col justify-center">
                  <span className="flex items-center justify-center gap-1">
                    <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" /><path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="2" /></svg>
                    <span className="text-sm text-[#D4AF37] font-semibold">30 min*</span>
                  </span>
                  <span className="text-white/60 text-xs">Same-day delivery</span>
                </div>
                <div className="p-2 md:p-4 border-l border-white/10 flex flex-col justify-center">
                  <span className="text-sm text-white/70">1–3 days</span>
                  <span className="text-white/40 text-xs">Branch queue</span>
                </div>
              </div>

              <div className="grid grid-cols-3 text-center">
                <div className="p-2 md:p-4 bg-[#1a1a1a]/20 flex flex-col justify-center">
                  <span className="manrope-font font-medium text-white/80 text-sm md:text-base">Max Loan Value</span>
                  <span className="text-white/50 text-xs">High ticket</span>
                </div>
                <div className="p-2 md:p-4 border-l border-[#D4AF37]/25 bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/10 flex flex-col justify-center">
                  <span className="flex items-center gap-1 justify-center">
                    <span className="text-base font-bold text-[#D4AF37]">₹5 Cr</span>
                    <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-full text-[10px] font-semibold">Ultra-luxury</span>
                  </span>
                  <span className="text-white/60 text-xs">All eligible models</span>
                </div>
                <div className="p-2 md:p-4 border-l border-white/10 flex flex-col justify-center">
                  <span className="text-sm text-white/60 font-bold">up to ₹2 Cr</span>
                  <span className="text-white/40 text-xs">Bank varies</span>
                </div>
              </div>

              <div className="grid grid-cols-3 text-center">
                <div className="p-2 md:p-4 bg-[#1a1a1a]/20 flex flex-col justify-center">
                  <span className="manrope-font font-medium text-white/80 text-sm md:text-base">Documentation</span>
                  <span className="text-white/50 text-xs">Effort-level</span>
                </div>
                <div className="p-2 md:p-4 border-l border-[#D4AF37]/25 bg-gradient-to-br from-[#D4AF37]/5 to-[#BFA980]/5 flex flex-col justify-center">
                  <span className="flex items-center gap-1 justify-center mb-1">
                    <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7.5" /><path d="M7.5 10l2 2.5 3-4.5" fill="none" stroke="#fff" strokeWidth="1.2" /></svg>
                    <span className="text-white font-medium text-xs">Doorstep + eSign</span>
                  </span>
                  <span className="text-white/60 text-xs">We handle it</span>
                </div>
                <div className="p-2 md:p-4 border-l border-white/10 flex flex-col justify-center">
                  <span className="flex items-center gap-1 justify-center mb-1">
                    <svg className="w-4 h-4 text-red-400/70" fill="none" viewBox="0 0 20 20"><path d="M6 6l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="2" /></svg>
                    <span className="text-white/60 font-medium text-xs">Branch Visit</span>
                  </span>
                  <span className="text-white/40 text-xs">Manual, multi-step</span>
                </div>
              </div>

              <div className="grid grid-cols-3 text-center">
                <div className="p-2 md:p-4 bg-[#1a1a1a]/20 flex flex-col justify-center">
                  <span className="manrope-font font-medium text-white/80 text-sm md:text-base">Support</span>
                  <span className="text-white/50 text-xs">Post-loan</span>
                </div>
                <div className="p-2 md:p-4 border-l border-[#D4AF37]/25 bg-gradient-to-br from-[#D4AF37]/10 to-[#BFA980]/10 flex flex-col justify-center">
                  <span className="flex items-center gap-1 justify-center mb-1">
                    <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" /><path d="M7 13v-3a3 3 0 016 0v3" stroke="currentColor" strokeWidth="2" /></svg>
                    <span className="text-white font-medium text-xs">Personal RM</span>
                  </span>
                  <span className="text-white/60 text-xs">Concierge access</span>
                </div>
                <div className="p-2 md:p-4 border-l border-white/10 flex flex-col justify-center">
                  <span className="flex items-center gap-1 justify-center mb-1">
                    <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 20 20"><rect x="4" y="5" width="12" height="10" rx="2" /></svg>
                    <span className="text-white/60 font-medium text-xs">Call Center</span>
                  </span>
                  <span className="text-white/40 text-xs">General queue</span>
                </div>
              </div>

              <div className="grid grid-cols-3 text-center">
                <div className="p-2 md:p-4 bg-[#1a1a1a]/20 flex flex-col justify-center">
                  <span className="manrope-font font-medium text-white/80 text-sm md:text-base">Flexibility</span>
                  <span className="text-white/50 text-xs">Pay/close/tenure</span>
                </div>
                <div className="p-2 md:p-4 border-l border-[#D4AF37]/25 bg-gradient-to-br from-[#D4AF37]/5 to-[#BFA980]/5 flex flex-col justify-center">
                  <span className="flex items-center gap-1 justify-center">
                    <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7.5" /><path d="M7.5 10l2 2.5 3-4.5" fill="none" stroke="#fff" strokeWidth="1.2" /></svg>
                    <span className="text-white/80 text-xs">Flexible EMI, closure etc.</span>
                  </span>
                </div>
                <div className="p-2 md:p-4 border-l border-white/10 flex flex-col justify-center">
                  <span className="flex items-center gap-1 justify-center">
                    <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 20 20"><path d="M3 10h14" stroke="currentColor" strokeWidth="2" /></svg>
                    <span className="text-white/50 text-xs">Fixed, limited option</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="px-3 pb-3 pt-2 text-[12px] text-white/50 text-center">
            * Rates, eligibility & approval times are as per market best effort as of 2024. Actual terms may vary by profile and car model.
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA980]/10 border-t border-[#BFA980]/20 text-center">
          <h3 className="text-xl md:text-2xl playfair-font font-bold text-white/90 mb-1 md:mb-3">
            Elevate your car finance experience.
          </h3>
          <p className="text-white/70 manrope-font font-light mb-3 md:mb-5 max-w-xl mx-auto text-sm md:text-base">
            Unlock speed, flexibility and best-in-market rates with Epic Luxe In-House Finance. Where luxury meets legacy.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] px-7 py-3 rounded-full manrope-font font-medium text-base md:text-lg hover:from-[#BFA980] hover:to-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/20 transform hover:scale-105 transition-all duration-300 inline-flex items-center"
          >
            <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="#0e0e0e" strokeWidth="2" viewBox="0 0 24 24"><rect x="3.5" y="6" width="17" height="11" rx="2.5" /><path d="M8 10h8" /></svg>
            Request My Finance Concierge
          </button>
        </div>
      </div>

      {/* Modal for Form */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-center bg-black/90 backdrop-blur-sm p-4"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-gradient-to-br from-black to-[#18181b] rounded-2xl border border-[#D4AF37] shadow-2xl w-full max-w-md mx-auto flex flex-col text-white" style={{ maxHeight: '90vh' }}>
            {/* Close button */}
            <button
              aria-label="Close"
              className="absolute top-5 right-5 text-[#BFA980] hover:text-[#D4AF37] transition z-10"
              onClick={closeModal}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content area scrolls */}
            <div className="px-8 pt-8 pb-4 overflow-y-auto flex-1 space-y-4">
              <h3 className="text-2xl manrope-font font-bold">Finance Concierge Request</h3>
              <p className="text-xs text-[#BFA980]">Our team will reach you quickly with personalized finance options.</p>

              {formSubmitted ? (
                <div className="text-center mt-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="mb-4 text-[#D4AF37] font-semibold text-lg">Thank you for your submission!</p>
                  <p className="text-gray-300 mb-6">Our finance experts will contact you soon to assist with your luxury car finance needs.</p>
                  <button
                    onClick={closeModal}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-6 py-2 rounded-full font-medium hover:from-[#BFA980] hover:to-[#D4AF37] transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  {/* Error Message */}
                  {submitError && (
                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                      {submitError}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-light mb-1 text-[#BFA980]">
                      Name <span className="text-red-400" title="Required">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg bg-black border border-[#BFA980] text-white px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                      autoComplete="off"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-light mb-1 text-[#BFA980]">
                      Phone Number <span className="text-red-400" title="Required">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      pattern="[0-9]{10,}"
                      inputMode="tel"
                      required
                      placeholder="10-digit Mobile Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-lg bg-black border border-[#BFA980] text-white px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                      autoComplete="off"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Preferred Car */}
                  <div>
                    <label htmlFor="preferredCar" className="block text-sm font-light mb-1 text-[#BFA980]">
                      Preferred Car (optional)
                    </label>
                    <input
                      id="preferredCar"
                      name="preferredCar"
                      type="text"
                      placeholder="e.g. Mercedes-Benz S-Class"
                      value={formData.preferredCar}
                      onChange={handleInputChange}
                      className="w-full rounded-lg bg-black border border-[#BFA980] text-white px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                      autoComplete="off"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* PAN Card */}
                  <div>
                    <label htmlFor="panCard" className="block text-sm font-light mb-1 text-[#BFA980]">
                      PAN Card Number (optional)
                    </label>
                    <input
                      id="panCard"
                      name="panCard"
                      type="text"
                      maxLength={10}
                      placeholder="e.g. ABCDE1234F"
                      value={formData.panCard}
                      onChange={handleInputChange}
                      className="w-full rounded-lg bg-black border border-[#BFA980] text-white px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                      autoComplete="off"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <p className="mt-1 text-xs text-[#BFA980] font-light max-w-xs mx-auto text-center">
                    By submitting, you agree to our{' '}
                    <a
                      href="/TermsOfUse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white"
                    >
                      Terms of Use
                    </a>{' '}
                    and{' '}
                    <a
                      href="/PrivacyPolicy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white"
                    >
                      Privacy Policy
                    </a>.
                  </p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-lg font-semibold transition shadow-md ${
                      isSubmitting 
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black hover:from-[#BFA980] hover:to-[#D4AF37] hover:shadow-[#D4AF37]/40'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Call Now Section Sticky at bottom */}
            {!formSubmitted && (
              <div className="w-full bg-black border-t border-[#BFA980] px-8 py-4 flex justify-center items-center text-sm text-[#BFA980] font-light sticky bottom-0 z-10">
                <button
                  onClick={handleCallNowClick}
                  disabled={isSubmitting}
                  className={`inline-block px-6 py-2 border border-[#D4AF37] rounded-full font-semibold transition ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1a1a1a]'
                  }`}
                  type="button"
                >
                  📞 Leave Waiting, Connect Now and Talk
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for Call Now confirmation on desktop */}
      {showCallModal && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-gradient-to-br from-black to-[#18181b] rounded-2xl border border-[#D4AF37] shadow-2xl w-full max-w-sm p-8 relative text-white">
            <button
              aria-label="Close"
              className="absolute top-5 right-5 text-[#BFA980] hover:text-[#D4AF37] transition"
              onClick={() => setShowCallModal(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl manrope-font font-bold mb-4">Ready to talk now?</h3>
            <p className="mb-6 text-[#BFA980] text-sm">
              Please call the number below to connect immediately with our finance concierge team.
            </p>
            <a
              href="tel:+919876543210"
              className="block w-full text-center bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black py-3 rounded-lg font-semibold hover:from-[#BFA980] hover:to-[#D4AF37] transition"
              rel="noreferrer"
            >
              📞 Call Epic Luxe Finance Now
            </a>
          </div>
        </div>
      )}
    </section>
  );
}