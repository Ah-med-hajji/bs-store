import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { LanguageProvider } from '@/hooks/useLanguage';
import { StorefrontShell } from '@/components/storefront/StorefrontShell';

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
    'BS Store — Prêt-à-porter masculin premium en Tunisie. Qualité et style depuis 2024.',
};

export default function StorefrontLayout({
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
      <body>
        <LanguageProvider>
          <StorefrontShell>{children}</StorefrontShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
