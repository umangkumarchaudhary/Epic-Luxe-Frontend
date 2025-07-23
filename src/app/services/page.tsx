'use client';

import React, { ReactNode, ButtonHTMLAttributes, HTMLAttributes } from 'react';
import {
  Car, Shield, Award, Crown, DollarSign, Zap, TrendingUp, Eye, ArrowRightLeft,
  Clock, Target, Calculator, Gauge, Diamond, CreditCard, Rocket, Star, Sparkles
} from '../icons'; // Ensure icons.tsx exists with all these exports

// Card Props Definitions
interface BaseCardProps { className?: string; }
interface CardProps extends BaseCardProps { children: ReactNode; }
type CardHeaderProps = BaseCardProps & HTMLAttributes<HTMLDivElement> & { children: ReactNode };
type CardTitleProps = BaseCardProps & HTMLAttributes<HTMLHeadingElement> & { children: ReactNode };
type CardDescriptionProps = BaseCardProps & HTMLAttributes<HTMLParagraphElement> & { children: ReactNode };
type CardContentProps = BaseCardProps & HTMLAttributes<HTMLDivElement> & { children: ReactNode };

// Button Props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'lg';
  variant?: 'default' | 'secondary' | 'outline';
}

// Cards
const Card: React.FC<CardProps & HTMLAttributes<HTMLDivElement>> = ({
  children, className = "", ...props
}) => (
  <div className={`rounded-xl border border-gray-800 bg-black/60 backdrop-blur-lg text-white shadow-2xl ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader: React.FC<CardHeaderProps> = ({
  children, className = "", ...props
}) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle: React.FC<CardTitleProps> = ({
  children, className = "", ...props
}) => (
  <h3 className={`text-xl font-bold leading-none tracking-tight text-white ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription: React.FC<CardDescriptionProps> = ({
  children, className = "", ...props
}) => (
  <p className={`text-sm text-gray-400 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

const CardContent: React.FC<CardContentProps> = ({
  children, className = "", ...props
}) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Button
const Button: React.FC<ButtonProps> = ({
  children, className = "", size = "default", variant = "default", ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:pointer-events-none hover:scale-105";
  const sizeClasses = { default: "h-11 px-6", lg: "h-12 px-8 text-lg" };
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-500 shadow-lg hover:shadow-blue-500/25",
    secondary: "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700",
    outline: "border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
  };

  return (
    <button className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Service Definitions
interface ServiceFeature {
  name: string;
  icon: React.ReactNode;
}
interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: ServiceFeature[];
  ctaText: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Buy Pre-Owned Cars",
    description: "Luxury certified vehicles",
    icon: <Car className="w-12 h-12 text-blue-400" />,
    features: [
      { name: "Certified Quality", icon: <Shield className="w-4 h-4 text-blue-400" /> },
      { name: "Warranty Included", icon: <Award className="w-4 h-4 text-blue-400" /> },
      { name: "Premium Selection", icon: <Crown className="w-4 h-4 text-blue-400" /> }
    ],
    ctaText: "Browse Inventory"
  },
  {
    id: 2,
    title: "Sell Your Car",
    description: "Best value guaranteed",
    icon: <DollarSign className="w-12 h-12 text-blue-400" />,
    features: [
      { name: "Quick Process", icon: <Zap className="w-4 h-4 text-blue-400" /> },
      { name: "Fair Pricing", icon: <TrendingUp className="w-4 h-4 text-blue-400" /> },
      { name: "Expert Evaluation", icon: <Eye className="w-4 h-4 text-blue-400" /> }
    ],
    ctaText: "Get Quote"
  },
  {
    id: 3,
    title: "Trade-In Service",
    description: "Seamless upgrade process",
    icon: <ArrowRightLeft className="w-12 h-12 text-blue-400" />,
    features: [
      { name: "Instant Evaluation", icon: <Clock className="w-4 h-4 text-blue-400" /> },
      { name: "Seamless Process", icon: <Zap className="w-4 h-4 text-blue-400" /> },
      { name: "Value Maximization", icon: <Target className="w-4 h-4 text-blue-400" /> }
    ],
    ctaText: "Trade Now"
  },
  {
    id: 4,
    title: "Car Valuation",
    description: "Professional assessment service",
    icon: <Calculator className="w-12 h-12 text-blue-400" />,
    features: [
      { name: "Market Analysis", icon: <Gauge className="w-4 h-4 text-blue-400" /> },
      { name: "Instant Results", icon: <Zap className="w-4 h-4 text-blue-400" /> },
      { name: "Professional Assessment", icon: <Diamond className="w-4 h-4 text-blue-400" /> }
    ],
    ctaText: "Get Valuation"
  },
  {
    id: 5,
    title: "Finance Solutions",
    description: "Flexible payment options",
    icon: <CreditCard className="w-12 h-12 text-blue-400" />,
    features: [
      { name: "Competitive Rates", icon: <TrendingUp className="w-4 h-4 text-blue-400" /> },
      { name: "Quick Approval", icon: <Rocket className="w-4 h-4 text-blue-400" /> },
      { name: "Flexible Terms", icon: <Target className="w-4 h-4 text-blue-400" /> }
    ],
    ctaText: "Apply Now"
  },
  {
    id: 6,
    title: "New Car Sales",
    description: "Latest luxury models",
    icon: <Star className="w-12 h-12 text-blue-400" />,
    features: [
      { name: "Latest Models", icon: <Sparkles className="w-4 h-4 text-blue-400" /> },
      { name: "Exclusive Deals", icon: <Diamond className="w-4 h-4 text-blue-400" /> },
      { name: "Premium Service", icon: <Crown className="w-4 h-4 text-blue-400" /> }
    ],
    ctaText: "View New Cars"
  }
];

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent">
            Premium Services
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-400">
            Luxury automotive solutions with professional excellence
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16 bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gray-900 rounded-xl group-hover:bg-gray-800 transition-colors border border-gray-800 group-hover:border-blue-500/50">
                  {service.icon}
                </div>
                <CardTitle className="mb-3 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-500">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-300 hover:text-white transition-colors">
                      <div className="mr-3 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <span className="text-sm font-medium">{feature.name}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full group-hover:bg-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                  {service.ctaText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-400">
            Contact our specialists for personalized service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" className="bg-blue-600 hover:bg-blue-500">
              Contact Us Today
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 hover:border-blue-500 hover:text-blue-400">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
