import { LanguageProvider } from '@/hooks/useLanguage';
import { StorefrontShell } from '@/components/storefront/StorefrontShell';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <StorefrontShell>{children}</StorefrontShell>
    </LanguageProvider>
  );
}
