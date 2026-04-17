'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/lib/i18n';

export default function MarqueeBanner() {
  const { lang } = useLanguage();

  const items = [
    t('marquee.brand', lang),
    t('marquee.premium', lang),
    t('marquee.tunisia', lang),
    t('marquee.quality', lang),
    t('marquee.menswear', lang),
    t('marquee.established', lang),
  ];

  const renderContent = () => (
    <div className="marquee-content">
      {items.map((text, i) => (
        <span key={i}>{text}</span>
      ))}
      <span className="marquee-diamond">&#9670;</span>
      {items.map((text, i) => (
        <span key={`b-${i}`}>{text}</span>
      ))}
      <span className="marquee-diamond">&#9670;</span>
    </div>
  );

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {renderContent()}
        {renderContent()}
      </div>
    </div>
  );
}
