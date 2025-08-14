import React from 'react';
import { 
  Instagram, 
  Youtube, 
  Linkedin, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Phone, 
  Star,
  Shield,
  Award
} from 'lucide-react';
import FooterClient from './FooterClient';

const Footer = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "EPIC Reassured - Premium Used Cars",
    "description": "India's most trusted destination for certified pre-owned luxury cars including Mercedes-Benz, BMW, Audi, Porsche, Jaguar and Land Rover",
    "url": "https://epicreassured.com",
    "logo": "https://epicreassured.com/logo.png",
    "image": "https://epicreassured.com/showroom.jpg",
    "telephone": "+91-98765-43210",
    "email": "info@epicreassured.com",
    "priceRange": "₹₹₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "Auto Loan"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Road No. 12, Banjara Hills",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500034",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4126",
      "longitude": "78.4071"
    },
    "areaServed": [
      "Hyderabad", "Bangalore", "Mumbai", "Delhi", "Chennai", "Pune", 
      "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Kochi", "Indore"
    ],
    "makesOffered": [
      "Mercedes-Benz", "BMW", "Audi", "Porsche", "Jaguar", "Land Rover", 
      "Volvo", "Lexus", "Infiniti", "Cadillac"
    ],
    "openingHours": "Mo-Su 10:00-20:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2847",
      "bestRating": "5"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-98765-43210",
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi", "Telugu", "Tamil"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-98765-43211",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      }
    ],
    "sameAs": [
      "https://www.instagram.com/epicreassured",
      "https://www.youtube.com/epicreassured",
      "https://www.linkedin.com/company/epicreassured",
      "https://www.facebook.com/epicreassured"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Certified Pre-Owned Luxury Cars",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Car",
            "name": "Certified Pre-Owned Mercedes-Benz",
            "brand": "Mercedes-Benz"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Car", 
            "name": "Certified Pre-Owned BMW",
            "brand": "BMW"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Car",
            "name": "Certified Pre-Owned Audi", 
            "brand": "Audi"
          }
        }
      ]
    },
    "knowsAbout": [
      "Luxury Car Sales", "Pre-owned Car Certification", "Auto Financing",
      "Car Valuation", "Trade-in Services", "Extended Warranty", 
      "Car Insurance", "Vehicle History Reports"
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://epicreassured.com"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Used Cars",
        "item": "https://epicreassured.com/inventory"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Luxury Cars",
        "item": "https://epicreassured.com/luxury-cars"
      }
    ]
  };

  const services = [
    { name: 'Premium Pre-Owned Cars', href: '/inventory', keywords: 'luxury used cars, certified pre-owned' },
    { name: 'Sell Your Car', href: '/services/sell-car', keywords: 'sell car online, car valuation' },
    { name: 'Instant Valuation', href: '/services/valuation', keywords: 'car price estimation, instant valuation' },
    { name: 'Trade-In Service', href: '/services/trade-in', keywords: 'car exchange, trade-in value' },
    { name: 'Car Finance', href: '/services/finance', keywords: 'car loan, auto financing' },
    { name: 'Insurance', href: '/services/insurance', keywords: 'car insurance, vehicle insurance' }
  ];

  const company = [
    { name: 'About Us', href: '/about', keywords: 'luxury car dealer, company profile' },
    { name: 'Customer Reviews', href: '/testimonials', keywords: 'customer testimonials, reviews' },
    { name: 'Insights & Blogs', href: '/blog', keywords: 'car buying guides, automotive news' },
    { name: 'Careers', href: '/careers', keywords: 'automotive jobs, car dealer careers' },
    { name: 'Press & Media', href: '/press', keywords: 'company news, media coverage' }
  ];

  const support = [
    { name: 'Contact Us', href: '/contact', keywords: 'customer support, dealership contact' },
    { name: 'WhatsApp Support', href: 'https://wa.me/919876543210', keywords: 'instant support, whatsapp' },
    { name: 'Privacy Policy', href: '/privacy', keywords: 'data protection, privacy policy' },
    { name: 'Terms of Service', href: '/terms', keywords: 'terms and conditions, service agreement' }
  ];

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <footer className="bg-white border-t border-gray-100" itemScope itemType="https://schema.org/AutoDealer">
        {/* Trust Banner */}
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Star className="w-5 h-5 text-gray-900 fill-current" />
                  <span className="font-light text-sm">4.9/5 Customer Rating</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Shield className="w-5 h-5 text-gray-900" />
                  <span className="font-light text-sm">Certified Pre-Owned</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Award className="w-5 h-5 text-gray-900" />
                  <span className="font-light text-sm">10+ Years Excellence</span>
                </div>
              </div>
              <div className="text-sm text-gray-600 font-light">
                Trusted by <span className="font-medium text-gray-900">5000+</span> luxury car owners across India
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                {/* Logo */}
                <div className="mb-8" itemProp="name">
                  <h2 className="text-3xl font-light text-gray-900 mb-2 tracking-wide">
                    EPIC <span className="font-medium">Reassured</span>
                  </h2>
                  <p className="text-gray-600 text-sm font-light italic leading-relaxed">
                    Where Premium Meets Trust
                  </p>
                </div>
                
                <div className="mb-8" itemProp="description">
                  <p className="text-gray-700 text-sm leading-relaxed font-light">
                    India&apos;s most trusted destination for certified luxury pre-owned cars. 
                    Experience unmatched quality, transparent pricing, and exceptional service.
                  </p>
                </div>
                
                {/* Social Media Icons */}
                <div className="flex space-x-3">
                  {[
                    { Icon: Instagram, href: 'https://www.instagram.com/epicreassured', label: 'Instagram', name: '@epicreassured' },
                    { Icon: Youtube, href: 'https://www.youtube.com/epicreassured', label: 'YouTube', name: 'EPIC Reassured' },
                    { Icon: Linkedin, href: 'https://www.linkedin.com/company/epicreassured', label: 'LinkedIn', name: 'Company Profile' },
                    { Icon: MessageCircle, href: 'https://wa.me/919876543210', label: 'WhatsApp', name: '+91 98765 43210' }
                  ].map(({ Icon, href, label, name }, index) => (
                    <a
                      key={index}
                      href={href}
                      aria-label={`${label} - ${name}`}
                      className="w-10 h-10 border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Menus */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Services */}
              <nav>
                <h3 className="text-lg font-medium text-gray-900 mb-6 relative">
                  Our Services
                  <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gray-900 mt-2"></div>
                </h3>
                <ul className="space-y-4" itemScope itemType="https://schema.org/ItemList">
                  {services.map((service, index) => (
                    <li key={index} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                      <a
                        href={service.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm font-light block py-1"
                        itemProp="url"
                      >
                        <span itemProp="name">{service.name}</span>
                      </a>
                      <meta itemProp="keywords" content={service.keywords} />
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Company */}
              <nav>
                <h3 className="text-lg font-medium text-gray-900 mb-6 relative">
                  Company
                  <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gray-900 mt-2"></div>
                </h3>
                <ul className="space-y-4">
                  {company.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm font-light block py-1"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Support */}
              <nav>
                <h3 className="text-lg font-medium text-gray-900 mb-6 relative">
                  Support
                  <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gray-900 mt-2"></div>
                </h3>
                <ul className="space-y-4">
                  {support.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm font-light block py-1"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Newsletter & Contact */}
            <div className="lg:col-span-1">
              <FooterClient />
              
              {/* Showroom Location */}
              <div className="bg-gray-50 border border-gray-200 p-6 mt-8" itemScope itemType="https://schema.org/Place">
                <h4 className="text-gray-900 font-medium mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Flagship Showroom
                </h4>
                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <p className="text-gray-700 text-sm font-light leading-relaxed">
                    <span itemProp="streetAddress">Road No. 12, Banjara Hills</span><br />
                    <span itemProp="addressLocality">Hyderabad</span>, <span itemProp="addressRegion">Telangana</span> <span itemProp="postalCode">500034</span><br />
                    <span className="text-gray-900 font-medium">Open: 10 AM - 8 PM (All Days)</span>
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-700" itemProp="telephone">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="font-light">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700" itemProp="email">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="font-light">info@epicreassured.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
              <div className="font-light mb-4 md:mb-0">
                © 2025 EPIC Reassured. All rights reserved. | GST: 36XXXXX1234X1Z5
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 font-light">
                <span>Luxury Car Dealer License: DL-2024-LUX-001</span>
                <span className="hidden md:inline">|</span>
                <span>ISO 9001:2015 Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Keywords (Hidden) */}
        <div className="sr-only">
          <meta name="keywords" content="luxury used cars India, certified pre-owned Mercedes BMW Audi, premium car dealer Hyderabad, luxury car showroom Banjara Hills, used car financing, car trade-in services, luxury car insurance, certified pre-owned warranty, premium car valuation, luxury car dealership India" />
          <p>
            EPIC Reassured - Premier destination for luxury used cars in India. Certified pre-owned Mercedes-Benz, BMW, Audi, Porsche, Jaguar, Land Rover. 
            Located in Banjara Hills, Hyderabad. Services: Car buying, selling, trade-in, financing, insurance, instant valuation. 
            Serving Mumbai, Delhi, Bangalore, Chennai, Pune, Kolkata. Trusted by 5000+ customers. 4.9-star rating. 
            10+ years experience in luxury automotive sales.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;