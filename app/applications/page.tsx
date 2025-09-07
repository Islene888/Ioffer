"use client"

import { Navigation } from "@/components/navigation"
import { ApplicationManager } from "@/components/application-manager"
import { useLanguage } from "@/contexts/language-context"

export default function ApplicationsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t("applications.title")}</h1>
          <p className="text-muted-foreground">{t("applications.description")}</p>
        </div>
        <ApplicationManager />
      </main>
    </div>
  )
}
