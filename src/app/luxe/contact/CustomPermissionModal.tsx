'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface CustomPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  actionName: string;
  actionDescription: string;
}

const CustomPermissionModal: React.FC<CustomPermissionModalProps> = ({
  isOpen,
  onClose,
  onProceed,
  actionName,
  actionDescription
}) => {
  const [isComponentMounted, setIsComponentMounted] = useState(true);

  useEffect(() => {
    setIsComponentMounted(true);
    return () => {
      setIsComponentMounted(false);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isComponentMounted) {
        onClose();
      }
    };

    if (isOpen && isComponentMounted) {
      document.addEventListener('keydown', handleEscape);
      // Safe DOM manipulation
      try {
        console.log('🔍 CustomPermissionModal: Setting body overflow to hidden');
        document.body.style.overflow = 'hidden';
      } catch (error) {
        console.error('🚨 CustomPermissionModal Body Overflow Error:', error);
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Safe cleanup
      if (isComponentMounted) {
        try {
          console.log('🔍 CustomPermissionModal: Resetting body overflow to unset');
          document.body.style.overflow = 'unset';
        } catch (error) {
          console.error('🚨 CustomPermissionModal Body Overflow Reset Error:', error);
        }
      }
    };
  }, [isOpen, onClose, isComponentMounted]);

  // Don't render if component is unmounting or modal is closed
  if (!isOpen || !isComponentMounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={(e) => {
          e.stopPropagation(); // Prevent click bubbling to modal wrapper
          if (isComponentMounted) {
            onClose();
          }
        }}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e] border border-[#D4AF37]/20 rounded-2xl shadow-2xl overflow-hidden animate-in">
        {/* Header */}
        <div className="p-6 border-b border-[#D4AF37]/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-xl">Epic Luxe</h2>
              <p className="text-gray-400 text-sm mt-1">Premium Luxury Car Services</p>
            </div>
            <button
              onClick={() => {
                if (isComponentMounted) {
                  onClose();
                }
              }}
              className="p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-[#D4AF37]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="mb-6">
            <h3 className="text-white font-semibold text-lg mb-2">
              {actionName}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {actionDescription}
            </p>
          </div>

          <div className="text-center mb-6">
            <p className="text-white/80 text-sm">
              Do you want to proceed with <span className="text-[#D4AF37] font-semibold">{actionName}</span>?
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 space-y-3">
          <button
            onClick={() => {
              if (isComponentMounted) {
                onProceed();
              }
            }}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] hover:from-[#BFA980] hover:to-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg transform hover:scale-105"
            type="button"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Proceed</span>
            </div>
          </button>

          <button
            onClick={() => {
              if (isComponentMounted) {
                onClose();
              }
            }}
            className="w-full bg-transparent border border-[#D4AF37]/30 text-[#D4AF37] px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPermissionModal; 