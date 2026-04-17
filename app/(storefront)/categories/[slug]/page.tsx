import { createServerClient } from '@/lib/supabase/server';
import { Category, Product } from '@/lib/types';
import { notFound } from 'next/navigation';
import CategoryPageClient from '@/components/storefront/CategoryPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  let category: Category | null = null;
  let products: Product[] = [];

  try {
    const supabase = createServerClient();

    const { data: cat } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!cat) {
      notFound();
    }

    category = cat as Category;

    const { data: prods } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', category.id)
      .order('sort_order', { ascending: true });

    products = (prods as Product[]) || [];
  } catch {
    notFound();
  }

  return <CategoryPageClient category={category} products={products} />;
}
