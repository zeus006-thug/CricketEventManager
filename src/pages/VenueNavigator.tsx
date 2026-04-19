import React, { useState } from 'react';

interface VenueFilter {
  id: string;
  label: string;
  icon: string;
}

const FILTERS: VenueFilter[] = [
  { id: 'all', label: 'All', icon: '' },
  { id: 'ground', label: 'Ground', icon: 'stadium' },
  { id: 'food', label: 'Food', icon: 'fastfood' },
  { id: 'stores', label: 'Stores', icon: 'storefront' },
];

const FLOOR_LEVELS = ['L2', 'L1', 'G'];

export default function VenueNavigator() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeFloor, setActiveFloor] = useState('L2');
  const [searchQuery, setSearchQuery] = useState('');

  const venues = [
    { id: 1, name: 'Main Pitch', detail: 'Sectors 100 - 400', icon: 'stadium', color: 'primary', category: 'ground' },
    { id: 2, name: 'North Concourse Cafeteria', detail: 'Level 2, Near Sec 205', icon: 'fastfood', color: 'secondary', category: 'food' },
    { id: 3, name: 'Team Store', detail: 'Ground Floor, Gate B', icon: 'storefront', color: 'on-surface-variant', category: 'stores' },
    { id: 4, name: 'Restrooms', detail: 'Multiple Locations', icon: 'wc', color: 'on-surface-variant', category: 'all' },
  ];

  const filteredVenues = venues.filter((v) => {
    const matchesFilter = activeFilter === 'all' || v.category === activeFilter;
    const matchesSearch = !searchQuery || v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.detail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="mb-2 relative z-10">
        <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface uppercase tracking-tight mb-2">Venue Map</h1>
        <p className="text-on-surface-variant text-lg">Navigate the Kinetic Arena with ease.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 relative bg-surface-container-low rounded-xl overflow-hidden h-[500px] lg:h-[700px] flex flex-col group">
          <div className="absolute inset-0 z-0">
            <img alt="Aerial stadium view" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9IkkYPgi1LKTFV34J1BmgrTXHpfqaEQFAZvlsEjHfk9w9JEONzRUXqz3GKkEiIsKaqJUVgiM01Oonawrp1oiNitrNYyeRttrXuHu85C4LvMobA1q1DNzym61snwDGLRm4Xed1qHynElk9R1JP1Bk4o-1LL4mOzH5hrCx_MkJLmPiN1da3CqZ45sc5Mfo_Wg0OlW2Gn3Og7K8NMI1VCwC7sx3e_ggKbLn7WFAscoeaiI2vDmHscsVtSmG0q6fuohdRpZSTFPmsHPY" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10 p-6 flex justify-between items-start">
            <div className="bg-surface-container-high/80 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/20 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
              <span className="font-headline text-sm font-bold text-on-surface uppercase">Live Map</span>
            </div>
            <div className="bg-surface-container-high/80 backdrop-blur-md rounded-xl border border-outline-variant/20 flex flex-col overflow-hidden">
              {FLOOR_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveFloor(level)}
                  className={`px-4 py-3 font-bold text-sm border-b border-outline-variant/20 last:border-b-0 transition-colors ${
                    activeFloor === level ? 'bg-secondary/20 text-secondary' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          {/* Map pins */}
          <div className="absolute top-[40%] left-[30%] z-10 group/pin cursor-pointer" onClick={() => alert("Pitch 1 selected! Sections 100-400.")}>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(165,255,184,0.4)] relative">
              <span className="material-symbols-outlined text-on-primary text-xl" style={{ fontVariationSettings: "'wght' 700" }}>stadium</span>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-surface-container-highest px-3 py-1 rounded-lg border border-outline-variant/20 opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                <span className="font-headline text-sm font-bold text-primary">Pitch 1</span>
              </div>
            </div>
          </div>
          <div className="absolute top-[60%] right-[20%] z-10 group/pin cursor-pointer" onClick={() => alert("Food Court selected! Open until 11:00 PM.")}>
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(103,157,255,0.4)] relative">
              <span className="material-symbols-outlined text-on-secondary text-xl" style={{ fontVariationSettings: "'wght' 700" }}>fastfood</span>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-surface-container-highest px-3 py-1 rounded-lg border border-outline-variant/20 opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                <span className="font-headline text-sm font-bold text-secondary">Food Court</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[20%] left-[50%] z-10 group/pin cursor-pointer" onClick={() => alert("Washrooms selected! Nearest accessible facilities available.")}>
            <div className="w-10 h-10 bg-surface-bright rounded-full border border-outline-variant/50 flex items-center justify-center shadow-lg relative">
              <span className="material-symbols-outlined text-on-surface-variant text-xl">wc</span>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-surface-container-highest px-3 py-1 rounded-lg border border-outline-variant/20 opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                <span className="font-headline text-sm font-bold text-on-surface">Washrooms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Venue list panel */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-low rounded-xl p-4 flex items-center gap-3 border border-transparent focus-within:border-primary/50 transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
            <input
              className="bg-transparent border-none w-full text-on-surface focus:ring-0 placeholder:text-on-surface-variant/50 font-body outline-none"
              placeholder="Find a section, food, or restroom..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-full font-headline text-sm font-bold flex items-center gap-1 transition-colors ${
                  activeFilter === f.id
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-surface-container-high hover:bg-surface-bright text-on-surface-variant'
                }`}
              >
                {f.icon && <span className="material-symbols-outlined text-[16px]">{f.icon}</span>}
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                className="bg-surface-container-low rounded-xl p-4 hover:bg-surface-container transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20 group flex items-start gap-4"
              >
                <div className={`w-12 h-12 rounded-lg bg-${venue.color}/10 text-${venue.color} flex items-center justify-center shrink-0`}>
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'wght' 700" }}>{venue.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-headline font-bold text-on-surface text-lg group-hover:text-primary transition-colors">{venue.name}</h3>
                  <p className="text-on-surface-variant text-sm mt-1">{venue.detail}</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
              </div>
            ))}
            {filteredVenues.length === 0 && (
              <div className="text-center py-12 text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl mb-2 block">search_off</span>
                <p className="font-body">No results found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
