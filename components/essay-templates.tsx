"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Download, Star } from "lucide-react"

export function EssayTemplates() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const templates = [
    {
      id: 1,
      title: "计算机科学个人陈述模板",
      category: "personal-statement",
      level: "master",
      school: "斯坦福大学",
      rating: 4.9,
      downloads: 1250,
      preview: "I am writing to express my strong interest in the Computer Science program...",
      tags: ["CS", "技术背景", "研究经历"],
    },
    {
      id: 2,
      title: "商科MBA申请文书模板",
      category: "statement-of-purpose",
      level: "master",
      school: "哈佛商学院",
      rating: 4.8,
      downloads: 980,
      preview: "My entrepreneurial journey began during my undergraduate years...",
      tags: ["MBA", "领导力", "创业经历"],
    },
    {
      id: 3,
      title: "工程学博士研究计划书",
      category: "research-proposal",
      level: "phd",
      school: "麻省理工学院",
      rating: 4.7,
      downloads: 650,
      preview: "The rapid advancement in artificial intelligence has opened new possibilities...",
      tags: ["PhD", "研究计划", "工程学"],
    },
    {
      id: 4,
      title: "多样性文书模板",
      category: "diversity-essay",
      level: "bachelor",
      school: "加州大学伯克利分校",
      rating: 4.6,
      downloads: 890,
      preview: "Growing up in a multicultural environment has shaped my worldview...",
      tags: ["多样性", "文化背景", "本科申请"],
    },
    {
      id: 5,
      title: "为什么选择这所学校",
      category: "why-school",
      level: "master",
      school: "卡内基梅隆大学",
      rating: 4.5,
      downloads: 720,
      preview: "Carnegie Mellon's reputation for innovation and excellence...",
      tags: ["选校理由", "学校特色", "匹配度"],
    },
    {
      id: 6,
      title: "职业目标文书模板",
      category: "career-goals",
      level: "master",
      school: "沃顿商学院",
      rating: 4.8,
      downloads: 560,
      preview: "My career aspiration is to become a leader in sustainable finance...",
      tags: ["职业规划", "长期目标", "商科"],
    },
  ]

  const categories = [
    { value: "all", label: "全部类型" },
    { value: "personal-statement", label: "个人陈述" },
    { value: "statement-of-purpose", label: "目的陈述" },
    { value: "research-proposal", label: "研究计划" },
    { value: "diversity-essay", label: "多样性文书" },
    { value: "why-school", label: "选校理由" },
    { value: "career-goals", label: "职业目标" },
  ]

  const levels = [
    { value: "all", label: "全部学位" },
    { value: "bachelor", label: "本科" },
    { value: "master", label: "硕士" },
    { value: "phd", label: "博士" },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || template.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">文书模板库</h2>
          <p className="text-muted-foreground">精选优质文书模板，助您快速开始写作</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          共 {templates.length} 个模板
        </Badge>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索模板、学校或标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{template.title}</CardTitle>
                  <CardDescription className="mt-1">{template.school}</CardDescription>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{template.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview */}
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground line-clamp-3">{template.preview}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {template.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{template.downloads} 次下载</span>
                <span className="capitalize">{template.level}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  预览
                </Button>
                <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/90">
                  <Download className="h-4 w-4 mr-2" />
                  使用模板
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">加载更多模板</Button>
      </div>
    </div>
  )
}
