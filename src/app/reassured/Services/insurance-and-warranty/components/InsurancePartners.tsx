'use client'

import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { Shield, Clock, HeartHandshake, Award } from 'lucide-react'

const InsurancePartners = () => {
  const partners = [
    {
      id: 1,
      name: 'Bajaj Allianz',
      logo: '/assets/images/bajaj2.png',
      alt: 'ICICI Lombard car insurance Hyderabad Chennai luxury vehicle coverage',
      brandColor: 'hover:bg-orange-50'
    },
    {
      id: 2,
      name: 'ICICI',
      logo: '/assets/images/icici.jfif',
      alt: 'HDFC ERGO premium car insurance Pune Vizag comprehensive vehicle protection',
      brandColor: 'hover:bg-red-50'
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Comprehensive Coverage',
      description:
        'Complete protection for your luxury vehicle including theft, accidents, and natural disasters with zero depreciation options.'
    },
    {
      icon: Clock,
      title: 'Instant Claims',
      description:
        'Express claim settlement within 24 hours through our dedicated luxury car service network across all major cities.'
    },
    {
      icon: HeartHandshake,
      title: 'Doorstep Service',
      description:
        'Premium concierge service including vehicle pickup, documentation, and delivery right to your location.'
    },
    {
      icon: Award,
      title: 'Premium Add-ons',
      description:
        'Exclusive benefits like key replacement, engine protection, and return to invoice coverage for ultimate peace of mind.'
    }
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const // ✅ Type-safe literal
      }
    }
  }

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/trustedPartner.png"
          alt="Trusted insurance partners background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-gray-50/80 to-amber-50/70"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 leading-tight"
          >
            Insurance Backed by Industry Leaders
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            We partner with India&apos;s most trusted providers to keep your drive worry-free
          </motion.p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                variants={itemVariants}
                className={`group bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:scale-105 hover:bg-white ${partner.brandColor}`}
                role="article"
                aria-label={`Insurance partner: ${partner.name}`}
              >
                <div className="aspect-[5/2] relative mb-4 flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.alt}
                    width={200}
                    height={80}
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 max-w-full h-auto"
                    priority
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center group-hover:text-gray-900 transition-colors duration-300">
                  {partner.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
                role="article"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300 border border-gray-200">
                    <benefit.icon size={24} className="text-gray-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed ml-16">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          role="separator"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}

export default InsurancePartners
