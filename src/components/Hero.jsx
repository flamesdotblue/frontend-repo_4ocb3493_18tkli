import React from 'react';
import Spline from '@splinetool/react-spline';
import { Heart, Shield, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[80vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* gradient overlays for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 pt-24 md:pt-28 lg:pt-32">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
          <Shield className="h-3.5 w-3.5 text-cyan-300" />
          Transparent • Secure • Real-time
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          LifeChain
          <span className="block bg-gradient-to-r from-rose-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
            Saving lives with trust and technology
          </span>
        </h1>

        <p className="max-w-2xl text-base text-white/80 md:text-lg">
          A transparent, AI-assisted organ & tissue donation network connecting donors, hospitals, and authorities —
          bringing clarity and accountability to every life-saving step.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#donor"
            className="group inline-flex items-center gap-2 rounded-lg bg-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-400"
          >
            <Heart className="h-4 w-4" /> Donor Login
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#hospital"
            className="group inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Hospital Login <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
