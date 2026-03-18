import { useState, useEffect } from 'react';
import { contentfulClient, CONTENT_TYPES } from '../lib/contentful';
import type { Project, FrameworkItem, ProjectSection } from '../data/types';

/**
 * Contentful Rich Text documents come back as nested objects when a field is
 * set to "Rich Text" instead of plain "Long Text". This helper walks the
 * document tree and extracts all text node values as a single plain string,
 * so the rest of the app never needs to handle rich text nodes.
 */
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
 * Fetches all projects from Contentful and maps them to the Project type.
 *
 * Contentful content type ID: "project"
 *
 * Card fields (all projects):
 *   title          Short Text
 *   subtitle       Short Text        optional tagline
 *   categoryEn     Short Text
 *   categoryDe     Short Text
 *   descriptionEn  Long Text / Rich Text
 *   descriptionDe  Long Text / Rich Text
 *   year           Short Text        e.g. "2025 – Ongoing"
 *   status         Short Text        "ongoing" | "upcoming" | "completed"
 *   gradient       Short Text        Tailwind classes
 *   image          Media             optional
 *   featured       Boolean           true = shown as hero, false/unset = card
 *
 * Rich detail fields (featured project only):
 *   dates          Short Text        e.g. "19. – 24. September 2025"
 *   venue          Short Text
 *   city           Short Text
 *   partner        Short Text
 *   visitors       Short Text        e.g. "900+"
 *   duration       Short Text        e.g. "5 Tage / 5 Days"
 *   conceptDe      Long Text / Rich Text
 *   conceptEn      Long Text / Rich Text
 *   triggerDe      Long Text / Rich Text
 *   triggerEn      Long Text / Rich Text
 *   framework      JSON              [{ "term": "Inside", "de": "...", "en": "..." }]
 *   insideOutsideBody JSON           { "de": ["para 1", ...], "en": ["para 1", ...] }
 *   sections       JSON              [{ "name": "...", "nameEN": "...", "description": "...", "descriptionEN": "...", "artists": ["..."] }]
 */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    contentfulClient
      .getEntries({
        content_type: CONTENT_TYPES.PROJECT,
        order: ['-fields.featured', 'fields.year'] as any,
      })
      .then(res => {
        const mapped: Project[] = res.items.map((item: any) => {
          const f = item.fields;
          return {
            // Card fields
            id:            item.sys.id,
            title:         f.title ?? '',
            subtitle:      f.subtitle ?? undefined,
            categoryEN:    f.categoryEn ?? '',
            categoryDE:    f.categoryDe ?? '',
            descriptionEN: richTextToPlain(f.descriptionEn),
            descriptionDE: richTextToPlain(f.descriptionDe),
            year:          f.year ?? '',
            status:        f.status ?? 'ongoing',
            gradient:      f.gradient ?? 'from-gray-900 to-gray-700',
            imageUrl:      f.image?.fields?.file?.url
                             ? `https:${f.image.fields.file.url}`
                             : undefined,
            featured:      f.featured ?? false,

            // Rich detail fields (only populated for featured project)
            dates:             f.dates ?? undefined,
            venue:             f.venue ?? undefined,
            city:              f.city ?? undefined,
            partner:           f.partner ?? undefined,
            visitors:          f.visitors ?? undefined,
            duration:          f.duration ?? undefined,
            conceptDE:         f.conceptDe ? richTextToPlain(f.conceptDe) : undefined,
            conceptEN:         f.conceptEn ? richTextToPlain(f.conceptEn) : undefined,
            triggerDE:         f.triggerDe ? richTextToPlain(f.triggerDe) : undefined,
            triggerEN:         f.triggerEn ? richTextToPlain(f.triggerEn) : undefined,
            framework:         f.framework as FrameworkItem[] | undefined,
            insideOutsideBody: f.insideOutsideBody as { de: string[]; en: string[] } | undefined,
            sections:          f.sections as ProjectSection[] | undefined,
          };
        });
        setProjects(mapped);
      })
      .catch((err: Error) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
}
