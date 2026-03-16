import React from 'react';
import { useLang } from '../context/LanguageContext';
import translations from '../i18n/translations';

interface Project {
  id: number;
  title: string;
  categoryEN: string;
  categoryDE: string;
  descriptionEN: string;
  descriptionDE: string;
  year: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  gradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Stadtgespräche',
    categoryEN: 'Urban Dialogue Series',
    categoryDE: 'Urbane Dialogreihe',
    descriptionEN: "A long-term series of public conversations between artists, architects, and residents exploring the evolving identity of Berlin's neighbourhoods.",
    descriptionDE: 'Eine langfristige Reihe öffentlicher Gespräche zwischen Künstler*innen, Architekt*innen und Anwohner*innen, die die sich verändernde Identität der Berliner Kieze erkundet.',
    year: '2024 – Ongoing',
    status: 'ongoing',
    gradient: 'from-zinc-900 to-stone-700',
  },
  {
    id: 2,
    title: 'Digital Archive',
    categoryEN: 'Collective Memory',
    categoryDE: 'Kollektives Gedächtnis',
    descriptionEN: 'An open-access digital repository documenting the work, processes, and histories of the collective and its members across disciplines.',
    descriptionDE: 'Ein frei zugängliches digitales Archiv, das die Arbeit, Prozesse und Geschichte des Kollektivs und seiner Mitglieder über alle Disziplinen hinweg dokumentiert.',
    year: '2023 – Ongoing',
    status: 'ongoing',
    gradient: 'from-slate-900 to-indigo-800',
  },
  {
    id: 3,
    title: 'Workshop Series',
    categoryEN: 'Community Engagement',
    categoryDE: 'Community Engagement',
    descriptionEN: 'Regular interdisciplinary workshops bringing together practitioners from art, technology, architecture, and social sciences.',
    descriptionDE: 'Regelmäßige interdisziplinäre Workshops, die Praktiker*innen aus Kunst, Technologie, Architektur und Sozialwissenschaften zusammenbringen.',
    year: '2025',
    status: 'ongoing',
    gradient: 'from-neutral-800 to-zinc-600',
  },
  {
    id: 4,
    title: 'KKW Journal',
    categoryEN: 'Publication',
    categoryDE: 'Publikation',
    descriptionEN: 'A biannual printed and digital publication featuring essays, interviews, and artistic contributions from collective members and invited voices.',
    descriptionDE: 'Eine halbjährliche gedruckte und digitale Publikation mit Essays, Interviews und künstlerischen Beiträgen von Kollektivmitgliedern und eingeladenen Stimmen.',
    year: '2024 – Ongoing',
    status: 'ongoing',
    gradient: 'from-stone-800 to-amber-900',
  },
  {
    id: 5,
    title: 'Residency Exchange',
    categoryEN: 'International Residency',
    categoryDE: 'Internationales Residenzprogramm',
    descriptionEN: 'An artist residency programme facilitating exchanges between Berlin and partner cities, inviting international practitioners to collaborate with the collective.',
    descriptionDE: 'Ein Künstler*innen-Residenzprogramm, das den Austausch zwischen Berlin und Partnerstädten ermöglicht und internationale Praktiker*innen zur Zusammenarbeit mit dem Kollektiv einlädt.',
    year: '2026',
    status: 'upcoming',
    gradient: 'from-gray-800 to-slate-700',
  },
  {
    id: 6,
    title: 'Sound Garden',
    categoryEN: 'Sound Art Installation',
    categoryDE: 'Klangkunst-Installation',
    descriptionEN: 'A site-specific sound installation created in collaboration with musicians, architects, and landscape designers. Exhibited across three outdoor venues.',
    descriptionDE: 'Eine ortsspezifische Klanginstallation, entwickelt in Zusammenarbeit mit Musiker*innen, Architekt*innen und Landschaftsdesigner*innen. An drei Outdoor-Veranstaltungsorten präsentiert.',
    year: '2023',
    status: 'completed',
    gradient: 'from-zinc-700 to-neutral-600',
  },
];

const statusColors: Record<string, string> = {
  ongoing: 'text-kkw-pink',
  upcoming: 'text-blue-500',
  completed: 'text-gray-400',
};

export default function Projects() {
  const { lang } = useLang();
  const t = translations[lang].projects;

  const ongoing = projects.filter(p => p.status === 'ongoing');
  const upcoming = projects.filter(p => p.status === 'upcoming');
  const completed = projects.filter(p => p.status === 'completed');

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <span className="text-xs tracking-label uppercase font-semibold text-black">Berlin</span>
        <span className="text-kkw-pink">→</span>
        <span className="text-xs tracking-label uppercase text-gray-500">{t.breadcrumb}</span>
      </div>

      {[
        { label: t.active, items: ongoing },
        { label: t.upcoming, items: upcoming },
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
                {/* Image area */}
                <div
                  className={`relative bg-gradient-to-br ${project.gradient} overflow-hidden`}
                  style={{ aspectRatio: '16/9' }}
                >
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 75%)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <span className={`absolute top-3 left-3 text-xs tracking-label uppercase font-semibold px-2 py-1 bg-white bg-opacity-90 ${statusColors[project.status]}`}>
                    {t.statusLabels[project.status]}
                  </span>
                </div>

                {/* Text */}
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
    </div>
  );
}
