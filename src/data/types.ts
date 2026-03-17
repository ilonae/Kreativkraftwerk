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

export interface ExhibitionSection {
  name: string;
  nameEN: string;
  description: string;
  descriptionEN: string;
  artists: string[];
}

export interface Exhibition {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  venue: string;
  city: string;
  gradient: string;
  imageUrl?: string;
  current: boolean;
  featured?: boolean;

  // Rich detail — optional, populated per exhibition
  partner?: string;
  visitors?: string;
  duration?: string;
  conceptDE?: string;
  conceptEN?: string;
  triggerDE?: string;
  triggerEN?: string;
  framework?: FrameworkItem[];
  insideOutsideBody?: { de: string[]; en: string[] };
  sections?: ExhibitionSection[];
}

export interface Project {
  id: string;
  title: string;
  categoryEN: string;
  categoryDE: string;
  descriptionEN: string;
  descriptionDE: string;
  year: string;
  status: 'ongoing' | 'upcoming' | 'completed';
  gradient: string;
  imageUrl?: string;
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
  event: string;
}
