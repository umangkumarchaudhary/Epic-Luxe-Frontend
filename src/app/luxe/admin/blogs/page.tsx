'use client'

import React, { useState } from 'react'
import { Search, Star, Users, Clock, ArrowRight, Tag, Calendar, User } from 'lucide-react'

const EpicLuxeBlog = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [email, setEmail] = useState('')

  const categories = ['All', 'Buying Guides', 'Car Reviews', 'Ownership Tips', 'Finance & Insurance']
  
  const featuredPost = {
    id: 1,
    title: "The Art of Buying Pre-Owned Luxury: A Complete Guide",
    subtitle: "Navigate the world of pre-owned luxury cars with confidence. From inspection secrets to negotiation tactics.",
    image: "data:image/svg+xml,%3Csvg width='1200' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23fff' text-anchor='middle' dy='.3em'%3ELuxury Car - Featured%3C/text%3E%3C/svg%3E",
    tag: "Editor's Pick",
    author: "Arjun Mehta",
    date: "Dec 15, 2024",
    readTime: "12 min read"
  }

  const blogPosts = [
    {
      id: 2,
      title: "2024 Porsche 911: Pre-Owned Performance Excellence",
      excerpt: "Why the 911 remains the ultimate sports car investment, and what to look for in the pre-owned market.",
      image: "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23444'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23fff' text-anchor='middle' dy='.3em'%3EPorsche 911%3C/text%3E%3C/svg%3E",
      category: "Car Reviews",
      author: "Priya Singh",
      date: "Dec 12, 2024",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Luxury Car Financing: Smart Strategies for 2025",
      excerpt: "Navigate interest rates, loan terms, and hidden costs when financing your dream luxury vehicle.",
      image: "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23555'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23fff' text-anchor='middle' dy='.3em'%3EFinancing Guide%3C/text%3E%3C/svg%3E",
      category: "Finance & Insurance",
      author: "Raj Kapoor",
      date: "Dec 10, 2024",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Mercedes-Benz S-Class: Ownership Experience Decoded",
      excerpt: "Real owner insights into maintaining and enjoying the flagship luxury sedan experience.",
      image: "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23666'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23fff' text-anchor='middle' dy='.3em'%3EMercedes S-Class%3C/text%3E%3C/svg%3E",
      category: "Ownership Tips",
      author: "Kavya Nair",
      date: "Dec 8, 2024",
      readTime: "15 min read"
    },
    {
      id: 5,
      title: "BMW M Series: Track to Street Performance Guide",
      excerpt: "Understanding the M badge heritage and what makes these performance machines special in the pre-owned space.",
      image: "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23777'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23fff' text-anchor='middle' dy='.3em'%3EBMW M Series%3C/text%3E%3C/svg%3E",
      category: "Car Reviews",
      author: "Vikram Shah",
      date: "Dec 5, 2024",
      readTime: "12 min read"
    },
    {
      id: 6,
      title: "Inspection Checklist: What Every Luxury Car Buyer Needs",
      excerpt: "Professional tips to evaluate pre-owned luxury vehicles like an expert before making your purchase.",
      image: "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23888'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23fff' text-anchor='middle' dy='.3em'%3EInspection Guide%3C/text%3E%3C/svg%3E",
      category: "Buying Guides",
      author: "Anita Desai",
      date: "Dec 3, 2024",
      readTime: "18 min read"
    },
    {
      id: 7,
      title: "Audi Quattro Heritage: All-Weather Luxury Performance",
      excerpt: "Exploring Audi's legendary all-wheel-drive system and its impact on luxury car ownership.",
      image: "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23999'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23fff' text-anchor='middle' dy='.3em'%3EAudi Quattro%3C/text%3E%3C/svg%3E",
      category: "Car Reviews",
      author: "Rohit Sharma",
      date: "Nov 30, 2024",
      readTime: "14 min read"
    }
  ]

  const filteredPosts = activeFilter === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter)

  const handleEmailSubmit = () => {
    console.log('Newsletter signup:', email)
    setEmail('')
    // Add your newsletter signup logic here
  }

  return (
    <div className="min-h-screen bg-gray-900" style={{ backgroundColor: '#0e0e0e' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Epic Luxe <span className="text-yellow-500" style={{ color: '#d4af37' }}>Journal</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stories, insights & advice from the world of pre-owned luxury cars.
            </p>
            
            {/* Newsletter Subscribe */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-black/50 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-all duration-300"
                  style={{ borderColor: '#d4af37' }}
                />
                <button
                  onClick={handleEmailSubmit}
                  className="absolute right-2 top-2 px-6 py-2 bg-yellow-500 text-black rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
                  style={{ backgroundColor: '#d4af37' }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Blog Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative group cursor-pointer">
          <div className="relative overflow-hidden rounded-3xl bg-gray-800 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 transform hover:scale-[1.02]">
            <div className="aspect-[21/9] relative overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-2 bg-yellow-500 text-black text-sm font-bold rounded-full" style={{ backgroundColor: '#d4af37' }}>
                  <Tag className="w-4 h-4 inline mr-2" />
                  {featuredPost.tag}
                </span>
                <div className="flex items-center text-gray-300 text-sm">
                  <User className="w-4 h-4 mr-2" />
                  {featuredPost.author}
                  <Calendar className="w-4 h-4 ml-4 mr-2" />
                  {featuredPost.date}
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  {featuredPost.readTime}
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
                {featuredPost.subtitle}
              </p>
              
              <button className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300">
                Read Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
              }`}
              style={{
                backgroundColor: activeFilter === category ? '#d4af37' : undefined
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group cursor-pointer bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-yellow-500/10 transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-2"
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-yellow-500 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </span>
                  </div>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </span>
                </div>
              </div>
              
              <div className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: 'linear-gradient(to right, transparent, #d4af37, transparent)' }}></div>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-12 text-center border border-gray-700">
          <h3 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Luxury Car Insights
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Get the latest stories, buying guides, and expert advice delivered to your inbox weekly.
          </p>
          
          <div className="max-w-lg mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-black/50 border border-yellow-500 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                style={{ borderColor: '#d4af37' }}
                required
              />
              <button
                onClick={handleEmailSubmit}
                className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: '#d4af37' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust/Readership Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-yellow-500" style={{ color: '#d4af37' }} />
            Trusted by 5,000+ readers
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-yellow-500" style={{ color: '#d4af37' }} />
            Updated weekly
          </div>
          <div className="flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" style={{ color: '#d4af37' }} />
            4.9★ Rated
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold text-white mb-4">
            Epic Luxe <span className="text-yellow-500" style={{ color: '#d4af37' }}>Journal</span>
          </div>
          <p className="text-gray-400">
            © 2024 Epic Luxe. Elevating luxury car ownership experiences.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default EpicLuxeBlog