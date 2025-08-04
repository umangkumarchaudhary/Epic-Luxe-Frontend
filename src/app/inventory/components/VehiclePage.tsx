'use client';

import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import PremiumCarFilter, { type FiltersState } from './FiltersPanel';
import VehicleGrid from './VehicleCard';
import VehicleSort from './VehicleSort';
import NoVehiclesPrompt from './NoVehiclesPrompt';
import { vehicleData } from '@/data/carInventory';
import { ArrowUpDown, Search } from 'lucide-react';

/* ---------- theme ---------- */
const GOLD = '#d4af37';

/* ---------- initial filter state ---------- */
const initialFilters: FiltersState = {
  brand: [], model: [],
  priceMin:1_000_000, priceMax:20_000_000,
  yearMin:2018, yearMax:2024,
  fuelType:[], transmission:[],
  mileageMin:0, mileageMax:100_000,
  ownership:[], bodyType:[], driveType:[],
  seatingCapacity:[],
  colorExterior:null, colorInterior:null,
  engineMin:0, engineMax:6,
  horsepowerMin:0, horsepowerMax:1_000,
  condition:null,
  features:[],
};

/* ---------- sort labels ---------- */
const sortOptions = [
  { value:'newest',   label:'Year: Newest to Oldest' },
  { value:'oldest',   label:'Year: Oldest to Newest' },
  { value:'priceHigh',label:'Price: High to Low'     },
  { value:'priceLow', label:'Price: Low to High'     },
  { value:'brandAZ',  label:'Brand: A to Z'          },
  { value:'brandZA',  label:'Brand: Z to A'          },
];

/* ---------- component ---------- */
export default function VehiclesPage() {
  /* state */
  const [filters, setFilters]   = useState<FiltersState>(initialFilters);
  const [sortValue, setSort]    = useState('newest');
  const [searchTerm, setSearch] = useState('');
  const [showSort, setShowSort] = useState(false);

  /* ---------------- EXACT FILTER ---------------- */
  const exactFiltered = useMemo(() => {
    return vehicleData.filter(car => {
      const price   = +car.price.replace(/\D/g,'');
      const mileage = +car.mileage.replace(/\D/g,'');
      const {
        brand, model, priceMin, priceMax, yearMin, yearMax,
        fuelType, transmission, mileageMin, mileageMax,
        ownership, bodyType, driveType, seatingCapacity,
        colorExterior, colorInterior, condition, features,
      } = filters;

      if (brand.length && !brand.includes(car.brand)) return false;
      if (model.length && !model.includes(car.model)) return false;
      if (price < priceMin || price > priceMax)        return false;
      if (car.year < yearMin || car.year > yearMax)    return false;
      if (fuelType.length && !fuelType.includes(car.fuelType)) return false;
      if (transmission.length && !transmission.includes(car.transmission)) return false;
      if (mileage < mileageMin || mileage > mileageMax) return false;
      if (ownership.length && !ownership.includes(car.condition)) return false;
      if (bodyType.length && !bodyType.includes(car.bodyType ?? '')) return false;
      if (driveType.length && !driveType.includes(car.driveType ?? '')) return false;
      if (seatingCapacity.length && !seatingCapacity.includes(String(car.seating))) return false;
      if (colorExterior && colorExterior !== (car.colorExterior ?? null)) return false;
      if (colorInterior && colorInterior !== (car.colorInterior ?? null)) return false;
      if (condition && condition !== car.condition) return false;
      if (features.length && !features.every(f => car.features.includes(f))) return false;

      /* text search (exact substring) */
      if (searchTerm.trim()) {
        const s = searchTerm.toLowerCase();
        const hay = `${car.brand} ${car.model} ${car.year} ${car.fuelType} ${car.transmission}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });
  }, [filters, searchTerm]);

  /* ---------------- FUZZY MATCH ---------------- */
  const fuse = useMemo(
    () => new Fuse(vehicleData, { keys:['brand','model'], threshold:0.35, ignoreLocation:true }),
    []
  );

  const fuzzyMatches = useMemo(() => {
    if (exactFiltered.length || !searchTerm.trim()) return [];
    return fuse.search(searchTerm).map(r => r.item);
  }, [exactFiltered, searchTerm, fuse]);

  /* ---------------- SORT ---------------- */
  const sortedVehicles = useMemo(() => {
    const list = exactFiltered.length ? [...exactFiltered] : [...fuzzyMatches];

    switch (sortValue) {
      case 'newest':    list.sort((a,b)=>b.year-a.year); break;
      case 'oldest':    list.sort((a,b)=>a.year-b.year); break;
      case 'priceHigh': list.sort((a,b)=>+b.price.replace(/\D/g,'') - +a.price.replace(/\D/g,'')); break;
      case 'priceLow':  list.sort((a,b)=>+a.price.replace(/\D/g,'') - +b.price.replace(/\D/g,'')); break;
      case 'brandAZ':   list.sort((a,b)=>a.brand.localeCompare(b.brand)); break;
      case 'brandZA':   list.sort((a,b)=>b.brand.localeCompare(a.brand)); break;
    }
    return list;
  }, [exactFiltered, fuzzyMatches, sortValue]);

  /* ---------------- handlers ---------------- */
  const clearAllFilters = () => setFilters(initialFilters);

  const handleSortClick = (v: string) => {
    setSort(v);
    setShowSort(false);
  };

  const currentSortLabel = sortOptions.find(o=>o.value===sortValue)?.label ?? 'Sort';
  const displaySortText  = currentSortLabel.split(':')[0];

  /* ---------------- style helpers ---------------- */
  const headerItem: React.CSSProperties = { display:'flex',alignItems:'center',gap:'0.5rem',minWidth:0 };

  const sortBtn: React.CSSProperties = {
    display:'flex',alignItems:'center',gap:'0.5rem',
    background:'rgba(24,26,36,0.96)',
    border:`1px solid ${GOLD}`,
    borderRadius:'0.7rem',
    padding:'0.6rem 1rem',
    height:44,width:160,
    color: sortValue ? 'white':'#999',
    fontWeight:500,fontSize:'0.9em',
  };

  const searchInput: React.CSSProperties = {
    background:'rgba(24,26,36,0.96)',
    border:`1px solid ${GOLD}`,borderRadius:'0.7rem',
    padding:'0.6rem 1rem 0.6rem 2.8rem',
    height:44,width:180,
    fontSize:'0.9em',color:'white',fontWeight:500,
  };

  const dropdownStyle: React.CSSProperties = {
    position:'absolute',top:'100%',left:0,right:0,
    background:'#18181f',border:`1px solid ${GOLD}`,
    borderRadius:'0.5rem',marginTop:'0.5rem',overflow:'hidden',zIndex:40,
  };

  /* ---------------- render ---------------- */
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex flex-col md:flex-row">
        {/* sidebar */}
        <aside className="hidden md:block md:w-[250px] border-r border-gray-800">
          <PremiumCarFilter
            filters={filters} setFilters={setFilters}
            onApplyFilters={()=>null}
            currentSort={sortValue} setSort={setSort}
            currentSearch={searchTerm} setSearch={setSearch}
          />
        </aside>

        {/* main */}
        <main className="flex-1">
          <div className="p-4 md:p-6 pb-24 md:pb-6">

            {/* ---- desktop header ---- */}
            <div className="hidden md:flex items-center justify-between gap-6 mb-6">
              <div style={headerItem}>
                <h1 className="text-3xl font-bold" style={{color:GOLD}}>Curated Luxury Vehicles</h1>
              </div>

              {/* sort */}
              <div style={{...headerItem,position:'relative'}}>
                <button onClick={e=>{e.stopPropagation();setShowSort(!showSort);}} style={sortBtn}>
                  <ArrowUpDown size={18} style={{color:GOLD}}/>
                  <span className={sortValue?'':'text-gray-500'}>{displaySortText}</span>
                </button>
                {showSort && (
                  <div style={dropdownStyle}>
                    {sortOptions.map(o=>(
                      <div key={o.value}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-white/10"
                        style={{background:o.value===sortValue?'rgba(212,175,55,0.2)':'transparent'}}
                        onClick={()=>handleSortClick(o.value)}
                      >
                        {o.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* search */}
              <div style={{...headerItem,position:'relative'}}>
                <Search size={18} style={{position:'absolute',left:'1rem',color:GOLD}}/>
                <input
                  type="search" value={searchTerm}
                  onChange={e=>setSearch(e.target.value)}
                  placeholder="Brand, Model, Year…"
                  style={searchInput}
                />
              </div>

              {/* count */}
              <div style={headerItem}>
                <p className="text-gray-400 text-lg whitespace-nowrap">
                  {sortedVehicles.length} car{sortedVehicles.length!==1?'s':''} found
                </p>
              </div>
            </div>

            {/* ---- mobile controls ---- */}
            <div className="md:hidden mb-6">
              <VehicleSort
                value={sortValue} onChange={setSort}
                searchValue={searchTerm} onSearchChange={setSearch}
              />
              <p className="text-gray-400 mt-3">{sortedVehicles.length} car{sortedVehicles.length!==1?'s':''} found</p>
            </div>

            {/* ---- results / fallback ---- */}
            {sortedVehicles.length ? (
              <>
                {exactFiltered.length===0 && searchTerm.trim() && (
                  <p className="mb-4 text-sm text-gray-400">
                    Showing closest matches for&nbsp;
                    <span style={{color:GOLD,fontWeight:600}}>{searchTerm}</span>
                  </p>
                )}
                <VehicleGrid vehicles={sortedVehicles}/>
              </>
            ) : (
              <NoVehiclesPrompt/>
            )}
          </div>
        </main>
      </div>

      {/* mobile filter bottom sheet */}
      <div className="md:hidden">
        <PremiumCarFilter
          filters={filters} setFilters={setFilters}
          onApplyFilters={()=>null}
          currentSort={sortValue} setSort={setSort}
          currentSearch={searchTerm} setSearch={setSearch}
        />
      </div>

      {/* backdrop for sort dropdown */}
      {showSort && <div className="fixed inset-0 z-30" onClick={()=>setShowSort(false)}/>}
    </div>
  );
}
