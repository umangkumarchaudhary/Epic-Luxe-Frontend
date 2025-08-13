// HeroServer.tsx - Server Component (SEO-friendly)
import { Suspense } from 'react';
import HeroClient from './HeroClient';
import BottomNav from './BottomNav';

// Type definitions for better TypeScript support
export interface Banner {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
  badge: string;
  position: number;
  cta1_text?: string;
  cta1_url_or_action?: string;
  cta2_text?: string;
  cta2_url_or_action?: string;
}

// Server-side data fetching function
async function getBanners(): Promise<Banner[]> {
  try {
    // In production, replace with your actual API endpoint
    const res = await fetch('http://localhost:5000/admin/banners', {
      cache: 'no-store', // For dynamic content, use 'force-cache' for static content
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch banners');
    }
    
    const json = await res.json();
    return json.banners.sort((a: Banner, b: Banner) => a.position - b.position);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return []; // Return empty array as fallback
  }
}

// Loading component for Suspense fallback
function HeroLoading() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black manrope-font">
      <div className="flex justify-center items-center h-[50vh] text-lg text-gray-600 pt-[10vh]" role="status" aria-live="polite">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          <span>Loading EPICness...</span>
        </div>
      </div>
    </div>
  );
}

// Main Server Component
export default async function HeroServer() {
  const banners = await getBanners();

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black manrope-font" id="hero-section">
      {/* SEO Meta Content - These will be picked up by Next.js */}
      <div className="sr-only">
        <h1>Luxury Vehicle Collection - Premium Cars for Sale and Purchase</h1>
        <p>Discover our curated collection of luxury vehicles. Buy certified premium cars or sell your vehicle for the best market value. Expert consultation available.</p>
      </div>

      {/* Main Content with Suspense for loading states */}
      <Suspense fallback={<HeroLoading />}>
        <HeroClient initialBanners={banners} />
      </Suspense>

      {/* Bottom Navigation - Hidden on desktop, visible on mobile below 50vh */}
      <div className="md:hidden">
        <BottomNav />
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-[fadeIn_0\\.3s_ease-out] {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-[fadeIn_0\\.4s_ease-in-out_forwards] {
          animation: fadeIn 0.4s ease-in-out forwards;
        }
        .animate-[slideUp_0\\.4s_ease-out] {
          animation: slideUp 0.4s ease-out forwards;
        }
        .animate-[slideUp_0\\.5s_ease-out] {
          animation: slideUp 0.5s ease-out forwards;
        }
        .animate-[scaleIn_0\\.5s_ease-out] {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .manrope-font {
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #D4AF37, #BFA980);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #BFA980, #D4AF37);
        }
        
        /* Responsive viewport adjustments */
        @media (max-width: 768px) {
          .hero-slider {
            height: 50vh !important;
          }
        }
      `}</style>
    </div>
  );
}