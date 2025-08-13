'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search, Filter, Shield, Award, Star, CheckCircle, Clock, CreditCard  } from 'lucide-react';
const iconMap = { Shield, Award, Star, CheckCircle, Clock, CreditCard };

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  keywords: string;
  icon: keyof typeof iconMap; // ✅
}



interface FAQClientProps {
  faqs: FAQ[];
}

const FAQClient = ({ faqs }: FAQClientProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(faqs.map(faq => faq.category))];
    return cats;
  }, [faqs]);

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = searchTerm === '' || 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.keywords.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [faqs, searchTerm, selectedCategory]);

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex(current => current === index ? null : index);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setOpenIndex(null); // Close any open FAQ when searching
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setOpenIndex(null); // Close any open FAQ when changing category
  }, []);

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search FAQs about used cars, financing, warranty..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all duration-300 text-sm font-light"
            aria-label="Search frequently asked questions"
          />
        </div>
        
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full pl-10 pr-8 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all duration-300 text-sm font-light appearance-none bg-white"
            aria-label="Filter by category"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      {(searchTerm || selectedCategory !== 'All') && (
        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredFAQs.length} of {faqs.length} questions
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = iconMap[faq.icon];

            
            return (
              <article
                key={faq.id}
                className="border border-gray-200 hover:border-gray-300 transition-colors duration-300"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-colors duration-300"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-question-${faq.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 border border-gray-300 flex items-center justify-center mt-1">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 font-light mb-2 uppercase tracking-wider">
                          {faq.category}
                        </div>
                        <h3 
                          className="text-lg font-medium text-gray-900 leading-tight pr-4"
                          itemProp="name"
                        >
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </div>
                </button>
                
                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <div className="px-6 pb-6 pl-18">
                    <div className="bg-gray-50 border border-gray-200 p-6">
                      <p 
                        className="text-gray-700 leading-relaxed font-light"
                        itemProp="text"
                      >
                        {faq.answer}
                      </p>
                      
                      {/* Hidden keywords for SEO */}
                      <meta itemProp="keywords" content={faq.keywords} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="text-center py-12 bg-gray-50 border border-gray-200">
            <div className="text-gray-500 mb-2">
              <Search className="w-8 h-8 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs Found</h3>
            <p className="text-gray-600 font-light">
              Try adjusting your search terms or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-12 bg-gray-50 border border-gray-200 p-8 text-center">
        <h3 className="text-xl font-medium text-gray-900 mb-4">
          Still Have Questions?
        </h3>
        <p className="text-gray-600 font-light mb-6 max-w-2xl mx-auto">
          Our certified car experts are available 24/7 to help you find the perfect 
          pre-owned luxury car and answer any questions about financing, warranty, or our services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+919876543210"
            className="px-6 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors duration-300 text-sm"
          >
            Call Now: +91 98765 43210
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300 text-sm"
          >
            WhatsApp Support
          </a>
          <a
            href="/contact"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium hover:border-gray-900 hover:text-gray-900 transition-colors duration-300 text-sm"
          >
            Contact Form
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQClient;