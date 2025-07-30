"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Car, Shield, Clock, Award, Star, CheckCircle, ArrowRight, Phone, Mail, MapPin, Zap, Eye, Users, TrendingUp } from 'lucide-react';
import SpinnyWizard from '../../../components/sell/spinnyWizard';
import Header from '../../../components/Header';
import Footer from '@/components/Footer';

// Hero Section Component

// FAQ Section
const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How is Raam Group different from other car selling platforms?",
      answer: "Raam Group specializes exclusively in luxury and premium vehicles. We offer personalized service with dedicated luxury car specialists, AI-powered premium valuations, and access to India's most exclusive buyer network."
    },
    {
      question: "How long does the selling process take?",
      answer: "Our streamlined process typically takes 24-48 hours from submission to final offer. We pride ourselves on being the fastest luxury car selling platform while maintaining the highest standards of service."
    },
    {
      question: "Do you handle all the paperwork and legal formalities?",
      answer: "Absolutely. Our team of experts handles all documentation, RC transfer, insurance cancellation, and legal formalities. You can sit back and relax while we take care of everything."
    },
    {
      question: "What types of luxury vehicles do you accept?",
      answer: "We specialize in luxury and premium brands including Mercedes-Benz, BMW, Audi, Jaguar, Land Rover, Porsche, and exotic brands like Ferrari, Lamborghini, Bentley, and Rolls-Royce."
    },
    {
      question: "Is there any fee for using Raam Group's services?",
      answer: "No, our valuation and consultation services are completely free. We only charge a small commission when your vehicle is successfully sold, and this is transparently communicated upfront."
    }
  ];

  return (
    <section className="py-24 bg-[#0e0e0e]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-white mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-white/70">
            Everything you need to know about selling your luxury vehicle with Raam Group
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/30"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                <ChevronRight
                  className={`w-6 h-6 text-[#D4AF37] transition-transform duration-300 ${
                    openFAQ === index ? 'rotate-90' : ''
                  }`}
                />
              </button>
              
              <div
                className={`transition-all duration-300 ${
                  openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="p-6 pt-0">
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-white mb-6">Ready to Sell Your Luxury Vehicle?</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Join thousands of satisfied customers who chose Raam Group for their premium vehicle sales
          </p>
          
          <button 
            onClick={() => document.getElementById('sell-wizard').scrollIntoView({ behavior: 'smooth' })}
            className="group bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-12 py-4 rounded-full font-semibold text-xl hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-500 transform hover:scale-105"
          >
            Start Your Premium Sale
            <ArrowRight className="inline ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
              <Phone className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
            <p className="text-white/70">+91 98765 43210</p>
            <p className="text-white/60 text-sm mt-1">Mon-Sun, 9 AM - 9 PM</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
            <p className="text-white/70">luxury@raamgroup.com</p>
            <p className="text-white/60 text-sm mt-1">24/7 Support Available</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
              <MapPin className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
            <p className="text-white/70">Pan India Presence</p>
            <p className="text-white/60 text-sm mt-1">Mumbai | Delhi | Bangalore</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main App Component
const RaamGroupSellPage = () => {
  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans">
      <Header />
      <SpinnyWizard />
      <TrustSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default RaamGroupSellPage;


// Trust & Benefits Section
const TrustSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Guaranteed Best Price",
      description: "Our AI-powered valuation ensures you get the maximum value for your luxury vehicle."
    },
    {
      icon: Clock,
      title: "24-Hour Process",
      description: "From submission to offer, experience the fastest luxury car selling process in India."
    },
    {
      icon: Award,
      title: "Premium Service",
      description: "White-glove treatment with personal luxury car specialists handling your sale."
    },
    {
      icon: Star,
      title: "Trusted Network",
      description: "Access to India's most exclusive network of luxury car buyers and collectors."
    }
  ];

  return (
    <section className="py-24 bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-white mb-6">Why Choose Raam Group?</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience the difference of working with India's most trusted luxury automotive platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all duration-500 hover:transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                <benefit.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
              <p className="text-white/70 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};