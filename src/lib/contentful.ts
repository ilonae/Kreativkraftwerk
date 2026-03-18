import { createClient } from 'contentful';

/**
 * Contentful delivery client.
 * Reads credentials from .env (Vite exposes VITE_* vars via import.meta.env).
 *
 * Required env vars — see .env.example:
 *   VITE_CONTENTFUL_SPACE_ID
 *   VITE_CONTENTFUL_ACCESS_TOKEN
 */
export const contentfulClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

/**
 * Content type IDs as defined in the Contentful dashboard.
 * Update these if you rename a content type.
 */
export const CONTENT_TYPES = {
  EXHIBITION: 'exhibition',
  ARTIST:     'artist',
  PROJECT:    'project',
  MILESTONE:  'milestone',
} as const;
