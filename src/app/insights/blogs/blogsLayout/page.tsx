'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play, Clock, User, Star, ArrowRight, Sparkles, Globe } from 'lucide-react'

export default function EpicLuxeBlog() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentCarousel, setCurrentCarousel] = useState(0)
  const [isVisible, setIsVisible] = useState({})
  const heroRef = useRef(null)
  const observerRef = useRef(null)

  const categories = ['All', 'Ownership', 'Finance', 'Behind the Wheel', 'Luxury Hacks', 'Trends', 'Reviews']
  
  const featuredArticle = {
    title: "The Art of Acquiring Your First Luxury Classic",
    subtitle: "A comprehensive guide to navigating the world of heritage automobiles",
    author: "Vikram Mehta",
    readTime: "8 min read",
    tag: "Editor's Pick",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"
  }

  const articles = [
    {
      title: "Bentley Bentayga: The Art of Luxury SUV Excellence",
      category: "Reviews",
      author: "Priya Singh",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80"
    },
    {
      title: "Investment Strategy: Porsche 911 Market Analysis",
      category: "Finance",
      author: "Arjun Kapoor",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80"
    },
    {
      title: "Maintenance Mastery: Keeping Your McLaren Perfect",
      category: "Ownership",
      author: "Sarah Chen",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80"
    },
    {
      title: "The Psychology of Luxury Car Ownership",
      category: "Trends",
      author: "Dr. Rajesh Gupta",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80"
    }
  ]

  const carouselItems = [
    { title: "Top Read This Month", count: "47K views", icon: "📈" },
    { title: "Highest Rated Articles", count: "4.9★ average", icon: "⭐" },
    { title: "Most Commented", count: "2.1K discussions", icon: "💬" }
  ]

  const luxuryHacks = [
    "Always negotiate service packages when buying",
    "Document every modification for resale value",
    "Join owner clubs for exclusive access",
    "Consider ceramic coating within 30 days"
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }))
        })
      },
      { threshold: 0.1 }
    )

    observerRef.current = observer
    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarousel((prev) => (prev + 1) % carouselItems.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [carouselItems.length])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Cinematic Hero Block */}
      <div ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80')",
            filter: 'brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="backdrop-blur-md bg-black/20 rounded-3xl p-12 border border-white/10">
            <h1 className="font-serif text-6xl md:text-7xl font-light mb-6 tracking-tight">
              Epic Luxe <span className="text-yellow-400">Journal</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light opacity-90 italic">
              Where luxury speaks, stories follow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3 text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 transition-all duration-300"
              />
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-medium hover:bg-yellow-300 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Editor's Spotlight */}
      <section id="spotlight" data-animate className="py-20 px-6 max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 transform ${isVisible.spotlight ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl blur opacity-0 group-hover:opacity-75 transition-all duration-500" />
            <div className="relative bg-gradient-to-r from-gray-900 to-black rounded-3xl overflow-hidden border border-gray-800">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium">
                    <Sparkles size={16} />
                    {featuredArticle.tag}
                  </div>
                  <h2 className="font-serif text-4xl font-light leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {featuredArticle.subtitle}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600" />
                    <div>
                      <p className="font-medium">{featuredArticle.author}</p>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock size={12} />
                        {featuredArticle.readTime}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-500">
                  <Image 
                    src={featuredArticle.image}
                    alt="Featured article"
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Play size={20} className="text-yellow-400 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid - Thematic Flow */}
      <section id="content-grid" data-animate className="py-20 px-6 max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 delay-200 transform ${isVisible['content-grid'] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 relative ${
                  activeFilter === category
                    ? 'text-yellow-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {category}
                {activeFilter === category && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-yellow-400 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-500 ${
                  index % 3 === 1 ? 'md:translate-y-8' : ''
                }`}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-yellow-400/50 transition-all duration-300">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/0 to-yellow-600/0 group-hover:from-yellow-400/20 group-hover:to-yellow-600/20 rounded-2xl transition-all duration-300" />
                  <div className="relative">
                    <div className="overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="inline-block bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium mb-3">
                        {article.category}
                      </div>
                      <h3 className="font-serif text-xl font-light mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reader's Choice Carousel */}
      <section id="carousel" data-animate className="py-20 px-6 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible.carousel ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h2 className="font-serif text-4xl text-center mb-12">Reader&apos;s Choice</h2>
            
            <div className="relative">
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setCurrentCarousel(currentCarousel === 0 ? carouselItems.length - 1 : currentCarousel - 1)}
                  className="absolute left-0 z-10 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-yellow-400/30 hover:border-yellow-400 transition-all duration-300"
                >
                  <ChevronLeft className="text-yellow-400" />
                </button>
                
                <div className="w-full max-w-md">
                  <div className="relative h-48 overflow-hidden rounded-2xl">
                    {carouselItems.map((item, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-500 ${
                          index === currentCarousel ? 'opacity-100 transform-none' : 'opacity-0 transform scale-95'
                        }`}
                      >
                        <div className="h-full bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                          <div className="text-4xl mb-4">{item.icon}</div>
                          <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
                          <p className="text-yellow-400 font-medium">{item.count}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => setCurrentCarousel((currentCarousel + 1) % carouselItems.length)}
                  className="absolute right-0 z-10 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-yellow-400/30 hover:border-yellow-400 transition-all duration-300"
                >
                  <ChevronRight className="text-yellow-400" />
                </button>
              </div>
              
              <div className="flex justify-center gap-2 mt-6">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCarousel(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentCarousel ? 'bg-yellow-400 w-8' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Lens - Quick Glance */}
      <section id="luxury-lens" data-animate className="py-20 px-6 max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 delay-400 transform ${isVisible['luxury-lens'] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="font-serif text-4xl text-center mb-12">
            Luxury <span className="text-yellow-400">Lens</span>
          </h2>
          
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 border border-gray-800">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {luxuryHacks.map((hack, index) => (
                <div
                  key={index}
                  className="group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 h-full">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 flex-shrink-0" />
                      <p className="text-sm leading-relaxed group-hover:text-yellow-400 transition-colors duration-300">
                        {hack}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription CTA - Vogue Style */}
      <section id="subscription" data-animate className="py-20 px-6">
        <div className={`transition-all duration-1000 delay-500 transform ${isVisible.subscription ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-black/20" />
              {/* Animated particles */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-pulse" />
              <div className="absolute top-12 right-8 w-1 h-1 bg-white rounded-full animate-ping" />
              <div className="absolute bottom-8 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="relative z-10 text-center py-16 px-8">
              <h2 className="font-serif text-5xl font-light text-black mb-6">
                Join the Luxe Club
              </h2>
              <p className="text-xl text-black/80 mb-8">
                Be the first to know about exclusive stories and luxury insights
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/90 backdrop-blur-sm border-0 rounded-full px-6 py-4 text-black placeholder-black/60 focus:outline-none focus:bg-white transition-all duration-300"
                />
                <button className="bg-black text-yellow-400 px-8 py-4 rounded-full font-medium hover:bg-gray-900 transition-all duration-300 flex items-center gap-2">
                  Subscribe
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Trust Strip */}
      <section id="trust" data-animate className="py-12 px-6 border-t border-gray-800">
        <div className={`transition-all duration-1000 delay-600 transform ${isVisible.trust ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-center md:text-left">
              <div className="flex items-center gap-3">
                <User className="text-yellow-400" size={20} />
                <span className="text-gray-300">Trusted by 10K+ luxury owners</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="text-yellow-400" size={20} />
                <span className="text-gray-300">Rated 4.9★ on Google</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="text-yellow-400" size={20} />
                <span className="text-gray-300">Updated Weekly</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}