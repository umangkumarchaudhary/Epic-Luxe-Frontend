'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EpicShieldClient = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const benefits = [
    {
      id: 1,
      title: "Labour Worth",
      value: "₹5 Lakhs",
      condition: "Anypoint of time",
      icon: "🔧",
      description: "Complete labor coverage for all repairs and maintenance"
    },
    {
      id: 2,
      title: "Free Panel Denting and Painting",
      value: "₹3.6 Lakhs",
      condition: "Total 24 - 4 Panels per year",
      icon: "🎨",
      description: "Professional denting and painting services"
    },
    {
      id: 3,
      title: "Inflation Affect",
      value: "₹1.55 Lakhs",
      condition: "For 6 years",
      icon: "📈",
      description: "Protection against inflation on service costs"
    },
    {
      id: 4,
      title: "Extended Warranty",
      value: "₹1.5 Lakhs",
      condition: "Engine and transmission coverage - 1 year",
      icon: "🛡️",
      description: "Comprehensive engine and transmission protection"
    },
    {
      id: 5,
      title: "Free Exterior and Interior Cleaning",
      value: "₹0.9 Lakhs",
      condition: "Total 6 times - Once a year",
      icon: "✨",
      description: "Professional detailing services"
    },
    {
      id: 6,
      title: "Discount on Insurance Renewal",
      value: "₹0.9 Lakhs",
      condition: "Total 6 times - Once a year (Discount of Rs.15K)",
      icon: "💰",
      description: "Significant savings on insurance premiums"
    },
    {
      id: 7,
      title: "Free Wheel Alignment and Balancing",
      value: "₹0.45 Lakhs",
      condition: "Total 6 times - Once a year",
      icon: "⚖️",
      description: "Maintain perfect wheel alignment and balance"
    },
    {
      id: 8,
      title: "Free Pick up and Drop",
      value: "₹0.1 Lakhs",
      condition: "Total 12 times - Twice a year",
      icon: "🚗",
      description: "Convenient pickup and drop-off service"
    }
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      vehicle: "BMW 3 Series",
      rating: 5,
      comment: "EPIC Shield saved me over ₹3 lakhs in repairs. Absolutely worth every rupee!"
    },
    {
      name: "Priya Sharma",
      vehicle: "Mercedes C-Class",
      rating: 5,
      comment: "The peace of mind is priceless. Professional service, premium experience."
    },
    {
      name: "Amit Patel",
      vehicle: "Audi A4",
      rating: 5,
      comment: "Resale value protection and comprehensive coverage. Highly recommended!"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
        * {
          font-family: 'Manrope', sans-serif;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 2 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-yellow-400/20 to-transparent blur-3xl"
          ></motion.div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-right mb-4">
              <span className="text-red-500 font-bold text-xl tracking-wider">EPIC LUXE</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-extralight tracking-wider mb-6">
              EPIC <span className="text-[#D4AF37]">SHIELD</span>
            </h1>
            <p className="text-[#D4AF37] text-2xl md:text-3xl font-light mb-8 tracking-wide">
              Protect What Moves You, with EPIC Shield
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="bg-gradient-to-r from-[#D4AF37]/20 to-transparent p-8 rounded-2xl backdrop-blur-sm border border-[#D4AF37]/30 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Pay <span className="text-[#D4AF37] font-semibold">₹1.95 Lakhs</span>, 
              Enjoy <span className="text-[#D4AF37] font-semibold">₹12.5 Lakhs</span> benefits
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              And Get Your full ₹1.95 Lakhs refund at Resale
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-black px-12 py-4 rounded-full font-semibold text-xl hover:from-yellow-400 hover:to-[#D4AF37] transition-all duration-300"
            >
              Get EPIC Shield
            </motion.button>
          </motion.div>
        </div>

        {/* Floating Shield Animation */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 opacity-10"
        >
          <div className="w-32 h-32 border-4 border-[#D4AF37] rounded-full flex items-center justify-center">
            <span className="text-4xl">🛡️</span>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-light mb-6">
              Premium <span className="text-[#D4AF37]">Benefits</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive protection designed for discerning luxury car owners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setActiveCard(benefit.id)}
                onHoverEnd={() => setActiveCard(null)}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-[#D4AF37]/50 transition-all duration-300 h-full">
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {benefit.title}
                  </h3>
                  <div className="text-2xl font-bold text-[#D4AF37] mb-3">
                    {benefit.value}
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    {benefit.condition}
                  </p>
                  <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {benefit.description}
                  </p>
                </div>
                
                {activeCard === benefit.id && (
                  <motion.div
                    layoutId="activeCard"
                    className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-transparent rounded-2xl -z-10"
                  />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-[#D4AF37]/20 to-transparent p-6 rounded-2xl backdrop-blur-sm border border-[#D4AF37]/30">
              <span className="text-3xl font-bold text-[#D4AF37] mr-4">₹12.5L</span>
              <span className="text-xl">Total Benefits Value</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coverage Details */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900/50 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-light mb-6">
              Complete <span className="text-[#D4AF37]">Coverage</span>
            </h2>
            <p className="text-xl text-gray-300">
              Every panel, every component, comprehensively protected
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-3xl border border-[#D4AF37]/30"
          >
            <h3 className="text-2xl font-semibold mb-6 text-[#D4AF37]">Panels Covered:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Front Bumper", "Rear Bumper", "Bonnet / Hood", "Roof",
                "Boot / Trunk", "Rear Left Quarter Panel", "Rear Right Quarter Panel",
                "All 4 Doors", "Front Left Fender", "Front Right Fender"
              ].map((panel, index) => (
                <motion.div
                  key={panel}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-black/50 p-4 rounded-xl border border-gray-800 hover:border-[#D4AF37]/50 transition-all duration-300"
                >
                  <span className="text-sm font-medium">{panel}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-light mb-6">
              Client <span className="text-[#D4AF37]">Experiences</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[#D4AF37] text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-[#D4AF37]">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.vehicle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#D4AF37]/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-6xl font-light mb-8">
              DRIVE CONFIDENTLY, WITH COMPLETE 
              <span className="text-[#D4AF37]"> PEACE OF MIND</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of satisfied luxury car owners who trust EPIC Shield
            </p>
            
            <div className="space-y-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-black px-16 py-6 rounded-full font-bold text-2xl hover:from-yellow-400 hover:to-[#D4AF37] transition-all duration-300 block w-full md:w-auto md:inline-block"
              >
                Get EPIC Shield Protection
              </motion.button>
              
              <div className="flex items-center justify-center space-x-4 text-lg">
                <span className="text-[#D4AF37]">📞</span>
                <span>For more details: </span>
                <a href="tel:7288866673" className="text-[#D4AF37] font-semibold hover:underline">
                  7288866673
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-[#D4AF37] font-bold text-2xl mb-4">EPIC LUXE</div>
          <p className="text-gray-400 mb-4">Premium Pre-Owned Luxury Vehicles</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>© 2025 EPIC Luxe. All rights reserved.</span>
            <span>|</span>
            <span>Privacy Policy</span>
            <span>|</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default EpicShieldClient