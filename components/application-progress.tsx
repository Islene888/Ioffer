import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"

export function ApplicationProgress() {
  const applications = [
    {
      id: 1,
      school: "斯坦福大学",
      program: "计算机科学硕士",
      status: "进行中",
      progress: 75,
      deadline: "2024-12-15",
      steps: [
        { name: "申请表填写", completed: true },
        { name: "文书准备", completed: true },
        { name: "推荐信", completed: true },
        { name: "材料提交", completed: false },
        { name: "面试准备", completed: false },
      ],
    },
    {
      id: 2,
      school: "麻省理工学院",
      program: "人工智能硕士",
      status: "已提交",
      progress: 100,
      deadline: "2024-11-30",
      steps: [
        { name: "申请表填写", completed: true },
        { name: "文书准备", completed: true },
        { name: "推荐信", completed: true },
        { name: "材料提交", completed: true },
        { name: "等待结果", completed: false },
      ],
    },
    {
      id: 3,
      school: "加州大学伯克利分校",
      program: "数据科学硕士",
      status: "准备中",
      progress: 30,
      deadline: "2025-01-15",
      steps: [
        { name: "申请表填写", completed: true },
        { name: "文书准备", completed: false },
        { name: "推荐信", completed: false },
        { name: "材料提交", completed: false },
        { name: "面试准备", completed: false },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已提交":
        return "bg-green-100 text-green-800"
      case "进行中":
        return "bg-blue-100 text-blue-800"
      case "准备中":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "已提交":
        return <CheckCircle className="h-4 w-4" />
      case "进行中":
        return <Clock className="h-4 w-4" />
      case "准备中":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">申请进度</h2>
          <p className="text-muted-foreground">跟踪您的所有申请状态和进度</p>
        </div>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" />
          添加新申请
        </Button>
      </div>

      <div className="grid gap-6">
        {applications.map((app) => (
          <Card key={app.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{app.school}</CardTitle>
                  <CardDescription className="text-base">{app.program}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(app.status)}>
                    {getStatusIcon(app.status)}
                    <span className="ml-1">{app.status}</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>完成进度</span>
                  <span>{app.progress}%</span>
                </div>
                <Progress value={app.progress} className="h-2" />
              </div>

              {/* Deadline */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>申请截止日期：{app.deadline}</span>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                <h4 className="font-medium">申请步骤</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  {app.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-lg text-sm text-center ${
                        step.completed ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {step.completed && <CheckCircle className="h-3 w-3 inline mr-1" />}
                      {step.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  查看详情
                </Button>
                <Button variant="outline" size="sm">
                  编辑申请
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
