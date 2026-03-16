import React, { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

interface NavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabIds = [
  'exhibitions',
  'projects',
  'collective-network',
  'approach',
  'contact',
  'about',
] as const;

export default function NavBar({ activeTab, setActiveTab }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLang();
  const t = translations[lang].nav;

  const tabs = tabIds.map(id => ({
    id,
    label: t.tabs[id.replace('-', '') as never] ??
      t.tabs[id as keyof typeof t.tabs],
  }));

  // Build tab label from translations by tab id
  const tabLabel = (id: string): string => {
    const map: Record<string, string> = {
      exhibitions: t.tabs.exhibitions,
      projects: t.tabs.projects,
      'collective-network': t.tabs.collectiveNetwork,
      approach: t.tabs.approach,
      contact: t.tabs.contact,
      about: t.tabs.about,
    };
    return map[id] ?? id;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black">
      {/* Top bar: logo + city + language toggle */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-black">
        <button
          onClick={() => setActiveTab('exhibitions')}
          className="text-base font-bold tracking-display uppercase hover:text-kkw-pink transition-colors duration-200"
        >
          KreativKraftwerk
        </button>

        <div className="flex items-center gap-4">
          {/* Location */}
          <div className="flex items-center gap-2">
            <span className="text-xs tracking-label uppercase font-medium">Berlin</span>
            <span className="text-kkw-pink text-sm font-bold">→</span>
            <span className="text-xs tracking-label uppercase text-gray-400 hidden sm:inline">
              {t.futureLocations}
            </span>
          </div>

          {/* DE / EN language toggle */}
          <div className="flex items-center gap-0 border border-black shrink-0">
            <button
              onClick={() => setLang('de')}
              className={`px-3 py-1 text-xs tracking-label uppercase font-semibold transition-colors duration-150 border-r border-black
                ${lang === 'de' ? 'bg-black text-white' : 'bg-white text-black hover:bg-kkw-gray'}`}
            >
              DE
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-xs tracking-label uppercase font-semibold transition-colors duration-150
                ${lang === 'en' ? 'bg-black text-white' : 'bg-white text-black hover:bg-kkw-gray'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Desktop tab navigation */}
      <nav className="hidden md:flex">
        {tabIds.map((id, i) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 py-3 text-xs tracking-nav uppercase font-semibold transition-all duration-200
              ${i < tabIds.length - 1 ? 'border-r border-black' : ''}
              ${activeTab === id
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-kkw-gray'
              }`}
          >
            {tabLabel(id)}
          </button>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <div className="md:hidden flex items-center justify-between px-6 py-3 border-t border-black">
        <span className="text-xs tracking-label uppercase font-semibold">
          {tabLabel(activeTab)}
        </span>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-xs tracking-label uppercase font-semibold flex items-center gap-2"
        >
          {menuOpen ? t.close : t.menu}
          <span className="text-kkw-pink font-bold">{menuOpen ? '×' : '+'}</span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="md:hidden border-t border-black">
          {tabIds.map((id, i) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setMenuOpen(false); }}
              className={`w-full py-3 px-6 text-left text-xs tracking-nav uppercase font-semibold transition-all duration-150
                ${i < tabIds.length - 1 ? 'border-b border-gray-200' : ''}
                ${activeTab === id
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-kkw-gray'
                }`}
            >
              {tabLabel(id)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
