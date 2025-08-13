import { Metadata } from 'next'
import EpicShieldClient from './epicShieldClient'

export const metadata: Metadata = {
  title: 'EPIC Shield - Premium Protection for Your Pre-Owned Luxury Vehicle | EPIC Luxe',
  description: 'Protect what moves you with EPIC Shield. Premium comprehensive protection plan for pre-owned luxury vehicles. Pay ₹1.95 Lakhs, enjoy ₹12.5 Lakhs benefits with full refund guarantee.',
  keywords: 'luxury car protection, pre-owned car warranty, vehicle protection plan, luxury car insurance, extended warranty, car protection shield',
  openGraph: {
    title: 'EPIC Shield - Premium Vehicle Protection',
    description: 'Ultimate protection for your luxury pre-owned vehicle with comprehensive benefits worth ₹12.5 Lakhs',
    type: 'website',
    locale: 'en_IN',
    siteName: 'EPIC Luxe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EPIC Shield - Premium Vehicle Protection',
    description: 'Ultimate protection for your luxury pre-owned vehicle',
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
  alternates: {
    canonical: 'https://epicluxe.com/epic-shield',
  },
}

export default function EpicShieldPage() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "EPIC Shield",
            "description": "Premium comprehensive protection plan for pre-owned luxury vehicles",
            "brand": {
              "@type": "Brand",
              "name": "EPIC Luxe"
            },
            "offers": {
              "@type": "Offer",
              "price": "195000",
              "priceCurrency": "INR",
              "description": "Pay ₹1.95 Lakhs, enjoy ₹12.5 Lakhs benefits with full refund guarantee"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "250"
            }
          }),
        }}
      />
      <EpicShieldClient />
    </>
  )
}