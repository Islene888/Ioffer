"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, Award, Star } from "lucide-react"
import { IoOfferMascot } from "@/components/ioffer-mascot"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"

export function HeroSection() {
  const { t } = useLanguage()

  const testimonials = [
    {
      quote: "AI文书助手让我的申请在数千份申请中脱颖而出。",
      name: "Ahmed Hassan",
      school: "MIT",
      emoji: "🎓",
    },
    {
      quote: "智能匹配系统帮我找到了最适合的学校和专业。",
      name: "Sarah Chen",
      school: "Stanford",
      emoji: "🌟",
    },
    {
      quote: "一站式服务让我的申请流程变得简单高效。",
      name: "David Kim",
      school: "Harvard",
      emoji: "🚀",
    },
    {
      quote: "专业的指导团队给了我最大的申请信心。",
      name: "Maria Rodriguez",
      school: "Oxford",
      emoji: "💡",
    },
  ]

  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="bg-gradient-to-b from-amber-50 to-orange-50/30 min-h-screen">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center mb-6">
              <IoOfferMascot message="欢迎来到ioffer！让我帮你实现留学梦想！" size="md" animated={true} />
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
                {t("home.title")}
                <br />
              </h1>

              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">{t("home.description")}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-700 text-white text-lg px-8 py-4 rounded-xl"
                asChild
              >
                <a href="/profile">
                  {t("home.getStarted")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 bg-white border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 rounded-xl"
                asChild
              >
                <a href="/about">
                  <Play className="mr-2 h-5 w-5" />
                  观看演示
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-cyan-600 mb-2">2.5M+</div>
                <div className="text-gray-600">Applications</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
                <div className="text-gray-600">Universities</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{testimonial.emoji}</div>
                      <div className="flex-1">
                        <blockquote className="text-gray-700 mb-4 italic">"{testimonial.quote}"</blockquote>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-800">{testimonial.name}</div>
                            <div className="text-sm text-gray-600">{testimonial.school}</div>
                          </div>
                          <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentTestimonial ? "bg-cyan-500" : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex items-center justify-center space-x-3">
            <Users className="h-6 w-6 text-cyan-600" />
            <div>
              <span className="text-2xl font-bold text-gray-800">50K+</span>
              <span className="text-gray-600 ml-2">Students</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Award className="h-6 w-6 text-cyan-600" />
            <div>
              <span className="text-2xl font-bold text-gray-800">95%</span>
              <span className="text-gray-600 ml-2">Success Rate</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Star className="h-6 w-6 text-cyan-600" />
            <div>
              <span className="text-2xl font-bold text-gray-800">4.9/5</span>
              <span className="text-gray-600 ml-2">Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
