import { useState, useEffect } from "react";

interface Props {
  existingData?: any;
  vehicleId?: string | number;
}

export default function AdminUploadForm({ existingData, vehicleId }: Props) {
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

  useEffect(() => {
    if (existingData) {
      setFormData({
        brand: existingData.brand || "",
        model: existingData.model || "",
        variant: existingData.variant || "",
        year: existingData.year?.toString() || "",
        price: existingData.price?.toString() || "",
        original_price: existingData.original_price?.toString() || "",
        savings: existingData.savings?.toString() || "",
        mileage: existingData.mileage || "",
        fuel_type: existingData.fuel_type || "",
        transmission: existingData.transmission || "",
        engine_capacity: existingData.engine_capacity || "",
        drivetrain: existingData.drivetrain || "",
        seating: existingData.seating?.toString() || "",
        horsepower: existingData.horsepower || "",
        torque: existingData.torque || "",
        location: existingData.location || "",
        condition: existingData.condition || "",
        ownership: existingData.ownership || "",
        health_engine: existingData.health_engine?.toString() || "",
        health_tyres: existingData.health_tyres?.toString() || "",
        health_paint: existingData.health_paint?.toString() || "",
        health_interior: existingData.health_interior?.toString() || "",
        health_electrical: existingData.health_electrical?.toString() || "",
        color_exterior: existingData.color_exterior || "",
        color_interior: existingData.color_interior || "",
        video_url: existingData.video_url || "",
        published: existingData.published || false,
        featured: existingData.featured || false,
        features: existingData.features?.join(", ") || "",
      });
    }
  }, [existingData]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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
          const featuresArray = formData.features.split(",").map((f) => f.trim()).filter(Boolean);
          form.append("features", JSON.stringify(featuresArray));
        } else {
          // @ts-ignore
          form.append(key, formData[key]);
        }
      }
      images.forEach((img) => form.append("images", img));

      const url = vehicleId
        ? `http://localhost:5000/admin/vehicle/${vehicleId}`
        : "http://localhost:5000/admin/upload-vehicle";
      const method = vehicleId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: form });
      const data = await res.json();

      if (res.ok) {
        setMessage(vehicleId ? "Vehicle updated successfully" : "Vehicle uploaded successfully");
        if (!vehicleId) {
          // Reset form after new upload
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
        }
      } else {
        setMessage("Failed: " + data.error);
      }
    } catch (err: any) {
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Theme colors strictly black and white variants
  const theme = {
    background: "#000000",      // pure black background
    border: "#cccccc",          // light gray border
    inputBg: "#1a1a1a",         // dark gray input background
    inputText: "#f0f0f0",       // almost white text
    labelText: "#ffffff",       // white labels
    buttonBg: "#000000",        // black button background
    buttonText: "#ffffff",      // white button text
    buttonHoverBg: "#222222",  // dark gray hover on button
    messageSuccess: "#e0e0e0", // light gray success message background
    messageError: "#660000",   // dark red for errors
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: theme.background,
        borderRadius: 12,
        width: "100%",
        margin: "2rem 0",
        padding: "2.5rem",
        boxShadow: "0 8px 40px rgba(255,255,255,0.1)",
        display: "grid",
        gap: "1.5rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        color: theme.labelText,
        fontFamily: "'Manrope', 'Times New Roman', serif",
        boxSizing: "border-box",
      }}
    >
      <div style={{ gridColumn: "1 / -1", textAlign: "center", marginBottom: 16 }}>
        <h2
          style={{
            color: theme.labelText,
            fontSize: 24,
            letterSpacing: 3,
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          {vehicleId ? "Edit Vehicle" : "Add New Vehicle"}
        </h2>
        <p style={{ color: "#aaa", fontSize: 16 }}>
          Please complete all the details carefully for your inventory.
        </p>
      </div>

      {[ 
        { name: "brand", label: "Brand", required: true },
        { name: "model", label: "Model", required: true },
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
      ].map(({ name, label, type, required }) => (
        <div key={name} style={{ display: "flex", flexDirection: "column" }}>
          <label
            htmlFor={name}
            style={{ fontWeight: 600, marginBottom: 6, letterSpacing: 1, fontSize: 16, color: theme.labelText }}
          >
            {label} {required ? "*" : ""}
          </label>
          <input
            id={name}
            name={name}
            type={type || "text"}
            value={(formData as any)[name]}
            onChange={handleChange}
            required={required}
            placeholder={label}
            style={{
              padding: "14px 12px",
              borderRadius: 8,
              backgroundColor: theme.inputBg,
              color: theme.inputText,
              border: `1.5px solid ${theme.border}`,
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: 0.5,
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#FFFFFF")}
            onBlur={(e) => (e.currentTarget.style.borderColor = theme.border)}
          />
        </div>
      ))}

      <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column" }}>
        <label
          htmlFor="features"
          style={{ fontWeight: 600, marginBottom: 6, letterSpacing: 1, fontSize: 16, color: theme.labelText }}
        >
          Features (comma separated)
        </label>
        <textarea
          id="features"
          name="features"
          value={formData.features}
          onChange={handleChange}
          rows={3}
          placeholder="Sunroof, Leather seats, Navigation, etc."
          style={{
            padding: "14px 12px",
            borderRadius: 8,
            backgroundColor: theme.inputBg,
            color: theme.inputText,
            border: `1.5px solid ${theme.border}`,
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: 0.5,
            resize: "vertical",
            outline: "none",
            transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#FFFFFF")}
          onBlur={(e) => (e.currentTarget.style.borderColor = theme.border)}
        />
      </div>

      <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column" }}>
        <label
          htmlFor="images"
          style={{ fontWeight: 600, marginBottom: 6, letterSpacing: 1, fontSize: 16, color: theme.labelText }}
        >
          Upload Images (max 20)
        </label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          style={{
            borderRadius: 8,
            backgroundColor: theme.inputBg,
            color: theme.inputText,
            border: `1.5px solid ${theme.border}`,
            padding: "10px",
            cursor: "pointer",
          }}
        />
        {images.length > 0 && (
          <p style={{ color: theme.inputText, marginTop: 6 }}>
            {images.length} image{images.length > 1 ? "s" : ""} selected
          </p>
        )}
      </div>

      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          gap: 25,
          marginTop: 8,
          alignItems: "center",
          color: theme.inputText,
          fontWeight: 700,
        }}
      >
        <label style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            style={{ marginRight: 8, cursor: "pointer" }}
          />
          Published
        </label>
        <label style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            style={{ marginRight: 8, cursor: "pointer" }}
          />
          Featured
        </label>
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px 0",
            borderRadius: 12,
            backgroundColor: theme.buttonBg,
            border: "1.5px solid #444",
            color: theme.buttonText,
            fontWeight: 800,
            fontSize: 18,
            cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: 2,
            transition: "background-color 0.25s ease",
          }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = theme.border)}
          onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = theme.buttonBg)}
        >
          {loading ? "Saving..." : vehicleId ? "Update Vehicle" : "Create Vehicle"}
        </button>
      </div>

      {message && (
        <p
          style={{
            gridColumn: "1 / -1",
            marginTop: 18,
            padding: "10px",
            fontWeight: 700,
            fontSize: 16,
            textAlign: "center",
            backgroundColor: message.startsWith("Failed") || message.startsWith("Error") ? "#440000" : "#222222",
            color: "#fff",
            borderRadius: 8,
            userSelect: "none",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
