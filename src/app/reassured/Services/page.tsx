import React from 'react';
import Header from '../components/Header/HeaderServer';
import Footer from '@/app/components/Footer';
import ServiceCard from './ServiceCard';
import TestimonialSection from './TestimonialSection';
import CTASection from './CTASection';
import ConsultationModal from './ConsultationModal';
import './services.css'; // Import the CSS file

// This is now a Server Component by default - great for SEO
const ServicesPage = () => {
  const services = [
    {
      id: 'buy-premium',
      iconName: 'Car', // Changed from icon component to string
      title: 'Buy Premium Cars',
      summary: 'Discover handpicked luxury vehicles with guaranteed quality and heritage',
      description: 'Access our exclusive collection of premium pre-owned vehicles, each meticulously inspected and certified.',
      features: ['360° Quality Inspection', 'Exclusive Inventory', 'Heritage Verification'],
      cta: 'Browse Collection',
      backgroundImage: '/assets/buyNowServices.png',
      altText: 'Happy customer receiving luxury car keys from dealer',
    },
    {
      id: 'sell-luxury',
      iconName: 'DollarSign', // Changed from icon component to string
      title: 'Sell Your Luxury Car',
      summary: 'Get maximum value for your luxury vehicle with our premium selling service',
      description: 'Experience the most sophisticated way to sell your luxury car with expert market analysis and white-glove service.',
      features: ['Expert Market Analysis', 'White-glove Service', 'Global Reach'],
      cta: 'Start Selling',
      backgroundImage: '/assets/sellNow.png',
      altText: 'Professional handshake between car seller and buyer',
    },
    {
      id: 'free-valuation',
      iconName: 'Calculator', // Changed from icon component to string
      title: 'Free Valuation',
      summary: 'Get instant, accurate valuation from certified luxury car experts',
      description: 'Receive a comprehensive valuation report within minutes using AI-powered analysis and expert verification.',
      features: ['AI-Powered Analysis', 'Real-time Market Data', 'Expert Review'],
      cta: 'Get Valuation',
      backgroundImage: '/assets/valuation.png',
      altText: 'Professional using tablet for car valuation assessment',
    },
    {
      id: 'finance-options',
      iconName: 'CreditCard', // Changed from icon component to string
      title: 'Finance Options',
      summary: 'Flexible premium financing solutions tailored for luxury car buyers',
      description: 'Access exclusive financing options with competitive rates, flexible terms, and personalized solutions.',
      features: ['Competitive Rates', 'Flexible Terms', 'Personalized Plans'],
      cta: 'Explore Finance',
      backgroundImage: '/assets/finance.png',
      altText: 'Financial consultant discussing loan options with client',
    },
    {
      id: 'insurance',
      iconName: 'Shield', // Changed from icon component to string
      title: 'Insurance Assistance',
      summary: 'Comprehensive insurance solutions for your valuable luxury investment',
      description: 'Protect your investment with specialized luxury car insurance partnerships and agreed value policies.',
      features: ['Specialized Coverage', 'Agreed Value Policies', 'Claim Support'],
      cta: 'Get Protected',
      backgroundImage: '/assets/insurance.png',
      altText: 'Friendly insurance agent helping couple with car insurance',
    },
    {
      id: 'trade-in',
      iconName: 'RefreshCw', // Changed from icon component to string
      title: 'Trade-In Program',
      summary: 'Seamlessly upgrade your luxury vehicle with our exclusive trade program',
      description: 'Experience ultimate convenience in luxury car trading with instant trade value and seamless processes.',
      features: ['Instant Trade Value', 'Seamless Process', 'Best Price Guarantee'],
      cta: 'Trade Now',
      backgroundImage: '/assets/TradeIn.png',
      altText: 'Customer exchanging old car keys for new luxury vehicle keys',
    },
  ];

  const testimonials = [
    {
      name: 'Alexander Chen',
      role: 'CEO, Tech Ventures',
      content: 'Epic Luxe transformed my car buying experience. Their attention to detail and premium service is unmatched.',
      rating: 5,
      image: '👨‍💼',
    },
    {
      name: 'Sophia Rodriguez',
      role: 'Investment Banker',
      content: 'Sold my Porsche through Epic Luxe. The process was seamless and I got an exceptional price.',
      rating: 5,
      image: '👩‍💼',
    },
    {
      name: 'Marcus Thompson',
      role: 'Entrepreneur',
      content: 'Their trade-in program is revolutionary. Upgraded from my BMW to a Bentley effortlessly.',
      rating: 5,
      image: '🧔‍♂️',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white font-manrope">
        <ConsultationModal />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-light text-black mb-6 tracking-tight">
                Our Services
              </h1>
              <div className="w-24 h-0.5 bg-black mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                Six comprehensive services designed to exceed the expectations of discerning luxury car enthusiasts.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialSection testimonials={testimonials} />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;