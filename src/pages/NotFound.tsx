/**
 * @fileoverview 404 Not Found page component for the Kinetic Arena application.
 * Renders a visually engaging error page when users navigate to an invalid route.
 * Provides a clear call-to-action to return to the main dashboard.
 */

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound renders a themed 404 error page with a cricket-inspired "Ball Lost"
 * message. Includes a hover animation on the 404 number and a prominent
 * "Return to Pitch" navigation button.
 *
 * @returns The rendered 404 error page component.
 */
export default function NotFound(): React.JSX.Element {
  return (
    <div className="bg-background text-on-surface min-h-screen relative w-full overflow-hidden flex flex-col items-center justify-center p-6 text-center z-50">
      
      {/* Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] bg-tertiary/10 blur-[80px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg">
        {/* Giant Number */}
        <div className="relative group">
          <h1 className="font-headline font-black text-9xl md:text-[12rem] text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container drop-shadow-[0_0_30px_rgba(165,255,184,0.3)] tracking-tighter leading-none mb-4 group-hover:scale-105 transition-transform duration-500">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="material-symbols-outlined text-[8rem] text-background opacity-20" style={{ fontVariationSettings: "'wght' 900" }}>sports_cricket</span>
          </div>
        </div>

        {/* Text Details */}
        <h2 className="font-headline font-bold text-3xl md:text-4xl text-on-surface mb-2 uppercase tracking-wide">
          Ball Lost
        </h2>
        <p className="font-body text-on-surface-variant text-base md:text-lg mb-8 max-w-md">
          Looks like that last shot went out of the stadium. The page you're trying to find doesn't exist or has been moved.
        </p>

        {/* Home Button */}
        <Link 
          to="/dashboard" 
          className="bg-primary text-on-primary font-headline font-bold text-lg px-8 py-4 rounded-xl shadow-[0_0_24px_rgba(165,255,184,0.2)] hover:shadow-[0_0_40px_rgba(165,255,184,0.4)] hover:bg-primary-container hover:-translate-y-1 transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 700" }}>home</span>
          <span>RETURN TO PITCH</span>
        </Link>
      </div>
    </div>
  );
}
