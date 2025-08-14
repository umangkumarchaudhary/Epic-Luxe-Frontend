'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const warrantyFeatures = [
  '1-Year Comprehensive Coverage',
  'Covers Major Components & Electronics',
  'No-Cost Repairs at Authorized Service Points',
  'Pan-India Coverage',
  'Transferable Warranty',
  '24/7 Customer Support'
]

export default function WarrantySection() {
  const [activeFeature, setActiveFeature] = useState(0)

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  }

  return (
    <section
      id="warranty"
      className="relative py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden"
    >
      {/* Background premium glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-[#000]/5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-4">
            Every Epic Reassured Car Comes with a&nbsp;
            <span className="bg-gradient-to-r from-[#D4AF37] to-yellow-400 bg-clip-text text-transparent font-semibold">
              1-Year Warranty
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            It&apos;s not just a pre-owned car. It&apos;s a promise that lasts.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Premium image with floating effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-gray-400/20"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/30 via-transparent to-transparent z-10 pointer-events-none"></div>
            <Image
              src="/assets/images/warranty.png"
              alt="Pre-owned cars with warranty in Hyderabad, Chennai, Vizag, Pune"
              fill
              className="object-cover scale-105 hover:scale-110 transition-transform duration-700 ease-out"
            />
          </motion.div>

          {/* Features list */}
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {warrantyFeatures.map((feature, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                onClick={() => setActiveFeature(index)}
                className={`flex items-start p-4 rounded-2xl cursor-pointer transition-all duration-300 
                  backdrop-blur-md border ${
                    activeFeature === index
                      ? 'bg-gradient-to-r from-black to-gray-800 text-white border-gray-700 shadow-lg shadow-black/30'
                      : 'bg-white/80 hover:bg-white border-gray-200 hover:shadow-lg hover:shadow-gray-300/40'
                  }`}
              >
                <motion.svg
                  className="w-6 h-6 mr-4 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ rotate: -20, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 
                      8a1 1 0 01-1.414 0l-4-4a1 
                      1 0 011.414-1.414L8 
                      12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </motion.svg>
                <span className="text-lg font-medium">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
