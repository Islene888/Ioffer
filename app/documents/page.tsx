"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, Download, Trash2, Eye, Plus, Search } from "lucide-react"

export default function DocumentsPage() {
  const { t } = useLanguage()
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Personal Statement - Stanford.pdf",
      type: "Personal Statement",
      size: "2.3 MB",
      uploadDate: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      name: "Transcript - Official.pdf",
      type: "Transcript",
      size: "1.8 MB",
      uploadDate: "2024-01-10",
      status: "verified",
    },
    {
      id: 3,
      name: "Recommendation Letter - Prof Smith.pdf",
      type: "Recommendation",
      size: "1.2 MB",
      uploadDate: "2024-01-08",
      status: "pending",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const newDoc = {
          id: documents.length + 1,
          name: file.name,
          type: "Document",
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split("T")[0],
          status: "uploading",
        }
        setDocuments((prev) => [...prev, newDoc])
      })
    }
  }

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Document Manager</h1>
            <p className="text-muted-foreground">
              Upload, organize, and manage all your application documents in one place.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="all">All Documents</TabsTrigger>
                <TabsTrigger value="essays">Essays</TabsTrigger>
                <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button asChild>
                    <span>
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Document
                    </span>
                  </Button>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 gap-4">
                {filteredDocuments.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No documents found</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Upload your first document to get started with organizing your application materials.
                      </p>
                      <Label htmlFor="file-upload-empty" className="cursor-pointer">
                        <Button>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Document
                        </Button>
                      </Label>
                      <Input
                        id="file-upload-empty"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </CardContent>
                  </Card>
                ) : (
                  filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground">{doc.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{doc.type}</Badge>
                              <span className="text-sm text-muted-foreground">{doc.size}</span>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{doc.uploadDate}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              doc.status === "completed"
                                ? "default"
                                : doc.status === "verified"
                                  ? "secondary"
                                  : doc.status === "pending"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {doc.status}
                          </Badge>

                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="essays">
              <div className="grid grid-cols-1 gap-4">
                {filteredDocuments
                  .filter(
                    (doc) => doc.type.toLowerCase().includes("statement") || doc.type.toLowerCase().includes("essay"),
                  )
                  .map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-secondary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{doc.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{doc.type}</Badge>
                              <span className="text-sm text-muted-foreground">{doc.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="transcripts">
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No transcripts uploaded</h3>
                <p className="text-muted-foreground mb-4">Upload your official transcripts here.</p>
                <Button>Upload Transcript</Button>
              </div>
            </TabsContent>

            <TabsContent value="recommendations">
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No recommendation letters</h3>
                <p className="text-muted-foreground mb-4">
                  Upload recommendation letters from your professors or employers.
                </p>
                <Button>Upload Recommendation</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
