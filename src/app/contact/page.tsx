'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Phone, Mail, MapPin, Star, Check, Copy } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredTime: string;
  carInterest: string;
}

interface ContactCard {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  contact: string;
  primaryAction: () => void;
  primaryText: string;
  secondaryAction: () => void;
  secondaryText: string;
  secondaryIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
}

interface Review {
  name: string;
  rating: number;
  text: string;
  avatar: string;
  verified: boolean;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredTime: '',
    carInterest: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [currentReviewSlide, setCurrentReviewSlide] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Clipboard copy with feedback
  const copyEmail = () => {
    navigator.clipboard.writeText('luxury@raamgroup.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText('+91 98765 43210');
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const contactCards: ContactCard[] = [
    {
      id: 'call',
      icon: Phone,
      title: 'Speak Directly',
      description: 'Immediate assistance from our experts',
      contact: '+91 98765 43210',
      primaryAction: () => window.open('tel:+919876543210'),
      primaryText: 'Call Now',
      secondaryAction: copyPhone,
      secondaryText: phoneCopied ? 'Copied' : 'Copy Number',
      secondaryIcon: phoneCopied ? Check : Copy,
      isActive: phoneCopied,
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Write to Us',
      description: 'Detailed inquiries and documentation',
      contact: 'luxury@raamgroup.com',
      primaryAction: () => window.open('mailto:luxury@raamgroup.com'),
      primaryText: 'Send Email',
      secondaryAction: copyEmail,
      secondaryText: emailCopied ? 'Copied' : 'Copy Email',
      secondaryIcon: emailCopied ? Check : Copy,
      isActive: emailCopied,
    },
    {
      id: 'visit',
      icon: MapPin,
      title: 'Experience Luxury',
      description: 'Visit our premium showroom',
      contact: 'Hi-Tech City, Hyderabad',
      primaryAction: () => {},
      primaryText: 'Schedule Visit',
      secondaryAction: () => {},
      secondaryText: 'View on Map',
      secondaryIcon: MapPin,
      isActive: false,
    },
  ];

  const reviews: Review[] = [
    {
      name: 'Arjun Mehta',
      rating: 5,
      text: 'Exceptional service! The team made buying my dream car effortless. Every detail was perfect.',
      avatar: 'AM',
      verified: true,
    },
    {
      name: 'Priya Sharma',
      rating: 5,
      text: 'Premium experience from start to finish. The showroom visit was absolutely luxurious.',
      avatar: 'PS',
      verified: true,
    },
    {
      name: 'Rajesh Kumar',
      rating: 5,
      text: 'Outstanding quality and transparency. Raam Group exceeded all my expectations completely.',
      avatar: 'RK',
      verified: true,
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % contactCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, contactCards.length]);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentReviewSlide((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, reviews.length]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredTime: '',
        carInterest: '',
      });
    }, 3000);
  };

  const renderContactCard = (
    card: ContactCard,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _index: number,
  ) => {
    const Icon = card.icon;
    const SecondaryIcon = card.secondaryIcon;
    return (
      <div
        key={card.id}
        className="group relative bg-gradient-to-br from-[#1a1a1a]/90 to-[#0e0e20]/90 backdrop-blur-sm p-4 rounded-2xl border border-[#d3b04f]/40 shadow-lg overflow-hidden w-full"
        style={{ minWidth: '280px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#614a00]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-[#d3b04f] to-[#b08e33] rounded-xl flex items-center justify-center mb-3 mx-auto">
            <Icon className="w-6 h-6 text-black" />
          </div>

          <h3 className="text-lg font-semibold text-white mb-1 text-center">{card.title}</h3>

          <p className="text-gray-300 text-sm text-center mb-3">{card.description}</p>

          <div className="text-[#d3b04f] text-base font-semibold mb-4 text-center select-text">
            {card.id === 'visit' ? (
              <>
                Hi-Tech City, Hyderabad
                <br />
                Telangana 500081
                <br />
                <span className="text-xs">Mon - Sun: 9:00 AM - 8:00 PM</span>
              </>
            ) : (
              card.contact
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={card.primaryAction}
              className="w-full bg-gradient-to-r from-[#d3b04f] to-[#b08e33] text-black rounded-lg py-2 font-semibold shadow-md hover:shadow-lg focus:outline-none transition duration-200"
            >
              {card.primaryText}
            </button>
            <button
              onClick={card.secondaryAction}
              className="w-full bg-transparent border border-[#d3b04f]/50 text-[#d3b04f] rounded-lg py-2 font-medium shadow-sm hover:bg-[#d3b04f]/20 transition duration-200 flex items-center justify-center gap-2"
            >
              <SecondaryIcon className="w-4 h-4" />
              {card.secondaryText}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderReviewCard = (review: Review, index: number) => (
    <div
      key={index}
      className="w-full p-4 bg-gradient-to-br from-[#1a1a1a]/90 to-[#0e0e20]/90 backdrop-blur-lg rounded-2xl border border-[#d3b04f]/40 shadow-lg transition hover:scale-105 duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-[#d3b04f] to-[#b08e33] w-12 h-12 flex items-center justify-center font-semibold text-black select-text">
            {review.avatar}
          </div>
          <div>
            <div className="text-white font-semibold flex items-center gap-2">
              {review.name}
              {review.verified && <Check className="w-4 h-4 text-lime-400" />}
            </div>
            <div className="flex gap-1 mt-1">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-[#d3b04f]" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed select-text">{review.text}</p>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#0e0e10] text-white overflow-hidden manrope-font">
      <Header />

      {/* Background glow & patterns */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute rounded-full bg-gradient-radial from-[#c6a540]/10 to-transparent opacity-80 blur-3xl transition-all duration-500"
          style={{ left: mousePosition.x - 192, top: mousePosition.y - 192 }}
        />
        <div
          className="absolute rounded-full bg-gradient-radial from-[#b08e33]/10 to-transparent opacity-70 blur-3xl animate-pulse"
          style={{ left: '70%' }}
        />
        <div
          className="absolute rounded-full bg-gradient-radial from-[#d3b04f]/10 to-transparent opacity-70 blur-3xl animate-pulse delay-200"
          style={{ left: '20%', bottom: '30%' }}
        />
      </div>

      {/* Hero and header content */}
      <section className="relative min-h-[75vh] flex flex-col justify-center px-6 pt-24 md:pt-32">
        <h1 className="text-5xl font-playfair font-black mb-4 text-center leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#d3b04f] to-[#b08e33]">
          Contact Our Luxury Specialists
        </h1>
        <p className="text-center text-lg text-gray-400 max-w-4xl mx-auto">
          Connect and communicate your luxury car aspirations with our experienced team.
        </p>
        <div className="mt-10 flex justify-center gap-6 flex-wrap max-w-lg mx-auto">
          <button
            onClick={() => {
              const contactFormElement = document.getElementById('contact-form');
              if (contactFormElement) contactFormElement.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-[#d3b04f] to-[#b08e33] rounded-full text-black font-semibold py-3 px-8 hover:shadow-lg transition duration-300"
          >
            Start Conversation
          </button>
          <a
            href="tel:+919876543210"
            className="rounded-full bg-transparent border border-[#d3b04f] text-[#d3b04f] font-medium py-3 px-8 transition hover:bg-[#d3b04f] hover:text-black"
          >
            Call Directly
          </a>
        </div>
      </section>

      {/* Contact cards: mobile & desktop */}
      <section className="relative py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Mobile slider view */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {contactCards.map((card, idx) => (
                  <div key={card.id} className="w-full flex-shrink-0 px-2">
                    {renderContactCard(card, idx)}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {contactCards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentSlide === idx ? 'bg-[#d3b04f]' : 'bg-[#d3b04f]/40'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          {/* Desktop view */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {contactCards.map((card, idx) => renderContactCard(card, idx))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact-form" className="py-12 px-6 bg-[#141414] max-w-4xl mx-auto rounded-xl shadow-lg">
        <h2 className="font-playfair text-3xl mb-6 text-center text-[#d3b04f]">Get Started</h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-semibold">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full rounded-md p-3 bg-[#222] text-white border border-[#d3b04f]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-semibold">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-md p-3 bg-[#222] text-white border border-[#d3b04f]"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 font-semibold">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full rounded-md p-3 bg-[#222] text-white border border-[#d3b04f]"
              />
            </div>
            <div>
              <label htmlFor="preferredTime" className="block mb-2 font-semibold">
                Preferred Time to Contact
              </label>
              <input
                id="preferredTime"
                type="time"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                className="w-full rounded-md p-3 bg-[#222] text-white border border-[#d3b04f]"
              />
            </div>
            <div>
              <label htmlFor="carInterest" className="block mb-2 font-semibold">
                Car Brand of Interest
              </label>
              <select
                id="carInterest"
                name="carInterest"
                value={formData.carInterest}
                onChange={handleInputChange}
                className="w-full rounded-md p-3 bg-[#222] text-white border border-[#d3b04f]"
              >
                <option value="">Select a brand</option>
                {[
                  'BMW',
                  'Mercedes',
                  'Audi',
                  'Porsche',
                  'Jaguar',
                  'Lexus',
                  'Other',
                ].map((brand: string) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-md p-3 bg-[#222] text-white border border-[#d3b04f]"
              />
            </div>

            <button
              type="submit"
              disabled={!formData.name || !formData.email || !formData.phone}
              className="bg-gradient-to-r from-[#d3b04f] to-[#b08e33] text-black rounded-full py-3 px-8 font-semibold transition disabled:opacity-50"
            >
              {isSubmitted ? (
                <>
                  Sent <Check className="inline w-4 h-4 ml-2" />
                </>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        ) : (
          <div className="text-center text-[#d3b04f] font-semibold mt-6">
            Thank you for reaching out! We&apos;ll get back to you shortly.
          </div>
        )}
      </section>

      {/* Reviews Carousel */}
      <section className="py-12 px-6 bg-[#141414] max-w-4xl mx-auto rounded-xl shadow-lg mt-12">
        <h2 className="font-playfair text-3xl mb-6 text-[#d3b04f] text-center">Client Reviews</h2>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentReviewSlide * 100}%)` }}
          >
            {reviews.map((review: Review, index: number) => renderReviewCard(review, index))}
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {reviews.map((_, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentReviewSlide(idx)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentReviewSlide === idx ? 'bg-[#d3b04f]' : 'bg-[#d3b04f]/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
