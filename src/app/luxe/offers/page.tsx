'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const OffersLandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    carInterest: ''
  });
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);

  // Auto-show modal after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!showModal) setShowModal(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showModal]);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !showExitModal && !showModal) {
        setShowExitModal(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showExitModal, showModal]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const payload = {
      ...formData,
      campaign_source: 'Meta_Ads',
      campaign_name: urlParams.get('campaign') || 'default',
      timestamp: new Date().toISOString()
    };
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setShowModal(false);
        setShowExitModal(false);
        setFormData({ fullName: '', phone: '', email: '', carInterest: '' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const carCollection = [
    { id: 1, name: 'Mercedes-Benz S-Class AMG', image: '/api/placeholder/600/400', reserved: false },
    { id: 2, name: 'Bentley Continental GT Speed', image: '/api/placeholder/600/400', reserved: true },
    { id: 3, name: 'Porsche 911 Turbo S', image: '/api/placeholder/600/400', reserved: false },
    { id: 4, name: 'Maserati MC20', image: '/api/placeholder/600/400', reserved: false },
    { id: 5, name: 'Aston Martin DB11', image: '/api/placeholder/600/400', reserved: true },
    { id: 6, name: 'Ferrari Roma', image: '/api/placeholder/600/400', reserved: false }
  ];

  const testimonials = [
    { quote: "Epic Luxe delivered my Porsche 911 in a sealed trailer, presented like art.", author: "Alexander M.", location: "Beverly Hills" },
    { quote: "The white-glove experience exceeded my expectations. Every detail was curated to perfection.", author: "Victoria L.", location: "Manhattan" },
    { quote: "Not just a car purchase—an invitation to an exclusive world of automotive excellence.", author: "James K.", location: "Miami Beach" }
  ];

  const ConciergeForm = ({ onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-black border border-gold/30 p-8 md:p-12 max-w-md w-full animate-slideUp">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-3xl font-serif text-white mb-2">Private Consultation</h2>
        <p className="text-gold text-sm tracking-widest uppercase mb-8">By Invitation Only</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full bg-transparent border-b border-gold/50 text-white placeholder-white/40 py-3 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          
          <div>
            <input
              type="tel"
              required
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-transparent border-b border-gold/50 text-white placeholder-white/40 py-3 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          
          <div>
            <input
              type="email"
              placeholder="Email (Optional)"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-transparent border-b border-gold/50 text-white placeholder-white/40 py-3 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          
          <div>
            <select
              value={formData.carInterest}
              onChange={(e) => setFormData({...formData, carInterest: e.target.value})}
              className="w-full bg-black border-b border-gold/50 text-white py-3 focus:outline-none focus:border-gold transition-colors"
            >
              <option value="">Select Your Interest</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="Bentley">Bentley</option>
              <option value="Porsche">Porsche</option>
              <option value="Maserati">Maserati</option>
              <option value="Aston Martin">Aston Martin</option>
              <option value="Ferrari">Ferrari</option>
              <option value="Other">Other Marques</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gold text-black font-medium py-4 hover:shadow-gold transition-all duration-500 tracking-widest uppercase"
          >
            Send My Request
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500&display=swap');
        
        :root {
          --gold: #D4AF37;
          --black: #000000;
          --white: #FFFFFF;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background: var(--black);
          color: var(--white);
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .text-gold {
          color: var(--gold);
        }
        
        .border-gold {
          border-color: var(--gold);
        }
        
        .bg-gold {
          background-color: var(--gold);
        }
        
        .shadow-gold {
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slowZoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.05);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 2.5s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 2.5s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        
        .animate-slowZoom {
          animation: slowZoom 20s ease-in-out infinite alternate;
        }
        
        .parallax {
          transform: translateY(var(--parallax-y, 0));
          transition: transform 0.5s ease-out;
        }
        
        .card-hover {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.2);
        }
        
        .text-shadow-luxury {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        
        .gradient-gold {
          background: linear-gradient(135deg, var(--gold), #B8941F);
        }
        
        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white scroll-smooth">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
          <div className="absolute inset-0 animate-slowZoom">
            <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black" />
          </div>
          
          <div className="relative z-20 text-center px-4 animate-fadeInUp">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 text-shadow-luxury">
              Exclusivity in Motion.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 font-light">
              Curated Pre-Owned Luxury Cars for the Discerning Few.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gold text-black px-10 py-5 text-lg font-medium tracking-wider hover:shadow-gold transition-all duration-500 uppercase"
            >
              Request a Private Viewing
            </button>
            <p className="text-gold text-sm tracking-[0.3em] uppercase mt-6">By Invitation Only</p>
          </div>
        </section>

        {/* Curated Collection */}
        <section 
          ref={(el) => observerRefs.current[0] = el}
          id="collection"
          className={`py-20 px-4 md:px-8 lg:px-16 transition-all duration-1000 ${isVisible.collection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">Our Curated Collection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {carCollection.map((car) => (
              <div key={car.id} className="group relative overflow-hidden card-hover cursor-pointer">
                <div className="aspect-[4/3] bg-gray-900 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  {car.reserved && (
                    <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
                      <span className="text-gold text-2xl font-serif tracking-widest uppercase">Reserved</span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="font-serif text-2xl text-white group-hover:text-gold transition-colors duration-500">
                      {car.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Luxe Curation Process */}
        <section 
          ref={(el) => observerRefs.current[1] = el}
          id="curation"
          className={`py-20 transition-all duration-1000 ${isVisible.curation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="grid md:grid-cols-2 min-h-[600px]">
            <div className="bg-gray-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
            </div>
            
            <div className="flex items-center justify-center p-12 md:p-16">
              <div>
                <h2 className="font-serif text-4xl md:text-5xl mb-4">The Luxe Curation Process</h2>
                <div className="w-20 h-0.5 bg-gold mb-8" />
                <p className="text-white/80 leading-relaxed text-lg">
                  Every Epic Luxe automobile undergoes 300+ inspection points, marque-certified verification, 
                  and provenance authentication. Only the extraordinary makes the cut.
                </p>
                <p className="text-white/80 leading-relaxed text-lg mt-6">
                  Our specialists examine each vehicle's heritage, maintenance records, and ownership history 
                  to ensure it meets the exacting standards of our distinguished clientele.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bespoke Ownership Experience */}
        <section 
          ref={(el) => observerRefs.current[2] = el}
          id="experience"
          className={`py-20 px-4 md:px-8 lg:px-16 transition-all duration-1000 ${isVisible.experience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">Bespoke Ownership Experience</h2>
          
          <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide">
            <div className="min-w-[350px] bg-black border border-gold/20 p-8 card-hover">
              <div className="text-gold text-5xl mb-6">◈</div>
              <h3 className="font-serif text-2xl mb-4">White-Glove Delivery</h3>
              <p className="text-white/70">Your vehicle arrives in a climate-controlled trailer, detailed to perfection, and presented with ceremony.</p>
            </div>
            
            <div className="min-w-[350px] bg-black border border-gold/20 p-8 card-hover">
              <div className="text-gold text-5xl mb-6">◈</div>
              <h3 className="font-serif text-2xl mb-4">Invitation-Only Test Drives</h3>
              <p className="text-white/70">Experience your prospective automobile at exclusive venues, curated for discerning evaluation.</p>
            </div>
            
            <div className="min-w-[350px] bg-black border border-gold/20 p-8 card-hover">
              <div className="text-gold text-5xl mb-6">◈</div>
              <h3 className="font-serif text-2xl mb-4">Concierge Services</h3>
              <p className="text-white/70">From registration to bespoke financing solutions, every detail handled with discretion and expertise.</p>
            </div>
          </div>
        </section>

        {/* Limited Release Spotlight */}
        <section 
          ref={(el) => observerRefs.current[3] = el}
          id="spotlight"
          className={`relative h-[80vh] flex items-center justify-center overflow-hidden transition-all duration-1000 ${isVisible.spotlight ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
          <div className="absolute inset-0 bg-gray-900" />
          
          <div className="relative z-10 text-center px-4">
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-4">
              This Month's Featured: Bentley Continental GT
            </h2>
            <p className="text-gold text-xl mb-8 tracking-wider">One of Three Available Nationwide</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-transparent border-2 border-gold text-gold px-10 py-4 hover:bg-gold hover:text-black transition-all duration-500 uppercase tracking-wider"
            >
              Reserve Viewing
            </button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">Distinguished Experiences</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[200px] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <blockquote className="text-center animate-fadeIn" key={testimonialIndex}>
                  <p className="text-2xl md:text-3xl font-light italic mb-6">
                    "{testimonials[testimonialIndex].quote}"
                  </p>
                  <footer className="text-gold">
                    — {testimonials[testimonialIndex].author}, {testimonials[testimonialIndex].location}
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Private Invitation CTA */}
        <section className="py-32 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Begin Your Epic Luxe Journey</h2>
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-8">Limited Openings Weekly</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-transparent border-2 border-gold text-gold px-12 py-5 hover:bg-gold hover:text-black transition-all duration-500 uppercase tracking-wider text-lg"
          >
            Request Invitation
          </button>
        </section>

        {/* Sticky Footer Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gold/20 p-4 z-40 flex justify-between items-center">
          <span className="text-white text-sm md:text-base">🚗 Exclusive Access — Apply Now</span>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gold text-black px-6 py-2 text-sm font-medium hover:shadow-gold transition-all duration-300 uppercase"
          >
            Get Started
          </button>
        </div>

        {/* Modals */}
        {showModal && <ConciergeForm onClose={() => setShowModal(false)} />}
        
        {showExitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowExitModal(false)} />
            <div className="relative bg-black border border-gold/30 p-8 md:p-12 max-w-md w-full animate-slideUp">
              <h2 className="font-serif text-3xl text-gold mb-4">Before You Go — Reserve Your Slot</h2>
              <p className="text-white/80 mb-6">Exclusive viewing appointments are limited. Secure yours today.</p>
              <ConciergeForm onClose={() => setShowExitModal(false)} />
            </div>
          </div>
        )}
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            "name": "Epic Luxe",
            "description": "Premium pre-owned luxury cars - Mercedes-Benz, Bentley, Porsche, Maserati",
            "url": "https://epicluxe.com",
            "telephone": "+1-800-EPIC-LUX",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Luxury Pre-Owned Vehicles",
              "itemListElement": carCollection.map(car => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Car",
                  "name": car.name,
                  "brand": car.name.split(' ')[0]
                }
              }))
            }
          })
        }}
      />
    </>
  );
};

export default OffersLandingPage;