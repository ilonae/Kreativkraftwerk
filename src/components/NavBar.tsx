import React, { useState } from 'react';

interface NavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: 'exhibitions', label: 'Exhibitions' },
  { id: 'projects', label: 'Projects' },
  { id: 'collective-network', label: 'Collective Network' },
  { id: 'approach', label: 'Approach' },
  { id: 'contact', label: 'Contact' },
  { id: 'about', label: 'About' },
];

export default function NavBar({ activeTab, setActiveTab }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black">
      {/* Top bar: logo + city */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-black">
        <button
          onClick={() => setActiveTab('exhibitions')}
          className="text-base font-bold tracking-display uppercase hover:text-kkw-pink transition-colors duration-200"
        >
          KreativKraftwerk
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs tracking-label uppercase font-medium">Berlin</span>
          <span className="text-kkw-pink text-sm font-bold">→</span>
          <span className="text-xs tracking-label uppercase text-gray-400 hidden sm:inline">
            Andere Orte in Zukunft
          </span>
        </div>
      </div>

      {/* Desktop tab navigation */}
      <nav className="hidden md:flex">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-xs tracking-nav uppercase font-semibold transition-all duration-200
              ${i < tabs.length - 1 ? 'border-r border-black' : ''}
              ${activeTab === tab.id
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-kkw-gray'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <div className="md:hidden flex items-center justify-between px-6 py-3 border-t border-black">
        <span className="text-xs tracking-label uppercase font-semibold">
          {tabs.find(t => t.id === activeTab)?.label}
        </span>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-xs tracking-label uppercase font-semibold flex items-center gap-2"
        >
          {menuOpen ? 'Close' : 'Menu'}
          <span className="text-kkw-pink font-bold">{menuOpen ? '×' : '+'}</span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="md:hidden border-t border-black">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
              className={`w-full py-3 px-6 text-left text-xs tracking-nav uppercase font-semibold transition-all duration-150
                ${i < tabs.length - 1 ? 'border-b border-gray-200' : ''}
                ${activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-kkw-gray'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
