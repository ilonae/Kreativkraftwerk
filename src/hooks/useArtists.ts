import { useState, useEffect } from 'react';
import { contentfulClient, CONTENT_TYPES } from '../lib/contentful';
import type { Artist } from '../data/types';

function richTextToPlain(value: unknown): string {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';
  const node = value as Record<string, unknown>;
  if (node.nodeType === 'text' && typeof node.value === 'string') return node.value;
  if (Array.isArray(node.content)) {
    return (node.content as unknown[])
      .map(richTextToPlain)
      .join('')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
  return '';
}

/**
 * Fetches all artists from Contentful and maps them to the Artist type.
 *
 * Expected Contentful content type: "artist"
 * Fields:
 *   name      Short Text
 *   field     Short Text       e.g. "Architecture & Spatial Design"
 *   contact   Short Text       email address
 *   bio       Long Text (optional)
 *   photo     Media (optional)
 *   gradient  Short Text (optional)  Tailwind classes for placeholder
 */
export function useArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    contentfulClient
      .getEntries({ content_type: CONTENT_TYPES.ARTIST, order: ['fields.name'] })
      .then(res => {
        const mapped: Artist[] = res.items.map((item: any) => {
          const f = item.fields;
          return {
            id:       item.sys.id,
            name:     f.name ?? '',
            field:    f.field ?? '',
            contact:  f.contact ?? '',
            bio:      f.bio ? richTextToPlain(f.bio) : undefined,
            imageUrl: f.photo?.fields?.file?.url
                        ? `https:${f.photo.fields.file.url}`
                        : undefined,
            gradient: f.gradient,
          };
        });
        setArtists(mapped);
      })
      .catch((err: Error) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { artists, loading, error };
}
