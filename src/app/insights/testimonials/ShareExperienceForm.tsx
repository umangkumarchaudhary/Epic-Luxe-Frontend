'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Star, CheckCircle } from 'lucide-react';
import { submitLead } from '../../../lib/leadSubmission';
import Image from 'next/image';

interface FormData {
  name: string;
  carBrand: string;
  carModel: string;
  review: string;
  images: File[];
}

interface ShareExperienceFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const carBrands = [
  'Mercedes-Benz',
  'BMW',
  'Audi',
  'Porsche',
  'Range Rover',
  'Bentley',
  'Rolls-Royce',
  'Ferrari',
  'Lamborghini',
  'Aston Martin',
  'Other'
];

const ShareExperienceForm: React.FC<ShareExperienceFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    carBrand: '',
    carModel: '',
    review: '',
    images: []
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle escape key and scroll management
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleScroll = (e: Event) => {
      if (isOpen) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isOpen) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (isOpen) {
      // Prevent background scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.classList.add('modal-open');
      
      // Add event listeners
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('scroll', handleScroll, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      // Restore scroll position and body styles
      if (isOpen) {
        const scrollY = document.body.style.top;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.classList.remove('modal-open');
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen, onClose]);

  // Handle click outside modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 // 5MB limit
    );

    if (formData.images.length + validFiles.length > 3) {
      alert('Maximum 3 images allowed');
      return;
    }

    const newImages = [...formData.images, ...validFiles];
    setFormData(prev => ({ ...prev, images: newImages }));

    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.carBrand) newErrors.carBrand = 'Car brand is required';
    if (!formData.carModel.trim()) newErrors.carModel = 'Car model is required';
    if (!formData.review.trim()) {
      newErrors.review = 'Review is required';
    } else if (formData.review.length > 500) {
      newErrors.review = 'Review must be 500 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Submit lead with type tracking
      await submitLead({
        type: 'Testimonials Share Experience',
        data: {
          name: formData.name,
          carBrand: formData.carBrand,
          carModel: formData.carModel,
          review: formData.review,
          imageCount: formData.images.length.toString()
        },
        onSuccess: () => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          
          // Reset form after showing thank you message
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              carBrand: '',
              carModel: '',
              review: '',
              images: []
            });
            setImagePreviews([]);
            setErrors({});
            onClose();
          }, 3000);
        },
        onError: (error) => {
          console.error('Lead submission failed:', error);
          // Still show success to user but log the error
          setIsSubmitting(false);
          setIsSubmitted(true);
          
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              carBrand: '',
              carModel: '',
              review: '',
              images: []
            });
            setImagePreviews([]);
            setErrors({});
            onClose();
          }, 3000);
        }
      });
    } catch (error) {
      console.error('Form submission error:', error);
      // Fallback to original behavior
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          carBrand: '',
          carModel: '',
          review: '',
          images: []
        });
        setImagePreviews([]);
        setErrors({});
        onClose();
      }, 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      carBrand: '',
      carModel: '',
      review: '',
      images: []
    });
    setImagePreviews([]);
    setErrors({});
    setIsSubmitted(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-2xl max-h-[90vh] bg-black/50 backdrop-blur-md border border-[#D4AF37]/20 rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Modal Content Container with Proper Scroll */}
            <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Close Button */}
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors duration-200 disabled:opacity-50"
            >
              <X size={24} />
            </button>

            <div className="p-8">
              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#BFA980]/10 border border-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                    <h2 className="text-3xl font-bold font-manrope mb-2">
                      <span className="text-white">Share Your</span>{" "}
                      <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">Experience</span>
                    </h2>
                    <p className="text-gray-300 font-light font-manrope">
                      Help others discover the Epic Luxe difference
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-white/90 font-medium mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-all duration-200 ${
                          errors.name ? 'border-red-500' : 'border-gray-600/50'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Car Brand Field */}
                    <div>
                      <label className="block text-white/90 font-medium mb-2">
                        Car Brand *
                      </label>
                      <select
                        value={formData.carBrand}
                        onChange={(e) => handleInputChange('carBrand', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-all duration-200 ${
                          errors.carBrand ? 'border-red-500' : 'border-gray-600/50'
                        }`}
                      >
                        <option value="">Select car brand</option>
                        {carBrands.map(brand => (
                          <option key={brand} value={brand} className="bg-gray-800 text-white">
                            {brand}
                          </option>
                        ))}
                      </select>
                      {errors.carBrand && (
                        <p className="text-red-400 text-sm mt-1">{errors.carBrand}</p>
                      )}
                    </div>

                    {/* Car Model Field */}
                    <div>
                      <label className="block text-white/90 font-medium mb-2">
                        Car Model *
                      </label>
                      <input
                        type="text"
                        value={formData.carModel}
                        onChange={(e) => handleInputChange('carModel', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-all duration-200 ${
                          errors.carModel ? 'border-red-500' : 'border-gray-600/50'
                        }`}
                        placeholder="e.g., X7, C-Class, A8"
                      />
                      {errors.carModel && (
                        <p className="text-red-400 text-sm mt-1">{errors.carModel}</p>
                      )}
                    </div>

                    {/* Review Field */}
                    <div>
                      <label className="block text-white/90 font-medium mb-2">
                        Your Review *
                      </label>
                      <textarea
                        value={formData.review}
                        onChange={(e) => handleInputChange('review', e.target.value)}
                        rows={4}
                        maxLength={500}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-all duration-200 resize-none ${
                          errors.review ? 'border-red-500' : 'border-gray-600/50'
                        }`}
                        placeholder="Share your experience with Epic Luxe..."
                      />
                      <div className="flex justify-between items-center mt-1">
                        {errors.review && (
                          <p className="text-red-400 text-sm">{errors.review}</p>
                        )}
                        <span className="text-gray-400 text-sm ml-auto">
                          {formData.review.length}/500
                        </span>
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-white/90 font-medium mb-2">
                        Upload Images (Optional)
                      </label>
                      <div className="space-y-4">
                        {/* Upload Button */}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full p-4 border-2 border-dashed border-gray-600/50 rounded-xl text-gray-400 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                          <Upload size={20} />
                          <span>Click to upload images (max 3)</span>
                        </button>
                        
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />

                        {/* Image Previews */}
                        {imagePreviews.length > 0 && (
                          <div className="grid grid-cols-3 gap-3">
                            {imagePreviews.map((preview, index) => (
                              <div key={index} className="relative group">
                                <Image
                                  src={preview}
                                  alt={`Preview ${index + 1}`}
                                  width={96}
                                  height={96}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          'Submit Review'
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="flex-1 border border-white/20 text-white py-3 px-6 rounded-xl hover:bg-white/10 transition-all duration-200 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Thank You Message */
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold font-manrope mb-4">
                    <span className="text-white">Thank You!</span>{" "}
                    <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">❤️</span>
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto font-manrope">
                    Thank you for your extra efforts and sweet review ❤️ Our team will review and share it soon.
                  </p>
                </motion.div>
              )}
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
         </AnimatePresence>
   );
 };

 export default ShareExperienceForm; 