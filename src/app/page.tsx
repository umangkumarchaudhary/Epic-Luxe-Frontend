'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function EpicAutomotiveLanding() {
  const [hoveredSide, setHoveredSide] = useState(null);
  const [hoverInventory, setHoverInventory] = useState(false);
  const [hoverServices, setHoverServices] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const luxuryCars = [
    { brand: 'Rolls-Royce', model: 'Phantom VIII', year: '2023', price: '₹8.9 Cr' },
    { brand: 'Bentley', model: 'Continental GT', year: '2022', price: '₹4.2 Cr' },
    { brand: 'Mercedes-Benz', model: 'S-Class Maybach', year: '2023', price: '₹3.8 Cr' },
    { brand: 'BMW', model: '7 Series', year: '2022', price: '₹2.5 Cr' },
    { brand: 'Audi', model: 'A8 L', year: '2023', price: '₹1.8 Cr' }
  ];

  const reassuredCars = [
    { brand: 'Toyota', model: 'Camry Hybrid', year: '2022', price: '₹28 L' },
    { brand: 'Honda', model: 'Accord', year: '2021', price: '₹24 L' },
    { brand: 'BMW', model: '3 Series', year: '2022', price: '₹42 L' },
    { brand: 'Mercedes-Benz', model: 'C-Class', year: '2023', price: '₹38 L' },
    { brand: 'Audi', model: 'A4', year: '2022', price: '₹35 L' }
  ];

  const trustBadges = [
    {
      icon: (
        <svg
          className="w-5 h-5 text-yellow-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: 'Certified Quality',
    },
    {
      icon: (
        <svg
          className="w-5 h-5 text-yellow-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      label: 'Fast Delivery',
    },
    
    {
      icon: (
        <svg
          className="w-5 h-5 text-yellow-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 21v-2a4 4 0 00-3-3.87M4 21v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      label: 'Trusted Dealers',
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 4000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const handleEnterLuxe = () => {
    window.location.href = '/luxe';
  };

  const handleEnterReassured = () => {
    window.location.href = '/reassured';
  };

  const navigateTo = (url) => {
    window.location.href = url;
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* HEADER SECTION - 10vh (Reduced from 15vh) */}
      <header className="relative z-30 h-[10vh] flex items-center justify-between px-6 md:px-12 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
            <span className="text-black font-black text-sm md:text-base">E</span>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-light text-white tracking-wider">EPIC</h1>
            <p className="text-xs text-yellow-400 tracking-widest">USED CARS</p>
          </div>
        </div>

        {/* Navigation Items with dropdowns */}
        <div className="hidden md:flex items-center space-x-6 text-white/80 relative">
          {/* Inventory */}
          <div
            onMouseEnter={() => setHoverInventory(true)}
            onMouseLeave={() => setHoverInventory(false)}
            className="relative cursor-pointer text-sm tracking-wide hover:text-yellow-400 transition-colors"
          >
            INVENTORY

            {/* Dropdown */}
            {hoverInventory && (
              <div
                className="absolute top-full left-0 mt-2 bg-black border border-yellow-400 rounded shadow-lg min-w-[180px] z-50"
                onMouseEnter={() => setHoverInventory(true)}
                onMouseLeave={() => setHoverInventory(false)}
              >
                <div
                  className="px-4 py-2 hover:bg-yellow-400 hover:text-black cursor-pointer"
                  onClick={() => navigateTo('/inventory/eluxe')}
                  role="menuitem"
                >
                  ELuxe Inventory
                </div>
                <div
                  className="px-4 py-2 hover:bg-yellow-400 hover:text-black cursor-pointer"
                  onClick={() => navigateTo('/inventory/reassured')}
                  role="menuitem"
                >
                  Reassured Inventory
                </div>
              </div>
            )}
          </div>

          {/* Services */}
          <div
            onMouseEnter={() => setHoverServices(true)}
            onMouseLeave={() => setHoverServices(false)}
            className="relative cursor-pointer text-sm tracking-wide hover:text-yellow-400 transition-colors"
          >
            SERVICES

            {/* Dropdown */}
            {hoverServices && (
              <div
                className="absolute top-full left-0 mt-2 bg-black border border-yellow-400 rounded shadow-lg min-w-[180px] z-50"
                onMouseEnter={() => setHoverServices(true)}
                onMouseLeave={() => setHoverServices(false)}
              >
                <div
                  className="px-4 py-2 hover:bg-yellow-400 hover:text-black cursor-pointer"
                  onClick={() => navigateTo('/services/eluxe')}
                  role="menuitem"
                >
                  ELuxe Services
                </div>
                <div
                  className="px-4 py-2 hover:bg-yellow-400 hover:text-black cursor-pointer"
                  onClick={() => navigateTo('/services/reassured')}
                  role="menuitem"
                >
                  Reassured Services
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-right">
          <p className="text-white text-xs md:text-sm font-light">Premium Automotive</p>
          <p className="text-yellow-400 text-xs tracking-wider">REDEFINED</p>
        </div>
      </header>

      {/* MAIN SPLIT SECTION - 55vh */}
      <main className="relative h-[55vh] flex">
        {/* Dynamic Mouse Light */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-20"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(212, 175, 55, 0.3) 0%, transparent 70%)`,
          }}
        />

        {/* EPIC LUXE - Premium Cars with background image */}
        <div
          className={`relative flex-1 overflow-hidden transition-all duration-1000 ease-out cursor-pointer ${
            hoveredSide === 'luxe'
              ? 'flex-[1.4] brightness-110'
              : hoveredSide === 'reassured'
              ? 'flex-[0.6] brightness-70'
              : ''
          }`}
          onMouseEnter={() => setHoveredSide('luxe')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/assets/images/bugatti.jpg"
              alt="Luxury Car Background"
              fill
              className="object-cover"
              priority
            />
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Rich Leather Texture Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-transparent to-gray-800/30">
              {/* Premium Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-radial from-yellow-400/8 via-transparent to-transparent animate-pulse" />
            </div>

            {/* Hover Enhancement */}
            <div
              className={`absolute inset-0 bg-gradient-radial from-yellow-400/15 via-transparent to-transparent transition-opacity duration-1000 ${
                hoveredSide === 'luxe' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Luxe Content */}
          <div className="relative z-20 flex flex-col justify-center items-center h-full p-6 text-white">
            {/* Luxury Badge */}
            <div className="mb-6 relative">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700 flex items-center justify-center shadow-2xl relative overflow-hidden">
                <span className="text-black font-black text-xs md:text-sm tracking-wider relative z-10">LUXE</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-luxeSweep" />
              </div>
              <div className="absolute -inset-1 border border-yellow-400/30 rounded-full animate-ping" />
            </div>

            {/* Luxury Typography */}
            <div className="text-center mb-4">
              <h2 className="text-2xl md:text-4xl font-thin mb-1 tracking-[0.2em] text-white drop-shadow-2xl">EPIC</h2>
              <h3 className="text-lg md:text-2xl font-light text-yellow-400 tracking-[0.3em] mb-2 drop-shadow-lg">LUXE</h3>
              <p className="text-sm md:text-base text-yellow-300 font-light tracking-wide opacity-90 drop-shadow-lg">
                Ultra-Premium Automobiles
              </p>
            </div>

            {/* Luxury CTA */}
            <button
              onClick={handleEnterLuxe}
              className="group relative px-6 py-2 md:px-8 md:py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:text-black transition-all duration-700 overflow-hidden text-xs md:text-sm tracking-[0.2em] font-medium"
            >
              <span className="relative z-10">EXPLORE LUXE</span>
              <div className="absolute inset-0 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </button>
          </div>
        </div>

        {/* Central Divider */}
        <div className="relative w-1 bg-gradient-to-b from-yellow-400/40 via-yellow-400 to-yellow-400/40">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
        </div>

        {/* EPIC REASSURED - Practical Cars with background image */}
        <div
          className={`relative flex-1 overflow-hidden transition-all duration-1000 ease-out cursor-pointer ${
            hoveredSide === 'reassured'
              ? 'flex-[1.4] brightness-110'
              : hoveredSide === 'luxe'
              ? 'flex-[0.6] brightness-70'
              : ''
          }`}
          onMouseEnter={() => setHoveredSide('reassured')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/assets/images/jaguar.jpg"
              alt="Reassured Car Background"
              fill
              className="object-cover"
              priority
            />
            {/* Light Overlay for contrast - Reduced opacity for better image visibility */}
            <div className="absolute inset-0 bg-white/10" />
            
            <div className="absolute inset-0 bg-gradient-to-bl from-white/5 via-transparent to-white/5">
              {/* Trust Lines */}
              <div className="absolute inset-0">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"
                    style={{
                      top: `${30 + i * 20}%`,
                      left: '-30%',
                      width: '160%',
                      animation: `trustLine ${6 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 2}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Hover Enhancement */}
            <div
              className={`absolute inset-0 bg-gradient-radial from-yellow-500/12 via-transparent to-transparent transition-opacity duration-1000 ${
                hoveredSide === 'reassured' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Reassured Content */}
          <div className="relative z-20 flex flex-col justify-center items-center h-full p-6 text-black">
            {/* Reassured Badge */}
            <div className="mb-6 relative">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 flex items-center justify-center shadow-2xl relative overflow-hidden">
                <span className="text-white font-black text-xs md:text-sm tracking-wider relative z-10">ASSURED</span>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/30 to-transparent animate-assuredSweep" />
              </div>
              <div className="absolute -inset-1 border border-yellow-500/40 rounded-full animate-pulse" />
            </div>

            {/* Reassured Typography */}
            <div className="text-center mb-4">
              <h2 className="text-2xl md:text-4xl font-medium mb-1 tracking-[0.1em] text-black drop-shadow-xl">EPIC</h2>
              <h3 className="text-lg md:text-2xl font-normal text-yellow-600 tracking-[0.2em] mb-2 drop-shadow-lg">REASSURED</h3>
              <p className="text-sm md:text-base text-yellow-700 font-medium tracking-wide drop-shadow-md">
                Certified Quality Vehicles
              </p>
            </div>

            {/* Reassured CTA */}
            <button
              onClick={handleEnterReassured}
              className="group relative px-6 py-2 md:px-8 md:py-3 bg-transparent border-2 border-yellow-500 text-yellow-600 hover:text-white transition-all duration-700 overflow-hidden text-xs md:text-sm tracking-[0.15em] font-medium"
            >
              <span className="relative z-10">BROWSE ASSURED</span>
              <div className="absolute inset-0 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </button>
          </div>
        </div>
      </main>

      {/* BOTTOM SLIDER - 25vh */}
      <section className="relative h-[25vh] bg-gradient-to-t from-black via-gray-900 to-transparent overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          {/* Current Inventory Showcase */}
          <div className="w-full flex items-center justify-center space-x-8 px-8">
            {/* Luxe Car Display */}
            <div className="flex-1 text-center">
              <div className="mb-2">
                <p className="text-yellow-400 text-xs tracking-widest mb-1">FEATURED LUXE</p>
                <h4 className="text-white text-lg md:text-xl font-light">
                  {luxuryCars[currentSlide].brand} {luxuryCars[currentSlide].model}
                </h4>
                <p className="text-gray-400 text-sm">
                  {luxuryCars[currentSlide].year} • {luxuryCars[currentSlide].price}
                </p>
              </div>
            </div>

            {/* Central Indicator */}
            <div className="flex-shrink-0">
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      i === currentSlide ? 'bg-yellow-400 w-8' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Reassured Car Display */}
            <div className="flex-1 text-center">
              <div className="mb-2">
                <p className="text-yellow-500 text-xs tracking-widest mb-1">FEATURED ASSURED</p>
                <h4 className="text-white text-lg md:text-xl font-light">
                  {reassuredCars[currentSlide].brand} {reassuredCars[currentSlide].model}
                </h4>
                <p className="text-gray-400 text-sm">
                  {reassuredCars[currentSlide].year} • {reassuredCars[currentSlide].price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section - Fixed and Made More Visible */}
      <section className="relative z-20 bg-black border-t-2 border-yellow-500/30 py-4 px-4 md:px-8">
        <div className="flex justify-center items-center space-x-6 md:space-x-12">
          {trustBadges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center space-y-1 text-yellow-400 min-w-0">
              <div className="flex-shrink-0">{badge.icon}</div>
              <span className="text-xs md:text-sm font-medium tracking-wide text-center whitespace-nowrap">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Master Animations */}
      <style jsx>{`
        @keyframes luxuryFloat {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-50px) rotate(180deg);
            opacity: 0;
          }
        }

        @keyframes reassuredFloat {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(-30px) rotate(90deg);
            opacity: 0;
          }
        }

        @keyframes luxuryStreak {
          0% {
            transform: translateX(-100%) rotate(-15deg) scaleX(0);
          }
          50% {
            transform: translateX(0%) rotate(-15deg) scaleX(1);
          }
          100% {
            transform: translateX(100%) rotate(-15deg) scaleX(0);
          }
        }

        @keyframes trustLine {
          0% {
            transform: translateX(-100%) scaleX(0.3);
            opacity: 0;
          }
          50% {
            transform: translateX(0%) scaleX(1);
            opacity: 1;
          }
          100% {
            transform: translateX(100%) scaleX(0.3);
            opacity: 0;
          }
        }

        @keyframes techGrid {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }

        @keyframes slideFlow {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        @keyframes luxeSweep {
          0% {
            transform: translateX(-100%) skew(-20deg);
          }
          100% {
            transform: translateX(200%) skew(-20deg);
          }
        }

        @keyframes assuredSweep {
          0% {
            transform: translateX(200%) skew(20deg);
          }
          100% {
            transform: translateX(-100%) skew(20deg);
          }
        }

        .animate-luxeSweep {
          animation: luxeSweep 3s ease-in-out infinite;
        }

        .animate-assuredSweep {
          animation: assuredSweep 3s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }

        /* Responsive tweaks */
        @media (max-width: 768px) {
          .flex-col {
            flex-direction: column;
          }
          /* Trust badges responsive fix */
          section div.flex.justify-center.items-center.space-x-6 {
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
            padding: 0 8px;
          }
          /* Dropdown fix for mobile */
          .hidden.md\\:flex {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}