
import { Metadata } from 'next';
import SellCarPageClient from './SellCarPageClient';

// Advanced SEO Metadata
export const metadata: Metadata = {
  title: 'Sell Your Used Car Online | Instant Cash - Best Price Guaranteed | Get ₹50,000 More',
  description: 'Sell your used car instantly at the best price in India. Free doorstep inspection, instant payment, 50,000+ satisfied customers. Get up to ₹50,000 more than dealers. Sell in 24 hours.',
  keywords: 'sell used car online, sell second hand car, sell my car instantly, best price for used car, sell car online India, instant car valuation, sell car bangalore, sell car chennai, sell car hyderabad, sell car mumbai, sell car delhi, used car buyers, pre-owned car sale, car resale value, sell car today, instant cash for car, free car pickup, sell car without dealer, direct car buyer, sell maruti car, sell hyundai car, sell honda car, sell toyota car, car selling platform India',
  
  metadataBase: new URL('https://yoursite.com'),
  
  alternates: {
    canonical: '/sell-car',
    languages: {
      'en-IN': '/en-IN/sell-car',
      'hi-IN': '/hi-IN/sell-car',
    },
  },
  
  openGraph: {
    title: 'Sell Your Car - Get Best Price Instantly | 50,000+ Happy Customers',
    description: 'India\'s #1 platform to sell used cars. Free inspection, instant payment, complete documentation support. Sell your car in 24 hours.',
    url: 'https://yoursite.com/sell-car',
    siteName: 'YourBrand - India\'s Trusted Car Marketplace',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-sell-car-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Sell Your Used Car at Best Price',
      },
      {
        url: '/og-sell-car-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'Instant Car Valuation',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Sell Used Car - Get ₹50,000 More | Instant Payment',
    description: 'Free doorstep inspection. Instant bank transfer. 50,000+ cars sold. Rated 4.9★',
    creator: '@yourbrand',
    images: ['/twitter-sell-car.jpg'],
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: 'google-verification-code',
    yandex: 'yandex-verification-code',
  },
  
  category: 'automotive',
};

// Comprehensive JSON-LD Schema
const generateJsonLd = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'YourBrand',
    url: 'https://yoursite.com',
    logo: 'https://yoursite.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-1800-123-456',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    sameAs: [
      'https://www.facebook.com/yourbrand',
      'https://twitter.com/yourbrand',
      'https://www.instagram.com/yourbrand',
      'https://www.linkedin.com/company/yourbrand',
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Used Car Buying Service',
    provider: {
      '@type': 'Organization',
      name: 'YourBrand',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Car Selling Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Instant Car Valuation',
            description: 'Get instant valuation for your car',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Free Doorstep Inspection',
            description: '140+ point inspection at your doorstep',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Instant Payment',
            description: 'Get paid instantly via bank transfer',
          },
        },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How quickly can I sell my car?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can sell your car within 24 hours. Our streamlined process includes instant valuation, same-day inspection, and immediate payment upon agreement.',
        },
      },
      {
        '@type': 'Question',
        name: 'What documents do I need to sell my car?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You need RC (Registration Certificate), valid insurance, PUC certificate, and ID proof. We handle all the paperwork and RC transfer for you.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much more money can I get compared to dealers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our customers typically get ₹30,000 to ₹50,000 more than traditional dealer quotes due to our transparent pricing and extensive buyer network.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which car brands do you buy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We buy all car brands including Maruti Suzuki, Hyundai, Honda, Toyota, Tata, Mahindra, Volkswagen, Ford, Kia, MG, and luxury brands like Mercedes, BMW, and Audi.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the car inspection free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our comprehensive 140-point car inspection is completely free. Our expert inspectors come to your doorstep at your convenient time.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
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
  };

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12847',
    bestRating: '5',
    worstRating: '1',
  };

  return [organizationSchema, serviceSchema, faqSchema, breadcrumbSchema, aggregateRatingSchema];
};

// Static data for benefits - Using icon names as strings instead of components
const benefitsData = [
  {
    icon: "Shield",
    title: "Best Price Guarantee",
    description: "Get up to ₹50,000 more than traditional dealers with our transparent pricing.",
    stat: "₹50K+",
  },
  {
    icon: "Clock",
    title: "Sell in 24 Hours",
    description: "Quick evaluation, instant offer, and immediate payment within a day.",
    stat: "24hrs",
  },
  {
    icon: "Award",
    title: "50,000+ Cars Sold",
    description: "Join thousands of satisfied customers who sold their cars hassle-free.",
    stat: "50K+",
  },
  {
    icon: "Star",
    title: "4.9/5 Google Rating",
    description: "Highest-rated car selling platform with 2000+ positive reviews.",
    stat: "4.9★",
  },
];

// FAQ data
const faqsData = [
  {
    question: "How is your platform different from other car selling services?",
    answer: "We offer instant valuation, free doorstep inspection, transparent pricing with no hidden charges, and guarantee the best price - typically ₹30,000 to ₹50,000 more than traditional dealers. Our entire process takes just 24 hours."
  },
  {
    question: "What is the complete car selling process?",
    answer: "Step 1: Fill our simple online form (2 minutes). Step 2: Get instant AI-powered valuation. Step 3: Schedule free doorstep inspection. Step 4: Receive final offer. Step 5: Get instant payment and we handle all paperwork including RC transfer."
  },
  {
    question: "Which cities do you operate in?",
    answer: "We operate in 30+ cities across India including Bangalore, Chennai, Hyderabad, Mumbai, Delhi NCR, Pune, Kolkata, Ahmedabad, Kochi, Coimbatore, Mysore, and expanding rapidly to serve you better."
  },
  {
    question: "What documents are required to sell my car?",
    answer: "You need: Registration Certificate (RC), Valid Insurance, Pollution Certificate (PUC), Original Invoice (if available), and ID Proof. Don't worry if you're missing something - our team will guide you through the process."
  },
  {
    question: "Is there any fee or hidden charges?",
    answer: "Absolutely no hidden charges. Our valuation and inspection are completely free. We only charge a minimal service fee upon successful sale, which is transparently communicated upfront."
  }
];

// Contact data
const contactData = {
  phone: "+91 1800-123-456",
  email: "support@yoursite.com",
  hours: "Mon-Sun, 9 AM - 9 PM",
  cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata"],
};

export default function SellCarMainPage() {
  const jsonLdSchemas = generateJsonLd();

  return (
    <>
      {/* Multiple JSON-LD Schemas for comprehensive SEO */}
      {jsonLdSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Semantic HTML structure for SEO */}
      <main className="min-h-screen bg-white">
        {/* Hidden SEO Content */}
        <h1 className="sr-only">
          Sell Your Used Car Online - Get Best Price Instantly in India
        </h1>
        
        <div className="sr-only">
          <h2>Why Choose Us for Selling Your Car</h2>
          <ul>
            <li>Instant car valuation using AI technology</li>
            <li>Free doorstep inspection by certified experts</li>
            <li>Get paid instantly via bank transfer</li>
            <li>We handle all paperwork and RC transfer</li>
            <li>50,000+ satisfied customers across India</li>
            <li>Best price guarantee - ₹50,000 more than dealers</li>
            <li>Sell your car in just 24 hours</li>
          </ul>
          
          <h2>Car Brands We Buy</h2>
          <p>
            We buy all car brands including Maruti Suzuki (Swift, Baleno, Dzire, Vitara Brezza), 
            Hyundai (i20, Creta, Venue, Verna), Honda (City, Amaze, Jazz), Toyota (Innova, Fortuner, Glanza), 
            Tata (Nexon, Harrier, Safari), Mahindra (XUV700, Thar, Scorpio), Volkswagen (Polo, Vento), 
            Kia (Seltos, Sonet, Carnival), MG (Hector, Astor), Ford, Renault, Nissan, Skoda, 
            and luxury brands like Mercedes-Benz, BMW, Audi, Jaguar, Land Rover, Volvo.
          </p>
          
          <h2>Cities We Serve</h2>
          <p>
            Available in Bangalore, Chennai, Hyderabad, Mumbai, Delhi NCR, Gurgaon, Noida, 
            Pune, Kolkata, Ahmedabad, Surat, Jaipur, Lucknow, Kochi, Thiruvananthapuram, 
            Coimbatore, Madurai, Mysore, Mangalore, Vizag, Vijayawada, Nashik, Nagpur, 
            Indore, Bhopal, Chandigarh, and 30+ cities across India.
          </p>
        </div>

        {/* Client Component */}
        <SellCarPageClient 
          benefitsData={benefitsData}
          faqsData={faqsData}
          contactData={contactData}
        />
      </main>
    </>
  );
}