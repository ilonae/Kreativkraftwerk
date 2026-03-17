import { useState, useEffect } from 'react';
import { contentfulClient, CONTENT_TYPES } from '../lib/contentful';
import type { Exhibition, FrameworkItem, ExhibitionSection } from '../data/types';

/**
 * Fetches all exhibitions from Contentful and maps them to the Exhibition type.
 *
 * Expected Contentful content type: "exhibition"
 * Fields:
 *   title          Short Text
 *   subtitle       Short Text
 *   dates          Short Text          e.g. "19. – 24. September 2024"
 *   venue          Short Text
 *   city           Short Text
 *   gradient       Short Text          Tailwind classes e.g. "from-red-900 via-zinc-900 to-black"
 *   image          Media (optional)
 *   current        Boolean
 *   featured       Boolean (optional)
 *   partner        Short Text (optional)
 *   visitors       Short Text (optional)  e.g. "900+"
 *   duration       Short Text (optional)
 *   conceptDe      Long Text (optional)
 *   conceptEn      Long Text (optional)
 *   triggerDe      Long Text (optional)
 *   triggerEn      Long Text (optional)
 *   framework      JSON Object (optional)  [{ term, de, en }]
 *   insideOutsideBody  JSON Object (optional)  { de: string[], en: string[] }
 *   sections       JSON Object (optional)  [{ name, nameEN, description, descriptionEN, artists }]
 */
export function useExhibitions() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    contentfulClient
      .getEntries({ content_type: CONTENT_TYPES.EXHIBITION, order: ['-fields.featured', '-sys.createdAt'] })
      .then(res => {
        const mapped: Exhibition[] = res.items.map((item: any) => {
          const f = item.fields;
          return {
            id:               item.sys.id,
            title:            f.title ?? '',
            subtitle:         f.subtitle ?? '',
            dates:            f.dates ?? '',
            venue:            f.venue ?? '',
            city:             f.city ?? '',
            gradient:         f.gradient ?? 'from-gray-900 to-gray-700',
            imageUrl:         f.image?.fields?.file?.url
                                ? `https:${f.image.fields.file.url}`
                                : undefined,
            current:          f.current ?? false,
            featured:         f.featured ?? false,
            partner:          f.partner,
            visitors:         f.visitors,
            duration:         f.duration,
            conceptDE:        f.conceptDe,
            conceptEN:        f.conceptEn,
            triggerDE:        f.triggerDe,
            triggerEN:        f.triggerEn,
            framework:        f.framework as FrameworkItem[] | undefined,
            insideOutsideBody: f.insideOutsideBody as { de: string[]; en: string[] } | undefined,
            sections:         f.sections as ExhibitionSection[] | undefined,
          };
        });
        setExhibitions(mapped);
      })
      .catch((err: Error) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { exhibitions, loading, error };
}
