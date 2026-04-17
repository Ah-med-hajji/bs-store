'use client';

import { Category } from '@/lib/types';
import HeroSection from './HeroSection';
import MarqueeBanner from './MarqueeBanner';
import AboutSection from './AboutSection';
import CategoryGrid from './CategoryGrid';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';

export default function HomePageClient({ categories }: { categories: Category[] }) {
  return (
    <>
      <HeroSection />
      <MarqueeBanner />
      <AboutSection />
      <CategoryGrid categories={categories} />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
