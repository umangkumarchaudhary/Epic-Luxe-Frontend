'use client'

import { useEffect, useRef } from 'react'

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
      { threshold: 0.5 }
    )

    if (timelineRef.current) {
      observer.observe(timelineRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-4">
            Never Miss a Renewal Again
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            From reminders to doorstep document pickup — we make renewals as effortless as possible
          </p>

          <div ref={timelineRef} className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-4">
            <div className="timeline-step opacity-0 transform translate-y-4 transition-all duration-700">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="font-semibold mb-2">Reminder Sent</h3>
              <p className="text-gray-600">30 days before expiry</p>
            </div>

            <div className="hidden md:block flex-1 h-1 bg-gray-300"></div>

            <div className="timeline-step opacity-0 transform translate-y-4 transition-all duration-700">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="font-semibold mb-2">Renewal Request</h3>
              <p className="text-gray-600">Simple online process</p>
            </div>

            <div className="hidden md:block flex-1 h-1 bg-gray-300"></div>

            <div className="timeline-step opacity-0 transform translate-y-4 transition-all duration-700">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="font-semibold mb-2">Policy Delivered</h3>
              <p className="text-gray-600">Instant digital copy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
