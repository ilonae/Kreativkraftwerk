import { useState, useEffect } from 'react';
import { contentfulClient, CONTENT_TYPES } from '../lib/contentful';
import type { Milestone } from '../data/types';

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
 * Fetches all milestones from Contentful, ordered by year ascending.
 *
 * Contentful content type ID: "milestone"
 * Fields:
 *   year     Short Text
 *   eventDe  Long Text or Rich Text
 *   eventEn  Long Text or Rich Text
 */
export function useMilestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    contentfulClient
      .getEntries({ content_type: CONTENT_TYPES.MILESTONE, order: ['fields.year'] })
      .then(res => {
        const mapped: Milestone[] = res.items.map((item: any) => ({
          id:      item.sys.id,
          year:    item.fields.year ?? '',
          eventDe: richTextToPlain(item.fields.eventDe),
          eventEn: richTextToPlain(item.fields.eventEn),
        }));
        setMilestones(mapped);
      })
      .catch((err: Error) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { milestones, loading, error };
}
