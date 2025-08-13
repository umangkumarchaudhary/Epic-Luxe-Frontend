// components/HeaderServer.tsx
import Link from "next/link";

// Static data that doesn't depend on client state
export const cities = [
  "Pune",
  "Chennai",
  "Hyderabad",
  "Aurangabad",
  "Nashik",
  "Vizag",
  "Kolhapur",
];

export const services = [
  { name: "Buy Now", icon: "/icons/car.svg", href: "/luxe/inventory" },
  { name: "Sell Now", icon: "/icons/crown.svg", href: "/luxe/services/SellNowYourCar" },
  { name: "Free Evaluation", icon: "/icons/shield.svg", href: "/services/SellNowYourCar" },
  { name: "Finance", icon: "/icons/credit-card.svg", href: "/luxe/services/finance" },
  { name: "Insurance", icon: "/icons/file-text.svg", href: "/luxe/services/Extended Warranty" },
  { name: "Trade In", icon: "/icons/arrow-up-down.svg", href: "/luxe/services/TradeIn" },
];

export const navItems = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/luxe/contact" },
  { name: "About", href: "/luxe/AboutUs" },
];

export const insightsItems = [
  { name: "Testimonials", href: "/luxe/insights/testimonials" },
  { name: "Blogs", href: "/luxe/insights/blogs" },
  { name: "Press", href: "/luxe/Press" },
];

export default function HeaderServer() {
  return (
    <header className="bg-white border-b border-gray-200 font-manrope text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Name */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-extrabold tracking-wide uppercase">
            EPIC <span className="font-light italic">REASSURED</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-semibold hover:text-gray-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}

          {/* Services Dropdown */}
          <div className="relative group">
            <button className="font-semibold flex items-center hover:text-gray-600">
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
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-200">
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
          </div>

          {/* Insights Dropdown */}
          <div className="relative group">
            <button className="font-semibold flex items-center hover:text-gray-600">
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
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-200">
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
          </div>
        </nav>
      </div>
    </header>
  );
}
