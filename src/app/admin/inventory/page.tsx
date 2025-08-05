'use client';

import { useState } from "react";

export default function AdminUpload() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    variant: "",
    year: "",
    price: "",
    original_price: "",
    savings: "",
    mileage: "",
    fuel_type: "",
    transmission: "",
    engine_capacity: "",
    drivetrain: "",
    seating: "",
    horsepower: "",
    torque: "",
    location: "",
    condition: "",
    ownership: "",
    health_engine: "",
    health_tyres: "",
    health_paint: "",
    health_interior: "",
    health_electrical: "",
    color_exterior: "",
    color_interior: "",
    video_url: "",
    published: false,
    featured: false,
    features: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const form = new FormData();

      for (const key in formData) {
        if (key === "features") {
          const featuresArray = formData.features
            .split(",")
            .map(f => f.trim())
            .filter(Boolean);
          form.append("features", JSON.stringify(featuresArray));
        } else {
          // @ts-ignore
          form.append(key, formData[key]);
        }
      }

      images.forEach(img => form.append("images", img));

      const res = await fetch("http://localhost:5000/admin/upload-vehicle", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("🎉 Vehicle uploaded successfully! Slug: " + data.slug);
        setFormData({
          brand: "",
          model: "",
          variant: "",
          year: "",
          price: "",
          original_price: "",
          savings: "",
          mileage: "",
          fuel_type: "",
          transmission: "",
          engine_capacity: "",
          drivetrain: "",
          seating: "",
          horsepower: "",
          torque: "",
          location: "",
          condition: "",
          ownership: "",
          health_engine: "",
          health_tyres: "",
          health_paint: "",
          health_interior: "",
          health_electrical: "",
          color_exterior: "",
          color_interior: "",
          video_url: "",
          published: false,
          featured: false,
          features: "",
        });
        setImages([]);
      } else {
        setMessage("❌ Upload failed: " + data.error);
      }
    } catch (err: any) {
      setMessage("⚠️ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      maxWidth: "900px",
      margin: "2rem auto",
      padding: "1rem 2rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f9fafb",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ textAlign: 'center', color: "#1f2937", marginBottom: "1.5rem" }}>Admin Vehicle Upload</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {/* Text inputs */}
        {[
          { name: "brand", label: "Brand" },
          { name: "model", label: "Model" },
          { name: "variant", label: "Variant" },
          { name: "year", label: "Year", type: "number" },
          { name: "price", label: "Price" },
          { name: "original_price", label: "Original Price" },
          { name: "savings", label: "Savings" },
          { name: "mileage", label: "Mileage" },
          { name: "fuel_type", label: "Fuel Type" },
          { name: "transmission", label: "Transmission" },
          { name: "engine_capacity", label: "Engine Capacity" },
          { name: "drivetrain", label: "Drivetrain" },
          { name: "seating", label: "Seating", type: "number" },
          { name: "horsepower", label: "Horsepower" },
          { name: "torque", label: "Torque" },
          { name: "location", label: "Location" },
          { name: "condition", label: "Condition" },
          { name: "ownership", label: "Ownership" },
          { name: "health_engine", label: "Health Engine", type: "number" },
          { name: "health_tyres", label: "Health Tyres", type: "number" },
          { name: "health_paint", label: "Health Paint", type: "number" },
          { name: "health_interior", label: "Health Interior", type: "number" },
          { name: "health_electrical", label: "Health Electrical", type: "number" },
          { name: "color_exterior", label: "Color Exterior" },
          { name: "color_interior", label: "Color Interior" },
          { name: "video_url", label: "Video URL" },
        ].map(({ name, label, type }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor={name} style={{ marginBottom: "0.25rem", fontWeight: 600, color: "#374151" }}>{label}</label>
            <input
              id={name}
              name={name}
              type={type || "text"}
              value={(formData as any)[name]}
              onChange={handleChange}
              placeholder={`Enter ${label.toLowerCase()}`}
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                outlineColor: "#3b82f6"
              }}
              required={["brand", "model", "year"].includes(name)}
            />
          </div>
        ))}

        {/* Features input */}
        <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column" }}>
          <label htmlFor="features" style={{ marginBottom: "0.25rem", fontWeight: 600, color: "#374151" }}>
            Features (comma separated)
          </label>
          <textarea
            id="features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Sunroof, Leather Seats, Navigation, etc."
            rows={3}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
              outlineColor: "#3b82f6",
              resize: "vertical"
            }}
          />
        </div>

        {/* Images upload */}
        <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column" }}>
          <label htmlFor="images" style={{ marginBottom: "0.25rem", fontWeight: 600, color: "#374151" }}>
            Upload Images (Max 10)
          </label>
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={{ padding: "0.25rem" }}
          />
          {images.length > 0 && (
            <small style={{ marginTop: "0.5rem", color: "#6b7280" }}>
              {images.length} image{images.length > 1 ? "s" : ""} selected
            </small>
          )}
        </div>

        {/* Published and Featured */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <label style={{ color: "#374151" }}>
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              style={{ marginRight: "0.5rem" }}
            />
            Published
          </label>
          <label style={{ color: "#374151" }}>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              style={{ marginRight: "0.5rem" }}
            />
            Featured
          </label>
        </div>

        {/* Submit button */}
        <div style={{ gridColumn: "1 / -1", textAlign: "center", marginTop: "1rem" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "0.75rem 2rem",
              borderRadius: "6px",
              border: "none",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2563eb")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#3b82f6")}
          >
            {loading ? "Uploading..." : "Upload Vehicle"}
          </button>
        </div>

        {/* Message display */}
        {message && (
          <p style={{
            gridColumn: "1 / -1",
            marginTop: "1rem",
            textAlign: "center",
            color: message.startsWith("🎉") ? "#16a34a" : "#dc2626",
            fontWeight: 600,
          }}>
            {message}
          </p>
        )}

      </form>
    </div>
  );
}
