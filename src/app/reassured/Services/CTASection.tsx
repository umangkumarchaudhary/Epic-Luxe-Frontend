'use client';
import React from 'react';

const CTASection = () => {
  const handleGetStarted = () => {
    // Handle get started action
    console.log('Get started clicked');
  };

  const handleScheduleConsultation = () => {
    // Trigger consultation modal
    const event = new CustomEvent('openConsultationModal');
    window.dispatchEvent(event);
  };

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-light text-black mb-8 tracking-tight leading-tight">
          Ready to Experience
          <span className="block mt-2">Luxury Redefined?</span>
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Join the elite circle of luxury car enthusiasts who demand nothing but the finest in automotive excellence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleGetStarted}
            className="mercedes-button bg-black text-white font-medium py-4 px-10 hover:bg-gray-900 transition-all duration-300 tracking-wide"
          >
            Get Started Today
          </button>
          <button
            onClick={handleScheduleConsultation}
            className="border-2 border-black text-black font-medium py-4 px-10 hover:bg-black hover:text-white transition-all duration-300 tracking-wide"
          >
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;