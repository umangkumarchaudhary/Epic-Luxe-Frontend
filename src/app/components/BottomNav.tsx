// app/components/BottomNav.tsx
'use client';

import React from 'react';
import { Home, DollarSign, Search, User } from 'lucide-react';

export default function BottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/95 backdrop-blur-md border-t border-[#D4AF37]/20 z-50 manrope-font" role="navigation" aria-label="Bottom navigation">
      <div className="grid grid-cols-4 gap-1 py-2 px-2">
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300" aria-label="Home">
          <Home className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs text-[#D4AF37] font-semibold">Home</span>
        </button>
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#BFA980]/10 transition-all duration-300" aria-label="Buy">
          <DollarSign className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 font-semibold">Buy</span>
        </button>
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#BFA980]/10 transition-all duration-300" aria-label="Sell">
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 font-semibold">Sell</span>
        </button>
        <button className="flex flex-col items-center space-y-1 py-2 px-1 rounded-lg hover:bg-[#BFA980]/10 transition-all duration-300" aria-label="Connect">
          <User className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 font-semibold">Connect</span>
        </button>
      </div>
    </div>
  );
}
