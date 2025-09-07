"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, AlertTriangle } from "lucide-react"

export function ApplicationCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 10)) // November 2024
  const [viewMode, setViewMode] = useState("month")

  const events = [
    {
      id: 1,
      title: "MIT申请截止",
      school: "麻省理工学院",
      date: "2024-12-01",
      type: "deadline",
      priority: "高",
    },
    {
      id: 2,
      title: "哈佛推荐信截止",
      school: "哈佛大学",
      date: "2024-12-10",
      type: "document",
      priority: "高",
    },
    {
      id: 3,
      title: "斯坦福申请截止",
      school: "斯坦福大学",
      date: "2024-12-15",
      type: "deadline",
      priority: "高",
    },
    {
      id: 4,
      title: "CMU面试安排",
      school: "卡内基梅隆大学",
      date: "2024-12-20",
      type: "interview",
      priority: "中",
    },
    {
      id: 5,
      title: "UC Berkeley申请截止",
      school: "加州大学伯克利分校",
      date: "2025-01-15",
      type: "deadline",
      priority: "中",
    },
  ]

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "deadline":
        return "bg-red-100 text-red-800"
      case "document":
        return "bg-blue-100 text-blue-800"
      case "interview":
        return "bg-green-100 text-green-800"
      case "test":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <AlertTriangle className="h-4 w-4" />
      case "document":
        return <Clock className="h-4 w-4" />
      case "interview":
        return <Calendar className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "border-l-red-500"
      case "中":
        return "border-l-yellow-500"
      case "低":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("zh-CN", {
      month: "long",
      day: "numeric",
      weekday: "short",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">时间规划</h2>
          <p className="text-muted-foreground">管理申请截止日期和重要时间节点</p>
        </div>
        <div className="flex gap-2">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">月视图</SelectItem>
              <SelectItem value="week">周视图</SelectItem>
              <SelectItem value="list">列表视图</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-secondary hover:bg-secondary/90">
            <Plus className="h-4 w-4 mr-2" />
            添加事件
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {currentMonth.toLocaleDateString("zh-CN", { year: "numeric", month: "long" })}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i - 6)
                  const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
                  const isToday = date.toDateString() === new Date().toDateString()
                  const hasEvent = events.some((event) => new Date(event.date).toDateString() === date.toDateString())

                  return (
                    <div
                      key={i}
                      className={`
                        p-2 h-20 border border-border rounded-lg cursor-pointer hover:bg-muted/50
                        ${!isCurrentMonth ? "text-muted-foreground bg-muted/20" : ""}
                        ${isToday ? "bg-secondary/20 border-secondary" : ""}
                        ${hasEvent ? "bg-blue-50" : ""}
                      `}
                    >
                      <div className="text-sm font-medium">{date.getDate()}</div>
                      {hasEvent && (
                        <div className="mt-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                即将到期
              </CardTitle>
              <CardDescription>接下来的重要日期</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => {
                const daysUntil = getDaysUntil(event.date)
                return (
                  <div
                    key={event.id}
                    className={`p-3 border-l-4 ${getPriorityColor(event.priority)} bg-muted/30 rounded-r-lg`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <Badge className={getEventTypeColor(event.type)} variant="outline">
                        {getEventTypeIcon(event.type)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{event.school}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>{formatDate(event.date)}</span>
                      <span className={daysUntil <= 7 ? "text-red-600 font-medium" : "text-muted-foreground"}>
                        {daysUntil > 0 ? `${daysUntil}天后` : "今天"}
                      </span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Event Types Legend */}
          <Card>
            <CardHeader>
              <CardTitle>事件类型</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">申请截止</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">文档提交</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">面试安排</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm">考试日期</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
