// ─────────────────────────────────────────────────────────────────────────────
// Shared domain types
// These are the *application* types — decoupled from both the UI and from
// whatever data source is used (Contentful, JSON, etc.).
// The data hooks in src/hooks/ are responsible for mapping raw API / JSON
// responses into these types before they reach any component.
// ─────────────────────────────────────────────────────────────────────────────

export interface FrameworkItem {
  term: string;
  de: string;
  en: string;
}

export interface ProjectSection {
  name: string;
  nameEN: string;
  description: string;
  descriptionEN: string;
  artists: string[];
}

/**
 * Unified project type. Every entry in Contentful's `project` content type
 * maps to this shape. Simple card projects only populate the top fields;
 * the featured project additionally populates the rich detail fields below.
 */
export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  categoryEN: string;
  categoryDE: string;
  descriptionEN: string;
  descriptionDE: string;
  year: string;
  status: 'ongoing' | 'upcoming' | 'completed';
  gradient: string;
  imageUrl?: string;

  // Featured / exhibition-level fields — only set on the main project
  featured?: boolean;
  dates?: string;
  venue?: string;
  city?: string;
  partner?: string;
  visitors?: string;
  duration?: string;
  conceptDE?: string;
  conceptEN?: string;
  triggerDE?: string;
  triggerEN?: string;
  framework?: FrameworkItem[];
  insideOutsideBody?: { de: string[]; en: string[] };
  sections?: ProjectSection[];
}

export interface Artist {
  id: string;
  name: string;
  field: string;
  contact: string;
  bio?: string;
  imageUrl?: string;
  gradient?: string;
}

export interface Milestone {
  id: string;
  year: string;
  eventDe: string;
  eventEn: string;
}
