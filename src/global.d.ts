// src/global.d.ts
export {};

declare global {
  interface Window {
    /**
     * Google Tag Manager dataLayer
     * Array of objects containing tracking events
     */
    dataLayer?: Array<Record<string, unknown>>;

    /**
     * Optional analytics object for custom tracking
     */
    analytics?: {
      track: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}
