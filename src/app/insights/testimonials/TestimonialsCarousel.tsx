"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  initials: string;
  review: string;
}

const testimonials: Testimonial[] = [
  { name: "Arjun Mehta", initials: "AM", review: "Exceptional service! The team made buying my dream car effortless." },
  { name: "Priya Sharma", initials: "PS", review: "Premium experience from start to finish. Highly recommended!" },
  { name: "Rajesh Kumar", initials: "RK", review: "Outstanding quality and transparency. Exceeded expectations." },
  { name: "Sneha Patel", initials: "SP", review: "Professional, luxurious, and perfect experience!" },
  { name: "Vikram Singh", initials: "VS", review: "Truly the pinnacle of luxury car buying in India." },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const itemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
    }
    return 3;
  };

  const totalSlides = Math.ceil(testimonials.length / itemsPerView());

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(nextSlide, 3500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, nextSlide]);

  return (
    <div
      className="relative w-full overflow-hidden py-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <motion.div
        className="flex transition-transform duration-700 ease-in-out"
        animate={{
          x: `-${current * 100}%`,
        }}
      >
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            className="min-w-full sm:min-w-[50%] lg:min-w-[33.3333%] p-4"
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="bg-black/70 border border-yellow-500/30 rounded-xl p-6 shadow-xl backdrop-blur-md h-48 flex flex-col justify-between">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-500 text-black font-bold rounded-full w-12 h-12 flex items-center justify-center mr-3">
                  {t.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-yellow-400">{t.name}</h3>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300">{t.review}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === i ? "bg-yellow-400 w-5" : "bg-yellow-400/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}