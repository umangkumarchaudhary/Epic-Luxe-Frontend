// LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-40">
      <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin drop-shadow-lg" />
    </div>
  );
};

export default LoadingSpinner;
