import { useState, useEffect } from "react";

// Define proper types for vehicle data
interface VehicleData {
  brand?: string;
  model?: string;
  variant?: string;
  year?: number | string;
  price?: number | string;
  original_price?: number | string;
  savings?: number | string;
  mileage?: string;
  fuel_type?: string;
  transmission?: string;
  engine_capacity?: string;
  drivetrain?: string;
  seating?: number | string;
  horsepower?: string;
  torque?: string;
  location?: string;
  condition?: string;
  ownership?: string;
  health_engine?: number | string;
  health_tyres?: number | string;
  health_paint?: number | string;
  health_interior?: number | string;
  health_electrical?: number | string;
  color_exterior?: string;
  color_interior?: string;
  video_url?: string;
  published?: boolean;
  featured?: boolean;
  features?: string[] | string;
}

interface Props {
  existingData?: VehicleData;
  vehicleId?: string | number;
}

interface FormData {
  brand: string;
  model: string;
  variant: string;
  year: string;
  price: string;
  original_price: string;
  savings: string;
  mileage: string;
  fuel_type: string;
  transmission: string;
  engine_capacity: string;
  drivetrain: string;
  seating: string;
  horsepower: string;
  torque: string;
  location: string;
  condition: string;
  ownership: string;
  health_engine: string;
  health_tyres: string;
  health_paint: string;
  health_interior: string;
  health_electrical: string;
  color_exterior: string;
  color_interior: string;
  video_url: string;
  published: boolean;
  featured: boolean;
  features: string;
}

export default function AdminUploadForm({ existingData, vehicleId }: Props) {
  const [formData, setFormData] = useState<FormData>({
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
        features: Array.isArray(existingData.features) 
          ? existingData.features.join(", ") 
          : existingData.features || "",
      });
    }
  }, [existingData]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    
    // Type guard for checkbox inputs
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      const checked = target.checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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

      // Type-safe iteration over form data
      (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
        if (key === "features") {
          const featuresArray = formData.features.split(",").map((f) => f.trim()).filter(Boolean);
          form.append("features", JSON.stringify(featuresArray));
        } else {
          // @ts-expect-error - FormData.append expects string, but we know our values are convertible
          form.append(key, formData[key]);
        }
      });
      
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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setMessage("Error: " + errorMessage);
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
        { name: "brand" as keyof FormData, label: "Brand", required: true },
        { name: "model" as keyof FormData, label: "Model", required: true },
        { name: "variant" as keyof FormData, label: "Variant" },
        { name: "year" as keyof FormData, label: "Year", type: "number" },
        { name: "price" as keyof FormData, label: "Price" },
        { name: "original_price" as keyof FormData, label: "Original Price" },
        { name: "savings" as keyof FormData, label: "Savings" },
        { name: "mileage" as keyof FormData, label: "Mileage" },
        { name: "fuel_type" as keyof FormData, label: "Fuel Type" },
        { name: "transmission" as keyof FormData, label: "Transmission" },
        { name: "engine_capacity" as keyof FormData, label: "Engine Capacity" },
        { name: "drivetrain" as keyof FormData, label: "Drivetrain" },
        { name: "seating" as keyof FormData, label: "Seating", type: "number" },
        { name: "horsepower" as keyof FormData, label: "Horsepower" },
        { name: "torque" as keyof FormData, label: "Torque" },
        { name: "location" as keyof FormData, label: "Location" },
        { name: "condition" as keyof FormData, label: "Condition" },
        { name: "ownership" as keyof FormData, label: "Ownership" },
        { name: "health_engine" as keyof FormData, label: "Health Engine", type: "number" },
        { name: "health_tyres" as keyof FormData, label: "Health Tyres", type: "number" },
        { name: "health_paint" as keyof FormData, label: "Health Paint", type: "number" },
        { name: "health_interior" as keyof FormData, label: "Health Interior", type: "number" },
        { name: "health_electrical" as keyof FormData, label: "Health Electrical", type: "number" },
        { name: "color_exterior" as keyof FormData, label: "Color Exterior" },
        { name: "color_interior" as keyof FormData, label: "Color Interior" },
        { name: "video_url" as keyof FormData, label: "Video URL" },
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
            value={formData[name] as string}
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