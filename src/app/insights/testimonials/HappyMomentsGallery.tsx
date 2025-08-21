"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Example free royalty-free sources from Pexels/Pixabay — replace with your own hosted files for best performance
const galleryItems = [
  { type: "video", src: "/assets/videos/car-delivery.mp4", poster: "/assets/images/car-delivery-poster.jpg" },
  { type: "image", src: "/assets/images/client-with-car.jpg" },
  { type: "video", src: "/assets/videos/night-drive.mp4", poster: "/assets/images/night-drive-poster.jpg" },
  { type: "image", src: "/assets/images/handover-keys.jpg" },
  { type: "image", src: "/assets/images/car-closeup.jpg" },
  { type: "video", src: "/assets/videos/car-reveal.mp4", poster: "/assets/images/car-reveal-poster.jpg" },
];

export default function HappyMomentsGallery() {
  const [videoErrors, setVideoErrors] = useState<{[key: string]: boolean}>({});
  const [videoLoading, setVideoLoading] = useState<{[key: string]: boolean}>({});

  const handleVideoError = (src: string) => {
    setVideoErrors(prev => ({ ...prev, [src]: true }));
    setVideoLoading(prev => ({ ...prev, [src]: false }));
  };

  const handleVideoLoadStart = (src: string) => {
    setVideoLoading(prev => ({ ...prev, [src]: true }));
  };

  const handleVideoCanPlay = (src: string) => {
    setVideoLoading(prev => ({ ...prev, [src]: false }));
  };

  return (
    <section className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold font-manrope mb-10">
          <span className="text-white">Happy</span>{" "}
          <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">Moments</span>
        </h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="relative overflow-hidden rounded-2xl shadow-lg group"
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt="Luxury Moment"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : videoErrors[item.src] ? (
                // Fallback image if video fails
                <div className="w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Video unavailable</p>
                </div>
              ) : (
                <div className="relative">
                  {videoLoading[item.src] && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]"></div>
                    </div>
                  )}
                  <video
                    src={item.src}
                    poster={item.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    controls={false}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => handleVideoError(item.src)}
                    onLoadStart={() => handleVideoLoadStart(item.src)}
                    onCanPlay={() => handleVideoCanPlay(item.src)}
                    onLoadedData={() => handleVideoCanPlay(item.src)}
                    onCanPlayThrough={() => handleVideoCanPlay(item.src)}
                  />
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                <p className="text-white text-sm">
                  Epic Luxe unforgettable experiences
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}