"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BasicInfoForm } from "@/components/basic-info-form"
import { AcademicInfoForm } from "@/components/academic-info-form"
import { ApplicationProgress } from "@/components/application-progress"
import { DocumentManager } from "@/components/document-manager"
import { User, GraduationCap, FileText, Settings } from "lucide-react"

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <div className="page-transition">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 cartoon-shadow">
          <TabsTrigger
            value="basic"
            className="flex items-center gap-2 mobile-touch hover-lift data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <User className="h-4 w-4" />
            基本信息
          </TabsTrigger>
          <TabsTrigger
            value="academic"
            className="flex items-center gap-2 mobile-touch hover-lift data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <GraduationCap className="h-4 w-4" />
            学术背景
          </TabsTrigger>
          <TabsTrigger
            value="progress"
            className="flex items-center gap-2 mobile-touch hover-lift data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <FileText className="h-4 w-4" />
            申请进度
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="flex items-center gap-2 mobile-touch hover-lift data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <Settings className="h-4 w-4" />
            文档管理
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6 stagger-animation">
          <Card className="cartoon-shadow hover-lift border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <User className="h-5 w-5" />
                基本信息
              </CardTitle>
              <CardDescription>请填写您的基本个人信息，这些信息将用于个性化推荐</CardDescription>
            </CardHeader>
            <CardContent>
              <BasicInfoForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="mt-6 stagger-animation">
          <Card className="cartoon-shadow hover-lift border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <GraduationCap className="h-5 w-5" />
                学术背景
              </CardTitle>
              <CardDescription>详细的学术信息有助于我们为您推荐最合适的学校和专业</CardDescription>
            </CardHeader>
            <CardContent>
              <AcademicInfoForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="mt-6 stagger-animation">
          <ApplicationProgress />
        </TabsContent>

        <TabsContent value="documents" className="mt-6 stagger-animation">
          <DocumentManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
