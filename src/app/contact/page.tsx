'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Star, Send, Check, Copy, Calendar, ChevronRight } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('luxury@raamgroup.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const reviews = [
    { name: "Arjun Mehta", rating: 5, text: "Exceptional service! The team made buying my dream car effortless.", avatar: "AM" },
    { name: "Priya Sharma", rating: 5, text: "Premium experience from start to finish. Highly recommended!", avatar: "PS" },
    { name: "Rajesh Kumar", rating: 5, text: "Outstanding quality and transparency. Raam Group exceeded expectations.", avatar: "RK" },
    { name: "Sneha Patel", rating: 5, text: "Professional, trustworthy, and luxurious. Perfect car buying experience!", avatar: "SP" }
  ];

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white overflow-hidden">
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

      {/* Hero Contact Banner */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0e0e0e] to-[#1a1a1a]" />
        
        {/* Shimmer Animation */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent transform -skew-x-12 animate-pulse" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] via-white to-[#BFA980] bg-clip-text text-transparent">
              We're here for you
            </h1>
            <h2 className="text-4xl md:text-6xl font-light mb-8 text-[#D4AF37]">
              — Always.
            </h2>
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Talk to our luxury car experts, schedule visits, or just say hi.
            </p>
            
            <button 
              onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              className="group relative overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#BFA980] px-12 py-4 rounded-full text-black font-semibold text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="relative flex items-center gap-2">
                Get In Touch
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-60 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Call Us */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105 hover:rotate-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative">
                <Phone className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:animate-bounce" />
                <h3 className="text-2xl font-bold mb-4 text-white/90">Call Us</h3>
                <p className="text-[#D4AF37] text-xl font-semibold mb-4">+91 98765 43210</p>
                <button className="w-full bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#BFA980] transition-colors">
                  Call Now
                </button>
              </div>
            </div>

            {/* Email Us */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105 hover:-rotate-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative">
                <Mail className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:animate-bounce" />
                <h3 className="text-2xl font-bold mb-4 text-white/90">Email Us</h3>
                <p className="text-[#D4AF37] text-lg mb-4">luxury@raamgroup.com</p>
                <button 
                  onClick={copyEmail}
                  className="w-full bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#BFA980] transition-colors flex items-center justify-center gap-2"
                >
                  {emailCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {emailCopied ? 'Copied!' : 'Copy Email'}
                </button>
              </div>
            </div>

            {/* Visit Us */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105 hover:rotate-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative">
                <MapPin className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:animate-bounce" />
                <h3 className="text-2xl font-bold mb-4 text-white/90">Visit Us</h3>
                <p className="text-white/70 mb-4">Hi-Tech City, Hyderabad<br />Telangana 500081</p>
                <button className="w-full bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#BFA980] transition-colors flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  View on Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-white/70">Share your dream, and we'll make it reality</p>
          </div>

          <div className="relative bg-gradient-to-br from-[#1a1a1a]/80 to-[#0e0e0e]/80 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-[#D4AF37]/20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-3xl" />
            
            <div className="relative grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-[#0e0e0e]/50 border border-[#D4AF37]/30 rounded-lg px-4 py-4 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
                  placeholder="Your Name"
                  required
                />
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] scale-x-0 transition-transform duration-300 origin-left group-focus-within:scale-x-100" />
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#0e0e0e]/50 border border-[#D4AF37]/30 rounded-lg px-4 py-4 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>

            <div className="relative mb-6">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-[#0e0e0e]/50 border border-[#D4AF37]/30 rounded-lg px-4 py-4 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
                placeholder="Your Phone Number"
                required
              />
            </div>

            <div className="relative mb-8">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                className="w-full bg-[#0e0e0e]/50 border border-[#D4AF37]/30 rounded-lg px-4 py-4 text-white placeholder-white/50 focus:border-[#D4AF37] focus:outline-none transition-all duration-300 resize-none"
                placeholder="Tell us about your dream car..."
                required
              />
            </div>

            <div
              onClick={handleSubmit}
              className={`w-full relative overflow-hidden rounded-lg py-4 px-8 font-semibold text-lg transition-all duration-300 cursor-pointer ${
                isSubmitted 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black hover:shadow-2xl hover:shadow-[#D4AF37]/50 transform hover:scale-105'
              }`}
            >
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white/90">
              Trusted by hundreds of luxury car buyers
            </h2>
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 bg-gradient-to-br from-[#1a1a1a]/80 to-[#0e0e0e]/80 backdrop-blur-lg p-6 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center text-black font-bold">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white/90">{review.name}</h4>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed">{review.text}</p>
              </div>
            ))}
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
                Experience luxury firsthand at our state-of-the-art showroom in the heart of Hyderabad's tech district.
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
              <div className="aspect-video bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl border border-[#D4AF37]/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
                  <p className="text-white/70">Interactive Map</p>
                  <p className="text-sm text-white/50">Raam Group Showroom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-3xl blur-xl opacity-50 animate-pulse" />
            <button className="relative bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-12 py-6 rounded-3xl text-2xl font-bold hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 transform hover:scale-105 group">
              <span className="relative flex items-center justify-center gap-3">
                Start Your Luxury Journey with Raam
                <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

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