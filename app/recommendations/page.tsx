"use client"

import { Navigation } from "@/components/navigation"
import { RecommendationEngine } from "@/components/recommendation-engine"
import { useLanguage } from "@/contexts/language-context"

export default function RecommendationsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t("recommendations.title")}</h1>
          <p className="text-muted-foreground">{t("recommendations.description")}</p>
        </div>
        <RecommendationEngine />
      </main>
    </div>
  )
}
