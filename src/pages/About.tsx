import React from 'react';

const milestones = [
  { year: '2023', event: 'KreativKraftwerk gegründet / founded in Berlin by an interdisciplinary group of artists, architects, designers, and researchers.' },
  { year: '2024', event: 'First exhibition "Spit on H*tler\'s Grave — inside threating history, outside totalarity, besides democracy" at Stadtwerkstatt Friedrichshain-Kreuzberg, in cooperation with Zusammenstelle. 900+ visitors in 5 days.' },
  { year: '2024', event: 'Grant application submitted for 48h Neukölln festival — expanding the exhibition concept to new venues.' },
  { year: '2024', event: 'Stadtgespräche urban dialogue series begins. Launch of the KKW Journal.' },
  { year: '2025', event: 'Collective grows to over 12 active members across 6 disciplines.' },
  { year: '2025', event: 'Workshop Series launched with 8 public sessions. Digital Archive opens.' },
  { year: '2026', event: 'International Residency Exchange programme announced. Further exhibition locations in development.' },
];

const values = [
  { label: 'Founded', value: '2023' },
  { label: 'Base', value: 'Berlin' },
  { label: 'Members', value: '12+' },
  { label: 'Disciplines', value: '6+' },
  { label: 'Exhibitions', value: '8' },
  { label: 'Future Locations', value: 'TBD' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <span className="text-xs tracking-label uppercase font-semibold text-black">Berlin</span>
        <span className="text-kkw-pink">→</span>
        <span className="text-xs tracking-label uppercase text-gray-500">About</span>
      </div>

      {/* Hero */}
      <div className="px-6 py-14 border-b border-black bg-black text-white">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold tracking-display uppercase mb-6 leading-none">
            Kreativ<br />
            <span className="text-kkw-pink">Kraftwerk</span>
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed max-w-lg">
            An interdisciplinary arts collective based in Berlin. A room for encounter,
            exchange, and the unfinished work of living and making together.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 md:grid-cols-6 border-b border-black">
        {values.map((v, i) => (
          <div
            key={v.label}
            className={`px-6 py-6 text-center
              ${i < values.length - 1 ? 'border-r border-gray-200' : ''}`}
          >
            <p className="text-2xl font-bold text-kkw-pink mb-1">{v.value}</p>
            <p className="text-xs tracking-label uppercase text-gray-400">{v.label}</p>
          </div>
        ))}
      </div>

      {/* About text + timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-black">
        {/* Left: about text */}
        <div className="px-8 py-12 border-b lg:border-b-0 lg:border-r border-gray-100">
          <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-6">
            Who We Are
          </span>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              KreativKraftwerk is an arts collective and community space founded in Berlin in 2023.
              We bring together artists, designers, architects, technologists, writers, and
              researchers under a shared commitment to interdisciplinary practice.
            </p>
            <p>
              We understand the collective as a <em>room</em> — not simply a physical space, but
              a condition of openness, permission, and encounter. The work we produce is shaped
              by dialogue, collaboration, and a willingness to stay in the unresolved.
            </p>
            <p>
              Currently rooted in Berlin, we are actively building connections across cities and
              countries. Future locations and partner spaces are in development.
            </p>
            <p>
              Membership in the collective is open and evolving. We welcome practitioners who
              share our values of community, experimentation, and rigorous interdisciplinary work.
            </p>
          </div>
        </div>

        {/* Right: timeline */}
        <div className="px-8 py-12">
          <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-6">
            History
          </span>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="flex gap-6 py-4 border-b border-gray-100 last:border-0 group"
              >
                <span className="text-xs font-bold text-kkw-pink shrink-0 w-10 pt-0.5">
                  {m.year}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-black transition-colors duration-200">
                  {m.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Future locations teaser */}
      <div className="px-6 py-14 border-b border-black">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-3">
              Andere Orte in Zukunft
            </span>
            <h3 className="text-2xl font-bold tracking-tight">Other Locations — Coming Soon</h3>
          </div>
          <div className="flex gap-4 flex-wrap">
            {['Vienna', 'Amsterdam', 'Seoul', 'São Paulo'].map(city => (
              <span
                key={city}
                className="text-xs tracking-label uppercase font-semibold border border-gray-200 text-gray-300 px-4 py-2"
              >
                {city} — TBD
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
}
