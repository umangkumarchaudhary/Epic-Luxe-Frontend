'use client';
import React from 'react';
import BaseStickyNav from './BaseStickyNav';

const AboutStickyNav: React.FC = () => {
  const ctaButtons = [
    {
      id: 'view-inventory',
      label: 'View Our Inventory',
      route: '/inventory'
    },
    {
      id: 'contact-team',
      label: 'Contact Our Team',
      route: '/contact'
    },
    {
      id: 'call-expert',
      label: 'Call Expert',
      route: 'tel:+911234567890',
      isPhone: true
    },
    {
      id: 'schedule-visit',
      label: 'Schedule Visit',
      route: '/contact#schedule'
    },
    {
      id: 'our-process',
      label: 'Our Process',
      route: '/about/process'
    }
  ];

  return (
    <BaseStickyNav 
      ctaButtons={ctaButtons}
      trackingPrefix="about-page-sticky"
    />
  );
};

export default AboutStickyNav;
