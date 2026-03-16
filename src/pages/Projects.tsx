import React from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  year: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  gradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Stadtgespräche',
    category: 'Urban Dialogue Series',
    description: 'A long-term series of public conversations between artists, architects, and residents exploring the evolving identity of Berlin\'s neighbourhoods.',
    year: '2024 – Ongoing',
    status: 'ongoing',
    gradient: 'from-zinc-900 to-stone-700',
  },
  {
    id: 2,
    title: 'Digital Archive',
    category: 'Collective Memory',
    description: 'An open-access digital repository documenting the work, processes, and histories of the collective and its members across disciplines.',
    year: '2023 – Ongoing',
    status: 'ongoing',
    gradient: 'from-slate-900 to-indigo-800',
  },
  {
    id: 3,
    title: 'Workshop Series',
    category: 'Community Engagement',
    description: 'Regular interdisciplinary workshops bringing together practitioners from art, technology, architecture, and social sciences.',
    year: '2025',
    status: 'ongoing',
    gradient: 'from-neutral-800 to-zinc-600',
  },
  {
    id: 4,
    title: 'KKW Journal',
    category: 'Publication',
    description: 'A biannual printed and digital publication featuring essays, interviews, and artistic contributions from collective members and invited voices.',
    year: '2024 – Ongoing',
    status: 'ongoing',
    gradient: 'from-stone-800 to-amber-900',
  },
  {
    id: 5,
    title: 'Residency Exchange',
    category: 'International Residency',
    description: 'An artist residency programme facilitating exchanges between Berlin and partner cities, inviting international practitioners to collaborate with the collective.',
    year: '2026',
    status: 'upcoming',
    gradient: 'from-gray-800 to-slate-700',
  },
  {
    id: 6,
    title: 'Sound Garden',
    category: 'Sound Art Installation',
    description: 'A site-specific sound installation created in collaboration with musicians, architects, and landscape designers. Exhibited across three outdoor venues.',
    year: '2023',
    status: 'completed',
    gradient: 'from-zinc-700 to-neutral-600',
  },
];

const statusColors: Record<string, string> = {
  ongoing: 'text-kkw-pink',
  upcoming: 'text-blue-500',
  completed: 'text-gray-400',
};

const statusLabels: Record<string, string> = {
  ongoing: 'Ongoing',
  upcoming: 'Upcoming',
  completed: 'Completed',
};

export default function Projects() {
  const ongoing = projects.filter(p => p.status === 'ongoing');
  const upcoming = projects.filter(p => p.status === 'upcoming');
  const completed = projects.filter(p => p.status === 'completed');

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <span className="text-xs tracking-label uppercase font-semibold text-black">Berlin</span>
        <span className="text-kkw-pink">→</span>
        <span className="text-xs tracking-label uppercase text-gray-500">Projects</span>
      </div>

      {[
        { label: 'Active Projects', items: ongoing },
        { label: 'Upcoming', items: upcoming },
        { label: 'Completed', items: completed },
      ].map(section => section.items.length > 0 && (
        <div key={section.label}>
          <div className="px-6 py-3 border-b border-gray-100">
            <span className="text-xs tracking-label uppercase font-semibold text-gray-400">
              {section.label}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-b border-black">
            {section.items.map((project, i) => (
              <div
                key={project.id}
                className={`group cursor-pointer overflow-hidden bg-white
                  ${i < section.items.length - 1 ? 'border-r border-gray-200' : ''}
                `}
              >
                {/* Image area */}
                <div
                  className={`relative bg-gradient-to-br ${project.gradient} overflow-hidden`}
                  style={{ aspectRatio: '16/9' }}
                >
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 75%)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <span className={`absolute top-3 left-3 text-xs tracking-label uppercase font-semibold px-2 py-1 bg-white bg-opacity-90 ${statusColors[project.status]}`}>
                    {statusLabels[project.status]}
                  </span>
                </div>

                {/* Text */}
                <div className="px-5 py-5 border-t border-gray-100">
                  <span className="block text-xs tracking-label uppercase text-gray-400 mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-base font-bold mb-2 group-hover:text-kkw-pink transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <span className="text-xs tracking-label text-gray-400">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
