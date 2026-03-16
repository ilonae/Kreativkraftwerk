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
    imageUrl?: string;      // NEW: public/images/artists/...
    gradient?: string;      // Fallback if no image
  }
  