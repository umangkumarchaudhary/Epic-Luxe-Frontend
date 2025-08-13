'use client';
import React from 'react';
import BaseStickyNav from './BaseStickyNav';

const InventoryStickyNav: React.FC = () => {
  const ctaButtons = [
    {
      id: 'schedule-test-drive',
      label: 'Schedule Test Drive',
      route: '/inventory#test-drive'
    },
    {
      id: 'get-financing',
      label: 'Get Financing',
      route: '/services/financing'
    },
    {
      id: 'call-sales',
      label: 'Call Sales Team',
      route: 'tel:+911234567890',
      isPhone: true
    },
    {
      id: 'compare-cars',
      label: 'Compare Cars',
      route: '/inventory#compare'
    }
  ];

  return (
    <BaseStickyNav 
      ctaButtons={ctaButtons}
      trackingPrefix="inventory-sticky"
    />
  );
};

export default InventoryStickyNav;
