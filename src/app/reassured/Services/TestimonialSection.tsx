
'use client';
import React from 'react';
import { Star } from 'lucide-react';

type TestimonialProps = {
  testimonials: Array<{
    name: string;
    role: string;
    content: string;
    rating: number;
    image: string;
  }>;
};

const TestimonialSection = ({ testimonials }: TestimonialProps) => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
            Client Testimonials
          </h2>
          <div className="w-24 h-0.5 bg-black mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Join thousands of satisfied luxury car enthusiasts who trust Epic Luxe.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-white border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-black fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed font-light">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center">
                <div className="text-2xl mr-4">{testimonial.image}</div>
                <div>
                  <div className="text-black font-medium">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;