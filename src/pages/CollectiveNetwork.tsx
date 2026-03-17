import React, { useState } from 'react';
import { artists } from '../data/artists';
import ArtistCard from '../components/ArtistCard';

const allFields = ['All', ...Array.from(new Set(artists.map(a => a.field.split(' & ')[0])))];

export default function CollectiveNetwork() {
  const [activeField, setActiveField] = useState('All');

  const filtered = activeField === 'All'
    ? artists
    : artists.filter(a => a.field.toLowerCase().includes(activeField.toLowerCase()));

  return (
    <div className="min-h-screen bg-white">

      {/* ── Page header ── */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <span className="text-xs tracking-label uppercase font-semibold text-black">Berlin</span>
        <span className="text-kkw-pink">→</span>
        <span className="text-xs tracking-label uppercase text-gray-500">Collective Network</span>
      </div>

      {/* ── Intro ── */}
      <div className="px-6 py-10 border-b border-black">
        <div className="max-w-2xl">
          <div className="flex flex-wrap gap-6 mb-6">
            {['Interdisciplinary', 'Community Based', 'Room as a Term'].map(term => (
              <span
                key={term}
                className="text-xs tracking-label uppercase font-semibold text-kkw-pink border border-kkw-pink px-3 py-1"
              >
                {term}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            KreativKraftwerk is a Berlin-based interdisciplinary arts collective bringing together
            practitioners across art, design, architecture, technology, and the humanities. The network
            operates as a shared space — a room as a term — for collaboration, exchange, and collective
            experimentation. Currently based in Berlin, with future locations forthcoming.
          </p>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="flex items-center gap-0 px-6 py-0 border-b border-black overflow-x-auto">
        {allFields.map((field, i) => (
          <button
            key={field}
            onClick={() => setActiveField(field)}
            className={`shrink-0 py-3 px-4 text-xs tracking-label uppercase font-semibold transition-all duration-200
              ${i < allFields.length - 1 ? 'border-r border-gray-200' : ''}
              ${activeField === field
                ? 'bg-kkw-pink text-white'
                : 'bg-white text-gray-400 hover:text-black'
              }`}
          >
            {field}
          </button>
        ))}
      </div>

      {/* ── Artist grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {filtered.map(artist => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>

      <div className="h-16 border-t border-gray-100" />
    </div>
  );
}
