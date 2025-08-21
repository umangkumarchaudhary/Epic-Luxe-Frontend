import React, { Suspense } from 'react';
import Header from '../components/Header/HeaderServer';
import Footer from '../components/Footer/FooterServer';
import ServiceCard from './ServiceCard';
import dynamic from 'next/dynamic';
import { TestimonialSkeleton, CTASkeleton } from './LoadingSkeleton';
import './services.css'; // Import the CSS file

// Lazy load components below the fold for better performance
const TestimonialSection = dynamic(() => import('./TestimonialSection'), {
  loading: () => <TestimonialSkeleton />
});

const CTASection = dynamic(() => import('./CTASection'), {
  loading: () => <CTASkeleton />
});

const ConsultationModal = dynamic(() => import('./ConsultationModal'));

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
      route: '/reassured/buy-used-cars',
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
      route: '/reassured/Services/sell-your-car',
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
      route: '/reassured/Services/sell-your-car',
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
      route: '/reassured/Services/finance',
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
      route: '/reassured/Services/insurance-and-warranty',
    },
  ];

  const testimonials = [
    {
      name: 'Rohan Mathur',
      role: 'Business Owner',
      content: 'Epic Reassured made car buying easy. Great service and fair prices.',
      rating: 5,
      image: '👨‍💼',
    },
    {
      name: 'Priya Sharma', 
      role: 'Software Engineer',
      content: 'Sold my car through them. Quick process and good price.',
      rating: 5,
      image: '👩‍💼',
    },
    {
      name: 'Amit Kumar',
      role: 'Teacher',
      content: 'Reliable service and transparent dealing. Highly recommended.',
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
                Comprehensive services designed to meet all your automotive needs with quality and reliability.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials - Lazy Loaded */}
        <Suspense fallback={<TestimonialSkeleton />}>
          <TestimonialSection testimonials={testimonials} />
        </Suspense>

        {/* CTA Section - Lazy Loaded */}
        <Suspense fallback={<CTASkeleton />}>
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;