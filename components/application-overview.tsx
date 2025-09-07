"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Clock, CheckCircle, AlertTriangle, Calendar, FileText, School, TrendingUp, Target } from "lucide-react"

export function ApplicationOverview() {
  const stats = [
    { label: "总申请数", value: "8", icon: School, color: "text-blue-600" },
    { label: "已提交", value: "3", icon: CheckCircle, color: "text-green-600" },
    { label: "进行中", value: "4", icon: Clock, color: "text-yellow-600" },
    { label: "待开始", value: "1", icon: AlertTriangle, color: "text-red-600" },
  ]

  const recentApplications = [
    {
      id: 1,
      school: "斯坦福大学",
      program: "计算机科学硕士",
      status: "已提交",
      progress: 100,
      deadline: "2024-12-15",
      daysLeft: 45,
      priority: "高",
    },
    {
      id: 2,
      school: "麻省理工学院",
      program: "人工智能硕士",
      status: "文书准备",
      progress: 75,
      deadline: "2024-12-01",
      daysLeft: 31,
      priority: "高",
    },
    {
      id: 3,
      school: "加州大学伯克利分校",
      program: "数据科学硕士",
      status: "材料收集",
      progress: 45,
      deadline: "2025-01-15",
      daysLeft: 76,
      priority: "中",
    },
  ]

  const upcomingDeadlines = [
    { school: "麻省理工学院", task: "申请提交", date: "2024-12-01", daysLeft: 31 },
    { school: "哈佛大学", task: "推荐信提交", date: "2024-12-10", daysLeft: 40 },
    { school: "斯坦福大学", task: "面试安排", date: "2024-12-15", daysLeft: 45 },
  ]

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已提交":
        return "bg-green-100 text-green-800"
      case "文书准备":
        return "bg-blue-100 text-blue-800"
      case "材料收集":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg mr-4">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>最近申请</CardTitle>
              <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                <Plus className="h-4 w-4 mr-2" />
                添加申请
              </Button>
            </div>
            <CardDescription>查看您最近的申请进度</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentApplications.map((app) => (
              <div key={app.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{app.school}</h4>
                    <p className="text-sm text-muted-foreground">{app.program}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(app.priority)}>{app.priority}</Badge>
                    <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>完成进度</span>
                    <span>{app.progress}%</span>
                  </div>
                  <Progress value={app.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>截止: {app.deadline}</span>
                  </div>
                  <span className={app.daysLeft <= 30 ? "text-red-600 font-medium" : ""}>还有 {app.daysLeft} 天</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              即将到期
            </CardTitle>
            <CardDescription>重要截止日期提醒</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">{deadline.school}</h4>
                  <p className="text-sm text-muted-foreground">{deadline.task}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{deadline.date}</p>
                  <p className={`text-xs ${deadline.daysLeft <= 30 ? "text-red-600" : "text-muted-foreground"}`}>
                    {deadline.daysLeft} 天后
                  </p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              查看完整日历
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>快速操作</CardTitle>
          <CardDescription>常用功能快速入口</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Plus className="h-6 w-6" />
              <span>添加申请</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <FileText className="h-6 w-6" />
              <span>上传文档</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Target className="h-6 w-6" />
              <span>设置提醒</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <TrendingUp className="h-6 w-6" />
              <span>查看分析</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
