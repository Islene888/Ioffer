"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh")
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center gap-2">
      <Globe className="h-4 w-4" />
      {language === "zh" ? "EN" : "中文"}
    </Button>
  )
}
