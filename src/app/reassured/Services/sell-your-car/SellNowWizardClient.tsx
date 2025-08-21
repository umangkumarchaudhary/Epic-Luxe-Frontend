'use client';

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Fuel, Zap, Leaf, Car, MapPin, Activity, Phone, Check, Search, Upload, ChevronLeft, Calendar, Users, Route, FileText } from 'lucide-react';
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
    map: MapPin, activity: Activity, phone: Phone,
    calendar: Calendar, users: Users, route: Route,
    fileText: FileText
  };
  const IconComponent = icons[iconName as keyof typeof icons] || Car;
  return <IconComponent className={className} />;
};

const SellNowWizardClient: React.FC<SellNowWizardClientProps> = ({
  brands, fuelOptions, years, ownerOptions, kmOptions,
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

  // Step configuration for 10 steps now
  const steps = [
    { id: 1, label: 'Brand', icon: 'car', shortLabel: 'Brand' },
    { id: 2, label: 'Model', icon: 'car', shortLabel: 'Model' },
    { id: 3, label: 'Fuel', icon: 'fuel', shortLabel: 'Fuel' },
    { id: 4, label: 'Variant', icon: 'car', shortLabel: 'Variant' },
    { id: 5, label: 'City', icon: 'map', shortLabel: 'City' },
    { id: 6, label: 'Year', icon: 'calendar', shortLabel: 'Year' },
    { id: 7, label: 'Owner', icon: 'users', shortLabel: 'Owner' },
    { id: 8, label: 'KMs', icon: 'route', shortLabel: 'KMs' },
    { id: 9, label: 'Contact', icon: 'phone', shortLabel: 'Contact' },
    { id: 10, label: 'Upload', icon: 'fileText', shortLabel: 'Upload' }
  ];

  // Auto progression logic
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
    
    // Auto-progress to next step after selection
    setTimeout(() => {
      if (value) {
        setCurrentStep(prev => prev + 1);
      }
    }, 500);
  }, []);

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

  // Filter function
  const filterItems = useCallback((items: unknown[], searchTerm: string, key = 'name') => {
    if (!searchTerm) return items;
    return items.filter(item => 
      (typeof item === 'string' ? item : (item as Record<string, string>)[key])
        .toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, []);

  // Progress calculation
  const progressPercentage = useMemo(() => {
    return (currentStep - 1) * 10;
  }, [currentStep]);

  // Navigation helpers
  const goToPrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (step: number) => setCurrentStep(step);

  // Validation
  const isPhoneValid = /^\d{10}$/.test(formData.phone);

  // Submit handler
  const handleSubmit = async () => {
    if (isPhoneValid) {
      const submitData = { ...formData, timestamp: new Date().toISOString() };
      
      try {
        // Send to dummy URL
  await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData),
        });
        
        console.log('Form submitted:', submitData);
        setCurrentStep(10); // Move to upload step
      } catch (error) {
        console.error('Submission error:', error);
        setCurrentStep(10); // Still proceed to upload step
      }
    }
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

  // Progress Bar Component
  const ProgressBar = React.memo(() => (
    <div className="mb-4 w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600 font-manrope">Step {currentStep} of 10</span>
        <span className="text-sm font-bold text-black font-manrope">{Math.round(progressPercentage)}% Complete</span>
      </div>
      
      <div className="w-full bg-gray-100 rounded-full h-2 mb-3 shadow-inner">
        <div
          className="bg-gradient-to-r from-black to-gray-800 h-2 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center overflow-x-auto pb-1">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center min-w-[50px]">
            <button
              onClick={() => goToStep(step.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2 cursor-pointer hover:scale-110 font-manrope ${
                currentStep >= step.id
                  ? 'bg-black border-black text-white scale-105 shadow-md'
                  : 'border-gray-300 bg-white text-gray-400 hover:border-black/50 shadow-sm'
              }`}
            >
              {currentStep > step.id ? (
                <Check className="w-3 h-3" />
              ) : (
                getIconComponent(step.icon, "w-3 h-3")
              )}
            </button>
            <span className="text-xs mt-1 font-medium hidden sm:block text-center text-gray-600 font-manrope">
              {step.shortLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  ));
  ProgressBar.displayName = "ProgressBar";

  // Selection Display Component
  const SelectionDisplay = React.memo(() => {
    const selections = [
      { label: 'Brand', value: formData.brand, step: 1 },
      { label: 'Model', value: formData.model, step: 2 },
      { label: 'Fuel', value: formData.fuel, step: 3 },
      { label: 'Variant', value: formData.variant, step: 4 },
      { label: 'City', value: formData.city, step: 5 },
      { label: 'Year', value: formData.year, step: 6 },
      { label: 'Owner', value: formData.owner, step: 7 },
      { label: 'KMs', value: formData.kms, step: 8 },
    ].filter(item => item.value);

    if (selections.length === 0) return null;

    return (
      <div className="mb-4 py-2 px-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl max-w-5xl mx-auto shadow-sm">
        <div className="flex gap-2 overflow-x-auto">
          {selections.map((item) => (
            <button
              key={item.label}
              onClick={() => goToStep(item.step)}
              className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 rounded-lg flex-shrink-0 hover:bg-gray-50 hover:border-black transition-all duration-200 shadow-sm font-manrope"
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
  SelectionDisplay.displayName = "SelectionDisplay";

  // Step 1: Brand Selection
  const renderBrandSelection = () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black mb-2 font-manrope">Choose Your Car Brand</h2>
  <p className="text-gray-600 font-manrope">Select your vehicle&apos;s manufacturer</p>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3 max-w-4xl">
          {brands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => updateFormData('brand', brand.name)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-gray-200 hover:border-black hover:bg-gray-50 hover:shadow-md transition-all duration-300 bg-white font-manrope"
            >
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mb-2 font-bold text-sm shadow-md">
                {brand.logo}
              </div>
              <span className="text-xs font-semibold text-black text-center">{brand.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 2: Model Selection
  const renderModelSelection = () => (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black mb-2 font-manrope">
          Select Your <span className="text-gray-600">{formData.brand}</span> Model
        </h2>
        <p className="text-gray-600 font-manrope">Choose your specific vehicle model</p>
      </div>
      
      <div className="max-w-md mx-auto mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search models..."
            value={searchTerms.model}
            onChange={(e) => setSearchTerms(prev => ({ ...prev, model: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all shadow-sm font-manrope text-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filterItems(modelsData.popular, searchTerms.model).length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3 text-center uppercase tracking-wide font-manrope">Popular Models</h4>
            <div className="flex justify-center">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 max-w-4xl">
                {filterItems(modelsData.popular, searchTerms.model).map((model) => (
                  <button
                    key={model as string}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:border-black hover:bg-gray-50 hover:shadow-md transition-all text-center bg-white font-manrope"
                    onClick={() => {
                      updateFormData('model', model as string);
                      setSearchTerms(prev => ({ ...prev, model: '' }));
                    }}
                  >
                    <span className="text-xs font-semibold text-black">{model as string}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {filterItems(modelsData.other, searchTerms.model).length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3 text-center uppercase tracking-wide font-manrope">All Models</h4>
            <div className="flex justify-center">
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 max-h-32 overflow-y-auto max-w-4xl">
                {filterItems(modelsData.other, searchTerms.model).map((model) => (
                  <button
                    key={model as string}
                    className="p-2 text-xs rounded-lg border-2 border-gray-200 hover:border-black hover:bg-gray-50 hover:shadow-md transition-all bg-white font-manrope"
                    onClick={() => {
                      updateFormData('model', model as string);
                      setSearchTerms(prev => ({ ...prev, model: '' }));
                    }}
                  >
                    {model as string}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Step 3: Fuel Selection
  const renderFuelSelection = () => (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black mb-2 font-manrope">Select Fuel Type</h2>
  <p className="text-gray-600 font-manrope">Choose your vehicle&apos;s fuel type</p>
      </div>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg">
          {fuelOptions.filter(fuel => availableFuels.includes(fuel.key)).map((fuel) => (
            <button
              key={fuel.key}
              className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-black hover:bg-gray-50 hover:shadow-md transition-all bg-white font-manrope"
              onClick={() => updateFormData('fuel', fuel.key)}
            >
              {getIconComponent(fuel.icon, "w-8 h-8 text-black")}
              <span className="font-bold text-black">{fuel.key}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 4: Variant Selection
  const renderVariantSelection = () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black mb-2 font-manrope">Choose Variant</h2>
        <p className="text-gray-600 font-manrope">Select your specific vehicle variant</p>
      </div>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto max-w-4xl">
          {variantsData.map((variant) => (
            <button
              key={variant.name}
              className="p-3 rounded-xl border-2 border-gray-200 hover:border-black hover:bg-gray-50 hover:shadow-md transition-all text-left bg-white font-manrope"
              onClick={() => updateFormData('variant', variant.name)}
            >
              <span className="font-bold text-black block">{variant.name}</span>
              <span className="text-xs text-gray-500 mt-1 block">{variant.subtitle}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 5: City Selection
  const renderCitySelection = () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black mb-2 font-manrope">Select RTO Location</h2>
        <p className="text-gray-600 font-manrope">Where is your car registered?</p>
      </div>
      
      <div className="max-w-md mx-auto mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerms.city}
            onChange={(e) => setSearchTerms(prev => ({ ...prev, city: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all shadow-sm font-manrope text-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        {/* Popular Cities */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-3 text-center uppercase tracking-wide font-manrope">Popular Cities</h4>
          <div className="flex justify-center">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 max-w-4xl">
              {filterItems(popularCities.slice(0, 16), searchTerms.city).map((city) => (
                <button
                  key={(city as { name: string }).name}
                  onClick={() => {
                    updateFormData('city', (city as { name: string }).name);
                    setSearchTerms(prev => ({ ...prev, city: '' }));
                  }}
                  className="flex flex-col items-center gap-2 p-2 rounded-lg border-2 border-gray-200 hover:border-black hover:bg-gray-50 hover:shadow-md transition-all bg-white font-manrope"
                >
                  <div className="w-6 h-6 rounded overflow-hidden">
                    {getMonumentImage((city as { name: string }).name, cityImageMap)}
                  </div>
                  <span className="text-xs font-semibold text-center leading-tight text-black">
                    {(city as { name: string }).name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Other Cities */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-3 text-center uppercase tracking-wide font-manrope">Other Cities</h4>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-24 overflow-y-auto max-w-3xl">
              {filterItems(otherCities.slice(0, 20), searchTerms.city).map((city) => (
                <button
                  key={city as string}
                  onClick={() => {
                    updateFormData('city', city as string);
                    setSearchTerms(prev => ({ ...prev, city: '' }));
                  }}
                  className="p-2 rounded-lg border-2 border-gray-200 text-xs font-semibold hover:border-black hover:bg-gray-50 hover:shadow-md transition-all bg-white font-manrope"
                >
                  {city as string}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 6: Year Selection
  const renderYearSelection = () => (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black mb-2 font-manrope">Manufacturing Year</h2>
        <p className="text-gray-600 font-manrope">When was your car manufactured?</p>
      </div>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-40 overflow-y-auto max-w-3xl">
          {years.map((year) => (
            <button
              key={year}
              className="p-2 rounded-lg border-2 border-gray-200 font-bold text-sm hover:border-black hover:bg-gray-50 hover:shadow-md transition-all bg-white font-manrope"
              onClick={() => updateFormData('year', year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 7: Owner Selection
  const renderOwnerSelection = () => (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black mb-2 font-manrope">Ownership History</h2>
        <p className="text-gray-600 font-manrope">How many owners has your car had?</p>
      </div>
      
      <div className="flex justify-center">
        <div className="space-y-2 w-full max-w-sm">
          {ownerOptions.map((owner) => (
            <button
              key={owner}
              className="w-full p-3 rounded-lg border-2 border-gray-200 font-semibold hover:border-black hover:bg-gray-50 hover:shadow-md transition-all text-left bg-white font-manrope"
              onClick={() => updateFormData('owner', owner)}
            >
              {owner}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 8: KM Selection
  const renderKmSelection = () => (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black mb-2 font-manrope">Kilometers Driven</h2>
        <p className="text-gray-600 font-manrope">How many kilometers has your car covered?</p>
      </div>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto max-w-xl w-full">
          {kmOptions.map((kms) => (
            <button
              key={kms}
              className="p-3 rounded-lg border-2 border-gray-200 font-semibold hover:border-black hover:bg-gray-50 hover:shadow-md transition-all text-left bg-white font-manrope"
              onClick={() => updateFormData('kms', kms)}
            >
              {kms}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 9: Contact Info
  const renderContactInfo = () => (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black mb-2 font-manrope">Get Your Car Valuation</h2>
        <p className="text-gray-600 font-manrope">Enter your mobile number for instant valuation</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/[^\d]/g, '') }))}
            onBlur={() => setTouched(true)}
            maxLength={10}
            placeholder="Enter your mobile number"
            className="w-full p-3 text-lg rounded-lg border-2 border-gray-300 font-semibold focus:outline-none focus:border-black transition-all shadow-sm bg-white font-manrope"
          />
          
          {touched && !isPhoneValid && (
            <span className="text-red-500 text-sm mt-1 block font-manrope">Please enter a valid 10-digit mobile number.</span>
          )}
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <input
            type="checkbox"
            checked={formData.whatsappUpdates}
            onChange={e => setFormData(prev => ({ ...prev, whatsappUpdates: e.target.checked }))}
            className="w-4 h-4 accent-black"
            id="whatsapp-updates"
          />
          <label htmlFor="whatsapp-updates" className="font-medium text-black font-manrope text-sm">
            Send updates on WhatsApp
          </label>
        </div>
        
        <button
          className={`w-full py-3 text-lg rounded-lg font-bold transition-all shadow-md font-manrope ${
            isPhoneValid 
              ? 'bg-black text-white hover:bg-gray-800 hover:shadow-lg' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          onClick={handleSubmit}
          disabled={!isPhoneValid}
        >
          Get Instant Valuation
        </button>
        
        <div className="text-gray-500 text-center text-sm font-manrope">
          🔒 Your data is safe and secure with us
        </div>
      </div>
    </div>
  );

  // Step 10: Upload Images
  const renderUploadImages = () => {
    const uploadSections = [
      { key: 'rc', title: 'RC Certificate', subtitle: 'Upload clear photo of your RC', maxFiles: 1 },
      { key: 'exterior', title: 'Exterior Photos', subtitle: 'Upload 3-5 photos', maxFiles: 5 },
      { key: 'interior', title: 'Interior Photos', subtitle: 'Upload 3-5 photos', maxFiles: 5 },
      { key: 'tyres', title: 'Tyres Condition', subtitle: 'Upload photos of all 4 tyres', maxFiles: 4 },
    ];

    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-black mb-2 font-manrope">Upload Vehicle Images (Optional)</h2>
          <p className="text-gray-600 font-manrope">For more accurate pricing, please upload clear photos</p>
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium font-manrope">✅ Form submitted successfully! Upload images for better evaluation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {uploadSections.map((section) => {
            const files = uploadedFiles[section.key as keyof typeof uploadedFiles];
            const fileCount = Array.isArray(files) ? files.length : (files ? 1 : 0);
            
            return (
              <div
                key={section.key}
                className="border-2 border-dashed rounded-xl p-4 border-gray-300 hover:border-black hover:bg-gray-50 transition-all duration-300 bg-white shadow-sm"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-1 font-manrope">{section.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 font-manrope">{section.subtitle}</p>

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
                    className="inline-block px-4 py-2 bg-black text-white rounded-lg font-bold cursor-pointer hover:bg-gray-800 hover:shadow-md transition-all duration-200 shadow-sm font-manrope text-sm"
                  >
                    {fileCount > 0 ? `${fileCount}/${section.maxFiles} Uploaded` : 'Choose Files'}
                  </label>
                  
                  <p className="text-xs text-gray-500 mt-2 font-manrope">
                    or drag and drop images here
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <button
            className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 hover:shadow-lg transition-all duration-200 shadow-md font-manrope"
            onClick={() => console.log('Evaluation completed')}
          >
            Complete Evaluation
          </button>
          <p className="text-sm text-gray-500 mt-2 font-manrope">Images are optional. You can skip this step.</p>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderBrandSelection();
      case 2: return renderModelSelection();
      case 3: return renderFuelSelection();
      case 4: return renderVariantSelection();
      case 5: return renderCitySelection();
      case 6: return renderYearSelection();
      case 7: return renderOwnerSelection();
      case 8: return renderKmSelection();
      case 9: return renderContactInfo();
      case 10: return renderUploadImages();
      default: return <div className="text-black font-manrope">Step not found</div>;
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Manrope', sans-serif;
        }
        
        .font-manrope {
          font-family: 'Manrope', sans-serif;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-manrope">
        <div className="w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12">
          {/* Progress Bar */}
          {currentStep <= 10 && <ProgressBar />}
          
          {/* Selection Display */}
          {currentStep > 1 && currentStep <= 9 && <SelectionDisplay />}

          {/* Back Button */}
          {currentStep > 1 && currentStep <= 9 && (
            <div className="mb-4 max-w-5xl mx-auto">
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-lg hover:bg-gray-50 hover:border-black hover:shadow-md transition-all duration-300 font-medium shadow-sm font-manrope text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Step
              </button>
            </div>
          )}

          {/* Main Content */}
          <div ref={wizardScrollRef} className="min-h-[300px] flex items-center justify-center py-4">
            <div className="w-full">
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SellNowWizardClient.displayName = "SellNowWizardClient";

export default SellNowWizardClient;