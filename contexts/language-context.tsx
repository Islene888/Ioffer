"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type Language, getTranslation } from "@/lib/i18n"
import { storage } from "@/lib/storage"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh")

  useEffect(() => {
    const userData = storage.getUserData()
    setLanguageState(userData.preferences.language)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    storage.saveUserData({
      preferences: {
        ...storage.getUserData().preferences,
        language: lang,
      },
    })
  }

  const t = (key: string): string => {
    return getTranslation(language, key)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
