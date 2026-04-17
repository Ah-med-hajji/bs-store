import { createServerClient } from '@/lib/supabase/server';
import { Category } from '@/lib/types';
import HomePageClient from '@/components/storefront/HomePageClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let categories: Category[] = [];

  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });
    categories = (data as Category[]) || [];
  } catch {
    // Will render without categories if Supabase is not configured yet
  }

  return <HomePageClient categories={categories} />;
}
