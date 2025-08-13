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
  phoneNumber: string;
  preferredDate: string;
  preferredTime: string;
}

const Schedule: React.FC<ScheduleProps> = ({ isOpen, onClose, selectedVehicle }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\s+/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Date is required';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle phone number - only allow digits and spaces
    if (name === 'phoneNumber') {
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
        phoneNumber: '',
        preferredDate: '',
        preferredTime: ''
      });
    }
    onClose();
  };

  const getFirstName = (fullName: string) => {
    return fullName.trim().split(' ')[0];
  };

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div 
        className={`bg-black border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
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
                Test Drive Booked!
              </h2>
              <p className="text-white text-lg leading-relaxed mb-4">
                Thank you {getFirstName(formData.fullName)}, your test drive has been successfully scheduled.
              </p>
              <div className="text-gray-300 text-sm space-y-2 mb-4">
                <p className="flex items-center justify-center">
                  <span className="mr-2">🚗</span>
                  {selectedVehicle ? `${selectedVehicle.year} ${selectedVehicle.brand} ${selectedVehicle.model}` : 'Selected Vehicle'}
                </p>
                <p className="flex items-center justify-center">
                  <span className="mr-2">📅</span>
                  {new Date(formData.preferredDate).toLocaleDateString('en-IN', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </p>
                <p className="flex items-center justify-center">
                  <span className="mr-2">⏰</span>
                  {formData.preferredTime}
                </p>
              </div>
              <p className="text-gold text-sm">
                Our team will contact you shortly to confirm the details.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="bg-gold text-black px-8 py-3 rounded-xl hover:bg-gold/90 transition-all duration-300 ease-in-out font-semibold"
            >
              Great!
            </button>
          </div>
        ) : (
          // Main Form
          <>
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gold mb-2">
                  Book A Test Drive
                </h1>
                <div className="w-16 h-px bg-gold mx-auto mt-4"></div>
              </div>

              {/* Privacy Policy Notice */}
              <div className="mb-6 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                <p className="text-gray-300 text-sm text-center">
                  By submitting this form, you are agreeing with our{' '}
                  <a 
                    href="/luxe/PrivacyPolicy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    Privacy Policy
                  </a>
                  {' '}and{' '}
                  <a 
                    href="/luxe/TermsOfUse" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    Terms of Use
                  </a>
                </p>
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300 hover:border-gray-600"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300 hover:border-gray-600"
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>

                {/* Preferred Vehicle */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Preferred Vehicle
                  </label>
                  <div className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl">
                    {selectedVehicle ? (
                      <div className="flex items-center space-x-3">
                        {selectedVehicle.image && (
                          <img 
                            src={selectedVehicle.image} 
                            alt={`${selectedVehicle.brand} ${selectedVehicle.model}`}
                            className="w-12 h-8 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-semibold">
                            {selectedVehicle.year} {selectedVehicle.brand} {selectedVehicle.model}
                          </p>
                          <p className="text-gold text-sm">{selectedVehicle.price}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400">No vehicle selected</p>
                    )}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={getTodayDate()}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300 hover:border-gray-600"
                  />
                  {errors.preferredDate && <p className="text-red-400 text-sm mt-1">{errors.preferredDate}</p>}
                </div>

                {/* Time */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Preferred Time *
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300 hover:border-gray-600"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time} className="bg-gray-900">{time}</option>
                    ))}
                  </select>
                  {errors.preferredTime && <p className="text-red-400 text-sm mt-1">{errors.preferredTime}</p>}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 bg-gold text-black px-8 py-4 rounded-xl hover:bg-gold/90 transition-all duration-300 ease-in-out font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-transparent border border-gray-600 text-white px-8 py-4 rounded-xl hover:border-white transition-all duration-300 ease-in-out font-semibold"
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