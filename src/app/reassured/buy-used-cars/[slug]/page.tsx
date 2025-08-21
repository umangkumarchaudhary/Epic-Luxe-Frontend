'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';

import {
  ArrowLeft, Calendar, Calculator, Share2, Heart, Phone, MapPin, Fuel,
  Settings, Gauge, Car, Shield, Award, Eye, ChevronLeft, ChevronRight,
  MessageCircle, Users
} from 'lucide-react';

import EMIModal from '../buyComponents/EMIModal/EMIModal';
import ScheduleDemo from '../buyComponents/Schedule';
import { RecommendedVehiclesClient } from './recommended-vehicles/RecommendedVehiclesClient';

// --- TYPES ---
interface VehicleImage {
  id: number;
  vehicle_id: number;
  image_url: string;
}

interface VehicleFeature {
  id: number;
  vehicle_id: number;
  feature: string;
}

interface VehicleDetails {
  id: number;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  original_price?: number;
  savings?: number;
  mileage?: number;  // Changed from string to number to match backend
  fuel_type?: string;
  transmission?: string;
  engine_capacity?: number;  // Changed from string to number
  drivetrain?: string;
  seating?: number;
  horsepower?: number;  // Changed from string to number
  torque?: number;  // Changed from string to number
  location?: string;
  condition?: string;
  ownership?: number;  // Changed from string to number
  health_engine?: number;
  health_tyres?: number;
  health_paint?: number;
  health_interior?: number;
  health_electrical?: number;
  color_exterior?: string;
  color_interior?: string;
  video_url?: string;
  published?: boolean;
  featured?: boolean;
  slug: string;
  created_at: string;
  image_urls?: string[];  // Added for multiple images from backend
  features_detailed?: any;  // Added for features from backend
  is_liked?: boolean;
  views?: number;
}

// --- UTILITIES ---
function formatPrice(price: number): string {
  return price ? `₹${(price / 100000).toFixed(1)} Lakh` : '--';
}

function calculateEMI(price: number, years = 5, rate = 8.5): number {
  if (!price) return 0;
  const n = years * 12;
  const r = rate / (12 * 100);
  return Math.round((price * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
}

// --- HEALTH SCORE COMPONENT ---
const HealthScore = ({ score, label }: { score?: number, label: string }) => {
  if (score == null) return null;
  
  let colorClass = 'text-gray-400 bg-gray-800/50 border-gray-600';
  if (score >= 9) colorClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  else if (score >= 7) colorClass = 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
  else colorClass = 'text-red-400 bg-red-500/10 border-red-500/30';

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border bg-black/40 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
          <Shield size={18} />
        </div>
        <span className="font-medium text-white font-manrope">{label}</span>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-white font-manrope">{score}</div>
        <div className="text-xs text-gray-400 font-manrope">/10</div>
      </div>
    </div>
  );
};

// --- IMAGE GALLERY COMPONENT ---
const ImageGallery = ({ images }: { images: VehicleImage[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] bg-gray-900/50 rounded-3xl flex items-center justify-center">
        <div className="text-center text-gray-400">
          <Car size={48} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium font-manrope">No images available</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Main Image */}
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-900/50 group">
        <Image
          src={images[currentIndex]?.image_url || '/placeholder-car.jpg'}
          alt={`Vehicle image ${currentIndex + 1}`}
          width={800}
          height={600}
          className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
          onClick={() => setShowFullscreen(true)}
        />
        
        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 border border-[#D4AF37]/30"
            >
              <ChevronLeft size={20} className="text-[#D4AF37]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 border border-[#D4AF37]/30"
            >
              <ChevronRight size={20} className="text-[#D4AF37]" />
            </button>
          </>
        )}

        {/* Fullscreen button */}
        <button
          onClick={() => setShowFullscreen(true)}
          className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 border border-[#D4AF37]/30"
        >
          <Eye size={18} className="text-[#D4AF37]" />
        </button>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                index === currentIndex 
                  ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/25 scale-105' 
                  : 'border-gray-600 hover:border-[#D4AF37]/50'
              }`}
            >
              <Image
                src={image.image_url || '/placeholder-car.jpg'}
                alt={`Thumbnail ${index + 1}`}
                width={120}
                height={90}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal - FIXED: No action buttons visible */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            <Image
              src={images[currentIndex]?.image_url || '/placeholder-car.jpg'}
              alt="Fullscreen view"
              width={1200}
              height={900}
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
            
            {/* Navigation in fullscreen */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-[#D4AF37] transition-all border border-[#D4AF37]/30"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-[#D4AF37] transition-all border border-[#D4AF37]/30"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
            
            {/* Close button */}
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 w-14 h-14 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-[#D4AF37] text-3xl font-light transition-all border border-[#D4AF37]/30"
            >
              ×
            </button>

            {/* Image counter in fullscreen */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default function VehicleDetailsPage() {
  const router = useRouter();
  const { slug } = useParams() as { slug: string };

  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);
  const [images, setImages] = useState<VehicleImage[]>([]);
  const [features, setFeatures] = useState<VehicleFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [showEMIModal, setShowEMIModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    if (!slug) return;
    
    const fetchVehicleDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const baseUrl = process.env.NEXT_PUBLIC_HERO_URL || 'https://raam-group-all-websites.onrender.com/admin';
        const response = await fetch(`${baseUrl}/reassured-vehicle/slug/${slug}`);
        if (!response.ok) {
          setError(response.status === 404 ? 'Vehicle not found' : `HTTP error! status: ${response.status}`);
          return;
        }
        
        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Failed to fetch vehicle details');
        
        const vehicleData = data.vehicle;
        setVehicle(vehicleData);
        
        // Handle images from the new backend structure
        if (vehicleData.image_urls && vehicleData.image_urls.length > 0) {
          // Convert image URLs to the expected format
          const imageObjects = vehicleData.image_urls.map((url: string, index: number) => ({
            id: index + 1,
            vehicle_id: vehicleData.id,
            image_url: url
          }));
          setImages(imageObjects);
        }
        
        // Handle features from the new backend structure
        if (vehicleData.features_detailed) {
          let features: VehicleFeature[] = [];
          
          if (Array.isArray(vehicleData.features_detailed)) {
            features = vehicleData.features_detailed.map((feature: string, index: number) => ({
              id: index + 1,
              vehicle_id: vehicleData.id,
              feature: feature
            }));
          } else if (typeof vehicleData.features_detailed === 'object') {
            try {
              const featuresArray = Object.values(vehicleData.features_detailed);
              features = featuresArray.map((feature: any, index: number) => ({
                id: index + 1,
                vehicle_id: vehicleData.id,
                feature: feature.toString()
              }));
            } catch (e) {
              console.error('Error parsing features_detailed:', e);
            }
          }
          
          setFeatures(features);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load vehicle details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVehicleDetails();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share && vehicle) {
      try {
        await navigator.share({
          title: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
          url: window.location.href,
        });
      } catch {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        setCopyMessage('Link copied!');
        setTimeout(() => setCopyMessage(''), 2000);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopyMessage('Link copied!');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  const handleWhatsApp = () => {
    if (!vehicle) return;
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.model} (${formatPrice(vehicle.price)}). Could you please provide more details?`
    );
    window.open(`https://wa.me/918825338775?text=${message}`, '_blank');
  };

  const handleCallDealer = () => {
    window.open('tel:+918825338775', '_self');
  };

  // FIXED: Create vehicle object with price as string for EMI Modal
  const handleEMICalculator = () => {
    if (vehicle) {
      // Create a vehicle object with price as string to fix the EMI modal error
      // const vehicleForEMI = {
      //   ...vehicle,
      //   price: vehicle.price.toString() // Convert price to string
      // };
      setShowEMIModal(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-white font-manrope">Loading vehicle details...</h2>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
            <Car size={32} className="text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3 font-manrope">
            {error === 'Vehicle not found' ? 'Vehicle Not Found' : 'Error Loading Vehicle'}
          </h1>
          <p className="text-gray-400 mb-8 font-manrope">
            {error === 'Vehicle not found'
              ? 'The vehicle you&apos;re looking for is no longer available.'
              : error || 'Unable to load vehicle details at the moment.'}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/reassured/buy-used-cars')}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-6 py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all font-manrope"
            >
              Browse All Vehicles
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full border border-gray-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-900/50 transition-colors font-manrope"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const emiAmount = calculateEMI(vehicle.price);
  const healthScores = [
    { score: vehicle.health_engine, label: 'Engine' },
    { score: vehicle.health_tyres, label: 'Tyres' },
    { score: vehicle.health_paint, label: 'Paint' },
    { score: vehicle.health_interior, label: 'Interior' },
    { score: vehicle.health_electrical, label: 'Electrical' }
  ].filter(item => item.score != null);

  return (
    <>
      <Head>
        <title>{`${vehicle.year} ${vehicle.brand} ${vehicle.model} - Premium Pre-Owned`}</title>
        <meta
          name="description"
          content={`${vehicle.year} ${vehicle.brand} ${vehicle.model} for ${formatPrice(vehicle.price)}. Premium pre-owned luxury vehicle with comprehensive health report. Located in ${vehicle.location || 'India'}.`}
        />
        <meta property="og:title" content={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`} />
        <meta property="og:description" content={`Premium pre-owned ${vehicle.brand} ${vehicle.model} for ${formatPrice(vehicle.price)}`} />
        <meta property="og:image" content={images[0]?.image_url || '/placeholder-car.jpg'} />
        <meta property="og:type" content="product" />
      </Head>

      <div className="min-h-screen bg-black">
        {/* Header - FIXED: Not sticky for full page scroll */}
        <header className="bg-black/80 backdrop-blur-sm border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={20} />
              <span className="font-medium font-manrope">Back</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`w-10 h-10 rounded-full border transition-all duration-300 hover:scale-110 active:scale-90 ${
                  liked 
                    ? 'border-red-400 bg-red-500/10 text-red-400 shadow-md shadow-red-400/25' 
                    : 'border-gray-600 hover:border-red-400 hover:bg-red-500/10 hover:text-red-400 hover:shadow-md'
                }`}
              >
                <Heart size={18} fill={liked ? 'currentColor' : 'none'} className="mx-auto" />
              </button>
              
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full border border-gray-600 hover:border-[#D4AF37] hover:bg-gray-900/50 transition-all duration-300 hover:scale-110 active:scale-90 hover:shadow-md flex items-center justify-center"
                >
                  <Share2 size={18} className="text-gray-400 hover:text-[#D4AF37]" />
                </button>
                {copyMessage && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black/90 text-[#D4AF37] text-sm rounded-lg whitespace-nowrap border border-[#D4AF37]/30 font-manrope">
                    {copyMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Bugatti Level Premium Layout */}
        <main className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-4 lg:p-8 min-h-screen">
            {/* Left Column - Visual Showcase */}
            <div className="space-y-8">
              {/* Hero Image Gallery */}
              <div className="relative">
                <ImageGallery images={images} />
                
                {/* Floating Luxury Badge */}
                <div className="absolute top-6 left-6 bg-gradient-to-r from-[#D4AF37]/90 to-[#BFA980]/90 backdrop-blur-sm px-4 py-2 rounded-full border border-[#D4AF37]/30">
                  <span className="text-black font-bold text-sm font-manrope">LUXURY CERTIFIED</span>
                </div>
              </div>

              {/* Luxury Specifications Showcase */}
              <div className="bg-gradient-to-br from-black/60 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-[#D4AF37]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-2xl flex items-center justify-center">
                      <Car className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent font-manrope">
                      Luxury Specifications
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {vehicle.mileage && (
                      <div className="group">
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-900/50 border border-gray-700/50 hover:border-[#D4AF37]/50 transition-all">
                          <Gauge size={20} className="text-[#D4AF37]" />
                          <div>
                            <p className="text-gray-400 text-xs font-manrope">Mileage</p>
                            <p className="text-white font-bold font-manrope">
                              {typeof vehicle.mileage === 'number' 
                                ? `${vehicle.mileage.toLocaleString()} km` 
                                : vehicle.mileage}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {vehicle.fuel_type && (
                      <div className="group">
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-900/50 border border-gray-700/50 hover:border-[#D4AF37]/50 transition-all">
                          <Fuel size={20} className="text-[#D4AF37]" />
                          <div>
                            <p className="text-gray-400 text-xs font-manrope">Fuel Type</p>
                            <p className="text-white font-bold font-manrope">{vehicle.fuel_type}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {vehicle.transmission && (
                      <div className="group">
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-900/50 border border-gray-700/50 hover:border-[#D4AF37]/50 transition-all">
                          <Settings size={20} className="text-[#D4AF37]" />
                          <div>
                            <p className="text-gray-400 text-xs font-manrope">Transmission</p>
                            <p className="text-white font-bold font-manrope">{vehicle.transmission}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="group">
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-900/50 border border-gray-700/50 hover:border-[#D4AF37]/50 transition-all">
                        <Calendar size={20} className="text-[#D4AF37]" />
                        <div>
                          <p className="text-gray-400 text-xs font-manrope">Year</p>
                          <p className="text-white font-bold font-manrope">{vehicle.year}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Health Report */}
              {healthScores.length > 0 && (
                <div className="bg-gradient-to-br from-black/60 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-[#D4AF37]/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-manrope">Health Report</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {healthScores.slice(0, 3).map((item, index) => (
                      <HealthScore key={index} score={item.score} label={item.label} />
                    ))}
                  </div>
                </div>
              )}

              {/* Luxury Features Preview */}
              {features.length > 0 && (
                <div className="bg-gradient-to-br from-black/60 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-[#D4AF37]/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-manrope">Luxury Features</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/30">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full"></div>
                        <span className="text-white font-manrope text-sm">{feature.feature}</span>
                      </div>
                    ))}
                    {features.length > 4 && (
                      <div className="text-center mt-2">
                        <span className="text-[#D4AF37] text-sm font-manrope">+{features.length - 4} more luxury features</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Premium Information */}
            <div className="space-y-8 lg:sticky lg:top-8">
              {/* Luxury Title Card */}
              <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-[#D4AF37]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/3 to-transparent"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2 font-manrope leading-tight">
                        {vehicle.year} {vehicle.brand}
                      </h1>
                      <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent font-manrope">
                        {vehicle.model}
                        {vehicle.variant && (
                          <span className="block text-xl text-gray-400 mt-1 font-manrope">
                            {vehicle.variant}
                          </span>
                        )}
                      </h2>
                    </div>
                    
                    {/* Premium Badge */}
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] p-3 rounded-2xl">
                      <Car className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  
                  {/* Vehicle Meta */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {vehicle.location && (
                      <div className="flex items-center gap-2 p-3 bg-gray-900/50 rounded-xl border border-gray-700/50">
                        <MapPin size={16} className="text-[#D4AF37]" />
                        <span className="text-white font-manrope text-sm">{vehicle.location}</span>
                      </div>
                    )}
                    {vehicle.condition && (
                      <div className="flex items-center gap-2 p-3 bg-gray-900/50 rounded-xl border border-gray-700/50">
                        <Shield size={16} className="text-[#D4AF37]" />
                        <span className="text-white font-manrope text-sm">{vehicle.condition}</span>
                      </div>
                    )}
                    {vehicle.ownership && (
                      <div className="flex items-center gap-2 p-3 bg-gray-900/50 rounded-xl border border-gray-700/50 col-span-2">
                        <Users size={16} className="text-[#D4AF37]" />
                        <span className="text-white font-manrope text-sm">
                          {typeof vehicle.ownership === 'number' 
                            ? `${vehicle.ownership} Owner` 
                            : vehicle.ownership}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Pricing Section */}
                  <div className="border-t border-gray-700/50 pt-6">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-manrope">
                        {formatPrice(vehicle.price)}
                      </span>
                      {vehicle.original_price && (
                        <span className="text-xl text-gray-500 line-through font-manrope">
                          {formatPrice(vehicle.original_price)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      {vehicle.savings && (
                        <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full">
                          <span className="font-bold font-manrope text-sm">Save ₹{vehicle.savings.toLocaleString()}</span>
                        </div>
                      )}
                      
                      <div className="bg-gray-900/50 border border-gray-700/50 text-gray-300 px-4 py-2 rounded-full">
                        <span className="font-manrope text-sm">EMI from ₹{emiAmount.toLocaleString()}/month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Action Center */}
              <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-[#D4AF37]/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-manrope">Take Action</h3>
                
                {/* Primary Actions */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <button
                    onClick={handleCallDealer}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-manrope text-lg"
                  >
                    <Phone size={24} />
                    Speak with Luxury Specialist
                  </button>
                  
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-manrope text-lg"
                  >
                    <MessageCircle size={24} />
                    WhatsApp Inquiry
                  </button>
                </div>
                
                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleEMICalculator}
                    className="flex items-center justify-center gap-2 border border-[#D4AF37]/50 text-[#D4AF37] px-6 py-3 rounded-xl font-semibold hover:bg-[#D4AF37]/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-manrope"
                  >
                    <Calculator size={18} />
                    EMI Calculator
                  </button>
                  
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="flex items-center justify-center gap-2 border border-[#D4AF37]/50 text-[#D4AF37] px-6 py-3 rounded-xl font-semibold hover:bg-[#D4AF37]/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-manrope"
                  >
                    <Calendar size={18} />
                    Test Drive
                  </button>
                </div>
              </div>

              {/* Advanced Technical Details */}
              <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-[#D4AF37]/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-manrope">Technical Excellence</h3>
                
                {/* Advanced Specs */}
                {(vehicle.horsepower || vehicle.torque || vehicle.engine_capacity) && (
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    {vehicle.engine_capacity && (
                      <div className="flex justify-between items-center p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                        <span className="text-gray-400 font-manrope">Engine Capacity</span>
                        <span className="font-bold text-[#D4AF37] font-manrope">
                          {typeof vehicle.engine_capacity === 'number' 
                            ? `${vehicle.engine_capacity}L` 
                            : vehicle.engine_capacity}
                        </span>
                      </div>
                    )}
                    {vehicle.horsepower && (
                      <div className="flex justify-between items-center p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                        <span className="text-gray-400 font-manrope">Power Output</span>
                        <span className="font-bold text-[#D4AF37] font-manrope">
                          {typeof vehicle.horsepower === 'number' 
                            ? `${vehicle.horsepower} HP` 
                            : vehicle.horsepower}
                        </span>
                      </div>
                    )}
                    {vehicle.torque && (
                      <div className="flex justify-between items-center p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                        <span className="text-gray-400 font-manrope">Torque</span>
                        <span className="font-bold text-[#D4AF37] font-manrope">
                          {typeof vehicle.torque === 'number' 
                            ? `${vehicle.torque} Nm` 
                            : vehicle.torque}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Color Specifications */}
                {(vehicle.color_exterior || vehicle.color_interior) && (
                  <div className="border-t border-gray-700/50 pt-6">
                    <h4 className="text-lg font-bold text-white mb-4 font-manrope">Color Specifications</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {vehicle.color_exterior && (
                        <div className="flex justify-between items-center p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                          <span className="text-gray-400 font-manrope">Exterior</span>
                          <span className="font-bold text-white font-manrope">{vehicle.color_exterior}</span>
                        </div>
                      )}
                      {vehicle.color_interior && (
                        <div className="flex justify-between items-center p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                          <span className="text-gray-400 font-manrope">Interior</span>
                          <span className="font-bold text-white font-manrope">{vehicle.color_interior}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Full-Width Content Sections */}
          <div className="px-4 lg:px-8 space-y-12 pb-32 lg:pb-12">
            {/* Financing Options */}
            <section className="bg-gradient-to-br from-gray-900/80 to-black rounded-3xl p-8 lg:p-12 border border-gray-700/50">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-6 font-manrope">Flexible Financing Options</h2>
                <p className="text-lg text-gray-400 mb-8 font-manrope">
                  Choose from our range of financing solutions tailored to your needs
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                      <Calculator size={28} className="text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2 font-manrope">Low EMI Options</h3>
                    <p className="text-gray-400 text-sm font-manrope">Starting from ₹{emiAmount.toLocaleString()}/month</p>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                    <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                      <Award size={28} className="text-green-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2 font-manrope">Quick Approval</h3>
                    <p className="text-gray-400 text-sm font-manrope">Get approved in as little as 24 hours</p>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                      <Shield size={28} className="text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2 font-manrope">Flexible Terms</h3>
                    <p className="text-gray-400 text-sm font-manrope">Choose from 1-7 year repayment options</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Service & Maintenance */}
            <section className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 font-manrope">Comprehensive Service & Support</h2>
                <p className="text-lg text-gray-400 mb-8 font-manrope">
                  Our commitment doesn&apos;t end with the purchase. We provide comprehensive after-sales support to keep your vehicle in pristine condition.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                      <Shield size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 font-manrope">Extended Warranty</h3>
                      <p className="text-gray-400 font-manrope">Comprehensive coverage for peace of mind</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 border border-green-500/30">
                      <Settings size={20} className="text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 font-manrope">Regular Maintenance</h3>
                      <p className="text-gray-400 font-manrope">Scheduled service reminders and support</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                      <Phone size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 font-manrope">24/7 Support</h3>
                      <p className="text-gray-400 font-manrope">Round-the-clock customer assistance</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-700/50">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4 font-manrope">Ready to Experience This Vehicle?</h3>
                  <p className="text-gray-400 mb-6 font-manrope">
                    Schedule a test drive or visit our showroom to see this amazing vehicle in person.
                  </p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowScheduleModal(true)}
                      className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all duration-300 font-manrope"
                    >
                      Schedule Test Drive
                    </button>
                    <button
                      onClick={handleCallDealer}
                      className="w-full border border-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-900/50 transition-all duration-300 font-manrope"
                    >
                      Call Our Expert
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust Indicators */}
            <section className="bg-gradient-to-br from-black to-gray-900 text-white rounded-3xl p-8 lg:p-12 border border-gray-800">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 font-manrope">Trusted by Thousands</h2>
                <p className="text-lg text-gray-400 mb-12 font-manrope">
                  Join thousands of satisfied customers who have found their perfect vehicle with us
                </p>
                
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent mb-2 font-manrope">10,000+</div>
                    <div className="text-gray-400 font-manrope">Happy Customers</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent mb-2 font-manrope">5,000+</div>
                    <div className="text-gray-400 font-manrope">Vehicles Sold</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent mb-2 font-manrope">15+</div>
                    <div className="text-gray-400 font-manrope">Years Experience</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent mb-2 font-manrope">4.8/5</div>
                    <div className="text-gray-400 font-manrope">Customer Rating</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Recommended Vehicles Section */}
        {vehicle && (
          <RecommendedVehiclesClient
            vehicles={[]} // Empty initially, will be fetched by the client component
            currentVehicleId={vehicle.id}
          />
        )}

        {/* Mobile Fixed Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-700 p-4 z-40">
          <div className="flex gap-3">
            <button
              onClick={handleCallDealer}
              className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 font-manrope"
            >
              <Phone size={18} />
              Call
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 hover:bg-green-700 font-manrope"
            >
              <MessageCircle size={18} />
              Chat
            </button>
            <button
              onClick={handleEMICalculator}
              className="flex-1 border border-gray-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 hover:bg-gray-900/50"
            >
              <Calculator size={18} />
              EMI
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex-1 border border-gray-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 hover:bg-gray-900/50"
            >
              <Calendar size={18} />
              Drive
            </button>
          </div>
        </div>

        {/* Modals */}
        {showEMIModal && vehicle && (
          <EMIModal
            visible={showEMIModal}
            onClose={() => setShowEMIModal(false)}
            vehicle={{
              id: vehicle.id,
              brand: vehicle.brand,
              model: vehicle.model,
              year: vehicle.year,
              price: vehicle.price.toString(),
              originalPrice: vehicle.original_price?.toString() || vehicle.price.toString(),
              image: images[0]?.image_url || '/placeholder-car.jpg',
              mileage: vehicle.mileage 
                ? (typeof vehicle.mileage === 'number' 
                   ? `${vehicle.mileage.toLocaleString()} km` 
                   : vehicle.mileage)
                : 'N/A',
              fuelType: vehicle.fuel_type || 'Petrol',
              transmission: vehicle.transmission || 'Manual',
              seating: vehicle.seating || 5,
              location: vehicle.location || 'India',
              condition: vehicle.condition || 'Excellent',
              features: features.map(f => f.feature),
              savings: vehicle.savings?.toString() || '0',
              isLiked: liked,
              views: 0 // Default value as it's not in VehicleDetails
            }}
          />
        )}
        
        {showScheduleModal && (
          <ScheduleDemo
            isOpen={showScheduleModal}
            onClose={() => setShowScheduleModal(false)}
            selectedVehicle={vehicle ? {
              id: vehicle.id,
              brand: vehicle.brand,
              model: vehicle.model,
              year: vehicle.year,
              price: vehicle.price.toString(),
              image: images[0]?.image_url
            } : null}
          />
        )}
      </div>

      <style jsx global>{`
        /* Ultra smooth animations and interactions */
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Smooth transitions for all interactive elements */
        button, a, input, select, textarea {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
        
        /* Enhanced hover and focus states */
        button:hover {
          -webkit-transform: translateY(-1px);
          transform: translateY(-1px);
        }
        
        button:active {
          -webkit-transform: translateY(0);
          transform: translateY(0);
        }
        
        /* Smooth modal transitions */
        .modal-overlay {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        
        /* Image loading animations */
        img {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        img:hover {
          transform: scale(1.02);
        }
        
        /* Loading spinner enhancement */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        /* Scroll performance */
        .lg\\:sticky {
          will-change: transform;
        }
        
        /* Touch optimization for mobile */
        @media (max-width: 768px) {
          * {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }
          
          input, textarea {
            -webkit-user-select: text;
            user-select: text;
          }
        }
        
        /* Prevent layout shifts */
        .aspect-\\[4\\/3\\] {
          aspect-ratio: 4/3;
        }
        
        /* Fullscreen modal improvements */
        .fixed.inset-0 {
          overscroll-behavior: contain;
        }
      `}</style>
    </>
  );
}