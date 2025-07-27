'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star, Play, ArrowRight, Quote, Heart, MapPin, Calendar, CheckCircle, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const TestimonialsPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [filter, setFilter] = useState('All');
  const [isVisible, setIsVisible] = useState({});
  const heroRef = useRef(null);
  const quotesRef = useRef(null);
  
  // Dummy data for testimonials
  const videoTestimonials = [
    {
      id: 1,
      name: "Rajesh Mehta",
      city: "Mumbai",
      role: "CEO, Tech Innovators",
      car: "Mercedes S-Class 2022",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      quote: "Exceptional service that exceeded all expectations. The attention to detail was remarkable.",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Sharma",
      city: "Delhi",
      role: "Entrepreneur",
      car: "BMW X7 2023",
      thumbnail: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=60&h=60&fit=crop&crop=face",
      quote: "A seamless luxury experience from start to finish. Truly world-class service.",
      rating: 5
    },
    {
      id: 3,
      name: "Vikram Singh",
      city: "Bangalore",
      role: "Real Estate Mogul",
      car: "Audi A8L 2022",
      thumbnail: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      quote: "The personalized approach and premium quality made all the difference.",
      rating: 5
    },
    {
      id: 4,
      name: "Anita Gupta",
      city: "Hyderabad",
      role: "Investment Banker",
      car: "Jaguar F-Pace 2023",
      thumbnail: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face",
      quote: "Outstanding professionalism and expertise in luxury automotive solutions.",
      rating: 5
    }
  ];

  const featuredQuotes = [
    {
      id: 1,
      name: "Arjun Kapoor",
      city: "Mumbai",
      role: "Film Producer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
      quote: "Raam Group redefined luxury car buying for me. Impeccable service!",
      rating: 5,
      type: "Buyer",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Kavya Reddy",
      city: "Hyderabad",
      role: "Tech CEO",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      quote: "Sold my Porsche through them - transparent, professional, premium experience.",
      rating: 5,
      type: "Seller",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Rohit Agarwal",
      city: "Delhi",
      role: "Investment Advisor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      quote: "The after-sales service is exceptional. They truly care about their clients.",
      rating: 5,
      type: "Service",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "Deepika Iyer",
      city: "Chennai",
      role: "Fashion Designer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
      quote: "Found my dream BMW X5 here. The expertise and guidance were invaluable.",
      rating: 5,
      type: "Buyer",
      date: "2 months ago"
    },
    {
      id: 5,
      name: "Sanjay Malhotra",
      city: "Pune",
      role: "Restaurant Chain Owner",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      quote: "Premium quality, transparent pricing, and world-class customer care.",
      rating: 5,
      type: "Buyer",
      date: "1 week ago"
    },
    {
      id: 6,
      name: "Meera Shah",
      city: "Ahmedabad",
      role: "Jewelry Designer",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=60&h=60&fit=crop&crop=face",
      quote: "They helped me upgrade from my old luxury car seamlessly.",
      rating: 5,
      type: "Service",
      date: "3 weeks ago"
    }
  ];

  const customerGallery = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop",
      customerName: "Amit Patel",
      carModel: "Mercedes S-Class",
      quote: "A dream come true!",
      likes: 24
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=300&fit=crop",
      customerName: "Riya Jain",
      carModel: "BMW X7",
      quote: "Perfect luxury experience",
      likes: 31
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=500&fit=crop",
      customerName: "Karan Singh",
      carModel: "Audi A8L",
      quote: "Excellence delivered",
      likes: 18
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=350&fit=crop",
      customerName: "Neha Gupta",
      carModel: "Jaguar F-Pace",
      quote: "Beyond expectations",
      likes: 27
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=400&fit=crop",
      customerName: "Rahul Verma",
      carModel: "Range Rover",
      quote: "Luxury redefined",
      likes: 22
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=300&fit=crop",
      customerName: "Pooja Desai",
      carModel: "Porsche Cayenne",
      quote: "Perfect choice",
      likes: 35
    }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Filter quotes
  const filteredQuotes = filter === 'All' 
    ? featuredQuotes 
    : featuredQuotes.filter(quote => quote.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-[#D4AF37]">Raam Group</div>
          <div className="flex space-x-8 text-white/70">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Inventory</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Services</a>
            <a href="#" className="text-[#D4AF37]">Testimonials</a>
          </div>
          <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-6 py-2 rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300">
            Call Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">
              Our Clients, Our Pride
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              See how we transform the car buying & selling experience for India's elite
            </p>
            <button className="group bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105">
              Share Your Experience
              <ArrowRight className="inline ml-2 group-hover:translate-x-2 transition-transform" size={20} />
            </button>
          </div>
        </div>
        
        {/* Floating testimonial bubbles */}
        <div className="absolute top-20 left-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 max-w-xs animate-float">
          <div className="flex items-center space-x-3 mb-2">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                 className="w-10 h-10 rounded-full border-2 border-[#D4AF37]" alt="Client" />
            <div className="text-sm">
              <div className="text-white font-semibold">Rajesh M.</div>
              <div className="flex text-[#D4AF37]">{'★'.repeat(5)}</div>
            </div>
          </div>
          <p className="text-white/80 text-sm">"Outstanding service quality!"</p>
        </div>
        
        <div className="absolute bottom-32 right-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 max-w-xs animate-float-delayed">
          <div className="flex items-center space-x-3 mb-2">
            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face" 
                 className="w-10 h-10 rounded-full border-2 border-[#D4AF37]" alt="Client" />
            <div className="text-sm">
              <div className="text-white font-semibold">Priya S.</div>
              <div className="flex text-[#D4AF37]">{'★'.repeat(5)}</div>
            </div>
          </div>
          <p className="text-white/80 text-sm">"Luxury redefined!"</p>
        </div>
      </section>

      {/* Video Testimonials Slider */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-animate id="video-testimonials">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#D4AF37]">Client Stories</h2>
            <p className="text-xl text-white/70">Hear directly from our satisfied customers</p>
          </div>
          
          <div className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide">
            {videoTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="flex-shrink-0 w-80 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img 
                    src={testimonial.thumbnail} 
                    alt={testimonial.car}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-[#D4AF37] text-black p-4 rounded-full hover:bg-[#BFA980] transition-colors">
                      <Play size={24} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-[#D4AF37]"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                    <p className="text-[#D4AF37] text-sm flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {testimonial.city}
                    </p>
                  </div>
                </div>
                
                <div className="flex text-[#D4AF37] mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-white/80 text-sm mb-4 leading-relaxed">"{testimonial.quote}"</p>
                
                <div className="text-xs text-white/50 bg-white/5 rounded-lg p-2">
                  Purchased: {testimonial.car}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quotes Grid */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-animate id="featured-quotes">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#D4AF37]">What Our Clients Say</h2>
            <p className="text-xl text-white/70 mb-8">Authentic reviews from luxury car enthusiasts</p>
            
            {/* Filter buttons */}
            <div className="flex justify-center space-x-4 mb-12">
              {['All', 'Buyer', 'Seller', 'Service'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    filter === filterType
                      ? 'bg-[#D4AF37] text-black font-semibold'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {filterType}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuotes.map((quote, index) => (
              <div 
                key={quote.id}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <img 
                    src={quote.avatar} 
                    alt={quote.name}
                    className="w-14 h-14 rounded-full border-3 border-[#D4AF37] group-hover:border-[#BFA980] transition-colors"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg">{quote.name}</h3>
                    <p className="text-white/60 text-sm">{quote.role}</p>
                    <p className="text-[#D4AF37] text-sm flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {quote.city}
                    </p>
                  </div>
                  <Quote className="text-[#D4AF37]/30 group-hover:text-[#D4AF37]/50 transition-colors" size={24} />
                </div>
                
                <div className="flex text-[#D4AF37] mb-4">
                  {[...Array(quote.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-white/80 leading-relaxed mb-4">"{quote.quote}"</p>
                
                <div className="flex justify-between items-center text-xs text-white/50">
                  <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-1 rounded-full">
                    {quote.type}
                  </span>
                  <span className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {quote.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Gallery */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-animate id="customer-gallery">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#D4AF37]">Happy Moments</h2>
            <p className="text-xl text-white/70">Our clients with their dream cars</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {customerGallery.map((item, index) => (
              <div 
                key={item.id}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500 transform hover:scale-105"
                style={{ 
                  gridRow: index % 3 === 0 ? 'span 2' : 'span 1',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <img 
                  src={item.image} 
                  alt={`${item.customerName} with ${item.carModel}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{item.customerName}</h3>
                    <p className="text-[#D4AF37] text-sm mb-2">{item.carModel}</p>
                    <p className="text-white/80 text-sm mb-3">"{item.quote}"</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-white/60 text-sm">
                        <Heart size={16} className="text-red-400" />
                        <span>{item.likes}</span>
                      </div>
                      <CheckCircle className="text-[#D4AF37]" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Review Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12" data-animate id="google-reviews">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#D4AF37]">
              Rated 4.9★ by hundreds of delighted customers
            </h2>
            <p className="text-xl text-white/70">Verified reviews from Google</p>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                   alt="Google" className="w-8 h-8" />
              <div className="text-2xl font-bold text-white">Google Reviews</div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="text-4xl font-bold text-[#D4AF37]">4.9</div>
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} fill="currentColor" />
                ))}
              </div>
            </div>
            
            <p className="text-white/70 text-lg mb-6">Based on 847+ verified reviews</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                       className="w-10 h-10 rounded-full" alt="Reviewer" />
                  <div>
                    <div className="text-white font-semibold">Amit Kumar</div>
                    <div className="flex text-[#D4AF37] text-sm">{'★'.repeat(5)}</div>
                  </div>
                </div>
                <p className="text-white/80 text-sm">"Exceptional service and genuine luxury cars. Highly recommended!"</p>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face" 
                       className="w-10 h-10 rounded-full" alt="Reviewer" />
                  <div>
                    <div className="text-white font-semibold">Sneha Patil</div>
                    <div className="flex text-[#D4AF37] text-sm">{'★'.repeat(5)}</div>
                  </div>
                </div>
                <p className="text-white/80 text-sm">"Professional team, transparent process, and premium quality vehicles."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 backdrop-blur-md rounded-3xl p-12 border border-[#D4AF37]/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#D4AF37]">
              Share Your Experience
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Join hundreds of satisfied customers and let others know about your luxury car journey with us
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="group bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105">
                Write Your Review
                <Star className="inline ml-2 group-hover:rotate-12 transition-transform" size={20} />
              </button>
              
              <button className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full text-lg font-semibold border border-white/20 hover:border-[#D4AF37]/50 hover:bg-white/20 transition-all duration-300">
                Share on Social Media
                <ArrowRight className="inline ml-2 group-hover:translate-x-2 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0e0e0e] border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="text-3xl font-bold text-[#D4AF37] mb-4">Raam Group</div>
              <p className="text-white/70 mb-6 leading-relaxed">
                India's premier destination for luxury pre-owned vehicles. We specialize in providing 
                exceptional cars with unmatched service quality and complete transparency.
              </p>
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-[#D4AF37]/20 p-2 rounded-lg">
                  <Phone size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white font-semibold">+91 98765 43210</p>
                  <p className="text-white/60 text-sm">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-[#D4AF37]/20 p-2 rounded-lg">
                  <Mail size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white font-semibold">info@raamgroup.com</p>
                  <p className="text-white/60 text-sm">Quick response guaranteed</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'Luxury Inventory', 'Sell Your Car', 'Car Loans', 'Insurance', 'About Us', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors duration-300 flex items-center group">
                      <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-6">Our Services</h3>
              <ul className="space-y-3">
                {['Pre-Owned Luxury Cars', 'Car Inspection', 'Financing Solutions', 'Trade-In Services', 'Extended Warranty', 'Maintenance Support', 'Documentation'].map((service) => (
                  <li key={service}>
                    <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors duration-300 flex items-center group">
                      <CheckCircle size={14} className="mr-2 text-[#D4AF37]/50" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, label: 'Facebook' },
                    { icon: Twitter, label: 'Twitter' },
                    { icon: Instagram, label: 'Instagram' },
                    { icon: Linkedin, label: 'LinkedIn' }
                  ].map(({ icon: Icon, label }) => (
                    <a 
                      key={label}
                      href="#" 
                      className="bg-white/10 hover:bg-[#D4AF37]/20 p-3 rounded-full transition-all duration-300 group hover:scale-110"
                      aria-label={label}
                    >
                      <Icon size={20} className="text-white/70 group-hover:text-[#D4AF37] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-center md:text-right">
                <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                  <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-white/60 text-sm space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p>&copy; 2024 Raam Group. All rights reserved.</p>
                <p className="mt-1">Premium Pre-Owned Luxury Vehicles - Trusted Since 2015</p>
              </div>
              
              <div className="flex flex-wrap justify-center space-x-6">
                <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-[#D4AF37] transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-[#D4AF37] transition-colors">Sitemap</a>
              </div>
            </div>
          </div>

          {/* Additional Trust Indicators */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex justify-center items-center space-x-8 text-white/40 text-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-400" />
                <span>Certified Dealer</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={16} className="text-[#D4AF37]" />
                <span>4.9★ Rated</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart size={16} className="text-red-400" />
                <span>5000+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
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
      `}</style>
    </div>
  );
};

export default TestimonialsPage;
