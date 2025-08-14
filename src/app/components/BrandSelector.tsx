// components/BrandSelector.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Brand {
  name: string;
  logo: string;
  count: number;
  gradient: string;
}

interface BrandSelectorProps {
  brands: Brand[];
  defaultBrand: string | null;
}

const BrandSelector = ({ brands, defaultBrand }: BrandSelectorProps) => {
  const [selectedBrand, setSelectedBrand] = useState(defaultBrand);

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    // Notify other components (like VehicleGrid)
    window.dispatchEvent(
      new CustomEvent('brandSelected', {
        detail: { brandName },
      })
    );
  };

  return (
    <div className="flex gap-6 justify-center my-6 flex-wrap">
      {brands.map((brand) => (
        <div key={brand.name} className="flex flex-col items-center">
          <div
            className={`relative rounded-full cursor-pointer p-1 border-4 transition-all duration-300 ${
              selectedBrand === brand.name
                ? 'border-yellow-400 shadow-lg'
                : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-400'
            }`}
            style={{
              background:
                selectedBrand === brand.name
                  ? `linear-gradient(to right, ${brand.gradient
                      .replace('from-', '')
                      .replace('to-', '')
                      .replace(' ', ', ')})`
                  : 'transparent',
              width: 75,
              height: 75,
            }}
            onClick={() => handleBrandClick(brand.name)}
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              style={{ objectFit: 'cover', borderRadius: '9999px' }}
              sizes="75px"
              priority={selectedBrand === brand.name} // prioritize LCP for selected
            />
          </div>
          <span
            className={`mt-2 text-sm font-semibold ${
              selectedBrand === brand.name ? 'text-yellow-500' : 'text-gray-400'
            }`}
          >
            {brand.name}
          </span>
          <span className="text-xs text-gray-500">
            {brand.count} {brand.count === 1 ? 'vehicle' : 'vehicles'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BrandSelector;
