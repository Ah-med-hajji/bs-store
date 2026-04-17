import type { Metadata } from 'next';
import '@/css/globals.css';

export const metadata: Metadata = {
  title: 'BS Store — Prêt-à-porter Masculin Premium | Tunisie',
  description:
    'BS Store — Prêt-à-porter masculin premium en Tunisie. T-shirts, polos, pantalons, vestes, chemises et accessoires. Qualité et style depuis 2024.',
  keywords: [
    'BS Store',
    'vêtements homme Tunisie',
    'prêt-à-porter masculin',
    'mode homme',
    'Tunisie',
  ],
  metadataBase: new URL('https://bs-store.tn'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BS Store — Prêt-à-porter Masculin Premium',
    description:
      'Prêt-à-porter masculin premium en Tunisie. Qualité et style depuis 2024.',
    url: 'https://bs-store.tn',
    siteName: 'BS Store',
    locale: 'fr_TN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BS Store — Prêt-à-porter Masculin Premium',
    description:
      'Prêt-à-porter masculin premium en Tunisie. Qualité et style depuis 2024.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
