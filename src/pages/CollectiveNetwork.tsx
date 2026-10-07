import React, { useMemo, useState } from 'react';
import { useArtists } from '../hooks/useArtists';
import { parseSocial } from '../lib/socials';

const norm = (s: string) => s.toLowerCase().trim().replace(/^#/, '');

export default function CollectiveNetwork() {
  const [activeField, setActiveField] = useState('All');
  const [query, setQuery] = useState('');
  const { artists, loading, error } = useArtists();

  const allFields = ['All', ...Array.from(new Set(artists.map(a => a.field.split(' & ')[0])))];

  const filtered = useMemo(() => {
    const fieldMatch = (a: typeof artists[number]) =>
      activeField === 'All' || a.field.toLowerCase().includes(activeField.toLowerCase());

    const q = norm(query);
    const textMatch = (a: typeof artists[number]) => {
      if (!q) return true;
      if (a.name.toLowerCase().includes(q)) return true;
      if (a.hashtags?.some(h => norm(h).includes(q))) return true;
      if (a.socials?.some(s => s.toLowerCase().includes(q))) return true;
      return false;
    };

    return artists.filter(a => fieldMatch(a) && textMatch(a));
  }, [artists, activeField, query]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 lg:gap-16">
          {/* Left: intro copy */}
          <div className="min-w-0 max-w-2xl">
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6">
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

          {/* Right: search zone — full width on mobile, ~85% at tablet, 70% of the right column on lg+, right-aligned */}
          <div className="min-w-0 w-full md:w-[85%] lg:w-[70%] md:justify-self-end">
            <span className="block text-xs tracking-label uppercase font-semibold text-black mb-3">
              Search
            </span>
            <div className="relative border border-black bg-white focus-within:border-kkw-pink transition-colors duration-200">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Name, #hashtag, or social link…"
                className="w-full bg-transparent outline-none px-4 py-3 pr-10 text-xs tracking-label placeholder-gray-300 text-black"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-kkw-pink text-lg leading-none w-5 h-5 flex items-center justify-center"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            {query && !loading && !error && (
              <span className="block text-xs tracking-label uppercase text-gray-400 mt-2">
                {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
              </span>
            )}
          </div>
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
                className="group cursor-pointer border-r border-b border-gray-100 last:border-r-0 flex flex-col"
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
                <div className="px-3 py-4 border-t border-gray-100 flex-1 flex flex-col gap-2">
                  <div>
                    <p className="text-xs font-bold text-kkw-pink tracking-label uppercase mb-0.5">
                      {artist.name}
                    </p>
                    <p className="text-kkw-pink tracking-label uppercase" style={{ fontSize: '0.6rem' }}>
                      {artist.field}
                    </p>
                  </div>

                  {artist.hashtags && artist.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {artist.hashtags.map(tag => (
                        <button
                          key={tag}
                          onClick={e => { e.stopPropagation(); setQuery(`#${tag}`); }}
                          className="border border-gray-200 hover:border-kkw-pink hover:text-kkw-pink text-gray-500 tracking-label px-1.5 py-0.5 transition-colors duration-200"
                          style={{ fontSize: '0.55rem' }}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  )}

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

                  {artist.socials && artist.socials.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto pt-1">
                      {artist.socials
                        .map(parseSocial)
                        .filter((s): s is NonNullable<ReturnType<typeof parseSocial>> => s !== null)
                        .map(s => (
                          <a
                            key={s.raw}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="border border-gray-200 hover:border-kkw-pink hover:text-kkw-pink text-gray-500 font-semibold tracking-label uppercase px-1.5 py-0.5 transition-colors duration-200"
                            style={{ fontSize: '0.55rem' }}
                            title={s.raw}
                          >
                            {s.label}
                          </a>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && artists.length > 0 && (
            <div className="px-6 py-24 text-center">
              <p className="text-xs tracking-label uppercase text-gray-400">
                No members match your search.
              </p>
            </div>
          )}

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
