'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star, ArrowRight, Quote, Heart, MapPin, Calendar, CheckCircle} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';


const TestimonialsPage = () => {
  
  const [filter, setFilter] = useState('All');
  const [, setIsVisible] = useState({});
  const heroRef = useRef(null);
  
  

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
       <Header />
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
  See how we transform the car buying &amp; selling experience for India&apos;s elite
</p>


            <button className="group bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105">
              Share Your Experience
              <ArrowRight className="inline ml-2 group-hover:translate-x-2 transition-transform" size={20} />
            </button>
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
                  <Image 
  src={quote.avatar}
  alt={quote.name}
  width={56} // w-14 = 14 * 4 = 56px
  height={56} // h-14 = 14 * 4 = 56px
  className="rounded-full border-3 border-[#D4AF37] group-hover:border-[#BFA980] transition-colors"
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
                
                <p className="text-white/80 leading-relaxed mb-4">&quot;{quote.quote}&quot;</p>

                
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
                <Image
  src={item.image}
  alt={`${item.customerName} with ${item.carModel}`}
  width={800}          // Adjust based on actual layout needs
  height={600}         // Adjust for aspect ratio
  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
/>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{item.customerName}</h3>
                    <p className="text-[#D4AF37] text-sm mb-2">{item.carModel}</p>
                    <p className="text-white/80 text-sm mb-3">&quot;{item.quote}&quot;</p>

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
              <Image
  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
  alt="Google"
  width={32} // w-8 = 8 * 4 = 32px
  height={32} // h-8 = 8 * 4 = 32px
  className="w-8 h-8"
/>

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
                  <Image
  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
  alt="Reviewer"
  width={40} // w-10 = 40px
  height={40} // h-10 = 40px
  className="rounded-full"
/>

                  <div>
                    <div className="text-white font-semibold">Amit Kumar</div>
                    <div className="flex text-[#D4AF37] text-sm">{'★'.repeat(5)}</div>
                  </div>
                </div>
                <p className="text-white/80 text-sm">
  &quot;Exceptional service and genuine luxury cars. Highly recommended!&quot;
</p>
                      </div>
              
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                   <Image
  src="https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face"
  width={40}
  height={40}
  className="rounded-full"
  alt="Reviewer"
/>

                  <div>
                    <div className="text-white font-semibold">Sneha Patil</div>
                    <div className="flex text-[#D4AF37] text-sm">{'★'.repeat(5)}</div>
                  </div>
                </div>
                <p className="text-white/80 text-sm">
  &quot;Professional team, transparent process, and premium quality vehicles.&quot;
</p>

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

      <Footer />

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
