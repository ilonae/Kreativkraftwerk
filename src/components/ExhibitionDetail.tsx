import React from 'react';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

interface ExhibitionDetailProps {
  exhibitionId: number;
  onBack: () => void;
}

/* ─── Full rich data for real exhibitions ────────────────────────────── */
const SPITLER = {
  id: 1,
  title: "Spit on H*tler's Grave",
  subtitle: 'inside threating history — outside totalarity — besides democracy',
  dates: '19. – 24. September 2024',
  venue: 'Stadtwerkstatt Friedrichshain-Kreuzberg',
  city: 'Berlin',
  partner: 'Zusammenstelle',
  visitors: '900+',
  duration: '5 Tage / 5 Days',
  gradient: 'from-red-900 via-zinc-900 to-black',
  conceptDE: `Das interdisziplinäre Ausstellungskonzept „Spit on H*tler's Grave" vom Kunstkollektiv KreativKraftwerk bringt internationale Künstler*innen und Kunstwerke zusammen, die sich kritisch mit Erinnerungskultur, Widerstand und der Kontinuität rechter Ideologien im 20. und 21. Jahrhundert auseinandersetzen. Kuratiert wird das Projekt von einem Team aus Kunst, Architektur sowie Politik- und Kulturwissenschaften.`,
  conceptEN: `The interdisciplinary exhibition concept "Spit on H*tler's Grave" by KreativKraftwerk brings together international artists and artworks that critically engage with memory culture, resistance, and the continuity of right-wing ideologies across the 20th and 21st centuries. The project is curated by a team from art, architecture, political science, and cultural studies.`,
  triggerDE: `Losgelöst durch den ansteigenden Rechtsruck vor der Bundestagswahl 2025, war Ausgangspunkt für die Ausstellung die Frage, ob Hitler ein Grab besitzt und wie man im metaphorischen Sinne seine wieder aufkommende nationalsozialistische Idee begraben kann.`,
  triggerEN: `Triggered by the rising shift to the right ahead of the 2025 federal election, the starting point for the exhibition was the question of whether Hitler has a grave — and how, in a metaphorical sense, one might bury his re-emerging National Socialist ideology.`,
  framework: [
    {
      term: 'Inside',
      de: 'der Gefühlslage des Individuums',
      en: 'the emotional state of the individual',
    },
    {
      term: 'Outside',
      de: 'im Rechtsdruck von Politik und der Gesellschaft',
      en: 'the political pressure of society and the state',
    },
    {
      term: 'Besides',
      de: 'ein Gefühl der Ohnmächtigkeit',
      en: 'a feeling of powerlessness',
    },
  ],
  sections: [
    {
      name: 'Kontinuitäten',
      nameEN: 'Continuities',
      description: 'Künstlerische Arbeiten, die die Verbindung von totalitärer Geschichte zu heute beleuchten und reflektieren.',
      descriptionEN: 'Artworks that illuminate and reflect the connection between totalitarian history and the present.',
      artists: [
        'Isaac Waldvogel',
        'Johannes Weilandt',
        'Jodie Luk',
        'Lucas Gervilla',
      ],
    },
    {
      name: 'Reaktionen',
      nameEN: 'Reactions',
      description: 'Künstlerische Arbeiten, die die emotionale Welt zum Anstieg von Totalität thematisieren.',
      descriptionEN: 'Artworks that engage with the emotional landscape of rising authoritarianism.',
      artists: [
        'Elena Rabinka',
        'Monika Mausolf',
        'Andrea Berke & Nana Rozhina',
        'Lua Elmila, Maerie C. Fricke & Delphine Oellers',
        'Kasper Jakobsen & Marlene Schomberg',
        'Violante Romani & Johanna E. Wekemann',
      ],
    },
    {
      name: 'Aktionen',
      nameEN: 'Actions',
      description: 'Künstlerische Arbeiten, die Aktionen und Lösungen gegen den ansteigenden Rechtsruck thematisieren oder diese reflektieren.',
      descriptionEN: 'Artworks that propose or reflect on responses and actions against the rising far-right.',
      artists: [
        'Leni Schleyer & Diana Brittinger',
        'Ilona Eisenbraun',
        'Sophie Linde',
        'Philipp Pink',
        'ACCICE — Access to Justice',
      ],
    },
  ],
  insideOutsideBody: {
    de: [
      'Inside der Gefühlslage des Individuums, Outside im Rechtsdruck von Politik und der Gesellschaft ergibt sich Besides ein Gefühl der Ohnmächtigkeit.',
      'Inside eines Bezirks, der nicht zum Stadtbild des Bundeskanzlers passt, Outside in der Stadt des ehemaligen Zentrums der nationalsozialistischen Vergangenheit, ergibt sich Besides eine neue Form des Rassismus und Diskriminierung.',
      'Inside eines Landes mit totalitären Narben, Outside einer Welt, in der es derzeit mehr Autokratien als Demokratien gibt, ergibt sich Besides eine Sympathie zur neuen Rechten.',
    ],
    en: [
      'Inside the emotional state of the individual, Outside the political pressure of society and the state, there emerges Besides a feeling of powerlessness.',
      'Inside a district that does not fit the Chancellor\'s image of the city, Outside in the city that was once the centre of the National Socialist past, there emerges Besides a new form of racism and discrimination.',
      'Inside a country with totalitarian scars, Outside a world in which there are currently more autocracies than democracies, there emerges Besides a sympathy towards the new right.',
    ],
  },
};

/* ─── Generic placeholder detail ────────────────────────────────────── */
function GenericDetail({ id, onBack }: { id: number; onBack: () => void }) {
  const { lang } = useLang();
  const t = translations[lang].exhibitionDetail;

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
        <span className="text-xs tracking-label uppercase text-gray-400">{t.exhibition}</span>
      </div>
      <div className="px-8 py-24 text-center">
        <p className="text-xs tracking-label uppercase text-gray-400">{t.comingSoon}</p>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */
export default function ExhibitionDetail({ exhibitionId, onBack }: ExhibitionDetailProps) {
  const { lang } = useLang();
  const t = translations[lang].exhibitionDetail;

  if (exhibitionId !== 1) {
    return <GenericDetail id={exhibitionId} onBack={onBack} />;
  }

  const ex = SPITLER;

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
            {t.exhibition} — {ex.dates}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-none mb-4 tracking-tight">
            {ex.title}
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-10 italic leading-snug">
            {ex.subtitle}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-0 mt-8 border border-white border-opacity-20">
            {[
              { label: t.visitors, value: ex.visitors },
              { label: lang === 'de' ? 'Dauer' : 'Duration', value: ex.duration },
              { label: lang === 'de' ? 'Ort' : 'Venue', value: ex.venue },
              { label: 'Partner', value: ex.partner },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`px-5 py-4 ${i < 3 ? 'border-r border-white border-opacity-20' : ''}`}
              >
                <p className="text-xs tracking-label uppercase text-gray-400 mb-1">{s.label}</p>
                <p className="text-sm font-semibold">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Inside / Outside / Besides framework ── */}
      <div className="border-b border-black bg-black text-white">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {ex.framework.map((f, i) => (
            <div
              key={f.term}
              className={`px-8 py-10 ${i < 2 ? 'border-b md:border-b-0 md:border-r border-white border-opacity-10' : ''}`}
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

        {/* Inside/Outside paragraphs */}
        <div className="px-8 py-8 border-t border-white border-opacity-10 space-y-4">
          {(lang === 'de' ? ex.insideOutsideBody.de : ex.insideOutsideBody.en).map((para, i) => (
            <p key={i} className="text-sm text-gray-400 leading-relaxed max-w-3xl">
              {para}
            </p>
          ))}
          <p className="text-sm text-white font-medium leading-relaxed max-w-3xl pt-2 italic">
            „Spit on H*tler's Grave / inside threating history - outside totalarity – besides democracy"
            {' '}
            {lang === 'de'
              ? 'zielt darauf ab, dass der Raum zwischen Inside und Outside nicht kuratiert ist und somit Besides Nährboden für neue rechte Ideologien liefert.'
              : 'aims to show that the uncurated space between Inside and Outside becomes, Besides, fertile ground for new right-wing ideologies.'}
          </p>
        </div>
      </div>

      {/* ── Concept text ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-black">
        <div className="px-8 py-12 border-b md:border-b-0 md:border-r border-gray-100">
          <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-6">
            {t.concept}
          </span>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {lang === 'de' ? ex.conceptDE : ex.conceptEN}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {lang === 'de' ? ex.triggerDE : ex.triggerEN}
          </p>
        </div>
        <div className="px-8 py-12">
          <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-6">
            {t.structure}
          </span>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t.structureBody}
          </p>
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
      </div>

      {/* ── Three sections with artists ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-black">
        {ex.sections.map((section, i) => (
          <div
            key={section.name}
            className={`px-6 py-10 ${i < 2 ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''}`}
          >
            {/* Section header */}
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
            {/* Artist list */}
            <div className="space-y-2">
              {section.artists.map(artist => (
                <div
                  key={artist}
                  className="flex items-center gap-2 py-2 border-b border-gray-50 group"
                >
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

      {/* ── Venue & context ── */}
      <div className="px-8 py-10 bg-kkw-gray border-b border-black">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-2">
              {t.firstShown}
            </span>
            <p className="text-sm font-bold">{ex.venue}, Berlin</p>
            <p className="text-sm text-gray-500">{t.cooperationWith} {ex.partner}</p>
            <p className="text-xs text-gray-400 mt-1">{ex.dates} · {ex.visitors} {t.visitors}</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <span className="text-xs tracking-label uppercase font-semibold border border-black px-4 py-2">
              {t.curatedBy} KreativKraftwerk
            </span>
            <span className="text-xs tracking-label uppercase font-semibold bg-kkw-pink text-white px-4 py-2">
              Berlin 2024
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
          {t.allExhibitions}
        </p>
      </div>

    </div>
  );
}
