'use client';
import React, { useState } from 'react';
import {
  Shield,
  Zap,
  RotateCcw,
  MessageCircle,
  Puzzle,
  Car,
  Phone,
  Star,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

const InsurancePage = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const insurancePartners = [
    { name: 'Acko', logo: '/api/placeholder/120/60' },
    { name: 'Digit', logo: '/api/placeholder/120/60' },
    { name: 'HDFC Ergo', logo: '/api/placeholder/120/60' },
    { name: 'ICICI Lombard', logo: '/api/placeholder/120/60' },
    { name: 'Tata AIG', logo: '/api/placeholder/120/60' },
    { name: 'Bajaj Allianz', logo: '/api/placeholder/120/60' },
  ];

  const luxuryBrands = [
    'Mercedes-Benz',
    'BMW',
    'Audi',
    'Volvo',
    'Jaguar',
    'Land Rover',
    'Porsche',
    'Lexus',
    'Bentley',
    'Maserati',
  ];

  const testimonials = [
    {
      name: 'Rajesh Sharma',
      car: '2019 Mercedes S-Class',
      rating: 5,
      text: 'Epic Luxe got me comprehensive coverage for my S-Class at 30% less cost. Outstanding service!',
      avatar: '/api/placeholder/60/60',
    },
    {
      name: 'Priya Gupta',
      car: '2020 BMW X7',
      rating: 5,
      text: 'Zero depreciation on my 4-year-old BMW was impossible to find elsewhere. Highly recommended!',
      avatar: '/api/placeholder/60/60',
    },
    {
      name: 'Vikram Singh',
      car: '2018 Porsche Cayenne',
      rating: 5,
      text: 'Professional team, instant quotes, and tailored coverage for luxury cars. Perfect experience!',
      avatar: '/api/placeholder/60/60',
    },
  ];

  const faqs = [
    {
      question: 'Do I need different insurance for a used luxury car?',
      answer:
        'Yes, luxury cars require specialized coverage due to higher repair costs, premium parts, and advanced technology. Our plans are specifically designed for high-end vehicles with appropriate IDV and comprehensive add-ons.',
    },
    {
      question: 'Can I get zero depreciation on a 5-year-old Mercedes?',
      answer:
        'Absolutely! We offer zero depreciation coverage for luxury cars up to 7 years old, depending on the insurer and vehicle condition. Our partners specialize in premium vehicle coverage.',
    },
    {
      question: 'Can I renew a lapsed policy here?',
      answer:
        'Yes, we can help renew lapsed policies. However, a fresh inspection might be required, and there could be a waiting period for certain coverages. Contact our experts for personalized assistance.',
    },
    {
      question: 'What makes Epic Luxe insurance different?',
      answer:
        'We specialize in luxury and premium vehicles, offer tailored coverage options, have partnerships with top insurers, provide concierge-level service, and understand the unique needs of high-end car owners.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e] text-white">
      {/* Hero Banner */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#D4AF37]/5"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#D4AF37]/30 rounded-full blur-2xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse"></div>
              <Shield className="w-12 h-12 text-[#D4AF37] animate-pulse" />
              <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white/90 font-headline">
              Insure Your <span className="text-[#D4AF37]">Dream Drive</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 font-clean mb-8 max-w-3xl mx-auto">
              Get tailored protection for your premium pre-owned car &mdash; in minutes
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 font-button">
                <Sparkles className="w-5 h-5" />
                Get Instant Quote
              </button>

              <button className="bg-white/10 backdrop-blur-sm border-2 border-[#D4AF37]/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 flex items-center gap-3 font-button">
                <RotateCcw className="w-5 h-5" />
                Renew Existing Policy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Quote Checker */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90 font-headline">
              Get Your Quote in <span className="text-[#D4AF37]">60 Seconds</span>
            </h2>
            <p className="text-xl text-white/70 font-clean">Smart pricing for luxury vehicles</p>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-3xl p-8 border border-[#D4AF37]/20 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-[#D4AF37] font-semibold mb-2 font-subheading">Registration Number</label>
                <input
                  type="text"
                  placeholder="e.g., MH01AB1234"
                  className="w-full bg-black/30 border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-[#D4AF37] font-semibold mb-2 font-subheading">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-black/30 border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
                >
                  <option value="">Select Brand</option>
                  {luxuryBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#D4AF37] font-semibold mb-2 font-subheading">Fuel Type</label>
                <select className="w-full bg-black/30 border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-300">
                  <option value="">Select Fuel</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                </select>
              </div>

              <div>
                <label className="block text-[#D4AF37] font-semibold mb-2 font-subheading">City</label>
                <select className="w-full bg-black/30 border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-300">
                  <option value="">Select City</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="pune">Pune</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105 font-button">
                Compare Quotes Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Epic Luxe Insurance */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90 font-headline">
              Why Choose <span className="text-[#D4AF37]">Epic Luxe Insurance</span>
            </h2>
            <p className="text-xl text-white/70 font-clean">
              Premium protection for premium vehicles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Tailored for Luxury Cars',
                subtitle: 'Plans designed for high-end vehicle protection',
              },
              {
                icon: Zap,
                title: 'Instant Paperless Quotes',
                subtitle: 'No paperwork, instant digital approval',
              },
              {
                icon: RotateCcw,
                title: 'Hassle-Free Renewals',
                subtitle: 'Renew within 60 seconds',
              },
              {
                icon: MessageCircle,
                title: 'Concierge Support',
                subtitle: 'Talk to real experts anytime',
              },
              {
                icon: Puzzle,
                title: 'Add-On Covers',
                subtitle: 'Zero Depreciation, Tyre Protect, Engine Cover',
              },
              {
                icon: Car,
                title: 'Premium Claims Service',
                subtitle: 'Dedicated luxury car claim specialists',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-500 group hover:transform hover:scale-105"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-[#D4AF37] mb-3 font-subheading">{item.title}</h3>
                <p className="text-white/70 font-clean">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Partners */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90 font-headline">
              Compare Top <span className="text-[#D4AF37]">Insurance Partners</span>
            </h2>
            <p className="text-xl text-white/70 font-clean">Compare quotes from leading providers in one click</p>
          </div>
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-3xl p-8 border border-[#D4AF37]/20 transition-all duration-1000 delay-200 opacity-100 translate-y-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {insurancePartners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                >
                  <div className="h-12 flex items-center justify-center">
                    <span className="text-white/80 font-semibold text-lg font-clean">{partner.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Unique Add-On Packages */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90 font-headline">
              Exclusive <span className="text-[#D4AF37]">Add-On Packages</span>
            </h2>
            <p className="text-xl text-white/70 font-clean">
              Specialized coverage for luxury vehicles
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Return to Invoice',
                description: 'Get 100% car value on total loss',
                price: '₹8,500/year',
                popular: true,
              },
              {
                title: 'Tyre & Rim Protection',
                description: 'Complete wheel damage coverage',
                price: '₹3,200/year',
                popular: false,
              },
              {
                title: 'Key Loss Cover',
                description: 'Smart key replacement & programming',
                price: '₹2,800/year',
                popular: false,
              },
              {
                title: 'Engine & Gearbox Cover',
                description: 'Comprehensive powertrain protection',
                price: '₹12,500/year',
                popular: true,
              },
            ].map((addon, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl p-6 border transition-all duration-500 hover:transform hover:scale-105 ${
                  addon.popular
                    ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                    : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                } opacity-100 translate-y-0`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {addon.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-4 py-1 rounded-full text-sm font-bold font-button">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#D4AF37] mb-3 font-subheading">{addon.title}</h3>
                  <p className="text-white/70 font-clean mb-4">{addon.description}</p>
                  <div className="text-2xl font-bold text-white mb-4 font-headline">{addon.price}</div>
                  <button className="w-full bg-white/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-white py-2 rounded-lg transition-all duration-300 font-button">
                    Add to Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90 font-headline">
              <span className="text-[#D4AF37]">500+</span> Luxury Car Owners Trust Us
            </h2>
            <p className="text-xl text-white/70 font-clean">Hear from our satisfied customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-500 opacity-100 translate-y-0`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center text-black font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold font-subheading">{testimonial.name}</h4>
                    <p className="text-[#D4AF37] text-sm font-clean">{testimonial.car}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-current" />
                  ))}
                </div>

                <p className="text-white/70 font-clean italic">
  &quot;{testimonial.text}&quot;
</p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90 font-headline">
              Frequently Asked <span className="text-[#D4AF37]">Questions</span>
            </h2>
            <p className="text-xl text-white/70 font-clean">Everything you need to know about luxury car insurance</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-xl border border-[#D4AF37]/20 overflow-hidden transition-all duration-500 opacity-100 translate-y-0`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === index ? null : index)
                  }
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
                  aria-expanded={activeAccordion === index}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-header-${index}`}
                >
                  <span className="text-lg font-semibold text-white font-subheading">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 ${
                      activeAccordion === index ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-header-${index}`}
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    activeAccordion === index ? 'max-h-96 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-white/70 font-clean">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-[#D4AF37]/10 border-2 border-[#D4AF37]/30 rounded-3xl p-12 text-center backdrop-blur-sm opacity-100 translate-y-0">
            <h3 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4 font-headline">
              Stay Updated on Best Protection Plans
            </h3>
            <p className="text-xl text-white/70 font-clean mb-8">
              Get exclusive offers, tips, and updates tailored for luxury car owners
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-black/30 border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105 font-button">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1a1a1a] via-[#0e0e0e] to-[#1a1a1a] border-t border-[#D4AF37]/20 p-4 md:hidden z-50">
        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black py-3 rounded-lg font-bold text-sm font-button flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Get Quote
          </button>
          <button className="flex-1 bg-white/10 border border-[#D4AF37]/30 text-white py-3 rounded-lg font-bold text-sm font-button flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            Call Expert
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsurancePage;
