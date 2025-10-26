import React, { useMemo, useState } from 'react';
import { CheckCircle2, User, Droplets, MapPin, ShieldCheck } from 'lucide-react';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const organs = ['Heart', 'Liver', 'Kidneys', 'Lungs', 'Pancreas', 'Corneas'];

export default function DonorDashboard() {
  const [form, setForm] = useState({
    name: '',
    bloodType: 'O+',
    organs: [],
    location: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const isValid = useMemo(() => {
    return (
      form.name.trim().length > 1 &&
      form.location.trim().length > 1 &&
      form.organs.length > 0 &&
      !!form.bloodType &&
      form.consent
    );
  }, [form]);

  function toggleOrgan(org) {
    setForm((prev) => {
      const exists = prev.organs.includes(org);
      return { ...prev, organs: exists ? prev.organs.filter((o) => o !== org) : [...prev.organs, org] };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
  }

  return (
    <section id="donor" className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10">
          <User className="h-5 w-5 text-rose-400" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white">Donor Registration</h2>
          <p className="text-sm text-white/70">Securely record consent and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div>
            <label className="mb-1 block text-sm font-medium text-white">Full Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white placeholder-white/40 focus:border-rose-400 focus:outline-none"
              placeholder="Jane Doe"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-white">Blood Type</label>
              <div className="relative">
                <Droplets className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-white/40" />
                <select
                  value={form.bloodType}
                  onChange={(e) => setForm({ ...form, bloodType: e.target.value })}
                  className="w-full appearance-none rounded-lg border border-white/10 bg-black/40 px-10 py-2 text-white focus:border-rose-400 focus:outline-none"
                >
                  {bloodTypes.map((b) => (
                    <option key={b} value={b} className="bg-black">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-white">Location</label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-white/40" />
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-10 py-2 text-white placeholder-white/40 focus:border-rose-400 focus:outline-none"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">Organs Available</label>
            <div className="flex flex-wrap gap-2">
              {organs.map((org) => {
                const active = form.organs.includes(org);
                return (
                  <button
                    key={org}
                    type="button"
                    onClick={() => toggleOrgan(org)}
                    className={
                      'rounded-full border px-3 py-1.5 text-sm transition ' +
                      (active
                        ? 'border-rose-400 bg-rose-500/10 text-rose-200'
                        : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20')
                    }
                  >
                    {org}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="h-4 w-4 rounded border-white/20 bg-black/40 text-rose-500 focus:ring-rose-400"
            />
            I provide informed consent for organ & tissue donation in accordance with ethical guidelines.
          </label>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full rounded-lg bg-rose-500 px-4 py-2.5 font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Submit Registration
          </button>
        </form>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="mb-4 text-lg font-semibold text-white">Status Tracker</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className={`mt-0.5 h-5 w-5 ${form.name ? 'text-emerald-400' : 'text-white/30'}`} />
                <div>
                  <p className="font-medium text-white">Registration</p>
                  <p className="text-sm text-white/70">Provide basic details to get started.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className={`mt-0.5 h-5 w-5 ${form.organs.length ? 'text-emerald-400' : 'text-white/30'}`} />
                <div>
                  <p className="font-medium text-white">Preferences</p>
                  <p className="text-sm text-white/70">Select which organs and tissues you wish to donate.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className={`mt-0.5 h-5 w-5 ${form.consent ? 'text-emerald-400' : 'text-white/30'}`} />
                <div>
                  <p className="font-medium text-white">Consent</p>
                  <p className="text-sm text-white/70">Confirm informed consent to enable matching.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className={`mt-0.5 h-5 w-5 ${submitted ? 'text-emerald-400' : 'text-white/30'}`} />
                <div>
                  <p className="font-medium text-white">Verification</p>
                  <p className="text-sm text-white/70">Submission received. Identity verification pending.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-emerald-500/10 p-6 text-emerald-200">
            <div className="mb-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              <p className="font-semibold">Privacy & Security</p>
            </div>
            <p className="text-sm text-emerald-100/80">
              Your data is encrypted and only shared with authorized healthcare partners for the purpose of saving lives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
