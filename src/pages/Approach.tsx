import React from 'react';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

const principles = [
  {
    number: '01',
    titleEN: 'Interdisciplinary',
    titleDE: 'Interdisziplinär',
    bodyEN: 'We reject the boundaries between disciplines. Art, architecture, technology, design, writing, and performance are not separate containers but overlapping territories. Our work thrives in the spaces between fields, where unexpected connections become generative force.',
    bodyDE: 'Wir lehnen die Grenzen zwischen Disziplinen ab. Kunst, Architektur, Technologie, Design, Schreiben und Performance sind keine getrennten Container, sondern überlappende Territorien. Unsere Arbeit gedeiht in den Räumen zwischen den Feldern, wo unerwartete Verbindungen zu einer generativen Kraft werden.',
  },
  {
    number: '02',
    titleEN: 'Community Based',
    titleDE: 'Gemeinschaftsbasiert',
    bodyEN: 'The collective is not an institution — it is a community. We are shaped by the people within and around us, by the neighbourhoods we inhabit and the publics we engage. Our practice is accountable to the communities it touches.',
    bodyDE: 'Das Kollektiv ist keine Institution — es ist eine Gemeinschaft. Wir werden geformt durch die Menschen in und um uns herum, durch die Nachbarschaften, die wir bewohnen, und die Öffentlichkeiten, die wir einbeziehen. Unsere Praxis ist gegenüber den Gemeinschaften, die sie berührt, rechenschaftspflichtig.',
  },
  {
    number: '03',
    titleEN: 'Room as a Term',
    titleDE: 'Raum als Begriff',
    bodyEN: '"Room" for us is not simply physical space. It is permission — permission to experiment, to fail, to contradict, to grow. We create rooms: for artists, for ideas, for dialogue, for the unpredictable encounter. The room is the work.',
    bodyDE: '„Raum" ist für uns nicht nur physischer Raum. Es ist Erlaubnis — die Erlaubnis zu experimentieren, zu scheitern, zu widersprechen, zu wachsen. Wir schaffen Räume: für Künstler*innen, für Ideen, für Dialog, für die unvorhersehbare Begegnung. Der Raum ist das Werk.',
  },
  {
    number: '04',
    titleEN: 'Process Over Product',
    titleDE: 'Prozess vor Produkt',
    bodyEN: 'We value the making as much as the made. Our exhibitions, publications, and events document a process rather than resolve it. We keep questions open, invite revision, and resist the pressure of premature closure.',
    bodyDE: 'Wir schätzen das Machen ebenso wie das Gemachte. Unsere Ausstellungen, Publikationen und Veranstaltungen dokumentieren einen Prozess, anstatt ihn abzuschließen. Wir lassen Fragen offen, laden zur Überarbeitung ein und widerstehen dem Druck vorzeitiger Abschlüsse.',
  },
  {
    number: '05',
    titleEN: 'Open Structure',
    titleDE: 'Offene Struktur',
    bodyEN: 'KreativKraftwerk operates through a loose, horizontal structure. Membership is fluid, collaboration is voluntary, and decision-making is shared. We are held together not by hierarchy but by shared curiosity and mutual commitment.',
    bodyDE: 'KreativKraftwerk operiert durch eine lockere, horizontale Struktur. Mitgliedschaft ist fließend, Zusammenarbeit ist freiwillig und Entscheidungsfindung ist geteilt. Wir werden nicht durch Hierarchie zusammengehalten, sondern durch gemeinsame Neugier und gegenseitiges Engagement.',
  },
];

export default function Approach() {
  const { lang } = useLang();
  const t = translations[lang].approach;

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
            {/* Number */}
            <div className="md:w-16 shrink-0 mb-3 md:mb-0">
              <span className="text-xs tracking-label text-kkw-pink font-bold">{p.number}</span>
            </div>
            {/* Title */}
            <div className="md:w-64 shrink-0 mb-3 md:mb-0">
              <h3 className="text-sm font-bold tracking-label uppercase group-hover:text-kkw-pink transition-colors duration-200">
                {lang === 'de' ? p.titleDE : p.titleEN}
              </h3>
            </div>
            {/* Body */}
            <div className="flex-1 max-w-2xl">
              <p className="text-sm text-gray-500 leading-relaxed">
                {lang === 'de' ? p.bodyDE : p.bodyEN}
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
