"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios, { AxiosError } from "axios";

import {
  Loader2,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  DollarSign,
  ChevronRight,
  Monitor,
  Smartphone,
  Upload,
  X,
} from "lucide-react";

interface Banner {
  id: number | string;
  image_url: string;
  mobile_image_url?: string;
  title: string;
  subtitle: string;
  badge: string;
  position: number;
  cta1_text: string;
  cta1_url_or_action: string;
  cta2_text: string;
  cta2_url_or_action: string;
}

interface NewBannerInput {
  file: File;
  mobileFile?: File;
  previewUrl: string;
  mobilePreviewUrl?: string;
  title: string;
  subtitle: string;
  badge: string;
  position: number | "";
  cta1_text: string;
  cta1_url_or_action: string;
  cta2_text: string;
  cta2_url_or_action: string;
  uploading: boolean;
  uploadError: string | null;
  uploadedId?: number | string;
}

interface ErrorResponse {
  error: string;
}

const goldGradient = "bg-gradient-to-r from-[#D4AF37] to-[#BFA980]";

/** Component to show live banner preview with desktop/mobile toggle */
function LiveBannerPreview({
  banner,
}: {
  banner: Partial<Omit<Banner, "id" | "position">> & {
    previewUrl?: string;
    mobilePreviewUrl?: string;
  };
}) {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showMobileToggle, setShowMobileToggle] = useState(false);

  // Check if mobile image is available
  const hasMobileImage = banner.mobilePreviewUrl || banner.mobile_image_url;
  
  // Show mobile toggle if mobile image exists
  useEffect(() => {
    setShowMobileToggle(!!hasMobileImage);
  }, [hasMobileImage]);

  // Get current image source based on preview mode
  const getCurrentImageSrc = () => {
    if (previewMode === 'mobile' && hasMobileImage) {
      return banner.mobilePreviewUrl ?? banner.mobile_image_url ?? "";
    }
    return banner.previewUrl ?? banner.image_url ?? "";
  };

  const containerClasses = previewMode === 'mobile' 
    ? "relative w-48 h-80 mx-auto" // Mobile aspect ratio
    : "relative w-full md:w-96 h-52"; // Desktop aspect ratio

  return (
    <div className="space-y-3">
      {/* Device Toggle Buttons */}
      {showMobileToggle && (
        <div className="flex justify-center space-x-2">
          <button
            type="button"
            onClick={() => setPreviewMode('desktop')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              previewMode === 'desktop'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black'
                : 'border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('mobile')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              previewMode === 'mobile'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black'
                : 'border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile</span>
          </button>
        </div>
      )}

      {/* Preview Container */}
      <div className={`${containerClasses} rounded-lg overflow-hidden border border-[#D4AF37]/70 shadow-xl bg-black/90 text-white select-none transform transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/20`}>
        <div className="relative w-full h-full">
          <Image
            src={getCurrentImageSrc()}
            alt={`${banner.title ?? "Banner"} Preview - ${previewMode}`}
            fill
            style={{ objectFit: "cover" }}
            unoptimized={!banner.previewUrl && !banner.mobilePreviewUrl}
            priority
            className="transition-opacity duration-300"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>
        
        {/* Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] px-2.5 py-1 rounded-full font-bold text-xs shadow-lg">
          {banner.badge ?? "BADGE"}
        </div>
        
        {/* Device indicator */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
          {previewMode === 'desktop' ? (
            <><Monitor className="w-3 h-3" /><span>Desktop</span></>
          ) : (
            <><Smartphone className="w-3 h-3" /><span>Mobile</span></>
          )}
        </div>
        
        {/* Content */}
        <div className={`absolute ${previewMode === 'mobile' ? 'bottom-20 left-3 right-3' : 'bottom-16 left-4 right-4'}`}>
          <h3 className={`font-bold drop-shadow-lg ${previewMode === 'mobile' ? 'text-lg' : 'text-xl'}`}>
            {banner.title ?? "Title Here"}
          </h3>
          <p className={`drop-shadow-md text-gray-200 ${previewMode === 'mobile' ? 'text-xs' : 'text-sm'}`}>
            {banner.subtitle ?? "Subtitle Here"}
          </p>
        </div>
        
        {/* CTAs */}
        <div className={`absolute ${previewMode === 'mobile' ? 'bottom-3 left-3 right-3 flex flex-col space-y-2' : 'bottom-4 left-4 flex space-x-3'}`}>
          <button
            type="button"
            className={`flex items-center justify-center space-x-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow ${
              previewMode === 'mobile' ? 'px-3 py-1.5 text-xs' : 'px-4 py-1 text-xs'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>{banner.cta1_text ?? "CTA 1"}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <button
            type="button"
            className={`flex items-center justify-center space-x-1 border-2 border-[#D4AF37] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow ${
              previewMode === 'mobile' ? 'px-3 py-1.5 text-xs' : 'px-4 py-1 text-xs'
            }`}
          >
            <DollarSign className="w-3 h-3 text-[#D4AF37]" />
            <span>{banner.cta2_text ?? "CTA 2"}</span>
          </button>
        </div>
      </div>

      {/* Preview mode label */}
      <div className="text-center text-xs text-gray-400">
        Preview: {previewMode === 'mobile' ? '📱 Mobile View' : '💻 Desktop View'}
        {previewMode === 'mobile' && !hasMobileImage && (
          <span className="block text-yellow-400 mt-1">Using desktop image (no mobile image provided)</span>
        )}
      </div>
    </div>
  );
}

export default function AdminHeroBanners() {
  // Banners fetched from backend
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loadingBanners, setLoadingBanners] = useState<boolean>(false);
  const [loadBannersError, setLoadBannersError] = useState("");

  // Inputs state for new banners to upload
  const [newBanners, setNewBanners] = useState<NewBannerInput[]>([]);

  // Track general loading for batch upload
  const [isBatchUploading, setIsBatchUploading] = useState(false);

  // Track global success/error.
  const [globalMessage, setGlobalMessage] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Fetch existing banners
  const fetchBanners = async () => {
    setLoadingBanners(true);
    setLoadBannersError("");
    try {
      const res = await axios.get<{ banners: Banner[] }>(
        "http://localhost:5000/admin/banners"
      );
      setBanners(res.data.banners);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setLoadBannersError("Failed to load banners");
    } finally {
      setLoadingBanners(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // When user selects multiple images for new banners (PC images)
  const onFilesSelected = (files: FileList | null) => {
    if (!files) return;
    // Convert file list to NewBannerInput objects with empty text fields and preview urls
    const selections: NewBannerInput[] = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      title: "",
      subtitle: "",
      badge: "",
      position: "",
      cta1_text: "",
      cta1_url_or_action: "",
      cta2_text: "",
      cta2_url_or_action: "",
      uploading: false,
      uploadError: null,
    }));
    setNewBanners((prev) => [...prev, ...selections]);
  };

  // Handle mobile image selection for existing banner input
  const onMobileFileSelected = (index: number, file: File | null) => {
    if (!file) return;
    setNewBanners((prev) => {
      const updated = [...prev];
      // Clean up old mobile preview URL if it exists
      if (updated[index].mobilePreviewUrl) {
        URL.revokeObjectURL(updated[index].mobilePreviewUrl!);
      }
      updated[index] = {
        ...updated[index],
        mobileFile: file,
        mobilePreviewUrl: URL.createObjectURL(file)
      };
      return updated;
    });
  };

  // Remove mobile image from banner input
  const removeMobileImage = (index: number) => {
    setNewBanners((prev) => {
      const updated = [...prev];
      if (updated[index].mobilePreviewUrl) {
        URL.revokeObjectURL(updated[index].mobilePreviewUrl!);
      }
      updated[index] = {
        ...updated[index],
        mobileFile: undefined,
        mobilePreviewUrl: undefined
      };
      return updated;
    });
  };

  function updateNewBannerField(
    index: number,
    field: keyof NewBannerInput,
    value: string | number
  ) {
    setNewBanners((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  // Validate each banner input before upload
  function validateBannerInput(banner: NewBannerInput) {
    if (
      !banner.file ||
      !banner.title.trim() ||
      !banner.subtitle.trim() ||
      !banner.badge.trim() ||
      banner.position === "" ||
      Number.isNaN(Number(banner.position)) ||
      !banner.cta1_text.trim() ||
      !banner.cta1_url_or_action.trim() ||
      !banner.cta2_text.trim() ||
      !banner.cta2_url_or_action.trim()
    ) {
      return false;
    }
    return true;
  }

  // Upload all banners one by one
  const uploadAllBanners = async () => {
    setGlobalMessage(null);
    setGlobalError(null);

    // Validate all inputs first
    for (let i = 0; i < newBanners.length; i++) {
      if (!validateBannerInput(newBanners[i])) {
        setGlobalError(
          `Please fill all required fields correctly for banner #${i + 1}`
        );
        return;
      }
    }
    setIsBatchUploading(true);

    const updatedBanners = [...newBanners];

    for (let i = 0; i < newBanners.length; i++) {
      updatedBanners[i].uploading = true;
      updatedBanners[i].uploadError = null;
      setNewBanners([...updatedBanners]);

      try {
        const formData = new FormData();
        formData.append("image", newBanners[i].file);
        // Add mobile image if provided
        if (newBanners[i].mobileFile) {
          formData.append("mobile_image", newBanners[i].mobileFile!);
        }
        formData.append("title", newBanners[i].title);
        formData.append("subtitle", newBanners[i].subtitle);
        formData.append("badge", newBanners[i].badge);
        formData.append("position", newBanners[i].position.toString());
        formData.append("cta1_text", newBanners[i].cta1_text);
        formData.append("cta1_url_or_action", newBanners[i].cta1_url_or_action);
        formData.append("cta2_text", newBanners[i].cta2_text);
        formData.append("cta2_url_or_action", newBanners[i].cta2_url_or_action);

        const res = await axios.post(
          "http://localhost:5000/admin/upload-hero",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        updatedBanners[i].uploadedId = res.data.data.id;
        updatedBanners[i].uploading = false;
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        updatedBanners[i].uploading = false;
        updatedBanners[i].uploadError =
          error.response?.data?.error || "Upload failed";
      }
      setNewBanners([...updatedBanners]);
    }

    setIsBatchUploading(false);

    // After upload success, refresh backend list
    await fetchBanners();

    setGlobalMessage("Batch upload complete! See updated banners below.");
  };

  // Clear all new banner inputs (including previews)
  const clearNewBanners = () => {
    newBanners.forEach((banner) => {
      URL.revokeObjectURL(banner.previewUrl);
      if (banner.mobilePreviewUrl) {
        URL.revokeObjectURL(banner.mobilePreviewUrl);
      }
    });
    setNewBanners([]);
    setGlobalMessage(null);
    setGlobalError(null);
  };

  // Delete banner from backend + refresh list
  const deleteBanner = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      await axios.delete(`http://localhost:5000/admin/delete-hero/${id}`);
      await fetchBanners();
      setGlobalMessage("Banner deleted successfully.");
    } catch (error) {
      console.error("Error deleting banner:", error);
      setGlobalError("Failed to delete banner");
    }
  };

  // Track editing state per existing banner and form fields
  const [editStates, setEditStates] = useState<
    Record<
      string,
      Partial<Banner> & {
        isEditing: boolean;
        isUpdating: boolean;
        updateError: string | null;
      }
    >
  >({});

  const startEditing = (banner: Banner) => {
    setEditStates((prev) => ({
      ...prev,
      [banner.id]: {
        ...banner,
        isEditing: true,
        isUpdating: false,
        updateError: null,
      },
    }));
  };

  const cancelEditing = (id: number | string) => {
    setEditStates((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const updateEditField = (
    id: number | string,
    field: keyof Banner,
    value: string | number
  ) => {
    setEditStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Validate edits before update
  const validateEdit = (state: Partial<Banner>) => {
    if (
      !state.title?.trim() ||
      !state.subtitle?.trim() ||
      !state.badge?.trim() ||
      state.position === undefined ||
      Number.isNaN(Number(state.position)) ||
      !state.cta1_text?.trim() ||
      !state.cta1_url_or_action?.trim() ||
      !state.cta2_text?.trim() ||
      !state.cta2_url_or_action?.trim()
    ) {
      return false;
    }
    return true;
  };

  // Update banner on backend
  const saveBannerEdits = async (id: number | string) => {
    const editState = editStates[id];
    if (!editState) return;

    if (!validateEdit(editState)) {
      setEditStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], updateError: "Please fill all fields correctly." },
      }));
      return;
    }

    setEditStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], isUpdating: true, updateError: null },
    }));

    try {
      const updatePayload = {
        title: editState.title,
        subtitle: editState.subtitle,
        badge: editState.badge,
        position: Number(editState.position),
        cta1_text: editState.cta1_text,
        cta1_url_or_action: editState.cta1_url_or_action,
        cta2_text: editState.cta2_text,
        cta2_url_or_action: editState.cta2_url_or_action,
      };

      await axios.put(`http://localhost:5000/admin/update-hero/${id}`, updatePayload);
      setEditStates((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      await fetchBanners();
      setGlobalMessage("Banner updated successfully!");
    } catch (error) {
      console.error("Error updating banner:", error);
      setEditStates((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isUpdating: false,
          updateError: "Failed to update banner.",
        },
      }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans p-8 max-w-7xl mx-auto">
      <h1
        className={`text-4xl font-extrabold mb-6 ${goldGradient} bg-clip-text text-transparent`}
      >
        Admin Hero Banners Management
      </h1>

      {/* Upload Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Upload New Hero Banners</h2>

        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Upload className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="text-lg font-semibold text-white">Upload Hero Images</h3>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            Select images for your hero banners. You can add mobile-specific images after uploading.
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => onFilesSelected(e.target.files)}
            className="block w-full cursor-pointer rounded-lg border-2 border-dashed border-[#D4AF37]/40 px-4 py-3 bg-black/20 hover:bg-black/30 hover:border-[#D4AF37]/60 transition-all duration-200 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#D4AF37] file:to-[#BFA980] file:text-black hover:file:scale-105 file:transition-transform"
          />
        </div>

        {newBanners.length === 0 && (
          <p className="text-gray-400">Select images above to start adding banners</p>
        )}

        {newBanners.map((banner, idx) => (
          <div
            key={banner.previewUrl + idx}
            className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl p-6 mb-8 shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Form Inputs Section */}
              <div className="flex-1 space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] rounded-lg flex items-center justify-center text-black font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white">Hero Banner #{idx + 1}</h3>
                </div>

                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Title *</label>
                      <input
                        type="text"
                        placeholder="Enter banner title"
                        value={banner.title}
                        onChange={(e) => updateNewBannerField(idx, "title", e.target.value)}
                        className="w-full rounded-lg bg-black/40 px-4 py-3 border border-[#BFA980]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Subtitle *</label>
                      <input
                        type="text"
                        placeholder="Enter banner subtitle"
                        value={banner.subtitle}
                        onChange={(e) => updateNewBannerField(idx, "subtitle", e.target.value)}
                        className="w-full rounded-lg bg-black/40 px-4 py-3 border border-[#BFA980]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Badge *</label>
                      <input
                        type="text"
                        placeholder="e.g., FEATURED, NEW, PREMIUM"
                        value={banner.badge}
                        onChange={(e) => updateNewBannerField(idx, "badge", e.target.value)}
                        className="w-full rounded-lg bg-black/40 px-4 py-3 border border-[#BFA980]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Position *</label>
                      <input
                        type="number"
                        min={1}
                        placeholder="Display order (1, 2, 3...)"
                        value={banner.position}
                        onChange={(e) =>
                          updateNewBannerField(idx, "position", e.target.value === "" ? "" : parseInt(e.target.value))
                        }
                        className="w-full rounded-lg bg-black/40 px-4 py-3 border border-[#BFA980]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Call-to-Action Buttons */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider">Call-to-Action Buttons</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">CTA 1 Text *</label>
                      <input
                        type="text"
                        placeholder="e.g., View Details"
                        value={banner.cta1_text}
                        onChange={(e) => updateNewBannerField(idx, "cta1_text", e.target.value)}
                        className="w-full rounded-lg bg-black/40 px-4 py-3 border border-[#BFA980]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">CTA 1 URL/Action *</label>
                      <input
                        type="text"
                        placeholder='e.g., "/cars" or "Get Free Quote"'
                        value={banner.cta1_url_or_action}
                        onChange={(e) => updateNewBannerField(idx, "cta1_url_or_action", e.target.value)}
                        className="w-full rounded-lg bg-black/40 px-4 py-3 border border-[#BFA980]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">CTA 2 Text *</label>
                      <input
                        type="text"
                        placeholder="e.g., Get Quote"
                        value={banner.cta2_text}
                        onChange={(e) => updateNewBannerField(idx, "cta2_text", e.target.value)}
                        className="w-full rounded-lg bg-black/40 px-4 py-3 border border-[#BFA980]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">CTA 2 URL/Action *</label>
                      <input
                        type="text"
                        placeholder='e.g., "/quote" or "Get Free Quote"'
                        value={banner.cta2_url_or_action}
                        onChange={(e) => updateNewBannerField(idx, "cta2_url_or_action", e.target.value)}
                        className="w-full rounded-lg bg-black/40 px-4 py-3 border border-[#BFA980]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Image Upload */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider flex items-center space-x-2">
                    <Smartphone className="w-4 h-4" />
                    <span>Mobile Image (Optional)</span>
                  </h4>
                  <div className="bg-black/20 border border-[#BFA980]/20 rounded-lg p-4">
                    {!banner.mobileFile ? (
                      <div className="text-center">
                        <input
                          type="file"
                          accept="image/*"
                          id={`mobile-upload-${idx}`}
                          onChange={(e) => e.target.files?.[0] && onMobileFileSelected(idx, e.target.files[0])}
                          className="hidden"
                        />
                        <label
                          htmlFor={`mobile-upload-${idx}`}
                          className="cursor-pointer flex flex-col items-center space-y-2 py-4 px-6 border-2 border-dashed border-[#D4AF37]/40 rounded-lg hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/5 transition-all duration-200"
                        >
                          <Smartphone className="w-8 h-8 text-[#D4AF37]" />
                          <span className="text-sm text-gray-300">Upload Mobile Image</span>
                          <span className="text-xs text-gray-400">Optimized for mobile screens</span>
                        </label>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#D4AF37]/50">
                          <Image
                            src={banner.mobilePreviewUrl!}
                            alt="Mobile preview"
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-300">Mobile image selected</p>
                          <p className="text-xs text-gray-400">{banner.mobileFile.name}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeMobileImage(idx)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all duration-200"
                          title="Remove mobile image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Status */}
                <div className="flex items-center space-x-4 p-4 bg-black/20 rounded-lg">
                  {banner.uploading ? (
                    <div className="flex items-center text-yellow-400 space-x-2">
                      <Loader2 className="animate-spin" size={20} />
                      <span className="font-medium">Uploading...</span>
                    </div>
                  ) : banner.uploadError ? (
                    <div className="flex items-center text-red-400 space-x-2">
                      <X size={20} />
                      <span className="font-medium">{banner.uploadError}</span>
                    </div>
                  ) : banner.uploadedId ? (
                    <div className="flex items-center text-green-400 space-x-2">
                      <CheckCircle size={20} />
                      <span className="font-medium">Successfully Uploaded</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-400 space-x-2">
                      <Upload size={20} />
                      <span className="font-medium">Ready to upload</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Live Preview Section */}
              <div className="lg:w-96 flex-shrink-0">
                <div className="sticky top-6">
                  <h4 className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider mb-4 text-center">Live Preview</h4>
                  <LiveBannerPreview banner={banner} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {newBanners.length > 0 && (
          <div className="bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={uploadAllBanners}
                disabled={isBatchUploading}
                className={`${goldGradient} px-8 py-3 rounded-lg font-semibold text-black hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center space-x-2`}
              >
                {isBatchUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Uploading All Banners...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Upload All Banners ({newBanners.length})</span>
                  </>
                )}
              </button>
              <button
                onClick={clearNewBanners}
                disabled={isBatchUploading}
                className="px-6 py-3 rounded-lg border border-[#D4AF37]/50 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        )}

        {(globalMessage || globalError) && (
          <div
            className={`mt-4 p-3 rounded ${
              globalError ? "bg-red-700 text-white" : "bg-green-700 text-white"
            }`}
          >
            {globalError ?? globalMessage}
          </div>
        )}
      </section>
      
      {/* Uploaded banners list */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Uploaded Banners</h2>

        {loadingBanners ? (
          <div className="text-yellow-400 flex items-center space-x-2">
            <Loader2 className="animate-spin" /> <span>Loading EPICness</span>
          </div>
        ) : loadBannersError ? (
          <div className="text-red-500">{loadBannersError}</div>
        ) : banners.length === 0 ? (
          <div className="text-gray-400">No banners uploaded yet.</div>
        ) : (
          banners.map((banner) => {
            const isEditing = !!editStates[banner.id]?.isEditing;
            const editState = editStates[banner.id] ?? {};
            return (
              <div
                key={banner.id}
                className="flex flex-col md:flex-row bg-black/40 border border-[#BFA980]/50 rounded-lg p-4 mb-6 gap-6"
              >
                <div className="relative w-40 h-24 rounded-md overflow-hidden flex-shrink-0 border border-[#D4AF37]/60">
                  <Image
                    src={banner.image_url}
                    alt={`Banner ${banner.title}`}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                    priority
                  />
                </div>

                {/* Editable fields or static display */}
                <div className="flex flex-col space-y-3 text-white w-full md:w-3/5">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { label: "Title", field: "title" as keyof Banner },
                          { label: "Subtitle", field: "subtitle" as keyof Banner },
                          { label: "Badge", field: "badge" as keyof Banner },
                          { label: "Position", field: "position" as keyof Banner, type: "number" },
                          { label: "CTA 1 Text", field: "cta1_text" as keyof Banner },
                          { label: "CTA 1 URL/Action", field: "cta1_url_or_action" as keyof Banner },
                          { label: "CTA 2 Text", field: "cta2_text" as keyof Banner },
                          { label: "CTA 2 URL/Action", field: "cta2_url_or_action" as keyof Banner },
                        ].map(({ label, field, type }) => (
                          <input
                            key={field}
                            type={type || "text"}
                            placeholder={label}
                            value={String(editState[field] ?? "")}
                            onChange={(e) =>
                              updateEditField(
                                banner.id,
                                field,
                                type === "number"
                                  ? Number(e.target.value)
                                  : e.target.value
                              )
                            }
                            className="rounded bg-black/30 px-3 py-2 border border-[#BFA980]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                          />
                        ))}
                      </div>
                      {editState.updateError && (
                        <div className="text-red-500 font-semibold">
                          {editState.updateError}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>Title:</strong> {banner.title}
                      </p>
                      <p>
                        <strong>Subtitle:</strong> {banner.subtitle}
                      </p>
                      <p>
                        <strong>Badge:</strong> {banner.badge}
                      </p>
                      <p>
                        <strong>Position:</strong> {banner.position}
                      </p>
                      <p>
                        <strong>CTA 1:</strong> {banner.cta1_text} (
                        {banner.cta1_url_or_action})
                      </p>
                      <p>
                        <strong>CTA 2:</strong> {banner.cta2_text} (
                        {banner.cta2_url_or_action})
                      </p>
                    </>
                  )}
                </div>

                {/* Live Preview in edit mode */}
                <div className="w-full md:w-2/5">
                  <LiveBannerPreview
                    banner={isEditing ? editState : banner}
                  />
                </div>

                <div className="flex flex-col justify-between space-y-2 w-full md:w-auto">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => saveBannerEdits(banner.id)}
                        disabled={editState.isUpdating}
                        className={`${goldGradient} px-4 py-2 rounded font-semibold text-black hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
                        title="Save changes"
                      >
                        {editState.isUpdating ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle size={18} />
                            <span>Save</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => cancelEditing(banner.id)}
                        className="px-4 py-2 rounded border border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors font-semibold"
                        title="Cancel editing"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(banner)}
                        className="px-4 py-2 rounded border border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors font-semibold flex items-center space-x-2"
                        title="Edit banner"
                      >
                        <Edit2 size={18} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => deleteBanner(banner.id)}
                        className="px-4 py-2 rounded border border-red-600 hover:bg-red-600 hover:text-black transition-colors font-semibold flex items-center space-x-2"
                        title="Delete banner"
                      >
                        <Trash2 size={18} />
                        <span>Delete</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}