'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function RenewalSection() {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.timeline-step')
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.remove('opacity-0', 'translate-y-4')
                step.classList.add('opacity-100', 'translate-y-0')
              }, index * 300)
            })
          }
        })
      },
      { threshold: 0.4 }
    )

    if (timelineRef.current) {
      observer.observe(timelineRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/PolicyRenewal.png"
          alt="Luxury car policy renewal service"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-4">
            Never Miss a{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] to-yellow-400 bg-clip-text text-transparent font-semibold">
              Renewal
            </span>{' '}
            Again
          </h2>
          <p className="text-xl text-gray-700 mb-16">
            From reminders to doorstep document pickup — we make renewals as effortless as possible
          </p>
        </motion.div>

        {/* Timeline */}
        <div
          ref={timelineRef}
          className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 md:space-x-8"
        >
          {[
            { num: 1, title: 'Reminder Sent', desc: '30 days before expiry' },
            { num: 2, title: 'Renewal Request', desc: 'Simple online process' },
            { num: 3, title: 'Policy Delivered', desc: 'Instant digital copy' }
          ].map((step, index) => (
            <div
              key={index}
              className="timeline-step opacity-0 transform translate-y-4 transition-all duration-700 flex flex-col items-center text-center max-w-xs"
            >
              {/* Number Circle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white shadow-xl shadow-black/30 border-2 border-[#D4AF37]"
              >
                {step.num}
              </motion.div>

              {/* Title */}
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.desc}</p>

              {/* Connector line (desktop only) */}
              {index < 2 && (
                <div className="hidden md:block absolute top-[50%] right-[-50%] w-[100%] h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
