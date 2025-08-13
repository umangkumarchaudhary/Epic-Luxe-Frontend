// Faq.tsx
'use client';

import React, { useState } from 'react';

const COLORS = {
  gold: '#D4AF37',
  black: '#000000',
  white: '#FFFFFF',
  grayText: '#CCCCCC',
  grayBg: '#121212',
};

const faqs = [
  {
    question: 'Are pre-owned cars thoroughly inspected?',
    answer:
      'Yes, all our pre-owned vehicles undergo a comprehensive multi-point inspection to ensure safety, quality, and reliability before listing.',
  },
  {
    question: 'Can I get a warranty on pre-owned cars?',
    answer:
      'Many of our pre-owned vehicles come with a limited warranty or extended service plans. Please check individual vehicle details or contact us for more information.',
  },
  {
    question: 'What financing options are available for pre-owned cars?',
    answer:
      'We offer flexible financing options tailored to your needs, including low-interest loans and easy monthly installments.',
  },
  {
    question: 'Can I schedule a test drive for a pre-owned vehicle?',
    answer:
      'Absolutely! You can schedule a test drive online or by contacting our sales team directly.',
  },
  {
    question: 'Do you accept trade-ins towards a pre-owned purchase?',
    answer:
      'Yes, trade-ins are welcome. Our team will provide a competitive appraisal for your current vehicle.',
  },
  {
    question: 'What is the return policy for pre-owned cars?',
    answer:
      'Please refer to our detailed return and exchange policy available on our website or consult with our sales representatives for specific vehicles.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      aria-label="Frequently Asked Questions"
      className="w-full px-0 m-0"
      style={{ backgroundColor: COLORS.black }}
    >
      <h2
        className="text-3xl font-bold mb-6 px-8 pt-8"
        style={{
          color: COLORS.gold,
          fontFamily: "'Montserrat', 'Roboto', Arial, sans-serif",
          width: '100%',
        }}
      >
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-gray-700 w-full px-8 pb-12">
        {faqs.map((faq, index) => (
          <div key={index} className="py-4 w-full">
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left flex justify-between items-center focus:outline-none"
              aria-expanded={openIndex === index}
              aria-controls={`faq-panel-${index}`}
              id={`faq-title-${index}`}
              style={{
                color: COLORS.white,
                fontWeight: 600,
                fontSize: '1.125rem',
                fontFamily: "'Montserrat', 'Roboto', Arial, sans-serif",
                width: '100%',
              }}
            >
              {faq.question}
              <span
                className="ml-4 transform transition-transform duration-300"
                style={{
                  color: COLORS.gold,
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  userSelect: 'none',
                }}
              >
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-title-${index}`}
              className={`mt-2 overflow-hidden transition-max-height duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
              style={{
                color: COLORS.grayText,
                fontSize: '0.95rem',
                fontFamily: "'Montserrat', 'Roboto', Arial, sans-serif",
                width: '100%',
              }}
            >
              <p className="pt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
