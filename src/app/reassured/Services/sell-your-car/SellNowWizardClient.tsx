'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Fuel, Zap, Leaf, Car, MapPin, Activity, Phone, Check, Search, Upload, ChevronLeft } from 'lucide-react';
import Image from 'next/image';

// Optimized Types
interface Brand {
  name: string;
  logo: React.ReactNode | string;
}

interface City {
  name: string;
  icon?: React.ReactNode;
}

interface FuelOption {
  key: string;
  icon: string;
  color: string;
}

interface StepConfig {
  id: number;
  label: string;
  icon: string;
  shortLabel: string;
}

interface FormData {
  brand: string;
  model: string;
  fuel: string;
  variant: string;
  city: string;
  year: string;
  owner: string;
  kms: string;
  phone: string;
  whatsappUpdates: boolean;
}

interface LuxuryCars {
  [brandName: string]: {
    [modelName: string]: {
      [fuelType: string]: string[];
    };
  };
}

interface SellNowWizardClientProps {
  brands: Brand[];
  fuelOptions: FuelOption[];
  years: string[];
  ownerOptions: string[];
  kmOptions: string[];
  stepConfig: StepConfig[];
  popularCities: City[];
  otherCities: string[];
  cityImageMap: { [key: string]: string };
  luxuryCars: LuxuryCars;
  compact?: boolean;
  largeButtons?: boolean;
}

// Optimized utility functions
const normalizeCityName = (name: string) =>
  name.replace(/\s+/g, '').toLowerCase().replace('ahmedabad', 'ahemdabad');

const getMonumentImage = (cityName: string, cityImageMap: { [key: string]: string }) => {
  const normalized = normalizeCityName(cityName);
  const imageSrc = cityImageMap[normalized];
  if (!imageSrc) return null;
  
  return (
    <Image
      src={imageSrc}
      alt={`${cityName} monument`}
      width={32}
      height={32}
      className="object-contain w-8 h-8 rounded-lg"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
};

const getIconComponent = (iconName: string, className: string = "w-4 h-4") => {
  const icons = {
    fuel: Fuel, zap: Zap, leaf: Leaf, car: Car, 
    map: MapPin, activity: Activity, phone: Phone
  };
  const IconComponent = icons[iconName as keyof typeof icons] || Car;
  return <IconComponent className={className} />;
};

const SellNowWizardClient: React.FC<SellNowWizardClientProps> = ({
  brands, fuelOptions, years, ownerOptions, kmOptions, stepConfig,
  popularCities, otherCities, cityImageMap, luxuryCars
}) => {
  // Consolidated state management
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    brand: '', model: '', fuel: '', variant: '', city: '', year: '',
    owner: '', kms: '', phone: '', whatsappUpdates: true
  });
  const [searchTerms, setSearchTerms] = useState({ model: '', city: '' });
  const [touched, setTouched] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{
    rc: File | null;
    exterior: File[];
    tyres: File[];
    interior: File[];
  }>({ rc: null, exterior: [], tyres: [], interior: [] });
  
  const wizardScrollRef = useRef<HTMLDivElement>(null);

  // Optimized form data update with auto-progression
  const updateFormData = useCallback((key: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [key]: value };
      
      // Auto-clear dependent fields
      if (key === 'brand') {
        newData.model = newData.fuel = newData.variant = '';
      } else if (key === 'model') {
        newData.fuel = newData.variant = '';
      } else if (key === 'fuel') {
        newData.variant = '';
      }
      
      return newData;
    });
    
    // Auto-progression logic
    setTimeout(() => {
      if (shouldAutoProgress(key, value)) {
        const nextElement = getNextRequiredElement();
        if (nextElement) {
          nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 300);
  }, []);

  // Smart auto-progression helper
  const shouldAutoProgress = (key: string, value: string) => {
    if (!value) return false;
    
    const progressRules = {
      brand: () => true,
      model: () => true,
      fuel: () => true,
      variant: () => currentStep === 1,
      city: () => true,
      year: () => currentStep === 2,
      owner: () => true,
      kms: () => currentStep === 3
    };
    
    return progressRules[key as keyof typeof progressRules]?.() || false;
  };

  const getNextRequiredElement = () => {
    const stepFields = {
      1: ['brand', 'model', 'fuel', 'variant'],
      2: ['city', 'year'],
      3: ['owner', 'kms'],
      4: ['phone']
    };
    
    const currentFields = stepFields[currentStep as keyof typeof stepFields] || [];
    const nextField = currentFields.find(field => !formData[field as keyof FormData]);
    
    if (!nextField && currentStep < 4) {
      // Move to next step if current step is complete
      setTimeout(() => setCurrentStep(prev => prev + 1), 500);
    }
    
    return nextField ? document.querySelector(`[data-field="${nextField}"]`) : null;
  };

  // Memoized data calculations
  const { modelsData, variantsData, availableFuels } = useMemo(() => {
    const brandData = luxuryCars[formData.brand] || {};
    const modelData = brandData[formData.model] || {};
    
    return {
      modelsData: {
        popular: Object.keys(brandData).slice(0, 8),
        other: Object.keys(brandData).slice(8)
      },
      variantsData: (modelData[formData.fuel] || []).map((variant: string) => ({
        name: variant,
        subtitle: `${formData.fuel} • ${formData.brand} ${formData.model}`
      })),
      availableFuels: Object.keys(modelData).filter(fuel => 
        Array.isArray(modelData[fuel]) && modelData[fuel].length > 0
      )
    };
  }, [formData.brand, formData.model, formData.fuel, luxuryCars]);

  // Optimized filter functions
  const filterItems = useCallback((items: any[], searchTerm: string, key = 'name') => {
    if (!searchTerm) return items;
    return items.filter(item => 
      (typeof item === 'string' ? item : item[key])
        .toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, []);

  // Progress calculation
  const progressPercentage = useMemo(() => {
    const stepProgress = (currentStep - 1) * 20;
    const requiredFields = {
      1: ['brand', 'model', 'fuel', 'variant'],
      2: ['city', 'year'], 
      3: ['owner', 'kms'],
      4: ['phone']
    }[currentStep] || [];
    
    const completedFields = requiredFields.filter(field => formData[field as keyof FormData]).length;
    const stepCompletion = requiredFields.length > 0 ? (completedFields / requiredFields.length) * 20 : 20;
    return Math.min(stepProgress + stepCompletion, 100);
  }, [currentStep, formData]);

  // Navigation helpers
  const goToNextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const goToPrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (step: number) => setCurrentStep(step);

  // Validation
  const isPhoneValid = /^\d{10}$/.test(formData.phone);
  const showPhoneError = touched && !isPhoneValid;

  // Submit handler
  const handleSubmit = () => {
    console.log('Form submitted:', { ...formData, timestamp: new Date().toISOString() });
    goToNextStep();
  };

  // File upload handler
  const handleFileUpload = (files: File[], type: string) => {
    if (type === 'rc') {
      setUploadedFiles(prev => ({ ...prev, rc: files[0] || null }));
    } else {
      setUploadedFiles(prev => {
        const currentFiles = prev[type as keyof typeof prev] as File[];
        return {
          ...prev, 
          [type]: [...currentFiles, ...files].slice(0, 5)
        };
      });
    }
  };

  // Optimized Progress Bar Component
  const ProgressBar = React.memo(() => (
    <div className="mb-6 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">Step {currentStep} of 5</span>
        <span className="text-sm font-bold text-black">{Math.round(progressPercentage)}% Complete</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-black h-2 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        {stepConfig.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <button
              onClick={() => goToStep(step.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2 cursor-pointer hover:scale-110 ${
                currentStep >= step.id
                  ? 'bg-black border-black text-white scale-105 shadow-lg'
                  : 'border-gray-300 bg-white text-gray-400 hover:border-black/50'
              }`}
            >
              {currentStep > step.id ? (
                <Check className="w-4 h-4" />
              ) : (
                getIconComponent(step.icon, "w-4 h-4")
              )}
            </button>
            <span className="text-xs mt-2 font-medium hidden sm:block text-center text-gray-600">
              {step.shortLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  ));

  // Selection Display Component
  const SelectionDisplay = React.memo(() => {
    const selections = [
      { label: 'Brand', value: formData.brand, step: 1 },
      { label: 'Model', value: formData.model, step: 1 },
      { label: 'Fuel', value: formData.fuel, step: 1 },
      { label: 'City', value: formData.city, step: 2 },
      { label: 'Year', value: formData.year, step: 2 },
      { label: 'Owner', value: formData.owner, step: 3 },
      { label: 'KMs', value: formData.kms, step: 3 },
    ].filter(item => item.value);

    if (selections.length === 0) return null;

    return (
      <div className="mb-6 py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl max-w-4xl mx-auto">
        <div className="flex gap-2 overflow-x-auto">
          {selections.map((item) => (
            <button
              key={item.label}
              onClick={() => goToStep(item.step)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg flex-shrink-0 hover:bg-gray-50 hover:border-black transition-all duration-200"
            >
              <span className="text-xs text-gray-500 whitespace-nowrap">{item.label}:</span>
              <span className="text-xs font-bold text-black whitespace-nowrap">
                {item.value.length > 8 ? `${item.value.substring(0, 8)}...` : item.value}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  });

  // Optimized render functions
  const renderVehicleInfo = () => (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black mb-2">Vehicle Information</h2>
        <p className="text-gray-600">Tell us about your car</p>
      </div>

      <div className="space-y-8">
        {/* Brand Selection */}
        {!formData.brand && (
          <div data-field="brand">
            <h3 className="text-xl font-bold text-black mb-4">Choose Your Car Brand</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {brands.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => updateFormData('brand', brand.name)}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mb-2 font-bold">
                    {brand.logo}
                  </div>
                  <span className="text-sm font-semibold text-black text-center">{brand.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Model Selection */}
        {formData.brand && !formData.model && (
          <div data-field="model">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => updateFormData('brand', '')} className="text-sm text-gray-500 hover:text-black">
                ← Change Brand
              </button>
            </div>
            <h3 className="text-xl font-bold text-black mb-4">
              Select your <span className="text-gray-600">{formData.brand}</span> model
            </h3>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search models..."
                value={searchTerms.model}
                onChange={(e) => setSearchTerms(prev => ({ ...prev, model: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-6">
              {filterItems(modelsData.popular, searchTerms.model).length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Popular Models</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {filterItems(modelsData.popular, searchTerms.model).map((model) => (
                      <button
                        key={model}
                        className="p-3 rounded-lg border border-gray-200 hover:border-black hover:bg-gray-50 transition-all text-left"
                        onClick={() => {
                          updateFormData('model', model);
                          setSearchTerms(prev => ({ ...prev, model: '' }));
                        }}
                      >
                        <span className="text-sm font-semibold text-black">{model}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {filterItems(modelsData.other, searchTerms.model).length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">All Models</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                    {filterItems(modelsData.other, searchTerms.model).map((model) => (
                      <button
                        key={model}
                        className="p-2 text-sm rounded-lg border border-gray-200 hover:border-black hover:bg-gray-50 transition-all"
                        onClick={() => {
                          updateFormData('model', model);
                          setSearchTerms(prev => ({ ...prev, model: '' }));
                        }}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Fuel Type Selection */}
        {formData.brand && formData.model && !formData.fuel && (
          <div data-field="fuel">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => updateFormData('model', '')} className="text-sm text-gray-500 hover:text-black">
                ← Change Model
              </button>
            </div>
            <h3 className="text-xl font-bold text-black mb-4">Select fuel type</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              {fuelOptions.filter(fuel => availableFuels.includes(fuel.key)).map((fuel) => (
                <button
                  key={fuel.key}
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-all"
                  onClick={() => updateFormData('fuel', fuel.key)}
                >
                  {getIconComponent(fuel.icon, "w-8 h-8 text-black")}
                  <span className="font-bold text-black">{fuel.key}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Variant Selection */}
        {formData.brand && formData.model && formData.fuel && !formData.variant && (
          <div data-field="variant">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => updateFormData('fuel', '')} className="text-sm text-gray-500 hover:text-black">
                ← Change Fuel Type
              </button>
            </div>
            <h3 className="text-xl font-bold text-black mb-4">Choose variant</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
              {variantsData.map((variant) => (
                <button
                  key={variant.name}
                  className="p-4 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition-all text-left"
                  onClick={() => updateFormData('variant', variant.name)}
                >
                  <span className="font-bold text-black block">{variant.name}</span>
                  <span className="text-sm text-gray-500 mt-1 block">{variant.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {formData.brand && formData.model && formData.fuel && formData.variant && (
          <div className="text-center pt-6">
            <button
              onClick={goToNextStep}
              className="px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-200"
            >
              Continue to Location & Year
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderLocationYear = () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black mb-2">Location & Manufacturing Year</h2>
        <p className="text-gray-600">Where is your car registered and when was it made?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* City Selection */}
        <div className="space-y-4" data-field="city">
          <h3 className="text-xl font-bold text-black">RTO Location</h3>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search cities..."
              value={searchTerms.city}
              onChange={(e) => setSearchTerms(prev => ({ ...prev, city: e.target.value }))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-4">
            {/* Popular Cities */}
            <div>
              <h4 className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Popular Cities</h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {filterItems(popularCities.slice(0, 12), searchTerms.city).map((city) => (
                  <button
                    key={city.name}
                    onClick={() => {
                      updateFormData('city', city.name);
                      setSearchTerms(prev => ({ ...prev, city: '' }));
                    }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                      formData.city === city.name
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-black hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded overflow-hidden">
                      {getMonumentImage(city.name, cityImageMap)}
                    </div>
                    <span className="text-xs font-semibold text-center leading-tight text-black">
                      {city.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Other Cities */}
            <div>
              <h4 className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Other Cities</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-32 overflow-y-auto">
                {filterItems(otherCities.slice(0, 20), searchTerms.city).map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      updateFormData('city', city);
                      setSearchTerms(prev => ({ ...prev, city: '' }));
                    }}
                    className={`p-2 rounded border text-xs font-semibold transition-all ${
                      formData.city === city
                        ? 'border-black bg-gray-50 text-black'
                        : 'border-gray-200 text-black hover:border-black hover:bg-gray-50'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Year Selection */}
        <div className="space-y-4" data-field="year">
          <h3 className="text-xl font-bold text-black">Manufacturing Year</h3>
          
          <div className="grid grid-cols-4 gap-2 max-h-80 overflow-y-auto">
            {years.map((year) => (
              <button
                key={year}
                className={`p-3 rounded-lg border font-bold transition-all ${
                  formData.year === year 
                    ? 'border-black bg-gray-50 text-black' 
                    : 'border-gray-200 text-black hover:border-black hover:bg-gray-50'
                }`}
                onClick={() => updateFormData('year', year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      {formData.city && formData.year && (
        <div className="text-center mt-8">
          <button
            onClick={goToNextStep}
            className="px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-200"
          >
            Continue to Usage History
          </button>
        </div>
      )}
    </div>
  );

  const renderUsageHistory = () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black mb-2">Usage History</h2>
        <p className="text-gray-600">Tell us about ownership and mileage</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ownership */}
        <div className="space-y-4" data-field="owner">
          <h3 className="text-xl font-bold text-black">Ownership History</h3>
          <p className="text-sm text-gray-600">How many owners has your car had?</p>
          
          <div className="space-y-2">
            {ownerOptions.map((owner) => (
              <button
                key={owner}
                className={`w-full p-4 rounded-xl border font-semibold transition-all text-left ${
                  formData.owner === owner 
                    ? 'border-black bg-gray-50 text-black' 
                    : 'border-gray-200 text-black hover:border-black hover:bg-gray-50'
                }`}
                onClick={() => updateFormData('owner', owner)}
              >
                {owner}
              </button>
            ))}
          </div>
        </div>

        {/* Kilometers */}
        <div className="space-y-4" data-field="kms">
          <h3 className="text-xl font-bold text-black">Kilometers Driven</h3>
          <p className="text-sm text-gray-600">How many kilometers has your car covered?</p>
          
          <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
            {kmOptions.map((kms) => (
              <button
                key={kms}
                className={`p-3 rounded-xl border font-semibold transition-all text-left ${
                  formData.kms === kms 
                    ? 'border-black bg-gray-50 text-black' 
                    : 'border-gray-200 text-black hover:border-black hover:bg-gray-50'
                }`}
                onClick={() => updateFormData('kms', kms)}
              >
                {kms}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      {formData.owner && formData.kms && (
        <div className="text-center mt-8">
          <button
            onClick={goToNextStep}
            className="px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-200"
          >
            Continue to Contact Info
          </button>
        </div>
      )}
    </div>
  );

  const renderContactInfo = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black mb-2">Get Your Car Valuation</h2>
        <p className="text-gray-600">Enter your mobile number to receive instant valuation</p>
      </div>
      
      <div className="space-y-6" data-field="phone">
        <div>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => updateFormData('phone', e.target.value.replace(/[^\d]/g, ''))}
            onBlur={() => setTouched(true)}
            maxLength={10}
            placeholder="Enter your mobile number"
            className={`w-full p-4 text-lg rounded-xl border-2 font-semibold focus:outline-none transition-all ${
              showPhoneError ? 'border-red-500' : 'border-gray-300 focus:border-black'
            }`}
          />
          
          {showPhoneError && (
            <span className="text-red-500 text-sm mt-2 block">Please enter a valid 10-digit mobile number.</span>
          )}
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <input
            type="checkbox"
            checked={formData.whatsappUpdates}
            onChange={e => updateFormData('whatsappUpdates', e.target.checked.toString())}
            className="w-5 h-5 accent-black"
            id="whatsapp-updates"
          />
          <label htmlFor="whatsapp-updates" className="font-medium text-black">
            Send updates on WhatsApp
          </label>
        </div>
        
        <button
          className={`w-full py-4 text-lg rounded-xl font-bold transition-all ${
            isPhoneValid 
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          onClick={handleSubmit}
          disabled={!isPhoneValid}
        >
          Get Instant Valuation
        </button>
        
        <div className="text-gray-500 text-center text-sm">
          🔒 Your data is safe and secure with us
        </div>
      </div>
    </div>
  );

  const renderUploadImages = () => {
    const uploadSections = [
      { key: 'rc', title: 'RC Certificate', subtitle: 'Upload clear photo of your RC', maxFiles: 1 },
      { key: 'exterior', title: 'Exterior Photos', subtitle: 'Upload 3-5 photos', maxFiles: 5 },
      { key: 'interior', title: 'Interior Photos', subtitle: 'Upload 3-5 photos', maxFiles: 5 },
      { key: 'tyres', title: 'Tyres Condition', subtitle: 'Upload photos of all 4 tyres', maxFiles: 4 },
    ];

    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">Upload Vehicle Images</h2>
          <p className="text-gray-600">Help us evaluate your car better with clear photos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {uploadSections.map((section) => {
            const files = uploadedFiles[section.key as keyof typeof uploadedFiles];
            const fileCount = Array.isArray(files) ? files.length : (files ? 1 : 0);
            
            return (
              <div
                key={section.key}
                className="border-2 border-dashed rounded-xl p-6 border-gray-300 hover:border-black hover:bg-gray-50 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-1">{section.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{section.subtitle}</p>

                  <input
                    type="file"
                    multiple={section.key !== 'rc'}
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFileUpload(Array.from(e.target.files), section.key)}
                    className="hidden"
                    id={`upload-${section.key}`}
                  />
                  
                  <label
                    htmlFor={`upload-${section.key}`}
                    className="inline-block px-6 py-3 bg-black text-white rounded-lg font-bold cursor-pointer hover:bg-gray-800 transition-all duration-200"
                  >
                    {fileCount > 0 ? `${fileCount}/${section.maxFiles} Uploaded` : 'Choose Files'}
                  </label>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    or drag and drop images here
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            className="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-all duration-200"
            onClick={() => console.log('Evaluation completed')}
          >
            Complete Evaluation
          </button>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderVehicleInfo();
      case 2: return renderLocationYear();
      case 3: return renderUsageHistory();
      case 4: return renderContactInfo();
      case 5: return renderUploadImages();
      default: return <div className="text-black">Step not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Progress Bar */}
        {currentStep <= 5 && <ProgressBar />}
        
        {/* Selection Display */}
        {currentStep > 1 && currentStep <= 4 && <SelectionDisplay />}

        {/* Back Button */}
        {currentStep > 1 && currentStep <= 4 && (
          <div className="mb-6 max-w-4xl mx-auto">
            <button
              onClick={goToPrevStep}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 text-black rounded-lg hover:bg-gray-200 hover:border-gray-400 transition-all duration-300 text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Step
            </button>
          </div>
        )}

        {/* Main Content */}
        <div ref={wizardScrollRef} className="min-h-[400px] flex items-start justify-center">
          <div className="w-full">
            {renderCurrentStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellNowWizardClient;