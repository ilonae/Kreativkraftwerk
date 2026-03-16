import React from 'react';

const principles = [
  {
    number: '01',
    title: 'Interdisciplinary',
    body: 'We reject the boundaries between disciplines. Art, architecture, technology, design, writing, and performance are not separate containers but overlapping territories. Our work thrives in the spaces between fields, where unexpected connections become generative force.',
  },
  {
    number: '02',
    title: 'Community Based',
    body: 'The collective is not an institution — it is a community. We are shaped by the people within and around us, by the neighbourhoods we inhabit and the publics we engage. Our practice is accountable to the communities it touches.',
  },
  {
    number: '03',
    title: 'Room as a Term',
    body: '"Room" for us is not simply physical space. It is permission — permission to experiment, to fail, to contradict, to grow. We create rooms: for artists, for ideas, for dialogue, for the unpredictable encounter. The room is the work.',
  },
  {
    number: '04',
    title: 'Process Over Product',
    body: 'We value the making as much as the made. Our exhibitions, publications, and events document a process rather than resolve it. We keep questions open, invite revision, and resist the pressure of premature closure.',
  },
  {
    number: '05',
    title: 'Open Structure',
    body: 'KreativKraftwerk operates through a loose, horizontal structure. Membership is fluid, collaboration is voluntary, and decision-making is shared. We are held together not by hierarchy but by shared curiosity and mutual commitment.',
  },
];

export default function Approach() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <span className="text-xs tracking-label uppercase font-semibold text-black">Berlin</span>
        <span className="text-kkw-pink">→</span>
        <span className="text-xs tracking-label uppercase text-gray-500">Approach</span>
      </div>

      {/* Hero statement */}
      <div className="px-6 py-14 border-b border-black">
        <div className="max-w-3xl">
          <p className="text-3xl font-bold leading-tight tracking-tight mb-6">
            Interdisciplinary.{' '}
            <span className="text-kkw-pink">Community Based.</span>{' '}
            Room as a Term.
          </p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
            KreativKraftwerk is an arts collective that understands practice as a shared
            condition. We come together across fields, backgrounds, and geographies to produce
            work that could not exist in isolation.
          </p>
        </div>
      </div>

      {/* Principles */}
      <div>
        {principles.map((p, i) => (
          <div
            key={p.number}
            className={`flex flex-col md:flex-row px-6 py-10 border-b
              ${i === principles.length - 1 ? 'border-black' : 'border-gray-100'}
              group hover:bg-kkw-gray transition-colors duration-200`}
          >
            {/* Number */}
            <div className="md:w-16 shrink-0 mb-3 md:mb-0">
              <span className="text-xs tracking-label text-kkw-pink font-bold">{p.number}</span>
            </div>
            {/* Title */}
            <div className="md:w-64 shrink-0 mb-3 md:mb-0">
              <h3 className="text-sm font-bold tracking-label uppercase group-hover:text-kkw-pink transition-colors duration-200">
                {p.title}
              </h3>
            </div>
            {/* Body */}
            <div className="flex-1 max-w-2xl">
              <p className="text-sm text-gray-500 leading-relaxed">{p.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quote block */}
      <div className="px-6 py-16 bg-black text-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl font-bold leading-snug mb-4">
            "A room is not empty when it holds the possibility of encounter."
          </p>
          <p className="text-xs tracking-label uppercase text-gray-400">
            — KreativKraftwerk Manifesto, Berlin 2023
          </p>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
}
