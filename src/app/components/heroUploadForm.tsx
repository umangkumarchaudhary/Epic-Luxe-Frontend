"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import AdminHeroBannerLivePreview from "./adminLivePreviewForm";
import {
  X,
  Loader2,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  DollarSign,
  ChevronRight,
} from "lucide-react";

interface Banner {
  id: number | string;
  image_url: string;
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
  previewUrl: string;
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

const goldGradient = "bg-gradient-to-r from-[#D4AF37] to-[#BFA980]";

/** Component to show live banner preview */
function LiveBannerPreview({
  banner,
}: {
  banner: Partial<Omit<Banner, "id" | "position">> & {
    previewUrl?: string;
  };
}) {
  return (
    <div className="relative w-full md:w-96 h-52 rounded-lg overflow-hidden border border-[#D4AF37]/70 shadow-lg bg-black/90 text-white select-none">
      <div className="relative w-full h-full">
        <Image
          src={banner.previewUrl ?? banner.image_url ?? ""}
          alt={banner.title ?? "Banner Preview"}
          fill
          style={{ objectFit: "cover" }}
          unoptimized={!banner.previewUrl} // Optimize remote images only
          priority
        />
      </div>
      <div className="absolute top-4 left-4 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] px-3 py-1.5 rounded-full font-bold text-xs">
        {banner.badge ?? "BADGE"}
      </div>
      <div className="absolute bottom-16 left-4 right-4">
        <h3 className="text-xl font-bold drop-shadow-lg">{banner.title ?? "Title Here"}</h3>
        <p className="text-sm drop-shadow-md">{banner.subtitle ?? "Subtitle Here"}</p>
      </div>
      <div className="absolute bottom-4 left-4 flex space-x-3">
        <button
          type="button"
          className="flex items-center space-x-1 bg-gradient-to-r from-[#D4AF37] to-[#BFA980] text-black rounded-full px-4 py-1 text-xs font-semibold shadow"
        >
          <Eye className="w-4 h-4" />
          <span>{banner.cta1_text ?? "CTA 1"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="flex items-center space-x-1 border-2 border-[#D4AF37] text-white rounded-full px-4 py-1 text-xs font-semibold shadow"
        >
          <DollarSign className="w-4 h-4 text-[#D4AF37]" />
          <span>{banner.cta2_text ?? "CTA 2"}</span>
        </button>
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
    } catch (e) {
      setLoadBannersError("Failed to load banners");
    } finally {
      setLoadingBanners(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // When user selects multiple images for new banners
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
      } catch (err: any) {
        updatedBanners[i].uploading = false;
        updatedBanners[i].uploadError =
          err.response?.data?.error || "Upload failed";
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
    newBanners.forEach((banner) => URL.revokeObjectURL(banner.previewUrl));
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
    } catch (e) {
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
    } catch (e) {
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

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onFilesSelected(e.target.files)}
          className="block w-full max-w-sm mb-6 cursor-pointer rounded border border-[#BFA980] px-3 py-2 bg-black/30 hover:bg-black/50 transition"
        />

        {newBanners.length === 0 && (
          <p className="text-gray-400">Select images above to start adding banners</p>
        )}

        {newBanners.map((banner, idx) => (
          <div
            key={banner.previewUrl + idx}
            className="flex flex-col md:flex-row items-center gap-6 mb-12 border border-[#BFA980]/40 rounded-lg p-4 bg-black/40"
          >
            {/* Inputs */}
            <div className="flex flex-col w-full md:w-3/5 space-y-4 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Title *"
                  value={banner.title}
                  onChange={(e) => updateNewBannerField(idx, "title", e.target.value)}
                  className="rounded bg-black/30 px-3 py-2 border border-[#BFA980]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <input
                  type="text"
                  placeholder="Subtitle *"
                  value={banner.subtitle}
                  onChange={(e) => updateNewBannerField(idx, "subtitle", e.target.value)}
                  className="rounded bg-black/30 px-3 py-2 border border-[#BFA980]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <input
                  type="text"
                  placeholder="Badge *"
                  value={banner.badge}
                  onChange={(e) => updateNewBannerField(idx, "badge", e.target.value)}
                  className="rounded bg-black/30 px-3 py-2 border border-[#BFA980]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <input
                  type="number"
                  min={1}
                  placeholder="Position *"
                  value={banner.position}
                  onChange={(e) =>
                    updateNewBannerField(idx, "position", e.target.value === "" ? "" : parseInt(e.target.value))
                  }
                  className="rounded bg-black/30 px-3 py-2 border border-[#BFA980]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <input
                  type="text"
                  placeholder="CTA 1 Text *"
                  value={banner.cta1_text}
                  onChange={(e) => updateNewBannerField(idx, "cta1_text", e.target.value)}
                  className="rounded bg-black/30 px-3 py-2 border border-[#BFA980]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <input
                  type="text"
                  placeholder='CTA 1 URL or Action * (e.g. "/cars" or "Get Free Quote")'
                  value={banner.cta1_url_or_action}
                  onChange={(e) => updateNewBannerField(idx, "cta1_url_or_action", e.target.value)}
                  className="rounded bg-black/30 px-3 py-2 border border-[#BFA980]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <input
                  type="text"
                  placeholder="CTA 2 Text *"
                  value={banner.cta2_text}
                  onChange={(e) => updateNewBannerField(idx, "cta2_text", e.target.value)}
                  className="rounded bg-black/30 px-3 py-2 border border-[#BFA980]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <input
                  type="text"
                  placeholder='CTA 2 URL or Action * (e.g. "/quote" or "Get Free Quote")'
                  value={banner.cta2_url_or_action}
                  onChange={(e) => updateNewBannerField(idx, "cta2_url_or_action", e.target.value)}
                  className="rounded bg-black/30 px-3 py-2 border border-[#BFA980]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="flex items-center space-x-4">
                {/* Uploading indicator or error */}
                {banner.uploading ? (
                  <div className="flex items-center text-yellow-400 space-x-2">
                    <Loader2 className="animate-spin" size={20} />
                    <span>Uploading...</span>
                  </div>
                ) : banner.uploadError ? (
                  <span className="text-red-500 font-semibold">{banner.uploadError}</span>
                ) : banner.uploadedId ? (
                  <span className="text-green-400 font-semibold flex items-center space-x-1">
                    <CheckCircle size={18} /> <span>Uploaded</span>
                  </span>
                ) : (
                  <span className="italic text-gray-400">Not uploaded yet</span>
                )}
              </div>
            </div>

            {/* Live Preview */}
            <div className="w-full md:w-2/5">
              <LiveBannerPreview banner={banner} />
            </div>
          </div>
        ))}

        {newBanners.length > 0 && (
          <div className="flex space-x-3 mt-2">
            <button
              onClick={uploadAllBanners}
              disabled={isBatchUploading}
              className={`${goldGradient} px-6 py-2 rounded-lg font-semibold text-black hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isBatchUploading ? "Uploading All..." : "Upload All Banners"}
            </button>
            <button
              onClick={clearNewBanners}
              disabled={isBatchUploading}
              className="px-6 py-2 rounded-lg border border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Clear
            </button>
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
            <Loader2 className="animate-spin" /> <span>Loadind EPICness</span>
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
                          { label: "Title", field: "title" },
                          { label: "Subtitle", field: "subtitle" },
                          { label: "Badge", field: "badge" },
                          { label: "Position", field: "position", type: "number" },
                          { label: "CTA 1 Text", field: "cta1_text" },
                          { label: "CTA 1 URL/Action", field: "cta1_url_or_action" },
                          { label: "CTA 2 Text", field: "cta2_text" },
                          { label: "CTA 2 URL/Action", field: "cta2_url_or_action" },
                        ].map(({ label, field, type }) => (
                          <input
                            key={field}
                            type={type || "text"}
                            placeholder={label}
                            value={(editState as any)[field] ?? ""}
                            onChange={(e) =>
                              updateEditField(
                                banner.id,
                                field as keyof Banner,
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
