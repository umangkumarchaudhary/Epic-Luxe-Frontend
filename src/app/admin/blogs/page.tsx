'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  Calendar,
  Clock,
  TrendingUp,
  Users,
  FileText,
  Settings,
  BarChart3,
  Save,
  Send,
  X,
  Image,
  Upload,
  Copy,
  Check,
  ChevronDown,
  Tag,
  User,
  Folder,
  Heart,
  MessageCircle,
  Share2,
  ArrowUp,
  Loader
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  status: string;
  category: string;
  publishDate: string | null;
  views: number;
  readTime: string;
  is_pinned: boolean;
  cover_image_url: string;
}


interface UploadedImage {
  id: number;
  file_name: string;
  original_name: string;
  file_url: string;
  file_size: number;
  mime_type: string;
}


const BlogAdminDashboard = () => {
  // State Management
  const [activeView, setActiveView] = useState('list'); // 'list' or 'create' or 'edit'
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'newest',
    status: 'all',
    category: 'all',
    search: ''
  });

  

  // Blog Editor State
  const [blogData, setBlogData] = useState({
    title: '',
    subtitle: '',
    short_description: '',
    content: '',
    cover_image_url: '',
    author_id: '',
    category_id: '',
    tags: [],
    status: 'draft',
    is_featured: false,
    is_pinned: false,
    meta_title: '',
    meta_description: ''
  });

  const [showMediaModal, setShowMediaModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  

  // Mock data
  const stats = {
    totalBlogs: 24,
    published: 18,
    drafts: 6,
    totalViews: 15400
  };

  const mockBlogs = [
    {
      id: 1,
      title: "The Ultimate Guide to Investing in Pre-Owned Luxury Vehicles",
      subtitle: "Porsche 911 Market Analysis",
      author: "James Wellington",
      status: "published",
      category: "Investment",
      publishDate: "2025-03-15",
      views: 1250,
      readTime: "8 min",
      is_pinned: true,
      cover_image_url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "BMW M Series: Performance Meets Investment Value",
      subtitle: "",
      author: "Sarah Mitchell",
      status: "published",
      category: "Performance",
      publishDate: "2025-03-10",
      views: 890,
      readTime: "6 min",
      is_pinned: false,
      cover_image_url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Ferrari Market Trends: What Collectors Need to Know",
      subtitle: "2025 Market Analysis",
      author: "Michael Chen",
      status: "draft",
      category: "Market Analysis",
      publishDate: null,
      views: 0,
      readTime: "10 min",
      is_pinned: false,
      cover_image_url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop"
    }
  ];

  // Initialize mock data
  useEffect(() => {
    setBlogs(mockBlogs);
  }, []);

  // Media Upload Functions
  const handleFiles = async (files: FileList | File[]) => {
  setLoading(true);
  // Simulate upload
  setTimeout(() => {
    const newImages = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      file_name: `${Date.now()}-${file.name}`,
      original_name: file.name,
      file_url: URL.createObjectURL(file),
      file_size: file.size,
      mime_type: file.type,
    }));
    setUploadedImages((prev) => [...prev, ...newImages]);
    setLoading(false);
  }, 1500);
};


  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.type === "dragenter" || e.type === "dragover") {
    setDragActive(true);
  } else if (e.type === "dragleave") {
    setDragActive(false);
  }
};

const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    handleFiles(e.dataTransfer.files);
  }
};


  const selectImage = (image: UploadedImage) => {
  setBlogData(prev => ({ ...prev, cover_image_url: image.file_url }));
  setShowMediaModal(false);
};

  const copyUrl = (url: string) => {
  navigator.clipboard.writeText(url);
  setCopiedUrl(url);
  setTimeout(() => setCopiedUrl(null), 2000);
};

  const saveBlog = async (publishNow = false) => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      const status = publishNow ? 'published' : blogData.status;
      console.log('Saving blog:', { ...blogData, status });
      setSaving(false);
      if (publishNow) {
        setActiveView('list');
      }
    }, 1000);
  };

  const resetForm = () => {
    setBlogData({
      title: '',
      subtitle: '',
      short_description: '',
      content: '',
      cover_image_url: '',
      author_id: '',
      category_id: '',
      tags: [],
      status: 'draft',
      is_featured: false,
      is_pinned: false,
      meta_title: '',
      meta_description: ''
    });
  };

  return (
    <>
      {/* Premium Font Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        .admin-font {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .admin-heading {
          font-family: 'Playfair Display', serif;
        }

        .smooth-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(26, 26, 26, 0.8);
          border: 1px solid rgba(191, 169, 128, 0.1);
        }

        .glow-effect {
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
        }

        .content-fade-in {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .typing-indicator::after {
          content: '|';
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e] admin-font">
        
        {/* Header */}
        <div className="sticky top-0 glass-effect z-50 border-b border-[#BFA980]/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-[#0e0e0e]" />
                </div>
                <div>
                  <h1 className="text-xl font-light text-white/90 admin-heading">Blog Management</h1>
                  <p className="text-sm text-white/50">Create and manage luxury car insights</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {activeView !== 'list' && (
                  <button
                    onClick={() => setActiveView('list')}
                    className="px-4 py-2 text-white/70 hover:text-white/90 smooth-transition"
                  >
                    ← Back to List
                  </button>
                )}
                <button
                  onClick={() => {
                    resetForm();
                    setActiveView('create');
                  }}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] px-6 py-2.5 rounded-xl font-medium hover:from-[#BFA980] hover:to-[#D4AF37] smooth-transition flex items-center space-x-2 glow-effect"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Blog</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          
          {/* Stats Cards - Only show on list view */}
          {activeView === 'list' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 content-fade-in">
              <div className="glass-effect rounded-2xl p-6 smooth-transition hover:glow-effect">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-light">Total Blogs</p>
                    <p className="text-2xl font-light text-white/90 mt-1">{stats.totalBlogs}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-2xl p-6 smooth-transition hover:glow-effect">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-light">Published</p>
                    <p className="text-2xl font-light text-[#D4AF37] mt-1">{stats.published}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                    <Eye className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-2xl p-6 smooth-transition hover:glow-effect">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-light">Drafts</p>
                    <p className="text-2xl font-light text-[#BFA980] mt-1">{stats.drafts}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#BFA980]/20 rounded-xl flex items-center justify-center">
                    <Edit3 className="h-6 w-6 text-[#BFA980]" />
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-2xl p-6 smooth-transition hover:glow-effect">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-light">Total Views</p>
                    <p className="text-2xl font-light text-white/90 mt-1">{stats.totalViews.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          {activeView === 'list' ? (
            /* Blog List View */
            <div className="content-fade-in">
              {/* Filters */}
              <div className="glass-effect rounded-2xl p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-4">
                    <select 
                      value={filters.sortBy}
                      onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                      className="bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/80 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 smooth-transition"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="most_read">Most Read</option>
                    </select>

                    <select 
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                      className="bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/80 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 smooth-transition"
                    >
                      <option value="all">All Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#BFA980]" />
                    <input
                      type="text"
                      placeholder="Search blogs..."
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                      className="bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/80 rounded-xl pl-10 pr-4 py-2.5 min-w-[300px] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 smooth-transition placeholder:text-white/40"
                    />
                  </div>
                </div>
              </div>

              {/* Blog Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <div key={blog.id} className="glass-effect rounded-2xl overflow-hidden hover:glow-effect smooth-transition group">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={blog.cover_image_url} 
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {blog.is_pinned && (
                          <span className="bg-[#D4AF37]/90 text-[#0e0e0e] px-3 py-1 rounded-full text-xs font-medium">
                            ✨ Pinned
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          blog.status === 'published' 
                            ? 'bg-green-500/90 text-white' 
                            : 'bg-yellow-500/90 text-[#0e0e0e]'
                        }`}>
                          {blog.status}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 smooth-transition"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-white/90 mb-2 line-clamp-2 admin-heading group-hover:text-[#D4AF37] smooth-transition">
                        {blog.title}
                      </h3>
                      {blog.subtitle && (
                        <p className="text-white/60 text-sm mb-3 line-clamp-1">{blog.subtitle}</p>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-white/50 mb-4">
                        <span className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{blog.author}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{blog.readTime}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-white/50">
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{blog.views.toLocaleString()}</span>
                          </span>
                          {blog.publishDate && (
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-[#D4AF37]/10 rounded-lg smooth-transition group/btn">
                            <Eye className="h-4 w-4 text-[#BFA980] group-hover/btn:text-[#D4AF37] smooth-transition" />
                          </button>
                          <button 
  onClick={() => {
    setBlogData({
      title: blog.title,
      subtitle: blog.subtitle,
      short_description: '',
      content: '',
      cover_image_url: blog.cover_image_url,
      author_id: blog.author, // Map author to author_id
      category_id: blog.category, // Map category to category_id
      tags: [],
      status: blog.status,
      is_featured: false,
      is_pinned: blog.is_pinned,
      meta_title: '',
      meta_description: ''
    });
    setActiveView('edit');
  }}
  className="p-2 hover:bg-[#D4AF37]/10 rounded-lg smooth-transition group/btn"
>

                            <Edit3 className="h-4 w-4 text-[#D4AF37] group-hover/btn:text-[#BFA980] smooth-transition" />
                          </button>
                          <button className="p-2 hover:bg-red-500/10 rounded-lg smooth-transition group/btn">
                            <Trash2 className="h-4 w-4 text-red-400 group-hover/btn:text-red-300 smooth-transition" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Blog Editor View */
            <div className="content-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Title & Subtitle */}
                  <div className="glass-effect rounded-2xl p-6">
                    <h2 className="text-lg font-medium text-white/90 mb-4 admin-heading flex items-center space-x-2">
                      <Edit3 className="h-5 w-5 text-[#D4AF37]" />
                      <span>Blog Details</span>
                    </h2>
                    
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Enter blog title..."
                        value={blogData.title}
                        onChange={(e) => setBlogData(prev => ({...prev, title: e.target.value}))}
                        className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/90 rounded-xl px-4 py-3 text-xl font-light placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 smooth-transition admin-heading"
                      />
                      
                      <input
                        type="text"
                        placeholder="Subtitle (optional)"
                        value={blogData.subtitle}
                        onChange={(e) => setBlogData(prev => ({...prev, subtitle: e.target.value}))}
                        className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/80 rounded-xl px-4 py-3 font-light placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 smooth-transition"
                      />
                      
                      <textarea
                        placeholder="Short description for SEO and previews..."
                        value={blogData.short_description}
                        onChange={(e) => setBlogData(prev => ({...prev, short_description: e.target.value}))}
                        rows={3}
                        className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/80 rounded-xl px-4 py-3 font-light placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 smooth-transition resize-none"
                      />
                    </div>
                  </div>

                  {/* Cover Image */}
                  <div className="glass-effect rounded-2xl p-6">
                    <h3 className="text-lg font-medium text-white/90 mb-4 admin-heading flex items-center space-x-2">
                      <Image className="h-5 w-5 text-[#D4AF37]" />
                      <span>Cover Image</span>
                    </h3>
                    
                    {blogData.cover_image_url ? (
                      <div className="relative rounded-xl overflow-hidden">
                        <img 
                          src={blogData.cover_image_url} 
                          alt="Cover" 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 smooth-transition flex items-center justify-center space-x-2">
                          <button
                            onClick={() => setShowMediaModal(true)}
                            className="bg-[#D4AF37] text-[#0e0e0e] px-4 py-2 rounded-lg font-medium smooth-transition hover:bg-[#BFA980]"
                          >
                            Change Image
                          </button>
                          <button
                            onClick={() => setBlogData(prev => ({...prev, cover_image_url: ''}))}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium smooth-transition hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowMediaModal(true)}
                        className="w-full border-2 border-dashed border-[#BFA980]/30 rounded-xl p-8 text-center hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 smooth-transition group"
                      >
                        <Image className="h-12 w-12 mx-auto text-[#BFA980] mb-3 group-hover:text-[#D4AF37] smooth-transition" />
                        <p className="text-white/70 group-hover:text-white/90 smooth-transition">Click to select cover image</p>
                        <p className="text-white/50 text-sm mt-1">Recommended: 1200x600px</p>
                      </button>
                    )}
                  </div>

                  {/* Content Editor */}
                  <div className="glass-effect rounded-2xl p-6">
                    <h3 className="text-lg font-medium text-white/90 mb-4 admin-heading flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-[#D4AF37]" />
                      <span>Content</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 p-3 bg-[#1a1a1a]/40 rounded-lg border border-[#BFA980]/10">
                        <button
                          onClick={() => setShowMediaModal(true)}
                          className="p-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded hover:bg-[#D4AF37]/30 smooth-transition"
                          title="Insert Image"
                        >
                          <Image className="h-4 w-4" />
                        </button>
                        <div className="text-white/50 text-sm">
                          Content editing tools
                        </div>
                      </div>
                      
                      <textarea
                        placeholder="Write your blog content here... 

You can write in Markdown format or plain text. Use the image button above to insert images."
                        value={blogData.content}
                        onChange={(e) => setBlogData(prev => ({...prev, content: e.target.value}))}
                        rows={20}
                        className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/80 rounded-xl px-4 py-4 font-light placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 smooth-transition resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* Sidebar Settings */}
                <div className="lg:col-span-1 space-y-6">
                  
                  {/* Publish Settings */}
                  <div className="glass-effect rounded-2xl p-6">
                    <h3 className="text-lg font-medium text-white/90 mb-4 admin-heading flex items-center space-x-2">
                      <Send className="h-5 w-5 text-[#D4AF37]" />
                      <span>Publish</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <select 
                        value={blogData.status}
                        onChange={(e) => setBlogData(prev => ({...prev, status: e.target.value}))}
                        className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 smooth-transition"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>

                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={blogData.is_featured}
                          onChange={(e) => setBlogData(prev => ({...prev, is_featured: e.target.checked}))}
                          className="w-4 h-4 text-[#D4AF37] bg-[#1a1a1a] border-[#BFA980]/20 rounded focus:ring-[#D4AF37]/40"
                        />
                        <label htmlFor="featured" className="text-white/80 text-sm">Featured Blog</label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="pinned"
                          checked={blogData.is_pinned}
                          onChange={(e) => setBlogData(prev => ({...prev, is_pinned: e.target.checked}))}
                          className="w-4 h-4 text-[#D4AF37] bg-[#1a1a1a] border-[#BFA980]/20 rounded focus:ring-[#D4AF37]/40"
                        />
                        <label htmlFor="pinned" className="text-white/80 text-sm">Pin to Top</label>
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <button
                          onClick={() => saveBlog(false)}
                          disabled={saving}
                          className="flex-1 bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/80 py-3 rounded-xl font-medium hover:bg-[#BFA980]/10 smooth-transition disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                          {saving ? <Loader className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          <span>Save Draft</span>
                        </button>
                        
                        <button
                          onClick={() => saveBlog(true)}
                          disabled={saving}
                          className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] py-3 rounded-xl font-medium hover:from-[#BFA980] hover:to-[#D4AF37] smooth-transition disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                          {saving ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                          <span>Publish</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Categories & Tags */}
                  <div className="glass-effect rounded-2xl p-6">
                    <h3 className="text-lg font-medium text-white/90 mb-4 admin-heading flex items-center space-x-2">
                      <Tag className="h-5 w-5 text-[#D4AF37]" />
                      <span>Organization</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <select 
                        value={blogData.category_id}
                        onChange={(e) => setBlogData(prev => ({...prev, category_id: e.target.value}))}
                        className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 smooth-transition"
                      >
                        <option value="">Select Category</option>
                        <option value="investment">Investment</option>
                        <option value="performance">Performance</option>
                        <option value="market-analysis">Market Analysis</option>
                        <option value="buying-guide">Buying Guide</option>
                      </select>

                      <select 
                        value={blogData.author_id}
                        onChange={(e) => setBlogData(prev => ({...prev, author_id: e.target.value}))}
                        className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 smooth-transition"
                      >
                        <option value="">Select Author</option>
                        <option value="james">James Wellington</option>
                        <option value="sarah">Sarah Mitchell</option>
                        <option value="michael">Michael Chen</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Add tags (comma separated)"
                        className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/80 rounded-xl px-4 py-3 font-light placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 smooth-transition"
                      />
                    </div>
                  </div>

                  {/* SEO Settings */}
                  <div className="glass-effect rounded-2xl p-6">
                    <h3 className="text-lg font-medium text-white/90 mb-4 admin-heading flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-[#D4AF37]" />
                      <span>SEO</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Meta title"
                        value={blogData.meta_title}
                        onChange={(e) => setBlogData(prev => ({...prev, meta_title: e.target.value}))}
                        className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/80 rounded-xl px-4 py-3 font-light placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 smooth-transition"
                      />
                      
                      <textarea
                        placeholder="Meta description"
                        value={blogData.meta_description}
                        onChange={(e) => setBlogData(prev => ({...prev, meta_description: e.target.value}))}
                        rows={3}
                        className="w-full bg-[#1a1a1a]/60 border border-[#BFA980]/20 text-white/80 rounded-xl px-4 py-3 font-light placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 smooth-transition resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Media Modal */}
        {showMediaModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-effect rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-light text-white/90 admin-heading">Media Library</h3>
                <button
                  onClick={() => setShowMediaModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg smooth-transition"
                >
                  <X className="h-5 w-5 text-white/70" />
                </button>
              </div>
              
              <div className="p-6">
                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center smooth-transition mb-6 ${
                    dragActive 
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10' 
                      : 'border-[#BFA980]/30 hover:border-[#BFA980]/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 mx-auto text-[#BFA980] mb-4" />
                  <p className="text-white/70 mb-2">Drag and drop images here, or click to select</p>
                  <p className="text-white/50 text-sm mb-4">Supports: JPG, PNG, WebP (Max 5MB each)</p>
                  
                  <label className="bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-[#0e0e0e] px-6 py-3 rounded-xl font-medium hover:from-[#BFA980] hover:to-[#D4AF37] smooth-transition cursor-pointer inline-flex items-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span>Choose Files</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
  if (e.target.files) {
    handleFiles(e.target.files);
  }
}}

                      className="hidden"
                    />
                  </label>
                </div>

                {/* Loading */}
                {loading && (
                  <div className="mb-6 p-4 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20">
                    <div className="flex items-center space-x-3">
                      <Loader className="animate-spin h-5 w-5 text-[#D4AF37]" />
                      <span className="text-white/80">Uploading images...</span>
                    </div>
                  </div>
                )}

                {/* Image Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {uploadedImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative group bg-[#1a1a1a]/40 rounded-xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/30 smooth-transition cursor-pointer"
                      onClick={() => selectImage(image)}
                    >
                      <img
                        src={image.file_url}
                        alt={image.original_name}
                        className="w-full h-32 object-cover group-hover:scale-105 smooth-transition"
                      />
                      
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 smooth-transition flex items-center justify-center">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyUrl(image.file_url);
                            }}
                            className="p-2 bg-[#D4AF37] text-[#0e0e0e] rounded-lg hover:bg-[#BFA980] smooth-transition"
                          >
                            {copiedUrl === image.file_url ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="p-3">
                        <p className="text-white/80 text-sm font-medium truncate">
                          {image.original_name}
                        </p>
                        <p className="text-white/50 text-xs">
                          {(image.file_size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {uploadedImages.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <Image className="h-16 w-16 mx-auto text-[#BFA980] mb-4" />
                    <p className="text-white/60 mb-2">No images uploaded yet</p>
                    <p className="text-white/40 text-sm">Upload some images to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogAdminDashboard;
