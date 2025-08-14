"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  location: string;
  published: boolean;
  featured: boolean;
}

interface ApiError {
  message?: string;
  error?: string;
}

const COLORS = {
  background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
  cardBg: "#1a1a1a",
  textPrimary: "#D4AF37",
  textSecondary: "#FFFFFF",
  textMuted: "#999999",
  buttonBg: "#2a2a2a",
  buttonHover: "#D4AF37",
  border: "#333333",
  featuredBadgeBg: "linear-gradient(135deg, #D4AF37 0%, #BFA980 100%)",
  featuredBadgeText: "#0f0f0f",
  publishedBg: "#1e2a1e",
  draftBg: "#2a1e1e",
  hoverBg: "#2a2a2a",
  editBtnBg: "#D4AF37",
  editBtnText: "#0f0f0f",
  editBtnHover: "#BFA980",
  deleteBtnBg: "#dc2626",
  deleteBtnHover: "#991b1b",
  successBg: "#166534",
  errorBg: "#991b1b",
};

interface PaginationStyleProps {
  active: boolean;
  disabled?: boolean;
}

export default function Inventory() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewFilter, setViewFilter] = useState<
    "all" | "published" | "draft" | "featured"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12;

  const axiosInstance = useMemo(() => {
    const instance = axios.create();
    
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(
          "API error:",
          error.response?.status,
          error.response?.data,
          error.message
        );
        return Promise.reject(error);
      }
    );
    
    return instance;
  }, []);

  // Fetch vehicles depending on the current filter
  useEffect(() => {
    async function fetchVehiclesFiltered() {
      setLoading(true);
      setError(null);
      setMessage(null);

      try {
        let apiUrl = "http://localhost:5000/admin/vehicles";
        if (viewFilter === "featured") {
          apiUrl = "http://localhost:5000/admin/vehicles/featured";
        } else if (viewFilter === "published") {
          apiUrl = "http://localhost:5000/admin/vehicles/published";
        }
        const res = await axiosInstance.get<{ vehicles: Vehicle[] }>(apiUrl);
        setVehicles(res.data.vehicles || []);
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
        setError("Failed to fetch vehicles");
      } finally {
        setLoading(false);
      }
    }
    fetchVehiclesFiltered();
  }, [viewFilter, axiosInstance]);

  // Reset to first page on filter or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, viewFilter]);

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

  // Toggle publish status for a vehicle
  const togglePublished = useCallback(async (vehicle: Vehicle) => {
    try {
      console.log(
        `Toggling published for vehicle ID: ${vehicle.id}, current: ${vehicle.published}`
      );
      const url = `http://localhost:5000/admin/vehicle/${vehicle.id}`;
      const resp = await axiosInstance.put(url, {
        published: !vehicle.published,
      });
      console.log("Published toggle response:", resp.data);
      setMessage(
        `${vehicle.brand} ${vehicle.model} is now ${
          !vehicle.published ? "published" : "unpublished"
        }.`
      );
      // Refresh list
      setViewFilter((prev) => prev === "all" ? "published" : "all");
      setTimeout(() => setViewFilter("all"), 100);
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      console.error("Toggle published error:", error.message || error);
      setError("Failed to update published status: " + (error.response?.data?.message || error.message || "Unknown error"));
    }
  }, [axiosInstance]);

  // Toggle featured status with the 6-feature max enforced by backend
  const toggleFeatured = useCallback(async (vehicle: Vehicle) => {
    try {
      console.log(
        `Toggling featured for vehicle ID: ${vehicle.id}, current: ${vehicle.featured}`
      );
      const url = `http://localhost:5000/admin/vehicle/${vehicle.id}`;
      await axiosInstance.put(url, {
        featured: !vehicle.featured,
      });
      setMessage(
        `${vehicle.brand} ${vehicle.model} is now ${
          !vehicle.featured ? "featured" : "unfeatured"
        }.`
      );
      // Refresh list
      setViewFilter((prev) => prev === "all" ? "featured" : "all");
      setTimeout(() => setViewFilter("all"), 100);
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      console.error("Toggle featured error:", error.message || error);
      setError("Failed to update featured status: " + (error.response?.data?.message || error.message || "Unknown error"));
    }
  }, [axiosInstance]);

  // Delete vehicle handler
  const deleteVehicle = useCallback(async (id: number) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      console.log("Deleting vehicle ID:", id);
      await axiosInstance.delete(`http://localhost:5000/admin/vehicle/${id}`);
      setMessage("Vehicle deleted successfully.");
      // Re-fetch to update list
      setViewFilter((prev) => prev);
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      console.error("Delete vehicle error:", error.message || error);
      setError("Failed to delete vehicle: " + (error.response?.data?.message || error.message || "Unknown error"));
    }
  }, [axiosInstance]);

  // Client side filtering on search term
  const filteredVehicles = useMemo(() => {
    if (!searchTerm.trim()) return vehicles;
    const lower = searchTerm.toLowerCase();
    return vehicles.filter(
      (v) =>
        v.brand.toLowerCase().includes(lower) || v.model.toLowerCase().includes(lower)
    );
  }, [vehicles, searchTerm]);

  // Filter for draft tab if applicable
  const displayedVehicles = useMemo(() => {
    if (viewFilter === "draft") {
      return filteredVehicles.filter((v) => !v.published);
    }
    return filteredVehicles;
  }, [filteredVehicles, viewFilter]);

  // Pagination
  const totalPages = Math.ceil(displayedVehicles.length / ITEMS_PER_PAGE);
  const paginatedVehicles = displayedVehicles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const paginationStyle = ({ active, disabled = false }: PaginationStyleProps): React.CSSProperties => {
    return {
      padding: "0.6rem 1.2rem",
      borderRadius: 8,
      background: active ? COLORS.textPrimary : "transparent",
      color: active ? COLORS.featuredBadgeText : COLORS.textPrimary,
      border: `2px solid ${COLORS.textPrimary}`,
      fontWeight: 600,
      userSelect: "none",
      cursor: disabled ? "not-allowed" : active ? "default" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "all 0.3s ease",
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.background,
        color: COLORS.textSecondary,
        padding: "2rem 1rem",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <header
        style={{
          maxWidth: 1400,
          margin: "0 auto 2rem",
          textAlign: "center",
          padding: "2rem 0",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "800",
            background: `linear-gradient(135deg, ${COLORS.textPrimary} 0%, #BFA980 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.05em",
            marginBottom: "0.5rem",
            textTransform: "uppercase",
          }}
        >
          Epic Luxe Inventory
        </h1>
        <p style={{ fontSize: "1.1rem", color: COLORS.textMuted }}>
          Manage Your Luxury Vehicle Collection
        </p>
      </header>

      <main style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Controls */}
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 32,
            padding: "1.5rem",
            background: COLORS.cardBg,
            borderRadius: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <input
            type="search"
            aria-label="Search vehicles by brand or model"
            placeholder="🔍 Search by brand or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: "1 1 300px",
              padding: "0.75rem 1rem",
              borderRadius: 8,
              border: `2px solid ${COLORS.border}`,
              backgroundColor: "#0f0f0f",
              color: COLORS.textSecondary,
              fontSize: "1rem",
              fontWeight: 500,
              transition: "all 0.3s ease",
              outline: "none",
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

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: "0 1 auto" }}>
            {(["all", "published", "draft", "featured"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setViewFilter(filter);
                  setCurrentPage(1);
                }}
                aria-pressed={viewFilter === filter}
                style={{
                  cursor: "pointer",
                  borderRadius: 8,
                  padding: "0.75rem 1.5rem",
                  border: "2px solid transparent",
                  background:
                    viewFilter === filter 
                      ? `linear-gradient(135deg, ${COLORS.textPrimary} 0%, #BFA980 100%)`
                      : COLORS.buttonBg,
                  color: viewFilter === filter ? COLORS.featuredBadgeText : COLORS.textSecondary,
                  fontWeight: 600,
                  userSelect: "none",
                  transition: "all 0.3s ease",
                  textTransform: "capitalize",
                }}
                onMouseEnter={(e) => {
                  if (viewFilter !== filter) {
                    e.currentTarget.style.borderColor = COLORS.textPrimary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (viewFilter !== filter) {
                    e.currentTarget.style.borderColor = "transparent";
                  }
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          <Link href="/luxe/admin/vehicle-new" style={{ flex: "0 0 auto" }}>
            <button
              type="button"
              style={{
                borderRadius: 8,
                padding: "0.75rem 1.5rem",
                border: "none",
                background: `linear-gradient(135deg, ${COLORS.textPrimary} 0%, #BFA980 100%)`,
                color: COLORS.featuredBadgeText,
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
                fontSize: "1rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(212, 175, 55, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              aria-label="Add New Vehicle"
            >
              + Add New Vehicle
            </button>
          </Link>
        </section>

        {/* Messages */}
        {(message || error) && (
          <div
            role="alert"
            aria-live="assertive"
            style={{
              marginBottom: 24,
              padding: "1rem 1.5rem",
              borderRadius: 8,
              color: "#fff",
              background: message 
                ? `linear-gradient(135deg, ${COLORS.successBg} 0%, #15803d 100%)`
                : `linear-gradient(135deg, ${COLORS.errorBg} 0%, #dc2626 100%)`,
              fontWeight: 600,
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              animation: "slideIn 0.3s ease",
            }}
            tabIndex={-1}
          >
            {message ?? error}
          </div>
        )}

        {loading ? (
          <div
            style={{
              padding: "4rem",
              textAlign: "center",
              color: COLORS.textPrimary,
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
            aria-busy="true"
          >
            <div style={{ 
              display: "inline-block",
              animation: "spin 1s linear infinite",
              fontSize: "2rem",
              marginBottom: "1rem" 
            }}>
              ⚙️
            </div>
            <p>Loading luxury vehicles...</p>
          </div>
        ) : paginatedVehicles.length === 0 ? (
          <div
            style={{ 
              padding: "4rem", 
              textAlign: "center", 
              color: COLORS.textMuted,
              fontSize: "1.1rem"
            }}
          >
            <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚗</p>
            <p>No vehicles found matching your criteria.</p>
          </div>
        ) : (
          <>
            <section
              aria-label="Vehicle grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 24,
                marginBottom: 32,
              }}
            >
              {paginatedVehicles.map((v) => (
                <article
                  key={v.id}
                  tabIndex={0}
                  style={{
                    background: v.published 
                      ? `linear-gradient(135deg, ${COLORS.publishedBg} 0%, #1a2e1a 100%)`
                      : `linear-gradient(135deg, ${COLORS.draftBg} 0%, #2e1a1a 100%)`,
                    borderRadius: 12,
                    padding: 20,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    border: `1px solid ${v.featured ? COLORS.textPrimary : COLORS.border}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(212, 175, 55, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
                  }}
                >
                  {v.featured && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        padding: "0.5rem 1.5rem",
                        background: COLORS.featuredBadgeBg,
                        color: COLORS.featuredBadgeText,
                        fontWeight: 700,
                        fontSize: 12,
                        borderBottomLeftRadius: 12,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      ⭐ Featured
                    </div>
                  )}

                  <div style={{ paddingTop: v.featured ? 20 : 0 }}>
                    <h2
                      style={{
                        color: COLORS.textPrimary,
                        fontWeight: "700",
                        fontSize: "1.5rem",
                        marginBottom: 8,
                      }}
                    >
                      {v.brand} {v.model}
                    </h2>
                    
                    <div style={{ display: "grid", gap: 6, fontSize: "0.95rem" }}>
                      <p style={{ color: COLORS.textSecondary }}>
                        <span style={{ color: COLORS.textMuted }}>Year:</span> {v.year}
                      </p>
                      <p style={{ color: COLORS.textSecondary }}>
                        <span style={{ color: COLORS.textMuted }}>Price:</span>{" "}
                        <strong style={{ color: COLORS.textPrimary }}>
                          {v.price.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </strong>
                      </p>
                      <p style={{ color: COLORS.textSecondary }}>
                        <span style={{ color: COLORS.textMuted }}>Location:</span> {v.location}
                      </p>
                      <p style={{ 
                        color: COLORS.textSecondary,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 8,
                      }}>
                        <span
                          style={{
                            display: "inline-block",
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: v.published ? "#22c55e" : "#ef4444",
                          }}
                        />
                        <strong>{v.published ? "Published" : "Draft"}</strong>
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "auto",
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 8,
                    }}
                  >
                    <button
                      aria-label={`Toggle published status of ${v.brand} ${v.model}`}
                      onClick={() => togglePublished(v)}
                      style={{
                        padding: "0.6rem",
                        borderRadius: 6,
                        border: "none",
                        background: v.published
                          ? "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)"
                          : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                        color: "white",
                        fontWeight: 600,
                        cursor: "pointer",
                        userSelect: "none",
                        transition: "all 0.3s ease",
                        fontSize: "0.9rem",
                      }}
                      title={v.published ? "Unpublish vehicle" : "Publish vehicle"}
                    >
                      {v.published ? "Unpublish" : "Publish"}
                    </button>
                    
                    <button
                      aria-label={`Toggle featured status of ${v.brand} ${v.model}`}
                      onClick={() => toggleFeatured(v)}
                      style={{
                        padding: "0.6rem",
                        borderRadius: 6,
                        border: "none",
                        background: v.featured
                          ? "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)"
                          : "linear-gradient(135deg, #D4AF37 0%, #BFA980 100%)",
                        color: v.featured ? "white" : COLORS.featuredBadgeText,
                        fontWeight: 600,
                        cursor: "pointer",
                        userSelect: "none",
                        transition: "all 0.3s ease",
                        fontSize: "0.9rem",
                      }}
                      title={v.featured ? "Remove featured status" : "Feature"}
                    >
                      {v.featured ? "Unfeature" : "Feature"}
                    </button>
                    
                    <Link href={`/luxe/admin/vehicle/${v.id}`} style={{ textDecoration: "none" }}>
                      <button
                        aria-label={`Edit ${v.brand} ${v.model}`}
                        style={{
                          width: "100%",
                          padding: "0.6rem",
                          borderRadius: 6,
                          border: `2px solid ${COLORS.textPrimary}`,
                          background: "transparent",
                          color: COLORS.textPrimary,
                          fontWeight: 600,
                          cursor: "pointer",
                          userSelect: "none",
                          transition: "all 0.3s ease",
                          fontSize: "0.9rem",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = COLORS.textPrimary;
                          e.currentTarget.style.color = COLORS.featuredBadgeText;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = COLORS.textPrimary;
                        }}
                      >
                        Edit
                      </button>
                    </Link>
                    
                    <button
                      aria-label={`Delete ${v.brand} ${v.model}`}
                      onClick={() => deleteVehicle(v.id)}
                      style={{
                        padding: "0.6rem",
                        borderRadius: 6,
                        border: "none",
                        background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
                        color: "white",
                        fontWeight: 600,
                        cursor: "pointer",
                        userSelect: "none",
                        transition: "all 0.3s ease",
                        fontSize: "0.9rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.9";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="Pagination"
                style={{
                  marginTop: 32,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                  padding: "1.5rem",
                  background: COLORS.cardBg,
                  borderRadius: 12,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  style={paginationStyle({ active: false, disabled: currentPage === 1 })}
                >
                  ← Previous
                </button>
                
                <div style={{ display: "flex", gap: 4 }}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first, last, current, and adjacent pages
                    if (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          aria-current={page === currentPage ? "page" : undefined}
                          style={paginationStyle({ active: page === currentPage })}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span
                          key={page}
                          style={{ color: COLORS.textMuted, padding: "0 0.5rem" }}
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  style={paginationStyle({ active: false, disabled: currentPage === totalPages })}
                >
                  Next →
                </button>
              </nav>
            )}
          </>
        )}
      </main>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}