"use client";

import React, { useState } from 'react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  ctaText: string;
}

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, ctaText }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Generate dynamic content based on CTA text
  const getModalContent = (ctaText: string) => {
    const lowerCTA = ctaText.toLowerCase();
    
    if (lowerCTA.includes('quote') || lowerCTA.includes('price')) {
      return {
        title: 'Get Your Free Quote',
        description: 'Fill in your details and our Epic Reassured team will provide you with a personalized quote for your dream pre-owned vehicle.',
        submitText: 'Get My Quote',
        successMessage: 'Thank you! Our team will contact you shortly with your personalized quote.'
      };
    } else if (lowerCTA.includes('test') || lowerCTA.includes('drive')) {
      return {
        title: 'Book Your Test Drive',
        description: 'Schedule your test drive with Epic Reassured. Our executive will call you to confirm the appointment and assist with your vehicle selection.',
        submitText: 'Book Test Drive',
        successMessage: 'Great! Our executive will call you soon to schedule your test drive.'
      };
    } else if (lowerCTA.includes('call') || lowerCTA.includes('contact')) {
      return {
        title: 'Request a Callback',
        description: 'Share your details and our Epic Reassured team will call you back to discuss your requirements and help you find the perfect vehicle.',
        submitText: 'Request Callback',
        successMessage: 'Thank you! We will call you back within 24 hours.'
      };
    } else {
      return {
        title: 'Get In Touch',
        description: 'Connect with Epic Reassured today. Fill in your details and our team will reach out to assist you with premium pre-owned vehicles.',
        submitText: 'Submit',
        successMessage: 'Thank you! Our team will contact you soon.'
      };
    }
  };

  const modalContent = getModalContent(ctaText);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Clean phone number (remove spaces, hyphens, etc.)
      const cleanPhone = form.phone.replace(/\D/g, '');
      
      // Determine lead type based on CTA text
      const lowerCTA = ctaText.toLowerCase();
      let leadType = 'hero_banner_inquiry';
      
      if (lowerCTA.includes('quote') || lowerCTA.includes('price')) {
        leadType = 'quote_request';
      } else if (lowerCTA.includes('test') || lowerCTA.includes('drive')) {
        leadType = 'test_drive';
      } else if (lowerCTA.includes('call') || lowerCTA.includes('contact')) {
        leadType = 'callback_request';
      }

      const leadData = {
        lead_type: leadType,
        name: form.name.trim(),
        phone: cleanPhone,
        email: '',
        preferred_model: '',
        location: '',
        message: `Hero banner CTA: ${ctaText}`
      };

      const response = await fetch('https://raam-group-all-websites.onrender.com/admin/reassured-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit lead');
      }

      setLoading(false);
      setSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setForm({ name: '', phone: '' });
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting lead:', error);
      setLoading(false);
      // You could add error handling here if needed
      alert('Failed to submit. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative border border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        >
          ×
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Logo/Brand */}
          <div className="text-center mb-4">
            <h3 className="text-sm font-medium text-gray-600 font-manrope">EPIC REASSURED</h3>
            <div className="w-12 h-0.5 bg-black mx-auto mt-1"></div>
          </div>
          
          <h2 className="text-2xl font-bold text-black mb-2 font-manrope text-center">
            {modalContent.title}
          </h2>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-6 font-manrope text-center">
            {modalContent.description}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-manrope">Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-20 transition-all font-manrope"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-manrope">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                pattern="[0-9]{10}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-20 transition-all font-manrope"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 font-manrope"
          >
            {loading ? 'Submitting...' : modalContent.submitText}
          </button>

          {success && (
            <div className="text-green-600 text-center font-semibold font-manrope text-sm">
              {modalContent.successMessage}
            </div>
          )}
          
          {/* Trust indicators */}
          <div className="text-xs text-gray-500 text-center mt-4 font-manrope">
            <div className="flex items-center justify-center space-x-4">
              <span>✓ Trusted by 1000+ customers</span>
              <span>✓ Quick response guaranteed</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadModal;