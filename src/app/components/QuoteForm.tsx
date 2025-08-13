// app/components/QuoteForm.tsx
'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import { Loader2, CheckCircle, X, Car, DollarSign, Clock } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  preferredModel: string;
  additionalNotes: string;
}

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  formType: 'buy' | 'sell';
}

const luxuryCarModels: string[] = [
  'Bugatti Chiron', 'McLaren 720S', 'Porsche 911 Turbo S', 'Ferrari F8 Tributo',
  'Lamborghini Huracán', 'Aston Martin DB11', 'Bentley Continental GT',
  'Rolls-Royce Ghost', 'Mercedes AMG GT', 'BMW M8 Competition', 'Audi R8',
  'Maserati MC20', 'Other'
];

export default function QuoteForm({ isOpen, onClose, formType }: QuoteFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', preferredModel: '', additionalNotes: '' });

  useEffect(() => {
    // close on escape
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // simulate call
      await new Promise((r) => setTimeout(r, 1400));
      // TODO: replace with actual API call to your leads endpoint
      console.log('QuoteForm submitted', { ...formData, formType });
      setIsLoading(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({ name: '', phone: '', preferredModel: '', additionalNotes: '' });
      }, 2500);
    } catch (err) {
      console.error('QuoteForm submit error', err);
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" aria-modal="true" role="dialog" aria-labelledby="quote-form-title" aria-describedby="quote-form-desc">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
        aria-label="Close quote form backdrop"
      />

      <div className="relative w-full max-w-lg bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl border border-[#D4AF37]/30 shadow-2xl animate-[slideUp_0.5s_ease-out] overflow-hidden">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
                <div className="absolute inset-0 w-8 h-8 border-2 border-[#D4AF37]/20 rounded-full animate-pulse"></div>
              </div>
              <p className="text-white/80 text-sm font-medium">Processing your request...</p>
            </div>
          </div>
        )}

        {/* Success state */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] flex items-center justify-center z-10 animate-[slideUp_0.4s_ease-out]">
            <div className="text-center space-y-4 p-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center animate-[scaleIn_0.5s_ease-out]">
                <CheckCircle className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white">Request Submitted!</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Our luxury car expert will contact you within 30 minutes to discuss your {formType === 'buy' ? 'purchase' : 'valuation'} requirements.
              </p>
              <div className="flex items-center justify-center space-x-2 text-[#D4AF37] text-sm font-medium">
                <Clock className="w-4 h-4" />
                <span>Closing automatically...</span>
              </div>
            </div>
          </div>
        )}

        {/* Close button */}
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 z-20" aria-label="Close form">
          <X className="w-5 h-5 text-white/70" />
        </button>

        {/* Header */}
        <div className="p-4 pb-3 border-b border-[#D4AF37]/20 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-[#D4AF37]/20 to-[#BFA980]/20">
            {formType === 'buy' ? <Car className="w-5 h-5 text-[#D4AF37]" /> : <DollarSign className="w-5 h-5 text-[#BFA980]" />}
          </div>
          <div>
            <h2 id="quote-form-title" className="text-lg font-bold text-white leading-tight">
              {formType === 'buy' ? 'Get Your Dream Car Quote' : 'Get Instant Car Valuation'}
            </h2>
            <p id="quote-form-desc" className="text-white/60 text-xs">We'll contact you within 30 minutes</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90" htmlFor="name">Full Name <span className="text-[#D4AF37]">*</span></label>
              <input id="name" type="text" required value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[#BFA980]/30 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all" placeholder="Enter your full name" aria-required="true" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90" htmlFor="phone">Phone Number <span className="text-[#D4AF37]">*</span></label>
              <input id="phone" type="tel" required value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[#BFA980]/30 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all" placeholder="+1 (555) 000-0000" aria-required="true" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/90" htmlFor="preferredModel">{formType === 'buy' ? 'Preferred Model' : 'Your Car Model'} <span className="text-[#D4AF37]">*</span></label>
            <select id="preferredModel" required value={formData.preferredModel} onChange={(e) => handleInputChange('preferredModel', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[#BFA980]/30 text-white focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all" aria-required="true">
              <option value="">Select a model</option>
              {luxuryCarModels.map(m => <option key={m} value={m} className="bg-[#1a1a1a] text-white">{m}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/90" htmlFor="additionalNotes">Additional Requirements (Optional)</label>
            <textarea id="additionalNotes" value={formData.additionalNotes} onChange={(e) => handleInputChange('additionalNotes', e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg bg-black/30 border border-[#BFA980]/30 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all resize-none" placeholder={formType === 'buy' ? "Budget range, specific features, timeline..." : "Year, mileage, condition details..."} />
          </div>

          <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black font-bold hover:from-[#BFA980] hover:to-[#D4AF37] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin" /><span>Processing...</span></>) : (<><Phone className="w-5 h-5" /><span>{formType === 'buy' ? 'Get Purchase Quote' : 'Get Valuation'}</span><ArrowRight className="w-5 h-5" /></>)}
          </button>

          <p className="text-xs text-white/50 text-center leading-relaxed">By submitting, you agree to our privacy policy. We'll only use your information to provide the requested quote and may contact you about related luxury vehicle services.</p>
        </form>
      </div>
    </div>
  );
}
