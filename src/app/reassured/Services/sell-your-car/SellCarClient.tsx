'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, ChevronRight, ChevronLeft, Check
} from 'lucide-react';
import SellNowWizard from './SellNowWizard';

// Types
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


// Progress Steps Configuration
const STEPS = [
  { id: 0, title: 'Car Details', subtitle: 'Brand & Model' },
  { id: 1, title: 'Specifications', subtitle: 'Fuel & Variant' },
  { id: 2, title: 'Registration', subtitle: 'RTO & Year' },
  { id: 3, title: 'Usage', subtitle: 'Owner & KMs' },
  { id: 4, title: 'Contact', subtitle: 'Get Valuation' },
];

// Simplified Step Indicator
const StepIndicator: React.FC<{ currentStep: number; onStepClick: (step: number) => void }> = ({ 
  currentStep, 
  onStepClick 
}) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
      <div className="max-w-5xl mx-auto px-4 py-4">
        {/* Desktop Progress */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute left-0 right-0 top-5 h-[2px] bg-gray-200">
              <div 
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
            
            {/* Step Circles */}
            {STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => onStepClick(step.id)}
                className="relative z-10 group"
              >
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300 border-2
                  ${currentStep >= step.id 
                    ? 'bg-black border-black text-white' 
                    : 'bg-white border-gray-300 text-gray-400 hover:border-gray-400'}
                `}>
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id + 1}</span>
                  )}
                </div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="text-xs font-medium text-gray-900">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {currentStep + 1} of {STEPS.length}</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / (STEPS.length - 1)) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black transition-all duration-500"
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
          <div className="mt-2">
            <div className="text-sm font-medium">{STEPS[currentStep].title}</div>
            <div className="text-xs text-gray-500">{STEPS[currentStep].subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Car Details Summary Bar
const CarDetailsSummary: React.FC<{ formData: FormData }> = ({ formData }) => {
  const details = [
    { label: 'Brand', value: formData.brand },
    { label: 'Model', value: formData.model },
    { label: 'Fuel', value: formData.fuelType },
    { label: 'Variant', value: formData.variant },
    { label: 'RTO', value: formData.rto },
    { label: 'Year', value: formData.year },
    { label: 'Owner', value: formData.ownership },
    { label: 'KMs', value: formData.kms },
  ].filter(item => item.value);

  if (details.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">Your Selection</h3>
        <span className="text-xs text-gray-500">{details.length} details added</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {details.map((detail, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm"
          >
            <span className="text-gray-500 text-xs">{detail.label}:</span>
            <span className="font-medium text-gray-900">{detail.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Main Client Component
export default function SellCarClient() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<'next' | 'back'>('next');
  const [formData] = useState<FormData>({
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
    whatsappUpdates: true,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  // const wizardScrollRef = useRef<HTMLDivElement>(null);

  // Handle navigation
  const handleNext = () => {
    setDirection('next');
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setDirection('back');
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepChange = (newStep: number) => {
    if (newStep <= step || isStepAccessible()) {
      setDirection(newStep > step ? 'next' : 'back');
      setStep(newStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // const handleFormDataChange = (newData: Partial<FormData>) => {
  //   setFormData((prev) => ({ ...prev, ...newData }));
  // };

  // Check if step is accessible based on form completion
  const isStepAccessible = () => {
    // Logic to check if previous steps are completed
    // For simplicity, allowing all navigation in this example
    return true;
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    
    // Simulate API call
    setTimeout(() => {
      // In real app, this would redirect or show next steps
    }, 2000);
  };

  // Success Modal
  const SuccessModal = () => (
    <AnimatePresence>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-medium mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-6">
                Your car evaluation request has been submitted successfully. 
                Our expert will call you within 30 minutes.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                >
                  Done
                </button>
                <button
                  onClick={() => window.location.href = 'tel:18001234567'}
                  className="w-full py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  📞 Call Now: 1800-123-4567
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Step Indicator */}
      <StepIndicator currentStep={step} onStepClick={handleStepChange} />

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Car Details Summary */}
        <CarDetailsSummary formData={formData} />

        {/* Form Steps */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: direction === 'next' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'next' ? -20 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <SellNowWizard
                compact={false}
                largeButtons={true}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                ${step === 0 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-50 border border-gray-300'}
              `}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Get Instant Valuation
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Need Help?</h3>
              <p className="text-sm text-gray-600">
                Our car experts are available to assist you 24/7
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = 'tel:18001234567'}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">Call Now</span>
              </button>
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors">
                Live Chat
              </button>
            </div>
          </div>
        </div>

        {/* Trust Features */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="text-2xl font-light mb-1">50,000+</div>
            <div className="text-sm text-gray-600">Cars Sold</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-light mb-1">4.9★</div>
            <div className="text-sm text-gray-600">Google Rating</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-light mb-1">24 Hrs</div>
            <div className="text-sm text-gray-600">Quick Sale</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-light mb-1">140+</div>
            <div className="text-sm text-gray-600">Quality Checks</div>
          </div>
        </div>
      </div>

      {/* Floating Call Button (Mobile) */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = 'tel:18001234567'}
          className="w-14 h-14 bg-black text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <Phone className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Success Modal */}
      <SuccessModal />
    </>
  );
}