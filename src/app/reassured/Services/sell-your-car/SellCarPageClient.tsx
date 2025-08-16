'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Shield, Clock, Award, Star, ArrowRight, 
  Phone, Mail, MapPin, ChevronDown, Check, TrendingUp,
  Users, Car, FileText, CreditCard, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header/HeaderServer';
import Footer from '../../components/Footer/FooterServer';
import SellCarWizard from './SellCarPage'; // Your wizard component

// Types - Updated to use string for icon instead of component
interface Benefit {
  icon: string; // Changed from 'any' to 'string'
  title: string;
  description: string;
  stat: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ContactData {
  phone: string;
  email: string;
  hours: string;
  cities: string[];
}

interface SellCarPageClientProps {
  benefitsData: Benefit[];
  faqsData: FAQ[];
  contactData: ContactData;
}

// Icon mapping - Map string names to actual icon components
const iconMap = {
  Shield,
  Clock,
  Award,
  Star,
  Phone,
  Mail,
  MapPin,
  Check,
  TrendingUp,
  Users,
  Car,
  FileText,
  CreditCard,
  ChevronRight,
  ArrowRight,
  ChevronDown,
  ChevronLeft
};

// Enhanced Hero Section with Background Integration
const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showError, setShowError] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  // Animated statistics
  const stats = [
    { value: "50,000+", label: "Cars Sold", color: "from-blue-400 to-blue-600" },
    { value: "4.9★", label: "Google Rating", color: "from-yellow-400 to-orange-500" },
    { value: "24 Hrs", label: "Quick Sale", color: "from-green-400 to-emerald-600" },
    { value: "₹50K+", label: "Extra Value", color: "from-purple-400 to-pink-600" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  const handleQuickStart = () => {
    if (phoneNumber.length !== 10) {
      setShowError(true);
      return;
    }
    // Scroll to wizard or handle quick start
    const element = document.getElementById('sell-wizard');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black" style={{ marginTop: '20px', minHeight: 'calc(100vh - 20px)' }}>
      {/* Dynamic Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/images/epicreassuredsell.png')`,
        }}
      >
        {/* Multi-layered Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center min-h-full">
          {/* Left Content - Enhanced with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white space-y-4 lg:space-y-6"
          >
            {/* Trust Badge with Glow Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-xs sm:text-sm font-medium text-white/90">Trusted by 50,000+ customers</span>
              <div className="flex space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </motion.div>

            {/* Main Headline with Gradient Text - Optimized sizes */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="block text-white drop-shadow-2xl">Sell Your Car in</span>
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                Just 24 Hours
              </span>
            </motion.h1>

            {/* Enhanced Subtitle - Adjusted for better spacing */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-white/90 drop-shadow-lg"
            >
              Get up to{' '}
              <span className="font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                ₹50,000 more
              </span>{' '}
              than traditional dealers.
              <br className="hidden sm:block" />
              <span className="text-white/80 text-sm sm:text-base">Free inspection, instant payment, zero hassle.</span>
            </motion.p>

            {/* Enhanced Quick Start Form with Glassmorphism - Compact version */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white/10 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <h3 className="font-semibold text-white mb-4 text-base sm:text-lg">Get Instant Valuation</h3>
              <div className="space-y-3">
                <div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10));
                      setShowError(false);
                    }}
                    placeholder="Enter your mobile number"
                    className={`w-full px-4 py-3 bg-white/20 backdrop-blur-md border rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 transition-all duration-300 text-sm sm:text-base ${
                      showError ? 'border-red-400 ring-2 ring-red-400/50' : 'border-white/30 hover:border-white/50'
                    }`}
                  />
                  {showError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-300 text-xs mt-2"
                    >
                      Please enter a valid 10-digit number
                    </motion.p>
                  )}
                </div>
                <button
                  onClick={handleQuickStart}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-orange-500/25 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Enhanced Trust Badges - More compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4 sm:gap-6"
            >
              {[
                { icon: Check, text: "Free Inspection" },
                { icon: Check, text: "Instant Payment" },
                { icon: Check, text: "Best Price" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <div className="p-1.5 bg-green-500/20 rounded-full group-hover:bg-green-500/30 transition-colors">
                    <item.icon className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-white/90 font-medium text-sm">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced Interactive Stats - More compact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Floating Stats Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className={`relative group cursor-pointer ${
                    currentStat === index ? 'transform scale-105' : ''
                  } transition-all duration-500`}
                >
                  {/* Glow Effect */}
                  {currentStat === index && (
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000`}></div>
                  )}
                  
                  {/* Card Content */}
                  <div className="relative bg-white/10 backdrop-blur-xl p-4 sm:p-6 rounded-xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className={`text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-white/80 font-medium text-xs sm:text-sm">{stat.label}</div>
                    
                    {/* Animated Progress Bar */}
                    {currentStat === index && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3 }}
                        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${stat.color} rounded-b-xl`}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating Call-to-Action - More compact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-4 sm:mt-6 text-center"
            >
              <div className="bg-white/5 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-white/10">
                <p className="text-white/80 mb-3 text-sm">Need immediate assistance?</p>
                <div className="flex gap-2 sm:gap-3 justify-center">
                  <button
                    onClick={() => window.location.href = 'tel:18001234567'}
                    className="flex items-center gap-2 bg-white/20 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-md text-xs sm:text-sm"
                  >
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Call Now</span>
                    <span className="sm:hidden">Call</span>
                  </button>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm">
                    Live Chat
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Floating Elements - Adjusted position */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex items-center gap-2 text-white/60">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
            <span className="text-xs sm:text-sm">Scroll to explore</span>
          </div>
        </motion.div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    {
      icon: Car,
      title: "Share Car Details",
      description: "Fill a simple form with your car details in just 2 minutes",
      step: "01"
    },
    {
      icon: FileText,
      title: "Get Instant Valuation",
      description: "Receive AI-powered fair market value instantly",
      step: "02"
    },
    {
      icon: Users,
      title: "Free Inspection",
      description: "Expert inspection at your doorstep at your convenience",
      step: "03"
    },
    {
      icon: CreditCard,
      title: "Instant Payment",
      description: "Get paid immediately via bank transfer upon agreement",
      step: "04"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sell your car in 4 simple steps. No hidden charges, no waiting period.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="text-5xl font-bold text-gray-100 mb-4">{step.step}</div>
                  <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Benefits Section - Updated to handle string icon names
const BenefitsSection: React.FC<{ benefits: Benefit[] }> = ({ benefits }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference of working with India&apos;s most trusted car selling platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            // Get the icon component from the icon map using the string name
            const Icon = iconMap[benefit.icon as keyof typeof iconMap] || Shield;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-black" />
                </div>
                <div className="text-2xl font-bold text-black mb-2">{benefit.stat}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Bangalore",
      car: "Honda City 2019",
      rating: 5,
      review: "Got ₹45,000 more than dealer quotes. Process was smooth and payment was instant!",
      amount: "₹7.5 Lakhs"
    },
    {
      name: "Priya Sharma",
      location: "Mumbai",
      car: "Hyundai Creta 2020",
      rating: 5,
      review: "Sold my car in just 24 hours. Team handled everything professionally.",
      amount: "₹11.2 Lakhs"
    },
    {
      name: "Amit Patel",
      location: "Chennai",
      car: "Maruti Swift 2018",
      rating: 5,
      review: "Best experience ever! Free inspection at home and immediate bank transfer.",
      amount: "₹5.8 Lakhs"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Customer Success Stories
          </h2>
          <p className="text-xl text-gray-600">
            See what our 50,000+ happy customers say about us
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">&quot;{testimonial.review}&quot;</p>
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.location}</div>
                <div className="text-sm text-gray-600">{testimonial.car}</div>
                <div className="text-lg font-bold text-black mt-2">Sold for {testimonial.amount}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection: React.FC<{ faqs: FAQ[] }> = ({ faqs }) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about selling your car with us
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Banner Section
const CTABanner = () => {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white">
            <h3 className="text-3xl font-bold mb-2">Get ₹50,000 More for Your Car</h3>
            <p className="text-gray-300">No hidden charges. Free inspection. Instant payment.</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                const element = document.getElementById('sell-wizard');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Sell Now
            </button>
            <a
              href="tel:18001234567"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection: React.FC<{ contactData: ContactData }> = ({ contactData }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Sell Your Car?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join thousands of satisfied customers who chose us for selling their cars
          </p>
          
          <button
            onClick={() => {
              const element = document.getElementById('sell-wizard');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-900 transition-all transform hover:scale-105"
          >
            Start Selling Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
            <a href={`tel:${contactData.phone}`} className="text-lg text-black font-medium hover:underline">
              {contactData.phone}
            </a>
            <p className="text-gray-600 text-sm mt-1">{contactData.hours}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
            <a href={`mailto:${contactData.email}`} className="text-lg text-black font-medium hover:underline">
              {contactData.email}
            </a>
            <p className="text-gray-600 text-sm mt-1">24/7 Support Available</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pan India Service</h3>
            <p className="text-gray-900 font-medium">30+ Cities</p>
            <p className="text-gray-600 text-sm mt-1">
              {contactData.cities.slice(0, 3).join(' | ')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Main Client Component
export default function SellCarPageClient({ 
  benefitsData, 
  faqsData, 
  contactData 
}: SellCarPageClientProps) {
  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Enhanced Hero Section with Background Integration */}
      <HeroSection />
      <SellCarWizard />
      
      {/* How It Works */}
      <HowItWorksSection />
      
      {/* Benefits Section */}
      <BenefitsSection benefits={benefitsData} />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* FAQ Section */}
      <FAQSection faqs={faqsData} />
      
      {/* CTA Banner */}
      <CTABanner />
      
      {/* Contact Section */}
      <ContactSection contactData={contactData} />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}