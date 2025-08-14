'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Brand {
  name: string;
  logo: string;
  count: number;
}

interface BrandSelectorProps {
  brands: Brand[];
  defaultBrand: string | null;
}

const BrandSelector = ({ brands, defaultBrand }: BrandSelectorProps) => {
  const [selectedBrand, setSelectedBrand] = useState(defaultBrand);

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    window.dispatchEvent(
      new CustomEvent('brandSelected', {
        detail: { brandName },
      })
    );
  };

  return (
    <div className="flex gap-8 justify-center my-8 flex-wrap">
      {brands.map((brand) => (
        <div key={brand.name} className="flex flex-col items-center">
          <div
            className={`w-20 h-20 rounded-full cursor-pointer border-2 transition-all duration-300 flex items-center justify-center bg-white hover:shadow-lg ${
              selectedBrand === brand.name
                ? 'border-black shadow-lg scale-110'
                : 'border-gray-300 hover:border-gray-500'
            }`}
            onClick={() => handleBrandClick(brand.name)}
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={56}
              height={56}
              className="object-contain"
              sizes="56px"
            />
          </div>
          <span
            className={`mt-3 text-sm font-medium transition-colors ${
              selectedBrand === brand.name ? 'text-black' : 'text-gray-600'
            }`}
          >
            {brand.name}
          </span>
          <span className="text-xs text-gray-500 font-light">
            {brand.count} {brand.count === 1 ? 'vehicle' : 'vehicles'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BrandSelector;