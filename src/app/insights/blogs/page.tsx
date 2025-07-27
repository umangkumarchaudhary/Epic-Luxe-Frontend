'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Share2, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Heart,
  MessageCircle,
  Play,
  ArrowUp,
  Menu,
  X,
  Car,
  Gauge,
  Fuel,
  Settings
} from 'lucide-react';

const LuxuryBlogPost = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  // Scroll and intersection observer effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    // Intersection Observer for section animations and active TOC
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-80px 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('[id^="section-"], #intro, #models, #analysis, #buying, #conclusion');
    sections.forEach(section => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // Smooth section navigation with fade transition
  const navigateToSection = (sectionId) => {
    setIsTransitioning(true);
    setShowTableOfContents(false);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
  };

  const blogData = {
    title: "The Ultimate Guide to Investing in Pre-Owned Luxury Vehicles",
    subtitle: "Porsche 911 Market Analysis",
    slug: "porsche-911-investment-guide-2025",
    shortDescription: "Discover why the Porsche 911 remains the crown jewel of luxury car investments, with expert insights on market trends and buying strategies.",
    // High-quality Porsche 911 image
    coverImage: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=600&fit=crop&crop=center",
    author: {
      name: "James Wellington",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      bio: "Senior Automotive Investment Advisor"
    },
    publishDate: "March 15, 2025",
    readTime: "8 min read",
    tags: ["Porsche", "Investment", "Luxury Cars", "Market Analysis"],
    isPinned: true
  };

  const tableOfContents = [
    { id: 'intro', title: 'Market Overview' },
    { id: 'models', title: 'Top Investment Models' },
    { id: 'analysis', title: 'Price Analysis' },
    { id: 'buying', title: 'Buying Strategy' },
    { id: 'conclusion', title: 'Investment Outlook' }
  ];

  const relatedPosts = [
    {
      title: "BMW M Series: Performance Meets Investment Value",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop",
      readTime: "6 min",
      tag: "BMW"
    },
    {
      title: "Ferrari Market Trends: What Collectors Need to Know",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop",
      readTime: "10 min",
      tag: "Ferrari"
    },
    {
      title: "Luxury Car Financing: Expert Tips for High-Value Purchases",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=200&fit=crop",
      readTime: "5 min",
      tag: "Finance"
    }
  ];

  return (
    <>
      {/* Enhanced Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        .blog-font {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .blog-heading {
          font-family: 'Playfair Display', serif;
        }

        /* Smooth transitions */
        .fade-transition {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .blackout-transition {
          position: relative;
          overflow: hidden;
        }

        .blackout-transition::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.8), transparent);
          transition: left 0.6s ease-in-out;
          z-index: 1;
        }

        .blackout-transition.transitioning::before {
          left: 100%;
        }

        /* Section animations */
        .section-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .section-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Improved mobile TOC */
        .mobile-toc {
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-toc.open {
          transform: translateX(0);
        }

        /* Glassmorphism enhancement */
        .glass-light {
          background: rgba(26, 26, 26, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.1);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Menu button animation */
        .menu-button {
          position: relative;
          overflow: hidden;
        }

        .menu-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(212, 175, 55, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
        }

        .menu-button:hover::before {
          width: 100%;
          height: 100%;
        }

        /* Enhanced quote styling */
        .luxury-quote {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(191, 169, 128, 0.05) 100%);
          border: 1px solid rgba(212, 175, 55, 0.15);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        /* Porsche icon for scroll button */
        .porsche-scroll {
          background: linear-gradient(135deg, #D4AF37 0%, #BFA980 100%);
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#151515] to-[#0a0a0a] blog-font">
        
        {/* Enhanced Sticky Navigation */}
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-md shadow-2xl border-b border-[#D4AF37]/20' 
            : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-lg flex items-center justify-center shadow-lg">
                  <Car className="h-5 w-5 text-black" />
                </div>
                <span className="font-light text-xl text-white/95 blog-heading">LuxeCars</span>
              </div>
              
              {/* Enhanced mobile menu button */}
              <button 
                onClick={() => setShowTableOfContents(!showTableOfContents)}
                className="lg:hidden menu-button p-3 rounded-xl hover:bg-[#D4AF37]/10 text-[#D4AF37] transition-all duration-300 relative z-10"
              >
                <div className={`transform transition-transform duration-300 ${showTableOfContents ? 'rotate-180' : ''}`}>
                  {showTableOfContents ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Hero Section */}
        <div className="relative h-[70vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105"
            style={{ backgroundImage: `url(${blogData.coverImage})` }}
          >
            {/* Lighter, more refined overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/65"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
          </div>
          
          {/* Floating badge */}
          {blogData.isPinned && (
            <div className="absolute top-28 left-6 glass-light px-4 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
              <span className="text-[#D4AF37]">✨</span>
              <span className="text-white/90 ml-2">Featured Article</span>
            </div>
          )}

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-4xl section-animate visible">
              <div className="flex items-center space-x-3 mb-6">
                {blogData.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="glass-light text-white/80 px-3 py-1.5 rounded-full text-sm font-light shadow-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white/98 mb-4 leading-tight blog-heading">
                {blogData.title}
              </h1>
              
              <h2 className="text-xl md:text-2xl font-light text-[#D4AF37] mb-8 blog-heading">
                {blogData.subtitle}
              </h2>
              
              <p className="text-lg text-white/80 mb-10 max-w-2xl leading-relaxed font-light">
                {blogData.shortDescription}
              </p>

              {/* Enhanced author info */}
              <div className="flex items-center space-x-6 text-white/85">
                <div className="flex items-center space-x-3">
                  <img 
                    src={blogData.author.avatar} 
                    alt={blogData.author.name}
                    className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 shadow-md"
                  />
                  <div>
                    <p className="font-medium">{blogData.author.name}</p>
                    <p className="text-sm text-white/60">{blogData.author.bio}</p>
                  </div>
                </div>
                
                <div className="hidden sm:flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-[#BFA980]" />
                    <span>{blogData.publishDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-[#BFA980]" />
                    <span>{blogData.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 -mt-20 relative z-20">
            
            {/* Enhanced Table of Contents */}
            <div className="lg:col-span-1">
              {/* Mobile TOC Overlay */}
              {showTableOfContents && (
                <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" 
                     onClick={() => setShowTableOfContents(false)} />
              )}
              
              <div className={`sticky top-24 transition-all duration-300 lg:block ${
                showTableOfContents 
                  ? 'fixed top-20 left-4 right-4 z-50 lg:relative lg:top-24 lg:left-auto lg:right-auto'
                  : 'hidden'
              }`}>
                <div className="glass-light rounded-2xl p-6 shadow-xl">
                  <h3 className="font-medium text-lg text-white/95 mb-6 blog-heading">Table of Contents</h3>
                  <nav className="space-y-1">
                    {tableOfContents.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => navigateToSection(item.id)}
                        className={`w-full text-left py-3 px-4 rounded-xl text-sm transition-all duration-300 font-light ${
                          activeSection === item.id
                            ? 'bg-gradient-to-r from-[#D4AF37]/15 to-[#BFA980]/15 text-[#D4AF37] border-l-3 border-[#D4AF37] shadow-md' 
                            : 'text-white/70 hover:bg-white/5 hover:text-white/90'
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </nav>

                  {/* Enhanced social share */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-sm font-medium text-white/85 mb-4">Share Article</p>
                    <div className="flex space-x-3">
                      {[Share2, MessageCircle, Heart].map((Icon, index) => (
                        <button 
                          key={index}
                          className="p-3 glass-light text-[#D4AF37] rounded-xl hover:bg-[#D4AF37]/10 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                        >
                          <Icon className="h-4 w-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Main Content */}
            <div className="lg:col-span-3">
              <article className={`glass-light rounded-2xl p-8 md:p-12 shadow-xl blackout-transition ${
                isTransitioning ? 'transitioning' : ''
              }`}>
                
                {/* Mobile meta info */}
                <div className="sm:hidden flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-center space-x-2 text-sm text-white/70">
                    <Calendar className="h-4 w-4" />
                    <span>{blogData.publishDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-white/70">
                    <Clock className="h-4 w-4" />
                    <span>{blogData.readTime}</span>
                  </div>
                </div>

                {/* Article sections with animations */}
                <div className="prose prose-lg max-w-none">
                  <div 
                    id="intro" 
                    className={`mb-12 section-animate ${visibleSections.has('intro') ? 'visible' : ''}`}
                  >
                    <h2 className="text-3xl font-light text-white/95 mb-6 blog-heading">Market Overview: Why Porsche 911?</h2>
                    <p className="text-lg text-white/80 leading-relaxed mb-6 font-light">
                      The Porsche 911 has consistently proven to be one of the most reliable investments in the luxury automotive market. 
                      With its iconic design, engineering excellence, and strong brand heritage, the 911 continues to appreciate in value 
                      while providing an unmatched driving experience.
                    </p>
                    
                    {/* Enhanced quote box */}
                    <blockquote className="luxury-quote rounded-2xl p-8 my-10 backdrop-blur-md">
                      <p className="text-xl italic text-white/90 mb-4 font-light leading-relaxed">
                        "In the past five years, well-maintained Porsche 911s have shown an average appreciation of 15-25% annually, 
                        outperforming many traditional investment vehicles."
                      </p>
                      <footer className="text-sm text-white/70 font-medium">— LuxeCars Market Research Team</footer>
                    </blockquote>
                  </div>

                  {/* Enhanced car specs */}
                  <div 
                    className={`glass-light rounded-2xl p-8 my-10 shadow-lg section-animate ${
                      visibleSections.has('intro') ? 'visible' : ''
                    }`}
                  >
                    <h3 className="font-medium text-xl text-white/95 mb-6 flex items-center blog-heading">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-lg flex items-center justify-center mr-3">
                        <Car className="h-4 w-4 text-black" />
                      </div>
                      Featured Model: 2019 Porsche 911 Carrera S
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { icon: Gauge, label: 'Engine', value: '3.0L Twin-Turbo' },
                        { icon: Settings, label: 'Power', value: '443 HP' },
                        { icon: Fuel, label: '0-60 mph', value: '3.5 seconds' },
                        { icon: Car, label: 'Est. Value', value: '$145,000', highlight: true }
                      ].map((spec, index) => (
                        <div key={index} className="text-center">
                          <spec.icon className="h-7 w-7 mx-auto mb-3 text-[#BFA980]" />
                          <p className="text-sm text-white/70 mb-1">{spec.label}</p>
                          <p className={`font-medium ${spec.highlight ? 'text-[#D4AF37]' : 'text-white/90'}`}>
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div 
                    id="models" 
                    className={`mb-12 section-animate ${visibleSections.has('models') ? 'visible' : ''}`}
                  >
                    <h2 className="text-3xl font-light text-white/95 mb-6 blog-heading">Top Investment Models</h2>
                    <p className="text-lg text-white/80 leading-relaxed mb-6 font-light">
                      When considering a Porsche 911 as an investment, certain models stand out for their appreciation potential, 
                      rarity, and collector appeal. Here's our curated list of the most promising investment opportunities.
                    </p>
                  </div>

                  {/* Enhanced image gallery */}
                  <div className={`my-12 grid grid-cols-1 md:grid-cols-2 gap-8 section-animate ${
                    visibleSections.has('models') ? 'visible' : ''
                  }`}>
                    {[
                      { 
                        src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=350&fit=crop",
                        title: "2022 Porsche 911 GT3",
                        subtitle: "Track-focused excellence"
                      },
                      { 
                        src: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=500&h=350&fit=crop",
                        title: "2021 Porsche 911 Turbo S",
                        subtitle: "Ultimate performance flagship"
                      }
                    ].map((image, index) => (
                      <div key={index} className="relative group cursor-pointer">
                        <div className="glass-light rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                          <img 
                            src={image.src}
                            alt={image.title}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl flex items-center justify-center">
                            <Play className="h-16 w-16 text-[#D4AF37] drop-shadow-lg" />
                          </div>
                        </div>
                        <div className="mt-4 text-center">
                          <h4 className="font-medium text-white/90 mb-1">{image.title}</h4>
                          <p className="text-sm text-white/60">{image.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div 
                    id="analysis" 
                    className={`mb-12 section-animate ${visibleSections.has('analysis') ? 'visible' : ''}`}
                  >
                    <h2 className="text-3xl font-light text-white/95 mb-6 blog-heading">Market Price Analysis</h2>
                    <p className="text-lg text-white/80 leading-relaxed font-light">
                      Our comprehensive market analysis reveals fascinating trends in Porsche 911 valuations across different model years and variants.
                      The data shows consistent growth patterns that make these vehicles exceptional investment opportunities.
                    </p>
                  </div>

                  <div className="my-16 border-t border-white/10"></div>

                  <div 
                    id="buying" 
                    className={`mb-12 section-animate ${visibleSections.has('buying') ? 'visible' : ''}`}
                  >
                    <h2 className="text-3xl font-light text-white/95 mb-6 blog-heading">Strategic Buying Approach</h2>
                    <p className="text-lg text-white/80 leading-relaxed font-light">
                      Successful luxury car investment requires a strategic approach that goes beyond simply purchasing the most expensive model available.
                    </p>
                  </div>
                </div>

                {/* Enhanced CTA */}
                <div className={`luxury-quote rounded-2xl p-10 my-12 text-center section-animate ${
                  visibleSections.has('buying') ? 'visible' : ''
                }`}>
                  <h3 className="text-2xl font-light text-white/95 mb-4 blog-heading">Ready to Invest in Your Dream Porsche?</h3>
                  <p className="text-lg mb-8 text-white/80 font-light max-w-2xl mx-auto">
                    Our expert team can help you find the perfect investment-grade Porsche 911 that matches your portfolio goals.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-4 rounded-full font-medium hover:from-[#BFA980] hover:to-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                      Book Consultation
                    </button>
                    <button className="glass-light border border-[#D4AF37]/40 text-[#D4AF37] px-8 py-4 rounded-full font-medium hover:bg-[#D4AF37]/10 transition-all duration-300">
                      View Available Inventory
                    </button>
                  </div>
                </div>

                {/* Enhanced tags */}
                <div className="mb-8">
                  <h4 className="font-medium text-white/95 mb-4">Related Topics</h4>
                  <div className="flex flex-wrap gap-3">
                    {blogData.tags.map((tag, index) => (
                      <button 
                        key={index}
                        className="glass-light hover:bg-[#D4AF37]/10 text-white/80 hover:text-[#D4AF37] px-4 py-2 rounded-full text-sm transition-all duration-300 border border-white/10 hover:border-[#D4AF37]/30 shadow-md hover:shadow-lg"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </article>

              {/* Enhanced related posts */}
              <div className="mt-16">
                <h3 className="text-3xl font-light text-white/95 mb-8 blog-heading">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((post, index) => (
                    <article key={index} className="glass-light rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 group cursor-pointer">
                      <div className="relative">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="glass-light text-white/85 px-3 py-1 rounded-full text-sm font-light shadow-md">
                            {post.tag}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-medium text-lg text-white/95 mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center justify-between text-sm text-white/70">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </span>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-[#BFA980]" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Enhanced comments section */}
              <div className="mt-16">
                <div className="glass-light rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-light text-white/95 mb-6 blog-heading">Join the Discussion</h3>
                  <div className="text-center py-12 border-2 border-dashed border-white/20 rounded-xl">
                    <MessageCircle className="h-16 w-16 mx-auto text-[#BFA980] mb-4" />
                    <p className="text-white/70 mb-2 font-light">Comments feature coming soon</p>
                    <p className="text-sm text-white/50">Share your thoughts on luxury car investments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced scroll to top with Porsche styling */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-8 right-8 porsche-scroll text-black p-4 rounded-full shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-500 transform ${
            isScrolled 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
          }`}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </>
  );
};

export default LuxuryBlogPost;
