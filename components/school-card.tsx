"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  BookOpen,
  ExternalLink,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface School {
  id: number
  name: string
  englishName: string
  country: string
  location: string
  ranking: number
  program: string
  matchScore: number
  admissionRate: number
  avgGPA: number
  avgTOEFL: number
  avgGRE: number
  tuition: string
  deadline: string
  requirements: {
    minGPA: number
    minTOEFL: number
    minGRE: number
  }
  highlights: string[]
  similarCases: number
  logo: string
}

interface UserProfile {
  gpa: number
  toefl: number
  gre: number
}

interface SchoolCardProps {
  school: School
  userProfile: UserProfile
}

export function SchoolCard({ school, userProfile }: SchoolCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const getMatchLevel = (score: number) => {
    if (score >= 90) return { level: "冲刺", color: "bg-red-100 text-red-800" }
    if (score >= 80) return { level: "匹配", color: "bg-green-100 text-green-800" }
    return { level: "保底", color: "bg-blue-100 text-blue-800" }
  }

  const checkRequirement = (userScore: number, minScore: number) => {
    if (userScore >= minScore) {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    }
    return <AlertCircle className="h-4 w-4 text-red-600" />
  }

  const matchLevel = getMatchLevel(school.matchScore)

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={school.logo || "/placeholder.svg"} alt={school.name} />
              <AvatarFallback>{school.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{school.name}</CardTitle>
              <CardDescription className="text-base">{school.englishName}</CardDescription>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {school.country} · {school.location}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  世界排名 #{school.ranking}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={matchLevel.color}>{matchLevel.level}</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorited(!isFavorited)}
              className={isFavorited ? "text-red-500" : ""}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Program and Match Score */}
        <div>
          <h4 className="font-medium mb-2">{school.program}</h4>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>匹配度</span>
                <span className="font-medium">{school.matchScore}%</span>
              </div>
              <Progress value={school.matchScore} className="h-2" />
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">录取率</div>
              <div className="font-medium">{school.admissionRate}%</div>
            </div>
          </div>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">学费</span>
            </div>
            <div className="font-medium">{school.tuition}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">截止日期</span>
            </div>
            <div className="font-medium">{school.deadline}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">相似案例</span>
            </div>
            <div className="font-medium">{school.similarCases}个</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">平均GPA</span>
            </div>
            <div className="font-medium">{school.avgGPA}</div>
          </div>
        </div>

        {/* Requirements Check */}
        <div>
          <h4 className="font-medium mb-3">申请要求对比</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">GPA要求</div>
                <div className="font-medium">{school.requirements.minGPA}+</div>
                <div className="text-xs text-muted-foreground">您的: {userProfile.gpa}</div>
              </div>
              {checkRequirement(userProfile.gpa, school.requirements.minGPA)}
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">TOEFL要求</div>
                <div className="font-medium">{school.requirements.minTOEFL}+</div>
                <div className="text-xs text-muted-foreground">您的: {userProfile.toefl}</div>
              </div>
              {checkRequirement(userProfile.toefl, school.requirements.minTOEFL)}
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">GRE要求</div>
                <div className="font-medium">{school.requirements.minGRE}+</div>
                <div className="text-xs text-muted-foreground">您的: {userProfile.gre}</div>
              </div>
              {checkRequirement(userProfile.gre, school.requirements.minGRE)}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div>
          <h4 className="font-medium mb-2">项目亮点</h4>
          <div className="flex flex-wrap gap-2">
            {school.highlights.map((highlight, index) => (
              <Badge key={index} variant="outline">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button className="bg-secondary hover:bg-secondary/90">
            <BookOpen className="h-4 w-4 mr-2" />
            查看详情
          </Button>
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            相似案例
          </Button>
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            官网链接
          </Button>
          <Button variant="outline">添加到申请清单</Button>
        </div>
      </CardContent>
    </Card>
  )
}
