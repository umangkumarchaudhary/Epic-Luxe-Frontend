'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Star,
  Award,
  Shield,
  Heart,
  Phone,
  Mail,
  MapPin,
  Send,
  Check,
  ChevronRight,
  Quote,
} from 'lucide-react';
import CustomPermissionModal from '../../app/luxe/contact/CustomPermissionModal';

type Feature = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
};

type ContactCard = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
  desc: string;
  action: () => void;
};

type FormData = {
  name: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrors = {
  name: string;
  phone: string;
  message: string;
};

// -------------------- About Section --------------------
const HomeAboutSection = React.memo(function HomeAboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features: Feature[] = useMemo(() => [
    { icon: Shield, title: 'Integrity', desc: 'Transparent processes, honest dealings' },
    { icon: Award, title: 'Excellence', desc: 'Uncompromising quality in every vehicle' },
    { icon: Star, title: 'Innovation', desc: 'Pioneering new luxury automotive standards' },
    { icon: Heart, title: 'Customer Delight', desc: 'Creating extraordinary client experiences' },
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setIsVisible(true);
    }, { threshold: 0.3 });

    const element = document.getElementById('about-section');
    if (element) observer.observe(element);

    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => {
      if (element) observer.unobserve(element);
      clearInterval(interval);
    };
  }, [features.length]);

  const FeatureCard = React.memo(function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
    return (
      <div
        key={index}
        className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-6 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:transform hover:scale-105 group"
      >
        <feature.icon className="w-8 h-8 text-[#D4AF37] mb-3 group-hover:scale-110 transition-transform" />
        <h3 className="text-lg font-bold mb-2 text-white/90 group-hover:text-[#D4AF37] transition-colors">
          {feature.title}
        </h3>
        <p className="text-white/70 text-sm group-hover:text-white/80 transition-colors">{feature.desc}</p>
      </div>
    );
  });

  return (
    <section 
      id="about-section" 
      className="relative py-16 px-4 bg-gradient-to-b from-[#0e0e0e] to-[#1a1a1a]"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 id="about-heading" className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent font-headline">
            About Epic Luxe
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-clean">
            Where luxury meets legacy - curating premium pre-owned vehicles with unmatched quality and trust
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left - Story */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="space-y-6">
              <div className="relative">
                <Quote className="w-8 h-8 text-[#D4AF37] mb-4" />
                <blockquote className="text-xl font-light italic text-[#D4AF37] mb-6 leading-relaxed">
                  &ldquo;Luxury isn&apos;t a product — it&apos;s an emotion we deliver with every key we hand over.&rdquo;
                </blockquote>
              </div>

              <div className="space-y-4 text-white/70">
                <p className="leading-relaxed">
                  <span className="text-[#D4AF37] font-semibold">Epic Luxe</span>, powered by Raam Group, has redefined the luxury
                  pre-owned automotive landscape in India with our unwavering commitment to excellence.
                </p>
                <p className="leading-relaxed">
                  Our mission is to make premium vehicles accessible without compromise, ensuring every client experiences the
                  pinnacle of automotive luxury through our 175+ quality checks and concierge services.
                </p>
              </div>

              <div className="pt-4">
                <button 
                  className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  aria-label="Learn more about Epic Luxe"
                >
                  Learn More About Us
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right - Values */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>

            {/* Mobile Slider */}
            <div className="md:hidden">
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-6 rounded-xl border border-[#D4AF37]/20">
                {(() => {
                  const CurrentIcon = features[currentFeature].icon;
                  return <CurrentIcon className="w-10 h-10 text-[#D4AF37] mb-4" aria-hidden="true" />;
                })()}
                <h3 className="text-xl font-bold mb-3 text-white/90">{features[currentFeature].title}</h3>
                <p className="text-white/70">{features[currentFeature].desc}</p>
              </div>

              {/* Mobile Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {features.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to feature ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentFeature ? 'bg-[#D4AF37] scale-125' : 'bg-white/30'
                    }`}
                    onClick={() => setCurrentFeature(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .font-headline {
          font-family: 'Playfair Display', serif;
        }
        .font-clean {
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
        }
      `}</style>
    </section>
  );
});

// -------------------- Contact Section --------------------
const HomeContactSection = React.memo(function HomeContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({ 
    name: '', 
    phone: '', 
    service: 'buy', 
    message: '' 
  });
  const [errors, setErrors] = useState<FormErrors>({ 
    name: '', 
    phone: '', 
    message: '' 
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    actionName: '',
    actionDescription: '',
    onProceed: () => {},
  });

  const handleCallClick = useCallback(() => {
    setModalConfig({
      isOpen: true,
      actionName: 'Call Epic Luxe',
      actionDescription: 'Speak directly with our luxury car expert',
      onProceed: () => { 
        window.location.href = 'tel:+919999999999'; 
        setModalConfig(prev => ({ ...prev, isOpen: false })); 
      }
    });
  }, []);

  const handleEmailClick = useCallback(() => {
    setModalConfig({
      isOpen: true,
      actionName: 'Email Epic Luxe',
      actionDescription: 'Send us an email with your inquiry',
      onProceed: () => {
        const subject = encodeURIComponent('Luxury Car Inquiry');
        const body = encodeURIComponent("Hello, I'd like to know more about your luxury car collection and services.");
        window.location.href = `mailto:contact@epicluxe.com?subject=${subject}&body=${body}`;
        setModalConfig(prev => ({ ...prev, isOpen: false }));
      }
    });
  }, []);

  const contactCards: ContactCard[] = useMemo(() => [
    { 
      icon: Phone, 
      title: 'Call Us', 
      subtitle: '+91-9999999999', 
      desc: 'Available 9:30 AM to 7:30 PM', 
      action: handleCallClick 
    },
    { 
      icon: Mail, 
      title: 'Email Us', 
      subtitle: 'contact@epicluxe.com', 
      desc: 'Get detailed information', 
      action: handleEmailClick 
    },
    { 
      icon: MapPin, 
      title: 'Visit Us', 
      subtitle: 'Hi-Tech City, Hyderabad', 
      desc: 'Mon - Sun: 9:00 AM - 8:00 PM', 
      action: () => {} 
    },
  ], [handleCallClick, handleEmailClick]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setIsVisible(true);
    }, { threshold: 0.3 });

    const element = document.getElementById('contact-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = { name: '', phone: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const processedValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setFormData({ name: '', phone: '', service: 'buy', message: '' });
        setErrors({ name: '', phone: '', message: '' });
      } else {
        console.error('Submission failed:', await res.text());
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm]);

  const closeModal = useCallback(() => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  }, []);

  const ContactCardItem = React.memo(function ContactCardItem({ card }: { card: ContactCard }) {
    return (
      <div 
        onClick={card.action} 
        className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-6 rounded-xl border border-[#D4AF37]/20 cursor-pointer hover:border-[#D4AF37]/50 transition"
        role="button"
        tabIndex={0}
        aria-label={`${card.title} - ${card.subtitle}`}
        onKeyDown={(e) => e.key === 'Enter' && card.action()}
      >
        <div className="flex items-center gap-4">
          <card.icon className="w-8 h-8 text-[#D4AF37]" aria-hidden="true" />
          <div>
            <h3 className="text-lg font-bold text-white">{card.title}</h3>
            <p className="text-[#D4AF37] font-semibold">{card.subtitle}</p>
            <p className="text-white/80 text-sm">{card.desc}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#D4AF37]" aria-hidden="true" />
        </div>
      </div>
    );
  });

  return (
    <section 
      id="contact-section" 
      className="relative py-16 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent font-headline">
            Contact Epic Luxe
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-clean">
            Ready to find your perfect luxury vehicle? Let&apos;s start the conversation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Form */}
          <div>
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] backdrop-blur-lg p-8 rounded-2xl border border-[#D4AF37]/30">
              <h3 className="text-2xl font-bold mb-6 text-white">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* NAME & PHONE */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      aria-label="Your Name"
                      className={`w-full bg-white/10 text-white placeholder-white/60 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${errors.name ? 'border-red-500' : 'border-[#D4AF37]/30'}`}
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      aria-label="Phone Number"
                      className={`w-full bg-white/10 text-white placeholder-white/60 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${errors.phone ? 'border-red-500' : 'border-[#D4AF37]/30'}`}
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* SERVICE */}
                <div>
                  <label htmlFor="service" className="sr-only">Service</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 text-white border border-[#D4AF37]/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    aria-label="Select service"
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                    <option value="free-evaluation">Free Evaluation</option>
                    <option value="finance">Finance</option>
                    <option value="trade-in">Trade In</option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us what you're looking for..."
                    aria-label="Your Message"
                    rows={4}
                    className={`w-full bg-white/10 text-white placeholder-white/60 border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${errors.message ? 'border-red-500' : 'border-[#D4AF37]/30'}`}
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitted 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black hover:shadow-lg hover:shadow-[#D4AF37]/20'
                  } ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                  aria-live="polite"
                >
                  {isLoading ? (
                    'Sending...'
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" aria-hidden="true" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Contact Cards */}
          <div className="space-y-4">
            {contactCards.map((card, i) => (
              <ContactCardItem key={i} card={card} />
            ))}
          </div>
        </div>
      </div>

      <CustomPermissionModal {...modalConfig} onClose={closeModal} />
    </section>
  );
});

const HomeAboutContact = () => {
  return (
    <>
      <HomeAboutSection />
      <HomeContactSection />
    </>
  );
};

export default React.memo(HomeAboutContact);