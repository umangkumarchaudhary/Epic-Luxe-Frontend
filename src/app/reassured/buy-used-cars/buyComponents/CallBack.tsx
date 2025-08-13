// SubmitRequestSection.tsx - Server Component (SEO-Friendly)
import React from 'react';
import SubmitRequestClient from './CallbackClient';

export const metadata = {
  title: 'Request Your Dream Luxury Car - Premium Pre-Owned Vehicles',
  description: 'Can\'t find the luxury car you\'re looking for? Our expert consultants will help you source the perfect pre-owned Mercedes-Benz, BMW, Audi, or any premium vehicle.',
  keywords: 'luxury cars, pre-owned vehicles, car request, Mercedes-Benz, BMW, Audi, premium cars',
};

const SubmitRequestSection: React.FC = () => {
  return (
    <section 
      className="w-full bg-white py-24 px-4"
      aria-labelledby="request-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* SEO-Optimized Content - Visible to Search Engines */}
        <div className="text-center mb-16">
          <h2 
            id="request-heading"
            className="text-4xl md:text-5xl font-light tracking-tight text-black mb-6"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Can't Find Your Dream Car?
          </h2>
          
          <p 
            className="text-lg md:text-xl text-black/70 max-w-3xl mx-auto font-light leading-relaxed"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Our luxury automotive experts will help you source the perfect vehicle. 
            Submit your request and receive personalized recommendations within 24 hours.
          </p>
        </div>

        {/* Trust Indicators - Static for SEO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-px h-12 bg-black/20 mx-auto mb-4"></div>
            <h3 className="text-sm font-medium text-black mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              CONFIDENTIAL SERVICE
            </h3>
            <p className="text-sm text-black/60" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Your information is protected
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-px h-12 bg-black/20 mx-auto mb-4"></div>
            <h3 className="text-sm font-medium text-black mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              EXPERT CONSULTATION
            </h3>
            <p className="text-sm text-black/60" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Dedicated luxury car specialists
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-px h-12 bg-black/20 mx-auto mb-4"></div>
            <h3 className="text-sm font-medium text-black mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              24-HOUR RESPONSE
            </h3>
            <p className="text-sm text-black/60" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Quick and professional service
            </p>
          </div>
        </div>

        {/* Client Component for Interactive Form */}
        <SubmitRequestClient />

        {/* Additional SEO Content */}
        <div className="mt-16 text-center">
          <p className="text-xs text-black/40 max-w-2xl mx-auto" style={{ fontFamily: 'Manrope, sans-serif' }}>
            We specialize in sourcing premium pre-owned vehicles including Mercedes-Benz S-Class, E-Class, GLE, 
            BMW 7 Series, X5, X7, Audi A8, Q7, Q8, Porsche Cayenne, Panamera, and other luxury automobiles. 
            Our network ensures access to certified pre-owned vehicles with complete service history.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubmitRequestSection;