/* ============================================
   BS Store — Centralized Product Data
   Single source of truth for all products
   ============================================ */

const PRODUCTS = {
  'tshirts-polos': [
    {
      id: 'classic-oversized-tee',
      nameKey: 'prod.classic_oversized',
      price: 49,
      badge: 'NEW',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'essential-crew-neck',
      nameKey: 'prod.essential_crew',
      price: 39,
      badge: null,
      image: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'striped-polo',
      nameKey: 'prod.striped_polo',
      price: 55,
      badge: null,
      image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'vintage-wash-tee',
      nameKey: 'prod.vintage_wash',
      price: 45,
      badge: null,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'premium-heavyweight-tee',
      nameKey: 'prod.premium_heavyweight',
      price: 59,
      badge: null,
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=750&fit=crop&q=80',
      sizes: ['M', 'L', 'XL', 'XXL']
    }
  ],

  'pants-chinos': [
    {
      id: 'slim-fit-chinos',
      nameKey: 'prod.slim_chinos',
      price: 79,
      badge: null,
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'relaxed-cargo-pants',
      nameKey: 'prod.relaxed_cargo',
      price: 89,
      badge: 'NEW',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'tailored-trousers',
      nameKey: 'prod.tailored_trousers',
      price: 99,
      badge: null,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'stretch-joggers',
      nameKey: 'prod.stretch_joggers',
      price: 69,
      badge: null,
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'classic-straight-chinos',
      nameKey: 'prod.classic_chinos',
      price: 75,
      badge: null,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    }
  ],

  'jackets-coats': [
    {
      id: 'structured-jacket',
      nameKey: 'prod.structured_jacket',
      price: 149,
      badge: null,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'bomber-jacket',
      nameKey: 'prod.bomber_jacket',
      price: 129,
      badge: 'NEW',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop&q=80',
      sizes: ['M', 'L', 'XL']
    },
    {
      id: 'overshirt',
      nameKey: 'prod.overshirt',
      price: 109,
      badge: null,
      image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'quilted-vest',
      nameKey: 'prod.quilted_vest',
      price: 119,
      badge: null,
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    }
  ],

  'hoodies-sweatshirts': [
    {
      id: 'graphic-hoodie',
      nameKey: 'prod.graphic_hoodie',
      price: 99,
      badge: null,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'zip-up-hoodie',
      nameKey: 'prod.zip_up_hoodie',
      price: 109,
      badge: null,
      image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&h=750&fit=crop&q=80',
      sizes: ['M', 'L', 'XL']
    },
    {
      id: 'crew-sweatshirt',
      nameKey: 'prod.crew_sweatshirt',
      price: 79,
      badge: 'NEW',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'oversized-hoodie',
      nameKey: 'prod.oversized_hoodie',
      price: 119,
      badge: null,
      image: 'https://images.unsplash.com/photo-1542406775-ade58c52d2e4?w=600&h=750&fit=crop&q=80',
      sizes: ['M', 'L', 'XL', 'XXL']
    }
  ],

  'shirts': [
    {
      id: 'linen-button-down',
      nameKey: 'prod.linen_button_down',
      price: 89,
      badge: null,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'oxford-shirt',
      nameKey: 'prod.oxford_shirt',
      price: 79,
      badge: null,
      image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'flannel-shirt',
      nameKey: 'prod.flannel_shirt',
      price: 85,
      badge: null,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'denim-shirt',
      nameKey: 'prod.denim_shirt',
      price: 95,
      badge: 'NEW',
      image: 'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'patterned-short-sleeve',
      nameKey: 'prod.patterned_short_sleeve',
      price: 69,
      badge: null,
      image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=750&fit=crop&q=80',
      sizes: ['S', 'M', 'L', 'XL']
    }
  ],

  'accessories': [
    {
      id: 'leather-belt',
      nameKey: 'prod.leather_belt',
      price: 45,
      badge: null,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop&q=80',
      sizes: null
    },
    {
      id: 'canvas-tote-bag',
      nameKey: 'prod.canvas_tote',
      price: 55,
      badge: null,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop&q=80',
      sizes: null
    },
    {
      id: 'classic-cap',
      nameKey: 'prod.classic_cap',
      price: 35,
      badge: null,
      image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&h=750&fit=crop&q=80',
      sizes: null
    },
    {
      id: 'minimalist-watch',
      nameKey: 'prod.minimalist_watch',
      price: 89,
      badge: 'NEW',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=750&fit=crop&q=80',
      sizes: null
    },
    {
      id: 'sunglasses',
      nameKey: 'prod.sunglasses',
      price: 65,
      badge: null,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=750&fit=crop&q=80',
      sizes: null
    },
    {
      id: 'knit-tie',
      nameKey: 'prod.knit_tie',
      price: 39,
      badge: null,
      image: 'https://images.unsplash.com/photo-1589465885857-44edb59bbff2?w=600&h=750&fit=crop&q=80',
      sizes: null
    }
  ]
};

/* Category metadata for the homepage grid */
const CATEGORIES_META = {
  'tshirts-polos': {
    nameKey: 'cat.tshirts.name',
    cardDescKey: 'cat.tshirts.card_desc',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop&q=80',
    href: 'categories/tshirts-polos.html'
  },
  'pants-chinos': {
    nameKey: 'cat.pants.name',
    cardDescKey: 'cat.pants.card_desc',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=600&fit=crop&q=80',
    href: 'categories/pants-chinos.html'
  },
  'jackets-coats': {
    nameKey: 'cat.jackets.name',
    cardDescKey: 'cat.jackets.card_desc',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop&q=80',
    href: 'categories/jackets-coats.html'
  },
  'hoodies-sweatshirts': {
    nameKey: 'cat.hoodies.name',
    cardDescKey: 'cat.hoodies.card_desc',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop&q=80',
    href: 'categories/hoodies-sweatshirts.html'
  },
  'shirts': {
    nameKey: 'cat.shirts.name',
    cardDescKey: 'cat.shirts.card_desc',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=600&fit=crop&q=80',
    href: 'categories/shirts.html'
  },
  'accessories': {
    nameKey: 'cat.accessories.name',
    cardDescKey: 'cat.accessories.card_desc',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=600&fit=crop&q=80',
    href: 'categories/accessories.html'
  }
};
