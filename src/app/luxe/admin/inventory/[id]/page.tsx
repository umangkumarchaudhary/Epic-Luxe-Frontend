'use client';

import { useEffect, useState } from "react";
import AdminUploadForm from '@/app/components/AdminUploadForm';

// Define a proper Vehicle type instead of using `any`
interface Vehicle {
  id: string;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  original_price?: number;
  savings?: number;
  mileage?: string;
  fuel_type?: string;
  transmission?: string;
  location?: string;
  condition?: string;
  slug: string;
  image_url?: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVehicle() {
      try {
        const res = await fetch(`http://localhost:5000/admin/vehicle/${id}`);
        const data = await res.json();
        if (res.ok) setVehicle(data.vehicle);
        else setError("Vehicle not found");
      } catch {
        setError("Failed to fetch vehicle");
      } finally {
        setLoading(false);
      }
    }
    fetchVehicle();
  }, [id]);

  const containerStyle: React.CSSProperties = {
    maxWidth: 900,
    margin: "2rem auto",
    padding: "2rem 2.5rem",
    backgroundColor: "#000000", // pure black background
    borderRadius: 12,
    boxShadow: "0 0 24px rgba(255, 255, 255, 0.12)", // subtle white glow
    fontFamily: "'Manrope', 'Times New Roman', serif",
    color: "#f0f0f0", // very light gray text
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "2.2rem",
    fontWeight: 700,
    color: "#ffffff", // solid white
    textAlign: "center",
    letterSpacing: 1.5,
    marginBottom: 16,
    textTransform: "uppercase",
  };

  const messageStyle: React.CSSProperties = {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 16,
    marginTop: 20,
    userSelect: "none",
  };

  if (loading)
    return (
      <p style={{ ...messageStyle, color: "#cccccc" }}>Loading...</p> // light gray loading
    );
  if (error)
    return (
      <p style={{ ...messageStyle, color: "#ff4444" }}>{error}</p> // subtle red error
    );
  if (!vehicle) return null;

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Edit Vehicle</h1>
      <AdminUploadForm existingData={vehicle} vehicleId={id} />
    </div>
  );
}
