"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users, GraduationCap, DollarSign, Calendar, Star, Heart, Share2 } from "lucide-react"
import Image from "next/image"

export default function SchoolDetailPage() {
  const { id } = useParams()
  const { t } = useLanguage()
  const [school, setSchool] = useState<any>(null)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    const mockSchool = {
      id: id,
      name: "Stanford University",
      nameChinese: "斯坦福大学",
      location: "Stanford, California, USA",
      ranking: 2,
      acceptanceRate: 4.3,
      tuition: "$56,169",
      students: "17,249",
      founded: 1885,
      image: "/stanford-university-logo.jpg",
      description:
        "Stanford University is a private research university in Stanford, California. It is one of the world's leading universities, known for its academic strength, wealth, and proximity to Silicon Valley.",
      programs: ["Computer Science", "Engineering", "Business", "Medicine", "Law"],
      requirements: {
        gpa: "3.9+",
        sat: "1470-1570",
        toefl: "100+",
        ielts: "7.0+",
      },
      deadlines: {
        earlyAction: "November 1",
        regularDecision: "January 2",
      },
      highlights: [
        "Top-ranked Computer Science program",
        "Located in Silicon Valley",
        "Strong alumni network",
        "Excellent research opportunities",
      ],
    }
    setSchool(mockSchool)
  }, [id])

  if (!school) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-muted-foreground">Loading school information...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <Image
                  src={school.image || "/placeholder.svg"}
                  alt={school.name}
                  width={120}
                  height={120}
                  className="rounded-lg shadow-lg"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">#{school.ranking} Global Ranking</Badge>
                  <Badge variant="outline">{school.acceptanceRate}% Acceptance Rate</Badge>
                </div>

                <h1 className="text-4xl font-bold text-foreground mb-2">{school.name}</h1>
                <p className="text-xl text-muted-foreground mb-4">{school.nameChinese}</p>

                <div className="flex items-center gap-4 text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{school.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Founded {school.founded}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setIsFavorited(!isFavorited)}>
                    <Heart className={`h-4 w-4 mr-2 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                    {isFavorited ? "Favorited" : "Add to Favorites"}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="admissions">Admissions</TabsTrigger>
                <TabsTrigger value="campus">Campus Life</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>About {school.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed mb-6">{school.description}</p>

                        <h3 className="text-lg font-semibold mb-3">Program Highlights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {school.highlights.map((highlight: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Facts</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Students</span>
                          </div>
                          <span className="font-semibold">{school.students}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Tuition</span>
                          </div>
                          <span className="font-semibold">{school.tuition}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Acceptance Rate</span>
                          </div>
                          <span className="font-semibold">{school.acceptanceRate}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="programs" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {school.programs.map((program: string, index: number) => (
                        <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <h3 className="font-semibold mb-2">{program}</h3>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive program with excellent faculty and research opportunities.
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="admissions" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Admission Requirements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Academic Requirements</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• GPA: {school.requirements.gpa}</li>
                          <li>• SAT: {school.requirements.sat}</li>
                          <li>• TOEFL: {school.requirements.toefl}</li>
                          <li>• IELTS: {school.requirements.ielts}</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Application Deadlines</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Early Action</span>
                        <span className="text-primary font-semibold">{school.deadlines.earlyAction}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">Regular Decision</span>
                        <span className="text-primary font-semibold">{school.deadlines.regularDecision}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="campus" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Campus Life</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Experience vibrant campus life with numerous clubs, organizations, and activities.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">Student Organizations</h3>
                        <p className="text-sm text-muted-foreground">Over 650 student organizations</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                          <GraduationCap className="h-8 w-8 text-secondary" />
                        </div>
                        <h3 className="font-semibold mb-2">Research</h3>
                        <p className="text-sm text-muted-foreground">World-class research facilities</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-3">
                          <MapPin className="h-8 w-8 text-accent" />
                        </div>
                        <h3 className="font-semibold mb-2">Location</h3>
                        <p className="text-sm text-muted-foreground">Beautiful California campus</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">Computer Science Student</span>
                        </div>
                        <p className="text-sm">
                          "Amazing research opportunities and world-class faculty. The Silicon Valley location provides
                          incredible internship and job opportunities."
                        </p>
                      </div>

                      <div className="border-l-4 border-secondary pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4].map((star) => (
                              <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="h-4 w-4 text-gray-300" />
                          </div>
                          <span className="text-sm text-muted-foreground">Business Student</span>
                        </div>
                        <p className="text-sm">
                          "Excellent business program with strong connections to industry. The campus is beautiful and
                          the student life is vibrant."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  )
}
