"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApplicationOverview } from "@/components/application-overview"
import { ApplicationList } from "@/components/application-list"
import { ApplicationCalendar } from "@/components/application-calendar"
import { ApplicationAnalytics } from "@/components/application-analytics"
import { BarChart3, Calendar, List, PieChart } from "lucide-react"

export function ApplicationManager() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="page-transition">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 cartoon-shadow">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 mobile-touch hover-lift data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <BarChart3 className="h-4 w-4" />
            概览
          </TabsTrigger>
          <TabsTrigger
            value="applications"
            className="flex items-center gap-2 mobile-touch hover-lift data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <List className="h-4 w-4" />
            申请清单
          </TabsTrigger>
          <TabsTrigger
            value="calendar"
            className="flex items-center gap-2 mobile-touch hover-lift data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <Calendar className="h-4 w-4" />
            时间规划
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center gap-2 mobile-touch hover-lift data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
          >
            <PieChart className="h-4 w-4" />
            数据分析
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 stagger-animation">
          <ApplicationOverview />
        </TabsContent>

        <TabsContent value="applications" className="mt-6 stagger-animation">
          <ApplicationList />
        </TabsContent>

        <TabsContent value="calendar" className="mt-6 stagger-animation">
          <ApplicationCalendar />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 stagger-animation">
          <ApplicationAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
