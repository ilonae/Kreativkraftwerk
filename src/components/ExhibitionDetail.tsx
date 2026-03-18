import React from 'react';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';
import type { Project } from '../data/types';

interface ExhibitionDetailProps {
  project: Project;
  onBack: () => void;
}

export default function ExhibitionDetail({ project: ex, onBack }: ExhibitionDetailProps) {
  const { lang } = useLang();
  const t = translations[lang].projectDetail;

  // Minimal detail view for projects that have no rich content yet
  if (!ex.conceptDE && !ex.conceptEN && !ex.sections?.length) {
    return (
      <div className="min-h-screen bg-white">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-xs tracking-label uppercase font-semibold hover:text-kkw-pink transition-colors duration-200 flex items-center gap-2"
          >
            {t.back}
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-xs tracking-label uppercase text-gray-400">{ex.title}</span>
        </div>

        {/* Hero */}
        <div className={`bg-gradient-to-br ${ex.gradient} text-white px-8 py-16`}>
          <div className="max-w-4xl">
            <span className="inline-block text-xs tracking-label uppercase font-semibold text-kkw-pink border border-kkw-pink px-3 py-1 mb-6">
              {t.project} — {ex.dates}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-none mb-4 tracking-tight">
              {ex.title}
            </h1>
            {ex.subtitle && (
              <p className="text-base md:text-lg text-gray-300 italic leading-snug">{ex.subtitle}</p>
            )}
          </div>
        </div>

        <div className="px-8 py-24 text-center">
          <p className="text-xs tracking-label uppercase text-gray-400">{t.comingSoon}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Breadcrumb / back ── */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="text-xs tracking-label uppercase font-semibold hover:text-kkw-pink transition-colors duration-200 flex items-center gap-2"
        >
          {t.back}
        </button>
        <span className="text-gray-200">|</span>
        <span className="text-xs tracking-label uppercase text-gray-400 hidden sm:inline">{ex.title}</span>
      </div>

      {/* ── Hero ── */}
      <div className={`bg-gradient-to-br ${ex.gradient} text-white px-8 py-16 md:py-24`}>
        <div className="max-w-4xl">
          <span className="inline-block text-xs tracking-label uppercase font-semibold text-kkw-pink border border-kkw-pink px-3 py-1 mb-6">
            {t.project} — {ex.dates}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-none mb-4 tracking-tight">
            {ex.title}
          </h1>
          {ex.subtitle && (
            <p className="text-base md:text-lg text-gray-300 mb-10 italic leading-snug">
              {ex.subtitle}
            </p>
          )}

          {/* Stats */}
          {(ex.visitors || ex.duration || ex.venue || ex.partner) && (
            <div className="flex flex-wrap gap-0 mt-8 border border-white border-opacity-20">
              {[
                { label: t.visitors,                              value: ex.visitors },
                { label: lang === 'de' ? 'Dauer' : 'Duration',   value: ex.duration },
                { label: lang === 'de' ? 'Ort' : 'Venue',        value: ex.venue },
                { label: 'Partner',                               value: ex.partner },
              ].filter(s => s.value).map((s, i, arr) => (
                <div
                  key={s.label}
                  className={`px-5 py-4 ${i < arr.length - 1 ? 'border-r border-white border-opacity-20' : ''}`}
                >
                  <p className="text-xs tracking-label uppercase text-gray-400 mb-1">{s.label}</p>
                  <p className="text-sm font-semibold">{s.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Inside / Outside / Besides framework ── */}
      {ex.framework && ex.framework.length > 0 && (
        <div className="border-b border-black bg-black text-white">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {ex.framework.map((f, i) => (
              <div
                key={f.term}
                className={`px-8 py-10 ${i < ex.framework!.length - 1 ? 'border-b md:border-b-0 md:border-r border-white border-opacity-10' : ''}`}
              >
                <p className="text-4xl md:text-5xl font-bold text-kkw-pink mb-4 tracking-display uppercase">
                  {f.term}
                </p>
                <p className="text-xs tracking-label uppercase text-gray-400 mb-2">
                  {lang === 'de' ? 'DE' : 'EN'}
                </p>
                <p className="text-sm leading-relaxed text-gray-300">
                  {lang === 'de' ? f.de : f.en}
                </p>
              </div>
            ))}
          </div>

          {/* Inside/Outside body paragraphs */}
          {ex.insideOutsideBody && (
            <div className="px-8 py-8 border-t border-white border-opacity-10 space-y-4">
              {(lang === 'de' ? ex.insideOutsideBody.de : ex.insideOutsideBody.en).map((para, i) => (
                <p key={i} className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Concept text ── */}
      {(ex.conceptDE || ex.conceptEN || ex.sections?.length) && (
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-black">
          <div className="px-8 py-12 border-b md:border-b-0 md:border-r border-gray-100">
            <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-6">
              {t.concept}
            </span>
            {(ex.conceptDE || ex.conceptEN) && (
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {lang === 'de' ? ex.conceptDE : ex.conceptEN}
              </p>
            )}
            {(ex.triggerDE || ex.triggerEN) && (
              <p className="text-sm text-gray-600 leading-relaxed">
                {lang === 'de' ? ex.triggerDE : ex.triggerEN}
              </p>
            )}
          </div>

          {ex.sections && ex.sections.length > 0 && (
            <div className="px-8 py-12">
              <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-6">
                {t.structure}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">{t.structureBody}</p>
              <div className="mt-8 space-y-3">
                {ex.sections.map((s, i) => (
                  <div key={s.name} className="flex items-center gap-4">
                    <span className="text-xs font-bold text-kkw-pink w-6 shrink-0">{`0${i + 1}`}</span>
                    <span className="text-xs tracking-label uppercase font-semibold text-black">
                      {lang === 'de' ? s.name : s.nameEN}
                    </span>
                    <span className="text-xs text-gray-400 hidden sm:inline">
                      — {lang === 'de' ? s.description.split('.')[0] : s.descriptionEN.split('.')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Three sections with artists ── */}
      {ex.sections && ex.sections.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-black">
          {ex.sections.map((section, i) => (
            <div
              key={section.name}
              className={`px-6 py-10 ${i < ex.sections!.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''}`}
            >
              <div className="mb-6">
                <span className="block text-xs tracking-label uppercase font-bold text-kkw-pink mb-1">
                  0{i + 1} — {lang === 'de' ? section.name : section.nameEN}
                </span>
                <span className="block text-xs tracking-label uppercase text-gray-400">
                  {lang === 'de' ? section.nameEN : section.name}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                {lang === 'de' ? section.description : section.descriptionEN}
              </p>
              <div className="space-y-2">
                {section.artists.map(artist => (
                  <div key={artist} className="flex items-center gap-2 py-2 border-b border-gray-50 group">
                    <span className="text-kkw-pink text-xs">—</span>
                    <span className="text-sm font-medium group-hover:text-kkw-pink transition-colors duration-150">
                      {artist}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Venue & context ── */}
      <div className="px-8 py-10 bg-kkw-gray border-b border-black">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-2">
              {t.firstShown}
            </span>
            <p className="text-sm font-bold">{ex.venue}, {ex.city}</p>
            {ex.partner && (
              <p className="text-sm text-gray-500">{t.cooperationWith} {ex.partner}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              {ex.dates}{ex.visitors ? ` · ${ex.visitors} ${t.visitors}` : ''}
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <span className="text-xs tracking-label uppercase font-semibold border border-black px-4 py-2">
              {t.curatedBy} KreativKraftwerk
            </span>
            <span className="text-xs tracking-label uppercase font-semibold bg-kkw-pink text-white px-4 py-2">
              {ex.city} {ex.dates.slice(-4)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="px-8 py-10 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs tracking-label uppercase font-semibold border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors duration-200"
        >
          {t.backFull}
        </button>
        <p className="text-xs text-gray-400 tracking-label uppercase">
          {t.allProjects}
        </p>
      </div>

    </div>
  );
}
