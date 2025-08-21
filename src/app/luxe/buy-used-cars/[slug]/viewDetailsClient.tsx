'use client';

import React, { useState, useCallback, useMemo, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import {
  ArrowLeft, Calendar, Calculator, Share2, Heart, Phone, MapPin, Fuel,
  Settings, Gauge, Car, Shield, Award, Eye, ChevronLeft, ChevronRight,
  MessageCircle, Users
} from 'lucide-react';

// Dynamic imports for better performance
const EMIModal = dynamic(() => import('../components/EMIModel'), {
  ssr: false,
  loading: () => <div className="animate-pulse">Loading...</div>
});

const ScheduleDemo = dynamic(() => import('../components/Schedule'), {
  ssr: false,
  loading: () => <div className="animate-pulse">Loading...</div>
});

const RecommendedVehiclesClient = dynamic(() => 
  import('./recommended-vehicles/RecommendedVehiclesClient').then(mod => ({ 
    default: mod.RecommendedVehiclesClient 
  })), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-800 h-96 rounded-lg mx-4 lg:mx-8 mb-8"></div>
  )
});

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
  mileage?: string;
  fuel_type?: string;
  transmission?: string;
  engine_capacity?: string;
  horsepower?: string;
  torque?: string;
  location?: string;
  condition?: string;
  ownership?: string;
  health_engine?: number;
  health_tyres?: number;
  health_paint?: number;
  health_interior?: number;
  health_electrical?: number;
  color_exterior?: string;
  color_interior?: string;
  slug: string;
  created_at: string;
}

interface VehicleData {
  vehicle: VehicleDetails;
  images: VehicleImage[];
  features: VehicleFeature[];
}

interface ViewDetailsClientProps {
  vehicleData: VehicleData;
  slug: string;
}

// --- UTILITIES ---
const formatPrice = (price: number): string => {
  return price ? `₹${(price / 100000).toFixed(1)} Lakh` : '--';
};

const calculateEMI = (price: number, years = 5, rate = 8.5): number => {
  if (!price) return 0;
  const n = years * 12;
  const r = rate / (12 * 100);
  return Math.round((price * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
};

// --- MEMOIZED COMPONENTS ---
const HealthScore = React.memo(({ score, label }: { score?: number, label: string }) => {
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
});

HealthScore.displayName = 'HealthScore';

const ImageGallery = React.memo(({ images }: { images: VehicleImage[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = useCallback((imageId: number) => {
    setImageErrors(prev => new Set(prev).add(imageId));
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!showFullscreen) return;
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') setShowFullscreen(false);
  }, [showFullscreen, prevImage, nextImage]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const currentImage = useMemo(() => 
    images[currentIndex] || null, 
    [images, currentIndex]
  );

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

  return (
    <>
      {/* Main Image */}
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-900/50 group">
        {currentImage && !imageErrors.has(currentImage.id) ? (
          <Image
            src={currentImage.image_url}
            alt={`Vehicle image ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            className="object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
            onClick={() => setShowFullscreen(true)}
            onError={() => handleImageError(currentImage.id)}
            priority={currentIndex === 0}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <Car size={48} className="text-gray-400 opacity-50" />
          </div>
        )}
        
        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 border border-[#D4AF37]/30"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-[#D4AF37]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 border border-[#D4AF37]/30"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-[#D4AF37]" />
            </button>
          </>
        )}

        {/* Fullscreen button */}
        <button
          onClick={() => setShowFullscreen(true)}
          className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 border border-[#D4AF37]/30"
          aria-label="View fullscreen"
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
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                index === currentIndex 
                  ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/25 scale-105' 
                  : 'border-gray-600 hover:border-[#D4AF37]/50'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.image_url}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={64}
                className="w-full h-full object-cover"
                onError={() => handleImageError(image.id)}
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowFullscreen(false)}
        >
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            {currentImage && !imageErrors.has(currentImage.id) && (
              <Image
                src={currentImage.image_url}
                alt="Fullscreen view"
                width={1200}
                height={900}
                className="max-w-full max-h-full object-contain rounded-2xl"
                onClick={(e) => e.stopPropagation()}
                onError={() => handleImageError(currentImage.id)}
              />
            )}
            
            {/* Navigation in fullscreen */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-[#D4AF37] transition-all border border-[#D4AF37]/30"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-[#D4AF37] transition-all border border-[#D4AF37]/30"
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
            
            {/* Close button */}
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 w-14 h-14 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-[#D4AF37] text-3xl font-light transition-all border border-[#D4AF37]/30"
              aria-label="Close fullscreen"
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
});

ImageGallery.displayName = 'ImageGallery';

// --- MAIN COMPONENT ---
export function ViewDetailsClient({ vehicleData, slug: _slug }: ViewDetailsClientProps) {
  const router = useRouter();
  const { vehicle, images, features } = vehicleData;

  // State management
  const [liked, setLiked] = useState(false);
  const [showEMIModal, setShowEMIModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  // Memoized calculations
  const emiAmount = useMemo(() => calculateEMI(vehicle.price), [vehicle.price]);
  
  const healthScores = useMemo(() => [
    { score: vehicle.health_engine, label: 'Engine' },
    { score: vehicle.health_tyres, label: 'Tyres' },
    { score: vehicle.health_paint, label: 'Paint' },
    { score: vehicle.health_interior, label: 'Interior' },
    { score: vehicle.health_electrical, label: 'Electrical' }
  ].filter(item => item.score != null), [
    vehicle.health_engine,
    vehicle.health_tyres,
    vehicle.health_paint,
    vehicle.health_interior,
    vehicle.health_electrical
  ]);

  // Event handlers
  const handleShare = useCallback(async () => {
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
  }, [vehicle]);

  const handleWhatsApp = useCallback(() => {
    if (!vehicle) return;
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.model} (${formatPrice(vehicle.price)}). Could you please provide more details?`
    );
    window.open(`https://wa.me/918825338775?text=${message}`, '_blank');
  }, [vehicle]);

  const handleCallDealer = useCallback(() => {
    window.open('tel:+918825338775', '_self');
  }, []);

  const handleEMICalculator = useCallback(() => {
    if (vehicle) {
      setShowEMIModal(true);
    }
  }, [vehicle]);

  const handleTestDrive = useCallback(() => {
    setShowScheduleModal(true);
  }, []);

  const toggleLike = useCallback(() => {
    setLiked(prev => !prev);
  }, []);

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Header */}
        <header className="bg-black/80 backdrop-blur-sm border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
              <span className="font-medium font-manrope">Back</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLike}
                className={`w-10 h-10 rounded-full border transition-all duration-300 hover:scale-110 active:scale-90 ${
                  liked 
                    ? 'border-red-400 bg-red-500/10 text-red-400 shadow-md shadow-red-400/25' 
                    : 'border-gray-600 hover:border-red-400 hover:bg-red-500/10 hover:text-red-400 hover:shadow-md'
                }`}
                aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart size={18} fill={liked ? 'currentColor' : 'none'} className="mx-auto" />
              </button>
              
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full border border-gray-600 hover:border-[#D4AF37] hover:bg-gray-900/50 transition-all duration-300 hover:scale-110 active:scale-90 hover:shadow-md flex items-center justify-center"
                  aria-label="Share this vehicle"
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

        {/* Main Content */}
        <main className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-4 lg:p-8 min-h-screen">
            {/* Left Column - Visual Showcase */}
            <div className="space-y-8">
              {/* Hero Image Gallery */}
              <div className="relative">
                <Suspense fallback={
                  <div className="aspect-[4/3] bg-gray-900/50 rounded-3xl animate-pulse"></div>
                }>
                  <ImageGallery images={images} />
                </Suspense>
                
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
                            <p className="text-white font-bold font-manrope">{vehicle.mileage}</p>
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
                        <span className="text-white font-manrope text-sm">{vehicle.ownership}</span>
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
                    onClick={handleTestDrive}
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
                        <span className="font-bold text-[#D4AF37] font-manrope">{vehicle.engine_capacity}</span>
                      </div>
                    )}
                    {vehicle.horsepower && (
                      <div className="flex justify-between items-center p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                        <span className="text-gray-400 font-manrope">Power Output</span>
                        <span className="font-bold text-[#D4AF37] font-manrope">{vehicle.horsepower}</span>
                      </div>
                    )}
                    {vehicle.torque && (
                      <div className="flex justify-between items-center p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                        <span className="text-gray-400 font-manrope">Torque</span>
                        <span className="font-bold text-[#D4AF37] font-manrope">{vehicle.torque}</span>
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
                      onClick={handleTestDrive}
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
        <Suspense fallback={
          <div className="animate-pulse bg-gray-800 h-96 rounded-lg mx-4 lg:mx-8 mb-8"></div>
        }>
          <RecommendedVehiclesClient
            currentVehicleId={vehicle.id}
            currentBrand={vehicle.brand}
            currentFuelType={vehicle.fuel_type}
            currentTransmission={vehicle.transmission}
            currentPriceRange={{
              min: Math.max(0, vehicle.price - (vehicle.price * 0.3)),
              max: vehicle.price + (vehicle.price * 0.3)
            }}
          />
        </Suspense>

        {/* Mobile Fixed Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-700 p-4 z-40">
          <div className="flex gap-3">
            <button
              onClick={handleCallDealer}
              className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 font-manrope"
              aria-label="Call dealer"
            >
              <Phone size={18} />
              Call
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 hover:bg-green-700 font-manrope"
              aria-label="WhatsApp chat"
            >
              <MessageCircle size={18} />
              Chat
            </button>
            <button
              onClick={handleEMICalculator}
              className="flex-1 border border-gray-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 hover:bg-gray-900/50"
              aria-label="EMI Calculator"
            >
              <Calculator size={18} />
              EMI
            </button>
            <button
              onClick={handleTestDrive}
              className="flex-1 border border-gray-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 hover:bg-gray-900/50"
              aria-label="Schedule test drive"
            >
              <Calendar size={18} />
              Drive
            </button>
          </div>
        </div>

        {/* Modals */}
        {showEMIModal && (
          <Suspense fallback={<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full"></div></div>}>
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
                mileage: vehicle.mileage || 'N/A',
                fuelType: vehicle.fuel_type || 'Petrol',
                transmission: vehicle.transmission,
                seating: 5, // Default value
                location: vehicle.location || 'India',
                condition: vehicle.condition || 'Excellent',
                features: features.map(f => f.feature),
                savings: vehicle.savings?.toString() || '0',
                isLiked: liked,
                views: 0 // Default value
              }}
            />
          </Suspense>
        )}
        
        {showScheduleModal && (
          <Suspense fallback={<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full"></div></div>}>
            <ScheduleDemo
              isOpen={showScheduleModal}
              onClose={() => setShowScheduleModal(false)}
              selectedVehicle={{
                id: vehicle.id,
                brand: vehicle.brand,
                model: vehicle.model,
                year: vehicle.year,
                price: vehicle.price.toString(),
                image: images[0]?.image_url
              }}
            />
          </Suspense>
        )}
      </div>

      {/* Performance Optimization Styles */}
      <style jsx global>{`
        /* Scroll performance optimizations */
        html {
          scroll-behavior: smooth;
        }
        
        /* Hide scrollbar for thumbnail strip */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* GPU acceleration for animations */
        button, .group, [class*="transition"] {
          will-change: transform;
          transform: translateZ(0);
        }
        
        /* Optimize images */
        img {
          content-visibility: auto;
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Touch optimization */
        @media (max-width: 768px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Performance critical CSS */
        .aspect-\\[4\\/3\\] {
          aspect-ratio: 4/3;
        }
        
        /* Modal performance */
        .fixed.inset-0 {
          contain: layout style paint;
        }
        
        /* Smooth backdrop blur */
        .backdrop-blur-sm, .backdrop-blur-xl {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        
        /* Prevent layout shifts */
        .space-y-8 > * + * {
          margin-top: 2rem;
        }
        
        .space-y-4 > * + * {
          margin-top: 1rem;
        }
        
        /* Enhanced focus states for accessibility */
        button:focus-visible {
          outline: 2px solid #D4AF37;
          outline-offset: 2px;
        }
        
        /* Performance for large lists */
        .grid {
          contain: layout style;
        }
      `}</style>
    </>
  );
}