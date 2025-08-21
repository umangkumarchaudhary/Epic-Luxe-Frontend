'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Check, Calendar, ChevronRight, Eye } from 'lucide-react';
import CustomPermissionModal from './CustomPermissionModal';
import WhatsAppIcon from './WhatsAppIcon';
import ContactHero from './ContactHero';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactTestimonials from './ContactTestimonials';
import { submitLead } from '../../../lib/leadSubmission';


// Debug override for removeChild to catch the exact error (temporarily disabled)
// if (typeof window !== 'undefined') {
//   const originalRemoveChild = Node.prototype.removeChild;
//   Node.prototype.removeChild = function<T extends Node>(child: T): T {
//     try {
//       return originalRemoveChild.call(this, child) as T;
//     } catch (e) {
//       const error = e as Error;
//       console.warn('🚨 removeChild Error Caught:', {
//         error: error.message,
//         child: child,
//         parent: this,
//         childParent: child?.parentNode,
//         childExists: document.contains(child),
//         parentExists: document.contains(this)
//       });
//       return child;
//     }
//   };
// }

// Google Maps TypeScript declarations
declare global {
  interface Window {
    google: unknown;
  }
  
  interface HTMLElement {
    configureFromQuickBuilder?: (config: unknown) => void;
  }
}

// Simple Google Maps component without DOM manipulation
const GoogleMap = () => {
  return (
    <div className="relative">
      <div className="aspect-video bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl border border-[#D4AF37]/20 overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1234567890123!2d78.4541113!3d17.4171759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91d3c8b5b5b5%3A0x1234567890abcdef!2sEpic%20Luxe%20Showroom!5e0!3m2!1sen!2sin!4v1234567890123"
          className="w-full h-full rounded-2xl border border-[#D4AF37]/20"
          style={{ 
            border: 'none',
            filter: 'grayscale(20%) contrast(120%) brightness(90%)'
          }}
          title="Epic Luxe Showroom Location"
        />
        
        {/* Static overlay */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-[#D4AF37]/30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
            <span className="text-white text-sm font-semibold">Epic Luxe Showroom</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

const ContactUs = () => {
  const router = useRouter();
  const contactFormRef = useRef<HTMLElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'buy',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Modal states
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    actionName: '',
    actionDescription: '',
    onProceed: () => {}
  });

  // Contact cards carousel state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);
  const [isComponentMounted, setIsComponentMounted] = useState(true);

  // Simplified mouse move handler
  useEffect(() => {
    setIsComponentMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isComponentMounted) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      setIsComponentMounted(false);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isComponentMounted]);

  // Check if mobile and handle auto-play
  useEffect(() => {
    const checkMobile = () => {
      if (isComponentMounted) {
        setIsMobile(window.innerWidth < 768);
      }
    };
    
    checkMobile();
    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isComponentMounted]);

  // Handle touch interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile || !isComponentMounted) return;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile || !isComponentMounted) return;
    
    touchEndXRef.current = e.changedTouches[0].clientX;
    const swipeDistance = touchStartXRef.current - touchEndXRef.current;
    const swipeThreshold = 50;
    
    if (swipeDistance > swipeThreshold) {
      // Swipe left - go to next card
      setCurrentCardIndex((prev) => (prev + 1) % 3);
    } else if (swipeDistance < -swipeThreshold) {
      // Swipe right - go to previous card
      setCurrentCardIndex((prev) => (prev - 1 + 3) % 3);
    }
  };

  const handleTouchMove = () => {
    // Touch movement detected - no auto-play functionality
  };

  // Validation functions
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      phone: '',
      service: '',
      message: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Special handling for phone number
    if (name === 'phone') {
      // Remove all non-numeric characters
      processedValue = value.replace(/\D/g, '');
      // Limit to 10 digits
      processedValue = processedValue.slice(0, 10);
    }
    
    setFormData({
      ...formData,
      [name]: processedValue
    });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone.trim()) {
      if (!validatePhone(formData.phone.trim())) {
        setErrors({
          ...errors,
          phone: 'Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9'
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const cleanedPhone = formData.phone.replace(/\s+/g, '');
      
      const submitData = {
        lead_type: 'contact_page',
        lead_title: 'Contact Page Inquiry',
        name: formData.name.trim(),
        phone: cleanedPhone,
        email: null,
        preferred_model: null,
        vehicle_id: null,
        appointment_date: null,
        appointment_time: null,
        message: formData.message.trim(),
        budget: null,
        insurance_type: null,
        loan_details: null,
        status: 'new',
        source_page: 'Contact Page',
        brand: null,
        fuel: null,
        variant: null,
        city: null,
        year: null,
        owner: null,
        kms: null,
        whatsapp_updates: null,
        monthly_income: null,
        employment_type: null,
        interested_car: formData.service,
        loan_amount: null,
        emi_tenure: null,
        interest: null,
        your_emi: null,
        total_payable: null,
        pan_card: null,
        car_interest: null
      };

      const response = await fetch('https://raam-group-all-websites.onrender.com/admin/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      const result = await response.json();
      console.log('Contact form submitted successfully:', result);
      
      // Show success and reset form
      setIsSubmitted(true);
      setTimeout(() => {
        if (isComponentMounted) {
          setIsSubmitted(false);
        }
      }, 5000);
      
      setFormData({
        name: '',
        phone: '',
        service: 'buy',
        message: ''
      });
      setErrors({
        name: '',
        phone: '',
        service: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError('Failed to submit message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact action handlers
  const handleCallClick = () => {
    setModalConfig({
      isOpen: true,
      actionName: 'Call Epic Luxe',
      actionDescription: 'Speak directly with our luxury car expert',
      onProceed: () => {
        window.location.href = 'tel:+917288882121';
        setModalConfig(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleEmailClick = () => {
    setModalConfig({
      isOpen: true,
      actionName: 'Email Epic Luxe',
      actionDescription: 'Send us an email with your luxury car inquiry',
      onProceed: () => {
        const subject = encodeURIComponent('Luxury Car Inquiry');
        const body = encodeURIComponent('Hello, I\'d like to know more about your luxury car collection and services.');
        window.location.href = `mailto:contact@epicluxe.com?subject=${subject}&body=${body}`;
        setModalConfig(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleWhatsAppClick = () => {
    setModalConfig({
      isOpen: true,
      actionName: 'WhatsApp Epic Luxe',
      actionDescription: 'Chat instantly with our luxury car expert',
      onProceed: () => {
        window.open('https://wa.me/917288882121', '_blank');
        setModalConfig(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const navigateToInventory = () => {
    router.push('/luxe/buy-used-cars');
  };

  // Don't render if component is unmounting
  if (!isComponentMounted) {
    return null;
  }

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white overflow-hidden font-manrope">
      {/* Header */}
      <Header />

      {/* Contact Hero Section */}
      <ContactHero />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-[#D4AF37]/20 to-transparent rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-[#BFA980]/10 to-transparent rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-radial from-[#D4AF37]/15 to-transparent rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Contact Form Section */}
      <section 
        ref={contactFormRef}
        id="contact-form" 
        className="relative py-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 font-manrope">
              <span className="text-white">Let&apos;s </span>
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
            <p className="text-xl text-white/70 font-manrope">Share your dream, and we&apos;ll make it reality</p>
          </div>

          <div className="relative bg-gradient-to-br from-[#1a1a1a]/80 to-[#0e0e0e]/80 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-[#D4AF37]/20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-3xl" />
            
            <form onSubmit={handleSubmit}>
              <div className="relative grid md:grid-cols-2 gap-6 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-[#0e0e0e]/50 border rounded-lg px-4 py-4 text-white placeholder-white/50 focus:outline-none transition-all duration-300 font-manrope ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-[#D4AF37]/30 focus:border-[#D4AF37]'
                    }`}
                    placeholder="Your Name"
                    required
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] scale-x-0 transition-transform duration-300 origin-left group-focus-within:scale-x-100" />
                </div>
                
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handlePhoneBlur}
                    maxLength={10}
                    className={`w-full bg-[#0e0e0e]/50 border rounded-lg px-4 py-4 text-white placeholder-white/50 focus:outline-none transition-all duration-300 font-manrope ${
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[#D4AF37]/30 focus:border-[#D4AF37]'
                    }`}
                    placeholder="Your Phone Number (10 digits)"
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="relative mb-6">
                <select
                  name="service"
                  value={formData.service || ''}
                  onChange={handleInputChange}
                  className={`w-full bg-[#0e0e0e]/50 border rounded-lg px-4 py-4 text-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer font-manrope ${
                    errors.service ? 'border-red-500 focus:border-red-500' : 'border-[#D4AF37]/30 focus:border-[#D4AF37]'
                  }`}
                  required
                >
                  <option value="buy" className="text-white bg-[#0e0e0e]">Buy</option>
                  <option value="sell" className="text-white bg-[#0e0e0e]">Sell</option>
                  <option value="free-evaluation" className="text-white bg-[#0e0e0e]">Free Evaluation</option>
                  <option value="finance" className="text-white bg-[#0e0e0e]">Finance</option>
                  <option value="insurance" className="text-white bg-[#0e0e0e]">Insurance</option>
                  <option value="trade-in" className="text-white bg-[#0e0e0e]">Trade In</option>
                  <option value="book-test-drive" className="text-white bg-[#0e0e0e]">Book Test Drive</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-5 h-5 text-[#D4AF37] rotate-90" />
                </div>
                {errors.service && (
                  <p className="text-red-400 text-sm mt-1">{errors.service}</p>
                )}
              </div>

              <div className="relative mb-8">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full bg-[#0e0e0e]/50 border rounded-lg px-4 py-4 text-white placeholder-white/50 focus:outline-none transition-all duration-300 resize-none font-manrope ${
                    errors.message ? 'border-red-500 focus:border-red-500' : 'border-[#D4AF37]/30 focus:border-[#D4AF37]'
                  }`}
                  placeholder="Tell us about what you are looking for...."
                  required
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {submitError && (
                <div className="text-red-400 text-sm text-center p-2 bg-red-500/10 rounded-lg border border-red-500/20 mb-4">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full relative overflow-hidden rounded-lg py-4 px-8 font-semibold text-lg transition-all duration-300 font-manrope disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSubmitted 
                    ? 'bg-green-600 text-white' 
                    : isSubmitting
                    ? 'bg-gray-600 text-gray-300'
                    : 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black hover:shadow-2xl hover:shadow-[#D4AF37]/50 transform hover:scale-105'
                }`}
              >
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Thank you for your response! We will get back to you soon.
                    </>
                  ) : isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25"/>
                        <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <ContactTestimonials />

      {/* Contact Info Cards - Updated with WhatsApp and custom modals */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {/* Call Us */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105 hover:rotate-1 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative flex flex-col h-full">
                <div className="flex-1">
                <Phone className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:animate-bounce" />
                <h3 className="text-2xl font-bold mb-4 text-white/90 font-manrope">Call Us</h3>
                <p className="text-[#D4AF37] text-xl font-semibold mb-2 font-manrope">+91-7288882121</p>
                <p className="text-white/70 text-sm mb-4 font-manrope">Available 9:30 AM to 7:30 PM</p>
                </div>
                <button 
                  onClick={handleCallClick}
                  className="w-full bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#BFA980] transition-colors mt-auto font-manrope"
                >
                  Call Now
                </button>
              </div>
            </div>

            {/* Email Us */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105 hover:-rotate-1 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative flex flex-col h-full">
                <div className="flex-1">
                <Mail className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:animate-bounce" />
                <h3 className="text-2xl font-bold mb-4 text-white/90 font-manrope">Email Us</h3>
                <p className="text-[#D4AF37] text-lg mb-2 font-manrope">contact@epicluxe.com</p>
                <p className="text-white/70 text-sm mb-4 font-manrope">Get detailed information about our luxury cars</p>
                </div>
                <button 
                  onClick={handleEmailClick}
                  className="w-full bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#BFA980] transition-colors flex items-center justify-center gap-2 mt-auto font-manrope"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </button>
              </div>
            </div>

            {/* WhatsApp Us */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105 hover:rotate-1 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative flex flex-col h-full">
                <div className="flex-1">
                <WhatsAppIcon className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:animate-bounce" />
                <h3 className="text-2xl font-bold mb-4 text-white/90 font-manrope">WhatsApp Epic Luxe</h3>
                <p className="text-[#D4AF37] text-lg mb-2 font-manrope">+91-7288882121</p>
                <p className="text-white/70 text-sm mb-4 font-manrope">Available 9:30 AM to 7:30 PM for instant queries</p>
                </div>
                <button 
                  onClick={handleWhatsAppClick}
                  className="w-full bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#BFA980] transition-colors flex items-center justify-center gap-2 mt-auto font-manrope"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Call Us Card */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105 flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    <div className="relative flex flex-col h-full">
                      <div className="flex-1">
                        <Phone className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:animate-bounce" />
                        <h3 className="text-2xl font-bold mb-4 text-white/90 font-manrope">Call Us</h3>
                        <p className="text-[#D4AF37] text-xl font-semibold mb-2 font-manrope">+91-7288882121</p>
                        <p className="text-white/70 text-sm mb-4 font-manrope">Available 9:30 AM to 7:30 PM</p>
                      </div>
                                              <button 
                          onClick={handleCallClick}
                          className="w-full bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#BFA980] transition-colors mt-auto font-manrope"
                        >
                          Call Now
                        </button>
                    </div>
                  </div>
                </div>

                {/* Email Us Card */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105 flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    <div className="relative flex flex-col h-full">
                      <div className="flex-1">
                        <Mail className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:animate-bounce" />
                        <h3 className="text-2xl font-bold mb-4 text-white/90">Email Us</h3>
                        <p className="text-[#D4AF37] text-lg mb-2">poc.socialmedia@mghyderabad.com</p>
                        <p className="text-white/70 text-sm mb-4">Get detailed information about our luxury cars</p>
                      </div>
                      <button 
                        onClick={handleEmailClick}
                        className="w-full bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#BFA980] transition-colors flex items-center justify-center gap-2 mt-auto"
                      >
                        <Mail className="w-4 h-4" />
                        Send Email
                      </button>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Us Card */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105 flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    <div className="relative flex flex-col h-full">
                      <div className="flex-1">
                        <WhatsAppIcon className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:animate-bounce" />
                        <h3 className="text-2xl font-bold mb-4 text-white/90">WhatsApp Epic Luxe</h3>
                        <p className="text-[#D4AF37] text-lg mb-2">+91-7288882121</p>
                        <p className="text-white/70 text-sm mb-4">Available 9:30 AM to 7:30 PM for instant queries</p>
                      </div>
                      <button 
                        onClick={handleWhatsAppClick}
                        className="w-full bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#BFA980] transition-colors flex items-center justify-center gap-2 mt-auto"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        Chat on WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Pagination Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentCardIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentCardIndex 
                      ? 'bg-[#D4AF37] scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent">
                Visit Our Showroom
              </h2>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Experience luxury firsthand at our state-of-the-art showroom in the heart of Hyderabad&apos;s tech district.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-white/80">Hi-Tech City, Hyderabad, Telangana 500081</span>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-white/80">Mon - Sun: 9:00 AM - 8:00 PM</span>
                </div>
              </div>

              <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 transform hover:scale-105">
                Schedule Visit
              </button>
            </div>

            <div className="relative">
              <GoogleMap />
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative">
            {/* Enhanced background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/30 via-[#BFA980]/20 to-[#D4AF37]/30 rounded-[2rem] blur-2xl opacity-60 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20 rounded-[2rem] blur-xl opacity-40 animate-pulse delay-1000" />
            
            {/* Main button with enhanced design */}
            <motion.button 
              onClick={navigateToInventory}
              className="relative bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#BFA980] text-black px-12 py-6 rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-[#D4AF37]/60 transition-all duration-500 transform hover:scale-105 group overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                y: -3,
                boxShadow: '0 20px 40px rgba(212, 175, 55, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <span className="relative flex items-center justify-center gap-3 z-10">
                <Eye className="w-6 h-6 group-hover:animate-pulse" />
                <span className="font-serif">Explore Our Premium Collection</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Custom Permission Modal */}
      <CustomPermissionModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onProceed={modalConfig.onProceed}
        actionName={modalConfig.actionName}
        actionDescription={modalConfig.actionDescription}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default ContactUs;