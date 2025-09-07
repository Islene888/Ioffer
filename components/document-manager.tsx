import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Download, Eye, Trash2, Plus } from "lucide-react"

export function DocumentManager() {
  const documents = [
    {
      id: 1,
      name: "个人陈述_斯坦福大学.pdf",
      type: "个人陈述",
      size: "2.3 MB",
      uploadDate: "2024-03-15",
      status: "已完成",
    },
    {
      id: 2,
      name: "推荐信_导师.pdf",
      type: "推荐信",
      size: "1.8 MB",
      uploadDate: "2024-03-10",
      status: "已完成",
    },
    {
      id: 3,
      name: "成绩单_官方.pdf",
      type: "成绩单",
      size: "3.1 MB",
      uploadDate: "2024-03-08",
      status: "已完成",
    },
    {
      id: 4,
      name: "简历_2024.pdf",
      type: "简历",
      size: "1.2 MB",
      uploadDate: "2024-03-05",
      status: "需要更新",
    },
  ]

  const documentTypes = ["个人陈述", "推荐信", "成绩单", "简历", "语言成绩", "作品集", "其他"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已完成":
        return "bg-green-100 text-green-800"
      case "需要更新":
        return "bg-yellow-100 text-yellow-800"
      case "待上传":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">文档管理</h2>
          <p className="text-muted-foreground">管理您的申请文档和材料</p>
        </div>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" />
          上传文档
        </Button>
      </div>

      {/* Upload Area */}
      <Card className="border-dashed border-2 border-muted-foreground/25">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">拖拽文件到此处或点击上传</h3>
          <p className="text-muted-foreground mb-4">支持 PDF、DOC、DOCX 格式，最大 10MB</p>
          <Button variant="outline">选择文件</Button>
        </CardContent>
      </Card>

      {/* Document Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {documentTypes.map((type) => (
          <Button key={type} variant="outline" size="sm" className="justify-start bg-transparent">
            {type}
          </Button>
        ))}
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">已上传文档</h3>
        <div className="grid gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>上传于 {doc.uploadDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
