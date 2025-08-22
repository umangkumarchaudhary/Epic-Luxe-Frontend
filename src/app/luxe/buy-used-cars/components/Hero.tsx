"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";

const slides = [
  {
    bgImage: "/assets/images/1.jpg",
    mobileImage: "/assets/images/li1.jpg",
  },
  {
    bgImage: "/assets/images/2.jpg",
    mobileImage: "/assets/images/li2.jpg",
  },
  {
    bgImage: "/assets/images/3.jpg",
    mobileImage: "/assets/images/li3.jpg",
  },
];


export default function EpicHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const slideCount = slides.length;

  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const debounceRef = useRef(false);

  const clearAllIntervals = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  };

  const startSlideAutoPlay = useCallback(() => {
    clearAllIntervals();

    slideIntervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 5000);
  }, [slideCount]);


  const handlePrevious = useCallback(() => {
    if (debounceRef.current) return;
    debounceRef.current = true;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
      setIsTransitioning(false);
      debounceRef.current = false;
    }, 400);
  }, [slideCount]);

  const handleNext = useCallback(() => {
    if (debounceRef.current) return;
    debounceRef.current = true;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
      setIsTransitioning(false);
      debounceRef.current = false;
    }, 400);
  }, [slideCount]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    clearAllIntervals();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isPaused) {
      startSlideAutoPlay();
    } else {
      clearAllIntervals();
    }
    return () => clearAllIntervals();
  }, [isPaused, startSlideAutoPlay]);


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



  return (
    <>
      <section
        aria-label="EPIC Luxury Collection Slider"
        className="relative select-none overflow-hidden font-manrope"
        style={{
          height: "25vh",
          minHeight: 180,
          maxHeight: 250,
          marginTop: 60,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Responsive height & button width override */}
        <style jsx>{`
          section {
            height: 25vh;
            min-height: 180px;
            max-height: 250px;
          }
          @media (max-width: 640px) {
  section {
    height: 8vh;
    min-height: 80px;
    max-height: 120px;
  }
}

          .cta-buttons > div {
            width: auto !important;
            align-items: flex-start !important;
          }
          .cta-buttons button,
          .cta-buttons div {
            width: auto !important;
            max-width: 100%;
          }
          /* Ensure buttons do not grow and align left, no full width */
          .cta-buttons {
            display: inline-flex !important;
            align-items: center !important;
          }
          /* Remove full width on small devices */
          @media (max-width: 640px) {
            .cta-buttons button,
            .cta-buttons div {
              white-space: nowrap;
            }
          }
          /* Hide form scrollbar on small screens */
          .form-modal::-webkit-scrollbar {
            display: none;
          }
        `}</style>


        {/* Background slides */}
        <div className="absolute inset-0 will-change-transform">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                idx === current
                  ? "opacity-100 scale-100 blur-0"
                  : "opacity-0 scale-105 blur-sm"
              }`}
              aria-hidden={idx !== current}
              style={{ willChange: "opacity, transform, filter" }}
            >
              <Image
                src={isMobile ? slide.mobileImage : slide.bgImage}
                alt={`Banner ${idx + 1}`}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover transition-transform duration-1000"
                quality={95}
                style={{ objectPosition: "center center" }}
              />
            </div>
          ))}
        </div>



        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="nav-arrow absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 backdrop-blur-md border border-[#d4af37]/40 rounded-full text-[#d4af37] hover:bg-[#d4af37]/20 hover:border-[#d4af37] hover:scale-110 transition-all duration-300 group"
          aria-label="Previous slide"
          tabIndex={0}
          type="button"
          style={{ padding: "0.625rem" }}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="nav-arrow absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 backdrop-blur-md border border-[#d4af37]/40 rounded-full text-[#d4af37] hover:bg-[#d4af37]/20 hover:border-[#d4af37] hover:scale-110 transition-all duration-300 group"
          aria-label="Next slide"
          tabIndex={0}
          type="button"
          style={{ padding: "0.625rem" }}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Custom CSS animations */}
        <style jsx>{`
          @keyframes shimmer {
            0%,
            100% {
              transform: translateX(-100%);
              opacity: 0;
            }
            50% {
              transform: translateX(100%);
              opacity: 1;
            }
          }
          @keyframes float {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
            33% {
              transform: translate(10px, -10px) rotate(1deg);
            }
            66% {
              transform: translate(-5px, 5px) rotate(-1deg);
            }
          }
        `}</style>
      </section>

    </>
  );
}
