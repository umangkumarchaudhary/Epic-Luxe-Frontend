'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion'
import Image from 'next/image'

// Types for CMS-ready structure
type Highlight = {
  model: string
  year: string
  kms: string
  color: string
  cta: string
  image: string
  badge?: string
  type: 'luxe' | 'reassured'
}

// Hardcoded data (CMS-ready structure)
const LuxeHighlight: Highlight = {
  model: "AMG CLE 53",
  year: "2024",
  kms: "14,200 km",
  color: "Onyx Black",
  cta: "Explore Now",
  image: "/assets/images/AMGCLE53.webp",
  badge: "Limited Stock",
  type: "luxe"
}

const ReassuredHighlight: Highlight = {
  model: "MG Hector",
  year: "2022",
  kms: "9,800 km",
  color: "Pearl White",
  cta: "Explore Now",
  image: "/assets/images/MGHector.png",
  badge: "New Arrival",
  type: "reassured"
}

// Animation variants
const fadeScale = {
  initial: { opacity: 0, scale: 0.95, y: 40 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 1.2, 
      ease: [0.21, 0.47, 0.32, 0.98],
      staggerChildren: 0.3
    }
  }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.4
    }
  }
}

const tileReveal = {
  initial: { opacity: 0, y: 60, rotateX: 15 },
  animate: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { 
      duration: 1.4, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    }
  }
}

// Luxe Tile Component
const LuxeTile: React.FC<{ highlight: Highlight }> = ({ highlight }) => {
  const [isHovered, setIsHovered] = useState(false)
  const tileRef = useRef<HTMLDivElement>(null)
  const glowControls = useAnimation()

  // Gold border pulse animation every 6s
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        glowControls.start({
          boxShadow: [
            '0 0 0 1px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)',
            '0 0 0 2px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.3)',
            '0 0 0 1px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)'
          ],
          transition: { duration: 2, ease: "easeInOut" }
        })
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [isHovered, glowControls])

  const trackAnalytics = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'epic_cars_highlight_click',
        section: 'this_months_highlights',
        label: 'luxe_tile_' + highlight.model.toLowerCase().replace(/\s+/g, '_')
      })
    }
  }

  return (
    <motion.div
      ref={tileRef}
      variants={tileReveal}
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glow background */}
      <motion.div
        className="absolute -inset-8 rounded-3xl opacity-60 blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main tile */}
      <motion.div
        animate={glowControls}
        className="relative bg-black rounded-2xl overflow-hidden border border-yellow-600/30"
        style={{
          background: 'linear-gradient(145deg, #000000 0%, #0a0a0a 100%)',
          boxShadow: '0 0 0 1px rgba(212, 175, 55, 0.3), 0 25px 50px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Spotlight vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 120% 80% at 50% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)'
          }}
        />

        {/* Stock badge */}
        <div className="absolute top-6 left-6 z-20">
          <div className="px-3 py-1.5 bg-yellow-600/90 backdrop-blur-sm rounded-full border border-yellow-400/50">
            <span className="text-xs font-medium text-black tracking-wider">
              {highlight.badge}
            </span>
          </div>
        </div>

        {/* Car image container with cinematic shadow */}
        <div className="relative h-64 lg:h-80 overflow-hidden">
          {/* Cinematic shadow under car */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-8 blur-xl opacity-60"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.8) 50%, transparent 100%)'
            }}
          />
          
          {/* Gloss reflection overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 40%, transparent 60%, rgba(255, 255, 255, 0.1) 100%)'
            }}
          />

          <motion.div
            className="relative h-full"
            whileHover={{ 
              scale: 1.05,
              x: -10,
              transition: { duration: 0.8, ease: "easeOut" }
            }}
          >
            <Image
              src={highlight.image}
              alt={`${highlight.model} - ${highlight.color}`}
              fill
              className="object-cover object-center filter brightness-110 contrast-110"
              style={{ 
                transform: 'rotateY(-5deg) rotateX(2deg)',
                filter: 'brightness(1.1) contrast(1.1) saturate(1.2)'
              }}
            />
          </motion.div>
        </div>

        {/* Content section */}
        <div className="p-8">
          {/* Model name */}
          <h3 
            className="text-3xl lg:text-4xl font-light mb-6 text-white"
            style={{ 
              fontFamily: 'Cormorant Garamond, serif',
              letterSpacing: '-0.02em'
            }}
          >
            {highlight.model}
          </h3>

          {/* Spec chips */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[highlight.year, highlight.kms, highlight.color].map((spec, index) => (
              <div 
                key={index}
                className="px-4 py-2 rounded-full border border-yellow-600/40 bg-yellow-600/10 backdrop-blur-sm"
              >
                <span className="text-sm font-medium text-yellow-200 tracking-wide">
                  {spec}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button with metallic sheen */}
          <motion.button
            onClick={trackAnalytics}
            className="relative w-full py-4 rounded-xl font-semibold text-black tracking-wider overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
              boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3)'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Metallic sheen effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.6) 50%, transparent 60%)'
              }}
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
            <span className="relative z-10">{highlight.cta}</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Reassured Tile Component
const ReassuredTile: React.FC<{ highlight: Highlight }> = ({ highlight }) => {
  const [isHovered, setIsHovered] = useState(false)

  const trackAnalytics = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'epic_cars_highlight_click',
        section: 'this_months_highlights',
        label: 'reassured_tile_' + highlight.model.toLowerCase().replace(/\s+/g, '_')
      })
    }
  }

  return (
    <motion.div
      variants={tileReveal}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-white rounded-2xl overflow-hidden border border-gray-200/50 shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)'
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.6, ease: "easeOut" }
        }}
      >
        {/* Fine linen texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.03'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        {/* Stock badge */}
        <div className="absolute top-6 right-6 z-20">
          <div className="px-3 py-1.5 bg-gray-100/90 backdrop-blur-sm rounded-full border border-gray-300/50">
            <span className="text-xs font-medium text-gray-700 tracking-wider">
              {highlight.badge}
            </span>
          </div>
        </div>

        {/* Car image - natural daylight aesthetic */}
        <div className="relative h-64 lg:h-80 overflow-hidden">
          <motion.div
            className="relative h-full"
            whileHover={{ 
              scale: 1.05,
              x: 10,
              transition: { duration: 0.8, ease: "easeOut" }
            }}
          >
            <Image
              src={highlight.image}
              alt={`${highlight.model} - ${highlight.color}`}
              fill
              className="object-cover object-center"
              style={{ 
                transform: 'rotateY(5deg) rotateX(-1deg)',
                filter: 'brightness(1.05) contrast(1.02)'
              }}
            />
          </motion.div>
        </div>

        {/* Content section */}
        <div className="p-8">
          {/* Model name */}
          <h3 
            className="text-3xl lg:text-4xl font-medium mb-6 text-gray-900"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.01em'
            }}
          >
            {highlight.model}
          </h3>

          {/* Spec chips */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[highlight.year, highlight.kms, highlight.color].map((spec, index) => (
              <div 
                key={index}
                className="px-4 py-2 rounded-full border border-gray-300/60 bg-gray-50/80"
              >
                <span className="text-sm font-medium text-gray-600 tracking-wide">
                  {spec}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={trackAnalytics}
            className="relative w-full py-4 rounded-xl border-2 border-gray-900 bg-transparent font-semibold text-gray-900 tracking-wider group overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              backgroundColor: '#000000',
              color: '#ffffff'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <span className="relative z-10">{highlight.cta}</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Main Component
const ThisMonthsHighlights: React.FC<{ className?: string }> = ({ className = '' }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={sectionRef}
      className={`relative py-24 lg:py-32 overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, #0F0F10 0%, #1A1A1A 100%)'
      }}
      aria-labelledby="highlights-heading"
    >
      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeScale}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header with Dramatic Gold Gradient */}
          <motion.div 
            variants={fadeScale}
            className="text-center mb-16 lg:mb-24"
          >
            <motion.h2 
              id="highlights-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-light mb-8"
              style={{ 
                fontFamily: 'Cormorant Garamond, serif',
                background: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 25%, #F4E4C1 50%, #FFD700 75%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em'
              }}
            >
              This Month's Highlights
            </motion.h2>
          </motion.div>

          {/* Feature Tiles */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16"
          >
            <LuxeTile highlight={LuxeHighlight} />
            <ReassuredTile highlight={ReassuredHighlight} />
          </motion.div>

          {/* Tagline */}
          <motion.div
            variants={fadeScale}
            className="text-center"
          >
            <p 
              className="text-sm font-medium tracking-[0.2em] uppercase opacity-80"
              style={{ 
                color: '#D4AF37',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Availability Ends Soon.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Reduced motion support */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
}

export default ThisMonthsHighlights