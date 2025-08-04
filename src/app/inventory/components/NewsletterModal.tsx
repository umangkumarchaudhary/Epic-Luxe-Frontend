import React, { useState } from 'react';
import { X, Mail, CheckCircle, Bell } from 'lucide-react';

interface NewsletterModalProps {
  visible: boolean;
  onClose: () => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    newArrivals: true,
    priceDrops: true,
    expertTips: false,
  });
  const [submitted, setSubmitted] = useState(false);

  if (!visible) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation here if needed
    setSubmitted(true);
    // You would typically send this data to a backend API here
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 w-full max-w-md border border-slate-700 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close newsletter modal"
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 mb-6">
          <Mail className="w-6 h-6 text-[#d4af37]" />
          <h2 className="text-2xl font-bold text-white">Stay Updated</h2>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 text-slate-300">
            <p className="mb-4 text-slate-400">
              Get notified about new luxury cars matching your preferences.
            </p>

            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <fieldset className="space-y-3">
              <legend className="font-semibold text-white">Notification Preferences</legend>
              {Object.entries(preferences).map(([key, value]) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => togglePreference(key as keyof typeof preferences)}
                    className="w-5 h-5 rounded border border-slate-600 text-yellow-400 focus:ring-yellow-400"
                  />
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                </label>
              ))}
            </fieldset>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#f1c85c] text-black font-bold py-3 rounded-lg hover:opacity-90 transition"
            >
              Subscribe Now
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center text-lg text-green-400">
            <CheckCircle className="w-12 h-12" />
            <p>Thank you for subscribing! You will receive updates soon.</p>
            <button
              onClick={onClose}
              className="mt-3 px-6 py-3 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition"
            >
              Close
            </button>
          </div>
        )}

        <div className="flex justify-center items-center gap-6 mt-8 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>No spam, unsubscribe anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-400" />
            <span>Instant notifications</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
