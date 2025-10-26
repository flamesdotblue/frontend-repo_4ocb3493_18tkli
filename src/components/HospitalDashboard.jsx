import React, { useMemo, useState } from 'react';
import { Hospital, AlertTriangle, Search, Filter, Link as LinkIcon } from 'lucide-react';

const mockPatients = [
  { id: 'P-101', name: 'Arjun Mehta', organ: 'Heart', urgency: 'Critical', blood: 'O+', location: 'Mumbai' },
  { id: 'P-102', name: 'Mia Chen', organ: 'Liver', urgency: 'High', blood: 'A-', location: 'Singapore' },
  { id: 'P-103', name: 'Leo Garcia', organ: 'Kidneys', urgency: 'Medium', blood: 'B+', location: 'Manila' },
  { id: 'P-104', name: 'Sara Khan', organ: 'Corneas', urgency: 'High', blood: 'AB+', location: 'Dubai' },
];

const mockDonors = [
  { id: 'D-2201', name: 'Riya Patel', organs: ['Heart', 'Corneas'], blood: 'O+', location: 'Mumbai' },
  { id: 'D-2202', name: 'David Park', organs: ['Kidneys'], blood: 'B+', location: 'Seoul' },
  { id: 'D-2203', name: 'Luis Diaz', organs: ['Liver'], blood: 'A-', location: 'Singapore' },
];

const urgencyColor = {
  Critical: 'bg-red-500/20 text-red-300',
  High: 'bg-orange-500/20 text-orange-300',
  Medium: 'bg-yellow-500/20 text-yellow-300',
  Low: 'bg-emerald-500/20 text-emerald-300',
};

export default function HospitalDashboard() {
  const [query, setQuery] = useState('');
  const [filterOrgan, setFilterOrgan] = useState('All');

  const organs = useMemo(() => ['All', ...new Set(mockPatients.map((p) => p.organ))], []);

  const filteredPatients = useMemo(() => {
    return mockPatients.filter((p) => {
      const q = query.toLowerCase();
      const matchesQuery = [p.name, p.id, p.organ, p.location, p.blood].some((val) =>
        String(val).toLowerCase().includes(q)
      );
      const matchesOrgan = filterOrgan === 'All' || p.organ === filterOrgan;
      return matchesQuery && matchesOrgan;
    });
  }, [query, filterOrgan]);

  function compatibleDonors(patient) {
    return mockDonors.filter(
      (d) => d.blood === patient.blood && d.organs.includes(patient.organ)
    );
  }

  return (
    <section id="hospital" className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
          <Hospital className="h-5 w-5 text-cyan-300" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white">Hospital Console</h2>
          <p className="text-sm text-white/70">View patients, available donors, and visualize matching</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search patients by name, ID, organ, location, blood..."
                className="w-full rounded-lg border border-white/10 bg-black/40 px-10 py-2 text-white placeholder-white/40 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-white/40" />
              <select
                value={filterOrgan}
                onChange={(e) => setFilterOrgan(e.target.value)}
                className="rounded-lg border border-white/10 bg-black/40 px-10 py-2 pr-8 text-white focus:border-cyan-400 focus:outline-none"
              >
                {organs.map((o) => (
                  <option key={o} value={o} className="bg-black">
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/70">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/70">Patient</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/70">Organ</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/70">Urgency</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/70">Blood</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/70">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5">
                    <td className="px-4 py-3 text-white/80">{p.id}</td>
                    <td className="px-4 py-3 text-white">{p.name}</td>
                    <td className="px-4 py-3 text-white/80">{p.organ}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${urgencyColor[p.urgency]}`}>
                        {p.urgency}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/80">{p.blood}</td>
                    <td className="px-4 py-3 text-white/80">{p.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <div className="mb-2 flex items-center gap-2 font-medium text-white">
              <AlertTriangle className="h-4 w-4 text-orange-300" /> Matching Visualization (conceptual)
            </div>
            <p>
              For each patient, compatible donors are identified by blood type and organ availability. Lines below
              represent conceptual connections between a selected patient and potential donors.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {filteredPatients.slice(0, 2).map((p) => (
                <div key={p.id} className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-white">{p.name} • {p.organ}</span>
                    <span className="text-xs text-white/60">Blood {p.blood}</span>
                  </div>
                  <div className="space-y-2">
                    {compatibleDonors(p).map((d) => (
                      <div key={d.id} className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2 text-white/80">
                        <span>{d.name} ({d.id})</span>
                        <span className="inline-flex items-center gap-1 text-xs text-cyan-300">
                          <LinkIcon className="h-3.5 w-3.5" /> Potential Match
                        </span>
                      </div>
                    ))}
                    {compatibleDonors(p).length === 0 && (
                      <p className="text-sm text-white/50">No compatible donors found.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-cyan-500/10 p-6 text-cyan-100">
            <div className="mb-2 flex items-center gap-2">
              <Hospital className="h-5 w-5" />
              <p className="font-semibold">Available Donors</p>
            </div>
            <ul className="space-y-2">
              {mockDonors.map((d) => (
                <li key={d.id} className="rounded-lg bg-white/5 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-white">{d.name}</span>
                    <span className="text-white/60">{d.id}</span>
                  </div>
                  <div className="mt-1 text-xs text-white/70">Blood {d.blood} • {d.location}</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {d.organs.map((o) => (
                      <span key={o} className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] text-cyan-200">
                        {o}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
            <p className="mb-1 text-sm font-semibold text-white">Alert System</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between rounded-lg bg-red-500/10 p-3 text-red-200">
                <span>Critical heart patient waiting in Mumbai</span>
                <span className="text-xs">High priority</span>
              </li>
              <li className="flex items-center justify-between rounded-lg bg-orange-500/10 p-3 text-orange-200">
                <span>Liver match available for A- in Singapore</span>
                <span className="text-xs">Action needed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
