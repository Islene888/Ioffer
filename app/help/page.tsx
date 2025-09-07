"use client"

import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, MessageCircle, BookOpen, Users, Settings } from "lucide-react"

export default function HelpPage() {
  const { t } = useLanguage()

  const faqCategories = [
    {
      icon: BookOpen,
      title: "使用指南",
      faqs: [
        {
          question: "如何开始使用ioffer？",
          answer: "首先注册账户，然后完善个人信息，系统会根据你的背景推荐合适的学校和项目。",
        },
        {
          question: "AI文书助手如何使用？",
          answer: "在文书助手页面选择文书类型，填写相关信息，AI会帮你生成初稿，然后你可以进行编辑和优化。",
        },
      ],
    },
    {
      icon: Users,
      title: "申请相关",
      faqs: [
        {
          question: "推荐的学校准确吗？",
          answer: "我们的推荐基于大量历史数据和AI算法，准确率超过85%，但最终决定还需要结合个人情况。",
        },
        {
          question: "如何提高申请成功率？",
          answer: "完善个人资料、优化文书内容、选择合适的学校组合，并及时关注申请进度。",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">{t("help.title") || "帮助中心"}</h1>
              <p className="text-xl text-muted-foreground">
                {t("help.subtitle") || "找到你需要的答案，或联系我们获得帮助"}
              </p>
            </div>

            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="搜索问题或关键词..." className="pl-12 py-3 text-lg" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="cartoon-shadow hover-lift cursor-pointer text-center">
                <CardContent className="pt-6">
                  <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">在线客服</h3>
                  <p className="text-sm text-muted-foreground mb-4">工作日 9:00-18:00 实时回复</p>
                  <Button variant="outline" size="sm">
                    开始对话
                  </Button>
                </CardContent>
              </Card>

              <Card className="cartoon-shadow hover-lift cursor-pointer text-center">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">社区求助</h3>
                  <p className="text-sm text-muted-foreground mb-4">向学长学姐提问获得经验</p>
                  <Button variant="outline" size="sm">
                    前往社区
                  </Button>
                </CardContent>
              </Card>

              <Card className="cartoon-shadow hover-lift cursor-pointer text-center">
                <CardContent className="pt-6">
                  <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">预约咨询</h3>
                  <p className="text-sm text-muted-foreground mb-4">一对一专业留学顾问服务</p>
                  <Button variant="outline" size="sm">
                    立即预约
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              {faqCategories.map((category, index) => (
                <Card key={index} className="cartoon-shadow">
                  <CardHeader>
                    <h2 className="text-xl font-semibold flex items-center gap-3">
                      <category.icon className="h-6 w-6 text-primary" />
                      {category.title}
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
