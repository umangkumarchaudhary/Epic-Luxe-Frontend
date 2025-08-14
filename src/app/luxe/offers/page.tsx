'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Clock, 
  Star, 
  ArrowRight, 
  Gift, 
  Crown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Shield,
  Zap
} from 'lucide-react';

// Types
interface Offer {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  validUntil: string;
  category: string;
  isExclusive: boolean;
  features: string[];
  image: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

// Mock data
const offers: Offer[] = [
  {
    id: '1',
    title: 'Premium Membership',
    description: 'Access to all premium features and exclusive content for a full year.',
    originalPrice: 299,
    discountedPrice: 199,
    discount: 33,
    validUntil: '2024-12-31',
    category: 'Membership',
    isExclusive: true,
    features: ['Unlimited access', 'Priority support', 'Exclusive content', 'Ad-free experience'],
    image: '/api/placeholder/400/300'
  },
  {
    id: '2',
    title: 'Business Suite',
    description: 'Complete business solution with advanced analytics and team collaboration.',
    originalPrice: 599,
    discountedPrice: 399,
    discount: 33,
    validUntil: '2024-11-30',
    category: 'Business',
    isExclusive: false,
    features: ['Team collaboration', 'Advanced analytics', 'Custom integrations', '24/7 support'],
    image: '/api/placeholder/400/300'
  },
  {
    id: '3',
    title: 'Creator Pro',
    description: 'Perfect for content creators with advanced editing tools and templates.',
    originalPrice: 199,
    discountedPrice: 99,
    discount: 50,
    validUntil: '2024-10-15',
    category: 'Creative',
    isExclusive: true,
    features: ['Advanced editing', 'Premium templates', 'Cloud storage', 'Export options'],
    image: '/api/placeholder/400/300'
  }
];

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Digital Marketing Director',
    content: 'The premium features have transformed how we handle our campaigns. Absolutely worth every penny.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Creative Director',
    content: 'As a creator, these tools have elevated my work to a professional level I never thought possible.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  },
  {
    id: '3',
    name: 'Emily Johnson',
    role: 'Business Owner',
    content: 'The business suite has streamlined our operations and improved team productivity significantly.',
    rating: 5,
    avatar: '/api/placeholder/60/60'
  }
];

const categories = ['All', 'Membership', 'Business', 'Creative'];

export default function LuxeOffersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>(offers);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const testimonialTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter offers based on category
  const filterOffers = useCallback((category: string) => {
    if (category === 'All') {
      setFilteredOffers(offers);
    } else {
      setFilteredOffers(offers.filter(offer => offer.category === category));
    }
  }, []);

  // Auto-rotate testimonials
  const rotateTestimonials = useCallback(() => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    filterOffers(selectedCategory);
  }, [selectedCategory, filterOffers]);

  useEffect(() => {
    testimonialTimerRef.current = setInterval(rotateTestimonials, 5000);
    return () => {
      if (testimonialTimerRef.current) {
        clearInterval(testimonialTimerRef.current);
      }
    };
  }, [rotateTestimonials]);

  // Calculate days remaining
  const getDaysRemaining = (dateString: string): number => {
    const today = new Date();
    const endDate = new Date(dateString);
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTestimonialChange = (direction: 'prev' | 'next') => {
    if (testimonialTimerRef.current) {
      clearInterval(testimonialTimerRef.current);
    }
    
    if (direction === 'next') {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    } else {
      setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
    }
    
    testimonialTimerRef.current = setInterval(rotateTestimonials, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden px-6 py-20 lg:px-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-3xl" />
        <div className="relative mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-6 py-3 text-purple-300"
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">Exclusive Offers</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 text-5xl font-bold text-white lg:text-7xl"
          >
            Luxe
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {' '}Offers
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-10 max-w-2xl text-xl text-gray-300"
          >
            Unlock premium experiences with our exclusive offers. Limited time deals crafted for discerning customers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-sm">Money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-sm">Instant activation</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="text-sm">24/7 support</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Category Filter */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-6 py-8 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Offers Grid */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredOffers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10"
                >
                  {offer.isExclusive && (
                    <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-medium text-white">
                      <Crown className="h-3 w-3" />
                      Exclusive
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
                        {offer.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {getDaysRemaining(offer.validUntil)} days left
                        </span>
                      </div>
                    </div>

                    <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {offer.title}
                    </h3>
                    
                    <p className="mb-6 text-gray-300 leading-relaxed">
                      {offer.description}
                    </p>

                    <div className="mb-6 space-y-2">
                      {offer.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="h-2 w-2 rounded-full bg-purple-400" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-white">
                          ${offer.discountedPrice}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          ${offer.originalPrice}
                        </span>
                        <span className="rounded-full bg-green-500/20 px-2 py-1 text-sm font-medium text-green-300">
                          {offer.discount}% OFF
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Valid until {new Date(offer.validUntil).toLocaleDateString()}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 font-semibold text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                      <Gift className="h-5 w-5" />
                      Claim Offer
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4 lg:text-4xl">
              What Our Customers Say
            </h2>
            <p className="text-gray-300 text-lg">
              Join thousands of satisfied customers who have unlocked premium experiences
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-8 text-center"
              >
                <div className="mb-6 flex justify-center">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <blockquote className="mb-6 text-xl text-gray-300 leading-relaxed">
                  &ldquo;{testimonials[currentTestimonial].content}&rdquo;
                </blockquote>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                    {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-400">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={() => handleTestimonialChange('prev')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={() => handleTestimonialChange('next')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentTestimonial === index
                      ? 'bg-purple-400 w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 py-16 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 p-12">
            <Calendar className="h-16 w-16 mx-auto mb-6 text-purple-400" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Don&apos;t Miss Out
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              These exclusive offers won&apos;t last forever. Join our premium community today and unlock the full potential of luxury experiences.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <Sparkles className="h-6 w-6" />
              Explore All Offers
              <ArrowRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}