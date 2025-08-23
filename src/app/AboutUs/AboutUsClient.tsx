'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronRight, Award, Users, TrendingUp, MapPin, ArrowRight, Phone, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(end * easeOutQuart))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

const AboutUsClient: React.FC = () => {
  const [showContactPopup, setShowContactPopup] = useState(false)
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0)
  const [currentValueIndex, setCurrentValueIndex] = useState(0)
  const [showMapPopup, setShowMapPopup] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  

  const milestones = [
    { year: "2011", title: "Foundation", description: "RAAM Group established with a vision for automotive excellence" },
    { year: "2015", title: "Multi-Brand Expansion", description: "Secured partnerships with Mercedes-Benz, Toyota, and Honda" },
    { year: "2018", title: "Geographic Growth", description: "Expanded to multiple states with strong presence in South India" },
    { year: "2020", title: "Digital Transformation", description: "Launched online platforms and enhanced customer experience" },
    { year: "2023", title: "Epic Launch", description: "Introduced Epic Luxe and Epic Reassured pre-owned car divisions" },
    { year: "2024", title: "Market Leadership", description: "Achieved ₹2000+ Cr revenue and top 10 dealer status in India" }
  ]

  const values = [
    {
      title: "Ownership & Transparency",
      description: "Complete accountability in every transaction with full disclosure and honest communication.",
      icon: Award
    },
    {
      title: "Respect & Feedback",
      description: "Valuing every customer relationship and continuously improving through constructive feedback.",
      icon: Users
    },
    {
      title: "Integrity & Culture",
      description: "Upholding the highest ethical standards while building a positive, inclusive work culture.",
      icon: TrendingUp
    }
  ]

  const locations = [
    { city: "Hyderabad", state: "Telangana", presence: "42%", flagship: true },
    { city: "Chennai", state: "Tamil Nadu", presence: "2.6%", flagship: false },
    { city: "Pune", state: "Maharashtra", presence: "3.58%", flagship: false },
    { city: "Vijayawada", state: "Andhra Pradesh", presence: "10.3%", flagship: false }
  ]

  const brands = [
    { name: "Mercedes-Benz", logo: "/assets/images/Mercedes-benz-logo.jpg", category: "Luxury" },
    { name: "Toyota", logo: "/assets/images/TOYOTALOGO.png", category: "Premium" },
    { name: "Honda", logo: "/assets/images/HondaLogo.png", category: "Reliable" },
    { name: "MG", logo: "/assets/images/MGLOGO.png", category: "Innovation" },
    { name: "Ather", logo: "/assets/images/LogoAther.jpg", category: "Electric" },
    { name: "Epic", logo: "/brands/epic.svg", category: "Pre-owned" }
  ]


  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-[#0e0e0e]/95 to-[#1a1a1a]/95 backdrop-blur-lg border-b border-[#BFA980]/10 shadow-xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white">
                Epic
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="/luxe" 
                className="text-base font-semibold text-white/90 hover:text-[#D4AF37] transition-all duration-300 relative group"
              >
                Epic Luxe
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] group-hover:w-full transition-all duration-400 ease-out" />
              </a>
              <a 
                href="/reassured" 
                className="text-base font-semibold text-white/90 hover:text-[#D4AF37] transition-all duration-300 relative group"
              >
                Epic Reassured
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] group-hover:w-full transition-all duration-400 ease-out" />
              </a>
            </nav>

            {/* Contact Button */}
            <button
              onClick={() => setShowContactPopup(true)}
              className="flex items-center space-x-2 text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="text-sm">Contact Now</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contact Popup */}
      {showContactPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowContactPopup(false)}
          />
          
          <div className="relative w-full max-w-md bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e] border border-[#D4AF37]/20 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[#D4AF37]/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20 p-2 rounded-lg border border-[#D4AF37]/30">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-xl">Contact Epic Cars</h2>
                    <p className="text-gray-400 text-sm mt-1">Choose your preferred service</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowContactPopup(false)}
                  className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contact Options */}
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowContactPopup(false)
                    window.location.href = 'tel:8121021135'
                  }}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] hover:from-[#BFA980] hover:to-[#D4AF37] text-[#0e0e0e] px-6 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="font-bold">Epic Reassured</div>
                      <div className="text-sm opacity-80">Pre-owned cars • +91 8121021135</div>
                    </div>
                    <Phone className="w-5 h-5" />
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setShowContactPopup(false)
                    window.location.href = 'tel:7288882121'
                  }}
                  className="w-full bg-gradient-to-r from-[#BFA980] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#BFA980] text-[#0e0e0e] px-6 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="font-bold">Epic Luxe</div>
                      <div className="text-sm opacity-80">Luxury cars • +91 7288882121</div>
                    </div>
                    <Phone className="w-5 h-5" />
                  </div>
                </button>
              </div>
              
              <button
                onClick={() => setShowContactPopup(false)}
                className="w-full bg-transparent border border-[#D4AF37]/30 text-[#D4AF37] px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Maps Popup */}
      {showMapPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowMapPopup(false)}
          />
          
          <div className="relative w-full max-w-4xl bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e] border border-[#D4AF37]/20 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[#D4AF37]/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20 p-2 rounded-lg border border-[#D4AF37]/30">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-xl" style={{ fontFamily: 'Manrope, sans-serif' }}>Choose Your Location</h2>
                    <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Select the showroom you&apos;d like to visit</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMapPopup(false)}
                  className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Maps Content */}
            <div className="p-6 grid md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
              {/* Epic Reassured */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Epic Reassured</h3>
                  <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Pre-owned cars with confidence</p>
                </div>
                <div className="rounded-lg overflow-hidden border border-[#D4AF37]/20">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.824963091058!2d78.42875049999999!3d17.4680899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb917445711053%3A0x88def353aa1d9ee9!2sThe%20Value%20Drive!5e0!3m2!1sen!2sin!4v1755932155450!5m2!1sen!2sin" 
                    width="100%" 
                    height="300" 
                    style={{border: 0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Epic Luxe */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Epic Luxe</h3>
                  <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Luxury pre-owned collection</p>
                </div>
                <div className="rounded-lg overflow-hidden border border-[#D4AF37]/20">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.6654235209185!2d78.37055660000001!3d17.379825300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb95dcdd52313b%3A0xd78ccbe822458e7c!2sEPIC%20Luxe%20Pre-Owned%20Cars!5e0!3m2!1sen!2sin!4v1755932257555!5m2!1sen!2sin" 
                    width="100%" 
                    height="300" 
                    style={{border: 0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="p-6 border-t border-[#D4AF37]/10">
              <button
                onClick={() => setShowMapPopup(false)}
                className="w-full bg-transparent border border-[#D4AF37]/30 text-[#D4AF37] px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-white overflow-x-hidden pt-12" style={{ fontFamily: 'Manrope, sans-serif' }}>
        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image with Motion */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/assets/images/newAboutUs.jpeg"
              alt="About Us Background"
              fill
              priority
              className="object-cover"
              quality={95}
            />
          </motion.div>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50"></div>
          {/* Additional amber overlay for brand consistency */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          {/* To move text up, you can:
              1. Change mb-8 to mb-4 (less bottom margin)
              2. Change mb-8 to mb-0 (no bottom margin)  
              3. Add negative margin like -mt-8 or -mt-12
              4. Reduce mb-20 in the h1 to mb-12 or mb-8
          */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-10"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {/* The mb-20 here creates large bottom margin. 
                  To move text up, change mb-20 to:
                  - mb-12 (medium spacing)
                  - mb-8 (small spacing)  
                  - mb-4 (very small spacing)
              */}
              Driven by Trust.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]">
                Defined by Excellence.
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Epic Luxe & Epic Reassured by RAAM Group – one of India&apos;s leading automotive groups with 2000+ professionals and partnerships across six global brands.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button 
              onClick={() => window.location.href = '/luxe'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-[#D4AF37] to-[#BFA980] hover:from-[#BFA980] hover:to-[#D4AF37] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl flex items-center gap-3 active:scale-90"
            >
              Explore Epic Luxe
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              onClick={() => window.location.href = '/reassured'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20 flex items-center gap-3 hover:shadow-xl active:scale-90"
            >
              Explore Epic Reassured
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          
        </div>

        
      </motion.section>

      {/* The RAAM Group Legacy */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              The RAAM Group{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA980]">
                Legacy
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over a decade of automotive excellence, building trust through transparency and delivering unparalleled service across India&apos;s premium automotive landscape.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              { value: 12, suffix: "+", label: "Years of Excellence", description: "Building automotive trust since 2011", showRupee: false },
              { value: 2000, suffix: "+", label: "Professionals", description: "Dedicated team driving growth to 5000+", showRupee: false },
              { value: 2000, suffix: " Cr+", label: "Revenue", description: "Targeting ₹8000 Cr in next 5 years", showRupee: true },
              { value: 6, suffix: "", label: "Global Brands", description: "Authorized partnerships with top OEMs", showRupee: false }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col justify-between min-h-[250px]">
                  <div className="text-4xl lg:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {stat.showRupee ? '₹' : ''}<AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-lg font-semibold text-[#D4AF37] mb-3">{stat.label}</div>
                  <p className="text-gray-600 text-sm">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA980]">
                Journey
              </span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From our humble beginnings in 2011 to becoming one of India&apos;s leading automotive groups, discover the milestones that define our legacy.
            </p>
          </motion.div>

          {/* Horizontal Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Desktop Horizontal Timeline */}
            <div className="hidden md:block">
              {/* Timeline Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex flex-col items-center"
                  >
                    {/* Content Card */}
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:scale-105 h-full flex flex-col justify-between min-h-[220px] w-full">
                      <div className="flex-grow">
                        <div className="text-2xl font-bold text-[#D4AF37] mb-3 text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {milestone.year}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>{milestone.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 text-center leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>{milestone.description}</p>
                    </div>
                    {/* Timeline connector line */}
                    {index < milestones.length - 1 && (
                      <div className="hidden xl:block absolute top-1/2 left-full w-6 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] transform -translate-y-1/2 z-10" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Slider Timeline */}
            <div className="block md:hidden">
              <div className="relative max-w-sm mx-auto">
                {/* Single Card Display */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center min-h-[200px] flex flex-col justify-between">
                  <div className="flex-grow">
                    <div className="text-2xl font-bold text-[#D4AF37] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {milestones[currentMobileIndex].year}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>{milestones[currentMobileIndex].title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>{milestones[currentMobileIndex].description}</p>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {milestones.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMobileIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index === currentMobileIndex ? 'bg-[#BFA980]' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to milestone ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center mt-4">
                  <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {currentMobileIndex + 1} of {milestones.length}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Epic Luxe & Epic Reassured Difference */}
      <section className="py-20 lg:py-32 relative overflow-hidden" style={{background: '#000000'}}>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Two Brands.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]">
                One Promise.
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Whether you seek the pinnacle of luxury or the assurance of quality, both Epic Luxe and Epic Reassured deliver excellence tailored to your aspirations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Epic Luxe */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 lg:p-12 border border-[#BFA980]/20 hover:border-[#BFA980]/40 transition-all duration-500 overflow-hidden relative h-full flex flex-col min-h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#BFA980] to-[#D4AF37] rounded-xl flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Epic Luxe
                    </h3>
                  </div>
                  
                  <div className="text-2xl text-[#D4AF37] font-semibold mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>&quot;For the Few Who Can&quot;</div>
                  
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed flex-grow" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Curated collection of the world&apos;s finest luxury automobiles. Each vehicle undergoes meticulous authentication, ensuring that your investment in luxury is matched by uncompromising quality and prestige.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Hand-selected luxury vehicles",
                      "Comprehensive authenticity verification",
                      "White-glove service experience",
                      "Exclusive after-sales support"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#BFA980] rounded-full mr-3"></div>
                        <span className="text-gray-300" style={{ fontFamily: 'Manrope, sans-serif' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="group/btn bg-gradient-to-r from-[#D4AF37] to-[#BFA980] hover:from-[#BFA980] hover:to-[#D4AF37] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 w-full justify-center mt-auto" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Explore Luxury Collection
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Epic Reassured */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-100 to-white rounded-3xl p-8 lg:p-12 border border-gray-200 hover:border-gray-300 transition-all duration-500 overflow-hidden relative h-full flex flex-col min-h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Epic Reassured
                    </h3>
                  </div>
                  
                  <div className="text-2xl text-gray-700 font-semibold mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>&quot;Confidence in Every Drive&quot;</div>
                  
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed flex-grow" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Rigorously certified pre-owned vehicles that deliver reliability without compromise. Every car undergoes comprehensive multi-point inspection, ensuring peace of mind for families who value dependability.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Multi-point quality inspection",
                      "Transparent history reports",
                      "Comprehensive warranty coverage",
                      "Dedicated customer support"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-gray-700 rounded-full mr-3"></div>
                        <span className="text-gray-600" style={{ fontFamily: 'Manrope, sans-serif' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="group/btn bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 w-full justify-center mt-auto" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Explore Certified Collection
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Our Core{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA980]">
                Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Manrope, sans-serif' }}>
              The principles that drive our 2000+ professionals and shape every interaction with our customers across India&apos;s automotive landscape.
            </p>
          </motion.div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#BFA980]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Icon and Title in Same Row */}
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#BFA980] to-[#D4AF37] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {value.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Slider Layout */}
          <div className="block md:hidden">
            <div className="relative max-w-sm mx-auto">
              {/* Single Card Display */}
              <motion.div
                key={currentValueIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center min-h-[250px] flex flex-col justify-between">
                  <div className="relative z-10">
                    {/* Icon and Title in Same Row */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#BFA980] to-[#D4AF37] rounded-xl flex items-center justify-center mr-3">
                        {React.createElement(values[currentValueIndex].icon, { className: "w-6 h-6 text-white" })}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {values[currentValueIndex].title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {values[currentValueIndex].description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {values.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentValueIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentValueIndex ? 'bg-[#BFA980]' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to value ${index + 1}`}
                  />
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center mt-4">
                <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {currentValueIndex + 1} of {values.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Presence & Network */}
      <section className="py-20 lg:py-32 relative overflow-hidden" style={{background: '#000000'}}>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]">
                Network
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Strategic presence across India&apos;s key automotive markets, with flagship operations and growing footprint in major metropolitan cities.
            </p>
          </motion.div>

          {/* Interactive Map Representation */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <h3 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>Our Locations</h3>
              <div className="space-y-6 flex-grow">
                {locations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors duration-300">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-4 ${location.flagship ? 'bg-[#BFA980]' : 'bg-gray-400'}`}></div>
                      <div>
                        <div className="text-white font-semibold text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>{location.city}</div>
                        <div className="text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>{location.state}</div>
                      </div>
                    </div>
                    <div className="text-[#D4AF37] font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{location.presence}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <h3 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>Brand Partners</h3>
              <div className="grid grid-cols-3 gap-4 flex-grow">
                {brands.map((brand, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-all duration-300 transform hover:scale-105 text-center group h-full flex flex-col justify-center min-h-[120px]"
                  >
                    <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center p-1 group-hover:shadow-lg transition-shadow duration-300">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={32}
                        height={32}
                        className="object-contain max-w-full max-h-full"
                      />
                    </div>
                    <div className="text-white font-semibold mb-1 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>{brand.name}</div>
                    <div className="text-gray-400 text-xs" style={{ fontFamily: 'Manrope, sans-serif' }}>{brand.category}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Network Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 5, label: "Major States", suffix: "" },
              { number: 15, label: "Cities", suffix: "+" },
              { number: 6, label: "Brand Partners", suffix: "" },
              { number: 50, label: "Touch Points", suffix: "+" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#D4AF37] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-gray-300" style={{ fontFamily: 'Manrope, sans-serif' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Final Call to Action */}
      <section className="py-20 lg:py-32 relative overflow-hidden" style={{background: '#000000'}}>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Whether you choose luxury or{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]">
                trusted pre-owned
              </span>
            </h2>
            
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12" style={{ fontFamily: 'Manrope, sans-serif' }}>
              RAAM Group ensures one thing: <strong className="text-white">Excellence at every step.</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
              <motion.button
                onClick={() => window.location.href = '/luxe'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-[#D4AF37] to-[#BFA980] hover:from-[#BFA980] hover:to-[#D4AF37] text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center shadow-2xl cursor-pointer active:scale-90"
              >
                Explore Epic Luxe
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                onClick={() => window.location.href = '/reassured'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center border border-white/20 shadow-2xl cursor-pointer active:scale-90"
              >
                Explore Epic Reassured
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <MapPin className="w-8 h-8 text-[#BFA980] mx-auto mb-4" />
              <div className="text-white font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Visit Our Showroom</div>
              <button
                onClick={() => setShowMapPopup(true)}
                className="text-[#D4AF37] hover:text-[#BFA980] transition-colors duration-300 font-semibold text-sm border border-[#D4AF37] hover:border-[#BFA980] px-4 py-2 rounded-lg"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Get Direction
              </button>
            </div>
            
            <div className="text-center">
              <Users className="w-8 h-8 text-[#BFA980] mx-auto mb-4" />
              <div className="text-white font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Expert Consultation</div>
              <div className="text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>2000+ Professionals Ready to Help</div>
            </div>
            
            <div className="text-center">
              <Award className="w-8 h-8 text-[#BFA980] mx-auto mb-4" />
              <div className="text-white font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Trusted Excellence</div>
              <div className="text-gray-400" style={{ fontFamily: 'Manrope, sans-serif' }}>Top 10 Dealer in India</div>
            </div>
          </motion.div>
        </div>
      </section>
      </main>
    </>
  )
}

export default AboutUsClient