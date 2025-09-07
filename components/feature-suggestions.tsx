"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  MessageCircle,
  DollarSign,
  FileText,
  Video,
  Trophy,
  Calculator,
  Calendar,
  Globe,
  BookOpen,
} from "lucide-react"

const suggestedFeatures = [
  {
    icon: Users,
    title: "学长学姐社区",
    description: "连接已经成功申请的学长学姐，分享真实经验和建议",
    priority: "高",
    category: "社交功能",
  },
  {
    icon: MessageCircle,
    title: "实时咨询聊天",
    description: "与专业顾问或其他申请者实时交流，获得即时帮助",
    priority: "高",
    category: "沟通工具",
  },
  {
    icon: DollarSign,
    title: "奖学金信息库",
    description: "汇总各类奖学金信息，智能匹配适合的奖学金项目",
    priority: "中",
    category: "资源信息",
  },
  {
    icon: FileText,
    title: "签证指导助手",
    description: "提供详细的签证申请指导和材料清单",
    priority: "高",
    category: "申请辅助",
  },
  {
    icon: Video,
    title: "模拟面试系统",
    description: "AI驱动的模拟面试，帮助学生提前准备面试",
    priority: "中",
    category: "面试准备",
  },
  {
    icon: Trophy,
    title: "成功案例展示",
    description: "展示真实的成功申请案例，激励和指导其他学生",
    priority: "中",
    category: "激励工具",
  },
  {
    icon: Calculator,
    title: "留学费用计算器",
    description: "详细计算学费、生活费等各项留学成本",
    priority: "中",
    category: "规划工具",
  },
  {
    icon: Calendar,
    title: "申请时间线规划",
    description: "个性化的申请时间规划，确保不错过重要节点",
    priority: "高",
    category: "规划工具",
  },
  {
    icon: Globe,
    title: "目标国家生活指南",
    description: "提供目标国家的文化、生活、学习环境介绍",
    priority: "低",
    category: "生活指导",
  },
  {
    icon: BookOpen,
    title: "语言考试备考",
    description: "托福、雅思等语言考试的备考资源和练习",
    priority: "中",
    category: "考试准备",
  },
]

export function FeatureSuggestions() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "bg-destructive text-destructive-foreground"
      case "中":
        return "bg-primary text-primary-foreground"
      case "低":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">建议新增功能</h2>
        <p className="text-muted-foreground">让ioffer成为更完整的留学申请平台</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestedFeatures.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/20"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg w-fit">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <Badge className={getPriorityColor(feature.priority)}>{feature.priority}优先级</Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <Badge variant="outline" className="w-fit">
                  {feature.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          开始实现这些功能
        </Button>
      </div>
    </div>
  )
}
