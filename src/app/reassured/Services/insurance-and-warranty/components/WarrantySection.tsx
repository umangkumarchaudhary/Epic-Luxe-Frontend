'use client'

import { useState } from 'react'
import Image from 'next/image'

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

  return (
    <section id="warranty" className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-4">
            Every Epic Reassured Car Comes with a 1-Year Warranty
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            It's not just a pre-owned car. It's a promise that lasts.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-3xl overflow-hidden">
            <Image
              src="/warranty-car.jpg"
              alt="Pre-owned cars with warranty in Hyderabad Chennai Vizag Pune"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <ul className="space-y-4">
              {warrantyFeatures.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-start p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                    activeFeature === index ? 'bg-black text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <svg className="w-6 h-6 mr-4 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
