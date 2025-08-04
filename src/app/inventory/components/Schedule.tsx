import React, { useState } from 'react';

interface ScheduleProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVehicle?: {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: string;
    image?: string;
  } | null;
}

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  preferredDate: Date | null;
  timeSlot: string;
  appointmentMode: string;
  serviceableCity: string;
  videoPlatform: string;
  specialRequests: string;
}

const Schedule: React.FC<ScheduleProps> = ({ isOpen, onClose, selectedVehicle }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    mobile: '',
    email: '',
    preferredDate: null,
    timeSlot: '',
    appointmentMode: '',
    serviceableCity: '',
    videoPlatform: '',
    specialRequests: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const appointmentModes = [
    { value: 'showroom', label: 'In-Showroom Experience', icon: '🏢' },
    { value: 'concierge', label: 'Home Concierge Service', icon: '🚗' },
    { value: 'voice call', label: 'Get Personalised information', icon: '📹' }
  ];

  const timeSlots = [
    { value: 'morning', label: 'Morning (9:00 AM - 12:00 PM)' },
    { value: 'afternoon', label: 'Afternoon (1:00 PM - 5:00 PM)' },
    { value: 'evening', label: 'Evening (6:00 PM - 8:00 PM)' }
  ];

  const serviceableCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 
    'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida'
  ];

  const videoPlatforms = [
    { value: 'zoom', label: 'Zoom' },
    { value: 'whatsapp', label: 'WhatsApp Video' },
    { value: 'facetime', label: 'FaceTime' },
    { value: 'teams', label: 'Microsoft Teams' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10,15}$/.test(formData.mobile.replace(/\s+/g, ''))) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select a time slot';
    }

    if (!formData.appointmentMode) {
      newErrors.appointmentMode = 'Please select an appointment mode';
    }

    if (formData.appointmentMode === 'concierge' && !formData.serviceableCity) {
      newErrors.serviceableCity = 'Please select a serviceable city';
    }

    if (formData.appointmentMode === 'virtual' && !formData.videoPlatform) {
      newErrors.videoPlatform = 'Please select a video platform';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle mobile number - only allow digits and spaces
    if (name === 'mobile') {
      const cleanValue = value.replace(/[^\d\s]/g, '');
      setFormData(prev => ({ ...prev, [name]: cleanValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, preferredDate: date }));
    if (errors.preferredDate) {
      setErrors(prev => ({ ...prev, preferredDate: undefined }));
    }
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0; // Exclude Sundays
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setShowConfirmation(true);
  };

  const handleClose = () => {
    if (showConfirmation) {
      setShowConfirmation(false);
      setFormData({
        fullName: '',
        mobile: '',
        email: '',
        preferredDate: null,
        timeSlot: '',
        appointmentMode: '',
        serviceableCity: '',
        videoPlatform: '',
        specialRequests: ''
      });
    }
    onClose();
  };

  const getFirstName = (fullName: string) => {
    return fullName.trim().split(' ')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div 
        className={`bg-black border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {showConfirmation ? (
          // Confirmation Modal
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gold/10 border border-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gold mb-4">
                Appointment Confirmed
              </h2>
              <p className="text-white text-lg leading-relaxed mb-4">
                Thank you {getFirstName(formData.fullName) ? `Mr. ${getFirstName(formData.fullName)}` : ''}, 
                your exclusive {formData.appointmentMode === 'showroom' ? 'showroom experience' : 
                              formData.appointmentMode === 'concierge' ? 'concierge service' : 'virtual tour'} 
                has been scheduled{selectedVehicle ? ` for the ${selectedVehicle.year} ${selectedVehicle.brand} ${selectedVehicle.model}` : ''}.
              </p>
              <div className="text-gray-300 text-sm space-y-1">
                <p>📅 {formData.preferredDate?.toLocaleDateString('en-IN', { 
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                })}</p>
                <p>⏰ {timeSlots.find(slot => slot.value === formData.timeSlot)?.label}</p>
                {formData.appointmentMode === 'concierge' && (
                  <p>🏙️ Location: {formData.serviceableCity}</p>
                )}
                {formData.appointmentMode === 'virtual' && (
                  <p>📹 Platform: {videoPlatforms.find(p => p.value === formData.videoPlatform)?.label}</p>
                )}
              </div>
              <p className="text-gold text-sm mt-4">
                Our luxury car advisor will contact you within 2 hours to finalize the details.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="bg-transparent border-2 border-gold text-gold px-8 py-3 rounded-2xl hover:bg-gold hover:text-black transition-all duration-300 ease-in-out font-semibold"
            >
              Perfect
            </button>
          </div>
        ) : (
          // Main Form
          <>
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gold mb-2">
                  Schedule a Private Viewing
                </h1>
                <p className="text-gold text-xl">or Test Drive</p>
                <div className="w-24 h-px bg-gold mx-auto mt-4"></div>
              </div>

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-2xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300 hover:border-gray-600"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-2xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300 hover:border-gray-600"
                    placeholder="Enter your mobile number"
                  />
                  {errors.mobile && <p className="text-red-400 text-sm mt-1">{errors.mobile}</p>}
                </div>

                {/* Email ID */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-2xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300 hover:border-gray-600"
                    placeholder="Enter your email address (optional)"
                  />
                </div>

                {/* Appointment Mode */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-4">
                    Mode of Appointment *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {appointmentModes.map(mode => (
                      <div key={mode.value} className="relative">
                        <input
                          type="radio"
                          id={mode.value}
                          name="appointmentMode"
                          value={mode.value}
                          checked={formData.appointmentMode === mode.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <label
                          htmlFor={mode.value}
                          className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 text-center ${
                            formData.appointmentMode === mode.value
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-gray-700 bg-gray-900 text-white hover:border-gray-600'
                          }`}
                        >
                          <div className="text-2xl mb-2">{mode.icon}</div>
                          <div className="font-semibold text-sm">{mode.label}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.appointmentMode && <p className="text-red-400 text-sm mt-2">{errors.appointmentMode}</p>}
                </div>

                {/* Conditional Fields based on Appointment Mode */}
                {formData.appointmentMode === 'concierge' && (
                  <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                    <h3 className="text-gold font-semibold mb-4 flex items-center">
                      <span className="mr-2">🚗</span>
                      Premium Home Concierge Service
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Our luxury car will be brought to your doorstep with a certified specialist for an exclusive private viewing and test drive experience.
                    </p>
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2">
                        Select Your City *
                      </label>
                      <select
                        name="serviceableCity"
                        value={formData.serviceableCity}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-2xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                      >
                        <option value="">Choose your city</option>
                        {serviceableCities.map(city => (
                          <option key={city} value={city} className="bg-gray-800">{city}</option>
                        ))}
                      </select>
                      {errors.serviceableCity && <p className="text-red-400 text-sm mt-1">{errors.serviceableCity}</p>}
                    </div>
                  </div>
                )}

                {formData.appointmentMode === 'virtual' && (
                  <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                    <h3 className="text-gold font-semibold mb-4 flex items-center">
                      <span className="mr-2">📹</span>
                      Virtual Premium Tour Experience
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Get an immersive 360° virtual tour with our specialist showcasing every detail, feature, and luxury aspect of your selected vehicle.
                    </p>
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2">
                        Preferred Video Platform *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {videoPlatforms.map(platform => (
                          <label
                            key={platform.value}
                            className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                              formData.videoPlatform === platform.value
                                ? 'border-gold bg-gold/10 text-gold'
                                : 'border-gray-700 bg-gray-800 text-white hover:border-gray-600'
                            }`}
                          >
                            <input
                              type="radio"
                              name="videoPlatform"
                              value={platform.value}
                              checked={formData.videoPlatform === platform.value}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <span className="text-sm font-medium">{platform.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.videoPlatform && <p className="text-red-400 text-sm mt-2">{errors.videoPlatform}</p>}
                    </div>
                  </div>
                )}

                {formData.appointmentMode === 'showroom' && (
                  <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                    <h3 className="text-gold font-semibold mb-4 flex items-center">
                      <span className="mr-2">🏢</span>
                      Premium Showroom Experience
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                      <div className="flex items-center">
                        <span className="text-gold mr-2">✓</span>
                        Personal luxury car specialist
                      </div>
                      <div className="flex items-center">
                        <span className="text-gold mr-2">✓</span>
                        Complimentary refreshments
                      </div>
                      <div className="flex items-center">
                        <span className="text-gold mr-2">✓</span>
                        Detailed vehicle history report
                      </div>
                      <div className="flex items-center">
                        <span className="text-gold mr-2">✓</span>
                        Professional photography
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferred Appointment Time */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-4">
                    Preferred Appointment Time *
                  </label>
                  
                  {/* Date Picker */}
                  <div className="mb-4">
                    <label className="block text-gray-300 text-xs font-medium mb-2">
                      Select Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.preferredDate ? formData.preferredDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleDateChange(e.target.value ? new Date(e.target.value) : null)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-2xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300 hover:border-gray-600"
                      />
                    </div>
                    {errors.preferredDate && <p className="text-red-400 text-xs mt-1">{errors.preferredDate}</p>}
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-2">
                      Select Time Slot
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {timeSlots.map(slot => (
                        <label
                          key={slot.value}
                          className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                            formData.timeSlot === slot.value
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-gray-700 bg-gray-900 text-white hover:border-gray-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="timeSlot"
                            value={slot.value}
                            checked={formData.timeSlot === slot.value}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">{slot.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.timeSlot && <p className="text-red-400 text-xs mt-2">{errors.timeSlot}</p>}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Special Requests & Preferences
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-2xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300 hover:border-gray-600 resize-none"
                    placeholder={selectedVehicle 
                      ? `Any specific questions about the ${selectedVehicle.year} ${selectedVehicle.brand} ${selectedVehicle.model}, financing options, trade-in evaluation, or premium services you'd like to discuss...`
                      : "Any specific requirements, questions about vehicles, financing options, or premium services you'd like to discuss..."
                    }
                  />
                  <p className="text-gray-400 text-xs mt-1">
                    We offer: Extended warranties, Custom detailing, Insurance assistance, Trade-in evaluation, Financing solutions
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 bg-transparent border-2 border-gold text-gold px-8 py-4 rounded-2xl hover:bg-gold hover:text-black transition-all duration-300 ease-in-out font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Scheduling...
                      </>
                    ) : (
                      'Schedule Premium Appointment'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-transparent border border-gray-600 text-white px-8 py-4 rounded-2xl hover:border-white transition-all duration-300 ease-in-out font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Demo component to show the Schedule modal
const ScheduleDemo: React.FC<ScheduleProps> = ({ isOpen, onClose, selectedVehicle }) => {
  return (
    <Schedule 
      isOpen={isOpen} 
      onClose={onClose} 
      selectedVehicle={selectedVehicle}
    />
  );
};

export default ScheduleDemo;