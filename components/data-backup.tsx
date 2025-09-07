"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Upload, Trash2, Shield } from "lucide-react"
import { useUserData } from "@/hooks/use-user-data"
import { useToast } from "@/hooks/use-toast"

export function DataBackup() {
  const { exportData, importData, clearUserData } = useUserData()
  const { toast } = useToast()
  const [isImporting, setIsImporting] = useState(false)

  const handleExport = () => {
    try {
      const data = exportData()
      const blob = new Blob([data], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `ioffer-backup-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "数据导出成功",
        description: "您的申请数据已成功导出到本地文件",
      })
    } catch (error) {
      toast({
        title: "导出失败",
        description: "数据导出过程中出现错误，请重试",
        variant: "destructive",
      })
    }
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string
        const success = importData(jsonData)

        if (success) {
          toast({
            title: "数据导入成功",
            description: "您的申请数据已成功恢复",
          })
        } else {
          throw new Error("导入失败")
        }
      } catch (error) {
        toast({
          title: "导入失败",
          description: "文件格式不正确或数据损坏，请检查文件",
          variant: "destructive",
        })
      } finally {
        setIsImporting(false)
        event.target.value = "" // 重置文件输入
      }
    }

    reader.readAsText(file)
  }

  const handleClearData = () => {
    if (confirm("确定要清除所有数据吗？此操作不可恢复！")) {
      clearUserData()
      toast({
        title: "数据已清除",
        description: "所有申请数据已被清除",
      })
    }
  }

  return (
    <Card className="cartoon-shadow hover-lift">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>数据备份与恢复</CardTitle>
        </div>
        <CardDescription>保护您的申请数据，支持本地备份和恢复功能</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={handleExport}
            variant="outline"
            className="flex items-center gap-2 hover-lift bg-transparent"
          >
            <Download className="h-4 w-4" />
            导出数据
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 hover-lift bg-transparent"
              disabled={isImporting}
            >
              <Upload className="h-4 w-4" />
              {isImporting ? "导入中..." : "导入数据"}
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isImporting}
            />
          </div>

          <Button onClick={handleClearData} variant="destructive" className="flex items-center gap-2 hover-lift">
            <Trash2 className="h-4 w-4" />
            清除数据
          </Button>
        </div>

        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <p className="font-medium mb-1">💡 数据安全提示：</p>
          <ul className="space-y-1 text-xs">
            <li>• 定期导出备份文件，防止数据丢失</li>
            <li>• 备份文件包含所有个人信息和申请记录</li>
            <li>• 请妥善保管备份文件，避免泄露个人隐私</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
