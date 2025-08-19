'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PremiumPageLoaderProps {
  isVisible: boolean
  type?: 'luxe' | 'reassured'
  onComplete?: () => void
}

const PremiumPageLoader: React.FC<PremiumPageLoaderProps> = ({ 
  isVisible, 
  type = 'luxe', 
  onComplete 
}) => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    'Initializing Experience...',
    'Loading Premium Collection...',
    'Preparing Your Journey...',
    'Almost Ready...'
  ]

  useEffect(() => {
    if (!isVisible) {
      setProgress(0)
      setCurrentStep(0)
      return
    }

    // Progressive loading simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5
        
        // Update step based on progress
        if (newProgress > 75 && currentStep < 3) setCurrentStep(3)
        else if (newProgress > 50 && currentStep < 2) setCurrentStep(2)
        else if (newProgress > 25 && currentStep < 1) setCurrentStep(1)
        
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            onComplete?.()
          }, 200)
          return 100
        }
        
        return newProgress
      })
    }, 80)

    return () => clearInterval(progressInterval)
  }, [isVisible, currentStep, onComplete])

  const isLuxe = type === 'luxe'

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: isLuxe 
              ? 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)'
          }}
        >
          {/* Background pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='${isLuxe ? '%23D4AF37' : '%23666666'}' fill-opacity='0.03'%3E%3Cpath d='M25 25h50v50H25z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}
          />

          <div className="relative z-10 text-center max-w-md mx-auto px-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 
                className="text-4xl sm:text-5xl font-light tracking-[0.3em] mb-2"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  background: isLuxe 
                    ? 'linear-gradient(90deg, #D4AF37 0%, #BFA980 100%)'
                    : 'linear-gradient(90deg, #333333 0%, #666666 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                EPIC CARS
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-[1px] mx-auto"
                style={{
                  background: isLuxe 
                    ? 'linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)'
                    : 'linear-gradient(90deg, transparent 0%, #666666 50%, transparent 100%)'
                }}
              />
            </motion.div>

            {/* Collection Type */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <div className={`inline-flex items-center px-4 py-2 rounded-full border ${
                isLuxe 
                  ? 'border-[#D4AF37]/30 bg-[#D4AF37]/10' 
                  : 'border-gray-400/30 bg-gray-100/50'
              }`}>
                <span 
                  className={`text-sm font-medium tracking-wider ${
                    isLuxe ? 'text-[#D4AF37]' : 'text-gray-600'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {isLuxe ? 'EPIC LUXE' : 'EPIC REASSURED'}
                </span>
              </div>
            </motion.div>

            {/* Loading Status */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-8"
            >
              <p 
                className={`text-lg font-light mb-4 ${
                  isLuxe ? 'text-white' : 'text-gray-800'
                }`}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {steps[currentStep]}
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-6"
            >
              <div className={`w-full h-1 rounded-full ${
                isLuxe ? 'bg-white/10' : 'bg-gray-300/50'
              }`}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: isLuxe 
                      ? 'linear-gradient(90deg, #D4AF37 0%, #BFA980 100%)'
                      : 'linear-gradient(90deg, #333333 0%, #666666 100%)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              
              {/* Progress percentage */}
              <motion.p 
                className={`text-xs mt-2 font-medium ${
                  isLuxe ? 'text-[#D4AF37]/70' : 'text-gray-500'
                }`}
                style={{ fontFamily: 'Manrope, sans-serif' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.round(progress)}%
              </motion.p>
            </motion.div>

            {/* Animated dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex justify-center space-x-1"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    isLuxe ? 'bg-[#D4AF37]/50' : 'bg-gray-400/50'
                  }`}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Subtle gradient overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isLuxe
                ? 'radial-gradient(ellipse at center, transparent 0%, rgba(212, 175, 55, 0.05) 50%, transparent 100%)'
                : 'radial-gradient(ellipse at center, transparent 0%, rgba(100, 100, 100, 0.05) 50%, transparent 100%)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PremiumPageLoader