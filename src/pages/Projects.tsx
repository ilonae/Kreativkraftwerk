import React, { useState } from 'react';
import { projects } from '../data/projects';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';
import ExhibitionDetail from '../components/ExhibitionDetail';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { lang } = useLang();
  const t = translations[lang];

  /* Show detail view */
  const selectedProject = selectedId !== null ? projects.find(p => p.id === selectedId) : null;
  if (selectedProject) {
    return (
      <ExhibitionDetail
        project={selectedProject}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  const featured = projects.find(p => p.featured);
  const current = projects.filter(p => p.current && !p.featured);
  const past = projects.filter(p => !p.current && !p.featured);

  const allRegular = [...current, ...past].filter(p =>
    searchQuery === '' ||
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white">

      {/* ── Page header bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-xs tracking-label uppercase text-gray-500">
          <span className="font-semibold text-black">Berlin</span>
          <span className="text-kkw-pink">→</span>
          <span>{t.projects.breadcrumb}</span>
        </div>
        <div className="flex items-center gap-3">
          {searchOpen && (
            <input
              autoFocus
              type="text"
              placeholder={t.exhibitions.searchPlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="text-xs tracking-label border-b border-black outline-none px-1 py-0.5 w-48 placeholder-gray-300"
            />
          )}
          <button
            onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setSearchQuery(''); }}
            className="text-xs tracking-label uppercase font-semibold border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors duration-200"
          >
            {searchOpen ? t.exhibitions.close : t.exhibitions.search}
          </button>
        </div>
      </div>

      {/* ── Featured hero ── */}
      {featured && !searchQuery && (
        <div
          className="group cursor-pointer border-b border-black relative overflow-hidden"
          onClick={() => setSelectedId(featured.id)}
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

          <div className="relative px-8 py-16 md:py-20 text-white">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs tracking-label uppercase font-semibold text-kkw-pink border border-kkw-pink px-3 py-1">
                    {t.exhibitions.featuredTag}
                  </span>
                  <span className="text-xs tracking-label uppercase text-gray-400">
                    {featured.city}, {featured.dates.match(/\d{4}/)?.[0] ?? ''}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-none mb-3 tracking-tight">
                  {featured.title}
                </h2>
                <p className="text-sm text-gray-300 italic mb-4 leading-snug">
                  {featured.subtitle}
                </p>
                <p className="text-xs text-gray-400 tracking-label uppercase">
                  {featured.dates} · {featured.venue}, {featured.city}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3">
                <div className="flex gap-6 text-center">
                  {featured.visitors && (
                    <div>
                      <p className="text-3xl font-bold text-kkw-pink">{featured.visitors}</p>
                      <p className="text-xs tracking-label uppercase text-gray-400">{t.exhibitions.visitors}</p>
                    </div>
                  )}
                  {featured.duration && (
                    <div>
                      <p className="text-3xl font-bold text-white">5</p>
                      <p className="text-xs tracking-label uppercase text-gray-400">{t.exhibitions.days}</p>
                    </div>
                  )}
                </div>
                <span className="text-xs tracking-label uppercase font-semibold border border-white border-opacity-40 px-4 py-2 group-hover:border-kkw-pink group-hover:text-kkw-pink transition-colors duration-200">
                  {t.exhibitions.viewExhibition}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Currently Showing ── */}
      {current.length > 0 && !searchQuery && (
        <div>
          <div className="px-6 py-3 border-b border-gray-100">
            <span className="text-xs tracking-label uppercase font-semibold text-kkw-pink">
              {t.exhibitions.currentlyShowing}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-black">
            {current.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                total={current.length}
                onClick={() => setSelectedId(p.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Past / search results ── */}
      {(searchQuery ? allRegular : past).length > 0 && (
        <div>
          <div className="px-6 py-3 border-b border-gray-100">
            <span className="text-xs tracking-label uppercase font-semibold text-gray-400">
              {searchQuery ? t.exhibitions.noResults.replace('No', 'Search') : t.exhibitions.pastExhibitions}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-black">
            {(searchQuery ? allRegular : past).map((p, i, arr) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                total={arr.length}
                onClick={() => setSelectedId(p.id)}
              />
            ))}
          </div>
        </div>
      )}

      {searchQuery && allRegular.length === 0 && (
        <div className="px-6 py-24 text-center">
          <p className="text-xs tracking-label uppercase text-gray-400">{t.exhibitions.noResults}</p>
        </div>
      )}
    </div>
  );
}
