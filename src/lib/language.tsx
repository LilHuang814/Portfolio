"use client";

import { createContext, useContext, useState } from "react";

export type Lang = "en" | "zh";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

/** Pick the value for the active language from a bilingual pair. */
export function useT() {
  const { lang } = useLanguage();
  return <T,>(pair: { en: T; zh: T }) => pair[lang];
}
