"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { 
  PenTool, 
  Eye, 
  EyeOff, 
  Star, 
  StarOff, 
  Trash2, 
  Edit3, 
  Plus, 
  Calendar,
  Search,
  Filter
} from "lucide-react";

interface Blog {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  category: string;
  status: 'draft' | 'published';
  featured: boolean;
  image?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

interface BlogStats {
  total: number;
  published: number;
  featured: number;
  draft: number;
}

interface ApiError {
  message?: string;
  error?: string;
}

const COLORS = {
  background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
  cardBg: "#1a1a1a",
  cardHover: "#2a2a2a",
  textPrimary: "#D4AF37",
  textSecondary: "#FFFFFF",
  textMuted: "#999999",
  buttonBg: "#2a2a2a",
  buttonHover: "#D4AF37",
  border: "#333333",
  featuredBg: "linear-gradient(135deg, #D4AF37 0%, #BFA980 100%)",
  featuredText: "#0a0a0a",
  publishedBg: "#1e2a1e",
  draftBg: "#2a1e1e",
  successBg: "#166534",
  errorBg: "#991b1b",
  gradient: "linear-gradient(135deg, #D4AF37 0%, #BFA980 100%)",
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [stats, setStats] = useState<BlogStats>({ total: 0, published: 0, featured: 0, draft: 0 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "featured">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;

  const axiosInstance = useMemo(() => {
    const instance = axios.create();
    instance.interceptors.request.use(
      (config) => {
        console.log('[DEBUG] Frontend request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
          timestamp: new Date().toISOString()
        });
        return config;
      },
      (error) => {
        console.error('[ERROR] Frontend request error:', error);
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (response) => {
        console.log('[DEBUG] Frontend response received:', {
          status: response.status,
          url: response.config.url,
          data: response.data,
          timestamp: new Date().toISOString()
        });
        return response;
      },
      (error) => {
        console.error('[ERROR] Frontend API error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          data: error.response?.data,
          message: error.message,
          timestamp: new Date().toISOString()
        });
        return Promise.reject(error);
      }
    );
    return instance;
  }, []);

  // Fetch blogs and stats
  const fetchBlogs = useCallback(async () => {
    console.log('[DEBUG] Starting to fetch blogs and stats');
    setLoading(true);
    setError(null);
    try {
      const [blogsRes, statsRes] = await Promise.all([
        axiosInstance.get<{ success: boolean; data: Blog[] }>('http://localhost:5000/admin/blogs'),
        axiosInstance.get<{ success: boolean; data: BlogStats }>('http://localhost:5000/admin/blogs-stats')
      ]);

      console.log('[DEBUG] Fetch results:', {
        blogsSuccess: blogsRes.data.success,
        blogsCount: blogsRes.data.data?.length || 0,
        statsSuccess: statsRes.data.success,
        stats: statsRes.data.data
      });

      if (blogsRes.data.success) {
        setBlogs(blogsRes.data.data || []);
        console.log('[DEBUG] Blogs set in state:', blogsRes.data.data?.length || 0);
      } else {
        console.error('[ERROR] Blogs fetch failed:', blogsRes.data);
      }
      if (statsRes.data.success) {
        setStats(statsRes.data.data);
        console.log('[DEBUG] Stats set in state:', statsRes.data.data);
      } else {
        console.error('[ERROR] Stats fetch failed:', statsRes.data);
      }
    } catch (error) {
      console.error('[ERROR] Failed to fetch blogs:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString()
      });
      setError("Failed to fetch blogs");
    } finally {
      setLoading(false);
      console.log('[DEBUG] Fetch blogs completed');
    }
  }, [axiosInstance]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  // Toggle publish status
  const togglePublished = useCallback(async (blog: Blog) => {
    console.log('[DEBUG] Toggling publish status for blog:', {
      id: blog.id,
      slug: blog.slug,
      currentStatus: blog.status,
      title: blog.title
    });
    try {
      const newStatus = blog.status === 'published' ? 'draft' : 'published';
      console.log('[DEBUG] Sending status update request:', {
        slug: blog.slug,
        newStatus,
        url: `http://localhost:5000/api/blogs/${blog.slug}`
      });
      await axiosInstance.put(`http://localhost:5000/api/blogs/${blog.slug}`, {
        status: newStatus,
      });
      console.log('[DEBUG] Status update successful for:', blog.slug);
      setMessage(`${blog.title} is now ${newStatus}.`);
      fetchBlogs();
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      console.error('[ERROR] Failed to update blog status:', {
        blogSlug: blog.slug,
        error: error.response?.data || error.message,
        status: error.response?.status,
        timestamp: new Date().toISOString()
      });
      setError("Failed to update blog status: " + (error.response?.data?.message || error.message));
    }
  }, [axiosInstance, fetchBlogs]);

  // Toggle featured status
  const toggleFeatured = useCallback(async (blog: Blog) => {
    console.log('[DEBUG] Toggling featured status for blog:', {
      id: blog.id,
      slug: blog.slug,
      currentFeatured: blog.featured,
      title: blog.title
    });
    try {
      const newFeatured = !blog.featured;
      console.log('[DEBUG] Sending featured update request:', {
        slug: blog.slug,
        newFeatured,
        url: `http://localhost:5000/api/blogs/${blog.slug}`
      });
      await axiosInstance.put(`http://localhost:5000/api/blogs/${blog.slug}`, {
        featured: newFeatured,
      });
      console.log('[DEBUG] Featured update successful for:', blog.slug);
      setMessage(`${blog.title} is now ${newFeatured ? "featured" : "unfeatured"}.`);
      fetchBlogs();
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      console.error('[ERROR] Failed to update featured status:', {
        blogSlug: blog.slug,
        error: error.response?.data || error.message,
        status: error.response?.status,
        timestamp: new Date().toISOString()
      });
      setError("Failed to update featured status: " + (error.response?.data?.message || error.message));
    }
  }, [axiosInstance, fetchBlogs]);

  // Delete blog
  const deleteBlog = useCallback(async (slug: string, title: string) => {
    console.log('[DEBUG] Delete blog requested:', { slug, title });
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      console.log('[DEBUG] Delete cancelled by user');
      return;
    }
    try {
      console.log('[DEBUG] Sending delete request:', {
        slug,
        url: `http://localhost:5000/api/blogs/${slug}?removeImage=true`
      });
      await axiosInstance.delete(`http://localhost:5000/api/blogs/${slug}?removeImage=true`);
      console.log('[DEBUG] Blog deleted successfully:', slug);
      setMessage("Blog deleted successfully.");
      fetchBlogs();
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      console.error('[ERROR] Failed to delete blog:', {
        slug,
        title,
        error: error.response?.data || error.message,
        status: error.response?.status,
        timestamp: new Date().toISOString()
      });
      setError("Failed to delete blog: " + (error.response?.data?.message || error.message));
    }
  }, [axiosInstance, fetchBlogs]);

  // Filter and sort blogs
  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = blogs;

    // Filter by search term
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(lower) ||
        blog.subtitle?.toLowerCase().includes(lower) ||
        blog.content.toLowerCase().includes(lower) ||
        blog.category.toLowerCase().includes(lower)
      );
    }

    // Filter by status
    if (statusFilter === "published") {
      filtered = filtered.filter(blog => blog.status === "published");
    } else if (statusFilter === "draft") {
      filtered = filtered.filter(blog => blog.status === "draft");
    } else if (statusFilter === "featured") {
      filtered = filtered.filter(blog => blog.featured);
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(blog => blog.category === categoryFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "newest":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [blogs, searchTerm, statusFilter, categoryFilter, sortBy]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(blogs.map(blog => blog.category)));
    return uniqueCategories.sort();
  }, [blogs]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredAndSortedBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter, sortBy]);

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.background,
      color: COLORS.textSecondary,
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <header style={{
        padding: "2rem 1rem",
        textAlign: "center",
        background: "rgba(26, 26, 26, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <h1 style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: "800",
          background: COLORS.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "0.02em",
          marginBottom: "0.5rem",
        }}>
          Blog Management Studio
        </h1>
        <p style={{ 
          fontSize: "1.2rem", 
          color: COLORS.textMuted,
          fontWeight: "300",
        }}>
          Create, manage, and publish exceptional content
        </p>
      </header>

      <main style={{ maxWidth: "1600px", margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Stats Dashboard */}
        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}>
          {[
            { label: "Total Blogs", value: stats.total, icon: FileText, color: "#3B82F6" },
            { label: "Published", value: stats.published, icon: Eye, color: "#10B981" },
            { label: "Featured", value: stats.featured, icon: Star, color: COLORS.textPrimary },
            { label: "Drafts", value: stats.draft, icon: PenTool, color: "#F59E0B" },
          ].map((stat, index) => (
            <div key={index} style={{
              background: COLORS.cardBg,
              borderRadius: "16px",
              padding: "2rem",
              border: `1px solid ${COLORS.border}`,
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 10px 30px rgba(212, 175, 55, 0.1)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ color: COLORS.textMuted, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                    {stat.label}
                  </p>
                  <p style={{ 
                    fontSize: "2.5rem", 
                    fontWeight: "700", 
                    color: stat.color,
                    lineHeight: "1",
                  }}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon size={48} style={{ color: stat.color, opacity: 0.8 }} />
              </div>
            </div>
          ))}
        </section>

        {/* Controls */}
        <section style={{
          background: COLORS.cardBg,
          borderRadius: "16px",
          padding: "2rem",
          marginBottom: "2rem",
          border: `1px solid ${COLORS.border}`,
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
            gap: "1rem",
            alignItems: "end",
            marginBottom: "1rem",
          }}>
            {/* Search */}
            <div>
              <label style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: COLORS.textMuted,
                fontSize: "0.9rem",
                fontWeight: "500",
              }}>
                Search Content
              </label>
              <div style={{ position: "relative" }}>
                <Search size={20} style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: COLORS.textMuted,
                }} />
                <input
                  type="search"
                  placeholder="Search by title, content, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem 0.75rem 3rem",
                    borderRadius: "8px",
                    border: `2px solid ${COLORS.border}`,
                    backgroundColor: "#0a0a0a",
                    color: COLORS.textSecondary,
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = COLORS.textPrimary;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.textPrimary}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = COLORS.border;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: COLORS.textMuted,
                fontSize: "0.9rem",
                fontWeight: "500",
              }}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: `2px solid ${COLORS.border}`,
                  backgroundColor: "#0a0a0a",
                  color: COLORS.textSecondary,
                  fontSize: "1rem",
                  outline: "none",
                }}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="featured">Featured</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: COLORS.textMuted,
                fontSize: "0.9rem",
                fontWeight: "500",
              }}>
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: `2px solid ${COLORS.border}`,
                  backgroundColor: "#0a0a0a",
                  color: COLORS.textSecondary,
                  fontSize: "1rem",
                  outline: "none",
                }}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: COLORS.textMuted,
                fontSize: "0.9rem",
                fontWeight: "500",
              }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: `2px solid ${COLORS.border}`,
                  backgroundColor: "#0a0a0a",
                  color: COLORS.textSecondary,
                  fontSize: "1rem",
                  outline: "none",
                }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            {/* Create New Blog Button */}
            <Link href="/luxe/admin/blogs/create" style={{ textDecoration: "none" }}>
              <button style={{
                background: COLORS.gradient,
                color: COLORS.featuredText,
                border: "none",
                borderRadius: "12px",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 25px rgba(212, 175, 55, 0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                <Plus size={20} />
                Create Blog
              </button>
            </Link>
          </div>
        </section>

        {/* Messages */}
        {(message || error) && (
          <div style={{
            marginBottom: "2rem",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            color: "#fff",
            background: message 
              ? `linear-gradient(135deg, ${COLORS.successBg} 0%, #15803d 100%)`
              : `linear-gradient(135deg, ${COLORS.errorBg} 0%, #dc2626 100%)`,
            fontWeight: "600",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}>
            {message ?? error}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div style={{
            padding: "4rem",
            textAlign: "center",
            color: COLORS.textPrimary,
            fontSize: "1.2rem",
          }}>
            <div style={{ 
              display: "inline-block",
              fontSize: "3rem",
              marginBottom: "1rem",
              animation: "spin 1s linear infinite",
            }}>
              ⚙️
            </div>
            <p>Loading your content...</p>
          </div>
        ) : paginatedBlogs.length === 0 ? (
          <div style={{
            padding: "4rem",
            textAlign: "center",
            color: COLORS.textMuted,
            fontSize: "1.1rem",
          }}>
            <PenTool size={64} style={{ marginBottom: "1rem", opacity: 0.5 }} />
            <p>No blogs found matching your criteria.</p>
            <Link href="/luxe/admin/blogs/create" style={{ textDecoration: "none" }}>
              <button style={{
                marginTop: "1rem",
                background: COLORS.gradient,
                color: COLORS.featuredText,
                border: "none",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
              }}>
                Create Your First Blog
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            <section style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
              gap: "2rem",
              marginBottom: "2rem",
            }}>
              {paginatedBlogs.map((blog) => (
                <article key={blog.id} style={{
                  background: COLORS.cardBg,
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: `1px solid ${blog.featured ? COLORS.textPrimary : COLORS.border}`,
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 10px 30px rgba(212, 175, 55, 0.1)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                  {/* Featured Badge */}
                  {blog.featured && (
                    <div style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      background: COLORS.featuredBg,
                      color: COLORS.featuredText,
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      zIndex: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}>
                      <Star size={14} />
                      FEATURED
                    </div>
                  )}

                  {/* Image */}
                  {blog.image && (
                    <div style={{
                      height: "200px",
                      backgroundImage: `url(${blog.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                    }}>
                      <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "50%",
                        background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                      }} />
                    </div>
                  )}

                  {/* Content */}
                  <div style={{ padding: "1.5rem" }}>
                    {/* Status and Category */}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}>
                      <span style={{
                        background: blog.status === 'published' ? "#10B981" : "#F59E0B",
                        color: "white",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "12px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                      }}>
                        {blog.status}
                      </span>
                      <span style={{
                        color: COLORS.textMuted,
                        fontSize: "0.9rem",
                        background: "rgba(212, 175, 55, 0.1)",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "12px",
                      }}>
                        {blog.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{
                      color: COLORS.textPrimary,
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      marginBottom: "0.5rem",
                      lineHeight: "1.3",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {blog.title}
                    </h3>

                    {/* Subtitle */}
                    {blog.subtitle && (
                      <p style={{
                        color: COLORS.textSecondary,
                        fontSize: "0.95rem",
                        marginBottom: "1rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: "1.4",
                      }}>
                        {blog.subtitle}
                      </p>
                    )}

                    {/* Dates */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1.5rem",
                      fontSize: "0.85rem",
                      color: COLORS.textMuted,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <Calendar size={14} />
                        Created: {new Date(blog.createdAt).toLocaleDateString()}
                      </div>
                      {blog.publishedAt && (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <Eye size={14} />
                          Published: {new Date(blog.publishedAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr 1fr",
                      gap: "0.5rem",
                    }}>
                      <button
                        onClick={() => togglePublished(blog)}
                        style={{
                          background: blog.status === 'published' ? "#EF4444" : "#10B981",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          padding: "0.5rem",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.25rem",
                        }}
                      >
                        {blog.status === 'published' ? <EyeOff size={14} /> : <Eye size={14} />}
                        {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>

                      <button
                        onClick={() => toggleFeatured(blog)}
                        style={{
                          background: blog.featured ? "#6B7280" : COLORS.textPrimary,
                          color: blog.featured ? "white" : COLORS.featuredText,
                          border: "none",
                          borderRadius: "8px",
                          padding: "0.5rem",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.25rem",
                        }}
                      >
                        {blog.featured ? <StarOff size={14} /> : <Star size={14} />}
                        {blog.featured ? 'Unfeature' : 'Feature'}
                      </button>

                      <Link href={`/luxe/admin/blogs/edit/${blog.slug}`} style={{ textDecoration: "none" }}>
                        <button style={{
                          background: "transparent",
                          color: COLORS.textPrimary,
                          border: `2px solid ${COLORS.textPrimary}`,
                          borderRadius: "8px",
                          padding: "0.5rem",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.25rem",
                          width: "100%",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = COLORS.textPrimary;
                          e.currentTarget.style.color = COLORS.featuredText;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = COLORS.textPrimary;
                        }}>
                          <Edit3 size={14} />
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => deleteBlog(blog.slug, blog.title)}
                        style={{
                          background: "#EF4444",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          padding: "0.5rem",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.25rem",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#DC2626";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#EF4444";
                        }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "2rem",
              }}>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    background: currentPage === 1 ? "transparent" : COLORS.cardBg,
                    color: currentPage === 1 ? COLORS.textMuted : COLORS.textPrimary,
                    border: `2px solid ${COLORS.textPrimary}`,
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    fontWeight: "600",
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      background: page === currentPage ? COLORS.textPrimary : "transparent",
                      color: page === currentPage ? COLORS.featuredText : COLORS.textPrimary,
                      border: `2px solid ${COLORS.textPrimary}`,
                      cursor: "pointer",
                      fontWeight: "600",
                      minWidth: "2.5rem",
                    }}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    background: currentPage === totalPages ? "transparent" : COLORS.cardBg,
                    color: currentPage === totalPages ? COLORS.textMuted : COLORS.textPrimary,
                    border: `2px solid ${COLORS.textPrimary}`,
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    fontWeight: "600",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                  }}
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </main>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}