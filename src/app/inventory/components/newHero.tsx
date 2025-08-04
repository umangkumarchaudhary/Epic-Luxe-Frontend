"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  KeyboardEvent,
  MouseEvent,
} from "react";
import Image from "next/image";

const HEADER_HEIGHT = 60;

const slides = [
  {
    title: "Premium Collection",
    subtitle: "Discover exceptional pre-owned luxury vehicles, meticulously curated for perfection.",
    bgImage: "/assets/images/1.png",
    accent: "ELITE",
  },
  {
    title: "Exclusive Luxury Fleet",
    subtitle: "Elite vehicles that combine unmatched performance with prestigious elegance.",
    bgImage: "/assets/images/2.png",
    accent: "LUXURY",
  },
  {
    title: "Luxury You Deserve",
    subtitle: "Elevate your drive with our certified pre-owned luxury automobiles.",
    bgImage: "/assets/images/3.png",
    accent: "PRESTIGE",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = slides.length;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const debounceRef = useRef(false);

  // Destructure current slide for less repetition
  const { accent, title, subtitle } = slides[current];

  const clearIntervals = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }
  };

  const startProgress = useCallback(() => {
    clearIntervals();
    setProgress(0);
    let progressValue = 0;
    progressRef.current = setInterval(() => {
      progressValue += 100 / 60; // 6000ms / 100ms intervals
      setProgress(progressValue);
      if (progressValue >= 100 && progressRef.current) {
        clearInterval(progressRef.current);
      }
    }, 100);
  }, []);

  const nextSlide = useCallback(() => {
    if (debounceRef.current) return;
    debounceRef.current = true;
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
      setIsTransitioning(false);
      startProgress();
      debounceRef.current = false;
    }, 300);
  }, [slideCount, startProgress]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === current) return;
      if (debounceRef.current) return;
      debounceRef.current = true;

      setIsTransitioning(true);
      clearIntervals();

      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
        startProgress();
        intervalRef.current = setInterval(() => {
          nextSlide();
        }, 6000);
        debounceRef.current = false;
      }, 300);
    },
    [current, nextSlide, startProgress]
  );

  const handlePrevious = useCallback(() => {
    if (debounceRef.current) return;
    debounceRef.current = true;
    setIsTransitioning(true);

    clearIntervals();

    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
      setIsTransitioning(false);
      startProgress();
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
      debounceRef.current = false;
    }, 300);
  }, [nextSlide, slideCount, startProgress]);

  const handleNext = useCallback(() => {
    if (debounceRef.current) return;
    debounceRef.current = true;

    clearIntervals();

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
      setIsTransitioning(false);
      startProgress();
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
      debounceRef.current = false;
    }, 300);
  }, [nextSlide, slideCount, startProgress]);

  // Pause auto sliding on mouse enter and resume on leave
  const handleMouseEnter = () => {
    setIsPaused(true);
    clearIntervals();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startProgress();
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
  };

  // Keyboard navigation support for arrows and dots
  const handleKeyDownArrow = (e: KeyboardEvent<HTMLButtonElement>, direction: "prev" | "next") => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      if (direction === "prev") handlePrevious();
      else handleNext();
    }
  };

  const handleKeyDownDot = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToSlide(idx);
    }
  };

  // Scroll-to with dynamic offset for Explore Collection button
  const handleExploreClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetOffset = window.innerHeight * 0.7 + HEADER_HEIGHT;
    window.scrollTo({ top: targetOffset, behavior: "smooth" });
  };

  useEffect(() => {
    startProgress();
    intervalRef.current = setInterval(() => {
      if (!isPaused) nextSlide();
    }, 6000);

    return () => {
      clearIntervals();
    };
  }, [isPaused, nextSlide, startProgress]);

  return (
    <section
      aria-label="Premium Collection Slider"
      className="relative select-none overflow-hidden"
      style={{
        height: `calc(70vh - ${HEADER_HEIGHT}px)`,
        paddingTop: `${HEADER_HEIGHT}px`,
        marginBottom: "2px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background slides */}
      <div className="absolute inset-0 will-change-transform will-change-opacity">
        {slides.map(({ bgImage, title }, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              idx === current ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
            aria-hidden={idx !== current}
            style={{ willChange: "opacity, transform" }}
          >
            <Image
              src={bgImage}
              alt={title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover"
              quality={90}
            />
            {/* Dynamic overlay based on current slide */}
            <div
              className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 ${
                idx === current
                  ? "from-black/60 via-black/40 to-transparent"
                  : "from-black/80 via-black/60 to-black/20"
              }`}
              style={{ willChange: "background-color" }}
            />
          </div>
        ))}
      </div>

      {/* Futuristic grid overlay */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content container with aria-live for screen readers */}
      <div
        className="relative z-10 h-full flex items-center px-6 lg:px-16 container mx-auto"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="max-w-4xl w-full">
          {/* Accent badge */}
          <div className="mb-4 sm:mb-6 overflow-hidden">
            <div
              className={`inline-block px-3 sm:px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm border border-yellow-500/30 rounded-full transition-transform transition-opacity duration-700 will-change-transform ${
                isTransitioning ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
              }`}
              style={{ transitionDelay: isTransitioning ? "0ms" : "200ms" }}
              tabIndex={0}
            >
              <span className="text-yellow-400 text-xs sm:text-sm font-bold tracking-wider select-none">
                {accent}
              </span>
            </div>
          </div>

          {/* Main title */}
          <div className="mb-4 sm:mb-5 overflow-hidden">
            <h1
              className={`font-black leading-tight text-2xl sm:text-4xl md:text-5xl lg:text-6xl transition-transform transition-opacity duration-700 will-change-transform ${
                isTransitioning ? "translate-y-12 opacity-0" : "translate-y-0 opacity-100"
              }`}
              style={{ transitionDelay: isTransitioning ? "0ms" : "400ms" }}
            >
              <span className="block bg-gradient-to-r from-white via-yellow-200 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
                {title.split(" ")[0]}
              </span>
              <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text drop-shadow-lg">
                {title.split(" ").slice(1).join(" ")}
              </span>
            </h1>
          </div>

          

          {/* CTA Buttons */}
          <div className="overflow-hidden">
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-transform transition-opacity duration-700 will-change-transform ${
                isTransitioning ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
              }`}
              style={{ transitionDelay: isTransitioning ? "0ms" : "800ms" }}
            >
              <a
                href="tel:+1234567890"
                className="group relative px-6 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-sm sm:text-base rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30 hover:scale-105 inline-block text-center overflow-hidden will-change-transform"
                tabIndex={0}
              >
                <span className="relative z-10 transition-colors duration-300 select-none">Call Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <button
                onClick={handleExploreClick}
                type="button"
                className="group relative px-6 sm:px-7 py-2 sm:py-3 border-2 border-yellow-500 text-yellow-400 font-bold text-sm sm:text-base rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/20 hover:scale-105 overflow-hidden will-change-transform"
                tabIndex={0}
                aria-label="Scroll to Explore Collection"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300 select-none">
                  Explore Collection
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 backdrop-blur-sm border border-yellow-500/30 rounded-full text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-400 transition-all duration-300 group will-change-transform"
        aria-label="Previous slide"
        tabIndex={0}
        onKeyDown={(e) => handleKeyDownArrow(e, "prev")}
        type="button"
      >
        <svg
          className="w-5 h-5 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 backdrop-blur-sm border border-yellow-500/30 rounded-full text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-400 transition-all duration-300 group will-change-transform"
        aria-label="Next slide"
        tabIndex={0}
        onKeyDown={(e) => handleKeyDownArrow(e, "next")}
        type="button"
      >
        <svg
          className="w-5 h-5 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Enhanced navigation dots with progress ring */}
      <div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        role="tablist"
        aria-label="Select slide"
      >
        <div className="flex items-center gap-3">
          {slides.map((_, idx) => {
            const isActive = idx === current;
            return (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                onKeyDown={(e) => handleKeyDownDot(e, idx)}
                className={`relative group transition-transform duration-300 focus:outline-none ${
                  isActive ? "scale-110" : "scale-100 hover:scale-105"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-selected={isActive}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                {/* Background circle */}
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                    isActive
                      ? "border-yellow-400 bg-yellow-400/20"
                      : "border-yellow-600/50 bg-transparent group-hover:border-yellow-500"
                  }`}
                />
                {/* Progress ring for current slide */}
                {isActive && (
                  <svg className="absolute inset-0 w-3 h-3 -rotate-90" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                    <circle
                      cx="6"
                      cy="6"
                      r="4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-yellow-400 will-change-stroke"
                      strokeDasharray={`${2 * Math.PI * 4.5}`}
                      strokeDashoffset={`${2 * Math.PI * 4.5 * (1 - progress / 100)}`}
                      style={{ transition: progress === 0 ? "none" : "stroke-dashoffset 0.1s ease-out" }}
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slide counter with aria description and tooltip */}
      <div
        className="absolute top-1/2 right-6 -translate-y-1/2 z-20 text-right select-none"
        aria-label={`Slide ${current + 1} of ${slideCount}`}
        role="region"
        aria-live="polite"
      >
        <div
          className="text-yellow-400 font-bold text-xs tracking-wider"
          title={`Current slide number ${current + 1}`}
          tabIndex={0}
        >
          {String(current + 1).padStart(2, "0")}
        </div>
        <div className="w-8 h-0.5 bg-yellow-600/30 my-1">
          <div
            className="h-full bg-yellow-400 transition-all duration-300 will-change-width"
            style={{ width: `${((current + 1) / slideCount) * 100}%` }}
          />
        </div>
        <div className="text-yellow-600/70 text-xs" title={`Total slides: ${slideCount}`} tabIndex={0}>
          {String(slideCount).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}
