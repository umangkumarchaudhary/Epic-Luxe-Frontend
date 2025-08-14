
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { X, Calendar, User, Phone, CheckCircle } from 'lucide-react';

type FormData = {
  name: string;
  phone: string;
  leadType: string;
};

type FormErrors = {
  name: string;
  phone: string;
};

const ConsultationModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    leadType: 'services-page',
  });
  const [errors, setErrors] = useState<FormErrors>({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setShowModal(true);
    window.addEventListener('openConsultationModal', handleOpenModal);
    return () => window.removeEventListener('openConsultationModal', handleOpenModal);
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = { name: '', phone: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const processedValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
      setFormData((prev) => ({ ...prev, [name]: processedValue }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsSubmitting(true);
      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            setShowModal(false);
            setFormData({ name: '', phone: '', leadType: 'services-page' });
          }, 2000);
        } else {
          console.error('Submission failed:', await response.text());
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm]
  );

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white max-w-md w-full p-8 shadow-2xl">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
          aria-label="Close consultation form"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <Calendar className="w-12 h-12 mx-auto text-black mb-4" />
          <h3 className="text-2xl font-light text-black mb-2 tracking-tight">Schedule Consultation</h3>
          <p className="text-gray-600 font-light">Let&apos;s discuss your luxury car needs</p>

        </div>

        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
            <h4 className="text-xl font-medium text-black mb-2">Thank You!</h4>
            <p className="text-gray-600">Our team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className={`w-full pl-12 pr-4 py-4 bg-white text-black placeholder-gray-400 border focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className={`w-full pl-12 pr-4 py-4 bg-white text-black placeholder-gray-400 border focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
              </div>
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>

            <input type="hidden" name="leadType" value="services-page" />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mercedes-button w-full py-4 px-6 font-medium transition-all duration-300 flex items-center justify-center gap-2 tracking-wide ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-black text-white hover:bg-gray-900'
              }`}
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  Book Consultation
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ConsultationModal;