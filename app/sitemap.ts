import { MetadataRoute } from 'next';
import { createServerClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bs-store.tn';

  let categorySlugs: string[] = [];
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from('categories')
      .select('slug')
      .order('sort_order', { ascending: true });
    categorySlugs = (data || []).map((c: { slug: string }) => c.slug);
  } catch {
    // Fallback if Supabase not configured
    categorySlugs = [
      'tshirts-polos',
      'pants-chinos',
      'jackets-coats',
      'hoodies-sweatshirts',
      'shirts',
      'accessories',
    ];
  }

  const categoryEntries = categorySlugs.map((slug) => ({
    url: `${baseUrl}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...categoryEntries,
  ];
}
