'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { Car, IndianRupee, Phone } from 'lucide-react';

// Bottom Sticky Navigation (Mobile Only) - Optimized with memo
const BottomNav = memo(() => {
  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 w-full bg-black/98 backdrop-blur-md border-t border-[#D4AF37]/20" 
      role="navigation" 
      aria-label="Bottom navigation"
      style={{ 
        contentVisibility: 'auto',
        zIndex: 9999,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
      }}
    >
      <div className="grid grid-cols-3 gap-1 py-2 px-4">
        <Link 
          href="/luxe/buy-used-cars"
          className="flex flex-col items-center space-y-1 py-2 px-2 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
          aria-label="Buy Cars"
        >
          <IndianRupee className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs text-[#D4AF37] font-semibold">Buy</span>
        </Link>
        <Link 
          href="/luxe/services/SellNowYourCar"
          className="flex flex-col items-center space-y-1 py-2 px-2 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
          aria-label="Sell Your Car"
        >
          <Car className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs text-[#D4AF37] font-semibold">Sell</span>
        </Link>
        <a 
          href="tel:7288882121"
          className="flex flex-col items-center space-y-1 py-2 px-2 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
          aria-label="Call Expert"
        >
          <Phone className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs text-[#D4AF37] font-semibold">Call</span>
        </a>
      </div>
    </div>
  );
});

// Set display name for debugging
BottomNav.displayName = 'BottomNav';

export default BottomNav;