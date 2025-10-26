import React from 'react';
import { Heart, Shield, Activity } from 'lucide-react';
import Hero from './components/Hero.jsx';
import DonorDashboard from './components/DonorDashboard.jsx';
import HospitalDashboard from './components/HospitalDashboard.jsx';
import TransparencyDashboard from './components/TransparencyDashboard.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white">
      <SiteHeader />
      <Hero />
      <DonorDashboard />
      <HospitalDashboard />
      <TransparencyDashboard />
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#home" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-rose-500 to-cyan-500">
            <Heart className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-wide">LifeChain</span>
        </a>
        <nav className="flex items-center gap-2 text-sm">
          <a href="#donor" className="rounded-md px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white">Donor</a>
          <a href="#hospital" className="rounded-md px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white">Hospital</a>
          <a href="#transparency" className="rounded-md px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white">Transparency</a>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-xs text-white/70">
            <Shield className="h-3.5 w-3.5 text-cyan-300" />
            Secure • Ethical
          </span>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <p className="text-sm text-white/60">© {new Date().getFullYear()} LifeChain — By Team Pearl Harbour</p>
        <div className="inline-flex items-center gap-2 text-sm text-white/60">
          <Activity className="h-4 w-4 text-emerald-300" /> Transparency builds trust.
        </div>
      </div>
    </footer>
  );
}

export default App;
