"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { 
  Save, 
  Upload, 
  ArrowLeft, 
  Loader2, 
  ImageIcon,
  X,
  FileText,
  Tag,
  Globe,
  Star
} from "lucide-react";

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
  successBg: "#166534",
  errorBg: "#991b1b",
  gradient: "linear-gradient(135deg, #D4AF37 0%, #BFA980 100%)",
  inputBg: "#2a2a2a",
  inputFocus: "#3a3a3a",
};

const CATEGORIES = [
  "Technology",
  "Lifestyle",
  "Business",
  "Travel",
  "Food",
  "Health",
  "Entertainment",
  "Sports",
  "Science",
  "Education"
];

interface BlogFormData {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  status: 'draft' | 'published';
  featured: boolean;
  image?: string;
}

export default function CreateBlog() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    subtitle: "",
    content: "",
    category: "",
    status: "draft",
    featured: false,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    console.log('[DEBUG] Form input changed:', {
      fieldName: name,
      fieldType: type,
      newValue: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      timestamp: new Date().toISOString()
    });
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('[DEBUG] Image file selected:', {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      hasFile: !!file,
      timestamp: new Date().toISOString()
    });
    
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        console.log('[DEBUG] Image preview generated successfully');
        setImagePreview(reader.result as string);
      };
      reader.onerror = () => {
        console.error('[ERROR] Failed to read image file for preview');
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedImage) {
      console.log('[DEBUG] No image selected for upload');
      return null;
    }

    console.log('[DEBUG] Starting image upload:', {
      fileName: selectedImage.name,
      fileSize: selectedImage.size,
      fileType: selectedImage.type,
      timestamp: new Date().toISOString()
    });

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('image', selectedImage);

    try {
      console.log('[DEBUG] Sending image upload request to:', 'http://localhost:5000/admin/blogs/upload');
      const response = await axios.post('http://localhost:5000/admin/blogs/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('[DEBUG] Image upload response:', {
        success: response.data.success,
        data: response.data.data,
        status: response.status,
        timestamp: new Date().toISOString()
      });

      if (response.data.success) {
        console.log('[DEBUG] Image uploaded successfully:', response.data.data.url);
        return response.data.data.url;
      } else {
        console.error('[ERROR] Image upload failed:', response.data.error);
        throw new Error(response.data.error || 'Upload failed');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      console.error('[ERROR] Image upload error:', {
        error: axiosError.response?.data || axiosError.message,
        status: axiosError.response?.status,
        fileName: selectedImage.name,
        timestamp: new Date().toISOString()
      });
      throw new Error(
        axiosError.response?.data?.error || 
        axiosError.response?.data?.message || 
        'Failed to upload image'
      );
    } finally {
      setUploading(false);
      console.log('[DEBUG] Image upload process completed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[DEBUG] Blog creation form submitted:', {
      title: formData.title,
      subtitle: formData.subtitle,
      category: formData.category,
      status: formData.status,
      featured: formData.featured,
      hasImage: !!selectedImage,
      contentLength: formData.content.length,
      timestamp: new Date().toISOString()
    });
    
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // Upload image if one is selected
      let imageUrl = null;
      if (selectedImage) {
        console.log('[DEBUG] Uploading image before creating blog');
        imageUrl = await uploadImage();
        console.log('[DEBUG] Image upload completed, URL:', imageUrl);
      } else {
        console.log('[DEBUG] No image to upload, proceeding with blog creation');
      }

      // Create blog data
      const blogData = {
        ...formData,
        image: imageUrl,
      };

      console.log('[DEBUG] Creating blog with data:', {
        ...blogData,
        content: `${blogData.content.substring(0, 100)}...`,
        timestamp: new Date().toISOString()
      });

      const response = await axios.post('http://localhost:5000/admin/blogs', blogData);

      console.log('[DEBUG] Blog creation response:', {
        success: response.data.success,
        status: response.status,
        data: response.data.data,
        timestamp: new Date().toISOString()
      });

      if (response.data.success) {
        console.log('[DEBUG] Blog created successfully, redirecting to blogs page');
        setMessage('Blog created successfully!');
        setTimeout(() => {
          router.push('/luxe/admin/blogs');
        }, 2000);
      } else {
        console.error('[ERROR] Blog creation failed:', response.data.error);
        throw new Error(response.data.error || 'Failed to create blog');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      console.error('[ERROR] Blog creation error:', {
        error: axiosError.response?.data || axiosError.message,
        status: axiosError.response?.status,
        formData: {
          title: formData.title,
          category: formData.category,
          status: formData.status
        },
        timestamp: new Date().toISOString()
      });
      setError(
        axiosError.response?.data?.error || 
        axiosError.response?.data?.message || 
        'Failed to create blog'
      );
    } finally {
      setLoading(false);
      console.log('[DEBUG] Blog creation process completed');
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ 
      background: COLORS.background, 
      minHeight: "100vh", 
      color: COLORS.textSecondary,
      padding: "2rem"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          marginBottom: "2rem",
          background: COLORS.cardBg,
          padding: "1.5rem",
          borderRadius: "12px",
          border: `1px solid ${COLORS.border}`
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => router.push('/luxe/admin/blogs')}
              style={{
                background: COLORS.buttonBg,
                border: "none",
                borderRadius: "8px",
                padding: "0.75rem",
                color: COLORS.textSecondary,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = COLORS.buttonHover;
                e.currentTarget.style.color = COLORS.featuredText;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = COLORS.buttonBg;
                e.currentTarget.style.color = COLORS.textSecondary;
              }}
            >
              <ArrowLeft size={20} />
              Back to Blogs
            </button>
            <div>
              <h1 style={{ 
                color: COLORS.textPrimary, 
                fontSize: "2rem", 
                fontWeight: "bold",
                margin: 0
              }}>
                Create New Blog
              </h1>
              <p style={{ 
                color: COLORS.textMuted, 
                margin: "0.5rem 0 0 0",
                fontSize: "1rem"
              }}>
                Write and publish your next blog post
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
              disabled={loading}
              style={{
                background: formData.status === 'draft' ? COLORS.gradient : COLORS.buttonBg,
                color: formData.status === 'draft' ? COLORS.featuredText : COLORS.textSecondary,
                border: "none",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: "600",
                transition: "all 0.3s ease"
              }}
            >
              <FileText size={16} />
              Save as Draft
            </button>
            <button
              onClick={() => setFormData(prev => ({ ...prev, status: 'published' }))}
              disabled={loading}
              style={{
                background: formData.status === 'published' ? COLORS.gradient : COLORS.buttonBg,
                color: formData.status === 'published' ? COLORS.featuredText : COLORS.textSecondary,
                border: "none",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: "600",
                transition: "all 0.3s ease"
              }}
            >
              <Globe size={16} />
              Publish
            </button>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div style={{
            background: COLORS.successBg,
            color: COLORS.textSecondary,
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            textAlign: "center"
          }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{
            background: COLORS.errorBg,
            color: COLORS.textSecondary,
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "2fr 1fr", 
            gap: "2rem" 
          }}>
            {/* Main Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Title */}
              <div style={{
                background: COLORS.cardBg,
                padding: "1.5rem",
                borderRadius: "12px",
                border: `1px solid ${COLORS.border}`
              }}>
                <label style={{
                  display: "block",
                  color: COLORS.textPrimary,
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem"
                }}>
                  Blog Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter an engaging blog title..."
                  style={{
                    width: "100%",
                    background: COLORS.inputBg,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    padding: "1rem",
                    color: COLORS.textSecondary,
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    outline: "none",
                    transition: "all 0.3s ease"
                  }}
                  onFocus={(e) => {
                    e.target.style.background = COLORS.inputFocus;
                    e.target.style.borderColor = COLORS.textPrimary;
                  }}
                  onBlur={(e) => {
                    e.target.style.background = COLORS.inputBg;
                    e.target.style.borderColor = COLORS.border;
                  }}
                />
              </div>

              {/* Subtitle */}
              <div style={{
                background: COLORS.cardBg,
                padding: "1.5rem",
                borderRadius: "12px",
                border: `1px solid ${COLORS.border}`
              }}>
                <label style={{
                  display: "block",
                  color: COLORS.textPrimary,
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem"
                }}>
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  placeholder="Add a compelling subtitle (optional)..."
                  style={{
                    width: "100%",
                    background: COLORS.inputBg,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    padding: "1rem",
                    color: COLORS.textSecondary,
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease"
                  }}
                  onFocus={(e) => {
                    e.target.style.background = COLORS.inputFocus;
                    e.target.style.borderColor = COLORS.textPrimary;
                  }}
                  onBlur={(e) => {
                    e.target.style.background = COLORS.inputBg;
                    e.target.style.borderColor = COLORS.border;
                  }}
                />
              </div>

              {/* Content */}
              <div style={{
                background: COLORS.cardBg,
                padding: "1.5rem",
                borderRadius: "12px",
                border: `1px solid ${COLORS.border}`
              }}>
                <label style={{
                  display: "block",
                  color: COLORS.textPrimary,
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem"
                }}>
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={20}
                  placeholder="Write your blog content here... You can use markdown formatting."
                  style={{
                    width: "100%",
                    background: COLORS.inputBg,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    padding: "1rem",
                    color: COLORS.textSecondary,
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    fontFamily: "inherit",
                    outline: "none",
                    resize: "vertical",
                    transition: "all 0.3s ease"
                  }}
                  onFocus={(e) => {
                    e.target.style.background = COLORS.inputFocus;
                    e.target.style.borderColor = COLORS.textPrimary;
                  }}
                  onBlur={(e) => {
                    e.target.style.background = COLORS.inputBg;
                    e.target.style.borderColor = COLORS.border;
                  }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Category */}
              <div style={{
                background: COLORS.cardBg,
                padding: "1.5rem",
                borderRadius: "12px",
                border: `1px solid ${COLORS.border}`
              }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: COLORS.textPrimary,
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem"
                }}>
                  <Tag size={20} />
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    background: COLORS.inputBg,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    padding: "1rem",
                    color: COLORS.textSecondary,
                    fontSize: "1rem",
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Toggle */}
              <div style={{
                background: COLORS.cardBg,
                padding: "1.5rem",
                borderRadius: "12px",
                border: `1px solid ${COLORS.border}`
              }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: COLORS.textPrimary,
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem"
                }}>
                  <Star size={20} />
                  Featured Post
                </label>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  cursor: "pointer",
                  color: COLORS.textSecondary
                }}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    style={{
                      width: "18px",
                      height: "18px",
                      accentColor: COLORS.textPrimary
                    }}
                  />
                  Mark this post as featured
                </label>
              </div>

              {/* Image Upload */}
              <div style={{
                background: COLORS.cardBg,
                padding: "1.5rem",
                borderRadius: "12px",
                border: `1px solid ${COLORS.border}`
              }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: COLORS.textPrimary,
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem"
                }}>
                  <ImageIcon size={20} />
                  Featured Image
                </label>

                {imagePreview ? (
                  <div style={{ position: "relative" }}>
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={400}
                      height={200}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "1rem"
                      }}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        background: COLORS.errorBg,
                        border: "none",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: COLORS.textSecondary
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    style={{
                      width: "100%",
                      height: "150px",
                      background: COLORS.inputBg,
                      border: `2px dashed ${COLORS.border}`,
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      cursor: uploading ? "not-allowed" : "pointer",
                      color: COLORS.textMuted,
                      transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => {
                      if (!uploading) {
                        e.currentTarget.style.borderColor = COLORS.textPrimary;
                        e.currentTarget.style.color = COLORS.textPrimary;
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = COLORS.border;
                      e.currentTarget.style.color = COLORS.textMuted;
                    }}
                  >
                    {uploading ? (
                      <>
                        <Loader2 size={32} className="animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={32} />
                        <span>Click to upload image</span>
                        <span style={{ fontSize: "0.875rem" }}>
                          PNG, JPG up to 5MB
                        </span>
                      </>
                    )}
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: "none" }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.title || !formData.content || !formData.category}
                style={{
                  background: COLORS.gradient,
                  color: COLORS.featuredText,
                  border: "none",
                  borderRadius: "12px",
                  padding: "1.25rem",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading || !formData.title || !formData.content || !formData.category ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)"
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Creating Blog...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Create Blog
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}