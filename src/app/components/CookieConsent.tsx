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
  const [consent, setConsent] = useState<Consent>(defaultConsent);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const saved = Cookies.get("epic_cookie_consent");
    if (!saved) {
      setShowBanner(true);
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
    setShowBanner(false);
    setShowSettings(false);

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
        <div className="fixed bottom-0 w-full bg-black text-white p-4 flex flex-col md:flex-row items-center justify-between z-50 shadow-lg">
          <p className="text-sm mb-2 md:mb-0">
            We use cookies to enhance your experience. Manage preferences below.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() =>
                saveConsent({ essential: true, analytics: true, marketing: true })
              }
              className="bg-green-600 px-4 py-2 rounded text-sm"
            >
              Accept All
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="bg-gray-700 px-4 py-2 rounded text-sm"
            >
              Customize
            </button>
            <button
              onClick={() => saveConsent(defaultConsent)}
              className="bg-red-600 px-4 py-2 rounded text-sm"
            >
              Reject All
            </button>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold mb-4">Cookie Preferences</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Essential (always on)</span>
                <input type="checkbox" checked disabled />
              </div>
              <div className="flex justify-between items-center">
                <span>Analytics</span>
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) =>
                    setConsent({ ...consent, analytics: e.target.checked })
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <span>Marketing</span>
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) =>
                    setConsent({ ...consent, marketing: e.target.checked })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => saveConsent(consent)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
