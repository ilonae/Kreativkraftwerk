import React, { useState } from 'react';
import { useArtists } from '../hooks/useArtists';

export default function CollectiveNetwork() {
  const [activeField, setActiveField] = useState('All');
  const { artists, loading, error } = useArtists();

  const allFields = ['All', ...Array.from(new Set(artists.map(a => a.field.split(' & ')[0])))];

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

      {loading && (
        <div className="px-6 py-24 text-center">
          <p className="text-xs tracking-label uppercase text-gray-400">Loading…</p>
        </div>
      )}

      {error && (
        <div className="px-6 py-24 text-center">
          <p className="text-xs tracking-label uppercase text-red-400">
            Failed to load artists. Check your Contentful credentials.
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Filter bar */}
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

          {/* Artist grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {filtered.map((artist) => (
              <div
                key={artist.id}
                className="group cursor-pointer border-r border-b border-gray-100 last:border-r-0"
              >
                {/* Photo or gradient placeholder */}
                <div
                  className={`relative overflow-hidden ${artist.imageUrl ? '' : `bg-gradient-to-b ${artist.gradient ?? 'from-gray-400 to-gray-300'}`}`}
                  style={{ aspectRatio: '3/4' }}
                >
                  {artist.imageUrl ? (
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 flex items-end justify-center pb-4">
                        <div className="w-16 h-16 rounded-full bg-white bg-opacity-10 border border-white border-opacity-20" />
                      </div>
                      <div
                        className="absolute inset-0 opacity-5"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5) 1px, transparent 1px, transparent 4px)',
                        }}
                      />
                    </>
                  )}
                  <div className="absolute inset-0 bg-kkw-pink opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="px-3 py-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-kkw-pink tracking-label uppercase mb-0.5">
                    {artist.name}
                  </p>
                  <p className="text-kkw-pink tracking-label uppercase mb-2" style={{ fontSize: '0.6rem' }}>
                    {artist.field}
                  </p>
                  {artist.contact && (
                    <p className="text-gray-400" style={{ fontSize: '0.6rem' }}>
                      <span className="font-semibold uppercase tracking-label">Contact: </span>
                      <a
                        href={`mailto:${artist.contact}`}
                        className="hover:text-kkw-pink transition-colors duration-200 break-all"
                        onClick={e => e.stopPropagation()}
                      >
                        {artist.contact}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {artists.length === 0 && (
            <div className="px-6 py-24 text-center">
              <p className="text-xs tracking-label uppercase text-gray-400">No members yet.</p>
            </div>
          )}

          <div className="h-16 border-t border-gray-100" />
        </>
      )}
    </div>
  );
}
