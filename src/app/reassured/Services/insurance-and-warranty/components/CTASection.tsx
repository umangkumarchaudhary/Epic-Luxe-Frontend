'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function CTASection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }
  }, [])

  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/driving-video.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 text-center text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-8">
          Your Car Deserves the Best.
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-white text-black border border-transparent rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 transform hover:scale-105"
          >
            Request a Call Back
          </Link>
          <Link 
            href="#quote" 
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  )
}


