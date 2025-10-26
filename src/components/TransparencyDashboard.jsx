import React, { useMemo } from 'react';
import { Activity, Clock, Users, HeartHandshake } from 'lucide-react';

export default function TransparencyDashboard() {
  const stats = useMemo(
    () => ({
      totalDonations: 1248,
      successfulMatches: 972,
      avgWaitDays: 18,
    }),
    []
  );

  const trend = useMemo(
    () => [12, 16, 14, 18, 22, 28, 26, 30, 34, 33, 38, 42],
    []
  );

  return (
    <section id="transparency" className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
          <Activity className="h-5 w-5 text-emerald-300" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white">Transparency Dashboard</h2>
          <p className="text-sm text-white/70">Impact metrics and a public "track an organ" simulation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard icon={HeartHandshake} label="Total Donations" value={stats.totalDonations} color="from-rose-400 to-pink-300" />
        <StatCard icon={Users} label="Successful Matches" value={stats.successfulMatches} color="from-emerald-400 to-teal-300" />
        <StatCard icon={Clock} label="Avg Wait (days)" value={stats.avgWaitDays} color="from-indigo-400 to-cyan-300" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="mb-3 text-sm font-semibold text-white">Trends over time</p>
          <MiniLineChart data={trend} />
          <p className="mt-3 text-xs text-white/60">Monthly growth in successful matches (mock data)</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="mb-3 text-sm font-semibold text-white">Track an Organ (simulation)</p>
          <OrganFlow />
          <p className="mt-3 text-xs text-white/60">This is a visual simulation to illustrate accountable tracking.</p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-6">
        <p className="text-sm text-white/80">
          Become a donor today. Your decision can save up to eight lives. Join the movement for transparent, ethical healthcare.
        </p>
        <a
          href="#donor"
          className="mt-3 inline-block rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
        >
          Pledge to Donate
        </a>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{value.toLocaleString()}</p>
        </div>
        <div className={`rounded-xl bg-gradient-to-br ${color} p-3 text-white`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function MiniLineChart({ data }) {
  const max = Math.max(...data) || 1;
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (d / max) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" className="h-40 w-full">
      <defs>
        <linearGradient id="line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke="url(#line)" strokeWidth="2" points={points} />
      {data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - (d / max) * 100;
        return <circle key={i} cx={x} cy={y} r="1.5" fill="#22d3ee" />;
      })}
    </svg>
  );
}

function OrganFlow() {
  const steps = [
    { key: 'donor', label: 'Donor', color: 'from-rose-400 to-pink-300' },
    { key: 'hospital', label: 'Hospital', color: 'from-cyan-400 to-sky-300' },
    { key: 'recipient', label: 'Recipient', color: 'from-emerald-400 to-teal-300' },
  ];

  return (
    <div className="relative flex items-center justify-between gap-3">
      {steps.map((s, idx) => (
        <React.Fragment key={s.key}>
          <div className={`flex h-16 w-28 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-sm font-semibold text-white`}>
            {s.label}
          </div>
          {idx < steps.length - 1 && (
            <div className="h-1 flex-1 bg-gradient-to-r from-white/30 to-white/10" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
