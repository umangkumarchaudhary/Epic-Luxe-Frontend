'use client';
import React from 'react';
import BaseStickyNav from './BaseStickyNav';

const ContactStickyNav: React.FC = () => {
  const ctaButtons = [
    {
      id: 'call-now',
      label: 'Call Now',
      route: 'tel:+911234567890',
      isPhone: true
    },
    {
      id: 'whatsapp-us',
      label: 'WhatsApp Us',
      route: 'https://wa.me/911234567890'
    },
    {
      id: 'view-inventory',
      label: 'View Inventory',
      route: '/inventory'
    },
    {
      id: 'get-directions',
      label: 'Get Directions',
      route: '/contact#directions'
    }
  ];

  return (
    <BaseStickyNav 
      ctaButtons={ctaButtons}
      trackingPrefix="contact-sticky"
    />
  );
};

export default ContactStickyNav;
