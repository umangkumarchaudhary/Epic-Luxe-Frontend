"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

interface GoogleReviewsPremiumProps {
  onShareClick?: () => void;
  onWriteReviewClick?: () => void;
}

const reviews = [
  {
    name: "Amit Kumar",
    car: "Mercedes S-Class",
    review:
      "Exceptional service and genuine luxury cars. Highly recommended!",
    image: "/assets/images/review-amit.jpg",
    link: "https://g.page/r/CUSTOM_GOOGLE_REVIEW_LINK",
  },
  {
    name: "Sneha Patil",
    car: "Porsche Cayenne",
    review:
      "Professional team, transparent process, and premium quality vehicles.",
    image: "/assets/images/review-sneha.jpg",
    link: "https://g.page/r/CUSTOM_GOOGLE_REVIEW_LINK",
  },
  {
    name: "Ravi Sharma",
    car: "BMW X7",
    review:
      "A seamless luxury experience from start to finish. Truly world-class service.",
    image: "/assets/images/review-ravi.jpg",
    link: "https://g.page/r/CUSTOM_GOOGLE_REVIEW_LINK",
  },
];

export default function GoogleReviewsPremium({ onShareClick, onWriteReviewClick }: GoogleReviewsPremiumProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold font-manrope"
          >
            <span className="text-white">Rated 4.9★ by Hundreds of</span>{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">Delighted Customers</span>
          </motion.h2>
          <p className="text-lg md:text-xl text-gray-300 mt-2 font-manrope">
            Verified Google Reviews — Real people, real luxury stories
          </p>
        </div>

        {/* Desktop View - Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.a
              href={review.link}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative block rounded-2xl overflow-hidden group h-80"
            >
              {/* Full Background Image */}
              <Image
                src={review.image}
                alt={`${review.name} with ${review.car}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">{review.name}</h3>
                  <p className="text-[#D4AF37] text-sm font-medium">{review.car}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" className="text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-white/90 italic text-sm leading-relaxed">&ldquo;{review.review}&rdquo;</p>
                  <span className="inline-block text-xs text-[#D4AF37] underline opacity-80 group-hover:opacity-100 transition-opacity">
                    View on Google Reviews
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile View - Swipeable Carousel */}
        <div className="md:hidden relative">
          {/* Carousel Container */}
          <div className="px-4">
            <div 
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {reviews.map((review, idx) => (
                  <div key={idx} className="w-full flex-shrink-0">
                    <motion.a
                      href={review.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="relative block rounded-2xl overflow-hidden group h-96 mx-1"
                    >
                      {/* Full Background Image */}
                      <Image
                        src={review.image}
                        alt={`${review.name} with ${review.car}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-white">{review.name}</h3>
                          <p className="text-[#D4AF37] text-sm font-medium">{review.car}</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={18} fill="currentColor" className="text-[#D4AF37]" />
                            ))}
                          </div>
                          <p className="text-white/90 italic text-sm leading-relaxed">&ldquo;{review.review}&rdquo;</p>
                          <span className="inline-block text-xs text-[#D4AF37] underline opacity-80 group-hover:opacity-100 transition-opacity">
                            View on Google Reviews
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {reviews.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`relative transition-all duration-500 ${
                  idx === currentSlide 
                    ? 'w-8 h-2' 
                    : 'w-2 h-2'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className={`w-full h-full rounded-full transition-all duration-500 ${
                  idx === currentSlide 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] shadow-lg shadow-[#D4AF37]/30' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}>
                  {idx === currentSlide && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Swipe Hint */}
          <motion.div 
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <p className="text-xs text-gray-400 font-manrope">
              Swipe to explore more reviews
            </p>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onWriteReviewClick}
            className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-semibold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all duration-200"
          >
            Write Your Review
          </button>
          <button
            onClick={onShareClick}
            className="bg-white/10 text-white px-6 py-3 rounded-full hover:bg-white/20 border border-white/20 transition-all duration-200"
          >
            Share on Social Media
          </button>
        </div>
      </div>
    </section>
  );
} 