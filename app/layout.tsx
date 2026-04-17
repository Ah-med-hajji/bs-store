import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import '@/css/globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

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
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          async
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
          async
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
