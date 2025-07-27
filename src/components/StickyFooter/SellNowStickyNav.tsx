'use client';
import React from 'react';
import BaseStickyNav from './BaseStickyNav';

const SellNowStickyNav: React.FC = () => {
  const ctaButtons = [
    {
      id: 'get-quote',
      label: 'Get Instant Quote',
      route: '/services/sell-now#quote'
    },
    {
      id: 'call-expert',
      label: 'Call Sales Expert',
      route: 'tel:+911234567890',
      isPhone: true
    }
  ];

  return (
    <BaseStickyNav 
      ctaButtons={ctaButtons}
      trackingPrefix="sell-now-sticky"
    />
  );
};

export default SellNowStickyNav;
