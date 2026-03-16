import React, { useState } from 'react';

interface Artist {
  id: number;
  name: string;
  field: string;
  contact: string;
  bio: string;
  gradient: string;
}

const artists: Artist[] = [
  {
    id: 1,
    name: 'Anna Schmidt',
    field: 'Architecture & Spatial Design',
    contact: 'anna.schmidt@kreativkraftwerk.de',
    bio: 'Works at the intersection of architecture, installation and community space-making. Based in Berlin.',
    gradient: 'from-gray-400 to-gray-300',
  },
  {
    id: 2,
    name: 'Max Fischer',
    field: 'Digital Arts & Technology',
    contact: 'max.fischer@kreativkraftwerk.de',
    bio: 'Explores computational aesthetics, interactive media, and the relationship between human and machine perception.',
    gradient: 'from-zinc-400 to-zinc-300',
  },
  {
    id: 3,
    name: 'Lisa Chen',
    field: 'Curating & Art Theory',
    contact: 'lisa.chen@kreativkraftwerk.de',
    bio: 'Independent curator and writer focusing on interdisciplinary practice, collective methodologies and postcolonial perspectives.',
    gradient: 'from-stone-400 to-stone-300',
  },
  {
    id: 4,
    name: 'Jonas Weber',
    field: 'Photography & Film',
    contact: 'jonas.weber@kreativkraftwerk.de',
    bio: 'Documentary and artistic photographer. Long-form film projects exploring urban transformation and social change.',
    gradient: 'from-neutral-400 to-neutral-300',
  },
  {
    id: 5,
    name: 'Marie Dubois',
    field: 'Performance & Dance',
    contact: 'marie.dubois@kreativkraftwerk.de',
    bio: 'Choreographer and performance artist. Researches the body as political space and collective memory.',
    gradient: 'from-slate-400 to-slate-300',
  },
  {
    id: 6,
    name: 'Tobias Klein',
    field: 'Sound Art & Music',
    contact: 'tobias.klein@kreativkraftwerk.de',
    bio: 'Composer and sound artist creating immersive sonic environments that respond to architecture and public space.',
    gradient: 'from-gray-500 to-gray-400',
  },
  {
    id: 7,
    name: 'Sara Müller',
    field: 'Visual Arts & Painting',
    contact: 'sara.mueller@kreativkraftwerk.de',
    bio: 'Painter and installation artist. Her practice engages with materiality, process, and the politics of representation.',
    gradient: 'from-zinc-500 to-zinc-400',
  },
  {
    id: 8,
    name: 'Kai Hoffmann',
    field: 'Writing & Research',
    contact: 'kai.hoffmann@kreativkraftwerk.de',
    bio: 'Artist-researcher and writer. Works between theory and practice, with a focus on collective knowledge production.',
    gradient: 'from-stone-500 to-stone-400',
  },
  {
    id: 9,
    name: 'Yuki Tanaka',
    field: 'Fashion & Textile',
    contact: 'yuki.tanaka@kreativkraftwerk.de',
    bio: 'Fashion designer and textile artist exploring sustainable production, cultural identity, and wearable art.',
    gradient: 'from-neutral-500 to-neutral-400',
  },
  {
    id: 10,
    name: 'Lea Brandt',
    field: 'Graphic Design & Typography',
    contact: 'lea.brandt@kreativkraftwerk.de',
    bio: 'Graphic designer and typographer. Shapes the visual identity of the collective and works with cultural institutions.',
    gradient: 'from-slate-500 to-slate-400',
  },
  {
    id: 11,
    name: 'Omar Hassan',
    field: 'Urban Planning & Activism',
    contact: 'omar.hassan@kreativkraftwerk.de',
    bio: 'Urban planner and activist working on community-led development, public space, and participatory design.',
    gradient: 'from-gray-600 to-gray-400',
  },
  {
    id: 12,
    name: 'Clara Vogt',
    field: 'Ceramics & Sculpture',
    contact: 'clara.vogt@kreativkraftwerk.de',
    bio: 'Sculptor and ceramicist. Draws on craft traditions to explore themes of labour, memory, and the domestic.',
    gradient: 'from-stone-600 to-stone-400',
  },
];

const allFields = ['All', ...Array.from(new Set(artists.map(a => a.field.split(' & ')[0])))];

export default function CollectiveNetwork() {
  const [activeField, setActiveField] = useState('All');

  const filtered = activeField === 'All'
    ? artists
    : artists.filter(a => a.field.toLowerCase().includes(activeField.toLowerCase()));

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <span className="text-xs tracking-label uppercase font-semibold text-black">Berlin</span>
        <span className="text-kkw-pink">→</span>
        <span className="text-xs tracking-label uppercase text-gray-500">Collective Network</span>
      </div>

      {/* Intro section */}
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
        {filtered.map((artist, i) => (
          <div
            key={artist.id}
            className="group cursor-pointer border-r border-b border-gray-100 last:border-r-0"
          >
            {/* Photo placeholder — grayscale portrait style */}
            <div
              className={`relative bg-gradient-to-b ${artist.gradient} overflow-hidden`}
              style={{ aspectRatio: '3/4' }}
            >
              {/* Simulate a B&W portrait with subtle texture */}
              <div className="absolute inset-0 flex items-end justify-center pb-4">
                <div className="w-16 h-16 rounded-full bg-white bg-opacity-10 border border-white border-opacity-20" />
              </div>
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5) 1px, transparent 1px, transparent 4px)',
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-kkw-pink opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </div>

            {/* Info — pink labels like in the PDF */}
            <div className="px-3 py-4 border-t border-gray-100">
              <p className="text-xs font-bold text-kkw-pink tracking-label uppercase mb-0.5">
                {artist.name}
              </p>
              <p className="text-xs text-kkw-pink tracking-label uppercase mb-2" style={{ fontSize: '0.6rem' }}>
                {artist.field}
              </p>
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
            </div>
          </div>
        ))}
      </div>

      {/* Bottom margin */}
      <div className="h-16 border-t border-gray-100" />
    </div>
  );
}
