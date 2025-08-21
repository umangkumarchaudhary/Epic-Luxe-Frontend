import React from 'react';

export const ServiceCardSkeleton = () => (
  <div className="bg-white border border-gray-200 overflow-hidden animate-pulse">
    <div className="h-56 bg-gray-200"></div>
    <div className="p-8 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        <div className="h-3 bg-gray-200 rounded w-3/5"></div>
        <div className="h-3 bg-gray-200 rounded w-4/5"></div>
      </div>
      <div className="h-12 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export const TestimonialSkeleton = () => (
  <div className="h-96 bg-gray-50 animate-pulse rounded-lg mx-4">
    <div className="p-8 space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg">
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const CTASkeleton = () => (
  <div className="h-64 bg-gray-50 animate-pulse rounded-lg mx-4">
    <div className="p-8 text-center space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
      <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto"></div>
    </div>
  </div>
);