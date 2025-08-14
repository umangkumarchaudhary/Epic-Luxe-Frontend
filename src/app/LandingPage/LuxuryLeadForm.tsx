'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Types
interface FormData {
  name: string
  phone: string
  email: string
  interest: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  interest?: string
  submit?: string
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    }
  }
}

const successCardVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 1, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    }
  }
}

const LuxuryLeadForm: React.FC<{ className?: string }> = ({ className = '' }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    interest: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Extract UTM parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      setFormData(prev => ({
        ...prev,
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || ''
      }))
    }
  }, [])

  // Validation functions
  const validatePhone = (phone: string): boolean => {
    // Indian phone: 10 digits starting with 6-9
    // International: +country code followed by digits
    const indianPattern = /^[6-9]\d{9}$/
    const internationalPattern = /^\+\d{1,4}\d{6,14}$/
    return indianPattern.test(phone) || internationalPattern.test(phone)
  }

  const validateEmail = (email: string): boolean => {
    if (!email) return true // Optional field
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.interest) {
      newErrors.interest = 'Please select your car interest'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    // Analytics tracking
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'epic_cars_form_submit',
        section: 'lead_form',
        interest: formData.interest
      })
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'EpicCars_Landing'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setIsSuccess(true)
      
      // Analytics success tracking
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'epic_cars_form_success',
          section: 'lead_form',
          interest: formData.interest
        })
      }

    } catch (error) {
      setErrors({ 
        submit: 'We encountered an issue. Please try again or call us directly.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  // Success card component
  const SuccessCard = () => (
    <motion.div
      variants={successCardVariants}
      initial="initial"
      animate="animate"
      className="text-center p-8 lg:p-12"
    >
      {/* Success icon */}
      <motion.div
        className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-black"
        >
          <path 
            d="M20 6L9 17L4 12" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <motion.h3
        className="text-3xl lg:text-4xl font-light mb-6"
        style={{ 
          fontFamily: 'Cormorant Garamond, serif',
          color: '#EAD9B8',
          letterSpacing: '-0.02em'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Thank You
      </motion.h3>

      <motion.p
        className="text-lg text-gray-300 mb-4 leading-relaxed"
        style={{ fontFamily: 'Inter, sans-serif' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Your inquiry has been received with the attention it deserves.
      </motion.p>

      <motion.p
        className="text-base text-yellow-600/80 font-medium"
        style={{ fontFamily: 'Inter, sans-serif' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Our concierge will call within 24 hours.
      </motion.p>

      {/* Elegant divider */}
      <motion.div
        className="w-16 h-px bg-yellow-600/30 mx-auto mt-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      />
    </motion.div>
  )

  return (
    <section 
      ref={sectionRef}
      className={`relative py-24 lg:py-32 overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, #0F0F10 0%, #1A1A1A 50%, #0F0F10 100%)'
      }}
      aria-labelledby="contact-heading"
    >
      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0l-2 4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0L4 4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeInUp}
          className="max-w-2xl mx-auto"
        >
          {/* Section Header */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.h2 
              id="contact-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
              style={{ 
                fontFamily: 'Cormorant Garamond, serif',
                background: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 25%, #F4E4C1 50%, #FFD700 75%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em'
              }}
            >
              Begin Your Journey
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Connect with our automotive specialists
            </motion.p>
          </motion.div>

          {/* Form Panel */}
          <motion.div
            variants={fadeInUp}
            className="relative"
          >
            {/* Gold hairline frame */}
            <div 
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 50%, rgba(212, 175, 55, 0.2) 100%)',
                padding: '1px'
              }}
            >
              <div 
                className="w-full h-full rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 15, 16, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)'
                }}
              />
            </div>

            {/* Form content */}
            <div className="relative p-8 lg:p-12">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <SuccessCard />
                ) : (
                  <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                    initial="initial"
                    animate="animate"
                  >
                    {/* Name Field */}
                    <motion.div variants={fadeInUp}>
                      <label 
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-3"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-6 py-4 rounded-xl bg-black/30 border backdrop-blur-sm text-white placeholder-gray-500 text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-600/50 ${
                          errors.name ? 'border-red-500/50' : 'border-gray-700/50 hover:border-yellow-600/30'
                        }`}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                        }}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-2"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Phone Field */}
                    <motion.div variants={fadeInUp}>
                      <label 
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-300 mb-3"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-6 py-4 rounded-xl bg-black/30 border backdrop-blur-sm text-white placeholder-gray-500 text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-600/50 ${
                          errors.phone ? 'border-red-500/50' : 'border-gray-700/50 hover:border-yellow-600/30'
                        }`}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                        }}
                        placeholder="10-digit mobile or +country code"
                      />
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-2"
                        >
                          {errors.phone}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Email Field */}
                    <motion.div variants={fadeInUp}>
                      <label 
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-3"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-6 py-4 rounded-xl bg-black/30 border backdrop-blur-sm text-white placeholder-gray-500 text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-600/50 ${
                          errors.email ? 'border-red-500/50' : 'border-gray-700/50 hover:border-yellow-600/30'
                        }`}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                        }}
                        placeholder="your@email.com (optional)"
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-2"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Car Interest Dropdown */}
                    <motion.div variants={fadeInUp}>
                      <label 
                        htmlFor="interest"
                        className="block text-sm font-medium text-gray-300 mb-3"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Car Interest *
                      </label>
                      <select
                        id="interest"
                        value={formData.interest}
                        onChange={(e) => handleInputChange('interest', e.target.value)}
                        className={`w-full px-6 py-4 rounded-xl bg-black/30 border backdrop-blur-sm text-white text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-600/50 appearance-none cursor-pointer ${
                          errors.interest ? 'border-red-500/50' : 'border-gray-700/50 hover:border-yellow-600/30'
                        }`}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 1.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em'
                        }}
                      >
                        <option value="">Select your preference</option>
                        <option value="Epic Luxe">Epic Luxe</option>
                        <option value="Epic Reassured">Epic Reassured</option>
                        <option value="Both">Both</option>
                      </select>
                      {errors.interest && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-2"
                        >
                          {errors.interest}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Submit Error */}
                    {errors.submit && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/30 rounded-xl p-4"
                      >
                        <p className="text-red-400 text-sm">
                          {errors.submit}
                        </p>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.div variants={fadeInUp} className="pt-4">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 rounded-xl font-semibold text-black text-lg tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden relative"
                        style={{
                          background: isSubmitting 
                            ? 'linear-gradient(135deg, #B8941F 0%, #D4AF37 100%)'
                            : 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
                          boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3)',
                          fontFamily: 'Inter, sans-serif'
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
                        <span className="relative z-10">
                          {isSubmitting ? 'Submitting...' : 'Connect with Epic Cars'}
                        </span>
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
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
      `}</style>
    </section>
  )
}

export default LuxuryLeadForm