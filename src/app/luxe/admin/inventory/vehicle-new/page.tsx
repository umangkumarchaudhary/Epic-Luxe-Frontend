'use client';

import AdminUploadForm from "@/app/components/AdminUploadForm";

export default function NewVehiclePage() {
  // Strict black & white theme
  const theme = {
    background: "#000000",          // pure black background
    textPrimary: "#f0f0f0",         // nearly white text
    textSecondary: "#b0b0b0",       // light gray secondary text
    border: "#333333",              // dark gray border
    shadow: "0 0 30px rgba(255,255,255,0.1)", // subtle white glow shadow
  };

  return (
    <div
      style={{
        width: "100vw",           // full viewport width
        minHeight: "100vh",       // full viewport height
        backgroundColor: theme.background,
        padding: "3rem 2rem",
        fontFamily: "'Manrope', 'Times New Roman', serif",
        color: theme.textPrimary,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <header 
        style={{
          maxWidth: 960,
          width: "100%",
          textAlign: "center",
          marginBottom: "3rem",
          paddingBottom: '1rem',
          borderBottom: `1px solid ${theme.border}`,
          boxShadow: theme.shadow,
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 900,
            letterSpacing: "0.3em",
            marginBottom: 8,
            textTransform: "uppercase",
            color: theme.textPrimary,
          }}
        >
          EPIC LUXE
        </h1>
        <h2
          style={{
            fontSize: "1.6rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            marginBottom: 16,
            color: theme.textSecondary,
            fontStyle: "italic",
          }}
        >
          Inventory Admin Portal
        </h2>
        <p
          style={{
            maxWidth: 600,
            margin: "0 auto",
            fontSize: 18,
            lineHeight: 1.7,
            color: theme.textSecondary,
            fontWeight: 400,
          }}
        >
          Use this form to add a new luxury vehicle to your exclusive inventory. Carefully fill all details 
          and upload high-quality images to uphold the sleek premium look of your portal.
        </p>
      </header>

      <main
        style={{
          maxWidth: 960,
          width: "100%",
          backgroundColor: "#111111",
          padding: "2.5rem",
          borderRadius: 14,
          boxShadow: theme.shadow,
          boxSizing: "border-box",
        }}
      >
        <AdminUploadForm />
      </main>
    </div>
  );
}
