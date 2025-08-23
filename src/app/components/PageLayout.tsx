'use client';

import React from 'react';
import BottomNav from './BottomNav';

interface PageLayoutProps {
  children: React.ReactNode;
}

// This component provides the bottom navigation throughout the entire page
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      {/* Main content */}
      <div style={{ paddingBottom: '70px' }}> {/* Add padding to prevent content being hidden behind bottom nav */}
        {children}
      </div>
      
      {/* Bottom Navigation - Available throughout the entire page */}
      <BottomNav />
    </>
  );
};

export default PageLayout;