'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Phone, Mail, MapPin, Check, ArrowRight, Clock, User, MessageSquare } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  carInterest: string;
  contactMethod: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    carInterest: '',
    contactMethod: 'phone',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string>('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          carInterest: '',
          contactMethod: 'phone',
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
      <Header />
      
      {/* Hero Section - Minimal and Clean */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-extralight text-black mb-6 tracking-tight leading-[0.9]">
              Contact
            </h1>
            <p className="text-lg md:text-xl text-black/70 font-light max-w-2xl mx-auto leading-relaxed">
              Experience premium automotive excellence. Our specialists are ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Single Screen Layout */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Phone */}
              <div className="group">
                <div className="border border-black/10 rounded-2xl p-6 hover:border-black/30 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-black">Call</h3>
                      <p className="text-sm text-black/60">Immediate assistance</p>
                    </div>
                  </div>
                  <p className="text-black font-medium mb-4">+91 98765 43210</p>
                  <button 
                    onClick={() => window.open('tel:+919876543210')}
                    className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Call Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <div className="border border-black/10 rounded-2xl p-6 hover:border-black/30 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-black">Email</h3>
                      <p className="text-sm text-black/60">Detailed inquiries</p>
                    </div>
                  </div>
                  <p className="text-black font-medium mb-4">contact@raamgroup.com</p>
                  <button 
                    onClick={() => window.open('mailto:contact@raamgroup.com')}
                    className="w-full border border-black text-black py-3 rounded-full font-medium hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    Send Email
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="group">
                <div className="border border-black/10 rounded-2xl p-6 hover:border-black/30 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-black">Visit</h3>
                      <p className="text-sm text-black/60">Experience center</p>
                    </div>
                  </div>
                  <p className="text-black font-medium mb-2">Hi-Tech City, Hyderabad</p>
                  <p className="text-black/60 text-sm mb-4">Telangana 500081</p>
                  <div className="flex items-center gap-2 text-sm text-black/60 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>Mon - Sun: 9:00 AM - 8:00 PM</span>
                  </div>
                  <button className="w-full border border-black text-black py-3 rounded-full font-medium hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2">
                    Get Directions
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="border border-black/10 rounded-3xl p-8 md:p-12">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-light text-black mb-4">Get in Touch</h2>
                  <p className="text-black/60 font-light">Tell us about your automotive needs and preferences.</p>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div className="relative">
                        <label 
                          htmlFor="name" 
                          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                            focusedField === 'name' || formData.name 
                              ? 'top-3 text-xs text-black/60' 
                              : 'top-6 text-base text-black/40'
                          }`}
                        >
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField('')}
                          required
                          className="w-full h-16 pt-6 pb-2 px-4 bg-white border border-black/20 rounded-2xl focus:border-black focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Phone Field */}
                      <div className="relative">
                        <label 
                          htmlFor="phone" 
                          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                            focusedField === 'phone' || formData.phone 
                              ? 'top-3 text-xs text-black/60' 
                              : 'top-6 text-base text-black/40'
                          }`}
                        >
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField('')}
                          required
                          className="w-full h-16 pt-6 pb-2 px-4 bg-white border border-black/20 rounded-2xl focus:border-black focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <label 
                        htmlFor="email" 
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          focusedField === 'email' || formData.email 
                            ? 'top-3 text-xs text-black/60' 
                            : 'top-6 text-base text-black/40'
                        }`}
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        required
                        className="w-full h-16 pt-6 pb-2 px-4 bg-white border border-black/20 rounded-2xl focus:border-black focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Car Interest */}
                    <div className="relative">
                      <label htmlFor="carInterest" className="block text-sm text-black/60 mb-2 font-medium">
                        Vehicle of Interest
                      </label>
                      <select
                        id="carInterest"
                        name="carInterest"
                        value={formData.carInterest}
                        onChange={handleInputChange}
                        className="w-full h-16 px-4 bg-white border border-black/20 rounded-2xl focus:border-black focus:outline-none transition-colors appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                      >
                        <option value="">Select a vehicle type</option>
                        <option value="Luxury Sedan">Luxury Sedan</option>
                        <option value="Premium SUV">Premium SUV</option>
                        <option value="Sports Car">Sports Car</option>
                        <option value="Electric Vehicle">Electric Vehicle</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Contact Method */}
                    <div>
                      <label className="block text-sm text-black/60 mb-4 font-medium">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <label className="relative">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="phone"
                            checked={formData.contactMethod === 'phone'}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            formData.contactMethod === 'phone' 
                              ? 'border-black bg-black text-white' 
                              : 'border-black/20 hover:border-black/40'
                          }`}>
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5" />
                              <span className="font-medium">Phone Call</span>
                            </div>
                          </div>
                        </label>
                        <label className="relative">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="email"
                            checked={formData.contactMethod === 'email'}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            formData.contactMethod === 'email' 
                              ? 'border-black bg-black text-white' 
                              : 'border-black/20 hover:border-black/40'
                          }`}>
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5" />
                              <span className="font-medium">Email</span>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <label 
                        htmlFor="message" 
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          focusedField === 'message' || formData.message 
                            ? 'top-3 text-xs text-black/60' 
                            : 'top-6 text-base text-black/40'
                        }`}
                      >
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField('')}
                        rows={4}
                        className="w-full pt-8 pb-4 px-4 bg-white border border-black/20 rounded-2xl focus:border-black focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!formData.name || !formData.email || !formData.phone || isLoading}
                      className="w-full h-16 bg-black text-white rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/90 transition-all flex items-center justify-center gap-3 text-lg"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-black/40 text-center leading-relaxed">
                      By submitting this form, you agree to our privacy policy and terms of service. 
                      We will contact you within 24 hours.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-medium text-black mb-4">Message Sent Successfully</h3>
                    <p className="text-black/60 font-light">
                      Thank you for contacting us. Our team will respond within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;