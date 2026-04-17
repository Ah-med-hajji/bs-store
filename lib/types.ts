/* BS Store — TypeScript Types */

export type Language = 'fr' | 'en';

export interface Category {
  id: string;
  slug: string;
  name_fr: string;
  name_en: string;
  subtitle_fr: string;
  subtitle_en: string;
  card_desc_fr: string | null;
  card_desc_en: string | null;
  desc_fr: string | null;
  desc_en: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  slug: string;
  name_fr: string;
  name_en: string;
  price: number;
  badge: string | null;
  image_url: string | null;
  sizes: string[] | null;
  sort_order: number;
  created_at: string;
}

export interface CartItem {
  id: string;
  name_fr: string;
  name_en: string;
  price: number;
  image: string;
  size: string | null;
  quantity: number;
  categorySlug: string;
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}
