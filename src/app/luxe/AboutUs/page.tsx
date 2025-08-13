'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Header from '@/app/components/Header';
import AboutStickyNav from '@/app/components/StickyFooter/AboutStickyNav';
import '../../../app/GlobalFonts.css'
import Image from 'next/image';

import { 
  Star, 
  Award, 
  Shield, 
  Heart, 
  Leaf, 
  
  MapPin,
  
  ChevronRight,
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
  const [, setCurrentTestimonial] = useState<number>(0);

  const text1: string = "Reimagining Pre-Owned Luxury with Purpose, Passion, and Precision.";
  const text2: string = "Powered by Raam Group, Epic Luxe curates premium pre-owned luxury vehicles with unmatched quality, trust, and elegance.";
   

 const [currentValue, setCurrentValue] = useState<number>(0);

 
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

  const [, setScrolledPastHero] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolledPastHero(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const milestones: Milestone[] = useMemo(() => [
  { year: '2015', title: 'Inception', desc: 'Founded with a vision to redefine luxury car ownership' },
  { year: '2017', title: '1000+ Luxury Cars Sold', desc: 'Achieved major milestone in premium automotive sales' },
  { year: '2020', title: 'Multi-city Expansion', desc: 'Expanded operations across major Indian metros' },
  { year: '2023', title: 'National Recognition', desc: 'Awarded Best Luxury Pre-owned Car Dealer' },
  { year: '2025', title: 'Digital Showroom Launch', desc: 'Revolutionary virtual showroom experience' }
], []);

  // Timeline animation effect
  useEffect(() => {
  const currentRef = timelineRef.current;  // Cache the ref

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
              setVisibleMilestones((prev) => [...prev, index]);
            }, 800 + index * 300);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  if (currentRef) observer.observe(currentRef);

  return () => {
    if (currentRef) observer.unobserve(currentRef);
  };
  // Add milestones to dependencies to keep it up to date
}, [milestones]);


  const features = [
    { title: 'Handpicked Cars', icon: '🚗', desc: 'Every car, personally curated.' },
    { title: '175+ Checks', icon: '✔️', desc: 'Beyond industry standards.' },
    { title: 'Concierge Services', icon: '🎩', desc: 'Your wish. Our priority.' },
    { title: 'Transparent Financing', icon: '💰', desc: 'No hidden costs, ever.' },
    { title: 'Celebrity Trusted', icon: '⭐', desc: 'Preferred by visionaries.' },
  ];

  

  const values: Value[] = [
    { icon: Shield, title: 'Integrity', desc: 'Transparent processes, honest dealings, authentic experiences' },
    { icon: Award, title: 'Excellence', desc: 'Uncompromising quality in every vehicle and service' },
    { icon: Star, title: 'Innovation', desc: 'Pioneering new standards in luxury automotive retail' },
    { icon: Heart, title: 'Customer Delight', desc: 'Creating extraordinary moments for every client' },
    { icon: Leaf, title: 'Sustainability', desc: 'Promoting sustainable luxury through pre-owned excellence' }
  ];

  // Auto-rotate values slider
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentValue(prev => (prev + 1) % values.length);
  }, 4000); // Change every 4 seconds

  return () => clearInterval(interval);
}, [values.length]);

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

  useEffect(() => {
  const intervals = [
    setInterval(() => setCurrentFeature(prev => (prev + 1) % features.length), 4000),
    setInterval(() => setCurrentMilestone(prev => (prev + 1) % milestones.length), 5000),
    setInterval(() => setCurrentTeamMember(prev => (prev + 1) % team.length), 6000),
    setInterval(() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length), 7000),
  ];

  return () => intervals.forEach(interval => clearInterval(interval));
}, [features.length, milestones.length, team.length, testimonials.length]);


  return (
    <div className="bg-[#0e0e0e] text-white overflow-hidden font-primary">
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
       <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[100px] sm:pt-[120px] md:pt-[140px]">
  {/* Animated Background */}
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

  <div className="relative z-30 text-center max-w-6xl mx-auto w-full px-2 sm:px-4">
    {/* Heading */}
    <div
      data-animate
      className={`transition-all duration-1000 ${
        isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#D4AF37] via-white to-[#BFA980] bg-clip-text text-transparent tracking-wide font-accent">
        Where Luxury Meets Legacy
      </h1>

      <div className="relative mb-6">
        <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-full sm:max-w-2xl mx-auto leading-relaxed font-medium font-primary min-h-[60px] flex items-center justify-center break-words">
          <span className="relative">
            {typewriterText1}
            {showCursor1 && (
              <span className="inline-block w-0.5 h-5 bg-[#D4AF37] ml-1 animate-pulse" />
            )}
          </span>
        </p>
      </div>
    </div>

    {/* Subtitle / About */}
    <div
      data-animate
      className={`transition-all duration-1000 delay-300 ${
        isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h2 className="text-lg xs:text-xl md:text-4xl font-semibold text-[#D4AF37] mb-3 font-secondary">
        About Epic Luxe
      </h2>
      <div className="relative mb-8">
        <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed max-w-full sm:max-w-3xl mx-auto px-1 sm:px-2 font-primary min-h-[60px] sm:min-h-[80px] flex items-center justify-center break-words">
          <span className="relative">
            {typewriterText2}
            {showCursor2 && (
              <span className="inline-block w-0.5 h-4 bg-[#D4AF37] ml-1 animate-pulse" />
            )}
          </span>
        </p>
      </div>
    </div>

    {/* Feature Cards - Desktop Grid & Mobile Slider */}
    <div className="w-full mt-2 sm:mt-4">
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 px-2">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-[#0e0e0e]/70 border border-[#D4AF37]/30 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-[0_0_12px_#D4AF37] transition-all duration-300 backdrop-blur-md transform hover:scale-105"
          >
            <div className="text-xl lg:text-2xl mb-2">{item.icon}</div>
            <h3 className="text-white/90 text-xs md:text-sm font-semibold mb-1 font-secondary">{item.title}</h3>
            <p className="text-white/60 text-[11px] md:text-xs font-primary">{item.desc}</p>
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
                className="w-full flex-shrink-0 px-2"
              >
                <div className="bg-[#0e0e0e]/70 border border-[#D4AF37]/30 rounded-xl p-5 flex flex-col items-center text-center backdrop-blur-md mx-auto max-w-xs">
                  <div className="text-2xl sm:text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-white/90 text-base font-semibold mb-1 font-secondary">{item.title}</h3>
                  <p className="text-white/60 text-xs font-primary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Indicators */}
        <div className="flex justify-center mt-3 space-x-2">
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
<section className="relative py-12 sm:py-16 lg:py-24 px-4 -mt-6 sm:-mt-0">
  <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div
        data-animate
        className={`transition-all duration-1000 delay-200 ${
          isVisible[1] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}
      >
        <h2 className="text-5xl font-bold mb-8 text-white/90 font-accent">Who We Are</h2>
        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-white/70 font-primary">
            Founded with an unwavering commitment to excellence,{' '}
            <span className="text-[#D4AF37] font-semibold">Epic Luxe</span> has redefined
            the luxury pre-owned automotive landscape in India.
          </p>
          <p className="text-white/70 font-primary">
            Our <span className="text-[#D4AF37] font-semibold">mission</span> is to make
            premium vehicles accessible without compromise, ensuring every client experiences
            the pinnacle of automotive luxury.
          </p>
          <p className="text-white/70 font-primary">
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
                <Image
  key={index}
  src={src}
  alt={`Showroom ${index + 1}`}
  fill
  sizes="100vw"
  className="absolute inset-0 w-full h-full object-cover opacity-0 animate-fade-zoom-loop"
  style={{
    animationDelay: `${index * 3}s`,
    zIndex: 10 - index,
  }}
  priority={index === 0} // optionally prioritize the first image
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
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-white/95 font-accent">
              Our Group Journey
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-light font-primary">
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
                        <div className="text-xl font-semibold text-[#D4AF37] mb-2 font-secondary">
                          {milestone.year}
                        </div>
                        <h3 className="text-sm font-medium text-white/90 mb-2 font-secondary">
                          {milestone.title}
                        </h3>
                        <p className="text-white/70 text-xs leading-relaxed font-light font-primary">
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
                      <div className="text-2xl font-semibold text-[#D4AF37] mb-3 font-secondary">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-medium text-white/90 mb-3 font-secondary">
                        {milestone.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed font-light font-primary">
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
            <p className="text-white/50 text-sm font-light font-primary">
              Journey continues...
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Leadership Team */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e]">
        <div className="max-w-7xl mx-auto">
          <div data-animate className={`text-center mb-16 transition-all duration-1000 ${isVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl font-bold mb-6 text-white/90 font-accent">
              Leadership Vision
            </h2>
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
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full mx-auto mb-3 flex items-center justify-center text-black font-bold text-lg font-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-base font-semibold text-white/90 mb-1 font-secondary">{member.name}</h3>
                    <p className="text-[#D4AF37] mb-2 font-primary text-sm">{member.role}</p>
                    <p className="text-xs text-white/60 italic font-accent">&quot;{member.motto}&quot;</p>
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
                        <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#BFA980] rounded-full mx-auto mb-4 flex items-center justify-center text-black font-bold text-xl font-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h3 className="text-lg font-semibold text-white/90 mb-2 font-secondary">{member.name}</h3>
                        <p className="text-[#D4AF37] mb-3 font-primary">{member.role}</p>
                        <p className="text-sm text-white/60 italic font-accent">&quot;{member.motto}&quot;</p>
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

      {/* Enhanced Core Values - Desktop Grid & Mobile Slider */}
<section className="relative py-24 px-4">
  <div className="max-w-7xl mx-auto">
    <div data-animate className={`text-center mb-16 transition-all duration-1000 ${isVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] bg-clip-text text-transparent font-accent">
        Our Commitments
      </h2>
      <p className="text-xl text-white/70 font-primary">
        Core values that drive every decision we make
      </p>
    </div>

    {/* Desktop Grid - Static */}
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
            <h3 className="text-lg font-bold mb-3 text-white/90 group-hover:text-[#D4AF37] transition-colors font-secondary">
              {value.title}
            </h3>
            <p className="text-white/70 group-hover:text-white/80 transition-colors font-primary text-sm">
              {value.desc}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Mobile Auto-Advancing Slider */}
    <div className="md:hidden">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentValue * 100}%)` }}
        >
          {values.map((value, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 px-4"
            >
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-xl border border-[#D4AF37]/20 text-center mx-auto max-w-sm transform transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-20 rounded-xl" />
                <div className="relative">
                  <value.icon className="w-14 h-14 text-[#D4AF37] mb-6 mx-auto" />
                  <h3 className="text-xl font-bold mb-4 text-white/90 font-secondary">
                    {value.title}
                  </h3>
                  <p className="text-white/70 font-primary leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clickable Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {values.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentValue(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentValue 
                ? 'bg-[#D4AF37] scale-125 shadow-lg shadow-[#D4AF37]/50' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to value ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar (Optional) */}
      <div className="flex justify-center mt-4">
        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-full transition-all duration-4000 ease-linear"
            style={{ 
              width: `${((currentValue + 1) / values.length) * 100}%`,
              animation: 'progress-fill 4s linear infinite'
            }}
          />
        </div>
      </div>
    </div>
  </div>
</section>

{/* Google Maps & Directions Section */}
<section className="relative py-16 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e]">
  <div className="max-w-7xl mx-auto">
    <div 
      data-animate 
      className={`text-center mb-12 transition-all duration-1000 ${isVisible[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white/90 font-accent">
        Get Directions to Our Showroom
      </h2>
      <p className="text-xl text-white/70 font-primary">
        Find us easily with our interactive map and navigation
      </p>
    </div>

    {/* Flagship Message - Above Map */}
    <div 
      data-animate 
      className={`mb-8 transition-all duration-1000 delay-150 ${isVisible[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-[#D4AF37]/10 border-2 border-[#D4AF37]/30 rounded-2xl p-6 text-center backdrop-blur-sm">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37] font-accent">
            Visit Our Premium Flagship Showroom
          </h3>
          <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span>Open Now</span>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <span>Premium Test Drives Available</span>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <span>Expert Consultations</span>
        </div>
      </div>
    </div>

    {/* Map Container with Overlay */}
    <div className="relative">
      {/* Reduced Height Map */}
      <div 
        data-animate 
        className={`transition-all duration-1000 delay-200 ${isVisible[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-2xl p-4 border border-[#D4AF37]/20 overflow-hidden">
          <div className="h-80 rounded-xl overflow-hidden border border-[#D4AF37]/10"> {/* Fixed height ~8cm */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.888036796!2d78.449570988855!3d17.417160000000017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97484bb60ef1%3A0x6b8996b670679e7a!2sSilver%20Star%20-%20Mercedes-Benz!5e0!3m2!1sen!2sin!4v1753702302842!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
          
          {/* Map Controls */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button 
              onClick={() => window.open('https://maps.google.com/?q=Silver+Star+Mercedes-Benz+Hyderabad', '_blank')}
              className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-primary text-sm"
            >
              <MapPin className="w-4 h-4" />
              Open in Google Maps
            </button>
            
            <button 
              onClick={() => window.open('https://maps.google.com/maps?saddr=My+Location&daddr=Silver+Star+Mercedes-Benz+Hyderabad', '_blank')}
              className="bg-white/10 backdrop-blur-sm border border-[#D4AF37]/30 text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 flex items-center gap-2 font-primary text-sm"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <ChevronRight className="w-3 h-3" />
              </div>
              Get Directions
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Card - Positioned over map on left side */}
      <div 
        data-animate 
        className={`absolute top-8 left-8 w-full max-w-sm transition-all duration-1000 delay-400 ${isVisible[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} hidden lg:block`}
      >
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-2 border border-[#D4AF37]/20 hover:bg-black/50 transition-all duration-300">
          <h3 className="text-xl font-semibold text-[#D4AF37] mb-4 font-secondary">
            Visit Our Flagship Showroom
          </h3>
          
          <div className="space-y-3 text-white/70 font-primary">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white/90 font-medium">Hyderabad Flagship</p>
                <p className="text-sm">Banjara Hills, Road No. 12, Hyderabad - 500034</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
              </div>
              <div>
                <p className="text-white/90 font-medium">Opening Hours</p>
                <p className="text-sm">Mon - Sat: 10:00 AM - 8:00 PM</p>
                <p className="text-sm">Sunday: 11:00 AM - 6:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
              </div>
              <div>
                <p className="text-white/90 font-medium">Contact</p>
                <p className="text-sm">+91 40 2354 7890</p>
                <p className="text-sm">hyderabad@epicluxe.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-green-400 font-medium text-sm">Open Now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version - Below Map */}
      <div 
        data-animate 
        className={`mt-8 transition-all duration-1000 delay-400 ${isVisible[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} lg:hidden`}
      >
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-[#D4AF37]/20">
          <h3 className="text-xl font-semibold text-[#D4AF37] mb-4 font-secondary">
            Visit Our Flagship Showroom
          </h3>
          
          <div className="space-y-3 text-white/70 font-primary">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white/90 font-medium">Hyderabad Flagship</p>
                <p className="text-sm">Banjara Hills, Road No. 12, Hyderabad - 500034</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
              </div>
              <div>
                <p className="text-white/90 font-medium">Opening Hours</p>
                <p className="text-sm">Mon - Sat: 10:00 AM - 8:00 PM</p>
                <p className="text-sm">Sunday: 11:00 AM - 6:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
              </div>
              <div>
                <p className="text-white/90 font-medium">Contact</p>
                <p className="text-sm">+91 40 2354 7890</p>
                <p className="text-sm">hyderabad@epicluxe.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-green-400 font-medium text-sm">Open Now</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Quick Actions Bar */}
    <div 
      data-animate 
      className={`mt-12 transition-all duration-1000 delay-800 ${isVisible[7] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="bg-gradient-to-r from-[#1a1a1a] via-[#0e0e0e] to-[#1a1a1a] rounded-2xl p-6 border border-[#D4AF37]/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 font-secondary">
              Need Help Finding Us?
            </h3>
            <p className="text-white/70 font-primary">
              Our team is ready to assist you with directions and any queries
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => window.open('tel:+914023547890', '_self')}
              className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-primary"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-current rounded-full"></div>
              </div>
              Call Showroom
            </button>
            
            <button 
              onClick={() => window.open('https://wa.me/914023547890?text=Hi, I need directions to your showroom', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-primary"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-3 h-3 bg-current rounded"></div>
              </div>
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Sticky Footer CTA */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white/90 font-accent">
            Own a Piece of Luxury
          </h2>
          <p className="text-xl text-white/70 mb-8 font-primary">
            Experience Raam
          </p>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-2xl blur-xl opacity-50 animate-pulse" />
            <button className="relative bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-12 py-6 rounded-2xl text-2xl font-bold hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 transform hover:scale-105 group font-primary">
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

        @keyframes progress-fill {
  0% { width: 0%; }
  100% { width: 100%; }
}
      `}</style>
    </div>
  );
};

export default AboutUs;