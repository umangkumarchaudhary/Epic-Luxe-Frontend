'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import AboutStickyNav from '@/components/StickyFooter/AboutStickyNav';

import { 
  Star, 
  Award, 
  Shield, 
  Heart, 
  Leaf, 
  CheckCircle, 
  Settings, 
  Crown, 
  Users, 
  MapPin,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Play,
  Quote
} from 'lucide-react';

// TypeScript interfaces
interface VisibilityState {
  [key: number]: boolean;
}

interface MousePosition {
  x: number;
  y: number;
}

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

interface Value {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

interface TeamMember {
  name: string;
  role: string;
  motto: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const AboutUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [activeTimeline, setActiveTimeline] = useState<number>(0);
  
  // Timeline animation states
  const [isLineVisible, setIsLineVisible] = useState<boolean>(false);
  const [visibleMilestones, setVisibleMilestones] = useState<number[]>([]);
  const [lineProgress, setLineProgress] = useState<number>(0);
  const timelineRef = useRef<HTMLElement>(null);

  // Typewriter animation states
  const [typewriterText1, setTypewriterText1] = useState<string>('');
  const [typewriterText2, setTypewriterText2] = useState<string>('');
  const [showCursor1, setShowCursor1] = useState<boolean>(true);
  const [showCursor2, setShowCursor2] = useState<boolean>(false);
  const [startTypewriter, setStartTypewriter] = useState<boolean>(false);

  // Slider states
  const [currentFeature, setCurrentFeature] = useState<number>(0);
  const [currentMilestone, setCurrentMilestone] = useState<number>(0);
  const [currentTeamMember, setCurrentTeamMember] = useState<number>(0);
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

  const text1: string = "Reimagining Pre-Owned Luxury with Purpose, Passion, and Precision.";
  const text2: string = "Powered by Raam Group, Epic Luxe curates premium pre-owned luxury vehicles with unmatched quality, trust, and elegance.";

  // Typewriter effect
  useEffect(() => {
    if (!startTypewriter) return;

    let timeout1: NodeJS.Timeout | null = null;
    let timeout2: NodeJS.Timeout | null = null;
    let index1 = 0;
    let index2 = 0;

    // First paragraph typewriter
    const typeText1 = (): void => {
      if (index1 < text1.length) {
        setTypewriterText1(text1.slice(0, index1 + 1));
        index1++;
        timeout1 = setTimeout(typeText1, 50);
      } else {
        setShowCursor1(false);
      }
    };

    // Second paragraph typewriter
    const typeText2 = (): void => {
      if (index2 < text2.length) {
        setTypewriterText2(text2.slice(0, index2 + 1));
        index2++;
        timeout2 = setTimeout(typeText2, 40);
      } else {
        setShowCursor2(false);
      }
    };

    setShowCursor1(true);
    setShowCursor2(true);
    typeText1();
    typeText2();

    return () => {
      if (timeout1) clearTimeout(timeout1);
      if (timeout2) clearTimeout(timeout2);
    };
  }, [startTypewriter, text1, text2]);

  // Auto-rotate sliders
  useEffect(() => {
    const intervals = [
      setInterval(() => setCurrentFeature(prev => (prev + 1) % features.length), 4000),
      setInterval(() => setCurrentMilestone(prev => (prev + 1) % milestones.length), 5000),
      setInterval(() => setCurrentTeamMember(prev => (prev + 1) % team.length), 6000),
      setInterval(() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length), 7000),
    ];

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = (): void => {
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        setIsVisible(prev => ({ ...prev, [index]: isInView }));
        
        if (index === 0 && isInView && !startTypewriter) {
          setTimeout(() => setStartTypewriter(true), 1000);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startTypewriter]);

  const [scrolledPastHero, setScrolledPastHero] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolledPastHero(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timeline animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLineVisible(true);
            
            let progress = 0;
            const lineAnimation = setInterval(() => {
              progress += 2;
              setLineProgress(progress);
              if (progress >= 100) {
                clearInterval(lineAnimation);
              }
            }, 30);

            milestones.forEach((_, index) => {
              setTimeout(() => {
                setVisibleMilestones(prev => [...prev, index]);
              }, 800 + index * 300);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  const features = [
    { title: 'Handpicked Cars', icon: '🚗', desc: 'Every car, personally curated.' },
    { title: '175+ Checks', icon: '✔️', desc: 'Beyond industry standards.' },
    { title: 'Concierge Services', icon: '🎩', desc: 'Your wish. Our priority.' },
    { title: 'Transparent Financing', icon: '💰', desc: 'No hidden costs, ever.' },
    { title: 'Celebrity Trusted', icon: '⭐', desc: 'Preferred by visionaries.' },
  ];

  const milestones: Milestone[] = [
    { year: '2015', title: 'Inception', desc: 'Founded with a vision to redefine luxury car ownership' },
    { year: '2017', title: '1000+ Luxury Cars Sold', desc: 'Achieved major milestone in premium automotive sales' },
    { year: '2020', title: 'Multi-city Expansion', desc: 'Expanded operations across major Indian metros' },
    { year: '2023', title: 'National Recognition', desc: 'Awarded Best Luxury Pre-owned Car Dealer' },
    { year: '2025', title: 'Digital Showroom Launch', desc: 'Revolutionary virtual showroom experience' }
  ];

  const values: Value[] = [
    { icon: Shield, title: 'Integrity', desc: 'Transparent processes, honest dealings, authentic experiences' },
    { icon: Award, title: 'Excellence', desc: 'Uncompromising quality in every vehicle and service' },
    { icon: Star, title: 'Innovation', desc: 'Pioneering new standards in luxury automotive retail' },
    { icon: Heart, title: 'Customer Delight', desc: 'Creating extraordinary moments for every client' },
    { icon: Leaf, title: 'Sustainability', desc: 'Promoting sustainable luxury through pre-owned excellence' }
  ];

  const team: TeamMember[] = [
    { name: 'CEO', role: 'Founder & CEO', motto: 'Luxury isn&apos;t a product — it&apos;s an emotion' },
    { name: 'HO', role: 'Head of Operations', motto: 'Excellence in every detail' },
    { name: 'CED', role: 'Customer Experience Director', motto: 'Creating unforgettable journeys' },
    { name: 'QAH', role: 'Quality Assurance Head', motto: 'Perfection is our standard' }
  ];

  const testimonials: Testimonial[] = [
    { name: 'Allu Arjun', role: 'Business Tycoon', text: 'Epic Luxe delivered beyond expectations. True luxury service.', rating: 5 },
    { name: 'Ananya Pandey', role: 'Celebrity', text: 'Impeccable quality and unmatched professionalism.', rating: 5 },
    { name: 'Rohit Sharma', role: 'Tech Executive', text: 'The entire experience was seamless and luxurious.', rating: 5 }
  ];

  return (
    <div className="bg-[#0e0e0e] text-white overflow-hidden font-clean">
      <Header />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-[#D4AF37]/10 to-transparent rounded-full blur-3xl transition-all duration-500"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-[#BFA980]/5 to-transparent rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-radial from-[#D4AF37]/8 to-transparent rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[140px]">
        <div
          className="absolute inset-0 animate-ken-burns"
          style={{
            backgroundImage: "url('/assets/images/mclaren1.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/90 via-[#0e0e0e]/80 to-[#1a1a1a]/90 z-10" />

        <div className="absolute inset-0 opacity-30 z-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent transform -skew-x-12 animate-shimmer" />
        </div>

        <div className="relative z-30 text-center max-w-6xl mx-auto px-4">
          <div
            data-animate
            className={`transition-all duration-1000 ${
              isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#D4AF37] via-white to-[#BFA980] bg-clip-text text-transparent tracking-wide font-headline">
              Where Luxury Meets Legacy
            </h1>
            
            <div className="relative mb-6">
              <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed font-medium font-clean min-h-[60px] flex items-center justify-center">
                <span className="relative">
                  {typewriterText1}
                  {showCursor1 && (
                    <span className="inline-block w-0.5 h-5 bg-[#D4AF37] ml-1 animate-pulse" />
                  )}
                </span>
              </p>
            </div>
          </div>

          <div
            data-animate
            className={`transition-all duration-1000 delay-300 ${
              isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-2xl md:text-4xl font-semibold text-[#D4AF37] mb-3 font-subheading">About Epic Luxe</h2>
            
            <div className="relative mb-8">
              <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-3xl mx-auto px-2 font-clean min-h-[80px] flex items-center justify-center">
                <span className="relative">
                  {typewriterText2}
                  {showCursor2 && (
                    <span className="inline-block w-0.5 h-4 bg-[#D4AF37] ml-1 animate-pulse" />
                  )}
                </span>
              </p>
            </div>
          </div>

          {/* Enhanced Feature Cards - Desktop Grid, Mobile Slider */}
          <div className="mt-4">
            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-5 gap-4 px-2">
              {features.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#0e0e0e]/70 border border-[#D4AF37]/30 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-[0_0_12px_#D4AF37] transition-all duration-300 backdrop-blur-md transform hover:scale-105"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="text-white/90 text-sm font-semibold mb-1 font-subheading">{item.title}</h3>
                  <p className="text-white/60 text-xs font-clean">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Mobile Slider */}
            <div className="md:hidden relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentFeature * 100}%)` }}
                >
                  {features.map((item, i) => (
                    <div
                      key={i}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="bg-[#0e0e0e]/70 border border-[#D4AF37]/30 rounded-xl p-6 flex flex-col items-center text-center backdrop-blur-md mx-auto max-w-xs">
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="text-white/90 text-lg font-semibold mb-2 font-subheading">{item.title}</h3>
                        <p className="text-white/60 text-sm font-clean">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mobile Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {features.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentFeature ? 'bg-[#D4AF37] scale-125' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are - Brand Story */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              data-animate
              className={`transition-all duration-1000 delay-200 ${
                isVisible[1] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <h2 className="text-5xl font-bold mb-8 text-white/90 font-headline">Who We Are</h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-white/70 font-clean">
                  Founded with an unwavering commitment to excellence,{' '}
                  <span className="text-[#D4AF37] font-semibold">Epic Luxe</span> has redefined
                  the luxury pre-owned automotive landscape in India.
                </p>
                <p className="text-white/70 font-clean">
                  Our <span className="text-[#D4AF37] font-semibold">mission</span> is to make
                  premium vehicles accessible without compromise, ensuring every client experiences
                  the pinnacle of automotive luxury.
                </p>
                <p className="text-white/70 font-clean">
                  Our <span className="text-[#D4AF37] font-semibold">vision</span> is to become
                  India&apos;s most admired luxury automotive curator, setting new benchmarks for
                  trust, quality, and service excellence.
                </p>
              </div>
            </div>

            <div
              data-animate
              className={`transition-all duration-1000 delay-400 ${
                isVisible[1] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/20 aspect-video">
                <div className="absolute inset-0 w-full h-full">
                  <div className="w-full h-full relative">
                    {[
                      '/assets/images/ShowroomInsideImage.jpg',
                      '/assets/images/ShowroomInside2.avif',
                      '/assets/images/ShowroomInside3.avif',
                      '/assets/images/ShowroomInside4.avif',
                    ].map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Showroom ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 animate-fade-zoom-loop"
                        style={{
                          animationDelay: `${index * 3}s`,
                          zIndex: 10 - index,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Horizontal Timeline */}
      <section ref={timelineRef} className="relative py-16 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#151515]">
        <div className="max-w-7xl mx-auto">
          
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isLineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-white/95 font-headline">
              Our Group Journey
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-light font-clean">
              Milestones that define our legacy of excellence
            </p>
          </div>

          {/* Desktop Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="flex justify-between items-center mb-8">
                <div className="w-full h-1 bg-white/10 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full transition-all duration-2000 ease-out"
                    style={{ width: isLineVisible ? '100%' : '0%' }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-4">
                {milestones.map((milestone, index) => {
                  const isMilestoneVisible = visibleMilestones.includes(index);
                  
                  return (
                    <div 
                      key={index}
                      className="relative"
                    >
                      <div 
                        className={`milestone-card ${isMilestoneVisible ? 'visible' : ''} bg-gradient-to-br from-[#1a1a1a]/90 to-[#0e0e0e]/90 backdrop-blur-sm p-4 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/10 text-center`}
                        style={{ 
                          transform: isMilestoneVisible ? 'translateY(0)' : 'translateY(30px)',
                          opacity: isMilestoneVisible ? 1 : 0,
                          transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 200}ms`
                        }}
                      >
                        <div className="text-xl font-semibold text-[#D4AF37] mb-2 font-subheading">
                          {milestone.year}
                        </div>
                        <h3 className="text-sm font-medium text-white/90 mb-2 font-subheading">
                          {milestone.title}
                        </h3>
                        <p className="text-white/70 text-xs leading-relaxed font-light font-clean">
                          {milestone.desc}
                        </p>
                      </div>
                      
                      <div 
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full border-2 border-[#0e0e0e] z-10"
                        style={{ 
                          transform: `translate(-50%, -50%) scale(${isMilestoneVisible ? 1 : 0})`,
                          transition: `transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 200}ms`
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Horizontal Slider */}
          <div className="md:hidden">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentMilestone * 100}%)` }}
              >
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#0e0e0e]/90 backdrop-blur-sm p-6 rounded-xl border border-[#D4AF37]/20 text-center mx-auto max-w-sm">
                      <div className="text-2xl font-semibold text-[#D4AF37] mb-3 font-subheading">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-medium text-white/90 mb-3 font-subheading">
                        {milestone.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed font-light font-clean">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {milestones.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentMilestone ? 'bg-[#D4AF37] scale-125' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className={`text-center mt-8 transition-all duration-1000 ${
            lineProgress > 80 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-white/50 text-sm font-light font-clean">
              Journey continues...
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Leadership Team */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e]">
        <div className="max-w-7xl mx-auto">
          <div data-animate className={`text-center mb-16 transition-all duration-1000 ${isVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl font-bold mb-6 text-white/90 font-headline">
              Leadership Vision
            </h2>
          </div>

          {/* Founder's Quote - Smaller */}
          <div data-animate className={`text-center mb-16 transition-all duration-1000 delay-200 ${isVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20">
              <Quote className="w-8 h-8 text-[#D4AF37] mx-auto mb-4" />
              <blockquote className="text-xl font-light italic text-[#D4AF37] mb-6 leading-relaxed font-testimonial">
                &quot;Luxury isn&apos;t a product — it&apos;s an emotion. We exist to deliver that emotion with every key we hand over.&quot;
              </blockquote>
              <div className="text-white/70 font-clean text-sm">
                <div className="font-semibold">CEO</div>
                <div>Founder & CEO</div>
              </div>
            </div>
          </div>

          {/* Team Grid - Desktop Horizontal, Mobile Slider */}
          <div>
            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div 
                  key={index}
                  data-animate
                  className={`group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-4 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-500 hover:transform hover:scale-105 ${isVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <div className="relative text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full mx-auto mb-3 flex items-center justify-center text-black font-bold text-lg font-clean">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-base font-semibold text-white/90 mb-1 font-subheading">{member.name}</h3>
                    <p className="text-[#D4AF37] mb-2 font-clean text-sm">{member.role}</p>
                    <p className="text-xs text-white/60 italic font-testimonial">&quot;{member.motto}&quot;</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Slider */}
            <div className="md:hidden">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentTeamMember * 100}%)` }}
                >
                  {team.map((member, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-6 rounded-xl border border-[#D4AF37]/20 text-center mx-auto max-w-xs">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full mx-auto mb-4 flex items-center justify-center text-black font-bold text-xl font-clean">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h3 className="text-lg font-semibold text-white/90 mb-2 font-subheading">{member.name}</h3>
                        <p className="text-[#D4AF37] mb-3 font-clean">{member.role}</p>
                        <p className="text-sm text-white/60 italic font-testimonial">&quot;{member.motto}&quot;</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {team.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentTeamMember ? 'bg-[#D4AF37] scale-125' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Core Values - Single Row */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div data-animate className={`text-center mb-16 transition-all duration-1000 ${isVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent font-headline">
              Our Commitments
            </h2>
            <p className="text-xl text-white/70 font-clean">
              Core values that drive every decision we make
            </p>
          </div>

          {/* Desktop Single Row */}
          <div className="hidden md:grid grid-cols-5 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                data-animate
                className={`group relative bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-6 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-500 hover:transform hover:scale-105 ${isVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative text-center">
                  <value.icon className="w-10 h-10 text-[#D4AF37] mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-bold mb-3 text-white/90 group-hover:text-[#D4AF37] transition-colors font-subheading">
                    {value.title}
                  </h3>
                  <p className="text-white/70 group-hover:text-white/80 transition-colors font-clean text-sm">
                    {value.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Horizontal Slider */}
          <div className="md:hidden">
            <div className="overflow-hidden">
              <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                {values.map((value, index) => (
                  <div 
                    key={index}
                    className="w-72 flex-shrink-0 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-6 rounded-xl border border-[#D4AF37]/20 text-center"
                  >
                    <value.icon className="w-12 h-12 text-[#D4AF37] mb-4 mx-auto" />
                    <h3 className="text-lg font-bold mb-3 text-white/90 font-subheading">
                      {value.title}
                    </h3>
                    <p className="text-white/70 font-clean text-sm">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Showrooms Map - Side by Side */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-[#0e0e0e] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Heading and Button */}
            <div data-animate className={`transition-all duration-1000 ${isVisible[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white/90 font-headline">
                Showrooms Across India
              </h2>
              <p className="text-xl text-white/70 mb-8 font-clean">
                Experience luxury at our state-of-the-art showrooms
              </p>
              <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-button">
                <MapPin className="w-5 h-5" />
                Find a Raam Showroom Near You
              </button>
            </div>

            {/* Right - Map */}
            <div data-animate className={`transition-all duration-1000 delay-300 ${isVisible[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="aspect-video bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl border border-[#D4AF37]/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-20 h-20 text-[#D4AF37] mx-auto mb-4 animate-pulse" />
                  <p className="text-white/70 text-lg font-clean">Interactive India Map</p>
                  <p className="text-white/50 font-clean">Showroom Locations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials - Mobile Slider */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div data-animate className={`text-center mb-16 transition-all duration-1000 ${isVisible[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent font-headline">
              What Our Clients Say
            </h2>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                data-animate
                className={`bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-500 hover:transform hover:scale-105 ${isVisible[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-white/70 mb-6 italic font-testimonial">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center text-black font-bold font-clean">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white/90 font-subheading">{testimonial.name}</h4>
                    <p className="text-[#D4AF37] text-sm font-clean">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden mb-12">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20 mx-auto max-w-sm">
                      <div className="flex gap-1 mb-4 justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                      <p className="text-white/70 mb-6 italic font-testimonial text-center">&quot;{testimonial.text}&quot;</p>
                      <div className="flex items-center gap-4 justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full flex items-center justify-center text-black font-bold font-clean">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white/90 font-subheading">{testimonial.name}</h4>
                          <p className="text-[#D4AF37] text-sm font-clean">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentTestimonial ? 'bg-[#D4AF37] scale-125' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto font-button">
              Hear from Our Happy Clients
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Footer CTA */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white/90 font-headline">
            Own a Piece of Luxury
          </h2>
          <p className="text-xl text-white/70 mb-8 font-clean">
            Experience Raam
          </p>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-2xl blur-xl opacity-50 animate-pulse" />
            <button className="relative bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-12 py-6 rounded-2xl text-2xl font-bold hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 transform hover:scale-105 group font-button">
              <span className="relative flex items-center justify-center gap-3">
                Browse Our Cars
                <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl" />
            </button>
          </div>
        </div>
      </section>
      
      <AboutStickyNav />

      <style jsx>{`
        /* Font imports */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        /* Font family classes */
        .font-headline {
          font-family: 'Playfair Display', serif;
        }
        
        .font-subheading {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-testimonial {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-button {
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
        }
        
        .font-clean {
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
        }

        /* Hide scrollbars */
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        
        .overflow-x-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        @keyframes fadeZoomLoop {
          0% {
            opacity: 0;
            transform: scale(1.1);
          }
          8% {
            opacity: 1;
            transform: scale(1.05);
          }
          25% {
            opacity: 1;
            transform: scale(1);
          }
          35% {
            opacity: 0;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }

        .animate-fade-zoom-loop {
          animation: fadeZoomLoop 12s infinite ease-in-out;
          transition: opacity 1s ease-in-out;
        }
        
        @keyframes bgZoom {
          0% { 
            background-size: 100%; 
            background-position: center center; 
          }
          50% { 
            background-size: 110%; 
            background-position: center center; 
          }
          100% { 
            background-size: 100%; 
            background-position: center center; 
          }
        }

        .animate-bg-zoom {
          animation: bgZoom 8s ease-in-out infinite;
          background-size: cover;
        }

        @keyframes kenBurns {
          0% { 
            transform: scale(1) translateX(0); 
          }
          25% { 
            transform: scale(1.05) translateX(-2%); 
          }
          50% { 
            transform: scale(1.08) translateY(-1%); 
          }
          75% { 
            transform: scale(1.03) translateX(1%); 
          }
          100% { 
            transform: scale(1) translateX(0); 
          }
        }

        .animate-ken-burns {
          animation: kenBurns 20s ease-in-out infinite;
        }

        /* Timeline specific animations */
        .timeline-line {
          transform-origin: top;
          transition: height 2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .milestone-card {
          transform: translateY(30px);
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .milestone-card.visible {
          transform: translateY(0);
          opacity: 1;
        }

        .timeline-dot {
          transform: scale(0);
          transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .timeline-dot.visible {
          transform: scale(1);
        }

        .line-glow {
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
