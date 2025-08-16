'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'


// Animated text component
function AnimatedText({ text, className }: { text: string; className?: string }) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(prev => prev + 1)
      } else {
        // Reset after completion
        setTimeout(() => {
          setDisplayedText('')
          setCurrentIndex(0)
        }, 2000) // Wait 2 seconds before restarting
      }
    }, 100) // Type each letter every 100ms

    return () => clearInterval(interval)
  }, [currentIndex, text])

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay }
    })
  }

  return (
    <>
      {/* CSS Animation for moving background */}
      <style jsx global>{`
        @keyframes backgroundPan {
          0% {
            transform: scale(1.1) translateX(-2%) translateY(-1%);
          }
          25% {
            transform: scale(1.15) translateX(1%) translateY(1%);
          }
          50% {
            transform: scale(1.1) translateX(2%) translateY(-0.5%);
          }
          75% {
            transform: scale(1.15) translateX(-1%) translateY(0.5%);
          }
          100% {
            transform: scale(1.1) translateX(-2%) translateY(-1%);
          }
        }
        
        .moving-background {
          animation: backgroundPan 25s ease-in-out infinite;
        }
      `}</style>
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
     
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10" />
        <Image
          src="/assets/images/hero-car.png"
          alt="Premium Pre-Owned Cars Hyderabad Chennai Vizag Pune"
          fill
          className="object-cover moving-background"
          priority
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-tight mb-6"
        >
          <div className="leading-tight">Your Car,</div>
          <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Our Commitment
          </div>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          className="text-xl md:text-2xl lg:text-3xl font-light mb-12 max-w-3xl mx-auto min-h-[80px] flex items-center justify-center"
        >
          <AnimatedText 
            text="Insurance and Warranty Coverage Designed for Total Peace of Mind"
            className="text-center"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="#insurance"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-white text-black border border-transparent rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300 transform hover:scale-105"
          >
            Get Insurance Quote
          </Link>
          <Link
            href="#warranty"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300"
          >
            Claim Your Warranty
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
    </>
  )
}
