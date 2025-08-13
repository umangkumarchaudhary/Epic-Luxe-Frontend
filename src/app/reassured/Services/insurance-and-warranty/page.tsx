// app/page.tsx
import { Metadata } from 'next'
import HeroSection from './components/HeroSection'
import InsurancePartners from './components/InsurancePartners'
import RenewalSection from './components/RenewalSection'
import WarrantySection from './components/WarrantySection'
import HectorSpotlight from './components/HectorSpotlight'
import StatsSection from './components/StatsSection'
import CTASection from './components/CTASection'
import ContactForm from './components/ContactForm'
import WhatsAppWidget from './components/WhatsAppWidget'

export const metadata: Metadata = {
  title: 'Epic Reassured - Premium Pre-Owned Cars Hyderabad Chennai Vizag Pune | Best Used Cars with Warranty & Insurance',
  description: 'Buy certified pre-owned cars in Hyderabad, Chennai, Vizag, Pune with 1-year warranty & insurance. MG Hector 3-year warranty. Best second hand cars dealer. 98% claim approval. Trusted used car showroom.',
  keywords: 'pre owned cars hyderabad, used cars chennai, second hand cars vizag, pre owned cars pune, certified used cars india, best used car dealer hyderabad, mg hector warranty, car insurance renewal, epic reassured cars, premium used cars chennai, second hand luxury cars vizag, pre owned vehicles pune, used car showroom hyderabad, certified pre owned cars chennai, best second hand car dealers vizag, quality used cars pune',
  metadataBase: new URL('https://epicreassured.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Epic Reassured - Premium Pre-Owned Cars with Warranty & Insurance',
    description: 'Your trusted partner for certified pre-owned cars in Hyderabad, Chennai, Vizag, and Pune. Every car comes with 1-year warranty and comprehensive insurance.',
    url: 'https://epicreassured.com',
    siteName: 'Epic Reassured',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Epic Reassured Premium Pre-Owned Cars',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Epic Reassured - Premium Pre-Owned Cars',
    description: 'Certified pre-owned cars with warranty & insurance in Hyderabad, Chennai, Vizag, Pune',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Epic Reassured",
    "description": "Premium pre-owned cars with warranty and insurance in Hyderabad, Chennai, Vizag, and Pune",
    "url": "https://epicreassured.com",
    "telephone": "+91-9876543210",
    "priceRange": "₹₹₹",
    "openingHours": "Mo-Su 09:00-20:00",
    "areaServed": [
      {
        "@type": "City",
        "name": "Hyderabad",
        "addressRegion": "Telangana"
      },
      {
        "@type": "City",
        "name": "Chennai",
        "addressRegion": "Tamil Nadu"
      },
      {
        "@type": "City",
        "name": "Vizag",
        "addressRegion": "Andhra Pradesh"
      },
      {
        "@type": "City",
        "name": "Pune",
        "addressRegion": "Maharashtra"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pre-Owned Cars",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Car",
            "name": "Certified Pre-Owned Cars",
            "description": "Quality assured used cars with warranty"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2450"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section with Video/Image Background */}
        <HeroSection />
        
        {/* Trusted Insurance Partnerships */}
        <InsurancePartners />
        
        {/* Hassle-Free Renewals */}
        <RenewalSection />
        
        {/* Warranty Excellence */}
        <WarrantySection />
        
        {/* MG Hector Exclusive Spotlight */}
        <HectorSpotlight />
        
        {/* Statistics Section */}
        <StatsSection />
        
        {/* Call to Action */}
        <CTASection />
        
        {/* Contact Form */}
        <ContactForm />
        
        {/* WhatsApp Sticky Widget */}
        <WhatsAppWidget />
      </main>
    </>
  )
}

// app/layout.tsx
// import type { Metadata } from 'next'
// import { Inter, Playfair_Display } from 'next/font/google'
// import Navigation from '@/components/Navigation'

// const inter = Inter({ 
//   subsets: ['latin'],
//   variable: '--font-inter',
//   display: 'swap',
// })

// const playfair = Playfair_Display({ 
//   subsets: ['latin'],
//   variable: '--font-playfair',
//   display: 'swap',
// })

// export const metadata: Metadata = {
//   metadataBase: new URL('https://epicreassured.com'),
//   title: {
//     default: 'Epic Reassured - Premium Pre-Owned Cars',
//     template: '%s | Epic Reassured'
//   },
//   description: 'Buy certified pre-owned cars with warranty & insurance in Hyderabad, Chennai, Vizag, Pune',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
//       <head>
//         <link rel="icon" href="/favicon.ico" />
//         <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
//         <meta name="theme-color" content="#000000" />
//       </head>
//       <body className={`${inter.className} antialiased text-black bg-white`}>
//         <Navigation />
//         {children}
//       </body>
//     </html>
//   )
// }

// // tailwind.config.ts
// import type { Config } from 'tailwindcss'

// const config: Config = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['var(--font-inter)'],
//         serif: ['var(--font-playfair)'],
//       },
//       animation: {
//         'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
//         'slide-in-right': 'slideInRight 0.8s ease-out forwards',
//         'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
//       },
//       keyframes: {
//         fadeInUp: {
//           '0%': {
//             opacity: '0',
//             transform: 'translateY(30px)',
//           },
//           '100%': {
//             opacity: '1',
//             transform: 'translateY(0)',
//           },
//         },
//         slideInRight: {
//           '0%': {
//             opacity: '0',
//             transform: 'translateX(-30px)',
//           },
//           '100%': {
//             opacity: '1',
//             transform: 'translateX(0)',
//           },
//         },
//         pulseSoft: {
//           '0%, 100%': {
//             opacity: '1',
//           },
//           '50%': {
//             opacity: '0.8',
//           },
//         },
//       },
//     },
//   },
//   plugins: [],
// }

// export default config