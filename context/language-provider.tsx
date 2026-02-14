"use client";

import React, { createContext, useContext, useState } from "react";

type LanguageContextType = {
  languageIndex: number;
  setLanguageIndex: (index: number) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({
  children,
  initialLanguageIndex = 0,
}: {
  children: React.ReactNode;
  initialLanguageIndex?: number;
}) => {
  const [languageIndex, setLanguageIndex] = useState(initialLanguageIndex);

  const handleSetLanguage = (index: number) => {
    setLanguageIndex(index);
    // Set cookie for 1 year
    document.cookie = `language_index=${index}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem("languageIndex", index.toString()); // Keep localStorage as backup/legacy
  };

  return (
    <LanguageContext.Provider value={{ languageIndex, setLanguageIndex: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
