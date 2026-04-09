"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CodeGroupLanguage = string;

type Ctx = {
  language: CodeGroupLanguage;
  setLanguage: (next: CodeGroupLanguage) => void;
};

const CodeGroupStateContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "grx.docs.codeGroup.language";

export function CodeGroupStateProvider({
  children,
  defaultLanguage = "javascript",
}: {
  children: React.ReactNode;
  defaultLanguage?: CodeGroupLanguage;
}) {
  const [language, setLanguage] = useState<CodeGroupLanguage>(defaultLanguage);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setLanguage(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  const value = useMemo<Ctx>(() => ({ language, setLanguage }), [language]);

  return (
    <CodeGroupStateContext.Provider value={value}>
      {children}
    </CodeGroupStateContext.Provider>
  );
}

export function useCodeGroupState(): Ctx | null {
  return useContext(CodeGroupStateContext);
}
