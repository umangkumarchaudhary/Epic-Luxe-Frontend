'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 98, suffix: '%', label: 'Claim Approval Rate' },
  { value: 500, suffix: '+', label: 'Authorized Service Centers' },
  { value: 24, suffix: 'hrs', label: 'Average Claim Settlement' },
  { value: 100, suffix: '%', label: 'Genuine Spare Parts' },
]

export default function StatsSection() {
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
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-center mb-16">
          Why Choose Epic Reassured Coverage
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  {isVisible && (
                    <CountUp end={stat.value} duration={2000} />
                  )}
                  <span className="text-3xl md:text-4xl">{stat.suffix}</span>
                </div>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CountUp({ end, duration }: { end: number; duration: number }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime: number
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / duration
      
      if (progress < 1) {
        setCount(Math.floor(end * progress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])
  
  return <span>{count}</span>
}