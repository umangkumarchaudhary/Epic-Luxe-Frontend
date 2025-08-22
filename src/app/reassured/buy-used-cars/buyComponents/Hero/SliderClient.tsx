'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { usePreloadImages } from '@/hooks/usePreloadImages';

// Types
interface Slide {
  id: string;
  imageUrl: string;
  mobileImageUrl?: string;
  title: string;
  description: string;
}

interface SliderClientProps {
  slides?: Slide[]; // Make slides optional
  priority?: boolean;
}

export default function SliderClient({ slides = [], priority = true }: SliderClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const slideRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver<HTMLDivElement>(slideRef, { threshold: 0.3 });

  // Always call hooks - but handle empty slides gracefully
  const imageUrls = slides.map((slide) => slide.imageUrl);
  const mobileImageUrls = slides.map((slide) => slide.mobileImageUrl || slide.imageUrl);
  const imagesLoaded = usePreloadImages([...imageUrls, ...mobileImageUrls]);

  // Mobile detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (!isVisible || isHovered || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible, isHovered, slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Reset currentIndex if it's out of bounds
  useEffect(() => {
    if (currentIndex >= slides.length) {
      setCurrentIndex(0);
    }
  }, [slides.length, currentIndex]);

  // Early return if no slides provided - AFTER all hooks
  if (!slides || slides.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-500 bg-gray-100">
        <div className="text-center">
          <p className="text-lg mb-2">No slides available</p>
          <p className="text-sm">Please check your slider configuration.</p>
        </div>
      </div>
    );
  }

  if (!imagesLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-white bg-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading slides...</p>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={slideRef}
      className="relative w-full overflow-hidden"
      style={{
        height: "25vh",
        minHeight: 180,
        maxHeight: 250,
        marginTop: 60,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Responsive height styles */}
      <style jsx>{`
        section {
          height: 25vh;
          min-height: 180px;
          max-height: 250px;
        }
        @media (max-width: 640px) {
          section {
            height: 18vh;
            min-height: 150px;
            max-height: 200px;
          }
        }
      `}</style>

      {/* Slides */}
      <div
        className="flex transition-transform duration-700 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 relative h-full"
          >
            <Image
              src={isMobile && slide.mobileImageUrl ? slide.mobileImageUrl : slide.imageUrl}
              alt={slide.title}
              fill
              className="object-cover"
              priority={priority && index === 0}
              sizes="100vw"
            />
            {/* Removed text overlay completely */}
          </div>
        ))}
      </div>

      {/* Controls - Only show if more than one slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-5 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-5 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 w-full flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}