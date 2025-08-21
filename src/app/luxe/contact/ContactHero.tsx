'use client';

import React, { useEffect, useState } from 'react';
import { ChevronRight, Star, Car, Shield, Award } from 'lucide-react';

const ContactHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [particlePositions, setParticlePositions] = useState<Array<{
    left: number;
    top: number;
    animationDelay: number;
    animationDuration: number;
  }>>([]);

  // Trust badges data
  const trustBadges = [
    { icon: Star, text: "5-Star Google Reviews", delay: 1000 },
    { icon: Car, text: "Over 500 Luxury Cars Sold", delay: 1100 },
    { icon: Award, text: "Trusted by Industry Leaders", delay: 1200 },
    { icon: Shield, text: "Secure Transactions", delay: 1300 }
  ];

  useEffect(() => {
    // Generate particle positions on client-side only
    const positions = Array.from({ length: 8 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 3 + Math.random() * 4
    }));
    setParticlePositions(positions);

    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          src="/assets/videos/showroom.mp4"
          poster="/assets/images/contact-hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/70" />
      
      {/* Additional luxury overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* Hero Content - Centered with absolute positioning */}
      <div className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-1000 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="text-center max-w-5xl mx-auto px-6">
          {/* Main Headline */}
          <h1 className={`font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight mb-6 transition-all duration-1000 delay-300 whitespace-nowrap ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <span className="bg-gradient-to-r from-[#FFD700] via-[#F4C430] to-[#C0A060] bg-clip-text text-transparent">
              Your Journey Begins Here
            </span>
          </h1>

                     {/* Subtitle with elegant dash */}
           <h2 className={`font-serif text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-white/90 mb-8 transition-all duration-1000 delay-500 ${
             isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
           }`}>
             — In Unmatched Style.
           </h2>

          {/* Description */}
          <p className={`text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-12 transition-all duration-1000 delay-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Step into the world of luxury cars. Let us craft your perfect drive.
          </p>

                     {/* Luxury CTA Button */}
           <div className={`transition-all duration-1000 delay-900 ${
             isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
           }`}>
             <button 
               onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
               className="group relative overflow-hidden bg-gradient-to-r from-[#FFD700] via-[#F4C430] to-[#C0A060] hover:from-[#F4C430] hover:via-[#FFD700] hover:to-[#F4C430] text-black px-10 md:px-12 py-4 md:py-5 rounded-full font-semibold text-lg md:text-xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-[#FFD700]/40"
               aria-label="Book Your Experience"
             >
               {/* Luxury glow effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 via-[#F4C430]/20 to-[#C0A060]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               {/* Shine effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
               
               {/* Button Content */}
               <span className="relative flex items-center justify-center gap-3">
                 Book Your Experience
                 <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
               </span>
             </button>
           </div>

           {/* Trust Badges */}
           <div className={`mt-12 transition-all duration-1000 delay-1000 ${
             isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
           }`}>
             <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
               {trustBadges.map((badge, index) => {
                 const IconComponent = badge.icon;
                 return (
                   <div
                     key={index}
                     className={`flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 transition-all duration-700 ${
                       isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                     }`}
                     style={{ transitionDelay: `${badge.delay}ms` }}
                   >
                     <IconComponent className="w-4 h-4 text-[#D4AF37]" />
                     <span className="text-sm md:text-base text-white/90 font-medium whitespace-nowrap">
                       {badge.text}
                     </span>
                   </div>
                 );
               })}
             </div>
           </div>
         </div>
       </div>

      {/* Floating Luxury Elements - Reduced for elegance */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Particles */}
        {particlePositions.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FFD700] rounded-full opacity-30 animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}

        {/* Subtle cinematic shimmer */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent transform -skew-x-12 animate-pulse" />
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.6; 
            transform: scale(1.1); 
          }
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        
        /* Luxury button glow effect */
        button::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #FFD700, #F4C430, #C0A060, #FFD700);
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        button:hover::before {
          opacity: 1;
        }
        
        /* Auto-shine effect every 8 seconds for luxury feel */
        @keyframes autoShine {
          0%, 85%, 100% { left: -100%; }
          5%, 80% { left: 100%; }
        }
        
        button::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: autoShine 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactHero; 