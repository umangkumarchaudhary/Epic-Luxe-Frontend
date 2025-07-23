import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const Car: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

export const Shield: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const Award: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="8" r="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Crown: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 16L3 7l5.5 5L12 4l3.5 8L21 7l-2 9H5z" />
  </svg>
);

// --------------------- MISSING ICONS ---------------------

export const DollarSign: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <line x1="12" y1="1" x2="12" y2="23" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Zap: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TrendingUp: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="17,6 23,6 23,12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Eye: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowRightLeft: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M8 3L4 7l4 4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 7h16" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 21l4-4-4-4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 17H4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Clock: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="12,6 12,12 16,14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Target: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Calculator: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect x="4" y="2" width="16" height="20" rx="2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <line x1="8" y1="6" x2="16" y2="6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Gauge: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M16.62 12L22.36 2.06M8.16 15.5l7.68-13.31" />
  </svg>
);

export const Diamond: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 3h12l4 6-10 12L2 9l4-6z" />
  </svg>
);

export const CreditCard: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <line x1="1" y1="10" x2="23" y2="10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Rocket: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
  </svg>
);

export const Star: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Sparkles: React.FC<IconProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
  </svg>
);
