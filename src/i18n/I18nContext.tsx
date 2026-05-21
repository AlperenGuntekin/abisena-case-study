import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STRINGS, type Lang, type Strings } from "./strings";

interface I18nContextValue {
  lang: Lang;
  t: Strings;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "abisena.lang";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "tr";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "tr" || stored === "en") return stored;
  const nav = window.navigator?.language?.toLowerCase() ?? "";
  return nav.startsWith("tr") ? "tr" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectInitialLang());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(
    () => setLangState((prev) => (prev === "tr" ? "en" : "tr")),
    [],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ lang, t: STRINGS[lang], setLang, toggleLang }),
    [lang, setLang, toggleLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}
