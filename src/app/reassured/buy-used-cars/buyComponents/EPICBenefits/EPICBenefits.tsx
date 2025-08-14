// EpicReassuredBenefits.tsx - Server Component (SEO-Friendly)
import React from 'react';
import { Shield, Truck, Award, RefreshCw, FileText, CheckCircle, Wrench, HeartHandshake } from 'lucide-react';
import EpicReassuredBenefitsClient from './EPICBenefitsClient';

export interface Benefit {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  seoKeywords: string[];
  detailedDescription?: string;
}

export const metadata = {
  title: 'Epic Reassured Benefits - Certified Pre-Owned Luxury Cars | Quality Guaranteed',
  description: 'Experience unmatched peace of mind with our Epic Reassured Benefits program. 360-point inspection, certified pre-owned warranty, doorstep delivery, easy financing, and hassle-free ownership transfer for luxury cars.',
  keywords: 'certified pre-owned luxury cars, used car warranty, luxury car inspection, pre-owned Mercedes-Benz benefits, BMW certified used, Audi pre-owned warranty, doorstep car delivery, RC transfer service, trade-in luxury cars, used car financing',
};

// Enhanced benefits with SEO-focused content
const benefits: Benefit[] = [
  {
    id: 1,
    icon: <Shield className="w-8 h-8" />,
    title: "360° Quality Certification",
    description: "Every vehicle undergoes rigorous 360-point inspection by certified technicians",
    seoKeywords: ["certified pre-owned", "360-point inspection", "quality assurance", "vehicle inspection"],
    detailedDescription: "Our comprehensive 360-point inspection covers engine performance, transmission, suspension, electrical systems, body condition, and interior quality. Only vehicles meeting Mercedes-Benz, BMW, and Audi standards receive our certification."
  },
  {
    id: 2,
    icon: <Truck className="w-8 h-8" />,
    title: "White-Glove Delivery",
    description: "Complimentary doorstep delivery & test drives across 50+ cities pan-India",
    seoKeywords: ["doorstep delivery", "home delivery", "test drive", "pan-India delivery"],
    detailedDescription: "Experience luxury from the moment you inquire. We bring your chosen vehicle to your doorstep for inspection and test drives. Available in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, and 45+ other cities."
  },
  {
    id: 3,
    icon: <Award className="w-8 h-8" />,
    title: "Comprehensive Warranty",
    description: "12-month warranty covering engine, transmission & critical components",
    seoKeywords: ["used car warranty", "extended warranty", "powertrain warranty", "certified warranty"],
    detailedDescription: "Our industry-leading warranty covers major mechanical and electrical components for 12 months or 15,000 km. Includes engine, transmission, differential, air conditioning, and electronics."
  },
  {
    id: 4,
    icon: <RefreshCw className="w-8 h-8" />,
    title: "Premium Exchange Program",
    description: "Best-in-class valuation for your current vehicle with instant payment",
    seoKeywords: ["car exchange", "trade-in", "vehicle exchange", "upgrade program"],
    detailedDescription: "Upgrade to your dream luxury car seamlessly. Get transparent valuation, instant payment, and doorstep pickup for your existing vehicle. Special exchange bonuses on Mercedes-Benz, BMW, and Audi models."
  },
  {
    id: 5,
    icon: <FileText className="w-8 h-8" />,
    title: "Complete Documentation",
    description: "End-to-end RC transfer, insurance & loan assistance within 30 days",
    seoKeywords: ["RC transfer", "ownership transfer", "car documentation", "RTO services"],
    detailedDescription: "We handle all paperwork including RC transfer, insurance transfer, NOC procurement, and state registration. Dedicated relationship manager ensures hassle-free ownership transfer."
  },
  {
    id: 6,
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Verified Service History",
    description: "Complete maintenance records from authorized service centers",
    seoKeywords: ["service history", "maintenance records", "authorized service", "vehicle history"],
    detailedDescription: "Every vehicle comes with complete service history verified from brand-authorized service centers. Access to digital service records and previous ownership details."
  },
  {
    id: 7,
    icon: <Wrench className="w-8 h-8" />,
    title: "After-Sales Support",
    description: "24/7 roadside assistance & preferred service appointments",
    seoKeywords: ["roadside assistance", "after-sales service", "customer support", "24/7 support"],
    detailedDescription: "Enjoy peace of mind with round-the-clock roadside assistance, priority service bookings at authorized centers, and dedicated customer support for all your queries."
  },
  {
    id: 8,
    icon: <HeartHandshake className="w-8 h-8" />,
    title: "7-Day Return Policy",
    description: "Not satisfied? Return within 7 days for full refund (T&C apply)",
    seoKeywords: ["return policy", "money-back guarantee", "satisfaction guarantee", "7-day return"],
    detailedDescription: "We're confident in our quality. If you're not completely satisfied, return the vehicle within 7 days or 300 km for a full refund. No questions asked (subject to vehicle condition)."
  }
];

const EpicReassuredBenefits: React.FC = () => {
  return (
    <>
      {/* SEO-Optimized Content for Search Engines */}
      <div className="sr-only">
        <h1>Epic Reassured Benefits - Your Trust, Our Commitment</h1>
        
        <section>
          <h2>Why Choose Our Certified Pre-Owned Luxury Cars?</h2>
          <p>
            When you purchase a certified pre-owned luxury vehicle from us, you&apos;re not just buying a car – 
            you&apos;re investing in peace of mind. Our Epic Reassured Benefits program sets the gold standard 
            for pre-owned luxury car purchases in India, offering comprehensive protection and services that 
            rival new car ownership experiences.
          </p>
        </section>

        <section>
          <h2>Our 8 Epic Reassured Benefits Explained</h2>
          {benefits.map(benefit => (
            <article key={benefit.id}>
              <h3>{benefit.title}</h3>
              <p>{benefit.detailedDescription}</p>
              <p>Keywords: {benefit.seoKeywords.join(', ')}</p>
            </article>
          ))}
        </section>

        <section>
          <h2>Certified Pre-Owned Luxury Brands We Offer</h2>
          <ul>
            <li>Mercedes-Benz Certified Pre-Owned - S-Class, E-Class, C-Class, GLE, GLC, GLA</li>
            <li>BMW Premium Selection - 7 Series, 5 Series, 3 Series, X7, X5, X3, X1</li>
            <li>Audi Approved Plus - A8, A6, A4, Q7, Q5, Q3, RS, S-Line models</li>
            <li>Jaguar Approved - XF, XE, F-Pace, E-Pace, F-Type</li>
            <li>Land Rover Approved - Range Rover, Range Rover Sport, Discovery, Defender</li>
            <li>Porsche Approved - Cayenne, Macan, Panamera, 911, 718</li>
            <li>Volvo Selekt - XC90, XC60, XC40, S90, V90</li>
            <li>Lexus L-Certified - ES, NX, RX, LX Series</li>
          </ul>
        </section>

        <section>
          <h2>Our Quality Assurance Process</h2>
          <ol>
            <li>Initial Assessment - Vehicle age, mileage, and ownership verification</li>
            <li>360-Point Technical Inspection - Comprehensive mechanical and electrical check</li>
            <li>Road Test - Performance evaluation by certified technicians</li>
            <li>Service History Verification - Authentication from brand service centers</li>
            <li>Body & Paint Inspection - Quality check for accidents and repairs</li>
            <li>Interior Detailing - Deep cleaning and sanitization</li>
            <li>Certification - Final approval and warranty activation</li>
            <li>Documentation - Complete paperwork and ownership verification</li>
          </ol>
        </section>

        <section>
          <h2>Customer Testimonials and Trust Indicators</h2>
          <p>
            Join 10,000+ satisfied customers who have experienced the difference of buying certified 
            pre-owned luxury cars with Epic Reassured Benefits. With a 4.8/5 customer satisfaction rating 
            and 95% customer retention rate, we&apos;re India&apos;s most trusted pre-owned luxury car platform.
          </p>
        </section>

        <section>
          <h2>Frequently Asked Questions</h2>
          <dl>
            <dt>What is covered under the 360-point inspection?</dt>
            <dd>Our inspection covers engine, transmission, suspension, brakes, electrical systems, air conditioning, body condition, paint quality, interior condition, and all safety features.</dd>
            
            <dt>How does the warranty work?</dt>
            <dd>Our 12-month warranty covers major mechanical and electrical components. Claims can be made at any authorized service center across India.</dd>
            
            <dt>Is financing available?</dt>
            <dd>Yes, we offer competitive financing options with interest rates starting from 7.5% through our banking partners including HDFC, ICICI, and Axis Bank.</dd>
            
            <dt>Can I return the car if I'm not satisfied?</dt>
            <dd>Yes, we offer a 7-day/300km return policy. If you&apos;re not satisfied, return the vehicle for a full refund (subject to vehicle condition).</dd>
          </dl>
        </section>
      </div>

      {/* Client Component for Interactive Features */}
      <EpicReassuredBenefitsClient benefits={benefits} />
    </>
  );
};

export default EpicReassuredBenefits;