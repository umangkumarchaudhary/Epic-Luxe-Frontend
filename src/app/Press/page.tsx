'use client';
import React, { useState } from 'react';
import { 
  Download, 
  ExternalLink, 
  Calendar, 
  Award, 
  Users, 
  TrendingUp,
  Quote,
  Camera,
  FileText,
  Mail,
  Phone,
  Globe,
  Star,
  ArrowRight,
  Play,
  Image as ImageIcon,
  Newspaper,
  Trophy,
  Briefcase
} from 'lucide-react';

const PressPage = () => {
  const [activeTab, setActiveTab] = useState('news');

  // Mock press releases - replace with real data
  const pressReleases = [
    {
      id: 1,
      title: "Epic Luxe Expands to Mumbai with ₹50 Crore Flagship Showroom",
      date: "2024-12-15",
      excerpt: "India's premier luxury pre-owned car platform opens its second flagship location in Bandra-Kurla Complex, featuring an exclusive collection of ultra-premium vehicles.",
      image: "/api/placeholder/400/250",
      category: "Expansion",
      featured: true
    },
    {
      id: 2,
      title: "Epic Luxe Achieves ₹500 Crore Annual Revenue Milestone",
      date: "2024-11-20",
      excerpt: "The luxury car platform reports 300% growth in Q3 2024, driven by increasing demand for certified pre-owned premium vehicles among affluent Indians.",
      image: "/api/placeholder/400/250",
      category: "Business",
      featured: true
    },
    {
      id: 3,
      title: "Partnership with Mercedes-Benz India for Certified Pre-Owned Program",
      date: "2024-10-10",
      excerpt: "Epic Luxe becomes the exclusive partner for Mercedes-Benz Certified Pre-Owned vehicles in South India, ensuring authenticity and quality.",
      image: "/api/placeholder/400/250",
      category: "Partnership",
      featured: false
    }
  ];

  // Mock media coverage
  const mediaCoverage = [
    {
      publication: "Economic Times",
      title: "The Rise of Luxury Pre-Owned Car Market in India",
      date: "2024-11-25",
      type: "Feature Article",
      logo: "/api/placeholder/100/40",
      link: "#"
    },
    {
      publication: "AutoCar India",
      title: "Epic Luxe: Redefining Trust in Pre-Owned Luxury Cars",
      date: "2024-10-18",
      type: "Industry Report",
      logo: "/api/placeholder/100/40",
      link: "#"
    },
    {
      publication: "Business Standard",
      title: "Hyderabad Startup Makes Luxury Cars Accessible",
      date: "2024-09-30",
      type: "Startup Profile",
      logo: "/api/placeholder/100/40",
      link: "#"
    }
  ];

  // Company statistics
  const companyStats = [
    { icon: Users, label: "Satisfied Customers", value: "10,000+", color: "text-blue-400" },
    { icon: TrendingUp, label: "Annual Revenue", value: "₹500Cr+", color: "text-green-400" },
    { icon: Award, label: "Luxury Brands", value: "25+", color: "text-purple-400" },
    { icon: Globe, label: "Cities", value: "5", color: "text-yellow-400" }
  ];

  // Awards and recognition
  const awards = [
    {
      title: "Best Luxury Pre-Owned Car Platform 2024",
      organization: "Indian Automotive Awards",
      year: "2024",
      icon: Trophy
    },
    {
      title: "Most Trusted Online Car Dealer",
      organization: "Customer Choice Awards",
      year: "2024",
      icon: Star
    },
    {
      title: "Excellence in Customer Service",
      organization: "India Business Awards",
      year: "2023",
      icon: Award
    }
  ];

  // Executive team for media
  const executives = [
    {
      name: "Rajesh Sharma",
      position: "Founder & CEO",
      bio: "Former Mercedes-Benz India executive with 15+ years in luxury automotive",
      image: "/api/placeholder/150/150",
      linkedin: "#"
    },
    {
      name: "Priya Mehta",
      position: "Chief Operating Officer",
      bio: "Ex-McKinsey consultant specializing in automotive market expansion",
      image: "/api/placeholder/150/150",
      linkedin: "#"
    }
  ];

  const mediaKitItems = [
    { name: "Epic Luxe Logo Pack", type: "ZIP", size: "2.3 MB", icon: ImageIcon },
    { name: "Brand Guidelines", type: "PDF", size: "5.1 MB", icon: FileText },
    { name: "Company Fact Sheet", type: "PDF", size: "1.2 MB", icon: Briefcase },
    { name: "Executive Photos", type: "ZIP", size: "8.5 MB", icon: Camera },
    { name: "Product Catalog", type: "PDF", size: "12.3 MB", icon: FileText }
  ];

  const tabs = [
    { id: 'news', label: 'Press Releases', icon: Newspaper },
    { id: 'coverage', label: 'Media Coverage', icon: Globe },
    { id: 'awards', label: 'Awards', icon: Trophy },
    { id: 'resources', label: 'Media Kit', icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Press & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Media Center</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Stay updated with Epic Luxe's journey in revolutionizing India's luxury pre-owned car market. 
              Access press releases, media coverage, and resources.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {companyStats.map(({ icon: Icon, label, value, color }, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                  <Icon className={`w-8 h-8 ${color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold text-white mb-1">{value}</div>
                  <div className="text-sm text-gray-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800 sticky top-0 bg-black/90 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 whitespace-nowrap transition-all duration-300 ${
                  activeTab === id
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Press Releases */}
        {activeTab === 'news' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Latest Press Releases</h2>
              <button className="flex items-center space-x-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                <Mail className="w-4 h-4" />
                <span>Subscribe to Updates</span>
              </button>
            </div>

            <div className="grid gap-8">
              {pressReleases.map((release) => (
                <div key={release.id} className={`bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-xl overflow-hidden border ${release.featured ? 'border-yellow-400/40' : 'border-gray-700'} hover:border-yellow-400/60 transition-all duration-300`}>
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <div className="h-64 md:h-full bg-gradient-to-br from-yellow-400/20 to-gray-600/20 flex items-center justify-center">
                        <Camera className="w-16 h-16 text-yellow-400/50" />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                          {release.category}
                        </span>
                        {release.featured && (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Featured
                          </span>
                        )}
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(release.date).toLocaleDateString('en-IN', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 hover:text-yellow-400 transition-colors cursor-pointer">
                        {release.title}
                      </h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {release.excerpt}
                      </p>
                      <div className="flex space-x-4">
                        <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
                          <FileText className="w-4 h-4" />
                          <span>Read Full Release</span>
                        </button>
                        <button className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors">
                          <Download className="w-4 h-4" />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media Coverage */}
        {activeTab === 'coverage' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Media Coverage</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaCoverage.map((coverage, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-xl p-6 border border-gray-700 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white rounded p-2">
                      <div className="w-16 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">
                        {coverage.publication}
                      </div>
                    </div>
                    <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">
                      {coverage.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
                    {coverage.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{new Date(coverage.date).toLocaleDateString('en-IN')}</span>
                  </div>
                  <button className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    <span>Read Article</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Featured Quote */}
            <div className="bg-gradient-to-r from-yellow-400/10 to-transparent rounded-xl p-8 border border-yellow-400/20">
              <Quote className="w-12 h-12 text-yellow-400 mb-4" />
              <blockquote className="text-xl text-white italic mb-4">
                "Epic Luxe has revolutionized the luxury pre-owned car market in India with their transparent processes and exceptional customer service."
              </blockquote>
              <cite className="text-yellow-400 font-semibold">
                - Automotive Industry Expert, Economic Times
              </cite>
            </div>
          </div>
        )}

        {/* Awards */}
        {activeTab === 'awards' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Awards & Recognition</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awards.map((award, index) => (
                <div key={index} className="bg-gradient-to-br from-yellow-400/10 to-gray-800/50 rounded-xl p-6 border border-yellow-400/30 text-center">
                  <award.icon className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{award.title}</h3>
                  <p className="text-gray-300 mb-2">{award.organization}</p>
                  <span className="text-yellow-400 font-semibold">{award.year}</span>
                </div>
              ))}
            </div>

            {/* Executive Team */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-8">Leadership Team</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {executives.map((exec, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-start space-x-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-gray-600/20 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-1">{exec.name}</h4>
                        <p className="text-yellow-400 mb-3">{exec.position}</p>
                        <p className="text-gray-300 text-sm mb-4">{exec.bio}</p>
                        <button className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm">
                          View LinkedIn Profile →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Media Kit */}
        {activeTab === 'resources' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Media Kit & Resources</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaKitItems.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-xl p-6 border border-gray-700 hover:border-yellow-400/40 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <p className="text-sm text-gray-400">{item.type} • {item.size}</p>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center space-x-2 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Media Contact */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-xl p-8 border border-yellow-400/20">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">Media Contact</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">For Press Inquiries</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-300">press@epicluxe.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-300">+91 98765 43210</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Media Relations Manager</h4>
                  <p className="text-gray-300 mb-2"><strong className="text-white">Ananya Gupta</strong></p>
                  <p className="text-gray-300 text-sm">Available for interviews, statements, and media partnerships</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PressPage;