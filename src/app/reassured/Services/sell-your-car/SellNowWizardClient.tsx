'use client';

import React, { useState, useRef } from 'react';
import { Fuel, Zap, Leaf, Car, MapPin, Activity, Phone, Check, Search, Camera, Upload } from 'lucide-react';
import Image from 'next/image';
import '../../../../app/GlobalFonts.css';

// Types
interface Brand {
  name: string;
  logo: React.ReactNode | string;
}

interface City {
  name: string;
  icon?: React.ReactNode;
  new?: boolean;
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

interface UploadedFiles {
  rc: File | null;
  exterior: File[];
  tyres: File[];
  interior: File[];
}

// Define the luxuryCars type structure
interface VehicleVariants {
  [fuelType: string]: string[];
}

interface VehicleModels {
  [modelName: string]: VehicleVariants;
}

interface LuxuryCars {
  [brandName: string]: VehicleModels;
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

// Utility functions
const normalizeCityName = (name: string) =>
  name.replace(/\s+/g, '').toLowerCase().replace('ahmedabad', 'ahemdabad');

const getMonumentImage = (cityName: string, cityImageMap: { [key: string]: string }, size: number = 24, isSelected: boolean = false) => {
  const normalized = normalizeCityName(cityName);
  const imageSrc = cityImageMap[normalized];
  if (!imageSrc) return null;
  return (
    <Image
      src={imageSrc}
      alt={`${cityName} monument`}
      width={size}
      height={size}
      className={`object-contain w-full h-full transition-all duration-300 rounded-lg
        ${isSelected ? 'ring-2 ring-black ring-offset-1 scale-110' : ''}
      `}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: isSelected
          ? 'brightness(1.15) saturate(1.3) contrast(1.1)'
          : 'brightness(1) saturate(1.1)',
        boxShadow: isSelected
          ? '0 4px 15px rgba(0,0,0,0.2), 0 0 0 2px rgba(0,0,0,0.4)'
          : '0 2px 8px rgba(0,0,0,0.1)',
      }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
};

const getIconComponent = (iconName: string, className: string = "w-4 h-4") => {
  switch (iconName) {
    case 'fuel': return <Fuel className={className} />;
    case 'zap': return <Zap className={className} />;
    case 'leaf': return <Leaf className={className} />;
    case 'car': return <Car className={className} />;
    case 'map': return <MapPin className={className} />;
    case 'activity': return <Activity className={className} />;
    case 'phone': return <Phone className={className} />;
    case 'camera': return <Camera className={className} />;
    default: return <Car className={className} />;
  }
};

const SellNowWizardClient: React.FC<SellNowWizardClientProps> = ({
  brands,
  fuelOptions,
  years,
  ownerOptions,
  kmOptions,
  stepConfig,
  popularCities,
  otherCities,
  cityImageMap,
  luxuryCars,
}) => {
  // State management - Combined related states
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    fuel: '',
    variant: '',
    city: '',
    year: '',
    owner: '',
    kms: '',
    phone: '',
    whatsappUpdates: true,
  });
  
  const [searchTerms, setSearchTerms] = useState({
    model: '',
    city: '',
  });
  
  const [uiState, setUiState] = useState({
    touched: false,
    valuationSubmitted: false,
    showUpload: false,
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    rc: null,
    exterior: [],
    tyres: [],
    interior: [],
  });

  const wizardScrollRef = useRef<HTMLDivElement>(null);

  // Update form data helper
  const updateFormData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Calculate progress based on current step and completed fields
  const getProgressPercentage = () => {
    const stepProgress = (currentStep - 1) * 20; // Each step is 20%
    const fieldsInCurrentStep = getFieldsForCurrentStep();
    const completedFieldsInStep = fieldsInCurrentStep.filter(field => formData[field as keyof typeof formData]).length;
    const stepCompletion = fieldsInCurrentStep.length > 0 ? (completedFieldsInStep / fieldsInCurrentStep.length) * 20 : 20;
    return Math.min(stepProgress + stepCompletion, 100);
  };

  // Get required fields for current step
  const getFieldsForCurrentStep = () => {
    switch (currentStep) {
      case 1: return ['brand', 'model', 'fuel', 'variant'];
      case 2: return ['city', 'year'];
      case 3: return ['owner', 'kms'];
      case 4: return ['phone'];
      case 5: return [];
      default: return [];
    }
  };

  // Get data based on selections
  const getModelsForBrand = (brand: string) => {
    const brandData = luxuryCars[brand];
    if (!brandData) return { popularModels: [], otherModels: [] };
    
    const models = Object.keys(brandData);
    const popularModels = models.slice(0, 8).map(model => ({
      name: model,
      img: `/assets/models/${brand.toLowerCase()}-${model.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    }));
    const otherModels = models.slice(8);
    
    return { popularModels, otherModels };
  };

  const getVariantsForModel = (brand: string, model: string, fuel: string) => {
    const brandData = luxuryCars[brand];
    if (!brandData) return [];

    const modelData = brandData[model];
    if (!modelData) return [];

    const variants = modelData[fuel];

    if (!Array.isArray(variants)) return [];

    return (variants as string[]).map((variant: string) => ({
      name: variant,
      subtitle: `${fuel} • ${brand} ${model}`,
    }));
  };

  const getAvailableFuels = (brand: string, model: string) => {
    const brandData = luxuryCars[brand];
    if (!brandData) return [];
    
    const modelData = brandData[model];
    if (!modelData) return [];
    
    return Object.keys(modelData).filter(fuel => 
      Array.isArray(modelData[fuel]) && 
      (modelData[fuel] as string[]).length > 0
    );
  };

  // Navigation helpers
  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  // Validation
  const isPhoneValid = /^\d{10}$/.test(formData.phone);
  const showPhoneError = uiState.touched && !isPhoneValid;

  // Handle submissions
  const handleSubmit = () => {
    const submissionData = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    console.log('Form data:', submissionData);
    setUiState(prev => ({ ...prev, valuationSubmitted: true }));
    goToNextStep();
  };

  // Filter functions
  const filterModels = (models: { name: string; img: string }[] | string[], searchTerm: string) => {
    if (!searchTerm) return models;
    return models.filter(model => 
      typeof model === 'string' 
        ? model.toLowerCase().includes(searchTerm.toLowerCase())
        : model.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filterCities = (cities: City[] | string[], searchTerm: string) => {
    if (!searchTerm) return cities;
    return cities.filter(city => 
      typeof city === 'string'
        ? city.toLowerCase().includes(searchTerm.toLowerCase())
        : city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Progress Bar Component
  const ProgressBar = () => (
    <div className="mb-6 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600 font-secondary">
          Step {currentStep} of 5
        </span>
        <span className="text-sm font-bold text-black font-secondary">
          {Math.round(getProgressPercentage())}% Complete
        </span>
      </div>

      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-black h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${getProgressPercentage()}%` }}
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
                    : currentStep === step.id - 1
                    ? 'border-black bg-gray-100 text-black animate-pulse'
                    : 'border-gray-300 bg-white text-gray-400 hover:border-black/50'
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  getIconComponent(step.icon, "w-4 h-4")
                )}
              </button>
              
              <span className={`text-xs mt-2 font-medium transition-colors duration-300 hidden sm:block text-center ${
                currentStep >= step.id ? 'text-black font-bold' : 'text-gray-400'
              }`}>
                {step.shortLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Selection Display Component
  const SelectionDisplay = () => {
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
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg flex-shrink-0 hover:bg-gray-50 hover:border-black transition-all duration-200 cursor-pointer min-w-fit"
            >
              <span className="text-xs text-gray-500 font-secondary whitespace-nowrap">{item.label}:</span>
              <span className="text-xs font-bold text-black whitespace-nowrap" title={item.value}>
                {item.value.length > 8 ? `${item.value.substring(0, 8)}...` : item.value}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Upload Images Component
  const UploadImagesScreen = () => {
    const [dragActive, setDragActive] = useState<string>('');

    const handleDrag = (e: React.DragEvent, type: string) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(type);
      } else if (e.type === "dragleave") {
        setDragActive('');
      }
    };

    const handleDrop = (e: React.DragEvent, type: string) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive('');
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(Array.from(e.dataTransfer.files), type);
      }
    };

    const handleFiles = (files: File[], type: string) => {
      if (type === 'rc') {
        setUploadedFiles(prev => ({ ...prev, rc: files[0] }));
      } else {
        setUploadedFiles(prev => ({ 
          ...prev, 
          [type]: [...prev[type as keyof typeof prev] as File[], ...files].slice(0, 5)
        }));
      }
    };

    const uploadSections = [
      { key: 'rc', title: 'RC/Registration Certificate', subtitle: 'Upload clear photo of your RC', multiple: false, maxFiles: 1 },
      { key: 'exterior', title: 'Exterior Photos', subtitle: 'Upload 3-5 photos of car exterior', multiple: true, maxFiles: 5 },
      { key: 'interior', title: 'Interior Photos', subtitle: 'Upload 3-5 photos of car interior', multiple: true, maxFiles: 5 },
      { key: 'tyres', title: 'Tyres Condition', subtitle: 'Upload photos of all 4 tyres', multiple: true, maxFiles: 4 },
    ];

    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black font-heading mb-2">
            Upload Vehicle Images
          </h2>
          <p className="text-gray-600 font-secondary">
            Help us evaluate your car better with clear photos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {uploadSections.map((section) => {
            const files = uploadedFiles[section.key as keyof typeof uploadedFiles];
            const fileCount = Array.isArray(files) ? files.length : (files ? 1 : 0);
            
            return (
              <div
                key={section.key}
                className={`border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
                  dragActive === section.key
                    ? 'border-black bg-gray-50'
                    : 'border-gray-300 hover:border-black hover:bg-gray-50'
                }`}
                onDragEnter={(e) => handleDrag(e, section.key)}
                onDragLeave={(e) => handleDrag(e, section.key)}
                onDragOver={(e) => handleDrag(e, section.key)}
                onDrop={(e) => handleDrop(e, section.key)}
              >
                <div className="text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-1">{section.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{section.subtitle}</p>
                  </div>

                  <input
                    type="file"
                    multiple={section.multiple}
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files), section.key)}
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
            onClick={() => {
              console.log('Files uploaded:', uploadedFiles);
              // Handle final submission here
            }}
          >
            Complete Evaluation
          </button>
        </div>
      </div>
    );
  };

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black font-heading mb-2">
                Vehicle Information
              </h2>
              <p className="text-gray-600 font-secondary">
                Tell us about your car
              </p>
            </div>

            {/* Combined Vehicle Details in One Step */}
            <div className="space-y-8">
              {/* Brand Selection */}
              {!formData.brand && (
                <div>
                  <h3 className="text-xl font-bold text-black mb-4">Choose Your Car Brand</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {brands.map((brand) => (
                      <button
                        key={brand.name}
                        onClick={() => {
                          updateFormData('brand', brand.name);
                          updateFormData('model', '');
                          updateFormData('fuel', '');
                          updateFormData('variant', '');
                        }}
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
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => updateFormData('brand', '')}
                      className="text-sm text-gray-500 hover:text-black"
                    >
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

                  {(() => {
                    const { popularModels, otherModels } = getModelsForBrand(formData.brand);
                    const filteredPopular = filterModels(popularModels, searchTerms.model);
                    const filteredOther = filterModels(otherModels, searchTerms.model);

                    return (
                      <div className="space-y-6">
                        {filteredPopular.length > 0 && (
                          <div>
                            <h4 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Popular Models</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                              {filteredPopular.map((model) => (
                                <button
                                  key={typeof model === 'string' ? model : model.name}
                                  className="p-3 rounded-lg border border-gray-200 hover:border-black hover:bg-gray-50 transition-all text-left"
                                  onClick={() => {
                                    const modelName = typeof model === 'string' ? model : model.name;
                                    updateFormData('model', modelName);
                                    updateFormData('fuel', '');
                                    updateFormData('variant', '');
                                    setSearchTerms(prev => ({ ...prev, model: '' }));
                                  }}
                                >
                                  <span className="text-sm font-semibold text-black">
                                    {typeof model === 'string' ? model : model.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {filteredOther.length > 0 && (
                          <div>
                            <h4 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">All Models</h4>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                              {filteredOther.map((model) => {
                                const modelName = typeof model === 'string' ? model : model.name;
                                return (
                                  <button
                                    key={modelName}
                                    className="p-2 text-sm rounded-lg border border-gray-200 hover:border-black hover:bg-gray-50 transition-all"
                                    onClick={() => {
                                      updateFormData('model', modelName);
                                      updateFormData('fuel', '');
                                      updateFormData('variant', '');
                                      setSearchTerms(prev => ({ ...prev, model: '' }));
                                    }}
                                  >
                                    {modelName}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Fuel Type Selection */}
              {formData.brand && formData.model && !formData.fuel && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => updateFormData('model', '')}
                      className="text-sm text-gray-500 hover:text-black"
                    >
                      ← Change Model
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Select fuel type</h3>
                  
                  {(() => {
                    const availableFuels = getAvailableFuels(formData.brand, formData.model);
                    const filteredFuelOptions = fuelOptions.filter(fuel => availableFuels.includes(fuel.key));
                    
                    return (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
                        {filteredFuelOptions.map((fuel) => (
                          <button
                            key={fuel.key}
                            className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-all"
                            onClick={() => {
                              updateFormData('fuel', fuel.key);
                              updateFormData('variant', '');
                            }}
                          >
                            {getIconComponent(fuel.icon, "w-8 h-8 text-black")}
                            <span className="font-bold text-black">{fuel.key}</span>
                          </button>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Variant Selection */}
              {formData.brand && formData.model && formData.fuel && !formData.variant && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => updateFormData('fuel', '')}
                      className="text-sm text-gray-500 hover:text-black"
                    >
                      ← Change Fuel Type
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4">Choose variant</h3>
                  
                  {(() => {
                    const variants = getVariantsForModel(formData.brand, formData.model, formData.fuel);
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                        {variants.map((variant) => (
                          <button
                            key={variant.name}
                            className="p-4 rounded-xl border border-gray-200 hover:border-black hover:bg-gray-50 transition-all text-left"
                            onClick={() => updateFormData('variant', variant.name)}
                          >
                            <span className="font-bold text-black block">{variant.name}</span>
                            {variant.subtitle && (
                              <span className="text-sm text-gray-500 mt-1 block">{variant.subtitle}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    );
                  })()}
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

      case 2:
        return (
          <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black font-heading mb-2">
                Location & Manufacturing Year
              </h2>
              <p className="text-gray-600 font-secondary">
                Where is your car registered and when was it made?
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* City Selection */}
              <div className="space-y-4">
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

                {(() => {
                  const hasImage = (city: string) => Boolean(cityImageMap[normalizeCityName(city)]);
                  const citiesWithImages = [...popularCities.map(c => c.name), ...otherCities].filter(hasImage);
                  const citiesWithoutImages = otherCities.filter(c => !hasImage(c));
                  
                  const updatedPopularCities = citiesWithImages.slice(0, 12).map(name => ({
                    name,
                    icon: getMonumentImage(name, cityImageMap, 32, formData.city === name),
                  }));

                  const filteredPopular = filterCities(updatedPopularCities, searchTerms.city);
                  const filteredOther = filterCities(citiesWithoutImages, searchTerms.city);

                  return (
                    <div className="space-y-4">
                      {filteredPopular.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Popular Cities</h4>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {filteredPopular.map((city) => {
                              const cityName = typeof city === 'string' ? city : city.name;
                              const cityIcon = typeof city === 'string' ? null : city.icon;
                              return (
                                <button
                                  key={cityName}
                                  onClick={() => {
                                    updateFormData('city', cityName);
                                    setSearchTerms(prev => ({ ...prev, city: '' }));
                                  }}
                                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                                    formData.city === cityName
                                      ? 'border-black bg-gray-50'
                                      : 'border-gray-200 hover:border-black hover:bg-gray-50'
                                  }`}
                                >
                                  <div className="w-8 h-8 rounded overflow-hidden">
                                    {cityIcon}
                                  </div>
                                  <span className="text-xs font-semibold text-center leading-tight text-black">
                                    {cityName}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {filteredOther.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Other Cities</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-32 overflow-y-auto">
                            {filteredOther.slice(0, 20).map((city) => {
                              const cityName = typeof city === 'string' ? city : city.name;
                              return (
                                <button
                                  key={cityName}
                                  onClick={() => {
                                    updateFormData('city', cityName);
                                    setSearchTerms(prev => ({ ...prev, city: '' }));
                                  }}
                                  className={`p-2 rounded border text-xs font-semibold transition-all ${
                                    formData.city === cityName
                                      ? 'border-black bg-gray-50 text-black'
                                      : 'border-gray-200 text-black hover:border-black hover:bg-gray-50'
                                  }`}
                                >
                                  {cityName}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Year Selection */}
              <div className="space-y-4">
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

      case 3:
        return (
          <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black font-heading mb-2">
                Usage History
              </h2>
              <p className="text-gray-600 font-secondary">
                Tell us about ownership and mileage
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ownership */}
              <div className="space-y-4">
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
              <div className="space-y-4">
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

      case 4:
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black font-heading mb-2">
                Get Your Car Valuation
              </h2>
              <p className="text-gray-600 font-secondary">
                Enter your mobile number to receive instant valuation
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => updateFormData('phone', e.target.value.replace(/[^\d]/g, ''))}
                  onBlur={() => setUiState(prev => ({ ...prev, touched: true }))}
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

      case 5:
        return <UploadImagesScreen />;

      default:
        return <div className="text-black">Step not found</div>;
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
              className="px-4 py-2 bg-gray-100 border border-gray-300 text-black rounded-lg hover:bg-gray-200 hover:border-gray-400 transition-all duration-300 font-secondary text-sm"
            >
              ← Previous Step
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