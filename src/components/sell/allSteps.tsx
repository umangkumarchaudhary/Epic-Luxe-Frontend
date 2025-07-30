'use client';

import React, { useState, useRef } from 'react';
import { Fuel, Zap, Leaf, Car, MapPin, Calendar, User, Activity, Phone, Check, Search } from 'lucide-react';
import { luxuryCars } from '../../../src/data/BrandData';
import UploadImagesScreen from './uploadImageScreen'; 
import '../../app/GlobalFonts.css';

// Types and Interfaces
interface Brand {
  name: string;
  logo: React.ReactNode;
}

export type City = {
  name: string;
  icon?: React.ReactNode;
  new?: boolean;
};

interface SellNowWizardProps {
  compact?: boolean;
  largeButtons?: boolean;
}

// Define proper types for uploaded files
interface UploadedFiles {
  rc: File | null;
  exterior: File[];
  tyres: File[];
  interior: File[];
}

// Utility functions and constants
const fuelOptions = [
  { key: 'Petrol', icon: <Fuel className="w-4 h-4 text-[#D4AF37]" /> },
  { key: 'Diesel', icon: <Fuel className="w-4 h-4 text-[#BFA980]" /> },
  { key: 'Hybrid', icon: <Leaf className="w-4 h-4 text-[#D4AF37]" /> },
  { key: 'Electric', icon: <Zap className="w-4 h-4 text-[#BFA980]" /> },
];

const years = Array.from({ length: 26 }, (_, i) => (2025 - i).toString()).concat(['1999 or older']);

const ownerOptions = [
  '1st owner',
  '2nd owner', 
  '3rd owner',
  '4th owner',
  'Beyond 4th owner',
];

const kmOptions = [
  '0 - 10,000 Km',
  '10,000 - 20,000 Km',
  '20,000 - 30,000 Km',
  '30,000 - 40,000 Km',
  '40,000 - 50,000 Km',
  '50,000 - 60,000 Km',
  '60,000 - 70,000 Km',
  '70,000 - 80,000 Km',
  '80,000 - 90,000 Km',
  '90,000 - 100,000 Km',
  '100,000+ Km',
];

// Step configuration
const stepConfig = [
  { id: 1, label: 'Brand', icon: <Car className="w-2 h-2" />, shortLabel: 'Brand' },
  { id: 2, label: 'Model', icon: <Car className="w-2 h-2" />, shortLabel: 'Model' },
  { id: 3, label: 'Fuel Type', icon: <Fuel className="w-2 h-2" />, shortLabel: 'Fuel' },
  { id: 4, label: 'Variant', icon: <Activity className="w-2 h-2" />, shortLabel: 'Variant' },
  { id: 5, label: 'RTO Location', icon: <MapPin className="w-2 h-2" />, shortLabel: 'RTO' },
  { id: 6, label: 'Year', icon: <Calendar className="w-2 h-2" />, shortLabel: 'Year' },
  { id: 7, label: 'Ownership', icon: <User className="w-2 h-2" />, shortLabel: 'Owner' },
  { id: 8, label: 'Kilometers', icon: <Activity className="w-2 h-2" />, shortLabel: 'KMs' },
  { id: 9, label: 'Contact', icon: <Phone className="w-2 h-2" />, shortLabel: 'Phone' },
];

// City data and image mapping
const cityImageMap: { [key: string]: string } = {
  delhi: '/assets/cityicons/delhi.png',
  bangalore: '/assets/cityicons/bangalore.png',
  hyderabad: '/assets/cityicons/hyderabad.png',
  mumbai: '/assets/cityicons/mumbai.png',
  pune: '/assets/cityicons/pune.png',
  ahemdabad: '/assets/cityicons/ahemdabad.png',
  chennai: '/assets/cityicons/chennai.png',
  kolkata: '/assets/cityicons/kolkata.png',
  jaipur: '/assets/cityicons/jaipur.png',
  lucknow: '/assets/cityicons/lucknow.png',
};

const popularCities: City[] = [
  { name: 'Delhi' },
  { name: 'Bangalore' },
  { name: 'Mumbai' },
  { name: 'Hyderabad' },
  { name: 'Chennai' },
  { name: 'Pune' },
  { name: 'Kolkata' },
  { name: 'Ahmedabad' },
];

const otherCities = [
  'Jaipur', 'Lucknow', 'Surat', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
  'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar',
  'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
  'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur',
  'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli-Dharwad',
  'Bareilly', 'Moradabad', 'Mysore', 'Gurgaon', 'Aligarh', 'Jalandhar', 'Tiruchirappalli',
  'Bhubaneswar', 'Salem', 'Mira-Bhayandar', 'Warangal', 'Thiruvananthapuram', 'Guntur',
  'Bhiwandi', 'Saharanpur', 'Gorakhpur', 'Bikaner', 'Amravati', 'Noida', 'Jamshedpur',
  'Bhilai Nagar', 'Cuttack', 'Firozabad', 'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun',
  'Durgapur', 'Asansol', 'Rourkela', 'Nanded', 'Kolhapur', 'Ajmer', 'Akola', 'Gulbarga',
  'Jamnagar', 'Ujjain', 'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar', 'Jammu', 'Sangli-Miraj & Kupwad',
  'Mangalore', 'Erode', 'Belgaum', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya', 'Jalgaon',
  'Udaipur', 'Maheshtala'
];

// Brand logos
const getBrandLogo = (brandName: string) => {
  return <div className="text-sm font-bold text-[#D4AF37] font-heading">{brandName.charAt(0)}</div>;
};

const brands: Brand[] = Object.keys(luxuryCars).map(brandName => ({
  name: brandName,
  logo: getBrandLogo(brandName),
}));

// Utility functions
const normalizeCityName = (name: string) =>
  name.replace(/\s+/g, '').toLowerCase().replace('ahmedabad', 'ahemdabad');

const getMonumentImage = (cityName: string, size: number = 24, isSelected: boolean = false) => {
  const normalized = normalizeCityName(cityName);
  const imageSrc = cityImageMap[normalized];
  if (!imageSrc) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={`${cityName} monument`}
      className={`object-contain w-full h-full transition-all duration-300 drop-shadow-lg rounded-lg
        ${isSelected ? 'ring-2 ring-[#D4AF37] ring-offset-1 scale-110' : ''}
      `}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: isSelected
          ? 'brightness(1.15) saturate(1.3) contrast(1.1)'
          : 'brightness(1) saturate(1.1)',
        boxShadow: isSelected
          ? '0 4px 15px rgba(0,0,0,0.2), 0 0 0 2px rgba(212,175,55,0.4)'
          : '0 2px 8px rgba(0,0,0,0.1)',
      }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
};

const SellNowWizard: React.FC<SellNowWizardProps> = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedOwner, setSelectedOwner] = useState('');
  const [selectedKms, setSelectedKms] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [touched, setTouched] = useState(false);
  const [valuationSubmitted, setValuationSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    rc: null,
    exterior: [],
    tyres: [],
    interior: [],
  });

  // Search states
  const [modelSearch, setModelSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');

  const wizardScrollRef = useRef<HTMLDivElement>(null);

  // Calculate actual progress based on selections (starts at 0%)
  const getProgressPercentage = () => {
    let progress = 0;
    if (selectedBrand) progress += 11.11;
    if (selectedModel) progress += 11.11;
    if (selectedFuel) progress += 11.11;
    if (selectedVariant) progress += 11.11;
    if (selectedCity) progress += 11.11;
    if (selectedYear) progress += 11.11;
    if (selectedOwner) progress += 11.11;
    if (selectedKms) progress += 11.11;
    if (phone && /^\d{10}$/.test(phone)) progress += 11.12;
    return Math.min(progress, 100);
  };

  // Get data based on selections
  const getModelsForBrand = (brand: string) => {
    const brandData = luxuryCars[brand as keyof typeof luxuryCars];
    if (!brandData) return { popularModels: [], otherModels: [] };
    
    const models = Object.keys(brandData);
    const popularModels = models.slice(0, 6).map(model => ({
      name: model,
      img: `/assets/models/${brand.toLowerCase()}-${model.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    }));
    const otherModels = models.slice(6);
    
    return { popularModels, otherModels };
  };
   
 interface VariantType {
  name: string;
  subtitle: string;
}

const getVariantsForModel = (brand: string, model: string, fuel: string): VariantType[] => {
  const brandData = luxuryCars[brand as keyof typeof luxuryCars];
  if (!brandData) return [];

  const modelData = brandData[model as keyof typeof brandData];
  if (!modelData) return [];

  const fuelKey = fuel as keyof typeof modelData;
  const variants = modelData[fuelKey];

  // Assert variants might be unknown, so check and cast to string[]
  if (!Array.isArray(variants)) return [];

  // Cast variants explicitly as string[] for TypeScript to allow map
  return (variants as string[]).map((variant: string) => ({
    name: variant,
    subtitle: `${fuel} • ${brand} ${model}`,
  }));
};


  const getAvailableFuels = (brand: string, model: string) => {
    const brandData = luxuryCars[brand as keyof typeof luxuryCars];
    if (!brandData) return [];
    
    const modelData = brandData[model as keyof typeof brandData];
    if (!modelData) return [];
    
    return Object.keys(modelData).filter(fuel => 
      Array.isArray(modelData[fuel as keyof typeof modelData]) && 
      (modelData[fuel as keyof typeof modelData] as string[]).length > 0
    );
  };

  // Navigation helpers
  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 9));
  };

  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const isPhoneValid = /^\d{10}$/.test(phone);
  const showPhoneError = touched && !isPhoneValid;

  // Handle final submission
  const handleSubmit = () => {
    const formData = {
      brand: selectedBrand,
      model: selectedModel,
      fuel: selectedFuel,
      variant: selectedVariant,
      city: selectedCity,
      year: selectedYear,
      owner: selectedOwner,
      kms: selectedKms,
      phone: phone,
      whatsappUpdates: whatsappUpdates,
      timestamp: new Date().toISOString(),
    };

    // (Optional) Send formData to backend here
    console.log('Form data:', formData);

    // Save state so wizard shows upload images step
    setValuationSubmitted(true);
  };

  // Filter functions for search
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

  // Clickable Progress Bar Component (2cm height, 80% width)
  const ProgressBar = () => (
    <div className="mb-3 w-4/5 mx-auto" style={{ height: '2cm' }}>
      {/* Progress header */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-300 font-secondary">
          Step {currentStep} of 9
        </span>
        <span className="text-xs font-medium text-[#D4AF37] font-secondary">
          {Math.round(getProgressPercentage())}%
        </span>
      </div>

      {/* Progress bar with steps */}
      <div className="relative flex-1">
        {/* Background track */}
        <div className="w-full bg-gray-700/30 rounded-full h-1.5 mb-2">
          <div
            className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] h-1.5 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${getProgressPercentage()}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Clickable Step indicators */}
        <div className="flex justify-between items-center">
          {stepConfig.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Clickable Step circle */}
              <button
                onClick={() => goToStep(step.id)}
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 border cursor-pointer hover:scale-110 ${
                  currentStep >= step.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] border-[#D4AF37] text-black scale-105 shadow-lg shadow-[#D4AF37]/30'
                    : currentStep === step.id - 1
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] animate-pulse'
                    : 'border-gray-600 bg-gray-800 text-gray-500 hover:border-[#D4AF37]/50'
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <span className="text-xs font-bold">{step.id}</span>
                )}
              </button>
              
              {/* Step label for larger screens */}
              <span className={`text-xs mt-1 font-medium transition-colors duration-300 hidden sm:block ${
                currentStep >= step.id ? 'text-[#D4AF37]' : 'text-gray-500'
              }`}>
                {step.shortLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Compact Selection Display Component with clickable items (fixed horizontal scrolling)
  const SelectionDisplay = () => {
    const selections = [
      { label: 'Brand', value: selectedBrand, icon: <Car className="w-3 h-3" />, step: 1 },
      { label: 'Model', value: selectedModel, icon: <Car className="w-3 h-3" />, step: 2 },
      { label: 'Fuel', value: selectedFuel, icon: <Fuel className="w-3 h-3" />, step: 3 },
      { label: 'Variant', value: selectedVariant, icon: <Activity className="w-3 h-3" />, step: 4 },
      { label: 'Location', value: selectedCity, icon: <MapPin className="w-3 h-3" />, step: 5 },
      { label: 'Year', value: selectedYear, icon: <Calendar className="w-3 h-3" />, step: 6 },
      { label: 'Owner', value: selectedOwner, icon: <User className="w-3 h-3" />, step: 7 },
      { label: 'KMs', value: selectedKms, icon: <Activity className="w-3 h-3" />, step: 8 },
    ].filter(item => item.value);

    if (selections.length === 0) return null;

    return (
      <div className="mb-3 py-2 px-3 bg-black/40 backdrop-blur-sm w-4/5 mx-auto overflow-hidden" style={{ height: '1cm' }}>
        
        {/* Fixed horizontal scrolling display */}
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {selections.map((item) => (
            <button
              key={item.label}
              onClick={() => goToStep(item.step)}
              className="flex items-center gap-1 px-2 py-1 bg-black/20 rounded border border-[#D4AF37]/20 flex-shrink-0 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-200 cursor-pointer min-w-fit"
            >
              <span className="text-[#D4AF37] flex-shrink-0">{item.icon}</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400 font-secondary whitespace-nowrap">{item.label}:</span>
                <span className="text-xs font-semibold text-white whitespace-nowrap" title={item.value}>
                  {item.value.length > 6 ? `${item.value.substring(0, 6)}...` : item.value}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render current step with progress bar width consistency
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-4/5 mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white font-heading mb-1">Select your car brand</h2>
              <p className="text-gray-400 text-xs">Choose the manufacturer of your vehicle</p>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-80 overflow-y-auto">
              {brands.map((brand) => (
                <button
                  key={brand.name}
                  className={`flex flex-col items-center p-2 rounded-lg border transition-all duration-200 hover:scale-105 bg-black/20 backdrop-blur-sm
                    ${selectedBrand === brand.name 
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/30' 
                      : 'border-gray-700 hover:border-[#D4AF37]/50'}`}
                  onClick={() => {
                    setSelectedBrand(brand.name);
                    setSelectedModel('');
                    setSelectedFuel('');
                    setSelectedVariant('');
                    goToNextStep();
                  }}
                >
                  <div className="h-6 mb-1 flex items-center justify-center">{brand.logo}</div>
                  <span className="font-semibold text-xs text-center text-gray-300 font-secondary leading-tight">{brand.name}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        const { popularModels, otherModels } = getModelsForBrand(selectedBrand);
        const filteredPopularModels = filterModels(popularModels, modelSearch);
        const filteredOtherModels = filterModels(otherModels, modelSearch);

        return (
          <div className="w-4/5 mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white font-heading mb-1">
                Select your <span className="text-[#D4AF37]">{selectedBrand}</span> model
              </h2>
              <p className="text-gray-400 text-xs">Choose the specific model of your vehicle</p>
            </div>

            {/* Search Box */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search models..."
                value={modelSearch}
                onChange={(e) => setModelSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-black/20 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none transition-all duration-200"
              />
            </div>
            
            {Array.isArray(filteredPopularModels) && filteredPopularModels.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-300 mb-2 uppercase tracking-wide">Popular Models</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-3">
                  {filteredPopularModels.map((model) => (
                    <button
                      key={typeof model === 'string' ? model : model.name}
                      className={`relative h-16 rounded-lg overflow-hidden shadow-lg border transition-all duration-300 hover:scale-105 bg-black/40
                        ${selectedModel === (typeof model === 'string' ? model : model.name)
                          ? 'border-[#D4AF37] shadow-[#D4AF37]/30' 
                          : 'border-gray-700 hover:border-[#D4AF37]/50'}`}
                      onClick={() => {
                        const modelName = typeof model === 'string' ? model : model.name;
                        setSelectedModel(modelName);
                        setSelectedFuel('');
                        setSelectedVariant('');
                        setModelSearch('');
                        goToNextStep();
                      }}
                    >
                      {typeof model !== 'string' && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={model.img} alt={model.name} className="absolute inset-0 w-full h-full object-cover opacity-70" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <span className="absolute bottom-1 left-1 right-1 text-white text-xs font-semibold text-center leading-tight">
                        {typeof model === 'string' ? model : model.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {Array.isArray(filteredOtherModels) && filteredOtherModels.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-300 mb-2 uppercase tracking-wide">All Models</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1 max-h-40 overflow-y-auto">
                  {filteredOtherModels.map((model) => {
                    const modelName = typeof model === 'string' ? model : model.name;
                    return (
                      <button
                        key={modelName}
                        className={`p-2 text-xs rounded-lg border transition-all duration-300 hover:scale-102 bg-black/20
                          ${selectedModel === modelName
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' 
                            : 'border-gray-700 text-white hover:border-[#D4AF37]/50'}`}
                        onClick={() => {
                          setSelectedModel(modelName);
                          setSelectedFuel('');
                          setSelectedVariant('');
                          setModelSearch('');
                          goToNextStep();
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

      case 3:
        const availableFuels = getAvailableFuels(selectedBrand, selectedModel);
        const filteredFuelOptions = fuelOptions.filter(fuel => availableFuels.includes(fuel.key));
        
        return (
          <div className="w-4/5 mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white font-heading mb-1">
                Select fuel type
              </h2>
              <p className="text-gray-400 text-xs">What powers your {selectedBrand} {selectedModel}?</p>
            </div>
            
            <div className="flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
                {filteredFuelOptions.map((fuel) => (
                  <button
                    key={fuel.key}
                    className={`flex flex-col items-center justify-center gap-2 p-4 h-24 rounded-lg border transition-all duration-300 hover:scale-105 bg-black/20
                      ${selectedFuel === fuel.key 
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/30' 
                        : 'border-gray-700 hover:border-[#D4AF37]/50'}`}
                    onClick={() => {
                      setSelectedFuel(fuel.key);
                      setSelectedVariant('');
                      goToNextStep();
                    }}
                  >
                    {fuel.icon}
                    <span className={`font-bold text-xs ${selectedFuel === fuel.key ? 'text-[#D4AF37]' : 'text-white'}`}>
                      {fuel.key}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        const variants = getVariantsForModel(selectedBrand, selectedModel, selectedFuel);
        return (
          <div className="w-4/5 mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white font-heading mb-1">
                Choose variant
              </h2>
              <p className="text-gray-400 text-xs">Select the specific variant of your {selectedBrand} {selectedModel}</p>
            </div>
            
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-80 overflow-y-auto max-w-4xl w-full">
                {variants.map((variant) => (
                  <button
                    key={variant.name}
                    className={`p-3 rounded-lg border transition-all duration-300 text-left hover:scale-102 bg-black/20
                      ${selectedVariant === variant.name 
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg' 
                        : 'border-gray-700 hover:border-[#D4AF37]/50'}`}
                    onClick={() => {
                      setSelectedVariant(variant.name);
                      goToNextStep();
                    }}
                  >
                    <span className={`font-bold text-xs block ${selectedVariant === variant.name ? 'text-[#D4AF37]' : 'text-white'}`}>
                      {variant.name}
                    </span>
                    {variant.subtitle && (
                      <span className="text-xs text-gray-400 mt-1 block">{variant.subtitle}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        const hasImage = (city: string) => Boolean(cityImageMap[normalizeCityName(city)]);
        const allCities = Array.from(new Set([...popularCities.map((c) => c.name), ...otherCities]));
        const citiesWithImages = allCities.filter(hasImage);
        const citiesWithoutImages = allCities.filter((c) => !hasImage(c));
        const updatedPopularCities: City[] = citiesWithImages.map((name) => ({
          name,
          icon: getMonumentImage(name, 24, selectedCity === name),
        }));

        const filteredPopularCities = filterCities(updatedPopularCities, citySearch);
        const filteredOtherCities = filterCities(citiesWithoutImages, citySearch);

        return (
          <div className="w-4/5 mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white font-heading mb-1">
                Select RTO location
              </h2>
              <p className="text-gray-400 text-xs">Where is your vehicle registered?</p>
            </div>

            {/* Search Box */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search cities..."
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-black/20 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none transition-all duration-200"
              />
            </div>
            
            {Array.isArray(filteredPopularCities) && filteredPopularCities.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-300 mb-2 uppercase tracking-wide">Popular Cities</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-4">
                  {filteredPopularCities.map((city) => {
                    const cityName = typeof city === 'string' ? city : city.name;
                    const cityIcon = typeof city === 'string' ? null : city.icon;
                    return (
                      <button
                        key={cityName}
                        onClick={() => {
                          setSelectedCity(cityName);
                          setCitySearch('');
                          goToNextStep();
                        }}
                        className={`flex flex-col items-center gap-1 p-2 h-16 rounded-lg border transition-all duration-300 hover:scale-105 bg-black/20
                          ${selectedCity === cityName
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/30'
                            : 'border-gray-700 hover:border-[#D4AF37]/50'}`}
                      >
                        <div className="w-6 h-6 rounded overflow-hidden">
                          {cityIcon}
                        </div>
                        <span className={`text-xs font-semibold text-center leading-tight ${
                          selectedCity === cityName ? 'text-[#D4AF37]' : 'text-white'
                        }`}>
                          {cityName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {Array.isArray(filteredOtherCities) && filteredOtherCities.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-300 mb-2 uppercase tracking-wide">Other Cities</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1 max-h-40 overflow-y-auto">
                  {filteredOtherCities.map((city) => {
                    const cityName = typeof city === 'string' ? city : city.name;
                    return (
                      <button
                        key={cityName}
                        onClick={() => {
                          setSelectedCity(cityName);
                          setCitySearch('');
                          goToNextStep();
                        }}
                        className={`p-1 rounded border text-xs font-semibold transition-all duration-300 hover:scale-102 bg-black/20
                          ${selectedCity === cityName
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                            : 'border-gray-700 text-white hover:border-[#D4AF37]/50'}`}
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

      case 6:
        return (
          <div className="w-4/5 mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white font-heading mb-1">
                Manufacturing year
              </h2>
              <p className="text-gray-400 text-xs">When was your {selectedBrand} {selectedModel} manufactured?</p>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-80 overflow-y-auto">
              {years.map((year) => (
                <button
                  key={year}
                  className={`p-2 rounded-lg border font-bold text-xs transition-all duration-300 hover:scale-105 bg-black/20
                    ${selectedYear === year 
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] shadow-lg' 
                      : 'border-gray-700 text-white hover:border-[#D4AF37]/50'}`}
                  onClick={() => {
                    setSelectedYear(year);
                    goToNextStep();
                  }}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="w-4/5 mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white font-heading mb-1">
                Ownership history
              </h2>
              <p className="text-gray-400 text-xs">How many owners has your car had?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-4xl mx-auto">
              {ownerOptions.map((owner) => (
                <button
                  key={owner}
                  className={`p-3 rounded-lg border font-semibold transition-all duration-300 text-left hover:scale-102 bg-black/20
                    ${selectedOwner === owner 
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] shadow-lg' 
                      : 'border-gray-700 text-white hover:border-[#D4AF37]/50'}`}
                  onClick={() => {
                    setSelectedOwner(owner);
                    goToNextStep();
                  }}
                >
                  <span className="text-sm">{owner}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="w-4/5 mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white font-heading mb-1">
                Kilometers driven
              </h2>
              <p className="text-gray-400 text-xs">How many kilometers has your car covered?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 max-h-80 overflow-y-auto">
              {kmOptions.map((kms) => (
                <button
                  key={kms}
                  className={`p-2 rounded-lg border font-semibold transition-all duration-300 text-left hover:scale-102 bg-black/20 text-xs
                    ${selectedKms === kms 
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] shadow-lg' 
                      : 'border-gray-700 text-white hover:border-[#D4AF37]/50'}`}
                  onClick={() => {
                    setSelectedKms(kms);
                    goToNextStep();
                  }}
                >
                  <span className="text-xs whitespace-nowrap">{kms}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="w-4/5 mx-auto max-w-md">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white font-heading mb-1">
                Get your car valuation
              </h2>
              <p className="text-gray-400 text-xs">Enter your mobile number to receive instant valuation</p>
            </div>
            
            <div className="space-y-3">
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                onBlur={() => setTouched(true)}
                maxLength={10}
                placeholder="Enter your mobile number"
                className={`w-full p-3 text-sm rounded-lg border font-semibold focus:outline-none transition-all bg-black/20 text-white placeholder-gray-400
                  ${showPhoneError ? 'border-red-500' : 'border-gray-700 focus:border-[#D4AF37]'}`}
              />
              
              {showPhoneError && (
                <span className="text-red-400 text-xs">Please enter a valid 10-digit mobile number.</span>
              )}
              
              <div className="flex items-center gap-2 p-3 bg-black/20 rounded-lg border border-gray-700">
                <input
                  type="checkbox"
                  checked={whatsappUpdates}
                  onChange={e => setWhatsappUpdates(e.target.checked)}
                  className="accent-[#D4AF37] w-4 h-4"
                  id="whatsapp-updates"
                />
                <label htmlFor="whatsapp-updates" className="font-medium text-white text-xs">
                  Send updates on WhatsApp
                </label>
              </div>
              
              <button
                className={`w-full py-3 text-sm rounded-lg font-bold transition-all ${
                  isPhoneValid 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black hover:shadow-lg' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                onClick={handleSubmit}
                disabled={!isPhoneValid}
              >
                Get Instant Valuation
              </button>
              
              <div className="text-gray-400 text-center text-xs">
                🔒 Your data is safe and secure with us
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-white w-4/5 mx-auto">Step not found</div>;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-2 md:p-4 lg:p-6 min-h-screen bg-black relative overflow-hidden font-primary">
      <div className="relative z-10">
        {/* Conditional Progress Bar and Selection Display */}
        {!valuationSubmitted && <ProgressBar />}
        {!valuationSubmitted && <SelectionDisplay />}

        {/* Navigation Button (show only on wizard steps before submit) */}
        {!valuationSubmitted && currentStep > 1 && currentStep < 9 && (
          <div className="mb-3 w-4/5 mx-auto">
            <button
              onClick={goToPrevStep}
              className="px-4 py-2 bg-black/40 backdrop-blur-sm border border-[#D4AF37]/30 text-gray-300 rounded-lg hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300 font-secondary hover:shadow-lg text-xs"
            >
              ← Previous
            </button>
          </div>
        )}

        {/* Main Content */}
        <div ref={wizardScrollRef} className="min-h-[350px] flex items-start justify-center">
          <div className="w-full">
            {
              !valuationSubmitted
                ? renderCurrentStep()
                : (
                    <UploadImagesScreen
                      uploadedFiles={uploadedFiles}
                      setUploadedFiles={setUploadedFiles}
                      onUpload={() => {/* handle images submit here */}}
                    />
                  )
            }
          </div>
        </div>
      </div>
      <style jsx>{`
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