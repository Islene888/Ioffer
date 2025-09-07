"use client"

import { useLanguage } from "@/contexts/language-context"

export function StatsSection() {
  const { t } = useLanguage()

  const stats = [
    { number: "10,000+", label: t("home.stats.successfulApplications") },
    { number: "500+", label: t("home.stats.partnerUniversities") },
    { number: "95%", label: t("home.stats.averageScore") },
    { number: "50+", label: t("home.stats.satisfactionRate") },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("home.stats.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.stats.description")}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <a key={index} href="/success-stories" className="text-center group cursor-pointer stagger-animation block">
              {/* 卡通数字泡泡 */}
              <div className="relative mx-auto mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-1">
                <div
                  className="relative bg-gradient-to-br from-amber-100 to-orange-100 w-24 h-24 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 cartoon-shadow hover-lift"
                  style={{
                    borderRadius: "50% 60% 70% 40% / 60% 30% 70% 40%",
                    animation: "float 3s ease-in-out infinite",
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                </div>

                {/* 装饰性小元素 */}
                <div
                  className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 shadow-md"
                  style={{
                    borderRadius: "60% 40% 50% 80%",
                    animation: "bounce-gentle 2s ease-in-out infinite",
                    animationDelay: `${index * 0.3}s`,
                  }}
                ></div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                  {stat.label}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
