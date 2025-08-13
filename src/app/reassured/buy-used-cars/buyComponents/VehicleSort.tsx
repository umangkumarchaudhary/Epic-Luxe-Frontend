import React, { useEffect, useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";

// Premium Theme - Mercedes-Benz inspired
const accentColor = "#2c3e50"; // Sophisticated dark blue-gray
const premiumWhite = "#ffffff";
const glassBg = "rgba(255,255,255,0.95)";
const subtleShadow = "0 2px 16px 0 rgba(0,0,0,0.08)";
const hoverShadow = "0 4px 20px 0 rgba(0,0,0,0.12)";

const sortOptions = [
  { value: "newest", label: "Year: Newest to Oldest" },
  { value: "oldest", label: "Year: Oldest to Newest" },
  { value: "priceHigh", label: "Price: High to Low" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "brandAZ", label: "Brand: A to Z" },
  { value: "brandZA", label: "Brand: Z to A" },
];

type Props = {
  value: string;
  onChange: (value: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export default function VehicleSort({
  value,
  onChange,
  searchValue,
  onSearchChange,
}: Props) {
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Store state in memory instead of localStorage
  useEffect(() => {
    setSearchTerm(searchValue);
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleSortSelect = (sortValue: string) => {
    onChange(sortValue);
    setShowSortDropdown(false);
  };

  // Responsive
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = windowWidth < 700;

  // Get current sort label - show "Sort" as default
  const currentSortLabel = sortOptions.find(opt => opt.value === value)?.label || "Sort";
  const displaySortText = value ? currentSortLabel.split(":")[0] : "Sort";

  // Container styles - premium white with subtle shadow
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: isMobile ? "0.8rem" : "1.5rem",
    padding: isMobile ? "0.6rem 1rem" : "0.8rem 1.6rem",
    borderRadius: "1.1rem",
    boxShadow: subtleShadow,
    background: `linear-gradient(120deg, ${glassBg} 60%, ${premiumWhite} 100%)`,
    backdropFilter: "blur(8px) saturate(1.05)",
    border: "1px solid rgba(44,62,80,0.08)",
    width: "100%",
    margin: "0",
    minHeight: "auto",
  };

  // Equal width for both sort and search boxes
  const equalWidth = isMobile ? "140px" : "200px";

  // Sort button style - premium white with dark text
  const sortButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
    background: premiumWhite,
    border: `1.5px solid ${accentColor}`,
    borderRadius: "0.7em",
    padding: isMobile ? "0.5rem 0.8rem" : "0.6rem 1rem",
    fontSize: isMobile ? "0.9em" : "1em",
    fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    color: value ? "#1a1a1a" : "#666", // Dark text, grayed when no selection
    fontWeight: 600,
    boxShadow: subtleShadow,
    cursor: "pointer",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative" as const,
    width: equalWidth,
    height: isMobile ? "40px" : "44px",
    minWidth: equalWidth,
    textAlign: "left" as const,
  };

  // Search container style
  const searchContainerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: equalWidth,
  };

  // Search input style - premium white with dark text
  const searchInputStyle: React.CSSProperties = {
    background: premiumWhite,
    border: `1.5px solid ${accentColor}`,
    borderRadius: "0.7em",
    padding: isMobile ? "0.5rem 0.8rem 0.5rem 2.5rem" : "0.6rem 1rem 0.6rem 2.8rem",
    fontSize: isMobile ? "0.9em" : "1em",
    fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    color: "#1a1a1a", // Dark text
    fontWeight: 500,
    boxShadow: subtleShadow,
    outline: "none",
    width: "100%",
    height: isMobile ? "40px" : "44px",
    caretColor: accentColor,
    backdropFilter: "blur(2px)",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    boxSizing: "border-box" as const,
  };

  // Dropdown style - premium white
  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: premiumWhite,
    border: `1px solid ${accentColor}`,
    borderRadius: "0.6rem",
    boxShadow: hoverShadow,
    zIndex: 1000,
    marginTop: "0.5rem",
    overflow: "hidden",
    minWidth: equalWidth,
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: "0.8rem 1rem",
    color: "#1a1a1a", // Dark text
    cursor: "pointer",
    fontSize: "0.9em",
    fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    fontWeight: 500,
    borderBottom: "1px solid rgba(44,62,80,0.08)",
    transition: "all 0.2s ease",
  };

  // Focus handlers - premium styling
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.boxShadow = `0 0 0 3px rgba(44,62,80,0.1), ${hoverShadow}`;
    e.target.style.borderColor = "#34495e";
    e.target.style.transform = "translateY(-1px)";
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.boxShadow = subtleShadow;
    e.target.style.borderColor = accentColor;
    e.target.style.transform = "translateY(0)";
  };

  // Sort button focus handlers
  const handleSortFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.target.style.boxShadow = `0 0 0 3px rgba(44,62,80,0.1), ${hoverShadow}`;
    e.target.style.borderColor = "#34495e";
  };

  const handleSortBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.target.style.boxShadow = subtleShadow;
    e.target.style.borderColor = accentColor;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowSortDropdown(false);
    if (showSortDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showSortDropdown]);

  return (
    <div style={containerStyle}>
      {/* SORT BUTTON WITH ICON - Premium styling */}
      <div style={{ position: "relative", width: equalWidth }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowSortDropdown(!showSortDropdown);
          }}
          style={{
            ...sortButtonStyle,
            backgroundColor: showSortDropdown ? "rgba(44,62,80,0.05)" : premiumWhite,
            transform: showSortDropdown ? "translateY(-1px)" : "translateY(0)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(44,62,80,0.08)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = hoverShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = showSortDropdown ? "rgba(44,62,80,0.05)" : premiumWhite;
            e.currentTarget.style.transform = showSortDropdown ? "translateY(-1px)" : "translateY(0)";
            e.currentTarget.style.boxShadow = subtleShadow;
          }}
          onFocus={handleSortFocus}
          onBlur={handleSortBlur}
          aria-label="Sort options"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1 }}>
            <ArrowUpDown size={isMobile ? 16 : 18} style={{ color: accentColor, flexShrink: 0 }} />
            <span style={{ 
              overflow: "hidden", 
              textOverflow: "ellipsis", 
              whiteSpace: "nowrap",
              color: value ? "#1a1a1a" : "#666", // Dark text when selected, gray as placeholder
              fontWeight: value ? 600 : 500,
            }}>
              {isMobile ? "Sort" : displaySortText}
            </span>
          </div>
        </button>
        
        {/* Sort Dropdown - Premium styling */}
        {showSortDropdown && (
          <div style={dropdownStyle}>
            {sortOptions.map((option) => (
              <div
                key={option.value}
                style={{
                  ...dropdownItemStyle,
                  backgroundColor: value === option.value ? "rgba(44,62,80,0.08)" : "transparent",
                  fontWeight: value === option.value ? 600 : 500,
                }}
                onMouseEnter={(e) => {
                  if (value !== option.value) {
                    e.currentTarget.style.backgroundColor = "rgba(44,62,80,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (value !== option.value) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
                onClick={() => handleSortSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SEARCH INPUT WITH ICON - Premium styling */}
      <div style={searchContainerStyle}>
        <Search 
          size={isMobile ? 16 : 18} 
          style={{
            position: "absolute",
            left: isMobile ? "0.8rem" : "1rem",
            color: accentColor,
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
        <input
          id="vehicle-search"
          type="search"
          placeholder={isMobile ? "Search…" : "Brand, Model, Year…"}
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            ...searchInputStyle,
            "::placeholder": {
              color: "#666",
              fontWeight: 400,
            }
          }}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onMouseEnter={(e) => {
            if (e.target !== document.activeElement) {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = hoverShadow;
            }
          }}
          onMouseLeave={(e) => {
            if (e.target !== document.activeElement) {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = subtleShadow;
            }
          }}
          autoComplete="off"
          spellCheck={false}
          aria-label="Search vehicles"
        />
      </div>
    </div>
  );
}