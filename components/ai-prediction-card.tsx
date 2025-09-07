"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, Target, AlertCircle } from "lucide-react"
import { AIService } from "@/lib/ai-service"

interface AIPredictionCardProps {
  school: any
  userProfile: any
}

export function AIPredictionCard({ school, userProfile }: AIPredictionCardProps) {
  const [admissionChance, setAdmissionChance] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    const loadPrediction = async () => {
      setIsLoading(true)
      try {
        const aiService = AIService.getInstance()
        const chance = await aiService.predictAdmissionChance(userProfile, school)
        setAdmissionChance(chance)

        // 生成改进建议
        const suggestions = generateImprovementSuggestions(userProfile, school, chance)
        setRecommendations(suggestions)
      } catch (error) {
        console.error("Failed to load AI prediction:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPrediction()
  }, [school, userProfile])

  const generateImprovementSuggestions = (profile: any, school: any, chance: number): string[] => {
    const suggestions: string[] = []

    if (profile.gpa < school.avgGPA) {
      suggestions.push("考虑通过额外课程或项目提升学术背景")
    }

    if (profile.toefl < school.avgTOEFL) {
      suggestions.push("建议重考TOEFL以提高语言成绩")
    }

    if (profile.gre < school.avgGRE) {
      suggestions.push("GRE成绩有提升空间，建议再次备考")
    }

    if (chance < 30) {
      suggestions.push("建议增加实习或研究经历以增强竞争力")
      suggestions.push("考虑申请该校的预科或桥梁课程")
    }

    return suggestions
  }

  const getChanceLevel = (chance: number) => {
    if (chance >= 70) return { level: "高", color: "bg-green-500", text: "录取概率较高" }
    if (chance >= 40) return { level: "中", color: "bg-yellow-500", text: "录取概率中等" }
    return { level: "低", color: "bg-red-500", text: "录取概率较低" }
  }

  const chanceInfo = getChanceLevel(admissionChance)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 animate-pulse" />
            AI智能分析中...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI智能预测分析
        </CardTitle>
        <CardDescription>基于历史数据和机器学习模型的录取概率预测</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 录取概率 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">录取概率</span>
            <Badge className={chanceInfo.color}>{admissionChance}%</Badge>
          </div>
          <Progress value={admissionChance} className="h-2" />
          <p className="text-xs text-muted-foreground">{chanceInfo.text}</p>
        </div>

        {/* 竞争力分析 */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">{userProfile.gpa}</div>
            <div className="text-xs text-muted-foreground">你的GPA</div>
            <div className="text-xs">vs {school.avgGPA}</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">{userProfile.toefl}</div>
            <div className="text-xs text-muted-foreground">你的TOEFL</div>
            <div className="text-xs">vs {school.avgTOEFL}</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">{userProfile.gre}</div>
            <div className="text-xs text-muted-foreground">你的GRE</div>
            <div className="text-xs">vs {school.avgGRE}</div>
          </div>
        </div>

        {/* AI改进建议 */}
        {recommendations.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">AI改进建议</span>
            </div>
            <div className="space-y-1">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-2 text-xs">
                  <AlertCircle className="h-3 w-3 text-secondary mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button variant="outline" size="sm" className="w-full bg-transparent">
          <TrendingUp className="h-4 w-4 mr-2" />
          查看详细分析报告
        </Button>
      </CardContent>
    </Card>
  )
}
