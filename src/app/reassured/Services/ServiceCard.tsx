'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Car, DollarSign, Calculator, CreditCard, Shield, RefreshCw } from 'lucide-react';
import Image from 'next/image';

// Map icon names to actual components
const iconMap = {
  Car: Car,
  DollarSign: DollarSign,
  Calculator: Calculator,
  CreditCard: CreditCard,
  Shield: Shield,
  RefreshCw: RefreshCw,
};

type ServiceProps = {
  service: {
    id: string;
    iconName: string; // Changed from 'icon: any' to 'iconName: string'
    title: string;
    summary: string;
    description: string;
    features: string[];
    cta: string;
    backgroundImage: string;
    altText: string;
  };
  index: number;
};

const ServiceCard = ({ service, index }: ServiceProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const IconComponent = iconMap[service.iconName as keyof typeof iconMap]; // Get the actual icon component

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(service.id);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [service.id]);

  return (
    <div
      id={service.id}
      className={`group relative overflow-hidden bg-white border border-gray-200 hover:border-gray-400 transition-all duration-500 hover:shadow-2xl ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Background Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <Image
          src={service.backgroundImage}
          alt={service.altText}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
        
        {/* Icon */}
        <div className="absolute bottom-6 left-6">
          <div className="w-12 h-12 bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-light text-black mb-3 tracking-tight">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed font-light">
          {service.summary}
        </p>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {service.features.map((feature, idx) => (
            <div key={idx} className="flex items-center text-gray-600">
              <CheckCircle className="w-4 h-4 text-black mr-3 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="mercedes-button w-full bg-gray-800 text-white font-medium py-4 px-6 hover:bg-black transition-all duration-300 group">
          <span className="flex items-center justify-center text-sm tracking-wide">
            {service.cta}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;