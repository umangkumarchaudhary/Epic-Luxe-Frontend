import React from 'react';
import ServicesCarousel from './ServicesCarousel';

// Server Component - No 'use client' needed
const Services = () => {
  // Static data - perfect for Server Component
  const services = [
    {
      id: 'buy-premium',
      iconName: 'Car',
      title: 'Buy Premium Cars',
      summary: 'Curated collection of certified luxury vehicles',
      features: ['360° Inspection', 'Verified History'],
      route: '/inventory',
      bgImage: '/assets/buyNowServices.png'
    },
    {
      id: 'sell-car',
      iconName: 'DollarSign',
      title: 'Sell Your Car',
      summary: 'Get maximum value with expert evaluation',
      features: ['Best Market Price', 'Instant Quote'],
      route: '/services/SellNowYourCar',
      bgImage: '/assets/sellNow.png'
    },
    {
      id: 'free-valuation',
      iconName: 'Calculator',
      title: 'Free Valuation',
      summary: 'AI-powered instant valuation with market insights',
      features: ['Instant Results', 'Market Analysis'],
      route: '/services/SellNowYourCar',
      bgImage: '/assets/valuation.png'
    },
    {
      id: 'finance-options',
      iconName: 'CreditCard',
      title: 'Finance Options',
      summary: 'Flexible financing with competitive rates',
      features: ['Low Interest', 'Quick Approval'],
      route: '/services/finance',
      bgImage: '/assets/Finance.png'
    },
    {
      id: 'insurance',
      iconName: 'Shield',
      title: 'Insurance',
      summary: 'Comprehensive coverage for your investment',
      features: ['Premium Coverage', 'Best Rates'],
      route: '/services/insurance',
      bgImage: '/assets/Insurance.png'
    },
    {
      id: 'trade-in',
      iconName: 'RefreshCw',
      title: 'Trade-In Program',
      summary: 'Seamlessly upgrade to your dream car',
      features: ['Easy Upgrade', 'Fair Value'],
      route: '/services/trade-in',
      bgImage: '/assets/tradein.png'
    }
  ];

  return (
    <section className="relative py-12 px-4 bg-white overflow-hidden">
      {/* Minimalist Section Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-light text-black tracking-tight mb-2">
            Services
          </h2>
          <div className="w-16 h-0.5 bg-black mx-auto"></div>
        </div>

        {/* Pass data to Client Component for interactivity */}
        <ServicesCarousel services={services} />
      </div>
    </section>
  );
};

export default Services;