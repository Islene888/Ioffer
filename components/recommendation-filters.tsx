"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function RecommendationFilters() {
  const [filters, setFilters] = useState({
    countries: [] as string[],
    rankings: [1, 100],
    tuitionRange: [0, 100000],
    admissionRate: [0, 100],
    programType: "",
    degreeLevel: "",
  })

  const countries = ["美国", "英国", "加拿大", "澳大利亚", "德国", "荷兰", "新加坡", "香港"]
  const programTypes = ["计算机科学", "数据科学", "人工智能", "软件工程", "信息系统"]
  const degreeLevels = ["学士", "硕士", "博士"]

  const handleCountryChange = (country: string, checked: boolean) => {
    if (checked) {
      setFilters((prev) => ({ ...prev, countries: [...prev.countries, country] }))
    } else {
      setFilters((prev) => ({ ...prev, countries: prev.countries.filter((c) => c !== country) }))
    }
  }

  const resetFilters = () => {
    setFilters({
      countries: [],
      rankings: [1, 100],
      tuitionRange: [0, 100000],
      admissionRate: [0, 100],
      programType: "",
      degreeLevel: "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          高级筛选
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            重置
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Countries */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">目标国家</Label>
            <div className="space-y-2">
              {countries.map((country) => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox
                    id={country}
                    checked={filters.countries.includes(country)}
                    onCheckedChange={(checked) => handleCountryChange(country, checked as boolean)}
                  />
                  <Label htmlFor={country} className="text-sm">
                    {country}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Program Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">专业类型</Label>
            <Select
              value={filters.programType}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, programType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择专业" />
              </SelectTrigger>
              <SelectContent>
                {programTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label className="text-sm font-medium">学位层次</Label>
            <Select
              value={filters.degreeLevel}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, degreeLevel: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择学位" />
              </SelectTrigger>
              <SelectContent>
                {degreeLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rankings */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">世界排名范围</Label>
            <div className="px-2">
              <Slider
                value={filters.rankings}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, rankings: value }))}
                max={100}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>#{filters.rankings[0]}</span>
                <span>#{filters.rankings[1]}</span>
              </div>
            </div>

            <Label className="text-sm font-medium">录取率范围</Label>
            <div className="px-2">
              <Slider
                value={filters.admissionRate}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, admissionRate: value }))}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{filters.admissionRate[0]}%</span>
                <span>{filters.admissionRate[1]}%</span>
              </div>
            </div>
          </div>

          {/* Tuition */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">学费范围 (USD)</Label>
            <div className="px-2">
              <Slider
                value={filters.tuitionRange}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, tuitionRange: value }))}
                max={100000}
                min={0}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>${filters.tuitionRange[0].toLocaleString()}</span>
                <span>${filters.tuitionRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-border">
          <Button className="bg-secondary hover:bg-secondary/90">应用筛选</Button>
          <Button variant="outline">保存筛选条件</Button>
        </div>
      </CardContent>
    </Card>
  )
}
