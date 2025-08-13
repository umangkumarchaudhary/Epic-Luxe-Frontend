// page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { X, Play, Car, Shield, Award, Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface FormData {
  fullName: string
  phone: string
  email: string
  carInterest: string
  campaignSource: string
  campaignName: string
}

const EpicLuxeLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    carInterest: '',
    campaignSource: 'Meta_Ads',
    campaignName: ''
  })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showExitIntent, setShowExitIntent] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    // Auto-open modal after 3 seconds
    const timer = setTimeout(() => {
      setIsModalOpen(true)
    }, 3000)

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitIntent(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate API call
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setIsModalOpen(false)
        setShowExitIntent(false)
        // Success handling
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const curatedCars = [
    { name: 'Bentley Continental GT', image: '/placeholder-bentley.jpg', reserved: false },
    { name: 'Porsche 911 Turbo S', image: '/placeholder-porsche.jpg', reserved: true },
    { name: 'Mercedes-AMG GT', image: '/placeholder-mercedes.jpg', reserved: false },
    { name: 'Maserati MC20', image: '/placeholder-maserati.jpg', reserved: false },
    { name: 'Aston Martin DB11', image: '/placeholder-aston.jpg', reserved: true },
    { name: 'Ferrari 488 GTB', image: '/placeholder-ferrari.jpg', reserved: false }
  ]

  const testimonials = [
    {
      quote: "Epic Luxe delivered my Porsche 911 in a sealed trailer, presented like art. The entire experience felt like joining an exclusive society.",
      name: "Marcus Chen",
      city: "Beverly Hills"
    },
    {
      quote: "From the private viewing to the white-glove delivery, every detail exceeded my expectations. This is how luxury should be curated.",
      name: "Isabella Rodriguez",
      city: "Manhattan"
    },
    {
      quote: "The provenance documentation and inspection report were museum-quality. I knew I was acquiring something truly exceptional.",
      name: "David Wellington",
      city: "Monaco"
    }
  ]

  const Modal = ({ isOpen, onClose, title, children }: any) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-90" onClick={onClose} />
        <div className="relative bg-black border border-[#D4AF37] p-8 max-w-md w-full mx-4 rounded-sm">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-[#D4AF37] transition-colors"
          >
            <X size={24} />
          </button>
          <h3 className="text-2xl font-playfair text-white mb-6">{title}</h3>
          {children}
        </div>
      </div>
    )
  }

  const ConciergeForm = () => (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          className="w-full p-3 bg-black border border-[#D4AF37] text-white placeholder-gray-400 focus:outline-none focus:border-white"
          required
        />
      </div>
      <div>
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full p-3 bg-black border border-[#D4AF37] text-white placeholder-gray-400 focus:outline-none focus:border-white"
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email Address (Optional)"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-3 bg-black border border-[#D4AF37] text-white placeholder-gray-400 focus:outline-none focus:border-white"
        />
      </div>
      <div>
        <select
          value={formData.carInterest}
          onChange={(e) => setFormData({...formData, carInterest: e.target.value})}
          className="w-full p-3 bg-black border border-[#D4AF37] text-white focus:outline-none focus:border-white"
        >
          <option value="">Car of Interest</option>
          <option value="bentley">Bentley</option>
          <option value="porsche">Porsche</option>
          <option value="mercedes">Mercedes-Benz</option>
          <option value="maserati">Maserati</option>
          <option value="ferrari">Ferrari</option>
          <option value="aston-martin">Aston Martin</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-[#D4AF37] text-black py-3 px-6 font-semibold hover:bg-white transition-all duration-300 transform hover:scale-[1.02]"
      >
        Send My Request
      </button>
    </form>
  )

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }}
        >
          <source src="/luxury-car-hero.mp4" type="video/mp4" />
        </video>
        
        <div className={`relative z-20 text-center max-w-4xl mx-auto px-4 transition-all duration-2500 ${
          isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <h1 className="text-5xl md:text-7xl font-playfair mb-6 leading-tight">
            Exclusivity in Motion
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto">
            Curated Pre-Owned Luxury Cars for the Discerning Few
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#D4AF37] text-black px-8 py-4 text-lg font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105 mb-4"
          >
            Request a Private Viewing
          </button>
          <p className="text-[#D4AF37] text-sm uppercase tracking-widest font-light">
            By Invitation Only
          </p>
        </div>
      </section>

      {/* Curated Collection */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair text-center mb-16">
            The Curated Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {curatedCars.map((car, index) => (
              <div key={index} className="group relative overflow-hidden cursor-pointer">
                <div className="aspect-[4/3] bg-gray-900 relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                          <rect width="400" height="300" fill="#1a1a1a"/>
                          <text x="200" y="150" font-family="serif" font-size="24" fill="#D4AF37" text-anchor="middle">
                            ${car.name}
                          </text>
                        </svg>
                      `)}`
                    }}
                  />
                  {car.reserved && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                      <span className="text-[#D4AF37] text-2xl font-playfair">Reserved</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-playfair mt-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {car.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Luxe Curation Process */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="aspect-square bg-gray-900 overflow-hidden">
                <img
                  src="/craftsmanship-detail.jpg"
                  alt="Luxury craftsmanship"
                  className="w-full h-full object-cover filter grayscale"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                        <rect width="400" height="400" fill="#1a1a1a"/>
                        <circle cx="200" cy="200" r="50" fill="none" stroke="#D4AF37" stroke-width="2"/>
                        <text x="200" y="280" font-family="serif" font-size="16" fill="#D4AF37" text-anchor="middle">
                          Craftsmanship Detail
                        </text>
                      </svg>
                    `)}`
                  }}
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-playfair">
                The Luxe Curation Process
              </h2>
              <div className="w-24 h-px bg-[#D4AF37]"></div>
              <p className="text-lg leading-relaxed text-gray-300">
                Every Epic Luxe automobile undergoes 300+ inspection points, marque-certified verification, 
                and provenance authentication. Only the extraordinary makes the cut.
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                Our master technicians examine every detail—from the precision of mechanical components 
                to the integrity of heritage materials. Each vehicle's story is documented, its legacy preserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Ownership Experience */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair text-center mb-16">
            Bespoke Ownership Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-12 h-12 text-[#D4AF37]" />,
                title: "White-Glove Delivery",
                description: "Your acquisition arrives in pristine condition, transported with museum-level care directly to your preferred location."
              },
              {
                icon: <Car className="w-12 h-12 text-[#D4AF37]" />,
                title: "Invitation-Only Test Drives",
                description: "Experience your potential acquisition in controlled, private settings designed to showcase its exceptional capabilities."
              },
              {
                icon: <Award className="w-12 h-12 text-[#D4AF37]" />,
                title: "Concierge Registration",
                description: "Our specialists handle all documentation, financing, and registration processes with absolute discretion and efficiency."
              }
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-b from-gray-900 to-black p-8 border border-gray-800 hover:border-[#D4AF37] transition-all duration-500">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-playfair mb-4">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limited Release Spotlight */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-96 md:h-[600px] overflow-hidden">
            <img
              src="/featured-bentley.jpg"
              alt="Featured Bentley Continental GT"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="1200" height="600" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#2a2a2a;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="1200" height="600" fill="url(#grad)"/>
                    <text x="600" y="280" font-family="serif" font-size="48" fill="#D4AF37" text-anchor="middle">
                      Bentley Continental GT
                    </text>
                    <text x="600" y="340" font-family="serif" font-size="24" fill="#ffffff" text-anchor="middle">
                      This Month's Featured
                    </text>
                  </svg>
                `)}`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
              <div className="p-8 md:p-16">
                <h2 className="text-4xl md:text-6xl font-playfair mb-4">
                  This Month's Featured: Bentley Continental GT
                </h2>
                <p className="text-[#D4AF37] text-xl md:text-2xl mb-8">
                  One of Three Available Nationwide
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#D4AF37] text-black px-8 py-4 text-lg font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105"
                >
                  Reserve Viewing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair text-center mb-16">
            Stories from Our Members
          </h2>
          <div className="relative">
            <div className="bg-gradient-to-b from-gray-900 to-black p-8 md:p-12 border border-gray-800 min-h-[300px] flex flex-col justify-center">
              <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-8 text-center">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div className="text-center">
                <div className="w-24 h-px bg-[#D4AF37] mx-auto mb-4"></div>
                <p className="text-[#D4AF37] font-playfair text-lg">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-gray-400 text-sm">
                  {testimonials[currentTestimonial].city}
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#D4AF37] hover:text-white transition-colors"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#D4AF37] hover:text-white transition-colors"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </section>

      {/* Private Invitation CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair mb-4">
            Begin Your Epic Luxe Journey
          </h2>
          <p className="text-[#D4AF37] text-sm uppercase tracking-widest mb-8">
            Limited Openings Weekly
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border border-[#D4AF37] text-white px-8 py-4 text-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            Request Invitation
          </button>
        </div>
      </section>

      {/* Sticky Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-sm md:text-base">🚗 Exclusive Access — Apply Now</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#D4AF37] text-black px-4 py-2 text-sm font-semibold hover:bg-white transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Concierge Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Private Viewing Request"
      >
        <ConciergeForm />
      </Modal>

      {/* Exit Intent Modal */}
      <Modal
        isOpen={showExitIntent}
        onClose={() => setShowExitIntent(false)}
        title="Before You Go — Reserve Your Slot"
      >
        <ConciergeForm />
      </Modal>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        video {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
}

export default EpicLuxeLanding