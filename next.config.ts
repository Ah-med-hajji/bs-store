import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  async redirects() {
    return [
      { source: '/categories/tshirts-polos.html', destination: '/categories/tshirts-polos', permanent: true },
      { source: '/categories/pants-chinos.html', destination: '/categories/pants-chinos', permanent: true },
      { source: '/categories/jackets-coats.html', destination: '/categories/jackets-coats', permanent: true },
      { source: '/categories/hoodies-sweatshirts.html', destination: '/categories/hoodies-sweatshirts', permanent: true },
      { source: '/categories/shirts.html', destination: '/categories/shirts', permanent: true },
      { source: '/categories/accessories.html', destination: '/categories/accessories', permanent: true },
    ];
  },
};

export default nextConfig;
