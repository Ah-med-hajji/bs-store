/**
 * Translate French text to English using MyMemory API.
 * Falls back to returning the original French text on any failure.
 */
export async function translateFrToEn(text: string): Promise<string> {
  if (!text || !text.trim()) return text;

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|en`;
    const res = await fetch(url);

    if (!res.ok) return text;

    const data = await res.json();
    const translated = data?.responseData?.translatedText;

    if (
      translated &&
      typeof translated === 'string' &&
      !translated.includes('MYMEMORY WARNING')
    ) {
      return translated;
    }

    return text;
  } catch {
    return text;
  }
}

/**
 * Translate multiple French texts to English in parallel.
 * Pass an object like { name_en: "Cheminée", desc_en: "..." } where
 * values are the French text. Returns same keys with translated values.
 */
export async function translateFields(
  fields: Record<string, string>
): Promise<Record<string, string>> {
  const entries = await Promise.all(
    Object.entries(fields).map(async ([key, value]) => {
      const translated = await translateFrToEn(value);
      return [key, translated] as const;
    })
  );

  return Object.fromEntries(entries);
}
