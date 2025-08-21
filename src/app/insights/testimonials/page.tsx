'use client';

import React, { useState } from 'react';
import { } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

// Import all components
import EpicLuxeHero from './EpicLuxeHero';
import TestimonialsCarousel from './TestimonialsCarousel';
import HappyMomentsGallery from './HappyMomentsGallery';
import GoogleReviewsPremium from './GoogleReviewsPremium';
import ShareExperienceForm from './ShareExperienceForm';
import EpicLuxeSharePanel from './EpicLuxeSharePanel';

const TestimonialsPage = () => {
  const [isShareFormOpen, setIsShareFormOpen] = useState(false);
  const [isSharePanelOpen, setIsSharePanelOpen] = useState(false);
  
  // Dummy data for testimonials (unused - kept for future implementation)
  // const videoTestimonials = [
  //   {
  //     id: 1,
  //     name: "Rajesh Mehta",
  //     city: "Mumbai",
  //     role: "CEO, Tech Innovators",
  //     car: "Mercedes S-Class 2022",
  //     thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  //     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  //     quote: "Exceptional service that exceeded all expectations. The attention to detail was remarkable.",
  //     rating: 5
  //   },
  //   {
  //     id: 2,
  //     name: "Priya Sharma",
  //     city: "Delhi",
  //     role: "Entrepreneur",
  //     car: "BMW X7 2023",
  //     thumbnail: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
  //     avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=60&h=60&fit=crop&crop=face",
  //     quote: "A seamless luxury experience from start to finish. Truly world-class service.",
  //     rating: 5
  //   },
  //   {
  //     id: 3,
  //     name: "Vikram Singh",
  //     city: "Bangalore",
  //     role: "Real Estate Mogul",
  //     car: "Audi A8L 2022",
  //     thumbnail: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
  //     avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
  //     quote: "The personalized approach and premium quality made all the difference.",
  //     rating: 5
  //   },
  //   {
  //     id: 4,
  //     name: "Anita Gupta",
  //     city: "Hyderabad",
  //     role: "Investment Banker",
  //     car: "Jaguar F-Pace 2023",
  //     thumbnail: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
  //     avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face",
  //     quote: "Outstanding professionalism and expertise in luxury automotive solutions.",
  //     rating: 5
  //   }
  // ];

  // const featuredQuotes = [
  //   {
  //     id: 1,
  //     name: "Arjun Kapoor",
  //     city: "Mumbai",
  //     role: "Film Producer",
  //     avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
  //     quote: "Raam Group redefined luxury car buying for me. Impeccable service!",
  //     rating: 5,
  //     type: "Buyer",
  //     date: "2 weeks ago"
  //   },
  //   {
  //     id: 2,
  //     name: "Kavya Reddy",
  //     city: "Hyderabad",
  //     role: "Tech CEO",
  //     avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
  //     quote: "Sold my Porsche through them - transparent, professional, premium experience.",
  //     rating: 5,
  //     type: "Seller",
  //     date: "1 month ago"
  //   },
  //   {
  //     id: 3,
  //     name: "Rohit Agarwal",
  //     city: "Delhi",
  //     role: "Investment Advisor",
  //     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  //     quote: "The after-sales service is exceptional. They truly care about their clients.",
  //     rating: 5,
  //     type: "Service",
  //     date: "3 weeks ago"
  //   },
  //   {
  //     id: 4,
  //     name: "Deepika Iyer",
  //     city: "Chennai",
  //     role: "Fashion Designer",
  //     avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
  //     quote: "Found my dream BMW X5 here. The expertise and guidance were invaluable.",
  //     rating: 5,
  //     type: "Buyer",
  //     date: "2 months ago"
  //   },
  //   {
  //     id: 5,
  //     name: "Sanjay Malhotra",
  //     city: "Pune",
  //     role: "Restaurant Chain Owner",
  //     avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
  //     quote: "Premium quality, transparent pricing, and world-class customer care.",
  //     rating: 5,
  //     type: "Buyer",
  //     date: "1 week ago"
  //   },
  //   {
  //     id: 6,
  //     name: "Meera Shah",
  //     city: "Ahmedabad",
  //     role: "Jewelry Designer",
  //     avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=60&h=60&fit=crop&crop=face",
  //     quote: "They helped me upgrade from my old luxury car seamlessly.",
  //     rating: 5,
  //     type: "Service",
  //     date: "3 weeks ago"
  //   }
  // ];

  // const customerGallery = [
  //   {
  //     id: 1,
  //     image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop",
  //     customerName: "Amit Patel",
  //     carModel: "Mercedes S-Class",
  //     quote: "A dream come true!",
  //     likes: 24
  //   },
  //   {
  //     id: 2,
  //     image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=300&fit=crop",
  //     customerName: "Riya Jain",
  //     carModel: "BMW X7",
  //     quote: "Perfect luxury experience",
  //     likes: 31
  //   },
  //   {
  //     id: 3,
  //     image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=500&fit=crop",
  //     customerName: "Karan Singh",
  //     carModel: "Audi A8L",
  //     quote: "Excellence delivered",
  //     likes: 18
  //   },
  //   {
  //     id: 4,
  //     image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=350&fit=crop",
  //     customerName: "Neha Gupta",
  //     carModel: "Jaguar F-Pace",
  //     quote: "Beyond expectations",
  //     likes: 27
  //   },
  //   {
  //     id: 5,
  //     image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=400&fit=crop",
  //     customerName: "Rahul Verma",
  //     carModel: "Range Rover",
  //     quote: "Luxury redefined",
  //     likes: 22
  //   },
  //   {
  //     id: 6,
  //     image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=300&fit=crop",
  //     customerName: "Pooja Desai",
  //     carModel: "Porsche Cayenne",
  //     quote: "Perfect choice",
  //     likes: 35
  //   }
  // ];

  // Intersection Observer for animations


  // Share form handlers
  const handleShareClick = () => {
    setIsShareFormOpen(true);
  };

  const handleCloseShareForm = () => {
    setIsShareFormOpen(false);
  };

  // Share panel handlers
  const handleSocialShareClick = () => {
    setIsSharePanelOpen(true);
  };

  const handleCloseSharePanel = () => {
    setIsSharePanelOpen(false);
  };

  // Write review handler
  const handleWriteReviewClick = () => {
    setIsShareFormOpen(true);
  };

  // Watch stories handler - scroll to Happy Moments Gallery
  const handleWatchStoriesClick = () => {
    const gallerySection = document.querySelector('[data-section="happy-moments"]');
    if (gallerySection) {
      gallerySection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      
      {/* EpicLuxeHero - Cinematic video hero section */}
      <EpicLuxeHero 
        onShareClick={handleShareClick} 
        onWatchStoriesClick={handleWatchStoriesClick}
      />

      {/* TestimonialsCarousel - Premium animated carousel */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-manrope">
              <span className="text-white">What Our Clients</span>{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">Say</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-manrope">Authentic reviews from luxury car enthusiasts</p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* HappyMomentsGallery - Masonry layout */}
      <section 
        data-section="happy-moments"
        className="py-20 px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-manrope">
              <span className="text-white">Happy</span>{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">Moments</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-manrope">Our clients with their dream cars</p>
          </div>
          <HappyMomentsGallery />
        </div>
      </section>

      {/* GoogleReviewsPremium - Big customer image banners */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <GoogleReviewsPremium 
            onShareClick={handleSocialShareClick} 
            onWriteReviewClick={handleWriteReviewClick}
          />
        </div>
      </section>

      {/* ShareExperienceForm - Modal for sharing experiences */}
      <ShareExperienceForm 
        isOpen={isShareFormOpen} 
        onClose={handleCloseShareForm} 
      />

      {/* EpicLuxeSharePanel - Social media sharing panel */}
      <EpicLuxeSharePanel 
        isOpen={isSharePanelOpen} 
        onClose={handleCloseSharePanel} 
      />

      <Footer />
    </div>
  );
};

export default TestimonialsPage;