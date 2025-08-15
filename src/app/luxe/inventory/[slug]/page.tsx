'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';

import {
  ArrowLeft, Calendar, Calculator, Share2, Heart, Phone, MapPin, Fuel,
  Settings, Gauge, Car, Shield, Award, Eye, ChevronLeft, ChevronRight,
  MessageCircle, Users, Zap
} from 'lucide-react';

import EMIModal from '../components/EMIModel';
import ScheduleDemo from '../components/Schedule';

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
  
  let colorClass = 'text-slate-400 bg-slate-100 border-slate-300';
  if (score >= 9) colorClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  else if (score >= 7) colorClass = 'text-amber-700 bg-amber-50 border-amber-200';
  else colorClass = 'text-red-700 bg-red-50 border-red-200';

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border bg-white">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
          <Shield size={18} />
        </div>
        <span className="font-medium text-slate-700">{label}</span>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-slate-900">{score}</div>
        <div className="text-xs text-slate-500">/10</div>
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
      <div className="aspect-[4/3] bg-slate-100 rounded-3xl flex items-center justify-center">
        <div className="text-center text-slate-400">
          <Car size={48} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No images available</p>
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
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 group">
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
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={20} className="text-slate-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={20} className="text-slate-700" />
            </button>
          </>
        )}

        {/* Fullscreen button */}
        <button
          onClick={() => setShowFullscreen(true)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
        >
          <Eye size={18} className="text-slate-700" />
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
                  ? 'border-slate-900 shadow-lg scale-105' 
                  : 'border-slate-200 hover:border-slate-300'
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
            
            {/* Close button */}
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-3xl font-light transition-all"
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

        const response = await fetch(`http://localhost:5000/admin/vehicle/slug/${slug}`);
        if (!response.ok) {
          setError(response.status === 404 ? 'Vehicle not found' : `HTTP error! status: ${response.status}`);
          return;
        }
        
        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Failed to fetch vehicle details');
        
        setVehicle(data.vehicle);
        setImages(data.images || []);
        setFeatures(data.features || []);
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-slate-700">Loading vehicle details...</h2>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Car size={32} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">
            {error === 'Vehicle not found' ? 'Vehicle Not Found' : 'Error Loading Vehicle'}
          </h1>
          <p className="text-slate-600 mb-8">
            {error === 'Vehicle not found'
              ? 'The vehicle you&apos;re looking for is no longer available.'
              : error || 'Unable to load vehicle details at the moment.'}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/inventory')}
              className="w-full bg-slate-900 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-slate-800 transition-colors"
            >
              Browse All Vehicles
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full border border-slate-300 text-slate-700 px-6 py-3 rounded-2xl font-semibold hover:bg-slate-50 transition-colors"
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

      <div className="min-h-screen bg-white">
        {/* Header - FIXED: Not sticky for full page scroll */}
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`w-10 h-10 rounded-full border transition-all duration-300 hover:scale-110 active:scale-90 ${
                  liked 
                    ? 'border-red-200 bg-red-50 text-red-500 shadow-md' 
                    : 'border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 hover:shadow-md'
                }`}
              >
                <Heart size={18} fill={liked ? 'currentColor' : 'none'} className="mx-auto" />
              </button>
              
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 hover:scale-110 active:scale-90 hover:shadow-md flex items-center justify-center"
                >
                  <Share2 size={18} className="text-slate-600" />
                </button>
                {copyMessage && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap">
                    {copyMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - UPDATED: Full width layout with more content */}
        <main className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-4 lg:p-8">
            {/* Left Column - Images */}
            <div className="space-y-6">
              <ImageGallery images={images} />
              
              {/* Additional Content Block */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Premium Experience</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Shield size={24} className="text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-1">Certified</h4>
                    <p className="text-sm text-slate-600">200+ Point Inspection</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Award size={24} className="text-green-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-1">Warranty</h4>
                    <p className="text-sm text-slate-600">Comprehensive Coverage</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-8">
              {/* Vehicle Title & Price */}
              <section className="space-y-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                    {vehicle.year} {vehicle.brand} {vehicle.model}
                    {vehicle.variant && (
                      <span className="text-2xl lg:text-3xl font-medium text-slate-600 ml-3">
                        {vehicle.variant}
                      </span>
                    )}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-slate-600">
                    {vehicle.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{vehicle.location}</span>
                      </div>
                    )}
                    {vehicle.condition && (
                      <div className="flex items-center gap-1">
                        <Shield size={16} />
                        <span>{vehicle.condition}</span>
                      </div>
                    )}
                    {vehicle.ownership && (
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{vehicle.ownership}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-bold text-slate-900">
                      {formatPrice(vehicle.price)}
                    </span>
                    {vehicle.original_price && (
                      <span className="text-xl text-slate-400 line-through">
                        {formatPrice(vehicle.original_price)}
                      </span>
                    )}
                  </div>
                  
                  {vehicle.savings && (
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                      <span className="font-semibold">Save ₹{vehicle.savings.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <p className="text-slate-600">
                    EMI starts from <span className="font-semibold text-slate-900">₹{emiAmount.toLocaleString()}/month</span>
                  </p>
                </div>
              </section>

              {/* Action Buttons */}
              <section className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleCallDealer}
                  className="flex items-center justify-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-slate-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  <Phone size={20} />
                  Call Dealer
                </button>
                
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </button>
                
                <button
                  onClick={handleEMICalculator}
                  className="flex items-center justify-center gap-3 border border-slate-300 text-slate-700 px-6 py-4 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calculator size={20} />
                  EMI Calculator
                </button>
                
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="flex items-center justify-center gap-3 border border-slate-300 text-slate-700 px-6 py-4 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar size={20} />
                  Test Drive
                </button>
              </section>

              {/* Key Specifications */}
              <section className="bg-slate-50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Car size={24} />
                  Key Specifications
                </h2>
                
                <div className="grid grid-cols-2 gap-6">
                  {vehicle.mileage && (
                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Gauge size={16} />
                        <span className="text-sm font-medium">Mileage</span>
                      </div>
                      <div className="font-semibold text-slate-900">{vehicle.mileage}</div>
                    </div>
                  )}
                  
                  {vehicle.fuel_type && (
                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Fuel size={16} />
                        <span className="text-sm font-medium">Fuel Type</span>
                      </div>
                      <div className="font-semibold text-slate-900">{vehicle.fuel_type}</div>
                    </div>
                  )}
                  
                  {vehicle.transmission && (
                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Settings size={16} />
                        <span className="text-sm font-medium">Transmission</span>
                      </div>
                      <div className="font-semibold text-slate-900">{vehicle.transmission}</div>
                    </div>
                  )}
                  
                  {vehicle.engine_capacity && (
                    <div>
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Zap size={16} />
                        <span className="text-sm font-medium">Engine</span>
                      </div>
                      <div className="font-semibold text-slate-900">{vehicle.engine_capacity}</div>
                    </div>
                  )}
                </div>

                {/* Additional specs */}
                {(vehicle.horsepower || vehicle.torque || vehicle.color_exterior || vehicle.color_interior) && (
                  <div className="border-t border-slate-200 mt-6 pt-6">
                    <div className="grid grid-cols-1 gap-4">
                      {vehicle.horsepower && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Power</span>
                          <span className="font-semibold text-slate-900">{vehicle.horsepower}</span>
                        </div>
                      )}
                      {vehicle.torque && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Torque</span>
                          <span className="font-semibold text-slate-900">{vehicle.torque}</span>
                        </div>
                      )}
                      {vehicle.color_exterior && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Exterior Color</span>
                          <span className="font-semibold text-slate-900">{vehicle.color_exterior}</span>
                        </div>
                      )}
                      {vehicle.color_interior && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Interior Color</span>
                          <span className="font-semibold text-slate-900">{vehicle.color_interior}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </section>

              {/* Vehicle Health Report */}
              {healthScores.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <Shield size={24} />
                    Vehicle Health Report
                  </h2>
                  <div className="space-y-4">
                    {healthScores.map((item, index) => (
                      <HealthScore key={index} score={item.score} label={item.label} />
                    ))}
                  </div>
                </section>
              )}

              {/* Features */}
              {features.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <Award size={24} />
                    Features & Highlights
                  </h2>
                  <div className="bg-slate-50 rounded-3xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-slate-900 rounded-full flex-shrink-0"></div>
                          <span className="text-slate-700">{feature.feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Why Choose This Vehicle */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Choose This Vehicle?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield size={28} className="text-slate-700" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">Certified Quality</h3>
                    <p className="text-slate-600 text-sm">Thoroughly inspected and certified by our experts</p>
                  </div>
                  
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Award size={28} className="text-slate-700" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">Premium Selection</h3>
                    <p className="text-slate-600 text-sm">Hand-picked from our luxury vehicle collection</p>
                  </div>
                  
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Phone size={28} className="text-slate-700" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">Full Support</h3>
                    <p className="text-slate-600 text-sm">Comprehensive after-sales support and warranty</p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Additional Full-Width Content Sections */}
          <div className="px-4 lg:px-8 space-y-12 pb-32 lg:pb-12">
            {/* Financing Options */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 lg:p-12">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Flexible Financing Options</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Choose from our range of financing solutions tailored to your needs
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Calculator size={28} className="text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">Low EMI Options</h3>
                    <p className="text-slate-600 text-sm">Starting from ₹{emiAmount.toLocaleString()}/month</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Award size={28} className="text-green-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">Quick Approval</h3>
                    <p className="text-slate-600 text-sm">Get approved in as little as 24 hours</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield size={28} className="text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">Flexible Terms</h3>
                    <p className="text-slate-600 text-sm">Choose from 1-7 year repayment options</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Service & Maintenance */}
            <section className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Comprehensive Service & Support</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Our commitment doesn&apos;t end with the purchase. We provide comprehensive after-sales support to keep your vehicle in pristine condition.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Extended Warranty</h3>
                      <p className="text-slate-600">Comprehensive coverage for peace of mind</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Settings size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Regular Maintenance</h3>
                      <p className="text-slate-600">Scheduled service reminders and support</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">24/7 Support</h3>
                      <p className="text-slate-600">Round-the-clock customer assistance</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-3xl p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Experience This Vehicle?</h3>
                  <p className="text-slate-600 mb-6">
                    Schedule a test drive or visit our showroom to see this amazing vehicle in person.
                  </p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowScheduleModal(true)}
                      className="w-full bg-slate-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300"
                    >
                      Schedule Test Drive
                    </button>
                    <button
                      onClick={handleCallDealer}
                      className="w-full border border-slate-300 text-slate-700 py-3 px-6 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300"
                    >
                      Call Our Expert
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust Indicators */}
            <section className="bg-slate-900 text-white rounded-3xl p-8 lg:p-12">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Trusted by Thousands</h2>
                <p className="text-lg text-slate-300 mb-12">
                  Join thousands of satisfied customers who have found their perfect vehicle with us
                </p>
                
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">10,000+</div>
                    <div className="text-slate-300">Happy Customers</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">5,000+</div>
                    <div className="text-slate-300">Vehicles Sold</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">15+</div>
                    <div className="text-slate-300">Years Experience</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">4.8/5</div>
                    <div className="text-slate-300">Customer Rating</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Mobile Fixed Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-40">
          <div className="flex gap-3">
            <button
              onClick={handleCallDealer}
              className="flex-1 bg-slate-900 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 hover:bg-slate-800"
            >
              <Phone size={18} />
              Call
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 hover:bg-green-700"
            >
              <MessageCircle size={18} />
              Chat
            </button>
            <button
              onClick={handleEMICalculator}
              className="flex-1 border border-slate-300 text-slate-700 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 hover:bg-slate-50"
            >
              <Calculator size={18} />
              EMI
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex-1 border border-slate-300 text-slate-700 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 hover:bg-slate-50"
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
              mileage: vehicle.mileage || 'N/A',
              fuelType: vehicle.fuel_type || 'Petrol',
              transmission: vehicle.transmission,
              seating: 5, // Default value as it's not in VehicleDetails
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