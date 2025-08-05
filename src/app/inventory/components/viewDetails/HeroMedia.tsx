"use client";
import React, { useState } from "react";
import { FaRegHeart, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { BsFillPlayFill } from "react-icons/bs";

// Example data (as per your template)
const defaultVehicle = {
  id: 1,
  brand: "Mercedes-Benz",
  model: "E-Class E220d",
  year: 2021,
  slug: "mercedes-benz-e-class-e220d-2021",
  price: "₹45,50,000",
  originalPrice: "₹52,00,000",
  image: "/assets/images/Mercedes.jpg",
  mileage: "25,000 km",
  fuelType: "Diesel",
  transmission: "Automatic",
  seating: 5,
  location: "Mumbai, Maharashtra",
  condition: "Excellent",
  features: ["Sunroof", "Leather Seats", "Navigation", "Premium Audio"],
  savings: "₹6,50,000",
  isLiked: false,
  views: 1240,
  gallery: [
    "/assets/images/Mercedes.jpg",
    "/assets/images/Mercedes2.jpg",
    "/assets/images/Mercedes3.jpg",
    "/assets/images/Mercedes4.jpg",
  ],
};

type Vehicle = typeof defaultVehicle;

interface HeroMediaSectionProps {
  vehicle?: Vehicle;
}

const HeroMediaSection: React.FC<HeroMediaSectionProps> = ({ vehicle = defaultVehicle }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isLiked, setIsLiked] = useState(vehicle.isLiked);

  // Helper to detect video (not used but ready for extension)
  const isVideo = (src: string) => src.includes("youtube.com/embed");

  return (
    <section
      style={{ marginTop: 70 }}
      className="w-full min-h-[80vh] bg-black flex items-center justify-center py-8 transition-all duration-700"
    >
      <div className="max-w-[1680px] mx-auto w-full flex flex-col lg:flex-row px-3 lg:px-14">
        {/* Main Media Block */}
        <div className="relative flex-1 flex items-center justify-center">
          {/* Top line: brand & model */}
          <div className="absolute z-30 top-8 left-10 flex items-center gap-4">
            <span className="text-white font-semibold text-xl md:text-2xl lg:text-2xl uppercase tracking-wide">
              {vehicle.brand}
            </span>
            <span className="text-white font-semibold text-xl md:text-2xl lg:text-2xl">
              {vehicle.model}
            </span>
            <span className="text-white/75 font-medium text-lg md:text-xl ml-2">
              {vehicle.year}
            </span>
          </div>
          {/* Heart Icon */}
          <span
            className="absolute z-30 top-8 right-10 rounded-full bg-[rgba(0,0,0,0.6)] p-2 text-white shadow-md cursor-pointer hover:text-[#d4af37] hover:scale-110 transition-all duration-200"
            title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
            onClick={() => setIsLiked((liked) => !liked)}
          >
            {isLiked ? (
              <FaHeart className="text-[#d4af37] text-2xl drop-shadow-glow" />
            ) : (
              <FaRegHeart className="text-white text-2xl" />
            )}
          </span>
          {/* Main Image */}
          <div
            className="w-full rounded-3xl overflow-hidden shadow-[0_8px_70px_-12px_rgba(212,175,55,0.06)] 
            relative"
            style={{
              height: "560px",
              maxWidth: "1120px",
            }}
          >
            {isVideo(vehicle.gallery[selectedIdx]) ? (
              <iframe
                src={vehicle.gallery[selectedIdx]}
                title="Car Video"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <img
                src={vehicle.gallery[selectedIdx]}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="object-cover w-full h-full rounded-3xl scale-100 transition-transform duration-1000"
                style={{
                  boxShadow: "0 14px 70px 0 rgba(212,175,55,0.09)",
                  minHeight: 400,
                }}
              />
            )}

            {/* Floating Overlay Panel */}
            <div className="absolute bottom-0 left-0 mb-8 ml-8 z-30 bg-[rgba(13,13,13,0.90)] rounded-2xl px-8 py-6 shadow-[0_4px_32px_rgba(212,175,55,0.10)] backdrop-blur-md animate-fadeAndScale max-w-[85vw] min-w-[320px]">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-white font-extrabold text-2xl lg:text-3xl">
                  {vehicle.price}
                </span>
                <span className="text-white/50 line-through text-lg lg:text-xl">
                  {vehicle.originalPrice}
                </span>
                <span className="text-[#d4af37] font-bold text-lg lg:text-xl ml-1 animate-pulse">
                  + {vehicle.savings}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <FaMapMarkerAlt className="text-[#d4af37]" />
                <span className="text-white font-medium text-base">
                  {vehicle.location}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <button className="bg-[#d4af37] text-black font-semibold px-5 py-2 rounded-xl shadow-gold transition-all hover:scale-105 hover:shadow-[0_0_16px_0_#d4af37c5] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/70">
                  Book Test Drive
                </button>
                <button className="border-2 border-[#d4af37] text-white px-5 py-2 rounded-xl font-semibold hover:bg-[#d4af37]/10 transition-all duration-200">
                  Call Now
                </button>
              </div>
            </div>
            {/* Carousel: floating overlay */}
            <div
              className="
                absolute
                top-1/2 -translate-y-1/2 right-0 lg:-right-24
                z-40
                bg-[rgba(22,22,22,0.82)] backdrop-blur-lg
                rounded-2xl shadow-[0_2px_18px_0_rgba(212,175,55,0.10)]
                p-3 flex flex-col gap-3 border border-[#d4af37]/10
                animate-fadeAndScale
                w-[78px]
                "
              style={{
                boxShadow: "0 0 18px 0 rgba(212,175,55,0.11)",
                backdropFilter: "blur(8px)",
              }}
            >
              {vehicle.gallery.map((src, idx) => (
                <div
                  key={src + idx}
                  className={`relative cursor-pointer group rounded-xl overflow-hidden
                    transition-all duration-300 
                    ${selectedIdx === idx
                      ? "border-2 border-[#d4af37] ring-2 ring-[#d4af37]/60 shadow-lg"
                      : "border border-white/10"
                    }
                  `}
                  style={{ width: 64, height: 64 }}
                  onClick={() => setSelectedIdx(idx)}
                >
                  <img
                    src={src}
                    className="object-cover w-full h-full rounded-lg transition-transform scale-100 group-hover:scale-105"
                    alt=""
                  />
                  {selectedIdx === idx ? (
                    <span className="absolute inset-0 ring-2 ring-[#d4af37] rounded-lg animate-gold-shadow" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Optionally add more right side components or leave empty for visual impact */}
      </div>
      {/* Custom Animation/Style */}
      <style>
        {`
          .animate-fadeAndScale {
            animation: fadeScaleIn 0.7s cubic-bezier(0.65, 0, 0.35, 1) 0.1s both;
          }
          @keyframes fadeScaleIn {
            from { opacity: 0; transform: translateY(55px) scale(0.97);}
            to { opacity: 1; transform: translateY(0) scale(1);}
          }
          .drop-shadow-glow {
            filter: drop-shadow(0 0 8px #d4af37cc);
          }
          .animate-gold-shadow {
            animation: goldGlow 1.5s infinite alternate;
          }
          @keyframes goldGlow {
            0% { box-shadow: 0 0 0 0 #d4af3760; }
            100% { box-shadow: 0 0 28px 6px #d4af37cc; }
          }
        `}
      </style>
    </section>
  );
};

export default HeroMediaSection;
