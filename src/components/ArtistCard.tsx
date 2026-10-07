import React from 'react';
import { Artist } from '../data/types';
import { parseSocial } from '../lib/socials';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="group cursor-pointer border-r border-b border-gray-100 last:border-r-0">

      {/* Photo area — image if available, gradient fallback */}
      <div
        className={`relative overflow-hidden ${artist.imageUrl ? '' : `bg-gradient-to-b ${artist.gradient ?? 'from-gray-400 to-gray-300'}`}`}
        style={{ aspectRatio: '3/4' }}
      >
        {artist.imageUrl ? (
          <img
            src={artist.imageUrl}
            alt={artist.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <>
            {/* Portrait placeholder */}
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <div className="w-16 h-16 rounded-full bg-white bg-opacity-10 border border-white border-opacity-20" />
            </div>
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5) 1px, transparent 1px, transparent 4px)',
              }}
            />
          </>
        )}

        {/* Hover tint */}
        <div className="absolute inset-0 bg-kkw-pink opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="px-3 py-4 border-t border-gray-100 flex flex-col gap-2">
        <div>
          <p className="text-xs font-bold text-kkw-pink tracking-label uppercase mb-0.5">
            {artist.name}
          </p>
          {artist.field && (
            <p className="text-kkw-pink tracking-label uppercase" style={{ fontSize: '0.6rem' }}>
              {artist.field}
            </p>
          )}
        </div>

        {artist.hashtags && artist.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {artist.hashtags.map(tag => (
              <span
                key={tag}
                className="border border-gray-200 text-gray-500 tracking-label px-1.5 py-0.5"
                style={{ fontSize: '0.55rem' }}
              >
                #{tag}
              </span>
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
          <div className="flex flex-wrap gap-1">
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
  );
}
