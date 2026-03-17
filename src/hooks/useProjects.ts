import { useState, useEffect } from 'react';
import { contentfulClient, CONTENT_TYPES } from '../lib/contentful';
import type { Project } from '../data/types';

/**
 * Fetches all projects from Contentful and maps them to the Project type.
 *
 * Expected Contentful content type: "project"
 * Fields:
 *   title          Short Text
 *   categoryEn     Short Text
 *   categoryDe     Short Text
 *   descriptionEn  Long Text
 *   descriptionDe  Long Text
 *   year           Short Text    e.g. "2024 – Ongoing"
 *   status         Short Text    one of: "ongoing" | "upcoming" | "completed"
 *   gradient       Short Text    Tailwind classes
 *   image          Media (optional)
 */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    contentfulClient
      .getEntries({ content_type: CONTENT_TYPES.PROJECT, order: ['fields.year'] })
      .then(res => {
        const mapped: Project[] = res.items.map((item: any) => {
          const f = item.fields;
          return {
            id:            item.sys.id,
            title:         f.title ?? '',
            categoryEN:    f.categoryEn ?? '',
            categoryDE:    f.categoryDe ?? '',
            descriptionEN: f.descriptionEn ?? '',
            descriptionDE: f.descriptionDe ?? '',
            year:          f.year ?? '',
            status:        f.status ?? 'ongoing',
            gradient:      f.gradient ?? 'from-gray-900 to-gray-700',
            imageUrl:      f.image?.fields?.file?.url
                             ? `https:${f.image.fields.file.url}`
                             : undefined,
          };
        });
        setProjects(mapped);
      })
      .catch((err: Error) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
}
