import React, { useState } from 'react';
import Image from 'next/image';

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
    
    try {
      const cleanedPhone = formData.phoneNumber.replace(/\s+/g, '');
      
      const submitData = {
        lead_type: 'test_drive',
        lead_title: 'Test Drive Booking',
        name: formData.fullName.trim(),
        phone: cleanedPhone,
        email: null,
        preferred_model: selectedVehicle ? `${selectedVehicle.year} ${selectedVehicle.brand} ${selectedVehicle.model}` : null,
        vehicle_id: selectedVehicle?.id?.toString() || null,
        appointment_date: formData.preferredDate,
        appointment_time: formData.preferredTime,
        message: null,
        budget: null,
        insurance_type: null,
        loan_details: null,
        status: 'new',
        source_page: 'Schedule Component',
        brand: selectedVehicle?.brand || null,
        fuel: null,
        variant: null,
        city: null,
        year: selectedVehicle?.year || null,
        owner: null,
        kms: null,
        whatsapp_updates: null,
        monthly_income: null,
        employment_type: null,
        interested_car: selectedVehicle ? `${selectedVehicle.brand} ${selectedVehicle.model}` : null,
        loan_amount: null,
        emi_tenure: null,
        interest: null,
        your_emi: null,
        total_payable: null,
        pan_card: null,
        car_interest: null
      };

      const response = await fetch('https://raam-group-all-websites.onrender.com/admin/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit test drive booking');
      }

      const result = await response.json();
      console.log('Test drive booking submitted successfully:', result);
      
      setIsLoading(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error submitting test drive booking:', error);
      setIsLoading(false);
      alert('Failed to book test drive. Please try again.');
    }
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
        className={`bg-black border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {showConfirmation ? (
          // Confirmation Modal
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-[#D4AF37] mb-4">
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
              <p className="text-[#D4AF37] text-sm">
                Our team will contact you shortly to confirm the details.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="bg-[#D4AF37] text-black px-8 py-3 rounded-xl hover:bg-[#D4AF37]/90 transition-all duration-300 ease-in-out font-semibold"
            >
              Great!
            </button>
          </div>
        ) : (
          // Main Form
          <>
            <div className="p-4">
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-[#D4AF37] mb-1">
                  Book A Test Drive
                </h1>
                <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-2"></div>
              </div>

              {/* Privacy Policy Notice */}
              <div className="mb-3 p-2 bg-gray-900/50 rounded-xl border border-gray-800">
                <p className="text-gray-300 text-xs text-center">
                  By submitting this form, you are agreeing with our{' '}
                  <a 
                    href="/luxe/PrivacyPolicy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] hover:underline"
                  >
                    Privacy Policy
                  </a>
                  {' '}and{' '}
                  <a 
                    href="/luxe/TermsOfUse" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] hover:underline"
                  >
                    Terms of Use
                  </a>
                </p>
              </div>

              <div className="space-y-3">
                {/* Name */}
                <div>
                  <label className="block text-white text-xs font-semibold mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-xl focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 hover:border-gray-600 text-sm"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-white text-xs font-semibold mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-xl focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 hover:border-gray-600 text-sm"
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>

                {/* Preferred Vehicle */}
                <div>
                  <label className="block text-white text-xs font-semibold mb-1">
                    Preferred Vehicle
                  </label>
                  <div className="w-full bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-xl flex items-center">
                    {selectedVehicle ? (
                      <>
                        {selectedVehicle.image && (
                          <div className="relative w-10 h-7 mr-2">
                            <Image
                              src={selectedVehicle.image}
                              alt={`${selectedVehicle.brand} ${selectedVehicle.model}`}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-xs">
                            {selectedVehicle.year} {selectedVehicle.brand} {selectedVehicle.model}
                          </p>
                          <p className="text-[#D4AF37] text-xs">{selectedVehicle.price}</p>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-400 text-xs">No vehicle selected</p>
                    )}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-white text-xs font-semibold mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={getTodayDate()}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-xl focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 hover:border-gray-600 text-sm"
                  />
                  {errors.preferredDate && <p className="text-red-400 text-xs mt-1">{errors.preferredDate}</p>}
                </div>

                {/* Time */}
                <div>
                  <label className="block text-white text-xs font-semibold mb-1">
                    Preferred Time *
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-xl focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 hover:border-gray-600 text-sm"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time} className="bg-gray-900">{time}</option>
                    ))}
                  </select>
                  {errors.preferredTime && <p className="text-red-400 text-xs mt-1">{errors.preferredTime}</p>}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 bg-[#D4AF37] text-black px-6 py-3 rounded-xl hover:bg-[#D4AF37]/90 transition-all duration-300 ease-in-out font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
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
                    className="bg-transparent border border-gray-600 text-white px-6 py-3 rounded-xl hover:border-white transition-all duration-300 ease-in-out font-semibold text-sm"
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