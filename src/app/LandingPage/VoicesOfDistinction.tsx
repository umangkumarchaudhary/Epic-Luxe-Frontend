'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Types for testimonials
interface Testimonial {
  id: string
  quote: string
  author: string
  location: string
  avatar: string
  type: 'luxe' | 'reassured'
}

// Sample testimonials data (CMS-ready)
const luxeTestimonials: Testimonial[] = [
  {
    id: 'luxe-1',
    quote: "Epic Luxe didn't just deliver a car — they curated an arrival.",
    author: "Rohan M.",
    location: "Mumbai",
    avatar: "/images/avatars/rohan-m.jpg",
    type: 'luxe'
  },
  {
    id: 'luxe-2',
    quote: "My 911 was presented like art. A private viewing I'll never forget.",
    author: "Tara S.",
    location: "Bengaluru",
    avatar: "/images/avatars/tara-s.jpg",
    type: 'luxe'
  },
  {
    id: 'luxe-3',
    quote: "Every detail spoke of exclusivity. This is how luxury should feel.",
    author: "Arjun P.",
    location: "Delhi",
    avatar: "/images/avatars/arjun-p.jpg",
    type: 'luxe'
  }
]

const reassuredTestimonials: Testimonial[] = [
  {
    id: 'reassured-1',
    quote: "Transparent pricing, zero surprises. Buying my MG felt effortless.",
    author: "Varun K.",
    location: "Hyderabad",
    avatar: "/images/avatars/varun-k.jpg",
    type: 'reassured'
  },
  {
    id: 'reassured-2',
    quote: "Certified quality and quick paperwork — I drove home the same day.",
    author: "Neha A.",
    location: "Pune",
    avatar: "/images/avatars/neha-a.jpg",
    type: 'reassured'
  },
  {
    id: 'reassured-3',
    quote: "Professional service with complete transparency. Highly recommended.",
    author: "Kiran R.",
    location: "Chennai",
    avatar: "/images/avatars/kiran-r.jpg",
    type: 'reassured'
  }
]

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1.2, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    }
  }
}

const cardVariants = {
  initial: { opacity: 0, scale: 0.9, y: 30 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: -20,
    transition: { 
      duration: 0.5, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    }
  }
}

// Testimonial Card Component
const TestimonialCard: React.FC<{ testimonial: Testimonial; className?: string }> = ({ 
  testimonial, 
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.03,
        y: -8,
        transition: { duration: 0.6, ease: "easeOut" }
      }}
    >
      <motion.div
        className={`relative p-6 lg:p-8 rounded-2xl overflow-hidden ${
          testimonial.type === 'luxe' 
            ? 'bg-black border border-yellow-600/20' 
            : 'bg-white border border-gray-300'
        }`}
        style={{
          boxShadow: testimonial.type === 'luxe'
            ? '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 175, 55, 0.1)'
            : '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Glow effect for luxe cards */}
        {testimonial.type === 'luxe' && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 70%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHovered ? 0.6 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}

        {/* Quote text */}
        <blockquote className="mb-6 relative">
          {/* Opening quote mark */}
          <span 
            className={`absolute -top-3 -left-1 text-5xl font-serif leading-none ${
              testimonial.type === 'luxe' ? 'text-yellow-600/30' : 'text-gray-400/60'
            }`}
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            "
          </span>
          
          <p 
            className={`text-base lg:text-lg leading-relaxed relative z-10 ${
              testimonial.type === 'luxe' ? 'text-white' : 'text-gray-900'
            }`}
            style={{ 
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.01em',
              lineHeight: '1.6'
            }}
          >
            {testimonial.quote}
          </p>
        </blockquote>

        {/* Author section */}
        <div className="flex items-center space-x-4">
          {/* Avatar with 3D pan effect */}
          <motion.div
            className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-offset-2 flex-shrink-0"
            style={{
              ringColor: testimonial.type === 'luxe' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(0, 0, 0, 0.15)',
              ringOffsetColor: testimonial.type === 'luxe' ? '#000' : '#fff'
            }}
            whileHover={{
              scale: 1.1,
              rotateY: 15,
              transition: { duration: 0.6, ease: "easeOut" }
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
              <span className="text-gray-600 font-medium text-base">
                {testimonial.author.split(' ')[0][0]}
              </span>
            </div>
          </motion.div>

          <div className="flex items-center space-x-3">
            <h4 
              className={`font-semibold text-base whitespace-nowrap ${
                testimonial.type === 'luxe' ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {testimonial.author}
            </h4>
            <p 
              className={`text-sm tracking-wider uppercase font-medium whitespace-nowrap ${
                testimonial.type === 'luxe' ? 'text-yellow-600/80' : 'text-gray-600'
              }`}
              style={{ letterSpacing: '0.1em' }}
            >
              {testimonial.location}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Carousel Component
const TestimonialCarousel: React.FC<{ 
  testimonials: Testimonial[]
  type: 'luxe' | 'reassured'
  autoPlay?: boolean
}> = ({ testimonials, type, autoPlay = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>()

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (autoPlay && !isPaused) {
      intervalRef.current = setInterval(nextSlide, 5000)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoPlay, isPaused, nextSlide])

  return (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <TestimonialCard
          key={testimonials[currentIndex].id}
          testimonial={testimonials[currentIndex]}
          className="w-full"
        />
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-yellow-600 scale-125'
                : 'bg-yellow-600/30 hover:bg-yellow-600/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Main Component
const VoicesOfDistinction: React.FC<{ className?: string }> = ({ className = '' }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const shimmerControls = useAnimation()

  // Heading shimmer effect every 10s
  useEffect(() => {
    const shimmerInterval = setInterval(() => {
      shimmerControls.start({
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        transition: { duration: 2, ease: "easeInOut" }
      })
    }, 10000)
    
    return () => clearInterval(shimmerInterval)
  }, [shimmerControls])

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen overflow-hidden ${className}`}
      aria-labelledby="testimonials-heading"
    >
      {/* Split background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-black" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 lg:py-32">
        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16 lg:mb-20"
          >
            <motion.h2 
              ref={headingRef}
              id="testimonials-heading"
              animate={shimmerControls}
              className="text-5xl md:text-6xl lg:text-7xl font-light"
              style={{ 
                fontFamily: 'Cormorant Garamond, serif',
                background: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 25%, #F4E4C1 50%, #FFD700 75%, #D4AF37 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em'
              }}
            >
              Voices of Distinction
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg lg:text-xl font-light mt-6 text-gray-300 lg:text-gray-600 max-w-3xl mx-auto"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.005em'
              }}
            >
              Where exceptional experiences speak louder than promises
            </motion.p>
          </motion.div>

          {/* Desktop: Combined carousel instead of split */}
          <div className="hidden lg:block">
            <motion.div 
              variants={fadeInUp}
              className="relative max-w-4xl mx-auto"
            >
              <TestimonialCarousel 
                testimonials={[...luxeTestimonials, ...reassuredTestimonials]} 
                type="luxe"
              />
            </motion.div>
          </div>

          {/* Mobile: Combined carousel */}
          <div className="lg:hidden">
            <motion.div variants={fadeInUp} className="max-w-lg mx-auto">
              <TestimonialCarousel 
                testimonials={[...luxeTestimonials, ...reassuredTestimonials]} 
                type="luxe"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Elegant divider line for desktop */}
      <div className="hidden lg:block absolute top-24 bottom-24 left-1/2 transform -translate-x-px w-px bg-gradient-to-b from-transparent via-yellow-600/20 to-transparent" />

      {/* Reduced motion support */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  )
}

export default VoicesOfDistinction