import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TicketLogin() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile && password) {
      // Simulate real-world authentication handling
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen relative w-full overflow-hidden flex items-center justify-center">
      

<div className="absolute inset-0 z-0">
<div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
<div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-tertiary/10 blur-[100px] rounded-full pointer-events-none"></div>
</div>

<main className="w-full max-w-md px-6 py-12 z-10 flex flex-col items-center">

<div className="flex flex-col items-center mb-12 text-center w-full relative">
<h1 className="font-headline font-black text-4xl sm:text-5xl italic text-primary drop-shadow-[0_0_12px_rgba(165,255,184,0.3)] tracking-tight">KINETIC ARENA</h1>
<p className="font-body text-on-surface-variant text-sm mt-2 font-medium tracking-wide">ENTER THE MADNESS</p>
</div>

<div className="w-full bg-surface-container-low/80 backdrop-blur-2xl rounded-xl p-8 flex flex-col gap-8 relative">

<div className="absolute inset-0 rounded-xl border border-outline-variant/15 pointer-events-none"></div>
<div className="flex flex-col gap-2">
<h2 className="font-headline text-2xl font-bold text-on-surface">Ticket Access</h2>
<p className="font-body text-sm text-on-surface-variant">Enter your details to load your matchday pass.</p>
</div>

<form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">

<div className="flex flex-col gap-2 relative group">
<label className="font-label text-sm font-medium text-secondary" htmlFor="mobile">Mobile Number</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-4 text-on-surface-variant group-focus-within:text-primary transition-colors">smartphone</span>
<input className="w-full bg-surface-container-lowest text-on-surface font-body text-base px-12 py-4 rounded-lg border-b-2 border-transparent focus:border-b-primary outline-none transition-all placeholder:text-on-surface-variant/50" id="mobile" placeholder="+1 (555) 000-0000" type="tel" required value={mobile} onChange={e => setMobile(e.target.value)} />
</div>
</div>

<div className="flex flex-col gap-2 relative group">
<label className="font-label text-sm font-medium text-secondary" htmlFor="password">Ticket ID / Password</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-4 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
<input className="w-full bg-surface-container-lowest text-on-surface font-body text-base px-12 py-4 rounded-lg border-b-2 border-transparent focus:border-b-primary outline-none transition-all placeholder:text-on-surface-variant/50" id="password" name="password" placeholder="Enter Reference / Password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} />
</div>
</div>

<button type="submit" className="w-full mt-4 bg-primary text-on-primary font-headline font-bold text-lg py-4 rounded-xl shadow-[0_0_24px_rgba(165,255,184,0.15)] hover:shadow-[0_0_32px_rgba(165,255,184,0.25)] hover:bg-primary-container transition-all flex items-center justify-center gap-2 no-underline cursor-pointer">
<span>ENTER ARENA</span>
<span className="material-symbols-outlined font-bold" style={{ fontVariationSettings: "'wght' 700" }}>arrow_forward</span>
</button>
</form>

<div className="text-center mt-4">
<a className="font-body text-sm text-secondary hover:text-primary transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); alert("Please check your email or SMS for the ticket reference sent by Kinetic Arena."); }}>Need help finding your ticket?</a>
</div>
</div>
</main>

    </div>
  );
}
