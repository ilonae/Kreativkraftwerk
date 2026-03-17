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

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  dates: string;
  venue: string;
  city: string;
  gradient: string;
  imageUrl?: string;
  current: boolean;
  featured?: boolean;

  // ── Rich detail fields (optional — populated per exhibition) ──────────
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

export interface Milestone {
  id: number;
  year: string;
  event: string;
}

export interface Artist {
  id: number;
  name: string;
  bio?: string;
  field: string;
  contact: string;
  imageUrl?: string;
  gradient?: string;
}
