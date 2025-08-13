"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import axios from "axios";

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

const COLORS = {
  background: "#222222",
  textPrimary: "#E6B53F", // Slightly brighter golden
  textSecondary: "#FFFFFF",
  buttonBg: "#444444",
  buttonHover: "#B7963E",
  border: "#555555",
  featuredBadgeBg: "#B7963E",
  featuredBadgeText: "#222222",
  publishedBg: "#333333",
  draftBg: "#1e1e1e",
  hoverBg: "#3a3a3a",
  editBtnBg: "#E6B53F",
  editBtnText: "#222",
  editBtnHover: "#B7963E",
  deleteBtnBg: "#B93131",
  deleteBtnHover: "#8B2727",
};

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

  const axiosInstance = axios.create();

  axiosInstance.interceptors.response.use(
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

  // Fetch vehicles depending on the current filter
 useEffect(() => {
  // fetch vehicles when viewFilter changes
  async function fetchVehiclesFiltered() {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      let apiUrl = "http://localhost:5000/admin/vehicles"; // modify if needed
      if (viewFilter === "featured") {
        apiUrl = "http://localhost:5000/admin/vehicles/featured";
      } else if (viewFilter === "published") {
        apiUrl = "http://localhost:5000/admin/vehicles/published";
      }
      const res = await axiosInstance.get<{ vehicles: Vehicle[] }>(apiUrl);
      setVehicles(res.data.vehicles || []);
    } catch (err) {
      setError("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  }
  fetchVehiclesFiltered();
}, [viewFilter]);

// Another useEffect resetting page on search filter change, dependencies static:
useEffect(() => {
  setCurrentPage(1);
}, [searchTerm]);


  // Reset to first page on filter or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Toggle publish status for a vehicle
  async function togglePublished(vehicle: Vehicle) {
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
          vehicle.published ? "unpublished" : "published"
        }.`
      );
      // Refresh list based on current filter; if viewing published list, refetch
      if (viewFilter === "published" || viewFilter === "all") {
        setViewFilter("all"); // quick toggle to refresh the list
      } else {
        setViewFilter(viewFilter); // triggers re-fetch inside useEffect
      }
    } catch (err: any) {
      console.error("Toggle published error:", err.message || err);
      setError("Failed to update published status: " + (err.message || ""));
    }
  }

  // Toggle featured status with the 6-feature max enforced by backend
  async function toggleFeatured(vehicle: Vehicle) {
    try {
      console.log(
        `Toggling featured for vehicle ID: ${vehicle.id}, current: ${vehicle.featured}`
      );
      const url = `http://localhost:5000/admin/vehicle/${vehicle.id}`;
      await axiosInstance.put(url, {
        featured: !vehicle.featured,
      });
      if (viewFilter === "featured" || viewFilter === "all") {
        setViewFilter("all"); // or "featured"
      } else {
        setViewFilter(viewFilter);
      }
    } catch (err: any) {
      console.error("Toggle featured error:", err.message || err);
      setError("Failed to update featured status: " + (err.message || ""));
    }
  }

  // Delete vehicle handler
  async function deleteVehicle(id: number) {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      console.log("Deleting vehicle ID:", id);
      await axiosInstance.delete(`http://localhost:5000/admin/vehicle/${id}`);
      setMessage("Vehicle deleted successfully.");
      // re-fetch based on filter to update list
      setViewFilter(viewFilter);
    } catch (err: any) {
      console.error("Delete vehicle error:", err.message || err);
      setError("Failed to delete vehicle: " + (err.message || ""));
    }
  }

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

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: COLORS.background,
        color: COLORS.textSecondary,
        padding: "1rem",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <header
        style={{
          maxWidth: 1200,
          margin: "0 auto 1.5rem",
          borderBottom: `3px solid ${COLORS.textPrimary}`,
          paddingBottom: "1rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: COLORS.textPrimary,
            letterSpacing: "0.15em",
            marginBottom: "0.5rem",
          }}
        >
          EPIC LUXE Vehicle Inventory Management
        </h1>
        <p style={{ fontSize: "1rem", color: "#ccc" }}>
          Manage Published, Draft, and Featured Vehicles
        </p>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Controls */}
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <input
            type="search"
            aria-label="Search vehicles by brand or model"
            placeholder="Search by brand or model"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flexGrow: 1,
              minWidth: 220,
              padding: "0.5rem",
              borderRadius: 6,
              border: `1.5px solid ${COLORS.textPrimary}`,
              backgroundColor: "#111",
              color: COLORS.textPrimary,
              fontWeight: 600,
            }}
          />

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["all", "published", "draft", "featured"].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setViewFilter(filter as typeof viewFilter);
                  setCurrentPage(1);
                }}
                aria-pressed={viewFilter === filter}
                style={{
                  cursor: "pointer",
                  borderRadius: 6,
                  padding: "0.4rem 0.8rem",
                  border: `1.5px solid ${COLORS.textPrimary}`,
                  backgroundColor:
                    viewFilter === filter ? COLORS.textPrimary : "transparent",
                  color: viewFilter === filter ? COLORS.background : COLORS.textPrimary,
                  fontWeight: 600,
                  userSelect: "none",
                }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <Link href="/luxe/admin/vehicle-new">
            <button
              type="button"
              style={{
                borderRadius: 6,
                padding: "0.5rem 1rem",
                border: `1.5px solid ${COLORS.textPrimary}`,
                backgroundColor: COLORS.buttonBg,
                color: COLORS.textPrimary,
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = COLORS.buttonHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = COLORS.buttonBg)
              }
              aria-label="Add New Vehicle"
            >
              + Add Vehicle
            </button>
          </Link>
        </section>

        {/* Messages */}
        {(message || error) && (
          <div
            role="alert"
            aria-live="assertive"
            style={{
              marginBottom: 20,
              padding: "0.75rem",
              borderRadius: 6,
              color: "#fff",
              backgroundColor: message ? COLORS.textPrimary : "#B93131",
              fontWeight: 600,
              textAlign: "center",
            }}
            tabIndex={-1}
          >
            {message ?? error}
          </div>
        )}

        {loading ? (
          <p
            style={{
              padding: 40,
              textAlign: "center",
              color: COLORS.textPrimary,
              fontWeight: 600,
            }}
            aria-busy="true"
          >
            Loading vehicles...
          </p>
        ) : paginatedVehicles.length === 0 ? (
          <p
            style={{ padding: 40, textAlign: "center", color: COLORS.textSecondary }}
          >
            No vehicles found.
          </p>
        ) : (
          <>
            <section
              aria-label="Vehicle grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: 16,
              }}
            >
              {paginatedVehicles.map((v) => (
                <article
                  key={v.id}
                  tabIndex={0}
                  style={{
                    backgroundColor: v.published ? COLORS.publishedBg : COLORS.draftBg,
                    borderRadius: 8,
                    padding: 16,
                    boxShadow: `0 0 12px 2px rgb(230 181 63 / 0.6)`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: 200,
                  }}
                >
                  <div>
                    <h2
                      style={{
                        color: COLORS.textPrimary,
                        fontWeight: "700",
                        fontSize: "1.25rem",
                      }}
                    >
                      {v.brand} {v.model}
                    </h2>
                    <p
                      style={{ color: COLORS.textSecondary, fontSize: 14, margin: "0.25rem 0" }}
                    >
                      Year: {v.year}
                    </p>
                    <p
                      style={{ color: COLORS.textSecondary, fontSize: 14, margin: "0.25rem 0" }}
                    >
                      Price:{" "}
                      {v.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                    <p style={{ color: COLORS.textSecondary, marginBottom: 6 }}>
                      Location: {v.location}
                    </p>
                    <p style={{ color: COLORS.textSecondary }}>
                      Status: <strong>{v.published ? "Published" : "Draft"}</strong>
                    </p>
                    {v.featured && (
                      <span
                        style={{
                          marginTop: 8,
                          display: "inline-block",
                          padding: "0.2rem 0.8rem",
                          borderRadius: 20,
                          backgroundColor: COLORS.featuredBadgeBg,
                          color: COLORS.featuredBadgeText,
                          fontWeight: 700,
                          fontSize: 12,
                        }}
                      >
                        Featured
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      aria-label={`Toggle published status of ${v.brand} ${v.model}`}
                      onClick={() => togglePublished(v)}
                      style={{
                        flexGrow: 1,
                        padding: 8,
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: v.published
                          ? COLORS.featuredBadgeBg
                          : COLORS.buttonBg,
                        color: v.published ? COLORS.featuredBadgeText : COLORS.textPrimary,
                        fontWeight: 600,
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                      title={v.published ? "Unpublish vehicle" : "Publish vehicle"}
                    >
                      {v.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      aria-label={`Toggle featured status of ${v.brand} ${v.model}`}
                      onClick={() => toggleFeatured(v)}
                      style={{
                        flexGrow: 1,
                        padding: 8,
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: v.featured
                          ? COLORS.featuredBadgeBg
                          : COLORS.buttonBg,
                        color: v.featured ? COLORS.featuredBadgeText : COLORS.textPrimary,
                        fontWeight: 600,
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                      title={v.featured ? "Remove featured status" : "Feature"}
                    >
                      {v.featured ? "Remove Featured" : "Feature"}
                    </button>
                    <Link href={`/luxe/admin/vehicle/${v.id}`}>
                      <button
                        aria-label={`Edit ${v.brand} ${v.model}`}
                        style={{
                          flexGrow: 1,
                          borderRadius: 6,
                          border: `1.5px solid ${COLORS.textPrimary}`,
                          backgroundColor: "transparent",
                          color: COLORS.textPrimary,
                          fontWeight: 600,
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      aria-label={`Delete ${v.brand} ${v.model}`}
                      onClick={() => deleteVehicle(v.id)}
                      style={{
                        flexGrow: 1,
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: COLORS.deleteBtnBg,
                        color: "white",
                        fontWeight: 600,
                        cursor: "pointer",
                        userSelect: "none",
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
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  style={paginationStyle(currentPage === 1, COLORS)}
                >
                  &lt; Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      aria-current={page === currentPage ? "page" : undefined}
                      style={paginationStyle(page === currentPage, COLORS)}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  style={paginationStyle(currentPage === totalPages, COLORS)}
                >
                  Next &gt;
                </button>
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function paginationStyle(active: boolean, colors: any): React.CSSProperties {
  return {
    padding: "0.5rem 1rem",
    borderRadius: 6,
    backgroundColor: active ? colors.textPrimary : "transparent",
    color: active ? colors.background : colors.textPrimary,
    border: `1.5px solid ${colors.textPrimary}`,
    fontWeight: 600,
    userSelect: "none",
    cursor: active ? "default" : "pointer",
  };
}
