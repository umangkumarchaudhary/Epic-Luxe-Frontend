'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import supabase from '@/lib/supabaseClient';

type Banner = {
  id: string;
  image_url: string;
  title: string;
  description: string;
  price: number;
  position: number;
  cta_text: string;
  cta_url: string | null;
};

export default function Hero() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [nextIndex, setNextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchHero = async () => {
      const { data, error } = await supabase
        .from('hero_banners')
        .select('*')
        .order('position', { ascending: true });
      if (error) {
        console.error('❌ Supabase fetch error:', error.message);
      } else {
        setBanners(data || []);
        setIsLoading(false);
      }
    };
    fetchHero();
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        const next = (currentIndex + 1) % banners.length;
        setNextIndex(next);
        setTimeout(() => {
          setCurrentIndex(next);
          setIsTransitioning(false);
        }, 800);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, banners.length]);

  useEffect(() => {
    const handleParallax = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setParallax({ x, y });
    };
    window.addEventListener('mousemove', handleParallax);
    return () => window.removeEventListener('mousemove', handleParallax);
  }, []);

  const handleDotClick = (index: number) => {
    if (index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true);
      setNextIndex(index);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 800);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
        </div>
      </div>
    );
  }

  if (!banners.length) return <div className="text-center py-20 text-gray-600">No hero banners found</div>;

  const currentBanner = banners[currentIndex];
  const nextBanner = banners[nextIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black" id="hero-section">
      {/* Overlay Header on Hero Image - Responsive Horizontal Row */}
      <div className="absolute top-0 left-0 w-full z-30 px-2 pt-3 pb-2">
        <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Name */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-40"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-cyan-600 p-1.5 sm:p-2 rounded-xl shadow-xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 13l1-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2l1 3M5 16v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="7.5" cy="16.5" r="1.5" fill="white" />
                  <circle cx="16.5" cy="16.5" r="1.5" fill="white" />
                </svg>
              </div>
            </div>
            <div className="truncate">
              <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent tracking-tight truncate">Epic Luxe</h1>
              <p className="text-[10px] sm:text-xs text-gray-300 font-light tracking-widest truncate">LUXURY REDEFINED</p>
            </div>
          </div>
          {/* Search Bar */}
          <div className="flex-1 flex justify-center min-w-0">
            <input
              type="text"
              placeholder="Search models, cars..."
              className="w-full max-w-[140px] sm:max-w-[320px] px-3 py-1.5 sm:px-6 sm:py-3 rounded-full bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 font-medium border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 text-xs sm:text-base"
              style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.12)' }}
            />
          </div>
          {/* Call Now Button */}
          <div className="flex-shrink-0 flex items-center justify-end">
            <button className="flex items-center space-x-1 sm:space-x-2 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full font-bold shadow-lg text-xs sm:text-base border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 text-white" style={{ backgroundClip: 'padding-box' }}>
              {/* Modern phone icon */}
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13.81.28 1.6.46 2.36a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.76.18 1.55.33 2.36.46A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-blue-500/20"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite',
          }}
        ></div>
      </div>

      {/* Image Slider Container */}
      <div className="absolute inset-0 z-10">
        <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
          <Image
            src={currentBanner.image_url}
            alt="Luxury Car"
            fill
            className="w-full h-full object-cover animate-hero-zoom"
            style={{
              transform: `scale(1.04) translateX(${parallax.x * 16}px) translateY(${parallax.y * 8}px)`,
            }}
            priority
            sizes="100vw"
          />
        </div>

        {isTransitioning && (
          <div className="absolute inset-0 opacity-0 scale-95 animate-fade-in-scale">
            <Image
              src={nextBanner.image_url}
              alt="Luxury Car"
              fill
              className="w-full h-full object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* ---- Apple glass bottom card, centered, 80% width, more transparent ---- */}
      {/* ---- Optimized Luxury Hero Content - Bottom Left, 3-4cm Height ---- */}
      <div className="absolute bottom-8 left-8 z-30 pointer-events-none max-w-[420px]">
        <div
          className="pointer-events-auto flex flex-col text-left px-0 py-0 animate-fade-in-up"
          style={{
            fontFamily: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif`,
            maxHeight: '120px', // ≈ 3-4cm
            minHeight: '80px'
          }}
        >
          {/* Compact Title - Single line preferred */}
          <h1
            className="font-bold text-white mb-1 leading-tight"
            style={{
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', // Slightly smaller for compactness
              textShadow: '0 2px 25px rgba(255,255,255,0.4), 0 0 50px rgba(255,255,255,0.15)',
              WebkitTextStroke: '0.5px rgba(255,255,255,0.2)',
              letterSpacing: '-0.025em',
              lineHeight: '1.1',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {currentBanner.title}
          </h1>

          {/* Compact Description - Single line, optional */}
          {currentBanner.description && (
            <p
              className="text-white/85 mb-2 leading-snug"
              style={{
                fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif',
                fontSize: 'clamp(0.875rem, 2.2vw, 1rem)',
                fontWeight: 400,
                textShadow: '0 1px 15px rgba(255,255,255,0.25)',
                WebkitTextStroke: '0.2px rgba(255,255,255,0.1)',
                letterSpacing: '0.005em',
                lineHeight: '1.3',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {currentBanner.description}
            </p>
          )}

          {/* Inline Price and CTA */}
          <div className="flex items-center gap-4 mt-1">
            <span
              className="font-bold text-white px-3 py-1.5 rounded-lg border border-white/25 backdrop-blur-sm"
              style={{
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif',
                fontSize: 'clamp(1.1rem, 2.8vw, 1.4rem)',
                fontWeight: 600,
                textShadow: '0 2px 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.15)',
                WebkitTextStroke: '0.4px rgba(255,255,255,0.25)',
                letterSpacing: '-0.01em',
                background: 'rgba(255,255,255,0.05)',
                whiteSpace: 'nowrap'
              }}
            >
              ₹ {currentBanner.price?.toLocaleString()}
            </span>

            <a
              href={currentBanner.cta_url || '/book-test-drive'}
              className="group inline-flex items-center font-semibold px-5 py-1.5 rounded-full text-white border border-white/40 transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:scale-105 active:scale-95"
              style={{
                fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif',
                fontSize: 'clamp(0.8rem, 2.2vw, 0.9rem)',
                fontWeight: 600,
                textShadow: '0 1px 12px rgba(255,255,255,0.3)',
                WebkitTextStroke: '0.2px rgba(255,255,255,0.1)',
                letterSpacing: '0.01em',
                backdropFilter: 'blur(3px)',
                background: 'rgba(255,255,255,0.05)',
                whiteSpace: 'nowrap'
              }}
            >
              {currentBanner.cta_text || 'Book Test Drive'}
              <svg className="ml-2 w-4 h-4 stroke-[2px] text-white group-hover:translate-x-0.5 transform transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Slider Navigation Dots */}
      {banners.length > 1 && (
        <div className="absolute left-8 z-30 flex space-x-3" style={{ bottom: '1rem' }}>
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={
                'w-3 h-3 rounded-full transition-all duration-300 ' +
                (index === currentIndex ? 'bg-amber-500 scale-125' : 'bg-white/50 hover:bg-white/80')
              }
              aria-label={`Go to slide ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      )}

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-[15]">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .font-sf {
          font-family: -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        .font-sfmono {
          font-family: 'SF Mono', 'Roboto Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
        }
        .font-sfprodisplay {
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in-scale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 1s ease-out forwards;
        }
        @keyframes hero-zoom {
          0% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.08) translateY(-1.5%); }
          100% { transform: scale(1) translateY(0); }
        }
        .animate-hero-zoom {
          animation: hero-zoom 18s ease-in-out infinite;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.23, 1.01, 0.32, 1) both;
        }
      `}</style>
    </section>
  );
}
