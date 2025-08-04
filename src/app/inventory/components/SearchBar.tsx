import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search by brand, model, or features...",
}) => {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
