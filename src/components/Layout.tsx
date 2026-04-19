import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AVATAR_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm0rq_DNpECtw2NcmZdem7_PXJhWRsQF-aHxxCfqNjPiDPndHkQ5QBzprWbxmTuVs6lTfbsSjJHlaZCmSA76YnLEU9RX01wAsFoln7ua7Pc37DLSLNabIZzVlzOqoVAulgFVXGTN8mXxcG1X3mFH_wv0gmXC7VRf_aq3pShvQy9HbLHuED20CvUPjLmhh6S3OuuUTCFUFCvyjgQ0wJBpMI_LdklZDoctz7ucUhbXhvwkG6J_4tRBciI256M5lJwS1gxPrGDKm0XqI';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/venue', label: 'Ground', icon: 'stadium' },
  { path: '/concessions', label: 'Order', icon: 'fastfood' },
  { path: '/dashboard', label: 'Live', icon: 'sensors' },
  { path: '/meetup', label: 'Squad', icon: 'groups' },
];

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-background text-on-surface min-h-screen flex w-full overflow-x-hidden">
      
      {/* ===== DESKTOP SIDEBAR (fixed) ===== */}
      <nav className="hidden md:flex h-screen w-72 flex-col fixed left-0 top-0 bg-[#0d0f0e] shadow-2xl z-40 bg-gradient-to-r from-[#1a1c1b] to-transparent pt-12 pb-8" aria-label="Main navigation">
        {/* User Profile */}
        <div className="px-8 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
            <img alt="Fan Profile" className="w-full h-full object-cover" src={AVATAR_URL} />
          </div>
          <div>
            <h2 className="font-headline font-black italic text-lg text-[#a5ffb8]">MVP FAN</h2>
            <p className="text-on-surface-variant text-sm">Section 402</p>
            <p className="text-tertiary text-xs font-bold mt-1">Live Score: 184/4</p>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 flex flex-col font-headline font-bold text-lg">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`py-4 px-8 my-1 flex items-center gap-4 text-left transition-all ${
                  isActive
                    ? 'bg-[#a5ffb8] text-[#006530] rounded-r-full translate-x-2'
                    : 'text-slate-400 hover:text-white hover:bg-[#1a1c1b]'
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: "'wght' 700" } : undefined}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Live Score Card */}
        <div className="px-8 mt-auto">
          <div className="bg-surface-container-high p-4 rounded-xl border border-outline-variant/15">
            <p className="text-tertiary font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse inline-block"></span>
              Live Score
            </p>
            <p className="font-headline font-black text-2xl text-on-surface">184/4</p>
            <p className="text-on-surface-variant text-sm mt-1">Overs: 18.4</p>
          </div>
        </div>
      </nav>

      {/* ===== SPACER FOR FIXED SIDEBAR ===== */}
      <div className="hidden md:block w-72 shrink-0"></div>

      {/* ===== MAIN WRAPPER ===== */}
      <div className="flex-1 flex flex-col w-full min-w-0 min-h-screen">
        
        {/* ===== MOBILE HEADER ===== */}
        <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 bg-[#0d0f0e]/70 backdrop-blur-xl z-[60] md:hidden shadow-md border-b border-outline-variant/10" aria-label="Mobile header">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-[#a5ffb8] hover:text-[#a5ffb8] transition-colors active:scale-95 duration-150 cursor-pointer" 
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'wght' 700" }}>
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
          <h1 className="font-headline uppercase tracking-widest font-black text-2xl italic text-[#a5ffb8] drop-shadow-[0_0_8px_rgba(165,255,184,0.5)]">
            KINETIC ARENA
          </h1>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => alert("Profile Settings: MVP FAN\nSection: 402")}>
            <img alt="User profile" className="w-full h-full object-cover" src={AVATAR_URL} />
          </div>
        </header>

        {/* ===== MOBILE DROP-DOWN MENU ===== */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-[72px] left-0 right-0 bg-surface-container-highest/95 backdrop-blur-xl z-50 p-4 shadow-xl border-b border-outline-variant/20 flex flex-col gap-2 rounded-b-2xl">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`px-4 py-3 font-headline font-bold rounded-lg flex gap-3 ${currentPath === item.path ? 'bg-primary text-on-primary' : 'text-on-surface'}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* ===== PAGE CONTENT ===== */}
        <main className="flex-1 w-full pt-28 pb-28 md:pt-12 md:pb-8 px-4 md:px-8 relative">
          <Outlet />
        </main>

      </div>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center p-4 bg-[#1a1c1b]/95 backdrop-blur-2xl rounded-t-[1.5rem] z-50 md:hidden shadow-[0_-8px_32px_rgba(0,0,0,0.5)]" aria-label="Mobile navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center px-4 py-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#a5ffb8] bg-[#a5ffb8]/10 scale-95'
                  : 'text-slate-500 hover:bg-white/5'
              }`}
            >
              <span
                className="material-symbols-outlined text-2xl mb-1"
                style={isActive ? { fontVariationSettings: "'wght' 700" } : undefined}
              >
                {item.icon}
              </span>
              <span className="font-headline text-[10px] font-bold uppercase">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
