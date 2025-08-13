'use client'

import { useEffect, useRef, useState } from 'react'

const partners = [
  { name: 'HDFC ERGO', logo: '/hdfc-ergo.png' },
  { name: 'ICICI Lombard', logo: '/icici-lombard.png' },
  { name: 'Bajaj Allianz', logo: '/bajaj-allianz.png' },
  { name: 'Tata AIG', logo: '/tata-aig.png' },
]

const benefits = [
  {
    icon: '⚡',
    title: 'Instant Policy Issuance',
    description: 'Get your insurance policy in minutes, not days'
  },
  {
    icon: '🔧',
    title: 'Cashless Repairs',
    description: 'Authorized service centers across Hyderabad, Chennai, Vizag, Pune'
  },
  {
    icon: '🛡️',
    title: 'Zero Depreciation',
    description: 'Add-ons available for complete protection'
  },
  {
    icon: '🔄',
    title: 'Renewal in Minutes',
    description: 'Quick and hassle-free renewal process'
  },
]

export default function InsurancePartners() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="insurance" ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-4">
            Insurance Backed by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We partner with India's most trusted insurance providers to keep your drive worry-free
          </p>
        </div>

        {/* Partner Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`flex items-center justify-center p-8 bg-gray-50 rounded-2xl hover:shadow-xl transition-all duration-700 transform hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl font-bold">{partner.name}</div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 4) * 100}ms` }}
            >
              <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-black transition-all duration-300 h-full">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}