'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navClasses = isScrolled 
    ? 'fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-xl bg-white/90 shadow-lg py-4'
    : 'fixed top-0 w-full z-50 transition-all duration-300 bg-transparent py-6'

  const linkClasses = isScrolled 
    ? 'hover:opacity-70 transition text-black'
    : 'hover:opacity-70 transition text-white'

  const buttonClasses = isScrolled
    ? 'inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-black border border-transparent rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 transform hover:scale-105'
    : 'inline-flex items-center justify-center px-8 py-3 text-base font-medium bg-white text-black border border-transparent rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300 transform hover:scale-105'

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className={`text-2xl font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>
          Epic Reassured
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#insurance" className={linkClasses}>
            Insurance
          </Link>
          <Link href="#warranty" className={linkClasses}>
            Warranty
          </Link>
          <Link href="#locations" className={linkClasses}>
            Locations
          </Link>
          <Link href="#contact" className={buttonClasses}>
            Get Started
          </Link>
        </div>

        <button
          className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden backdrop-blur-xl bg-white/90 mt-4 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col space-y-4">
            <Link href="#insurance" className="text-black hover:opacity-70">Insurance</Link>
            <Link href="#warranty" className="text-black hover:opacity-70">Warranty</Link>
            <Link href="#locations" className="text-black hover:opacity-70">Locations</Link>
            <Link href="#contact" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-black border border-transparent rounded-full hover:bg-gray-900">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
