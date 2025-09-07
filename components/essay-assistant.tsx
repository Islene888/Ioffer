"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EssayGenerator } from "@/components/essay-generator"
import { EssayEditor } from "@/components/essay-editor"
import { EssayTemplates } from "@/components/essay-templates"
import { EssayLibrary } from "@/components/essay-library"
import { Sparkles, Edit, BookOpen, FolderOpen } from "lucide-react"

export function EssayAssistant() {
  const [activeTab, setActiveTab] = useState("generator")

  return (
    <div className="page-transition">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 cartoon-shadow">
          <TabsTrigger
            value="generator"
            className="flex items-center gap-2 mobile-touch hover-lift data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <Sparkles className="h-4 w-4" />
            AI生成
          </TabsTrigger>
          <TabsTrigger
            value="editor"
            className="flex items-center gap-2 mobile-touch hover-lift data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <Edit className="h-4 w-4" />
            文书编辑
          </TabsTrigger>
          <TabsTrigger
            value="templates"
            className="flex items-center gap-2 mobile-touch hover-lift data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <BookOpen className="h-4 w-4" />
            模板库
          </TabsTrigger>
          <TabsTrigger
            value="library"
            className="flex items-center gap-2 mobile-touch hover-lift data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <FolderOpen className="h-4 w-4" />
            我的文书
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="mt-6 stagger-animation">
          <Card className="cartoon-shadow hover-lift border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                AI智能生成
              </CardTitle>
              <CardDescription>基于您的个人信息和申请目标，AI将为您生成个性化的申请文书</CardDescription>
            </CardHeader>
            <CardContent>
              <EssayGenerator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="editor" className="mt-6 stagger-animation">
          <EssayEditor />
        </TabsContent>

        <TabsContent value="templates" className="mt-6 stagger-animation">
          <EssayTemplates />
        </TabsContent>

        <TabsContent value="library" className="mt-6 stagger-animation">
          <EssayLibrary />
        </TabsContent>
      </Tabs>
    </div>
  )
}
