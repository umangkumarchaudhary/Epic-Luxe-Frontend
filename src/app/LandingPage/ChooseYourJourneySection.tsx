'use client';

import React from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

// CSS Variables for consistency
const cssVars = {
  '--luxe-black': '#000000',
  '--luxe-gold': '#D4AF37',
  '--ink': '#1C1C1C',
  '--ivory': '#FAFAFA',
  '--charcoal': '#0F0F10',
  '--champagne': '#EAD9B8',
  '--mid-grey': '#D3D3D3'
} as const;

// Analytics tracking function
const trackEvent = (event: string, section: string, label: string) => {
  // Safe analytics tracking for dataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      section,
      label
    });
  }
  
  // Also check for custom analytics function
  if (typeof window !== 'undefined' && window.analytics?.track) {
    window.analytics.track(event, { label });
  }
};


const ChooseYourJourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const router = useRouter();

  const handleAnalytics = (label: 'luxe' | 'reassured') => {
    trackEvent('cta_final_choose', 'choose_journey', label);
  };

  const handleNavigation = (journey: 'luxe' | 'reassured') => {
    handleAnalytics(journey);
    const path = journey === 'luxe' ? '/luxe' : '/reassured';
    router.push(path);
  };

  // Fixed Framer Motion variants with proper typing
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.98 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.3
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const microtextVariants: Variants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Global Styles */}
      <style jsx global>{`
        @keyframes sweepGradient {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes goldSheen {
          0%, 90% { transform: translateX(-100%); }
          10%, 80% { transform: translateX(100%); }
        }
        
        @keyframes lightSweep {
          0%, 90% { transform: translateX(-100%); }
          10%, 80% { transform: translateX(100%); }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .motion-safe-animate * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Ensure proper contrast ratios */
        @media (prefers-contrast: high) {
          .border-yellow-500 {
            border-color: #FFD700 !important;
          }
          .text-yellow-500 {
            color: #FFD700 !important;
          }
        }
      `}</style>

      <section 
        ref={sectionRef}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden motion-safe-animate"
        style={cssVars as React.CSSProperties}

        aria-label="Choose your Epic Cars journey"
        role="banner"
      >
        {/* Cinematic Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-white">
          {/* Animated Gradient Sweep */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.1) 30%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
              animation: 'sweepGradient 20s linear infinite'
            }}
          />
          
          {/* Subtle Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* Light Flares */}
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
            }}
          />
          <div 
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{ 
              background: 'radial-gradient(circle, rgba(255,235,59,0.05) 0%, transparent 70%)',
              animationDelay: '4s' 
            }}
          />
        </div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center"
        >
          {/* CTA Buttons Container */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center mb-12">
            
            {/* Luxe Journey Button */}
            <motion.button
              variants={buttonVariants}
              onClick={() => handleNavigation('luxe')}
              className="group relative w-full md:w-80 h-20 bg-black border-2 border-yellow-500 overflow-hidden transition-all duration-700 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/30 focus:ring-offset-2 focus:ring-offset-transparent"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
              aria-label="Begin your luxury car journey"
            >
              {/* Animated Gold Sheen */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)',
                  animation: 'goldSheen 8s ease-in-out infinite'
                }}
              />
              
              {/* Border Pulse Animation */}
              <div className="absolute inset-0 border-2 border-yellow-500 opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
              
              <span className="relative z-10 text-xl font-bold text-yellow-500 tracking-wide uppercase">
                Begin My Luxe Journey
              </span>
            </motion.button>

            {/* Reassured Journey Button */}
            <motion.button
              variants={buttonVariants}
              onClick={() => handleNavigation('reassured')}
              className="group relative w-full md:w-80 h-20 bg-white border-2 border-black overflow-hidden transition-all duration-700 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-gray-400/30 focus:ring-offset-2 focus:ring-offset-transparent"
              style={{
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
              }}
              aria-label="Begin your assured car journey"
            >
              {/* Animated Light Sweep */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
                  animation: 'lightSweep 8s ease-in-out infinite'
                }}
              />
              
              {/* Enhanced Border on Hover */}
              <div className="absolute inset-0 border-4 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="relative z-10 text-xl font-semibold text-black tracking-wide uppercase">
                Begin My Reassured Journey
              </span>
            </motion.button>
          </div>

          {/* Microtext */}
          <motion.p
            variants={microtextVariants}
            className="text-gray-400 text-sm font-light tracking-widest uppercase"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.2em'
            }}
          >
            Your journey starts here.
          </motion.p>
        </motion.div>
      </section>
    </>
  );
};

// JSON-LD Schema for SEO
const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Epic Cars",
  "description": "Premium luxury automotive experiences with two distinct collections: Luxe and Reassured",
  "url": "https://epiccars.com",
  "sameAs": [],
  "potentialAction": [
    {
      "@type": "ChooseAction",
      "target": {
        "@type": "EntryPoint",
        "name": "Epic Luxe Journey"
      }
    },
    {
      "@type": "ChooseAction", 
      "target": {
        "@type": "EntryPoint",
        "name": "Epic Reassured Journey"
      }
    }
  ]
};

// Main Page Component (assuming Sections 1 & 2 exist above)
export default function EpicCarsPage() {
  return (
    <>
      <Head>
        <title>Epic Cars | Choose Your Luxury Journey</title>
        <meta name="description" content="Begin your personalized luxury automotive journey with Epic Cars. Choose between our Luxe and Reassured collections." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Epic Cars | Choose Your Luxury Journey" />
        <meta property="og:description" content="Begin your personalized luxury automotive journey with Epic Cars." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/public/epic/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Epic Cars | Choose Your Luxury Journey" />
        <meta name="twitter:description" content="Begin your personalized luxury automotive journey with Epic Cars." />
        <meta name="twitter:image" content="/public/epic/twitter-image.jpg" />
        
        {/* JSON-LD Schema */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        
        {/* Preconnect to font services (uncomment when fonts are hosted externally) */}
        {/* 
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        */}
      </Head>

      <main className="min-h-screen bg-white">
        {/* Sections 1 & 2 would be here - NOT CHANGING */}
        
        {/* Section 3: Choose Your Journey */}
        <ChooseYourJourneySection />
      </main>
    </>
  );
}