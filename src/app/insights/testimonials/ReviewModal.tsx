"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { submitLead } from "../../../lib/leadSubmission";

export default function ReviewModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    carModel: "",
    serviceType: "",
    review: "",
    file: null as File | null,
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files?.[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Submit lead with type tracking
      const leadData = {
        carModel: formData.carModel,
        serviceType: formData.serviceType,
        review: formData.review,
        consent: formData.consent
      };
      await submitLead({
        type: 'Testimonials Review Modal',
        data: leadData,
        onSuccess: () => {
          setSubmitted(true);
        },
        onError: (error) => {
          console.error('Lead submission failed:', error);
          // Still show success to user but log the error
          setSubmitted(true);
        }
      });
    } catch (error) {
      console.error('Form submission error:', error);
      // Fallback to original behavior
      setSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-black/80 backdrop-blur-md p-8 rounded-2xl w-[95%] md:w-[600px] border border-yellow-500/30 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {!submitted ? (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-manrope">
                <span className="text-white">Share Your Epic Luxe</span>{" "}
                <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">Experience</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 text-gray-200">
                {/* Car Model */}
                <input
                  type="text"
                  name="carModel"
                  placeholder="Car Model"
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-yellow-400/30 focus:border-yellow-400 outline-none"
                  value={formData.carModel}
                  onChange={handleChange}
                  required
                />

                {/* Service Type */}
                <select
                  name="serviceType"
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-yellow-400/30 focus:border-yellow-400 outline-none"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Service Type</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                  <option value="Service">Service</option>
                  <option value="Other">Other</option>
                </select>

                {/* Review */}
                <textarea
                  name="review"
                  placeholder="Write your review..."
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-yellow-400/30 focus:border-yellow-400 outline-none min-h-[120px]"
                  value={formData.review}
                  onChange={handleChange}
                  required
                />

                {/* File Upload */}
                <input
                  type="file"
                  name="file"
                  accept="image/*,video/*"
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                             file:rounded-full file:border-0 file:text-sm file:font-semibold
                             file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
                  onChange={handleChange}
                />

                {/* Consent */}
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="w-5 h-5 accent-yellow-400"
                    required
                  />
                  <span className="text-sm">By submitting, you consent to us posting your review publicly.</span>
                </label>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-semibold rounded-full shadow-lg hover:shadow-2xl transition"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-2xl font-bold mb-4 font-manrope">
                <span className="text-white">Thank you for your extra efforts and sweet review</span>{" "}
                <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">❤️</span>
              </h3>
              <p className="text-gray-300 font-manrope">Our team will review and share it soon.</p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}