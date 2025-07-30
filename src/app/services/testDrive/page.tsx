'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Car,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  Upload,
  ArrowRight,
  Shield,
  Navigation,
  Sparkles,
  RotateCcw,
  Star,
} from 'lucide-react';



const Hero = () => (
  <section className="relative py-20 px-4 md:py-32 overflow-hidden">
    {/* background blobs */}
    <div className="absolute inset-0">
      <Image
        src="/api/placeholder/1920x1080"
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="blur-lg scale-110"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0e0e0e]/80 to-[#0e0e0e]" />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white/90 font-headline mb-6">
        Test Drive Your Dream —
        <br className="hidden md:block" />
        <span className="text-[#D4AF37]">Where You Want, When You Want</span>
      </h1>

      <p className="text-xl md:text-2xl text-white/70 font-clean mb-10">
        Choose your car, your location, and your schedule. We&apos;ll handle the rest.
      </p>

      <a
        href="#booking"
        className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300 font-button"
      >
        <Sparkles className="w-5 h-5" /> Book Your Test Drive Now
      </a>
    </div>
  </section>
);


const BookingForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const sendOtp = () => setOtpSent(true); // placeholder

  return (
    <section
      id="booking"
      className="py-16 px-4 bg-gradient-to-b from-[#0e0e0e] to-black border-t border-[#D4AF37]/10"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* form card */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] rounded-3xl p-10 border border-[#D4AF37]/20 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-[#D4AF37] mb-6 font-subheading">
            Book Your Test Drive
          </h2>

          <form className="space-y-6">
            {/* car selection */}
            <div>
              <label className="label">Select Car</label>
              <select className="input">
                <option value="">Choose Model</option>
                <option>Mercedes-Benz C-Class</option>
                <option>BMW 5-Series</option>
                <option>Audi Q5</option>
              </select>
            </div>

            {/* name */}
            <div>
              <label className="label">Your Name</label>
              <div className="input-wrapper">
                <User className="icon" />
                <input type="text" placeholder="Full Name" className="input" />
              </div>
            </div>

            {/* mobile + otp */}
            <div>
              <label className="label">Mobile Number</label>
              <div className="flex gap-3">
                <div className="input-wrapper flex-1">
                  <Phone className="icon" />
                  <input type="tel" placeholder="10-digit number" className="input" />
                </div>
                <button
                  type="button"
                  onClick={sendOtp}
                  className="btn-secondary whitespace-nowrap"
                >
                  {otpSent ? 'Resend OTP' : 'Send OTP'}
                </button>
              </div>
              {otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="input mt-3"
                />
              )}
            </div>

            {/* email */}
            <div>
              <label className="label">Email Address</label>
              <div className="input-wrapper">
                <Mail className="icon" />
                <input type="email" placeholder="you@email.com" className="input" />
              </div>
            </div>

            {/* date & time */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="label">Preferred Date</label>
                <div className="input-wrapper">
                  <Calendar className="icon" />
                  <input type="date" className="input" />
                </div>
              </div>
              <div>
                <label className="label">Preferred Time</label>
                <div className="input-wrapper">
                  <Clock className="icon" />
                  <input type="time" className="input" />
                </div>
              </div>
            </div>

            {/* location */}
            <div>
              <label className="label">Location for Test Drive</label>
              <div className="input-wrapper">
                <MapPin className="icon" />
                <input
                  type="text"
                  placeholder="Home Address or Pin"
                  className="input"
                />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <input id="showroom" type="checkbox" className="accent-[#D4AF37]" />
                <label htmlFor="showroom" className="text-sm text-white/70">
                  Prefer to visit our showroom instead
                </label>
              </div>
            </div>

            {/* licence upload */}
            <div>
              <label className="label">Driver&apos;s License (optional)</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="DL Number or upload image"
                  className="input flex-1"
                />
                <button type="button" className="btn-secondary">
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* submit */}
            <button type="submit" className="btn-primary w-full mt-2">
              Book Test Drive
            </button>
          </form>
        </div>

        {/* doorstep vs showroom cards */}
        <div className="space-y-6">
          {[
            {
              title: 'Doorstep Delivery',
              icon: Car,
              desc: 'We bring the car to your preferred location with live tracking.',
            },
            {
              title: 'At Showroom',
              icon: Navigation,
              desc: 'Experience our lounge, refreshments, and concierge service.',
            },
          ].map(({ title, icon: Icon, desc }) => (
            <div
              key={title}
              className="flex gap-6 items-start bg-black/40 border border-[#D4AF37]/20 rounded-2xl p-6 backdrop-blur-sm hover:border-[#D4AF37]/40 transition"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#BFA980] flex items-center justify-center shrink-0">
                <Icon className="w-7 h-7 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#D4AF37] font-subheading">
                  {title}
                </h3>
                <p className="text-white/70 font-clean">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



const WhyEpicLuxe = () => {
  const items = [
    {
      icon: User,
      title: 'Trained Luxury Advisors',
      text: '1-on-1 consultation at your convenience',
    },
    {
      icon: Shield,
      title: 'Safe & Sanitized Vehicles',
      text: 'Fully cleaned and insured cars',
    },
    {
      icon: Clock,
      title: '30-Minute Test Drive',
      text: 'Enough to explore every detail',
    },
    {
      icon: MapPin,
      title: 'Real-Time Tracking',
      text: 'Track the car arriving at your location',
    },
    {
      icon: RotateCcw,
      title: 'Paperless Experience',
      text: '100% digital, no hard copies',
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-heading">
          Why&nbsp;<span className="text-[#D4AF37]">Book With Epic Luxe</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mt-14">
          {items.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition group"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#BFA980] flex items-center justify-center mb-6 group-hover:rotate-3 transition">
                <Icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-[#D4AF37] mb-3 font-subheading">
                {title}
              </h3>
              <p className="text-white/70 font-clean">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



const HowItWorks = () => {
  const steps = [
    {
      icon: Car,
      title: 'Choose Your Car',
    },
    {
      icon: Calendar,
      title: 'Schedule Your Time & Location',
    },
    {
      icon: Sparkles,
      title: 'We Deliver Your Experience',
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#0e0e0e] to-black">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="section-heading">
          How It&nbsp;<span className="text-[#D4AF37]">Works</span>
        </h2>

        <div className="mt-14 flex flex-col lg:flex-row gap-10 items-start lg:items-stretch">
          {steps.map(({ icon: Icon, title }, i) => (
            <div key={title} className="flex-1">
              <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#BFA980] flex items-center justify-center mb-6">
                <Icon className="w-12 h-12 text-black" />
              </div>
              <h3 className="text-xl font-bold text-[#D4AF37] font-subheading mb-3">
                {`0${i + 1}. ${title}`}
              </h3>
              <p className="text-white/70 font-clean">
                {i === 0 &&
                  'Select from our curated list of certified pre-owned luxury cars.'}
                {i === 1 &&
                  'Pick a convenient slot and location — doorstep or showroom.'}
                {i === 2 &&
                  'Enjoy a seamless, concierge-level test drive experience.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="section-heading mb-14">
        What&nbsp;Our&nbsp;<span className="text-[#D4AF37]">Customers</span>&nbsp;Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          'I test drove a used GLC from my home. The car was flawless and so was the process.',
          'Booking took less than a minute and the car arrived at my door right on time.',
          'Epic Luxe advisors were professional and the whole experience felt truly premium.',
        ].map((quote, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] p-8 rounded-2xl border border-[#D4AF37]/20"
          >
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-5 h-5 text-[#D4AF37] fill-current" />
              ))}
            </div>
            <p className="text-white/70 italic font-clean">&quot;{quote}&quot;</p>

          </div>
        ))}
      </div>

      {/* offer */}
      <div className="mt-20 bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-[#D4AF37]/10 border-2 border-[#D4AF37]/30 rounded-3xl p-12 text-center backdrop-blur-sm">
        <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-3 font-headline">
  Book now &amp; get &quot;₹5,000 off&quot; on your purchase
</h3>

        <p className="text-white/70 mb-8 font-clean">
          Zero cancellation fee on all test drives this month.
        </p>
        <a href="#booking" className="btn-primary inline-flex items-center gap-3">
          <ArrowRight className="w-5 h-5" /> Claim Offer
        </a>
      </div>
    </div>
  </section>
);

const Newsletter = () => (
  <section className="py-16 px-4">
    <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-[#D4AF37]/10 border-2 border-[#D4AF37]/30 rounded-3xl p-12 text-center backdrop-blur-sm">
      <h3 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4 font-headline">
        Stay Updated on Luxury Test Drive Events
      </h3>
      <p className="text-white/70 mb-8 font-clean">
        Exclusive invites, offers, and automotive insights straight to your inbox.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="input flex-1"
        />
        <button className="btn-primary">Subscribe</button>
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/*  7 ▸ Sticky Mobile CTA                                                    */
/* -------------------------------------------------------------------------- */

const StickyCTA = () => (
  <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-gradient-to-r from-[#1a1a1a] via-[#0e0e0e] to-[#1a1a1a] border-t border-[#D4AF37]/20 p-4">
    <a
      href="#booking"
      className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
    >
      <Car className="w-4 h-4" /> Book Test Drive
    </a>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Main Page                                                               */
/* -------------------------------------------------------------------------- */

const BookTestDrivePage = () => (
  <div className="text-white font-clean">
    <Hero />
    <BookingForm />
    <WhyEpicLuxe />
    <HowItWorks />
    <Testimonials />
    <Newsletter />
    <StickyCTA />
  </div>
);

export default BookTestDrivePage;

