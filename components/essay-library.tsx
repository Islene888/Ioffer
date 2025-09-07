"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Copy, Download, Share, Calendar, FileText, Clock, CheckCircle } from "lucide-react"

export function EssayLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const essays = [
    {
      id: 1,
      title: "斯坦福大学计算机科学个人陈述",
      type: "个人陈述",
      school: "斯坦福大学",
      program: "计算机科学硕士",
      status: "已完成",
      wordCount: 650,
      lastModified: "2024-03-15",
      created: "2024-03-10",
      version: 3,
    },
    {
      id: 2,
      title: "MIT人工智能研究计划书",
      type: "研究计划",
      school: "麻省理工学院",
      program: "人工智能博士",
      status: "草稿",
      wordCount: 1200,
      lastModified: "2024-03-14",
      created: "2024-03-08",
      version: 2,
    },
    {
      id: 3,
      title: "哈佛商学院MBA申请文书",
      type: "目的陈述",
      school: "哈佛商学院",
      program: "MBA",
      status: "审阅中",
      wordCount: 800,
      lastModified: "2024-03-12",
      created: "2024-03-05",
      version: 4,
    },
    {
      id: 4,
      title: "加州大学伯克利分校多样性文书",
      type: "多样性文书",
      school: "加州大学伯克利分校",
      program: "电气工程硕士",
      status: "已完成",
      wordCount: 500,
      lastModified: "2024-03-10",
      created: "2024-03-01",
      version: 2,
    },
    {
      id: 5,
      title: "卡内基梅隆大学选校理由",
      type: "选校理由",
      school: "卡内基梅隆大学",
      program: "计算机科学硕士",
      status: "草稿",
      wordCount: 400,
      lastModified: "2024-03-08",
      created: "2024-03-07",
      version: 1,
    },
  ]

  const statusOptions = [
    { value: "all", label: "全部状态" },
    { value: "草稿", label: "草稿" },
    { value: "审阅中", label: "审阅中" },
    { value: "已完成", label: "已完成" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已完成":
        return "bg-green-100 text-green-800"
      case "审阅中":
        return "bg-blue-100 text-blue-800"
      case "草稿":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "已完成":
        return <CheckCircle className="h-4 w-4" />
      case "审阅中":
        return <Clock className="h-4 w-4" />
      case "草稿":
        return <Edit className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredEssays = essays.filter((essay) => {
    const matchesSearch =
      essay.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      essay.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      essay.program.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || essay.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">我的文书</h2>
          <p className="text-muted-foreground">管理您的所有申请文书和草稿</p>
        </div>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" />
          新建文书
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索文书标题、学校或专业..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Essays List */}
      <div className="space-y-4">
        {filteredEssays.map((essay) => (
          <Card key={essay.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{essay.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {essay.school} · {essay.program}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(essay.status)}>
                    {getStatusIcon(essay.status)}
                    <span className="ml-1">{essay.status}</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>{essay.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{essay.wordCount} 字</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>修改于 {essay.lastModified}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>版本 {essay.version}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  编辑
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  复制
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  导出
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  分享
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                  <Trash2 className="h-4 w-4 mr-2" />
                  删除
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredEssays.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">暂无文书</h3>
            <p className="text-muted-foreground mb-4">开始创建您的第一份申请文书吧</p>
            <Button className="bg-secondary hover:bg-secondary/90">
              <Plus className="h-4 w-4 mr-2" />
              新建文书
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
