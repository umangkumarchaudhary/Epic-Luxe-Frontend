import { Metadata } from 'next';
import SellCarClient from './SellCarClient';
import { Shield, Award, Users, Star, Clock, CheckCircle, TrendingUp, Truck } from 'lucide-react';

// SEO-Optimized Metadata beating competitors
export const metadata: Metadata = {
  title: 'Sell Used Car Online | Instant Cash Offer | Free Pickup - Get Best Price Today',
  description: 'Sell your used car instantly with guaranteed best price in South India. Free car inspection, instant payment, paperwork assistance. 50,000+ cars sold. Get ₹50,000+ more than dealers.',
  keywords: 'sell used car, sell second hand car, sell my car online, instant car valuation, best price for used car, sell car bangalore, sell car chennai, sell car hyderabad, used car buyers, pre-owned car sale, car resale value, sell car today, instant cash for car, free car pickup, sell car without dealer, direct car buyer',
  openGraph: {
    title: 'Sell Your Used Car - Get Instant Cash Today | Best Price Guaranteed',
    description: 'India\'s most trusted used car selling platform. Get instant valuation, doorstep inspection, and immediate payment. Sell your car in 24 hours.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://yoursite.com/sell-car',
    siteName: 'YourBrand - Trusted Used Car Marketplace',
    images: [
      {
        url: '/og-sell-car.jpg',
        width: 1200,
        height: 630,
        alt: 'Sell Your Used Car - Best Price Guaranteed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sell Used Car Online - Instant Valuation & Best Price',
    description: 'Get up to ₹50,000 more for your used car. Free inspection, instant payment.',
    images: ['/twitter-sell-car.jpg'],
  },
  alternates: {
    canonical: 'https://yoursite.com/sell-car',
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
};

// Trust signals data
const trustSignals = [
  {
    icon: Shield,
    title: "100% Safe & Secure",
    subtitle: "RTO verified transactions",
    stat: "100%",
  },
  {
    icon: Award,
    title: "Best Price Guaranteed",
    subtitle: "₹50K+ more than dealers",
    stat: "₹50K+",
  },
  {
    icon: Users,
    title: "50,000+ Cars Sold",
    subtitle: "Trusted by thousands",
    stat: "50K+",
  },
  {
    icon: Star,
    title: "4.9/5 Google Rating",
    subtitle: "2000+ reviews",
    stat: "4.9★",
  },
  {
    icon: Clock,
    title: "Sell in 24 Hours",
    subtitle: "Quick & hassle-free",
    stat: "24hrs",
  },
];

// Additional trust features for SEO
const features = [
  { icon: CheckCircle, text: "Free Doorstep Inspection" },
  { icon: TrendingUp, text: "Instant Bank Transfer" },
  { icon: Truck, text: "Free Car Pickup Service" },
  { icon: Shield, text: "Complete Documentation Support" },
];

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Sell Your Used Car Online',
  description: 'Get instant valuation and best price for your used car. Free inspection and immediate payment.',
  url: 'https://yoursite.com/sell-car',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://yoursite.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sell Car',
        item: 'https://yoursite.com/sell-car',
      },
    ],
  },
  mainEntity: {
    '@type': 'Service',
    name: 'Used Car Selling Service',
    description: 'Professional used car buying service with instant valuation and payment',
    provider: {
      '@type': 'Organization',
      name: 'YourBrand',
      url: 'https://yoursite.com',
    },
    areaServed: [
      'Bangalore',
      'Chennai',
      'Hyderabad',
      'Mumbai',
      'Pune',
      'Kochi',
      'Coimbatore',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Used Car Purchase',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Instant Car Valuation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Free Car Inspection',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Immediate Payment',
          },
        },
      ],
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '2147',
    bestRating: '5',
  },
};

export default function SellCarPage() {
  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Layout */}
      <div className="min-h-screen bg-white">
        {/* SEO-Optimized Header for Crawlers */}
        <header className="sr-only">
          <h1>Sell Your Used Car Online - Get Best Price Instantly</h1>
          <p>
            India&apos;s #1 platform to sell used cars online. Get instant valuation, 
            free inspection, and immediate payment. We buy all car brands including 
            Maruti, Hyundai, Honda, Toyota, Volkswagen, Ford, Tata, Mahindra, and more.
          </p>
        </header>

        {/* Client Component */}
        <SellCarClient />

        {/* SEO Footer Content */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Trust Signals Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
              {trustSignals.map((signal, index) => {
                const Icon = signal.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-light mb-1">{signal.stat}</div>
                    <div className="text-sm font-medium text-gray-900">{signal.title}</div>
                    <div className="text-xs text-gray-600">{signal.subtitle}</div>
                  </div>
                );
              })}
            </div>

            {/* SEO Content Sections */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div>
                <h3 className="font-medium mb-4">Why Sell With Us?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Best price guarantee - Get ₹50,000+ more</li>
                  <li>✓ Instant payment via bank transfer</li>
                  <li>✓ Free RC transfer & documentation</li>
                  <li>✓ 140+ quality checks by experts</li>
                  <li>✓ Sell your car in just 24 hours</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Popular Car Brands We Buy</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Maruti Suzuki, Hyundai, Honda</li>
                  <li>• Toyota, Volkswagen, Tata Motors</li>
                  <li>• Mahindra, Ford, Renault</li>
                  <li>• Kia, MG, Nissan</li>
                  <li>• All other brands accepted</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Service Cities</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Bangalore, Chennai, Hyderabad</li>
                  <li>• Mumbai, Pune, Delhi NCR</li>
                  <li>• Kochi, Coimbatore, Mysore</li>
                  <li>• Kolkata, Ahmedabad, Jaipur</li>
                  <li>• 30+ cities across India</li>
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
              <p>© 2024 YourBrand. India&apos;s Most Trusted Used Car Marketplace.</p>
              <p className="mt-2">
                <a href="/privacy" className="hover:text-black">Privacy Policy</a>
                {' • '}
                <a href="/terms" className="hover:text-black">Terms of Service</a>
                {' • '}
                <a href="/contact" className="hover:text-black">Contact Us</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}