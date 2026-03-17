import React from 'react';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

const milestones = [
  {
    year: '2023',
    en: 'KreativKraftwerk founded in Berlin by an interdisciplinary group of artists, architects, designers, and researchers.',
    de: 'KreativKraftwerk gegründet in Berlin von einer interdisziplinären Gruppe aus Künstler*innen, Architekt*innen, Designer*innen und Forscher*innen.',
  },
  {
    year: '2024',
    en: 'First exhibition "Spit on H*tler\'s Grave — inside threating history, outside totalarity, besides democracy" at Stadtwerkstatt Friedrichshain-Kreuzberg, in cooperation with Zusammenstelle. 900+ visitors in 5 days.',
    de: 'Erste Ausstellung „Spit on H*tler\'s Grave — inside threating history, outside totalarity, besides democracy" in der Stadtwerkstatt Friedrichshain-Kreuzberg, in Kooperation mit Zusammenstelle. 900+ Besucher*innen in 5 Tagen.',
  },
  {
    year: '2024',
    en: 'Grant application submitted for 48h Neukölln festival — expanding the exhibition concept to new venues.',
    de: 'Förderantrag für das 48h Neukölln Festival eingereicht — Erweiterung des Ausstellungskonzepts auf neue Veranstaltungsorte.',
  },
  {
    year: '2024',
    en: 'Stadtgespräche urban dialogue series begins. Launch of the KKW Journal.',
    de: 'Die urbane Dialogreihe Stadtgespräche beginnt. Launch des KKW Journal.',
  },
  {
    year: '2025',
    en: 'Collective grows to over 12 active members across 6 disciplines.',
    de: 'Das Kollektiv wächst auf über 12 aktive Mitglieder in 6 Disziplinen.',
  },
  {
    year: '2025',
    en: 'Workshop Series launched with 8 public sessions. Digital Archive opens.',
    de: 'Workshop-Reihe gestartet mit 8 öffentlichen Sitzungen. Digitales Archiv öffnet.',
  },
  {
    year: '2026',
    en: 'International Residency Exchange programme announced. Further exhibition locations in development.',
    de: 'Internationales Residency Exchange Programm angekündigt. Weitere Ausstellungsorte in Entwicklung.',
  },
];

export default function About() {
  const { lang } = useLang();
  const t = translations[lang].about;

  const valueRows = [
    { labelKey: 'founded' as const, value: '2023' },
    { labelKey: 'base' as const, value: 'Berlin' },
    { labelKey: 'members' as const, value: '12+' },
    { labelKey: 'disciplines' as const, value: '6+' },
    { labelKey: 'exhibitions' as const, value: '8' },
    { labelKey: 'futureLocations' as const, value: 'TBD' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <span className="text-xs tracking-label uppercase font-semibold text-black">Berlin</span>
        <span className="text-kkw-pink">→</span>
        <span className="text-xs tracking-label uppercase text-gray-500">{t.breadcrumb}</span>
      </div>

      {/* Hero */}
      <div className="px-6 py-14 border-b border-black bg-black text-white">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold tracking-display uppercase mb-6 leading-none">
            Kreativ<br />
            <span className="text-kkw-pink">Kraftwerk</span>
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed max-w-lg">
            {t.heroText}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 md:grid-cols-6 border-b border-black">
        {valueRows.map((v, i) => (
          <div
            key={v.labelKey}
            className={`px-6 py-6 text-center
              ${i < valueRows.length - 1 ? 'border-r border-gray-200' : ''}`}
          >
            <p className="text-2xl font-bold text-kkw-pink mb-1">{v.value}</p>
            <p className="text-xs tracking-label uppercase text-gray-400">{t.values[v.labelKey]}</p>
          </div>
        ))}
      </div>

      {/* About text + timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-black">
        {/* Left: about text */}
        <div className="px-8 py-12 border-b lg:border-b-0 lg:border-r border-gray-100">
          <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-6">
            {t.whoWeAre}
          </span>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>{t.paragraph1}</p>
            <p>
              {lang === 'de'
                ? 'Wir verstehen das Kollektiv als einen '
                : 'We understand the collective as a '}
              <em>{lang === 'de' ? 'Raum' : 'room'}</em>
              {lang === 'de'
                ? ' — nicht nur als physischen Ort, sondern als Zustand der Offenheit, Erlaubnis und Begegnung. Die Arbeit, die wir produzieren, wird geprägt durch Dialog, Zusammenarbeit und die Bereitschaft, im Ungelösten zu verweilen.'
                : ' — not simply a physical space, but a condition of openness, permission, and encounter. The work we produce is shaped by dialogue, collaboration, and a willingness to stay in the unresolved.'}
            </p>
            <p>{t.paragraph3}</p>
            <p>{t.paragraph4}</p>
          </div>
        </div>

        {/* Right: timeline */}
        <div className="px-8 py-12">
          <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-6">
            {t.history}
          </span>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="flex gap-6 py-4 border-b border-gray-100 last:border-0 group"
              >
                <span className="text-xs font-bold text-kkw-pink shrink-0 w-10 pt-0.5">
                  {m.year}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-black transition-colors duration-200">
                  {lang === 'de' ? m.de : m.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Future locations teaser */}
      <div className="px-6 py-14 border-b border-black">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-3">
              {t.futureLocationsTag}
            </span>
            <h3 className="text-2xl font-bold tracking-tight">{t.futureLocationsTitle}</h3>
          </div>
          <div className="flex gap-4 flex-wrap">
            {['Vienna', 'Amsterdam', 'Seoul', 'São Paulo'].map(city => (
              <span
                key={city}
                className="text-xs tracking-label uppercase font-semibold border border-gray-200 text-gray-300 px-4 py-2"
              >
                {city} — TBD
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
}
