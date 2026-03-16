import { useState } from 'react';
import ExhibitionDetail from '../components/ExhibitionDetail';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

interface Exhibition {
  id: number;
  title: string;
  subtitle: string;
  dates: string;
  venue: string;
  city: string;
  current: boolean;
  featured?: boolean;
  gradient: string;
}

const exhibitions: Exhibition[] = [
  /* ── Real exhibition ──────────────────────────────────────────────── */
  {
    id: 1,
    title: "Spit on H*tler's Grave",
    subtitle: 'inside threating history — outside totalarity — besides democracy',
    dates: '19. – 24. September 2024',
    venue: 'Stadtwerkstatt Friedrichshain-Kreuzberg',
    city: 'Berlin',
    current: false,
    featured: true,
    gradient: 'from-red-900 via-zinc-900 to-black',
  },
  /* ── Placeholder exhibitions ──────────────────────────────────────── */
  {
    id: 2,
    title: 'Material Dialogues',
    subtitle: 'Group Show',
    dates: 'Feb 10 – Apr 12, 2026',
    venue: 'Kunsthaus Mitte',
    city: 'Berlin',
    current: true,
    gradient: 'from-stone-800 via-amber-900 to-stone-700',
  },
  {
    id: 3,
    title: 'Urban Traces',
    subtitle: 'Installation & Photography',
    dates: 'Jan 15 – Mar 28, 2026',
    venue: 'Galerie im Turm',
    city: 'Berlin',
    current: true,
    gradient: 'from-slate-900 via-slate-700 to-indigo-900',
  },
  {
    id: 4,
    title: 'Bodies in Space',
    subtitle: 'Performance & Video',
    dates: 'Dec 1, 2025 – Feb 14, 2026',
    venue: 'HAU Hebbel am Ufer',
    city: 'Berlin',
    current: false,
    gradient: 'from-neutral-800 via-neutral-600 to-zinc-500',
  },
  {
    id: 5,
    title: 'Network States',
    subtitle: 'Digital Exhibition',
    dates: 'Nov 5, 2025 – Jan 10, 2026',
    venue: 'Kunstverein Berlin',
    city: 'Berlin',
    current: false,
    gradient: 'from-gray-900 via-gray-700 to-slate-800',
  },
  {
    id: 6,
    title: 'Peripheral Voices',
    subtitle: 'Mixed Media',
    dates: 'Oct 3 – Dec 7, 2025',
    venue: 'Berlinische Galerie',
    city: 'Berlin',
    current: false,
    gradient: 'from-zinc-700 via-stone-600 to-amber-800',
  },
  {
    id: 7,
    title: 'Common Ground',
    subtitle: 'Community Art',
    dates: 'Sep 12 – Nov 15, 2025',
    venue: 'Tempelhof Feld',
    city: 'Berlin',
    current: false,
    gradient: 'from-stone-900 via-zinc-800 to-neutral-700',
  },
];

export default function Exhibitions() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { lang } = useLang();
  const t = translations[lang].exhibitions;

  /* Show detail view */
  if (selectedId !== null) {
    return (
      <ExhibitionDetail
        exhibitionId={selectedId}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  const featured = exhibitions.find(e => e.featured);
  const current = exhibitions.filter(e => e.current && !e.featured);
  const past = exhibitions.filter(e => !e.current && !e.featured);

  const allRegular = [
    ...current,
    ...past,
  ].filter(ex =>
    searchQuery === '' ||
    ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ex.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">

      {/* ── Page header bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-xs tracking-label uppercase text-gray-500">
          <span className="font-semibold text-black">Berlin</span>
          <span className="text-kkw-pink">→</span>
          <span>{t.breadcrumb}</span>
        </div>
        <div className="flex items-center gap-3">
          {searchOpen && (
            <input
              autoFocus
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="text-xs tracking-label border-b border-black outline-none px-1 py-0.5 w-48 placeholder-gray-300"
            />
          )}
          <button
            onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setSearchQuery(''); }}
            className="text-xs tracking-label uppercase font-semibold border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors duration-200"
          >
            {searchOpen ? t.close : t.search}
          </button>
        </div>
      </div>

      {/* ── Featured exhibition hero ── */}
      {featured && !searchQuery && (
        <div
          className="group cursor-pointer border-b border-black relative overflow-hidden"
          onClick={() => setSelectedId(featured.id)}
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${featured.gradient}`} />

          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

          {/* Content */}
          <div className="relative px-8 py-16 md:py-20 text-white">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs tracking-label uppercase font-semibold text-kkw-pink border border-kkw-pink px-3 py-1">
                    {t.featuredTag}
                  </span>
                  <span className="text-xs tracking-label uppercase text-gray-400">
                    Berlin, 2024
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
                  <div>
                    <p className="text-3xl font-bold text-kkw-pink">900+</p>
                    <p className="text-xs tracking-label uppercase text-gray-400">{t.visitors}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">5</p>
                    <p className="text-xs tracking-label uppercase text-gray-400">{t.days}</p>
                  </div>
                </div>
                <span className="text-xs tracking-label uppercase font-semibold border border-white border-opacity-40 px-4 py-2 group-hover:border-kkw-pink group-hover:text-kkw-pink transition-colors duration-200">
                  {t.viewExhibition}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Currently Showing ── */}
      {current.length > 0 && (
        <div>
          <div className="px-6 py-3 border-b border-gray-100">
            <span className="text-xs tracking-label uppercase font-semibold text-kkw-pink">
              {t.currentlyShowing}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-black">
            {current.map((ex, i) => (
              <ExhibitionCard
                key={ex.id}
                exhibition={ex}
                index={i}
                total={current.length}
                onClick={() => setSelectedId(ex.id)}
                currentLabel={t.currentlyShowing}
                viewLabel={t.view}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Past / all other exhibitions ── */}
      {allRegular.filter(e => !e.current).length > 0 && (
        <div>
          <div className="px-6 py-3 border-b border-gray-100">
            <span className="text-xs tracking-label uppercase font-semibold text-gray-400">
              {t.pastExhibitions}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-black">
            {allRegular.filter(e => !e.current).map((ex, i, arr) => (
              <ExhibitionCard
                key={ex.id}
                exhibition={ex}
                index={i}
                total={arr.length}
                onClick={() => setSelectedId(ex.id)}
                currentLabel={t.currentlyShowing}
                viewLabel={t.view}
              />
            ))}
          </div>
        </div>
      )}

      {searchQuery && allRegular.length === 0 && (
        <div className="px-6 py-24 text-center">
          <p className="text-xs tracking-label uppercase text-gray-400">{t.noResults}</p>
        </div>
      )}
    </div>
  );
}

/* ── Card component ───────────────────────────────────────────────────── */
function ExhibitionCard({
  exhibition: ex,
  index: i,
  total,
  onClick,
  currentLabel,
  viewLabel,
}: {
  exhibition: Exhibition;
  index: number;
  total: number;
  onClick: () => void;
  currentLabel: string;
  viewLabel: string;
}) {
  return (
    <div
      className={`group cursor-pointer bg-white overflow-hidden
        ${i < total - 1 ? 'border-r border-gray-200' : ''}`}
      onClick={onClick}
    >
      {/* Image placeholder */}
      <div
        className={`relative bg-gradient-to-br ${ex.gradient} overflow-hidden`}
        style={{ aspectRatio: '4/3' }}
      >
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-white text-xs tracking-label uppercase bg-black bg-opacity-60 px-2 py-1">
            {viewLabel}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-4 border-t border-gray-100">
        {ex.current && (
          <span className="block text-xs tracking-label uppercase text-kkw-pink font-semibold mb-1">
            {currentLabel}
          </span>
        )}
        <h3 className="text-sm font-bold leading-tight mb-1 group-hover:text-kkw-pink transition-colors duration-200">
          {ex.title}
        </h3>
        <p className="text-xs text-gray-500 mb-0.5">{ex.subtitle}</p>
        <p className="text-xs text-gray-400">{ex.dates}</p>
        <p className="text-xs text-gray-400">{ex.venue}, {ex.city}</p>
      </div>
    </div>
  );
}
