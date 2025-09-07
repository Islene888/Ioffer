"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, PieChart, TrendingUp, Target, Award, Clock } from "lucide-react"

export function ApplicationAnalytics() {
  const overallStats = {
    totalApplications: 8,
    submitted: 3,
    inProgress: 4,
    notStarted: 1,
    averageProgress: 68,
    completionRate: 37.5,
  }

  const schoolStats = [
    { school: "斯坦福大学", progress: 100, status: "已提交", matchScore: 95 },
    { school: "麻省理工学院", progress: 75, status: "文书准备", matchScore: 88 },
    { school: "加州大学伯克利分校", progress: 45, status: "材料收集", matchScore: 90 },
    { school: "哈佛大学", progress: 25, status: "准备中", matchScore: 85 },
    { school: "卡内基梅隆大学", progress: 60, status: "材料收集", matchScore: 92 },
  ]

  const timelineData = [
    { month: "9月", applications: 2, completed: 0 },
    { month: "10月", applications: 3, completed: 1 },
    { month: "11月", applications: 2, completed: 2 },
    { month: "12月", applications: 1, completed: 0 },
  ]

  const categoryProgress = [
    { category: "个人信息", progress: 100, color: "bg-green-500" },
    { category: "学术背景", progress: 95, color: "bg-green-500" },
    { category: "语言成绩", progress: 100, color: "bg-green-500" },
    { category: "推荐信", progress: 80, color: "bg-yellow-500" },
    { category: "个人陈述", progress: 70, color: "bg-yellow-500" },
    { category: "补充文书", progress: 60, color: "bg-orange-500" },
    { category: "作品集", progress: 40, color: "bg-red-500" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已提交": return "bg-green-100 text-green-800"
      case "文书准备": return "bg-blue-100 text-blue-800"
      case "材料收集": return "bg-yellow-100 text-yellow-800"
      case "准备中": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">数据分析</h2>
        <p className="text-muted-foreground">深入了解您的申请进度和表现</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{overallStats.totalApplications}</p>
              <p className="text-sm text-muted-foreground">总申请数</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mr-4">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{overallStats.submitted}</p>
              <p className="text-sm text-muted-foreground">已提交</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mr-4">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{overallStats.inProgress}</p>
              <p className="text-sm text-muted-foreground">进行中</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mr-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{overallStats.averageProgress}%</p>
              <p className="text-sm text-muted-foreground">平均进度</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* School Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              各校申请进度
            </CardTitle>
            <CardDescription>每所学校的申请完成情况</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {schoolStats.map((school, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{school.school}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(school.status)} variant="outline">
                        {school.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        匹配度: {school.matchScore}%
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{school.progress}%</span>
                </div>
                <Progress value={school.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Category Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              材料准备情况
            </CardTitle>
            <CardDescription>各类申请材料的完成度</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryProgress.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.category}</span>
                  <span className="text-sm">{category.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${category.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>申请时间线</CardTitle>
          <CardDescription>按月份查看申请活动</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {timelineData.map((data, index) => (
              <div key={index} className="text-center p-4 border border-border rounded-lg">
                <h4 className="font-medium mb-2">{data.month}</h4>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-blue-600">{data.applications}</div>
                  <div className="text-xs text-muted-foreground">新增申请</div>
                  <div className="text-lg font-semibold text-green-600">{data.completed}</div>
                  <div className="text-xs text-muted-foreground">已完成</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>智\
