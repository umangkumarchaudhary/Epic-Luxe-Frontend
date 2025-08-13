'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'hyderabad',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setShowSuccess(true)
        setFormData({ name: '', phone: '', email: '', city: 'hyderabad', message: '' })
        setTimeout(() => setShowSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600">
            Ready to find your perfect pre-owned car? We're here to help.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-2">
                Preferred Location *
              </label>
              <select
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition"
              >
                <option value="hyderabad">Hyderabad</option>
                <option value="chennai">Chennai</option>
                <option value="vizag">Vizag</option>
                <option value="pune">Pune</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition resize-none"
              placeholder="Tell us about your requirements..."
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-black border border-transparent rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 transform hover:scale-105 min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
            </button>
          </div>

          {showSuccess && (
            <div className="bg-green-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-xl text-center opacity-0 animate-fade-in-up">
              Thank you! We'll get back to you within 24 hours.
            </div>
          )}
        </form>

        {/* Location Cards */}
        <div id="locations" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            { city: 'Hyderabad', address: 'Banjara Hills, Road No. 12', phone: '+91 98765 43210' },
            { city: 'Chennai', address: 'Anna Nagar, 2nd Avenue', phone: '+91 98765 43211' },
            { city: 'Vizag', address: 'MVP Colony, Main Road', phone: '+91 98765 43212' },
            { city: 'Pune', address: 'Koregaon Park, Lane 5', phone: '+91 98765 43213' },
          ].map((location) => (
            <div key={location.city} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-lg mb-2">{location.city}</h3>
              <p className="text-gray-600 text-sm mb-2">{location.address}</p>
              <a href={`tel:${location.phone}`} className="text-black font-medium hover:underline">
                {location.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}