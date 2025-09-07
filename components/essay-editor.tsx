"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Save, Download, Share, Eye, RotateCcw, CheckCircle, AlertTriangle, Lightbulb, BarChart3 } from "lucide-react"

export function EssayEditor() {
  const [content, setContent] = useState(`Dear Admissions Committee,

I am writing to express my strong interest in the Computer Science Master's program at Stanford University. My passion for technology and innovation has driven me throughout my academic and professional journey, and I believe that Stanford's cutting-edge research environment and world-class faculty make it the ideal place for me to pursue my graduate studies.

During my undergraduate studies in Computer Science at Beijing University, I maintained a GPA of 3.8 while actively participating in research projects. My most significant project involved developing a machine learning algorithm for natural language processing, which resulted in a publication at the International Conference on Machine Learning. This experience not only deepened my technical knowledge but also sparked my interest in artificial intelligence research.

My professional experience as a software engineer at a leading tech company has provided me with practical insights into real-world applications of computer science principles. I have worked on large-scale distributed systems, collaborated with cross-functional teams, and led the development of several key features that improved user experience for millions of users.

What particularly attracts me to Stanford is the opportunity to work with Professor John Smith on his groundbreaking research in deep learning and neural networks. His recent work on transformer architectures aligns perfectly with my research interests and career goals. I am also excited about the collaborative environment at Stanford, where I can learn from and contribute to a diverse community of scholars and researchers.

Looking ahead, my goal is to pursue a career in AI research, focusing on developing more efficient and interpretable machine learning models. I believe that the rigorous academic training and research opportunities at Stanford will provide me with the knowledge and skills necessary to make meaningful contributions to this rapidly evolving field.

Thank you for considering my application. I look forward to the opportunity to contribute to Stanford's vibrant academic community and to advance the frontiers of computer science research.

Sincerely,
[Your Name]`)

  const [analysis, setAnalysis] = useState({
    wordCount: 0,
    readabilityScore: 85,
    sentimentScore: 92,
    keywordDensity: 78,
    structureScore: 88,
  })

  const [feedback, setFeedback] = useState([
    {
      type: "success",
      message: "文书结构清晰，逻辑性强",
      icon: CheckCircle,
    },
    {
      type: "warning",
      message: "建议在第二段添加更多具体的项目细节",
      icon: AlertTriangle,
    },
    {
      type: "suggestion",
      message: "可以考虑在结尾部分加强个人特色和独特性",
      icon: Lightbulb,
    },
  ])

  const handleContentChange = (value: string) => {
    setContent(value)
    setAnalysis((prev) => ({ ...prev, wordCount: value.length }))
  }

  const getFeedbackColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "suggestion":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Editor */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>文书编辑器</CardTitle>
                <CardDescription>在这里编辑和完善您的申请文书</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  撤销
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  预览
                </Button>
                <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                  <Save className="h-4 w-4 mr-2" />
                  保存
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="min-h-[600px] font-mono text-sm leading-relaxed"
              placeholder="在此输入您的文书内容..."
            />
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>字符数: {analysis.wordCount}</span>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  导出PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  分享
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Panel */}
      <div className="space-y-6">
        {/* Real-time Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-secondary" />
              实时分析
            </CardTitle>
            <CardDescription>文书质量评估和改进建议</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">可读性</span>
                <span className="text-sm font-medium">{analysis.readabilityScore}%</span>
              </div>
              <Progress value={analysis.readabilityScore} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">情感表达</span>
                <span className="text-sm font-medium">{analysis.sentimentScore}%</span>
              </div>
              <Progress value={analysis.sentimentScore} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">关键词密度</span>
                <span className="text-sm font-medium">{analysis.keywordDensity}%</span>
              </div>
              <Progress value={analysis.keywordDensity} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">结构完整性</span>
                <span className="text-sm font-medium">{analysis.structureScore}%</span>
              </div>
              <Progress value={analysis.structureScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>AI反馈建议</CardTitle>
            <CardDescription>基于文书内容的智能分析和建议</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {feedback.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                <item.icon className={`h-4 w-4 mt-0.5 ${getFeedbackColor(item.type)}`} />
                <span className="text-sm">{item.message}</span>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
              获取更多建议
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              检查语法和拼写
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              优化句式结构
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              增强表达力度
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              调整文书长度
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
