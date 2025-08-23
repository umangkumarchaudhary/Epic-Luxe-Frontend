"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useRef, useState } from "react";
import LeadModal from "./LeadModal";


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
  image_url: string; // PC image (required)
  mobile_image_url?: string; // Mobile image (optional)
}

export default function HeroClient({ banners }: { banners: Banner[] }) {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCTAText, setCurrentCTAText] = useState<string>("");

  const handleCTA2Click = (e: React.MouseEvent, cta2_url_or_action?: string, cta2_text?: string) => {
    e.preventDefault();
    // Check if the CTA2 is meant for lead capture
    // If it's not a proper URL (doesn't start with http/https or /), treat it as lead capture
    const isValidUrl = cta2_url_or_action && 
      (cta2_url_or_action.startsWith('http') || 
       cta2_url_or_action.startsWith('/') || 
       cta2_url_or_action.startsWith('mailto:') || 
       cta2_url_or_action.startsWith('tel:'));
    
    if (!cta2_url_or_action || cta2_url_or_action === "#" || !isValidUrl) {
      setCurrentCTAText(cta2_text || "Get Free Quote");
      setIsModalOpen(true);
    } else {
      // Navigate to the URL if it's a valid link
      window.location.href = cta2_url_or_action;
    }
  };

  if (!banners.length) return null;

  return (
    <section
      className="relative w-full bg-white text-black font-manrope"
      style={{ height: "50vh", marginTop: "40px" }}
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
              {/* Background Image - Responsive */}
              <div className="absolute inset-0">
                {/* Mobile Image - Show on screens smaller than 768px */}
                {banner.mobile_image_url && (
                  <Image
                    src={banner.mobile_image_url}
                    alt={`${banner.title || "Hero Banner"} (Mobile)`}
                    fill
                    className="object-cover object-center block md:hidden"
                    priority={banners.indexOf(banner) === 0}
                    sizes="100vw"
                  />
                )}
                
                {/* PC Image - Show on screens 768px and larger, or if no mobile image */}
                <Image
                  src={banner.image_url}
                  alt={`${banner.title || "Hero Banner"} (Desktop)`}
                  fill
                  className={`object-cover object-center ${banner.mobile_image_url ? 'hidden md:block' : 'block'}`}
                  priority={banners.indexOf(banner) === 0}
                  sizes="100vw"
                />
                
              </div>

              {/* Content - Desktop */}
              <div className="relative z-10 h-full flex-col justify-center px-6 lg:px-16 max-w-7xl mx-auto hidden md:flex">
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

                {/* CTA Buttons - Desktop */}
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
                    <button
                      onClick={(e) => handleCTA2Click(e, banner.cta2_url_or_action, banner.cta2_text)}
                      className="px-6 py-3 border border-black text-black text-sm font-semibold tracking-wide hover:bg-gray-100 transition-colors"
                    >
                      {banner.cta2_text}
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile Content - Title Overlay */}
              <div className="md:hidden relative z-10 h-full flex flex-col justify-center px-4">
                {banner.badge && (
                  <span className="inline-block bg-black/80 backdrop-blur-sm text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-3 w-max rounded">
                    {banner.badge}
                  </span>
                )}
                {banner.title && (
                  <h1 className="text-xl font-extrabold leading-tight mb-2 text-black drop-shadow-sm">
                    {banner.title}
                  </h1>
                )}
                {banner.subtitle && (
                  <p className="text-sm font-medium mb-4 text-black/80 drop-shadow-sm max-w-sm">
                    {banner.subtitle}
                  </p>
                )}
              </div>

              {/* Mobile CTA Buttons - Positioned below image with 0px gap */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 z-20 flex justify-center gap-2 p-4">
                {banner.cta1_text && (
                  <Link
                    href={banner.cta1_url_or_action || "#"}
                    className="px-4 py-2 bg-white/80 backdrop-blur-md border border-white/20 text-black text-xs font-semibold tracking-wide rounded-lg shadow-lg hover:bg-white/90 transition-all duration-300 flex-1 text-center"
                    style={{ 
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      maxWidth: '140px'
                    }}
                  >
                    {banner.cta1_text}
                  </Link>
                )}
                {banner.cta2_text && (
                  <button
                    onClick={(e) => handleCTA2Click(e, banner.cta2_url_or_action, banner.cta2_text)}
                    className="px-4 py-2 bg-white/80 backdrop-blur-md border border-white/20 text-black text-xs font-semibold tracking-wide rounded-lg shadow-lg hover:bg-white/90 transition-all duration-300 flex-1"
                    style={{ 
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      maxWidth: '140px'
                    }}
                  >
                    {banner.cta2_text}
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Lead Capture Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ctaText={currentCTAText}
      />
    </section>
  );
}
