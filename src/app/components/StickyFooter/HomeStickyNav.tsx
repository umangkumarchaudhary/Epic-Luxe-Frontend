'use client';
import React from 'react';
import BaseStickyNav from './BaseStickyNav';

const HomeStickyNav: React.FC = () => {
  const ctaButtons = [
    {
      id: 'buy-premium',
      label: 'Buy Premium Cars',
      route: '/inventory/buyNow',
      isPrimary: true
    },
    {
      id: 'sell-car',
      label: 'Sell Your Car',
      route: '/services/sell-now',
      isPrimary: false
    },
    {
      id: 'call-now',
      label: 'Call Now',
      route: 'tel:+911234567890',
      isPrimary: false,
      isPhone: true
    },
    {
      id: 'free-valuation',
      label: 'Get Free Valuation',
      route: '/services/sell-now#valuation',
      isPrimary: false
    }
  ];

  return (
    <BaseStickyNav 
      ctaButtons={ctaButtons}
      trackingPrefix="home-sticky-nav"
    />
  );
};

export default HomeStickyNav;
