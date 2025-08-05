// QuickInfoGrid.tsx
import React from "react";

const theme = {
  gold: "#d4af37",
  goldGlow: "rgba(212,175,55,0.6)",
  black: "#0a0a0a",
  font: "'Inter', system-ui, sans-serif",
};

interface QuickInfoGridProps {
  brand: string;
  year: number;
  mileage: string;
  transmission: string;
  fuelType: string;
  location: string;
  seating: number;
  condition: string;
}

const Icon = ({ name }: { name: string }) => {
  // Simplified icons
  switch (name) {
    case "brand":
      return (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke={theme.gold}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    case "year":
      return (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke={theme.gold}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
        </svg>
      );
    case "mileage":
      return (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke={theme.gold}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
          <path d="M3 12h1m16 0h1M4.22 19.78l.71-.71M18.36 5.64l.71-.71M20.49 18.36l-.71-.71M5.64 5.64l-.71-.71" />
        </svg>
      );
    case "transmission":
      return (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke={theme.gold}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="6" y="4" width="12" height="16" rx="2" ry="2" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    case "fuelType":
      return (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke={theme.gold}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M5 12l5-5v10l-5-5z" />
          <rect x="14" y="7" width="5" height="10" rx="1" ry="1" />
          <line x1="18" y1="7" x2="18" y2="17" />
        </svg>
      );
    case "location":
      return (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke={theme.gold}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z" />
          <circle cx="12" cy="11" r="2" />
        </svg>
      );
    case "seating":
      return (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke={theme.gold}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="2" y="7" width="20" height="7" rx="3" ry="3" />
          <circle cx="7" cy="14" r="2" />
          <circle cx="17" cy="14" r="2" />
        </svg>
      );
    case "condition":
      return (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke={theme.gold}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l5 9-5 9-5-9 5-9z" />
        </svg>
      );
    default:
      return null;
  }
};

export const QuickInfoGrid: React.FC<QuickInfoGridProps> = ({
  brand,
  year,
  mileage,
  transmission,
  fuelType,
  location,
  seating,
  condition,
}) => {
  const info = [
    { label: "Brand", value: brand, icon: "brand" },
    { label: "Year", value: year, icon: "year" },
    { label: "Mileage", value: mileage, icon: "mileage" },
    { label: "Transmission", value: transmission, icon: "transmission" },
    { label: "Fuel Type", value: fuelType, icon: "fuelType" },
    { label: "Location", value: location, icon: "location" },
    { label: "Seating", value: `${seating} seats`, icon: "seating" },
    { label: "Condition", value: condition, icon: "condition" },
  ];

  return (
    <section
      aria-label="Quick vehicle information"
      style={{
        maxWidth: 900,
        margin: "48px auto",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 24,
        fontFamily: theme.font,
        color: theme.gold,
        userSelect: "none",
      }}
    >
      {info.map(({ label, value, icon }) => (
        <div
          key={label}
          className="glass-card"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
            borderRadius: 14,
            padding: "28px 20px",
            boxShadow: `0 0 14px ${theme.goldGlow}`,
            display: "flex",
            alignItems: "center",
            gap: 16,
            cursor: "default",
            transition: "box-shadow 0.3s ease",
          }}
          tabIndex={0}
        >
          <Icon name={icon} />
          <div style={{ userSelect: "text" }}>
            <p
              style={{
                margin: 0,
                fontWeight: "700",
                fontSize: 16,
                letterSpacing: 0.8,
              }}
            >
              {label}
            </p>
            <p
              style={{
                margin: 0,
                fontWeight: "600",
                fontSize: 20,
                color: "#fff",
                userSelect: "text",
              }}
            >
              {value}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};
