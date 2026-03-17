import React from 'react';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

export default function Approach() {
  const { lang } = useLang();
  const t = translations[lang].approach;
  const principles = t.principles;

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <span className="text-xs tracking-label uppercase font-semibold text-black">Berlin</span>
        <span className="text-kkw-pink">→</span>
        <span className="text-xs tracking-label uppercase text-gray-500">{t.breadcrumb}</span>
      </div>

      {/* Hero statement */}
      <div className="px-6 py-14 border-b border-black">
        <div className="max-w-3xl">
          <p className="text-3xl font-bold leading-tight tracking-tight mb-6">
            {lang === 'de' ? (
              <>Interdisziplinär.{' '}<span className="text-kkw-pink">Gemeinschaftsbasiert.</span>{' '}Raum als Begriff.</>
            ) : (
              <>Interdisciplinary.{' '}<span className="text-kkw-pink">Community Based.</span>{' '}Room as a Term.</>
            )}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
            {t.heroSubtitle}
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
            <div className="md:w-16 shrink-0 mb-3 md:mb-0">
              <span className="text-xs tracking-label text-kkw-pink font-bold">{p.number}</span>
            </div>
            <div className="md:w-64 shrink-0 mb-3 md:mb-0">
              <h3 className="text-sm font-bold tracking-label uppercase group-hover:text-kkw-pink transition-colors duration-200">
                {p.title}
              </h3>
            </div>
            <div className="flex-1 max-w-2xl">
              <p className="text-sm text-gray-500 leading-relaxed">
                {p.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quote block */}
      <div className="px-6 py-16 bg-black text-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl font-bold leading-snug mb-4">
            {t.quote}
          </p>
          <p className="text-xs tracking-label uppercase text-gray-400">
            {t.quoteSource}
          </p>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
}
