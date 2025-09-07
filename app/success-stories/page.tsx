"use client"

import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, GraduationCap, Calendar } from "lucide-react"
import Image from "next/image"

export default function SuccessStoriesPage() {
  const { t } = useLanguage()

  const successStories = [
    {
      id: 1,
      name: "张小明",
      avatar: "/diverse-student-portraits.png",
      school: "Stanford University",
      program: "Computer Science MS",
      gpa: "3.8",
      toefl: "108",
      gre: "325",
      story: "通过ioffer的AI文书助手，我成功突出了自己的项目经验，最终获得了斯坦福的录取。",
      tips: ["提前准备GRE", "重视项目经验", "文书要体现个人特色"],
      year: "2024",
      country: "美国",
    },
    {
      id: 2,
      name: "李小红",
      avatar: "/diverse-female-student.png",
      school: "Imperial College London",
      program: "Data Science MSc",
      gpa: "3.7",
      ielts: "7.5",
      story: "ioffer的学校推荐系统帮我找到了最适合的项目，申请过程非常顺利。",
      tips: ["选择合适的推荐人", "准备充分的面试", "展示数据分析能力"],
      year: "2024",
      country: "英国",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-amber-50 to-orange-50/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t("successStories.title") || "成功案例"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t("successStories.subtitle") || "看看学长学姐们是如何通过ioffer实现留学梦想的"}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {successStories.map((story) => (
                <Card key={story.id} className="cartoon-shadow hover-lift">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <Image
                        src={story.avatar || "/placeholder.svg"}
                        alt={story.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{story.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          <span className="font-medium">{story.school}</span>
                        </div>
                        <p className="text-muted-foreground">{story.program}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{story.country}</span>
                          <Calendar className="h-4 w-4 text-muted-foreground ml-2" />
                          <span className="text-sm">{story.year}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{story.gpa}</div>
                        <div className="text-sm text-muted-foreground">GPA</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{story.toefl || story.ielts}</div>
                        <div className="text-sm text-muted-foreground">{story.toefl ? "TOEFL" : "IELTS"}</div>
                      </div>
                      {story.gre && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{story.gre}</div>
                          <div className="text-sm text-muted-foreground">GRE</div>
                        </div>
                      )}
                    </div>

                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
                      "{story.story}"
                    </blockquote>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">申请建议：</h4>
                      <div className="flex flex-wrap gap-2">
                        {story.tips.map((tip, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tip}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                分享你的成功故事
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
