"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  MoreHorizontal,
  Star,
} from "lucide-react"

export function ApplicationList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const applications = [
    {
      id: 1,
      school: "斯坦福大学",
      program: "计算机科学硕士",
      status: "已提交",
      priority: "高",
      progress: 100,
      deadline: "2024-12-15",
      daysLeft: 45,
      documents: { completed: 8, total: 8 },
      essays: { completed: 3, total: 3 },
      recommendations: { completed: 3, total: 3 },
      applicationFee: "$125",
      notes: "已完成所有材料提交，等待结果",
      isFavorite: true,
    },
    {
      id: 2,
      school: "麻省理工学院",
      program: "人工智能硕士",
      status: "文书准备",
      priority: "高",
      progress: 75,
      deadline: "2024-12-01",
      daysLeft: 31,
      documents: { completed: 6, total: 8 },
      essays: { completed: 2, total: 3 },
      recommendations: { completed: 3, total: 3 },
      applicationFee: "$75",
      notes: "需要完成个人陈述和补充文书",
      isFavorite: true,
    },
    {
      id: 3,
      school: "加州大学伯克利分校",
      program: "数据科学硕士",
      status: "材料收集",
      priority: "中",
      progress: 45,
      deadline: "2025-01-15",
      daysLeft: 76,
      documents: { completed: 4, total: 8 },
      essays: { completed: 1, total: 2 },
      recommendations: { completed: 2, total: 3 },
      applicationFee: "$120",
      notes: "需要准备成绩单认证和语言成绩",
      isFavorite: false,
    },
    {
      id: 4,
      school: "哈佛大学",
      program: "计算机科学硕士",
      status: "准备中",
      priority: "高",
      progress: 25,
      deadline: "2024-12-10",
      daysLeft: 40,
      documents: { completed: 2, total: 8 },
      essays: { completed: 0, total: 3 },
      recommendations: { completed: 1, total: 3 },
      applicationFee: "$105",
      notes: "刚开始准备，需要联系推荐人",
      isFavorite: false,
    },
    {
      id: 5,
      school: "卡内基梅隆大学",
      program: "软件工程硕士",
      status: "材料收集",
      priority: "中",
      progress: 60,
      deadline: "2025-01-01",
      daysLeft: 62,
      documents: { completed: 5, total: 7 },
      essays: { completed: 2, total: 2 },
      recommendations: { completed: 2, total: 3 },
      applicationFee: "$85",
      notes: "文书已完成，等待最后一封推荐信",
      isFavorite: false,
    },
  ]

  const statusOptions = [
    { value: "all", label: "全部状态" },
    { value: "准备中", label: "准备中" },
    { value: "材料收集", label: "材料收集" },
    { value: "文书准备", label: "文书准备" },
    { value: "已提交", label: "已提交" },
    { value: "面试阶段", label: "面试阶段" },
    { value: "等待结果", label: "等待结果" },
  ]

  const priorityOptions = [
    { value: "all", label: "全部优先级" },
    { value: "高", label: "高优先级" },
    { value: "中", label: "中优先级" },
    { value: "低", label: "低优先级" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已提交":
        return "bg-green-100 text-green-800"
      case "文书准备":
        return "bg-blue-100 text-blue-800"
      case "材料收集":
        return "bg-yellow-100 text-yellow-800"
      case "准备中":
        return "bg-orange-100 text-orange-800"
      case "面试阶段":
        return "bg-purple-100 text-purple-800"
      case "等待结果":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "bg-red-100 text-red-800"
      case "中":
        return "bg-yellow-100 text-yellow-800"
      case "低":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "已提交":
        return <CheckCircle className="h-4 w-4" />
      case "文书准备":
        return <FileText className="h-4 w-4" />
      case "材料收集":
        return <Clock className="h-4 w-4" />
      case "准备中":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.program.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesPriority = priorityFilter === "all" || app.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">申请清单</h2>
          <p className="text-muted-foreground">管理您的所有留学申请项目</p>
        </div>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" />
          添加新申请
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索学校或专业..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
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
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {priorityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="space-y-4">
        {filteredApplications.map((app) => (
          <Card key={app.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-1 ${app.isFavorite ? "text-yellow-500" : "text-muted-foreground"}`}
                  >
                    <Star className={`h-4 w-4 ${app.isFavorite ? "fill-current" : ""}`} />
                  </Button>
                  <div>
                    <CardTitle className="text-xl">{app.school}</CardTitle>
                    <CardDescription className="text-base">{app.program}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(app.priority)}>{app.priority}</Badge>
                  <Badge className={getStatusColor(app.status)}>
                    {getStatusIcon(app.status)}
                    <span className="ml-1">{app.status}</span>
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>整体进度</span>
                  <span className="font-medium">{app.progress}%</span>
                </div>
                <Progress value={app.progress} className="h-2" />
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">文档</div>
                  <div className="font-medium">
                    {app.documents.completed}/{app.documents.total}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">文书</div>
                  <div className="font-medium">
                    {app.essays.completed}/{app.essays.total}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">推荐信</div>
                  <div className="font-medium">
                    {app.recommendations.completed}/{app.recommendations.total}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">申请费</div>
                  <div className="font-medium">{app.applicationFee}</div>
                </div>
              </div>

              {/* Deadline and Notes */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>截止: {app.deadline}</span>
                  </div>
                  <span className={app.daysLeft <= 30 ? "text-red-600 font-medium" : ""}>还有 {app.daysLeft} 天</span>
                </div>
              </div>

              {app.notes && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">{app.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  编辑
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  查看详情
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  设置提醒
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
      {filteredApplications.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">暂无申请</h3>
            <p className="text-muted-foreground mb-4">开始添加您的第一个留学申请吧</p>
            <Button className="bg-secondary hover:bg-secondary/90">
              <Plus className="h-4 w-4 mr-2" />
              添加申请
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
