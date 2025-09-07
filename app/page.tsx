"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { useLanguage } from "@/contexts/language-context"
import { ArrowRight, Globe, Users, Award, Target, PenTool, Rocket, UserCheck } from "lucide-react"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-8 relative">
                {/* Decorative background circles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-300 rounded-full opacity-60"></div>
                  <div className="absolute top-2 right-8 w-6 h-6 bg-orange-400 rounded-full opacity-40"></div>
                  <div className="absolute -bottom-2 left-12 w-4 h-4 bg-orange-200 rounded-full opacity-50"></div>
                  <div className="absolute top-8 -right-2 w-10 h-10 bg-blue-200 rounded-full opacity-30"></div>
                </div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">智能匹配</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    基于你的背景和目标，智能推荐最适合的学校和专业
                  </p>
                </div>
              </div>

              <div className="text-center p-8 relative">
                {/* Decorative background circles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-300 rounded-full opacity-60"></div>
                  <div className="absolute top-2 right-8 w-6 h-6 bg-blue-400 rounded-full opacity-40"></div>
                  <div className="absolute -bottom-2 left-12 w-4 h-4 bg-blue-200 rounded-full opacity-50"></div>
                  <div className="absolute top-8 -right-2 w-10 h-10 bg-orange-200 rounded-full opacity-30"></div>
                </div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <PenTool className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">AI文书助手</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">AI辅助创作个性化文书，提升申请竞争力</p>
                </div>
              </div>

              <div className="text-center p-8 relative">
                {/* Decorative background circles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-300 rounded-full opacity-60"></div>
                  <div className="absolute top-2 right-8 w-6 h-6 bg-green-400 rounded-full opacity-40"></div>
                  <div className="absolute -bottom-2 left-12 w-4 h-4 bg-green-200 rounded-full opacity-50"></div>
                  <div className="absolute top-8 -right-2 w-10 h-10 bg-orange-200 rounded-full opacity-30"></div>
                </div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">一站式服务</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">从选校到提交，全程跟踪申请进度</p>
                </div>
              </div>

              <div className="text-center p-8 relative">
                {/* Decorative background circles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-300 rounded-full opacity-60"></div>
                  <div className="absolute top-2 right-8 w-6 h-6 bg-purple-400 rounded-full opacity-40"></div>
                  <div className="absolute -bottom-2 left-12 w-4 h-4 bg-purple-200 rounded-full opacity-50"></div>
                  <div className="absolute top-8 -right-2 w-10 h-10 bg-orange-200 rounded-full opacity-30"></div>
                </div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">专家指导</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">资深留学顾问提供专业建议和支持</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <StatsSection />

        <section className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("home.features.whyChooseUs")}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t("home.features.whyChooseUsDesc")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">全球服务网络</h3>
                <p className="text-gray-600 text-sm">覆盖美国、英国、澳洲等主要留学目的地</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">专业团队</h3>
                <p className="text-gray-600 text-sm">资深留学顾问和AI技术专家团队</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">成功保障</h3>
                <p className="text-gray-600 text-sm">95%的申请成功率，专业服务品质保证</p>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/about"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-lg hover:from-orange-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t("home.features.exploreServices")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
