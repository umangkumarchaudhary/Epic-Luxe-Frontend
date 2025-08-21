"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface EpicLuxeHeroProps {
  onShareClick: () => void;
  onWatchStoriesClick?: () => void;
}

export default function EpicLuxeHero({ onShareClick, onWatchStoriesClick }: EpicLuxeHeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/herocar3.jpg"
          alt="Epic Luxe Showroom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-manrope whitespace-nowrap"
          >
            <span className="text-white">Our Clients,</span>{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">Our Pride</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl lg:text-2xl text-white/80 mb-12 leading-relaxed font-manrope"
          >
            See how we transform the car buying &amp; selling experience for India&apos;s elite
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 mb-8"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37]">4.9★</div>
              <div className="text-white/70 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37]">500+</div>
              <div className="text-white/70 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37]">100%</div>
              <div className="text-white/70 text-sm">Satisfaction</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button 
              onClick={onShareClick}
              className="group bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105"
            >
              Share Your Experience
              <ArrowRight className="inline ml-2 group-hover:translate-x-2 transition-transform" size={20} />
            </button>
            
            <button 
              onClick={onWatchStoriesClick}
              className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full text-lg font-semibold border border-white/20 hover:border-[#D4AF37]/50 hover:bg-white/20 transition-all duration-300"
            >
              <Play className="inline mr-2" size={20} />
              Watch Stories
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#D4AF37] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 