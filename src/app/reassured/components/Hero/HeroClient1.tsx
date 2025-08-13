"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useRef } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  badge?: string;
  position?: number;
  cta1_text?: string;
  cta1_url_or_action?: string;
  cta2_text?: string;
  cta2_url_or_action?: string;
  image_url: string; // updated to match backend field
}

export default function HeroClient({ banners }: { banners: Banner[] }) {
  const swiperRef = useRef<any>(null);

  if (!banners.length) return null;

  return (
    <section
      className="relative w-full bg-white text-black font-manrope"
      style={{ height: "50vh", marginTop: "0px" }}
    >
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={banner.image_url} // now using backend Supabase URL
                  alt={banner.title || "Hero Banner"}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/10"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 max-w-7xl mx-auto">
                {banner.badge && (
                  <span className="inline-block bg-black text-white px-4 py-1 text-sm font-semibold uppercase tracking-wide mb-4 w-max">
                    {banner.badge}
                  </span>
                )}
                {banner.title && (
                  <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight mb-4">
                    {banner.title}
                  </h1>
                )}
                {banner.subtitle && (
                  <p className="text-lg lg:text-xl font-light mb-6 max-w-2xl">
                    {banner.subtitle}
                  </p>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  {banner.cta1_text && (
                    <Link
                      href={banner.cta1_url_or_action || "#"}
                      className="px-6 py-3 bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors"
                    >
                      {banner.cta1_text}
                    </Link>
                  )}
                  {banner.cta2_text && (
                    <Link
                      href={banner.cta2_url_or_action || "#"}
                      className="px-6 py-3 border border-black text-black text-sm font-semibold tracking-wide hover:bg-gray-100 transition-colors"
                    >
                      {banner.cta2_text}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
