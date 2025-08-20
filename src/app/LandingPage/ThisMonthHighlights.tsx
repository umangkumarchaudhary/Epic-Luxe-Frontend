'use client'

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Performance-optimized types
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

// Memoized data to prevent recreations
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

// Optimized animation variants with reduced motion support
const fadeScale = {
  initial: { opacity: 0, scale: 0.98, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      staggerChildren: 0.15
    }
  }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const tileReveal = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
    }
  }
}

// Performance-optimized Luxe Tile Component
const LuxeTile: React.FC<{ highlight: Highlight }> = ({ highlight }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const tileRef = useRef<HTMLDivElement>(null)
  const glowControls = useAnimation()
  const router = useRouter()

  // Memoized analytics tracking and navigation
  const handleNavigation = useCallback(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'epic_cars_highlight_click',
        section: 'this_months_highlights',
        label: 'luxe_tile_' + highlight.model.toLowerCase().replace(/\s+/g, '_')
      })
    }
    
    setIsClicked(true)
    
    // Navigate after circle animation starts
    setTimeout(() => {
      router.push('/luxe/inventory')
    }, 400)
  }, [highlight.model, router])

  // Optimized glow animation
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        glowControls.start({
          boxShadow: [
            '0 0 0 1px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)',
            '0 0 0 2px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.2)',
            '0 0 0 1px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)'
          ],
          transition: { duration: 1.5, ease: "easeInOut" }
        })
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [isHovered, glowControls])

  // Memoized spec chips
  const specChips = useMemo(() => 
    [highlight.year, highlight.kms, highlight.color].map((spec, index) => (
      <div 
        key={index}
        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/10 to-[#BFA980]/10 backdrop-blur-sm"
      >
        <span className="text-xs sm:text-sm font-medium text-[#D4AF37] tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
          {spec}
        </span>
      </div>
    )), [highlight.year, highlight.kms, highlight.color])

  return (
    <motion.div
      ref={tileRef}
      variants={tileReveal}
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Optimized ambient glow */}
      <motion.div
        className="absolute -inset-4 sm:-inset-8 rounded-3xl opacity-40 blur-xl"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main tile with optimized styling */}
      <motion.div
        animate={glowControls}
        className="relative bg-black rounded-xl sm:rounded-2xl overflow-hidden border border-[#D4AF37]/30"
        style={{
          background: 'linear-gradient(145deg, #000000 0%, #0a0a0a 100%)',
          boxShadow: '0 0 0 1px rgba(212, 175, 55, 0.3), 0 20px 40px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Subtle spotlight */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 120% 80% at 50% 20%, rgba(212, 175, 55, 0.06) 0%, transparent 60%)'
          }}
        />

        {/* Stock badge */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-[#D4AF37]/90 to-[#BFA980]/90 backdrop-blur-sm rounded-full border border-[#D4AF37]/50">
            <span className="text-xs font-medium text-black tracking-wider" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {highlight.badge}
            </span>
          </div>
        </div>

        {/* Optimized car image container */}
        <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse" />
          )}
          
          {/* Cinematic shadow */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-6 sm:h-8 blur-xl opacity-50"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.8) 50%, transparent 100%)'
            }}
          />

          <motion.div
            className="relative h-full"
            whileHover={{ 
              scale: 1.03,
              x: -5,
              transition: { duration: 0.6, ease: "easeOut" }
            }}
          >
            <Image
              src={highlight.image}
              alt={`${highlight.model} - ${highlight.color}`}
              fill
              className="object-cover object-center"
              style={{ 
                transform: 'rotateY(-3deg) rotateX(1deg)',
                filter: 'brightness(1.1) contrast(1.1) saturate(1.1)'
              }}
              priority={true}
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>
        </div>

        {/* Content section */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Model name */}
          <h3 
            className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 text-white"
            style={{ 
              fontFamily: 'Manrope, sans-serif',
              letterSpacing: '-0.02em'
            }}
          >
            {highlight.model}
          </h3>

          {/* Spec chips */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            {specChips}
          </div>

          {/* CTA Button with new gradient */}
          <motion.button
            onClick={handleNavigation}
            disabled={isClicked}
            className="relative w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-black tracking-wider overflow-hidden group disabled:opacity-70"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #BFA980 100%)',
              boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3)',
              fontFamily: 'Manrope, sans-serif'
            }}
            whileHover={{ scale: isClicked ? 1 : 1.02 }}
            whileTap={{ scale: isClicked ? 1 : 0.98 }}
          >
            {/* Click ripple effect */}
            {isClicked && (
              <motion.div
                className="absolute inset-0 rounded-lg sm:rounded-xl"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            )}
            
            {/* Metallic sheen effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.4) 50%, transparent 60%)'
              }}
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 4
              }}
            />
            <span className="relative z-10 text-sm sm:text-base">
              {isClicked ? 'Redirecting...' : highlight.cta}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Performance-optimized Reassured Tile Component
const ReassuredTile: React.FC<{ highlight: Highlight }> = ({ highlight }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const trackAnalytics = useCallback(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'epic_cars_highlight_click',
        section: 'this_months_highlights',
        label: 'reassured_tile_' + highlight.model.toLowerCase().replace(/\s+/g, '_')
      })
    }
  }, [highlight.model])

  // Memoized spec chips
  const specChips = useMemo(() => 
    [highlight.year, highlight.kms, highlight.color].map((spec, index) => (
      <div 
        key={index}
        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gray-300/60 bg-gray-50/80"
      >
        <span className="text-xs sm:text-sm font-medium text-gray-600 tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
          {spec}
        </span>
      </div>
    )), [highlight.year, highlight.kms, highlight.color])

  return (
    <motion.div
      variants={tileReveal}
      className="relative group"
    >
      <motion.div
        className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/50 shadow-xl"
        style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)'
        }}
        whileHover={{
          y: -4,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
      >
        {/* Stock badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
          <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gray-100/90 backdrop-blur-sm rounded-full border border-gray-300/50">
            <span className="text-xs font-medium text-gray-700 tracking-wider" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {highlight.badge}
            </span>
          </div>
        </div>

        {/* Optimized car image */}
        <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 animate-pulse" />
          )}

          <motion.div
            className="relative h-full"
            whileHover={{ 
              scale: 1.03,
              x: 5,
              transition: { duration: 0.6, ease: "easeOut" }
            }}
          >
            <Image
              src={highlight.image}
              alt={`${highlight.model} - ${highlight.color}`}
              fill
              className="object-cover object-center"
              style={{ 
                transform: 'rotateY(3deg) rotateX(-1deg)',
                filter: 'brightness(1.05) contrast(1.02)'
              }}
              priority={false}
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVElEQVQYlWNhQAJMDAwMDAz/GRj+MzD8Z/jPwMDw/z8DAwPDfwYGhv8MDAwM/xkYGBj+MzAwMPxnYGBg+M/AwMDwn4GBgeE/AwMDw38GBgaG/wwMDACwEAoHNDqH+gAAAABJRU5ErkJggg=="
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>
        </div>

        {/* Content section */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Model name */}
          <h3 
            className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-4 sm:mb-6 text-gray-900"
            style={{ 
              fontFamily: 'Manrope, sans-serif',
              letterSpacing: '-0.01em'
            }}
          >
            {highlight.model}
          </h3>

          {/* Spec chips */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            {specChips}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={trackAnalytics}
            className="relative w-full py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 border-gray-900 bg-transparent font-semibold text-gray-900 tracking-wider group overflow-hidden"
            style={{ fontFamily: 'Manrope, sans-serif' }}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: '#000000',
              color: '#ffffff'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <span className="relative z-10 text-sm sm:text-base">{highlight.cta}</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Main Component with full optimization
const ThisMonthsHighlights: React.FC<{ className?: string }> = ({ className = '' }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })

  return (
    <section 
      ref={sectionRef}
      className={`relative py-16 sm:py-20 lg:py-32 overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, #0F0F10 0%, #1A1A1A 100%)'
      }}
      aria-labelledby="highlights-heading"
    >
      {/* Optimized background texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M0 0h60v60H0V0zm15 15v30h30V15H15zm15 25a10 10 0 1 1 0-20 10 10 0 0 1 0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeScale}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header with optimized gradient */}
          <motion.div 
            variants={fadeScale}
            className="text-center mb-12 sm:mb-16 lg:mb-24"
          >
            <motion.h2 
              id="highlights-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-6 sm:mb-8"
              style={{ 
                fontFamily: 'Manrope, sans-serif',
                background: 'linear-gradient(90deg, #D4AF37 0%, #BFA980 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em'
              }}
            >
              This Month&apos;s Highlights
            </motion.h2>
          </motion.div>

          {/* Feature Tiles */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 mb-12 sm:mb-16"
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
              className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase opacity-80"
              style={{ 
                color: '#D4AF37',
                fontFamily: 'Manrope, sans-serif'
              }}
            >
              Availability Ends Soon.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Performance-optimized styles */}
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

        /* Performance optimizations */
        img {
          content-visibility: auto;
          contain: layout style paint;
        }

        /* Hardware acceleration */
        .group {
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>
    </section>
  )
}

// Display names for better debugging
LuxeTile.displayName = 'LuxeTile'
ReassuredTile.displayName = 'ReassuredTile'
ThisMonthsHighlights.displayName = 'ThisMonthsHighlights'

export default ThisMonthsHighlights