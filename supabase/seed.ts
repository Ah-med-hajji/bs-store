/* BS Store — Seed Script
   Run with: npx tsx supabase/seed.ts
   Seeds categories and products from the original static data. */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

interface CategorySeed {
  slug: string;
  name_fr: string;
  name_en: string;
  subtitle_fr: string;
  subtitle_en: string;
  card_desc_fr: string;
  card_desc_en: string;
  desc_fr: string;
  desc_en: string;
  image_url: string;
  sort_order: number;
}

interface ProductSeed {
  slug: string;
  category_slug: string;
  name_fr: string;
  name_en: string;
  price: number;
  badge: string | null;
  image_url: string;
  sizes: string[] | null;
  sort_order: number;
}

const categories: CategorySeed[] = [
  {
    slug: 'tshirts-polos',
    name_fr: 'T-shirts & Polos',
    name_en: 'T-shirts & Polos',
    subtitle_fr: 'Notre Sélection',
    subtitle_en: 'Our Selection',
    card_desc_fr: 'Basiques essentiels et polos premium',
    card_desc_en: 'Essential basics and premium polos',
    desc_fr: 'Découvrez notre collection de t-shirts et polos premium. Des basiques essentiels aux pièces tendance, chaque article est sélectionné pour sa qualité et son style.',
    desc_en: 'Discover our collection of premium t-shirts and polos. From essential basics to trend-forward pieces, every item is selected for quality and style.',
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop&q=80',
    sort_order: 0,
  },
  {
    slug: 'pants-chinos',
    name_fr: 'Pantalons & Chinos',
    name_en: 'Pants & Chinos',
    subtitle_fr: 'Notre Sélection',
    subtitle_en: 'Our Selection',
    card_desc_fr: 'Coupe slim, chino et cargo',
    card_desc_en: 'Slim fit, chino and cargo',
    desc_fr: 'Pantalons et chinos confectionnés pour le confort et le style. Des coupes slim aux modèles décontractés, trouvez le pantalon parfait pour chaque occasion.',
    desc_en: 'Pants and chinos crafted for comfort and style. From slim fits to relaxed models, find the perfect pair for every occasion.',
    image_url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=600&fit=crop&q=80',
    sort_order: 1,
  },
  {
    slug: 'jackets-coats',
    name_fr: 'Vestes & Manteaux',
    name_en: 'Jackets & Coats',
    subtitle_fr: 'Notre Sélection',
    subtitle_en: 'Our Selection',
    card_desc_fr: 'Bombers, vestes et overshirts',
    card_desc_en: 'Bombers, jackets and overshirts',
    desc_fr: 'Des vestes structurées aux bombers classiques, notre collection de vestes allie style et fonctionnalité. Des pièces intemporelles pour chaque saison.',
    desc_en: 'From structured jackets to classic bombers, our jacket collection combines style and functionality. Timeless pieces for every season.',
    image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop&q=80',
    sort_order: 2,
  },
  {
    slug: 'hoodies-sweatshirts',
    name_fr: 'Hoodies & Sweatshirts',
    name_en: 'Hoodies & Sweatshirts',
    subtitle_fr: 'Notre Sélection',
    subtitle_en: 'Our Selection',
    card_desc_fr: 'Confort et style au quotidien',
    card_desc_en: 'Comfort and style every day',
    desc_fr: 'Hoodies et sweatshirts premium pour un confort sans compromis. Des pièces polyvalentes qui vous accompagnent au quotidien.',
    desc_en: 'Premium hoodies and sweatshirts for uncompromising comfort. Versatile pieces that keep you company every day.',
    image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop&q=80',
    sort_order: 3,
  },
  {
    slug: 'shirts',
    name_fr: 'Chemises',
    name_en: 'Shirts',
    subtitle_fr: 'Notre Sélection',
    subtitle_en: 'Our Selection',
    card_desc_fr: 'Lin, oxford et flanelle',
    card_desc_en: 'Linen, oxford and flannel',
    desc_fr: 'Chemises en lin, oxford et flanelle pour un style soigné sans effort. De la chemise classique au modèle décontracté.',
    desc_en: 'Linen, oxford and flannel shirts for effortless style. From classic to casual, find your perfect shirt.',
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=600&fit=crop&q=80',
    sort_order: 4,
  },
  {
    slug: 'accessories',
    name_fr: 'Accessoires',
    name_en: 'Accessories',
    subtitle_fr: 'Notre Sélection',
    subtitle_en: 'Our Selection',
    card_desc_fr: 'Ceintures, montres et plus',
    card_desc_en: 'Belts, watches and more',
    desc_fr: 'Complétez votre look avec nos accessoires soigneusement sélectionnés. Ceintures, montres, casquettes et bien plus encore.',
    desc_en: 'Complete your look with our carefully curated accessories. Belts, watches, caps and more.',
    image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=600&fit=crop&q=80',
    sort_order: 5,
  },
];

const products: ProductSeed[] = [
  // T-shirts & Polos
  { slug: 'classic-oversized-tee', category_slug: 'tshirts-polos', name_fr: 'T-shirt Oversize Classique', name_en: 'Classic Oversized Tee', price: 49, badge: 'NEW', image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 0 },
  { slug: 'essential-crew-neck', category_slug: 'tshirts-polos', name_fr: 'T-shirt Col Rond Essentiel', name_en: 'Essential Crew Neck Tee', price: 39, badge: null, image_url: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 1 },
  { slug: 'striped-polo', category_slug: 'tshirts-polos', name_fr: 'Polo Rayé', name_en: 'Striped Polo', price: 55, badge: null, image_url: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 2 },
  { slug: 'vintage-wash-tee', category_slug: 'tshirts-polos', name_fr: 'T-shirt Vintage Lavage', name_en: 'Vintage Wash Tee', price: 45, badge: null, image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 3 },
  { slug: 'premium-heavyweight-tee', category_slug: 'tshirts-polos', name_fr: 'T-shirt Premium Heavyweight', name_en: 'Premium Heavyweight Tee', price: 59, badge: null, image_url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=750&fit=crop&q=80', sizes: ['M', 'L', 'XL', 'XXL'], sort_order: 4 },
  // Pants & Chinos
  { slug: 'slim-fit-chinos', category_slug: 'pants-chinos', name_fr: 'Chinos Slim Fit', name_en: 'Slim Fit Chinos', price: 79, badge: null, image_url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 0 },
  { slug: 'relaxed-cargo-pants', category_slug: 'pants-chinos', name_fr: 'Pantalon Cargo Décontracté', name_en: 'Relaxed Cargo Pants', price: 89, badge: 'NEW', image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 1 },
  { slug: 'tailored-trousers', category_slug: 'pants-chinos', name_fr: 'Pantalon Sur Mesure', name_en: 'Tailored Trousers', price: 99, badge: null, image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 2 },
  { slug: 'stretch-joggers', category_slug: 'pants-chinos', name_fr: 'Joggers Stretch', name_en: 'Stretch Joggers', price: 69, badge: null, image_url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 3 },
  { slug: 'classic-straight-chinos', category_slug: 'pants-chinos', name_fr: 'Chinos Classique Droit', name_en: 'Classic Straight Chinos', price: 75, badge: null, image_url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 4 },
  // Jackets & Coats
  { slug: 'structured-jacket', category_slug: 'jackets-coats', name_fr: 'Veste Structurée', name_en: 'Structured Jacket', price: 149, badge: null, image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 0 },
  { slug: 'bomber-jacket', category_slug: 'jackets-coats', name_fr: 'Veste Bomber', name_en: 'Bomber Jacket', price: 129, badge: 'NEW', image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop&q=80', sizes: ['M', 'L', 'XL'], sort_order: 1 },
  { slug: 'overshirt', category_slug: 'jackets-coats', name_fr: 'Overshirt', name_en: 'Overshirt', price: 109, badge: null, image_url: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 2 },
  { slug: 'quilted-vest', category_slug: 'jackets-coats', name_fr: 'Gilet Matelassé', name_en: 'Quilted Vest', price: 119, badge: null, image_url: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 3 },
  // Hoodies & Sweatshirts
  { slug: 'graphic-hoodie', category_slug: 'hoodies-sweatshirts', name_fr: 'Hoodie à Motif', name_en: 'Graphic Hoodie', price: 99, badge: null, image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 0 },
  { slug: 'zip-up-hoodie', category_slug: 'hoodies-sweatshirts', name_fr: 'Hoodie à Fermeture', name_en: 'Zip-Up Hoodie', price: 109, badge: null, image_url: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&h=750&fit=crop&q=80', sizes: ['M', 'L', 'XL'], sort_order: 1 },
  { slug: 'crew-sweatshirt', category_slug: 'hoodies-sweatshirts', name_fr: 'Sweatshirt Col Rond', name_en: 'Crew Sweatshirt', price: 79, badge: 'NEW', image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 2 },
  { slug: 'oversized-hoodie', category_slug: 'hoodies-sweatshirts', name_fr: 'Hoodie Oversize', name_en: 'Oversized Hoodie', price: 119, badge: null, image_url: 'https://images.unsplash.com/photo-1542406775-ade58c52d2e4?w=600&h=750&fit=crop&q=80', sizes: ['M', 'L', 'XL', 'XXL'], sort_order: 3 },
  // Shirts
  { slug: 'linen-button-down', category_slug: 'shirts', name_fr: 'Chemise en Lin', name_en: 'Linen Button-Down', price: 89, badge: null, image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 0 },
  { slug: 'oxford-shirt', category_slug: 'shirts', name_fr: 'Chemise Oxford', name_en: 'Oxford Shirt', price: 79, badge: null, image_url: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 1 },
  { slug: 'flannel-shirt', category_slug: 'shirts', name_fr: 'Chemise Flanelle', name_en: 'Flannel Shirt', price: 85, badge: null, image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 2 },
  { slug: 'denim-shirt', category_slug: 'shirts', name_fr: 'Chemise en Jean', name_en: 'Denim Shirt', price: 95, badge: 'NEW', image_url: 'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 3 },
  { slug: 'patterned-short-sleeve', category_slug: 'shirts', name_fr: 'Chemise Manches Courtes à Motifs', name_en: 'Patterned Short Sleeve', price: 69, badge: null, image_url: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=750&fit=crop&q=80', sizes: ['S', 'M', 'L', 'XL'], sort_order: 4 },
  // Accessories
  { slug: 'leather-belt', category_slug: 'accessories', name_fr: 'Ceinture en Cuir', name_en: 'Leather Belt', price: 45, badge: null, image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop&q=80', sizes: null, sort_order: 0 },
  { slug: 'canvas-tote', category_slug: 'accessories', name_fr: 'Sac Tote en Toile', name_en: 'Canvas Tote Bag', price: 55, badge: null, image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop&q=80', sizes: null, sort_order: 1 },
  { slug: 'classic-cap', category_slug: 'accessories', name_fr: 'Casquette Classique', name_en: 'Classic Cap', price: 35, badge: null, image_url: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&h=750&fit=crop&q=80', sizes: null, sort_order: 2 },
  { slug: 'minimalist-watch', category_slug: 'accessories', name_fr: 'Montre Minimaliste', name_en: 'Minimalist Watch', price: 89, badge: 'NEW', image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=750&fit=crop&q=80', sizes: null, sort_order: 3 },
  { slug: 'sunglasses', category_slug: 'accessories', name_fr: 'Lunettes de Soleil', name_en: 'Sunglasses', price: 65, badge: null, image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=750&fit=crop&q=80', sizes: null, sort_order: 4 },
  { slug: 'knit-tie', category_slug: 'accessories', name_fr: 'Cravate Tricotée', name_en: 'Knit Tie', price: 39, badge: null, image_url: 'https://images.unsplash.com/photo-1589465885857-44edb59bbff2?w=600&h=750&fit=crop&q=80', sizes: null, sort_order: 5 },
];

async function seed() {
  console.log('Seeding categories...');

  // Insert categories
  for (const cat of categories) {
    const { error } = await supabase.from('categories').upsert(cat, { onConflict: 'slug' });
    if (error) {
      console.error(`Error inserting category ${cat.slug}:`, error.message);
    } else {
      console.log(`  ✓ ${cat.slug}`);
    }
  }

  // Get category IDs
  const { data: insertedCategories } = await supabase
    .from('categories')
    .select('id, slug');

  const categoryMap = new Map<string, string>();
  (insertedCategories || []).forEach((c: { id: string; slug: string }) => {
    categoryMap.set(c.slug, c.id);
  });

  console.log('\nSeeding products...');

  for (const prod of products) {
    const categoryId = categoryMap.get(prod.category_slug);
    if (!categoryId) {
      console.error(`  ✗ Category not found: ${prod.category_slug}`);
      continue;
    }

    const { error } = await supabase.from('products').upsert(
      {
        slug: prod.slug,
        category_id: categoryId,
        name_fr: prod.name_fr,
        name_en: prod.name_en,
        price: prod.price,
        badge: prod.badge,
        image_url: prod.image_url,
        sizes: prod.sizes,
        sort_order: prod.sort_order,
      },
      { onConflict: 'slug' }
    );

    if (error) {
      console.error(`  ✗ ${prod.slug}:`, error.message);
    } else {
      console.log(`  ✓ ${prod.slug}`);
    }
  }

  console.log('\nDone! Seeded', categories.length, 'categories and', products.length, 'products.');
}

seed();
