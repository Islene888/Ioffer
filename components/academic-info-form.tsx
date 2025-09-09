"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Save, X } from "lucide-react"

export function AcademicInfoForm() {
  const [formData, setFormData] = useState({
    currentEducation: "",
    school: "",
    major: "",
    gpa: "",
    gpaScale: "4.0",
    graduationDate: "",
    targetDegree: "",
    targetMajor: "",
  })

  const [languageTests, setLanguageTests] = useState([{ type: "", score: "", date: "" }])

  const [experiences, setExperiences] = useState([
    { type: "", title: "", organization: "", duration: "", description: "" },
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const { user } = await response.json()
        if (user.profile) {
          setFormData({
            currentEducation: user.profile.currentEducation || "",
            school: user.profile.school || "",
            major: user.profile.major || "",
            gpa: user.profile.gpa || "",
            gpaScale: user.profile.gpaScale || "4.0",
            graduationDate: user.profile.graduationDate || "",
            targetDegree: user.profile.targetDegree || "",
            targetMajor: user.profile.targetMajor || "",
          })
        }
        if (user.languageTests) {
          setLanguageTests(user.languageTests)
        }
        if (user.experiences) {
          setExperiences(user.experiences)
        }
      }
    } catch (error) {
      console.error("Failed to load profile:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("请先登录")
        return
      }

      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          academicInfo: formData,
          languageTests,
          experiences,
        }),
      })

      if (response.ok) {
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 3000)
      } else {
        alert("保存失败，请重试")
      }
    } catch (error) {
      console.error("Failed to save profile:", error)
      alert("保存失败，请重试")
    } finally {
      setIsLoading(false)
    }
  }

  const addLanguageTest = () => {
    setLanguageTests([...languageTests, { type: "", score: "", date: "" }])
  }

  const removeLanguageTest = (index: number) => {
    setLanguageTests(languageTests.filter((_, i) => i !== index))
  }

  const addExperience = () => {
    setExperiences([...experiences, { type: "", title: "", organization: "", duration: "", description: "" }])
  }

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Current Education */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">当前教育背景</CardTitle>
          <CardDescription>请填写您当前的教育情况</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentEducation">当前学历 *</Label>
              <Select
                value={formData.currentEducation}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, currentEducation: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择当前学历" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">高中</SelectItem>
                  <SelectItem value="bachelor">本科</SelectItem>
                  <SelectItem value="master">硕士</SelectItem>
                  <SelectItem value="phd">博士</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">学校名称 *</Label>
              <Input
                id="school"
                value={formData.school}
                onChange={(e) => setFormData((prev) => ({ ...prev, school: e.target.value }))}
                placeholder="如：清华大学"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="major">专业 *</Label>
              <Input
                id="major"
                value={formData.major}
                onChange={(e) => setFormData((prev) => ({ ...prev, major: e.target.value }))}
                placeholder="如：计算机科学与技术"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="graduationDate">毕业时间</Label>
              <Input
                id="graduationDate"
                type="date"
                value={formData.graduationDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, graduationDate: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpa">GPA *</Label>
              <Input
                id="gpa"
                value={formData.gpa}
                onChange={(e) => setFormData((prev) => ({ ...prev, gpa: e.target.value }))}
                placeholder="如：3.8"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpaScale">GPA满分</Label>
              <Select
                value={formData.gpaScale}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, gpaScale: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4.0">4.0</SelectItem>
                  <SelectItem value="5.0">5.0</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Target Education */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">申请目标</CardTitle>
          <CardDescription>请填写您的申请目标</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetDegree">目标学位 *</Label>
              <Select
                value={formData.targetDegree}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, targetDegree: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择目标学位" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelor">本科</SelectItem>
                  <SelectItem value="master">硕士</SelectItem>
                  <SelectItem value="phd">博士</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetMajor">目标专业 *</Label>
              <Input
                id="targetMajor"
                value={formData.targetMajor}
                onChange={(e) => setFormData((prev) => ({ ...prev, targetMajor: e.target.value }))}
                placeholder="如：计算机科学"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            语言考试成绩
            <Button type="button" variant="outline" size="sm" onClick={addLanguageTest}>
              <Plus className="h-4 w-4 mr-2" />
              添加成绩
            </Button>
          </CardTitle>
          <CardDescription>请添加您的语言考试成绩</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {languageTests.map((test, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-border rounded-lg">
              <div className="space-y-2">
                <Label>考试类型</Label>
                <Select
                  value={test.type}
                  onValueChange={(value) => {
                    const newTests = [...languageTests]
                    newTests[index].type = value
                    setLanguageTests(newTests)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择考试" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toefl">TOEFL</SelectItem>
                    <SelectItem value="ielts">IELTS</SelectItem>
                    <SelectItem value="gre">GRE</SelectItem>
                    <SelectItem value="gmat">GMAT</SelectItem>
                    <SelectItem value="sat">SAT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>分数</Label>
                <Input
                  value={test.score}
                  onChange={(e) => {
                    const newTests = [...languageTests]
                    newTests[index].score = e.target.value
                    setLanguageTests(newTests)
                  }}
                  placeholder="如：110"
                />
              </div>
              <div className="space-y-2">
                <Label>考试日期</Label>
                <Input
                  type="date"
                  value={test.date}
                  onChange={(e) => {
                    const newTests = [...languageTests]
                    newTests[index].date = e.target.value
                    setLanguageTests(newTests)
                  }}
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeLanguageTest(index)}
                  disabled={languageTests.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button type="submit" className="bg-secondary hover:bg-secondary/90" disabled={isLoading}>
        <Save className="h-4 w-4 mr-2" />
        {isLoading ? "保存中..." : isSaved ? "已保存" : "保存学术信息"}
      </Button>
    </form>
  )
}
