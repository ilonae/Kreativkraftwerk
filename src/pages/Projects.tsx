import React, { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';
import { useProjects } from '../hooks/useProjects';
import ExhibitionDetail from '../components/ExhibitionDetail';
import type { Project } from '../data/types';

const statusColors: Record<string, string> = {
  ongoing:   'text-kkw-pink',
  upcoming:  'text-blue-500',
  completed: 'text-gray-400',
};

export default function Projects() {
  const { lang } = useLang();
  const t = translations[lang].projects;
  const { projects, loading, error } = useProjects();
  const [selected, setSelected] = useState<Project | null>(null);

  if (selected) {
    return <ExhibitionDetail project={selected} onBack={() => setSelected(null)} />;
  }

  const featured  = projects.find(p => p.featured);
  const cards     = projects.filter(p => !p.featured);
  const ongoing   = cards.filter(p => p.status === 'ongoing');
  const upcoming  = cards.filter(p => p.status === 'upcoming');
  const completed = cards.filter(p => p.status === 'completed');

  return (
    <div className="min-h-screen bg-white">

      {/* ── Page header ── */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <span className="text-xs tracking-label uppercase font-semibold text-black">Berlin</span>
        <span className="text-kkw-pink">→</span>
        <span className="text-xs tracking-label uppercase text-gray-500">{t.breadcrumb}</span>
      </div>

      {loading && (
        <div className="px-6 py-24 text-center">
          <p className="text-xs tracking-label uppercase text-gray-400">Loading…</p>
        </div>
      )}

      {error && (
        <div className="px-6 py-24 text-center">
          <p className="text-xs tracking-label uppercase text-red-400">
            Failed to load projects. Check your Contentful credentials.
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* ── Featured hero ── */}
          {featured && (
            <div
              className="group cursor-pointer border-b border-black relative overflow-hidden"
              onClick={() => setSelected(featured)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${featured.gradient}`} />
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

              {featured.imageUrl && (
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              )}

              <div className="relative px-8 py-16 md:py-20 text-white">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs tracking-label uppercase font-semibold text-kkw-pink border border-kkw-pink px-3 py-1">
                        {lang === 'de' ? 'Projekt' : 'Project'}
                        {featured.status === 'completed'
                          ? ` — ${lang === 'de' ? 'Abgeschlossen' : 'Completed'}`
                          : featured.status === 'ongoing'
                          ? ` — ${lang === 'de' ? 'Laufend' : 'Ongoing'}`
                          : ''}
                      </span>
                      {featured.city && featured.year && (
                        <span className="text-xs tracking-label uppercase text-gray-400">
                          {featured.city}, {featured.year}
                        </span>
                      )}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold leading-none mb-3 tracking-tight">
                      {featured.title}
                    </h2>
                    {featured.subtitle && (
                      <p className="text-sm text-gray-300 italic mb-4 leading-snug">
                        {featured.subtitle}
                      </p>
                    )}
                    {featured.dates && featured.venue && (
                      <p className="text-xs text-gray-400 tracking-label uppercase">
                        {featured.dates} · {featured.venue}{featured.city ? `, ${featured.city}` : ''}
                      </p>
                    )}
                  </div>

                  {(featured.visitors || featured.duration) && (
                    <div className="flex flex-col items-start md:items-end gap-3">
                      <div className="flex gap-6 text-center">
                        {featured.visitors && (
                          <div>
                            <p className="text-3xl font-bold text-kkw-pink">{featured.visitors}</p>
                            <p className="text-xs tracking-label uppercase text-gray-400">
                              {lang === 'de' ? 'Besucher*innen' : 'Visitors'}
                            </p>
                          </div>
                        )}
                        {featured.duration && (
                          <div>
                            <p className="text-3xl font-bold text-white">{featured.duration.split(' ')[0]}</p>
                            <p className="text-xs tracking-label uppercase text-gray-400">
                              {lang === 'de' ? 'Tage' : 'Days'}
                            </p>
                          </div>
                        )}
                      </div>
                      <span className="text-xs tracking-label uppercase font-semibold border border-white border-opacity-40 px-4 py-2 group-hover:border-kkw-pink group-hover:text-kkw-pink transition-colors duration-200">
                        {lang === 'de' ? 'Zum Projekt →' : 'View Project →'}

                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Project cards ── */}
          {[
            { label: t.active,    items: ongoing },
            { label: t.upcoming,  items: upcoming },
            { label: t.completed, items: completed },
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
                    <div
                      className={`relative overflow-hidden ${project.imageUrl ? '' : `bg-gradient-to-br ${project.gradient}`}`}
                      style={{ aspectRatio: '16/9' }}
                    >
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                          <div
                            className="absolute inset-0 opacity-10"
                            style={{
                              backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 75%)',
                              backgroundSize: '32px 32px',
                            }}
                          />
                        </>
                      )}
                      <span className={`absolute top-3 left-3 text-xs tracking-label uppercase font-semibold px-2 py-1 bg-white bg-opacity-90 ${statusColors[project.status]}`}>
                        {t.statusLabels[project.status]}
                      </span>
                    </div>

                    <div className="px-5 py-5 border-t border-gray-100">
                      <span className="block text-xs tracking-label uppercase text-gray-400 mb-1">
                        {lang === 'de' ? project.categoryDE : project.categoryEN}
                      </span>
                      <h3 className="text-base font-bold mb-2 group-hover:text-kkw-pink transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">
                        {lang === 'de' ? project.descriptionDE : project.descriptionEN}
                      </p>
                      <span className="text-xs tracking-label text-gray-400">{project.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="px-6 py-16 text-center border-b border-gray-100">
              <p className="text-xs tracking-label uppercase text-gray-400">
                {lang === 'de' ? 'Weitere Projekte folgen.' : 'More projects coming soon.'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
