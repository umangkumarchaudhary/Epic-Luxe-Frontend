'use client';

import React, { useState, useEffect } from 'react';
import { IndianRupee, Phone, Calculator } from 'lucide-react';

const GOLD = '#D4AF37';
const LIGHT_GOLD = '#BFA980';

// HERO marketing lines for animated highlight in hero section
const marketingTexts = [
  "Flexible finance for luxury cars – instant approval, premium service.",
  "Get pre-approved in 30 min, rates from 7.99%. No hidden charges.",
  "Drive today, pay tomorrow. Luxury car loan made seamless.",
  "Loan approval from ₹5 lakh to ₹5 crore. Ultra-luxury eligible.",
];

// Util: Format number like ₹12,34,567
function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// MAIN PAGE COMPONENT (all code, fully self-contained)
export default function FinancePage() {
  // Hero EMI animation logic
  const [emiValue, setEmiValue] = useState(75000);
  const emiSamples = [75000, 82000, 68000, 79000, 73000];
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % emiSamples.length;
      setEmiValue(emiSamples[index]);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Marketing text animation
  const [marketingIndex, setMarketingIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketingIndex(i => (i + 1) % marketingTexts.length);
    }, 5400);
    return () => clearInterval(interval);
  }, []);

  // Eligibility animation (simple mock, can be made more dynamic)
  const [eligibleAmount, setEligibleAmount] = useState(4200000);
  useEffect(() => {
    // Animate every few seconds
    const samples = [4200000, 5600000, 3750000, 8200000];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % samples.length;
      setEligibleAmount(samples[i]);
    }, 3100);
    return () => clearInterval(interval);
  }, []);






  // Scroll anchor support
  const scrollToForm = () => {
    document.getElementById('apply-now-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- RENDER ---
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      {/* HERO SECTION */}
      <section
        className="relative w-full min-h-[220px] md:min-h-[240px] lg:min-h-[260px] bg-black rounded-3xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden mb-16 max-w-7xl mx-auto px-5 py-5 md:px-10 md:py-7"
        style={{
          backgroundImage:
            `linear-gradient(to right, rgba(212,175,55,0.13) 1px, transparent 1px),` +
            `linear-gradient(to bottom, rgba(212,175,55,0.13) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      >
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
          {/* Left: Animated EMI and marketing */}
          <div className="flex flex-col justify-center text-center md:text-left max-w-lg mx-auto md:mx-0">
            <h1 className="text-3xl md:text-5xl font-playfair font-extrabold mb-2 text-[#D4AF37] animate-pulse">
              EMI from <span className="inline-block">{formatCurrency(emiValue)}</span>
              <span className="text-white/60 text-xl font-normal ml-1">/mo</span>
            </h1>
            <div className="manrope-font text-white/80 text-base md:text-lg mb-6 min-h-6 transition-all duration-700">
              {marketingTexts[marketingIndex]}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-7 py-3 rounded-full font-semibold manrope-font hover:from-[#BFA980] hover:to-[#D4AF37] shadow-lg transition hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] text-[#D4AF37] px-7 py-3 rounded-full font-semibold manrope-font hover:bg-[#D4AF37] hover:text-black transition hover:scale-105"
              >
                <Calculator className="w-5 h-5" />
                Apply Now
              </button>
            </div>
          </div>

          {/* Right: Check Eligibility Teaser */}
          <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20 px-6 py-8 rounded-3xl shadow-lg text-center max-w-md mx-auto md:mx-0 flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl font-playfair text-[#D4AF37] font-bold mb-3">
              Check Your Eligibility
            </h2>
            <p className="manrope-font text-white/80 mb-3">
              Based on your profile, you may get up to:
            </p>
            <div className="text-3xl font-playfair font-semibold text-[#BFA980] mb-4 animate-bounce">
              {formatCurrency(eligibleAmount)}
            </div>
            <button
              type="button"
              onClick={() => window.document.getElementById('emi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-black/80 hover:bg-black text-[#D4AF37] border border-[#D4AF37] px-7 py-3 rounded-full font-semibold manrope-font hover:shadow-lg hover:shadow-[#D4AF37]/30 transition"
            >
              Start Eligibility Check
            </button>
          </div>
        </div>
      </section>
      
    </main>
  );
}
