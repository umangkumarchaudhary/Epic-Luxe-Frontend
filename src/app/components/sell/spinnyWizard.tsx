'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Shield, Award, Users, Star, Clock } from 'lucide-react';
import AllStepsComponent from './allSteps';

// Define your form data type explicitly
interface FormData {
  brand: string;
  model: string;
  fuelType: string;
  transmission: string;
  variant: string;
  rto: string;
  year: string;
  ownership: string;
  kms: string;
  when: string;
  phone: string;
  whatsappUpdates: boolean;
}

// Define the props interface expected by AllSteps
interface AllStepsProps {
  currentStep: number;
  formData: FormData;
  onStepChange: (newStep: number) => void;
  onFormDataChange: (newData: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  wizardScrollRef: React.RefObject<HTMLDivElement | null>;
}

// Use typed AllSteps alias to avoid naming conflict
const AllSteps = AllStepsComponent as React.FC<AllStepsProps>;

// Minimal AnimatedStep component for transitions only
const AnimatedStep: React.FC<{
  children: React.ReactNode;
  direction: 'next' | 'back';
  step: number;
}> = ({ children, direction, step }) => (
  <AnimatePresence initial={false} mode="wait">
    <motion.div
      key={step}
      initial={{
        opacity: 0,
        x: direction === 'next' ? 50 : -50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: direction === 'next' ? -50 : 50,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// Trustworthy Icons component (unchanged)
const TrustworthyIcons: React.FC = () => {
  const trustFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Safe & Secure",
      subtitle: "Verified transactions",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Best Price Guaranteed",
      subtitle: "Market leading offers",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "50,000+ Happy Customers",
      subtitle: "Trusted by thousands",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "4.8/5 Rating",
      subtitle: "Excellent customer service",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Instant Evaluation",
      subtitle: "Get price in minutes",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {trustFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex flex-col items-center text-center p-4 rounded-xl bg-gradient-to-br from-[#1a1a1a]/90 to-[#0e0e0e]/90 backdrop-blur-sm border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 hover:shadow-lg hover:shadow-[#D4AF37]/10 transition-all duration-300"
          >
            <div className="text-[#D4AF37] mb-3">{feature.icon}</div>
            <h3 className="font-bold text-sm md:text-base text-white/90 mb-1">
              {feature.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-200/70">{feature.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Sticky Car Details Bar component (typed)
const CarDetailsBar: React.FC<{ formData: FormData }> = ({ formData }) => {
  const details = [
    formData.brand,
    formData.model,
    formData.fuelType && formData.transmission
      ? `${formData.fuelType} ${formData.transmission}`
      : formData.fuelType,
    formData.variant,
    formData.rto,
    formData.year,
    formData.ownership,
    formData.kms,
    formData.when,
  ].filter(Boolean);

  if (details.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-20 z-40 px-4 py-3 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] shadow-xl shadow-[#D4AF37]/20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <span className="text-black font-semibold text-sm whitespace-nowrap">
            Your Car Details
          </span>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {details.map((detail, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-black/80 text-[#D4AF37] font-semibold border border-[#D4AF37]/30 text-xs whitespace-nowrap flex-shrink-0 backdrop-blur-sm"
              >
                {detail}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SellNowWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<'next' | 'back'>('next');
  const [formData, setFormData] = useState<FormData>({
    brand: '',
    model: '',
    fuelType: '',
    transmission: '',
    variant: '',
    rto: '',
    year: '',
    ownership: '',
    kms: '',
    when: '',
    phone: '',
    whatsappUpdates: false,
  });
  const wizardScrollRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setDirection('next');
    setStep((s) => Math.min(s + 1, 9));
  };

  const handleBack = () => {
    setDirection('back');
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleStepChange = (newStep: number) => {
    setDirection(newStep > step ? 'next' : 'back');
    setStep(newStep);
  };

  const handleFormDataChange = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Thank you! Your car evaluation request has been submitted. 🚗✨');
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image using Next Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/LandingPageCar4.jpg"
          alt="Background"
          fill
          priority
          className="object-cover w-full h-full animate-slow-zoom"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-[#BFA980]/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header Space */}
      <div className="h-20" />

      {/* Sticky Car Details Bar */}
      <div className="relative z-10">
        <CarDetailsBar formData={formData} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="w-full">
          {/* Heading Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 px-4 py-8"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90 mb-4 tracking-tight">
              Sell Your Car with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#BFA980] font-normal">
                Epic Luxe
              </span>
            </h1>
          </motion.div>

          {/* AllSteps Component wrapped in AnimatedStep */}
          <AnimatedStep step={step} direction={direction}>
            <AllSteps
              currentStep={step}
              formData={formData}
              onStepChange={handleStepChange}
              onFormDataChange={handleFormDataChange}
              onNext={handleNext}
              onBack={handleBack}
              onSubmit={handleSubmit}
              wizardScrollRef={wizardScrollRef}
            />
          </AnimatedStep>

          {/* Floating Navigation Helper */}
          {step > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-6 left-6 z-50"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#D4AF37]/90 to-[#BFA980]/90 backdrop-blur-sm text-black px-4 py-2 rounded-full font-semibold shadow-lg border border-[#D4AF37]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/40"
                onClick={handleBack}
              >
                ← Back
              </motion.button>
            </motion.div>
          )}

          {/* Floating Call Button */}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-4 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/40"
                onClick={() => window.open('tel:+919999999999', '_self')}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Call Us</span>
              </motion.button>
            </motion.div>
          )}

          {/* Trustworthy Icons Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full mt-12"
          >
            <TrustworthyIcons />
          </motion.div>

          {/* Additional Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center mt-8 text-gray-200/70 px-4 pb-8"
          >
            <p className="text-sm font-light">
              🔒 Your data is 100% secure and encrypted • ⚡ Get instant quotes • 🏆 Rated #1 by customers
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slow-zoom {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }

        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SellNowWizard;
