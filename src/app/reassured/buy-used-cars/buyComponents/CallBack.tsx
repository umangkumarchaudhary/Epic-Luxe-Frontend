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
      className="w-full bg-gray-50 py-1 px-4 relative overflow-hidden"
      aria-labelledby="request-heading"
    >
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-px bg-black"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-black"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Header Section */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <div className="w-24 h-px bg-black/20 mx-auto mb-6"></div>
            <h2 
              id="request-heading"
              className="text-4xl md:text-6xl font-light tracking-tight text-black mb-6"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Can&apos;t Find Your <span className="font-medium">Dream Car</span>?
            </h2>
            <div className="w-24 h-px bg-black/20 mx-auto mb-8"></div>
          </div>

          {/* Premium Stats */}
          
        </div>

        {/* Client Component for Interactive Form */}
        <SubmitRequestClient />

        {/* Enhanced SEO Content */}
        <div className="mt-20 text-center">
          <div className="w-16 h-px bg-black/20 mx-auto mb-8"></div>
          <h3 className="text-xl font-light text-black mb-6 tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Premium Vehicle Sourcing Network
          </h3>
          <p className="text-sm text-black/50 max-w-4xl mx-auto font-light leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
            We specialize in sourcing premium pre-owned vehicles including Mercedes-Benz S-Class, E-Class, GLE, 
            BMW 7 Series, X5, X7, Audi A8, Q7, Q8, Porsche Cayenne, Panamera, Jaguar XF, Land Rover Range Rover, 
            Lexus LS, and other luxury automobiles. Our extensive network ensures access to certified pre-owned 
            vehicles with complete service history, verified authenticity, and comprehensive warranties.
          </p>
          
          {/* Premium Brand Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12 max-w-3xl mx-auto">
            {['Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Jaguar'].map((brand) => (
              <div key={brand} className="text-center py-3 border border-black/10 bg-white/50">
                <p className="text-xs font-light tracking-widest text-black/70">{brand}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubmitRequestSection;