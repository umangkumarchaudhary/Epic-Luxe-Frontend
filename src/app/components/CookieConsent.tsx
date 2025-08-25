"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type Consent = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultConsent: Consent = {
  essential: true,
  analytics: false,
  marketing: false,
};

export default function CookieConsentLite() {
  const [, setConsent] = useState<Consent>(defaultConsent);
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const saved = Cookies.get("epic_cookie_consent");
    if (!saved) {
      setShowBanner(true);
      // Show the banner after 10 seconds with slide-in animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    } else {
      try {
        setConsent(JSON.parse(saved));
      } catch {
        setConsent(defaultConsent);
      }
    }
  }, []);

  const saveConsent = (newConsent: Consent) => {
    Cookies.set("epic_cookie_consent", JSON.stringify(newConsent), {
      expires: 180, // 6 months
      secure: true,
      sameSite: "strict",
    });
    setConsent(newConsent);
    
    // Slide out animation before hiding
    setIsVisible(false);
    setTimeout(() => {
      setShowBanner(false);
    }, 300); // Wait for slide-out animation to complete

    // Load scripts conditionally
    if (newConsent.analytics) loadAnalytics();
    if (newConsent.marketing) loadMarketing();
  };

  const loadAnalytics = () => {
    if (!document.getElementById("ga-script")) {
      const s = document.createElement("script");
      s.id = "ga-script";
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"; // Replace
      document.head.appendChild(s);

      interface Window {
        dataLayer: unknown[];
      }
      (window as Window & { dataLayer: unknown[] }).dataLayer = (window as Window & { dataLayer: unknown[] }).dataLayer || [];
      function gtag(...args: unknown[]) {
        (window as Window & { dataLayer: unknown[] }).dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", "G-XXXXXXX"); // Replace
    }
  };

  const loadMarketing = () => {
    if (!document.getElementById("meta-pixel")) {
      const s = document.createElement("script");
      s.id = "meta-pixel";
      s.innerHTML = `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'YOUR_PIXEL_ID'); fbq('track', 'PageView');`;
      document.body.appendChild(s);
    }
  };

  return (
    <>
      {showBanner && (
        <div 
          className={`fixed bottom-6 left-4 z-[60] transition-all duration-300 ease-out transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          {/* WhatsApp-style floating widget */}
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-xs">
            {/* Header */}
            <div className="bg-gray-600 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Cookie Settings</span>
              </div>
              <button
                onClick={() => saveConsent(defaultConsent)}
                className="text-white/80 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
            
            {/* Message */}
            <div className="p-4">
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                🍪 We use cookies to enhance your experience. Accept to continue with the best experience!
              </p>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    saveConsent({ essential: true, analytics: true, marketing: true })
                  }
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => saveConsent(defaultConsent)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
