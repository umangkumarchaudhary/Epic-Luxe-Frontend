'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'
import Head from 'next/head'

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const iconDelayed = {
  initial: { opacity: 0, y: 20, scale: 0.9 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      delay: 0.1,
      ease: [0.21, 0.47, 0.32, 0.98] 
    }
  }
}

// Minimalist line icons as inline SVG
const CertifiedIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-current">
    <path d="M16 2L20 6H26V12L30 16L26 20V26H20L16 30L12 26H6V20L2 16L6 12V6H12L16 2Z" 
          stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16L15 19L20 14" stroke="currentColor" strokeWidth="1.5" 
          fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TransparencyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-current">
    <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" 
          strokeWidth="1.5" fill="none"/>
    <path d="M4 12h24" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const ExclusiveIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-current">
    <path d="M12 2L16 6L20 2L30 12L26 16L30 20L20 30L16 26L12 30L2 20L6 16L2 12L12 2Z" 
          stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
)

const ConciergeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-current">
    <path d="M16 16C19.3137 16 22 13.3137 22 10C22 6.68629 19.3137 4 16 4C12.6863 4 10 6.68629 10 10C10 13.3137 12.6863 16 16 16Z" 
          stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M6 28C6 22.4772 10.4772 18 16 18C21.5228 18 26 22.4772 26 28" 
          stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M16 22V26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 24H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const NetworkIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-current">
    <circle cx="16" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="24" cy="4" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="8" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="24" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 8H20" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 4L12 8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M20 8L24 4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 20L12 16" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M20 16L24 20" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

interface WhyChooseUsProps {
  className?: string
}

const Section3WhyChooseUs: React.FC<WhyChooseUsProps> = ({ className = '' }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Micro-parallax transform - very subtle movement
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"])
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1.04])

  const whyChoosePoints = [
    {
      icon: <CertifiedIcon />,
      title: "Certified & Provenance-Verified Vehicles",
      id: "certified"
    },
    {
      icon: <TransparencyIcon />,
      title: "Transparent Ownership Process",
      id: "transparency"
    },
    {
      icon: <ExclusiveIcon />,
      title: "Exclusive Access to Limited Stock",
      id: "exclusive"
    },
    {
      icon: <ConciergeIcon />,
      title: "Concierge-Level Customer Service",
      id: "concierge"
    },
    {
      icon: <NetworkIcon />,
      title: "Nationwide After-Sales Network",
      id: "network"
    }
  ]

  // Analytics tracking
  const trackAnalytics = (label: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'epic_cars_interaction',
        section: 'why_choose_us',
        label: label
      })
    }
  }

  return (
    <>
      <Head>
        <title>Why Choose Epic Cars | Raam Group</title>
        <meta name="description" content="Discover why Epic Cars stands above the rest with certified vehicles, transparent processes, exclusive access, concierge service, and nationwide support." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Epic Cars",
            "parentOrganization": {
              "@type": "Organization",
              "name": "Raam Group"
            },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Why Choose Epic Cars",
              "itemListElement": whyChoosePoints.map((point, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Service",
                  "name": point.title
                }
              }))
            }
          })}
        </script>
      </Head>

      <section 
        ref={sectionRef}
        className={`relative min-h-screen overflow-hidden ${className}`}
        style={{
          '--luxe-black': '#000000',
          '--luxe-gold': '#D4AF37',
          '--ink': '#1C1C1C',
          '--ivory': '#FAFAFA',
          '--charcoal': '#0F0F10',
          '--champagne': '#EAD9B8',
          '--mid-grey': '#D3D3D3'
        } as React.CSSProperties}
        aria-labelledby="why-choose-heading"
      >
        {/* Micro-parallax background */}
        <motion.div
          ref={backgroundRef}
          className="absolute inset-0 -z-10"
          style={{ 
            y: backgroundY,
            scale: backgroundScale,
            backgroundColor: 'var(--charcoal)'
          }}
        >
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-opacity='1'%3E%3Cpolygon fill='%23ffffff' points='36,1 14,1 12,16 61,16'/%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '60px 60px'
               }}
          />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 py-24 lg:py-32">
          <motion.div
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={stagger}
            className="max-w-7xl mx-auto"
          >
            {/* Section Header */}
            <motion.div 
              variants={fadeUp}
              className="text-center mb-20"
            >
              <motion.h2
  id="why-choose-heading"
  className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6"
  style={{
    fontFamily: 'Cormorant Garamond, serif',
    background: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 25%, #F4E4C1 50%, #FFD700 75%, #D4AF37 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.02em'
  }}
>
  Why Choose Epic Cars
</motion.h2>

              
              {/* Gold hairline divider */}
              <motion.div 
                className="w-24 h-px mx-auto"
                style={{ backgroundColor: 'var(--luxe-gold)' }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.div>

            {/* Two-column luxury grid */}
            <motion.div 
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
            >
              {whyChoosePoints.map((point, index) => (
                <motion.div
                  key={point.id}
                  variants={fadeUp}
                  className="group cursor-pointer"
                  onClick={() => trackAnalytics(point.id)}
                  onFocus={() => trackAnalytics(point.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Learn more about ${point.title}`}
                >
                  <div className="flex items-start space-x-6 p-8 rounded-lg transition-all duration-500 hover:bg-black/20 focus:bg-black/20 focus:outline-2 focus:outline-offset-2 focus:outline-yellow-400">
                    {/* Icon */}
                    <motion.div
                      variants={iconDelayed}
                      className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                      style={{ color: 'var(--luxe-gold)' }}
                    >
                      {point.icon}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 
                        className="text-xl lg:text-2xl font-light leading-relaxed group-hover:scale-[1.02] transition-transform duration-300"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          color: 'var(--ivory)',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {point.title}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom hairline divider for visual separation */}
                  {index < whyChoosePoints.length - 1 && (
                    <motion.div 
                      className="mt-8 h-px"
                      style={{ backgroundColor: 'var(--mid-grey)', opacity: 0.1 }}
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Subtle call-to-action */}
            <motion.div
              variants={fadeUp}
              className="text-center mt-20"
            >
              <motion.p
                className="text-lg font-light opacity-80 max-w-2xl mx-auto leading-relaxed"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--mid-grey)',
                  letterSpacing: '0.01em'
                }}
              >
                Experience the difference that comes with choosing 
                <span style={{ color: 'var(--champagne)' }}> Epic Cars</span>
                —where luxury meets uncompromising service.
              </motion.p>
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
    </>
  )
}

export default Section3WhyChooseUs;