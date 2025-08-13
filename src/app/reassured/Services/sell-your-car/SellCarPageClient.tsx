'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Shield, Clock, Award, Star, ArrowRight, 
  Phone, Mail, MapPin, ChevronDown, Check, TrendingUp,
  Users, Car, FileText, CreditCard, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
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

// Hero Section
const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showError, setShowError] = useState(false);

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
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-green-700">Trusted by 50,000+ customers</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Sell Your Car in
              <span className="block text-black mt-2">Just 24 Hours</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              Get up to <span className="font-bold text-black">₹50,000 more</span> than traditional dealers. 
              Free inspection, instant payment, zero hassle.
            </p>

            {/* Quick Start Form */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Get Instant Valuation</h3>
              <div className="space-y-4">
                <div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10));
                      setShowError(false);
                    }}
                    placeholder="Enter your mobile number"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                      showError ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {showError && (
                    <p className="text-red-500 text-sm mt-1">Please enter a valid 10-digit number</p>
                  )}
                </div>
                <button
                  onClick={handleQuickStart}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Free Inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Instant Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Best Price</span>
              </div>
            </div>
          </motion.div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-3xl font-bold text-black mb-2">50,000+</div>
              <div className="text-gray-600">Cars Sold</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-3xl font-bold text-black mb-2">4.9★</div>
              <div className="text-gray-600">Google Rating</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-3xl font-bold text-black mb-2">24 Hrs</div>
              <div className="text-gray-600">Quick Sale</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-3xl font-bold text-black mb-2">₹50K+</div>
              <div className="text-gray-600">Extra Value</div>
            </div>
          </motion.div>
        </div>
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
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* How It Works */}
      <HowItWorksSection />
      
      {/* Benefits Section */}
      <BenefitsSection benefits={benefitsData} />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Sell Car Wizard */}
      <section id="sell-wizard" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start Selling Your Car
            </h2>
            <p className="text-xl text-gray-600">
              Fill the form below to get instant valuation
            </p>
          </div>
          <SellCarWizard />
        </div>
      </section>
      
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