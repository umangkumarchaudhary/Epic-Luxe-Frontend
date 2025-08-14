import React from 'react';
import { Shield, Award, Star, CheckCircle, Clock, CreditCard } from 'lucide-react';
import FAQClient from './faqclient';

// Define the FAQ type to match what FAQClient expects
interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  keywords: string;
  icon: 'Shield' | 'Award' | 'Star' | 'CheckCircle' | 'Clock' | 'CreditCard';
}

const FAQ = () => {
  
  const faqs: FAQ[] = [
    {
      id: 1,
      category: 'Quality & Inspection',
      question: 'How does EPIC Reassured ensure certified pre-owned car quality compared to Cars24 and Spinny?',
      answer: 'EPIC Reassured conducts a comprehensive 200-point inspection on every used car, exceeding industry standards. Our certified technicians examine engine performance, transmission, brakes, electrical systems, AC, body condition, and interior quality. Unlike other platforms, we provide a detailed inspection report with photographic evidence, ensuring complete transparency in our pre-owned luxury car certification process.',
      keywords: 'certified pre-owned cars, used car inspection, quality assurance, pre-owned luxury cars, car certification process',
      icon: "Shield" as const // Use 'as const' to ensure literal type
    },
    {
      id: 2,
      category: 'Warranty & Protection',
      question: 'What warranty coverage do you offer on pre-owned luxury cars?',
      answer: 'All EPIC Reassured certified pre-owned vehicles come with comprehensive warranty protection up to 2 years or 40,000 km. Our warranty covers engine, transmission, electrical systems, AC, and major components. We also offer extended warranty plans and roadside assistance across India. This warranty coverage surpasses most competitors in the used luxury car segment, providing complete peace of mind.',
      keywords: 'used car warranty, pre-owned car protection, extended warranty, roadside assistance, certified pre-owned warranty',
      icon: "Award" as const
    },
    {
      id: 3,
      category: 'Financing & Loans',
      question: 'What are the best financing options for buying used cars from EPIC Reassured?',
      answer: 'We partner with leading banks and NBFCs to offer the lowest interest rates starting from 8.5% on used car loans. Our financing options include zero down payment, flexible EMI plans up to 7 years, instant loan approval within 30 minutes, and doorstep documentation. We handle all paperwork and provide pre-approved financing for faster car buying experience compared to other used car platforms.',
      keywords: 'used car loan, car financing, lowest interest rates, zero down payment, instant car loan approval, EMI calculator',
      icon: "CreditCard" as const
    },
    {
      id: 4,
      category: 'Test Drive & Experience',
      question: 'How can I schedule a test drive for luxury pre-owned cars?',
      answer: 'Book your test drive instantly through our website or WhatsApp. We offer home test drives across Mumbai, Delhi, Bangalore, Hyderabad, Chennai, and Pune. Our experts bring the car to your location at your convenience. You can test drive multiple cars in a single day. We also provide virtual car inspection through video calls, making us the most convenient used car buying platform in India.',
      keywords: 'home test drive, doorstep test drive, virtual car inspection, used car test drive, luxury car experience',
      icon: "Star" as const
    },
    {
      id: 5,
      category: 'Car Exchange & Trade-in',
      question: 'How does your car exchange and trade-in process work?',
      answer: 'Get instant car valuation online in 30 seconds using our AI-powered tool. Our certified appraisers provide the best market price for your old car. We handle all documentation, RC transfer, and payment within 24 hours. You can trade-in any car regardless of brand, age, or condition. Our trade-in values are typically 15-20% higher than other platforms, ensuring maximum value for your old vehicle.',
      keywords: 'instant car valuation, car exchange, trade-in value, sell car online, best price for old car, car appraisal',
      icon: "CheckCircle" as const
    },
    {
      id: 6,
      category: 'Documentation & Legal',
      question: 'What documents and legal processes are involved in buying used cars?',
      answer: 'EPIC Reassured handles complete documentation including RC transfer, insurance transfer, NOC clearance, loan closure, and legal verification. All our cars have clear titles with no hypothecation or legal issues. We provide digital documentation, ensuring hassle-free ownership transfer within 7 days. Our legal team verifies every document, providing 100% genuine and legal used car purchases.',
      keywords: 'RC transfer, car documentation, legal verification, clear title, insurance transfer, hypothecation clearance',
      icon: "Shield" as const
    },
    {
      id: 7,
      category: 'Pricing & Value',
      question: 'How competitive are EPIC Reassured prices compared to Cars24, Spinny, and OLX?',
      answer: 'We guarantee the most competitive prices in the market with our Best Price Promise. Our transparent pricing includes all costs with no hidden charges. We regularly benchmark against Cars24, Spinny, CarDekho, and other platforms to ensure 10-15% better value. Additionally, we offer price protection for 30 days and seasonal discounts up to ₹2 lakhs on luxury pre-owned cars.',
      keywords: 'best used car prices, competitive pricing, transparent pricing, no hidden charges, price comparison, discount offers',
      icon: "Award" as const
    },
    {
      id: 8,
      category: 'Return & Exchange Policy',
      question: 'What is your return and exchange policy for used cars?',
      answer: 'We offer a 7-day money-back guarantee on all certified pre-owned cars. If you are not completely satisfied, return the car for a full refund with no questions asked. We also provide a 30-day exchange policy where you can exchange your car for another model. This industry-leading return policy demonstrates our confidence in car quality and customer satisfaction.',
      keywords: 'money-back guarantee, return policy, exchange policy, customer satisfaction, risk-free purchase',
      icon: "Clock" as const
    }
  ];

  // Structured Data for FAQ SEO
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Additional SEO structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "EPIC Reassured - Best Used Cars in India",
    "description": "India's most trusted platform for certified pre-owned luxury cars. Better than Cars24, Spinny with best prices, warranty, and doorstep service across major cities.",
    "url": "https://epicreassured.com",
    "sameAs": [
      "https://www.facebook.com/epicreassured",
      "https://www.instagram.com/epicreassured",
      "https://www.youtube.com/epicreassured"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana", 
      "addressCountry": "IN"
    },
    "areaServed": ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata"],
    "makesOffered": ["Mercedes-Benz", "BMW", "Audi", "Porsche", "Jaguar", "Land Rover", "Volvo", "Lexus"],
    "priceRange": "₹₹₹₹",
    "aggregateRating": {
      "@type": "AggregateRating", 
      "ratingValue": "4.9",
      "reviewCount": "3247"
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      
      <section 
        className="bg-white py-16 px-4"
        itemScope 
        itemType="https://schema.org/FAQPage"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        <div className="max-w-4xl mx-auto">
          {/* SEO-Rich Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
              Frequently Asked Questions
            </h1>
            <h2 className="text-xl font-light text-gray-700 mb-6">
              Everything You Need to Know About Buying Certified Pre-Owned Luxury Cars
            </h2>
            <p className="text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Get answers to the most common questions about our certified pre-owned cars, financing options, 
              warranty coverage, and why EPIC Reassured is India&apos;s most trusted alternative to Cars24, Spinny, 
              and other used car platforms.
            </p>
            <div className="w-16 h-0.5 bg-gray-900 mx-auto mt-6"></div>
          </header>

          {/* Category Navigation */}
          <nav className="mb-12" aria-label="FAQ Categories">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Quality & Inspection', 'Financing & Loans', 'Documentation & Legal', 'Return & Exchange Policy'].map((category, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-light border border-gray-200 hover:bg-gray-200 transition-colors duration-300"
                >
                  {category}
                </span>
              ))}
            </div>
          </nav>

          {/* FAQ Client Component */}
          <FAQClient faqs={faqs} />

          {/* Additional SEO Content */}
          <aside className="mt-16 bg-gray-50 border border-gray-200 p-8">
            <h3 className="text-2xl font-light text-gray-900 mb-6 text-center">
              Why Choose EPIC Reassured Over Cars24 and Spinny?
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Superior Quality Assurance
                </h4>
                <p className="text-gray-700 font-light text-sm leading-relaxed">
                  Our 200-point inspection process and certified technicians ensure every pre-owned luxury car 
                  meets the highest quality standards, providing better assurance than other platforms.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Best-in-Class Warranty
                </h4>
                <p className="text-gray-700 font-light text-sm leading-relaxed">
                  Up to 2 years comprehensive warranty with roadside assistance across India, 
                  surpassing industry standards and competitor offerings.
                </p>
              </div>
            </div>
          </aside>

          {/* SEO Keywords Section (Hidden) */}
          <div className="sr-only">
            <h3>Used Cars Keywords</h3>
            <p>
              best used cars India, certified pre-owned cars, luxury used cars, used car dealer, 
              pre-owned car warranty, used car financing, car loan interest rates, doorstep car delivery, 
              home test drive, instant car valuation, sell car online, car exchange, trade-in value, 
              used car documentation, RC transfer, car inspection report, Cars24 alternative, 
              Spinny competitor, OLX cars, CarDekho used cars, used Mercedes BMW Audi, 
              pre-owned luxury cars Mumbai Delhi Bangalore, certified used cars Hyderabad Chennai Pune
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;