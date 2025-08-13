"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  KeyboardEvent,
  MouseEvent,
  FormEvent,
} from "react";
import Image from "next/image";

const slides = [
  {
    title: "EPIC Collection",
    subtitle: "Discover pre-owned luxury vehicles, meticulously curated for perfection.",
    bgImage: "/assets/images/inventoryHero2.webp",
  },
  {
    title: "Exclusive Luxury Fleet",
    subtitle: "Elite vehicles that combine unmatched performance with prestigious elegance.",
    bgImage: "/assets/images/hero3.jpg",
  },
  {
    title: "Premium Automobiles",
    subtitle: "Experience the pinnacle of automotive excellence with our handpicked collection.",
    bgImage: "/assets/images/hero6.jpeg",
  },
];

type ButtonState = "callNow" | "getQuote" | "callConfirmed";

export default function EpicHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buttonState, setButtonState] = useState<ButtonState>("callNow");

  // Form modal state:
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmittedMessage, setFormSubmittedMessage] = useState<string | null>(null);

  const slideCount = slides.length;

  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const buttonToggleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const debounceRef = useRef(false);

  const { title, subtitle } = slides[current];

  const clearAllIntervals = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
    if (buttonToggleIntervalRef.current) {
      clearInterval(buttonToggleIntervalRef.current);
      buttonToggleIntervalRef.current = null;
    }
  };

  const startSlideAutoPlay = useCallback(() => {
    clearAllIntervals();
    setButtonState("callNow");

    slideIntervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
      setButtonState("callNow");
    }, 5000);

    buttonToggleIntervalRef.current = setInterval(() => {
      setButtonState((prev) => (prev === "callNow" ? "getQuote" : "callNow"));
    }, 2500);
  }, [slideCount]);

  const nextSlide = useCallback(() => {
    if (debounceRef.current) return;
    debounceRef.current = true;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
      setIsTransitioning(false);
      setButtonState("callNow");
      debounceRef.current = false;
    }, 400);
  }, [slideCount]);

  const handlePrevious = useCallback(() => {
    if (debounceRef.current) return;
    debounceRef.current = true;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
      setIsTransitioning(false);
      setButtonState("callNow");
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
      setButtonState("callNow");
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
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const [callConfirmed, setCallConfirmed] = useState(false);

  const onCallNowClick = () => {
    setCallConfirmed(true);
    setButtonState("callConfirmed");
    setTimeout(() => {
      setCallConfirmed(false);
      setButtonState("callNow");
    }, 3000);
  };

  const onGetQuoteClick = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setFormName("");
    setFormPhone("");
    setFormSubmittedMessage(null);
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) {
      alert("Please fill in your Name and Phone Number");
      return;
    }
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmittedMessage(
        `Thank you, ${formName}! Your quote request for "${title}" has been received. We will contact you soon.`
      );
      setFormName("");
      setFormPhone("");
    }, 1500);
  };

  const handleKeyDownArrow = (
    e: KeyboardEvent<HTMLButtonElement>,
    direction: "prev" | "next"
  ) => {
    if (
      e.key === "Enter" ||
      e.key === " " ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      e.preventDefault();
      if (direction === "prev") handlePrevious();
      else handleNext();
    }
  };

  return (
    <>
      <section
        aria-label="EPIC Luxury Collection Slider"
        className="relative select-none overflow-hidden font-manrope"
        style={{
          height: "35vh",
          minHeight: 280,
          maxHeight: 450,
          marginTop: 60,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Responsive height & button width override */}
        <style jsx>{`
          section {
            height: 35vh;
            min-height: 280px;
            max-height: 450px;
          }
          @media (max-width: 640px) {
            section {
              height: 25vh;
              min-height: 180px;
              max-height: 280px;
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

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div
            className="w-full h-full animate-pulse"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #d4af37 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, #bb9e29 1px, transparent 1px),
                linear-gradient(45deg, transparent 49%, rgba(212, 175, 55, 0.03) 50%, transparent 51%)
              `,
              backgroundSize: "60px 60px, 40px 40px, 20px 20px",
              animation: "float 15s ease-in-out infinite",
            }}
          />
        </div>

        {/* Background slides */}
        <div className="absolute inset-0 will-change-transform">
          {slides.map(({ bgImage, title }, idx) => (
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
                src={bgImage}
                alt={title}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover transition-transform duration-1000"
                quality={95}
                style={{ objectPosition: "center center" }}
              />
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 transition-all duration-1000 ${
                  idx === current
                    ? "bg-gradient-to-br from-black/70 via-black/40 to-transparent opacity-100"
                    : "bg-gradient-to-br from-black/90 via-black/70 to-black/40 opacity-80"
                }`}
                style={{ willChange: "background, opacity" }}
              />
              {/* Shimmer effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent transition-all duration-1000 ${
                  idx === current ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  animation: idx === current ? "shimmer 3s ease-in-out infinite" : "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Hex grid overlay */}
        <div className="absolute inset-0 opacity-8" aria-hidden="true">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(30deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                linear-gradient(150deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px, 40px 40px, 80px 80px",
            }}
          />
        </div>

        {/* Content container */}
        <div
          className={`relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-16 container mx-auto transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="max-w-5xl w-full">
            {/* Title */}
            <div className="mb-4 sm:mb-6 overflow-hidden" style={{ fontFamily: "'Manrope', sans-serif" }}>
              <h1
                className={`font-black leading-tight transition-all duration-800`}
                style={{
                  transitionDelay: isTransitioning ? "0ms" : "500ms",
                  fontSize: "clamp(1.2rem, 5vw, 2.1rem)",
                  color: "#d4af37",
                  lineHeight: 1.1,
                  backgroundImage: "none",
                  textShadow: "0 0 5px rgba(212, 175, 55, 0.7)",
                }}
              >
                <span>{title}</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div
              className="mb-4 sm:mb-6 overflow"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <p
                className={`leading-relaxed max-w-2xl transition-all duration-800`}
                style={{
                  transitionDelay: isTransitioning ? "0ms" : "700ms",
                  fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
                  color: "#d1cbb7", // subtle gold/gray from footer's soft color text
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)",
                }}
              >
                {subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="overflow cta-buttons">
              <div
                className={`inline-flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-800 ${
                  isTransitioning ? "translate-y-8 opacity-0 scale-95" : "translate-y-0 opacity-100 scale-100"
                }`}
                style={{ transitionDelay: isTransitioning ? "0ms" : "900ms" }}
              >
                {buttonState === "callConfirmed" ? (
                  <div
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#d4af37] text-black font-bold text-xs sm:text-sm rounded-full inline-block"
                    style={{ minWidth: 120, textAlign: "center" }}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    Calling Now...
                  </div>
                ) : buttonState === "callNow" ? (
                  <button
                    onClick={onCallNowClick}
                    className="group relative px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#d4af37] to-[#c8b14b] text-black font-bold text-xs sm:text-sm rounded-full inline-block whitespace-nowrap text-left max-w-full shadow-lg hover:shadow-[#d4af37]/50 hover:scale-105 transition-all duration-300"
                    tabIndex={0}
                    aria-label="Call Now"
                    type="button"
                    style={{ width: "auto", fontFamily: "'Manrope', sans-serif" }}
                  >
                    <span className="relative z-10 transition-colors duration-300 select-none flex items-center justify-start gap-2">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      Call Now
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ceba51] to-[#c9b744] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                  </button>
                ) : (
                  <button
                    onClick={onGetQuoteClick}
                    className="group relative px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-[#d4af37] text-[#d4af37] font-bold text-xs sm:text-sm rounded-full inline-block whitespace-nowrap text-left max-w-full hover:shadow-[#d4af37]/30 hover:scale-105 transition-all duration-300"
                    tabIndex={0}
                    aria-label="Get Best Quote"
                    type="button"
                    style={{ width: "auto", fontFamily: "'Manrope', sans-serif" }}
                  >
                    <span className="relative z-10 group-hover:text-black transition-colors duration-300 select-none flex items-center justify-start gap-2">
                      Get Best Quote
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ceba51] to-[#c9b744] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="nav-arrow absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 backdrop-blur-md border border-[#d4af37]/40 rounded-full text-[#d4af37] hover:bg-[#d4af37]/20 hover:border-[#d4af37] hover:scale-110 transition-all duration-300 group"
          aria-label="Previous slide"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDownArrow(e, "prev")}
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
          onKeyDown={(e) => handleKeyDownArrow(e, "next")}
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

      {/* Form Modal */}
      {isFormOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="form-title"
          aria-describedby="form-desc"
          onClick={closeForm}
        >
          {/* Modal content */}
          <div
            className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            <h2
              id="form-title"
              className="text-2xl font-bold text-[#d4af37] mb-4 select-none"
            >
              Get Best Quote
            </h2>
            <p id="form-desc" className="mb-6 text-gray-300 select-text">
              {title} — {subtitle}
            </p>

            {formSubmittedMessage ? (
              <>
                <p className="mb-4 text-green-400 font-semibold">{formSubmittedMessage}</p>
                <button
                  onClick={closeForm}
                  className="mt-2 inline-block px-4 py-2 bg-[#d4af37] rounded text-black font-semibold hover:bg-yellow-400 transition"
                >
                  Close
                </button>
              </>
            ) : (
              <form onSubmit={onFormSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[#d4af37] font-semibold mb-1 select-none"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full rounded px-3 py-2 text-black focus:outline-[#d4af37]"
                    required
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[#d4af37] font-semibold mb-1 select-none"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full rounded px-3 py-2 text-black focus:outline-[#d4af37]"
                    required
                    placeholder="Your phone number"
                    pattern="^[+0-9\s]*$"
                    title="Please enter a valid phone number"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2 border border-[#d4af37] text-[#d4af37] rounded hover:bg-yellow-400 transition"
                    disabled={formSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 bg-[#d4af37] text-black font-bold rounded hover:bg-yellow-400 transition ${
                      formSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    disabled={formSubmitting}
                  >
                    {formSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            )}

            {/* Close button */}
            <button
              onClick={closeForm}
              aria-label="Close form"
              className="absolute top-2 right-2 text-[#d4af37] hover:text-yellow-400 focus:outline-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#d4af37"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
