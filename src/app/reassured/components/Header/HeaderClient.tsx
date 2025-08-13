"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function HeaderClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  // Close dropdowns when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
        setIsInsightsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const services = [
    { name: "Buy Now", href: "/luxe/inventory" },
    { name: "Sell Now", href: "/luxe/services/SellNowYourCar" },
    { name: "Free Evaluation", href: "/services/SellNowYourCar" },
    { name: "Finance", href: "/luxe/services/finance" },
    { name: "Insurance", href: "/luxe/services/Extended Warranty" },
    { name: "Trade In", href: "/luxe/services/TradeIn" },
  ];

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/luxe/contact" },
    { name: "About", href: "/luxe/AboutUs" },
  ];

  const insightsItems = [
    { name: "Testimonials", href: "/luxe/insights/testimonials" },
    { name: "Blogs", href: "/luxe/insights/blogs" },
    { name: "Press", href: "/luxe/Press" },
  ];

  return (
    <header className="bg-white text-black border-b border-gray-300 font-manrope">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Name */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-extrabold tracking-wide uppercase">
            EPIC <span className="font-light italic">REASSURED</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-gray-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center hover:text-gray-600">
              Services
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Insights Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsInsightsOpen(true)}
            onMouseLeave={() => setIsInsightsOpen(false)}
          >
            <button className="flex items-center hover:text-gray-600">
              Insights
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isInsightsOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg">
                {insightsItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-300 bg-white">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Services */}
          <div>
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Services
            </button>
            {isServicesOpen && (
              <div>
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block px-6 py-2 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Insights */}
          <div>
            <button
              onClick={() => setIsInsightsOpen(!isInsightsOpen)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Insights
            </button>
            {isInsightsOpen && (
              <div>
                {insightsItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-6 py-2 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
