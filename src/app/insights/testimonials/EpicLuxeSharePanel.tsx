"use client";

import { useEffect } from "react";
import { X, Link as LinkIcon, Instagram, Twitter, MessageCircle, Facebook } from "lucide-react";

interface SocialSharePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EpicLuxeSharePanel({ isOpen, onClose }: SocialSharePanelProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Your actual share URLs
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = "Check out Epic Luxe - The ultimate luxury car buying experience! 🚗✨";

  const shareLinks = [
    {
      label: "Copy Link",
      icon: <LinkIcon size={20} className="text-[#D4AF37]" />,
      action: () => {
        navigator.clipboard.writeText(currentUrl);
        alert("Link copied to clipboard ✅");
        onClose();
      },
    },
    {
      label: "Share on Instagram",
      icon: <Instagram size={20} className="text-[#D4AF37]" />,
      href: `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`,
    },
    {
      label: "Share on X (Twitter)",
      icon: <Twitter size={20} className="text-[#D4AF37]" />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
    },
    {
      label: "Share on WhatsApp",
      icon: <MessageCircle size={20} className="text-[#D4AF37]" />,
      href: `https://wa.me/?text=${encodeURIComponent(shareText + " " + currentUrl)}`,
    },
    {
      label: "Share on Facebook",
      icon: <Facebook size={20} className="text-[#D4AF37]" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center z-[9999] p-4">
      {/* Panel */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] border border-[#D4AF37]/30 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-400 ease-out">
        {/* Close Button */}
        <div className="flex justify-end p-3">
          <button
            onClick={onClose}
            className="text-[#D4AF37] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Heading */}
        <h3 className="text-center text-lg font-semibold text-[#D4AF37] mb-4">
          Share This Experience
        </h3>

        {/* Buttons */}
        <div className="grid grid-cols-1 gap-3 p-4">
          {shareLinks.map((link, index) =>
            link.href ? (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black rounded-full py-3 font-medium hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all duration-200"
                onClick={onClose}
              >
                {link.icon}
                {link.label}
              </a>
            ) : (
              <button
                key={index}
                onClick={link.action}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black rounded-full py-3 font-medium hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all duration-200"
              >
                {link.icon}
                {link.label}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}