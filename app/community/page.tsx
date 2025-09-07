"use client"

import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Heart, Search, Plus, Users, BookOpen } from "lucide-react"
import { useState } from "react"

export default function CommunityPage() {
  const { t } = useLanguage()
  const [showNewPost, setShowNewPost] = useState(false)

  const posts = [
    {
      id: 1,
      author: "Stanford学长",
      avatar: "/diverse-students-studying.png",
      title: "CS申请经验分享 - 从GPA 3.6到Top 5录取",
      content: "分享一下我的申请经验，希望对大家有帮助...",
      tags: ["CS", "美国", "经验分享"],
      likes: 24,
      replies: 8,
      time: "2小时前",
    },
    {
      id: 2,
      author: "UCL在读生",
      avatar: "/diverse-female-student.png",
      title: "英国签证申请详细攻略",
      content: "最新的英国学生签证申请流程和注意事项...",
      tags: ["英国", "签证", "攻略"],
      likes: 18,
      replies: 12,
      time: "5小时前",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{t("community.title") || "学长学姐社区"}</h1>
                <p className="text-muted-foreground">
                  {t("community.subtitle") || "与已经成功的学长学姐交流经验，获得第一手申请建议"}
                </p>
              </div>
              <Button onClick={() => setShowNewPost(!showNewPost)} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                发布帖子
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card className="cartoon-shadow">
                  <CardHeader>
                    <h3 className="font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      社区统计
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">1,234</div>
                      <div className="text-sm text-muted-foreground">活跃用户</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">567</div>
                      <div className="text-sm text-muted-foreground">成功案例</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">89</div>
                      <div className="text-sm text-muted-foreground">今日新帖</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cartoon-shadow mt-4">
                  <CardHeader>
                    <h3 className="font-semibold flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      热门话题
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {["CS申请", "文书写作", "面试技巧", "签证办理", "选校建议"].map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="搜索帖子、用户或话题..." className="pl-10" />
                  </div>
                </div>

                {showNewPost && (
                  <Card className="cartoon-shadow mb-6">
                    <CardHeader>
                      <h3 className="font-semibold">发布新帖子</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="帖子标题" />
                      <Textarea placeholder="分享你的经验或提出问题..." rows={4} />
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="cursor-pointer">
                            + 添加标签
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setShowNewPost(false)}>
                            取消
                          </Button>
                          <Button className="bg-primary hover:bg-primary/90">发布</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-4">
                  {posts.map((post) => (
                    <Card key={post.id} className="cartoon-shadow hover-lift cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">{post.author[0]}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{post.author}</span>
                              <span className="text-sm text-muted-foreground">{post.time}</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                            <p className="text-muted-foreground mb-3">{post.content}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Heart className="h-4 w-4" />
                                  {post.likes}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="h-4 w-4" />
                                  {post.replies}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
