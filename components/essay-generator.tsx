"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Wand2, RefreshCw, Save, Copy } from "lucide-react"

export function EssayGenerator() {
  const [formData, setFormData] = useState({
    essayType: "",
    school: "",
    program: "",
    prompt: "",
    personalInfo: "",
    experiences: "",
    goals: "",
    tone: "professional",
    length: "500",
  })

  const [generatedEssay, setGeneratedEssay] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const essayTypes = [
    { value: "personal-statement", label: "个人陈述 (Personal Statement)" },
    { value: "statement-of-purpose", label: "目的陈述 (Statement of Purpose)" },
    { value: "motivation-letter", label: "动机信 (Motivation Letter)" },
    { value: "diversity-essay", label: "多样性文书 (Diversity Essay)" },
    { value: "why-school", label: "为什么选择这所学校" },
    { value: "career-goals", label: "职业目标文书" },
  ]

  const toneOptions = [
    { value: "professional", label: "专业正式" },
    { value: "personal", label: "个人化" },
    { value: "academic", label: "学术性" },
    { value: "creative", label: "创意性" },
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockEssay = `Dear Admissions Committee,

I am writing to express my strong interest in the ${formData.program} program at ${formData.school}. My passion for this field began during my undergraduate studies, where I discovered the transformative power of technology in solving real-world problems.

Throughout my academic journey, I have consistently demonstrated excellence in my coursework while actively seeking opportunities to apply theoretical knowledge in practical settings. My experience in ${formData.experiences} has not only strengthened my technical skills but also developed my ability to work collaboratively in diverse teams.

What particularly draws me to ${formData.school} is its renowned faculty and cutting-edge research facilities. I am especially interested in working with Professor [Name] on projects related to artificial intelligence and machine learning. The program's emphasis on interdisciplinary collaboration aligns perfectly with my belief that the most innovative solutions emerge from the intersection of different fields.

Looking ahead, my career goal is to ${formData.goals}. I believe that the comprehensive curriculum and research opportunities at ${formData.school} will provide me with the knowledge and skills necessary to make meaningful contributions to this field.

I am confident that my academic background, research experience, and passion for innovation make me a strong candidate for your program. I look forward to the opportunity to contribute to the vibrant academic community at ${formData.school}.

Thank you for your consideration.

Sincerely,
[Your Name]`

    setGeneratedEssay(mockEssay)
    setSuggestions([
      "考虑添加更具体的研究经历细节",
      "可以增加一个具体的项目案例",
      "建议在结尾部分加强个人特色",
      "可以更详细地说明选择该学校的原因",
    ])
    setIsGenerating(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEssay)
  }

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="essayType">文书类型 *</Label>
            <Select value={formData.essayType} onValueChange={(value) => handleInputChange("essayType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择文书类型" />
              </SelectTrigger>
              <SelectContent>
                {essayTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school">目标学校</Label>
              <Input
                id="school"
                value={formData.school}
                onChange={(e) => handleInputChange("school", e.target.value)}
                placeholder="如：斯坦福大学"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="program">申请专业</Label>
              <Input
                id="program"
                value={formData.program}
                onChange={(e) => handleInputChange("program", e.target.value)}
                placeholder="如：计算机科学硕士"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">文书题目/要求</Label>
            <Textarea
              id="prompt"
              value={formData.prompt}
              onChange={(e) => handleInputChange("prompt", e.target.value)}
              placeholder="请输入学校提供的文书题目或具体要求..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tone">写作风格</Label>
              <Select value={formData.tone} onValueChange={(value) => handleInputChange("tone", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {toneOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="length">目标字数</Label>
              <Select value={formData.length} onValueChange={(value) => handleInputChange("length", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="250">250字</SelectItem>
                  <SelectItem value="500">500字</SelectItem>
                  <SelectItem value="750">750字</SelectItem>
                  <SelectItem value="1000">1000字</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="personalInfo">个人背景信息</Label>
            <Textarea
              id="personalInfo"
              value={formData.personalInfo}
              onChange={(e) => handleInputChange("personalInfo", e.target.value)}
              placeholder="请简要描述您的教育背景、专业技能、兴趣爱好等..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experiences">相关经历</Label>
            <Textarea
              id="experiences"
              value={formData.experiences}
              onChange={(e) => handleInputChange("experiences", e.target.value)}
              placeholder="请描述您的实习、项目、研究、志愿服务等相关经历..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">未来目标</Label>
            <Textarea
              id="goals"
              value={formData.goals}
              onChange={(e) => handleInputChange("goals", e.target.value)}
              placeholder="请描述您的职业规划和长期目标..."
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleGenerate}
          disabled={!formData.essayType || isGenerating}
          size="lg"
          className="bg-secondary hover:bg-secondary/90"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              AI生成中...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              生成文书
            </>
          )}
        </Button>
      </div>

      {/* Generated Essay */}
      {generatedEssay && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>生成的文书</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    复制
                  </Button>
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    保存
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleGenerate}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    重新生成
                  </Button>
                </div>
              </div>
              <CardDescription>字数: {generatedEssay.length} 字符</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">{generatedEssay}</pre>
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-secondary" />
                AI优化建议
              </CardTitle>
              <CardDescription>以下是一些改进建议，帮助您完善文书内容</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      {index + 1}
                    </Badge>
                    <span className="text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  应用建议
                </Button>
                <Button variant="outline" size="sm">
                  获取更多建议
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
