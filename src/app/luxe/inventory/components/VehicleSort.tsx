import React, { useEffect, useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";

// Theme
const accentColor = "#d4af37";
const darkBg = "#18181f";
const glassBg = "rgba(28,28,36,0.82)";
const glow = "0 1px 8px 0 rgba(212,175,55,.16)";

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

  useEffect(() => {
    const saved = localStorage.getItem("vehicleSearchTerm") || "";
    setSearchTerm(saved);
    onSearchChange(saved);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem("vehicleSearchTerm", searchTerm);
  }, [searchTerm]);

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

  // Container styles - centered with no top/bottom margin
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: isMobile ? "0.8rem" : "1.5rem",
    padding: isMobile ? "0.6rem 1rem" : "0.8rem 1.6rem",
    borderRadius: "1.1rem",
    boxShadow: "0 4px 18px 0 rgba(28,16,0,.09)",
    background: `linear-gradient(120deg, ${glassBg} 60%, ${darkBg} 100%)`,
    backdropFilter: "blur(6px) saturate(1.1)",
    width: "100%",
    margin: "0", // No top/bottom margin
    minHeight: "auto",
  };

  // Equal width for both sort and search boxes
  const equalWidth = isMobile ? "140px" : "200px";

  // Sort button style - made equal to search input
  const sortButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
    background: isMobile ? "rgba(24,26,36,0.98)" : "rgba(24,26,36,0.96)",
    border: `1.15px solid ${accentColor}`,
    borderRadius: "0.7em",
    padding: isMobile ? "0.5rem 0.8rem" : "0.6rem 1rem",
    fontSize: isMobile ? "0.9em" : "1em",
    fontFamily: "'Montserrat', 'Roboto', Arial, sans-serif",
    color: value ? "white" : "#999", // Grayed out when no selection (like placeholder)
    fontWeight: 500,
    boxShadow: glow,
    cursor: "pointer",
    transition: "all 0.2s ease",
    position: "relative" as const,
    width: equalWidth,
    height: isMobile ? "40px" : "44px", // Match input height
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

  // Search input style - updated to match sort button size
  const searchInputStyle: React.CSSProperties = {
    background: isMobile ? "rgba(24,26,36,0.98)" : "rgba(24,26,36,0.96)",
    border: `1.15px solid ${accentColor}`,
    borderRadius: "0.7em",
    padding: isMobile ? "0.5rem 0.8rem 0.5rem 2.5rem" : "0.6rem 1rem 0.6rem 2.8rem",
    fontSize: isMobile ? "0.9em" : "1em",
    fontFamily: "'Montserrat', 'Roboto', Arial, sans-serif",
    color: "white",
    fontWeight: 500,
    boxShadow: glow,
    outline: "none",
    width: "100%",
    height: isMobile ? "40px" : "44px", // Match sort button height
    caretColor: accentColor,
    backdropFilter: "blur(1.5px)",
    transition: "border-color 0.18s, box-shadow 0.18s",
    boxSizing: "border-box" as const,
  };

  // Dropdown style
  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: darkBg,
    border: `1px solid ${accentColor}`,
    borderRadius: "0.5rem",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    zIndex: 1000,
    marginTop: "0.5rem",
    overflow: "hidden",
    minWidth: equalWidth,
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: "0.7rem 1rem",
    color: "white",
    cursor: "pointer",
    fontSize: "0.9em",
    fontFamily: "'Montserrat', 'Roboto', Arial, sans-serif",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    transition: "background-color 0.2s",
  };

  // Focus handlers
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.boxShadow = "0 0 0 2px #e0c66a, 0 1px 8px 0 rgba(212,175,55,.19)";
    e.target.style.borderColor = "#e0c66a";
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.boxShadow = glow;
    e.target.style.borderColor = accentColor;
  };

  // Sort button focus handlers
  const handleSortFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.target.style.boxShadow = "0 0 0 2px #e0c66a, 0 1px 8px 0 rgba(212,175,55,.19)";
    e.target.style.borderColor = "#e0c66a";
  };

  const handleSortBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.target.style.boxShadow = glow;
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
      {/* SORT BUTTON WITH ICON - Equal size to search */}
      <div style={{ position: "relative", width: equalWidth }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowSortDropdown(!showSortDropdown);
          }}
          style={{
  ...sortButtonStyle,
  backgroundColor: showSortDropdown
    ? "rgba(212,175,55,0.1)"
    : String(sortButtonStyle.background), // convert to string
}}

          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(212,175,55,0.15)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = showSortDropdown ? "rgba(212,175,55,0.1)" : "rgba(24,26,36,0.96)";
            e.currentTarget.style.transform = "translateY(0)";
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
              color: value ? "white" : "#999" // Show as placeholder when no selection
            }}>
              {isMobile ? "Sort" : displaySortText}
            </span>
          </div>
        </button>
        
        {/* Sort Dropdown */}
        {showSortDropdown && (
          <div style={dropdownStyle}>
            {sortOptions.map((option) => (
              <div
                key={option.value}
                style={{
                  ...dropdownItemStyle,
                  backgroundColor: value === option.value ? "rgba(212,175,55,0.2)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (value !== option.value) {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
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

      {/* SEARCH INPUT WITH ICON - Equal size to sort */}
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
          style={searchInputStyle}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          autoComplete="off"
          spellCheck={false}
          aria-label="Search vehicles"
        />
      </div>
    </div>
  );
}
