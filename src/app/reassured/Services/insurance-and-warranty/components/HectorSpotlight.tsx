'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HectorSpotlight() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-400 uppercase tracking-wider mb-4">Exclusive Partnership</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6">
              Drive the Hector,<br />Worry-Free for 3 Years
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              As an authorized MG partner, we're offering an exclusive 3-Year Warranty on every new Hector.
            </p>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="text-2xl mr-4">✓</span>
                  <span className="text-lg">Unlimited Kilometres Coverage</span>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-4">✓</span>
                  <span className="text-lg">Genuine MG Parts</span>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-4">✓</span>
                  <span className="text-lg">24x7 Roadside Assistance</span>
                </li>
              </ul>
            </div>
            
            <Link href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-white text-black border border-transparent rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300 transform hover:scale-105">
              Explore MG Hector
            </Link>
          </div>
          
          <div className="relative h-[600px] rounded-3xl overflow-hidden">
            <Image
              src="/mg-hector.jpg"
              alt="MG Hector 3 Year Warranty Hyderabad Chennai Vizag Pune"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
